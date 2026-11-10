"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ALL_PRODUCTS, CATEGORIES } from "@/data/mockData";
import { Product, ProductWeightOption } from "@/types";
import { useCart } from "@/context/CartContext";
import { Heart, Star, ChevronDown, ArrowRight, ShoppingCart, Sparkles, CheckCircle2 } from "lucide-react";

interface BestSellersSectionProps {
  activeCategoryFilter?: string | null;
  onSelectCategory?: (category: string) => void;
  limit?: number;
}

export default function BestSellersSection({
  activeCategoryFilter = CATEGORIES[0]?.name || "Pulses",
  onSelectCategory,
  limit = 8,
}: BestSellersSectionProps) {
  const router = useRouter();
  const { addToCart, toggleWishlist, isInWishlist, setIsCartOpen } = useCart();

  // Selected weight options for each product
  const [selectedOptions, setSelectedOptions] = useState<Record<string, ProductWeightOption>>(() => {
    const init: Record<string, ProductWeightOption> = {};
    ALL_PRODUCTS.forEach((prod) => {
      init[prod.id] = prod.options[0];
    });
    return init;
  });

  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  const handleOptionSelect = (productId: string, opt: ProductWeightOption) => {
    setSelectedOptions((prev) => ({ ...prev, [productId]: opt }));
    setOpenDropdownId(null);
  };

  const handleBuyNow = (product: Product) => {
    const option = selectedOptions[product.id] || product.options[0];
    addToCart(product, option, 1);
    router.push("/checkout");
  };

  const currentCategory = activeCategoryFilter || CATEGORIES[0]?.name || "Pulses";
  const filteredProducts = ALL_PRODUCTS.filter(
    (p) => p.category.toLowerCase() === currentCategory.toLowerCase()
  );

  const displayProducts =
    filteredProducts.length > 0
      ? filteredProducts.slice(0, limit)
      : ALL_PRODUCTS.slice(0, limit);

  return (
    <section id="best-sellers" className="py-12 sm:py-16 bg-[#faf8f4] w-full font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Category Filter Tabs */}
        <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-6 mb-8 pb-4 border-b border-[#e7decb]">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#edf7f1] text-[#01722C] text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#01722C]" />
              <span>Certified Organic Bestsellers</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
              Featured {currentCategory} Selection
            </h2>
            <p className="text-gray-500 text-xs sm:text-sm mt-1">
              Hand-graded, sortex-inspected and farm-sealed for authentic nutritional integrity
            </p>
          </div>

          {/* Quick Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const isActive = cat.name.toLowerCase() === currentCategory.toLowerCase();
              return (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory && onSelectCategory(cat.name)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? "bg-[#01722C] text-white shadow-sm"
                      : "bg-white text-gray-700 hover:bg-[#edf7f1] hover:text-[#01722C] border border-[#e2ddd3]"
                  }`}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Product Cards Full-Width Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 sm:gap-6">
          {displayProducts.map((product) => {
            const currentOption = selectedOptions[product.id] || product.options[0];
            const isWishlisted = isInWishlist(product.id);
            const isDropdownOpen = openDropdownId === product.id;

            return (
              <div
                key={product.id}
                className="group relative bg-white border border-[#e4ebe6] hover:border-[#01722C] rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
              >
                {/* Product Image Area */}
                <div className="relative aspect-[4/3] overflow-hidden bg-[#faf8f4] border-b border-[#edf1ee]">
                  <Link href={`/products/${product.id}`} className="block w-full h-full">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transform transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                  </Link>

                  {/* Organic Badge & Discount Tag */}
                  <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10 pointer-events-none">
                    <span className="bg-[#01722C] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
                      {product.tag || "Organic"}
                    </span>
                    {currentOption.discount && (
                      <span className="bg-[#facc15] text-[#014d1e] text-[9.5px] font-black px-1.5 py-0.5 rounded shadow-xs">
                        {currentOption.discount}
                      </span>
                    )}
                  </div>

                  {/* Wishlist Button */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleWishlist(product.id);
                    }}
                    className={`absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-xs ${
                      isWishlisted
                        ? "bg-rose-50 text-rose-600"
                        : "bg-white/90 backdrop-blur-xs text-gray-500 hover:text-rose-600 hover:bg-white"
                    }`}
                    aria-label="Wishlist"
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? "fill-rose-600 text-rose-600" : ""}`} />
                  </button>
                </div>

                {/* Product Details Area */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    {/* Category & Rating */}
                    <div className="flex items-center justify-between text-xs mb-1 text-gray-500">
                      <span className="font-semibold uppercase text-[#01722C] text-[11px]">
                        {product.category}
                      </span>
                      <div className="flex items-center gap-1 text-amber-500 font-bold text-xs">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span>{product.rating.toFixed(1)}</span>
                        <span className="text-gray-400 text-[10px]">({product.reviewsCount})</span>
                      </div>
                    </div>

                    {/* Title */}
                    <Link
                      href={`/products/${product.id}`}
                      className="font-serif font-bold text-sm sm:text-base text-gray-900 group-hover:text-[#01722C] transition-colors line-clamp-2 leading-snug"
                      title={product.name}
                    >
                      {product.name}
                    </Link>

                    {/* Weight Variant Selector Dropdown */}
                    <div className="mt-3 relative">
                      <button
                        type="button"
                        onClick={() =>
                          setOpenDropdownId(isDropdownOpen ? null : product.id)
                        }
                        className="w-full flex items-center justify-between px-3 py-1.5 bg-[#fbfaf7] border border-[#e0dad0] rounded-xl text-xs font-semibold text-gray-800 hover:border-[#01722C] transition-colors cursor-pointer"
                      >
                        <span className="truncate">{currentOption.label}</span>
                        <ChevronDown
                          className={`w-3.5 h-3.5 text-gray-500 shrink-0 transition-transform ${
                            isDropdownOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {isDropdownOpen && (
                        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-xl py-1 z-30 animate-fade-in max-h-48 overflow-y-auto">
                          {product.options.map((opt, i) => (
                            <button
                              key={i}
                              type="button"
                              onClick={() => handleOptionSelect(product.id, opt)}
                              className={`w-full flex items-center justify-between px-3 py-1.5 text-xs text-left cursor-pointer transition-colors ${
                                opt.label === currentOption.label
                                  ? "bg-[#edf7f1] text-[#01722C] font-bold"
                                  : "text-gray-700 hover:bg-gray-50"
                              }`}
                            >
                              <span>{opt.label}</span>
                              <span className="font-bold">₹{opt.price.toFixed(2)}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Pricing & CTA */}
                  <div className="pt-2 border-t border-gray-100 space-y-2.5">
                    <div className="flex items-baseline justify-between">
                      <div className="flex items-baseline gap-2">
                        <span className="text-base sm:text-lg font-black text-gray-900 font-sans">
                          ₹{currentOption.price.toFixed(2)}
                        </span>
                        {currentOption.originalPrice && (
                          <span className="text-xs text-gray-400 line-through">
                            ₹{currentOption.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                        In Stock
                      </span>
                    </div>

                    {/* Dual Action Buttons */}
                    <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
                      <button
                        onClick={() => addToCart(product, currentOption, 1)}
                        className="w-full text-center text-[11px] sm:text-xs font-bold text-[#01722C] bg-white hover:bg-[#edf7f1] border border-[#01722C] py-2 px-1 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1 whitespace-nowrap"
                      >
                        <ShoppingCart className="w-3.5 h-3.5 shrink-0" />
                        <span>Add</span>
                      </button>
                      <button
                        onClick={() => handleBuyNow(product)}
                        className="w-full text-center text-[11px] sm:text-xs font-bold text-white bg-[#01722C] hover:bg-[#0b542c] py-2 px-1 rounded-xl transition-all shadow-xs cursor-pointer whitespace-nowrap"
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All In Category & Full Catalogue CTA */}
        <div className="mt-10 pt-6 border-t border-[#e7decb] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs sm:text-sm text-gray-600 text-center sm:text-left">
            Showing <strong className="text-gray-900">{displayProducts.length}</strong> of{" "}
            <strong className="text-gray-900">{filteredProducts.length}</strong> items in{" "}
            <span className="font-bold text-[#01722C]">{currentCategory}</span>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
            <Link
              href={`/products?category=${encodeURIComponent(currentCategory)}`}
              className="inline-flex items-center justify-center gap-2 bg-[#01722C] hover:bg-[#0b542c] text-white text-xs sm:text-sm font-bold px-6 py-3 rounded-xl transition-all shadow-xs text-center whitespace-nowrap"
            >
              <span>Explore All 24 {currentCategory} Products</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-1.5 bg-white hover:bg-[#edf7f1] text-[#01722C] text-xs sm:text-sm font-bold px-5 py-3 rounded-xl transition-colors border border-[#01722C] text-center whitespace-nowrap"
            >
              <span>Full 192 Harvests</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
