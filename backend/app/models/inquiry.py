"""
Retail Inquiries, Wholesale B2B CRM & Newsletter Models
Forwarded to vendor Anurag Jain <meriwebdunia@gmail.com>.
"""

import uuid
from datetime import datetime, timezone
from sqlalchemy import (
    Boolean,
    Column,
    DateTime,
    String,
    Text,
)
from sqlalchemy.dialects.postgresql import UUID
from app.core.database import Base


class ContactMessage(Base):
    __tablename__ = "contact_messages"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String(100), nullable=False)
    email = Column(String(255), nullable=False)
    phone = Column(String(20), nullable=False)
    subject = Column(String(200), nullable=False)
    message = Column(Text, nullable=False)
    status = Column(String(30), default="NEW", nullable=False)  # NEW, CONTACTED, RESOLVED, ARCHIVED
    vendor_notes = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))


class BulkEnquiry(Base):
    __tablename__ = "bulk_enquiries"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String(100), nullable=False)
    company_name = Column(String(150), nullable=True)
    email = Column(String(255), nullable=False)
    phone = Column(String(20), nullable=False)
    category = Column(String(100), nullable=False)
    quantity = Column(String(100), nullable=False)
    destination = Column(String(150), nullable=True)
    notes = Column(Text, nullable=True)
    status = Column(String(30), default="NEW", nullable=False)  # NEW, QUOTE_SENT, IN_NEGOTIATION, FULFILLED, REJECTED
    vendor_notes = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))


class NewsletterSubscriber(Base):
    __tablename__ = "newsletter_subscribers"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email = Column(String(255), unique=True, index=True, nullable=False)
    coupon_code = Column(String(50), default="HARVEST10", nullable=False)
    is_active = Column(Boolean, default=True, nullable=False)
    subscribed_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
