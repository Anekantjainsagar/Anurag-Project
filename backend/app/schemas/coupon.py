"""
Coupons, Discounts & Loyalty Reward Schemas
"""

import uuid
from datetime import datetime
from decimal import Decimal
from typing import Optional
from pydantic import BaseModel, ConfigDict


class CouponValidateRequest(BaseModel):
    code: str
    subtotal: Decimal
    device_token: Optional[str] = None
    customer_phone: Optional[str] = None
    customer_email: Optional[str] = None


class CouponValidateResponse(BaseModel):
    valid: bool
    code: str
    discount_amount: Decimal
    new_total: Decimal
    message: str


class CouponOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: uuid.UUID
    code: str
    description: str
    discount_type: str
    discount_value: Decimal
    min_order_amount: Decimal
    max_discount: Optional[Decimal] = None
    is_first_order_only: bool = False
    usage_limit_per_user: int = 1
    valid_until: Optional[datetime] = None
    days_remaining: Optional[int] = None
    is_active: bool


class CouponCreate(BaseModel):
    code: str
    description: str
    discount_type: str = "percentage"  # "percentage" or "fixed"
    discount_value: Decimal
    min_order_amount: Decimal = Decimal("0.00")
    max_discount: Optional[Decimal] = None
    is_first_order_only: bool = False
    usage_limit_per_user: int = 1
    validity_days: Optional[int] = None  # e.g. 30 days
    valid_until: Optional[datetime] = None
    is_active: bool = True


class CouponUpdate(BaseModel):
    code: Optional[str] = None
    description: Optional[str] = None
    discount_type: Optional[str] = None
    discount_value: Optional[Decimal] = None
    min_order_amount: Optional[Decimal] = None
    max_discount: Optional[Decimal] = None
    is_first_order_only: Optional[bool] = None
    usage_limit_per_user: Optional[int] = None
    validity_days: Optional[int] = None
    valid_until: Optional[datetime] = None
    is_active: Optional[bool] = None


class LoyaltyBalanceOut(BaseModel):
    current_balance: int
    conversion_rate_inr: Decimal = Decimal("1.00")  # 1 Harvest coin = ₹1


class LoyaltyLedgerOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: uuid.UUID
    points: int
    activity_type: str
    reference_id: Optional[str] = None
    balance_after: int
    created_at: datetime

