"use client";

import React, { useState } from "react";
import { BEST_SELLERS } from "@/data/mockData";
import { Product, ProductWeightOption } from "@/types";
import { useCart } from "@/context/CartContext";
import { Heart, Star, ChevronDown, ArrowRight, Check } from "lucide-react";

export default function BestSellersSection({
  activeCategoryFilter,
}: {
  activeCategoryFilter?: string | null;
}) {
  const { addToCart, toggleWishlist, isInWishlist, setIsCartOpen } = useCart();

  // Keep track of chosen weight option for each product
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, ProductWeightOption>
  >(() => {
    const initial: Record<string, ProductWeightOption> = {};
    BEST_SELLERS.forEach((prod) => {
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

  const filteredProducts = activeCategoryFilter
    ? BEST_SELLERS.filter((p) => p.category === activeCategoryFilter)
    : BEST_SELLERS;

  return (
    <section id="best-sellers" className="py-12 bg-white border-t border-[#f0eee6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              Our Best Sellers
            </h2>
            <p className="text-gray-500 text-xs sm:text-sm mt-1">
              Premium quality products loved by our customers
              {activeCategoryFilter && (
                <span className="ml-2 font-semibold text-[#044a27]">
                  • Filtered by {activeCategoryFilter}
                </span>
              )}
            </p>
          </div>

          <a
            href="#all-products"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#044a27] bg-[#f2f8f4] hover:bg-[#044a27] hover:text-white px-4 py-2 rounded-full border border-[#cde1d6] transition-all self-start sm:self-auto"
          >
            <span>View All Products</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Products Grid: 4 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredProducts.map((product) => {
            const currentOption =
              selectedOptions[product.id] || product.options[0];
            const isWishlisted = isInWishlist(product.id);
            const isDropdownOpen = openDropdownId === product.id;

            return (
              <div
                key={product.id}
                className="group relative bg-white border border-[#e4ebe6] rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                {/* Product Image Area */}
                <div className="relative aspect-4/3 overflow-hidden bg-[#fbf9f5] border-b border-[#f0f3f1]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Wishlist Button (Circular, Top Right) */}
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/95 backdrop-blur-xs shadow-md flex items-center justify-center transition-all hover:scale-110 cursor-pointer"
                    aria-label="Add to wishlist"
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

                {/* Card Content */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3.5">
                  {/* Title & Subtitle */}
                  <div>
                    <h3 className="font-semibold text-sm sm:text-base text-gray-900 group-hover:text-[#044a27] transition-colors line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5 font-medium">
                      {product.subtitle}
                    </p>
                  </div>

                  {/* Price Row */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-serif font-bold text-base sm:text-lg text-[#044a27]">
                      ₹{currentOption.price.toFixed(2)}
                    </span>
                    <span className="text-xs text-gray-400 line-through">
                      ₹{currentOption.originalPrice.toFixed(2)}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
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
                      className="w-full flex items-center justify-between text-xs font-medium text-gray-700 bg-[#f9faf9] hover:bg-[#f0f4f2] border border-[#d6e0da] px-3 py-2 rounded-lg transition-colors cursor-pointer"
                    >
                      <span>{currentOption.label}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 text-gray-500 transition-transform ${
                          isDropdownOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* Dropdown Menu */}
                    {isDropdownOpen && (
                      <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-gray-200 rounded-xl shadow-xl z-30 py-1 max-h-48 overflow-y-auto">
                        {product.options.map((opt, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => handleOptionSelect(product.id, opt)}
                            className="w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-[#f0f7f3] text-gray-700 transition-colors cursor-pointer"
                          >
                            <span className="font-medium">{opt.label}</span>
                            <span className="text-gray-500 font-semibold">
                              ₹{opt.price.toFixed(2)}
                            </span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Rating row */}
                  <div className="flex items-center gap-1.5 text-xs text-gray-600">
                    <div className="flex items-center gap-0.5 text-amber-500">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span className="font-bold text-gray-800">
                        {product.rating}
                      </span>
                    </div>
                    <span className="text-gray-400">({product.reviewsCount})</span>
                  </div>

                  {/* Action Buttons: ADD TO CART | BUY NOW */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      onClick={() => addToCart(product, currentOption, 1)}
                      className="w-full text-center text-xs font-bold text-[#044a27] bg-white hover:bg-[#044a27] hover:text-white border border-[#044a27] py-2.5 rounded-lg transition-colors shadow-2xs cursor-pointer"
                    >
                      ADD TO CART
                    </button>
                    <button
                      onClick={() => handleBuyNow(product)}
                      className="w-full text-center text-xs font-bold text-white bg-[#044a27] hover:bg-[#03391e] py-2.5 rounded-lg transition-colors shadow-xs hover:shadow-md cursor-pointer"
                    >
                      BUY NOW
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
