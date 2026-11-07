"""
Seed Users and Orders
Adds realistic customers with saved addresses, order history, and tracking milestones.
"""

import asyncio
from datetime import datetime, timedelta, timezone
from decimal import Decimal
import random
import uuid
from sqlalchemy import select
from app.core.database import AsyncSessionLocal
from app.core.security import get_password_hash
from app.models.catalog import Product, ProductVariant
from app.models.order import Order, OrderItem, OrderTrackingEvent
from app.models.user import User, UserAddress
from app.models.coupon import LoyaltyLedger


CUSTOMERS_DATA = [
    {
        "full_name": "Dr. Rajesh Mehta",
        "phone": "+919820011223",
        "email": "dr.rajesh.mehta@gmail.com",
        "role": "customer",
        "dietary_preference": "Strictly Organic & Diabetic Safe",
        "addresses": [
            {
                "label": "Home",
                "recipient_name": "Dr. Rajesh Mehta",
                "recipient_phone": "+919820011223",
                "flat_no": "B-402, Green Glen Heights",
                "street": "Linking Road, Bandra West",
                "landmark": "Opposite National Park",
                "city": "Mumbai",
                "state": "Maharashtra",
                "pincode": "400050",
                "is_default_shipping": True,
            },
            {
                "label": "Clinic",
                "recipient_name": "Dr. Rajesh Mehta (Clinic)",
                "recipient_phone": "+919820011223",
                "flat_no": "Ground Floor, Mehta Wellness Center",
                "street": "SV Road, Khar West",
                "landmark": "Near Khar Station",
                "city": "Mumbai",
                "state": "Maharashtra",
                "pincode": "400052",
                "is_default_shipping": False,
            },
        ],
    },
    {
        "full_name": "Priya Sharma",
        "phone": "+919830022334",
        "email": "priya.sharma92@outlook.com",
        "role": "customer",
        "dietary_preference": "Gluten-Free & Plant-Based Vegan",
        "addresses": [
            {
                "label": "Home",
                "recipient_name": "Priya Sharma",
                "recipient_phone": "+919830022334",
                "flat_no": "Flat 12A, Palm Meadows",
                "street": "Varthur Road, Whitefield",
                "landmark": "Near Sigma Tech Park",
                "city": "Bengaluru",
                "state": "Karnataka",
                "pincode": "560066",
                "is_default_shipping": True,
            }
        ],
    },
    {
        "full_name": "Vikramaditya Singh",
        "phone": "+919840033445",
        "email": "vikram.singh@agroharvest.in",
        "role": "customer",
        "dietary_preference": "Ancient Millets & High Protein Pulses",
        "addresses": [
            {
                "label": "Home",
                "recipient_name": "Vikramaditya Singh",
                "recipient_phone": "+919840033445",
                "flat_no": "Villa 18, Royal Heritage Enclave",
                "street": "Golf Course Extension Road, Sector 65",
                "landmark": "Near Grand Hyatt",
                "city": "Gurugram",
                "state": "Haryana",
                "pincode": "122018",
                "is_default_shipping": True,
            }
        ],
    },
    {
        "full_name": "Kavita Patel",
        "phone": "+919850044556",
        "email": "kavita.patel@gmail.com",
        "role": "customer",
        "dietary_preference": "Zero Chemical & Cold Pressed",
        "addresses": [
            {
                "label": "Home",
                "recipient_name": "Kavita Patel",
                "recipient_phone": "+919850044556",
                "flat_no": "A-704, Shivalik Platinum",
                "street": "Bopal-Ambli Road",
                "landmark": "Near Iscon Cross Road",
                "city": "Ahmedabad",
                "state": "Gujarat",
                "pincode": "380058",
                "is_default_shipping": True,
            }
        ],
    },
    {
        "full_name": "Sunita Verma",
        "phone": "+919860055667",
        "email": "sunita.v@heritagefoods.com",
        "role": "customer",
        "dietary_preference": "Ayurvedic Whole Grains",
        "addresses": [
            {
                "label": "Home",
                "recipient_name": "Sunita Verma",
                "recipient_phone": "+919860055667",
                "flat_no": "Plot 24, Civil Lines",
                "street": "Subhash Marg, C-Scheme",
                "landmark": "Near Central Park",
                "city": "Jaipur",
                "state": "Rajasthan",
                "pincode": "302001",
                "is_default_shipping": True,
            }
        ],
    },
]


async def seed_users_and_orders():
    async with AsyncSessionLocal() as db:
        print("🌱 Seeding realistic customers, addresses, and multi-status orders...")

        # 1. Fetch available products with variants
        products_result = await db.execute(select(Product))
        all_products = products_result.scalars().all()

        if not all_products:
            print("❌ No products found in DB! Seed catalog first.")
            return

        # Fetch variants
        vars_result = await db.execute(select(ProductVariant))
        all_variants = vars_result.scalars().all()
        variants_by_prod = {}
        for v in all_variants:
            variants_by_prod.setdefault(v.product_id, []).append(v)

        print(f"📦 Loaded {len(all_products)} products and {len(all_variants)} variants for order construction.")

        # 2. Add / Update customers
        user_objects = []
        for cdata in CUSTOMERS_DATA:
            existing = (
                await db.execute(select(User).where(User.phone == cdata["phone"]))
            ).scalar_one_or_none()
            if not existing:
                u = User(
                    full_name=cdata["full_name"],
                    phone=cdata["phone"],
                    email=cdata["email"],
                    password_hash=get_password_hash("password123"),
                    role=cdata["role"],
                    is_active=True,
                    is_verified=True,
                    dietary_preference=cdata["dietary_preference"],
                    newsletter_subscribed=True,
                )
                db.add(u)
                await db.flush()
                existing = u

                for addr in cdata["addresses"]:
                    ua = UserAddress(
                        user_id=existing.id,
                        label=addr["label"],
                        recipient_name=addr["recipient_name"],
                        recipient_phone=addr["recipient_phone"],
                        flat_no=addr["flat_no"],
                        street=addr["street"],
                        landmark=addr["landmark"],
                        city=addr["city"],
                        state=addr["state"],
                        pincode=addr["pincode"],
                        is_default_shipping=addr["is_default_shipping"],
                    )
                    db.add(ua)

                # Add starting loyalty balance
                ledger = LoyaltyLedger(
                    user_id=existing.id,
                    points=150,
                    activity_type="SIGNUP_BONUS",
                    reference_id="WELCOME-ONAAR",
                    balance_after=150,
                )
                db.add(ledger)
                print(f"  + Added customer: {existing.full_name} ({existing.phone})")
            user_objects.append(existing)

        # Also get Anurag Jain and Anekant Jain
        super_admin = (
            await db.execute(select(User).where(User.email == "meriwebdunia@gmail.com"))
        ).scalar_one_or_none()
        if super_admin:
            user_objects.append(super_admin)

        anekant = (
            await db.execute(select(User).where(User.phone == "+917692045606"))
        ).scalar_one_or_none()
        if anekant:
            user_objects.append(anekant)

        ramesh = (
            await db.execute(select(User).where(User.phone == "+919876512345"))
        ).scalar_one_or_none()
        if ramesh:
            user_objects.append(ramesh)

        await db.commit()

        # 3. Create realistic orders across statuses
        # Check if orders already exist
        existing_orders_count = (await db.execute(select(Order))).scalars().all()
        if len(existing_orders_count) >= 10:
            print(f"ℹ️ Already have {len(existing_orders_count)} orders in DB. Skipping order generation.")
            return

        order_statuses = [
            ("DELIVERED", "Bluedart Express", "BLUEDART-882910394", 12),
            ("DELIVERED", "Delhivery Surface", "DLHV-492019481", 9),
            ("SHIPPED", "Delhivery Air", "DLHV-920194012", 4),
            ("SHIPPED", "Bluedart Prime", "BLUEDART-771920491", 2),
            ("CONFIRMED", None, None, 1),
            ("CONFIRMED", None, None, 0),
            ("PENDING_VERIFICATION", None, None, 0),
            ("PENDING_VERIFICATION", None, None, 0),
        ]

        now = datetime.now(timezone.utc)
        order_idx = 1001

        for user in user_objects:
            # Fetch user address
            addr_res = await db.execute(select(UserAddress).where(UserAddress.user_id == user.id))
            user_addrs = addr_res.scalars().all()
            if not user_addrs:
                # Add a fallback address
                ua = UserAddress(
                    user_id=user.id,
                    label="Home",
                    recipient_name=user.full_name,
                    recipient_phone=user.phone or "+919876543210",
                    flat_no="House 10, Green Meadows",
                    street="Ring Road",
                    landmark="Near Bypass",
                    city="Indore",
                    state="Madhya Pradesh",
                    pincode="452001",
                    is_default_shipping=True,
                )
                db.add(ua)
                await db.flush()
                user_addrs = [ua]

            chosen_addr = user_addrs[0]

            # Generate 2 to 3 orders per user
            num_orders = random.randint(2, 3)
            for _ in range(num_orders):
                status_choice = random.choice(order_statuses)
                status_name, courier, awb, days_ago = status_choice

                order_date = now - timedelta(days=days_ago, hours=random.randint(1, 23))
                order_num = f"ONR-2026-{order_idx}"
                order_idx += 1

                # Select 2 to 4 products
                picked_products = random.sample(all_products, min(len(all_products), random.randint(2, 4)))
                subtotal = Decimal("0.00")
                order_items_to_add = []

                for prod in picked_products:
                    variants = variants_by_prod.get(prod.id, [])
                    if not variants:
                        continue
                    variant = random.choice(variants)
                    qty = random.randint(1, 3)
                    unit_price = Decimal(str(variant.price))
                    line_total = unit_price * qty
                    subtotal += line_total

                    order_items_to_add.append(
                        OrderItem(
                            product_id=prod.id,
                            variant_id=variant.id,
                            product_name=prod.name,
                            weight_label=variant.weight_label or "1 kg",
                            unit_price=unit_price,
                            quantity=qty,
                            line_total=line_total,
                        )
                    )

                if not order_items_to_add:
                    continue

                shipping_fee = Decimal("0.00") if subtotal >= 500 else Decimal("49.00")
                discount = Decimal("50.00") if subtotal > 1000 else Decimal("0.00")
                total_amount = subtotal + shipping_fee - discount

                order = Order(
                    order_number=order_num,
                    user_id=user.id,
                    customer_name=user.full_name,
                    customer_phone=user.phone or "+919876543210",
                    customer_email=user.email or f"{user.phone}@onaar.farm",
                    shipping_address_id=chosen_addr.id,
                    shipping_flat_no=chosen_addr.flat_no,
                    shipping_street=chosen_addr.street,
                    shipping_landmark=chosen_addr.landmark,
                    shipping_city=chosen_addr.city,
                    shipping_state=chosen_addr.state,
                    shipping_pincode=chosen_addr.pincode,
                    order_notes="Please pack carefully in eco-friendly tamper-proof bags.",
                    subtotal=subtotal,
                    shipping_fee=shipping_fee,
                    discount_amount=discount,
                    loyalty_coins_redeemed=0,
                    total_amount=total_amount,
                    payment_method="COD_VENDOR_CONTACT",
                    order_status=status_name,
                    courier_name=courier,
                    tracking_awb=awb,
                    vendor_notes="Verified via WhatsApp customer service.",
                    created_at=order_date,
                    updated_at=order_date + timedelta(hours=2),
                )
                db.add(order)
                await db.flush()

                # Add order items
                for oi in order_items_to_add:
                    oi.order_id = order.id
                    db.add(oi)

                # Add Tracking events based on status
                db.add(
                    OrderTrackingEvent(
                        order_id=order.id,
                        status="PENDING_VERIFICATION",
                        title="Order Placed",
                        description="Customer placed COD order on Onaar Organic Store.",
                        location="Online Portal",
                        timestamp=order_date,
                    )
                )

                if status_name in ["CONFIRMED", "SHIPPED", "DELIVERED"]:
                    db.add(
                        OrderTrackingEvent(
                            order_id=order.id,
                            status="CONFIRMED",
                            title="Vendor Verified & Confirmed",
                            description="Order verified with customer via WhatsApp/Call.",
                            location="Indore Fulfillment Center",
                            timestamp=order_date + timedelta(hours=2),
                        )
                    )

                if status_name in ["SHIPPED", "DELIVERED"]:
                    db.add(
                        OrderTrackingEvent(
                            order_id=order.id,
                            status="DISPATCHED",
                            title=f"Dispatched via {courier}",
                            description=f"Package handed over to {courier} (AWB: {awb}).",
                            location="Central Logistics Hub, Indore",
                            timestamp=order_date + timedelta(hours=18),
                        )
                    )

                if status_name == "DELIVERED":
                    db.add(
                        OrderTrackingEvent(
                            order_id=order.id,
                            status="DELIVERED",
                            title="Package Delivered",
                            description="Successfully delivered to customer and payment collected.",
                            location=f"{chosen_addr.city}, {chosen_addr.state}",
                            timestamp=order_date + timedelta(days=2, hours=4),
                        )
                    )

                print(f"  + Created Order {order_num} ({status_name}) for {user.full_name} - ₹{total_amount}")

        await db.commit()
        print("✅ Finished seeding realistic users, addresses, and orders!")


if __name__ == "__main__":
    asyncio.run(seed_users_and_orders())
