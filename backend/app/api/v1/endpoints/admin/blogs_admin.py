"""
Admin Blog & Agronomy Journal Management Endpoints
Full CRUD operations for health articles, nutritional research, and farm guides.
"""

from datetime import datetime, timezone
import re
from typing import Any, List, Optional, Union
import uuid

from fastapi import APIRouter, Depends, HTTPException, Query, status
from pydantic import BaseModel
from sqlalchemy import or_, select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.core.database import get_db
from app.core.dependencies import require_role
from app.models.blog import BlogCategory, BlogPost
from app.models.user import User

router = APIRouter()


class BlogPostCreateInput(BaseModel):
    id: Optional[str] = None
    title: str
    slug: Optional[str] = None
    category_id: Optional[str] = "Health & Nutrition"
    summary: str
    read_time: str = "5 min read"
    image_url: str
    author_name: str = "Anurag Jain"
    author_role: str = "Head of Agronomy & Research"
    health_tip: Optional[str] = None
    tags: List[str] = []
    content: Union[List[str], str] = []
    key_benefits: List[str] = []
    is_published: bool = True


class BlogPostUpdateInput(BaseModel):
    title: Optional[str] = None
    slug: Optional[str] = None
    category_id: Optional[str] = None
    summary: Optional[str] = None
    read_time: Optional[str] = None
    image_url: Optional[str] = None
    author_name: Optional[str] = None
    author_role: Optional[str] = None
    health_tip: Optional[str] = None
    tags: Optional[List[str]] = None
    content: Optional[Union[List[str], str]] = None
    key_benefits: Optional[List[str]] = None
    is_published: Optional[bool] = None


def generate_slug(text: str) -> str:
    cleaned = re.sub(r"[^\w\s-]", "", text.lower()).strip()
    return re.sub(r"[-\s]+", "-", cleaned)


@router.get("/admin/blogs", summary="List All Blog Articles")
async def admin_list_blogs(
    search: Optional[str] = None,
    category_id: Optional[str] = None,
    admin_user: User = Depends(require_role("admin", "vendor")),
    db: AsyncSession = Depends(get_db),
):
    stmt = select(BlogPost).order_by(BlogPost.created_at.desc())
    if search:
        search_fmt = f"%{search.strip()}%"
        stmt = stmt.where(or_(BlogPost.title.ilike(search_fmt), BlogPost.summary.ilike(search_fmt)))
    if category_id and category_id != "ALL":
        stmt = stmt.where(BlogPost.category_id == category_id)

    res = await db.execute(stmt)
    posts = res.scalars().all()

    return [
        {
            "id": p.id,
            "title": p.title,
            "slug": p.slug,
            "category_id": p.category_id,
            "summary": p.summary,
            "read_time": p.read_time,
            "image_url": p.image_url,
            "author_name": p.author_name,
            "author_role": p.author_role,
            "tags": p.tags or [],
            "is_published": p.is_published,
            "published_at": p.published_at.isoformat() if p.published_at else None,
            "created_at": p.created_at.isoformat() if p.created_at else None,
        }
        for p in posts
    ]


@router.get("/admin/blogs/{blog_id}", summary="Get Single Blog Article Detail")
async def admin_get_blog(
    blog_id: str,
    admin_user: User = Depends(require_role("admin", "vendor")),
    db: AsyncSession = Depends(get_db),
):
    stmt = select(BlogPost).where(BlogPost.id == blog_id)
    res = await db.execute(stmt)
    p = res.scalar_one_or_none()
    if not p:
        raise HTTPException(status_code=404, detail="Article not found.")

    return {
        "id": p.id,
        "title": p.title,
        "slug": p.slug,
        "category_id": p.category_id,
        "summary": p.summary,
        "read_time": p.read_time,
        "image_url": p.image_url,
        "author_name": p.author_name,
        "author_role": p.author_role,
        "health_tip": p.health_tip,
        "tags": p.tags or [],
        "content": p.content or [],
        "key_benefits": p.key_benefits or [],
        "is_published": p.is_published,
    }


@router.post("/admin/blogs", summary="Create New Blog Article")
async def admin_create_blog(
    payload: BlogPostCreateInput,
    admin_user: User = Depends(require_role("admin", "vendor")),
    db: AsyncSession = Depends(get_db),
):
    blog_id = payload.id.strip() if payload.id else f"blog-{generate_slug(payload.title)[:40]}"
    slug = payload.slug.strip() if payload.slug else generate_slug(payload.title)

    # Check duplicate
    existing = await db.execute(select(BlogPost).where(BlogPost.id == blog_id))
    if existing.scalar_one_or_none():
        blog_id = f"{blog_id}-{uuid.uuid4().hex[:4]}"

    post = BlogPost(
        id=blog_id,
        title=payload.title.strip(),
        slug=slug,
        summary=payload.summary.strip(),
        read_time=payload.read_time.strip(),
        image_url=payload.image_url.strip(),
        category_id=payload.category_id,
        author_name=payload.author_name.strip(),
        author_role=payload.author_role.strip(),
        health_tip=payload.health_tip.strip() if payload.health_tip else None,
        tags=payload.tags,
        content=[payload.content] if isinstance(payload.content, str) else (payload.content or []),
        key_benefits=payload.key_benefits,
        is_published=payload.is_published,
        published_at=datetime.now(timezone.utc) if payload.is_published else None,
    )
    db.add(post)
    await db.commit()
    return {"success": True, "message": f"Article '{post.title}' created.", "blog_id": blog_id}


@router.put("/admin/blogs/{blog_id}", summary="Update Blog Article")
async def admin_update_blog(
    blog_id: str,
    payload: BlogPostUpdateInput,
    admin_user: User = Depends(require_role("admin", "vendor")),
    db: AsyncSession = Depends(get_db),
):
    stmt = select(BlogPost).where(BlogPost.id == blog_id)
    res = await db.execute(stmt)
    p = res.scalar_one_or_none()
    if not p:
        raise HTTPException(status_code=404, detail="Article not found.")

    if payload.title is not None:
        p.title = payload.title.strip()
    if payload.slug is not None:
        p.slug = payload.slug.strip()
    if payload.summary is not None:
        p.summary = payload.summary.strip()
    if payload.read_time is not None:
        p.read_time = payload.read_time.strip()
    if payload.image_url is not None:
        p.image_url = payload.image_url.strip()
    if payload.category_id is not None:
        p.category_id = payload.category_id.strip()
    if payload.author_name is not None:
        p.author_name = payload.author_name.strip()
    if payload.author_role is not None:
        p.author_role = payload.author_role.strip()
    if payload.health_tip is not None:
        p.health_tip = payload.health_tip.strip()
    if payload.tags is not None:
        p.tags = payload.tags
    if payload.content is not None:
        p.content = [payload.content] if isinstance(payload.content, str) else payload.content
    if payload.key_benefits is not None:
        p.key_benefits = payload.key_benefits
    if payload.is_published is not None:
        p.is_published = payload.is_published
        if payload.is_published and not p.published_at:
            p.published_at = datetime.now(timezone.utc)

    await db.commit()
    return {"success": True, "message": f"Article '{p.title}' updated."}


@router.delete("/admin/blogs/{blog_id}", summary="Delete Blog Article")
async def admin_delete_blog(
    blog_id: str,
    admin_user: User = Depends(require_role("admin", "vendor")),
    db: AsyncSession = Depends(get_db),
):
    stmt = select(BlogPost).where(BlogPost.id == blog_id)
    res = await db.execute(stmt)
    p = res.scalar_one_or_none()
    if not p:
        raise HTTPException(status_code=404, detail="Article not found.")

    await db.delete(p)
    await db.commit()
    return {"success": True, "message": f"Article '{p.title}' deleted."}


@router.patch("/admin/blogs/{blog_id}/publish", summary="Toggle Blog Published Status")
async def admin_toggle_publish(
    blog_id: str,
    admin_user: User = Depends(require_role("admin", "vendor")),
    db: AsyncSession = Depends(get_db),
):
    stmt = select(BlogPost).where(BlogPost.id == blog_id)
    res = await db.execute(stmt)
    p = res.scalar_one_or_none()
    if not p:
        raise HTTPException(status_code=404, detail="Article not found.")

    p.is_published = not p.is_published
    if p.is_published and not p.published_at:
        p.published_at = datetime.now(timezone.utc)

    await db.commit()
    return {
        "success": True,
        "is_published": p.is_published,
        "message": f"Article is now {'published' if p.is_published else 'draft'}.",
    }
