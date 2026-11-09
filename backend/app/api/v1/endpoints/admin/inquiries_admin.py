"""
Admin Retail & B2B Wholesale Leads CRM & Newsletter Subscribers Management
"""

from typing import List, Optional
import uuid
from fastapi import APIRouter, Depends, HTTPException, Query, status
from pydantic import BaseModel
from sqlalchemy import or_, select
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.core.dependencies import require_role
from app.models.inquiry import BulkEnquiry, ContactMessage, NewsletterSubscriber
from app.models.user import User
from app.schemas.inquiry import (
    BulkEnquiryOut,
    ContactMessageOut,
    NewsletterSubscriberOut,
    NewsletterStatusUpdate,
)

router = APIRouter()


class InquiryStatusUpdate(BaseModel):
    status: str
    vendor_notes: Optional[str] = None


# -------------------------------------------------------------------------
# Retail Contact Inquiries
# -------------------------------------------------------------------------

@router.get("/admin/inquiries/contact", response_model=List[ContactMessageOut], summary="List Retail Inquiries")
async def list_contact_inquiries(
    status_filter: Optional[str] = Query(None, alias="status"),
    search: Optional[str] = Query(None),
    skip: int = 0,
    limit: int = 100,
    admin_user: User = Depends(require_role("admin", "vendor")),
    db: AsyncSession = Depends(get_db),
):
    stmt = select(ContactMessage).order_by(ContactMessage.created_at.desc())
    if status_filter:
        stmt = stmt.where(ContactMessage.status == status_filter.strip().upper())
    if search:
        term = f"%{search.strip().lower()}%"
        stmt = stmt.where(
            or_(
                ContactMessage.name.ilike(term),
                ContactMessage.email.ilike(term),
                ContactMessage.phone.ilike(term),
                ContactMessage.subject.ilike(term),
                ContactMessage.message.ilike(term),
            )
        )
    stmt = stmt.offset(skip).limit(limit)
    result = await db.execute(stmt)
    return result.scalars().all()


@router.patch("/admin/inquiries/contact/{inquiry_id}", response_model=ContactMessageOut, summary="Update Retail Inquiry Status")
async def update_contact_inquiry(
    inquiry_id: uuid.UUID,
    payload: InquiryStatusUpdate,
    admin_user: User = Depends(require_role("admin", "vendor")),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(select(ContactMessage).where(ContactMessage.id == inquiry_id))
    msg = result.scalar_one_or_none()
    if not msg:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Inquiry not found.")

    msg.status = payload.status.strip().upper()
    if payload.vendor_notes is not None:
        msg.vendor_notes = payload.vendor_notes

    await db.commit()
    await db.refresh(msg)
    return msg


@router.delete("/admin/inquiries/contact/{inquiry_id}", summary="Delete Retail Inquiry")
async def delete_contact_inquiry(
    inquiry_id: uuid.UUID,
    admin_user: User = Depends(require_role("admin", "vendor")),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(select(ContactMessage).where(ContactMessage.id == inquiry_id))
    msg = result.scalar_one_or_none()
    if not msg:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Inquiry not found.")

    await db.delete(msg)
    await db.commit()
    return {"success": True, "message": "Contact message deleted."}


# -------------------------------------------------------------------------
# Wholesale B2B Enquiries
# -------------------------------------------------------------------------

@router.get("/admin/inquiries/bulk", response_model=List[BulkEnquiryOut], summary="List B2B Wholesale Enquiries")
async def list_bulk_enquiries(
    status_filter: Optional[str] = Query(None, alias="status"),
    search: Optional[str] = Query(None),
    skip: int = 0,
    limit: int = 100,
    admin_user: User = Depends(require_role("admin", "vendor")),
    db: AsyncSession = Depends(get_db),
):
    stmt = select(BulkEnquiry).order_by(BulkEnquiry.created_at.desc())
    if status_filter:
        stmt = stmt.where(BulkEnquiry.status == status_filter.strip().upper())
    if search:
        term = f"%{search.strip().lower()}%"
        stmt = stmt.where(
            or_(
                BulkEnquiry.name.ilike(term),
                BulkEnquiry.company_name.ilike(term),
                BulkEnquiry.email.ilike(term),
                BulkEnquiry.phone.ilike(term),
                BulkEnquiry.category.ilike(term),
                BulkEnquiry.notes.ilike(term),
            )
        )
    stmt = stmt.offset(skip).limit(limit)
    result = await db.execute(stmt)
    return result.scalars().all()


@router.patch("/admin/inquiries/bulk/{inquiry_id}", response_model=BulkEnquiryOut, summary="Update B2B Enquiry Status")
async def update_bulk_enquiry(
    inquiry_id: uuid.UUID,
    payload: InquiryStatusUpdate,
    admin_user: User = Depends(require_role("admin", "vendor")),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(select(BulkEnquiry).where(BulkEnquiry.id == inquiry_id))
    enquiry = result.scalar_one_or_none()
    if not enquiry:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="B2B enquiry not found.")

    enquiry.status = payload.status.strip().upper()
    if payload.vendor_notes is not None:
        enquiry.vendor_notes = payload.vendor_notes

    await db.commit()
    await db.refresh(enquiry)
    return enquiry


@router.delete("/admin/inquiries/bulk/{inquiry_id}", summary="Delete B2B Enquiry")
async def delete_bulk_enquiry(
    inquiry_id: uuid.UUID,
    admin_user: User = Depends(require_role("admin", "vendor")),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(select(BulkEnquiry).where(BulkEnquiry.id == inquiry_id))
    enquiry = result.scalar_one_or_none()
    if not enquiry:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="B2B enquiry not found.")

    await db.delete(enquiry)
    await db.commit()
    return {"success": True, "message": "B2B enquiry deleted."}


# -------------------------------------------------------------------------
# Newsletter Subscribers
# -------------------------------------------------------------------------

@router.get("/admin/inquiries/newsletter", response_model=List[NewsletterSubscriberOut], summary="List Newsletter Subscribers")
async def list_newsletter_subscribers(
    search: Optional[str] = Query(None),
    active_filter: Optional[bool] = Query(None, alias="is_active"),
    skip: int = 0,
    limit: int = 150,
    admin_user: User = Depends(require_role("admin", "vendor")),
    db: AsyncSession = Depends(get_db),
):
    stmt = select(NewsletterSubscriber).order_by(NewsletterSubscriber.subscribed_at.desc())
    if search:
        stmt = stmt.where(NewsletterSubscriber.email.ilike(f"%{search.strip().lower()}%"))
    if active_filter is not None:
        stmt = stmt.where(NewsletterSubscriber.is_active == active_filter)
    stmt = stmt.offset(skip).limit(limit)
    result = await db.execute(stmt)
    return result.scalars().all()


@router.patch("/admin/inquiries/newsletter/{subscriber_id}", response_model=NewsletterSubscriberOut, summary="Toggle Subscriber Active Status")
async def update_newsletter_subscriber(
    subscriber_id: uuid.UUID,
    payload: NewsletterStatusUpdate,
    admin_user: User = Depends(require_role("admin", "vendor")),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(select(NewsletterSubscriber).where(NewsletterSubscriber.id == subscriber_id))
    sub = result.scalar_one_or_none()
    if not sub:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Newsletter subscriber not found.")

    sub.is_active = payload.is_active
    await db.commit()
    await db.refresh(sub)
    return sub


@router.delete("/admin/inquiries/newsletter/{subscriber_id}", summary="Delete Newsletter Subscriber")
async def delete_newsletter_subscriber(
    subscriber_id: uuid.UUID,
    admin_user: User = Depends(require_role("admin", "vendor")),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(select(NewsletterSubscriber).where(NewsletterSubscriber.id == subscriber_id))
    sub = result.scalar_one_or_none()
    if not sub:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Newsletter subscriber not found.")

    await db.delete(sub)
    await db.commit()
    return {"success": True, "message": "Subscriber removed."}
