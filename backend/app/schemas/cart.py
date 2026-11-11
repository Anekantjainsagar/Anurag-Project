"""
Cart & Wishlist Pydantic v2 Schemas
"""

import uuid
from decimal import Decimal
from typing import List, Optional
from pydantic import BaseModel, ConfigDict
from app.schemas.catalog import ProductListOut, ProductVariantOut


class CartItemCreate(BaseModel):
    product_id: str
    variant_id: uuid.UUID
    quantity: int = 1


class CartItemUpdate(BaseModel):
    quantity: int


class CartItemOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: uuid.UUID
    product_id: str
    variant_id: uuid.UUID
    quantity: int
    product: ProductListOut
    variant: ProductVariantOut
    line_total: Optional[Decimal] = None


class CartSummaryOut(BaseModel):
    items: List[CartItemOut]
    item_count: int
    subtotal: Decimal
    shipping_fee: Decimal
    discount_amount: Decimal
    total_amount: Decimal
    free_shipping_eligible: bool
    free_shipping_threshold: Decimal = Decimal("499.00")


class WishlistItemOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: uuid.UUID
    product_id: str
    product: ProductListOut


class WishlistToggleRequest(BaseModel):
    product_id: str


class FrontendCartItem(BaseModel):
    id: str
    productId: str
    name: str
    subtitle: Optional[str] = ""
    price: float
    originalPrice: Optional[float] = None
    weight: str
    image: Optional[str] = "/images/products/placeholder.jpg"
    quantity: int


class CartSyncPayload(BaseModel):
    items: List[FrontendCartItem]


class CartStateResponse(BaseModel):
    items: List[FrontendCartItem]
    count: int
    subtotal: float


