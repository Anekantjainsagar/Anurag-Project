"""
Coupon & Discount Validation Service
Enforces cookie differentiator, single-use per browser/user, and discount math.
"""

from datetime import datetime, timezone
from decimal import Decimal
from typing import Optional
import uuid
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.coupon import Coupon, CouponRedemption
from app.schemas.coupon import CouponValidateResponse


class CouponService:
    @staticmethod
    async def validate_coupon(
        db: AsyncSession,
        code: str,
        subtotal: Decimal,
        device_token: Optional[str] = None,
        customer_phone: Optional[str] = None,
        user_id: Optional[uuid.UUID] = None,
    ) -> CouponValidateResponse:
        """
        Validates coupon availability, expiration, subtotal thresholds,
        and single-use limits via device token and customer phone.
        """
        clean_code = code.strip().upper()
        result = await db.execute(select(Coupon).where(Coupon.code == clean_code, Coupon.is_active.is_(True)))
        coupon = result.scalar_one_or_none()

        if not coupon:
            return CouponValidateResponse(
                valid=False,
                code=clean_code,
                discount_amount=Decimal("0.00"),
                new_total=subtotal,
                message=f"Coupon code '{clean_code}' is invalid or has expired.",
            )

        now = datetime.now(timezone.utc)
        if coupon.valid_until and coupon.valid_until < now:
            return CouponValidateResponse(
                valid=False,
                code=clean_code,
                discount_amount=Decimal("0.00"),
                new_total=subtotal,
                message=f"Coupon code '{clean_code}' expired on {coupon.valid_until.strftime('%d %b %Y')}.",
            )

        if subtotal < coupon.min_order_amount:
            return CouponValidateResponse(
                valid=False,
                code=clean_code,
                discount_amount=Decimal("0.00"),
                new_total=subtotal,
                message=f"Coupon requires a minimum order subtotal of ₹{coupon.min_order_amount:.2f}.",
            )

        # Check redemption history (by device token, phone, or user_id)
        if coupon.usage_limit_per_user == 1:
            conditions = []
            if device_token:
                conditions.append(CouponRedemption.device_token == device_token)
            if customer_phone:
                conditions.append(CouponRedemption.customer_phone == customer_phone)
            if user_id:
                conditions.append(CouponRedemption.user_id == user_id)

            if conditions:
                from sqlalchemy import or_
                existing_res = await db.execute(
                    select(CouponRedemption).where(
                        CouponRedemption.coupon_id == coupon.id,
                        or_(*conditions),
                    )
                )
                existing = existing_res.scalar_one_or_none()
                if existing:
                    return CouponValidateResponse(
                        valid=False,
                        code=clean_code,
                        discount_amount=Decimal("0.00"),
                        new_total=subtotal,
                        message=f"First-order coupon '{clean_code}' has already been redeemed on this browser or phone number.",
                    )

        # Calculate discount amount
        if coupon.discount_type == "percentage":
            discount = (subtotal * coupon.discount_value) / Decimal("100.00")
            if coupon.max_discount and discount > coupon.max_discount:
                discount = coupon.max_discount
        else:
            discount = coupon.discount_value

        discount = round(discount, 2)
        new_total = max(Decimal("0.00"), subtotal - discount)

        return CouponValidateResponse(
            valid=True,
            code=clean_code,
            discount_amount=discount,
            new_total=new_total,
            message=f"Coupon '{clean_code}' applied! You saved ₹{discount:.2f}.",
        )

    @staticmethod
    async def record_redemption(
        db: AsyncSession,
        coupon_id: uuid.UUID,
        order_id: uuid.UUID,
        device_token: str,
        customer_phone: str,
        user_id: Optional[uuid.UUID] = None,
    ) -> CouponRedemption:
        """Records coupon usage to prevent duplicate future redemptions."""
        redemption = CouponRedemption(
            coupon_id=coupon_id,
            order_id=order_id,
            device_token=device_token or "BROWSER-UNKNOWN",
            customer_phone=customer_phone,
            user_id=user_id,
        )
        db.add(redemption)
        await db.commit()
        return redemption

