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
  LogIn,
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
  const { user, isAuthenticated, isLoading: isAuthLoading, logout } = useAuth();
  const { showToast, setIsLoginModalOpen } = useCart();

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [stats, setStats] = useState<any>(null);

  const isAdmin = Boolean(user && (user.role === "admin" || user.role === "vendor"));

  // Close mobile sidebar on route change
  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  }, [pathname]);

  // If not authenticated as Admin, auto-trigger the standard storefront login modal
  useEffect(() => {
    if (!isAuthLoading && !isAdmin) {
      if (typeof window !== "undefined") {
        sessionStorage.setItem("post_login_redirect", pathname || "/admin");
      }
      setIsLoginModalOpen(true);
    }
  }, [isAuthLoading, isAdmin, pathname, setIsLoginModalOpen]);

  // Fetch admin dashboard stats when admin is confirmed
  useEffect(() => {
    if (isAdmin) {
      api.admin
        .getDashboard()
        .then((d) => setStats(d))
        .catch(() => {});
    }
  }, [isAdmin, pathname]);

  // Loading state
  if (isAuthLoading) {
    return (
      <div className="min-h-screen bg-[#07130c] flex items-center justify-center p-4 text-white">
        <div className="flex items-center gap-3 bg-[#0f2418] border border-[#1b3d2b] px-6 py-4 rounded-2xl shadow-xl">
          <div className="w-5 h-5 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm font-medium text-emerald-200">Verifying Administrator Session...</span>
        </div>
      </div>
    );
  }

  // Not authenticated as Admin -> Clean prompt to use the standard storefront login modal
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#08140e] flex items-center justify-center p-4 text-white">
        <div className="w-full max-w-md bg-[#0f2418] border border-[#1b3d2b] rounded-3xl p-8 shadow-2xl text-center space-y-5">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mx-auto shadow-sm">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-xl font-bold font-serif text-white">ONAAR Admin Portal</h2>
            <p className="text-xs text-emerald-400 font-medium mt-1">Administrator Access Required</p>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            {user
              ? `You are signed in as ${user.full_name || user.phone || user.email} (${user.role}). This portal requires an administrator account.`
              : "Please sign in using your registered administrator account."}
          </p>

          <div className="pt-2 space-y-2.5">
            <button
              type="button"
              onClick={() => {
                if (typeof window !== "undefined") {
                  sessionStorage.setItem("post_login_redirect", pathname || "/admin");
                }
                setIsLoginModalOpen(true);
              }}
              className="w-full bg-[#01722C] hover:bg-[#0b542c] text-white font-bold py-3 px-4 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer text-sm"
            >
              <LogIn className="w-4 h-4" />
              <span>{user ? "Switch to Admin Account" : "Sign In with ONAAR Account"}</span>
            </button>

            <Link
              href="/"
              className="block w-full text-center py-2 text-xs text-slate-400 hover:text-white transition-colors"
            >
              ← Return to Storefront
            </Link>
          </div>
        </div>
        {/* Render child segments in a hidden container to satisfy Next.js instant navigation validation */}
        <div className="hidden" aria-hidden="true" style={{ display: "none" }}>
          {children}
        </div>
      </div>
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
        <main className="flex-1 overflow-y-auto p-3 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
          {children}
        </main>
      </div>
    </div>
  );
}
