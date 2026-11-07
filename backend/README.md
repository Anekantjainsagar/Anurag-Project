# Onaar FastAPI Backend

Production-grade asynchronous REST API backend powering the **Onaar** organic e-commerce ecosystem.

## Tech Stack
- **FastAPI**: Modern, high-performance async REST framework
- **UV**: Ultra-fast Rust-based Python package manager
- **SQLAlchemy 2.0 (Async) + asyncpg**: Asynchronous PostgreSQL ORM & pool
- **Supabase (PostgreSQL)**: Managed relational database + Storage
- **Pydantic v2**: Strict schema validation & serialization
- **aiosmtplib & Jinja2**: Asynchronous database-driven email rendering & SMTP delivery

## Getting Started

```bash
# 1. Navigate to backend
cd backend

# 2. Run directly with Python (auto-reload on port 8000)
python run.py

# Or run using uv
uv run python run.py
```

