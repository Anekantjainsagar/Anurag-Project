"""
Contact Us, B2B Bulk Enquiry & Newsletter Endpoints
Forwards submissions to vendor Anurag Jain <meriwebdunia@gmail.com>.
"""

from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.config import settings
from app.core.database import get_db
from app.models.inquiry import BulkEnquiry, ContactMessage, NewsletterSubscriber
from app.schemas.inquiry import (
    BulkEnquiryCreate,
    BulkEnquiryOut,
    ContactMessageCreate,
    ContactMessageOut,
    NewsletterSubscribeRequest,
    NewsletterSubscribeResponse,
)
from app.services.email_service import EmailService

router = APIRouter()


@router.post("/inquiries/contact", response_model=ContactMessageOut, summary="Submit Contact Inquiry")
async def submit_contact(payload: ContactMessageCreate, db: AsyncSession = Depends(get_db)):
    msg = ContactMessage(**payload.model_dump())
    db.add(msg)
    await db.commit()
    await db.refresh(msg)

    # Forward to vendor via SMTP
    await EmailService.send_email(
        db=db,
        recipient_email=settings.VENDOR_EMAIL,
        template_key="CONTACT_US_ALERT",
        context=payload.model_dump(),
    )

    return msg


@router.post("/inquiries/bulk", response_model=BulkEnquiryOut, summary="Submit B2B Bulk Supply Request")
async def submit_bulk_enquiry(payload: BulkEnquiryCreate, db: AsyncSession = Depends(get_db)):
    enquiry = BulkEnquiry(**payload.model_dump())
    db.add(enquiry)
    await db.commit()
    await db.refresh(enquiry)

    # Forward B2B lead to vendor
    await EmailService.send_email(
        db=db,
        recipient_email=settings.VENDOR_EMAIL,
        template_key="CONTACT_US_ALERT",
        context={
            "name": f"{payload.name} ({payload.company_name or 'Individual'})",
            "email": payload.email,
            "phone": payload.phone,
            "subject": f"B2B Wholesale Request: {payload.category} ({payload.quantity})",
            "message": f"Category: {payload.category}\nQuantity: {payload.quantity}\nDestination: {payload.destination or 'N/A'}\nNotes: {payload.notes or 'None'}",
        },
    )

    return enquiry


@router.post("/newsletter/subscribe", response_model=NewsletterSubscribeResponse, summary="Subscribe to Farm Club")
async def subscribe_newsletter(payload: NewsletterSubscribeRequest, db: AsyncSession = Depends(get_db)):
    clean_email = str(payload.email).strip().lower()
    res = await db.execute(select(NewsletterSubscriber).where(NewsletterSubscriber.email == clean_email))
    existing = res.scalar_one_or_none()

    if not existing:
        sub = NewsletterSubscriber(email=clean_email, coupon_code="HARVEST10")
        db.add(sub)
        await db.commit()

    return NewsletterSubscribeResponse(
        success=True,
        email=clean_email,
        coupon_code="HARVEST10",
        message="Welcome to the Farm Club! Coupon HARVEST10 has been activated for 10% off your order.",
    )
