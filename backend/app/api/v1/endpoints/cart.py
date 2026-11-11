"""
Shopping Cart Endpoints
Supports guest sessions and authenticated user cross-device database synchronization.
"""

from decimal import Decimal
from typing import List, Optional
import uuid
from fastapi import APIRouter, Depends, Header, HTTPException, status
from sqlalchemy import delete, select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload
from app.core.database import get_db
from app.core.dependencies import get_optional_user
from app.models.cart import CartItem
from app.models.catalog import Product, ProductVariant
from app.models.user import User
from app.schemas.cart import (
    CartStateResponse,
    CartSyncPayload,
    FrontendCartItem,
)

router = APIRouter()


@router.get("/cart", response_model=CartStateResponse, summary="Get Active Cart")
async def get_cart(
    current_user: Optional[User] = Depends(get_optional_user),
    x_session_token: Optional[str] = Header(None, alias="X-Session-Token"),
    db: AsyncSession = Depends(get_db),
):
    """
    Returns active cart items from the database for cross-device persistence.
    If the user has a guest session token, merges guest cart items into their account.
    """
    if current_user:
        # Merge any guest cart items into user account
        if x_session_token:
            guest_stmt = select(CartItem).where(CartItem.guest_session_token == x_session_token)
            guest_res = await db.execute(guest_stmt)
            guest_items = guest_res.scalars().all()
            for g_item in guest_items:
                clean_guest_w = (g_item.weight_label or "").strip().lower().replace(" ", "")
                # Check if item with same product_id and normalized weight already in user cart
                existing_stmt = select(CartItem).where(
                    CartItem.user_id == current_user.id,
                    CartItem.product_id == g_item.product_id,
                )
                existing_res = await db.execute(existing_stmt)
                user_items = existing_res.scalars().all()
                existing_match = next(
                    (u for u in user_items if (u.weight_label or "").strip().lower().replace(" ", "") == clean_guest_w),
                    None
                )
                if existing_match:
                    existing_match.quantity += g_item.quantity
                    await db.delete(g_item)
                else:
                    g_item.user_id = current_user.id
                    g_item.guest_session_token = None
            await db.commit()

        stmt = (
            select(CartItem)
            .options(
                selectinload(CartItem.product).selectinload(Product.variants),
                selectinload(CartItem.product).selectinload(Product.images),
                selectinload(CartItem.variant),
            )
            .where(CartItem.user_id == current_user.id)
        )
    elif x_session_token:
        stmt = (
            select(CartItem)
            .options(
                selectinload(CartItem.product).selectinload(Product.variants),
                selectinload(CartItem.product).selectinload(Product.images),
                selectinload(CartItem.variant),
            )
            .where(CartItem.guest_session_token == x_session_token)
        )
    else:
        return CartStateResponse(items=[], count=0, subtotal=0.0)

    result = await db.execute(stmt)
    cart_items = result.scalars().all()

    formatted_items: List[FrontendCartItem] = []
    subtotal = 0.0

    for ci in cart_items:
        p = ci.product
        if not p:
            continue

        # Find matching variant or default
        matched_v = None
        if ci.variant:
            matched_v = ci.variant
        elif ci.weight_label and p.variants:
            matched_v = next((v for v in p.variants if v.weight_label.lower() == ci.weight_label.lower()), None)
        if not matched_v and p.variants:
            matched_v = next((v for v in p.variants if v.is_default), p.variants[0])

        price = float(matched_v.price) if matched_v else 0.0
        orig_price = float(matched_v.original_price) if (matched_v and matched_v.original_price) else price
        weight = ci.weight_label or (matched_v.weight_label if matched_v else "1 kg")
        primary_img = next((img.image_url for img in p.images if img.is_primary), p.images[0].image_url if p.images else "/images/products/placeholder.jpg")

        line_id = f"{p.id}-{weight.replace(' ', '').lower()}"
        line_total = price * ci.quantity
        subtotal += line_total

        formatted_items.append(
            FrontendCartItem(
                id=line_id,
                productId=p.id,
                name=p.name,
                subtitle=p.subtitle or "",
                price=price,
                originalPrice=orig_price,
                weight=weight,
                image=primary_img,
                quantity=ci.quantity,
            )
        )

    return CartStateResponse(
        items=formatted_items,
        count=sum(item.quantity for item in formatted_items),
        subtotal=round(subtotal, 2),
    )


@router.post("/cart/sync", response_model=CartStateResponse, summary="Sync Active Cart with Database")
async def sync_cart(
    payload: CartSyncPayload,
    current_user: Optional[User] = Depends(get_optional_user),
    x_session_token: Optional[str] = Header(None, alias="X-Session-Token"),
    db: AsyncSession = Depends(get_db),
):
    """
    Saves and updates customer cart items in the database so that logging in from
    another device or browser restores their exact shopping bag.
    """
    if not current_user and not x_session_token:
        subtotal = sum(i.price * i.quantity for i in payload.items)
        return CartStateResponse(
            items=payload.items,
            count=sum(i.quantity for i in payload.items),
            subtotal=round(subtotal, 2),
        )

    # Delete existing items for user or session
    if current_user:
        await db.execute(delete(CartItem).where(CartItem.user_id == current_user.id))
    else:
        await db.execute(delete(CartItem).where(CartItem.guest_session_token == x_session_token))

    # Deduplicate payload items by (productId, normalized_weight)
    deduped_items = {}
    for item in payload.items:
        if item.quantity <= 0:
            continue
        key = (item.productId.strip().lower(), item.weight.strip().lower().replace(" ", ""))
        if key in deduped_items:
            deduped_items[key].quantity += item.quantity
        else:
            deduped_items[key] = item

    # Insert items
    for item in deduped_items.values():
        if item.quantity <= 0:
            continue

        # Look up product variant
        res_p = await db.execute(
            select(Product)
            .options(selectinload(Product.variants))
            .where(Product.id == item.productId)
        )
        p = res_p.scalar_one_or_none()
        variant_id = None
        if p and p.variants:
            v_match = next((v for v in p.variants if v.weight_label.lower() == item.weight.lower()), None)
            if not v_match:
                v_match = next((v for v in p.variants if v.is_default), p.variants[0])
            if v_match:
                variant_id = v_match.id

        ci = CartItem(
            user_id=current_user.id if current_user else None,
            guest_session_token=x_session_token if not current_user else None,
            product_id=item.productId,
            variant_id=variant_id,
            weight_label=item.weight,
            quantity=item.quantity,
        )
        db.add(ci)

    await db.commit()
    return await get_cart(current_user=current_user, x_session_token=x_session_token, db=db)


@router.post("/cart/clear", summary="Clear Database Cart")
async def clear_cart(
    current_user: Optional[User] = Depends(get_optional_user),
    x_session_token: Optional[str] = Header(None, alias="X-Session-Token"),
    db: AsyncSession = Depends(get_db),
):
    """Clears all cart items from the database."""
    if current_user:
        await db.execute(delete(CartItem).where(CartItem.user_id == current_user.id))
    elif x_session_token:
        await db.execute(delete(CartItem).where(CartItem.guest_session_token == x_session_token))

    await db.commit()
    return {"success": True, "message": "Cart cleared."}
