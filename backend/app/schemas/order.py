"""
Order, Invoicing & Tracking Pydantic v2 Schemas
"""

import uuid
from datetime import datetime
from decimal import Decimal
from typing import List, Optional
from pydantic import BaseModel, ConfigDict, EmailStr


class OrderItemCreate(BaseModel):
    product_id: str
    variant_id: uuid.UUID
    quantity: int


class OrderItemOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: uuid.UUID
    product_id: str
    variant_id: uuid.UUID
    product_name: str
    weight_label: str
    unit_price: Decimal
    quantity: int
    line_total: Decimal


class OrderTrackingEventOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: uuid.UUID
    status: str
    title: str
    description: str
    location: Optional[str] = None
    timestamp: datetime


class OrderCreate(BaseModel):
    customer_name: str
    customer_phone: str
    customer_email: EmailStr
    shipping_flat_no: str
    shipping_street: str
    shipping_landmark: Optional[str] = None
    shipping_city: str
    shipping_state: str
    shipping_pincode: str
    order_notes: Optional[str] = None
    coupon_code: Optional[str] = None
    device_token: Optional[str] = None  # Cookie differentiator
    items: List[OrderItemCreate]


class OrderOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: uuid.UUID
    order_number: str
    customer_name: str
    customer_phone: str
    customer_email: str
    shipping_flat_no: str
    shipping_street: str
    shipping_landmark: Optional[str] = None
    shipping_city: str
    shipping_state: str
    shipping_pincode: str
    order_notes: Optional[str] = None
    subtotal: Decimal
    shipping_fee: Decimal
    discount_amount: Decimal
    loyalty_coins_redeemed: int
    total_amount: Decimal
    payment_method: str
    order_status: str
    courier_name: Optional[str] = None
    tracking_awb: Optional[str] = None
    invoice_pdf_url: Optional[str] = None
    created_at: datetime
    items: List[OrderItemOut] = []
    tracking_events: List[OrderTrackingEventOut] = []


class OrderReturnCreate(BaseModel):
    reason: str
    description: str
    evidence_images: List[str] = []


class OrderReturnOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: uuid.UUID
    order_id: uuid.UUID
    reason: str
    description: str
    evidence_images: List[str]
    status: str
    vendor_action_notes: Optional[str] = None
    created_at: datetime

