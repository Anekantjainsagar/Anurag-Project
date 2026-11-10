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
    Returns platform settings (vendor info, warehouse hub, tickers, shipping policies, announcement bar, store details).
    """
    result = await db.execute(select(SiteSetting))
    rows = {r.key: r.value for r in result.scalars().all()}

    shipping = rows.get("shipping_policy") or {
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

    announcement_bar = rows.get("announcement_bar") or {
        "ticker_text": "FREE PAN-INDIA DELIVERY ON ORDERS OVER ₹499",
        "whatsapp_number": "+919876543210",
        "is_active": True,
    }

    customer_love_header = rows.get("customer_love_header") or {
        "badge": "Customer Love",
        "title": "Trusted by 10,000+ Indian Families",
        "subtitle": "Real reviews from real customers across India who made the switch to pure, unpolished organic food.",
    }

    vendor_info = {
        "name": store_details.get("name") or (rows.get("vendor_info", {}).get("name", app_settings.VENDOR_NAME)),
        "email": store_details.get("support_email") or (rows.get("vendor_info", {}).get("email", app_settings.VENDOR_EMAIL)),
        "phone": store_details.get("contact_phone") or (rows.get("vendor_info", {}).get("phone", app_settings.VENDOR_PHONE)),
        "whatsapp": announcement_bar.get("whatsapp_number") or (rows.get("vendor_info", {}).get("whatsapp", app_settings.VENDOR_PHONE)),
    }

    warehouse = {
        "address": store_details.get("warehouse_address") or (rows.get("warehouse_address", {}).get("address", "Plot 104, Organic Agro Park, Central Logistics Zone, Madhya Pradesh - 452001, INDIA"))
    }

    active_ticker = announcement_bar.get("ticker_text") or "🚚 Free Pan-India Delivery on Orders Above ₹499"
    tickers = [
        active_ticker,
        "🌾 Fresh Heirloom Harvest Just Arrived - Flat 10% Off with HARVEST10",
        "🌿 100% Certified Organic & Lab-Tested Direct from Farmers",
    ]

    return SiteSettingsOut(
        vendor_info=vendor_info,
        warehouse_address=warehouse,
        topbar_tickers=tickers,
        shipping_policy=shipping,
        store_details=store_details,
        announcement_bar=announcement_bar,
        customer_love_header=customer_love_header,
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


@router.get("/settings/customer-love", summary="Get Customer Love Section Content & Featured Testimonials")
async def get_customer_love_section(db: AsyncSession = Depends(get_db)):
    res = await db.execute(select(SiteSetting).where(SiteSetting.key == "customer_love_header"))
    header_obj = res.scalar_one_or_none()
    header = header_obj.value if header_obj and isinstance(header_obj.value, dict) else {
        "badge": "Customer Love",
        "title": "Trusted by 10,000+ Indian Families",
        "subtitle": "Real reviews from real customers across India who made the switch to pure, unpolished organic food.",
    }

    test_res = await db.execute(
        select(Testimonial).where(Testimonial.is_featured.is_(True)).order_by(Testimonial.display_order.asc())
    )
    testimonials = test_res.scalars().all()
    return {
        "badge": header.get("badge", "Customer Love"),
        "title": header.get("title", "Trusted by 10,000+ Indian Families"),
        "subtitle": header.get("subtitle", "Real reviews from real customers across India who made the switch to pure, unpolished organic food."),
        "testimonials": [
            {
                "id": str(t.id),
                "name": t.customer_name,
                "location": t.location,
                "rating": t.rating,
                "text": t.review_text,
                "product": t.product_name or "Organic Staple",
            }
            for t in testimonials
        ],
    }


@router.get("/settings/why-choose", response_model=List[WhyChooseFeatureOut], summary="List Why Choose Us Trust Features")
async def list_why_choose(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(WhyChooseFeature).order_by(WhyChooseFeature.display_order.asc()))
    return result.scalars().all()

