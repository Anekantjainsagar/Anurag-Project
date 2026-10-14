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
    <header className="sticky top-0 z-40 bg-white border-b border-[#e5ebe7] shadow-[0_2px_12px_rgba(0,0,0,0.03)] font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-4">
        {/* Left: Brand Logo */}
        <a href="#" className="flex items-center shrink-0">
          <BrandLogo variant="dark" />
        </a>

        {/* Center: Navigation Links */}
        <nav className="hidden xl:flex items-center gap-7 text-[14px] font-medium text-gray-700">
          <a
            href="#"
            className="text-[#054b28] font-bold border-b-2 border-[#054b28] pb-1 transition-colors"
          >
            Home
          </a>
          <a
            href="#best-sellers"
            className="hover:text-[#054b28] transition-colors"
          >
            All Products
          </a>

          {/* Categories Dropdown */}
          <div className="relative" ref={categoryRef}>
            <button
              onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
              className="flex items-center gap-1 hover:text-[#054b28] transition-colors py-2 cursor-pointer focus:outline-none"
            >
              <span>Categories</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  isCategoryDropdownOpen ? "rotate-180 text-[#054b28]" : ""
                }`}
              />
            </button>

            {isCategoryDropdownOpen && (
              <div className="absolute top-full left-0 mt-1 w-56 bg-white border border-gray-100 rounded-xl shadow-xl py-2 z-50 animate-fade-in">
                <div className="px-3 py-1.5 text-[11px] font-semibold text-gray-400 tracking-wider uppercase border-b border-gray-50">
                  Product Categories
                </div>
                {CATEGORIES.map((cat) => (
                  <a
                    key={cat.id}
                    href={`#cat-${cat.slug}`}
                    onClick={() => setIsCategoryDropdownOpen(false)}
                    className="flex items-center justify-between px-3.5 py-2 text-sm text-gray-700 hover:bg-[#f2f8f4] hover:text-[#054b28] transition-colors"
                  >
                    <span>{cat.name}</span>
                    <span className="text-[11px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">
                      {cat.itemCount}
                    </span>
                  </a>
                ))}
              </div>
            )}
          </div>

          <a
            href="#certifications"
            className="hover:text-[#054b28] transition-colors flex items-center gap-1"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#054b28]" />
            <span>Certifications</span>
          </a>

          <button
            onClick={() => setIsTrackModalOpen(true)}
            className="hover:text-[#054b28] transition-colors flex items-center gap-1 cursor-pointer focus:outline-none"
          >
            <Package className="w-3.5 h-3.5 text-[#054b28]" />
            <span>Track Order</span>
          </button>

          <a
            href="#contact-info"
            className="hover:text-[#054b28] transition-colors"
          >
            Contact Us
          </a>
        </nav>

        {/* Right Section: Search & Actions */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Search Box */}
          <div className="relative hidden md:block w-48 lg:w-64" ref={searchRef}>
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                className="w-full bg-[#f8faf9] border border-[#dce5df] text-gray-800 placeholder-gray-400 text-xs rounded-full pl-3.5 pr-8 py-2 focus:outline-none focus:border-[#054b28] focus:bg-white focus:ring-1 focus:ring-[#054b28] transition-all"
              />
              <Search className="w-3.5 h-3.5 text-gray-400 absolute right-3 pointer-events-none" />
            </div>

            {/* Live Search Results Popup */}
            {isSearchFocused && searchQuery.trim().length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 p-2 z-50 animate-fade-in max-h-80 overflow-y-auto">
                {filteredProducts.length > 0 ? (
                  <div>
                    <div className="text-[11px] font-bold text-gray-400 px-2 py-1 uppercase">
                      Matching Products ({filteredProducts.length})
                    </div>
                    {filteredProducts.map((p) => (
                      <div
                        key={p.id}
                        className="flex items-center justify-between p-2 hover:bg-[#f3f9f5] rounded-lg transition-colors cursor-pointer"
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
                            className="w-9 h-9 object-cover rounded-md border border-gray-200"
                          />
                          <div>
                            <div className="text-xs font-semibold text-gray-800 line-clamp-1">
                              {p.name}
                            </div>
                            <div className="text-[10px] text-gray-500">
                              ₹{p.defaultPrice.toFixed(2)} • {p.subtitle}
                            </div>
                          </div>
                        </div>
                        <span className="text-[10px] bg-[#054b28] text-white px-2 py-1 rounded font-medium">
                          Add
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-center text-xs text-gray-500">
                    No products found for &ldquo;{searchQuery}&rdquo;
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Wishlist Icon */}
          <button
            onClick={() => {
              if (wishlist.length > 0) {
                const el = document.getElementById("best-sellers");
                el?.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="relative p-2 text-gray-700 hover:text-[#054b28] transition-colors rounded-full hover:bg-gray-100 cursor-pointer"
            title="Wishlist"
            aria-label="Wishlist"
          >
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-[#e11d48] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Shopping Cart Icon with Badge */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-gray-700 hover:text-[#054b28] transition-colors rounded-full hover:bg-gray-100 cursor-pointer"
            title="Cart"
            aria-label="Cart"
          >
            <ShoppingCart className="w-5 h-5" />
            <span className="absolute -top-0.5 -right-0.5 bg-[#054b28] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          </button>

          {/* Login Button */}
          <button
            onClick={() => setIsLoginModalOpen(true)}
            className="flex items-center gap-1.5 bg-[#044a27] hover:bg-[#033a1e] text-white text-xs font-semibold px-4 py-2 rounded-full transition-all shadow-sm hover:shadow cursor-pointer"
          >
            <User className="w-3.5 h-3.5" />
            <span>Login</span>
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 xl:hidden text-gray-700 hover:text-[#054b28] cursor-pointer"
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

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="xl:hidden bg-white border-t border-gray-100 px-5 py-4 space-y-3 shadow-lg animate-fade-in">
          {/* Mobile Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#f8faf9] border border-gray-200 text-xs rounded-full pl-3.5 pr-8 py-2.5"
            />
            <Search className="w-4 h-4 text-gray-400 absolute right-3 top-3 pointer-events-none" />
          </div>

          <div className="flex flex-col space-y-2 pt-2 text-sm font-medium text-gray-700">
            <a
              href="#"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-[#054b28] font-bold py-1.5 border-b border-gray-50"
            >
              Home
            </a>
            <a
              href="#best-sellers"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-1.5 border-b border-gray-50"
            >
              All Products
            </a>
            <a
              href="#categories"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-1.5 border-b border-gray-50"
            >
              Categories
            </a>
            <a
              href="#certifications"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-1.5 border-b border-gray-50"
            >
              Certifications
            </a>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsTrackModalOpen(true);
              }}
              className="text-left py-1.5 border-b border-gray-50 flex items-center justify-between"
            >
              <span>Track Order</span>
            </button>
            <a
              href="#contact-info"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-1.5"
            >
              Contact Us
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
