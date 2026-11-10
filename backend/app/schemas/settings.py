"""
CMS, Site Settings & Banner Schemas
"""

import uuid
from typing import Any, Dict, Optional
from pydantic import BaseModel, ConfigDict


class SiteSettingsOut(BaseModel):
    vendor_info: Dict[str, Any]
    warehouse_address: Dict[str, Any]
    topbar_tickers: list[str]
    shipping_policy: Dict[str, Any]
    store_details: Optional[Dict[str, Any]] = None
    announcement_bar: Optional[Dict[str, Any]] = None
    customer_love_header: Optional[Dict[str, Any]] = None
    faq_section: Optional[Dict[str, Any]] = None


class FAQItemSchema(BaseModel):
    id: str
    question: str
    answer: str
    category: Optional[str] = "General"
    is_active: bool = True
    display_order: int = 0


class FAQSectionSchema(BaseModel):
    badge: str = "Transparency"
    title: str = "Frequently Asked Questions"
    subtitle: str = "Everything you need to know about our organic certification and harvesting"
    faqs: list[FAQItemSchema] = []


class PromoBannerOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: uuid.UUID
    title: str
    subtitle: Optional[str] = None
    badge: Optional[str] = None
    cta_label: str
    cta_link: str
    image_url: str
    display_order: int
    is_active: bool


class TestimonialOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: uuid.UUID
    customer_name: str
    location: str
    rating: int
    review_text: str
    product_name: Optional[str] = None
    is_featured: bool
    display_order: int


class WhyChooseFeatureOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: uuid.UUID
    icon_name: str
    title: str
    description: str
    display_order: int

