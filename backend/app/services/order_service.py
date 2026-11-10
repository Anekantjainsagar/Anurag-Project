"""
Order Orchestration & Fulfillment Service
Coordinates order placement, milestone logging, and email triggers.
"""

from datetime import datetime, timezone
from decimal import Decimal
import random
from typing import List, Optional
import uuid
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.config import settings
from app.models.catalog import Product, ProductVariant
from app.models.order import Order, OrderItem, OrderTrackingEvent
from app.schemas.order import OrderCreate
from app.services.coupon_service import CouponService
from app.services.email_service import EmailService


class OrderService:
    @staticmethod
    def generate_order_number() -> str:
        """Generates customer-facing order reference (e.g. YB-20261104-8921)."""
        date_str = datetime.now(timezone.utc).strftime("%Y%m%d")
        rand_suffix = f"{random.randint(1000, 9999)}"
        return f"YB-{date_str}-{rand_suffix}"

    @classmethod
    async def place_order(
        cls,
        db: AsyncSession,
        payload: OrderCreate,
        user_id: Optional[uuid.UUID] = None,
    ) -> Order:
        """
        Processes a complete checkout transaction:
        1. Resolves item prices & weights from DB
        2. Calculates subtotal and applies coupon (with differentiator check)
        3. Persists Order, OrderItems, and Tracking Event
        4. Triggers asynchronous SMTP confirmation emails (Customer + Vendor)
        """
        if not payload.items:
            raise ValueError("Order must contain at least one item.")

        subtotal = Decimal("0.00")
        line_items_data = []

        # 0. If user_id not explicitly provided, auto-link by matching customer phone or email
        if not user_id:
            from app.models.user import User
            if payload.customer_phone:
                clean_phone = payload.customer_phone.replace(" ", "")
                res_u = await db.execute(select(User).where(User.phone == clean_phone))
                matched_user = res_u.scalar_one_or_none()
                if not matched_user and not clean_phone.startswith("+91"):
                    res_u_alt = await db.execute(select(User).where(User.phone == f"+91{clean_phone}"))
                    matched_user = res_u_alt.scalar_one_or_none()
                if matched_user:
                    user_id = matched_user.id
            if not user_id and payload.customer_email:
                res_u_email = await db.execute(select(User).where(User.email == str(payload.customer_email)))
                matched_user_email = res_u_email.scalar_one_or_none()
                if matched_user_email:
                    user_id = matched_user_email.id

        # 1. Validate items and lock prices
        for item in payload.items:
            variant = None
            product = None
            if item.variant_id:
                res_v = await db.execute(select(ProductVariant).where(ProductVariant.id == item.variant_id))
                variant = res_v.scalar_one_or_none()

            if item.product_id:
                res_p = await db.execute(select(Product).where(Product.id == item.product_id))
                product = res_p.scalar_one_or_none()

            line_price = (
                variant.price
                if variant
                else (Decimal(str(item.unit_price)) if item.unit_price is not None else Decimal("100.00"))
            )
            product_name = (
                product.name
                if product
                else (item.product_name or "Organic Farm Harvest")
            )
            weight_label = (
                variant.weight_label
                if variant
                else (item.weight_label or item.packaging_size or "Standard Pack")
            )
            line_total = line_price * item.quantity
            subtotal += line_total

            line_items_data.append({
                "product_id": product.id if product else item.product_id,
                "variant_id": variant.id if variant else None,
                "product_name": product_name,
                "weight_label": weight_label,
                "unit_price": line_price,
                "quantity": item.quantity,
                "line_total": line_total,
            })

        # 2. Shipping calculation: Pull dynamic settings from DB SiteSetting
        from app.models.settings import SiteSetting
        st_res = await db.execute(select(SiteSetting).where(SiteSetting.key == "shipping_policy"))
        st_obj = st_res.scalar_one_or_none()
        shipping_policy = st_obj.value if st_obj and isinstance(st_obj.value, dict) else {}
        free_thresh = Decimal(str(shipping_policy.get("free_shipping_threshold", 499)))
        std_fee = Decimal(str(shipping_policy.get("standard_shipping_fee", 49)))

        shipping_fee = Decimal("0.00") if subtotal >= free_thresh else std_fee

        # 3. Coupon discount
        discount_amount = Decimal("0.00")
        applied_coupon_id = None

        if payload.coupon_code:
            coupon_res = await CouponService.validate_coupon(
                db=db,
                code=payload.coupon_code,
                subtotal=subtotal,
                device_token=payload.device_token,
                customer_phone=payload.customer_phone,
                customer_email=str(payload.customer_email),
                user_id=user_id,
            )
            if not coupon_res.valid:
                from fastapi import HTTPException, status
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail=coupon_res.message,
                )

            discount_amount = coupon_res.discount_amount
            from app.models.coupon import Coupon
            c_res = await db.execute(select(Coupon).where(Coupon.code == payload.coupon_code.strip().upper()))
            c_obj = c_res.scalar_one_or_none()
            if c_obj:
                applied_coupon_id = c_obj.id

        total_amount = max(Decimal("0.00"), subtotal + shipping_fee - discount_amount)
        order_num = cls.generate_order_number()

        # 4. Create Order instance
        order = Order(
            order_number=order_num,
            user_id=user_id,
            customer_name=payload.customer_name,
            customer_phone=payload.customer_phone,
            customer_email=str(payload.customer_email),
            shipping_flat_no=payload.shipping_flat_no,
            shipping_street=payload.shipping_street,
            shipping_landmark=payload.shipping_landmark,
            shipping_city=payload.shipping_city,
            shipping_state=payload.shipping_state,
            shipping_pincode=payload.shipping_pincode,
            order_notes=payload.order_notes,
            subtotal=subtotal,
            shipping_fee=shipping_fee,
            discount_amount=discount_amount,
            total_amount=total_amount,
            payment_method="COD_VENDOR_CONTACT",
            order_status="PENDING_VERIFICATION",
        )
        db.add(order)
        await db.flush()  # populate order.id

        # 5. Create OrderItems
        items_summary_lines = []
        for d in line_items_data:
            oi = OrderItem(
                order_id=order.id,
                product_id=d["product_id"],
                variant_id=d["variant_id"],
                product_name=d["product_name"],
                weight_label=d["weight_label"],
                unit_price=d["unit_price"],
                quantity=d["quantity"],
                line_total=d["line_total"],
            )
            db.add(oi)
            items_summary_lines.append(f"{d['product_name']} ({d['weight_label']}) x {d['quantity']} = ₹{d['line_total']:.2f}")

        # 6. Initial tracking event
        initial_event = OrderTrackingEvent(
            order_id=order.id,
            status="PENDING_VERIFICATION",
            title="Order Placed",
            description="Order received under Pay on Delivery. Vendor verification pending.",
            location="Indore Logistics Center",
        )
        db.add(initial_event)

        # 7. Record coupon redemption if applied
        if applied_coupon_id:
            await CouponService.record_redemption(
                db=db,
                coupon_id=applied_coupon_id,
                order_id=order.id,
                device_token=payload.device_token or "BROWSER-GUEST",
                customer_phone=payload.customer_phone,
                customer_email=str(payload.customer_email),
                user_id=user_id,
            )

        await db.commit()
        await db.refresh(order)

        # 8. Asynchronously trigger emails
        formatted_items_text = "\n".join(items_summary_lines)
        full_address = f"{order.shipping_flat_no}, {order.shipping_street}, {order.shipping_city}, {order.shipping_state} - {order.shipping_pincode}"
        email_ctx = {
            "order_number": order.order_number,
            "order_date": datetime.now(timezone.utc).strftime("%d %b %Y, %I:%M %p"),
            "customer_name": order.customer_name,
            "customer_phone": order.customer_phone,
            "customer_email": order.customer_email,
            "delivery_address": full_address,
            "order_notes": order.order_notes or "None",
            "order_items": formatted_items_text,
            "subtotal": f"{order.subtotal:.2f}",
            "shipping_fee": "FREE" if order.shipping_fee == 0 else f"₹{order.shipping_fee:.2f}",
            "total_amount": f"{order.total_amount:.2f}",
            "vendor_email": settings.VENDOR_EMAIL,
        }

        # Send to customer
        await EmailService.send_email(
            db=db,
            recipient_email=order.customer_email,
            template_key="ORDER_CONFIRMATION_CUSTOMER",
            context=email_ctx,
        )

        # Send to vendor (Anurag Jain <meriwebdunia@gmail.com>)
        await EmailService.send_email(
            db=db,
            recipient_email=settings.VENDOR_EMAIL,
            template_key="ORDER_ALERT_VENDOR",
            context=email_ctx,
        )

        return order

