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

  // 4. Announcement Bar State
  const [announcementBar, setAnnouncementBar] = useState({
    ticker_text: "FREE PAN-INDIA DELIVERY ON ORDERS OVER ₹499",
    whatsapp_number: "+919876543210",
    is_active: true,
  });

  // 5. Testimonials List State
  const [testimonials, setTestimonials] = useState<any[]>([]);
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
      showToast("Store policies & CMS parameters saved successfully!");
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
    if (!confirm(`Are you sure you want to delete the review from "${t.customer_name}"?`)) {
      return;
    }
    try {
      await api.admin.deleteTestimonial(t.id);
      showToast("Testimonial removed.");
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
      showToast(`Testimonial is now ${!t.is_featured ? "featured on homepage" : "hidden from homepage"}`);
      loadTestimonials();
    } catch (err: any) {
      showToast(err.message || "Failed to toggle status", "error");
    }
  };

  return (
    <div className="space-y-6 max-w-5xl font-sans">
      {/* 1. Header & Navigation Tabs */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-sm font-bold text-slate-900 font-serif flex items-center gap-2">
            <Sliders className="w-4 h-4 text-emerald-700" />
            <span>Store CMS, Customer Love &amp; Fulfillment Settings</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Customize homepage reviews, free delivery thresholds, announcement ticker, and legal credentials.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold self-stretch sm:self-auto overflow-x-auto">
          <button
            onClick={() => setActiveTab("testimonials")}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "testimonials"
                ? "bg-white text-emerald-800 font-bold shadow-2xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Heart className="w-3.5 h-3.5 text-rose-500" />
            <span>Customer Love</span>
          </button>

          <button
            onClick={() => setActiveTab("shipping")}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "shipping"
                ? "bg-white text-emerald-800 font-bold shadow-2xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Truck className="w-3.5 h-3.5 text-emerald-700" />
            <span>Shipping Policy</span>
          </button>

          <button
            onClick={() => setActiveTab("store")}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "store"
                ? "bg-white text-emerald-800 font-bold shadow-2xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Store className="w-3.5 h-3.5 text-blue-600" />
            <span>Store Identity</span>
          </button>

          <button
            onClick={() => setActiveTab("announcement")}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "announcement"
                ? "bg-white text-emerald-800 font-bold shadow-2xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Announcements</span>
          </button>
        </div>
      </div>

      {/* ================================================================= */}
      {/* TAB 1: CUSTOMER LOVE & TESTIMONIALS                               */}
      {/* ================================================================= */}
      {activeTab === "testimonials" && (
        <div className="space-y-6 animate-fade-in">
          {/* Section Header Editor Card */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <Heart className="w-4 h-4 text-rose-500" />
                <span>Homepage Section Headline &amp; Tagline</span>
              </div>
              <button
                onClick={() => handleSaveSettings()}
                disabled={isSaving}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-xs cursor-pointer disabled:opacity-50"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{isSaving ? "Saving..." : "Update Section Header"}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Pill Badge Text</label>
                <input
                  type="text"
                  value={customerLoveHeader.badge}
                  onChange={(e) =>
                    setCustomerLoveHeader({ ...customerLoveHeader, badge: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-emerald-600"
                  placeholder="e.g. Customer Love"
                />
              </div>

              <div className="md:col-span-2">
                <label className="font-bold text-slate-700 block mb-1">Main Heading</label>
                <input
                  type="text"
                  value={customerLoveHeader.title}
                  onChange={(e) =>
                    setCustomerLoveHeader({ ...customerLoveHeader, title: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-emerald-600 font-serif font-bold text-sm"
                  placeholder="e.g. Trusted by 10,000+ Indian Families"
                />
              </div>

              <div className="md:col-span-3">
                <label className="font-bold text-slate-700 block mb-1">Subtext / Description</label>
                <input
                  type="text"
                  value={customerLoveHeader.subtitle}
                  onChange={(e) =>
                    setCustomerLoveHeader({ ...customerLoveHeader, subtitle: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-emerald-600 text-xs"
                  placeholder="e.g. Real reviews from real customers across India..."
                />
              </div>
            </div>
          </div>

          {/* Testimonials List & Add CTA */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-serif font-bold text-base text-slate-900 flex items-center gap-2">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>Customer Testimonials Showcase</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Featured reviews rendered dynamically on the storefront homepage ({testimonials.length} total)
                </p>
              </div>

              <button
                onClick={handleOpenAddModal}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#01722C] hover:bg-[#0b542c] text-white font-bold text-xs shadow-xs cursor-pointer transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add New Customer Review</span>
              </button>
            </div>

            {/* Testimonials Grid Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {testimonials.map((t) => (
                <div
                  key={t.id}
                  className={`p-4 rounded-2xl border transition-all flex flex-col justify-between ${
                    t.is_featured
                      ? "bg-white border-slate-200 shadow-2xs hover:shadow-md hover:border-emerald-300"
                      : "bg-slate-50 border-slate-200/60 opacity-60"
                  }`}
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: t.rating || 5 }).map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                        ))}
                      </div>

                      <button
                        onClick={() => handleToggleFeatured(t)}
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold cursor-pointer transition-colors ${
                          t.is_featured
                            ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                            : "bg-slate-200 text-slate-600"
                        }`}
                        title="Click to toggle featured on storefront"
                      >
                        {t.is_featured ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                        <span>{t.is_featured ? "Featured" : "Hidden"}</span>
                      </button>
                    </div>

                    <p className="text-xs text-slate-700 italic leading-relaxed line-clamp-4">
                      &ldquo;{t.review_text}&rdquo;
                    </p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-bold text-slate-900">{t.customer_name}</div>
                      <div className="text-[11px] text-slate-400">
                        {t.location} {t.product_name ? `• ${t.product_name}` : ""}
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleOpenEditModal(t)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 transition-colors cursor-pointer"
                        title="Edit testimonial"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteTestimonial(t)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                        title="Delete testimonial"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ================================================================= */}
      {/* TAB 2: SHIPPING RATES & LOGISTICS                                 */}
      {/* ================================================================= */}
      {activeTab === "shipping" && (
        <form onSubmit={handleSaveSettings} className="space-y-6 animate-fade-in">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm border-b border-slate-100 pb-3">
              <Truck className="w-4 h-4 text-emerald-700" />
              <span>Pan-India Shipping Thresholds &amp; Courier Fees</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Free Delivery Cart Threshold (₹) *
                </label>
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
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono text-xs focus:outline-emerald-600"
                />
                <p className="text-[10px] text-slate-400 mt-1">Orders above this cart value ship free across India.</p>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Standard Surface Shipping Fee (₹)
                </label>
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
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono text-xs focus:outline-emerald-600"
                />
                <p className="text-[10px] text-slate-400 mt-1">Applied when cart total is below free threshold.</p>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Express Air Courier Fee (₹)
                </label>
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
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono text-xs focus:outline-emerald-600"
                />
                <p className="text-[10px] text-slate-400 mt-1">For urgent expedited harvest delivery.</p>
              </div>
            </div>
          </div>

          {/* Central Warehouse Destination */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm border-b border-slate-100 pb-3">
              <MapPin className="w-4 h-4 text-emerald-700" />
              <span>Central Sorting &amp; Packaging Facility Address</span>
            </div>

            <div className="text-xs">
              <label className="font-bold text-slate-700 block mb-1">Physical Dispatch Hub</label>
              <textarea
                rows={3}
                value={storeDetails.warehouse_address}
                onChange={(e) =>
                  setStoreDetails({ ...storeDetails, warehouse_address: e.target.value })
                }
                className="w-full px-3 py-2 rounded-xl border border-slate-200 leading-relaxed focus:outline-emerald-600"
              />
              <p className="text-[10px] text-slate-400 mt-1">Printed on packing slips and GST invoices as dispatch center.</p>
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
      {/* TAB 3: STORE & REGULATORY IDENTITY                                */}
      {/* ================================================================= */}
      {activeTab === "store" && (
        <form onSubmit={handleSaveSettings} className="space-y-6 animate-fade-in">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm border-b border-slate-100 pb-3">
              <Store className="w-4 h-4 text-emerald-700" />
              <span>Store Trading Profile &amp; Regulatory Credentials</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
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

              <div>
                <label className="font-bold text-slate-700 block mb-1">GSTIN Number (Tax Identifier)</label>
                <input
                  type="text"
                  value={storeDetails.gst_number}
                  onChange={(e) => setStoreDetails({ ...storeDetails, gst_number: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono uppercase focus:outline-emerald-600"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">FSSAI Organic License #</label>
                <input
                  type="text"
                  value={storeDetails.fssai_license}
                  onChange={(e) => setStoreDetails({ ...storeDetails, fssai_license: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono focus:outline-emerald-600"
                />
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
        <form onSubmit={handleSaveSettings} className="space-y-6 animate-fade-in">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm border-b border-slate-100 pb-3">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>TopBar Announcement Banner &amp; WhatsApp Support</span>
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
                <p className="text-[10px] text-slate-400 mt-1">Displayed in the header across all storefront pages.</p>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  WhatsApp Support Number
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

              <div className="flex items-center gap-3 pt-4">
                <input
                  type="checkbox"
                  id="announcementActive"
                  checked={announcementBar.is_active}
                  onChange={(e) =>
                    setAnnouncementBar({ ...announcementBar, is_active: e.target.checked })
                  }
                  className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                />
                <label htmlFor="announcementActive" className="font-bold text-slate-800 cursor-pointer">
                  Display Announcement Banner on Public Storefront
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
            className="bg-white rounded-2xl max-w-lg w-full max-h-[92dvh] overflow-y-auto shadow-2xl border border-slate-200 p-5 sm:p-6 space-y-4 my-auto animate-fade-up"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-serif font-bold text-base text-slate-900 flex items-center gap-2">
                <Heart className="w-4 h-4 text-rose-500" />
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Display Order</label>
                  <input
                    type="number"
                    value={testimonialForm.display_order}
                    onChange={(e) =>
                      setTestimonialForm({ ...testimonialForm, display_order: Number(e.target.value) })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono"
                  />
                </div>

                <div className="flex items-center gap-2 pt-6">
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
                    Feature on Homepage
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100">
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
