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
  Tag,
  Percent,
  Coins,
  Gift,
  AlertCircle,
  Clock,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { api } from "@/services/apiClient";

export default function AdminSettingsPage() {
  const { showToast } = useCart();
  const [activeTab, setActiveTab] = useState<"testimonials" | "faqs" | "shipping" | "store" | "announcement" | "offers">("testimonials");
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

  // 6. Promotional Offers & Coupons State
  const [coupons, setCoupons] = useState<any[]>([]);
  const [isLoadingCoupons, setIsLoadingCoupons] = useState(false);
  const [couponModalOpen, setCouponModalOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<any | null>(null);
  const [couponForm, setCouponForm] = useState({
    code: "",
    description: "",
    discount_type: "fixed" as "fixed" | "percentage",
    discount_value: 100,
    min_order_amount: 2000,
    max_discount: "" as string | number,
    validity_days: "" as string | number,
    is_first_order_only: false,
    usage_limit_per_user: 1,
    is_active: true,
  });
  const [isSubmittingCoupon, setIsSubmittingCoupon] = useState(false);

  // 7. Transparency FAQs State
  const [faqSection, setFaqSection] = useState({
    badge: "Transparency",
    title: "Frequently Asked Questions",
    subtitle: "Everything you need to know about our organic certification and harvesting",
    faqs: [
      {
        id: "faq-1",
        question: "How does ONAAR prove products are 100% organic?",
        answer: "Every batch is traced to registered organic farmer clusters with geo-tagged locations and tested in NABL-accredited laboratories for 218 pesticide residues and heavy metals. Certificates of analysis are available upon request.",
        category: "Certification",
        is_active: true,
        display_order: 1,
      },
      {
        id: "faq-2",
        question: "Why do your dals look less shiny than supermarket brands?",
        answer: "Commercial brands buff pulses with talcum powder, food colors, and liquid paraffin wax for shine. Our dals are 100% unpolished and retain their nutrient-dense aleurone layer containing 80% of natural fiber and minerals.",
        category: "Purity & Nutrition",
        is_active: true,
        display_order: 2,
      },
      {
        id: "faq-3",
        question: "What does cold-pressed and traditional Bilona mean?",
        answer: "Our cold-pressed oils are expelled in traditional wooden kohlus below 42°C to safeguard nutrients. Our A2 ghee is prepared by culturing whole A2 Gir cow milk into curd and hand-churning bilona makhan before slow simmering.",
        category: "Traditional Methods",
        is_active: true,
        display_order: 3,
      },
      {
        id: "faq-4",
        question: "Do you supply institutional and wholesale bulk orders?",
        answer: "Yes. We partner with restaurants, organic retailers, and institutional kitchens across India with customized wholesale pricing and certified supply chains.",
        category: "Wholesale",
        is_active: true,
        display_order: 4,
      },
    ],
  });
  const [faqSearch, setFaqSearch] = useState("");
  const [faqCategoryFilter, setFaqCategoryFilter] = useState("ALL");
  const [faqModalOpen, setFaqModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<any | null>(null);
  const [faqForm, setFaqForm] = useState({
    question: "",
    answer: "",
    category: "Certification",
    is_active: true,
    display_order: 1,
  });
  const [isEditingFaqHeader, setIsEditingFaqHeader] = useState(false);
  const [isSubmittingFaq, setIsSubmittingFaq] = useState(false);

  useEffect(() => {
    loadAllSettings();
    loadTestimonials();
    loadCoupons();
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
      if (res.faq_section) {
        setFaqSection((prev) => ({ ...prev, ...res.faq_section }));
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
        faq_section: faqSection,
      });
      showToast("Settings updated successfully!");
      setIsEditingSectionHeader(false);
      setIsEditingFaqHeader(false);
    } catch (err: any) {
      showToast(err.message || "Failed to save settings", "error");
    } finally {
      setIsSaving(false);
    }
  };

  // Transparency FAQ Actions
  const handleOpenAddFaq = () => {
    setEditingFaq(null);
    setFaqForm({
      question: "",
      answer: "",
      category: "Certification",
      is_active: true,
      display_order: (faqSection.faqs?.length || 0) + 1,
    });
    setFaqModalOpen(true);
  };

  const handleOpenEditFaq = (faq: any) => {
    setEditingFaq(faq);
    setFaqForm({
      question: faq.question || "",
      answer: faq.answer || "",
      category: faq.category || "General",
      is_active: faq.is_active ?? true,
      display_order: faq.display_order || 1,
    });
    setFaqModalOpen(true);
  };

  const handleSaveFaq = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!faqForm.question.trim() || !faqForm.answer.trim()) {
      showToast("Question and answer are required", "error");
      return;
    }
    setIsSubmittingFaq(true);
    try {
      let updatedFaqs = [...(faqSection.faqs || [])];
      if (editingFaq) {
        updatedFaqs = updatedFaqs.map((f) =>
          f.id === editingFaq.id ? { ...f, ...faqForm } : f
        );
      } else {
        const newFaq = {
          id: `faq-${Date.now()}`,
          ...faqForm,
        };
        updatedFaqs.push(newFaq);
      }
      updatedFaqs.sort((a, b) => a.display_order - b.display_order);
      const newSection = { ...faqSection, faqs: updatedFaqs };
      setFaqSection(newSection);

      await api.admin.updateSettings({ faq_section: newSection });
      showToast(editingFaq ? "FAQ updated successfully!" : "New FAQ created successfully!");
      setFaqModalOpen(false);
    } catch (err: any) {
      showToast(err.message || "Failed to save FAQ", "error");
    } finally {
      setIsSubmittingFaq(false);
    }
  };

  const handleDeleteFaq = async (faqId: string) => {
    if (!confirm("Are you sure you want to delete this FAQ item?")) return;
    try {
      const updatedFaqs = (faqSection.faqs || []).filter((f) => f.id !== faqId);
      const newSection = { ...faqSection, faqs: updatedFaqs };
      setFaqSection(newSection);
      await api.admin.updateSettings({ faq_section: newSection });
      showToast("FAQ deleted successfully!");
    } catch (err: any) {
      showToast(err.message || "Failed to delete FAQ", "error");
    }
  };

  const handleToggleFaqActive = async (faqId: string) => {
    try {
      const updatedFaqs = (faqSection.faqs || []).map((f) =>
        f.id === faqId ? { ...f, is_active: !f.is_active } : f
      );
      const newSection = { ...faqSection, faqs: updatedFaqs };
      setFaqSection(newSection);
      await api.admin.updateSettings({ faq_section: newSection });
      showToast("FAQ status updated!");
    } catch (err: any) {
      showToast(err.message || "Failed to update FAQ status", "error");
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

  // ---------------------------------------------------------------------------
  // Promotional Offers & Coupons Actions
  // ---------------------------------------------------------------------------
  const loadCoupons = async () => {
    setIsLoadingCoupons(true);
    try {
      const list = await api.admin.getCoupons();
      setCoupons(list || []);
    } catch (err: any) {
      console.warn("Could not load coupons:", err);
    } finally {
      setIsLoadingCoupons(false);
    }
  };

  const handleOpenAddCoupon = () => {
    setEditingCoupon(null);
    setCouponForm({
      code: "",
      description: "",
      discount_type: "fixed",
      discount_value: 100,
      min_order_amount: 2000,
      max_discount: "",
      validity_days: 30,
      is_first_order_only: false,
      usage_limit_per_user: 1,
      is_active: true,
    });
    setCouponModalOpen(true);
  };

  const handleOpenEditCoupon = (c: any) => {
    setEditingCoupon(c);
    setCouponForm({
      code: c.code,
      description: c.description || "",
      discount_type: c.discount_type || "fixed",
      discount_value: Number(c.discount_value) || 0,
      min_order_amount: Number(c.min_order_amount) || 0,
      max_discount: c.max_discount !== null && c.max_discount !== undefined ? Number(c.max_discount) : "",
      validity_days: c.days_remaining !== null && c.days_remaining !== undefined ? c.days_remaining : "",
      is_first_order_only: Boolean(c.is_first_order_only),
      usage_limit_per_user: c.usage_limit_per_user ?? 1,
      is_active: Boolean(c.is_active),
    });
    setCouponModalOpen(true);
  };

  const handleSaveCouponSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = couponForm.code.trim().toUpperCase();
    if (!cleanCode) {
      showToast("Coupon code is required (e.g. ONAAR100).", "warning");
      return;
    }

    const payload = {
      code: cleanCode,
      description: couponForm.description.trim(),
      discount_type: couponForm.discount_type,
      discount_value: Number(couponForm.discount_value),
      min_order_amount: Number(couponForm.min_order_amount) || 0,
      max_discount: couponForm.max_discount !== "" ? Number(couponForm.max_discount) : null,
      validity_days: couponForm.validity_days !== "" ? Number(couponForm.validity_days) : null,
      is_first_order_only: Boolean(couponForm.is_first_order_only),
      usage_limit_per_user: Number(couponForm.usage_limit_per_user) || 1,
      is_active: Boolean(couponForm.is_active),
    };

    setIsSubmittingCoupon(true);
    try {
      if (editingCoupon) {
        await api.admin.updateCoupon(editingCoupon.id, payload);
        showToast(`Offer "${cleanCode}" updated successfully!`);
      } else {
        await api.admin.createCoupon(payload);
        showToast(`Promotional offer "${cleanCode}" created!`);
      }
      setCouponModalOpen(false);
      loadCoupons();
    } catch (err: any) {
      showToast(err.message || "Failed to save offer", "error");
    } finally {
      setIsSubmittingCoupon(false);
    }
  };

  const handleToggleCoupon = async (c: any) => {
    try {
      await api.admin.toggleCoupon(c.id);
      showToast(c.is_active ? `Offer ${c.code} deactivated` : `Offer ${c.code} activated`);
      loadCoupons();
    } catch (err: any) {
      showToast(err.message || "Failed to toggle offer", "error");
    }
  };

  const handleDeleteCoupon = async (c: any) => {
    if (!confirm(`Are you sure you want to permanently delete promotional offer "${c.code}"?`)) {
      return;
    }
    try {
      await api.admin.deleteCoupon(c.id);
      showToast(`Offer ${c.code} removed.`);
      loadCoupons();
    } catch (err: any) {
      showToast(err.message || "Failed to delete offer", "error");
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

  // Filtered Transparency FAQs
  const filteredFaqs = (faqSection.faqs || []).filter((f) => {
    if (
      faqCategoryFilter !== "ALL" &&
      (f.category || "General").toLowerCase() !== faqCategoryFilter.toLowerCase()
    ) {
      return false;
    }
    if (faqSearch.trim()) {
      const q = faqSearch.toLowerCase();
      const matchQ = (f.question || "").toLowerCase().includes(q);
      const matchA = (f.answer || "").toLowerCase().includes(q);
      const matchCat = (f.category || "").toLowerCase().includes(q);
      return matchQ || matchA || matchCat;
    }
    return true;
  });

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
          onClick={() => setActiveTab("faqs")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
            activeTab === "faqs"
              ? "bg-white text-emerald-800 shadow-xs"
              : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
          }`}
        >
          <HelpCircle className="w-4 h-4 text-emerald-600" />
          <span>Transparency FAQs</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
            {faqSection.faqs?.length || 0}
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

        <button
          onClick={() => setActiveTab("offers")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
            activeTab === "offers"
              ? "bg-white text-emerald-800 shadow-xs"
              : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
          }`}
        >
          <Tag className="w-4 h-4 text-emerald-700" />
          <span>Promotions &amp; Offers</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
            {coupons.length}
          </span>
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
      {/* TAB: TRANSPARENCY FAQs CMS                                        */}
      {/* ================================================================= */}
      {activeTab === "faqs" && (
        <div className="space-y-5 animate-fade-in">
          {/* Section Header Configuration Card */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <HelpCircle className="w-4 h-4 text-emerald-600" />
                <span>Storefront FAQ &amp; Transparency Section Header</span>
              </div>
              <button
                type="button"
                onClick={() => setIsEditingFaqHeader(!isEditingFaqHeader)}
                className="text-xs font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-xl border border-emerald-200/80 transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>{isEditingFaqHeader ? "Close Editor" : "Edit Section Header"}</span>
              </button>
            </div>

            {isEditingFaqHeader ? (
              <form onSubmit={handleSaveSettings} className="space-y-3 pt-1">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Badge Tag</label>
                    <input
                      type="text"
                      value={faqSection.badge}
                      onChange={(e) => setFaqSection({ ...faqSection, badge: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-emerald-600"
                      placeholder="e.g. Transparency"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="font-bold text-slate-700 block mb-1">Section Title</label>
                    <input
                      type="text"
                      value={faqSection.title}
                      onChange={(e) => setFaqSection({ ...faqSection, title: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-emerald-600 font-bold"
                      placeholder="e.g. Frequently Asked Questions"
                    />
                  </div>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1 text-xs">Subtitle Description</label>
                  <input
                    type="text"
                    value={faqSection.subtitle}
                    onChange={(e) => setFaqSection({ ...faqSection, subtitle: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-emerald-600 text-xs"
                    placeholder="e.g. Everything you need to know about our organic certification and harvesting"
                  />
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsEditingFaqHeader(false)}
                    className="px-3 py-1.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="px-4 py-1.5 rounded-xl text-xs font-bold bg-emerald-700 hover:bg-emerald-800 text-white shadow-xs cursor-pointer"
                  >
                    {isSaving ? "Saving..." : "Save Header"}
                  </button>
                </div>
              </form>
            ) : (
              <div className="bg-[#faf8f4] p-4 rounded-xl border border-[#e8e2d4] space-y-1">
                <span className="inline-block bg-[#edf7f1] text-[#01722C] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  {faqSection.badge}
                </span>
                <h3 className="font-serif text-lg font-bold text-gray-900">{faqSection.title}</h3>
                <p className="text-xs text-gray-600">{faqSection.subtitle}</p>
              </div>
            )}
          </div>

          {/* Action & Filter Toolbar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200/80 shadow-xs">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search FAQs by question, answer, or category..."
                value={faqSearch}
                onChange={(e) => setFaqSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 focus:outline-emerald-600 bg-slate-50/50"
              />
            </div>

            {/* Category Filter */}
            <select
              value={faqCategoryFilter}
              onChange={(e) => setFaqCategoryFilter(e.target.value)}
              className="text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 bg-white cursor-pointer focus:outline-emerald-600"
            >
              <option value="ALL">All Categories</option>
              <option value="Certification">Certification</option>
              <option value="Purity & Nutrition">Purity &amp; Nutrition</option>
              <option value="Traditional Methods">Traditional Methods</option>
              <option value="Wholesale">Wholesale</option>
              <option value="General">General</option>
            </select>

            {/* Add FAQ Button */}
            <button
              onClick={handleOpenAddFaq}
              className="bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center justify-center gap-1.5 shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Add New FAQ</span>
            </button>
          </div>

          {/* FAQ Card List */}
          <div className="space-y-3">
            {filteredFaqs.length === 0 ? (
              <div className="bg-white rounded-2xl p-10 text-center border border-slate-200/80 space-y-3">
                <HelpCircle className="w-10 h-10 text-slate-300 mx-auto" />
                <h4 className="font-serif text-base font-bold text-slate-700">No FAQs found</h4>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  {faqSearch
                    ? "Try clearing your search query"
                    : "Get started by adding frequently asked questions for your storefront."}
                </p>
                <button
                  onClick={handleOpenAddFaq}
                  className="px-4 py-2 bg-emerald-700 text-white rounded-xl text-xs font-bold hover:bg-emerald-800 cursor-pointer"
                >
                  Create First FAQ
                </button>
              </div>
            ) : (
              filteredFaqs.map((faq, index) => (
                <div
                  key={faq.id || index}
                  className={`bg-white rounded-2xl p-5 border transition-all space-y-3 shadow-2xs ${
                    faq.is_active
                      ? "border-slate-200/80"
                      : "border-slate-200 bg-slate-50/60 opacity-75"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
                        #{faq.display_order || index + 1}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                        {faq.category || "General"}
                      </span>
                      {!faq.is_active && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200 text-slate-600">
                          Hidden
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => handleToggleFaqActive(faq.id)}
                        className={`text-[10px] font-bold px-2.5 py-1 rounded-lg border transition-all cursor-pointer flex items-center gap-1 ${
                          faq.is_active
                            ? "bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100"
                            : "bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200"
                        }`}
                        title={faq.is_active ? "Hide on storefront" : "Show on storefront"}
                      >
                        {faq.is_active ? (
                          <Eye className="w-3 h-3" />
                        ) : (
                          <EyeOff className="w-3 h-3" />
                        )}
                        <span>{faq.is_active ? "Active" : "Hidden"}</span>
                      </button>
                      <button
                        onClick={() => handleOpenEditFaq(faq)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-700 hover:bg-emerald-50 transition-colors cursor-pointer"
                        title="Edit FAQ"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteFaq(faq.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                        title="Delete FAQ"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <h4 className="font-serif font-bold text-sm text-slate-900 leading-snug">
                      {faq.question}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{faq.answer}</p>
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
      {/* TAB 5: PROMOTIONS & OFFERS (CONFIGURABLE CART & CHECKOUT OFFERS)  */}
      {/* ================================================================= */}
      {activeTab === "offers" && (
        <div className="space-y-5 animate-fade-in">
          {/* Action Header Card */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Tag className="w-5 h-5 text-emerald-700" />
                <h3 className="font-bold text-slate-900 text-sm">
                  Promotional Discounts &amp; Checkout Offers
                </h3>
              </div>
              <p className="text-xs text-slate-500">
                Configure rules such as flat discounts over threshold order values (e.g. ₹100 Off over ₹2,000) or welcome offers. Active offers display live on the checkout page.
              </p>
            </div>
            <button
              onClick={handleOpenAddCoupon}
              className="bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-xs shrink-0 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Create New Offer</span>
            </button>
          </div>

          {/* Offers List */}
          {isLoadingCoupons ? (
            <div className="p-8 text-center text-xs text-slate-400 bg-white rounded-2xl border border-slate-200">
              Loading promotional offers...
            </div>
          ) : coupons.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-2xl border border-slate-200/80 space-y-3">
              <Tag className="w-8 h-8 text-slate-300 mx-auto" />
              <div className="font-bold text-slate-700 text-sm">No Offers Configured</div>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Create your first promotional discount like "Flat ₹100 Off on orders above ₹2,000" or a 10% welcome coupon.
              </p>
              <button
                onClick={handleOpenAddCoupon}
                className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold cursor-pointer transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Offer Now</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {coupons.map((c) => {
                const minOrder = Number(c.min_order_amount) || 0;
                const discVal = Number(c.discount_value) || 0;
                const isFixed = c.discount_type === "fixed";

                return (
                  <div
                    key={c.id}
                    className={`bg-white rounded-2xl border p-5 transition-all flex flex-col justify-between gap-4 ${
                      c.is_active
                        ? "border-emerald-200/80 shadow-xs hover:border-emerald-300"
                        : "border-slate-200/80 opacity-70 bg-slate-50/50"
                    }`}
                  >
                    <div className="space-y-3">
                      {/* Top Row: Code Badge + Active Status */}
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-mono font-bold text-sm bg-emerald-50 text-emerald-900 border border-emerald-200 px-2.5 py-1 rounded-lg">
                            {c.code}
                          </span>
                          {c.is_first_order_only && (
                            <span className="text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                              <Star className="w-3 h-3 text-amber-600 fill-amber-500" />
                              <span>1st Order Only</span>
                            </span>
                          )}
                        </div>

                        <button
                          onClick={() => handleToggleCoupon(c)}
                          className={`text-[11px] font-bold px-2.5 py-1 rounded-full border transition-all cursor-pointer flex items-center gap-1.5 ${
                            c.is_active
                              ? "bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100"
                              : "bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200"
                          }`}
                          title="Click to toggle active status"
                        >
                          <span className={`w-2 h-2 rounded-full ${c.is_active ? "bg-emerald-600" : "bg-slate-400"}`} />
                          <span>{c.is_active ? "Active" : "Inactive"}</span>
                        </button>
                      </div>

                      {/* Discount Headline */}
                      <div>
                        <div className="text-xl font-black text-slate-900">
                          {isFixed ? `Flat ₹${discVal.toFixed(0)} OFF` : `${discVal}% OFF`}
                        </div>
                        <p className="text-xs text-slate-600 mt-0.5">
                          {c.description || (minOrder > 0 ? `Valid on orders above ₹${minOrder}` : "Cart promotion")}
                        </p>
                      </div>

                      {/* Criteria Badges */}
                      <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
                        <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-semibold">
                          {minOrder > 0 ? `Min Cart: ₹${minOrder.toLocaleString("en-IN")}` : "No Minimum Order"}
                        </span>
                        {c.max_discount && (
                          <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-semibold">
                            Max Cap: ₹{Number(c.max_discount).toLocaleString("en-IN")}
                          </span>
                        )}
                        {c.days_remaining !== null && c.days_remaining !== undefined ? (
                          <span className="bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded-md font-semibold flex items-center gap-1">
                            <Clock className="w-3 h-3 text-amber-600" />
                            <span>{c.days_remaining > 0 ? `Valid for ${c.days_remaining} more days` : "Expired"}</span>
                          </span>
                        ) : (
                          <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-semibold flex items-center gap-1">
                            <Clock className="w-3 h-3 text-slate-400" />
                            <span>Ongoing (No Expiry)</span>
                          </span>
                        )}
                        <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-semibold">
                          Limit: {c.usage_limit_per_user || 1} per customer
                        </span>
                        <span className="bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-md font-semibold">
                          {c.redemption_count || 0} redemptions
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                      <button
                        onClick={() => handleOpenEditCoupon(c)}
                        className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                        title="Edit Offer"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteCoupon(c)}
                        className="p-1.5 hover:bg-rose-50 rounded-lg text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                        title="Delete Offer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
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

      {/* ================================================================= */}
      {/* MODAL: ADD / EDIT PROMOTIONAL OFFER                               */}
      {/* ================================================================= */}
      {couponModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setCouponModalOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-fade-in font-sans overflow-y-auto"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl p-6 sm:p-7 max-w-lg w-full shadow-2xl border border-slate-200/80 my-8 space-y-5"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center">
                  <Tag className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-slate-900 text-base">
                    {editingCoupon ? `Edit Offer: ${editingCoupon.code}` : "Create Promotional Offer"}
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Configure cart discount rules, minimum order thresholds, and eligibility.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setCouponModalOpen(false)}
                className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveCouponSubmit} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Coupon Code * <span className="text-[11px] font-normal text-slate-400">(e.g. ONAAR100, HARVEST10)</span>
                </label>
                <input
                  type="text"
                  required
                  value={couponForm.code}
                  onChange={(e) =>
                    setCouponForm({ ...couponForm, code: e.target.value.toUpperCase() })
                  }
                  placeholder="e.g. ONAAR100"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono uppercase tracking-wider focus:outline-emerald-600 font-bold"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Offer Description *</label>
                <input
                  type="text"
                  required
                  value={couponForm.description}
                  onChange={(e) =>
                    setCouponForm({ ...couponForm, description: e.target.value })
                  }
                  placeholder="e.g. Flat ₹100 Off on orders above ₹2,000"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-emerald-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Discount Type *</label>
                  <select
                    value={couponForm.discount_type}
                    onChange={(e) =>
                      setCouponForm({ ...couponForm, discount_type: e.target.value as "fixed" | "percentage" })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-emerald-600 font-bold bg-white"
                  >
                    <option value="fixed">Fixed Amount (₹ Flat Off)</option>
                    <option value="percentage">Percentage (% Off)</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Discount Value * <span className="text-[11px] font-normal text-slate-400">({couponForm.discount_type === "fixed" ? "₹" : "%"})</span>
                  </label>
                  <input
                    type="number"
                    min="1"
                    max={couponForm.discount_type === "percentage" ? "100" : undefined}
                    required
                    value={couponForm.discount_value}
                    onChange={(e) =>
                      setCouponForm({ ...couponForm, discount_value: Number(e.target.value) })
                    }
                    placeholder={couponForm.discount_type === "fixed" ? "100" : "10"}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-emerald-600 font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Minimum Order Amount (₹)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={couponForm.min_order_amount}
                    onChange={(e) =>
                      setCouponForm({ ...couponForm, min_order_amount: Number(e.target.value) })
                    }
                    placeholder="2000 (0 for no minimum)"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-emerald-600"
                  />
                  <span className="text-[10px] text-slate-400 mt-0.5 block">
                    e.g. 2000 for "over ₹2,000"
                  </span>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Validity Period (Days)
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={couponForm.validity_days}
                    onChange={(e) =>
                      setCouponForm({ ...couponForm, validity_days: e.target.value === "" ? "" : Number(e.target.value) })
                    }
                    placeholder="e.g. 30 (blank for ongoing)"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-emerald-600"
                  />
                  <span className="text-[10px] text-slate-400 mt-0.5 block">
                    Days until offer expires
                  </span>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Max Cap (₹) (Optional)
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={couponForm.max_discount}
                    onChange={(e) =>
                      setCouponForm({ ...couponForm, max_discount: e.target.value === "" ? "" : Number(e.target.value) })
                    }
                    placeholder="e.g. 500 (blank for none)"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-emerald-600"
                  />
                  <span className="text-[10px] text-slate-400 mt-0.5 block">
                    Maximum limit for % offers
                  </span>
                </div>
              </div>

              {/* Toggles */}
              <div className="space-y-2 pt-1">
                <div className="flex items-center justify-between p-3 rounded-xl bg-amber-50/70 border border-amber-200/80">
                  <div className="space-y-0.5">
                    <label htmlFor="firstOrderOnlyToggle" className="font-bold text-amber-950 cursor-pointer block">
                      First Order Only Restriction
                    </label>
                    <p className="text-[11px] text-amber-800/80">
                      If checked, only customers with zero prior completed orders can use this code.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    id="firstOrderOnlyToggle"
                    checked={couponForm.is_first_order_only}
                    onChange={(e) =>
                      setCouponForm({ ...couponForm, is_first_order_only: e.target.checked })
                    }
                    className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500 cursor-pointer shrink-0"
                  />
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="space-y-0.5">
                    <label htmlFor="activeCouponToggle" className="font-bold text-slate-800 cursor-pointer block">
                      Active Status
                    </label>
                    <p className="text-[11px] text-slate-500">
                      Enable this promotion immediately on storefront checkout.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    id="activeCouponToggle"
                    checked={couponForm.is_active}
                    onChange={(e) =>
                      setCouponForm({ ...couponForm, is_active: e.target.checked })
                    }
                    className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer shrink-0"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setCouponModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingCoupon}
                  className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold cursor-pointer disabled:opacity-50 shadow-xs"
                >
                  {isSubmittingCoupon ? "Saving..." : editingCoupon ? "Save Changes" : "Create Offer"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* FAQ ADD / EDIT MODAL */}
      {faqModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-2xl border border-slate-100 animate-scale-up">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                  <HelpCircle className="w-4 h-4" />
                </div>
                <h3 className="font-serif text-lg font-bold text-slate-900">
                  {editingFaq ? "Edit Transparency FAQ" : "Add Transparency FAQ"}
                </h3>
              </div>
              <button
                onClick={() => setFaqModalOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveFaq} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Question <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={faqForm.question}
                  onChange={(e) => setFaqForm({ ...faqForm, question: e.target.value })}
                  placeholder="e.g. How does ONAAR prove products are 100% organic?"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-emerald-600 text-xs font-semibold"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Answer <span className="text-rose-500">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={faqForm.answer}
                  onChange={(e) => setFaqForm({ ...faqForm, answer: e.target.value })}
                  placeholder="Provide comprehensive, transparent answer for customers..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-emerald-600 text-xs leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Category / Tag</label>
                  <input
                    type="text"
                    value={faqForm.category}
                    onChange={(e) => setFaqForm({ ...faqForm, category: e.target.value })}
                    placeholder="e.g. Certification, Wholesale"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-emerald-600 text-xs"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Display Order</label>
                  <input
                    type="number"
                    min="1"
                    value={faqForm.display_order}
                    onChange={(e) =>
                      setFaqForm({ ...faqForm, display_order: Number(e.target.value) })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-emerald-600 text-xs font-mono"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="space-y-0.5">
                  <span className="font-bold text-slate-800 block">Active Status</span>
                  <p className="text-[11px] text-slate-500">
                    Visible immediately in the Transparency / About section.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={faqForm.is_active}
                  onChange={(e) => setFaqForm({ ...faqForm, is_active: e.target.checked })}
                  className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer shrink-0"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setFaqModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingFaq}
                  className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold cursor-pointer disabled:opacity-50 shadow-xs"
                >
                  {isSubmittingFaq
                    ? "Saving..."
                    : editingFaq
                    ? "Save Changes"
                    : "Create FAQ"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
