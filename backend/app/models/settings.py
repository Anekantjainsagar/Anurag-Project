"""
CMS, Storefront Settings, Banners & Audit Logs
Configures all site settings dynamically via FastAPI without code updates.
"""

import uuid
from datetime import datetime, timezone
from sqlalchemy import (
    Boolean,
    Column,
    DateTime,
    ForeignKey,
    Integer,
    String,
    Text,
)
from sqlalchemy.dialects.postgresql import JSONB, UUID
from app.core.database import Base


class SiteSetting(Base):
    __tablename__ = "site_settings"

    key = Column(String(100), primary_key=True)
    value = Column(JSONB, nullable=False)
    description = Column(String(255), nullable=True)
    updated_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))


class PromoBanner(Base):
    __tablename__ = "promo_banners"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    title = Column(String(150), nullable=False)
    subtitle = Column(String(255), nullable=True)
    badge = Column(String(50), nullable=True)
    cta_label = Column(String(50), default="Explore Harvest", nullable=False)
    cta_link = Column(String(255), default="/products", nullable=False)
    image_url = Column(Text, nullable=False)
    display_order = Column(Integer, default=0, nullable=False)
    is_active = Column(Boolean, default=True, nullable=False)


class Testimonial(Base):
    __tablename__ = "testimonials"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    customer_name = Column(String(100), nullable=False)
    location = Column(String(100), nullable=False)
    rating = Column(Integer, default=5, nullable=False)
    review_text = Column(Text, nullable=False)
    product_name = Column(String(150), nullable=True)
    is_featured = Column(Boolean, default=True, nullable=False)
    display_order = Column(Integer, default=0, nullable=False)


class WhyChooseFeature(Base):
    __tablename__ = "why_choose_features"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    icon_name = Column(String(50), nullable=False)
    title = Column(String(100), nullable=False)
    description = Column(String(255), nullable=False)
    display_order = Column(Integer, default=0, nullable=False)


class AuditLog(Base):
    __tablename__ = "audit_logs"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    action = Column(String(100), nullable=False, index=True)
    entity_type = Column(String(50), nullable=False, index=True)
    entity_id = Column(String(150), nullable=False)
    changes = Column(JSONB, nullable=True)
    ip_address = Column(String(45), nullable=True)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), index=True)

