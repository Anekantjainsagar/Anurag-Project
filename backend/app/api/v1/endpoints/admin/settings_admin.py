"""
Admin Store Policies, Shipping Rates & Regulatory CMS
Allows ONAAR store operators to customize shipping thresholds, standard/express fees, and legal identifiers.
"""

from typing import Any, Dict, Optional
from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.core.dependencies import get_current_admin_user
from app.models.settings import SiteSetting
from app.models.user import User

router = APIRouter()


class ShippingPolicyPayload(BaseModel):
    free_shipping_threshold: float = 499.0
    standard_shipping_fee: float = 49.0
    express_shipping_fee: float = 99.0


class StoreDetailsPayload(BaseModel):
    name: str = "ONAAR Organic Foods"
    legal_entity: str = "ONAAR Pure Harvest Agri Pvt Ltd"
    contact_phone: str = "+91 98765 43210"
    support_email: str = "support@onaar.com"
    gst_number: str = "23AABCU9603R1ZM"
    fssai_license: str = "11422850000341"
    warehouse_address: str = "Khasra No. 142/2, Nemawar Agro Hub, Bypass Road, Indore, Madhya Pradesh - 452016"


class UpdateSettingsPayload(BaseModel):
    shipping_policy: Optional[ShippingPolicyPayload] = None
    store_details: Optional[StoreDetailsPayload] = None


@router.get("/admin/settings", summary="Get Store Policies & Settings")
async def get_admin_settings(
    current_admin: User = Depends(get_current_admin_user),
    db: AsyncSession = Depends(get_db),
):
    """Returns stored shipping policy and regulatory store details."""
    res = await db.execute(select(SiteSetting))
    rows = {r.key: r.value for r in res.scalars().all()}

    shipping_policy = rows.get("shipping_policy") or {
        "free_shipping_threshold": 499.0,
        "standard_shipping_fee": 49.0,
        "express_shipping_fee": 99.0,
    }

    store_details = rows.get("store_details") or {
        "name": "ONAAR Organic Foods",
        "legal_entity": "ONAAR Pure Harvest Agri Pvt Ltd",
        "contact_phone": "+91 98765 43210",
        "support_email": "support@onaar.com",
        "gst_number": "23AABCU9603R1ZM",
        "fssai_license": "11422850000341",
        "warehouse_address": "Khasra No. 142/2, Nemawar Agro Hub, Bypass Road, Indore, Madhya Pradesh - 452016",
    }

    return {
        "shipping_policy": shipping_policy,
        "store_details": store_details,
    }


@router.put("/admin/settings", summary="Update Store Policies & Settings")
async def update_admin_settings(
    payload: UpdateSettingsPayload,
    current_admin: User = Depends(get_current_admin_user),
    db: AsyncSession = Depends(get_db),
):
    """Saves updated shipping policy and store details to site_settings table."""
    if payload.shipping_policy:
        sp_dict = payload.shipping_policy.model_dump()
        res_sp = await db.execute(select(SiteSetting).where(SiteSetting.key == "shipping_policy"))
        existing_sp = res_sp.scalar_one_or_none()
        if existing_sp:
            existing_sp.value = sp_dict
        else:
            db.add(SiteSetting(key="shipping_policy", value=sp_dict, description="Shipping policy & thresholds"))

    if payload.store_details:
        sd_dict = payload.store_details.model_dump()
        res_sd = await db.execute(select(SiteSetting).where(SiteSetting.key == "store_details"))
        existing_sd = res_sd.scalar_one_or_none()
        if existing_sd:
            existing_sd.value = sd_dict
        else:
            db.add(SiteSetting(key="store_details", value=sd_dict, description="Store identity & regulatory details"))

    await db.commit()
    return {"success": True, "message": "Store policies and parameters saved successfully."}
