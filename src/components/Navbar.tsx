"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import BrandLogo from "./BrandLogo";
import { useCart } from "@/context/CartContext";
import { CATEGORIES, ALL_PRODUCTS } from "@/data/mockData";
import {
  Search,
  Heart,
  ShoppingCart,
  ChevronDown,
  Menu,
  X,
  Phone,
  ArrowRight,
  ShieldCheck,
  BookOpen,
  Sparkles,
  User as UserIcon,
  LogOut,
  Package,
  Settings as SettingsIcon,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import LoginModal from "./LoginModal";

export default function Navbar() {
  const router = useRouter();
  const { cartCount, setIsCartOpen, wishlist, setIsLoginModalOpen } = useCart();
  const { user, isAuthenticated, logout } = useAuth();

  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const categoryRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        categoryRef.current &&
        !categoryRef.current.contains(event.target as Node)
      ) {
        setIsCategoryDropdownOpen(false);
      }
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsSearchFocused(false);
      }
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchFocused(false);
      setIsMobileSearchOpen(false);
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const filteredProducts = searchQuery.trim()
    ? ALL_PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 8)
    : [];

  return (
    <>
      <header className="sticky top-0 z-40 bg-white border-b border-[#e5ebe7] shadow-[0_2px_12px_rgba(0,0,0,0.04)] font-sans w-full">
      {/* Full Width Edge-to-Edge Container */}
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 h-18 sm:h-20 flex items-center justify-between gap-4">
        {/* Left: Official Brand Logo */}
        <Link href="/" className="flex items-center shrink-0">
          <BrandLogo variant="dark" />
        </Link>

        {/* Center: Desktop Navigation Links (>= 1024px) */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-[13.5px] xl:text-[14.5px] font-semibold text-gray-700">
          <Link
            href="/"
            className="hover:text-[#01722C] transition-colors whitespace-nowrap"
          >
            Home
          </Link>
          <Link
            href="/products"
            className="hover:text-[#01722C] transition-colors whitespace-nowrap"
          >
            All Products
          </Link>

          {/* Categories Mega Dropdown */}
          <div className="relative" ref={categoryRef}>
            <button
              onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
              className="flex items-center gap-1.5 hover:text-[#01722C] transition-colors py-1 cursor-pointer focus:outline-none whitespace-nowrap"
            >
              <span>Categories</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  isCategoryDropdownOpen ? "rotate-180 text-[#01722C]" : ""
                }`}
              />
            </button>

            {isCategoryDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-100 rounded-2xl shadow-2xl py-2.5 z-50 animate-fade-in">
                <div className="px-4 py-2 text-[11px] font-bold text-gray-400 tracking-wider uppercase border-b border-gray-100 flex items-center justify-between">
                  <span>Product Categories (8)</span>
                  <Link
                    href="/products"
                    onClick={() => setIsCategoryDropdownOpen(false)}
                    className="text-[11px] text-[#01722C] font-bold hover:underline"
                  >
                    View All
                  </Link>
                </div>
                {CATEGORIES.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/products?category=${encodeURIComponent(cat.name)}`}
                    onClick={() => setIsCategoryDropdownOpen(false)}
                    className="flex items-center justify-between px-4 py-2 text-xs font-medium text-gray-700 hover:bg-[#edf7f1] hover:text-[#01722C] transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <img
                        src={cat.image}
                        alt={cat.name}
                        className="w-5 h-5 rounded-full object-cover"
                      />
                      <span>{cat.name}</span>
                    </div>
                    <span className="text-[10px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded font-bold">
                      24
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/about"
            className="hover:text-[#01722C] transition-colors whitespace-nowrap"
          >
            Our Heritage & Standards
          </Link>

          <Link
            href="/blog"
            className="hover:text-[#01722C] transition-colors whitespace-nowrap"
          >
            Health Journal
          </Link>

          <Link
            href="/contact"
            className="hover:text-[#01722C] transition-colors whitespace-nowrap"
          >
            Contact & Bulk Supply
          </Link>
        </nav>

        {/* Right Section: Wide Search, Wishlist & Shopping Cart */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          {/* Desktop Search Input (>= 1024px) */}
          <div className="relative hidden lg:block w-52 xl:w-72" ref={searchRef}>
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <input
                type="text"
                placeholder="Search 192+ organic staples..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                className="w-full bg-[#f9f8f5] border border-[#d8dfda] text-gray-800 placeholder-gray-400 text-xs rounded-full pl-4 pr-9 py-2 focus:outline-none focus:border-[#01722C] focus:bg-white focus:ring-1 focus:ring-[#01722C] transition-all"
              />
              <button
                type="submit"
                className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-[#01722C] absolute right-1.5 cursor-pointer"
                aria-label="Submit search"
              >
                <Search className="w-4 h-4" />
              </button>
            </form>

            {/* Live Search Results Popup */}
            {isSearchFocused && searchQuery.trim().length > 0 && (
              <div className="absolute top-full right-0 mt-2 w-88 bg-white rounded-2xl shadow-2xl border border-gray-100 p-2 z-50 animate-fade-in max-h-88 overflow-y-auto">
                {filteredProducts.length > 0 ? (
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-bold text-gray-400 px-3 py-1.5 uppercase border-b border-gray-50 mb-1">
                      <span>Matching Harvests ({filteredProducts.length})</span>
                      <button
                        onClick={handleSearchSubmit}
                        className="text-[#01722C] hover:underline cursor-pointer"
                      >
                        See All
                      </button>
                    </div>
                    {filteredProducts.map((p) => (
                      <Link
                        key={p.id}
                        href={`/products/${p.id}`}
                        onClick={() => {
                          setIsSearchFocused(false);
                          setSearchQuery("");
                        }}
                        className="flex items-center justify-between p-2 hover:bg-[#edf7f1] rounded-xl transition-colors"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <img
                            src={p.image}
                            alt={p.name}
                            className="w-9 h-9 object-cover rounded-lg border border-gray-200 shrink-0"
                          />
                          <div className="truncate">
                            <div className="text-xs font-semibold text-gray-800 truncate">
                              {p.name}
                            </div>
                            <div className="text-[11px] text-gray-500">
                              {p.category} • ₹{p.defaultPrice.toFixed(2)}
                            </div>
                          </div>
                        </div>
                        <span className="text-[10px] bg-[#01722C] text-white px-2.5 py-1 rounded font-bold shrink-0">
                          View
                        </span>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-center text-xs text-gray-500">
                    No products matching &quot;{searchQuery}&quot;
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Search Toggle Icon on Tablet & Mobile (< 1024px) */}
          <button
            onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
            className="lg:hidden p-2 text-gray-600 hover:text-[#01722C] rounded-full hover:bg-gray-100 cursor-pointer"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Wishlist Button */}
          <Link
            href="/wishlist"
            className="relative p-2 text-gray-700 hover:text-[#01722C] transition-colors rounded-full hover:bg-gray-100 cursor-pointer"
            title="Wishlist"
            aria-label="Wishlist"
          >
            <Heart className="w-5 h-5" />
            {mounted && wishlist.length > 0 && (
              <span className="absolute top-0.5 right-0.5 bg-[#e11d48] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </Link>

          {/* User Account / Profile Dropdown */}
          <div className="relative" ref={userMenuRef}>
            {mounted && isAuthenticated && user ? (
              <div>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 p-1.5 sm:px-2.5 sm:py-1.5 rounded-full hover:bg-gray-100 border border-gray-200 transition-colors cursor-pointer text-gray-700"
                  title="My Account"
                  aria-label="User profile menu"
                >
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#01722C] text-white flex items-center justify-center font-bold text-xs uppercase shadow-xs">
                    {user.full_name ? user.full_name.charAt(0) : "U"}
                  </div>
                  <span className="text-xs font-semibold hidden md:inline max-w-[85px] truncate">
                    {user.full_name || "Account"}
                  </span>
                </button>

                {/* Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 p-2 z-50 animate-fade-in text-xs">
                    <div className="px-3 py-2 border-b border-gray-100">
                      <div className="font-bold text-gray-900 truncate">
                        {user.full_name || "Pure Harvest Member"}
                      </div>
                      <div className="text-[11px] text-gray-500 truncate">
                        {user.phone || user.email}
                      </div>
                      {user.role === "admin" && (
                        <span className="inline-block mt-1 text-[9px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full">
                          ADMIN PRIVILEGES
                        </span>
                      )}
                    </div>

                    <div className="py-1">
                      <Link
                        href="/profile"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-[#edf7f1] text-gray-700 hover:text-[#01722C] transition-colors font-medium"
                      >
                        <UserIcon className="w-4 h-4 text-[#01722C]" />
                        <span>Profile & Addresses</span>
                      </Link>

                      <Link
                        href="/profile?tab=orders"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-[#edf7f1] text-gray-700 hover:text-[#01722C] transition-colors font-medium"
                      >
                        <Package className="w-4 h-4 text-[#01722C]" />
                        <span>My Orders</span>
                      </Link>

                      {user.role === "admin" && (
                        <Link
                          href="/admin"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-amber-50 text-amber-900 font-semibold transition-colors"
                        >
                          <SettingsIcon className="w-4 h-4 text-amber-700" />
                          <span>Admin Portal</span>
                        </Link>
                      )}
                    </div>

                    <div className="pt-1 border-t border-gray-100">
                      <button
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          logout();
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-red-50 text-red-600 transition-colors font-medium cursor-pointer"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-gray-700 hover:text-[#01722C] border border-gray-200 hover:border-[#01722C] bg-white hover:bg-[#edf7f1] transition-all rounded-full cursor-pointer text-xs font-semibold shadow-2xs"
                title="Sign In / Register"
                aria-label="Sign In"
              >
                <UserIcon className="w-4 h-4 text-[#01722C]" />
                <span className="inline">Sign In</span>
              </button>
            )}
          </div>

          {/* Shopping Cart Icon with Cart Total Amount */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center gap-2 bg-[#01722C] hover:bg-[#0b542c] text-white px-3.5 sm:px-4 py-2 rounded-xl transition-all shadow-xs cursor-pointer shrink-0"
            title="Shopping Cart"
            aria-label="Cart"
          >
            <div className="relative">
              <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
              {mounted && cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#facc15] text-[#014d1e] text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="text-xs sm:text-sm font-bold hidden sm:inline">
              Cart {mounted && cartCount > 0 && `(${cartCount})`}
            </span>
          </button>

          {/* Mobile / Tablet Menu Button (< 1024px) */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 lg:hidden text-gray-700 hover:text-[#01722C] rounded-xl hover:bg-gray-100 cursor-pointer shrink-0"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile / Tablet Expandable Search Bar */}
      {isMobileSearchOpen && (
        <div className="lg:hidden border-t border-gray-100 px-4 py-2.5 bg-[#f8faf9] animate-fade-in">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Search rice, pulses, dry fruits, spices..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-gray-200 text-xs rounded-full pl-4 pr-10 py-2.5 focus:outline-none focus:border-[#01722C]"
              autoFocus
            />
            <button
              type="submit"
              className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-[#01722C] absolute right-2 top-1.5 cursor-pointer"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* Mobile & Tablet Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex justify-end animate-fade-in font-sans">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-2xs"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          <div className="relative w-4/5 max-w-sm bg-white h-full shadow-2xl flex flex-col z-10 animate-slide-left">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-[#fbfdfc]">
              <BrandLogo variant="dark" size="sm" />
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* User Account State in Mobile Drawer */}
              {mounted && isAuthenticated && user ? (
                <div className="p-3 bg-[#edf7f1] rounded-2xl border border-[#cbe4d4] space-y-2.5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#01722C] text-white flex items-center justify-center font-bold text-sm uppercase shadow-xs shrink-0">
                      {user.full_name ? user.full_name.charAt(0) : "U"}
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold text-gray-900 text-xs truncate">
                        {user.full_name || "Pure Harvest Member"}
                      </div>
                      <div className="text-[11px] text-gray-500 truncate">
                        {user.phone || user.email}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-1.5 pt-1">
                    <Link
                      href="/profile"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-center text-[11px] font-semibold bg-white text-[#01722C] py-1.5 px-2 rounded-lg border border-[#b2d9be] hover:bg-emerald-50"
                    >
                      My Profile
                    </Link>
                    <Link
                      href="/profile?tab=orders"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-center text-[11px] font-semibold bg-white text-[#01722C] py-1.5 px-2 rounded-lg border border-[#b2d9be] hover:bg-emerald-50"
                    >
                      My Orders
                    </Link>
                  </div>

                  {user.role === "admin" && (
                    <Link
                      href="/admin"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block text-center text-[11px] font-bold bg-amber-100 text-amber-900 py-1.5 px-2 rounded-lg border border-amber-300 hover:bg-amber-200"
                    >
                      Admin Portal
                    </Link>
                  )}

                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      logout();
                    }}
                    className="w-full text-center text-[11px] font-semibold text-red-600 hover:underline pt-1 cursor-pointer"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="p-3 bg-[#f8faf9] rounded-2xl border border-gray-200 text-center space-y-2">
                  <div className="text-xs font-semibold text-gray-800">
                    Welcome to Onaar
                  </div>
                  <p className="text-[11px] text-gray-500">
                    Sign in to track orders and manage addresses
                  </p>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setIsLoginModalOpen(true);
                    }}
                    className="w-full bg-[#01722C] hover:bg-[#0b542c] text-white py-2 rounded-xl text-xs font-bold cursor-pointer transition-all"
                  >
                    Sign In / Register
                  </button>
                </div>
              )}

              <div className="space-y-1">
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-2 mb-1">
                  E-Commerce Navigation
                </div>
                <Link
                  href="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2 text-xs font-semibold text-[#01722C] bg-[#edf7f1] rounded-lg"
                >
                  <span>Home</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/products"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
                >
                  <span>All Products (192 Items)</span>
                  <ArrowRight className="w-3.5 h-3.5 text-gray-400" />
                </Link>
                <Link
                  href="/wishlist"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
                >
                  <span className="flex items-center gap-2">
                    <Heart className="w-3.5 h-3.5 text-[#e11d48]" />
                    <span>My Wishlist</span>
                  </span>
                  {mounted && wishlist.length > 0 ? (
                    <span className="bg-[#e11d48] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {wishlist.length}
                    </span>
                  ) : (
                    <ArrowRight className="w-3.5 h-3.5 text-gray-400" />
                  )}
                </Link>
                <Link
                  href="/about"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
                >
                  <span className="flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#01722C]" />
                    <span>Our Heritage & Standards</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-gray-400" />
                </Link>
                <Link
                  href="/blog"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
                >
                  <span className="flex items-center gap-2">
                    <BookOpen className="w-3.5 h-3.5 text-[#01722C]" />
                    <span>Health Journal & Articles</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-gray-400" />
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
                >
                  <span>Contact & Bulk Orders</span>
                  <ArrowRight className="w-3.5 h-3.5 text-gray-400" />
                </Link>
              </div>

              {/* Categories */}
              <div className="space-y-1 pt-2 border-t border-gray-100">
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-2 mb-1 flex items-center justify-between">
                  <span>Shop by Category</span>
                  <Link
                    href="/products"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-[#01722C] font-semibold text-[10px]"
                  >
                    View All
                  </Link>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {CATEGORIES.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/products?category=${encodeURIComponent(cat.name)}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-2 p-2 bg-[#fcfaf5] hover:bg-[#edf7f1] rounded-xl border border-[#ece4d6] text-[11px] font-medium text-gray-800"
                    >
                      <img
                        src={cat.image}
                        alt={cat.name}
                        className="w-6 h-6 rounded-full object-cover shrink-0"
                      />
                      <span className="truncate">{cat.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-gray-100 bg-gray-50 text-[11px] text-gray-500 space-y-1">
              <div className="flex items-center gap-2 text-gray-800 font-bold">
                <Phone className="w-3.5 h-3.5 text-[#01722C]" />
                <span>+91-98765 43210</span>
              </div>
              <div>Mon - Sat: 9:00 AM - 8:00 PM IST</div>
            </div>
          </div>
        </div>
      )}
      </header>

      {/* Global Sign In / Auth Modal */}
      <LoginModal />
    </>
  );
}
