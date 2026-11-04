"""
User & Authentication Pydantic v2 Schemas
"""

import uuid
from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel, ConfigDict, EmailStr, Field


# Address schemas
class UserAddressBase(BaseModel):
    label: str = Field(default="Home", description="Home, Work, Other")
    recipient_name: str
    recipient_phone: str
    flat_no: str
    street: str
    landmark: Optional[str] = None
    city: str
    state: str
    pincode: str
    is_default_shipping: bool = False
    is_default_billing: bool = False
    delivery_instructions: Optional[str] = None


class UserAddressCreate(UserAddressBase):
    pass


class UserAddressUpdate(BaseModel):
    label: Optional[str] = None
    recipient_name: Optional[str] = None
    recipient_phone: Optional[str] = None
    flat_no: Optional[str] = None
    street: Optional[str] = None
    landmark: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    pincode: Optional[str] = None
    is_default_shipping: Optional[bool] = None
    is_default_billing: Optional[bool] = None
    delivery_instructions: Optional[str] = None


class UserAddressOut(UserAddressBase):
    model_config = ConfigDict(from_attributes=True)
    id: uuid.UUID
    created_at: datetime


# User schemas
class UserBase(BaseModel):
    phone: Optional[str] = None
    email: Optional[EmailStr] = None
    full_name: str
    avatar_url: Optional[str] = None
    dietary_preference: Optional[str] = "All Organic"
    newsletter_subscribed: bool = True


class UserCreate(UserBase):
    password: Optional[str] = None


class UserUpdate(BaseModel):
    full_name: Optional[str] = None
    email: Optional[EmailStr] = None
    avatar_url: Optional[str] = None
    dietary_preference: Optional[str] = None
    newsletter_subscribed: Optional[bool] = None


class UserOut(UserBase):
    model_config = ConfigDict(from_attributes=True)
    id: uuid.UUID
    role: str
    is_active: bool
    is_verified: bool
    created_at: datetime


class UserWithAddresses(UserOut):
    addresses: List[UserAddressOut] = []


# Auth & OTP schemas
class OTPRequest(BaseModel):
    identifier: str = Field(..., description="10-digit mobile number or email address")
    channel: str = Field(default="sms", description="sms, whatsapp, email")


class OTPVerify(BaseModel):
    identifier: str
    otp_code: str
    full_name: Optional[str] = None


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    expires_in: int
    user: UserOut


class SessionOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: uuid.UUID
    device_info: Optional[str] = None
    ip_address: Optional[str] = None
    last_active: datetime
    expires_at: datetime
