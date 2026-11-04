"""
Admin Retail & B2B Wholesale Leads CRM
"""

from typing import List, Optional
import uuid
from fastapi import APIRouter, Depends, HTTPException, Query, status
from pydantic import BaseModel
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.core.dependencies import require_role
from app.models.inquiry import BulkEnquiry, ContactMessage
from app.models.user import User
from app.schemas.inquiry import BulkEnquiryOut, ContactMessageOut

router = APIRouter()


class InquiryStatusUpdate(BaseModel):
    status: str
    vendor_notes: Optional[str] = None


@router.get("/admin/inquiries/contact", response_model=List[ContactMessageOut], summary="List Retail Inquiries")
async def list_contact_inquiries(
    status_filter: Optional[str] = Query(None, alias="status"),
    skip: int = 0,
    limit: int = 50,
    admin_user: User = Depends(require_role("admin", "vendor")),
    db: AsyncSession = Depends(get_db),
):
    stmt = select(ContactMessage).order_by(ContactMessage.created_at.desc())
    if status_filter:
        stmt = stmt.where(ContactMessage.status == status_filter.strip().upper())
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
    if payload.vendor_notes:
        msg.vendor_notes = payload.vendor_notes

    await db.commit()
    await db.refresh(msg)
    return msg


@router.get("/admin/inquiries/bulk", response_model=List[BulkEnquiryOut], summary="List B2B Wholesale Enquiries")
async def list_bulk_enquiries(
    status_filter: Optional[str] = Query(None, alias="status"),
    skip: int = 0,
    limit: int = 50,
    admin_user: User = Depends(require_role("admin", "vendor")),
    db: AsyncSession = Depends(get_db),
):
    stmt = select(BulkEnquiry).order_by(BulkEnquiry.created_at.desc())
    if status_filter:
        stmt = stmt.where(BulkEnquiry.status == status_filter.strip().upper())
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
    if payload.vendor_notes:
        enquiry.vendor_notes = payload.vendor_notes

    await db.commit()
    await db.refresh(enquiry)
    return enquiry

