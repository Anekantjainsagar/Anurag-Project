"""
Onaar / YOUR BRAND E-Commerce FastAPI Application
Main application factory with lifespan handlers, CORS, and API routing.
"""

from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.v1.router import api_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Initialize connection pools / telemetry
    print(f"🚀 [STARTUP] Starting {settings.PROJECT_NAME} ({settings.ENVIRONMENT})")
    yield
    # Shutdown: Close database pools & resources
    print("🛑 [SHUTDOWN] Terminating application resources")


def create_application() -> FastAPI:
    app = FastAPI(
        title=settings.PROJECT_NAME,
        version="0.1.0",
        description="Enterprise REST API for YOUR BRAND / Onaar Organic E-Commerce Storefront",
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
