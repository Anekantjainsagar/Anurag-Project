"""
Automated Database Migration & Seeding Engine
Imports 192 organic crops, 24 blogs, default email templates, coupons, and CMS settings.
"""

import asyncio
import json
from pathlib import Path
from decimal import Decimal
import sys

# Ensure backend root is on sys.path
sys.path.insert(0, str(Path(__file__).parent.parent))

from sqlalchemy import select
from app.core.config import settings
from app.core.database import AsyncSessionLocal, Base, engine
from app.core.security import get_password_hash
from app.models.blog import BlogCategory, BlogNutritionalHighlight, BlogPost
from app.models.catalog import (
    Category,
    HarvestBatch,
    Product,
    ProductFeature,
    ProductImage,
    ProductNutritionalFact,
    ProductPurityParameter,
    ProductVariant,
)
from app.models.coupon import Coupon
from app.models.email import EmailTemplate
from app.models.settings import SiteSetting
from app.models.user import User


async def create_tables():
    """Creates all 36 relational tables in the database if they do not exist."""
    print("📦 [DDL] Creating database tables...")
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    print("✅ [DDL] Database tables created successfully.")


async def seed_data():
    data_file = Path(__file__).parent / "data_export.json"
    if not data_file.exists():
        print(f"❌ Error: {data_file} not found. Run export first.")
        return

    with open(data_file, "r", encoding="utf-8") as f:
        data = json.load(f)

    categories_data = data.get("categories", [])
    products_data = data.get("products", [])
    blogs_data = data.get("blogs", [])

    print(f"🌱 [SEED] Starting automated seed: {len(categories_data)} categories, {len(products_data)} products, {len(blogs_data)} blogs...")

    async with AsyncSessionLocal() as session:
        # 1. Seed Categories
        print("  -> Seeding Categories...")
        for cat in categories_data:
            cat_id = cat.get("slug") or cat.get("id")
            res = await session.execute(select(Category).where(Category.id == cat_id))
            if not res.scalar_one_or_none():
                c = Category(
                    id=cat_id,
                    name=cat["name"],
                    slug=cat.get("slug", cat["id"]),
                    tagline=cat.get("tagline"),
                    image_url=cat.get("image", "/images/categories/pulses.jpg"),
                    display_order=0,
                    is_active=True,
                )
                session.add(c)
        await session.commit()

        # 2. Seed Products
        print("  -> Seeding 192 Products & Pack Variants...")
        for p in products_data:
            p_id = p["id"]
            res = await session.execute(select(Product).where(Product.id == p_id))
            if not res.scalar_one_or_none():
                cat_slug = p.get("category", "pulses").lower().replace(" & ", "-").replace(" ", "-")
                # Map category slug if needed
                cat_map = {
                    "rice-&-wheat": "rice-wheat",
                    "rice-wheat": "rice-wheat",
                    "masala-&-spices": "masala-spices",
                    "masala-spices": "masala-spices",
                    "dry-fruits": "dry-fruits",
                }
                final_cat_id = cat_map.get(cat_slug, cat_slug)

                # Check category exists
                c_chk = await session.execute(select(Category).where(Category.id == final_cat_id))
                if not c_chk.scalar_one_or_none():
                    final_cat_id = "pulses"

                prod = Product(
                    id=p_id,
                    category_id=final_cat_id,
                    name=p["name"],
                    subtitle=p.get("subtitle"),
                    description=p.get("description", p["name"]),
                    origin=p.get("origin", "Madhya Pradesh, India"),
                    tag=p.get("tag", "Pure Harvest"),
                    rating=Decimal(str(p.get("rating", 4.8))),
                    reviews_count=p.get("reviewsCount", 0),
                    in_stock=p.get("inStock", True),
                    health_benefits=p.get("healthBenefits"),
                    ingredients=p.get("ingredients"),
                    storage_instructions=p.get("storageInstructions"),
                    common_uses=p.get("commonUses"),
                    additional_info=p.get("additionalInfo"),
                    is_featured=p.get("rating", 0) >= 4.8,
                )
                session.add(prod)
                await session.flush()

                # Variants (Options)
                options = p.get("options", [])
                for idx, opt in enumerate(options):
                    v = ProductVariant(
                        product_id=prod.id,
                        weight_label=opt["label"],
                        price=Decimal(str(opt["price"])),
                        original_price=Decimal(str(opt["originalPrice"])),
                        discount_label=opt.get("discount"),
                        stock_quantity=100,
                        is_default=(idx == 0),
                    )
                    session.add(v)

                # Gallery Images
                images = p.get("images", [])
                primary_image = p.get("image", "/images/products/placeholder.jpg")
                if primary_image and primary_image not in images:
                    images.insert(0, primary_image)

                for idx, img_url in enumerate(images):
                    img = ProductImage(
                        product_id=prod.id,
                        image_url=img_url,
                        is_primary=(idx == 0),
                        display_order=idx,
                    )
                    session.add(img)

                # Features
                features = p.get("features", [])
                for idx, feat in enumerate(features):
                    session.add(ProductFeature(
                        product_id=prod.id,
                        feature_text=feat,
                        display_order=idx,
                    ))

                # Nutrition Facts
                nutrition = p.get("nutritionalFacts", {})
                if isinstance(nutrition, dict):
                    for idx, (k, val) in enumerate(nutrition.items()):
                        session.add(ProductNutritionalFact(
                            product_id=prod.id,
                            nutrient_name=k,
                            nutrient_value=str(val),
                            display_order=idx,
                        ))

                # Purity Parameters
                purity = p.get("purityParameters", {})
                if isinstance(purity, dict):
                    for idx, (k, val) in enumerate(purity.items()):
                        session.add(ProductPurityParameter(
                            product_id=prod.id,
                            param_name=k,
                            param_value=str(val),
                            display_order=idx,
                        ))
        await session.commit()

        # 3. Seed Blogs
        print("  -> Seeding 24 Health & Agronomy Blogs...")
        for b in blogs_data:
            b_id = b["id"]
            res = await session.execute(select(BlogPost).where(BlogPost.id == b_id))
            if not res.scalar_one_or_none():
                author_name = "Anurag Jain"
                author_role = "Head of Agronomy & Research"
                if isinstance(b.get("author"), dict):
                    author_name = b["author"].get("name", author_name)
                    author_role = b["author"].get("role", author_role)

                post = BlogPost(
                    id=b_id,
                    title=b["title"],
                    slug=b_id,
                    summary=b.get("summary", ""),
                    read_time=b.get("readTime", "5 min read"),
                    image_url=b.get("image", "/images/blogs/placeholder.jpg"),
                    category_id=b.get("category"),
                    author_name=author_name,
                    author_role=author_role,
                    health_tip=b.get("healthTip"),
                    tags=b.get("tags", []),
                    content=b.get("content", []),
                    key_benefits=b.get("keyBenefits", []),
                )
                session.add(post)
                await session.flush()

                # Highlights
                highlights = b.get("nutritionalHighlights", [])
                for idx, hl in enumerate(highlights):
                    session.add(BlogNutritionalHighlight(
                        post_id=post.id,
                        label=hl.get("label", ""),
                        value=hl.get("value", ""),
                        display_order=idx,
                    ))
        await session.commit()

        # 4. Seed Default Email Templates
        print("  -> Seeding Default Email Templates...")
        email_templates = [
            {
                "template_key": "ORDER_CONFIRMATION_CUSTOMER",
                "name": "Customer Order Confirmation Receipt",
                "subject": "🌿 Order Confirmed #{{order_number}} - YOUR BRAND",
                "body_html": """
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 25px; border: 1px solid #e0e0e0; border-radius: 12px; background: #ffffff;">
                    <div style="text-align: center; border-bottom: 2px solid #044a27; padding-bottom: 15px;">
                        <h1 style="color: #044a27; margin: 0; font-size: 24px;">YOUR BRAND • Pure Harvest</h1>
                        <p style="color: #666; margin: 5px 0 0 0; font-size: 13px;">100% Certified Organic • Direct from Indian Farmers</p>
                    </div>
                    <h2 style="color: #044a27; margin-top: 20px;">Thank You, {{customer_name}}!</h2>
                    <p style="color: #444; line-height: 1.5;">Your order <strong>#{{order_number}}</strong> was successfully received on {{order_date}} under <strong>Pay on Delivery / COD</strong>.</p>
                    
                    <div style="background-color: #f7faf8; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #044a27;">
                        <h4 style="margin: 0 0 8px 0; color: #044a27;">Delivery Address:</h4>
                        <p style="margin: 0; color: #333; line-height: 1.4;">{{delivery_address}}</p>
                        <p style="margin: 8px 0 0 0; color: #333;"><strong>Contact Phone:</strong> {{customer_phone}}</p>
                    </div>

                    <h4 style="color: #044a27; margin-bottom: 8px;">Order Summary:</h4>
                    <pre style="white-space: pre-wrap; font-family: monospace; background: #fafafa; padding: 12px; border-radius: 6px; font-size: 13px; line-height: 1.6; border: 1px solid #eee;">{{order_items}}</pre>

                    <div style="margin-top: 15px; border-top: 1px solid #eee; padding-top: 12px;">
                        <p style="margin: 4px 0;"><strong>Subtotal:</strong> ₹{{subtotal}}</p>
                        <p style="margin: 4px 0;"><strong>Delivery:</strong> {{shipping_fee}}</p>
                        <p style="margin: 8px 0 0 0; font-size: 18px; color: #044a27; font-weight: bold;">Amount to Pay on Delivery: ₹{{total_amount}}</p>
                    </div>

                    <div style="background: #eef7f2; padding: 12px; border-radius: 8px; margin-top: 25px;">
                        <p style="margin: 0; font-size: 13px; color: #044a27;">📞 <strong>What's Next?</strong> Our fulfillment coordinator will contact you via WhatsApp/call at {{customer_phone}} to confirm your schedule prior to courier dispatch.</p>
                    </div>

                    <hr style="border: none; border-top: 1px solid #eee; margin: 25px 0 15px 0;" />
                    <p style="color: #888; font-size: 11px; text-align: center; margin: 0;">For questions, email support at <a href="mailto:{{vendor_email}}" style="color: #044a27;">{{vendor_email}}</a> or WhatsApp +91-98765 43210.</p>
                </div>
                """,
                "body_text": "Thank you for your order #{{order_number}}, {{customer_name}}! Total: ₹{{total_amount}}. Delivered to {{delivery_address}}.",
                "available_variables": ["order_number", "order_date", "customer_name", "customer_phone", "customer_email", "delivery_address", "order_items", "subtotal", "shipping_fee", "total_amount", "vendor_email"],
            },
            {
                "template_key": "ORDER_ALERT_VENDOR",
                "name": "Vendor Order Notification (Anurag Jain)",
                "subject": "🚨 New COD Order #{{order_number}} - Action Required",
                "body_html": """
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 25px; border: 2px solid #044a27; border-radius: 12px; background: #ffffff;">
                    <h2 style="color: #044a27; margin-top: 0;">🚨 New COD Order Alert #{{order_number}}</h2>
                    <p><strong>Order Timestamp:</strong> {{order_date}}</p>
                    <div style="background-color: #fff9e6; padding: 15px; border-radius: 8px; border-left: 4px solid #f59e0b; margin: 15px 0;">
                        <h4 style="margin: 0 0 8px 0; color: #b45309;">Customer Contact & Delivery Address:</h4>
                        <p style="margin: 3px 0;"><strong>Name:</strong> {{customer_name}}</p>
                        <p style="margin: 3px 0;"><strong>Phone:</strong> <a href="tel:{{customer_phone}}" style="color: #044a27; font-weight: bold;">{{customer_phone}}</a> (WhatsApp Available)</p>
                        <p style="margin: 3px 0;"><strong>Email:</strong> {{customer_email}}</p>
                        <p style="margin: 3px 0;"><strong>Address:</strong> {{delivery_address}}</p>
                        <p style="margin: 5px 0 0 0; color: #555;"><strong>Order Notes:</strong> {{order_notes}}</p>
                    </div>

                    <h4>Items Ordered:</h4>
                    <pre style="white-space: pre-wrap; font-family: monospace; background: #fafafa; padding: 12px; border-radius: 6px; font-size: 13px; line-height: 1.6; border: 1px solid #eee;">{{order_items}}</pre>

                    <div style="margin-top: 12px; font-size: 16px;">
                        <p style="margin: 4px 0;"><strong>Total COD to Collect:</strong> <span style="color: #044a27; font-weight: bold; font-size: 18px;">₹{{total_amount}}</span></p>
                    </div>

                    <div style="background: #eef7f2; padding: 12px; border-radius: 8px; margin-top: 20px;">
                        <p style="margin: 0; font-size: 13px; color: #044a27;">⚡ <strong>Action Required:</strong> Call or WhatsApp the customer at <a href="https://wa.me/{{customer_phone}}" style="color: #044a27; font-weight: bold;">{{customer_phone}}</a> to confirm order details and initiate dispatch from Indore logistics hub.</p>
                    </div>
                </div>
                """,
                "body_text": "New COD Order #{{order_number}} from {{customer_name}} (Phone: {{customer_phone}}). Total: ₹{{total_amount}}.",
                "available_variables": ["order_number", "order_date", "customer_name", "customer_phone", "customer_email", "delivery_address", "order_items", "total_amount", "order_notes"],
            },
            {
                "template_key": "CONTACT_US_ALERT",
                "name": "Contact Inquiry Forwarded to Vendor",
                "subject": "📬 Contact Inquiry: {{subject}} - {{name}}",
                "body_html": """
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
                    <h3 style="color: #044a27; margin-top: 0;">New Retail Contact Message</h3>
                    <p><strong>Name:</strong> {{name}}</p>
                    <p><strong>Email:</strong> {{email}}</p>
                    <p><strong>Phone:</strong> {{phone}}</p>
                    <p><strong>Subject:</strong> {{subject}}</p>
                    <hr style="border: none; border-top: 1px solid #eee;" />
                    <p><strong>Message:</strong></p>
                    <p style="background: #f8faf9; padding: 12px; border-radius: 6px; white-space: pre-wrap;">{{message}}</p>
                </div>
                """,
                "body_text": "New inquiry from {{name}} ({{email}}, {{phone}}): {{subject}} - {{message}}",
                "available_variables": ["name", "email", "phone", "subject", "message"],
            },
        ]

        for tmpl in email_templates:
            res = await session.execute(select(EmailTemplate).where(EmailTemplate.template_key == tmpl["template_key"]))
            if not res.scalar_one_or_none():
                session.add(EmailTemplate(**tmpl))
        await session.commit()

        # 5. Seed Default Coupons
        print("  -> Seeding HARVEST10 Coupon...")
        c_res = await session.execute(select(Coupon).where(Coupon.code == "HARVEST10"))
        if not c_res.scalar_one_or_none():
            session.add(Coupon(
                code="HARVEST10",
                description="10% off your first pure harvest order",
                discount_type="percentage",
                discount_value=Decimal("10.00"),
                min_order_amount=Decimal("0.00"),
                usage_limit_per_user=1,
                is_active=True,
            ))
            await session.commit()

        # 6. Seed Site Settings
        print("  -> Seeding Dynamic CMS Settings & SMTP Config...")
        settings_rows = [
            ("vendor_info", {"name": "Anurag Jain", "email": "meriwebdunia@gmail.com", "phone": "+91-98765 43210", "whatsapp": "+91-98765 43210"}, "Primary vendor contact info"),
            ("warehouse_address", {"address": "Plot 104, Organic Agro Park, Central Logistics Zone, Madhya Pradesh - 452001, INDIA"}, "Central warehouse"),
            ("topbar_tickers", ["🌾 Fresh Heirloom Harvest Just Arrived - Flat 10% Off with HARVEST10", "🚚 Free Zero-Adulteration Delivery Across India on Orders Above ₹499", "🌿 100% Certified Organic & Lab-Tested Direct from Farmers"], "Ticker banners"),
            ("shipping_policy", {"free_shipping_threshold": 499, "standard_shipping_fee": 60}, "Delivery fees"),
            ("smtp_settings", {"host": "smtp.gmail.com", "port": 587, "user": "meriwebdunia@gmail.com", "password": "", "use_tls": True, "from_name": "YOUR BRAND / Pure Harvest", "from_email": "meriwebdunia@gmail.com"}, "SMTP Server config"),
        ]
        for key, val, desc in settings_rows:
            res = await session.execute(select(SiteSetting).where(SiteSetting.key == key))
            if not res.scalar_one_or_none():
                session.add(SiteSetting(key=key, value=val, description=desc))
        await session.commit()

        # 7. Seed Initial Admin User
        print("  -> Seeding Vendor/Admin Account (Anurag Jain <meriwebdunia@gmail.com>)...")
        u_res = await session.execute(select(User).where(User.email == "meriwebdunia@gmail.com"))
        if not u_res.scalar_one_or_none():
            admin_user = User(
                full_name="Anurag Jain",
                email="meriwebdunia@gmail.com",
                phone="+919876543210",
                password_hash=get_password_hash("OnaarAdmin2026!"),
                role="admin",
                is_active=True,
                is_verified=True,
            )
            session.add(admin_user)
            await session.commit()

    print("🎉 [SEED COMPLETE] All 192 products, 24 blogs, templates, coupons, and CMS settings populated successfully!")


async def main():
    await create_tables()
    await seed_data()


if __name__ == "__main__":
    asyncio.run(main())
