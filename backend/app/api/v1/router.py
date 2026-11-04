"""
API v1 Router Aggregator
Mounts all domain endpoint sub-routers under /api/v1 prefix.
"""

from fastapi import APIRouter
from app.api.v1.endpoints import health

api_router = APIRouter()

# Mount health routes
api_router.include_router(health.router, tags=["System & Health"])
