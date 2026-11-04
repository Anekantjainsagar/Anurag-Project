"""
Catalog & Product Endpoints
Covers categories, product catalog, search filters, pack variants, and traceability.
"""

from typing import List, Optional
from decimal import Decimal
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import or_, select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload
from app.core.database import get_db
from app.models.catalog import Category, Product
from app.schemas.catalog import CategoryOut, ProductDetailOut, ProductListOut

router = APIRouter()


@router.get("/categories", response_model=List[CategoryOut], summary="List Categories")
async def list_categories(db: AsyncSession = Depends(get_db)):
    """Returns active categories ordered by display_order."""
    result = await db.execute(
        select(Category).where(Category.is_active.is_(True)).order_by(Category.display_order.asc())
    )
    return result.scalars().all()


@router.get("/products", response_model=List[ProductListOut], summary="List Products with Filters")
async def list_products(
    category: Optional[str] = Query(None, description="Category slug or ID"),
    search: Optional[str] = Query(None, description="Search term in name or description"),
    tag: Optional[str] = Query(None, description="Bestseller, Pure Harvest, Heirloom"),
    min_price: Optional[Decimal] = Query(None, description="Minimum price filter"),
    max_price: Optional[Decimal] = Query(None, description="Maximum price filter"),
    skip: int = Query(0, ge=0),
    limit: int = Query(24, ge=1, le=100),
    db: AsyncSession = Depends(get_db),
):
    """
    Paginated product listing with category, search, tag, and price filtering.
    """
    stmt = (
        select(Product)
        .where(Product.is_active.is_(True))
        .options(
            selectinload(Product.variants),
            selectinload(Product.images),
        )
    )

    if category:
        stmt = stmt.where(Product.category_id.ilike(category))

    if tag:
        stmt = stmt.where(Product.tag.ilike(f"%{tag}%"))

    if search:
        search_pattern = f"%{search.strip()}%"
        stmt = stmt.where(
            or_(
                Product.name.ilike(search_pattern),
                Product.subtitle.ilike(search_pattern),
                Product.description.ilike(search_pattern),
                Product.origin.ilike(search_pattern),
            )
        )

    stmt = stmt.offset(skip).limit(limit)
    result = await db.execute(stmt)
    products = result.scalars().all()

    # Format list output with default price and primary thumbnail
    formatted = []
    for p in products:
        default_variant = next((v for v in p.variants if v.is_default), p.variants[0] if p.variants else None)
        primary_img = next((img.image_url for img in p.images if img.is_primary), p.images[0].image_url if p.images else None)

        p_dict = {
            "id": p.id,
            "category_id": p.category_id,
            "name": p.name,
            "subtitle": p.subtitle,
            "origin": p.origin,
            "tag": p.tag,
            "rating": p.rating,
            "reviews_count": p.reviews_count,
            "in_stock": p.in_stock,
            "is_featured": p.is_featured,
            "primary_image": primary_img,
            "default_price": default_variant.price if default_variant else None,
            "default_original_price": default_variant.original_price if default_variant else None,
            "default_discount": default_variant.discount_label if default_variant else None,
            "variants": p.variants,
        }
        formatted.append(ProductListOut(**p_dict))

    return formatted


@router.get("/products/{product_id}", response_model=ProductDetailOut, summary="Get Product Specifications")
async def get_product(product_id: str, db: AsyncSession = Depends(get_db)):
    """
    Retrieves full product specification including gallery, pack variants,
    nutritional facts, purity parameters, and traceability lot.
    """
    stmt = (
        select(Product)
        .where(Product.id == product_id, Product.is_active.is_(True))
        .options(
            selectinload(Product.variants),
            selectinload(Product.images),
            selectinload(Product.features),
            selectinload(Product.nutritional_facts),
            selectinload(Product.purity_parameters),
            selectinload(Product.harvest_batches),
        )
    )
    result = await db.execute(stmt)
    p = result.scalar_one_or_none()
    if not p:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found.")

    default_variant = next((v for v in p.variants if v.is_default), p.variants[0] if p.variants else None)
    primary_img = next((img.image_url for img in p.images if img.is_primary), p.images[0].image_url if p.images else None)

    return ProductDetailOut(
        id=p.id,
        category_id=p.category_id,
        name=p.name,
        subtitle=p.subtitle,
        origin=p.origin,
        tag=p.tag,
        rating=p.rating,
        reviews_count=p.reviews_count,
        in_stock=p.in_stock,
        is_featured=p.is_featured,
        primary_image=primary_img,
        default_price=default_variant.price if default_variant else None,
        default_original_price=default_variant.original_price if default_variant else None,
        default_discount=default_variant.discount_label if default_variant else None,
        description=p.description,
        health_benefits=p.health_benefits,
        ingredients=p.ingredients,
        storage_instructions=p.storage_instructions,
        common_uses=p.common_uses,
        additional_info=p.additional_info,
        variants=p.variants,
        images=p.images,
        features=p.features,
        nutritional_facts=p.nutritional_facts,
        purity_parameters=p.purity_parameters,
        harvest_batches=p.harvest_batches,
    )

