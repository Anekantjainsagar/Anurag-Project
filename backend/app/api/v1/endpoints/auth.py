"""
Authentication & Session Endpoints
Supports Phone OTP, Email magic login, JWT access/refresh token rotation, and remote logout.
"""

from datetime import datetime, timedelta, timezone
from typing import Optional
import uuid
from fastapi import APIRouter, Depends, HTTPException, Response, status
from sqlalchemy import select, update
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.config import settings
from app.core.database import get_db
from app.core.dependencies import get_current_user
from app.core.security import (
    create_access_token,
    create_refresh_token,
    generate_otp_code,
    hash_otp_code,
    hash_refresh_token,
    verify_otp_code,
)
from app.models.user import OTPVerification, User, UserSession
from app.schemas.user import OTPRequest, OTPVerify, SessionOut, TokenResponse, UserOut, UserWithAddresses

router = APIRouter()


@router.post("/auth/otp/send", summary="Send Phone or Email OTP")
async def send_otp(payload: OTPRequest, db: AsyncSession = Depends(get_db)):
    """
    Generates a secure 4-digit OTP code, stores the SHA-256 hash, and simulates/dispatches SMS or WhatsApp.
    """
    clean_identifier = payload.identifier.strip()
    otp_code = generate_otp_code(digits=4)
    otp_hashed = hash_otp_code(otp_code)
    expires_at = datetime.now(timezone.utc) + timedelta(minutes=5)

    otp_entry = OTPVerification(
        identifier=clean_identifier,
        otp_hash=otp_hashed,
        channel=payload.channel,
        expires_at=expires_at,
    )
    db.add(otp_entry)
    await db.commit()

    # Log OTP in development console for instant test logins
    print(f"🔑 [AUTH OTP] Identifier: {clean_identifier} | Channel: {payload.channel} | Code: {otp_code}")

    return {
        "success": True,
        "message": f"OTP sent to {clean_identifier}",
        "channel": payload.channel,
        "dev_code": otp_code if settings.DEBUG else None,
    }


@router.post("/auth/otp/verify", response_model=TokenResponse, summary="Verify OTP & Sign In")
async def verify_otp(payload: OTPVerify, response: Response, db: AsyncSession = Depends(get_db)):
    """
    Verifies user OTP code.
    If the account does not exist, registers the user automatically.
    Returns short-lived Access Token and creates an active UserSession.
    """
    clean_identifier = payload.identifier.strip()
    now = datetime.now(timezone.utc)

    # Find active OTP entry
    result = await db.execute(
        select(OTPVerification)
        .where(
            OTPVerification.identifier == clean_identifier,
            OTPVerification.is_used.is_(False),
            OTPVerification.expires_at > now,
        )
        .order_by(OTPVerification.created_at.desc())
    )
    otp_entry = result.scalar_one_or_none()

    if not otp_entry or not verify_otp_code(payload.otp_code, otp_entry.otp_hash):
        if otp_entry:
            otp_entry.attempts += 1
            await db.commit()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid or expired OTP code.",
        )

    # Mark OTP as consumed
    otp_entry.is_used = True

    # Find or create user
    is_email = "@" in clean_identifier
    if is_email:
        user_res = await db.execute(select(User).where(User.email == clean_identifier))
    else:
        user_res = await db.execute(select(User).where(User.phone == clean_identifier))

    user = user_res.scalar_one_or_none()

    if not user:
        # Create new customer
        default_name = payload.full_name or f"Harvest Customer {clean_identifier[-4:]}"
        user = User(
            full_name=default_name,
            phone=clean_identifier if not is_email else None,
            email=clean_identifier if is_email else None,
            role="customer",
            is_active=True,
            is_verified=True,
        )
        db.add(user)
        await db.flush()
    else:
        user.is_verified = True

    # Generate JWT access token & secure refresh token
    access_token = create_access_token(subject=str(user.id), role=user.role)
    raw_refresh, hashed_refresh = create_refresh_token()
    refresh_expires = now + timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS)

    session = UserSession(
        user_id=user.id,
        refresh_token_hash=hashed_refresh,
        device_info="Web Browser",
        expires_at=refresh_expires,
    )
    db.add(session)
    await db.commit()
    await db.refresh(user)

    # Store refresh token in secure HttpOnly cookie
    response.set_cookie(
        key="onaar_refresh_token",
        value=raw_refresh,
        httponly=True,
        secure=not settings.DEBUG,
        samesite="lax",
        max_age=settings.REFRESH_TOKEN_EXPIRE_DAYS * 86400,
    )

    return TokenResponse(
        access_token=access_token,
        token_type="bearer",
        expires_in=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
        user=UserOut.model_validate(user),
    )


@router.get("/auth/me", response_model=UserWithAddresses, summary="Get Current Authenticated User")
async def get_me(current_user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    """Returns the authenticated customer profile with saved addresses."""
    await db.refresh(current_user, ["addresses"])
    return current_user


@router.post("/auth/logout", summary="Logout & Revoke Active Session")
async def logout(
    response: Response,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Revokes active user sessions and clears HttpOnly refresh cookie."""
    await db.execute(
        update(UserSession)
        .where(UserSession.user_id == current_user.id)
        .values(is_revoked=True)
    )
    await db.commit()
    response.delete_cookie(key="onaar_refresh_token")
    return {"success": True, "message": "Successfully logged out."}

