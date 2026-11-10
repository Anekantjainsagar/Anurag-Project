"use client";

import React, { useState, useEffect } from "react";
import {
  Sliders,
  Save,
  Store,
  Truck,
  MapPin,
  Heart,
  Star,
  Plus,
  Trash2,
  Edit2,
  X,
  Sparkles,
  Phone,
  Mail,
  ShieldCheck,
  CheckCircle2,
  Quote,
  Eye,
  EyeOff,
  Search,
  Check,
  HelpCircle,
  ExternalLink,
  SlidersHorizontal,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { api } from "@/services/apiClient";

export default function AdminSettingsPage() {
  const { showToast } = useCart();
  const [activeTab, setActiveTab] = useState<"testimonials" | "shipping" | "store" | "announcement">("testimonials");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // 1. Shipping Policy State
  const [shippingPolicy, setShippingPolicy] = useState({
    free_shipping_threshold: 499,
    standard_shipping_fee: 49,
    express_shipping_fee: 99,
  });

  // 2. Store Details & Regulatory
  const [storeDetails, setStoreDetails] = useState({
    name: "ONAAR Organic Foods",
    legal_entity: "ONAAR Pure Harvest Agri Pvt Ltd",
    contact_phone: "+91 98765 43210",
    support_email: "support@onaar.com",
    gst_number: "23AABCU9603R1ZM",
    fssai_license: "11422850000341",
    warehouse_address: "Khasra No. 142/2, Nemawar Agro Hub, Bypass Road, Indore, Madhya Pradesh - 452016",
  });

  // 3. Customer Love Header State
  const [customerLoveHeader, setCustomerLoveHeader] = useState({
    badge: "Customer Love",
    title: "Trusted by 10,000+ Indian Families",
    subtitle: "Real reviews from real customers across India who made the switch to pure, unpolished organic food.",
  });
  const [isEditingSectionHeader, setIsEditingSectionHeader] = useState(false);

  // 4. Announcement Bar State
  const [announcementBar, setAnnouncementBar] = useState({
    ticker_text: "FREE PAN-INDIA DELIVERY ON ORDERS OVER ₹499",
    whatsapp_number: "+919876543210",
    is_active: true,
  });

  // 5. Testimonials List State
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [testimonialSearch, setTestimonialSearch] = useState("");
  const [testimonialFilter, setTestimonialFilter] = useState<"ALL" | "FEATURED" | "HIDDEN">("ALL");
  const [isLoadingTestimonials, setIsLoadingTestimonials] = useState(false);

  // Modal State for Add/Edit Testimonial
  const [editingTestimonial, setEditingTestimonial] = useState<any | null>(null);
  const [testimonialModalOpen, setTestimonialModalOpen] = useState(false);
  const [testimonialForm, setTestimonialForm] = useState({
    customer_name: "",
    location: "",
    rating: 5,
    review_text: "",
    product_name: "",
    is_featured: true,
    display_order: 1,
  });
  const [isSubmittingTestimonial, setIsSubmittingTestimonial] = useState(false);

  useEffect(() => {
    loadAllSettings();
    loadTestimonials();
  }, []);

  const loadAllSettings = async () => {
    setIsLoading(true);
    try {
      const res = await api.admin.getSettings();
      if (res.shipping_policy) {
        setShippingPolicy({
          free_shipping_threshold: Number(res.shipping_policy.free_shipping_threshold ?? 499),
          standard_shipping_fee: Number(res.shipping_policy.standard_shipping_fee ?? 49),
          express_shipping_fee: Number(res.shipping_policy.express_shipping_fee ?? 99),
        });
      }
      if (res.store_details) {
        setStoreDetails((prev) => ({ ...prev, ...res.store_details }));
      }
      if (res.customer_love_header) {
        setCustomerLoveHeader((prev) => ({ ...prev, ...res.customer_love_header }));
      }
      if (res.announcement_bar) {
        setAnnouncementBar((prev) => ({ ...prev, ...res.announcement_bar }));
      }
    } catch (err: any) {
      console.warn("Could not load backend settings:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const loadTestimonials = async () => {
    setIsLoadingTestimonials(true);
    try {
      const list = await api.admin.getTestimonials();
      setTestimonials(list || []);
    } catch (err: any) {
      console.warn("Could not load testimonials:", err);
    } finally {
      setIsLoadingTestimonials(false);
    }
  };

  const handleSaveSettings = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsSaving(true);
    try {
      await api.admin.updateSettings({
        shipping_policy: shippingPolicy,
        store_details: storeDetails,
        customer_love_header: customerLoveHeader,
        announcement_bar: announcementBar,
      });
      showToast("Settings updated successfully!");
      setIsEditingSectionHeader(false);
    } catch (err: any) {
      showToast(err.message || "Failed to save settings", "error");
    } finally {
      setIsSaving(false);
    }
  };

  // Testimonials Actions
  const handleOpenAddModal = () => {
    setEditingTestimonial(null);
    setTestimonialForm({
      customer_name: "",
      location: "",
      rating: 5,
      review_text: "",
      product_name: "",
      is_featured: true,
      display_order: testimonials.length + 1,
    });
    setTestimonialModalOpen(true);
  };

  const handleOpenEditModal = (t: any) => {
    setEditingTestimonial(t);
    setTestimonialForm({
      customer_name: t.customer_name,
      location: t.location,
      rating: t.rating || 5,
      review_text: t.review_text,
      product_name: t.product_name || "",
      is_featured: t.is_featured,
      display_order: t.display_order ?? 1,
    });
    setTestimonialModalOpen(true);
  };

  const handleSaveTestimonialSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!testimonialForm.customer_name.trim() || !testimonialForm.review_text.trim()) {
      showToast("Customer name and review quote are required.", "warning");
      return;
    }

    setIsSubmittingTestimonial(true);
    try {
      if (editingTestimonial) {
        await api.admin.updateTestimonial(editingTestimonial.id, testimonialForm);
        showToast("Testimonial updated successfully!");
      } else {
        await api.admin.createTestimonial(testimonialForm);
        showToast("New customer testimonial published!");
      }
      setTestimonialModalOpen(false);
      loadTestimonials();
    } catch (err: any) {
      showToast(err.message || "Failed to save testimonial", "error");
    } finally {
      setIsSubmittingTestimonial(false);
    }
  };

  const handleDeleteTestimonial = async (t: any) => {
    if (!confirm(`Are you sure you want to permanently delete the review from "${t.customer_name}"?`)) {
      return;
    }
    try {
      await api.admin.deleteTestimonial(t.id);
      showToast("Testimonial deleted.");
      loadTestimonials();
    } catch (err: any) {
      showToast(err.message || "Failed to delete testimonial", "error");
    }
  };

  const handleToggleFeatured = async (t: any) => {
    try {
      await api.admin.updateTestimonial(t.id, {
        customer_name: t.customer_name,
        location: t.location,
        rating: t.rating,
        review_text: t.review_text,
        product_name: t.product_name,
        display_order: t.display_order,
        is_featured: !t.is_featured,
      });
      showToast(t.is_featured ? "Review hidden from homepage" : "Review featured on homepage");
      loadTestimonials();
    } catch (err: any) {
      showToast(err.message || "Failed to toggle status", "error");
    }
  };

  // Filtered Testimonials
  const filteredTestimonials = testimonials.filter((t) => {
    if (testimonialFilter === "FEATURED" && !t.is_featured) return false;
    if (testimonialFilter === "HIDDEN" && t.is_featured) return false;
    if (testimonialSearch.trim()) {
      const q = testimonialSearch.toLowerCase();
      const matchName = (t.customer_name || "").toLowerCase().includes(q);
      const matchText = (t.review_text || "").toLowerCase().includes(q);
      const matchCity = (t.location || "").toLowerCase().includes(q);
      const matchCrop = (t.product_name || "").toLowerCase().includes(q);
      return matchName || matchText || matchCity || matchCrop;
    }
    return true;
  });

  const featuredCount = testimonials.filter((t) => t.is_featured).length;
  const hiddenCount = testimonials.filter((t) => !t.is_featured).length;

  return (
    <div className="space-y-6 max-w-6xl font-sans">
      {/* 1. Sleek Navigation Segmented Control */}
      <div className="flex items-center gap-1.5 p-1.5 bg-slate-100 rounded-2xl w-full sm:w-auto overflow-x-auto shadow-2xs">
        <button
          onClick={() => setActiveTab("testimonials")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
            activeTab === "testimonials"
              ? "bg-white text-emerald-800 shadow-xs"
              : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
          }`}
        >
          <Heart className="w-4 h-4 text-rose-500 fill-rose-500/20" />
          <span>Customer Love &amp; Reviews</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700">
            {testimonials.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab("shipping")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
            activeTab === "shipping"
              ? "bg-white text-emerald-800 shadow-xs"
              : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
          }`}
        >
          <Truck className="w-4 h-4 text-emerald-700" />
          <span>Shipping &amp; Delivery Rates</span>
        </button>

        <button
          onClick={() => setActiveTab("store")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
            activeTab === "store"
              ? "bg-white text-emerald-800 shadow-xs"
              : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
          }`}
        >
          <Store className="w-4 h-4 text-blue-600" />
          <span>Store Profile &amp; Licenses</span>
        </button>

        <button
          onClick={() => setActiveTab("announcement")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
            activeTab === "announcement"
              ? "bg-white text-emerald-800 shadow-xs"
              : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>Announcement Ticker</span>
        </button>
      </div>

      {/* ================================================================= */}
      {/* TAB 1: CUSTOMER LOVE & REVIEWS (BEAUTIFUL & STREAMLINED)          */}
      {/* ================================================================= */}
      {activeTab === "testimonials" && (
        <div className="space-y-5 animate-fade-in">
          {/* Action & Filter Toolbar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200/80 shadow-xs">
            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto text-xs font-semibold">
              <button
                onClick={() => setTestimonialFilter("ALL")}
                className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                  testimonialFilter === "ALL"
                    ? "bg-slate-900 text-white font-bold"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                All Reviews ({testimonials.length})
              </button>
              <button
                onClick={() => setTestimonialFilter("FEATURED")}
                className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                  testimonialFilter === "FEATURED"
                    ? "bg-emerald-700 text-white font-bold"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Featured on Home ({featuredCount})</span>
              </button>
              <button
                onClick={() => setTestimonialFilter("HIDDEN")}
                className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                  testimonialFilter === "HIDDEN"
                    ? "bg-slate-800 text-white font-bold"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                <EyeOff className="w-3.5 h-3.5" />
                <span>Hidden ({hiddenCount})</span>
              </button>
            </div>

            {/* Actions: Search, Section Header Edit, Add Review */}
            <div className="flex items-center gap-2">
              <div className="relative flex-1 sm:w-56">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search reviews or crop..."
                  value={testimonialSearch}
                  onChange={(e) => setTestimonialSearch(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs focus:outline-emerald-600 bg-slate-50 focus:bg-white"
                />
              </div>

              <button
                onClick={() => setIsEditingSectionHeader(!isEditingSectionHeader)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer whitespace-nowrap ${
                  isEditingSectionHeader
                    ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                }`}
                title="Edit homepage section title & description"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Section Header</span>
              </button>

              <button
                onClick={handleOpenAddModal}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#01722C] hover:bg-[#0b542c] text-white font-bold text-xs shadow-xs cursor-pointer transition-all whitespace-nowrap"
              >
                <Plus className="w-4 h-4" />
                <span>Add Review</span>
              </button>
            </div>
          </div>

          {/* Collapsible Section Header Editor */}
          {isEditingSectionHeader && (
            <div className="bg-gradient-to-r from-emerald-50/60 to-white p-5 rounded-2xl border border-emerald-200/80 shadow-xs space-y-4 animate-fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-serif font-bold text-sm text-slate-900 flex items-center gap-2">
                    <Heart className="w-4 h-4 text-rose-500" />
                    <span>Homepage Section Headline &amp; Tagline</span>
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Customize what thousands of shoppers read right above the customer testimonials.
                  </p>
                </div>
                <button
                  onClick={() => setIsEditingSectionHeader(false)}
                  className="text-slate-400 hover:text-slate-600 p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Badge Text</label>
                  <input
                    type="text"
                    value={customerLoveHeader.badge}
                    onChange={(e) =>
                      setCustomerLoveHeader({ ...customerLoveHeader, badge: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-emerald-600 bg-white"
                    placeholder="Customer Love"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="font-bold text-slate-700 block mb-1">Main Headline</label>
                  <input
                    type="text"
                    value={customerLoveHeader.title}
                    onChange={(e) =>
                      setCustomerLoveHeader({ ...customerLoveHeader, title: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-emerald-600 font-serif font-bold text-sm bg-white"
                    placeholder="Trusted by 10,000+ Indian Families"
                  />
                </div>

                <div className="md:col-span-3">
                  <label className="font-bold text-slate-700 block mb-1">Subtitle / Bio</label>
                  <input
                    type="text"
                    value={customerLoveHeader.subtitle}
                    onChange={(e) =>
                      setCustomerLoveHeader({ ...customerLoveHeader, subtitle: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-emerald-600 bg-white"
                    placeholder="Real reviews from real customers across India..."
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => handleSaveSettings()}
                  disabled={isSaving}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-xs cursor-pointer disabled:opacity-50"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{isSaving ? "Saving..." : "Save Section Header"}</span>
                </button>
              </div>
            </div>
          )}

          {/* Testimonials Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTestimonials.length === 0 ? (
              <div className="col-span-full bg-white p-12 text-center rounded-2xl border border-slate-200/80 text-slate-400 space-y-3">
                <Heart className="w-8 h-8 text-slate-300 mx-auto" />
                <div className="text-sm font-bold text-slate-700">No Customer Reviews Found</div>
                <p className="text-xs max-w-sm mx-auto">
                  {testimonialSearch
                    ? "No reviews match your search query."
                    : "No reviews in this category. Click 'Add Review' to publish your first customer story!"}
                </p>
                <button
                  onClick={handleOpenAddModal}
                  className="inline-flex items-center gap-1 px-4 py-2 rounded-xl bg-[#01722C] text-white text-xs font-bold"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add First Review</span>
                </button>
              </div>
            ) : (
              filteredTestimonials.map((t) => (
                <div
                  key={t.id}
                  className={`bg-white rounded-2xl p-5 border transition-all flex flex-col justify-between ${
                    t.is_featured
                      ? "border-slate-200/80 shadow-xs hover:shadow-lg hover:border-emerald-300"
                      : "border-slate-200/50 bg-slate-50/60 opacity-60 hover:opacity-100"
                  }`}
                >
                  <div className="space-y-3">
                    {/* Top Row: Author & Rating */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs shrink-0 uppercase">
                          {t.customer_name ? t.customer_name.charAt(0) : "C"}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 text-xs">{t.customer_name}</div>
                          <div className="text-[11px] text-slate-400">{t.location}</div>
                        </div>
                      </div>

                      {/* Star Rating */}
                      <div className="flex items-center gap-0.5 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200/80 shrink-0">
                        {Array.from({ length: t.rating || 5 }).map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                    </div>

                    {/* Review Quote */}
                    <p className="text-xs text-slate-700 italic leading-relaxed line-clamp-4 pt-1">
                      &ldquo;{t.review_text}&rdquo;
                    </p>
                  </div>

                  {/* Bottom Row: Product Tag & Controls */}
                  <div className="pt-3.5 mt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-2.5 py-0.5 rounded-full truncate max-w-[150px]">
                      {t.product_name || "Organic Harvest"}
                    </span>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {/* Featured Toggle Switch */}
                      <button
                        onClick={() => handleToggleFeatured(t)}
                        className={`text-[10px] font-bold px-2 py-1 rounded-lg border transition-all cursor-pointer flex items-center gap-1 ${
                          t.is_featured
                            ? "bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100"
                            : "bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200"
                        }`}
                        title="Toggle visibility on storefront"
                      >
                        {t.is_featured ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                        <span>{t.is_featured ? "Featured" : "Hidden"}</span>
                      </button>

                      <button
                        onClick={() => handleOpenEditModal(t)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-700 hover:bg-emerald-50 transition-colors cursor-pointer"
                        title="Edit review"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteTestimonial(t)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                        title="Delete review"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* ================================================================= */}
      {/* TAB 2: SHIPPING RATES & LOGISTICS                                 */}
      {/* ================================================================= */}
      {activeTab === "shipping" && (
        <form onSubmit={handleSaveSettings} className="space-y-5 animate-fade-in">
          {/* Card 1: Free Delivery Policy */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5 text-slate-900 font-bold text-sm">
                <Truck className="w-4 h-4 text-emerald-700" />
                <span>Pan-India Shipping Thresholds &amp; Free Delivery</span>
              </div>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                Active Policy
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
              <div className="bg-slate-50/80 p-4 rounded-xl border border-slate-100 space-y-2">
                <label className="font-bold text-slate-800 block">
                  Free Shipping Order Threshold
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2 font-bold text-slate-400">₹</span>
                  <input
                    type="number"
                    required
                    value={shippingPolicy.free_shipping_threshold}
                    onChange={(e) =>
                      setShippingPolicy({
                        ...shippingPolicy,
                        free_shipping_threshold: Number(e.target.value),
                      })
                    }
                    className="w-full pl-7 pr-3 py-1.5 rounded-xl border border-slate-200 font-mono text-sm font-bold text-slate-900 focus:outline-emerald-600 bg-white"
                  />
                </div>
                <p className="text-[11px] text-slate-500">
                  Orders equal or above this cart value ship <strong>100% Free</strong> across all states in India.
                </p>
              </div>

              <div className="bg-slate-50/80 p-4 rounded-xl border border-slate-100 space-y-2">
                <label className="font-bold text-slate-800 block">
                  Standard Surface Shipping Fee
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2 font-bold text-slate-400">₹</span>
                  <input
                    type="number"
                    required
                    value={shippingPolicy.standard_shipping_fee}
                    onChange={(e) =>
                      setShippingPolicy({
                        ...shippingPolicy,
                        standard_shipping_fee: Number(e.target.value),
                      })
                    }
                    className="w-full pl-7 pr-3 py-1.5 rounded-xl border border-slate-200 font-mono text-sm font-bold text-slate-900 focus:outline-emerald-600 bg-white"
                  />
                </div>
                <p className="text-[11px] text-slate-500">
                  Applied automatically at checkout when the customer&apos;s cart is below the free threshold.
                </p>
              </div>

              <div className="bg-slate-50/80 p-4 rounded-xl border border-slate-100 space-y-2">
                <label className="font-bold text-slate-800 block">
                  Express Air Courier Fee
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2 font-bold text-slate-400">₹</span>
                  <input
                    type="number"
                    required
                    value={shippingPolicy.express_shipping_fee}
                    onChange={(e) =>
                      setShippingPolicy({
                        ...shippingPolicy,
                        express_shipping_fee: Number(e.target.value),
                      })
                    }
                    className="w-full pl-7 pr-3 py-1.5 rounded-xl border border-slate-200 font-mono text-sm font-bold text-slate-900 focus:outline-emerald-600 bg-white"
                  />
                </div>
                <p className="text-[11px] text-slate-500">
                  Priority express air courier dispatch for time-sensitive organic shipments.
                </p>
              </div>
            </div>
          </div>

          {/* Card 2: Central Packaging Hub */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm border-b border-slate-100 pb-3">
              <MapPin className="w-4 h-4 text-emerald-700" />
              <span>Central Sorting, Packaging &amp; Warehouse Facility</span>
            </div>

            <div className="text-xs space-y-1">
              <label className="font-bold text-slate-700 block">Physical Logistics Hub Address</label>
              <textarea
                rows={3}
                value={storeDetails.warehouse_address}
                onChange={(e) =>
                  setStoreDetails({ ...storeDetails, warehouse_address: e.target.value })
                }
                className="w-full px-3 py-2 rounded-xl border border-slate-200 leading-relaxed focus:outline-emerald-600 font-mono text-xs"
              />
              <p className="text-[11px] text-slate-400">
                Printed on official packing slips, consignment notes, and tax invoices.
              </p>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSaving}
              className="bg-emerald-700 hover:bg-emerald-800 text-white px-6 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-xs cursor-pointer disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? "Saving..." : "Save Shipping Policies"}</span>
            </button>
          </div>
        </form>
      )}

      {/* ================================================================= */}
      {/* TAB 3: STORE PROFILE & REGULATORY LICENSES                        */}
      {/* ================================================================= */}
      {activeTab === "store" && (
        <form onSubmit={handleSaveSettings} className="space-y-5 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Left: Brand Identity & Support */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm border-b border-slate-100 pb-3">
                <Store className="w-4 h-4 text-blue-600" />
                <span>Brand Identity &amp; Support Contacts</span>
              </div>

              <div className="space-y-3.5 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Brand Trading Name</label>
                  <input
                    type="text"
                    value={storeDetails.name}
                    onChange={(e) => setStoreDetails({ ...storeDetails, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-emerald-600"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Registered Legal Entity</label>
                  <input
                    type="text"
                    value={storeDetails.legal_entity}
                    onChange={(e) => setStoreDetails({ ...storeDetails, legal_entity: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-emerald-600"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Customer Helpline Phone</label>
                  <input
                    type="text"
                    value={storeDetails.contact_phone}
                    onChange={(e) => setStoreDetails({ ...storeDetails, contact_phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono focus:outline-emerald-600"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Official Support Email</label>
                  <input
                    type="email"
                    value={storeDetails.support_email}
                    onChange={(e) => setStoreDetails({ ...storeDetails, support_email: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono focus:outline-emerald-600"
                  />
                </div>
              </div>
            </div>

            {/* Right: Government & Regulatory Licenses */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm border-b border-slate-100 pb-3">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>Government &amp; Organic Accreditations</span>
              </div>

              <div className="space-y-3.5 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">GSTIN Number (Tax Registration)</label>
                  <input
                    type="text"
                    value={storeDetails.gst_number}
                    onChange={(e) => setStoreDetails({ ...storeDetails, gst_number: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono uppercase focus:outline-emerald-600"
                  />
                  <p className="text-[10px] text-slate-400 mt-1">Rendered on tax invoices generated for shoppers.</p>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">FSSAI Organic License Number</label>
                  <input
                    type="text"
                    value={storeDetails.fssai_license}
                    onChange={(e) => setStoreDetails({ ...storeDetails, fssai_license: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono focus:outline-emerald-600"
                  />
                  <p className="text-[10px] text-slate-400 mt-1">Food Safety and Standards Authority of India (FSSAI) cert license.</p>
                </div>

                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-[11px] text-emerald-800 space-y-1">
                  <div className="font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                    <span>NPOP &amp; Jaivik Bharat Certification</span>
                  </div>
                  <p className="text-emerald-700 leading-relaxed">
                    National Programme for Organic Production compliant direct from verified farm cooperatives.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSaving}
              className="bg-emerald-700 hover:bg-emerald-800 text-white px-6 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-xs cursor-pointer disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? "Saving..." : "Save Store Identity"}</span>
            </button>
          </div>
        </form>
      )}

      {/* ================================================================= */}
      {/* TAB 4: ANNOUNCEMENTS & TICKER CMS                                 */}
      {/* ================================================================= */}
      {activeTab === "announcement" && (
        <form onSubmit={handleSaveSettings} className="space-y-5 animate-fade-in">
          {/* Live Mockup Preview */}
          <div className="bg-slate-900 p-5 rounded-2xl text-white space-y-2 shadow-md">
            <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono uppercase tracking-wider">
              <span>Live Storefront Preview</span>
              <span className="text-emerald-400 font-bold">TopBar Banner</span>
            </div>
            <div className="bg-[#014d1e] text-[#e3ece7] text-xs py-2 px-4 rounded-xl border border-[#015c24] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Truck className="w-3.5 h-3.5 text-[#58cf8b]" />
                <span className="font-bold">{announcementBar.ticker_text || "Announcement Message"}</span>
              </div>
              <span className="text-[11px] text-[#58cf8b] font-bold">WhatsApp: {announcementBar.whatsapp_number}</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Storefront Announcement Ticker &amp; WhatsApp Support</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="md:col-span-2">
                <label className="font-bold text-slate-700 block mb-1">
                  Announcement Ticker Message
                </label>
                <input
                  type="text"
                  value={announcementBar.ticker_text}
                  onChange={(e) =>
                    setAnnouncementBar({ ...announcementBar, ticker_text: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-emerald-600"
                  placeholder="e.g. FREE PAN-INDIA DELIVERY ON ORDERS OVER ₹499"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  WhatsApp Helpline Number
                </label>
                <input
                  type="text"
                  value={announcementBar.whatsapp_number}
                  onChange={(e) =>
                    setAnnouncementBar({ ...announcementBar, whatsapp_number: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono focus:outline-emerald-600"
                  placeholder="+919876543210"
                />
              </div>

              <div className="flex items-center gap-3 pt-5">
                <input
                  type="checkbox"
                  id="announcementActive"
                  checked={announcementBar.is_active}
                  onChange={(e) =>
                    setAnnouncementBar({ ...announcementBar, is_active: e.target.checked })
                  }
                  className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                />
                <label htmlFor="announcementActive" className="font-bold text-slate-800 cursor-pointer text-xs">
                  Display announcement banner on public storefront
                </label>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSaving}
              className="bg-emerald-700 hover:bg-emerald-800 text-white px-6 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-xs cursor-pointer disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? "Saving..." : "Save Announcement Settings"}</span>
            </button>
          </div>
        </form>
      )}

      {/* ================================================================= */}
      {/* MODAL: ADD / EDIT CUSTOMER TESTIMONIAL                            */}
      {/* ================================================================= */}
      {testimonialModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setTestimonialModalOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-fade-in font-sans overflow-y-auto"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl sm:rounded-3xl max-w-lg w-full max-h-[92dvh] overflow-y-auto shadow-2xl border border-slate-200 p-5 sm:p-6 space-y-4 my-auto animate-fade-up"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-serif font-bold text-base text-slate-900 flex items-center gap-2">
                <Heart className="w-4 h-4 text-rose-500 fill-rose-500/20" />
                <span>{editingTestimonial ? "Edit Customer Review" : "Add Customer Review"}</span>
              </h3>
              <button
                onClick={() => setTestimonialModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveTestimonialSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Customer Full Name *</label>
                  <input
                    type="text"
                    required
                    value={testimonialForm.customer_name}
                    onChange={(e) =>
                      setTestimonialForm({ ...testimonialForm, customer_name: e.target.value })
                    }
                    placeholder="e.g. Priya Sharma"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-emerald-600"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Location / City *</label>
                  <input
                    type="text"
                    required
                    value={testimonialForm.location}
                    onChange={(e) =>
                      setTestimonialForm({ ...testimonialForm, location: e.target.value })
                    }
                    placeholder="e.g. New Delhi"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-emerald-600"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Rating (Stars) *</label>
                  <select
                    value={testimonialForm.rating}
                    onChange={(e) =>
                      setTestimonialForm({ ...testimonialForm, rating: Number(e.target.value) })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-emerald-600 font-bold bg-white"
                  >
                    <option value={5}>★★★★★ (5 Stars - Exceptional)</option>
                    <option value={4}>★★★★☆ (4 Stars - Very Good)</option>
                    <option value={3}>★★★☆☆ (3 Stars - Average)</option>
                    <option value={2}>★★☆☆☆ (2 Stars - Fair)</option>
                    <option value={1}>★☆☆☆☆ (1 Star - Poor)</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Reviewed Crop / Product</label>
                  <input
                    type="text"
                    value={testimonialForm.product_name}
                    onChange={(e) =>
                      setTestimonialForm({ ...testimonialForm, product_name: e.target.value })
                    }
                    placeholder="e.g. Organic Toor Dal"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-emerald-600"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Customer Review Quote *</label>
                <textarea
                  rows={4}
                  required
                  value={testimonialForm.review_text}
                  onChange={(e) =>
                    setTestimonialForm({ ...testimonialForm, review_text: e.target.value })
                  }
                  placeholder="Paste the genuine verified customer quote or feedback here..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 leading-relaxed focus:outline-emerald-600"
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="featuredCheckbox"
                    checked={testimonialForm.is_featured}
                    onChange={(e) =>
                      setTestimonialForm({ ...testimonialForm, is_featured: e.target.checked })
                    }
                    className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                  />
                  <label htmlFor="featuredCheckbox" className="font-bold text-slate-800 cursor-pointer">
                    Feature on Storefront Homepage
                  </label>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <span>Display Order:</span>
                  <input
                    type="number"
                    value={testimonialForm.display_order}
                    onChange={(e) =>
                      setTestimonialForm({ ...testimonialForm, display_order: Number(e.target.value) })
                    }
                    className="w-14 px-2 py-1 rounded-lg border border-slate-200 font-mono text-center bg-white"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setTestimonialModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingTestimonial}
                  className="px-5 py-2 bg-[#01722C] hover:bg-[#0b542c] text-white rounded-xl font-bold cursor-pointer disabled:opacity-50 shadow-xs"
                >
                  {isSubmittingTestimonial ? "Saving..." : editingTestimonial ? "Save Changes" : "Publish Review"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
