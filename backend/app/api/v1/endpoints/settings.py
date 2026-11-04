"""
Dynamic Storefront CMS & Settings Endpoints
Allows frontend to pull hero banners, vendor contact info, and tickers from database.
"""

from typing import List
from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.config import settings as app_settings
from app.core.database import get_db
from app.models.settings import PromoBanner, SiteSetting, Testimonial, WhyChooseFeature
from app.schemas.settings import PromoBannerOut, SiteSettingsOut, TestimonialOut, WhyChooseFeatureOut

router = APIRouter()


@router.get("/settings/site", response_model=SiteSettingsOut, summary="Get Site Configuration")
async def get_site_settings(db: AsyncSession = Depends(get_db)):
    """
    Returns platform settings (vendor info, warehouse hub, tickers, shipping policies).
    """
    result = await db.execute(select(SiteSetting))
    rows = {r.key: r.value for r in result.scalars().all()}

    vendor_info = rows.get("vendor_info") or {
        "name": app_settings.VENDOR_NAME,
        "email": app_settings.VENDOR_EMAIL,
        "phone": app_settings.VENDOR_PHONE,
        "whatsapp": app_settings.VENDOR_PHONE,
    }
    warehouse = rows.get("warehouse_address") or {
        "address": "Plot 104, Organic Agro Park, Central Logistics Zone, Madhya Pradesh - 452001, INDIA"
    }
    tickers = rows.get("topbar_tickers") or [
        "🌾 Fresh Heirloom Harvest Just Arrived - Flat 10% Off with HARVEST10",
        "🚚 Free Zero-Adulteration Delivery Across India on Orders Above ₹499",
        "🌿 100% Certified Organic & Lab-Tested Direct from Farmers",
    ]
    shipping = rows.get("shipping_policy") or {
        "free_shipping_threshold": 499,
        "standard_shipping_fee": 60,
    }

    return SiteSettingsOut(
        vendor_info=vendor_info,
        warehouse_address=warehouse,
        topbar_tickers=tickers,
        shipping_policy=shipping,
    )


@router.get("/settings/banners", response_model=List[PromoBannerOut], summary="List Hero & Promotional Banners")
async def list_banners(db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(PromoBanner).where(PromoBanner.is_active.is_(True)).order_by(PromoBanner.display_order.asc())
    )
    return result.scalars().all()


@router.get("/settings/testimonials", response_model=List[TestimonialOut], summary="List Featured Customer Testimonials")
async def list_testimonials(db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Testimonial).where(Testimonial.is_featured.is_(True)).order_by(Testimonial.display_order.asc())
    )
    return result.scalars().all()


@router.get("/settings/why-choose", response_model=List[WhyChooseFeatureOut], summary="List Why Choose Us Trust Features")
async def list_why_choose(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(WhyChooseFeature).order_by(WhyChooseFeature.display_order.asc()))
    return result.scalars().all()
