"""
Admin & Vendor Operations Router Package
"""

from fastapi import APIRouter
from app.api.v1.endpoints.admin import dashboard, email_admin, inquiries_admin, orders_admin

admin_router = APIRouter()

admin_router.include_router(dashboard.router, tags=["Admin - Overview & KPI"])
admin_router.include_router(orders_admin.router, tags=["Admin - Order Fulfillment"])
admin_router.include_router(email_admin.router, tags=["Admin - Email Templates & SMTP"])
admin_router.include_router(inquiries_admin.router, tags=["Admin - Retail & Wholesale CRM"])
