"""
Shopping Cart Endpoints
Supports guest cookie tokens and automatic cart merging upon sign-in.
"""

from decimal import Decimal
from typing import Optional
import uuid
from fastapi import APIRouter, Depends, Header, HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload
from app.core.database import get_db
from app.core.dependencies import get_optional_user
from app.models.cart import CartItem
from app.models.catalog import Product, ProductVariant
from app.models.user import User
from app.schemas.cart import CartItemCreate, CartItemOut, CartItemUpdate, CartSummaryOut
from app.schemas.catalog import ProductListOut

router = APIRouter()


@router.get("/cart", response_model=CartSummaryOut, summary="Get Active Cart")
async def get_cart(
    current_user: Optional[User] = Depends(get_optional_user),
    x_session_token: Optional[str] = Header(None, alias="X-Session-Token"),
    db: AsyncSession = Depends(get_db),
):
    """
    Returns active cart items with subtotal and delivery threshold calculations.
    """
    stmt = (
        select(CartItem)
        .options(
            selectinload(CartItem.product).selectinload(Product.variants),
            selectinload(CartItem.product).selectinload(Product.images),
            selectinload(CartItem.variant),
        )
    )

    if current_user:
        stmt = stmt.where(CartItem.user_id == current_user.id)
    elif x_session_token:
        stmt = stmt.where(CartItem.guest_session_token == x_session_token)
    else:
        return CartSummaryOut(
            items=[],
            item_count=0,
            subtotal=Decimal("0.00"),
            shipping_fee=Decimal("0.00"),
            discount_amount=Decimal("0.00"),
            total_amount=Decimal("0.00"),
            free_shipping_eligible=False,
        )

    result = await db.execute(stmt)
    cart_items = result.scalars().all()

    subtotal = Decimal("0.00")
    formatted_items = []

    for ci in cart_items:
        p = ci.product
        v = ci.variant
        line_total = v.price * ci.quantity
        subtotal += line_total

        default_variant = next((vr for vr in p.variants if vr.is_default), p.variants[0] if p.variants else None)
        primary_img = next((img.image_url for img in p.images if img.is_primary), p.images[0].image_url if p.images else None)

        p_out = ProductListOut(
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
            variants=p.variants,
        )

        formatted_items.append(
            CartItemOut(
                id=ci.id,
                product_id=ci.product_id,
                variant_id=ci.variant_id,
                quantity=ci.quantity,
                product=p_out,
                variant=ci.variant,
                line_total=line_total,
            )
        )

    free_shipping = subtotal >= Decimal("499.00") or subtotal == Decimal("0.00")
    shipping_fee = Decimal("0.00") if free_shipping else Decimal("60.00")
    total_amount = subtotal + shipping_fee

    return CartSummaryOut(
        items=formatted_items,
        item_count=sum(ci.quantity for ci in cart_items),
        subtotal=subtotal,
        shipping_fee=shipping_fee,
        discount_amount=Decimal("0.00"),
        total_amount=total_amount,
        free_shipping_eligible=free_shipping,
    )


@router.post("/cart/items", summary="Add Item to Cart")
async def add_to_cart(
    payload: CartItemCreate,
    current_user: Optional[User] = Depends(get_optional_user),
    x_session_token: Optional[str] = Header(None, alias="X-Session-Token"),
    db: AsyncSession = Depends(get_db),
):
    if not current_user and not x_session_token:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Session token (X-Session-Token) or authentication required.",
        )

    # Check variant existence
    res_v = await db.execute(select(ProductVariant).where(ProductVariant.id == payload.variant_id))
    variant = res_v.scalar_one_or_none()
    if not variant:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Variant not found.")

    # Check if line item already exists
    stmt = select(CartItem).where(
        CartItem.product_id == payload.product_id,
        CartItem.variant_id == payload.variant_id,
    )
    if current_user:
        stmt = stmt.where(CartItem.user_id == current_user.id)
    else:
        stmt = stmt.where(CartItem.guest_session_token == x_session_token)

    result = await db.execute(stmt)
    existing_item = result.scalar_one_or_none()

    if existing_item:
        existing_item.quantity += payload.quantity
    else:
        new_item = CartItem(
            user_id=current_user.id if current_user else None,
            guest_session_token=x_session_token if not current_user else None,
            product_id=payload.product_id,
            variant_id=payload.variant_id,
            quantity=payload.quantity,
        )
        db.add(new_item)

    await db.commit()
    return {"success": True, "message": "Item added to cart."}


@router.delete("/cart/items/{item_id}", summary="Remove Item from Cart")
async def remove_cart_item(
    item_id: uuid.UUID,
    current_user: Optional[User] = Depends(get_optional_user),
    x_session_token: Optional[str] = Header(None, alias="X-Session-Token"),
    db: AsyncSession = Depends(get_db),
):
    stmt = select(CartItem).where(CartItem.id == item_id)
    if current_user:
        stmt = stmt.where(CartItem.user_id == current_user.id)
    else:
        stmt = stmt.where(CartItem.guest_session_token == x_session_token)

    result = await db.execute(stmt)
    item = result.scalar_one_or_none()
    if not item:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Cart item not found.")

    await db.delete(item)
    await db.commit()
    return {"success": True, "message": "Item removed from cart."}

