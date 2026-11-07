"""
Pydantic v2 Schema Aggregator
"""

from app.schemas.user import (
    UserBase,
    UserCreate,
    UserUpdate,
    UserOut,
    UserWithAddresses,
    UserAddressBase,
    UserAddressCreate,
    UserAddressUpdate,
    UserAddressOut,
    OTPRequest,
    OTPVerify,
    TokenResponse,
    SessionOut,
    AdminUserSummary,
    AdminUserOrderBrief,
    AdminUserDetail,
    AdminUserCreate,
    AdminUserUpdate,
)
from app.schemas.catalog import (
    CategoryOut,
    ProductVariantOut,
    ProductImageOut,
    ProductFeatureOut,
    ProductNutritionalFactOut,
    ProductPurityParameterOut,
    HarvestBatchOut,
    ProductListOut,
    ProductDetailOut,
)
from app.schemas.cart import (
    CartItemCreate,
    CartItemUpdate,
    CartItemOut,
    CartSummaryOut,
    WishlistItemOut,
    WishlistToggleRequest,
)
from app.schemas.order import (
    OrderItemCreate,
    OrderItemOut,
    OrderTrackingEventOut,
    OrderCreate,
    OrderOut,
    OrderReturnCreate,
    OrderReturnOut,
)
from app.schemas.coupon import (
    CouponValidateRequest,
    CouponValidateResponse,
    CouponOut,
    LoyaltyBalanceOut,
    LoyaltyLedgerOut,
)
from app.schemas.review import (
    ReviewCreate,
    ReviewOut,
    FAQCreate,
    FAQOut,
)
from app.schemas.blog import (
    BlogCategoryOut,
    BlogNutritionalHighlightOut,
    BlogPostListOut,
    BlogPostDetailOut,
)
from app.schemas.inquiry import (
    ContactMessageCreate,
    ContactMessageOut,
    BulkEnquiryCreate,
    BulkEnquiryOut,
    NewsletterSubscribeRequest,
    NewsletterSubscribeResponse,
)
from app.schemas.email import (
    EmailTemplateCreate,
    EmailTemplateUpdate,
    EmailTemplateOut,
    EmailTemplatePreviewRequest,
    EmailTestRequest,
    SMTPSettingsUpdate,
    SMTPSettingsOut,
    EmailLogOut,
)
from app.schemas.settings import (
    SiteSettingsOut,
    PromoBannerOut,
    TestimonialOut,
    WhyChooseFeatureOut,
)

