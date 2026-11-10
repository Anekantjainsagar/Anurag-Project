"""
Discounts, Coupons & Loyalty Program Models
Handles HARVEST10, device tokens, and customer reward coins.
"""

import uuid
from datetime import datetime, timezone
from sqlalchemy import (
    Boolean,
    Column,
    DateTime,
    ForeignKey,
    Integer,
    Numeric,
    String,
)
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from app.core.database import Base


class Coupon(Base):
    __tablename__ = "coupons"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    code = Column(String(50), unique=True, index=True, nullable=False)
    description = Column(String(255), nullable=False)
    discount_type = Column(String(20), default="percentage", nullable=False)  # percentage, fixed
    discount_value = Column(Numeric(10, 2), nullable=False)
    min_order_amount = Column(Numeric(10, 2), default=0.00, nullable=False)
    max_discount = Column(Numeric(10, 2), nullable=True)
    valid_from = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), nullable=False)
    valid_until = Column(DateTime(timezone=True), nullable=True)
    usage_limit_per_user = Column(Integer, default=1, nullable=False)
    is_first_order_only = Column(Boolean, default=False, nullable=False)
    is_active = Column(Boolean, default=True, nullable=False)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

    redemptions = relationship("CouponRedemption", back_populates="coupon")


class CouponRedemption(Base):
    __tablename__ = "coupon_redemptions"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    coupon_id = Column(UUID(as_uuid=True), ForeignKey("coupons.id", ondelete="CASCADE"), nullable=False, index=True)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="SET NULL"), nullable=True, index=True)
    device_token = Column(String(100), nullable=False, index=True)
    customer_phone = Column(String(25), nullable=False, index=True)
    customer_email = Column(String(255), nullable=True, index=True)
    order_id = Column(UUID(as_uuid=True), ForeignKey("orders.id", ondelete="SET NULL"), nullable=True)
    redeemed_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

    coupon = relationship("Coupon", back_populates="redemptions")


class LoyaltyLedger(Base):
    __tablename__ = "loyalty_ledger"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    points = Column(Integer, nullable=False)  # Positive for earn, negative for burn
    activity_type = Column(String(50), nullable=False)  # ORDER_EARNED, CHECKOUT_REDEEMED, REFERRAL_BONUS
    reference_id = Column(String(100), nullable=True)
    balance_after = Column(Integer, nullable=False)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

    user = relationship("User", back_populates="loyalty_entries")

