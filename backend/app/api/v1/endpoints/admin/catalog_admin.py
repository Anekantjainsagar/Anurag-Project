"""
Admin Catalog & Product Management Endpoints
Comprehensive CRUD for Products, Categories, Stock Inventory, and Pack Variants.
"""

from decimal import Decimal
import re
from typing import List, Optional
import uuid

from fastapi import APIRouter, Depends, HTTPException, Query, status
from pydantic import BaseModel, Field
from sqlalchemy import and_, func, or_, select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.core.database import get_db
from app.core.dependencies import require_role
from app.models.catalog import Category, Product, ProductImage, ProductVariant
from app.models.user import User

router = APIRouter()


# ---------------------------------------------------------
# Schemas
# ---------------------------------------------------------

class VariantInput(BaseModel):
    weight_label: str = Field(..., example="1 kg")
    price: Decimal = Field(..., example=199.00)
    original_price: Decimal = Field(..., example=249.00)
    stock_quantity: int = Field(default=100, example=50)
    is_default: bool = False
    sku: Optional[str] = None


class ProductCreateInput(BaseModel):
    id: Optional[str] = None  # auto-generated from name if omitted
    category_id: str
    name: str
    subtitle: Optional[str] = None
    description: str
    origin: Optional[str] = "Madhya Pradesh, India"
    tag: Optional[str] = "Pure Harvest"
    in_stock: bool = True
    is_featured: bool = False
    primary_image: Optional[str] = None
    images: List[str] = []
    variants: List[VariantInput] = []
    health_benefits: Optional[str] = None
    ingredients: Optional[str] = None
    storage_instructions: Optional[str] = None


class ProductUpdateInput(BaseModel):
    name: Optional[str] = None
    category_id: Optional[str] = None
    subtitle: Optional[str] = None
    description: Optional[str] = None
    origin: Optional[str] = None
    tag: Optional[str] = None
    in_stock: Optional[bool] = None
    is_featured: Optional[bool] = None
    primary_image: Optional[str] = None
    images: Optional[List[str]] = None
    variants: Optional[List[VariantInput]] = None
    health_benefits: Optional[str] = None
    ingredients: Optional[str] = None
    storage_instructions: Optional[str] = None


class StockUpdateInput(BaseModel):
    stock_quantity: int


class CategoryCreateInput(BaseModel):
    id: Optional[str] = None
    name: str
    slug: Optional[str] = None
    tagline: Optional[str] = None
    image_url: str
    display_order: int = 0
    is_active: bool = True


class CategoryUpdateInput(BaseModel):
    name: Optional[str] = None
    slug: Optional[str] = None
    tagline: Optional[str] = None
    image_url: Optional[str] = None
    display_order: Optional[int] = None
    is_active: Optional[bool] = None


def generate_slug(text: str) -> str:
    cleaned = re.sub(r"[^\w\s-]", "", text.lower()).strip()
    return re.sub(r"[-\s]+", "-", cleaned)


# ---------------------------------------------------------
# Products Endpoints
# ---------------------------------------------------------

@router.get("/admin/products", summary="List All Products with Inventory Filters")
async def admin_list_products(
    category_id: Optional[str] = None,
    search: Optional[str] = None,
    stock_status: Optional[str] = None,  # all, in_stock, low_stock
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=200),
    admin_user: User = Depends(require_role("admin", "vendor")),
    db: AsyncSession = Depends(get_db),
):
    """Returns paginated catalog items with stock levels, categories, and pack variant details."""
    base_filter = []
    if category_id and category_id != "ALL":
        base_filter.append(Product.category_id == category_id)

    if search:
        search_fmt = f"%{search.strip()}%"
        base_filter.append(or_(Product.name.ilike(search_fmt), Product.subtitle.ilike(search_fmt)))

    if not stock_status or stock_status == "all":
        # Direct SQL pagination: ultra-fast single round trip
        count_stmt = select(func.count(Product.id))
        if base_filter:
            count_stmt = count_stmt.where(and_(*base_filter))
        total_count = (await db.execute(count_stmt)).scalar() or 0

        paged_stmt = (
            select(Product)
            .options(
                selectinload(Product.variants),
                selectinload(Product.images),
                selectinload(Product.category),
            )
            .order_by(Product.name.asc())
            .offset(skip)
            .limit(limit)
        )
        if base_filter:
            paged_stmt = paged_stmt.where(and_(*base_filter))

        paged_res = await db.execute(paged_stmt)
        paged = paged_res.scalars().all()
    else:
        # In-memory filter when specific stock level filter is requested
        stmt = (
            select(Product)
            .options(
                selectinload(Product.variants),
                selectinload(Product.images),
                selectinload(Product.category),
            )
            .order_by(Product.name.asc())
        )
        if base_filter:
            stmt = stmt.where(and_(*base_filter))

        result = await db.execute(stmt)
        all_products = result.scalars().all()

        filtered = []
        for p in all_products:
            total_stock = sum(v.stock_quantity for v in p.variants) if p.variants else 0
            if stock_status == "low_stock" and total_stock > 10:
                continue
            if stock_status == "out_of_stock" and total_stock > 0:
                continue
            if stock_status == "in_stock" and total_stock == 0:
                continue
            filtered.append(p)

        total_count = len(filtered)
        paged = filtered[skip : skip + limit]

    data = []
    for p in paged:
        primary_img = None
        for img in p.images:
            if img.is_primary:
                primary_img = img.image_url
                break
        if not primary_img and p.images:
            primary_img = p.images[0].image_url

        default_var = None
        for v in p.variants:
            if v.is_default:
                default_var = v
                break
        if not default_var and p.variants:
            default_var = p.variants[0]

        total_stock = sum(v.stock_quantity for v in p.variants)

        data.append({
            "id": p.id,
            "name": p.name,
            "subtitle": p.subtitle,
            "category_id": p.category_id,
            "category_name": p.category.name if p.category else p.category_id,
            "origin": p.origin,
            "tag": p.tag,
            "rating": float(p.rating),
            "reviews_count": p.reviews_count,
            "in_stock": p.in_stock and total_stock > 0,
            "is_featured": p.is_featured,
            "primary_image": primary_img or "/images/products/pulse-toor-1.jpg",
            "price": float(default_var.price) if default_var else 0.0,
            "original_price": float(default_var.original_price) if default_var else 0.0,
            "total_stock": total_stock,
            "variants_count": len(p.variants),
            "variants": [
                {
                    "id": str(v.id),
                    "weight_label": v.weight_label,
                    "price": float(v.price),
                    "original_price": float(v.original_price),
                    "stock_quantity": v.stock_quantity,
                    "is_default": v.is_default,
                    "sku": v.sku,
                }
                for v in p.variants
            ],
        })

    return {
        "total": total_count,
        "items": data,
        "skip": skip,
        "limit": limit,
    }


@router.get("/admin/products/{product_id}", summary="Get Full Product Details")
async def admin_get_product(
    product_id: str,
    admin_user: User = Depends(require_role("admin", "vendor")),
    db: AsyncSession = Depends(get_db),
):
    stmt = (
        select(Product)
        .where(Product.id == product_id)
        .options(
            selectinload(Product.variants),
            selectinload(Product.images),
            selectinload(Product.category),
        )
    )
    result = await db.execute(stmt)
    p = result.scalar_one_or_none()
    if not p:
        raise HTTPException(status_code=404, detail="Product not found.")

    return {
        "id": p.id,
        "name": p.name,
        "subtitle": p.subtitle,
        "category_id": p.category_id,
        "category_name": p.category.name if p.category else p.category_id,
        "description": p.description,
        "origin": p.origin,
        "tag": p.tag,
        "rating": float(p.rating),
        "in_stock": p.in_stock,
        "is_featured": p.is_featured,
        "health_benefits": p.health_benefits,
        "ingredients": p.ingredients,
        "storage_instructions": p.storage_instructions,
        "images": [img.image_url for img in p.images],
        "variants": [
            {
                "id": str(v.id),
                "weight_label": v.weight_label,
                "price": float(v.price),
                "original_price": float(v.original_price),
                "stock_quantity": v.stock_quantity,
                "is_default": v.is_default,
                "sku": v.sku,
            }
            for v in p.variants
        ],
    }


@router.post("/admin/products", summary="Create New Product with Variants & Images")
async def admin_create_product(
    payload: ProductCreateInput,
    admin_user: User = Depends(require_role("admin", "vendor")),
    db: AsyncSession = Depends(get_db),
):
    product_id = payload.id.strip() if payload.id else f"{payload.category_id}-{generate_slug(payload.name)}"
    
    # Check duplicate
    existing = await db.execute(select(Product).where(Product.id == product_id))
    if existing.scalar_one_or_none():
        product_id = f"{product_id}-{uuid.uuid4().hex[:4]}"

    product = Product(
        id=product_id,
        category_id=payload.category_id,
        name=payload.name.strip(),
        subtitle=payload.subtitle.strip() if payload.subtitle else None,
        description=payload.description.strip(),
        origin=payload.origin.strip() if payload.origin else "Madhya Pradesh, India",
        tag=payload.tag.strip() if payload.tag else "Pure Harvest",
        in_stock=payload.in_stock,
        is_featured=payload.is_featured,
        health_benefits=payload.health_benefits,
        ingredients=payload.ingredients,
        storage_instructions=payload.storage_instructions,
    )
    db.add(product)

    # Add images
    images_to_add = payload.images or []
    if payload.primary_image and payload.primary_image not in images_to_add:
        images_to_add.insert(0, payload.primary_image)

    for idx, img_url in enumerate(images_to_add):
        db.add(ProductImage(
            id=uuid.uuid4(),
            product_id=product_id,
            image_url=img_url.strip(),
            is_primary=(idx == 0),
            display_order=idx,
        ))

    # Add variants
    if not payload.variants:
        # Default 1kg variant
        db.add(ProductVariant(
            id=uuid.uuid4(),
            product_id=product_id,
            weight_label="1 kg",
            price=Decimal("199.00"),
            original_price=Decimal("249.00"),
            stock_quantity=100,
            is_default=True,
            sku=f"SKU-{product_id[:8].upper()}-1KG",
        ))
    else:
        for idx, var in enumerate(payload.variants):
            db.add(ProductVariant(
                id=uuid.uuid4(),
                product_id=product_id,
                weight_label=var.weight_label.strip(),
                price=var.price,
                original_price=var.original_price,
                stock_quantity=var.stock_quantity,
                is_default=var.is_default or (idx == 0 and not any(v.is_default for v in payload.variants)),
                sku=var.sku or f"SKU-{product_id[:6].upper()}-{idx+1}",
            ))

    await db.commit()
    return {"success": True, "message": "Product created successfully.", "product_id": product_id}


@router.put("/admin/products/{product_id}", summary="Update Existing Product")
async def admin_update_product(
    product_id: str,
    payload: ProductUpdateInput,
    admin_user: User = Depends(require_role("admin", "vendor")),
    db: AsyncSession = Depends(get_db),
):
    stmt = (
        select(Product)
        .where(Product.id == product_id)
        .options(selectinload(Product.variants), selectinload(Product.images))
    )
    res = await db.execute(stmt)
    p = res.scalar_one_or_none()
    if not p:
        raise HTTPException(status_code=404, detail="Product not found.")

    if payload.name is not None:
        p.name = payload.name.strip()
    if payload.category_id is not None:
        p.category_id = payload.category_id.strip()
    if payload.subtitle is not None:
        p.subtitle = payload.subtitle.strip()
    if payload.description is not None:
        p.description = payload.description.strip()
    if payload.origin is not None:
        p.origin = payload.origin.strip()
    if payload.tag is not None:
        p.tag = payload.tag.strip()
    if payload.in_stock is not None:
        p.in_stock = payload.in_stock
    if payload.is_featured is not None:
        p.is_featured = payload.is_featured
    if payload.health_benefits is not None:
        p.health_benefits = payload.health_benefits
    if payload.ingredients is not None:
        p.ingredients = payload.ingredients
    if payload.storage_instructions is not None:
        p.storage_instructions = payload.storage_instructions

    # Update images if provided
    if payload.images is not None:
        for old_img in list(p.images):
            await db.delete(old_img)
        images_to_add = payload.images
        if payload.primary_image and payload.primary_image not in images_to_add:
            images_to_add.insert(0, payload.primary_image)
        for idx, img_url in enumerate(images_to_add):
            db.add(ProductImage(
                id=uuid.uuid4(),
                product_id=p.id,
                image_url=img_url.strip(),
                is_primary=(idx == 0),
                display_order=idx,
            ))

    # Update variants if provided
    if payload.variants is not None:
        for old_var in list(p.variants):
            await db.delete(old_var)
        for idx, var in enumerate(payload.variants):
            db.add(ProductVariant(
                id=uuid.uuid4(),
                product_id=p.id,
                weight_label=var.weight_label.strip(),
                price=var.price,
                original_price=var.original_price,
                stock_quantity=var.stock_quantity,
                is_default=var.is_default or (idx == 0),
                sku=var.sku or f"SKU-{p.id[:6].upper()}-{idx+1}",
            ))

    await db.commit()
    return {"success": True, "message": "Product updated successfully.", "product_id": p.id}


@router.patch("/admin/products/{product_id}/stock", summary="Quick Update Product Stock")
async def admin_quick_update_stock(
    product_id: str,
    payload: StockUpdateInput,
    admin_user: User = Depends(require_role("admin", "vendor")),
    db: AsyncSession = Depends(get_db),
):
    stmt = select(ProductVariant).where(ProductVariant.product_id == product_id)
    res = await db.execute(stmt)
    variants = res.scalars().all()
    if not variants:
        raise HTTPException(status_code=404, detail="No variants found for product.")

    for v in variants:
        v.stock_quantity = payload.stock_quantity

    await db.commit()
    return {"success": True, "message": f"Stock set to {payload.stock_quantity} units."}


@router.delete("/admin/products/{product_id}", summary="Delete Product")
async def admin_delete_product(
    product_id: str,
    admin_user: User = Depends(require_role("admin", "vendor")),
    db: AsyncSession = Depends(get_db),
):
    stmt = select(Product).where(Product.id == product_id)
    res = await db.execute(stmt)
    p = res.scalar_one_or_none()
    if not p:
        raise HTTPException(status_code=404, detail="Product not found.")

    await db.delete(p)
    await db.commit()
    return {"success": True, "message": f"Product '{p.name}' deleted successfully."}


# ---------------------------------------------------------
# Categories Endpoints
# ---------------------------------------------------------

@router.get("/admin/categories", summary="List All Categories with Crop Counts")
async def admin_list_categories(
    admin_user: User = Depends(require_role("admin", "vendor")),
    db: AsyncSession = Depends(get_db),
):
    stmt = select(Category).order_by(Category.display_order.asc())
    res = await db.execute(stmt)
    categories = res.scalars().all()

    # Get product count per category
    counts_res = await db.execute(
        select(Product.category_id, func.count(Product.id)).group_by(Product.category_id)
    )
    counts = dict(counts_res.all())

    return [
        {
            "id": c.id,
            "name": c.name,
            "slug": c.slug,
            "tagline": c.tagline,
            "image_url": c.image_url,
            "display_order": c.display_order,
            "is_active": c.is_active,
            "products_count": counts.get(c.id, 0),
        }
        for c in categories
    ]


@router.post("/admin/categories", summary="Create New Category")
async def admin_create_category(
    payload: CategoryCreateInput,
    admin_user: User = Depends(require_role("admin", "vendor")),
    db: AsyncSession = Depends(get_db),
):
    cat_id = payload.id.strip().lower() if payload.id else generate_slug(payload.name)
    slug = payload.slug.strip().lower() if payload.slug else cat_id

    existing = await db.execute(select(Category).where(Category.id == cat_id))
    if existing.scalar_one_or_none():
        raise HTTPException(status_code=400, detail=f"Category '{cat_id}' already exists.")

    category = Category(
        id=cat_id,
        name=payload.name.strip(),
        slug=slug,
        tagline=payload.tagline.strip() if payload.tagline else None,
        image_url=payload.image_url.strip(),
        display_order=payload.display_order,
        is_active=payload.is_active,
    )
    db.add(category)
    await db.commit()
    return {"success": True, "message": f"Category '{category.name}' created.", "category_id": cat_id}


@router.put("/admin/categories/{category_id}", summary="Update Category")
async def admin_update_category(
    category_id: str,
    payload: CategoryUpdateInput,
    admin_user: User = Depends(require_role("admin", "vendor")),
    db: AsyncSession = Depends(get_db),
):
    stmt = select(Category).where(Category.id == category_id)
    res = await db.execute(stmt)
    c = res.scalar_one_or_none()
    if not c:
        raise HTTPException(status_code=404, detail="Category not found.")

    if payload.name is not None:
        c.name = payload.name.strip()
    if payload.slug is not None:
        c.slug = payload.slug.strip()
    if payload.tagline is not None:
        c.tagline = payload.tagline.strip()
    if payload.image_url is not None:
        c.image_url = payload.image_url.strip()
    if payload.display_order is not None:
        c.display_order = payload.display_order
    if payload.is_active is not None:
        c.is_active = payload.is_active

    await db.commit()
    return {"success": True, "message": f"Category '{c.name}' updated."}


@router.delete("/admin/categories/{category_id}", summary="Delete Category")
async def admin_delete_category(
    category_id: str,
    admin_user: User = Depends(require_role("admin", "vendor")),
    db: AsyncSession = Depends(get_db),
):
    stmt = select(Category).where(Category.id == category_id)
    res = await db.execute(stmt)
    c = res.scalar_one_or_none()
    if not c:
        raise HTTPException(status_code=404, detail="Category not found.")

    # Check if category has products
    p_count = await db.scalar(select(func.count(Product.id)).where(Product.category_id == category_id))
    if p_count and p_count > 0:
        raise HTTPException(
            status_code=400,
            detail=f"Cannot delete category '{c.name}'. It contains {p_count} active crops. Reassign them first.",
        )

    await db.delete(c)
    await db.commit()
    return {"success": True, "message": f"Category '{c.name}' deleted."}
