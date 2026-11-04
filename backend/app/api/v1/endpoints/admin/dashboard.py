"""
Admin Dashboard Overview & Analytics
"""

from decimal import Decimal
from fastapi import APIRouter, Depends
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.core.dependencies import require_role
from app.models.catalog import Product, ProductVariant
from app.models.order import Order
from app.models.user import User

router = APIRouter()


@router.get("/admin/dashboard", summary="Admin Dashboard KPI Metrics")
async def get_dashboard_metrics(
    admin_user: User = Depends(require_role("admin", "vendor")),
    db: AsyncSession = Depends(get_db),
):
    """
    Returns high-level business intelligence:
    - Total sales volume
    - Orders by status (pending COD verification, confirmed, dispatched)
    - Low-stock inventory alerts
    - Customer count
    """
    # Total revenue
    rev_res = await db.execute(
        select(func.coalesce(func.sum(Order.total_amount), Decimal("0.00")))
        .where(Order.order_status != "CANCELLED")
    )
    total_revenue = rev_res.scalar()

    # Total orders
    orders_count_res = await db.execute(select(func.count(Order.id)))
    total_orders = orders_count_res.scalar()

    # Pending COD orders requiring vendor verification
    pending_cod_res = await db.execute(
        select(func.count(Order.id)).where(Order.order_status == "PENDING_VERIFICATION")
    )
    pending_cod = pending_cod_res.scalar()

    # Total active products
    prod_count_res = await db.execute(select(func.count(Product.id)).where(Product.is_active.is_(True)))
    total_products = prod_count_res.scalar()

    # Low stock variants (< 10 units)
    low_stock_res = await db.execute(
        select(func.count(ProductVariant.id)).where(ProductVariant.stock_quantity <= 10)
    )
    low_stock_count = low_stock_res.scalar()

    # Total customers
    cust_count_res = await db.execute(select(func.count(User.id)).where(User.role == "customer"))
    total_customers = cust_count_res.scalar()

    return {
        "total_revenue": total_revenue,
        "total_orders": total_orders,
        "pending_cod_verifications": pending_cod,
        "total_active_products": total_products,
        "low_stock_alerts": low_stock_count,
        "total_customers": total_customers,
    }
