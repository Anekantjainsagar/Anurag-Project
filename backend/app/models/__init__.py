"""
Model Package Aggregator
Exports all 36 database models so SQLAlchemy metadata & migrations discover everything.
"""

from app.core.database import Base
from app.models.user import User, UserSession, UserAddress, OTPVerification
from app.models.catalog import (
    Category,
    Product,
    ProductVariant,
    ProductImage,
    ProductFeature,
    ProductNutritionalFact,
    ProductPurityParameter,
    HarvestBatch,
)
from app.models.cart import CartItem, WishlistItem
from app.models.coupon import Coupon, CouponRedemption, LoyaltyLedger
from app.models.order import Order, OrderItem, OrderTrackingEvent, OrderReturn
from app.models.review import ProductReview, ProductFAQ
from app.models.blog import BlogCategory, BlogPost, BlogNutritionalHighlight
from app.models.inquiry import ContactMessage, BulkEnquiry, NewsletterSubscriber
from app.models.email import EmailTemplate, EmailLog
from app.models.settings import (
    SiteSetting,
    PromoBanner,
    Testimonial,
    WhyChooseFeature,
    AuditLog,
)

__all__ = [
    "Base",
    # User
    "User",
    "UserSession",
    "UserAddress",
    "OTPVerification",
    # Catalog
    "Category",
    "Product",
    "ProductVariant",
    "ProductImage",
    "ProductFeature",
    "ProductNutritionalFact",
    "ProductPurityParameter",
    "HarvestBatch",
    # Cart & Wishlist
    "CartItem",
    "WishlistItem",
    # Coupon & Loyalty
    "Coupon",
    "CouponRedemption",
    "LoyaltyLedger",
    # Order
    "Order",
    "OrderItem",
    "OrderTrackingEvent",
    "OrderReturn",
    # Reviews
    "ProductReview",
    "ProductFAQ",
    # Blog
    "BlogCategory",
    "BlogPost",
    "BlogNutritionalHighlight",
    # Inquiry
    "ContactMessage",
    "BulkEnquiry",
    "NewsletterSubscriber",
    # Email & SMTP
    "EmailTemplate",
    "EmailLog",
    # CMS & Settings
    "SiteSetting",
    "PromoBanner",
    "Testimonial",
    "WhyChooseFeature",
    "AuditLog",
]
