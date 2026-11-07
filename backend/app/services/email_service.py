"""
Asynchronous SMTP Email Service & Template Engine
Standard RFC SMTP protocol (aiosmtplib / Nodemailer compatible) with dynamic DB templates.
"""

from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from typing import Any, Dict, Optional
import aiosmtplib
from jinja2 import Template
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.config import settings
from app.models.email import EmailLog, EmailTemplate
from app.models.settings import SiteSetting

# Built-in fallback HTML templates if DB templates are not yet populated
FALLBACK_TEMPLATES = {
    "ORDER_CONFIRMATION_CUSTOMER": {
        "name": "Customer Order Confirmation",
        "subject": "🌿 Order Confirmed #{{order_number}} - ONAAR",
        "html": """
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
            <h2 style="color: #044a27;">Thank You for Your Order, {{customer_name}}!</h2>
            <p>Your pure harvest order <strong>#{{order_number}}</strong> has been received on {{order_date}}.</p>
            <div style="background-color: #f7faf8; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <h4 style="margin-top:0; color: #044a27;">Delivery Address:</h4>
                <p style="margin: 0;">{{delivery_address}}</p>
                <p style="margin: 5px 0 0 0;"><strong>Phone:</strong> {{customer_phone}}</p>
            </div>
            <div style="margin: 20px 0;">
                <h4 style="color: #044a27;">Items Ordered:</h4>
                <pre style="white-space: pre-wrap; font-family: monospace; background: #fafafa; padding: 10px; border-radius: 6px;">{{order_items}}</pre>
            </div>
            <p><strong>Subtotal:</strong> ₹{{subtotal}}</p>
            <p><strong>Shipping:</strong> {{shipping_fee}}</p>
            <p style="font-size: 16px;"><strong>Total to Pay on Delivery:</strong> <span style="color: #044a27; font-weight: bold;">₹{{total_amount}}</span></p>
            <p><strong>Payment Method:</strong> Pay on Delivery / COD</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
            <p style="color: #666; font-size: 12px;">Our team will contact you at {{customer_phone}} prior to dispatch. For queries, reply to this email or contact support at {{vendor_email}}.</p>
        </div>
        """,
        "text": "Thank you for your order #{{order_number}}, {{customer_name}}! Total: ₹{{total_amount}}. Delivered to {{delivery_address}}.",
    },
    "ORDER_ALERT_VENDOR": {
        "name": "Vendor Order Alert",
        "subject": "🚨 New COD Order #{{order_number}} - {{customer_name}}",
        "html": """
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 2px solid #044a27; border-radius: 10px;">
            <h2 style="color: #044a27;">🚨 New Order Received (COD / Pay on Delivery)</h2>
            <p><strong>Order ID:</strong> {{order_number}}</p>
            <p><strong>Order Date:</strong> {{order_date}}</p>
            <div style="background-color: #fff9e6; padding: 15px; border-left: 4px solid #f59e0b; margin: 15px 0;">
                <h4 style="margin-top:0;">Customer Contact & Address:</h4>
                <p style="margin: 0;"><strong>Name:</strong> {{customer_name}}</p>
                <p style="margin: 0;"><strong>Phone:</strong> {{customer_phone}}</p>
                <p style="margin: 0;"><strong>Email:</strong> {{customer_email}}</p>
                <p style="margin: 0;"><strong>Address:</strong> {{delivery_address}}</p>
                <p style="margin: 5px 0 0 0;"><strong>Order Notes:</strong> {{order_notes}}</p>
            </div>
            <h4>Order Items:</h4>
            <pre style="white-space: pre-wrap; font-family: monospace; background: #fafafa; padding: 10px;">{{order_items}}</pre>
            <p><strong>Total to Collect:</strong> ₹{{total_amount}}</p>
            <p style="background: #eef7f2; padding: 10px; border-radius: 6px;"><strong>Action Required:</strong> Contact customer via WhatsApp/Call at {{customer_phone}} to confirm order and dispatch schedule.</p>
        </div>
        """,
        "text": "New COD Order #{{order_number}} from {{customer_name}} (Phone: {{customer_phone}}). Total: ₹{{total_amount}}.",
    },
    "CONTACT_US_ALERT": {
        "name": "Contact Inquiry Alert",
        "subject": "📬 Contact Inquiry: {{subject}} - {{name}}",
        "html": """
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ccc; border-radius: 10px;">
            <h3 style="color: #044a27;">New Retail Contact Inquiry</h3>
            <p><strong>Name:</strong> {{name}}</p>
            <p><strong>Email:</strong> {{email}}</p>
            <p><strong>Phone:</strong> {{phone}}</p>
            <p><strong>Subject:</strong> {{subject}}</p>
            <hr />
            <p><strong>Message:</strong></p>
            <p style="background: #f8faf9; padding: 12px; border-radius: 6px;">{{message}}</p>
        </div>
        """,
        "text": "New inquiry from {{name}} ({{email}}, {{phone}}): {{subject}} - {{message}}",
    },
}


class EmailService:
    @staticmethod
    async def get_smtp_config(db: AsyncSession) -> Dict[str, Any]:
        """Loads SMTP configuration from site_settings or falls back to environment."""
        result = await db.execute(select(SiteSetting).where(SiteSetting.key == "smtp_settings"))
        row = result.scalar_one_or_none()
        if row and isinstance(row.value, dict):
            cfg = row.value
            return {
                "host": cfg.get("host") or settings.SMTP_HOST,
                "port": int(cfg.get("port") or settings.SMTP_PORT),
                "user": cfg.get("user") or settings.SMTP_USER,
                "password": cfg.get("password") or settings.SMTP_PASSWORD,
                "use_tls": cfg.get("use_tls", settings.SMTP_USE_TLS),
                "from_name": cfg.get("from_name") or settings.SMTP_FROM_NAME,
                "from_email": cfg.get("from_email") or settings.SMTP_FROM_EMAIL,
            }
        return {
            "host": settings.SMTP_HOST,
            "port": settings.SMTP_PORT,
            "user": settings.SMTP_USER,
            "password": settings.SMTP_PASSWORD,
            "use_tls": settings.SMTP_USE_TLS,
            "from_name": settings.SMTP_FROM_NAME,
            "from_email": settings.SMTP_FROM_EMAIL,
        }

    @staticmethod
    async def render_template(
        db: AsyncSession,
        template_key: str,
        context: Dict[str, Any],
    ) -> tuple[str, str, str]:
        """
        Retrieves template from database (or fallback) and renders subject, HTML, and text.
        Returns: (subject, html_body, text_body)
        """
        result = await db.execute(select(EmailTemplate).where(EmailTemplate.template_key == template_key))
        tmpl_row = result.scalar_one_or_none()

        if tmpl_row and tmpl_row.is_active:
            raw_subject = tmpl_row.subject
            raw_html = tmpl_row.body_html
            raw_text = tmpl_row.body_text
        elif template_key in FALLBACK_TEMPLATES:
            fb = FALLBACK_TEMPLATES[template_key]
            raw_subject = fb["subject"]
            raw_html = fb["html"]
            raw_text = fb["text"]
        else:
            raw_subject = f"Notification ({template_key})"
            raw_html = "<p>" + "<br/>".join(f"<b>{k}:</b> {v}" for k, v in context.items()) + "</p>"
            raw_text = "\n".join(f"{k}: {v}" for k, v in context.items())

        # Render with Jinja2
        subject = Template(raw_subject).render(**context)
        html_body = Template(raw_html).render(**context)
        text_body = Template(raw_text).render(**context)

        return subject, html_body, text_body

    @classmethod
    async def send_email(
        cls,
        db: AsyncSession,
        recipient_email: str,
        template_key: str,
        context: Dict[str, Any],
    ) -> bool:
        """
        Asynchronously sends an email via standard SMTP and logs to email_logs.
        """
        smtp_cfg = await cls.get_smtp_config(db)
        subject, html_body, text_body = await cls.render_template(db, template_key, context)

        message = MIMEMultipart("alternative")
        message["Subject"] = subject
        message["From"] = f"{smtp_cfg['from_name']} <{smtp_cfg['from_email']}>"
        message["To"] = recipient_email

        message.attach(MIMEText(text_body, "plain", "utf-8"))
        message.attach(MIMEText(html_body, "html", "utf-8"))

        status = "SENT"
        error_msg = None

        if not smtp_cfg["password"]:
            # If SMTP password is not set yet, simulate delivery and log
            print(f"[SMTP SIMULATION] To: {recipient_email} | Subject: {subject}")
            status = "SIMULATED"
        else:
            try:
                await aiosmtplib.send(
                    message,
                    hostname=smtp_cfg["host"],
                    port=smtp_cfg["port"],
                    username=smtp_cfg["user"],
                    password=smtp_cfg["password"],
                    start_tls=smtp_cfg["use_tls"],
                    timeout=15,
                )
            except Exception as e:
                status = "FAILED"
                error_msg = str(e)
                print(f"[SMTP ERROR] Failed to send email to {recipient_email}: {e}")

        # Record in email_logs
        log_entry = EmailLog(
            recipient_email=recipient_email,
            template_key=template_key,
            subject=subject,
            status=status,
            error_message=error_msg,
        )
        db.add(log_entry)
        await db.commit()

        return status in ("SENT", "SIMULATED")

