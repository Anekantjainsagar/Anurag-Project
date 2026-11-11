"""
Admin Dashboard Overview & Analytics
Executive KPI Intelligence, Revenue Trends, Order Status Distributions & Performance Analytics
"""

from datetime import datetime, timedelta, timezone
from decimal import Decimal
from fastapi import APIRouter, Depends
from sqlalchemy import func, select, text
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
    # 1. Combined single-roundtrip executive KPI scalar query
    kpi_query = text("""
        SELECT
            COALESCE((SELECT SUM(total_amount) FROM orders WHERE order_status != 'CANCELLED'), 0) AS total_revenue,
            (SELECT COUNT(*) FROM orders) AS total_orders,
            (SELECT COUNT(*) FROM orders WHERE order_status = 'PENDING_VERIFICATION') AS pending_cod,
            (SELECT COUNT(*) FROM products WHERE is_active = TRUE) AS total_products,
            (SELECT COUNT(*) FROM product_variants WHERE stock_quantity <= 10) AS low_stock,
            (SELECT COUNT(*) FROM users WHERE role = 'customer') AS total_customers,
            COALESCE((
                SELECT SUM(order_items.quantity)
                FROM order_items
                JOIN orders ON orders.id = order_items.order_id
                WHERE orders.order_status != 'CANCELLED'
            ), 0) AS total_items_sold,
            (SELECT COUNT(*) FROM orders WHERE order_status != 'CANCELLED') AS valid_orders_count;
    """)
    kpi_res = await db.execute(kpi_query)
    kpi_row = kpi_res.one()

    total_revenue = Decimal(str(kpi_row[0] or 0))
    total_orders = int(kpi_row[1] or 0)
    pending_cod = int(kpi_row[2] or 0)
    total_products = int(kpi_row[3] or 0)
    low_stock_count = int(kpi_row[4] or 0)
    total_customers = int(kpi_row[5] or 0)
    total_items_sold = int(kpi_row[6] or 0)
    valid_orders_count = int(kpi_row[7] or 0)

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

    # 10. 7-Day Revenue Trend (single-query aggregation)
    now = datetime.now(timezone.utc)
    seven_days_ago = (now - timedelta(days=6)).replace(hour=0, minute=0, second=0, microsecond=0)
    recent_orders_res = await db.execute(
        select(Order.created_at, Order.total_amount).where(
            Order.created_at >= seven_days_ago,
            Order.order_status != "CANCELLED",
        )
    )
    recent_rows = recent_orders_res.all()

    revenue_trend_7d = []
    for i in range(6, -1, -1):
        day_start = (now - timedelta(days=i)).replace(hour=0, minute=0, second=0, microsecond=0)
        day_end = day_start + timedelta(days=1)
        day_orders = [
            r for r in recent_rows
            if r[0] and (r[0].replace(tzinfo=timezone.utc) if not r[0].tzinfo else r[0]) >= day_start
            and (r[0].replace(tzinfo=timezone.utc) if not r[0].tzinfo else r[0]) < day_end
        ]
        rev = sum((float(r[1]) for r in day_orders), 0.0)
        revenue_trend_7d.append({
            "date": day_start.strftime("%Y-%m-%d"),
            "label": day_start.strftime("%d %b"),
            "day": day_start.strftime("%a"),
            "revenue": round(rev, 2),
            "orders": len(day_orders),
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
