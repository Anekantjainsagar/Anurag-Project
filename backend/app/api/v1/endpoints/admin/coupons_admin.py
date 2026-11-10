"""
Admin Coupons & Promotional Offers Management
Allows ONAAR store operators to create, update, and manage cart discounts,
threshold offers (e.g. ₹100 off over ₹2,000), and first-order promotions.
"""

from datetime import datetime, timedelta, timezone
from decimal import Decimal
from typing import Any, Dict, List
import uuid
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.core.dependencies import get_current_admin_user
from app.models.coupon import Coupon, CouponRedemption
from app.models.user import User
from app.schemas.coupon import CouponCreate, CouponOut, CouponUpdate

router = APIRouter()


@router.get("/admin/coupons", summary="List All Store Offers & Coupons")
async def list_admin_coupons(
    current_admin: User = Depends(get_current_admin_user),
    db: AsyncSession = Depends(get_db),
):
    """Returns all promotional offers with active status, redemption counts, and criteria."""
    stmt = (
        select(
            Coupon,
            func.count(CouponRedemption.id).label("redemption_count"),
        )
        .outerjoin(CouponRedemption, Coupon.id == CouponRedemption.coupon_id)
        .group_by(Coupon.id)
        .order_by(Coupon.created_at.desc())
    )
    res = await db.execute(stmt)
    rows = res.all()

    coupons_data = []
    now = datetime.now(timezone.utc)
    for c, r_count in rows:
        days_remaining = None
        if c.valid_until:
            vu = c.valid_until if c.valid_until.tzinfo else c.valid_until.replace(tzinfo=timezone.utc)
            delta = vu - now
            days_remaining = max(0, delta.days) if delta.total_seconds() > 0 else 0

        coupons_data.append({
            "id": str(c.id),
            "code": c.code,
            "description": c.description,
            "discount_type": c.discount_type,
            "discount_value": float(c.discount_value),
            "min_order_amount": float(c.min_order_amount),
            "max_discount": float(c.max_discount) if c.max_discount else None,
            "is_first_order_only": c.is_first_order_only,
            "usage_limit_per_user": c.usage_limit_per_user,
            "valid_until": c.valid_until.isoformat() if c.valid_until else None,
            "days_remaining": days_remaining,
            "is_active": c.is_active,
            "redemption_count": r_count,
            "created_at": c.created_at.isoformat() if c.created_at else None,
        })
    return coupons_data


@router.post("/admin/coupons", summary="Create New Promotional Offer")
async def create_admin_coupon(
    payload: CouponCreate,
    current_admin: User = Depends(get_current_admin_user),
    db: AsyncSession = Depends(get_db),
):
    """Creates a new promotional offer or coupon code."""
    clean_code = payload.code.strip().upper()
    if not clean_code or len(clean_code) < 3:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Coupon code must be at least 3 characters long (e.g. ONAAR100).",
        )

    # Check for existing duplicate code
    existing_res = await db.execute(select(Coupon).where(Coupon.code == clean_code))
    if existing_res.scalar_one_or_none():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Coupon code '{clean_code}' already exists. Please choose another code.",
        )

    if payload.discount_type not in ["percentage", "fixed"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Discount type must be either 'percentage' or 'fixed'.",
        )

    if payload.discount_value <= Decimal("0.00"):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Discount value must be greater than 0.",
        )

    if payload.discount_type == "percentage" and payload.discount_value > Decimal("100.00"):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Percentage discount cannot exceed 100%.",
        )

    valid_until = payload.valid_until
    if payload.validity_days and payload.validity_days > 0:
        valid_until = datetime.now(timezone.utc) + timedelta(days=payload.validity_days)

    new_coupon = Coupon(
        code=clean_code,
        description=payload.description.strip(),
        discount_type=payload.discount_type,
        discount_value=payload.discount_value,
        min_order_amount=payload.min_order_amount,
        max_discount=payload.max_discount,
        is_first_order_only=payload.is_first_order_only,
        usage_limit_per_user=payload.usage_limit_per_user,
        valid_until=valid_until,
        is_active=payload.is_active,
    )
    db.add(new_coupon)
    await db.commit()
    await db.refresh(new_coupon)

    return {
        "success": True,
        "message": f"Offer '{new_coupon.code}' created successfully.",
        "coupon": {
            "id": str(new_coupon.id),
            "code": new_coupon.code,
            "description": new_coupon.description,
            "discount_type": new_coupon.discount_type,
            "discount_value": float(new_coupon.discount_value),
            "min_order_amount": float(new_coupon.min_order_amount),
            "is_first_order_only": new_coupon.is_first_order_only,
            "is_active": new_coupon.is_active,
        },
    }


@router.put("/admin/coupons/{coupon_id}", summary="Update Promotional Offer")
async def update_admin_coupon(
    coupon_id: uuid.UUID,
    payload: CouponUpdate,
    current_admin: User = Depends(get_current_admin_user),
    db: AsyncSession = Depends(get_db),
):
    """Updates an existing promotional offer."""
    res = await db.execute(select(Coupon).where(Coupon.id == coupon_id))
    coupon = res.scalar_one_or_none()
    if not coupon:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Coupon not found.")

    if payload.code is not None:
        clean_code = payload.code.strip().upper()
        if clean_code != coupon.code:
            existing_res = await db.execute(select(Coupon).where(Coupon.code == clean_code))
            if existing_res.scalar_one_or_none():
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail=f"Coupon code '{clean_code}' already in use.",
                )
            coupon.code = clean_code

    if payload.description is not None:
        coupon.description = payload.description.strip()
    if payload.discount_type is not None:
        coupon.discount_type = payload.discount_type
    if payload.discount_value is not None:
        coupon.discount_value = payload.discount_value
    if payload.min_order_amount is not None:
        coupon.min_order_amount = payload.min_order_amount
    if payload.max_discount is not None:
        coupon.max_discount = payload.max_discount
    if payload.is_first_order_only is not None:
        coupon.is_first_order_only = payload.is_first_order_only
    if payload.usage_limit_per_user is not None:
        coupon.usage_limit_per_user = payload.usage_limit_per_user
    if payload.validity_days is not None:
        if payload.validity_days > 0:
            coupon.valid_until = datetime.now(timezone.utc) + timedelta(days=payload.validity_days)
        else:
            coupon.valid_until = None
    elif payload.valid_until is not None:
        coupon.valid_until = payload.valid_until
    if payload.is_active is not None:
        coupon.is_active = payload.is_active

    await db.commit()
    await db.refresh(coupon)
    return {"success": True, "message": f"Offer '{coupon.code}' updated successfully."}


@router.patch("/admin/coupons/{coupon_id}/toggle", summary="Toggle Offer Active State")
async def toggle_admin_coupon(
    coupon_id: uuid.UUID,
    current_admin: User = Depends(get_current_admin_user),
    db: AsyncSession = Depends(get_db),
):
    """Toggles active/inactive state of a promotional offer."""
    res = await db.execute(select(Coupon).where(Coupon.id == coupon_id))
    coupon = res.scalar_one_or_none()
    if not coupon:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Coupon not found.")

    coupon.is_active = not coupon.is_active
    await db.commit()
    return {
        "success": True,
        "is_active": coupon.is_active,
        "message": f"Offer '{coupon.code}' is now {'Active' if coupon.is_active else 'Disabled'}.",
    }


@router.delete("/admin/coupons/{coupon_id}", summary="Delete Promotional Offer")
async def delete_admin_coupon(
    coupon_id: uuid.UUID,
    current_admin: User = Depends(get_current_admin_user),
    db: AsyncSession = Depends(get_db),
):
    """Deletes a promotional offer."""
    res = await db.execute(select(Coupon).where(Coupon.id == coupon_id))
    coupon = res.scalar_one_or_none()
    if not coupon:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Coupon not found.")

    await db.delete(coupon)
    await db.commit()
    return {"success": True, "message": f"Offer '{coupon.code}' deleted successfully."}
