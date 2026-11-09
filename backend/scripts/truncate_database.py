"""
Truncate All Data from Onaar Database
Backs up backend/onaar.db to backend/onaar.db.backup,
then empties all tables while preserving the 1 Super Admin user so admin access is maintained.
"""

import os
import shutil
import sqlite3
from datetime import datetime

DB_PATH = "backend/onaar.db"
BACKUP_PATH = "backend/onaar.db.backup"

# Tables to completely clear (0 rows)
TABLES_TO_EMPTY = [
    "order_tracking_events",
    "order_items",
    "orders",
    "order_returns",
    "cart_items",
    "wishlist_items",
    "loyalty_ledger",
    "user_addresses",
    "user_sessions",
    "otp_verifications",
    "contact_messages",
    "bulk_enquiries",
    "newsletter_subscribers",
    "email_logs",
    "product_faqs",
    "product_reviews",
    "product_purity_parameters",
    "product_nutritional_facts",
    "product_features",
    "product_images",
    "product_variants",
    "products",
    "harvest_batches",
    "categories",
    "blog_nutritional_highlights",
    "blog_posts",
    "blog_categories",
    "promo_banners",
    "why_choose_features",
    "testimonials",
    "coupon_redemptions",
    "coupons",
    "site_settings",
    "email_templates",
]


def truncate_database():
    if not os.path.exists(DB_PATH):
        print(f"❌ Database not found at {DB_PATH}")
        return

    # 1. Create a safe backup first
    shutil.copy2(DB_PATH, BACKUP_PATH)
    print(f"📦 Backup created successfully at {BACKUP_PATH}")

    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    # Disable foreign keys temporarily to avoid constraint issues during bulk truncate
    cursor.execute("PRAGMA foreign_keys = OFF;")

    # 2. Empty all content tables
    for table in TABLES_TO_EMPTY:
        try:
            cursor.execute(f'DELETE FROM "{table}";')
        except sqlite3.OperationalError:
            pass

    # 3. Clear all users except the 1 Super Admin account (Anurag Jain)
    cursor.execute("DELETE FROM users WHERE id != 'f21291dff54d44df9c6c627ab3928e5e';")

    conn.commit()
    cursor.execute("PRAGMA foreign_keys = ON;")
    cursor.execute("VACUUM;")
    conn.commit()

    print("\n" + "=" * 60)
    print("🌾 DATABASE TRUNCATION COMPLETE - VERIFICATION")
    print("=" * 60)

    cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
    tables = [r[0] for r in cursor.fetchall() if not r[0].startswith("sqlite_")]

    total_rows = 0
    for t in sorted(tables):
        cursor.execute(f'SELECT count(*) FROM "{t}";')
        cnt = cursor.fetchone()[0]
        total_rows += cnt
        if cnt > 0:
            print(f"  {t}: {cnt} row(s)")
        else:
            print(f"  {t}: 0 rows (cleared)")

    print("-" * 60)
    print(f"Total rows remaining in database: {total_rows}")
    print("=" * 60 + "\n")
    conn.close()


if __name__ == "__main__":
    truncate_database()
