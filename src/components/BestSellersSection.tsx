"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ALL_PRODUCTS, CATEGORIES } from "@/data/mockData";
import { Product, ProductWeightOption } from "@/types";
import { useCart } from "@/context/CartContext";
import { Heart, Star, ChevronDown } from "lucide-react";

interface BestSellersSectionProps {
  activeCategoryFilter?: string | null;
  onSelectCategory?: (category: string) => void;
}

export default function BestSellersSection({
  activeCategoryFilter = "Rice",
  onSelectCategory,
}: BestSellersSectionProps) {
  const { addToCart, toggleWishlist, isInWishlist, setIsCartOpen } = useCart();

  // Keep track of chosen weight option for each product
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, ProductWeightOption>
  >(() => {
    const initial: Record<string, ProductWeightOption> = {};
    ALL_PRODUCTS.forEach((prod) => {
      initial[prod.id] = prod.options[0];
    });
    return initial;
  });

  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  const handleOptionSelect = (productId: string, opt: ProductWeightOption) => {
    setSelectedOptions((prev) => ({ ...prev, [productId]: opt }));
    setOpenDropdownId(null);
  };

  const handleBuyNow = (product: Product) => {
    const option = selectedOptions[product.id] || product.options[0];
    addToCart(product, option, 1);
    setIsCartOpen(true);
  };

  // Filter products by selected category (defaulting to Rice)
  const currentCategory = activeCategoryFilter || "Rice";
  const filteredProducts = ALL_PRODUCTS.filter(
    (p) => p.category.toLowerCase() === currentCategory.toLowerCase()
  );

  // If filtered products is empty (just in case), fall back to all products
  const displayProducts =
    filteredProducts.length > 0 ? filteredProducts : ALL_PRODUCTS.slice(0, 4);

  return (
    <section id="best-sellers" className="py-8 sm:py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#054b28]/10 text-[#054b28] text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-1">
              Pure Unadulterated Selection
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              Featured {currentCategory} & Best Sellers
            </h2>
            <p className="text-gray-500 text-xs sm:text-sm mt-0.5">
              Showing premium quality {currentCategory.toLowerCase()} products certified for purity
            </p>
          </div>

          {/* Quick Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const isActive = cat.name.toLowerCase() === currentCategory.toLowerCase();
              return (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory && onSelectCategory(cat.name)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? "bg-[#044a27] text-white shadow-xs"
                      : "bg-[#f4f7f5] text-gray-600 hover:bg-[#e4ede7] hover:text-[#044a27]"
                  }`}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {displayProducts.map((product) => {
            const currentOption =
              selectedOptions[product.id] || product.options[0];
            const isWishlisted = isInWishlist(product.id);
            const isDropdownOpen = openDropdownId === product.id;

            return (
              <div
                key={product.id}
                className="group relative bg-white border border-[#e4ebe6] rounded-xl overflow-hidden shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col justify-between"
              >
                {/* Product Image Area */}
                <div className="relative aspect-4/3 overflow-hidden bg-[#faf8f4] border-b border-[#edf1ee]">
                  <Link href={`/products/${product.id}`} className="block w-full h-full">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-104"
                    />
                  </Link>

                  {/* Clean Formal Tag Pill */}
                  {product.tag && (
                    <span className="absolute top-2.5 left-2.5 bg-[#033b20] text-white text-[10px] font-semibold px-2 py-0.5 rounded shadow-2xs">
                      {product.tag}
                    </span>
                  )}

                  {/* Subtle Wishlist Button (Top Right) */}
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute top-2.5 right-2.5 w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white/95 border border-gray-200 shadow-2xs flex items-center justify-center transition-colors hover:border-[#044a27] cursor-pointer"
                    aria-label="Add to wishlist"
                  >
                    <Heart
                      className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-colors ${
                        isWishlisted
                          ? "fill-[#e11d48] text-[#e11d48]"
                          : "text-gray-400 hover:text-gray-700"
                      }`}
                    />
                  </button>
                </div>

                {/* Card Content */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  {/* Title & Subtitle */}
                  <div>
                    <Link
                      href={`/products/${product.id}`}
                      className="font-semibold text-xs sm:text-sm text-gray-900 group-hover:text-[#044a27] transition-colors line-clamp-1 block"
                    >
                      {product.name}
                    </Link>
                    <p className="text-[11px] sm:text-xs text-gray-500 mt-0.5 font-normal line-clamp-1">
                      {product.subtitle}
                    </p>
                  </div>

                  {/* Price Row */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-serif font-bold text-base text-[#044a27]">
                      ₹{currentOption.price.toFixed(2)}
                    </span>
                    <span className="text-xs text-gray-400 line-through">
                      ₹{currentOption.originalPrice.toFixed(2)}
                    </span>
                    <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded">
                      {currentOption.discount}
                    </span>
                  </div>

                  {/* Weight Selector Dropdown */}
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() =>
                        setOpenDropdownId(isDropdownOpen ? null : product.id)
                      }
                      className="w-full flex items-center justify-between text-xs font-medium text-gray-700 bg-[#f9faf9] hover:bg-[#f0f4f2] border border-[#d6e0da] px-2.5 py-1.5 sm:py-2 rounded-lg transition-colors cursor-pointer"
                    >
                      <span className="truncate">{currentOption.label}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 text-gray-500 transition-transform shrink-0 ml-1 ${
                          isDropdownOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* Dropdown Menu */}
                    {isDropdownOpen && (
                      <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-30 py-1 max-h-48 overflow-y-auto">
                        {product.options.map((opt, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => handleOptionSelect(product.id, opt)}
                            className="w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-[#f0f7f3] text-gray-700 transition-colors cursor-pointer"
                          >
                            <span className="font-medium truncate mr-2">{opt.label}</span>
                            <span className="text-gray-500 font-semibold shrink-0">
                              ₹{opt.price.toFixed(2)}
                            </span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Rating row */}
                  <div className="flex items-center justify-between text-xs text-gray-600">
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span className="font-bold text-gray-800 text-xs">
                        {product.rating}
                      </span>
                      <span className="text-gray-400 text-[11px]">({product.reviewsCount})</span>
                    </div>

                    <Link
                      href={`/products/${product.id}`}
                      className="text-xs text-[#044a27] font-semibold hover:underline"
                    >
                      View Details
                    </Link>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      onClick={() => addToCart(product, currentOption, 1)}
                      className="w-full text-center text-xs font-semibold text-[#044a27] bg-white hover:bg-[#044a27] hover:text-white border border-[#044a27] py-2 rounded-lg transition-colors cursor-pointer truncate"
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={() => handleBuyNow(product)}
                      className="w-full text-center text-xs font-semibold text-white bg-[#044a27] hover:bg-[#03391e] py-2 rounded-lg transition-colors cursor-pointer truncate shadow-2xs"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
