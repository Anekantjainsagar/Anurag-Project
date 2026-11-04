"""
Checkout, Order Placement & Tracking Endpoints
Supports Pay on Delivery (COD), order tracking timeline, and coupon validation.
"""

from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload
from app.core.database import get_db
from app.core.dependencies import get_current_user, get_optional_user
from app.models.order import Order
from app.models.user import User
from app.schemas.coupon import CouponValidateRequest, CouponValidateResponse
from app.schemas.order import OrderCreate, OrderOut, OrderTrackingEventOut
from app.services.coupon_service import CouponService
from app.services.order_service import OrderService

router = APIRouter()


@router.post("/coupons/validate", response_model=CouponValidateResponse, summary="Validate Coupon Code")
async def validate_coupon(
    payload: CouponValidateRequest,
    current_user: Optional[User] = Depends(get_optional_user),
    db: AsyncSession = Depends(get_db),
):
    """
    Validates coupon rules (HARVEST10) and enforces cookie & phone differentiator limits.
    """
    return await CouponService.validate_coupon(
        db=db,
        code=payload.code,
        subtotal=payload.subtotal,
        device_token=payload.device_token,
        customer_phone=payload.customer_phone,
        user_id=current_user.id if current_user else None,
    )


@router.post("/orders/checkout", response_model=OrderOut, summary="Place Order (Pay on Delivery / COD)")
async def checkout_order(
    payload: OrderCreate,
    current_user: Optional[User] = Depends(get_optional_user),
    db: AsyncSession = Depends(get_db),
):
    """
    Processes customer checkout:
    - Creates order record & line items
    - Validates and applies coupon discount
    - Dispatches SMTP confirmation emails to Customer and Vendor (Anurag Jain)
    - Records initial tracking milestone
    """
    try:
        order = await OrderService.place_order(
            db=db,
            payload=payload,
            user_id=current_user.id if current_user else None,
        )
        # Reload relationships
        stmt = (
            select(Order)
            .where(Order.id == order.id)
            .options(
                selectinload(Order.items),
                selectinload(Order.tracking_events),
            )
        )
        res = await db.execute(stmt)
        full_order = res.scalar_one()
        return full_order
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Checkout failed: {e}")


@router.get("/orders/track/{order_number}", response_model=OrderOut, summary="Track Order by ID")
async def track_order(order_number: str, db: AsyncSession = Depends(get_db)):
    """
    Retrieves real-time milestone timeline and order details for TrackOrderModal.
    """
    clean_num = order_number.strip().upper()
    stmt = (
        select(Order)
        .where(Order.order_number == clean_num)
        .options(
            selectinload(Order.items),
            selectinload(Order.tracking_events),
        )
    )
    result = await db.execute(stmt)
    order = result.scalar_one_or_none()
    if not order:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Order '{clean_num}' not found.")

    return order


@router.get("/orders/my-orders", response_model=List[OrderOut], summary="List Customer Order History")
async def list_my_orders(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Returns all past orders placed by the authenticated customer."""
    stmt = (
        select(Order)
        .where(Order.user_id == current_user.id)
        .options(
            selectinload(Order.items),
            selectinload(Order.tracking_events),
        )
        .order_by(Order.created_at.desc())
    )
    result = await db.execute(stmt)
    return result.scalars().all()
