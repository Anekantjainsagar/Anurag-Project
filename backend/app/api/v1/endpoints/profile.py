"""
User Profile & Address Book Management Endpoints
"""

from typing import List
import uuid
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select, update
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.core.dependencies import get_current_user
from app.models.user import User, UserAddress
from app.schemas.user import (
    UserAddressCreate,
    UserAddressOut,
    UserAddressUpdate,
    UserOut,
    UserUpdate,
)

router = APIRouter()


@router.get("/profile", response_model=UserOut, summary="Get Profile Details")
async def get_profile(current_user: User = Depends(get_current_user)):
    return current_user


@router.put("/profile", response_model=UserOut, summary="Update Profile")
async def update_profile(
    payload: UserUpdate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    update_data = payload.model_dump(exclude_unset=True)
    for field, val in update_data.items():
        setattr(current_user, field, val)

    await db.commit()
    await db.refresh(current_user)
    return current_user


# Address Book Endpoints
@router.get("/profile/addresses", response_model=List[UserAddressOut], summary="List Saved Addresses")
async def list_addresses(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(UserAddress)
        .where(UserAddress.user_id == current_user.id)
        .order_by(UserAddress.is_default_shipping.desc(), UserAddress.created_at.desc())
    )
    return result.scalars().all()


@router.post("/profile/addresses", response_model=UserAddressOut, summary="Add Delivery Address")
async def add_address(
    payload: UserAddressCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    if payload.is_default_shipping:
        # Clear previous default
        await db.execute(
            update(UserAddress)
            .where(UserAddress.user_id == current_user.id)
            .values(is_default_shipping=False)
        )

    new_addr = UserAddress(
        user_id=current_user.id,
        **payload.model_dump(),
    )
    db.add(new_addr)
    await db.commit()
    await db.refresh(new_addr)
    return new_addr


@router.put("/profile/addresses/{address_id}", response_model=UserAddressOut, summary="Update Address")
async def update_address(
    address_id: uuid.UUID,
    payload: UserAddressUpdate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(UserAddress).where(UserAddress.id == address_id, UserAddress.user_id == current_user.id)
    )
    addr = result.scalar_one_or_none()
    if not addr:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Address not found.")

    update_data = payload.model_dump(exclude_unset=True)
    if update_data.get("is_default_shipping"):
        await db.execute(
            update(UserAddress)
            .where(UserAddress.user_id == current_user.id)
            .values(is_default_shipping=False)
        )

    for field, val in update_data.items():
        setattr(addr, field, val)

    await db.commit()
    await db.refresh(addr)
    return addr


@router.delete("/profile/addresses/{address_id}", summary="Delete Address")
async def delete_address(
    address_id: uuid.UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(UserAddress).where(UserAddress.id == address_id, UserAddress.user_id == current_user.id)
    )
    addr = result.scalar_one_or_none()
    if not addr:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Address not found.")

    await db.delete(addr)
    await db.commit()
    return {"success": True, "message": "Address deleted successfully."}
