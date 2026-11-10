"""
Wishlist Endpoints
Supports both authenticated users and guest sessions with automatic database synchronization across devices.
"""

from typing import List, Optional
import uuid
from fastapi import APIRouter, Depends, Header, HTTPException, status
from pydantic import BaseModel
from sqlalchemy import delete, select
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.core.dependencies import get_optional_user
from app.models.cart import WishlistItem
from app.models.user import User

router = APIRouter()


class WishlistToggleRequest(BaseModel):
    product_id: str


class WishlistSyncRequest(BaseModel):
    product_ids: List[str]


class WishlistResponse(BaseModel):
    product_ids: List[str]
    count: int
    in_wishlist: Optional[bool] = None


@router.get("/wishlist", response_model=WishlistResponse, summary="Get Saved Wishlist")
async def get_wishlist(
    current_user: Optional[User] = Depends(get_optional_user),
    x_session_token: Optional[str] = Header(None, alias="X-Session-Token"),
    db: AsyncSession = Depends(get_db),
):
    """
    Returns list of saved product IDs in user's wishlist from PostgreSQL database.
    """
    if current_user:
        # If user also has guest session token, merge guest wishlist items to user account
        if x_session_token:
            guest_stmt = select(WishlistItem).where(WishlistItem.guest_session_token == x_session_token)
            guest_res = await db.execute(guest_stmt)
            guest_items = guest_res.scalars().all()
            for g_item in guest_items:
                # Check if already in user wishlist
                exists_stmt = select(WishlistItem).where(
                    WishlistItem.user_id == current_user.id,
                    WishlistItem.product_id == g_item.product_id,
                )
                exists_res = await db.execute(exists_stmt)
                if not exists_res.scalar_one_or_none():
                    g_item.user_id = current_user.id
                    g_item.guest_session_token = None
                else:
                    await db.delete(g_item)
            await db.commit()

        stmt = select(WishlistItem.product_id).where(WishlistItem.user_id == current_user.id)
    elif x_session_token:
        stmt = select(WishlistItem.product_id).where(WishlistItem.guest_session_token == x_session_token)
    else:
        return WishlistResponse(product_ids=[], count=0)

    result = await db.execute(stmt)
    product_ids = list(result.scalars().all())
    return WishlistResponse(product_ids=product_ids, count=len(product_ids))


@router.post("/wishlist/toggle", response_model=WishlistResponse, summary="Toggle Item in Wishlist")
async def toggle_wishlist_item(
    payload: WishlistToggleRequest,
    current_user: Optional[User] = Depends(get_optional_user),
    x_session_token: Optional[str] = Header(None, alias="X-Session-Token"),
    db: AsyncSession = Depends(get_db),
):
    """
    Toggles product in wishlist. If present, removes it; if absent, saves it into database.
    """
    p_id = payload.product_id.strip()
    if not p_id:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Product ID cannot be empty")

    if current_user:
        stmt = select(WishlistItem).where(
            WishlistItem.user_id == current_user.id,
            WishlistItem.product_id == p_id,
        )
    elif x_session_token:
        stmt = select(WishlistItem).where(
            WishlistItem.guest_session_token == x_session_token,
            WishlistItem.product_id == p_id,
        )
    else:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Session token or authentication required to save wishlist",
        )

    res = await db.execute(stmt)
    existing = res.scalar_one_or_none()

    if existing:
        await db.delete(existing)
        await db.commit()
        in_wishlist = False
    else:
        new_item = WishlistItem(
            id=uuid.uuid4(),
            user_id=current_user.id if current_user else None,
            guest_session_token=x_session_token if not current_user else None,
            product_id=p_id,
        )
        db.add(new_item)
        await db.commit()
        in_wishlist = True

    # Retrieve updated list
    if current_user:
        list_stmt = select(WishlistItem.product_id).where(WishlistItem.user_id == current_user.id)
    else:
        list_stmt = select(WishlistItem.product_id).where(WishlistItem.guest_session_token == x_session_token)

    list_res = await db.execute(list_stmt)
    all_ids = list(list_res.scalars().all())

    return WishlistResponse(product_ids=all_ids, count=len(all_ids), in_wishlist=in_wishlist)


@router.post("/wishlist/sync", response_model=WishlistResponse, summary="Sync Local Wishlist with DB")
async def sync_wishlist(
    payload: WishlistSyncRequest,
    current_user: Optional[User] = Depends(get_optional_user),
    x_session_token: Optional[str] = Header(None, alias="X-Session-Token"),
    db: AsyncSession = Depends(get_db),
):
    """
    Merges an array of local product IDs into the database wishlist.
    """
    if not current_user and not x_session_token:
        return WishlistResponse(product_ids=payload.product_ids, count=len(payload.product_ids))

    # Fetch existing
    if current_user:
        stmt = select(WishlistItem).where(WishlistItem.user_id == current_user.id)
    else:
        stmt = select(WishlistItem).where(WishlistItem.guest_session_token == x_session_token)

    res = await db.execute(stmt)
    existing_items = res.scalars().all()
    existing_ids = {item.product_id for item in existing_items}

    # Add missing IDs
    added = False
    for pid in payload.product_ids:
        pid_clean = pid.strip()
        if pid_clean and pid_clean not in existing_ids:
            item = WishlistItem(
                id=uuid.uuid4(),
                user_id=current_user.id if current_user else None,
                guest_session_token=x_session_token if not current_user else None,
                product_id=pid_clean,
            )
            db.add(item)
            existing_ids.add(pid_clean)
            added = True

    if added:
        await db.commit()

    return WishlistResponse(product_ids=list(existing_ids), count=len(existing_ids))


@router.delete("/wishlist", summary="Clear Wishlist")
async def clear_wishlist(
    current_user: Optional[User] = Depends(get_optional_user),
    x_session_token: Optional[str] = Header(None, alias="X-Session-Token"),
    db: AsyncSession = Depends(get_db),
):
    """
    Clears all saved wishlist items for user or session.
    """
    if current_user:
        stmt = delete(WishlistItem).where(WishlistItem.user_id == current_user.id)
    elif x_session_token:
        stmt = delete(WishlistItem).where(WishlistItem.guest_session_token == x_session_token)
    else:
        return {"cleared": True, "count": 0}

    await db.execute(stmt)
    await db.commit()
    return {"cleared": True, "count": 0}
