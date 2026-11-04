"""
Health Journal & Agronomy Blog Models
Covers 24 category-aligned blogs, tags, authors, and cross-promoted products.
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
from sqlalchemy.dialects.postgresql import ARRAY, JSONB, UUID
from sqlalchemy.orm import relationship
from app.core.database import Base


class BlogCategory(Base):
    __tablename__ = "blog_categories"

    id = Column(String(50), primary_key=True)
    name = Column(String(100), unique=True, nullable=False)
    slug = Column(String(100), unique=True, index=True, nullable=False)
    display_order = Column(Integer, default=0, nullable=False)

    posts = relationship("BlogPost", back_populates="category")


class BlogPost(Base):
    __tablename__ = "blog_posts"

    id = Column(String(100), primary_key=True)  # e.g. blog-pulses-1
    title = Column(String(255), nullable=False)
    slug = Column(String(255), unique=True, index=True, nullable=False)
    summary = Column(Text, nullable=False)
    read_time = Column(String(30), default="5 min read", nullable=False)
    image_url = Column(Text, nullable=False)
    category_id = Column(String(50), ForeignKey("blog_categories.id", ondelete="SET NULL"), nullable=True)
    author_name = Column(String(100), default="Anurag Jain", nullable=False)
    author_role = Column(String(100), default="Head of Agronomy & Research", nullable=False)
    health_tip = Column(Text, nullable=True)
    tags = Column(ARRAY(Text), default=list, nullable=False)
    content = Column(JSONB, default=list, nullable=False)  # array of paragraphs
    key_benefits = Column(ARRAY(Text), default=list, nullable=False)
    featured_product_id = Column(String(150), ForeignKey("products.id", ondelete="SET NULL"), nullable=True)
    is_published = Column(Boolean, default=True, nullable=False)
    published_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    category = relationship("BlogCategory", back_populates="posts")
    featured_product = relationship("Product")
    highlights = relationship("BlogNutritionalHighlight", back_populates="post", cascade="all, delete-orphan")


class BlogNutritionalHighlight(Base):
    __tablename__ = "blog_nutritional_highlights"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    post_id = Column(String(100), ForeignKey("blog_posts.id", ondelete="CASCADE"), nullable=False, index=True)
    label = Column(String(100), nullable=False)
    value = Column(String(100), nullable=False)
    display_order = Column(Integer, default=0, nullable=False)

    post = relationship("BlogPost", back_populates="highlights")
