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
from app.models.coupon import Coupon
from app.models.order import Order
from app.models.user import User
from app.schemas.coupon import CouponOut, CouponValidateRequest, CouponValidateResponse
from app.schemas.order import OrderCreate, OrderOut, OrderTrackingEventOut
from app.services.coupon_service import CouponService
from app.services.order_service import OrderService

router = APIRouter()


@router.get("/coupons/active", response_model=List[CouponOut], summary="List Active Promotional Offers")
async def list_active_coupons(db: AsyncSession = Depends(get_db)):
    """Returns active promotional discount offers for storefront checkout and marketing."""
    res = await db.execute(
        select(Coupon).where(Coupon.is_active.is_(True)).order_by(Coupon.min_order_amount.asc())
    )
    return res.scalars().all()


@router.post("/coupons/validate", response_model=CouponValidateResponse, summary="Validate Coupon Code")
async def validate_coupon(
    payload: CouponValidateRequest,
    current_user: Optional[User] = Depends(get_optional_user),
    db: AsyncSession = Depends(get_db),
):
    """
    Validates coupon rules (HARVEST10) and enforces cookie, phone & email single-use limits.
    """
    return await CouponService.validate_coupon(
        db=db,
        code=payload.code,
        subtotal=payload.subtotal,
        device_token=payload.device_token,
        customer_phone=payload.customer_phone,
        customer_email=payload.customer_email,
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
    - Enforces authentication: User must be signed in to place an order
    - Validates essential contact & delivery fields (name, email, phone, street, pincode)
    - Validates and applies coupon discount
    - Dispatches SMTP confirmation emails to Customer and Vendor (Anurag Jain)
    - Records initial tracking milestone
    """
    # 1. Require user authentication
    if not current_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication required. Please log in or register to place your order.",
        )

    # 2. Strict validation of basic customer and address information
    if not payload.customer_name or len(payload.customer_name.strip()) < 2:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Full name is required.")
    if not payload.customer_email or "@" not in str(payload.customer_email):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="A valid email address is required for order confirmation.")
    if not payload.customer_phone or len(payload.customer_phone.strip()) < 10:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="A valid 10-digit phone number is required.")
    if not payload.shipping_flat_no or not payload.shipping_flat_no.strip():
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Flat / House / Apartment number is required.")
    if not payload.shipping_street or not payload.shipping_street.strip():
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Street address / locality is required.")
    if not payload.shipping_city or not payload.shipping_city.strip():
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="City is required.")
    if not payload.shipping_state or not payload.shipping_state.strip():
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="State is required.")
    if not payload.shipping_pincode or len(payload.shipping_pincode.strip()) < 6:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="A valid 6-digit delivery PIN code is required.")
    if not payload.items or len(payload.items) == 0:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Your cart is empty. Add items before placing an order.")

    try:
        order = await OrderService.place_order(
            db=db,
            payload=payload,
            user_id=current_user.id,
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

