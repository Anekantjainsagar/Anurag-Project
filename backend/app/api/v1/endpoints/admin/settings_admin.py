"""
Admin Store Policies, Shipping Rates, Customer Love & Regulatory CMS
Allows ONAAR store operators to customize shipping thresholds, testimonials, announcement banners, and legal identifiers.
"""

import uuid
from typing import Any, Dict, List, Optional
from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.core.dependencies import get_current_admin_user
from app.models.settings import SiteSetting, Testimonial
from app.models.user import User
from app.schemas.settings import TestimonialOut

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


class CustomerLoveHeaderPayload(BaseModel):
    badge: str = "Customer Love"
    title: str = "Trusted by 10,000+ Indian Families"
    subtitle: str = "Real reviews from real customers across India who made the switch to pure, unpolished organic food."


class AnnouncementBarPayload(BaseModel):
    ticker_text: str = "FREE PAN-INDIA DELIVERY ON ORDERS OVER ₹499"
    whatsapp_number: str = "+919876543210"
    is_active: bool = True


class FAQItemPayload(BaseModel):
    id: str
    question: str
    answer: str
    category: Optional[str] = "General"
    is_active: bool = True
    display_order: int = 0


class FAQSectionPayload(BaseModel):
    badge: str = "Transparency"
    title: str = "Frequently Asked Questions"
    subtitle: str = "Everything you need to know about our organic certification and harvesting"
    faqs: List[FAQItemPayload] = []


class UpdateSettingsPayload(BaseModel):
    shipping_policy: Optional[ShippingPolicyPayload] = None
    store_details: Optional[StoreDetailsPayload] = None
    customer_love_header: Optional[CustomerLoveHeaderPayload] = None
    announcement_bar: Optional[AnnouncementBarPayload] = None
    faq_section: Optional[FAQSectionPayload] = None


class TestimonialPayload(BaseModel):
    customer_name: str
    location: str
    rating: int = 5
    review_text: str
    product_name: Optional[str] = None
    is_featured: bool = True
    display_order: int = 0


# ============================================================================
# 1. SITE SETTINGS & CMS
# ============================================================================

@router.get("/admin/settings", summary="Get Store Policies & Settings")
async def get_admin_settings(
    current_admin: User = Depends(get_current_admin_user),
    db: AsyncSession = Depends(get_db),
):
    """Returns stored shipping policy, regulatory store details, and homepage CMS parameters."""
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

    customer_love_header = rows.get("customer_love_header") or {
        "badge": "Customer Love",
        "title": "Trusted by 10,000+ Indian Families",
        "subtitle": "Real reviews from real customers across India who made the switch to pure, unpolished organic food.",
    }

    announcement_bar = rows.get("announcement_bar") or {
        "ticker_text": "FREE PAN-INDIA DELIVERY ON ORDERS OVER ₹499",
        "whatsapp_number": "+919876543210",
        "is_active": True,
    }

    faq_section = rows.get("faq_section") or {
        "badge": "Transparency",
        "title": "Frequently Asked Questions",
        "subtitle": "Everything you need to know about our organic certification and harvesting",
        "faqs": [
            {
                "id": "faq-1",
                "question": "How does ONAAR prove products are 100% organic?",
                "answer": "Every batch is traced to registered organic farmer clusters with geo-tagged locations and tested in NABL-accredited laboratories for 218 pesticide residues and heavy metals. Certificates of analysis are available upon request.",
                "category": "Certification",
                "is_active": True,
                "display_order": 1,
            },
            {
                "id": "faq-2",
                "question": "Why do your dals look less shiny than supermarket brands?",
                "answer": "Commercial brands buff pulses with talcum powder, food colors, and liquid paraffin wax for shine. Our dals are 100% unpolished and retain their nutrient-dense aleurone layer containing 80% of natural fiber and minerals.",
                "category": "Purity & Nutrition",
                "is_active": True,
                "display_order": 2,
            },
            {
                "id": "faq-3",
                "question": "What does cold-pressed and traditional Bilona mean?",
                "answer": "Our cold-pressed oils are expelled in traditional wooden kohlus below 42°C to safeguard nutrients. Our A2 ghee is prepared by culturing whole A2 Gir cow milk into curd and hand-churning bilona makhan before slow simmering.",
                "category": "Traditional Methods",
                "is_active": True,
                "display_order": 3,
            },
            {
                "id": "faq-4",
                "question": "Do you supply institutional and wholesale bulk orders?",
                "answer": "Yes. We partner with restaurants, organic retailers, and institutional kitchens across India with customized wholesale pricing and certified supply chains.",
                "category": "Wholesale",
                "is_active": True,
                "display_order": 4,
            },
        ],
    }

    return {
        "shipping_policy": shipping_policy,
        "store_details": store_details,
        "customer_love_header": customer_love_header,
        "announcement_bar": announcement_bar,
        "faq_section": faq_section,
    }


@router.put("/admin/settings", summary="Update Store Policies & Settings")
async def update_admin_settings(
    payload: UpdateSettingsPayload,
    current_admin: User = Depends(get_current_admin_user),
    db: AsyncSession = Depends(get_db),
):
    """Saves updated shipping policy, store details, and CMS content to site_settings table."""
    updates = [
        ("shipping_policy", payload.shipping_policy, "Shipping policy & thresholds"),
        ("store_details", payload.store_details, "Store identity & regulatory details"),
        ("customer_love_header", payload.customer_love_header, "Customer Love section headers"),
        ("announcement_bar", payload.announcement_bar, "TopBar announcement banner"),
        ("faq_section", payload.faq_section, "Storefront FAQs & Transparency section"),
    ]

    for key, data_payload, description in updates:
        if data_payload is not None:
            data_dict = data_payload.model_dump()
            res = await db.execute(select(SiteSetting).where(SiteSetting.key == key))
            existing = res.scalar_one_or_none()
            if existing:
                existing.value = data_dict
            else:
                db.add(SiteSetting(key=key, value=data_dict, description=description))

    await db.commit()
    return {"success": True, "message": "Store settings and parameters saved successfully."}


# ============================================================================
# 2. CUSTOMER LOVE & TESTIMONIALS ADMIN CRUD
# ============================================================================

@router.get("/admin/testimonials", response_model=List[TestimonialOut], summary="List All Customer Testimonials (Admin)")
async def admin_list_testimonials(
    current_admin: User = Depends(get_current_admin_user),
    db: AsyncSession = Depends(get_db),
):
    """Returns all customer feedback testimonials for administration and ordering."""
    res = await db.execute(select(Testimonial).order_by(Testimonial.display_order.asc(), Testimonial.customer_name.asc()))
    return res.scalars().all()


@router.post("/admin/testimonials", response_model=TestimonialOut, summary="Create New Customer Testimonial")
async def admin_create_testimonial(
    payload: TestimonialPayload,
    current_admin: User = Depends(get_current_admin_user),
    db: AsyncSession = Depends(get_db),
):
    """Adds a new verified customer review to the Customer Love showcase."""
    new_t = Testimonial(
        id=uuid.uuid4(),
        customer_name=payload.customer_name.strip(),
        location=payload.location.strip(),
        rating=max(1, min(5, payload.rating)),
        review_text=payload.review_text.strip(),
        product_name=payload.product_name.strip() if payload.product_name else None,
        is_featured=payload.is_featured,
        display_order=payload.display_order,
    )
    db.add(new_t)
    await db.commit()
    await db.refresh(new_t)
    return new_t


@router.put("/admin/testimonials/{testimonial_id}", response_model=TestimonialOut, summary="Update Customer Testimonial")
async def admin_update_testimonial(
    testimonial_id: uuid.UUID,
    payload: TestimonialPayload,
    current_admin: User = Depends(get_current_admin_user),
    db: AsyncSession = Depends(get_db),
):
    """Updates an existing customer review."""
    res = await db.execute(select(Testimonial).where(Testimonial.id == testimonial_id))
    t = res.scalar_one_or_none()
    if not t:
        raise HTTPException(status_code=404, detail="Testimonial not found")

    t.customer_name = payload.customer_name.strip()
    t.location = payload.location.strip()
    t.rating = max(1, min(5, payload.rating))
    t.review_text = payload.review_text.strip()
    t.product_name = payload.product_name.strip() if payload.product_name else None
    t.is_featured = payload.is_featured
    t.display_order = payload.display_order

    await db.commit()
    await db.refresh(t)
    return t


@router.delete("/admin/testimonials/{testimonial_id}", summary="Delete Customer Testimonial")
async def admin_delete_testimonial(
    testimonial_id: uuid.UUID,
    current_admin: User = Depends(get_current_admin_user),
    db: AsyncSession = Depends(get_db),
):
    """Deletes a customer testimonial."""
    res = await db.execute(select(Testimonial).where(Testimonial.id == testimonial_id))
    t = res.scalar_one_or_none()
    if not t:
        raise HTTPException(status_code=404, detail="Testimonial not found")

    await db.delete(t)
    await db.commit()
    return {"success": True, "message": f"Testimonial from '{t.customer_name}' removed."}
