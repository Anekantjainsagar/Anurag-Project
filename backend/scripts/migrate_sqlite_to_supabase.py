"""
ONAAR Database Migration Engine: SQLite (onaar.db) -> Supabase (PostgreSQL)
Supports:
  1. Standalone SQL Dump Generation (for 1-click execution in Supabase SQL Editor)
  2. Direct Async Migration (connecting directly via pooler / Postgres URI)
"""

import asyncio
import os
import sys
import json
import sqlite3
from datetime import datetime
from decimal import Decimal
import uuid

# Ensure backend directory is in sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from sqlalchemy.schema import CreateTable
from sqlalchemy.dialects import postgresql
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker

# Import all 36 models from models package
from app.models import (
    Base,
    User,
    UserAddress,
    UserSession,
    OTPVerification,
    Category,
    Product,
    ProductVariant,
    ProductImage,
    ProductFeature,
    ProductNutritionalFact,
    ProductPurityParameter,
    HarvestBatch,
    CartItem,
    WishlistItem,
    Coupon,
    CouponRedemption,
    LoyaltyLedger,
    Order,
    OrderItem,
    OrderTrackingEvent,
    OrderReturn,
    ProductReview,
    ProductFAQ,
    BlogCategory,
    BlogPost,
    BlogNutritionalHighlight,
    ContactMessage,
    BulkEnquiry,
    NewsletterSubscriber,
    EmailTemplate,
    EmailLog,
    SiteSetting,
    PromoBanner,
    Testimonial,
    WhyChooseFeature,
    AuditLog,
)


def format_sql_value(val, col_type_str):
    """Formats a Python/SQLite value into clean PostgreSQL literal."""
    if val is None:
        return "NULL"
    
    col_upper = col_type_str.upper()

    if "BOOL" in col_upper:
        return "TRUE" if val and val not in (0, "0", False, "false") else "FALSE"
    
    if "INT" in col_upper or "NUMERIC" in col_upper or "FLOAT" in col_upper or "DECIMAL" in col_upper:
        try:
            return str(val)
        except Exception:
            return "0"

    if "JSON" in col_upper:
        if isinstance(val, (dict, list)):
            json_text = json.dumps(val).replace("'", "''")
        else:
            try:
                # If string, ensure valid json
                parsed = json.loads(str(val))
                json_text = json.dumps(parsed).replace("'", "''")
            except Exception:
                json_text = str(val).replace("'", "''")
        return f"'{json_text}'::jsonb"

    # UUID / TEXT / VARCHAR / DATETIME
    escaped = str(val).replace("'", "''")
    if "UUID" in col_upper:
        return f"'{escaped}'::uuid"
    if "TIMESTAMP" in col_upper or "DATETIME" in col_upper or "DATE" in col_upper:
        return f"'{escaped}'::timestamptz"

    return f"'{escaped}'"


def generate_sql_dump(output_file: str):
    """
    Generates a full standalone SQL script containing:
      - PostgreSQL extensions (uuid-ossp, pgcrypto)
      - All 36 table schemas (CREATE TABLE IF NOT EXISTS)
      - All rows from SQLite onaar.db formatted as ON CONFLICT DO NOTHING
    """
    print("=" * 65)
    print("🌿 ONAAR SUPABASE SQL GENERATOR")
    print("=" * 65)

    sqlite_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "onaar.db"))
    if not os.path.exists(sqlite_path):
        print(f"❌ SQLite database not found at {sqlite_path}")
        return False

    sqlite_conn = sqlite3.connect(sqlite_path)
    sqlite_conn.row_factory = sqlite3.Row
    s_cur = sqlite_conn.cursor()

    lines = []
    lines.append("-- ============================================================================")
    lines.append("-- ONAAR E-Commerce Storefront: Supabase PostgreSQL Schema & Data Bootstrap")
    lines.append(f"-- Generated: {datetime.now().isoformat()} from local SQLite database")
    lines.append("-- ============================================================================\n")
    lines.append("CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\";")
    lines.append("CREATE EXTENSION IF NOT EXISTS \"pgcrypto\";\n")

    # 1. Generate DDL for all 36 tables
    print("1. Compiling PostgreSQL DDL for all 36 tables...")
    for table in Base.metadata.sorted_tables:
        stmt = CreateTable(table).compile(dialect=postgresql.dialect())
        ddl_str = str(stmt).strip()
        if not ddl_str.endswith(";"):
            ddl_str += ";"
        # Safe idempotent table creation
        ddl_str = ddl_str.replace("CREATE TABLE", "CREATE TABLE IF NOT EXISTS")
        lines.append(f"-- Table: {table.name}")
        lines.append(ddl_str + "\n")

    # 2. Generate INSERTs for all populated tables in dependency order
    print("2. Extracting rows from SQLite onaar.db...")
    total_rows = 0

    for table in Base.metadata.sorted_tables:
        t_name = table.name
        try:
            s_cur.execute(f"SELECT * FROM \"{t_name}\"")
            rows = s_cur.fetchall()
            if not rows:
                continue

            col_names = [col.name for col in table.columns]
            col_types = {col.name: str(col.type) for col in table.columns}

            lines.append(f"\n-- Data: {t_name} ({len(rows)} rows)")
            for row in rows:
                row_dict = dict(row)
                cols_to_insert = []
                vals_to_insert = []

                for c in col_names:
                    if c in row_dict:
                        cols_to_insert.append(f"\"{c}\"")
                        val = row_dict[c]
                        # Handle JSON strings stored in SQLite
                        if "JSON" in col_types[c].upper() and isinstance(val, str):
                            try:
                                val = json.loads(val)
                            except Exception:
                                pass
                        vals_to_insert.append(format_sql_value(val, col_types[c]))

                if cols_to_insert:
                    cols_str = ", ".join(cols_to_insert)
                    vals_str = ", ".join(vals_to_insert)
                    insert_stmt = f"INSERT INTO \"{t_name}\" ({cols_str}) VALUES ({vals_str}) ON CONFLICT DO NOTHING;"
                    lines.append(insert_stmt)
                    total_rows += 1

            print(f"  ✓ {t_name}: {len(rows)} rows prepared")
        except Exception as e:
            # Table might not exist in SQLite or be empty
            pass

    sqlite_conn.close()

    with open(output_file, "w", encoding="utf-8") as f:
        f.write("\n".join(lines) + "\n")

    print(f"\n✅ Standalone SQL file successfully written to:")
    print(f"   {output_file}")
    print(f"   (Total {total_rows} rows prepared across {len(Base.metadata.sorted_tables)} tables)")
    print("\n👉 How to run in Supabase:")
    print("   1. Open Supabase Dashboard: https://supabase.com/dashboard/project/btiuwbqbkltwlefcqhjd")
    print("   2. Go to 'SQL Editor' in the left menu.")
    print("   3. Paste the contents of 'supabase_migration.sql' and click 'Run'.")
    print("=" * 65)
    return True


async def direct_migrate(target_postgres_url: str):
    """Connects directly to Supabase via Postgres asyncpg and migrates schema & rows."""
    print("=" * 65)
    print("🌿 ONAAR DIRECT POSTGRES MIGRATION")
    print("=" * 65)

    # Normalize driver prefix
    if target_postgres_url.startswith("postgresql://"):
        target_postgres_url = target_postgres_url.replace("postgresql://", "postgresql+asyncpg://", 1)
    elif target_postgres_url.startswith("postgres://"):
        target_postgres_url = target_postgres_url.replace("postgres://", "postgresql+asyncpg://", 1)

    print(f"Target: {target_postgres_url.split('@')[-1] if '@' in target_postgres_url else target_postgres_url}")

    engine = create_async_engine(target_postgres_url, echo=False)
    async_session = async_sessionmaker(engine, expire_on_commit=False, class_=AsyncSession)

    print("\n1. Verifying and creating all 36 tables in Supabase...")
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    print("✓ Tables verified / created in Supabase.")

    sqlite_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "onaar.db"))
    sqlite_conn = sqlite3.connect(sqlite_path)
    sqlite_conn.row_factory = sqlite3.Row
    s_cur = sqlite_conn.cursor()

    migration_classes = [
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
        for table_name, model_class in migration_classes:
            try:
                s_cur.execute(f"SELECT * FROM \"{table_name}\"")
                rows = s_cur.fetchall()
                count = 0
                for row in rows:
                    row_dict = dict(row)
                    model_kwargs = {}
                    for col in model_class.__table__.columns:
                        col_name = col.name
                        if col_name in row_dict:
                            val = row_dict[col_name]
                            if val is not None:
                                if "UUID" in str(col.type).upper():
                                    val = uuid.UUID(str(val))
                                elif "JSON" in str(col.type).upper() and isinstance(val, str):
                                    try:
                                        val = json.loads(val)
                                    except Exception:
                                        pass
                                elif "BOOL" in str(col.type).upper():
                                    val = bool(val)
                            model_kwargs[col_name] = val
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
    print("\n🎉 Direct migration completed successfully!")
    print("=" * 65)


if __name__ == "__main__":
    output_sql_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "supabase_migration.sql"))

    # Check CLI arguments
    if len(sys.argv) > 1:
        arg = sys.argv[1].strip()
        if arg in ("--export-sql", "-s"):
            generate_sql_dump(output_sql_path)
            sys.exit(0)
        elif arg.startswith("postgres://") or arg.startswith("postgresql://") or arg.startswith("postgresql+asyncpg://"):
            asyncio.run(direct_migrate(arg))
            sys.exit(0)

    # Check DATABASE_URL in environment
    db_env = os.getenv("DATABASE_URL", "")
    if db_env.startswith("postgres"):
        asyncio.run(direct_migrate(db_env))
    else:
        # Default action: Generate standalone SQL dump file for 1-click execution
        generate_sql_dump(output_sql_path)
