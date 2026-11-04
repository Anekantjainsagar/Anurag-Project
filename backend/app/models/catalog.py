"""
Catalog & Product Domain Models
Covers categories, products, weight variants, galleries, nutrition, and harvest lots.
"""

import uuid
from datetime import datetime, date, timezone
from sqlalchemy import (
    Boolean,
    Column,
    Date,
    DateTime,
    ForeignKey,
    Integer,
    Numeric,
    String,
    Text,
)
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from app.core.database import Base


class Category(Base):
    __tablename__ = "categories"

    id = Column(String(50), primary_key=True)  # e.g. pulses, millets
    name = Column(String(100), unique=True, nullable=False)
    slug = Column(String(100), unique=True, index=True, nullable=False)
    tagline = Column(String(255), nullable=True)
    image_url = Column(Text, nullable=False)
    display_order = Column(Integer, default=0, nullable=False)
    is_active = Column(Boolean, default=True, nullable=False)

    products = relationship("Product", back_populates="category")


class Product(Base):
    __tablename__ = "products"

    id = Column(String(150), primary_key=True)  # slug ID matching mockData
    category_id = Column(String(50), ForeignKey("categories.id", ondelete="RESTRICT"), nullable=False, index=True)
    name = Column(String(255), nullable=False, index=True)
    subtitle = Column(String(255), nullable=True)
    description = Column(Text, nullable=False)
    origin = Column(String(150), nullable=True)
    tag = Column(String(50), nullable=True)  # Bestseller, Pure Harvest, Heirloom
    rating = Column(Numeric(2, 1), default=4.8, nullable=False)
    reviews_count = Column(Integer, default=0, nullable=False)
    in_stock = Column(Boolean, default=True, nullable=False)
    health_benefits = Column(Text, nullable=True)
    ingredients = Column(Text, nullable=True)
    storage_instructions = Column(Text, nullable=True)
    common_uses = Column(Text, nullable=True)
    additional_info = Column(Text, nullable=True)
    is_featured = Column(Boolean, default=False, nullable=False)
    is_active = Column(Boolean, default=True, nullable=False)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    # Relationships
    category = relationship("Category", back_populates="products")
    variants = relationship("ProductVariant", back_populates="product", cascade="all, delete-orphan")
    images = relationship("ProductImage", back_populates="product", cascade="all, delete-orphan")
    features = relationship("ProductFeature", back_populates="product", cascade="all, delete-orphan")
    nutritional_facts = relationship("ProductNutritionalFact", back_populates="product", cascade="all, delete-orphan")
    purity_parameters = relationship("ProductPurityParameter", back_populates="product", cascade="all, delete-orphan")
    harvest_batches = relationship("HarvestBatch", back_populates="product", cascade="all, delete-orphan")
    reviews = relationship("ProductReview", back_populates="product", cascade="all, delete-orphan")
    faqs = relationship("ProductFAQ", back_populates="product", cascade="all, delete-orphan")


class ProductVariant(Base):
    __tablename__ = "product_variants"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    product_id = Column(String(150), ForeignKey("products.id", ondelete="CASCADE"), nullable=False, index=True)
    weight_label = Column(String(50), nullable=False)  # 500g, 1kg, 5kg
    price = Column(Numeric(10, 2), nullable=False)
    original_price = Column(Numeric(10, 2), nullable=False)
    discount_label = Column(String(20), nullable=True)  # 10% OFF
    stock_quantity = Column(Integer, default=100, nullable=False)
    sku = Column(String(50), unique=True, nullable=True)
    is_default = Column(Boolean, default=False, nullable=False)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

    product = relationship("Product", back_populates="variants")


class ProductImage(Base):
    __tablename__ = "product_images"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    product_id = Column(String(150), ForeignKey("products.id", ondelete="CASCADE"), nullable=False, index=True)
    image_url = Column(Text, nullable=False)
    is_primary = Column(Boolean, default=False, nullable=False)
    display_order = Column(Integer, default=0, nullable=False)
    alt_text = Column(String(255), nullable=True)

    product = relationship("Product", back_populates="images")


class ProductFeature(Base):
    __tablename__ = "product_features"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    product_id = Column(String(150), ForeignKey("products.id", ondelete="CASCADE"), nullable=False, index=True)
    feature_text = Column(String(255), nullable=False)
    display_order = Column(Integer, default=0, nullable=False)

    product = relationship("Product", back_populates="features")


class ProductNutritionalFact(Base):
    __tablename__ = "product_nutritional_facts"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    product_id = Column(String(150), ForeignKey("products.id", ondelete="CASCADE"), nullable=False, index=True)
    nutrient_name = Column(String(100), nullable=False)
    nutrient_value = Column(String(100), nullable=False)
    display_order = Column(Integer, default=0, nullable=False)

    product = relationship("Product", back_populates="nutritional_facts")


class ProductPurityParameter(Base):
    __tablename__ = "product_purity_parameters"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    product_id = Column(String(150), ForeignKey("products.id", ondelete="CASCADE"), nullable=False, index=True)
    param_name = Column(String(100), nullable=False)
    param_value = Column(String(100), nullable=False)
    display_order = Column(Integer, default=0, nullable=False)

    product = relationship("Product", back_populates="purity_parameters")


class HarvestBatch(Base):
    __tablename__ = "harvest_batches"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    product_id = Column(String(150), ForeignKey("products.id", ondelete="CASCADE"), nullable=False, index=True)
    batch_code = Column(String(50), unique=True, nullable=False, index=True)
    farmer_cluster = Column(String(150), nullable=False)
    harvest_date = Column(Date, nullable=False)
    lab_report_url = Column(Text, nullable=True)
    fssai_license = Column(String(50), default="10020051003412")

    product = relationship("Product", back_populates="harvest_batches")
