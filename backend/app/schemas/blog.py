"""
Blog & Agronomy Journal Schemas
"""

import uuid
from datetime import datetime
from typing import Any, List, Optional
from pydantic import BaseModel, ConfigDict


class BlogCategoryOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: str
    name: str
    slug: str
    display_order: int


class BlogNutritionalHighlightOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: uuid.UUID
    label: str
    value: str
    display_order: int


class BlogPostListOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: str
    title: str
    slug: str
    summary: str
    read_time: str
    image_url: str
    category_id: Optional[str] = None
    author_name: str
    author_role: str
    tags: List[str] = []
    published_at: datetime


class BlogPostDetailOut(BlogPostListOut):
    health_tip: Optional[str] = None
    content: List[Any] = []
    key_benefits: List[str] = []
    featured_product_id: Optional[str] = None
    highlights: List[BlogNutritionalHighlightOut] = []
