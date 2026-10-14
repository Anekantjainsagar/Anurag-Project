"use client";

import React, { useState, useRef, useEffect } from "react";
import BrandLogo from "./BrandLogo";
import { useCart } from "@/context/CartContext";
import { CATEGORIES, BEST_SELLERS } from "@/data/mockData";
import {
  Search,
  Heart,
  ShoppingCart,
  User,
  ChevronDown,
  Menu,
  X,
  ShieldCheck,
  Package,
  Phone,
  ArrowRight,
} from "lucide-react";

export default function Navbar() {
  const {
    cartCount,
    setIsCartOpen,
    wishlist,
    setIsLoginModalOpen,
    setIsTrackModalOpen,
    addToCart,
  } = useCart();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const categoryRef = useRef<HTMLDivElement>(null);

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
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredProducts = searchQuery.trim()
    ? BEST_SELLERS.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[#e5ebe7] shadow-[0_2px_10px_rgba(0,0,0,0.03)] font-sans">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-16 sm:h-18 flex items-center justify-between gap-2 sm:gap-4">
        {/* Left: Brand Logo */}
        <a href="#" className="flex items-center shrink-0">
          <BrandLogo variant="dark" />
        </a>

        {/* Center: Desktop Navigation Links (>= 1024px) */}
        <nav className="hidden lg:flex items-center gap-4 xl:gap-6 text-[13px] xl:text-[14px] font-medium text-gray-700">
          <a
            href="#"
            className="text-[#054b28] font-bold border-b-2 border-[#054b28] pb-0.5 transition-colors"
          >
            Home
          </a>
          <a
            href="#best-sellers"
            className="hover:text-[#054b28] transition-colors whitespace-nowrap"
          >
            All Products
          </a>

          {/* Categories Dropdown */}
          <div className="relative" ref={categoryRef}>
            <button
              onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
              className="flex items-center gap-1 hover:text-[#054b28] transition-colors py-1 cursor-pointer focus:outline-none whitespace-nowrap"
            >
              <span>Categories</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  isCategoryDropdownOpen ? "rotate-180 text-[#054b28]" : ""
                }`}
              />
            </button>

            {isCategoryDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-gray-100 rounded-xl shadow-xl py-2 z-50 animate-fade-in">
                <div className="px-3 py-1.5 text-[10px] font-bold text-gray-400 tracking-wider uppercase border-b border-gray-50">
                  Product Categories
                </div>
                {CATEGORIES.map((cat) => (
                  <a
                    key={cat.id}
                    href={`#cat-${cat.slug}`}
                    onClick={() => setIsCategoryDropdownOpen(false)}
                    className="flex items-center justify-between px-3.5 py-2 text-xs text-gray-700 hover:bg-[#f2f8f4] hover:text-[#054b28] transition-colors"
                  >
                    <span>{cat.name}</span>
                    <span className="text-[10px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">
                      {cat.itemCount}
                    </span>
                  </a>
                ))}
              </div>
            )}
          </div>

          <a
            href="#certifications"
            className="hover:text-[#054b28] transition-colors whitespace-nowrap"
          >
            Certifications
          </a>

          <button
            onClick={() => setIsTrackModalOpen(true)}
            className="hover:text-[#054b28] transition-colors cursor-pointer focus:outline-none whitespace-nowrap"
          >
            Track Order
          </button>

          <a
            href="#contact-info"
            className="hover:text-[#054b28] transition-colors whitespace-nowrap"
          >
            Contact Us
          </a>
        </nav>

        {/* Right Section: Search & Actions */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          {/* Desktop Search Input (>= 1024px) */}
          <div className="relative hidden lg:block w-36 xl:w-56" ref={searchRef}>
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                className="w-full bg-[#f8faf9] border border-[#dce5df] text-gray-800 placeholder-gray-400 text-xs rounded-full pl-3 pr-7 py-1.5 focus:outline-none focus:border-[#054b28] focus:bg-white focus:ring-1 focus:ring-[#054b28] transition-all"
              />
              <Search className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 pointer-events-none" />
            </div>

            {/* Live Search Results Popup */}
            {isSearchFocused && searchQuery.trim().length > 0 && (
              <div className="absolute top-full right-0 mt-2 w-72 bg-white rounded-xl shadow-2xl border border-gray-100 p-2 z-50 animate-fade-in max-h-80 overflow-y-auto">
                {filteredProducts.length > 0 ? (
                  <div>
                    <div className="text-[10px] font-bold text-gray-400 px-2 py-1 uppercase">
                      Matching Products ({filteredProducts.length})
                    </div>
                    {filteredProducts.map((p) => (
                      <div
                        key={p.id}
                        className="flex items-center justify-between p-1.5 hover:bg-[#f3f9f5] rounded-lg transition-colors cursor-pointer"
                        onClick={() => {
                          addToCart(p);
                          setIsSearchFocused(false);
                          setSearchQuery("");
                        }}
                      >
                        <div className="flex items-center gap-2">
                          <img
                            src={p.image}
                            alt={p.name}
                            className="w-8 h-8 object-cover rounded-md border border-gray-200"
                          />
                          <div>
                            <div className="text-xs font-semibold text-gray-800 line-clamp-1">
                              {p.name}
                            </div>
                            <div className="text-[10px] text-gray-500">
                              ₹{p.defaultPrice.toFixed(2)}
                            </div>
                          </div>
                        </div>
                        <span className="text-[10px] bg-[#054b28] text-white px-2 py-0.5 rounded font-medium">
                          Add
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-3 text-center text-xs text-gray-500">
                    No products found
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Search Toggle Icon on Tablet & Mobile (< 1024px) */}
          <button
            onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
            className="lg:hidden p-1.5 text-gray-600 hover:text-[#054b28] rounded-full hover:bg-gray-100 cursor-pointer"
            aria-label="Search"
          >
            <Search className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Wishlist Icon */}
          <button
            onClick={() => {
              if (wishlist.length > 0) {
                const el = document.getElementById("best-sellers");
                el?.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="relative p-1.5 text-gray-700 hover:text-[#054b28] transition-colors rounded-full hover:bg-gray-100 cursor-pointer"
            title="Wishlist"
            aria-label="Wishlist"
          >
            <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
            {wishlist.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-[#e11d48] text-white text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Shopping Cart Icon with Badge */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-1.5 text-gray-700 hover:text-[#054b28] transition-colors rounded-full hover:bg-gray-100 cursor-pointer"
            title="Cart"
            aria-label="Cart"
          >
            <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="absolute -top-0.5 -right-0.5 bg-[#054b28] text-white text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          </button>

          {/* Desktop Login Button (>= 640px) */}
          <button
            onClick={() => setIsLoginModalOpen(true)}
            className="hidden sm:flex items-center gap-1.5 bg-[#044a27] hover:bg-[#033a1e] text-white text-xs font-semibold px-3.5 py-1.5 rounded-full transition-all shadow-xs cursor-pointer shrink-0"
          >
            <User className="w-3.5 h-3.5" />
            <span>Login</span>
          </button>

          {/* Mobile / Tablet Menu Button (< 1024px) */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-1.5 lg:hidden text-gray-700 hover:text-[#054b28] rounded-md hover:bg-gray-100 cursor-pointer shrink-0"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            ) : (
              <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile / Tablet Expandable Search Bar */}
      {isMobileSearchOpen && (
        <div className="lg:hidden border-t border-gray-100 px-4 py-2 bg-[#f8faf9] animate-fade-in">
          <div className="relative">
            <input
              type="text"
              placeholder="Search rice, pulses, dry fruits..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-gray-200 text-xs rounded-full pl-4 pr-9 py-2 focus:outline-none focus:border-[#054b28]"
              autoFocus
            />
            <Search className="w-4 h-4 text-gray-400 absolute right-3 top-2.5 pointer-events-none" />
          </div>

          {searchQuery.trim().length > 0 && (
            <div className="mt-2 bg-white rounded-xl shadow-lg border border-gray-100 p-2 max-h-60 overflow-y-auto">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center justify-between p-2 hover:bg-[#f3f9f5] rounded-lg transition-colors cursor-pointer"
                    onClick={() => {
                      addToCart(p);
                      setIsMobileSearchOpen(false);
                      setSearchQuery("");
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-8 h-8 object-cover rounded-md"
                      />
                      <div className="text-xs font-semibold text-gray-800">
                        {p.name}
                      </div>
                    </div>
                    <span className="text-[10px] bg-[#054b28] text-white px-2 py-0.5 rounded font-medium">
                      Add
                    </span>
                  </div>
                ))
              ) : (
                <div className="p-2 text-center text-xs text-gray-500">
                  No products found
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Mobile & Tablet Off-Canvas Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex justify-end animate-fade-in font-sans">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-2xs"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Drawer content */}
          <div className="relative w-4/5 max-w-sm bg-white h-full shadow-2xl flex flex-col z-10 animate-slide-left">
            {/* Drawer Header */}
            <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-[#fbfdfc]">
              <BrandLogo variant="dark" size="sm" />
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Actions (User Login) */}
            <div className="p-4 border-b border-gray-100 bg-[#f8fbf9]">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsLoginModalOpen(true);
                }}
                className="w-full bg-[#044a27] text-white text-xs font-semibold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                <User className="w-4 h-4" />
                <span>Sign In / Register</span>
              </button>
            </div>

            {/* Navigation Links */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <div className="space-y-1">
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-2 mb-1">
                  Navigation
                </div>
                <a
                  href="#"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2 text-xs font-semibold text-[#044a27] bg-[#edf7f1] rounded-lg"
                >
                  <span>Home</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
                <a
                  href="#best-sellers"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
                >
                  <span>All Products</span>
                  <ArrowRight className="w-3.5 h-3.5 text-gray-400" />
                </a>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsTrackModalOpen(true);
                  }}
                  className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 rounded-lg text-left"
                >
                  <span className="flex items-center gap-2">
                    <Package className="w-3.5 h-3.5 text-[#044a27]" />
                    <span>Track Order</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-gray-400" />
                </button>
                <a
                  href="#certifications"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
                >
                  <span className="flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#044a27]" />
                    <span>Certifications</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-gray-400" />
                </a>
                <a
                  href="#contact-info"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
                >
                  <span>Contact Us</span>
                  <ArrowRight className="w-3.5 h-3.5 text-gray-400" />
                </a>
              </div>

              {/* Categories */}
              <div className="space-y-1 pt-2 border-t border-gray-100">
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-2 mb-1">
                  Shop Categories
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {CATEGORIES.map((cat) => (
                    <a
                      key={cat.id}
                      href={`#cat-${cat.slug}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-2 p-2 bg-[#fcf9f4] hover:bg-[#f6eee0] rounded-lg border border-[#ece4d6] text-[11px] font-medium text-gray-800"
                    >
                      <img
                        src={cat.image}
                        alt={cat.name}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                      <span className="truncate">{cat.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Drawer Footer Contact */}
            <div className="p-4 border-t border-gray-100 bg-gray-50 text-[11px] text-gray-500 space-y-1">
              <div className="flex items-center gap-2 text-gray-700 font-semibold">
                <Phone className="w-3.5 h-3.5 text-[#044a27]" />
                <span>+91-87692 15905</span>
              </div>
              <div>Mon - Sat: 9:00 AM - 8:00 PM IST</div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
