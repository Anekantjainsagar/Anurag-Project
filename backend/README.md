# Onaar / YOUR BRAND FastAPI Backend

Production-grade asynchronous REST API backend powering the **Onaar / YOUR BRAND** organic e-commerce ecosystem.

## Tech Stack
- **FastAPI**: Modern, high-performance async REST framework
- **UV**: Ultra-fast Rust-based Python package manager
- **SQLAlchemy 2.0 (Async) + asyncpg**: Asynchronous PostgreSQL ORM & pool
- **Supabase (PostgreSQL)**: Managed relational database + Storage
- **Pydantic v2**: Strict schema validation & serialization
- **aiosmtplib & Jinja2**: Asynchronous database-driven email rendering & SMTP delivery

## Getting Started

```bash
# 1. Sync dependencies with uv
cd backend
uv sync

# 2. Run the development server
uv run uvicorn app.main:app --reload --port 8000
```
