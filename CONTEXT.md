# ONAAR E-Commerce — Master Developer Handover Context

> **Brand**: ONAAR — Pure Food. Better Life.  
> **Repository**: [https://github.com/Anekantjainsagar/Anurag-Project.git](https://github.com/Anekantjainsagar/Anurag-Project.git)  
> **Active Branch**: `v2-full-ecommerce-backend`  
> **Last Updated**: November 2026  
> **Author / Maintainer Reference**: Anurag Jain (`meriwebdunia@gmail.com`) / Anekant Jain (`anekantjainsagar@gmail.com`)

---

## 1. System Architecture Overview

ONAAR is a production-grade full-stack organic staples e-commerce platform and B2B agro-export portal.

```
┌────────────────────────────────────────────────────────┐
│           Next.js 15 App Router Frontend               │
│  (Port 3000 • React 19 • Tailwind CSS • Turbopack)     │
└──────────────┬─────────────────────────┬───────────────┘
               │ HTTP Client Requests    │ Real-time State
               ▼                         ▼
┌──────────────────────────────┐  ┌──────────────────────┐
│       FastAPI Backend        │  │     CartContext      │
│  (Port 8000 • Python 3.12)   │  │ (LocalStorage Cache  │
│  • Pydantic v2 validation    │  │  + Remote DB Sync)   │
│  • SQLAlchemy 2.0 Async      │  └──────────────────────┘
│  • aiosmtplib RFC Mailer     │
└──────────────┬───────────────┘
               │ Supavisor Pooler (Port 6543, SSL)
               ▼
┌────────────────────────────────────────────────────────┐
│        Remote Supabase PostgreSQL Database             │
│  (Project: btiuwbqbkltwlefcqhjd • Region: Sydney)      │
│  • 192 Catalog Products  • Live Cart & Wishlist Rows   │
│  • Orders & Milestones   • Telemetry & Site Settings   │
└────────────────────────────────────────────────────────┘
```

---

## 2. Remote Database (Supabase PostgreSQL)

> [!IMPORTANT]
> **Zero Local SQLite Databases**: The application has been fully migrated away from SQLite (`onaar.db`). All local `.db` files have been removed. Both public storefront operations and administrative telemetry connect exclusively to the live Supabase PostgreSQL instance.

### Credentials & Connection Parameters
- **Project Ref**: `btiuwbqbkltwlefcqhjd`
- **Region**: Oceania (`ap-southeast-2` / Sydney)
- **Engine**: PostgreSQL 15+ via Supabase Pooler (Supavisor)
- **Port**: `6543` (Transaction Pooler with SSL)
- **Connection String in `backend/.env`**:
  ```env
  DATABASE_URL=postgresql+asyncpg://postgres.btiuwbqbkltwlefcqhjd:MrFxpSXd7X-60JTpQ_lcmVwbqQ@aws-0-ap-southeast-2.pooler.supabase.com:6543/postgres?ssl=require&pool_timeout=20
  ```

### Key Database Tables
| Table | Description |
| :--- | :--- |
| `products` | 192 certified organic items across 8 categories with SEO slugs as primary keys |
| `product_variants` | Packaging weight options (`500g`, `1kg`, `5kg`, `10kg`, `50kg`) with locked prices and discounts |
| `product_images` | Verified photography links and primary display indicators |
| `cart_items` | Active cloud shopping cart items persisted per user ID or guest session token |
| `wishlist_items` | Saved customer favorites persisted across devices |
| `users` | Customer & administrator accounts with RBAC (`admin`, `vendor`, `customer`) |
| `user_sessions` | Active JWT access tokens and device audit logs |
| `user_addresses` | Customer delivery address book |
| `orders` | Completed orders with sequential numbers (`YB-YYYYMMDD-XXXX`) |
| `order_items` | Itemized line records per order with price snapshots |
| `order_tracking_events` | Courier and fulfillment lifecycle milestones |
| `coupons` | Promo discounts with customer and device redemption tracking |
| `site_settings` | Dynamic store policies (shipping fee thresholds, tax rules, maintenance flags) |
| `email_logs` | Outbox audit history for customer and vendor transactional emails |

---

## 3. Cart & Wishlist Synchronization System

### The Problem That Was Solved
In earlier versions, customers experienced:
1. **Quantity Misplacement**: Modifying a quantity stepper on one product card occasionally incremented a completely different product's quantity.
2. **Quantity Multiplication**: Quantities jumped unpredictably (e.g., from 1 to 28 or 224) due to merge duplication between guest tokens and user accounts.
3. **Spurious Sync Loops**: Rapid `POST /api/v1/cart/sync` calls firing continuously on page load, route transitions, or tab switches.

### Root Cause Analysis & Solution
1. **Strict Product Matching in Storefront Components**:
   - *Cause*: `isCartItemForProduct` used loose `item.productId.startsWith(prod.id)` checks. Products sharing a common prefix (e.g. `pulses-organic-moong-whole` vs `pulses-organic-moong-whole-moong-sabut`) falsely matched each other.
   - *Fix*: Replaced with strict matching:
     ```typescript
     // 1. Direct match on productId
     if (cleanItemId && cleanItemId === cleanProdId) return true;
     // 2. Direct match on line ID
     if (cleanLineId === cleanProdId) return true;
     // 3. Match compound line ID: {productId}-{weight}
     if (cleanLineId.startsWith(`${cleanProdId}-`)) return true;
     // 4. Exact match on product name
     if (cleanName && cleanName === cleanProdName) return true;
     ```
2. **Normalized Cart Line IDs**:
   - Every cart line uses the canonical formula: `${product.id}-${normWeight}` where `normWeight` strips all spaces, hyphens, and casing (e.g. `pulses-organic-arhar-dal-toor-dal-pige-1kg`).
   - `normalizeId()` is used in `addToCart`, `updateQuantity`, and `removeFromCart` to prevent formatting mismatches.
3. **Backend Slug Pre-Resolution & Unique Deduplication**:
   - In `backend/app/api/v1/endpoints/cart.py`, `sync_cart` resolves incoming compound IDs to their base database `Product` before deduplicating.
   - Items are indexed strictly by `(product.id, normalized_weight)`:
     ```python
     resolved_items[dedupe_key] = {
         "product_id": p.id,
         "variant_id": variant_id,
         "weight_label": item.weight,
         "quantity": item.quantity,
     }
     ```
   - In guest-to-user merge, existing records take `max(existing.quantity, guest.quantity)` instead of compound adding, preventing exponential runaway.
4. **Canonical Hashing to Prevent Sync Loops**:
   - [`src/context/CartContext.tsx`](file:///Users/anekantjain/Anekant/Anurag%20Project/src/context/CartContext.tsx) computes a deterministic key `canonicalCartKey(cartItems)` sorting by item ID.
   - `useEffect([cartItems])` skips network dispatch if the canonical key matches `lastSyncedCartJsonRef.current`.
   - User adjustments are debounced by 600ms before sending a single clean payload to `POST /api/v1/cart/sync`.

---

## 4. Authentication & Authorization

### Flow
- Authentication is passwordless via Phone or Email OTP:
  - `POST /api/v1/auth/otp/send` -> Generates 4-digit code.
  - `POST /api/v1/auth/otp/verify` -> Validates OTP and returns JWT Bearer token + User profile.
- **Development Universal Bypass Code**: `1234` is enabled in `DEBUG=True` mode for instant testing without SMS gateway charges.

### Administrator Accounts
Accounts configured as `role = 'admin'` or `role = 'vendor'`:
- **Phone**: `+917692045606` / **Email**: `anekantjainsagar@gmail.com`
- **Phone**: `+919876543210` / **Email**: `meriwebdunia@gmail.com`

### Admin Portal Protection
- The administrative layout ([`src/app/admin/layout.tsx`](file:///Users/anekantjain/Anekant/Anurag%20Project/src/app/admin/layout.tsx)) uses the standard storefront [`LoginModal`](file:///Users/anekantjain/Anekant/Anurag%20Project/src/components/LoginModal.tsx) via `post_login_redirect: "/admin"`.
- To satisfy Next.js 15 App Router instant navigation pre-rendering validation, `{children}` is preserved in a hidden container when `!isAdmin`, preventing `instant-unrendered-segment` drops.

---

## 5. Checkout & Order Lifecycle

1. **Endpoint**: `POST /api/v1/orders/checkout`
2. **Payload Structure**:
   ```json
   {
     "customer_name": "Customer Name",
     "customer_phone": "+919876543210",
     "customer_email": "customer@example.com",
     "shipping_flat_no": "House 10",
     "shipping_street": "Main Street",
     "shipping_city": "Indore",
     "shipping_state": "Madhya Pradesh",
     "shipping_pincode": "452001",
     "payment_method": "COD",
     "coupon_code": "WELCOME10",
     "items": [
       {
         "product_id": "pulses-organic-arhar-dal-toor-dal-pige",
         "product_name": "Organic Arhar Dal",
         "weight_label": "1kg",
         "quantity": 1,
         "unit_price": 180.0
       }
     ]
   }
   ```
3. **Safety Guards Implemented**:
   - **Foreign Key Protection**: If a custom or legacy item ID is not found in the `products` table, `OrderItem.product_id` defaults to `NULL` (permitted by DB schema), preventing PostgreSQL `ForeignKeyViolationError`.
   - **Non-Blocking Email Notifications**: SMTP customer confirmations and vendor alerts are wrapped in non-blocking try-catch blocks in [`backend/app/services/order_service.py`](file:///Users/anekantjain/Anekant/Anurag%20Project/backend/app/services/order_service.py).
   - **Tracking Number**: Automatically assigns `YB-YYYYMMDD-XXXX` and creates an initial tracking milestone (`PENDING_VERIFICATION`).

---

## 6. How to Run the Project

### Prerequisites
- Node.js 18+ & npm
- Python 3.12+ with virtual environment tools (`uv` or `venv`)

### 1. Start the FastAPI Backend
```bash
cd backend
source .venv/bin/activate
python run.py
```
- **API URL**: `http://127.0.0.1:8000`
- **Swagger Docs**: `http://127.0.0.1:8000/docs`
- **ReDoc**: `http://127.0.0.1:8000/redoc`

### 2. Start the Next.js Frontend
```bash
# In the project root directory:
npm run dev
```
- **Storefront**: `http://localhost:3000`
- **Admin Portal**: `http://localhost:3000/admin`
- **Shop / Catalog**: `http://localhost:3000/products`
- **Checkout**: `http://localhost:3000/checkout`

### 3. Verify Code Quality & Type Integrity
```bash
npx tsc --noEmit
```
Must exit with code 0.

---

## 7. Useful Test Snippets

### Test Admin Login & Telemetry API
```bash
PYTHONPATH=backend backend/.venv/bin/python -c '
import urllib.request, json
# Verify OTP
req = urllib.request.Request("http://127.0.0.1:8000/api/v1/auth/otp/verify",
    data=json.dumps({"identifier": "7692045606", "otp_code": "1234"}).encode(),
    headers={"Content-Type": "application/json"})
res = urllib.request.urlopen(req)
token = json.loads(res.read())["access_token"]
# Fetch Dashboard
req2 = urllib.request.Request("http://127.0.0.1:8000/api/v1/admin/dashboard",
    headers={"Authorization": f"Bearer {token}"})
print("Dashboard ok:", json.loads(urllib.request.urlopen(req2).read()).get("total_active_products"))
'
```

### Inspect Live Supabase Cart Rows
```bash
PYTHONPATH=backend backend/.venv/bin/python -c '
import asyncio
from sqlalchemy import select
from app.core.database import AsyncSessionLocal
from app.models.cart import CartItem

async def check():
    async with AsyncSessionLocal() as session:
        items = (await session.execute(select(CartItem))).scalars().all()
        print("Total Cart Rows in DB:", len(items))
        for it in items:
            print(f"  {it.product_id} ({it.weight_label}) qty={it.quantity}")

asyncio.run(check())
'
```
