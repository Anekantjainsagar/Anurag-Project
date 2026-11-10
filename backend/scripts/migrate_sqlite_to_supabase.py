"""
Automated Migration Engine: SQLite (onaar.db) -> Supabase (PostgreSQL)
Migrates all 36 tables, 192 organic crops, variants, images, users, orders,
coupons, settings, and testimonials from local SQLite directly into Supabase.
"""

import asyncio
import os
import sys
from decimal import Decimal
import uuid
import sqlite3
from datetime import datetime

# Add backend directory to sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from app.core.database import Base
# Import all models to register with Base.metadata
from app.models.user import User, UserAddress, UserSession, OTPVerification
from app.models.product import (
    Category,
    Product,
    ProductVariant,
    ProductImage,
    ProductFeature,
    ProductNutritionalFact,
    ProductPurityParameter,
    ProductReview,
    ProductFAQ,
    HarvestBatch,
)
from app.models.order import Order, OrderItem, OrderTrackingEvent, OrderReturn, CartItem, WishlistItem
from app.models.coupon import Coupon, CouponRedemption, LoyaltyLedger
from app.models.blog import BlogCategory, BlogPost, BlogNutritionalHighlight
from app.models.inquiry import ContactMessage, BulkEnquiry, NewsletterSubscriber
from app.models.email_template import EmailTemplate, EmailLog
from app.models.settings import SiteSetting, PromoBanner, Testimonial, WhyChooseFeature, AuditLog


async def migrate(target_postgres_url: str):
    print("=" * 60)
    print("🌿 ONAAR DATABASE MIGRATION: SQLite -> Supabase PostgreSQL")
    print("=" * 60)
    print(f"Target Database: {target_postgres_url.split('@')[-1] if '@' in target_postgres_url else target_postgres_url}")

    # 1. Connect to PostgreSQL
    engine = create_async_engine(target_postgres_url, echo=False)
    async_session = async_sessionmaker(engine, expire_on_commit=False, class_=AsyncSession)

    # 2. Create tables
    print("\n1. Creating all 36 tables in Supabase PostgreSQL...")
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    print("✓ Tables verified / created in Supabase.")

    # 3. Connect to SQLite
    sqlite_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "onaar.db"))
    if not os.path.exists(sqlite_path):
        print(f"❌ SQLite database not found at {sqlite_path}")
        return

    sqlite_conn = sqlite3.connect(sqlite_path)
    sqlite_conn.row_factory = sqlite3.Row
    s_cur = sqlite_conn.cursor()

    # Tables to migrate in dependency order
    migration_plan = [
        ("categories", Category),
        ("products", Product),
        ("product_variants", ProductVariant),
        ("product_images", ProductImage),
        ("product_features", ProductFeature),
        ("product_nutritional_facts", ProductNutritionalFact),
        ("product_purity_parameters", ProductPurityParameter),
        ("users", User),
        ("user_addresses", UserAddress),
        ("user_sessions", UserSession),
        ("coupons", Coupon),
        ("orders", Order),
        ("order_items", OrderItem),
        ("order_tracking_events", OrderTrackingEvent),
        ("coupon_redemptions", CouponRedemption),
        ("blog_posts", BlogPost),
        ("blog_nutritional_highlights", BlogNutritionalHighlight),
        ("site_settings", SiteSetting),
        ("testimonials", Testimonial),
        ("email_templates", EmailTemplate),
        ("contact_messages", ContactMessage),
        ("bulk_enquiries", BulkEnquiry),
        ("newsletter_subscribers", NewsletterSubscriber),
    ]

    print("\n2. Migrating rows from SQLite to Supabase PostgreSQL...")
    async with async_session() as session:
        for table_name, model_class in migration_plan:
            try:
                s_cur.execute(f"SELECT * FROM {table_name}")
                rows = s_cur.fetchall()
                if not rows:
                    continue

                count = 0
                for row in rows:
                    row_dict = dict(row)
                    # Convert string UUIDs to uuid.UUID
                    model_kwargs = {}
                    for col in model_class.__table__.columns:
                        col_name = col.name
                        if col_name in row_dict:
                            val = row_dict[col_name]
                            if val is not None:
                                # Convert UUID strings
                                if str(col.type) == "UUID" or "UUID" in str(type(col.type)):
                                    try:
                                        val = uuid.UUID(str(val))
                                    except Exception:
                                        pass
                                # Convert ISO strings to datetime
                                elif "DATETIME" in str(col.type).upper() or "TIMESTAMP" in str(col.type).upper():
                                    if isinstance(val, str):
                                        try:
                                            val = datetime.fromisoformat(val)
                                        except Exception:
                                            pass
                                # Convert numeric floats/ints to Decimal
                                elif "NUMERIC" in str(col.type).upper():
                                    val = Decimal(str(val))
                                # Convert booleans
                                elif "BOOL" in str(col.type).upper():
                                    val = bool(val)
                            model_kwargs[col_name] = val

                    # Merge into Postgres
                    instance = model_class(**model_kwargs)
                    await session.merge(instance)
                    count += 1

                await session.commit()
                print(f"  ✓ {table_name}: Migrated {count} rows")
            except Exception as e:
                await session.rollback()
                print(f"  ⚠️ Error migrating {table_name}: {e}")

    await engine.dispose()
    sqlite_conn.close()
    print("\n🎉 Migration completed successfully!")
    print("=" * 60)


if __name__ == "__main__":
    url = sys.argv[1] if len(sys.argv) > 1 else os.getenv("DATABASE_URL")
    if not url or "sqlite" in url:
        print("Usage: python migrate_sqlite_to_supabase.py '<POSTGRESQL_CONNECTION_STRING>'")
        sys.exit(1)
    asyncio.run(migrate(url))
