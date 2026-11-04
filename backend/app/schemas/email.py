"""
Dynamic Email Templates & SMTP Configuration Schemas
"""

import uuid
from datetime import datetime
from typing import Any, Dict, List, Optional
from pydantic import BaseModel, ConfigDict, EmailStr


class EmailTemplateCreate(BaseModel):
    template_key: str
    name: str
    subject: str
    body_html: str
    body_text: str
    available_variables: List[str] = []
    is_active: bool = True


class EmailTemplateUpdate(BaseModel):
    name: Optional[str] = None
    subject: Optional[str] = None
    body_html: Optional[str] = None
    body_text: Optional[str] = None
    available_variables: Optional[List[str]] = None
    is_active: Optional[bool] = None


class EmailTemplateOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: uuid.UUID
    template_key: str
    name: str
    subject: str
    body_html: str
    body_text: str
    available_variables: List[str]
    is_active: bool
    created_at: datetime
    updated_at: datetime


class EmailTemplatePreviewRequest(BaseModel):
    template_key: str
    sample_data: Dict[str, Any] = {}


class EmailTestRequest(BaseModel):
    recipient_email: EmailStr
    template_key: str
    sample_data: Dict[str, Any] = {}


class SMTPSettingsUpdate(BaseModel):
    host: str
    port: int = 587
    user: str
    password: Optional[str] = None  # Leave blank to keep existing
    use_tls: bool = True
    from_name: str
    from_email: EmailStr


class SMTPSettingsOut(BaseModel):
    host: str
    port: int
    user: str
    use_tls: bool
    from_name: str
    from_email: str
    is_password_set: bool


class EmailLogOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: uuid.UUID
    recipient_email: str
    template_key: str
    subject: str
    status: str
    error_message: Optional[str] = None
    sent_at: datetime
