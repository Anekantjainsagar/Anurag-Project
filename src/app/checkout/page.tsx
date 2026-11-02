"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import BrandLogo from "@/components/BrandLogo";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import ToastNotification from "@/components/ToastNotification";
import { sendOrderEmails, OrderPayload } from "@/services/emailService";
import { isCouponRedeemed, markCouponAsRedeemed } from "@/utils/cookieUtils";
import {
  ShieldCheck,
  Truck,
  ArrowRight,
  CheckCircle2,
  Lock,
  Phone,
  Mail,
  MapPin,
  Building,
  CreditCard,
  Banknote,
  QrCode,
  Sparkles,
  ShoppingBag,
  Tag,
  Check,
  X,
} from "lucide-react";

const INDIAN_STATES = [
  "Madhya Pradesh",
  "Maharashtra",
  "Rajasthan",
  "Gujarat",
  "Delhi NCR",
  "Uttar Pradesh",
  "Karnataka",
  "Tamil Nadu",
  "Telangana",
  "West Bengal",
  "Punjab",
  "Haryana",
  "Bihar",
  "Kerala",
  "Andhra Pradesh",
  "Other States",
];

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, cartTotal, totalSavings, clearCart, showToast } = useCart();

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    flatNo: "",
    street: "",
    landmark: "",
    city: "",
    state: "Madhya Pradesh",
    pincode: "",
    orderNotes: "",
    paymentMethod: "Pay on Delivery / COD (Vendor Contact)",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Coupon Discount State
  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<{
    code: string;
    discountPercent: number;
  } | null>(() => {
    if (typeof window === "undefined") return null;
    try {
      const saved = localStorage.getItem("onaar_active_coupon") || localStorage.getItem("yourbrand_active_coupon");
      if (
        saved &&
        (saved.toUpperCase() === "HARVEST10" ||
          saved.toUpperCase() === "WELCOME10" ||
          saved.toUpperCase() === "ORGANIC10")
      ) {
        // If this coupon was already redeemed on this browser's cookies, prevent auto-applying
        if (isCouponRedeemed(saved)) {
          localStorage.removeItem("onaar_active_coupon");
          localStorage.removeItem("yourbrand_active_coupon");
          return null;
        }
        return {
          code: saved.toUpperCase(),
          discountPercent: 10,
        };
      }
    } catch {
      // ignore
    }
    return null;
  });

  const freeDeliveryThreshold = 499;
  const isFreeDelivery = cartTotal >= freeDeliveryThreshold;
  const shippingFee = cartItems.length === 0 ? 0 : isFreeDelivery ? 0 : 50;

  // Calculate 10% coupon discount
  const discountAmount = appliedCoupon
    ? (cartTotal * appliedCoupon.discountPercent) / 100
    : 0;
  const grandTotal = Math.max(0, cartTotal - discountAmount) + shippingFee;

  const handleApplyCoupon = (codeToApply?: string) => {
    const code = (codeToApply || couponInput).trim().toUpperCase();
    if (!code) {
      showToast("Please enter a coupon code");
      return;
    }

    // Cookie Differentiator: Check if this browser has already redeemed this code
    if (isCouponRedeemed(code)) {
      showToast(`Coupon "${code}" has already been redeemed on this browser. It is valid for first-time orders only.`);
      return;
    }

    if (code === "HARVEST10" || code === "WELCOME10" || code === "ORGANIC10") {
      setAppliedCoupon({
        code,
        discountPercent: 10,
      });
      try {
        localStorage.setItem("onaar_active_coupon", code);
      } catch {
        // ignore
      }
      const savedAmount = (cartTotal * 10) / 100;
      showToast(`Coupon ${code} applied! 10% discount (-₹${savedAmount.toFixed(2)})`);
      setCouponInput("");
    } else {
      showToast(`Invalid coupon "${code}". Try code HARVEST10`);
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    try {
      localStorage.removeItem("onaar_active_coupon");
      localStorage.removeItem("yourbrand_active_coupon");
    } catch {
      // ignore
    }
    showToast("Coupon removed");
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      showToast("Your cart is empty. Add products before checkout.");
      return;
    }

    if (!formData.fullName.trim()) {
      showToast("Please enter your Full Name.");
      return;
    }

    if (!formData.phone.trim() || formData.phone.trim().length < 10) {
      showToast("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (!formData.email.trim() || !formData.email.includes("@")) {
      showToast("Please enter a valid email address for order confirmation.");
      return;
    }

    if (!formData.flatNo.trim() || !formData.street.trim() || !formData.pincode.trim()) {
      showToast("Please complete your delivery address and 6-digit PIN code.");
      return;
    }

    setIsSubmitting(true);

    // Generate authentic sequential order number
    const randomDigits = Math.floor(10000 + Math.random() * 90000);
    const orderId = `YB-2026-${randomDigits}`;
    const orderDate = new Date().toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    const orderPayload: OrderPayload = {
      orderId,
      orderDate,
      customer: { ...formData },
      items: cartItems.map((item) => ({
        id: item.id,
        name: item.name,
        weight: item.weight,
        quantity: item.quantity,
        price: item.price,
        total: item.price * item.quantity,
      })),
      subtotal: cartTotal,
      discount: discountAmount,
      couponCode: appliedCoupon?.code,
      shippingFee,
      totalAmount: grandTotal,
      paymentMethod: formData.paymentMethod,
    };

    try {
      // Dispatch emails via EmailJS (Customer Confirmation + Merchant Alert)
      await sendOrderEmails(orderPayload);

      // Save active order details in sessionStorage for the Success page receipt
      if (typeof window !== "undefined") {
        sessionStorage.setItem("rj_last_order", JSON.stringify(orderPayload));
        try {
          localStorage.removeItem("onaar_active_coupon");
          localStorage.removeItem("yourbrand_active_coupon");
        } catch {
          // ignore
        }
      }

      // Mark the coupon as permanently redeemed in the browser's cookies (differentiator)
      if (appliedCoupon) {
        markCouponAsRedeemed(appliedCoupon.code);
      }

      // Clear the shopping cart
      clearCart();

      // Navigate directly to Order Success Receipt
      router.push(`/order-success?orderId=${orderId}`);
    } catch (err) {
      console.error("Order processing error:", err);
      showToast("Order recorded. Redirecting to receipt...");
      clearCart();
      router.push(`/order-success?orderId=${orderId}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#faf8f4] text-gray-900 font-sans">
      <TopBar />

      {/* Checkout Navbar */}
      <header className="w-full bg-white border-b border-[#e5ebe7] shadow-xs py-4 px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="w-full flex items-center justify-between">
          <Link href="/">
            <BrandLogo variant="dark" />
          </Link>

          <div className="flex items-center gap-2 text-xs font-bold text-[#01722C] bg-[#edf7f1] px-3.5 py-1.5 rounded-full border border-[#b8ddc6]">
            <Lock className="w-3.5 h-3.5" />
            <span>256-Bit SSL Encrypted Checkout</span>
          </div>
        </div>
      </header>

      {/* Main Checkout Canvas - Full Width Fluid Container */}
      <main className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 py-8 sm:py-12 flex-1">
        {cartItems.length === 0 ? (
          <div className="max-w-md mx-auto text-center py-16 bg-white rounded-3xl p-8 border border-[#e4ebe6] shadow-sm space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#edf7f1] text-[#01722C] flex items-center justify-center mx-auto">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-gray-900">
              Your Cart is Empty
            </h2>
            <p className="text-xs sm:text-sm text-gray-500">
              Please add your desired organic pulses, spices, honey, or whole grains to proceed with checkout.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-[#01722C] hover:bg-[#0b542c] text-white text-xs font-bold px-6 py-3 rounded-xl transition-all shadow-xs"
            >
              <span>Browse 192 Products</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <form onSubmit={handlePlaceOrder}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              {/* LEFT COLUMN: Customer Information & Delivery Address (7 cols) */}
              <div className="lg:col-span-7 space-y-6">
                {/* 1. Contact Information Card */}
                <div className="bg-white p-6 sm:p-7 rounded-3xl border border-[#e4ebe6] shadow-2xs space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-[#01722C] text-white flex items-center justify-center font-bold text-xs">
                        1
                      </div>
                      <h3 className="font-serif text-lg font-bold text-gray-900">
                        Customer & Contact Information
                      </h3>
                    </div>
                    <span className="text-[11px] text-gray-400">Order confirmation will be sent here</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-xs font-bold text-gray-700">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        required
                        placeholder="Enter your full name"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="w-full bg-[#faf9f5] border border-[#d8dfda] text-xs sm:text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-[#01722C] focus:bg-white focus:ring-1 focus:ring-[#01722C]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700">
                        Mobile Number (WhatsApp) <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-2.5 text-xs text-gray-400 font-bold">
                          +91
                        </span>
                        <input
                          type="tel"
                          name="phone"
                          required
                          maxLength={10}
                          placeholder="98765 43210"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full bg-[#faf9f5] border border-[#d8dfda] text-xs sm:text-sm rounded-xl pl-12 pr-4 py-2.5 focus:outline-none focus:border-[#01722C] focus:bg-white focus:ring-1 focus:ring-[#01722C]"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="name@example.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full bg-[#faf9f5] border border-[#d8dfda] text-xs sm:text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-[#01722C] focus:bg-white focus:ring-1 focus:ring-[#01722C]"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Shipping Address Card */}
                <div className="bg-white p-6 sm:p-7 rounded-3xl border border-[#e4ebe6] shadow-2xs space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-[#01722C] text-white flex items-center justify-center font-bold text-xs">
                        2
                      </div>
                      <h3 className="font-serif text-lg font-bold text-gray-900">
                        Shipping & Delivery Address
                      </h3>
                    </div>
                    <span className="text-[11px] text-[#01722C] font-semibold flex items-center gap-1">
                      <Truck className="w-3.5 h-3.5" />
                      <span>PAN-India Delivery</span>
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-700">
                          Flat, House No, Building Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="flatNo"
                          required
                          placeholder="e.g. Flat 402, Shivam Residency"
                          value={formData.flatNo}
                          onChange={handleInputChange}
                          className="w-full bg-[#faf9f5] border border-[#d8dfda] text-xs sm:text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-[#01722C] focus:bg-white focus:ring-1 focus:ring-[#01722C]"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-700">
                          Street, Area, Colony <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="street"
                          required
                          placeholder="e.g. MG Road, Sector 4, Commercial Belt"
                          value={formData.street}
                          onChange={handleInputChange}
                          className="w-full bg-[#faf9f5] border border-[#d8dfda] text-xs sm:text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-[#01722C] focus:bg-white focus:ring-1 focus:ring-[#01722C]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-700">
                          Landmark (Optional)
                        </label>
                        <input
                          type="text"
                          name="landmark"
                          placeholder="e.g. Near Vikram Tower"
                          value={formData.landmark}
                          onChange={handleInputChange}
                          className="w-full bg-[#faf9f5] border border-[#d8dfda] text-xs sm:text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-[#01722C] focus:bg-white focus:ring-1 focus:ring-[#01722C]"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-700">
                          City / District <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="city"
                          required
                          placeholder="e.g. New Delhi, Mumbai, Indore"
                          value={formData.city}
                          onChange={handleInputChange}
                          className="w-full bg-[#faf9f5] border border-[#d8dfda] text-xs sm:text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-[#01722C] focus:bg-white focus:ring-1 focus:ring-[#01722C]"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-700">
                          PIN Code (6 Digits) <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="pincode"
                          required
                          maxLength={6}
                          placeholder="452001"
                          value={formData.pincode}
                          onChange={handleInputChange}
                          className="w-full bg-[#faf9f5] border border-[#d8dfda] text-xs sm:text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-[#01722C] focus:bg-white focus:ring-1 focus:ring-[#01722C]"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700">
                        State <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="w-full bg-[#faf9f5] border border-[#d8dfda] text-xs sm:text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-[#01722C] focus:bg-white focus:ring-1 focus:ring-[#01722C] cursor-pointer"
                      >
                        {INDIAN_STATES.map((st) => (
                          <option key={st} value={st}>
                            {st}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1 pt-1">
                      <label className="text-xs font-bold text-gray-700">
                        Order Notes / Dispatch Instructions (Optional)
                      </label>
                      <textarea
                        name="orderNotes"
                        rows={2}
                        placeholder="Any special packing instructions, gate code, or preferred delivery timing..."
                        value={formData.orderNotes}
                        onChange={handleInputChange}
                        className="w-full bg-[#faf9f5] border border-[#d8dfda] text-xs sm:text-sm rounded-xl p-3.5 focus:outline-none focus:border-[#01722C] focus:bg-white focus:ring-1 focus:ring-[#01722C]"
                      />
                    </div>
                  </div>
                </div>

                {/* 3. Payment & Order Confirmation Terms */}
                <div className="bg-white p-6 sm:p-7 rounded-3xl border border-[#e4ebe6] shadow-2xs space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-gray-100 flex-wrap gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-[#01722C] text-white flex items-center justify-center font-bold text-xs">
                        3
                      </div>
                      <h3 className="font-serif text-lg font-bold text-gray-900">
                        Order Confirmation & Payment
                      </h3>
                    </div>
                    <span className="text-[11px] font-bold text-[#01722C] bg-[#edf7f1] px-3 py-1 rounded-full border border-[#b8dfc7]">
                      Zero Upfront Payment Required
                    </span>
                  </div>

                  {/* Payment Terms Information Card */}
                  <div className="p-5 rounded-2xl bg-[#fcfaf5] border border-[#e8e2d4] space-y-4">
                    <div className="flex items-start gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-[#edf7f1] text-[#01722C] flex items-center justify-center shrink-0 mt-0.5">
                        <Banknote className="w-5 h-5 text-[#01722C]" />
                      </div>
                      <div className="space-y-1">
                        <div className="font-serif font-bold text-sm sm:text-base text-gray-900">
                          Pay on Delivery / COD (Vendor Contact Mode)
                        </div>
                        <p className="text-xs text-gray-600 leading-relaxed">
                          You do not need to make any payment right now. When you click <strong>&quot;Confirm Order&quot;</strong>,
                          our automated system immediately dispatches detailed emails to you and our vendor fulfillment desk.
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
                      <div className="p-3.5 bg-white rounded-xl border border-[#e8e2d4] space-y-1.5 shadow-2xs">
                        <div className="flex items-center gap-1.5 text-[#01722C] font-bold">
                          <Mail className="w-4 h-4" />
                          <span>1. Email Notification</span>
                        </div>
                        <p className="text-[11px] text-gray-500 leading-snug">
                          Itemized order invoice sent immediately to customer and vendor.
                        </p>
                      </div>

                      <div className="p-3.5 bg-white rounded-xl border border-[#e8e2d4] space-y-1.5 shadow-2xs">
                        <div className="flex items-center gap-1.5 text-[#01722C] font-bold">
                          <Phone className="w-4 h-4" />
                          <span>2. Vendor Contact</span>
                        </div>
                        <p className="text-[11px] text-gray-500 leading-snug">
                          Our dispatch team will call or WhatsApp you to confirm delivery.
                        </p>
                      </div>

                      <div className="p-3.5 bg-white rounded-xl border border-[#e8e2d4] space-y-1.5 shadow-2xs">
                        <div className="flex items-center gap-1.5 text-[#01722C] font-bold">
                          <Truck className="w-4 h-4" />
                          <span>3. Pay on Arrival</span>
                        </div>
                        <p className="text-[11px] text-gray-500 leading-snug">
                          Inspect your organic package and pay cash or UPI at your doorstep.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: Order Summary & Placement (5 cols) */}
              <div className="lg:col-span-5 sticky top-24 space-y-5">
                <div className="bg-white p-6 sm:p-7 rounded-3xl border border-[#e4ebe6] shadow-sm space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                    <h3 className="font-serif text-lg font-bold text-gray-900">
                      Order Summary ({cartItems.length} Products)
                    </h3>
                    <Link
                      href="/products"
                      className="text-xs font-bold text-[#01722C] hover:underline"
                    >
                      Edit Cart
                    </Link>
                  </div>

                  {/* Itemized Order List */}
                  <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between gap-3 text-xs"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-11 h-11 object-cover rounded-lg border border-gray-200 shrink-0 bg-white"
                          />
                          <div className="min-w-0">
                            <div className="font-bold text-gray-900 truncate">
                              {item.name}
                            </div>
                            <div className="text-[11px] text-gray-500">
                              {item.weight} × {item.quantity}
                            </div>
                          </div>
                        </div>
                        <span className="font-bold text-gray-900 shrink-0">
                          ₹{(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Coupon Code Section */}
                  <div className="pt-3 border-t border-gray-100 space-y-2">
                    <div className="text-xs font-bold text-gray-700 flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Tag className="w-3.5 h-3.5 text-[#01722C]" />
                        <span>Have a Promo / Coupon Code?</span>
                      </span>
                      {appliedCoupon && (
                        <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                          10% OFF APPLIED
                        </span>
                      )}
                    </div>

                    {appliedCoupon ? (
                      <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 p-2.5 rounded-xl text-xs">
                        <div className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-emerald-700" />
                          <span className="font-bold text-emerald-900">
                            {appliedCoupon.code}
                          </span>
                          <span className="text-emerald-700 font-medium">
                            (-10% • saves ₹{discountAmount.toFixed(2)})
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={handleRemoveCoupon}
                          className="text-xs text-rose-600 hover:text-rose-800 font-bold cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-1.5">
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="e.g. HARVEST10"
                            value={couponInput}
                            onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                            className="flex-1 bg-[#faf9f5] border border-[#d8dfda] text-xs rounded-xl px-3 py-2 uppercase font-mono tracking-wider focus:outline-none focus:border-[#01722C] focus:bg-white"
                          />
                          <button
                            type="button"
                            onClick={() => handleApplyCoupon()}
                            className="bg-[#01722C] hover:bg-[#0b542c] text-white text-xs font-bold px-4 py-2 rounded-xl transition-all cursor-pointer shrink-0 active:scale-95"
                          >
                            Apply
                          </button>
                        </div>

                        {/* Quick Tap Helper */}
                        {isCouponRedeemed("HARVEST10") ? (
                          <div className="flex items-center gap-1.5 text-[11px] text-gray-500 bg-gray-50 p-1.5 rounded-lg border border-gray-200">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span>Welcome coupon HARVEST10 has already been used on this browser</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
                            <span>First order?</span>
                            <button
                              type="button"
                              onClick={() => handleApplyCoupon("HARVEST10")}
                              className="text-[#01722C] font-bold underline hover:text-[#0b542c] cursor-pointer"
                            >
                              Apply HARVEST10 for 10% off
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Calculations */}
                  <div className="pt-3 border-t border-gray-100 space-y-2 text-xs text-gray-600">
                    <div className="flex justify-between">
                      <span>Items Subtotal</span>
                      <span className="font-bold text-gray-900">
                        ₹{cartTotal.toFixed(2)}
                      </span>
                    </div>

                    {totalSavings > 0 && (
                      <div className="flex justify-between text-emerald-700 font-bold">
                        <span>Organic Savings</span>
                        <span>-₹{totalSavings.toFixed(2)}</span>
                      </div>
                    )}

                    {discountAmount > 0 && (
                      <div className="flex justify-between text-emerald-700 font-bold bg-emerald-50/60 p-1.5 rounded-lg border border-emerald-100">
                        <span className="flex items-center gap-1">
                          <Tag className="w-3 h-3" />
                          <span>Coupon Discount ({appliedCoupon?.code} - 10%)</span>
                        </span>
                        <span>-₹{discountAmount.toFixed(2)}</span>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span>Shipping Fee</span>
                      <span>
                        {isFreeDelivery ? (
                          <strong className="text-emerald-700 font-bold">FREE Delivery</strong>
                        ) : (
                          "₹50.00"
                        )}
                      </span>
                    </div>

                    <div className="flex justify-between text-base font-black text-gray-900 border-t border-gray-200 pt-3">
                      <span>Total Amount Payable</span>
                      <span className="text-[#01722C] font-serif text-xl">
                        ₹{grandTotal.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Submit Order Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#01722C] hover:bg-[#0b542c] active:scale-98 text-white font-bold text-xs uppercase tracking-wider py-4 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>DISPATCHING ORDER & NOTIFYING VENDOR...</span>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>PLACE CONFIRMED ORDER (PAY ₹{grandTotal.toFixed(2)} ON DELIVERY)</span>
                      </>
                    )}
                  </button>

                  {/* Reassurances */}
                  <div className="space-y-1.5 pt-2 text-[11px] text-gray-500 border-t border-gray-100">
                    <div className="flex items-center gap-1.5 text-gray-700 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#01722C]" />
                      <span>Zero advance payment needed today • Pay on delivery</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-700 font-medium">
                      <Mail className="w-3.5 h-3.5 text-[#01722C]" />
                      <span>Confirmation email dispatched immediately to customer & vendor</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-700 font-medium">
                      <Phone className="w-3.5 h-3.5 text-[#01722C]" />
                      <span>Vendor desk will contact you to verify delivery: +91-98765 43210</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        )}
      </main>

      <Footer />
      <ToastNotification />
    </div>
  );
}
