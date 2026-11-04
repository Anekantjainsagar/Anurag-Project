"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { api } from "@/services/apiClient";
import {
  LayoutDashboard,
  Package,
  Mail,
  Users,
  Settings,
  Truck,
  CheckCircle2,
  AlertCircle,
  Clock,
  Send,
  Eye,
  KeyRound,
  ShieldCheck,
  Search,
  ExternalLink,
  ChevronRight,
  RefreshCw,
  Edit3,
  Check,
  X,
  Sparkles,
  ArrowRight,
  Phone,
  FileText,
} from "lucide-react";

function AdminContent() {
  const { user, isAuthenticated, isLoading: isAuthLoading, sendOtp, verifyOtp } = useAuth();
  const { showToast } = useCart();

  const [activeTab, setActiveTab] = useState<"dashboard" | "orders" | "email" | "inquiries">("dashboard");

  // Admin Quick Login state (for fast access if not logged in)
  const [adminPhone, setAdminPhone] = useState("+919876543210");
  const [adminOtp, setAdminOtp] = useState("1234");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Dashboard Data State
  const [dashboardData, setDashboardData] = useState<any | null>(null);
  const [isLoadingDashboard, setIsLoadingDashboard] = useState(false);

  // Orders State
  const [orders, setOrders] = useState<any[]>([]);
  const [orderFilter, setOrderFilter] = useState<string>("ALL");
  const [isLoadingOrders, setIsLoadingOrders] = useState(false);
  const [selectedOrderForDispatch, setSelectedOrderForDispatch] = useState<any | null>(null);
  const [dispatchForm, setDispatchForm] = useState({
    courier_name: "Delhivery Express",
    tracking_awb: "",
  });
  const [isUpdatingOrder, setIsUpdatingOrder] = useState(false);

  // Email & SMTP State
  const [smtpConfig, setSmtpConfig] = useState({
    smtp_host: "smtp.gmail.com",
    smtp_port: 587,
    smtp_user: "meriwebdunia@gmail.com",
    smtp_password: "",
    smtp_password_set: false,
    smtp_from_email: "meriwebdunia@gmail.com",
    smtp_from_name: "Onaar Pure Harvest",
    smtp_use_tls: true,
  });
  const [isSavingSmtp, setIsSavingSmtp] = useState(false);
  const [isTestingSmtp, setIsTestingSmtp] = useState(false);
  const [smtpStatusMessage, setSmtpStatusMessage] = useState<string | null>(null);

  // Email Templates State
  const [templates, setTemplates] = useState<any[]>([]);
  const [selectedTemplateKey, setSelectedTemplateKey] = useState<string>("ORDER_CONFIRMATION");
  const [currentTemplate, setCurrentTemplate] = useState<{
    template_key: string;
    name: string;
    subject: string;
    html_body: string;
    is_active: boolean;
  }>({
    template_key: "ORDER_CONFIRMATION",
    name: "Customer Order Confirmation",
    subject: "Order Confirmed #{{order_number}} - Onaar Pure Harvest",
    html_body: "",
    is_active: true,
  });
  const [isSavingTemplate, setIsSavingTemplate] = useState(false);
  const [testEmailRecipient, setTestEmailRecipient] = useState("meriwebdunia@gmail.com");
  const [isSendingTestEmail, setIsSendingTestEmail] = useState(false);

  // Inquiries State
  const [contactInquiries, setContactInquiries] = useState<any[]>([]);
  const [bulkInquiries, setBulkInquiries] = useState<any[]>([]);
  const [isLoadingInquiries, setIsLoadingInquiries] = useState(false);

  const isAdmin = user && (user.role === "admin" || user.role === "vendor");

  // Load dashboard on initial load if admin
  useEffect(() => {
    if (isAdmin) {
      loadDashboard();
      loadSmtpConfig();
      loadTemplates();
    }
  }, [isAdmin]);

  // Load orders when activeTab becomes 'orders'
  useEffect(() => {
    if (activeTab === "orders" && isAdmin) {
      loadOrders();
    }
    if (activeTab === "inquiries" && isAdmin) {
      loadInquiries();
    }
  }, [activeTab, isAdmin, orderFilter]);

  const loadDashboard = async () => {
    setIsLoadingDashboard(true);
    try {
      const data = await api.admin.getDashboard();
      setDashboardData(data);
    } catch {
      // Fallback mock statistics if backend offline
      setDashboardData({
        metrics: {
          total_revenue: 12450.0,
          total_orders: 18,
          pending_fulfillment: 4,
          registered_customers: 62,
          total_products: 192,
        },
        recent_orders: [],
      });
    } finally {
      setIsLoadingDashboard(false);
    }
  };

  const loadOrders = async () => {
    setIsLoadingOrders(true);
    try {
      const statusParam = orderFilter === "ALL" ? undefined : orderFilter;
      const data = await api.admin.getOrders({ status: statusParam });
      setOrders(data || []);
    } catch {
      setOrders([]);
    } finally {
      setIsLoadingOrders(false);
    }
  };

  const loadSmtpConfig = async () => {
    try {
      const data = await api.admin.getSmtpConfig();
      if (data) {
        setSmtpConfig({
          smtp_host: data.smtp_host || "smtp.gmail.com",
          smtp_port: data.smtp_port || 587,
          smtp_user: data.smtp_user || "meriwebdunia@gmail.com",
          smtp_password: "",
          smtp_password_set: data.smtp_password_set || false,
          smtp_from_email: data.smtp_from_email || "meriwebdunia@gmail.com",
          smtp_from_name: data.smtp_from_name || "Onaar Pure Harvest",
          smtp_use_tls: data.smtp_use_tls !== false,
        });
      }
    } catch {
      // Keep default
    }
  };

  const loadTemplates = async () => {
    try {
      const data = await api.admin.getEmailTemplates();
      if (data && data.length > 0) {
        setTemplates(data);
        const first = data[0];
        setSelectedTemplateKey(first.template_key);
        setCurrentTemplate({
          template_key: first.template_key,
          name: first.name,
          subject: first.subject,
          html_body: first.html_body,
          is_active: first.is_active,
        });
      }
    } catch {
      // Default fallback templates
      const defaults = [
        {
          template_key: "ORDER_CONFIRMATION",
          name: "Customer Order Confirmation",
          subject: "Harvest Order Confirmed #{{order_number}} - Onaar",
          html_body: "<p>Dear {{customer_name}}, thank you for choosing Onaar pure organic staples! Your order <strong>#{{order_number}}</strong> of ₹{{total_amount}} is confirmed.</p>",
          is_active: true,
        },
        {
          template_key: "VENDOR_ORDER_ALERT",
          name: "Vendor New Order Dispatch Alert",
          subject: "ACTION REQUIRED: New Order #{{order_number}} Received (₹{{total_amount}})",
          html_body: "<p>Hello Anurag Jain,<br/>A new harvest order <strong>#{{order_number}}</strong> has been placed by {{customer_name}} (Phone: {{customer_phone}}). Please prepare packaging and dispatch.</p>",
          is_active: true,
        },
        {
          template_key: "CONTACT_US_ALERT",
          name: "Contact Us Query Notification",
          subject: "New Customer Inquiry: {{subject}} (from {{name}})",
          html_body: "<p>Customer {{name}} (Email: {{email}}, Phone: {{phone}}) sent a query:</p><blockquote>{{message}}</blockquote>",
          is_active: true,
        },
      ];
      setTemplates(defaults);
      setCurrentTemplate(defaults[0]);
    }
  };

  const loadInquiries = async () => {
    setIsLoadingInquiries(true);
    try {
      const [contacts, bulks] = await Promise.all([
        api.admin.getContactInquiries(),
        api.admin.getBulkEnquiries(),
      ]);
      setContactInquiries(contacts || []);
      setBulkInquiries(bulks || []);
    } catch {
      setContactInquiries([]);
      setBulkInquiries([]);
    } finally {
      setIsLoadingInquiries(false);
    }
  };

  // Quick Admin Login action
  const handleAdminQuickLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    try {
      await sendOtp(adminPhone, "sms");
      const ok = await verifyOtp(adminPhone, adminOtp, "Anurag Jain (Admin)");
      if (ok) {
        showToast("Authenticated as Super Admin!");
      }
    } catch (err: any) {
      showToast(err.message || "Failed to authenticate admin");
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Order status update
  const handleUpdateOrderStatus = async (orderId: string, newStatus: string) => {
    setIsUpdatingOrder(true);
    try {
      await api.admin.updateOrderStatus(orderId, newStatus);
      showToast(`Order status updated to ${newStatus}`);
      loadOrders();
    } catch (err: any) {
      showToast(err.message || "Failed to update order status");
    } finally {
      setIsUpdatingOrder(false);
    }
  };

  // Dispatch Order with Courier and AWB
  const handleDispatchOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrderForDispatch || !dispatchForm.tracking_awb.trim()) {
      showToast("Please enter a valid tracking AWB number");
      return;
    }

    setIsUpdatingOrder(true);
    try {
      await api.admin.dispatchOrder(
        selectedOrderForDispatch.id,
        dispatchForm.courier_name,
        dispatchForm.tracking_awb
      );
      showToast(`Order dispatched via ${dispatchForm.courier_name}! Customer notified.`);
      setSelectedOrderForDispatch(null);
      setDispatchForm({ courier_name: "Delhivery Express", tracking_awb: "" });
      loadOrders();
    } catch (err: any) {
      showToast(err.message || "Failed to dispatch order");
    } finally {
      setIsUpdatingOrder(false);
    }
  };

  // Save SMTP Settings
  const handleSaveSmtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingSmtp(true);
    try {
      await api.admin.updateSmtpConfig({
        smtp_host: smtpConfig.smtp_host,
        smtp_port: Number(smtpConfig.smtp_port),
        smtp_user: smtpConfig.smtp_user,
        smtp_password: smtpConfig.smtp_password || undefined,
        smtp_from_email: smtpConfig.smtp_from_email,
        smtp_from_name: smtpConfig.smtp_from_name,
        smtp_use_tls: smtpConfig.smtp_use_tls,
      });
      showToast("SMTP configuration saved successfully!");
      setSmtpStatusMessage("SMTP credentials updated and stored securely.");
    } catch (err: any) {
      showToast(err.message || "Failed to save SMTP config");
    } finally {
      setIsSavingSmtp(false);
    }
  };

  // Test SMTP Live Handshake
  const handleTestSmtp = async () => {
    setIsTestingSmtp(true);
    setSmtpStatusMessage("Connecting to SMTP server...");
    try {
      const res = await api.admin.verifySmtp();
      setSmtpStatusMessage(`✓ Success: ${res.message}`);
      showToast("SMTP Handshake Succeeded!");
    } catch (err: any) {
      setSmtpStatusMessage(`✗ Connection Failed: ${err.message}`);
      showToast("SMTP verification failed. Check credentials.");
    } finally {
      setIsTestingSmtp(false);
    }
  };

  // Select template to edit
  const handleSelectTemplate = (tmpl: any) => {
    setSelectedTemplateKey(tmpl.template_key);
    setCurrentTemplate({
      template_key: tmpl.template_key,
      name: tmpl.name,
      subject: tmpl.subject,
      html_body: tmpl.html_body,
      is_active: tmpl.is_active,
    });
  };

  // Save Template
  const handleSaveTemplate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingTemplate(true);
    try {
      await api.admin.updateEmailTemplate(currentTemplate.template_key, {
        subject: currentTemplate.subject,
        html_body: currentTemplate.html_body,
        is_active: currentTemplate.is_active,
      });
      showToast("Email template updated in database!");
      loadTemplates();
    } catch (err: any) {
      showToast(err.message || "Failed to save template");
    } finally {
      setIsSavingTemplate(false);
    }
  };

  // Send Test Email
  const handleSendTestEmail = async () => {
    if (!testEmailRecipient.trim()) {
      showToast("Please enter a test recipient email");
      return;
    }
    setIsSendingTestEmail(true);
    try {
      const res = await api.admin.sendTestEmail(testEmailRecipient, currentTemplate.template_key, {
        order_number: "TEST-2026-001",
        customer_name: "Valued Patron",
        customer_phone: "+91 98765 43210",
        total_amount: "1,450.00",
        subject: "General Farm Inquiry",
        name: "Test Customer",
        email: testEmailRecipient,
        phone: "+91 98765 43210",
        message: "We are interested in sourcing 100kg organic Arhar dal monthly for our health store.",
        courier_name: "Delhivery Express",
        tracking_awb: "DEL9823471029",
      });
      showToast(res.message || "Test email dispatched successfully!");
    } catch (err: any) {
      showToast(err.message || "Failed to dispatch test email.");
    } finally {
      setIsSendingTestEmail(false);
    }
  };

  // If not logged in or not admin, show Admin Authentication Screen
  if (!isAuthLoading && !isAdmin) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center px-4 py-16 bg-[#fbfdfc] font-sans">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-gray-100 shadow-2xl text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-800 mx-auto flex items-center justify-center shadow-xs">
            <KeyRound className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="bg-amber-100 text-amber-900 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Restricted Access
            </span>
            <h2 className="font-serif text-2xl font-bold text-gray-900">
              Onaar Admin & Operations Portal
            </h2>
            <p className="text-xs text-gray-600 leading-relaxed">
              Sign in with your verified administrative phone number to manage store orders, dispatch logistics, and customize email templates & Nodemailer SMTP settings.
            </p>
          </div>

          <form onSubmit={handleAdminQuickLogin} className="space-y-4 text-left">
            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">
                Admin Registered Phone
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={adminPhone}
                  onChange={(e) => setAdminPhone(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:border-[#01722C] focus:bg-white focus:outline-none"
                  placeholder="+919876543210"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">
                OTP Verification Code
              </label>
              <input
                type="text"
                value={adminOtp}
                onChange={(e) => setAdminOtp(e.target.value)}
                className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-mono font-bold tracking-widest text-center focus:border-[#01722C] focus:bg-white focus:outline-none"
                placeholder="1234"
              />
              <span className="text-[10px] text-amber-700 mt-1 block">
                Default dev OTP code: <strong>1234</strong>
              </span>
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full bg-[#01722C] hover:bg-[#0b542c] text-white py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer disabled:opacity-50"
            >
              {isLoggingIn ? "AUTHENTICATING..." : "ENTER ADMIN PORTAL"}
            </button>
          </form>

          <div className="pt-2 text-center">
            <Link href="/" className="text-xs text-gray-500 hover:text-[#01722C]">
              ← Return to Customer Storefront
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fbfdfc] pb-24 font-sans text-gray-800">
      {/* Top Admin Header */}
      <div className="bg-[#1b2b23] text-white py-6 border-b border-[#2d473a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#01722C] text-white flex items-center justify-center font-bold shadow-xs">
                OA
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-serif text-lg sm:text-xl font-bold">
                    Onaar Operations & Fulfillment Center
                  </h1>
                  <span className="bg-emerald-800 text-emerald-200 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase">
                    Live
                  </span>
                </div>
                <p className="text-xs text-gray-300">
                  Signed in as <strong>{user?.full_name || "Admin"}</strong> ({user?.phone || user?.email})
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center">
              <Link
                href="/profile"
                className="bg-white/10 hover:bg-white/20 text-white px-3.5 py-2 rounded-xl text-xs font-semibold transition-all"
              >
                My Account
              </Link>
              <Link
                href="/"
                className="bg-[#01722C] hover:bg-[#0b542c] text-white px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-xs"
              >
                View Storefront →
              </Link>
            </div>
          </div>

          {/* Admin Navigation Tabs */}
          <div className="flex items-center gap-2 mt-6 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === "dashboard"
                  ? "bg-white text-gray-900 shadow-md"
                  : "text-gray-300 hover:text-white hover:bg-white/10"
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Overview & KPIs</span>
            </button>

            <button
              onClick={() => setActiveTab("orders")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === "orders"
                  ? "bg-white text-gray-900 shadow-md"
                  : "text-gray-300 hover:text-white hover:bg-white/10"
              }`}
            >
              <Package className="w-4 h-4" />
              <span>Order Fulfillment</span>
            </button>

            <button
              onClick={() => setActiveTab("email")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === "email"
                  ? "bg-white text-gray-900 shadow-md"
                  : "text-gray-300 hover:text-white hover:bg-white/10"
              }`}
            >
              <Mail className="w-4 h-4" />
              <span>Email Templates & SMTP (Nodemailer)</span>
            </button>

            <button
              onClick={() => setActiveTab("inquiries")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === "inquiries"
                  ? "bg-white text-gray-900 shadow-md"
                  : "text-gray-300 hover:text-white hover:bg-white/10"
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Wholesale & Contact Queries</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {/* TAB 1: Dashboard Overview */}
        {activeTab === "dashboard" && (
          <div className="space-y-8 animate-fade-in">
            {/* KPI Stat Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-xs space-y-1">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  Total Store Revenue
                </span>
                <div className="font-serif text-2xl font-bold text-gray-900">
                  ₹{Number(dashboardData?.metrics?.total_revenue || 0).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                </div>
                <div className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> All successful orders
                </div>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-xs space-y-1">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  Total Orders
                </span>
                <div className="font-serif text-2xl font-bold text-gray-900">
                  {dashboardData?.metrics?.total_orders || 0}
                </div>
                <div className="text-[10px] text-gray-500">
                  {dashboardData?.metrics?.pending_fulfillment || 0} awaiting packaging
                </div>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-xs space-y-1">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  Registered Members
                </span>
                <div className="font-serif text-2xl font-bold text-gray-900">
                  {dashboardData?.metrics?.registered_customers || 1}
                </div>
                <div className="text-[10px] text-gray-500">Verified via phone OTP</div>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-xs space-y-1">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  Active Harvest Catalog
                </span>
                <div className="font-serif text-2xl font-bold text-[#01722C]">
                  {dashboardData?.metrics?.total_products || 192} Crops
                </div>
                <div className="text-[10px] text-gray-500">Pulses, Rice, Spices & Dry Fruits</div>
              </div>
            </div>

            {/* Quick Action Bar */}
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="font-serif text-lg font-bold text-gray-900">
                  Fulfillment & Logistics Pipeline
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  View new orders, dispatch packages with courier tracking numbers, and trigger automatic customer SMS/Emails.
                </p>
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto">
                <button
                  onClick={() => setActiveTab("orders")}
                  className="w-full md:w-auto bg-[#01722C] hover:bg-[#0b542c] text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Package className="w-4 h-4" />
                  <span>Manage Orders</span>
                </button>
                <button
                  onClick={() => setActiveTab("email")}
                  className="w-full md:w-auto bg-gray-100 hover:bg-gray-200 text-gray-800 px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Mail className="w-4 h-4" />
                  <span>Configure SMTP</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Order Fulfillment */}
        {activeTab === "orders" && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-xs">
              <div>
                <h2 className="font-serif text-xl font-bold text-gray-900">
                  Customer Orders & Dispatch Management
                </h2>
                <p className="text-xs text-gray-500 mt-1">
                  Change order statuses, assign courier partners, and issue tracking AWB codes.
                </p>
              </div>

              {/* Status Filter */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {["ALL", "PLACED", "CONFIRMED", "PACKED", "DISPATCHED", "DELIVERED", "CANCELLED"].map(
                  (st) => (
                    <button
                      key={st}
                      onClick={() => setOrderFilter(st)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        orderFilter === st
                          ? "bg-[#01722C] text-white shadow-xs"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {st}
                    </button>
                  )
                )}
              </div>
            </div>

            {isLoadingOrders ? (
              <div className="bg-white rounded-3xl p-12 text-center text-xs text-gray-500 border border-gray-100">
                Loading orders...
              </div>
            ) : orders.length === 0 ? (
              <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center space-y-3">
                <Package className="w-12 h-12 text-gray-300 mx-auto" />
                <h3 className="font-serif text-base font-bold text-gray-700">
                  No orders found for &quot;{orderFilter}&quot;
                </h3>
                <p className="text-xs text-gray-400">
                  Customer orders will automatically appear here once checkout is completed.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-white rounded-3xl border border-gray-100 p-6 shadow-xs hover:border-gray-200 transition-all space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-gray-900 text-base">
                            {order.order_number}
                          </span>
                          <span
                            className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase ${
                              order.status === "DELIVERED"
                                ? "bg-emerald-100 text-emerald-800"
                                : order.status === "DISPATCHED"
                                ? "bg-blue-100 text-blue-800"
                                : order.status === "CANCELLED"
                                ? "bg-red-100 text-red-800"
                                : "bg-amber-100 text-amber-800"
                            }`}
                          >
                            {order.status}
                          </span>
                          <span className="bg-gray-100 text-gray-700 text-[10px] font-bold px-2 py-0.5 rounded">
                            {order.payment_method} ({order.payment_status})
                          </span>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          Placed by <strong>{order.customer_name}</strong> • Phone:{" "}
                          <strong>{order.customer_phone}</strong> {order.customer_email && `• ${order.customer_email}`}
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-[11px] text-gray-400 block font-bold uppercase">
                          Total Amount
                        </span>
                        <span className="font-bold text-gray-900 text-lg">
                          ₹{Number(order.total_amount).toFixed(2)}
                        </span>
                      </div>
                    </div>

                    {/* Order Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      {/* Shipping Address */}
                      <div className="bg-[#f8faf9] p-3.5 rounded-2xl border border-gray-200">
                        <div className="font-bold text-gray-800 mb-1 flex items-center gap-1.5">
                          <Truck className="w-3.5 h-3.5 text-[#01722C]" />
                          <span>Delivery Destination</span>
                        </div>
                        <div className="text-gray-600 leading-relaxed">
                          {order.shipping_flat_no}, {order.shipping_street}
                          {order.shipping_landmark && `, ${order.shipping_landmark}`}
                          <br />
                          {order.shipping_city}, {order.shipping_state} - {order.shipping_pincode}
                        </div>
                      </div>

                      {/* Purchased Items */}
                      <div className="bg-[#f8faf9] p-3.5 rounded-2xl border border-gray-200">
                        <div className="font-bold text-gray-800 mb-1">
                          Items in Order ({(order.items || []).length})
                        </div>
                        <div className="space-y-1 max-h-24 overflow-y-auto pr-1">
                          {(order.items || []).map((it: any, i: number) => (
                            <div key={i} className="flex justify-between text-[11px] text-gray-700">
                              <span>
                                {it.product_name} ({it.packaging_size}) × {it.quantity}
                              </span>
                              <span className="font-semibold">
                                ₹{(it.unit_price * it.quantity).toFixed(2)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Action Controls */}
                    <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-gray-100">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500 font-semibold">Update Status:</span>
                        <select
                          value={order.status}
                          disabled={isUpdatingOrder}
                          onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                          className="text-xs font-bold border border-gray-200 bg-white rounded-lg px-2.5 py-1.5 focus:border-[#01722C] cursor-pointer"
                        >
                          <option value="PLACED">PLACED</option>
                          <option value="CONFIRMED">CONFIRMED</option>
                          <option value="PACKED">PACKED</option>
                          <option value="DISPATCHED">DISPATCHED</option>
                          <option value="DELIVERED">DELIVERED</option>
                          <option value="CANCELLED">CANCELLED</option>
                        </select>
                      </div>

                      <div className="flex items-center gap-2">
                        {order.status !== "DISPATCHED" && order.status !== "DELIVERED" ? (
                          <button
                            onClick={() => {
                              setSelectedOrderForDispatch(order);
                              setDispatchForm({
                                courier_name: "Delhivery Express",
                                tracking_awb: "",
                              });
                            }}
                            className="bg-[#01722C] hover:bg-[#0b542c] text-white px-4 py-1.5 rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                          >
                            <Truck className="w-3.5 h-3.5" />
                            <span>Dispatch & Enter AWB</span>
                          </button>
                        ) : (
                          <div className="text-xs text-blue-800 font-semibold flex items-center gap-1">
                            <span>Dispatched: {order.courier_name} ({order.tracking_awb})</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: Email Templates & SMTP Configuration */}
        {activeTab === "email" && (
          <div className="space-y-8 animate-fade-in">
            {/* Header info */}
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xs">
              <h2 className="font-serif text-xl font-bold text-gray-900">
                Email Dispatch & Nodemailer / SMTP Settings
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                Configure your outgoing SMTP email server (Gmail, SendGrid, Amazon SES, or custom server) and customize customer and vendor transactional email HTML templates without hardcoded limits.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column: SMTP Server Configuration */}
              <div className="lg:col-span-1 bg-white p-6 rounded-3xl border border-gray-100 shadow-xs space-y-5">
                <div className="border-b border-gray-100 pb-3">
                  <h3 className="font-serif text-base font-bold text-gray-900 flex items-center gap-2">
                    <Settings className="w-4 h-4 text-[#01722C]" />
                    <span>SMTP Protocol Credentials</span>
                  </h3>
                  <p className="text-[11px] text-gray-500">
                    Standard SMTP protocol used by Nodemailer & aiosmtplib.
                  </p>
                </div>

                <form onSubmit={handleSaveSmtp} className="space-y-3.5 text-xs">
                  <div>
                    <label className="font-bold text-gray-700 block mb-1">
                      SMTP Host *
                    </label>
                    <input
                      type="text"
                      required
                      value={smtpConfig.smtp_host}
                      onChange={(e) => setSmtpConfig({ ...smtpConfig, smtp_host: e.target.value })}
                      placeholder="smtp.gmail.com"
                      className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:border-[#01722C] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="font-bold text-gray-700 block mb-1">
                        Port *
                      </label>
                      <input
                        type="number"
                        required
                        value={smtpConfig.smtp_port}
                        onChange={(e) => setSmtpConfig({ ...smtpConfig, smtp_port: Number(e.target.value) })}
                        placeholder="587"
                        className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:border-[#01722C] focus:outline-none"
                      />
                    </div>
                    <div className="flex items-center pt-5">
                      <label className="flex items-center gap-2 cursor-pointer font-bold text-gray-700">
                        <input
                          type="checkbox"
                          checked={smtpConfig.smtp_use_tls}
                          onChange={(e) => setSmtpConfig({ ...smtpConfig, smtp_use_tls: e.target.checked })}
                          className="rounded text-[#01722C]"
                        />
                        <span>Enable TLS</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-gray-700 block mb-1">
                      SMTP Username / Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={smtpConfig.smtp_user}
                      onChange={(e) => setSmtpConfig({ ...smtpConfig, smtp_user: e.target.value })}
                      placeholder="meriwebdunia@gmail.com"
                      className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:border-[#01722C] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-gray-700 block mb-1">
                      SMTP Password / App Password
                    </label>
                    <input
                      type="password"
                      value={smtpConfig.smtp_password}
                      onChange={(e) => setSmtpConfig({ ...smtpConfig, smtp_password: e.target.value })}
                      placeholder={smtpConfig.smtp_password_set ? "•••••••••••• (Set)" : "Enter 16-character App Password"}
                      className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:border-[#01722C] focus:outline-none font-mono"
                    />
                    <span className="text-[10px] text-gray-400 mt-0.5 block">
                      For Gmail: Use 16-digit Google App Password
                    </span>
                  </div>

                  <div>
                    <label className="font-bold text-gray-700 block mb-1">
                      Sender Name
                    </label>
                    <input
                      type="text"
                      value={smtpConfig.smtp_from_name}
                      onChange={(e) => setSmtpConfig({ ...smtpConfig, smtp_from_name: e.target.value })}
                      placeholder="Onaar Pure Harvest"
                      className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:border-[#01722C] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-gray-700 block mb-1">
                      Sender Email (From)
                    </label>
                    <input
                      type="email"
                      value={smtpConfig.smtp_from_email}
                      onChange={(e) => setSmtpConfig({ ...smtpConfig, smtp_from_email: e.target.value })}
                      placeholder="meriwebdunia@gmail.com"
                      className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:border-[#01722C] focus:outline-none"
                    />
                  </div>

                  <div className="pt-2 flex flex-col gap-2">
                    <button
                      type="submit"
                      disabled={isSavingSmtp}
                      className="w-full bg-[#01722C] hover:bg-[#0b542c] text-white py-2 rounded-xl font-bold uppercase tracking-wider text-xs transition-all shadow-xs cursor-pointer disabled:opacity-50"
                    >
                      {isSavingSmtp ? "Saving..." : "Save SMTP Config"}
                    </button>

                    <button
                      type="button"
                      onClick={handleTestSmtp}
                      disabled={isTestingSmtp}
                      className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 rounded-xl font-bold text-xs transition-all cursor-pointer flex items-center justify-center gap-1.5 disabled:opacity-50"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${isTestingSmtp ? "animate-spin" : ""}`} />
                      <span>{isTestingSmtp ? "Testing Connection..." : "Test SMTP Handshake"}</span>
                    </button>
                  </div>

                  {smtpStatusMessage && (
                    <div className="text-[11px] p-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-700 mt-2">
                      {smtpStatusMessage}
                    </div>
                  )}
                </form>
              </div>

              {/* Right Column: Database Email Template Editor */}
              <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-gray-100 shadow-xs space-y-5">
                <div className="border-b border-gray-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="font-serif text-base font-bold text-gray-900 flex items-center gap-2">
                      <FileText className="w-4 h-4 text-[#01722C]" />
                      <span>Template Editor</span>
                    </h3>
                    <p className="text-[11px] text-gray-500">
                      Edit subject lines, HTML bodies, and placeholders stored in Supabase.
                    </p>
                  </div>

                  {/* Template selector pills */}
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                    {templates.map((t) => (
                      <button
                        key={t.template_key}
                        onClick={() => handleSelectTemplate(t)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer whitespace-nowrap ${
                          selectedTemplateKey === t.template_key
                            ? "bg-[#01722C] text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {t.template_key}
                      </button>
                    ))}
                  </div>
                </div>

                <form onSubmit={handleSaveTemplate} className="space-y-4 text-xs">
                  <div>
                    <label className="font-bold text-gray-700 block mb-1">
                      Template Name
                    </label>
                    <input
                      type="text"
                      disabled
                      value={currentTemplate.name}
                      className="w-full px-3 py-2 border border-gray-200 bg-gray-50 rounded-xl text-gray-500 font-semibold"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-gray-700 block mb-1">
                      Email Subject Line *
                    </label>
                    <input
                      type="text"
                      required
                      value={currentTemplate.subject}
                      onChange={(e) => setCurrentTemplate({ ...currentTemplate, subject: e.target.value })}
                      placeholder="Subject line with {{placeholders}}"
                      className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:border-[#01722C] focus:outline-none font-semibold text-gray-800"
                    />
                  </div>

                  {/* Available placeholders helper */}
                  <div className="bg-emerald-50 border border-emerald-200 p-2.5 rounded-xl space-y-1">
                    <span className="font-bold text-[#01722C] block text-[11px]">
                      Supported Placeholders (Dynamic replacement at runtime):
                    </span>
                    <div className="flex flex-wrap gap-1.5 text-[10px] text-emerald-800 font-mono">
                      <span className="bg-white px-2 py-0.5 rounded border border-emerald-300">{"{{customer_name}}"}</span>
                      <span className="bg-white px-2 py-0.5 rounded border border-emerald-300">{"{{order_number}}"}</span>
                      <span className="bg-white px-2 py-0.5 rounded border border-emerald-300">{"{{total_amount}}"}</span>
                      <span className="bg-white px-2 py-0.5 rounded border border-emerald-300">{"{{courier_name}}"}</span>
                      <span className="bg-white px-2 py-0.5 rounded border border-emerald-300">{"{{tracking_awb}}"}</span>
                      <span className="bg-white px-2 py-0.5 rounded border border-emerald-300">{"{{subject}}"}</span>
                      <span className="bg-white px-2 py-0.5 rounded border border-emerald-300">{"{{message}}"}</span>
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-gray-700 block mb-1">
                      HTML Email Body *
                    </label>
                    <textarea
                      rows={10}
                      required
                      value={currentTemplate.html_body}
                      onChange={(e) => setCurrentTemplate({ ...currentTemplate, html_body: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-200 rounded-xl font-mono text-xs focus:border-[#01722C] focus:outline-none"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <button
                      type="submit"
                      disabled={isSavingTemplate}
                      className="bg-[#01722C] hover:bg-[#0b542c] text-white px-5 py-2.5 rounded-xl font-bold uppercase tracking-wider text-xs transition-all shadow-xs cursor-pointer disabled:opacity-50"
                    >
                      {isSavingTemplate ? "Saving..." : "Save Template"}
                    </button>

                    {/* Test Email Dispatch Input */}
                    <div className="flex items-center gap-2">
                      <input
                        type="email"
                        value={testEmailRecipient}
                        onChange={(e) => setTestEmailRecipient(e.target.value)}
                        placeholder="test@gmail.com"
                        className="px-3 py-2 border border-gray-200 rounded-xl text-xs w-52 focus:border-[#01722C] focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={handleSendTestEmail}
                        disabled={isSendingTestEmail}
                        className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-xl font-bold text-xs transition-all shadow-xs cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>{isSendingTestEmail ? "Sending..." : "Send Test"}</span>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: Wholesale B2B & Contact Inquiries */}
        {activeTab === "inquiries" && (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xs">
              <h2 className="font-serif text-xl font-bold text-gray-900">
                Customer Inquiries & Wholesale Leads
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                Direct queries from Contact Us and commercial wholesale inquiries.
              </p>
            </div>

            {isLoadingInquiries ? (
              <div className="bg-white rounded-3xl p-12 text-center text-xs text-gray-500 border border-gray-100">
                Loading inquiries...
              </div>
            ) : contactInquiries.length === 0 && bulkInquiries.length === 0 ? (
              <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center space-y-2">
                <Users className="w-12 h-12 text-gray-300 mx-auto" />
                <h3 className="font-serif text-base font-bold text-gray-700">
                  No customer inquiries yet
                </h3>
                <p className="text-xs text-gray-400">
                  Submissions through &quot;/contact&quot; will be routed here and forwarded to vendor email.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {contactInquiries.map((inq) => (
                  <div
                    key={inq.id}
                    className="bg-white rounded-3xl border border-gray-100 p-5 shadow-xs space-y-2 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-gray-900">{inq.name}</span>
                      <span className="bg-gray-100 text-gray-600 text-[10px] font-bold px-2 py-0.5 rounded-full">
                        {inq.status || "NEW"}
                      </span>
                    </div>
                    <div className="text-gray-500">
                      {inq.email} • {inq.phone}
                    </div>
                    <div className="font-semibold text-gray-800 pt-1">
                      Subject: {inq.subject}
                    </div>
                    <p className="text-gray-600 bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                      {inq.message}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* DISPATCH ORDER MODAL */}
      {selectedOrderForDispatch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-2xs animate-fade-in font-sans">
          <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-gray-100">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-[#fbfdfc]">
              <div>
                <h3 className="font-serif font-bold text-base text-gray-900">
                  Dispatch Order #{selectedOrderForDispatch.order_number}
                </h3>
                <p className="text-[11px] text-gray-500">
                  Assign courier and AWB to notify customer via email & SMS.
                </p>
              </div>
              <button
                onClick={() => setSelectedOrderForDispatch(null)}
                className="p-1 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleDispatchOrder} className="p-5 space-y-4 text-xs">
              <div>
                <label className="font-bold text-gray-700 block mb-1">
                  Courier Partner *
                </label>
                <select
                  value={dispatchForm.courier_name}
                  onChange={(e) => setDispatchForm({ ...dispatchForm, courier_name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:border-[#01722C] cursor-pointer"
                >
                  <option value="Delhivery Express">Delhivery Express</option>
                  <option value="Blue Dart Express">Blue Dart Express</option>
                  <option value="DTDC Logistics">DTDC Logistics</option>
                  <option value="India Post Speed Post">India Post Speed Post</option>
                  <option value="Shadowfax">Shadowfax</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">
                  Tracking AWB / Consignment Number *
                </label>
                <input
                  type="text"
                  required
                  value={dispatchForm.tracking_awb}
                  onChange={(e) => setDispatchForm({ ...dispatchForm, tracking_awb: e.target.value })}
                  placeholder="e.g. DEL983172039IN"
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:border-[#01722C] font-mono font-bold"
                />
              </div>

              <div className="bg-[#edf7f1] border border-[#cbe5d4] p-3 rounded-2xl text-[11px] text-[#01722C]">
                Submitting dispatch will automatically:
                <ul className="list-disc list-inside mt-1 space-y-0.5 text-gray-700">
                  <li>Mark order status as <strong>DISPATCHED</strong></li>
                  <li>Dispatch tracking link to customer email & phone</li>
                </ul>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedOrderForDispatch(null)}
                  className="px-4 py-2 rounded-full border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUpdatingOrder}
                  className="bg-[#01722C] hover:bg-[#0b542c] text-white px-5 py-2 rounded-full font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer disabled:opacity-50"
                >
                  {isUpdatingOrder ? "Dispatching..." : "Confirm Dispatch"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-xs text-gray-500">Loading admin portal...</div>}>
      <AdminContent />
    </Suspense>
  );
}
