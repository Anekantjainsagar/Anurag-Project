"""
Catalog & Product Pydantic v2 Schemas
"""

import uuid
from datetime import date, datetime
from decimal import Decimal
from typing import List, Optional
from pydantic import BaseModel, ConfigDict


class CategoryOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: str
    name: str
    slug: str
    tagline: Optional[str] = None
    image_url: str
    display_order: int
    is_active: bool


class ProductVariantOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: uuid.UUID
    weight_label: str
    price: Decimal
    original_price: Decimal
    discount_label: Optional[str] = None
    stock_quantity: int
    sku: Optional[str] = None
    is_default: bool


class ProductImageOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: uuid.UUID
    image_url: str
    is_primary: bool
    display_order: int
    alt_text: Optional[str] = None


class ProductFeatureOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: uuid.UUID
    feature_text: str
    display_order: int


class ProductNutritionalFactOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: uuid.UUID
    nutrient_name: str
    nutrient_value: str
    display_order: int


class ProductPurityParameterOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: uuid.UUID
    param_name: str
    param_value: str
    display_order: int


class HarvestBatchOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: uuid.UUID
    batch_code: str
    farmer_cluster: str
    harvest_date: date
    lab_report_url: Optional[str] = None
    fssai_license: Optional[str] = None


class ProductListOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: str
    category_id: str
    name: str
    subtitle: Optional[str] = None
    origin: Optional[str] = None
    tag: Optional[str] = None
    rating: Decimal
    reviews_count: int
    in_stock: bool
    is_featured: bool
    primary_image: Optional[str] = None
    default_price: Optional[Decimal] = None
    default_original_price: Optional[Decimal] = None
    default_discount: Optional[str] = None
    variants: List[ProductVariantOut] = []


class ProductDetailOut(ProductListOut):
    description: str
    health_benefits: Optional[str] = None
    ingredients: Optional[str] = None
    storage_instructions: Optional[str] = None
    common_uses: Optional[str] = None
    additional_info: Optional[str] = None
    images: List[ProductImageOut] = []
    features: List[ProductFeatureOut] = []
    nutritional_facts: List[ProductNutritionalFactOut] = []
    purity_parameters: List[ProductPurityParameterOut] = []
    harvest_batches: List[HarvestBatchOut] = []

