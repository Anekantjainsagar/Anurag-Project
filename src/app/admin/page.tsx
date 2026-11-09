"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { api } from "@/services/apiClient";
import {
  Package,
  Cloud,
  FileText,
  Truck,
  Users,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

export default function AdminDashboardPage() {
  const [dashboardData, setDashboardData] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [s3Config, setS3Config] = useState<any>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [dash, s3] = await Promise.all([
        api.admin.getDashboard().catch(() => null),
        api.admin.getS3Config().catch(() => null),
      ]);
      setDashboardData(dash);
      setS3Config(s3);
    } finally {
      setIsLoading(false);
    }
  };

  const metrics = dashboardData?.metrics || {};

  return (
    <div className="space-y-6">
      {/* 1. Stat KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          {
            title: "Total Revenue",
            value: `₹${Number(metrics?.total_revenue || dashboardData?.total_revenue || 0).toLocaleString("en-IN", { minimumFractionDigits: 2 })}`,
            sub: "All time verified sales",
            badge: "Verified",
          },
          {
            title: "Active Orders",
            value: metrics?.total_orders ?? dashboardData?.total_orders ?? 0,
            sub: `${metrics?.pending_fulfillment ?? dashboardData?.pending_cod_verifications ?? 0} awaiting dispatch`,
            badge: "Fulfillment",
          },
          {
            title: "Total Organic Crops",
            value: metrics?.total_products ?? dashboardData?.total_active_products ?? 0,
            sub: "Active in Storefront",
            badge: "100% Certified",
          },
          {
            title: "Registered Customers",
            value: metrics?.registered_customers ?? dashboardData?.total_customers ?? 0,
            sub: "Direct farm supporters",
            badge: "Customers",
          },
          {
            title: "Cloud Media Assets",
            value: s3Config?.is_configured ? "AWS S3 Connected" : "Local Storage",
            sub: s3Config?.aws_s3_bucket || "Local uploads directory",
            badge: s3Config?.is_configured ? "Active S3" : "Local",
          },
        ].map((s, idx) => (
          <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between text-xs text-slate-500 font-medium mb-1">
              <span>{s.title}</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700">
                {s.badge}
              </span>
            </div>
            <div className="text-xl font-bold font-serif text-slate-900 mt-1">{s.value}</div>
            <div className="text-[11px] text-slate-400 mt-1">{s.sub}</div>
          </div>
        ))}
      </div>

      {/* 2. Low Stock Alerts Banner (if any) */}
      {dashboardData?.low_stock_alerts > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-amber-900">
                Low Inventory Alert: {dashboardData.low_stock_alerts} Pack Size Variants Below Minimum Stock Threshold (≤ 10 Units)
              </h4>
              <p className="text-xs text-amber-700 mt-0.5">
                Some organic crops are selling fast. Restock harvest quantities in product inventory to avoid stockouts.
              </p>
            </div>
          </div>
          <Link
            href="/admin/products"
            className="text-xs font-bold bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-xl shrink-0 transition-all shadow-xs"
          >
            Review Stock
          </Link>
        </div>
      )}

      {/* 3. Operational Quick Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm mb-2">
              <Package className="w-4 h-4" />
              <span>Product Catalog Management</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Manage organic crops, stock quantities across weight variants, pricing, and certified harvest batches.
            </p>
          </div>
          <Link
            href="/admin/products"
            className="mt-4 text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
          >
            Manage Products →
          </Link>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm mb-2">
              <Truck className="w-4 h-4" />
              <span>Orders & Fulfillment Dispatch</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Verify COD orders, assign courier AWB tracking numbers, generate shipping slips, and track pan-India dispatches.
            </p>
          </div>
          <Link
            href="/admin/orders"
            className="mt-4 text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
          >
            Fulfill Orders →
          </Link>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm mb-2">
              <Users className="w-4 h-4" />
              <span>Customer Accounts & Profiles</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Inspect registered customer profiles, lifetime spends, saved delivery addresses, and individual customer purchase history.
            </p>
          </div>
          <Link
            href="/admin/users"
            className="mt-4 text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
          >
            View Customers →
          </Link>
        </div>
      </div>

      {/* 4. Infrastructure Quick Jump Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm mb-2">
              <Cloud className="w-4 h-4" />
              <span>AWS S3 Cloud Media Store</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Configure Amazon S3 bucket credentials, upload harvest photography, and verify CloudFront CDN media delivery.
            </p>
          </div>
          <Link
            href="/admin/s3"
            className="mt-4 text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
          >
            Configure S3 & Uploads →
          </Link>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm mb-2">
              <FileText className="w-4 h-4" />
              <span>Agronomy Journal & Blog</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Draft and publish health articles, nutritional guides, and pure harvest farmer stories with the rich HTML editor.
            </p>
          </div>
          <Link
            href="/admin/blogs"
            className="mt-4 text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
          >
            Manage Blogs →
          </Link>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm mb-2">
              <ShieldCheck className="w-4 h-4" />
              <span>Store Settings & Dispatch Rules</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Update free delivery thresholds, flat shipping charges, vendor registry, and central warehouse logistics address.
            </p>
          </div>
          <Link
            href="/admin/settings"
            className="mt-4 text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
          >
            Store Settings →
          </Link>
        </div>
      </div>
    </div>
  );
}
