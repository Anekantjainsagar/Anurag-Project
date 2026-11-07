"""
Blog & Agronomy Journal Schemas
"""

import json
import uuid
from datetime import datetime
from typing import Any, List, Optional
from pydantic import BaseModel, ConfigDict, field_validator


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

    @field_validator("tags", mode="before")
    @classmethod
    def parse_tags(cls, v):
        if isinstance(v, list) and v and all(isinstance(x, str) and len(x) == 1 for x in v):
            v = "".join(v)
        if isinstance(v, str):
            try:
                parsed = json.loads(v)
                if isinstance(parsed, list):
                    return parsed
            except Exception:
                return [t.strip() for t in v.split(",") if t.strip()]
        return v or []


class BlogPostDetailOut(BlogPostListOut):
    health_tip: Optional[str] = None
    content: List[Any] = []
    key_benefits: List[str] = []
    featured_product_id: Optional[str] = None
    highlights: List[BlogNutritionalHighlightOut] = []

    @field_validator("content", "key_benefits", mode="before")
    @classmethod
    def parse_list_fields(cls, v):
        if isinstance(v, list) and v and all(isinstance(x, str) and len(x) == 1 for x in v):
            v = "".join(v)
        if isinstance(v, str):
            try:
                parsed = json.loads(v)
                if isinstance(parsed, list):
                    return parsed
            except Exception:
                return [v]
        return v or []



