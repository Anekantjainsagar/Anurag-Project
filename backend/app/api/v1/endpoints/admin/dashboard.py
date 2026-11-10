"""
Admin Dashboard Overview & Analytics
Executive KPI Intelligence, Revenue Trends, Order Status Distributions & Performance Analytics
"""

from datetime import datetime, timedelta, timezone
from decimal import Decimal
from fastapi import APIRouter, Depends
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.core.dependencies import require_role
from app.models.catalog import Category, Product, ProductVariant
from app.models.order import Order, OrderItem
from app.models.user import User

router = APIRouter()


@router.get("/admin/dashboard", summary="Admin Dashboard KPI Metrics & Intelligence")
async def get_dashboard_metrics(
    admin_user: User = Depends(require_role("admin", "vendor")),
    db: AsyncSession = Depends(get_db),
):
    """
    Returns rich business intelligence:
    - Executive KPIs (Total revenue, orders, AOV, active products, customer count)
    - 7-Day & 14-Day Revenue timeline graphs
    - Order status distribution
    - Catalog distribution by category
    - Top performing organic crops
    - Recent order intelligence ledger
    """
    # 1. Total revenue (excluding cancelled)
    rev_res = await db.execute(
        select(func.coalesce(func.sum(Order.total_amount), Decimal("0.00")))
        .where(Order.order_status != "CANCELLED")
    )
    total_revenue = rev_res.scalar() or Decimal("0.00")

    # 2. Total orders count
    orders_count_res = await db.execute(select(func.count(Order.id)))
    total_orders = orders_count_res.scalar() or 0

    # 3. Pending COD orders requiring vendor verification
    pending_cod_res = await db.execute(
        select(func.count(Order.id)).where(Order.order_status == "PENDING_VERIFICATION")
    )
    pending_cod = pending_cod_res.scalar() or 0

    # 4. Total active products
    prod_count_res = await db.execute(select(func.count(Product.id)).where(Product.is_active.is_(True)))
    total_products = prod_count_res.scalar() or 0

    # 5. Low stock variants (< 10 units)
    low_stock_res = await db.execute(
        select(func.count(ProductVariant.id)).where(ProductVariant.stock_quantity <= 10)
    )
    low_stock_count = low_stock_res.scalar() or 0

    # 6. Total registered customers
    cust_count_res = await db.execute(select(func.count(User.id)).where(User.role == "customer"))
    total_customers = cust_count_res.scalar() or 0

    # 7. Total items sold across all non-cancelled orders
    items_sold_res = await db.execute(
        select(func.coalesce(func.sum(OrderItem.quantity), 0))
        .join(Order, Order.id == OrderItem.order_id)
        .where(Order.order_status != "CANCELLED")
    )
    total_items_sold = int(items_sold_res.scalar() or 0)

    # 8. Average Order Value (AOV)
    valid_orders_count_res = await db.execute(
        select(func.count(Order.id)).where(Order.order_status != "CANCELLED")
    )
    valid_orders_count = valid_orders_count_res.scalar() or 0
    avg_order_value = (
        float(total_revenue) / valid_orders_count if valid_orders_count > 0 else 0.0
    )

    # 9. Order Status Breakdown
    status_query_res = await db.execute(
        select(
            Order.order_status,
            func.count(Order.id),
            func.coalesce(func.sum(Order.total_amount), Decimal("0.00")),
        ).group_by(Order.order_status)
    )
    status_counts_map = {row[0]: {"count": row[1], "amount": float(row[2])} for row in status_query_res.all()}

    ALL_STATUSES = [
        {"key": "PENDING_VERIFICATION", "label": "Pending Verification", "color": "#f59e0b"},
        {"key": "CONFIRMED", "label": "Confirmed / Processing", "color": "#3b82f6"},
        {"key": "PACKED", "label": "Farm Packed", "color": "#8b5cf6"},
        {"key": "DISPATCHED", "label": "Dispatched via Courier", "color": "#06b6d4"},
        {"key": "DELIVERED", "label": "Delivered to Doorstep", "color": "#10b981"},
        {"key": "CANCELLED", "label": "Cancelled / Voided", "color": "#ef4444"},
    ]
    status_distribution = [
        {
            "status": s["key"],
            "label": s["label"],
            "color": s["color"],
            "count": status_counts_map.get(s["key"], {}).get("count", 0),
            "amount": status_counts_map.get(s["key"], {}).get("amount", 0.0),
        }
        for s in ALL_STATUSES
    ]

    # Fulfillment success rate: (Delivered + Dispatched) / valid_orders * 100
    fulfilled_count = (
        status_counts_map.get("DELIVERED", {}).get("count", 0)
        + status_counts_map.get("DISPATCHED", {}).get("count", 0)
    )
    fulfillment_rate = (
        round((fulfilled_count / valid_orders_count) * 100, 1) if valid_orders_count > 0 else 100.0
    )

    # 10. 7-Day Revenue Trend (daily buckets)
    now = datetime.now(timezone.utc)
    revenue_trend_7d = []
    for i in range(6, -1, -1):
        day_start = (now - timedelta(days=i)).replace(hour=0, minute=0, second=0, microsecond=0)
        day_end = day_start + timedelta(days=1)
        day_res = await db.execute(
            select(
                func.coalesce(func.sum(Order.total_amount), Decimal("0.00")),
                func.count(Order.id),
            ).where(
                Order.created_at >= day_start,
                Order.created_at < day_end,
                Order.order_status != "CANCELLED",
            )
        )
        rev, cnt = day_res.one()
        revenue_trend_7d.append({
            "date": day_start.strftime("%Y-%m-%d"),
            "label": day_start.strftime("%d %b"),
            "day": day_start.strftime("%a"),
            "revenue": float(rev or 0),
            "orders": cnt or 0,
        })

    # 11. Category Breakdown (products count & catalog share)
    cat_res = await db.execute(
        select(Category.name, func.count(Product.id))
        .join(Product, Product.category_id == Category.id, isouter=True)
        .group_by(Category.name)
        .order_by(func.count(Product.id).desc())
    )
    category_distribution = [
        {
            "category": row[0],
            "products_count": row[1],
            "percentage": round((row[1] / total_products * 100), 1) if total_products > 0 else 0,
        }
        for row in cat_res.all()
    ]

    # 12. Top Performing Organic Crops
    top_items_res = await db.execute(
        select(
            OrderItem.product_name,
            func.sum(OrderItem.quantity).label("units_sold"),
            func.sum(OrderItem.line_total).label("total_sales"),
        )
        .group_by(OrderItem.product_name)
        .order_by(func.sum(OrderItem.line_total).desc())
        .limit(6)
    )
    top_products = [
        {
            "name": row[0],
            "units_sold": int(row[1] or 0),
            "revenue": float(row[2] or 0),
        }
        for row in top_items_res.all()
    ]

    # 13. Recent Orders Activity
    recent_orders_res = await db.execute(
        select(Order).order_by(Order.created_at.desc()).limit(6)
    )
    recent_orders = [
        {
            "id": str(o.id),
            "order_number": o.order_number,
            "customer_name": o.customer_name,
            "customer_phone": o.customer_phone,
            "total_amount": float(o.total_amount),
            "order_status": o.order_status,
            "payment_method": o.payment_method,
            "created_at": o.created_at.isoformat() if o.created_at else None,
        }
        for o in recent_orders_res.scalars().all()
    ]

    return {
        "total_revenue": float(total_revenue),
        "total_orders": total_orders,
        "pending_cod_verifications": pending_cod,
        "total_active_products": total_products,
        "low_stock_alerts": low_stock_count,
        "total_customers": total_customers,
        "metrics": {
            "total_revenue": float(total_revenue),
            "total_orders": total_orders,
            "pending_fulfillment": pending_cod,
            "registered_customers": total_customers,
            "total_products": total_products,
            "avg_order_value": round(avg_order_value, 2),
            "fulfillment_rate": fulfillment_rate,
            "total_items_sold": total_items_sold,
        },
        "revenue_trend_7d": revenue_trend_7d,
        "order_status_distribution": status_distribution,
        "category_distribution": category_distribution,
        "top_products": top_products,
        "recent_orders": recent_orders,
    }
