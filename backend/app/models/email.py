"""
Dynamic SMTP & Database-Driven Email Templates
Templates and outbox delivery audit logs configurable directly from the Admin Panel.
"""

import uuid
from datetime import datetime, timezone
from sqlalchemy import (
    Boolean,
    Column,
    DateTime,
    String,
    Text,
)
from sqlalchemy.dialects.postgresql import JSONB, UUID
from app.core.database import Base


class EmailTemplate(Base):
    __tablename__ = "email_templates"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    template_key = Column(String(100), unique=True, index=True, nullable=False)
    name = Column(String(150), nullable=False)
    subject = Column(String(255), nullable=False)
    body_html = Column(Text, nullable=False)
    body_text = Column(Text, nullable=False)
    available_variables = Column(JSONB, default=list, nullable=False)
    is_active = Column(Boolean, default=True, nullable=False)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))


class EmailLog(Base):
    __tablename__ = "email_logs"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    recipient_email = Column(String(255), nullable=False, index=True)
    template_key = Column(String(100), nullable=False, index=True)
    subject = Column(String(255), nullable=False)
    status = Column(String(20), default="SENT", nullable=False)  # SENT, FAILED, PENDING
    error_message = Column(Text, nullable=True)
    sent_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
