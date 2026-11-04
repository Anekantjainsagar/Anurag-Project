"""
Cryptography, Password Hashing, JWT & OTP Security Utilities
"""

import hashlib
import random
import secrets
from datetime import datetime, timedelta, timezone
from typing import Any, Dict, Optional
from jose import JWTError, jwt
from passlib.context import CryptContext
from app.core.config import settings

# Password hashing context (bcrypt)
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verifies a plain password against its bcrypt hash."""
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password: str) -> str:
    """Computes a bcrypt hash for a plain password."""
    return pwd_context.hash(password)


def create_access_token(subject: str, role: str, expires_delta: Optional[timedelta] = None) -> str:
    """Creates a short-lived signed JWT access token."""
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)

    to_encode: Dict[str, Any] = {
        "sub": str(subject),
        "role": role,
        "exp": expire,
        "iat": datetime.now(timezone.utc),
        "type": "access",
    }
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
    return encoded_jwt


def create_refresh_token() -> tuple[str, str]:
    """
    Generates a secure random refresh token string and its SHA-256 hash.
    Returns: (raw_refresh_token, hashed_refresh_token)
    """
    raw_token = secrets.token_urlsafe(64)
    hashed_token = hashlib.sha256(raw_token.encode("utf-8")).hexdigest()
    return raw_token, hashed_token


def hash_refresh_token(raw_token: str) -> str:
    """Hashes a raw refresh token using SHA-256 for database lookup."""
    return hashlib.sha256(raw_token.encode("utf-8")).hexdigest()


def decode_token(token: str) -> Optional[Dict[str, Any]]:
    """Decodes and validates a JWT token signature and expiration."""
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        return payload
    except JWTError:
        return None


def generate_otp_code(digits: int = 4) -> str:
    """Generates a secure numeric OTP string (e.g. 4-digit '8921')."""
    return "".join(random.choice("0123456789") for _ in range(digits))


def hash_otp_code(otp_code: str) -> str:
    """Hashes an OTP code with SHA-256 to prevent plain text exposure in DB."""
    return hashlib.sha256(otp_code.encode("utf-8")).hexdigest()


def verify_otp_code(otp_code: str, stored_hash: str) -> bool:
    """Verifies user-submitted OTP against stored hash."""
    return hash_otp_code(otp_code) == stored_hash

