"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import {
  LayoutDashboard,
  Package,
  Tag,
  Truck,
  Users,
  FileText,
  MessageSquare,
  Cloud,
  Mail,
  Settings,
  ShieldCheck,
  Menu,
  ExternalLink,
  LogOut,
  RefreshCw,
} from "lucide-react";
import { api } from "@/services/apiClient";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/products", label: "Products & Crops", icon: Package },
  { href: "/admin/categories", label: "Categories", icon: Tag },
  { href: "/admin/orders", label: "Orders & Fulfillment", icon: Truck },
  { href: "/admin/users", label: "Customers & Users", icon: Users },
  { href: "/admin/blogs", label: "Agronomy Blogs", icon: FileText },
  { href: "/admin/inquiries", label: "CRM & Inquiries", icon: MessageSquare },
  { href: "/admin/s3", label: "Cloud S3 Storage", icon: Cloud },
  { href: "/admin/email", label: "Email & SMTP", icon: Mail },
  { href: "/admin/settings", label: "Store Settings", icon: Settings },
];

function getPageTitle(pathname: string): { title: string; badge: string } {
  if (pathname === "/admin" || pathname === "/admin/dashboard") {
    return { title: "Executive KPI & Intelligence", badge: "Dashboard" };
  }
  if (pathname.startsWith("/admin/products")) {
    return { title: "Organic Crops & Inventory", badge: "Products" };
  }
  if (pathname.startsWith("/admin/categories")) {
    return { title: "Crop Categories & Taxonomy", badge: "Categories" };
  }
  if (pathname.startsWith("/admin/orders")) {
    return { title: "Dispatch & Fulfillment Queue", badge: "Orders" };
  }
  if (pathname.startsWith("/admin/users")) {
    return { title: "Customer Accounts & Order History", badge: "Users" };
  }
  if (pathname.startsWith("/admin/blogs")) {
    return { title: "Agronomy Research & Health Journal", badge: "Blogs" };
  }
  if (pathname.startsWith("/admin/inquiries")) {
    return { title: "Customer CRM & Wholesale Leads", badge: "Inquiries" };
  }
  if (pathname.startsWith("/admin/s3")) {
    return { title: "Amazon S3 Cloud Assets & Storage", badge: "Storage" };
  }
  if (pathname.startsWith("/admin/email")) {
    return { title: "Automated Email Templates & SMTP Handshake", badge: "Email" };
  }
  if (pathname.startsWith("/admin/settings")) {
    return { title: "Store Policies, CMS & Thresholds", badge: "Settings" };
  }
  return { title: "ONAAR Admin Portal", badge: "Admin" };
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, isLoading: isAuthLoading, sendOtp, verifyOtp, logout } = useAuth();
  const { showToast } = useCart();

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [adminPhone, setAdminPhone] = useState("");
  const [adminOtp, setAdminOtp] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [stats, setStats] = useState<any>(null);

  const isAdmin = user && (user.role === "admin" || user.role === "vendor");

  useEffect(() => {
    if (isAdmin) {
      api.admin
        .getDashboard()
        .then((d) => setStats(d))
        .catch(() => {});
    }
  }, [isAdmin, pathname]);

  // Handle Admin Quick Login
  const handleAdminQuickLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminPhone.trim() || !adminOtp.trim()) {
      showToast("Please enter both phone number and OTP code");
      return;
    }
    setIsLoggingIn(true);
    try {
      await sendOtp(adminPhone, "sms");
      const ok = await verifyOtp(adminPhone, adminOtp, "Admin User");
      if (ok) {
        showToast("Authenticated as Super Admin!");
      }
    } catch (err: any) {
      showToast(err.message || "Failed to authenticate admin");
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Close mobile sidebar on route change
  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  }, [pathname]);

  // Loading state
  if (isAuthLoading) {
    return (
      <>
        <div className="hidden" aria-hidden="true">
          {children}
        </div>
        <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 text-white">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
            <span className="text-sm font-medium">Verifying Administrator Access...</span>
          </div>
        </div>
      </>
    );
  }

  // Unauthenticated / Non-Admin Gate
  if (!isAdmin) {
    return (
      <>
        <div className="hidden" aria-hidden="true">
          {children}
        </div>
        <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 sm:p-10 max-w-md w-full shadow-2xl border border-slate-100 text-center space-y-6">
            <div className="w-16 h-16 bg-emerald-700 text-white rounded-2xl flex items-center justify-center mx-auto shadow-lg">
              <ShieldCheck className="w-9 h-9" />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-serif text-slate-900">ONAAR Admin Portal</h1>
              <p className="text-xs text-slate-500 mt-1">Super Admin & Operations Management</p>
            </div>

            <form onSubmit={handleAdminQuickLogin} className="space-y-4 text-left">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Admin Phone Number</label>
                <input
                  type="text"
                  value={adminPhone}
                  onChange={(e) => setAdminPhone(e.target.value)}
                  placeholder="+91 XXXXX XXXXX"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-emerald-600 font-mono"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  One-Time Password / Admin Passcode
                </label>
                <input
                  type="text"
                  value={adminOtp}
                  onChange={(e) => setAdminOtp(e.target.value)}
                  placeholder="Enter 4-digit code"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-emerald-600 font-mono tracking-widest text-center"
                />
              </div>

              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full bg-emerald-700 hover:bg-emerald-800 text-white py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer disabled:opacity-50"
              >
                {isLoggingIn ? "AUTHENTICATING..." : "ENTER SUPER ADMIN PORTAL"}
              </button>
            </form>

            <Link href="/" className="inline-block text-xs text-slate-500 hover:text-emerald-700">
              ← Return to Storefront
            </Link>
          </div>
        </div>
      </>
    );
  }

  const { title: currentTitle, badge: currentBadge } = getPageTitle(pathname);

  return (
    <div className="w-full h-screen max-h-screen bg-slate-50 flex overflow-hidden font-sans text-slate-800 fixed inset-0">
      {/* Mobile Backdrop when sidebar is open on screens < 768px */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-25 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* --------------------------------------------------------- */}
      {/* 1. Left Sidebar (Fixed, 100% Height, Responsive) */}
      {/* --------------------------------------------------------- */}
      <aside
        className={`fixed md:relative top-0 bottom-0 left-0 z-30 h-screen shrink-0 bg-[#0c1a13] text-slate-200 border-r border-[#1a3326] flex flex-col justify-between transition-all duration-300 overflow-hidden ${
          sidebarOpen ? "w-64 translate-x-0" : "-translate-x-full md:translate-x-0 md:w-20"
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 px-4 flex items-center justify-between border-b border-[#1a3326] shrink-0">
          <Link href="/admin" className="flex items-center gap-3 overflow-hidden">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-md">
              ON
            </div>
            {sidebarOpen && (
              <div className="leading-tight">
                <div className="font-serif font-bold text-sm tracking-wide text-white">ONAAR</div>
                <div className="text-[10px] text-emerald-400 font-mono uppercase tracking-wider">
                  Portal v2.2
                </div>
              </div>
            )}
          </Link>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/5 cursor-pointer"
            aria-label="Toggle sidebar"
          >
            <Menu className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Nav Area with Real Next.js Links */}
        <div className="flex-1 overflow-y-auto">
          <nav className="p-3 space-y-1.5">
            {NAV_ITEMS.map((tab) => {
              const Icon = tab.icon;
              const isActive = tab.exact
                ? pathname === tab.href || pathname === tab.href + "/dashboard"
                : pathname === tab.href || pathname.startsWith(tab.href + "/");

              let badgeCount: number | undefined;
              if (tab.href === "/admin/products") badgeCount = stats?.total_active_products;
              if (tab.href === "/admin/orders") badgeCount = stats?.total_orders;
              if (tab.href === "/admin/users") badgeCount = stats?.total_customers;

              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? "bg-emerald-700 text-white shadow-md font-bold"
                      : "text-slate-300 hover:text-white hover:bg-white/5"
                  }`}
                  title={tab.label}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-emerald-200" : "text-slate-400"}`} />
                  {sidebarOpen && <span className="truncate">{tab.label}</span>}
                  {sidebarOpen && badgeCount !== undefined && badgeCount > 0 && (
                    <span
                      className={`ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isActive ? "bg-white/20 text-white" : "bg-[#162e22] text-emerald-300"
                      }`}
                    >
                      {badgeCount}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-3 border-t border-[#1a3326] space-y-2 shrink-0">
          {sidebarOpen ? (
            <div className="bg-[#14281e] p-3 rounded-xl border border-[#1e3c2c] flex items-center justify-between">
              <div className="overflow-hidden">
                <div className="text-xs font-bold text-white truncate">{user?.full_name || "Admin"}</div>
                <div className="text-[10px] text-emerald-400 truncate">{user?.role ? `${user.role.toUpperCase()} ACCOUNT` : "ADMINISTRATOR"}</div>
              </div>
              <button
                onClick={() => logout()}
                title="Logout"
                className="text-slate-400 hover:text-rose-400 p-1.5 hover:bg-white/5 rounded-lg cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => logout()}
              title="Logout"
              className="w-full flex justify-center text-slate-400 hover:text-rose-400 py-2 hover:bg-white/5 rounded-lg cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}

          <Link
            href="/"
            className={`w-full flex items-center justify-center gap-2 py-2 text-xs font-semibold text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-all ${
              !sidebarOpen && "px-0"
            }`}
          >
            <ExternalLink className="w-3.5 h-3.5" />
            {sidebarOpen && <span>View Store</span>}
          </Link>
        </div>
      </aside>

      {/* --------------------------------------------------------- */}
      {/* 2. Main Content & Header (Fixed Header, Scrollable Page) */}
      {/* --------------------------------------------------------- */}
      <div className="flex-1 flex flex-col h-screen min-w-0 overflow-hidden">
        {/* Top Header (Permanently Fixed at Top) */}
        <header className="h-16 bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between shrink-0 shadow-xs z-20 sticky top-0">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:text-slate-900 md:hidden cursor-pointer"
              aria-label="Toggle navigation"
            >
              <Menu className="w-4 h-4" />
            </button>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
              {currentBadge}
            </span>
            <h1 className="text-base font-bold text-slate-900 hidden sm:block">
              {currentTitle}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-emerald-700 bg-slate-100 hover:bg-emerald-50 px-3 py-1.5 rounded-xl transition-all"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Live Store</span>
            </Link>

            <button
              onClick={() => {
                router.refresh();
                showToast("Data refreshed");
              }}
              className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl cursor-pointer"
              title="Refresh Page"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Scrollable Viewport rendering individual pages */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
          {children}
        </main>
      </div>
    </div>
  );
}
