"""
Health Journal & Agronomy Blog Endpoints
Covers 24 category-aligned blogs, tags, authors, and cross-promoted products.
"""

from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload
from app.core.database import get_db
from app.models.blog import BlogCategory, BlogPost
from app.schemas.blog import BlogCategoryOut, BlogPostDetailOut, BlogPostListOut

router = APIRouter()


@router.get("/blogs/categories", response_model=List[BlogCategoryOut], summary="List Blog Categories")
async def list_blog_categories(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(BlogCategory).order_by(BlogCategory.display_order.asc()))
    return result.scalars().all()


@router.get("/blogs", response_model=List[BlogPostListOut], summary="List Blogs")
async def list_blogs(
    category: Optional[str] = Query(None, description="Blog category slug"),
    tag: Optional[str] = Query(None, description="Tag filter"),
    skip: int = Query(0, ge=0),
    limit: int = Query(24, ge=1, le=100),
    db: AsyncSession = Depends(get_db),
):
    stmt = (
        select(BlogPost)
        .where(BlogPost.is_published.is_(True))
        .order_by(BlogPost.published_at.desc())
    )
    if category:
        stmt = stmt.where(BlogPost.category_id.ilike(category))

    stmt = stmt.offset(skip).limit(limit)
    result = await db.execute(stmt)
    return result.scalars().all()


@router.get("/blogs/{id_or_slug}", response_model=BlogPostDetailOut, summary="Get Full Blog Article")
async def get_blog(id_or_slug: str, db: AsyncSession = Depends(get_db)):
    stmt = (
        select(BlogPost)
        .where(
            (BlogPost.id == id_or_slug) | (BlogPost.slug == id_or_slug),
            BlogPost.is_published.is_(True),
        )
        .options(selectinload(BlogPost.highlights))
    )
    result = await db.execute(stmt)
    post = result.scalar_one_or_none()
    if not post:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Blog article not found.")

    return post

