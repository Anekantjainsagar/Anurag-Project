"""
Contact, B2B Bulk Enquiry & Newsletter Schemas
"""

import uuid
from datetime import datetime
from typing import Optional
from pydantic import BaseModel, ConfigDict, EmailStr


class ContactMessageCreate(BaseModel):
    name: str
    email: EmailStr
    phone: str
    subject: str
    message: str


class ContactMessageOut(ContactMessageCreate):
    model_config = ConfigDict(from_attributes=True)
    id: uuid.UUID
    status: str
    vendor_notes: Optional[str] = None
    created_at: datetime


class BulkEnquiryCreate(BaseModel):
    name: str
    company_name: Optional[str] = None
    email: EmailStr
    phone: str
    category: str
    quantity: str
    destination: Optional[str] = None
    notes: Optional[str] = None


class BulkEnquiryOut(BulkEnquiryCreate):
    model_config = ConfigDict(from_attributes=True)
    id: uuid.UUID
    status: str
    vendor_notes: Optional[str] = None
    created_at: datetime


class NewsletterSubscribeRequest(BaseModel):
    email: EmailStr


class NewsletterSubscribeResponse(BaseModel):
    success: bool
    email: str
    coupon_code: str
    message: str


class NewsletterSubscriberOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: uuid.UUID
    email: str
    coupon_code: str
    is_active: bool
    subscribed_at: datetime


class NewsletterStatusUpdate(BaseModel):
    is_active: bool


