"""
Admin & Vendor Operations Router Package
"""

from fastapi import APIRouter
from app.api.v1.endpoints.admin import (
    blogs_admin,
    catalog_admin,
    coupons_admin,
    dashboard,
    email_admin,
    inquiries_admin,
    media_admin,
    orders_admin,
    users_admin,
    settings_admin,
)

admin_router = APIRouter()

admin_router.include_router(dashboard.router, tags=["Admin - Overview & KPI"])
admin_router.include_router(users_admin.router, tags=["Admin - Customers & Users"])
admin_router.include_router(catalog_admin.router, tags=["Admin - Products & Categories"])
admin_router.include_router(orders_admin.router, tags=["Admin - Order Fulfillment"])
admin_router.include_router(blogs_admin.router, tags=["Admin - Agronomy Journal"])
admin_router.include_router(media_admin.router, tags=["Admin - Cloud S3 & Media"])
admin_router.include_router(email_admin.router, tags=["Admin - Email Templates & SMTP"])
admin_router.include_router(inquiries_admin.router, tags=["Admin - Retail & Wholesale CRM"])
admin_router.include_router(settings_admin.router, tags=["Admin - Store Policies & Settings"])
admin_router.include_router(coupons_admin.router, tags=["Admin - Promotional Offers & Coupons"])

