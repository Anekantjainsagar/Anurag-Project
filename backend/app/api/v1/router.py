"""
API v1 Router Aggregator
Mounts all customer, catalog, checkout, inquiry, and dynamic CMS sub-routers.
"""

from fastapi import APIRouter
from app.api.v1.endpoints import (
    auth,
    blogs,
    cart,
    catalog,
    health,
    inquiries,
    orders,
    profile,
    settings,
)

api_router = APIRouter()

# System & Health
api_router.include_router(health.router, tags=["System & Telemetry"])

# Authentication & Sessions
api_router.include_router(auth.router, tags=["Authentication & OTP"])

# User Profile & Multi-Address Book
api_router.include_router(profile.router, tags=["Profile & Address Book"])

# Catalog, Categories & Products
api_router.include_router(catalog.router, tags=["Catalog & Products"])

# Cart & Wishlist
api_router.include_router(cart.router, tags=["Cart & Shopping"])

# Checkout, Orders & Real-time Tracking
api_router.include_router(orders.router, tags=["Orders & Checkout"])

# Health Journal & Agronomy Blogs
api_router.include_router(blogs.router, tags=["Agronomy Journal & Blogs"])

# Retail Inquiries, B2B Leads & Farm Club
api_router.include_router(inquiries.router, tags=["Inquiries & Newsletter"])

# Dynamic CMS, Settings & Banners
api_router.include_router(settings.router, tags=["Storefront CMS & Settings"])
