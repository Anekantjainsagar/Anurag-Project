"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { ALL_PRODUCTS } from "@/data/mockData";
import { Product, ProductWeightOption } from "@/types";
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import BulkEnquiryModal from "@/components/BulkEnquiryModal";
import ToastNotification from "@/components/ToastNotification";
import {
  Heart,
  ShoppingCart,
  Trash2,
  ArrowRight,
  ChevronRight,
  Sparkles,
  ShoppingBag,
  Check,
  ChevronDown,
  Star,
  ShieldCheck,
} from "lucide-react";

export default function WishlistPage() {
  const router = useRouter();
  const { wishlist, toggleWishlist, addToCart, setIsCartOpen, showToast } =
    useCart();

  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, ProductWeightOption>
  >({});
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  // Match wishlisted IDs with full product details
  const wishlistedProducts = ALL_PRODUCTS.filter((product) =>
    wishlist.includes(product.id)
  );

  const handleSelectOption = (
    productId: string,
    option: ProductWeightOption
  ) => {
    setSelectedOptions((prev) => ({ ...prev, [productId]: option }));
    setOpenDropdownId(null);
  };

  const handleAddToCart = (product: Product) => {
    const chosenOption =
      selectedOptions[product.id] || product.options[0] || undefined;
    addToCart(product, chosenOption, 1);
    showToast(`Added ${product.name} to cart`);
  };

  const handleAddAllToCart = () => {
    if (wishlistedProducts.length === 0) return;
    wishlistedProducts.forEach((product) => {
      const chosenOption =
        selectedOptions[product.id] || product.options[0] || undefined;
      addToCart(product, chosenOption, 1);
    });
    showToast(`Added all ${wishlistedProducts.length} items to cart!`);
    setIsCartOpen(true);
  };

  const handleClearAll = () => {
    if (wishlistedProducts.length === 0) return;
    wishlist.forEach((id) => toggleWishlist(id));
    showToast("Cleared all items from your wishlist");
  };

  // Recommended products if wishlist is empty
  const recommendedProducts = ALL_PRODUCTS.slice(0, 4);

  return (
    <div className="w-full min-h-screen flex flex-col bg-[#faf8f4] text-gray-900 font-sans">
      <TopBar />
      <Navbar />

      {/* Full Width Banner — Exactly matching Contact, Products, and About pages */}
      <section className="w-full bg-[#014d1e] text-white py-12 sm:py-16 relative overflow-hidden">
        <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 relative z-10 text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#7de0a8] text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#58cf8b]" />
            <span>ONAAR • Saved Harvests</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-black text-white tracking-tight">
            My Saved Wishlist
          </h1>
          <p className="text-sm sm:text-base text-[#c3decb] max-w-xl mx-auto leading-relaxed">
            {wishlistedProducts.length > 0
              ? `You have saved ${wishlistedProducts.length} authentic organic product${
                  wishlistedProducts.length > 1 ? "s" : ""
                }. Add them to cart or explore our full collection.`
              : "Save your favorite organic pulses, grains, honey, and cold-pressed oils here."}
          </p>
        </div>
      </section>

      <main className="flex-1 w-full pb-16">
        {/* Wishlist Items Content */}
        <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 mt-8">
          {wishlistedProducts.length > 0 ? (
            <div>
              {/* Toolbar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-[#e7e1d4] text-xs text-gray-500 gap-3">
                <span className="font-semibold text-gray-800">
                  Showing {wishlistedProducts.length} saved item
                  {wishlistedProducts.length > 1 ? "s" : ""}
                </span>

                <div className="flex items-center gap-3 flex-wrap">
                  <button
                    onClick={handleAddAllToCart}
                    className="inline-flex items-center gap-2 bg-[#01722C] hover:bg-[#0b542c] text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-xs cursor-pointer active:scale-95"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    <span>Add All to Cart</span>
                  </button>

                  <button
                    onClick={handleClearAll}
                    className="inline-flex items-center gap-1.5 bg-white border border-[#e8e2d4] hover:bg-gray-50 text-gray-700 text-xs font-semibold px-3 py-2 rounded-xl transition-all cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-rose-500" />
                    <span>Clear All</span>
                  </button>

                  <Link
                    href="/products"
                    className="inline-flex items-center gap-1.5 text-[#01722C] font-bold hover:underline ml-2"
                  >
                    <span>Browse All Products</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Grid of Wishlist Items */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
                {wishlistedProducts.map((product) => {
                  const currentOption =
                    selectedOptions[product.id] ||
                    product.options[0] || {
                      label: product.subtitle,
                      price: product.defaultPrice,
                      originalPrice: product.defaultOriginalPrice,
                      discount: product.defaultDiscount,
                    };
                  const isDropdownOpen = openDropdownId === product.id;

                  return (
                    <div
                      key={product.id}
                      className="group relative bg-white border border-[#e4dfd3] hover:border-[#01722C] rounded-2xl overflow-hidden shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                    >
                      {/* Product Image & Badges */}
                      <div className="relative aspect-4/3 overflow-hidden bg-[#faf8f4] border-b border-[#ede7d8]">
                        <Link
                          href={`/products/${product.id}`}
                          className="block w-full h-full cursor-pointer"
                        >
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover transform transition-transform duration-700 ease-out group-hover:scale-105"
                            loading="lazy"
                          />
                        </Link>

                        {/* Category & Discount Tag */}
                        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10 pointer-events-none">
                          <span className="bg-[#01722C] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
                            {product.category}
                          </span>
                          {currentOption.discount && (
                            <span className="bg-[#facc15] text-[#014d1e] text-[9.5px] font-black px-1.5 py-0.5 rounded shadow-xs">
                              {currentOption.discount}
                            </span>
                          )}
                        </div>

                        {/* Remove from Wishlist Button */}
                        <button
                          onClick={() => toggleWishlist(product.id)}
                          className="absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-rose-500 hover:text-rose-600 flex items-center justify-center transition-all cursor-pointer shadow-md hover:scale-110"
                          title="Remove from wishlist"
                          aria-label="Remove from wishlist"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Product Information */}
                      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                        <div className="space-y-1.5">
                          {/* Rating & Reviews */}
                          <div className="flex items-center gap-1.5 text-xs">
                            <div className="flex items-center gap-1 bg-[#edf7f1] text-[#01722C] font-bold px-1.5 py-0.5 rounded">
                              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                              <span>{product.rating || "4.8"}</span>
                            </div>
                            <span className="text-[11px] text-gray-400">
                              ({product.reviewsCount || "18"} reviews)
                            </span>
                          </div>

                          {/* Product Title */}
                          <Link
                            href={`/products/${product.id}`}
                            className="font-serif font-bold text-sm sm:text-base text-gray-900 line-clamp-2 hover:text-[#01722C] transition-colors leading-snug cursor-pointer"
                          >
                            {product.name}
                          </Link>

                          <p className="text-[11px] text-gray-500 line-clamp-1">
                            {product.subtitle}
                          </p>
                        </div>

                        {/* Weight Selection Dropdown */}
                        {product.options && product.options.length > 1 && (
                          <div className="relative">
                            <button
                              type="button"
                              onClick={() =>
                                setOpenDropdownId(
                                  isDropdownOpen ? null : product.id
                                )
                              }
                              className="w-full flex items-center justify-between bg-[#faf8f4] hover:bg-[#f3ede0] border border-[#e2ddd1] px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-700 cursor-pointer transition-colors"
                            >
                              <span>Pack: {currentOption.label}</span>
                              <ChevronDown
                                className={`w-3.5 h-3.5 text-gray-500 transition-transform ${
                                  isDropdownOpen ? "rotate-180" : ""
                                }`}
                              />
                            </button>

                            {isDropdownOpen && (
                              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-xl z-20 py-1 overflow-hidden animate-fade-in">
                                {product.options.map((opt, i) => (
                                  <button
                                    key={i}
                                    type="button"
                                    onClick={() =>
                                      handleSelectOption(product.id, opt)
                                    }
                                    className={`w-full flex items-center justify-between px-3 py-1.5 text-xs text-left cursor-pointer hover:bg-[#edf7f1] ${
                                      opt.label === currentOption.label
                                        ? "bg-[#edf7f1] text-[#01722C] font-bold"
                                        : "text-gray-700"
                                    }`}
                                  >
                                    <span>{opt.label}</span>
                                    <span className="font-bold">
                                      ₹{opt.price.toFixed(2)}
                                    </span>
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        )}

                        {/* Price & Action Row */}
                        <div className="pt-2 border-t border-[#f0ece1] flex items-center justify-between gap-2">
                          <div>
                            <div className="flex items-baseline gap-1.5">
                              <span className="font-serif font-black text-lg text-gray-900">
                                ₹{currentOption.price.toFixed(2)}
                              </span>
                              {currentOption.originalPrice >
                                currentOption.price && (
                                <span className="text-[11px] text-gray-400 line-through">
                                  ₹{currentOption.originalPrice.toFixed(2)}
                                </span>
                              )}
                            </div>
                            <span className="text-[10px] text-[#01722C] font-semibold">
                              Tax included
                            </span>
                          </div>

                          {/* Add to Cart Button */}
                          <button
                            onClick={() => handleAddToCart(product)}
                            className="inline-flex items-center gap-1.5 bg-[#01722C] hover:bg-[#0b542c] text-white px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer active:scale-95"
                          >
                            <ShoppingCart className="w-3.5 h-3.5" />
                            <span>Add</span>
                          </button>
                        </div>

                        {/* Direct link to product details */}
                        <Link
                          href={`/products/${product.id}`}
                          className="w-full text-center text-[11px] font-bold text-gray-500 hover:text-[#01722C] py-1 border border-gray-100 hover:border-[#01722C]/40 rounded-lg transition-colors block"
                        >
                          View Full Product Details &rarr;
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            /* Empty Wishlist State */
            <div className="py-12 sm:py-16 text-center max-w-xl mx-auto space-y-6">
              <div className="w-20 h-20 rounded-full bg-[#fde8ec] text-[#e11d48] flex items-center justify-center mx-auto shadow-inner">
                <Heart className="w-10 h-10 fill-current" />
              </div>

              <div className="space-y-2">
                <h2 className="font-serif text-2xl sm:text-3xl font-black text-gray-900">
                  Your Wishlist is Empty
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed max-w-md mx-auto">
                  Explore our certified organic collection of heritage dals,
                  stone-ground flours, ancient millets, and wild honeys. Click the
                  heart icon on any product to save it here!
                </p>
              </div>

              <div className="pt-2">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 bg-[#01722C] hover:bg-[#0b542c] text-white text-xs sm:text-sm font-extrabold uppercase tracking-wider px-7 py-3.5 rounded-xl transition-all shadow-md active:scale-98"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Explore All Products Now</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Recommended Staples Grid */}
              <div className="pt-12 text-left border-t border-[#ede7d8] space-y-4">
                <div className="flex items-center justify-between">
                  <div className="font-serif font-bold text-lg text-gray-900">
                    Recommended Organic Staples
                  </div>
                  <Link
                    href="/products"
                    className="text-xs text-[#01722C] font-bold hover:underline"
                  >
                    View All &rarr;
                  </Link>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {recommendedProducts.map((p) => (
                    <Link
                      key={p.id}
                      href={`/products/${p.id}`}
                      className="group bg-white p-3 rounded-xl border border-[#e4ded0] hover:border-[#01722C] transition-all flex flex-col justify-between"
                    >
                      <div className="aspect-square rounded-lg overflow-hidden bg-gray-50 mb-2">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div className="font-serif text-xs font-bold text-gray-800 line-clamp-1">
                        {p.name}
                      </div>
                      <div className="text-[11px] text-[#01722C] font-extrabold mt-1">
                        ₹{p.defaultPrice.toFixed(2)}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
      <CartDrawer />
      <BulkEnquiryModal />
      <ToastNotification />
    </div>
  );
}

