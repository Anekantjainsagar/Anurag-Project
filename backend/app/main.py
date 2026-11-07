"""
Onaar E-Commerce FastAPI Application
Main application factory with lifespan handlers, CORS, and API routing.
"""

from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.v1.router import api_router
from app.core.database import AsyncSessionLocal, Base, engine


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Initialize and verify database connection
    print(f"🚀 [STARTUP] Starting {settings.PROJECT_NAME} ({settings.ENVIRONMENT})")
    try:
        async with engine.begin() as conn:
            await conn.run_sync(Base.metadata.create_all)
        print("✅ [DATABASE] Connection established and schema verified.")

        # Auto-seed initial catalog & admin if database is newly initialized
        try:
            from sqlalchemy import select, func
            from app.models.catalog import Product
            async with AsyncSessionLocal() as session:
                prod_count = await session.scalar(select(func.count(Product.id)))
                if not prod_count:
                    print("🌱 [DATABASE] Empty database detected. Seeding 192 organic crops & admin...")
                    from scripts.seed_database import seed_data
                    await seed_data()
        except Exception as seed_err:
            print(f"⚠️ [DATABASE] Auto-seed notice: {seed_err}")
    except Exception as e:
        print(f"⚠️ [DATABASE] Startup connection notice: {e}")
    yield
    # Shutdown: Close database pools & resources
    print("🛑 [SHUTDOWN] Terminating application resources")


def create_application() -> FastAPI:
    app = FastAPI(
        title=settings.PROJECT_NAME,
        version="0.1.0",
        description="Enterprise REST API for Onaar Organic E-Commerce Storefront",
        docs_url="/docs",
        redoc_url="/redoc",
        lifespan=lifespan,
    )

    # Configure CORS for Next.js frontend
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.CORS_ORIGINS,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # Mount API v1 router
    app.include_router(api_router, prefix=settings.API_V1_PREFIX)

    @app.get("/", tags=["Root"])
    async def root():
        return {
            "message": f"Welcome to {settings.PROJECT_NAME} API",
            "documentation": "/docs",
            "health": f"{settings.API_V1_PREFIX}/health",
            "version": "0.1.0",
        }

    return app


app = create_application()

