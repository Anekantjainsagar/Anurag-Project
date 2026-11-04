"""
Admin Order Management & Fulfillment Pipeline
"""

from typing import List, Optional
import uuid
from fastapi import APIRouter, Depends, HTTPException, Query, status
from pydantic import BaseModel
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload
from app.core.database import get_db
from app.core.dependencies import require_role
from app.models.order import Order, OrderTrackingEvent
from app.models.user import User
from app.schemas.order import OrderOut

router = APIRouter()


class OrderStatusUpdate(BaseModel):
    status: str  # CONFIRMED, PACKED, DISPATCHED, OUT_FOR_DELIVERY, DELIVERED, CANCELLED
    notes: Optional[str] = None


class OrderDispatchUpdate(BaseModel):
    courier_name: str
    tracking_awb: str
    dispatch_location: Optional[str] = "Central Logistics Hub, Indore"


@router.get("/admin/orders", response_model=List[OrderOut], summary="List Orders with Filters")
async def list_orders(
    status_filter: Optional[str] = Query(None, alias="status"),
    phone: Optional[str] = Query(None),
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=100),
    admin_user: User = Depends(require_role("admin", "vendor")),
    db: AsyncSession = Depends(get_db),
):
    stmt = (
        select(Order)
        .options(
            selectinload(Order.items),
            selectinload(Order.tracking_events),
        )
        .order_by(Order.created_at.desc())
    )

    if status_filter:
        stmt = stmt.where(Order.order_status == status_filter.strip().upper())

    if phone:
        stmt = stmt.where(Order.customer_phone.ilike(f"%{phone.strip()}%"))

    stmt = stmt.offset(skip).limit(limit)
    result = await db.execute(stmt)
    return result.scalars().all()


@router.patch("/admin/orders/{order_id}/status", response_model=OrderOut, summary="Update Order Status")
async def update_order_status(
    order_id: uuid.UUID,
    payload: OrderStatusUpdate,
    admin_user: User = Depends(require_role("admin", "vendor")),
    db: AsyncSession = Depends(get_db),
):
    stmt = (
        select(Order)
        .where(Order.id == order_id)
        .options(
            selectinload(Order.items),
            selectinload(Order.tracking_events),
        )
    )
    result = await db.execute(stmt)
    order = result.scalar_one_or_none()
    if not order:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Order not found.")

    new_status = payload.status.strip().upper()
    order.order_status = new_status
    if payload.notes:
        order.vendor_notes = payload.notes

    # Add tracking milestone
    tracking_event = OrderTrackingEvent(
        order_id=order.id,
        status=new_status,
        title=f"Status Updated: {new_status}",
        description=payload.notes or f"Order advanced to {new_status}.",
        location="Indore Logistics Center",
    )
    db.add(tracking_event)
    await db.commit()
    await db.refresh(order)
    return order


@router.patch("/admin/orders/{order_id}/dispatch", response_model=OrderOut, summary="Assign Courier & AWB")
async def dispatch_order(
    order_id: uuid.UUID,
    payload: OrderDispatchUpdate,
    admin_user: User = Depends(require_role("admin", "vendor")),
    db: AsyncSession = Depends(get_db),
):
    stmt = (
        select(Order)
        .where(Order.id == order_id)
        .options(
            selectinload(Order.items),
            selectinload(Order.tracking_events),
        )
    )
    result = await db.execute(stmt)
    order = result.scalar_one_or_none()
    if not order:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Order not found.")

    order.order_status = "DISPATCHED"
    order.courier_name = payload.courier_name
    order.tracking_awb = payload.tracking_awb

    tracking_event = OrderTrackingEvent(
        order_id=order.id,
        status="DISPATCHED",
        title="Dispatched via Courier",
        description=f"Shipped via {payload.courier_name} (AWB: {payload.tracking_awb})",
        location=payload.dispatch_location,
    )
    db.add(tracking_event)
    await db.commit()
    await db.refresh(order)
    return order
