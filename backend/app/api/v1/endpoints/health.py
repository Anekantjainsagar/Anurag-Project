"""
System Health & Telemetry Endpoints
"""

from datetime import datetime, timezone
from fastapi import APIRouter, Depends
from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.config import settings
from app.core.database import get_db

router = APIRouter()


@router.get("/health", summary="System Health Check")
async def health_check():
    """
    Returns the live service status, current time, and active environment.
    """
    return {
        "status": "healthy",
        "service": settings.PROJECT_NAME,
        "environment": settings.ENVIRONMENT,
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "version": "0.1.0",
    }


@router.get("/health/db", summary="Database Connection Health Check")
async def db_health_check(db: AsyncSession = Depends(get_db)):
    """
    Executes a lightweight query against Supabase PostgreSQL to verify DB connectivity.
    """
    try:
        result = await db.execute(text("SELECT 1"))
        scalar = result.scalar()
        return {
            "status": "healthy",
            "database": "connected" if scalar == 1 else "unhealthy",
            "timestamp": datetime.now(timezone.utc).isoformat(),
        }
    except Exception as e:
        return {
            "status": "degraded",
            "database": "disconnected",
            "error": str(e),
            "timestamp": datetime.now(timezone.utc).isoformat(),
        }
