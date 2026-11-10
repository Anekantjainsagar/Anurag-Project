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


"""
Coupon & Discount Validation Service
Enforces cookie differentiator, single-use per email/phone/browser/user, and discount math.
"""

from datetime import datetime, timezone
from decimal import Decimal
import re
from typing import Optional
import uuid
from sqlalchemy import or_, select
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.coupon import Coupon, CouponRedemption
from app.models.order import Order
from app.schemas.coupon import CouponValidateResponse


def extract_phone_digits(phone: Optional[str]) -> Optional[str]:
    """Extracts the canonical last 10 digits for phone matching across India."""
    if not phone:
        return None
    digits = re.sub(r"\D", "", phone)
    if len(digits) >= 10:
        return digits[-10:]
    return digits or None


def clean_email_str(email: Optional[str]) -> Optional[str]:
    """Trims and lowercases email address."""
    if not email:
        return None
    val = email.strip().lower()
    return val if "@" in val else None


class CouponService:
    @staticmethod
    async def validate_coupon(
        db: AsyncSession,
        code: str,
        subtotal: Decimal,
        device_token: Optional[str] = None,
        customer_phone: Optional[str] = None,
        customer_email: Optional[str] = None,
        user_id: Optional[uuid.UUID] = None,
    ) -> CouponValidateResponse:
        """
        Validates coupon availability, expiration, subtotal thresholds,
        and single-use limits via email, phone, device token, and user ID.
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
            remaining = coupon.min_order_amount - subtotal
            return CouponValidateResponse(
                valid=False,
                code=clean_code,
                discount_amount=Decimal("0.00"),
                new_total=subtotal,
                message=f"Coupon '{clean_code}' requires a minimum cart subtotal of ₹{coupon.min_order_amount:.2f}. Add ₹{remaining:.2f} more to unlock this offer.",
            )

        clean_email = clean_email_str(customer_email)
        phone_10 = extract_phone_digits(customer_phone)

        # 1. Strictly First-Order Check: if user has any prior completed/confirmed order, offer is not applicable
        if coupon.is_first_order_only:
            first_order_conditions = []
            if clean_email:
                first_order_conditions.append(Order.customer_email.ilike(clean_email))
            if phone_10:
                first_order_conditions.append(Order.customer_phone.like(f"%{phone_10}%"))
            if user_id:
                first_order_conditions.append(Order.user_id == user_id)

            if first_order_conditions:
                prior_any_res = await db.execute(
                    select(Order).where(
                        Order.order_status != "CANCELLED",
                        or_(*first_order_conditions),
                    )
                )
                prior_any = prior_any_res.scalar_one_or_none()
                if prior_any:
                    return CouponValidateResponse(
                        valid=False,
                        code=clean_code,
                        discount_amount=Decimal("0.00"),
                        new_total=subtotal,
                        message=f"Offer '{clean_code}' is applicable only on your very first order. You already placed Order #{prior_any.order_number}.",
                    )

        # 2. Check single-use redemption history (by email, phone, device token, or user_id)
        if coupon.usage_limit_per_user == 1:
            redemption_conditions = []
            if device_token and device_token.strip():
                redemption_conditions.append(CouponRedemption.device_token == device_token.strip())
            if clean_email:
                redemption_conditions.append(CouponRedemption.customer_email == clean_email)
            if customer_phone:
                redemption_conditions.append(CouponRedemption.customer_phone == customer_phone.strip())
            if phone_10:
                redemption_conditions.append(CouponRedemption.customer_phone.like(f"%{phone_10}%"))
            if user_id:
                redemption_conditions.append(CouponRedemption.user_id == user_id)

            if redemption_conditions:
                existing_res = await db.execute(
                    select(CouponRedemption).where(
                        CouponRedemption.coupon_id == coupon.id,
                        or_(*redemption_conditions),
                    )
                )
                existing = existing_res.scalar_one_or_none()
                if existing:
                    return CouponValidateResponse(
                        valid=False,
                        code=clean_code,
                        discount_amount=Decimal("0.00"),
                        new_total=subtotal,
                        message=f"First-order coupon '{clean_code}' has already been redeemed for this email address, phone number, or browser device.",
                    )

            # Check existing completed orders with this email/phone where a discount was already availed
            order_conditions = []
            if clean_email:
                order_conditions.append(Order.customer_email.ilike(clean_email))
            if phone_10:
                order_conditions.append(Order.customer_phone.like(f"%{phone_10}%"))
            if user_id:
                order_conditions.append(Order.user_id == user_id)

            if order_conditions:
                prior_order_res = await db.execute(
                    select(Order).where(
                        Order.discount_amount > 0,
                        Order.order_status != "CANCELLED",
                        or_(*order_conditions),
                    )
                )
                prior_order = prior_order_res.scalar_one_or_none()
                if prior_order:
                    return CouponValidateResponse(
                        valid=False,
                        code=clean_code,
                        discount_amount=Decimal("0.00"),
                        new_total=subtotal,
                        message=f"First-order discount '{clean_code}' was already availed on prior Order #{prior_order.order_number}. Valid for first-time orders only.",
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
        customer_email: Optional[str] = None,
        user_id: Optional[uuid.UUID] = None,
    ) -> CouponRedemption:
        """Records coupon usage to prevent duplicate future redemptions."""
        clean_email = clean_email_str(customer_email)
        redemption = CouponRedemption(
            coupon_id=coupon_id,
            order_id=order_id,
            device_token=device_token or "BROWSER-UNKNOWN",
            customer_phone=customer_phone,
            customer_email=clean_email,
            user_id=user_id,
        )
        db.add(redemption)
        await db.commit()
        return redemption

