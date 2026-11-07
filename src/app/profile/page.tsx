"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth, UserAddress } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { api } from "@/services/apiClient";
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import LoginModal from "@/components/LoginModal";
import {
  User,
  MapPin,
  Package,
  Plus,
  Trash2,
  CheckCircle2,
  ShieldCheck,
  Truck,
  ArrowRight,
  Save,
  LogOut,
  ChevronRight,
  Phone,
  Mail,
  Sparkles,
  Home,
  Briefcase,
  Building,
  Check,
  X,
  Clock,
  ExternalLink,
} from "lucide-react";

const DIETARY_OPTIONS = [
  "All-Natural & Organic Enthusiast",
  "Jain / Satvik (No Onion & Garlic)",
  "Plant-Based / Vegan",
  "Gluten-Free Diet",
  "Diabetic Friendly / Low GI",
  "Traditional Ayurvedic",
];

function ProfileContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") || "profile";

  const {
    user,
    isAuthenticated,
    isLoading: isAuthLoading,
    addresses,
    updateProfile,
    addAddress,
    updateAddress,
    deleteAddress,
    logout,
  } = useAuth();

  const { setIsLoginModalOpen, showToast } = useCart();

  const [activeTab, setActiveTab] = useState<"profile" | "addresses" | "orders">(
    initialTab === "orders" ? "orders" : initialTab === "addresses" ? "addresses" : "profile"
  );

  // Profile Form State
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [dietaryPref, setDietaryPref] = useState("");
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  // Address Modal State
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);
  const [addressForm, setAddressForm] = useState({
    label: "Home",
    recipient_name: "",
    recipient_phone: "",
    flat_no: "",
    street: "",
    landmark: "",
    city: "",
    state: "Madhya Pradesh",
    pincode: "",
    is_default_shipping: false,
    is_default_billing: false,
    delivery_instructions: "",
  });
  const [isSavingAddress, setIsSavingAddress] = useState(false);

  // Orders State
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoadingOrders, setIsLoadingOrders] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);

  // Sync profile details when user is loaded
  useEffect(() => {
    if (user) {
      setFullName(user.full_name || "");
      setEmail(user.email || "");
      setDietaryPref(user.dietary_preference || DIETARY_OPTIONS[0]);
    }
  }, [user]);

  // Load orders when activeTab becomes 'orders'
  useEffect(() => {
    if (activeTab === "orders" && isAuthenticated) {
      loadOrders();
    }
  }, [activeTab, isAuthenticated]);

  const loadOrders = async () => {
    setIsLoadingOrders(true);
    try {
      const data = await api.orders.getMyOrders();
      setOrders(data || []);
    } catch {
      // Fallback empty or mock if backend offline
      setOrders([]);
    } finally {
      setIsLoadingOrders(false);
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      showToast("Please enter your name");
      return;
    }
    setIsSavingProfile(true);
    const success = await updateProfile({
      full_name: fullName,
      email: email || undefined,
      dietary_preference: dietaryPref,
    });
    setIsSavingProfile(false);
    if (success) {
      showToast("Profile details updated successfully!");
    } else {
      showToast("Failed to save changes. Please try again.");
    }
  };

  const openAddAddressModal = () => {
    setEditingAddressId(null);
    setAddressForm({
      label: "Home",
      recipient_name: user?.full_name || "",
      recipient_phone: user?.phone || "",
      flat_no: "",
      street: "",
      landmark: "",
      city: "",
      state: "Madhya Pradesh",
      pincode: "",
      is_default_shipping: addresses.length === 0,
      is_default_billing: addresses.length === 0,
      delivery_instructions: "",
    });
    setIsAddressModalOpen(true);
  };

  const openEditAddressModal = (addr: UserAddress) => {
    setEditingAddressId(addr.id);
    setAddressForm({
      label: addr.label,
      recipient_name: addr.recipient_name,
      recipient_phone: addr.recipient_phone,
      flat_no: addr.flat_no,
      street: addr.street,
      landmark: addr.landmark || "",
      city: addr.city,
      state: addr.state,
      pincode: addr.pincode,
      is_default_shipping: addr.is_default_shipping,
      is_default_billing: addr.is_default_billing,
      delivery_instructions: addr.delivery_instructions || "",
    });
    setIsAddressModalOpen(true);
  };

  const handleSaveAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!addressForm.recipient_name || !addressForm.recipient_phone || !addressForm.flat_no || !addressForm.street || !addressForm.city || !addressForm.pincode) {
      showToast("Please fill all required address fields");
      return;
    }

    setIsSavingAddress(true);
    let success = false;
    if (editingAddressId) {
      success = await updateAddress(editingAddressId, addressForm);
    } else {
      success = await addAddress(addressForm);
    }
    setIsSavingAddress(false);

    if (success) {
      showToast(editingAddressId ? "Address updated successfully" : "New address added to book");
      setIsAddressModalOpen(false);
    } else {
      showToast("Failed to save address. Please check inputs.");
    }
  };

  const handleDeleteAddress = async (id: string) => {
    if (confirm("Are you sure you want to remove this delivery address?")) {
      const success = await deleteAddress(id);
      if (success) {
        showToast("Address deleted");
      }
    }
  };

  const handleSetDefaultShipping = async (addr: UserAddress) => {
    await updateAddress(addr.id, { is_default_shipping: true });
    showToast(`Set as default shipping address`);
  };

  // Not authenticated view
  if (!isAuthLoading && !isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col bg-[#fbfdfc] font-sans">
        <TopBar />
        <Navbar />
        <div className="flex-1 flex items-center justify-center px-4 py-16">
          <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-gray-100 shadow-xl text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-[#edf7f1] text-[#01722C] mx-auto flex items-center justify-center">
              <User className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h2 className="font-serif text-2xl font-bold text-gray-900">
                Customer Account Access
              </h2>
              <p className="text-sm text-gray-600">
                Sign in with your phone or email OTP to view your past orders, manage your saved shipping addresses, and customize your diet profile.
              </p>
            </div>
            <div className="pt-2 flex flex-col gap-3">
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="w-full bg-[#01722C] hover:bg-[#0b542c] text-white py-3.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
              >
                <span>SIGN IN VIA SECURE OTP</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <Link
                href="/"
                className="text-xs text-gray-500 hover:text-gray-800 transition-colors"
              >
                Continue shopping as guest →
              </Link>
            </div>
          </div>
        </div>
        <LoginModal />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fbfdfc] pb-24 font-sans text-gray-800">
      {/* Top Banner / Breadcrumb */}
      <div className="bg-[#f2f7f4] border-b border-[#e1ede5] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs text-gray-500 mb-3">
            <Link href="/" className="hover:text-[#01722C]">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-gray-900 font-semibold">My Account</span>
          </nav>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#01722C] text-white flex items-center justify-center font-serif text-2xl font-bold shadow-md">
                {user?.full_name ? user.full_name.charAt(0).toUpperCase() : "O"}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-serif text-xl sm:text-2xl font-bold text-gray-900">
                    {user?.full_name || "Valued Customer"}
                  </h1>
                  {user?.role === "admin" && (
                    <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      ADMIN
                    </span>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-gray-600 flex items-center gap-2 mt-0.5">
                  <span>{user?.phone || user?.email}</span>
                  <span>•</span>
                  <span className="text-[#01722C] font-medium flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> Verified Member
                  </span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center">
              {user?.role === "admin" && (
                <Link
                  href="/admin"
                  className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Admin Portal</span>
                </Link>
              )}
              <button
                onClick={() => {
                  logout();
                  router.push("/");
                }}
                className="bg-white hover:bg-red-50 text-red-600 border border-gray-200 hover:border-red-200 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Navigation Tabs Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-100 p-2 shadow-xs space-y-1">
              <button
                onClick={() => setActiveTab("profile")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                  activeTab === "profile"
                    ? "bg-[#01722C] text-white shadow-xs"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <User className="w-4 h-4" />
                <span className="flex-1">Profile & Preferences</span>
              </button>

              <button
                onClick={() => setActiveTab("addresses")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                  activeTab === "addresses"
                    ? "bg-[#01722C] text-white shadow-xs"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <MapPin className="w-4 h-4" />
                <span className="flex-1">Saved Address Book</span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    activeTab === "addresses"
                      ? "bg-white/20 text-white"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {addresses.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab("orders")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                  activeTab === "orders"
                    ? "bg-[#01722C] text-white shadow-xs"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Package className="w-4 h-4" />
                <span className="flex-1">Order History</span>
              </button>
            </div>

            {/* Quick Farm Fresh Guarantee Box */}
            <div className="mt-6 bg-[#f4faf6] border border-[#cbe5d4] rounded-2xl p-4 text-xs text-gray-700 space-y-2">
              <div className="font-bold text-[#01722C] flex items-center gap-1.5">
                <Truck className="w-4 h-4" />
                <span>Pan-India Harvest Dispatch</span>
              </div>
              <p className="text-[11px] text-gray-600 leading-relaxed">
                All grains, pulses, and spices are packed within 48 hours of milling in food-grade eco barrier pouches.
              </p>
            </div>
          </div>

          {/* Tab Views */}
          <div className="lg:col-span-3">
            {/* TAB 1: Profile & Dietary Preferences */}
            {activeTab === "profile" && (
              <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-xs space-y-6 animate-fade-in">
                <div className="border-b border-gray-100 pb-4">
                  <h2 className="font-serif text-xl font-bold text-gray-900">
                    Personal Information
                  </h2>
                  <p className="text-xs text-gray-500 mt-1">
                    Manage your account identity, primary contact information, and dietary habits for personalized recommendations.
                  </p>
                </div>

                <form onSubmit={handleSaveProfile} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-700">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                        <input
                          type="text"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="e.g. Anurag Jain"
                          required
                          className="w-full pl-9 pr-3 py-2.5 bg-[#fbfdfc] border border-gray-200 rounded-xl text-xs font-medium focus:border-[#01722C] focus:bg-white focus:outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-700">
                        Primary Phone Number
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                        <input
                          type="text"
                          value={user?.phone || ""}
                          disabled
                          className="w-full pl-9 pr-3 py-2.5 bg-gray-100 border border-gray-200 rounded-xl text-xs font-medium text-gray-500 cursor-not-allowed"
                        />
                      </div>
                      <span className="text-[10px] text-gray-400">
                        Registered via OTP verification
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-700">
                        Email Address (For Invoices & Tracking)
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="yourname@gmail.com"
                          className="w-full pl-9 pr-3 py-2.5 bg-[#fbfdfc] border border-gray-200 rounded-xl text-xs font-medium focus:border-[#01722C] focus:bg-white focus:outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-700">
                        Dietary Preference & Lifestyle
                      </label>
                      <select
                        value={dietaryPref}
                        onChange={(e) => setDietaryPref(e.target.value)}
                        className="w-full px-3 py-2.5 bg-[#fbfdfc] border border-gray-200 rounded-xl text-xs font-medium focus:border-[#01722C] focus:bg-white focus:outline-none transition-all cursor-pointer"
                      >
                        {DIETARY_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <ShieldCheck className="w-4 h-4 text-[#01722C]" />
                      <span>All credentials and addresses are 256-bit encrypted</span>
                    </div>

                    <button
                      type="submit"
                      disabled={isSavingProfile}
                      className="bg-[#01722C] hover:bg-[#0b542c] text-white px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer flex items-center gap-2 disabled:opacity-50"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>{isSavingProfile ? "SAVING..." : "SAVE CHANGES"}</span>
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* TAB 2: Saved Address Book */}
            {activeTab === "addresses" && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-xs">
                  <div>
                    <h2 className="font-serif text-xl font-bold text-gray-900">
                      Saved Delivery Addresses
                    </h2>
                    <p className="text-xs text-gray-500 mt-1">
                      Manage multiple home, office, and family addresses for fast 1-click checkout.
                    </p>
                  </div>
                  <button
                    onClick={openAddAddressModal}
                    className="bg-[#01722C] hover:bg-[#0b542c] text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center gap-2 shrink-0 self-start sm:self-auto"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Address</span>
                  </button>
                </div>

                {addresses.length === 0 ? (
                  <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-[#f2f7f4] text-[#01722C] mx-auto flex items-center justify-center">
                      <MapPin className="w-8 h-8" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-serif font-bold text-lg text-gray-900">
                        No addresses saved yet
                      </h3>
                      <p className="text-xs text-gray-500 max-w-sm mx-auto">
                        Add your primary delivery address so your freshly packed pulses, rice, and spices reach you swiftly.
                      </p>
                    </div>
                    <button
                      onClick={openAddAddressModal}
                      className="bg-[#01722C] text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-[#0b542c] transition-all cursor-pointer"
                    >
                      + Add First Address
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {addresses.map((addr) => (
                      <div
                        key={addr.id}
                        className={`bg-white rounded-3xl border p-5 transition-all shadow-xs relative flex flex-col justify-between ${
                          addr.is_default_shipping
                            ? "border-[#01722C] bg-[#fbfffc]"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              {addr.label.toLowerCase() === "home" ? (
                                <Home className="w-4 h-4 text-[#01722C]" />
                              ) : addr.label.toLowerCase() === "work" ? (
                                <Briefcase className="w-4 h-4 text-blue-600" />
                              ) : (
                                <Building className="w-4 h-4 text-gray-600" />
                              )}
                              <span className="font-bold text-xs uppercase text-gray-900">
                                {addr.label}
                              </span>
                            </div>

                            <div className="flex items-center gap-1">
                              {addr.is_default_shipping && (
                                <span className="bg-[#edf7f1] text-[#01722C] text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#cbe4d4]">
                                  Default Shipping
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="text-xs space-y-1 text-gray-700">
                            <div className="font-bold text-gray-900">
                              {addr.recipient_name}
                            </div>
                            <div className="text-gray-500">
                              Phone: <span className="font-medium text-gray-800">{addr.recipient_phone}</span>
                            </div>
                            <div className="pt-1 text-gray-600 leading-relaxed">
                              {addr.flat_no}, {addr.street}
                              {addr.landmark && `, near ${addr.landmark}`}
                              <br />
                              {addr.city}, {addr.state} - <strong className="text-gray-900">{addr.pincode}</strong>
                            </div>
                            {addr.delivery_instructions && (
                              <div className="text-[11px] bg-amber-50 text-amber-800 p-2 rounded-xl border border-amber-200 mt-2">
                                Note: {addr.delivery_instructions}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => openEditAddressModal(addr)}
                              className="text-gray-600 hover:text-[#01722C] font-semibold cursor-pointer"
                            >
                              Edit
                            </button>
                            <span className="text-gray-300">|</span>
                            <button
                              onClick={() => handleDeleteAddress(addr.id)}
                              className="text-red-600 hover:underline font-semibold cursor-pointer"
                            >
                              Delete
                            </button>
                          </div>

                          {!addr.is_default_shipping && (
                            <button
                              onClick={() => handleSetDefaultShipping(addr)}
                              className="text-[#01722C] hover:underline text-[11px] font-semibold cursor-pointer"
                            >
                              Make Default
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: Order History */}
            {activeTab === "orders" && (
              <div className="space-y-6 animate-fade-in">
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xs">
                  <h2 className="font-serif text-xl font-bold text-gray-900">
                    My Order History
                  </h2>
                  <p className="text-xs text-gray-500 mt-1">
                    Track the preparation, packaging, and courier dispatch of your organic harvest orders.
                  </p>
                </div>

                {isLoadingOrders ? (
                  <div className="bg-white rounded-3xl p-12 text-center text-xs text-gray-500 border border-gray-100">
                    Loading your orders...
                  </div>
                ) : orders.length === 0 ? (
                  <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-[#f2f7f4] text-[#01722C] mx-auto flex items-center justify-center">
                      <Package className="w-8 h-8" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-serif font-bold text-lg text-gray-900">
                        No orders placed yet
                      </h3>
                      <p className="text-xs text-gray-500 max-w-sm mx-auto">
                        Explore our single-origin pulses, aromatic hand-ground spices, and traditional grains harvested sustainably.
                      </p>
                    </div>
                    <Link
                      href="/products"
                      className="inline-block bg-[#01722C] text-white px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-[#0b542c] transition-all cursor-pointer"
                    >
                      Browse Harvest Store
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div
                        key={order.id}
                        className="bg-white rounded-3xl border border-gray-100 p-5 shadow-xs hover:border-[#b4d9c0] transition-all space-y-4"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-3">
                          <div>
                            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                              Order ID
                            </span>
                            <div className="font-bold text-gray-900 text-sm">
                              {order.order_number}
                            </div>
                            <div className="text-[11px] text-gray-500">
                              Placed on {new Date(order.created_at || Date.now()).toLocaleDateString("en-IN", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })}
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <span
                              className={`text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
                                order.status === "DELIVERED"
                                  ? "bg-emerald-100 text-[#01722C]"
                                  : order.status === "DISPATCHED"
                                  ? "bg-blue-100 text-blue-800"
                                  : order.status === "CANCELLED"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-amber-100 text-amber-800"
                              }`}
                            >
                              {order.status}
                            </span>
                            <div className="text-right">
                              <span className="text-[11px] text-gray-400 block uppercase font-bold">Total</span>
                              <span className="font-bold text-gray-900 text-sm">
                                ₹{Number(order.total_amount).toFixed(2)}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Order Items List */}
                        <div className="space-y-2">
                          {(order.items || []).map((item: any, idx: number) => (
                            <div
                              key={idx}
                              className="flex items-center justify-between text-xs py-1.5 border-b border-gray-50 last:border-b-0"
                            >
                              <div className="flex items-center gap-3 min-w-0">
                                {item.product_image && (
                                  <img
                                    src={item.product_image}
                                    alt={item.product_name}
                                    className="w-10 h-10 object-cover rounded-lg border border-gray-100 shrink-0"
                                  />
                                )}
                                <div className="truncate">
                                  <div className="font-semibold text-gray-800 truncate">
                                    {item.product_name}
                                  </div>
                                  <div className="text-[11px] text-gray-500">
                                    Pack: {item.packaging_size} • Qty: {item.quantity}
                                  </div>
                                </div>
                              </div>
                              <span className="font-bold text-gray-900 shrink-0">
                                ₹{(item.unit_price * item.quantity).toFixed(2)}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Tracking / Courier Info if Dispatched */}
                        {order.status === "DISPATCHED" && order.courier_name && (
                          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-3 text-xs text-blue-900 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Truck className="w-4 h-4 text-blue-600" />
                              <span>
                                In Transit via <strong>{order.courier_name}</strong> (AWB: <strong>{order.tracking_awb}</strong>)
                              </span>
                            </div>
                            {order.tracking_url && (
                              <a
                                href={order.tracking_url}
                                target="_blank"
                                rel="noreferrer"
                                className="font-bold text-blue-700 hover:underline flex items-center gap-1"
                              >
                                <span>Track Live</span>
                                <ExternalLink className="w-3.5 h-3.5" />
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ADD / EDIT ADDRESS MODAL */}
      {isAddressModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-2xs animate-fade-in font-sans">
          <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-gray-100 max-h-[90vh] flex flex-col">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-[#fbfdfc]">
              <div>
                <h3 className="font-serif font-bold text-lg text-gray-900">
                  {editingAddressId ? "Edit Delivery Address" : "Add New Delivery Address"}
                </h3>
                <p className="text-xs text-gray-500">
                  Ensure accurate pincode and door details for seamless delivery.
                </p>
              </div>
              <button
                onClick={() => setIsAddressModalOpen(false)}
                className="p-1 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveAddress} className="p-5 overflow-y-auto space-y-4 text-xs">
              {/* Address Label Selector */}
              <div>
                <label className="font-bold text-gray-700 block mb-1">
                  Address Tag
                </label>
                <div className="flex gap-2">
                  {["Home", "Work", "Farmhouse", "Other"].map((lbl) => (
                    <button
                      key={lbl}
                      type="button"
                      onClick={() => setAddressForm({ ...addressForm, label: lbl })}
                      className={`px-3 py-1.5 rounded-lg border font-semibold cursor-pointer transition-all ${
                        addressForm.label === lbl
                          ? "bg-[#01722C] text-white border-[#01722C]"
                          : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      {lbl}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">
                    Recipient Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={addressForm.recipient_name}
                    onChange={(e) => setAddressForm({ ...addressForm, recipient_name: e.target.value })}
                    placeholder="Full name"
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:border-[#01722C] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-gray-700 block mb-1">
                    Contact Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={addressForm.recipient_phone}
                    onChange={(e) => setAddressForm({ ...addressForm, recipient_phone: e.target.value })}
                    placeholder="10-digit mobile"
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:border-[#01722C] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">
                  Flat, House No., Building Name *
                </label>
                <input
                  type="text"
                  required
                  value={addressForm.flat_no}
                  onChange={(e) => setAddressForm({ ...addressForm, flat_no: e.target.value })}
                  placeholder="e.g. Flat 402, Shanti Vihar"
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:border-[#01722C] focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">
                  Street, Colony, Area *
                </label>
                <input
                  type="text"
                  required
                  value={addressForm.street}
                  onChange={(e) => setAddressForm({ ...addressForm, street: e.target.value })}
                  placeholder="e.g. Civil Lines, Main Road"
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:border-[#01722C] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">
                    Landmark (Optional)
                  </label>
                  <input
                    type="text"
                    value={addressForm.landmark}
                    onChange={(e) => setAddressForm({ ...addressForm, landmark: e.target.value })}
                    placeholder="Near temple/bank"
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:border-[#01722C] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-gray-700 block mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    required
                    value={addressForm.city}
                    onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                    placeholder="e.g. Sagar"
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:border-[#01722C] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-gray-700 block mb-1">
                    PIN Code *
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={addressForm.pincode}
                    onChange={(e) => setAddressForm({ ...addressForm, pincode: e.target.value })}
                    placeholder="470001"
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:border-[#01722C] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">
                  Delivery Instructions (Optional)
                </label>
                <input
                  type="text"
                  value={addressForm.delivery_instructions}
                  onChange={(e) => setAddressForm({ ...addressForm, delivery_instructions: e.target.value })}
                  placeholder="e.g. Ring bell or leave with security"
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:border-[#01722C] focus:outline-none"
                />
              </div>

              <div className="pt-2 flex items-center gap-2">
                <input
                  type="checkbox"
                  id="defaultShippingCheck"
                  checked={addressForm.is_default_shipping}
                  onChange={(e) => setAddressForm({ ...addressForm, is_default_shipping: e.target.checked })}
                  className="rounded text-[#01722C] focus:ring-[#01722C] cursor-pointer"
                />
                <label htmlFor="defaultShippingCheck" className="text-gray-700 font-medium cursor-pointer">
                  Set as default shipping address
                </label>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddressModalOpen(false)}
                  className="px-4 py-2 rounded-full border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSavingAddress}
                  className="bg-[#01722C] hover:bg-[#0b542c] text-white px-5 py-2 rounded-full font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer disabled:opacity-50"
                >
                  {isSavingAddress ? "Saving..." : editingAddressId ? "Update Address" : "Save Address"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ProfilePage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-xs text-gray-500">Loading profile...</div>}>
      <ProfileContent />
    </Suspense>
  );
}

