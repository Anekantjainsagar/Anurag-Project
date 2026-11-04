"""
Reviews, Ratings & Product FAQ Models
Verified customer reviews with photo proofs and moderation flags.
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
from sqlalchemy.dialects.postgresql import ARRAY, UUID
from sqlalchemy.orm import relationship
from app.core.database import Base


class ProductReview(Base):
    __tablename__ = "product_reviews"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    product_id = Column(String(150), ForeignKey("products.id", ondelete="CASCADE"), nullable=False, index=True)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="SET NULL"), nullable=True, index=True)
    author_name = Column(String(100), nullable=False)
    rating = Column(Integer, nullable=False)  # 1 to 5
    title = Column(String(150), nullable=True)
    comment = Column(Text, nullable=False)
    images = Column(ARRAY(Text), default=list, nullable=False)
    is_verified_buyer = Column(Boolean, default=True, nullable=False)
    is_approved = Column(Boolean, default=True, nullable=False)
    helpful_votes = Column(Integer, default=0, nullable=False)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

    product = relationship("Product", back_populates="reviews")
    user = relationship("User", back_populates="reviews")


class ProductFAQ(Base):
    __tablename__ = "product_faqs"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    product_id = Column(String(150), ForeignKey("products.id", ondelete="CASCADE"), nullable=False, index=True)
    question = Column(Text, nullable=False)
    asked_by_name = Column(String(100), nullable=False)
    answer = Column(Text, nullable=True)
    answered_by = Column(String(100), default="Anurag Jain")
    is_published = Column(Boolean, default=True, nullable=False)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

    product = relationship("Product", back_populates="faqs")

