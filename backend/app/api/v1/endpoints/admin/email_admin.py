"""
Admin Dynamic Email Templates & SMTP Configuration
Allows full editing of HTML templates, SMTP credentials, live tests, and delivery logs.
"""

from typing import List
import aiosmtplib
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.config import settings as app_settings
from app.core.database import get_db
from app.core.dependencies import require_role
from app.models.email import EmailLog, EmailTemplate
from app.models.settings import SiteSetting
from app.models.user import User
from app.schemas.email import (
    EmailLogOut,
    EmailTemplateCreate,
    EmailTemplateOut,
    EmailTemplatePreviewRequest,
    EmailTemplateUpdate,
    EmailTestRequest,
    SMTPSettingsOut,
    SMTPSettingsUpdate,
)
from app.services.email_service import EmailService

router = APIRouter()


# Template Management
@router.get("/admin/email/templates", response_model=List[EmailTemplateOut], summary="List Email Templates")
async def list_email_templates(
    admin_user: User = Depends(require_role("admin", "vendor")),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(select(EmailTemplate).order_by(EmailTemplate.name.asc()))
    return result.scalars().all()


@router.get("/admin/email/templates/{template_key}", response_model=EmailTemplateOut, summary="Get Email Template")
async def get_email_template(
    template_key: str,
    admin_user: User = Depends(require_role("admin", "vendor")),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(select(EmailTemplate).where(EmailTemplate.template_key == template_key))
    tmpl = result.scalar_one_or_none()
    if not tmpl:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Template not found.")
    return tmpl


@router.put("/admin/email/templates/{template_key}", response_model=EmailTemplateOut, summary="Update Email Template")
async def update_email_template(
    template_key: str,
    payload: EmailTemplateUpdate,
    admin_user: User = Depends(require_role("admin")),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(select(EmailTemplate).where(EmailTemplate.template_key == template_key))
    tmpl = result.scalar_one_or_none()
    if not tmpl:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Template not found.")

    update_data = payload.model_dump(exclude_unset=True)
    for field, val in update_data.items():
        setattr(tmpl, field, val)

    await db.commit()
    await db.refresh(tmpl)
    return tmpl


@router.post("/admin/email/templates/preview", summary="Live Preview Rendered Template")
async def preview_email_template(
    payload: EmailTemplatePreviewRequest,
    admin_user: User = Depends(require_role("admin", "vendor")),
    db: AsyncSession = Depends(get_db),
):
    sample = payload.sample_data or {
        "order_number": "YB-20261104-8921",
        "order_date": "04 Nov 2026",
        "customer_name": "Anekant Jain",
        "customer_phone": "+91-98765 43210",
        "customer_email": "customer@example.com",
        "delivery_address": "Flat 402, Green Acres, Bhopal, MP - 462001",
        "order_notes": "Call before delivery",
        "order_items": "1. Organic Arhar Dal (1kg) x 2 = ₹440.00\n2. Pure Wild Honey (500g) x 1 = ₹350.00",
        "subtotal": "790.00",
        "shipping_fee": "FREE",
        "total_amount": "790.00",
        "vendor_email": "meriwebdunia@gmail.com",
    }
    subject, html_body, text_body = await EmailService.render_template(db, payload.template_key, sample)
    return {
        "subject": subject,
        "html": html_body,
        "text": text_body,
    }


@router.post("/admin/email/templates/send-test", summary="Send Test Email")
async def send_test_email(
    payload: EmailTestRequest,
    admin_user: User = Depends(require_role("admin")),
    db: AsyncSession = Depends(get_db),
):
    sample = payload.sample_data or {
        "order_number": "TEST-1001",
        "order_date": "04 Nov 2026",
        "customer_name": "Test Recipient",
        "customer_phone": "+91-98765 43210",
        "customer_email": str(payload.recipient_email),
        "delivery_address": "Test Street, Indore, MP - 452001",
        "order_notes": "None",
        "order_items": "1. Organic Sharbati Wheat Atta (5kg) x 1 = ₹450.00",
        "subtotal": "450.00",
        "shipping_fee": "FREE",
        "total_amount": "450.00",
        "vendor_email": "meriwebdunia@gmail.com",
    }
    success = await EmailService.send_email(
        db=db,
        recipient_email=str(payload.recipient_email),
        template_key=payload.template_key,
        context=sample,
    )
    return {
        "success": success,
        "message": f"Test email dispatched to {payload.recipient_email}." if success else "Test email delivery failed. Verify SMTP settings.",
    }


# SMTP Server Settings
@router.get("/admin/email/smtp-config", response_model=SMTPSettingsOut, summary="Get SMTP Settings")
async def get_smtp_settings(
    admin_user: User = Depends(require_role("admin")),
    db: AsyncSession = Depends(get_db),
):
    cfg = await EmailService.get_smtp_config(db)
    return SMTPSettingsOut(
        host=cfg["host"],
        port=cfg["port"],
        user=cfg["user"],
        use_tls=cfg["use_tls"],
        from_name=cfg["from_name"],
        from_email=cfg["from_email"],
        is_password_set=bool(cfg.get("password")),
    )


@router.put("/admin/email/smtp-config", summary="Update SMTP Credentials")
async def update_smtp_settings(
    payload: SMTPSettingsUpdate,
    admin_user: User = Depends(require_role("admin")),
    db: AsyncSession = Depends(get_db),
):
    """
    Updates SMTP configuration (Gmail, SendGrid, Amazon SES, or custom server).
    Credentials stored in site_settings table.
    """
    result = await db.execute(select(SiteSetting).where(SiteSetting.key == "smtp_settings"))
    setting = result.scalar_one_or_none()

    existing_val = setting.value if setting and isinstance(setting.value, dict) else {}
    password = payload.password if payload.password else existing_val.get("password", "")

    new_val = {
        "host": payload.host.strip(),
        "port": payload.port,
        "user": payload.user.strip(),
        "password": password,
        "use_tls": payload.use_tls,
        "from_name": payload.from_name.strip(),
        "from_email": str(payload.from_email).strip(),
    }

    if not setting:
        setting = SiteSetting(
            key="smtp_settings",
            value=new_val,
            description="Production SMTP server configuration",
        )
        db.add(setting)
    else:
        setting.value = new_val

    await db.commit()
    return {"success": True, "message": "SMTP configuration updated successfully."}


@router.post("/admin/email/smtp-config/verify", summary="Test Live SMTP Handshake")
async def verify_smtp_handshake(
    admin_user: User = Depends(require_role("admin")),
    db: AsyncSession = Depends(get_db),
):
    """Performs live network handshake to verify SMTP server and credentials."""
    cfg = await EmailService.get_smtp_config(db)
    if not cfg.get("password"):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="SMTP password has not been configured.",
        )

    try:
        smtp = aiosmtplib.SMTP(
            hostname=cfg["host"],
            port=cfg["port"],
            start_tls=cfg["use_tls"],
            timeout=10,
        )
        await smtp.connect()
        await smtp.login(cfg["user"], cfg["password"])
        await smtp.quit()
        return {"success": True, "message": f"Successfully authenticated with {cfg['host']}:{cfg['port']} as {cfg['user']}!"}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"SMTP handshake failed: {e}",
        )


@router.get("/admin/email/logs", response_model=List[EmailLogOut], summary="View Email Outbox Logs")
async def list_email_logs(
    skip: int = 0,
    limit: int = 50,
    admin_user: User = Depends(require_role("admin", "vendor")),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(select(EmailLog).order_by(EmailLog.sent_at.desc()).offset(skip).limit(limit))
    return result.scalars().all()
