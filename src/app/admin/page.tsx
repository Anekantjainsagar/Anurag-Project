"use client";

import React, { useState, useEffect } from "react";
import { api } from "@/services/apiClient";
import {
  TrendingUp,
  Package,
  Truck,
  Users,
  DollarSign,
  CheckCircle2,
  Clock,
  AlertTriangle,
  RefreshCw,
  ShoppingBag,
  Layers,
  ArrowUpRight,
  ShieldCheck,
  Calendar,
} from "lucide-react";

export default function AdminDashboardPage() {
  const [dashboardData, setDashboardData] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeChartMetric, setActiveChartMetric] = useState<"revenue" | "orders">("revenue");
  const [hoveredPoint, setHoveredPoint] = useState<any | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const data = await api.admin.getDashboard().catch(() => null);
      setDashboardData(data);
    } finally {
      setIsLoading(false);
    }
  };

  const metrics = dashboardData?.metrics || {};
  const revenueTrend = dashboardData?.revenue_trend_7d || [];
  const statusDist = dashboardData?.order_status_distribution || [];
  const categoryDist = dashboardData?.category_distribution || [];
  const topProducts = dashboardData?.top_products || [];
  const recentOrders = dashboardData?.recent_orders || [];

  // Chart Calculations
  const chartValues = revenueTrend.map((d: any) =>
    activeChartMetric === "revenue" ? d.revenue : d.orders
  );
  const maxChartVal = Math.max(...chartValues, activeChartMetric === "revenue" ? 1000 : 5);
  const chartHeight = 180;
  const chartWidth = 600;
  const stepX = revenueTrend.length > 1 ? chartWidth / (revenueTrend.length - 1) : 0;

  const points = revenueTrend.map((d: any, idx: number) => {
    const val = activeChartMetric === "revenue" ? d.revenue : d.orders;
    const x = idx * stepX;
    const y = chartHeight - (val / (maxChartVal || 1)) * (chartHeight - 30) - 15;
    return { x, y, ...d };
  });

  const svgPath = points.length > 0
    ? points.reduce(
        (acc: string, pt: any, idx: number) =>
          idx === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`,
        ""
      )
    : "";

  const areaPath = points.length > 0
    ? `${svgPath} L ${points[points.length - 1].x} ${chartHeight} L ${points[0].x} ${chartHeight} Z`
    : "";

  const totalOrdersInStatus = statusDist.reduce((acc: number, curr: any) => acc + curr.count, 0);

  return (
    <div className="space-y-6 font-sans">
      {/* 1. Primary KPI Number Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        {/* Metric 1 */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="font-semibold">Total Revenue</span>
            <span className="p-1 rounded-lg bg-emerald-50 text-emerald-700">
              <DollarSign className="w-3.5 h-3.5" />
            </span>
          </div>
          <div className="text-xl sm:text-2xl font-bold font-serif text-slate-900 mt-1">
            ₹{Number(metrics?.total_revenue || 0).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
          </div>
          <div className="text-[11px] text-emerald-700 font-semibold mt-1 flex items-center gap-1">
            <ArrowUpRight className="w-3 h-3" />
            <span>Direct GMV</span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="font-semibold">Total Orders</span>
            <span className="p-1 rounded-lg bg-blue-50 text-blue-700">
              <ShoppingBag className="w-3.5 h-3.5" />
            </span>
          </div>
          <div className="text-xl sm:text-2xl font-bold font-serif text-slate-900 mt-1">
            {metrics?.total_orders ?? 0}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            {metrics?.pending_fulfillment ?? 0} awaiting dispatch
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="font-semibold">Avg Order Value</span>
            <span className="p-1 rounded-lg bg-amber-50 text-amber-700">
              <TrendingUp className="w-3.5 h-3.5" />
            </span>
          </div>
          <div className="text-xl sm:text-2xl font-bold font-serif text-slate-900 mt-1">
            ₹{Number(metrics?.avg_order_value || 0).toFixed(2)}
          </div>
          <div className="text-[11px] text-amber-800 font-medium mt-1">
            Per verified order
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="font-semibold">Fulfillment Rate</span>
            <span className="p-1 rounded-lg bg-emerald-50 text-emerald-700">
              <Truck className="w-3.5 h-3.5" />
            </span>
          </div>
          <div className="text-xl sm:text-2xl font-bold font-serif text-slate-900 mt-1">
            {metrics?.fulfillment_rate ?? 100}%
          </div>
          <div className="text-[11px] text-emerald-700 font-medium mt-1">
            Dispatched & Delivered
          </div>
        </div>

        {/* Metric 5 */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="font-semibold">Active Catalog</span>
            <span className="p-1 rounded-lg bg-purple-50 text-purple-700">
              <Layers className="w-3.5 h-3.5" />
            </span>
          </div>
          <div className="text-xl sm:text-2xl font-bold font-serif text-slate-900 mt-1">
            {metrics?.total_products ?? 192}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Across 8 Categories
          </div>
        </div>

        {/* Metric 6 */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="font-semibold">Customers</span>
            <span className="p-1 rounded-lg bg-cyan-50 text-cyan-700">
              <Users className="w-3.5 h-3.5" />
            </span>
          </div>
          <div className="text-xl sm:text-2xl font-bold font-serif text-slate-900 mt-1">
            {metrics?.registered_customers ?? 1}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Direct supporters
          </div>
        </div>
      </div>

      {/* 3. Primary Graphs Grid: 7-Day Revenue Velocity + Order Status Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: 7-Day Revenue Velocity Graph (2 Columns) */}
        <div className="lg:col-span-2 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
                <h3 className="font-serif font-bold text-base text-slate-900">
                  Sales Velocity & Revenue Timeline
                </h3>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Daily verified revenue recorded across the last 7 calendar days
              </p>
            </div>

            {/* Metric Toggle */}
            <div className="inline-flex items-center bg-slate-100 p-1 rounded-xl text-xs font-semibold">
              <button
                onClick={() => setActiveChartMetric("revenue")}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                  activeChartMetric === "revenue"
                    ? "bg-white text-emerald-800 font-bold shadow-2xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Revenue (₹)
              </button>
              <button
                onClick={() => setActiveChartMetric("orders")}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                  activeChartMetric === "orders"
                    ? "bg-white text-emerald-800 font-bold shadow-2xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Orders Count
              </button>
            </div>
          </div>

          {/* SVG Area Chart */}
          <div className="relative pt-6 pb-2">
            <svg
              viewBox={`0 0 ${chartWidth} ${chartHeight}`}
              className="w-full h-44 sm:h-52 overflow-visible"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#01722C" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#01722C" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              {[0, 0.25, 0.5, 0.75, 1].map((pct, i) => {
                const y = chartHeight * (1 - pct);
                return (
                  <line
                    key={i}
                    x1="0"
                    y1={y}
                    x2={chartWidth}
                    y2={y}
                    stroke="#f1f5f9"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                  />
                );
              })}

              {/* Area Fill */}
              {areaPath && (
                <path d={areaPath} fill="url(#revenueGradient)" />
              )}

              {/* Line */}
              {svgPath && (
                <path
                  d={svgPath}
                  fill="none"
                  stroke="#01722C"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}

              {/* Data Points */}
              {points.map((pt: any, idx: number) => {
                const isHovered = hoveredPoint?.date === pt.date;
                return (
                  <g key={idx}>
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r={isHovered ? 6 : 4}
                      fill="#ffffff"
                      stroke="#01722C"
                      strokeWidth={isHovered ? 3 : 2}
                      className="transition-all duration-150 cursor-pointer"
                      onMouseEnter={() => setHoveredPoint(pt)}
                      onMouseLeave={() => setHoveredPoint(null)}
                    />
                  </g>
                );
              })}
            </svg>

            {/* Tooltip Overlay */}
            {hoveredPoint && (
              <div
                className="absolute z-10 bg-slate-900 text-white text-[11px] py-1.5 px-2.5 rounded-lg shadow-xl pointer-events-none transition-all transform -translate-x-1/2 -translate-y-full"
                style={{
                  left: `${((revenueTrend.findIndex((d: any) => d.date === hoveredPoint.date) || 0) / (revenueTrend.length - 1 || 1)) * 100}%`,
                  top: "20%",
                }}
              >
                <div className="font-bold text-emerald-400">{hoveredPoint.label} ({hoveredPoint.day})</div>
                <div>₹{Number(hoveredPoint.revenue).toFixed(2)} • {hoveredPoint.orders} order(s)</div>
              </div>
            )}

            {/* X-Axis Labels */}
            <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono mt-3 px-1">
              {revenueTrend.map((d: any, idx: number) => (
                <div key={idx} className="text-center">
                  <span className="block font-medium text-slate-600">{d.label}</span>
                  <span className="text-[10px] text-slate-400">{d.day}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Summary Pill Bar */}
          <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-2 rounded-xl bg-slate-50">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block">7-Day Total</span>
              <strong className="text-slate-900 font-serif">
                ₹{revenueTrend.reduce((acc: number, curr: any) => acc + curr.revenue, 0).toFixed(2)}
              </strong>
            </div>
            <div className="p-2 rounded-xl bg-slate-50">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Orders Processed</span>
              <strong className="text-slate-900 font-serif">
                {revenueTrend.reduce((acc: number, curr: any) => acc + curr.orders, 0)} orders
              </strong>
            </div>
            <div className="p-2 rounded-xl bg-slate-50">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Peak Velocity Day</span>
              <strong className="text-emerald-700 font-serif font-bold">
                {revenueTrend.reduce((max: any, curr: any) => (curr.revenue > (max?.revenue || 0) ? curr : max), revenueTrend[0])?.label || "10 Nov"}
              </strong>
            </div>
          </div>
        </div>

        {/* Right: Order Status Distribution (1 Column) */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-serif font-bold text-base text-slate-900">
                Order Lifecycle Distribution
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-mono">
                {totalOrdersInStatus} Recorded
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-2">
              Breakdown of customer orders across fulfillment stages
            </p>

            {/* Horizontal Stacked Progress Bar */}
            <div className="h-3 w-full rounded-full overflow-hidden bg-slate-100 flex mt-4 shadow-2xs">
              {statusDist.map((s: any, idx: number) => {
                const pct = totalOrdersInStatus > 0 ? (s.count / totalOrdersInStatus) * 100 : 0;
                if (pct === 0) return null;
                return (
                  <div
                    key={idx}
                    style={{ width: `${pct}%`, backgroundColor: s.color }}
                    title={`${s.label}: ${s.count} orders (${pct.toFixed(0)}%)`}
                    className="h-full transition-all duration-300"
                  />
                );
              })}
            </div>

            {/* Status Legend & Counts */}
            <div className="space-y-2.5 mt-5">
              {statusDist.map((s: any, idx: number) => {
                const pct = totalOrdersInStatus > 0 ? (s.count / totalOrdersInStatus) * 100 : 0;
                return (
                  <div
                    key={idx}
                    className="flex items-center justify-between text-xs p-2 rounded-xl hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: s.color }}
                      ></span>
                      <span className="font-medium text-slate-700">{s.label}</span>
                    </div>

                    <div className="flex items-center gap-3 font-mono">
                      <span className="text-[11px] text-slate-400">{pct.toFixed(0)}%</span>
                      <span className="font-bold text-slate-900 px-2 py-0.5 rounded bg-slate-100 text-[11px]">
                        {s.count}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-400 flex items-center justify-between">
            <span>Fulfillment Pipeline</span>
            <span className="font-bold text-emerald-700">100% Operational</span>
          </div>
        </div>
      </div>

      {/* 4. Lower Insights Section: Top Selling Crops & Catalog Category Share */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Top Performing Organic Crops */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-serif font-bold text-base text-slate-900">
                Top Performing Harvest Crops
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Highest grossing products by unit volume and total order value
              </p>
            </div>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              Verified Revenue
            </span>
          </div>

          <div className="divide-y divide-slate-100 mt-2">
            {topProducts.length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-400">
                No orders recorded yet. Top crops will populate upon verified checkout.
              </div>
            ) : (
              topProducts.map((p: any, idx: number) => (
                <div key={idx} className="py-3 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-[11px] shrink-0 font-mono">
                      #{idx + 1}
                    </span>
                    <div>
                      <div className="font-bold text-slate-900">{p.name}</div>
                      <div className="text-[11px] text-slate-400 font-mono">
                        {p.units_sold} unit{p.units_sold > 1 ? "s" : ""} fulfilled
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-bold font-serif text-slate-900 text-sm">
                      ₹{Number(p.revenue).toFixed(2)}
                    </div>
                    <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded">
                      Top Performer
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right: Organic Catalog Category Share */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-serif font-bold text-base text-slate-900">
                Storefront Catalog Distribution
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Crop distribution across all 8 certified organic categories
              </p>
            </div>
            <span className="text-xs font-bold text-purple-800 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-200">
              192 Items
            </span>
          </div>

          <div className="space-y-3 mt-4">
            {categoryDist.slice(0, 6).map((cat: any, idx: number) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-slate-700">{cat.category}</span>
                  <span className="font-mono text-slate-500 font-bold text-[11px]">
                    {cat.products_count} items ({cat.percentage}%)
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full bg-[#01722C] rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(cat.percentage * 2, 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 5. Live Recent Orders Intelligence Ledger */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="font-serif font-bold text-base text-slate-900">
              Recent Order Ledger & Status Activity
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Live transactional feed of the latest orders captured in the farm ledger
            </p>
          </div>
          <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-full">
            Recent Transactions
          </span>
        </div>

        <div className="overflow-x-auto mt-2">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-3">Order Number</th>
                <th className="py-3 px-3">Customer</th>
                <th className="py-3 px-3">Total Amount</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3">Payment Mode</th>
                <th className="py-3 px-3 text-right">Recorded Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-sans">
              {recentOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-xs text-slate-400">
                    No orders recorded yet.
                  </td>
                </tr>
              ) : (
                recentOrders.map((o: any) => (
                  <tr key={o.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-3 font-mono font-bold text-slate-900">
                      {o.order_number}
                    </td>
                    <td className="py-3 px-3 font-medium text-slate-800">
                      {o.customer_name}
                      <span className="block text-[11px] text-slate-400 font-mono">{o.customer_phone}</span>
                    </td>
                    <td className="py-3 px-3 font-serif font-bold text-slate-900 text-sm">
                      ₹{Number(o.total_amount).toFixed(2)}
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                          o.order_status === "DELIVERED"
                            ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                            : o.order_status === "DISPATCHED"
                            ? "bg-cyan-50 text-cyan-800 border border-cyan-200"
                            : o.order_status === "PENDING_VERIFICATION"
                            ? "bg-amber-50 text-amber-800 border border-amber-200"
                            : o.order_status === "CANCELLED"
                            ? "bg-rose-50 text-rose-800 border border-rose-200"
                            : "bg-blue-50 text-blue-800 border border-blue-200"
                        }`}
                      >
                        {o.order_status.replace(/_/g, " ")}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-mono text-[11px] text-slate-600">
                      {o.payment_method === "COD_VENDOR_CONTACT" ? "Cash on Delivery" : o.payment_method}
                    </td>
                    <td className="py-3 px-3 text-right font-mono text-[11px] text-slate-500">
                      {o.created_at
                        ? new Date(o.created_at).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })
                        : "—"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
