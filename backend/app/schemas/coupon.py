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
    is_active: bool


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

