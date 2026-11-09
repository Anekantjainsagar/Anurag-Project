"""
Seed realistic Contact Inquiries, Wholesale B2B Leads, and Newsletter Subscribers
"""

import asyncio
from datetime import datetime, timezone, timedelta
from pathlib import Path
import sys

sys.path.insert(0, str(Path(__file__).parent.parent))

from sqlalchemy import select
from app.core.database import AsyncSessionLocal
from app.models.inquiry import ContactMessage, BulkEnquiry, NewsletterSubscriber


async def seed_inquiries():
    async with AsyncSessionLocal() as session:
        # 1. Contact Messages
        res = await session.execute(select(ContactMessage))
        if not res.scalars().first():
            contacts = [
                ContactMessage(
                    name="Rajesh Sharma",
                    email="rajesh.sharma@gmail.com",
                    phone="+91 98201 12345",
                    subject="Packaging & Shelf Life Query",
                    message="Hello Anurag, could you confirm if the Traditional Toor Dal is nitrogen-flushed or packed in vacuum pouches? Need 10kg for my joint family in Mumbai.",
                    status="NEW",
                    vendor_notes="Customer called about nitrogen flush packaging.",
                    created_at=datetime.now(timezone.utc) - timedelta(hours=3),
                ),
                ContactMessage(
                    name="Pooja Patel",
                    email="pooja.patel@ahmedabad.org",
                    phone="+91 97123 45678",
                    subject="Purity Certificate Request",
                    message="Hi, I am placing an order for 5kg A2 Gir Cow Ghee and Wild Forest Honey. Could you share the latest NPOP lab test report for batch #ON-GHEE-2026-04?",
                    status="CONTACTED",
                    vendor_notes="COA PDF emailed to customer on WhatsApp.",
                    created_at=datetime.now(timezone.utc) - timedelta(days=1),
                ),
                ContactMessage(
                    name="Amitabh Varma",
                    email="amitabh.v@zenithfoods.in",
                    phone="+91 94440 98765",
                    subject="Retail Delivery Timeline to Bangalore",
                    message="Want to understand standard express delivery time to Whitefield, Bangalore for organic cold-pressed mustard oil and heritage millets.",
                    status="RESOLVED",
                    vendor_notes="Delivered in 48 hours via Delhivery express.",
                    created_at=datetime.now(timezone.utc) - timedelta(days=3),
                ),
            ]
            session.add_all(contacts)
            print("✅ Seeded 3 Contact Inquiries")

        # 2. Bulk Wholesale Enquiries
        res = await session.execute(select(BulkEnquiry))
        if not res.scalars().first():
            bulks = [
                BulkEnquiry(
                    name="Vikramaditya Singhania",
                    company_name="Vedic Naturals Pvt Ltd",
                    email="procurement@vedicnaturals.com",
                    phone="+91 98100 55443",
                    category="Pulses & Millets",
                    quantity="5 - 10 Metric Tonnes",
                    destination="Kandla Port, Gujarat (Export CIF Dubai)",
                    notes="Looking for pesticide-free unpolished Kodo and Foxtail Millets with phytosanitary certification for Middle East export.",
                    status="IN_NEGOTIATION",
                    vendor_notes="Shared quotation ₹115/kg FOB Kandla. Awaiting LC confirmation.",
                    created_at=datetime.now(timezone.utc) - timedelta(hours=6),
                ),
                BulkEnquiry(
                    name="Dr. Shreya Menon",
                    company_name="AyurVeda Wellness Resorts",
                    email="shreya.menon@ayurwellness.in",
                    phone="+91 98450 11223",
                    category="Pure Honey & A2 Ghee",
                    quantity="500 kg / month contract",
                    destination="Kochi, Kerala",
                    notes="Requires monthly recurring dispatch of raw multi-flora unheated forest honey and Bilona A2 ghee for 4 resort properties.",
                    status="QUOTE_SENT",
                    vendor_notes="Sample batch dispatched via DTDC. Quotation sent via email.",
                    created_at=datetime.now(timezone.utc) - timedelta(days=2),
                ),
                BulkEnquiry(
                    name="Sunil Khandelwal",
                    company_name="Khandelwal Agro Traders",
                    email="sunil@khandelwaltraders.com",
                    phone="+91 94250 88990",
                    category="Basmati & Heritage Rice",
                    quantity="25 Metric Tonnes",
                    destination="Indore Mandi Hub",
                    notes="Need sorted, destoned organic Indrayani and aged 1121 Traditional Basmati for retail packaging distribution across MP.",
                    status="NEW",
                    vendor_notes=None,
                    created_at=datetime.now(timezone.utc) - timedelta(days=4),
                ),
            ]
            session.add_all(bulks)
            print("✅ Seeded 3 Wholesale B2B Enquiries")

        # 3. Newsletter Subscribers
        res = await session.execute(select(NewsletterSubscriber))
        if not res.scalars().first():
            newsletters = [
                NewsletterSubscriber(
                    email="priya.sharma92@gmail.com",
                    coupon_code="HARVEST10",
                    is_active=True,
                    subscribed_at=datetime.now(timezone.utc) - timedelta(hours=1),
                ),
                NewsletterSubscriber(
                    email="karan.mehta@outlook.com",
                    coupon_code="HARVEST10",
                    is_active=True,
                    subscribed_at=datetime.now(timezone.utc) - timedelta(hours=12),
                ),
                NewsletterSubscriber(
                    email="ananya.iyer@gmail.com",
                    coupon_code="HARVEST10",
                    is_active=True,
                    subscribed_at=datetime.now(timezone.utc) - timedelta(days=2),
                ),
                NewsletterSubscriber(
                    email="suresh.patil@rediffmail.com",
                    coupon_code="HARVEST10",
                    is_active=True,
                    subscribed_at=datetime.now(timezone.utc) - timedelta(days=4),
                ),
                NewsletterSubscriber(
                    email="deepika.deshmukh@yahoo.co.in",
                    coupon_code="HARVEST10",
                    is_active=True,
                    subscribed_at=datetime.now(timezone.utc) - timedelta(days=6),
                ),
            ]
            session.add_all(newsletters)
            print("✅ Seeded 5 Newsletter Subscribers")

        await session.commit()
    print("🌾 All Inquiries and Newsletter tables ready.")


if __name__ == "__main__":
    asyncio.run(seed_inquiries())
