"""
Admin Customer & User Management Endpoints
Enables admins to view all registered users, their lifetime metrics, order history, saved addresses, and manage roles & statuses.
"""

from datetime import datetime, timezone
from typing import Any, Dict, List, Optional
import uuid
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import func, or_, select, update
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload
from app.core.database import get_db
from app.core.dependencies import require_role
from app.core.security import get_password_hash
from app.models.coupon import LoyaltyLedger
from app.models.order import Order
from app.models.user import User, UserAddress, UserSession
from app.schemas.user import (
    AdminUserCreate,
    AdminUserDetail,
    AdminUserOrderBrief,
    AdminUserSummary,
    AdminUserUpdate,
    UserAddressOut,
)

router = APIRouter()


@router.get("/admin/users", summary="List All Users with Aggregated Order Metrics")
async def list_admin_users(
    search: Optional[str] = Query(None, description="Search by name, phone, or email"),
    role: Optional[str] = Query(None, description="customer, admin, vendor"),
    is_active: Optional[bool] = Query(None),
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=200),
    admin_user: User = Depends(require_role("admin", "vendor")),
    db: AsyncSession = Depends(get_db),
):
    stmt = (
        select(User)
        .options(
            selectinload(User.orders).selectinload(Order.items),
            selectinload(User.addresses),
        )
        .order_by(User.created_at.desc())
    )

    if role and role.strip().lower() != "all":
        stmt = stmt.where(User.role == role.strip().lower())

    if is_active is not None:
        stmt = stmt.where(User.is_active.is_(is_active))

    if search:
        term = f"%{search.strip()}%"
        stmt = stmt.where(
            or_(
                User.full_name.ilike(term),
                User.phone.ilike(term),
                User.email.ilike(term),
            )
        )

    result = await db.execute(stmt)
    all_users = result.scalars().all()

    # Calculate global stats across all users
    total_users_count = len(all_users)
    active_customers_count = sum(1 for u in all_users if u.role == "customer" and u.is_active)
    total_admins_count = sum(1 for u in all_users if u.role == "admin")
    total_revenue = 0.0
    total_orders_placed = 0

    paged_users = all_users[skip : skip + limit]
    user_summaries: List[Dict[str, Any]] = []

    for u in all_users:
        valid_orders = [o for o in u.orders if o.order_status not in ["CANCELLED", "REFUNDED"]]
        user_spent = sum(float(o.total_amount) for o in valid_orders)
        total_revenue += user_spent
        total_orders_placed += len(u.orders)

    for u in paged_users:
        valid_orders = [o for o in u.orders if o.order_status not in ["CANCELLED", "REFUNDED"]]
        user_spent = sum(float(o.total_amount) for o in valid_orders)
        last_order = max(u.orders, key=lambda o: o.created_at) if u.orders else None

        user_summaries.append(
            {
                "id": str(u.id),
                "full_name": u.full_name,
                "phone": u.phone,
                "email": u.email,
                "avatar_url": u.avatar_url,
                "role": u.role,
                "is_active": u.is_active,
                "is_verified": u.is_verified,
                "dietary_preference": u.dietary_preference,
                "newsletter_subscribed": u.newsletter_subscribed,
                "created_at": u.created_at.isoformat() if u.created_at else None,
                "updated_at": u.updated_at.isoformat() if u.updated_at else None,
                "total_orders": len(u.orders),
                "total_spent": round(user_spent, 2),
                "last_order_date": last_order.created_at.isoformat() if last_order and last_order.created_at else None,
                "addresses_count": len(u.addresses),
            }
        )

    return {
        "items": user_summaries,
        "total": total_users_count,
        "stats": {
            "total_users": total_users_count,
            "active_customers": active_customers_count,
            "total_admins": total_admins_count,
            "total_orders_placed": total_orders_placed,
            "total_revenue": round(total_revenue, 2),
        },
    }


@router.get("/admin/users/{user_id}", summary="Get Complete User Profile & Orders")
async def get_admin_user_detail(
    user_id: uuid.UUID,
    admin_user: User = Depends(require_role("admin", "vendor")),
    db: AsyncSession = Depends(get_db),
):
    stmt = (
        select(User)
        .where(User.id == user_id)
        .options(
            selectinload(User.addresses),
            selectinload(User.orders).selectinload(Order.items),
            selectinload(User.loyalty_entries),
        )
    )
    result = await db.execute(stmt)
    u = result.scalar_one_or_none()
    if not u:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found.")

    valid_orders = [o for o in u.orders if o.order_status not in ["CANCELLED", "REFUNDED"]]
    user_spent = sum(float(o.total_amount) for o in valid_orders)
    last_order = max(u.orders, key=lambda o: o.created_at) if u.orders else None

    # Calculate loyalty balance
    loyalty_balance = 0
    if u.loyalty_entries:
        # Latest entry balance_after or sum of points
        sorted_entries = sorted(u.loyalty_entries, key=lambda e: e.created_at, reverse=True)
        loyalty_balance = sorted_entries[0].balance_after if sorted_entries else 0

    order_briefs = []
    for o in sorted(u.orders, key=lambda x: x.created_at, reverse=True):
        preview_names = [item.product_name for item in o.items[:3]]
        if len(o.items) > 3:
            preview_names.append(f"+{len(o.items) - 3} more")
        order_briefs.append(
            {
                "id": str(o.id),
                "order_number": o.order_number,
                "total_amount": float(o.total_amount),
                "order_status": o.order_status,
                "payment_method": o.payment_method,
                "items_count": len(o.items),
                "items_preview": preview_names,
                "courier_name": o.courier_name,
                "tracking_awb": o.tracking_awb,
                "created_at": o.created_at.isoformat() if o.created_at else None,
            }
        )

    address_list = []
    for a in u.addresses:
        address_list.append(
            {
                "id": str(a.id),
                "label": a.label,
                "recipient_name": a.recipient_name,
                "recipient_phone": a.recipient_phone,
                "flat_no": a.flat_no,
                "street": a.street,
                "landmark": a.landmark,
                "city": a.city,
                "state": a.state,
                "pincode": a.pincode,
                "is_default_shipping": a.is_default_shipping,
                "is_default_billing": a.is_default_billing,
                "delivery_instructions": a.delivery_instructions,
                "created_at": a.created_at.isoformat() if a.created_at else None,
            }
        )

    return {
        "id": str(u.id),
        "full_name": u.full_name,
        "phone": u.phone,
        "email": u.email,
        "avatar_url": u.avatar_url,
        "role": u.role,
        "is_active": u.is_active,
        "is_verified": u.is_verified,
        "dietary_preference": u.dietary_preference,
        "newsletter_subscribed": u.newsletter_subscribed,
        "created_at": u.created_at.isoformat() if u.created_at else None,
        "updated_at": u.updated_at.isoformat() if u.updated_at else None,
        "total_orders": len(u.orders),
        "total_spent": round(user_spent, 2),
        "last_order_date": last_order.created_at.isoformat() if last_order and last_order.created_at else None,
        "addresses_count": len(u.addresses),
        "loyalty_balance": loyalty_balance,
        "addresses": address_list,
        "orders": order_briefs,
    }


@router.post("/admin/users", summary="Create New User / Staff / Customer")
async def create_admin_user(
    payload: AdminUserCreate,
    admin_user: User = Depends(require_role("admin")),
    db: AsyncSession = Depends(get_db),
):
    if payload.phone:
        existing_phone = (
            await db.execute(select(User).where(User.phone == payload.phone.strip()))
        ).scalar_one_or_none()
        if existing_phone:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Phone number {payload.phone} is already registered.",
            )

    if payload.email:
        existing_email = (
            await db.execute(select(User).where(User.email == payload.email.strip().lower()))
        ).scalar_one_or_none()
        if existing_email:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Email {payload.email} is already registered.",
            )

    pwd_hash = get_password_hash(payload.password) if payload.password else None

    new_user = User(
        full_name=payload.full_name.strip(),
        phone=payload.phone.strip() if payload.phone else None,
        email=payload.email.strip().lower() if payload.email else None,
        password_hash=pwd_hash,
        role=payload.role.strip().lower(),
        is_active=payload.is_active,
        is_verified=payload.is_verified,
        dietary_preference=payload.dietary_preference,
        newsletter_subscribed=payload.newsletter_subscribed,
    )
    db.add(new_user)
    await db.commit()
    await db.refresh(new_user)

    return {
        "success": True,
        "message": f"User {new_user.full_name} created successfully.",
        "user": {
            "id": str(new_user.id),
            "full_name": new_user.full_name,
            "phone": new_user.phone,
            "email": new_user.email,
            "role": new_user.role,
            "is_active": new_user.is_active,
        },
    }


@router.put("/admin/users/{user_id}", summary="Update User Details & Permissions")
async def update_admin_user(
    user_id: uuid.UUID,
    payload: AdminUserUpdate,
    admin_user: User = Depends(require_role("admin")),
    db: AsyncSession = Depends(get_db),
):
    stmt = select(User).where(User.id == user_id)
    result = await db.execute(stmt)
    u = result.scalar_one_or_none()
    if not u:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found.")

    if payload.phone is not None and payload.phone.strip() != (u.phone or ""):
        clean_phone = payload.phone.strip()
        if clean_phone:
            dup = (
                await db.execute(select(User).where(User.phone == clean_phone, User.id != user_id))
            ).scalar_one_or_none()
            if dup:
                raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Phone already in use.")
            u.phone = clean_phone
        else:
            u.phone = None

    if payload.email is not None and payload.email.strip().lower() != (u.email or "").lower():
        clean_email = payload.email.strip().lower()
        if clean_email:
            dup = (
                await db.execute(select(User).where(User.email == clean_email, User.id != user_id))
            ).scalar_one_or_none()
            if dup:
                raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already in use.")
            u.email = clean_email
        else:
            u.email = None

    if payload.full_name is not None:
        u.full_name = payload.full_name.strip()
    if payload.role is not None:
        u.role = payload.role.strip().lower()
    if payload.is_active is not None:
        u.is_active = payload.is_active
        if not u.is_active:
            await db.execute(
                update(UserSession)
                .where(UserSession.user_id == u.id)
                .values(is_revoked=True)
            )
    if payload.is_verified is not None:
        u.is_verified = payload.is_verified
    if payload.dietary_preference is not None:
        u.dietary_preference = payload.dietary_preference
    if payload.newsletter_subscribed is not None:
        u.newsletter_subscribed = payload.newsletter_subscribed
    if payload.password:
        u.password_hash = get_password_hash(payload.password)

    u.updated_at = datetime.now(timezone.utc)
    await db.commit()
    await db.refresh(u)

    return {"success": True, "message": f"User {u.full_name} updated successfully."}


@router.patch("/admin/users/{user_id}/status", summary="Toggle User Active Status")
async def toggle_user_active_status(
    user_id: uuid.UUID,
    admin_user: User = Depends(require_role("admin")),
    db: AsyncSession = Depends(get_db),
):
    stmt = select(User).where(User.id == user_id)
    result = await db.execute(stmt)
    u = result.scalar_one_or_none()
    if not u:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found.")

    if u.email == "meriwebdunia@gmail.com":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Super Admin account cannot be deactivated.",
        )

    u.is_active = not u.is_active
    u.updated_at = datetime.now(timezone.utc)

    if not u.is_active:
        # Revoke all active sessions so suspended user is immediately signed out
        await db.execute(
            update(UserSession)
            .where(UserSession.user_id == u.id)
            .values(is_revoked=True)
        )

    await db.commit()

    return {
        "success": True,
        "is_active": u.is_active,
        "message": f"User status set to {'Active' if u.is_active else 'Suspended'}.",
    }


@router.delete("/admin/users/{user_id}", summary="Delete User Account")
async def delete_admin_user(
    user_id: uuid.UUID,
    admin_user: User = Depends(require_role("admin")),
    db: AsyncSession = Depends(get_db),
):
    stmt = select(User).where(User.id == user_id)
    result = await db.execute(stmt)
    u = result.scalar_one_or_none()
    if not u:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found.")

    if u.id == admin_user.id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="You cannot delete your own active administrator account.",
        )

    if u.email == "meriwebdunia@gmail.com":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Super Admin account cannot be deleted.",
        )

    await db.delete(u)
    await db.commit()

    return {"success": True, "message": f"User {u.full_name} deleted successfully."}
