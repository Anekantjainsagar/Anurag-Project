"""
Review & Product FAQ Schemas
"""

import uuid
from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel, ConfigDict, Field


class ReviewCreate(BaseModel):
    product_id: str
    author_name: str
    rating: int = Field(..., ge=1, le=5)
    title: Optional[str] = None
    comment: str
    images: List[str] = []


class ReviewOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: uuid.UUID
    product_id: str
    author_name: str
    rating: int
    title: Optional[str] = None
    comment: str
    images: List[str]
    is_verified_buyer: bool
    helpful_votes: int
    created_at: datetime


class FAQCreate(BaseModel):
    product_id: str
    question: str
    asked_by_name: str


class FAQOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: uuid.UUID
    product_id: str
    question: str
    asked_by_name: str
    answer: Optional[str] = None
    answered_by: Optional[str] = None
    created_at: datetime

