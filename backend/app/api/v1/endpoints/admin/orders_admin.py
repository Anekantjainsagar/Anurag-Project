"""
Admin Order Management & Fulfillment Pipeline
"""

from typing import List, Optional
import uuid
from fastapi import APIRouter, Depends, HTTPException, Query, status
from pydantic import BaseModel
from sqlalchemy import or_, select
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
    search: Optional[str] = Query(None),
    user_id: Optional[uuid.UUID] = Query(None),
    phone: Optional[str] = Query(None),
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=200),
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

    if status_filter and status_filter.strip().upper() != "ALL":
        stmt = stmt.where(Order.order_status == status_filter.strip().upper())

    if user_id:
        stmt = stmt.where(Order.user_id == user_id)

    if search:
        search_term = f"%{search.strip()}%"
        stmt = stmt.where(
            or_(
                Order.order_number.ilike(search_term),
                Order.customer_name.ilike(search_term),
                Order.customer_email.ilike(search_term),
                Order.customer_phone.ilike(search_term),
                Order.tracking_awb.ilike(search_term),
            )
        )

    if phone:
        stmt = stmt.where(Order.customer_phone.ilike(f"%{phone.strip()}%"))

    stmt = stmt.offset(skip).limit(limit)
    result = await db.execute(stmt)
    return result.scalars().all()


@router.get("/admin/orders/{order_id}", response_model=OrderOut, summary="Get Order Details")
async def get_order_detail(
    order_id: uuid.UUID,
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
    return order


@router.delete("/admin/orders/{order_id}", summary="Delete Order")
async def delete_order(
    order_id: uuid.UUID,
    admin_user: User = Depends(require_role("admin")),
    db: AsyncSession = Depends(get_db),
):
    stmt = select(Order).where(Order.id == order_id)
    result = await db.execute(stmt)
    order = result.scalar_one_or_none()
    if not order:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Order not found.")
    await db.delete(order)
    await db.commit()
    return {"success": True, "message": f"Order {order.order_number} deleted successfully."}


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
    old_status = order.order_status
    order.order_status = new_status
    if payload.notes:
        order.vendor_notes = payload.notes

    # Human-friendly milestone titles, descriptions & destinations
    if new_status == "DELIVERED":
        title = "Delivered to Customer Doorstep"
        desc = payload.notes or "Package safely handed over to recipient. Pure organic order fulfilled."
        loc = f"{order.shipping_city}, {order.shipping_state}" if order.shipping_city else "Recipient Address"
    elif new_status == "CONFIRMED":
        title = "Order Confirmed & Farm Lot Allocated"
        desc = payload.notes or "Order verified and scheduled for clean eco-barrier packaging."
        loc = "Central Logistics Hub, Indore"
    elif new_status == "PACKED":
        title = "Packed & Quality Inspected"
        desc = payload.notes or "Items hand-picked, nitrogen-flushed, and sealed in eco barrier pouches."
        loc = "Milling & Packaging Facility, Indore"
    elif new_status == "CANCELLED":
        title = "Order Cancelled"
        desc = payload.notes or "Order cancelled by store operator."
        loc = "Administrative Desk"
    else:
        title = f"Status Updated: {new_status}"
        desc = payload.notes or f"Order advanced to {new_status}."
        loc = "Indore Logistics Center"

    # Only add milestone if status actually changed or new notes provided
    if old_status != new_status or payload.notes:
        tracking_event = OrderTrackingEvent(
            order_id=order.id,
            status=new_status,
            title=title,
            description=desc,
            location=loc,
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

    already_dispatched = (order.order_status == "DISPATCHED")
    order.order_status = "DISPATCHED"
    order.courier_name = payload.courier_name
    order.tracking_awb = payload.tracking_awb

    # Avoid duplicate events if already dispatched; update the existing event instead
    if already_dispatched:
        existing_dispatch_evt = next((e for e in order.tracking_events if e.status == "DISPATCHED"), None)
        if existing_dispatch_evt:
            existing_dispatch_evt.title = "Dispatched via Courier"
            existing_dispatch_evt.description = f"Shipped via {payload.courier_name} (AWB: {payload.tracking_awb})"
            existing_dispatch_evt.location = payload.dispatch_location
        else:
            tracking_event = OrderTrackingEvent(
                order_id=order.id,
                status="DISPATCHED",
                title="Dispatched via Courier",
                description=f"Shipped via {payload.courier_name} (AWB: {payload.tracking_awb})",
                location=payload.dispatch_location,
            )
            db.add(tracking_event)
    else:
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

