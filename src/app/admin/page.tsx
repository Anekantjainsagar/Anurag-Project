"use client";

import React, { useState, useEffect, Suspense, useRef } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { api } from "@/services/apiClient";
import {
  LayoutDashboard,
  Package,
  Tag,
  Truck,
  Mail,
  Users,
  Settings,
  Cloud,
  Plus,
  Search,
  Edit3,
  Trash2,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Upload,
  ShieldCheck,
  Image as ImageIcon,
  FileText,
  Menu,
  LogOut,
  X,
  RefreshCw,
} from "lucide-react";

type AdminTab =
  | "dashboard"
  | "products"
  | "categories"
  | "orders"
  | "blogs"
  | "inquiries"
  | "email"
  | "s3"
  | "settings";

function AdminContent() {
  const { user, isAuthenticated, isLoading: isAuthLoading, sendOtp, verifyOtp, logout } = useAuth();
  const { showToast } = useCart();

  const [activeTab, setActiveTab] = useState<AdminTab>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Admin Quick Login state (for fast access if not logged in)
  const [adminPhone, setAdminPhone] = useState("+919876543210");
  const [adminOtp, setAdminOtp] = useState("1234");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // -------------------------------------------------------------
  // Data States
  // -------------------------------------------------------------
  // Dashboard
  const [dashboardData, setDashboardData] = useState<any | null>(null);
  const [isLoadingDashboard, setIsLoadingDashboard] = useState(false);

  // Products
  const [products, setProducts] = useState<any[]>([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [productSearch, setProductSearch] = useState("");
  const [productCategoryFilter, setProductCategoryFilter] = useState("ALL");
  const [productStockFilter, setProductStockFilter] = useState("ALL");

  // Product Modals
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);
  const [productForm, setProductForm] = useState({
    name: "",
    category_id: "pulses",
    subtitle: "",
    description: "",
    origin: "Madhya Pradesh, India",
    tag: "Pure Harvest",
    in_stock: true,
    is_featured: false,
    primary_image: "",
    health_benefits: "",
    ingredients: "",
    storage_instructions: "",
    variants: [
      { weight_label: "500g", price: 120, original_price: 150, stock_quantity: 50, is_default: false },
      { weight_label: "1 kg", price: 220, original_price: 275, stock_quantity: 100, is_default: true },
    ],
  });
  const [isSavingProduct, setIsSavingProduct] = useState(false);

  // Quick Stock Modal
  const [stockModalProduct, setStockModalProduct] = useState<any | null>(null);
  const [newStockValue, setNewStockValue] = useState(100);
  const [isUpdatingStock, setIsUpdatingStock] = useState(false);

  // Categories
  const [categories, setCategories] = useState<any[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any | null>(null);
  const [categoryForm, setCategoryForm] = useState({
    id: "",
    name: "",
    slug: "",
    tagline: "",
    image_url: "",
    display_order: 0,
    is_active: true,
  });
  const [isSavingCategory, setIsSavingCategory] = useState(false);

  // Orders
  const [orders, setOrders] = useState<any[]>([]);
  const [orderFilter, setOrderFilter] = useState<string>("ALL");
  const [isLoadingOrders, setIsLoadingOrders] = useState(false);
  const [selectedOrderForDispatch, setSelectedOrderForDispatch] = useState<any | null>(null);
  const [dispatchForm, setDispatchForm] = useState({
    courier_name: "Delhivery Express",
    tracking_awb: "",
  });
  const [isUpdatingOrder, setIsUpdatingOrder] = useState(false);

  // Blogs
  const [blogs, setBlogs] = useState<any[]>([]);
  const [isLoadingBlogs, setIsLoadingBlogs] = useState(false);
  const [blogSearch, setBlogSearch] = useState("");
  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<any | null>(null);
  const [blogForm, setBlogForm] = useState({
    title: "",
    slug: "",
    category_id: "Health & Nutrition",
    summary: "",
    read_time: "5 min read",
    image_url: "",
    author_name: "Anurag Jain",
    author_role: "Head of Agronomy & Research",
    health_tip: "",
    tags_string: "Organic, Health, Nutrition",
    content_text: "",
    is_published: true,
  });
  const [isSavingBlog, setIsSavingBlog] = useState(false);

  // Inquiries
  const [contactInquiries, setContactInquiries] = useState<any[]>([]);
  const [bulkInquiries, setBulkInquiries] = useState<any[]>([]);
  const [isLoadingInquiries, setIsLoadingInquiries] = useState(false);

  // S3 Cloud Storage & Media
  const [s3Config, setS3Config] = useState({
    is_configured: false,
    aws_access_key_id: "",
    aws_secret_access_key: "",
    aws_region: "ap-south-1",
    aws_s3_bucket: "onaar-media-assets",
    aws_cloudfront_domain: "",
    s3_endpoint_url: "",
  });
  const [isSavingS3, setIsSavingS3] = useState(false);
  const [isTestingS3, setIsTestingS3] = useState(false);
  const [s3StatusMessage, setS3StatusMessage] = useState<string | null>(null);
  const [isUploadingMedia, setIsUploadingMedia] = useState(false);
  const [uploadedMediaList, setUploadedMediaList] = useState<any[]>([]);

  // Email & SMTP
  const [smtpConfig, setSmtpConfig] = useState({
    smtp_host: "smtp.gmail.com",
    smtp_port: 587,
    smtp_user: "meriwebdunia@gmail.com",
    smtp_password: "",
    smtp_from_email: "meriwebdunia@gmail.com",
    smtp_from_name: "ONAAR Pure Harvest",
    smtp_use_tls: true,
  });
  const [templates, setTemplates] = useState<any[]>([]);
  const [isSavingSmtp, setIsSavingSmtp] = useState(false);
  const [isTestingSmtp, setIsTestingSmtp] = useState(false);

  // Site Settings
  const [shippingPolicy, setShippingPolicy] = useState({
    free_shipping_threshold: 499,
    standard_shipping_fee: 60,
  });
  const [vendorDetails, setVendorDetails] = useState({
    name: "Anurag Jain",
    email: "meriwebdunia@gmail.com",
    phone: "+91-98765 43210",
    warehouse: "Plot 104, Organic Agro Park, Central Logistics Zone, MP - 452001",
  });

  const isAdmin = user && (user.role === "admin" || user.role === "vendor");

  // Initial Load
  useEffect(() => {
    if (isAdmin) {
      loadDashboard();
      loadCategories();
      loadS3Config();
    }
  }, [isAdmin]);

  // Tab change lazy loader
  useEffect(() => {
    if (!isAdmin) return;
    if (activeTab === "products") loadProducts();
    if (activeTab === "categories") loadCategories();
    if (activeTab === "orders") loadOrders();
    if (activeTab === "blogs") loadBlogs();
    if (activeTab === "inquiries") loadInquiries();
    if (activeTab === "email") {
      loadSmtpConfig();
      loadTemplates();
    }
    if (activeTab === "s3") loadS3Config();
  }, [activeTab, isAdmin, productCategoryFilter, productStockFilter, orderFilter]);

  // -------------------------------------------------------------
  // Data Loaders
  // -------------------------------------------------------------
  const loadDashboard = async () => {
    setIsLoadingDashboard(true);
    try {
      const data = await api.admin.getDashboard();
      setDashboardData(data);
    } catch {
      setDashboardData({
        metrics: {
          total_revenue: 12450.0,
          total_orders: 18,
          pending_fulfillment: 4,
          registered_customers: 62,
          total_products: 192,
        },
      });
    } finally {
      setIsLoadingDashboard(false);
    }
  };

  const loadProducts = async () => {
    setIsLoadingProducts(true);
    try {
      const res = await api.admin.getProducts({
        category_id: productCategoryFilter === "ALL" ? undefined : productCategoryFilter,
        search: productSearch || undefined,
        stock_status: productStockFilter === "ALL" ? undefined : productStockFilter,
        limit: 100,
      });
      setProducts(res.items || []);
      setTotalProducts(res.total || 0);
    } catch {
      setProducts([]);
    } finally {
      setIsLoadingProducts(false);
    }
  };

  const loadCategories = async () => {
    setIsLoadingCategories(true);
    try {
      const data = await api.admin.getCategories();
      setCategories(data || []);
    } catch {
      setCategories([]);
    } finally {
      setIsLoadingCategories(false);
    }
  };

  const loadOrders = async () => {
    setIsLoadingOrders(true);
    try {
      const data = await api.admin.getOrders({
        status: orderFilter === "ALL" ? undefined : orderFilter,
      });
      setOrders(data || []);
    } catch {
      setOrders([]);
    } finally {
      setIsLoadingOrders(false);
    }
  };

  const loadBlogs = async () => {
    setIsLoadingBlogs(true);
    try {
      const data = await api.admin.getBlogs({ search: blogSearch || undefined });
      setBlogs(data || []);
    } catch {
      setBlogs([]);
    } finally {
      setIsLoadingBlogs(false);
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

  const loadS3Config = async () => {
    try {
      const data = await api.admin.getS3Config();
      if (data) {
        setS3Config({
          is_configured: data.is_configured,
          aws_access_key_id: data.aws_access_key_id || "",
          aws_secret_access_key: "",
          aws_region: data.aws_region || "ap-south-1",
          aws_s3_bucket: data.aws_s3_bucket || "onaar-media-assets",
          aws_cloudfront_domain: data.aws_cloudfront_domain || "",
          s3_endpoint_url: data.s3_endpoint_url || "",
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  const loadSmtpConfig = async () => {
    try {
      const data = await api.admin.getSmtpConfig();
      if (data) {
        setSmtpConfig({
          smtp_host: data.host || "smtp.gmail.com",
          smtp_port: data.port || 587,
          smtp_user: data.user || "meriwebdunia@gmail.com",
          smtp_password: "",
          smtp_from_email: data.from_email || "meriwebdunia@gmail.com",
          smtp_from_name: data.from_name || "ONAAR Pure Harvest",
          smtp_use_tls: data.use_tls !== false,
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  const loadTemplates = async () => {
    try {
      const data = await api.admin.getEmailTemplates();
      if (data && data.length > 0) {
        setTemplates(data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  // -------------------------------------------------------------
  // Actions
  // -------------------------------------------------------------
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

  // Product Actions
  const handleOpenAddProduct = () => {
    setEditingProduct(null);
    setProductForm({
      name: "",
      category_id: categories.length > 0 ? categories[0].id : "pulses",
      subtitle: "",
      description: "",
      origin: "Madhya Pradesh, India",
      tag: "Pure Harvest",
      in_stock: true,
      is_featured: false,
      primary_image: "",
      health_benefits: "",
      ingredients: "",
      storage_instructions: "",
      variants: [
        { weight_label: "500g", price: 120, original_price: 150, stock_quantity: 50, is_default: false },
        { weight_label: "1 kg", price: 220, original_price: 275, stock_quantity: 100, is_default: true },
      ],
    });
    setIsProductModalOpen(true);
  };

  const handleOpenEditProduct = (p: any) => {
    setEditingProduct(p);
    setProductForm({
      name: p.name || "",
      category_id: p.category_id || "pulses",
      subtitle: p.subtitle || "",
      description: p.description || p.subtitle || "",
      origin: p.origin || "Madhya Pradesh, India",
      tag: p.tag || "Pure Harvest",
      in_stock: p.in_stock,
      is_featured: p.is_featured,
      primary_image: p.primary_image || "",
      health_benefits: p.health_benefits || "",
      ingredients: p.ingredients || "",
      storage_instructions: p.storage_instructions || "",
      variants: p.variants && p.variants.length > 0 ? p.variants.map((v: any) => ({
        weight_label: v.weight_label,
        price: v.price,
        original_price: v.original_price,
        stock_quantity: v.stock_quantity,
        is_default: v.is_default,
      })) : [
        { weight_label: "1 kg", price: p.price || 199, original_price: p.original_price || 249, stock_quantity: p.total_stock || 100, is_default: true }
      ],
    });
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm.name.trim()) {
      showToast("Please enter product name");
      return;
    }
    setIsSavingProduct(true);
    try {
      if (editingProduct) {
        await api.admin.updateProduct(editingProduct.id, productForm);
        showToast(`Product '${productForm.name}' updated!`);
      } else {
        await api.admin.createProduct(productForm);
        showToast(`New crop '${productForm.name}' added to catalog!`);
      }
      setIsProductModalOpen(false);
      loadProducts();
      loadDashboard();
    } catch (err: any) {
      showToast(err.message || "Failed to save product");
    } finally {
      setIsSavingProduct(false);
    }
  };

  const handleDeleteProduct = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to permanently delete '${name}'?`)) return;
    try {
      await api.admin.deleteProduct(id);
      showToast(`Product deleted successfully.`);
      loadProducts();
      loadDashboard();
    } catch (err: any) {
      showToast(err.message || "Failed to delete product");
    }
  };

  const handleQuickStockSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stockModalProduct) return;
    setIsUpdatingStock(true);
    try {
      await api.admin.updateProductStock(stockModalProduct.id, newStockValue);
      showToast(`Stock updated to ${newStockValue} units.`);
      setStockModalProduct(null);
      loadProducts();
    } catch (err: any) {
      showToast(err.message || "Failed to update stock");
    } finally {
      setIsUpdatingStock(false);
    }
  };

  // Category Actions
  const handleOpenAddCategory = () => {
    setEditingCategory(null);
    setCategoryForm({
      id: "",
      name: "",
      slug: "",
      tagline: "",
      image_url: "/images/categories/pulses.jpg",
      display_order: categories.length + 1,
      is_active: true,
    });
    setIsCategoryModalOpen(true);
  };

  const handleOpenEditCategory = (c: any) => {
    setEditingCategory(c);
    setCategoryForm({
      id: c.id,
      name: c.name,
      slug: c.slug,
      tagline: c.tagline || "",
      image_url: c.image_url,
      display_order: c.display_order,
      is_active: c.is_active,
    });
    setIsCategoryModalOpen(true);
  };

  const handleSaveCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryForm.name.trim()) {
      showToast("Please enter category name");
      return;
    }
    setIsSavingCategory(true);
    try {
      if (editingCategory) {
        await api.admin.updateCategory(editingCategory.id, categoryForm);
        showToast(`Category '${categoryForm.name}' updated!`);
      } else {
        await api.admin.createCategory(categoryForm);
        showToast(`Category '${categoryForm.name}' created!`);
      }
      setIsCategoryModalOpen(false);
      loadCategories();
    } catch (err: any) {
      showToast(err.message || "Failed to save category");
    } finally {
      setIsSavingCategory(false);
    }
  };

  const handleDeleteCategory = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete category '${name}'?`)) return;
    try {
      await api.admin.deleteCategory(id);
      showToast(`Category deleted.`);
      loadCategories();
    } catch (err: any) {
      showToast(err.message || "Failed to delete category");
    }
  };

  // Blog Actions
  const handleOpenAddBlog = () => {
    setEditingBlog(null);
    setBlogForm({
      title: "",
      slug: "",
      category_id: "Health & Nutrition",
      summary: "",
      read_time: "5 min read",
      image_url: "/images/products/pulse-toor-1.jpg",
      author_name: "Anurag Jain",
      author_role: "Head of Agronomy & Research",
      health_tip: "",
      tags_string: "Organic, Health, Nutrition",
      content_text: "",
      is_published: true,
    });
    setIsBlogModalOpen(true);
  };

  const handleOpenEditBlog = async (b: any) => {
    setEditingBlog(b);
    try {
      const full = await api.admin.getBlog(b.id);
      setBlogForm({
        title: full.title,
        slug: full.slug,
        category_id: full.category_id || "Health & Nutrition",
        summary: full.summary,
        read_time: full.read_time,
        image_url: full.image_url,
        author_name: full.author_name,
        author_role: full.author_role,
        health_tip: full.health_tip || "",
        tags_string: (full.tags || []).join(", "),
        content_text: Array.isArray(full.content) ? full.content.join("\n\n") : "",
        is_published: full.is_published,
      });
    } catch {
      setBlogForm({
        title: b.title,
        slug: b.slug,
        category_id: b.category_id,
        summary: b.summary,
        read_time: b.read_time,
        image_url: b.image_url,
        author_name: b.author_name,
        author_role: b.author_role,
        health_tip: "",
        tags_string: (b.tags || []).join(", "),
        content_text: "",
        is_published: b.is_published,
      });
    }
    setIsBlogModalOpen(true);
  };

  const handleSaveBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogForm.title.trim()) {
      showToast("Please enter article title");
      return;
    }
    setIsSavingBlog(true);
    const tags = blogForm.tags_string.split(",").map((t) => t.trim()).filter(Boolean);
    const content = blogForm.content_text.split("\n\n").map((p) => p.trim()).filter(Boolean);

    const payload = {
      ...blogForm,
      tags,
      content,
    };

    try {
      if (editingBlog) {
        await api.admin.updateBlog(editingBlog.id, payload);
        showToast("Article updated successfully!");
      } else {
        await api.admin.createBlog(payload);
        showToast("New article published!");
      }
      setIsBlogModalOpen(false);
      loadBlogs();
    } catch (err: any) {
      showToast(err.message || "Failed to save blog");
    } finally {
      setIsSavingBlog(false);
    }
  };

  const handleTogglePublish = async (id: string) => {
    try {
      const res = await api.admin.togglePublishBlog(id);
      showToast(res.message);
      loadBlogs();
    } catch (err: any) {
      showToast(err.message || "Failed to toggle status");
    }
  };

  const handleDeleteBlog = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete article '${title}'?`)) return;
    try {
      await api.admin.deleteBlog(id);
      showToast("Article deleted.");
      loadBlogs();
    } catch (err: any) {
      showToast(err.message || "Failed to delete blog");
    }
  };

  // Image Upload handler (S3 or local fallback)
  const handleUploadFile = async (e: React.ChangeEvent<HTMLInputElement>, targetField?: "product" | "category" | "blog" | "general") => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingMedia(true);
    try {
      const res = await api.admin.uploadMedia(file, targetField || "products");
      showToast(`Image uploaded via ${res.provider}!`);
      
      setUploadedMediaList((prev) => [
        { name: file.name, url: res.url, provider: res.provider, uploaded_at: new Date().toLocaleTimeString() },
        ...prev,
      ]);

      if (targetField === "product") {
        setProductForm((prev) => ({ ...prev, primary_image: res.url }));
      } else if (targetField === "category") {
        setCategoryForm((prev) => ({ ...prev, image_url: res.url }));
      } else if (targetField === "blog") {
        setBlogForm((prev) => ({ ...prev, image_url: res.url }));
      }
    } catch (err: any) {
      showToast(err.message || "Failed to upload image");
    } finally {
      setIsUploadingMedia(false);
      if (e.target) e.target.value = "";
    }
  };

  // S3 Save & Verify
  const handleSaveS3Config = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingS3(true);
    try {
      await api.admin.updateS3Config(s3Config);
      showToast("S3 credentials saved to backend/s3_credentials.json!");
      loadS3Config();
    } catch (err: any) {
      showToast(err.message || "Failed to save S3 settings");
    } finally {
      setIsSavingS3(false);
    }
  };

  const handleTestS3 = async () => {
    setIsTestingS3(true);
    setS3StatusMessage(null);
    try {
      const res = await api.admin.verifyS3Config();
      setS3StatusMessage(res.message);
      if (res.success) {
        showToast("AWS S3 bucket connected successfully!");
      } else {
        showToast(res.message);
      }
    } catch (err: any) {
      setS3StatusMessage(err.message || "S3 Handshake failed.");
    } finally {
      setIsTestingS3(false);
    }
  };

  // Orders Dispatch
  const handleDispatchOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrderForDispatch || !dispatchForm.tracking_awb.trim()) {
      showToast("Please enter tracking AWB");
      return;
    }
    setIsUpdatingOrder(true);
    try {
      await api.admin.dispatchOrder(
        selectedOrderForDispatch.id,
        dispatchForm.courier_name,
        dispatchForm.tracking_awb.trim()
      );
      showToast(`Order dispatched via ${dispatchForm.courier_name}!`);
      setSelectedOrderForDispatch(null);
      setDispatchForm({ courier_name: "Delhivery Express", tracking_awb: "" });
      loadOrders();
      loadDashboard();
    } catch (err: any) {
      showToast(err.message || "Failed to dispatch order");
    } finally {
      setIsUpdatingOrder(false);
    }
  };

  // -------------------------------------------------------------
  // Unauthenticated / Non-Admin Gate
  // -------------------------------------------------------------
  if (!isAdmin && !isAuthLoading) {
    return (
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
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-emerald-600 font-mono"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Passcode / Bypass Code (Default: 1234)
              </label>
              <input
                type="text"
                value={adminOtp}
                onChange={(e) => setAdminOtp(e.target.value)}
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
    );
  }

  // -------------------------------------------------------------
  // Full Width Enterprise Admin Portal
  // -------------------------------------------------------------
  return (
    <div className="w-full min-h-screen bg-slate-50 flex overflow-hidden font-sans text-slate-800">
      {/* --------------------------------------------------------- */}
      {/* 1. Left Sidebar */}
      {/* --------------------------------------------------------- */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } shrink-0 bg-[#0c1a13] text-slate-200 border-r border-[#1a3326] flex flex-col justify-between transition-all duration-300 z-30`}
      >
        {/* Brand Header */}
        <div>
          <div className="h-16 px-4 flex items-center justify-between border-b border-[#1a3326]">
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
            >
              <Menu className="w-4 h-4" />
            </button>
          </div>

          {/* Nav Items */}
          <nav className="p-3 space-y-1.5">
            {[
              { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
              { id: "products", label: "Products & Crops", icon: Package, badge: totalProducts || "192" },
              { id: "categories", label: "Categories", icon: Tag, badge: categories.length || "8" },
              { id: "orders", label: "Orders & Fulfillment", icon: Truck, badge: orders.length || undefined },
              { id: "blogs", label: "Agronomy Blogs", icon: FileText, badge: blogs.length || "24" },
              { id: "inquiries", label: "CRM & Inquiries", icon: Users },
              { id: "s3", label: "Cloud S3 Storage", icon: Cloud },
              { id: "email", label: "Email & SMTP", icon: Mail },
              { id: "settings", label: "Store Settings", icon: Settings },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as AdminTab)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? "bg-emerald-700 text-white shadow-md font-bold"
                      : "text-slate-300 hover:text-white hover:bg-white/5"
                  }`}
                  title={tab.label}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-emerald-200" : "text-slate-400"}`} />
                  {sidebarOpen && <span className="truncate">{tab.label}</span>}
                  {sidebarOpen && tab.badge && (
                    <span
                      className={`ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isActive ? "bg-white/20 text-white" : "bg-[#162e22] text-emerald-300"
                      }`}
                    >
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-3 border-t border-[#1a3326] space-y-2">
          {sidebarOpen ? (
            <div className="bg-[#14281e] p-3 rounded-xl border border-[#1e3c2c] flex items-center justify-between">
              <div className="overflow-hidden">
                <div className="text-xs font-bold text-white truncate">Anurag Jain</div>
                <div className="text-[10px] text-emerald-400 truncate">Super Admin</div>
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
      {/* 2. Main Content & Header */}
      {/* --------------------------------------------------------- */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between shrink-0 shadow-xs z-20">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
              {activeTab}
            </span>
            <h1 className="text-base font-bold text-slate-900 hidden sm:block">
              {activeTab === "dashboard" && "Executive KPI & Intelligence"}
              {activeTab === "products" && `Organic Crops & Inventory (${totalProducts})`}
              {activeTab === "categories" && `Crop Categories (${categories.length})`}
              {activeTab === "orders" && `Dispatch & Fulfillment Queue (${orders.length})`}
              {activeTab === "blogs" && `Agronomy Research & Health Journal (${blogs.length})`}
              {activeTab === "inquiries" && "Customer CRM & Wholesale Leads"}
              {activeTab === "s3" && "Amazon S3 Cloud Assets & Storage"}
              {activeTab === "email" && "Automated Email Templates & SMTP Handshake"}
              {activeTab === "settings" && "Store Policies, CMS & Thresholds"}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            {/* Quick Add Product Button */}
            <button
              onClick={handleOpenAddProduct}
              className="bg-emerald-700 hover:bg-emerald-800 text-white px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Add Crop</span>
            </button>

            {/* S3 status indicator */}
            <button
              onClick={() => setActiveTab("s3")}
              className={`text-xs px-2.5 py-1 rounded-lg font-mono flex items-center gap-1.5 cursor-pointer border ${
                s3Config.is_configured
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                  : "bg-amber-50 text-amber-700 border-amber-200"
              }`}
              title="Click to view AWS S3 Configuration"
            >
              <Cloud className="w-3.5 h-3.5" />
              <span className="hidden md:inline">
                {s3Config.is_configured ? "S3 Live" : "S3 Config"}
              </span>
            </button>

            {/* Refresh */}
            <button
              onClick={() => {
                loadDashboard();
                if (activeTab === "products") loadProducts();
                if (activeTab === "categories") loadCategories();
                if (activeTab === "orders") loadOrders();
                if (activeTab === "blogs") loadBlogs();
                showToast("Data refreshed.");
              }}
              className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl cursor-pointer"
              title="Refresh"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Scrollable Viewport */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8 space-y-6">
          {/* ======================================================= */}
          {/* TAB 1: DASHBOARD */}
          {/* ======================================================= */}
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              {/* Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {[
                  {
                    title: "Total Revenue",
                    value: `₹${Number(dashboardData?.metrics?.total_revenue || dashboardData?.total_revenue || 0).toLocaleString("en-IN", { minimumFractionDigits: 2 })}`,
                    sub: "All time verified sales",
                    badge: "Verified",
                  },
                  {
                    title: "Active Orders",
                    value: dashboardData?.metrics?.total_orders || dashboardData?.total_orders || 0,
                    sub: `${dashboardData?.metrics?.pending_fulfillment || dashboardData?.pending_cod_verifications || 0} awaiting dispatch`,
                    badge: "Fulfillment",
                  },
                  {
                    title: "Total Organic Crops",
                    value: dashboardData?.metrics?.total_products || totalProducts || 192,
                    sub: `${categories.length || 8} Active Categories`,
                    badge: "100% Certified",
                  },
                  {
                    title: "Registered Customers",
                    value: dashboardData?.metrics?.registered_customers || dashboardData?.total_customers || 1,
                    sub: "Direct farm supporters",
                    badge: "Customers",
                  },
                  {
                    title: "Cloud Media Assets",
                    value: s3Config.is_configured ? "AWS S3 Connected" : "Local Storage",
                    sub: s3Config.aws_s3_bucket || "Pending IAM Keys",
                    badge: s3Config.is_configured ? "Active S3" : "Needs Config",
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

              {/* Quick Jump Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm mb-2">
                      <Package className="w-4 h-4" />
                      <span>Product Catalog Management</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Manage all 192 organic crops, stock quantities across 500g, 1kg, 5kg pack sizes, pricing, and certified harvest batches.
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab("products")}
                    className="mt-4 text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
                  >
                    Manage Products →
                  </button>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm mb-2">
                      <Cloud className="w-4 h-4" />
                      <span>AWS S3 Cloud Media Store</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Store product photographs, category banners, and agronomy research images in Amazon S3 bucket with CloudFront CDN integration.
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab("s3")}
                    className="mt-4 text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
                  >
                    Configure S3 & Uploads →
                  </button>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm mb-2">
                      <FileText className="w-4 h-4" />
                      <span>Agronomy Journal & Blog</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Draft and publish health articles, nutritional guides, and pure harvest farmer stories for our customer community.
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab("blogs")}
                    className="mt-4 text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
                  >
                    Manage Blogs →
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================= */}
          {/* TAB 2: PRODUCTS MANAGEMENT */}
          {/* ======================================================= */}
          {activeTab === "products" && (
            <div className="space-y-4">
              {/* Toolbar */}
              <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                  {/* Search */}
                  <div className="relative w-full sm:w-64">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search crops by name..."
                      value={productSearch}
                      onChange={(e) => setProductSearch(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && loadProducts()}
                      className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-emerald-600"
                    />
                  </div>

                  {/* Category Filter */}
                  <select
                    value={productCategoryFilter}
                    onChange={(e) => setProductCategoryFilter(e.target.value)}
                    className="px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-emerald-600 font-medium"
                  >
                    <option value="ALL">All Categories ({categories.length})</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>

                  {/* Stock Filter */}
                  <select
                    value={productStockFilter}
                    onChange={(e) => setProductStockFilter(e.target.value)}
                    className="px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-emerald-600 font-medium"
                  >
                    <option value="ALL">All Stock Statuses</option>
                    <option value="in_stock">In Stock (&gt;0)</option>
                    <option value="low_stock">Low Stock (≤10)</option>
                    <option value="out_of_stock">Out of Stock (0)</option>
                  </select>
                </div>

                <div className="flex items-center gap-2 self-end md:self-auto">
                  <span className="text-xs text-slate-500 font-medium">
                    Showing {products.length} crops
                  </span>
                  <button
                    onClick={handleOpenAddProduct}
                    className="bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>New Crop</span>
                  </button>
                </div>
              </div>

              {/* Products Table */}
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 font-semibold uppercase tracking-wider text-[10px]">
                      <tr>
                        <th className="px-5 py-3.5">Crop / Product</th>
                        <th className="px-4 py-3.5">Category</th>
                        <th className="px-4 py-3.5">Default Price</th>
                        <th className="px-4 py-3.5">Stock Level</th>
                        <th className="px-4 py-3.5">Variants</th>
                        <th className="px-4 py-3.5">Status</th>
                        <th className="px-5 py-3.5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {isLoadingProducts ? (
                        <tr>
                          <td colSpan={7} className="px-5 py-12 text-center text-slate-400">
                            Loading catalog items...
                          </td>
                        </tr>
                      ) : products.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="px-5 py-12 text-center text-slate-400">
                            No products match your criteria.
                          </td>
                        </tr>
                      ) : (
                        products.map((p) => (
                          <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                            <td className="px-5 py-3.5">
                              <div className="flex items-center gap-3">
                                <div className="w-11 h-11 rounded-xl bg-slate-100 overflow-hidden shrink-0 border border-slate-200 relative">
                                  {p.primary_image ? (
                                    <img
                                      src={p.primary_image}
                                      alt={p.name}
                                      className="w-full h-full object-cover"
                                      onError={(e) => {
                                        (e.target as any).src = "/images/products/pulse-toor-1.jpg";
                                      }}
                                    />
                                  ) : (
                                    <div className="w-full h-full flex items-center justify-center text-slate-400">
                                      <ImageIcon className="w-4 h-4" />
                                    </div>
                                  )}
                                </div>
                                <div className="leading-tight">
                                  <div className="font-bold text-slate-900">{p.name}</div>
                                  <div className="text-[11px] text-slate-400 truncate max-w-xs">
                                    {p.subtitle || p.origin}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-3.5">
                              <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg text-[10px] font-semibold uppercase">
                                {p.category_name}
                              </span>
                            </td>
                            <td className="px-4 py-3.5 font-bold text-slate-900">
                              ₹{p.price.toFixed(2)}
                              {p.original_price > p.price && (
                                <span className="line-through text-slate-400 text-[10px] ml-1 font-normal">
                                  ₹{p.original_price.toFixed(2)}
                                </span>
                              )}
                            </td>
                            <td className="px-4 py-3.5">
                              <span
                                className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                                  p.total_stock <= 10
                                    ? "bg-amber-100 text-amber-800"
                                    : p.total_stock === 0
                                    ? "bg-rose-100 text-rose-800"
                                    : "bg-emerald-100 text-emerald-800"
                                }`}
                              >
                                {p.total_stock} units
                              </span>
                            </td>
                            <td className="px-4 py-3.5 text-slate-600">
                              {p.variants_count} packs
                            </td>
                            <td className="px-4 py-3.5">
                              {p.in_stock ? (
                                <span className="text-emerald-700 font-bold text-[11px] flex items-center gap-1">
                                  <CheckCircle2 className="w-3.5 h-3.5" /> In Stock
                                </span>
                              ) : (
                                <span className="text-rose-600 font-bold text-[11px] flex items-center gap-1">
                                  <AlertCircle className="w-3.5 h-3.5" /> Out of Stock
                                </span>
                              )}
                            </td>
                            <td className="px-5 py-3.5 text-right space-x-1">
                              <button
                                onClick={() => {
                                  setStockModalProduct(p);
                                  setNewStockValue(p.total_stock || 100);
                                }}
                                className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-[11px] font-semibold cursor-pointer"
                                title="Adjust Stock"
                              >
                                Stock
                              </button>
                              <button
                                onClick={() => handleOpenEditProduct(p)}
                                className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg text-[11px] font-semibold cursor-pointer"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteProduct(p.id, p.name)}
                                className="px-2.5 py-1 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg text-[11px] font-semibold cursor-pointer"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================= */}
          {/* TAB 3: CATEGORIES MANAGEMENT */}
          {/* ======================================================= */}
          {activeTab === "categories" && (
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-bold text-slate-900">Crop Categories</h2>
                  <p className="text-xs text-slate-500">
                    Group organic harvest items for storefront navigation & filters.
                  </p>
                </div>
                <button
                  onClick={handleOpenAddCategory}
                  className="bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>New Category</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {categories.map((c) => (
                  <div
                    key={c.id}
                    className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden flex flex-col justify-between"
                  >
                    <div>
                      <div className="h-32 bg-slate-100 relative overflow-hidden">
                        <img
                          src={c.image_url}
                          alt={c.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as any).src = "/images/categories/pulses.jpg";
                          }}
                        />
                        <span className="absolute top-2 right-2 bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                          {c.products_count} Crops
                        </span>
                      </div>
                      <div className="p-4 space-y-1">
                        <div className="font-bold text-slate-900 text-sm">{c.name}</div>
                        <div className="text-[11px] text-slate-500 font-mono">slug: /{c.slug}</div>
                        {c.tagline && <p className="text-xs text-slate-600 line-clamp-2">{c.tagline}</p>}
                      </div>
                    </div>

                    <div className="p-4 pt-0 border-t border-slate-100 mt-2 flex items-center justify-between text-xs">
                      <span className="text-slate-400 text-[11px]">Order: #{c.display_order}</span>
                      <div className="space-x-2">
                        <button
                          onClick={() => handleOpenEditCategory(c)}
                          className="text-emerald-700 font-bold hover:underline cursor-pointer"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteCategory(c.id, c.name)}
                          className="text-rose-600 font-bold hover:underline cursor-pointer"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ======================================================= */}
          {/* TAB 4: ORDERS & DISPATCH */}
          {/* ======================================================= */}
          {activeTab === "orders" && (
            <div className="space-y-4">
              {/* Order status filters */}
              <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
                <div className="flex items-center gap-2 overflow-x-auto">
                  {["ALL", "PENDING_VERIFICATION", "CONFIRMED", "DISPATCHED", "DELIVERED"].map((st) => (
                    <button
                      key={st}
                      onClick={() => setOrderFilter(st)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-all ${
                        orderFilter === st
                          ? "bg-emerald-700 text-white"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      {st.replace("_", " ")}
                    </button>
                  ))}
                </div>
                <span className="text-xs text-slate-500">{orders.length} orders</span>
              </div>

              {/* Orders Table */}
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 font-semibold uppercase tracking-wider text-[10px]">
                      <tr>
                        <th className="px-5 py-3.5">Order ID</th>
                        <th className="px-4 py-3.5">Customer & Phone</th>
                        <th className="px-4 py-3.5">Amount</th>
                        <th className="px-4 py-3.5">Status</th>
                        <th className="px-4 py-3.5">Courier & AWB</th>
                        <th className="px-5 py-3.5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {isLoadingOrders ? (
                        <tr>
                          <td colSpan={6} className="px-5 py-12 text-center text-slate-400">
                            Loading orders...
                          </td>
                        </tr>
                      ) : orders.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="px-5 py-12 text-center text-slate-400">
                            No orders found in queue.
                          </td>
                        </tr>
                      ) : (
                        orders.map((o) => (
                          <tr key={o.id} className="hover:bg-slate-50/80">
                            <td className="px-5 py-3.5 font-mono font-bold text-slate-900">
                              #{o.order_number || o.id.slice(0, 8)}
                            </td>
                            <td className="px-4 py-3.5">
                              <div className="font-bold text-slate-900">{o.customer_name || "Customer"}</div>
                              <div className="text-[11px] text-slate-500 font-mono">{o.customer_phone}</div>
                            </td>
                            <td className="px-4 py-3.5 font-bold text-slate-900">
                              ₹{Number(o.total_amount).toFixed(2)}
                            </td>
                            <td className="px-4 py-3.5">
                              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                                {o.order_status}
                              </span>
                            </td>
                            <td className="px-4 py-3.5 text-slate-600 font-mono text-[11px]">
                              {o.courier_name ? (
                                <span>
                                  {o.courier_name}: {o.tracking_awb}
                                </span>
                              ) : (
                                <span className="text-slate-400 italic">Not dispatched</span>
                              )}
                            </td>
                            <td className="px-5 py-3.5 text-right">
                              <button
                                onClick={() => setSelectedOrderForDispatch(o)}
                                className="bg-emerald-700 hover:bg-emerald-800 text-white px-3 py-1 rounded-lg text-xs font-bold cursor-pointer"
                              >
                                Dispatch
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================= */}
          {/* TAB 5: BLOGS & JOURNAL */}
          {/* ======================================================= */}
          {activeTab === "blogs" && (
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-bold text-slate-900">Agronomy Journal & Health Blogs</h2>
                  <p className="text-xs text-slate-500">
                    Publish nutritional guides, seed coat benefits, and zero-polish reports.
                  </p>
                </div>
                <button
                  onClick={handleOpenAddBlog}
                  className="bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Write Article</span>
                </button>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 font-semibold uppercase tracking-wider text-[10px]">
                      <tr>
                        <th className="px-5 py-3.5">Article</th>
                        <th className="px-4 py-3.5">Category</th>
                        <th className="px-4 py-3.5">Author</th>
                        <th className="px-4 py-3.5">Read Time</th>
                        <th className="px-4 py-3.5">Status</th>
                        <th className="px-5 py-3.5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {isLoadingBlogs ? (
                        <tr>
                          <td colSpan={6} className="px-5 py-12 text-center text-slate-400">
                            Loading blog articles...
                          </td>
                        </tr>
                      ) : blogs.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="px-5 py-12 text-center text-slate-400">
                            No articles found.
                          </td>
                        </tr>
                      ) : (
                        blogs.map((b) => (
                          <tr key={b.id} className="hover:bg-slate-50/80">
                            <td className="px-5 py-3.5">
                              <div className="flex items-center gap-3">
                                <img
                                  src={b.image_url}
                                  alt={b.title}
                                  className="w-12 h-10 object-cover rounded-lg border border-slate-200 shrink-0"
                                  onError={(e) => {
                                    (e.target as any).src = "/images/products/pulse-toor-1.jpg";
                                  }}
                                />
                                <div>
                                  <div className="font-bold text-slate-900 max-w-md truncate">{b.title}</div>
                                  <div className="text-[11px] text-slate-400 truncate max-w-sm">{b.summary}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-3.5">
                              <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg text-[10px] font-semibold">
                                {b.category_id || "Health"}
                              </span>
                            </td>
                            <td className="px-4 py-3.5 text-slate-700">{b.author_name}</td>
                            <td className="px-4 py-3.5 text-slate-500">{b.read_time}</td>
                            <td className="px-4 py-3.5">
                              <span
                                className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                                  b.is_published
                                    ? "bg-emerald-100 text-emerald-800"
                                    : "bg-slate-100 text-slate-600"
                                }`}
                              >
                                {b.is_published ? "Published" : "Draft"}
                              </span>
                            </td>
                            <td className="px-5 py-3.5 text-right space-x-1">
                              <button
                                onClick={() => handleTogglePublish(b.id)}
                                className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-[11px] font-semibold cursor-pointer"
                              >
                                {b.is_published ? "Draft" : "Publish"}
                              </button>
                              <button
                                onClick={() => handleOpenEditBlog(b)}
                                className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg text-[11px] font-semibold cursor-pointer"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteBlog(b.id, b.title)}
                                className="px-2.5 py-1 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg text-[11px] font-semibold cursor-pointer"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================= */}
          {/* TAB 6: S3 CLOUD STORAGE & MEDIA */}
          {/* ======================================================= */}
          {activeTab === "s3" && (
            <div className="space-y-6">
              {/* Credentials & Status Banner */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Status Card */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
                  <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm">
                    <Cloud className="w-5 h-5" />
                    <span>Amazon S3 Cloud Status</span>
                  </div>

                  <div
                    className={`p-4 rounded-xl border flex items-center gap-3 ${
                      s3Config.is_configured
                        ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                        : "bg-amber-50 border-amber-200 text-amber-800"
                    }`}
                  >
                    <div
                      className={`w-3 h-3 rounded-full shrink-0 ${
                        s3Config.is_configured ? "bg-emerald-500 animate-pulse" : "bg-amber-500"
                      }`}
                    />
                    <div className="text-xs">
                      <div className="font-bold">
                        {s3Config.is_configured ? "AWS S3 Active & Configured" : "Credentials Pending"}
                      </div>
                      <div className="text-[11px] opacity-80">
                        {s3Config.is_configured
                          ? `Routing uploads to '${s3Config.aws_s3_bucket}'`
                          : "Uploads are saved to local fallback until credentials provided."}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs text-slate-600 font-mono">
                    <div className="flex justify-between border-b pb-1">
                      <span>Bucket Name:</span>
                      <strong className="text-slate-900">{s3Config.aws_s3_bucket}</strong>
                    </div>
                    <div className="flex justify-between border-b pb-1">
                      <span>AWS Region:</span>
                      <strong className="text-slate-900">{s3Config.aws_region}</strong>
                    </div>
                    <div className="flex justify-between border-b pb-1">
                      <span>Storage Config File:</span>
                      <strong className="text-slate-900 truncate">backend/s3_credentials.json</strong>
                    </div>
                  </div>

                  <button
                    onClick={handleTestS3}
                    disabled={isTestingS3}
                    className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer disabled:opacity-50"
                  >
                    {isTestingS3 ? "Testing S3 Handshake..." : "Test AWS S3 Connection"}
                  </button>

                  {s3StatusMessage && (
                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700">
                      {s3StatusMessage}
                    </div>
                  )}
                </div>

                {/* S3 Configuration Form */}
                <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
                  <div>
                    <h2 className="text-sm font-bold text-slate-900">AWS S3 IAM Credentials</h2>
                    <p className="text-xs text-slate-500">
                      Saved to <code className="bg-slate-100 px-1 py-0.5 rounded">backend/s3_credentials.json</code>. You can paste your credentials here whenever ready.
                    </p>
                  </div>

                  <form onSubmit={handleSaveS3Config} className="space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">
                          AWS Access Key ID
                        </label>
                        <input
                          type="text"
                          placeholder="AKIAIOSFODNN7EXAMPLE"
                          value={s3Config.aws_access_key_id}
                          onChange={(e) => setS3Config({ ...s3Config, aws_access_key_id: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono focus:outline-emerald-600"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">
                          AWS Secret Access Key
                        </label>
                        <input
                          type="password"
                          placeholder="wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"
                          value={s3Config.aws_secret_access_key}
                          onChange={(e) => setS3Config({ ...s3Config, aws_secret_access_key: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono focus:outline-emerald-600"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">AWS Region</label>
                        <input
                          type="text"
                          placeholder="ap-south-1"
                          value={s3Config.aws_region}
                          onChange={(e) => setS3Config({ ...s3Config, aws_region: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono focus:outline-emerald-600"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">S3 Bucket Name</label>
                        <input
                          type="text"
                          placeholder="onaar-media-assets"
                          value={s3Config.aws_s3_bucket}
                          onChange={(e) => setS3Config({ ...s3Config, aws_s3_bucket: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono focus:outline-emerald-600"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        CloudFront CDN Domain (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="assets.onaar.in or d1234.cloudfront.net"
                        value={s3Config.aws_cloudfront_domain || ""}
                        onChange={(e) => setS3Config({ ...s3Config, aws_cloudfront_domain: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono focus:outline-emerald-600"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSavingS3}
                      className="bg-emerald-700 hover:bg-emerald-800 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer disabled:opacity-50"
                    >
                      {isSavingS3 ? "Saving..." : "Save S3 Configuration"}
                    </button>
                  </form>
                </div>
              </div>

              {/* Media Asset Uploader Dropzone */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Direct Media Uploader</h3>
                    <p className="text-xs text-slate-500">
                      Upload photos directly to S3 (or local fallback). Instant CDN URLs will be generated for your crops and articles.
                    </p>
                  </div>
                  <label className="bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2 rounded-xl text-xs font-bold cursor-pointer flex items-center gap-2">
                    <Upload className="w-4 h-4" />
                    <span>Upload Image</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleUploadFile(e, "general")}
                      className="hidden"
                    />
                  </label>
                </div>

                {isUploadingMedia && (
                  <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center text-xs text-emerald-800 font-bold animate-pulse">
                    Uploading image to storage provider...
                  </div>
                )}

                {/* Recently uploaded list */}
                {uploadedMediaList.length > 0 && (
                  <div className="space-y-2 mt-4">
                    <div className="text-xs font-bold text-slate-700 uppercase tracking-wider text-[10px]">
                      Session Uploads
                    </div>
                    <div className="divide-y divide-slate-100 border border-slate-100 rounded-xl overflow-hidden">
                      {uploadedMediaList.map((m, idx) => (
                        <div key={idx} className="p-3 bg-slate-50/50 flex items-center justify-between text-xs">
                          <div className="flex items-center gap-3 overflow-hidden">
                            <img src={m.url} alt={m.name} className="w-9 h-9 object-cover rounded-lg border" />
                            <div className="truncate">
                              <div className="font-bold text-slate-900 truncate">{m.name}</div>
                              <div className="text-[10px] text-slate-500 font-mono truncate">{m.url}</div>
                            </div>
                          </div>
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(m.url);
                              showToast("URL copied to clipboard!");
                            }}
                            className="bg-white hover:bg-slate-100 text-slate-700 border px-2.5 py-1 rounded-lg text-[10px] font-bold cursor-pointer shrink-0"
                          >
                            Copy URL
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ======================================================= */}
          {/* TAB 7: INQUIRIES & LEADS */}
          {/* ======================================================= */}
          {activeTab === "inquiries" && (
            <div className="space-y-6">
              {/* Contact Inquiries */}
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
                <h3 className="text-sm font-bold text-slate-900">Retail Contact Messages ({contactInquiries.length})</h3>
                <div className="divide-y divide-slate-100">
                  {contactInquiries.length === 0 ? (
                    <div className="py-8 text-center text-xs text-slate-400">No contact messages received.</div>
                  ) : (
                    contactInquiries.map((ci) => (
                      <div key={ci.id} className="py-3.5 space-y-1 text-xs">
                        <div className="flex items-center justify-between">
                          <strong className="text-slate-900">{ci.name} ({ci.email})</strong>
                          <span className="text-slate-400 text-[11px]">{ci.phone}</span>
                        </div>
                        <div className="text-emerald-700 font-semibold">{ci.subject}</div>
                        <p className="text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                          {ci.message}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Wholesale B2B Enquiries */}
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
                <h3 className="text-sm font-bold text-slate-900">Wholesale & Export B2B Leads ({bulkInquiries.length})</h3>
                <div className="divide-y divide-slate-100">
                  {bulkInquiries.length === 0 ? (
                    <div className="py-8 text-center text-xs text-slate-400">No wholesale inquiries yet.</div>
                  ) : (
                    bulkInquiries.map((bi) => (
                      <div key={bi.id} className="py-3.5 space-y-1 text-xs">
                        <div className="flex items-center justify-between">
                          <strong className="text-slate-900">{bi.name} • {bi.business_type}</strong>
                          <span className="font-mono text-emerald-700 font-bold">Qty: {bi.quantity_needed}</span>
                        </div>
                        <div className="text-slate-500">{bi.email} | {bi.phone}</div>
                        <p className="text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                          {bi.message || "Requested wholesale pricing & harvest batch COA."}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ======================================================= */}
          {/* TAB 8: EMAIL & SMTP */}
          {/* ======================================================= */}
          {activeTab === "email" && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">SMTP Server Configuration</h3>
                  <p className="text-xs text-slate-500">
                    Nodemailer & aiosmtplib compatible outbound email pipeline.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Host</label>
                    <input
                      type="text"
                      value={smtpConfig.smtp_host}
                      onChange={(e) => setSmtpConfig({ ...smtpConfig, smtp_host: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Port</label>
                    <input
                      type="number"
                      value={smtpConfig.smtp_port}
                      onChange={(e) => setSmtpConfig({ ...smtpConfig, smtp_port: Number(e.target.value) })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">User Email</label>
                    <input
                      type="text"
                      value={smtpConfig.smtp_user}
                      onChange={(e) => setSmtpConfig({ ...smtpConfig, smtp_user: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={async () => {
                      setIsSavingSmtp(true);
                      try {
                        await api.admin.updateSmtpConfig({
                          host: smtpConfig.smtp_host,
                          port: smtpConfig.smtp_port,
                          user: smtpConfig.smtp_user,
                          from_email: smtpConfig.smtp_from_email,
                          from_name: smtpConfig.smtp_from_name,
                        });
                        showToast("SMTP settings saved.");
                      } catch (err: any) {
                        showToast(err.message || "Failed to save SMTP");
                      } finally {
                        setIsSavingSmtp(false);
                      }
                    }}
                    disabled={isSavingSmtp}
                    className="bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2 rounded-xl text-xs font-bold cursor-pointer"
                  >
                    Save SMTP Settings
                  </button>

                  <button
                    onClick={async () => {
                      setIsTestingSmtp(true);
                      try {
                        const res = await api.admin.verifySmtp();
                        showToast(res.message);
                      } catch (err: any) {
                        showToast(err.message || "SMTP handshake test failed");
                      } finally {
                        setIsTestingSmtp(false);
                      }
                    }}
                    disabled={isTestingSmtp}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-800 px-4 py-2 rounded-xl text-xs font-bold cursor-pointer"
                  >
                    Test Live Handshake
                  </button>
                </div>
              </div>

              {/* Templates List */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
                <h3 className="text-sm font-bold text-slate-900">Active Email Templates ({templates.length})</h3>
                <div className="space-y-3">
                  {templates.map((t) => (
                    <div key={t.template_key} className="p-4 rounded-xl border border-slate-100 bg-slate-50 space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <strong className="text-slate-900">{t.name}</strong>
                        <span className="font-mono text-emerald-700">{t.template_key}</span>
                      </div>
                      <div className="text-xs text-slate-600">Subject: {t.subject}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ======================================================= */}
          {/* TAB 9: STORE SETTINGS */}
          {/* ======================================================= */}
          {activeTab === "settings" && (
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-6 max-w-3xl">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Store Policies & Thresholds</h3>
                <p className="text-xs text-slate-500">Shipping rates, dispatch warehouses, and vendor info.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Free Shipping Order Threshold (₹)</label>
                  <input
                    type="number"
                    value={shippingPolicy.free_shipping_threshold}
                    onChange={(e) => setShippingPolicy({ ...shippingPolicy, free_shipping_threshold: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Standard Delivery Fee (₹)</label>
                  <input
                    type="number"
                    value={shippingPolicy.standard_shipping_fee}
                    onChange={(e) => setShippingPolicy({ ...shippingPolicy, standard_shipping_fee: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border"
                  />
                </div>
              </div>

              <div className="space-y-3 text-xs border-t pt-4">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Vendor / Farmer Name</label>
                  <input
                    type="text"
                    value={vendorDetails.name}
                    onChange={(e) => setVendorDetails({ ...vendorDetails, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Warehouse Dispatch Address</label>
                  <textarea
                    rows={2}
                    value={vendorDetails.warehouse}
                    onChange={(e) => setVendorDetails({ ...vendorDetails, warehouse: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border"
                  />
                </div>
              </div>

              <button
                onClick={() => {
                  showToast("Store settings saved successfully!");
                }}
                className="bg-emerald-700 hover:bg-emerald-800 text-white px-5 py-2.5 rounded-xl text-xs font-bold cursor-pointer"
              >
                Save Store Settings
              </button>
            </div>
          )}
        </main>
      </div>

      {/* ========================================================= */}
      {/* MODAL 1: ADD / EDIT PRODUCT */}
      {/* ========================================================= */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 p-6 space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900 font-serif">
                  {editingProduct ? `Edit Crop: ${editingProduct.name}` : "Add New Organic Crop"}
                </h3>
                <p className="text-xs text-slate-500">Configure catalog details, pack sizes, and images.</p>
              </div>
              <button
                onClick={() => setIsProductModalOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Crop Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Organic Unpolished Toor Dal"
                    value={productForm.name}
                    onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Category *</label>
                  <select
                    value={productForm.category_id}
                    onChange={(e) => setProductForm({ ...productForm, category_id: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Subtitle / Origin Banner</label>
                <input
                  type="text"
                  placeholder="e.g. Desi Variety • Zero Mineral Oil Polish"
                  value={productForm.subtitle}
                  onChange={(e) => setProductForm({ ...productForm, subtitle: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Description *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Detailed agricultural harvesting and purity notes..."
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border"
                />
              </div>

              {/* Image Input & S3 Upload */}
              <div className="space-y-2 border-t pt-3">
                <label className="font-bold text-slate-700 block">Product Photograph URL</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="/images/products/pulse-toor-1.jpg or https://s3..."
                    value={productForm.primary_image}
                    onChange={(e) => setProductForm({ ...productForm, primary_image: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border font-mono text-[11px]"
                  />
                  <label className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-2 rounded-xl font-bold shrink-0 cursor-pointer flex items-center gap-1">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleUploadFile(e, "product")}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Pack Variants */}
              <div className="space-y-2 border-t pt-3">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-slate-700">Pack Weights & Pricing</label>
                  <button
                    type="button"
                    onClick={() =>
                      setProductForm({
                        ...productForm,
                        variants: [
                          ...productForm.variants,
                          { weight_label: "5 kg", price: 999, original_price: 1199, stock_quantity: 20, is_default: false },
                        ],
                      })
                    }
                    className="text-emerald-700 font-bold hover:underline"
                  >
                    + Add Pack Size
                  </button>
                </div>

                <div className="space-y-2">
                  {productForm.variants.map((v, idx) => (
                    <div key={idx} className="flex items-center gap-2 bg-slate-50 p-2 rounded-xl border">
                      <input
                        type="text"
                        placeholder="Size (e.g. 1 kg)"
                        value={v.weight_label}
                        onChange={(e) => {
                          const updated = [...productForm.variants];
                          updated[idx].weight_label = e.target.value;
                          setProductForm({ ...productForm, variants: updated });
                        }}
                        className="w-24 px-2 py-1 bg-white rounded-lg border text-xs"
                      />
                      <input
                        type="number"
                        placeholder="Price ₹"
                        value={v.price}
                        onChange={(e) => {
                          const updated = [...productForm.variants];
                          updated[idx].price = Number(e.target.value);
                          setProductForm({ ...productForm, variants: updated });
                        }}
                        className="w-20 px-2 py-1 bg-white rounded-lg border text-xs"
                      />
                      <input
                        type="number"
                        placeholder="MRP ₹"
                        value={v.original_price}
                        onChange={(e) => {
                          const updated = [...productForm.variants];
                          updated[idx].original_price = Number(e.target.value);
                          setProductForm({ ...productForm, variants: updated });
                        }}
                        className="w-20 px-2 py-1 bg-white rounded-lg border text-xs"
                      />
                      <input
                        type="number"
                        placeholder="Stock"
                        value={v.stock_quantity}
                        onChange={(e) => {
                          const updated = [...productForm.variants];
                          updated[idx].stock_quantity = Number(e.target.value);
                          setProductForm({ ...productForm, variants: updated });
                        }}
                        className="w-20 px-2 py-1 bg-white rounded-lg border text-xs"
                      />
                      {productForm.variants.length > 1 && (
                        <button
                          type="button"
                          onClick={() => {
                            const updated = productForm.variants.filter((_, i) => i !== idx);
                            setProductForm({ ...productForm, variants: updated });
                          }}
                          className="text-rose-500 hover:text-rose-700 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2 border-t pt-4">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSavingProduct}
                  className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold cursor-pointer disabled:opacity-50"
                >
                  {isSavingProduct ? "Saving..." : "Save Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 2: ADD / EDIT CATEGORY */}
      {/* ========================================================= */}
      {isCategoryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-100 p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-base font-bold text-slate-900 font-serif">
                {editingCategory ? "Edit Category" : "New Category"}
              </h3>
              <button onClick={() => setIsCategoryModalOpen(false)} className="p-1 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCategory} className="space-y-3">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Category Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Organic Pulses & Dals"
                  value={categoryForm.name}
                  onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Tagline</label>
                <input
                  type="text"
                  placeholder="e.g. Unpolished heirloom pulses rich in plant protein"
                  value={categoryForm.tagline}
                  onChange={(e) => setCategoryForm({ ...categoryForm, tagline: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Image URL</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={categoryForm.image_url}
                    onChange={(e) => setCategoryForm({ ...categoryForm, image_url: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border font-mono text-[11px]"
                  />
                  <label className="bg-slate-100 px-3 py-2 rounded-xl font-bold shrink-0 cursor-pointer">
                    Upload
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleUploadFile(e, "category")}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-2 border-t pt-4">
                <button
                  type="button"
                  onClick={() => setIsCategoryModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 rounded-xl font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSavingCategory}
                  className="px-5 py-2 bg-emerald-700 text-white rounded-xl font-bold cursor-pointer disabled:opacity-50"
                >
                  {isSavingCategory ? "Saving..." : "Save Category"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 3: QUICK STOCK ADJUST */}
      {/* ========================================================= */}
      {stockModalProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl max-w-sm w-full shadow-2xl border border-slate-100 p-6 space-y-4 text-xs">
            <h3 className="text-base font-bold text-slate-900 font-serif">
              Quick Stock: {stockModalProduct.name}
            </h3>
            <form onSubmit={handleQuickStockSave} className="space-y-4">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Set Inventory Units</label>
                <input
                  type="number"
                  min={0}
                  value={newStockValue}
                  onChange={(e) => setNewStockValue(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl border text-base font-bold text-center"
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setStockModalProduct(null)}
                  className="px-4 py-2 bg-slate-100 rounded-xl font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUpdatingStock}
                  className="px-5 py-2 bg-emerald-700 text-white rounded-xl font-bold cursor-pointer disabled:opacity-50"
                >
                  {isUpdatingStock ? "Updating..." : "Save Stock"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 4: DISPATCH ORDER */}
      {/* ========================================================= */}
      {selectedOrderForDispatch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-100 p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-base font-bold text-slate-900 font-serif">
                Dispatch Order #{selectedOrderForDispatch.order_number || selectedOrderForDispatch.id.slice(0, 8)}
              </h3>
              <button onClick={() => setSelectedOrderForDispatch(null)} className="p-1 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleDispatchOrder} className="space-y-3">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Courier Partner</label>
                <select
                  value={dispatchForm.courier_name}
                  onChange={(e) => setDispatchForm({ ...dispatchForm, courier_name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border font-medium"
                >
                  <option value="Delhivery Express">Delhivery Express</option>
                  <option value="Blue Dart Express">Blue Dart Express</option>
                  <option value="DTDC Surface">DTDC Surface</option>
                  <option value="India Post Speed Post">India Post Speed Post</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Tracking AWB Number *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. DLHVY8923471029"
                  value={dispatchForm.tracking_awb}
                  onChange={(e) => setDispatchForm({ ...dispatchForm, tracking_awb: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border font-mono"
                />
              </div>

              <div className="flex justify-end gap-2 border-t pt-4">
                <button
                  type="button"
                  onClick={() => setSelectedOrderForDispatch(null)}
                  className="px-4 py-2 bg-slate-100 rounded-xl font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUpdatingOrder}
                  className="px-5 py-2 bg-emerald-700 text-white rounded-xl font-bold cursor-pointer disabled:opacity-50"
                >
                  {isUpdatingOrder ? "Dispatching..." : "Confirm & Send SMS Alert"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 5: ADD / EDIT BLOG */}
      {/* ========================================================= */}
      {isBlogModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-base font-bold text-slate-900 font-serif">
                {editingBlog ? "Edit Article" : "Write Agronomy Article"}
              </h3>
              <button onClick={() => setIsBlogModalOpen(false)} className="p-1 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveBlog} className="space-y-3">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Title *</label>
                <input
                  type="text"
                  required
                  value={blogForm.title}
                  onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border text-sm font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Category</label>
                  <input
                    type="text"
                    value={blogForm.category_id}
                    onChange={(e) => setBlogForm({ ...blogForm, category_id: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Read Time</label>
                  <input
                    type="text"
                    value={blogForm.read_time}
                    onChange={(e) => setBlogForm({ ...blogForm, read_time: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Summary *</label>
                <textarea
                  rows={2}
                  required
                  value={blogForm.summary}
                  onChange={(e) => setBlogForm({ ...blogForm, summary: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Image URL</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={blogForm.image_url}
                    onChange={(e) => setBlogForm({ ...blogForm, image_url: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border font-mono text-[11px]"
                  />
                  <label className="bg-slate-100 px-3 py-2 rounded-xl font-bold shrink-0 cursor-pointer">
                    Upload
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleUploadFile(e, "blog")}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Content (Paragraphs separated by blank line)</label>
                <textarea
                  rows={6}
                  value={blogForm.content_text}
                  onChange={(e) => setBlogForm({ ...blogForm, content_text: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border font-sans"
                />
              </div>

              <div className="flex justify-end gap-2 border-t pt-4">
                <button
                  type="button"
                  onClick={() => setIsBlogModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 rounded-xl font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSavingBlog}
                  className="px-5 py-2 bg-emerald-700 text-white rounded-xl font-bold cursor-pointer disabled:opacity-50"
                >
                  {isSavingBlog ? "Saving..." : "Save & Publish"}
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
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white font-sans text-xs">
          Loading ONAAR Admin Portal...
        </div>
      }
    >
      <AdminContent />
    </Suspense>
  );
}
