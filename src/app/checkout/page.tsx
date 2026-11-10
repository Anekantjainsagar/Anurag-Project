"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useAuth, UserAddress } from "@/context/AuthContext";
import { api } from "@/services/apiClient";
import BrandLogo from "@/components/BrandLogo";
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
  Plus,
  Minus,
  Trash2,
  Clock,
  Edit3,
  UserCheck,
  User,
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
  const { cartItems, cartTotal, totalSavings, updateQuantity, removeFromCart, clearCart, showToast, setIsLoginModalOpen } = useCart();
  const { user, isAuthenticated, addresses, addAddress } = useAuth();

  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const [isAddingNewAddress, setIsAddingNewAddress] = useState(false);
  const [saveAddressToBook, setSaveAddressToBook] = useState(true);
  const [newAddressLabel, setNewAddressLabel] = useState("Home");
  const [activeOffers, setActiveOffers] = useState<any[]>([]);

  // Fetch active store promotional offers from admin settings
  useEffect(() => {
    api.orders
      .getActiveOffers()
      .then((offers) => {
        if (Array.isArray(offers)) {
          setActiveOffers(offers);
        }
      })
      .catch(() => {});
  }, []);

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

  // Auto-fill from user profile when available
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        fullName: prev.fullName || user.full_name || "",
        phone: prev.phone || (user.phone ? user.phone.replace("+91", "") : ""),
        email: prev.email || user.email || "",
      }));
    }
  }, [user]);

  const handleSelectSavedAddress = (addr: UserAddress) => {
    setSelectedAddressId(addr.id);
    setIsAddingNewAddress(false);
    setFormData((prev) => ({
      ...prev,
      fullName: addr.recipient_name || prev.fullName,
      phone: addr.recipient_phone ? addr.recipient_phone.replace("+91", "") : prev.phone,
      flatNo: addr.flat_no,
      street: addr.street,
      landmark: addr.landmark || "",
      city: addr.city,
      state: addr.state,
      pincode: addr.pincode,
    }));
  };

  const startAddNewAddress = () => {
    setSelectedAddressId(null);
    setIsAddingNewAddress(true);
    setFormData((prev) => ({
      ...prev,
      flatNo: "",
      street: "",
      landmark: "",
      city: "",
      state: "Madhya Pradesh",
      pincode: "",
    }));
  };

  // Select default shipping address
  useEffect(() => {
    if (addresses && addresses.length > 0 && !selectedAddressId) {
      const defaultAddr = addresses.find((a) => a.is_default_shipping) || addresses[0];
      handleSelectSavedAddress(defaultAddr);
    }
  }, [addresses]);

  // Coupon Discount State
  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<{
    code: string;
    discountAmount: number;
    discountPercent?: number;
    description?: string;
  } | null>(null);

  const [dynamicShipping, setDynamicShipping] = useState({
    free_shipping_threshold: 499,
    standard_shipping_fee: 49,
    express_shipping_fee: 99,
  });

  useEffect(() => {
    api.settings
      .getSiteSettings()
      .then((res) => {
        if (res?.shipping_policy) {
          setDynamicShipping({
            free_shipping_threshold: Number(res.shipping_policy.free_shipping_threshold ?? 499),
            standard_shipping_fee: Number(res.shipping_policy.standard_shipping_fee ?? 49),
            express_shipping_fee: Number(res.shipping_policy.express_shipping_fee ?? 99),
          });
        }
      })
      .catch(() => {});
  }, []);

  const freeDeliveryThreshold = dynamicShipping.free_shipping_threshold;
  const isFreeDelivery = cartTotal >= freeDeliveryThreshold;
  const shippingFee = cartItems.length === 0 ? 0 : isFreeDelivery ? 0 : dynamicShipping.standard_shipping_fee;

  // Real discount from verified coupon (fixed or percentage)
  const discountAmount = appliedCoupon ? appliedCoupon.discountAmount : 0;
  const grandTotal = Math.max(0, cartTotal - discountAmount) + shippingFee;

  const handleApplyCoupon = async (codeToApply?: string) => {
    const code = (codeToApply || couponInput).trim().toUpperCase();
    if (!code) {
      showToast("Please enter a coupon code");
      return;
    }

    // Check if this code was already redeemed for this customer
    if (isCouponRedeemed(code)) {
      showToast(`Coupon "${code}" has already been redeemed for this account. Valid for first-time orders only.`);
      return;
    }

    try {
      const backendCheck = await api.orders.validateCoupon(
        code,
        cartTotal,
        formData.phone || undefined,
        formData.email || undefined
      );
      if (backendCheck && backendCheck.valid) {
        const discAmt = Number(backendCheck.discount_amount);
        setAppliedCoupon({
          code: backendCheck.code,
          discountAmount: discAmt,
          discountPercent: Math.round((discAmt / cartTotal) * 100),
          description: backendCheck.message,
        });
        try {
          localStorage.setItem("onaar_active_coupon", backendCheck.code);
        } catch {
          // ignore
        }
        showToast(backendCheck.message || `Coupon ${backendCheck.code} applied! (-₹${discAmt.toFixed(2)})`);
        setCouponInput("");
        return;
      } else if (backendCheck && !backendCheck.valid) {
        // Explicitly rejected by backend validation (already redeemed on email/phone/device or threshold not met)
        setAppliedCoupon(null);
        try {
          localStorage.removeItem("onaar_active_coupon");
        } catch {
          // ignore
        }
        showToast(backendCheck.message || `Coupon "${code}" has already been redeemed or is invalid.`);
        return;
      }
    } catch (err: any) {
      if (err?.message) {
        showToast(err.message);
        return;
      }
    }

    if (code === "HARVEST10" || code === "WELCOME10" || code === "ORGANIC10") {
      const savedAmount = (cartTotal * 10) / 100;
      setAppliedCoupon({
        code,
        discountAmount: savedAmount,
        discountPercent: 10,
      });
      try {
        localStorage.setItem("onaar_active_coupon", code);
      } catch {
        // ignore
      }
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

    // 1. Enforce Authentication: Customer MUST be signed in to create orders
    if (!isAuthenticated) {
      showToast("Sign in required: Please log in or register an account to place your order.", "error");
      setIsLoginModalOpen(true);
      return;
    }

    // 2. Validate Cart
    if (cartItems.length === 0) {
      showToast("Your cart is empty. Add organic staples before checkout.");
      return;
    }

    // 3. Strict validation of basic information
    const cleanName = formData.fullName.trim();
    if (!cleanName || cleanName.length < 2) {
      showToast("Please enter your full name (minimum 2 characters).");
      return;
    }

    const cleanPhoneDigits = formData.phone.replace(/\D/g, "");
    if (cleanPhoneDigits.length < 10) {
      showToast("Please enter a valid 10-digit mobile phone number.");
      return;
    }

    const cleanEmail = formData.email.trim().toLowerCase();
    if (!cleanEmail || !cleanEmail.includes("@") || !cleanEmail.includes(".")) {
      showToast("Please enter a valid email address for order confirmation & invoice.");
      return;
    }

    if (!formData.flatNo.trim()) {
      showToast("Please enter Flat / House / Apartment No.");
      return;
    }

    if (!formData.street.trim()) {
      showToast("Please enter Street Name, Colony or Locality.");
      return;
    }

    if (!formData.city.trim()) {
      showToast("Please enter City.");
      return;
    }

    if (!formData.state.trim()) {
      showToast("Please select your State.");
      return;
    }

    const cleanPin = formData.pincode.replace(/\D/g, "");
    if (cleanPin.length !== 6) {
      showToast("Please enter a valid 6-digit Indian Postal PIN code.");
      return;
    }

    setIsSubmitting(true);

    // Generate authentic sequential order number fallback
    const randomDigits = Math.floor(10000 + Math.random() * 90000);
    let orderId = `ONR-2026-${randomDigits}`;

    // Call FastAPI backend to record order in PostgreSQL
    try {
      const backendRes = await api.orders.checkoutOrder({
        customer_name: cleanName,
        customer_phone: cleanPhoneDigits.startsWith("91") && cleanPhoneDigits.length === 12 ? `+${cleanPhoneDigits}` : `+91${cleanPhoneDigits.slice(-10)}`,
        customer_email: cleanEmail,
        shipping_flat_no: formData.flatNo.trim(),
        shipping_street: formData.street.trim(),
        shipping_landmark: formData.landmark ? formData.landmark.trim() : undefined,
        shipping_city: formData.city.trim(),
        shipping_state: formData.state.trim(),
        shipping_pincode: cleanPin,
        payment_method: formData.paymentMethod.includes("COD") ? "COD" : "ONLINE",
        coupon_code: appliedCoupon?.code,
        order_notes: formData.orderNotes,
        items: cartItems.map((item) => ({
          product_id: item.id,
          product_name: item.name,
          product_image: item.image,
          packaging_size: item.weight,
          quantity: item.quantity,
          unit_price: item.price,
          subtotal: item.price * item.quantity,
        })),
      });

      if (backendRes && backendRes.order_number) {
        orderId = backendRes.order_number;
      }

      // Auto-save new address to user profile address book
      if (isAddingNewAddress && saveAddressToBook && isAuthenticated) {
        try {
          await addAddress({
            label: newAddressLabel,
            recipient_name: cleanName,
            recipient_phone: `+91${cleanPhoneDigits.slice(-10)}`,
            flat_no: formData.flatNo.trim(),
            street: formData.street.trim(),
            landmark: formData.landmark ? formData.landmark.trim() : undefined,
            city: formData.city.trim(),
            state: formData.state.trim(),
            pincode: cleanPin,
            is_default_shipping: addresses.length === 0,
            is_default_billing: addresses.length === 0,
          });
        } catch (addrErr) {
          console.warn("Auto-save address error:", addrErr);
        }
      }
    } catch (backendErr: any) {
      console.warn("FastAPI backend checkout error:", backendErr);
      if (
        backendErr?.status === 401 ||
        backendErr?.message?.includes("Authentication") ||
        backendErr?.message?.includes("log in")
      ) {
        showToast("Sign in required: Please log in to complete your order.");
        setIsSubmitting(false);
        setIsLoginModalOpen(true);
        return;
      }
      if (
        backendErr?.status === 400 ||
        backendErr?.message?.includes("coupon") ||
        backendErr?.message?.includes("offer") ||
        backendErr?.message?.includes("redeemed") ||
        backendErr?.message?.includes("first order")
      ) {
        showToast(backendErr.message || "This coupon offer is not applicable for this order.");
        setIsSubmitting(false);
        setAppliedCoupon(null);
        try {
          localStorage.removeItem("onaar_active_coupon");
        } catch {
          // ignore
        }
        return;
      }
    }

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
    <div className="flex flex-col bg-[#faf8f4] text-gray-900 font-sans">
      {/* Checkout Security Sub-header */}
      <div className="w-full bg-[#edf7f1] border-b border-[#b8ddc6]/70 py-2.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs text-[#01722C]">
          <div className="flex items-center gap-2 font-bold">
            <Lock className="w-3.5 h-3.5 text-[#01722C]" />
            <span>256-Bit SSL Encrypted Checkout</span>
          </div>
          <div className="hidden sm:flex items-center gap-3 text-[11px] font-medium text-emerald-800">
            <span>✓ 100% Certified Organic Guarantee</span>
            <span>•</span>
            <span>✓ Pay on Delivery (COD) Available</span>
          </div>
        </div>
      </div>

      {/* Main Checkout Canvas */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex-1">
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
          <div className="space-y-6">
            {/* Sign-in Required Banner if customer is not logged in */}
            {!isAuthenticated && (
              <div className="p-4 sm:p-5 bg-gradient-to-r from-emerald-50 via-teal-50 to-amber-50 border border-emerald-200/80 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-emerald-700 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <UserCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                      <span>Sign in to complete your pure harvest order</span>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                        Required
                      </span>
                    </h4>
                    <p className="text-xs text-gray-600 mt-0.5">
                      Log in with your mobile number or email to save addresses, track live courier dispatch, and unlock your first-order discount.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsLoginModalOpen(true)}
                  className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all shadow-xs shrink-0 cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Sign In / Create Account →</span>
                </button>
              </div>
            )}

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
                    {/* Saved Address Book View (when user has addresses and is not adding new) */}
                    {isAuthenticated && addresses && addresses.length > 0 && !isAddingNewAddress ? (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
                            <MapPin className="w-4 h-4 text-[#01722C]" />
                            <span>Select From Saved Delivery Addresses ({addresses.length})</span>
                          </span>
                          <button
                            type="button"
                            onClick={startAddNewAddress}
                            className="inline-flex items-center gap-1 text-xs font-bold text-[#01722C] hover:text-[#0b542c] bg-[#edf7f1] hover:bg-emerald-100 px-3 py-1.5 rounded-lg border border-[#b8dfc7] transition-all cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add New Address</span>
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {addresses.map((addr) => {
                            const isSelected = selectedAddressId === addr.id;
                            return (
                              <div
                                key={addr.id}
                                onClick={() => handleSelectSavedAddress(addr)}
                                className={`p-3.5 rounded-2xl border text-left text-xs transition-all cursor-pointer relative ${
                                  isSelected
                                    ? "bg-white border-[#01722C] ring-2 ring-[#01722C]/20 shadow-sm"
                                    : "bg-slate-50/70 border-gray-200 hover:bg-white hover:border-gray-300"
                                }`}
                              >
                                <div className="flex items-center justify-between font-bold text-gray-900 mb-1">
                                  <div className="flex items-center gap-1.5">
                                    <span className="uppercase text-[10px] tracking-wider font-extrabold px-2 py-0.5 rounded-md bg-[#edf7f1] text-[#01722C] border border-[#c6e4d0]">
                                      {addr.label || "Address"}
                                    </span>
                                    {addr.is_default_shipping && (
                                      <span className="text-[10px] font-semibold text-gray-400">
                                        (Default)
                                      </span>
                                    )}
                                  </div>
                                  <div
                                    className={`w-4 h-4 rounded-full flex items-center justify-center border transition-all ${
                                      isSelected
                                        ? "border-[#01722C] bg-[#01722C] text-white"
                                        : "border-gray-300 bg-white"
                                    }`}
                                  >
                                    {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                                  </div>
                                </div>
                                <div className="font-bold text-gray-900 text-xs mt-1">
                                  {addr.recipient_name}
                                </div>
                                <div className="text-[11px] text-gray-600 mt-0.5 leading-relaxed">
                                  {addr.flat_no}, {addr.street}
                                  {addr.landmark ? `, Near ${addr.landmark}` : ""}
                                </div>
                                <div className="text-[11px] text-gray-500 font-mono mt-0.5">
                                  {addr.city}, {addr.state} - <strong className="text-gray-700">{addr.pincode}</strong>
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {/* Selected Address Confirmation Banner */}
                        {selectedAddressId && (
                          <div className="p-3 bg-[#f8fbf9] rounded-xl border border-[#cbe4d4] flex items-center justify-between text-xs text-[#01722C]">
                            <span className="flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-[#01722C] shrink-0" />
                              <span className="font-semibold truncate">
                                Delivering to <strong>{formData.flatNo}, {formData.street}, {formData.city} ({formData.pincode})</strong>
                              </span>
                            </span>
                            <button
                              type="button"
                              onClick={startAddNewAddress}
                              className="text-[11px] font-bold text-[#01722C] hover:underline ml-2 shrink-0 cursor-pointer"
                            >
                              Deliver Somewhere Else →
                            </button>
                          </div>
                        )}
                      </div>
                    ) : (
                      /* New Address Input Form */
                      <div className="space-y-4 animate-fade-in">
                        {isAuthenticated && addresses && addresses.length > 0 && (
                          <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                            <span className="text-xs font-bold text-gray-800">
                              Enter New Delivery Address
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                setIsAddingNewAddress(false);
                                if (addresses.length > 0) {
                                  handleSelectSavedAddress(addresses[0]);
                                }
                              }}
                              className="text-xs font-bold text-[#01722C] hover:underline cursor-pointer"
                            >
                              ← Back to Saved Addresses
                            </button>
                          </div>
                        )}

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

                        {/* Save to Profile Checkbox (if logged in) */}
                        {isAuthenticated && (
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-emerald-50/70 border border-emerald-200/80 rounded-xl">
                            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-emerald-950">
                              <input
                                type="checkbox"
                                checked={saveAddressToBook}
                                onChange={(e) => setSaveAddressToBook(e.target.checked)}
                                className="w-4 h-4 text-[#01722C] rounded border-gray-300 focus:ring-[#01722C] cursor-pointer"
                              />
                              <span>Save this address to my profile address book for future 1-click checkout</span>
                            </label>
                            <div className="flex items-center gap-2">
                              <span className="text-[11px] text-gray-500 font-medium">Tag:</span>
                              <select
                                value={newAddressLabel}
                                onChange={(e) => setNewAddressLabel(e.target.value)}
                                className="text-xs bg-white border border-gray-300 rounded-lg px-2.5 py-1 font-semibold text-gray-700 cursor-pointer"
                              >
                                <option value="Home">Home</option>
                                <option value="Work">Work</option>
                                <option value="Farm">Farm</option>
                                <option value="Other">Other</option>
                              </select>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

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

                  {/* Itemized Order List with Live Quantity Controls */}
                  <div className="space-y-3 max-h-80 overflow-y-auto pr-1 divide-y divide-gray-100">
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="pt-2.5 first:pt-0 flex items-center justify-between gap-3 text-xs"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-12 h-12 object-cover rounded-xl border border-gray-200 shrink-0 bg-white"
                          />
                          <div className="min-w-0">
                            <div className="font-bold text-gray-900 truncate max-w-[140px] sm:max-w-[180px]">
                              {item.name}
                            </div>
                            <div className="text-[11px] text-gray-500 flex items-center gap-1.5 mt-0.5">
                              <span className="font-semibold bg-emerald-50 text-emerald-800 px-1.5 py-0.2 rounded border border-emerald-200/50">
                                {item.weight}
                              </span>
                              <span>•</span>
                              <span>₹{item.price.toFixed(2)} each</span>
                            </div>
                          </div>
                        </div>

                        {/* Quantity Stepper & Remove */}
                        <div className="flex items-center gap-2 shrink-0">
                          <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50 overflow-hidden shadow-2xs">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-red-600 hover:bg-gray-200/80 transition-colors cursor-pointer"
                              title="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-7 text-center font-bold text-gray-900 text-xs font-mono">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-[#01722C] hover:bg-gray-200/80 transition-colors cursor-pointer"
                              title="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <span className="font-bold text-gray-900 min-w-[62px] text-right font-mono">
                            ₹{(item.price * item.quantity).toFixed(2)}
                          </span>

                          <button
                            type="button"
                            onClick={() => removeFromCart(item.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors p-1 cursor-pointer"
                            title="Remove item from order"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Coupon Code Section */}
                  <div className="pt-3 border-t border-gray-100 space-y-3">
                    <div className="text-xs font-bold text-gray-700 flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Tag className="w-3.5 h-3.5 text-[#01722C]" />
                        <span>Have a Promo / Coupon Code?</span>
                      </span>
                      {appliedCoupon && (
                        <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                          {appliedCoupon.discountPercent ? `${appliedCoupon.discountPercent}% OFF APPLIED` : `₹${appliedCoupon.discountAmount} OFF APPLIED`}
                        </span>
                      )}
                    </div>

                    {appliedCoupon ? (
                      <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 p-3 rounded-xl text-xs">
                        <div className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-emerald-700 shrink-0" />
                          <div>
                            <div className="font-bold text-emerald-950 flex items-center gap-1.5">
                              <span>{appliedCoupon.code}</span>
                              <span className="text-[11px] font-semibold text-emerald-700">
                                (-₹{discountAmount.toFixed(2)})
                              </span>
                            </div>
                            {appliedCoupon.description && (
                              <p className="text-[11px] text-emerald-800/80">
                                {appliedCoupon.description}
                              </p>
                            )}
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={handleRemoveCoupon}
                          className="text-xs text-rose-600 hover:text-rose-800 font-bold cursor-pointer shrink-0 ml-2"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-2.5">
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="Enter promo code (e.g. ONAAR100)"
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

                        {/* Live Active Promotional Offers Configured in Admin Panel */}
                        {activeOffers.length > 0 && (
                          <div className="space-y-1.5 pt-1">
                            <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                              <Sparkles className="w-3 h-3 text-[#01722C]" />
                              <span>Store Offers &amp; Discounts</span>
                            </div>
                            <div className="space-y-1.5">
                              {activeOffers.map((offer) => {
                                const minAmt = Number(offer.min_order_amount) || 0;
                                const isEligible = cartTotal >= minAmt;
                                const diff = minAmt - cartTotal;
                                const isWelcome = offer.is_first_order_only;

                                return (
                                  <div
                                    key={offer.id || offer.code}
                                    className={`p-2.5 rounded-xl border text-xs transition-all ${
                                      isEligible
                                        ? "bg-emerald-50/60 border-emerald-200"
                                        : "bg-gray-50/70 border-gray-200 opacity-80"
                                    }`}
                                  >
                                    <div className="flex items-center justify-between gap-2">
                                      <div className="min-w-0">
                                        <div className="flex items-center gap-1.5 flex-wrap">
                                          <span className="font-mono font-bold text-[#01722C] bg-white px-2 py-0.5 rounded border border-[#01722C]/30 text-[11px]">
                                            {offer.code}
                                          </span>
                                          {isWelcome && (
                                            <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded">
                                              1st Order Only
                                            </span>
                                          )}
                                          <span className="font-bold text-gray-900 text-[11px]">
                                            {offer.discount_type === "fixed"
                                              ? `Flat ₹${Number(offer.discount_value).toFixed(0)} OFF`
                                              : `${Number(offer.discount_value).toFixed(0)}% OFF`}
                                          </span>
                                          {offer.days_remaining !== null && offer.days_remaining !== undefined && (
                                            <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-100/70 px-1.5 py-0.2 rounded flex items-center gap-1">
                                              <Clock className="w-2.5 h-2.5 text-emerald-700" />
                                              <span>{offer.days_remaining > 0 ? `Valid for ${offer.days_remaining}d` : "Expires today"}</span>
                                            </span>
                                          )}
                                        </div>
                                        <p className="text-[11px] text-gray-600 mt-0.5 truncate">
                                          {offer.description || (minAmt > 0 ? `Valid on orders above ₹${minAmt}` : "Special seasonal discount")}
                                        </p>
                                      </div>
                                      <div>
                                        {isEligible ? (
                                          <button
                                            type="button"
                                            onClick={() => handleApplyCoupon(offer.code)}
                                            className="bg-[#01722C] hover:bg-[#0b542c] text-white text-[11px] font-bold px-3 py-1.5 rounded-lg transition-all cursor-pointer shrink-0 active:scale-95 shadow-2xs"
                                          >
                                            Apply
                                          </button>
                                        ) : (
                                          <span className="text-[10px] font-semibold text-gray-500 block text-right leading-tight bg-gray-100 px-2 py-1 rounded">
                                            Add ₹{diff.toFixed(0)} more
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
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
                      <div className="flex justify-between text-emerald-700 font-bold bg-emerald-50/60 p-2 rounded-xl border border-emerald-100">
                        <span className="flex items-center gap-1.5">
                          <Tag className="w-3.5 h-3.5 text-emerald-700" />
                          <span>
                            Coupon Discount ({appliedCoupon?.code}
                            {appliedCoupon?.discountPercent ? ` • ${appliedCoupon.discountPercent}%` : ""})
                          </span>
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
                    ) : !isAuthenticated ? (
                      <>
                        <Lock className="w-4 h-4" />
                        <span>SIGN IN TO PLACE ORDER (PAY ₹{grandTotal.toFixed(2)} ON DELIVERY)</span>
                      </>
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
        </div>
        )}
      </main>
    </div>
  );
}
