"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Product, ProductWeightOption } from "@/types";
import { ALL_PRODUCTS } from "@/data/mockData";
import { CartProvider, useCart } from "@/context/CartContext";
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import BulkEnquiryModal from "@/components/BulkEnquiryModal";
import LoginModal from "@/components/LoginModal";
import TrackOrderModal from "@/components/TrackOrderModal";
import ToastNotification from "@/components/ToastNotification";
import {
  Star,
  Heart,
  Truck,
  ShieldCheck,
  Leaf,
  Plus,
  Minus,
  ChevronRight,
  Share2,
  CheckCircle2,
  Sparkles,
  FileSpreadsheet,
} from "lucide-react";

function ProductDetailInner({ product }: { product: Product }) {
  const {
    addToCart,
    toggleWishlist,
    isInWishlist,
    setIsCartOpen,
    setIsBulkModalOpen,
    showToast,
  } = useCart();

  // Multi-image gallery state (At least 3-4 images!)
  const images =
    product.images && product.images.length > 0
      ? product.images
      : [product.image];
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Selected weight option state
  const [selectedOption, setSelectedOption] = useState<ProductWeightOption>(
    product.options[0]
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<
    "desc" | "nutrition" | "purity" | "reviews"
  >("desc");

  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, selectedOption, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedOption, quantity);
    setIsCartOpen(true);
  };

  const handleShare = () => {
    if (typeof window !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast("Product link copied to clipboard!");
    }
  };

  // Related products from the same category
  const relatedProducts = ALL_PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900 font-sans">
      <TopBar />
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 w-full">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-1.5 text-xs text-gray-500 mb-6 flex-wrap">
          <Link href="/" className="hover:text-[#044a27] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <Link
            href="/#categories"
            className="hover:text-[#044a27] transition-colors"
          >
            {product.category}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-gray-900 font-semibold truncate max-w-xs sm:max-w-md">
            {product.name}
          </span>
        </nav>

        {/* 2-Column Product Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-14">
          {/* ================= LEFT: MULTI-IMAGE GALLERY (Showing at least 3-4 images!) ================= */}
          <div className="lg:col-span-6 space-y-4">
            {/* Main Active Image Display */}
            <div className="relative aspect-4/3 rounded-3xl overflow-hidden bg-[#fbf9f4] border border-[#e8ebe7] shadow-md group">
              <img
                src={images[activeImageIndex]}
                alt={`${product.name} - View ${activeImageIndex + 1}`}
                className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
              />

              {/* Tag Pill */}
              {product.tag && (
                <span className="absolute top-4 left-4 bg-[#044a27] text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-sm">
                  {product.tag}
                </span>
              )}

              {/* Image Counter Badge */}
              <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-xs text-white text-[11px] font-medium px-2.5 py-1 rounded-full">
                {activeImageIndex + 1} / {images.length}
              </div>

              {/* Wishlist Button */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/95 backdrop-blur-xs shadow-md flex items-center justify-center transition-all hover:scale-110 cursor-pointer"
                aria-label="Wishlist"
              >
                <Heart
                  className={`w-4 h-4 transition-colors ${
                    isWishlisted
                      ? "fill-[#e11d48] text-[#e11d48]"
                      : "text-gray-400 hover:text-gray-700"
                  }`}
                />
              </button>
            </div>

            {/* Thumbnail Selectors (Multiple images shown below) */}
            <div className="grid grid-cols-4 gap-3">
              {images.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative aspect-4/3 rounded-xl overflow-hidden bg-white border-2 transition-all cursor-pointer ${
                    activeImageIndex === idx
                      ? "border-[#044a27] shadow-md scale-103"
                      : "border-gray-200 hover:border-gray-400 opacity-80 hover:opacity-100"
                  }`}
                >
                  <img
                    src={imgUrl}
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {activeImageIndex === idx && (
                    <span className="absolute inset-0 bg-[#044a27]/10 pointer-events-none" />
                  )}
                </button>
              ))}
            </div>

            {/* Farm Origin Badge */}
            {product.origin && (
              <div className="flex items-center gap-2 p-3 bg-[#f8faf9] rounded-xl border border-[#e2ece6] text-xs text-gray-700">
                <Leaf className="w-4 h-4 text-[#044a27] shrink-0" />
                <span>
                  <strong>Harvest Origin:</strong> {product.origin}
                </span>
              </div>
            )}
          </div>

          {/* ================= RIGHT: PRODUCT DETAILS & BUY BOX ================= */}
          <div className="lg:col-span-6 space-y-5">
            {/* Category & Title */}
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-[#044a27] uppercase tracking-widest bg-[#044a27]/10 px-2.5 py-0.5 rounded-full">
                {product.category}
              </span>

              <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 tracking-tight leading-tight">
                {product.name}
              </h1>

              <p className="text-xs sm:text-sm text-gray-500 font-medium">
                {product.subtitle}
              </p>
            </div>

            {/* Star Rating & Share */}
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating) ? "fill-current" : ""
                      }`}
                    />
                  ))}
                </div>
                <span className="font-bold text-sm text-gray-800">
                  {product.rating}
                </span>
                <span className="text-xs text-gray-400">
                  ({product.reviewsCount} Verified Reviews)
                </span>
              </div>

              <button
                onClick={handleShare}
                className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#044a27] transition-colors cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share</span>
              </button>
            </div>

            {/* Price Box */}
            <div className="p-4 bg-[#fcf9f2] rounded-2xl border border-[#ece4d6] space-y-1">
              <div className="flex items-baseline gap-3 flex-wrap">
                <span className="font-serif text-3xl font-black text-[#044a27]">
                  ₹{selectedOption.price.toFixed(2)}
                </span>
                <span className="text-sm text-gray-400 line-through">
                  ₹{selectedOption.originalPrice.toFixed(2)}
                </span>
                <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                  {selectedOption.discount}
                </span>
              </div>
              <p className="text-[11px] text-gray-500">
                Inclusive of all taxes • Free shipping available on orders over ₹500
              </p>
            </div>

            {/* Weight / Pack Size Selector Pills */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider">
                Select Pack Size:{" "}
                <span className="text-[#044a27] font-semibold">
                  {selectedOption.label}
                </span>
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {product.options.map((opt, i) => {
                  const isSelected = selectedOption.label === opt.label;
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setSelectedOption(opt)}
                      className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                        isSelected
                          ? "border-[#044a27] bg-[#edf7f1] text-[#044a27] shadow-xs"
                          : "border-gray-200 bg-white hover:border-gray-400 text-gray-700"
                      }`}
                    >
                      <div className="text-xs font-bold">{opt.label}</div>
                      <div className="text-[11px] font-semibold text-gray-600 mt-0.5">
                        ₹{opt.price.toFixed(0)}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity Stepper & Buy Actions */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-gray-700">Quantity:</span>
                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-[#f9faf9]">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1.5 hover:bg-gray-200 text-gray-600 transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3 py-1 text-xs font-bold text-gray-900">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1.5 hover:bg-gray-200 text-gray-600 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <button
                  onClick={handleAddToCart}
                  className="w-full text-center text-xs font-bold text-[#044a27] bg-white hover:bg-[#044a27] hover:text-white border-2 border-[#044a27] py-3.5 rounded-full transition-all shadow-sm cursor-pointer"
                >
                  ADD TO CART
                </button>
                <button
                  onClick={handleBuyNow}
                  className="w-full text-center text-xs font-bold text-white bg-[#044a27] hover:bg-[#03391e] py-3.5 rounded-full transition-all shadow-md hover:shadow-lg cursor-pointer"
                >
                  BUY NOW
                </button>
              </div>

              {/* B2B Enquiry Prompt */}
              <button
                onClick={() => setIsBulkModalOpen(true)}
                className="w-full flex items-center justify-center gap-2 p-2.5 rounded-xl bg-[#f5ede0] hover:bg-[#eee2d0] text-[#795548] text-xs font-bold transition-colors cursor-pointer border border-[#decbb0]"
              >
                <FileSpreadsheet className="w-3.5 h-3.5" />
                <span>
                  Need Bulk Quantity (100+ Kg / Export)? Request Wholesale Quote
                </span>
              </button>
            </div>

            {/* Trust Badges Row */}
            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-100 text-xs text-gray-600">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#044a27] shrink-0" />
                <span>Free delivery over ₹500</span>
              </div>
              <div className="flex items-center gap-2">
                <Leaf className="w-4 h-4 text-[#044a27] shrink-0" />
                <span>100% Unadulterated purity</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#044a27] shrink-0" />
                <span>NABL Lab tested for purity</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#044a27] shrink-0" />
                <span>Nitrogen-flushed freshness</span>
              </div>
            </div>
          </div>
        </div>

        {/* ================= TABBED INFORMATION SECTION ================= */}
        <div className="border border-gray-200 rounded-3xl overflow-hidden mb-16 shadow-2xs">
          {/* Tab Headers */}
          <div className="flex border-b border-gray-200 bg-[#f9faf9] overflow-x-auto scrollbar-none">
            {[
              { id: "desc", label: "Description & Heritage" },
              { id: "nutrition", label: "Nutritional Facts" },
              { id: "purity", label: "Quality & Lab Parameters" },
              { id: "reviews", label: `Reviews (${product.reviewsCount})` },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-5 py-3.5 text-xs font-bold whitespace-nowrap transition-colors cursor-pointer border-b-2 ${
                  activeTab === tab.id
                    ? "border-[#044a27] text-[#044a27] bg-white"
                    : "border-transparent text-gray-500 hover:text-gray-800"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Body */}
          <div className="p-6 sm:p-8 bg-white">
            {activeTab === "desc" && (
              <div className="space-y-4 max-w-3xl leading-relaxed text-xs sm:text-sm text-gray-700">
                <p>{product.description}</p>
                {product.features && (
                  <div className="space-y-2 pt-2">
                    <h4 className="font-bold text-gray-900 text-sm">Key Highlights:</h4>
                    <ul className="space-y-1.5 list-none">
                      {product.features.map((feat, i) => (
                        <li key={i} className="flex items-center gap-2 text-gray-700">
                          <CheckCircle2 className="w-4 h-4 text-[#044a27] shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {activeTab === "nutrition" && (
              <div className="max-w-lg">
                <h4 className="font-bold text-gray-900 text-sm mb-3">
                  Nutritional Value (Per 100g serving):
                </h4>
                {product.nutritionalFacts ? (
                  <div className="border border-gray-200 rounded-xl overflow-hidden">
                    {Object.entries(product.nutritionalFacts).map(([key, val], idx) => (
                      <div
                        key={key}
                        className={`flex justify-between px-4 py-2.5 text-xs ${
                          idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                        }`}
                      >
                        <span className="font-semibold text-gray-700">{key}</span>
                        <span className="font-bold text-[#044a27]">{val}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-gray-500">
                    Standard lab tested values. 100% natural with zero cholesterol or synthetic trans-fats.
                  </p>
                )}
              </div>
            )}

            {activeTab === "purity" && (
              <div className="max-w-lg space-y-4">
                <h4 className="font-bold text-gray-900 text-sm">
                  Batch Purity & Quality Assurance:
                </h4>
                {product.purityParameters ? (
                  <div className="border border-gray-200 rounded-xl overflow-hidden">
                    {Object.entries(product.purityParameters).map(([key, val], idx) => (
                      <div
                        key={key}
                        className={`flex justify-between px-4 py-2.5 text-xs ${
                          idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                        }`}
                      >
                        <span className="font-semibold text-gray-700">{key}</span>
                        <span className="font-bold text-gray-900">{val}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900">
                    Certified 100% adulteration-free under NABL and FSSAI Central License standards.
                  </div>
                )}
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-4 max-w-2xl">
                <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                  <span className="font-serif text-3xl font-bold text-gray-900">
                    {product.rating}
                  </span>
                  <div>
                    <div className="flex text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <div className="text-[11px] text-gray-500 mt-0.5">
                      Based on {product.reviewsCount} customer experiences
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-100 space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-gray-800">
                        Rajesh K. (Verified Buyer)
                      </span>
                      <span className="text-gray-400 text-[10px]">10 days ago</span>
                    </div>
                    <p className="text-xs text-gray-600">
                      Exceptional quality! You can smell the authentic freshness as soon as you open the pack. Cooking is so consistent.
                    </p>
                  </div>
                  <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-100 space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-gray-800">
                        Meenakshi S. (Verified Buyer)
                      </span>
                      <span className="text-gray-400 text-[10px]">3 weeks ago</span>
                    </div>
                    <p className="text-xs text-gray-600">
                      Unpolished and pure just like we used to get from village farms. Will definitely subscribe for monthly orders.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ================= RELATED PRODUCTS SECTION ================= */}
        {relatedProducts.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-end justify-between">
              <div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-gray-900">
                  More from {product.category}
                </h3>
                <p className="text-xs text-gray-500">
                  Discover matching farm-fresh commodities
                </p>
              </div>
              <Link
                href={`/#cat-${product.category.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-xs font-semibold text-[#044a27] hover:underline"
              >
                View Category →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {relatedProducts.map((rel) => (
                <div
                  key={rel.id}
                  className="bg-white border border-[#e4ebe6] rounded-2xl overflow-hidden shadow-2xs hover:shadow-lg transition-all flex flex-col justify-between p-3"
                >
                  <Link
                    href={`/products/${rel.id}`}
                    className="block aspect-4/3 overflow-hidden rounded-xl bg-gray-50 mb-2"
                  >
                    <img
                      src={rel.image}
                      alt={rel.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </Link>

                  <div className="space-y-1.5 flex-1 flex flex-col justify-between">
                    <div>
                      <Link
                        href={`/products/${rel.id}`}
                        className="font-bold text-xs text-gray-900 hover:text-[#044a27] line-clamp-1 block"
                      >
                        {rel.name}
                      </Link>
                      <div className="text-[11px] text-gray-500">{rel.subtitle}</div>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="font-serif font-bold text-sm text-[#044a27]">
                        ₹{rel.defaultPrice.toFixed(2)}
                      </span>
                      <Link
                        href={`/products/${rel.id}`}
                        className="text-[11px] font-bold text-[#044a27] bg-[#edf7f1] px-2.5 py-1 rounded-full hover:bg-[#044a27] hover:text-white transition-colors"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />

      {/* Global Modals */}
      <CartDrawer />
      <BulkEnquiryModal />
      <LoginModal />
      <TrackOrderModal />
      <ToastNotification />
    </div>
  );
}

export default function ProductDetailClient({ product }: { product: Product }) {
  return (
    <CartProvider>
      <ProductDetailInner product={product} />
    </CartProvider>
  );
}
