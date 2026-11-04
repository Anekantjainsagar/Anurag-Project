"""
Order Lifecycle, Invoicing, Tracking & Return Models
Supports Pay on Delivery (COD), vendor confirmation, milestones, and invoice storage.
"""

import uuid
from datetime import datetime, timezone
from sqlalchemy import (
    Column,
    DateTime,
    ForeignKey,
    Integer,
    Numeric,
    String,
    Text,
)
from sqlalchemy.dialects.postgresql import ARRAY, UUID
from sqlalchemy.orm import relationship
from app.core.database import Base


class Order(Base):
    __tablename__ = "orders"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    order_number = Column(String(50), unique=True, index=True, nullable=False)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="SET NULL"), nullable=True, index=True)
    customer_name = Column(String(100), nullable=False)
    customer_phone = Column(String(15), nullable=False, index=True)
    customer_email = Column(String(255), nullable=False)
    shipping_address_id = Column(UUID(as_uuid=True), ForeignKey("user_addresses.id", ondelete="SET NULL"), nullable=True)
    shipping_flat_no = Column(String(100), nullable=False)
    shipping_street = Column(String(255), nullable=False)
    shipping_landmark = Column(String(150), nullable=True)
    shipping_city = Column(String(100), nullable=False)
    shipping_state = Column(String(100), nullable=False)
    shipping_pincode = Column(String(10), nullable=False)
    order_notes = Column(Text, nullable=True)
    subtotal = Column(Numeric(10, 2), nullable=False)
    shipping_fee = Column(Numeric(10, 2), default=0.00, nullable=False)
    discount_amount = Column(Numeric(10, 2), default=0.00, nullable=False)
    loyalty_coins_redeemed = Column(Integer, default=0, nullable=False)
    total_amount = Column(Numeric(10, 2), nullable=False)
    payment_method = Column(String(50), default="COD_VENDOR_CONTACT", nullable=False)
    order_status = Column(String(30), default="PENDING_VERIFICATION", nullable=False)
    courier_name = Column(String(100), nullable=True)
    tracking_awb = Column(String(100), nullable=True)
    invoice_pdf_url = Column(Text, nullable=True)
    vendor_notes = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), index=True)
    updated_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    # Relationships
    user = relationship("User", back_populates="orders")
    items = relationship("OrderItem", back_populates="order", cascade="all, delete-orphan")
    tracking_events = relationship("OrderTrackingEvent", back_populates="order", cascade="all, delete-orphan")
    returns = relationship("OrderReturn", back_populates="order", cascade="all, delete-orphan")


class OrderItem(Base):
    __tablename__ = "order_items"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    order_id = Column(UUID(as_uuid=True), ForeignKey("orders.id", ondelete="CASCADE"), nullable=False, index=True)
    product_id = Column(String(150), ForeignKey("products.id", ondelete="RESTRICT"), nullable=False)
    variant_id = Column(UUID(as_uuid=True), ForeignKey("product_variants.id", ondelete="RESTRICT"), nullable=False)
    product_name = Column(String(255), nullable=False)
    weight_label = Column(String(50), nullable=False)
    unit_price = Column(Numeric(10, 2), nullable=False)
    quantity = Column(Integer, nullable=False)
    line_total = Column(Numeric(10, 2), nullable=False)

    order = relationship("Order", back_populates="items")
    product = relationship("Product")
    variant = relationship("ProductVariant")


class OrderTrackingEvent(Base):
    __tablename__ = "order_tracking_events"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    order_id = Column(UUID(as_uuid=True), ForeignKey("orders.id", ondelete="CASCADE"), nullable=False, index=True)
    status = Column(String(50), nullable=False)
    title = Column(String(100), nullable=False)
    description = Column(String(255), nullable=False)
    location = Column(String(100), nullable=True)
    timestamp = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

    order = relationship("Order", back_populates="tracking_events")


class OrderReturn(Base):
    __tablename__ = "order_returns"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    order_id = Column(UUID(as_uuid=True), ForeignKey("orders.id", ondelete="CASCADE"), nullable=False, index=True)
    reason = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)
    evidence_images = Column(ARRAY(Text), default=list, nullable=False)
    status = Column(String(30), default="REQUESTED", nullable=False)  # REQUESTED, APPROVED, REPLACED, REJECTED
    vendor_action_notes = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

    order = relationship("Order", back_populates="returns")
