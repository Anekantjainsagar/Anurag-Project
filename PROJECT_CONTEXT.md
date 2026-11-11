# Project Context & AI Handover Guide

> **Project Name**: ONAAR — Pure Food. Better Life. (Agro E-Commerce & B2B Export Platform)  
> **Repository**: [https://github.com/Anekantjainsagar/Anurag-Project.git](https://github.com/Anekantjainsagar/Anurag-Project.git)  
> **Active Branch**: `v2-full-ecommerce-backend`  
> **Master Documentation**: Please refer to [`CONTEXT.md`](file:///Users/anekantjain/Anekant/Anurag%20Project/CONTEXT.md) for complete technical architecture, Supabase PostgreSQL schema, Cart synchronization mechanics, and developer runbooks.

---

## Quick Reference Summary

1. **Stack**:
   - **Frontend**: Next.js 15 (App Router, Turbopack, Tailwind CSS v4, TypeScript).
   - **Backend**: FastAPI 0.115+ (Python 3.12, SQLAlchemy 2.0 Async, aiosmtplib RFC mailer, Pydantic v2).
   - **Database**: Remote Supabase PostgreSQL (Project ID: `btiuwbqbkltwlefcqhjd`, Sydney region, Supavisor pooler port 6543 with SSL).
   - **SQLite**: Local SQLite has been **completely removed**. Zero local `.db` files remain.

2. **Cart & Wishlist Architecture**:
   - Dual-tier persistence: instant local state (`localStorage`) + debounced cloud synchronization (`POST /api/v1/cart/sync`).
   - Line ID format: `${product.id}-${normWeight}` (e.g. `pulses-organic-arhar-dal-toor-dal-pige-1kg`).
   - Strict prefix matching in `isCartItemForProduct` to prevent quantity displacement across similar items.
   - Canonical hashing (`canonicalCartKey`) prevents infinite sync loops.

3. **Authentication**:
   - Passwordless phone/email OTP via `/api/v1/auth/otp/send` and `/api/v1/auth/otp/verify`.
   - Master bypass code for development: `1234`.
   - Admin phones: `+917692045606` and `+919876543210`.

4. **Running Locally**:
   - Backend: `cd backend && source .venv/bin/activate && python run.py` (Port 8000).
   - Frontend: `npm run dev` (Port 3000).
   - Type check: `npx tsc --noEmit`.

For in-depth details, see [`CONTEXT.md`](file:///Users/anekantjain/Anekant/Anurag%20Project/CONTEXT.md).
