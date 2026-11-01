"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { ALL_PRODUCTS } from "@/data/mockData";
import { Product, ProductWeightOption } from "@/types";
import {
  Sparkles,
  Heart,
  ShoppingCart,
  Star,
  ArrowRight,
  ChevronDown,
  Check,
  Flame,
} from "lucide-react";

// Select 6 standout signature products across diverse categories
const SPOTLIGHT_IDS = [
  "pulses-organic-arhar-dal-toor-dal-pige",
  "millets-premium-finger-millet-ragi",
  "masala-spices-premium-turmeric-powder",
  "honey-premium-raw-honey",
  "dry-fruits-premium-almonds-badam",
  "rice-wheat-premium-brown-sona-masoori-rice",
];

const HIGHLIGHT_TAGS: Record<string, string> = {
  "pulses-organic-arhar-dal-toor-dal-pige": "Sun-Cured • High Protein",
  "millets-premium-finger-millet-ragi": "Ancient Grain • Low GI",
  "masala-spices-premium-turmeric-powder": "High Curcumin • Non-Irradiated",
  "honey-premium-raw-honey": "Raw Forest • Unpasteurized",
  "dry-fruits-premium-almonds-badam": "High Natural Oil • Non-GMO",
  "rice-wheat-premium-brown-sona-masoori-rice": "Unpolished • Bran Rich",
};

export default function SeasonalHarvestSpotlight() {
  const { addToCart, isInWishlist, toggleWishlist, showToast } = useCart();

  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, ProductWeightOption>
  >({});
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  // Retrieve matching products or fallback to first 6
  const spotlightProducts = SPOTLIGHT_IDS.map(
    (id) => ALL_PRODUCTS.find((p) => p.id === id) || ALL_PRODUCTS[0]
  ).filter(Boolean) as Product[];

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

  return (
    <section className="py-12 sm:py-16 bg-[#fbfaf6] w-full font-sans border-b border-[#e9e3d5]">
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8 pb-4 border-b border-[#e4ded0]">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#edf7f1] text-[#01722C] text-xs font-bold uppercase tracking-wider mb-2">
              <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>Curated Superfood Staples</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
              Seasonal Signature Harvests
            </h2>
            <p className="text-gray-500 text-xs sm:text-sm mt-1">
              Handpicked nutrient-dense staples sourced from native Indian micro-climates
            </p>
          </div>

          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#01722C] hover:text-[#0b542c] bg-white border border-[#01722C]/30 hover:border-[#01722C] px-5 py-2.5 rounded-xl transition-all shadow-2xs"
          >
            <span>Explore All 192 Products</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 6 Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
          {spotlightProducts.map((product) => {
            const currentOption =
              selectedOptions[product.id] ||
              product.options[0] || {
                label: product.subtitle,
                price: product.defaultPrice,
                originalPrice: product.defaultOriginalPrice,
                discount: product.defaultDiscount,
              };
            const isWishlisted = isInWishlist(product.id);
            const isDropdownOpen = openDropdownId === product.id;
            const specialTag = HIGHLIGHT_TAGS[product.id] || "100% Organic";

            return (
              <div
                key={product.id}
                className="group relative bg-white border border-[#e4ded0] hover:border-[#01722C] rounded-2xl overflow-hidden shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                {/* Image & Badges */}
                <div className="relative aspect-square overflow-hidden bg-[#faf8f4] border-b border-[#f0ece1]">
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

                  {/* Tag */}
                  <div className="absolute top-2 left-2 z-10 pointer-events-none">
                    <span className="bg-[#01722C] text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
                      {product.category}
                    </span>
                  </div>

                  {/* Wishlist Button */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      toggleWishlist(product.id);
                    }}
                    className={`absolute top-2 right-2 z-10 w-7 h-7 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-xs ${
                      isWishlisted
                        ? "bg-rose-50 text-rose-600"
                        : "bg-white/90 hover:bg-white text-gray-500 hover:text-rose-500"
                    }`}
                    title="Save to Wishlist"
                  >
                    <Heart
                      className={`w-3.5 h-3.5 ${
                        isWishlisted ? "fill-rose-500" : ""
                      }`}
                    />
                  </button>
                </div>

                {/* Content */}
                <div className="p-3.5 flex-1 flex flex-col justify-between space-y-2.5">
                  <div className="space-y-1">
                    <div className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md inline-block">
                      {specialTag}
                    </div>

                    <Link
                      href={`/products/${product.id}`}
                      className="font-serif font-bold text-xs sm:text-sm text-gray-900 line-clamp-2 hover:text-[#01722C] transition-colors leading-snug cursor-pointer block"
                    >
                      {product.name}
                    </Link>
                  </div>

                  {/* Weight Dropdown if options exist */}
                  {product.options && product.options.length > 1 && (
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() =>
                          setOpenDropdownId(isDropdownOpen ? null : product.id)
                        }
                        className="w-full flex items-center justify-between bg-[#faf8f4] hover:bg-[#f2ecdf] border border-[#e5dfd2] px-2.5 py-1 rounded-md text-[11px] font-semibold text-gray-700 cursor-pointer transition-colors"
                      >
                        <span className="truncate">{currentOption.label}</span>
                        <ChevronDown className="w-3 h-3 text-gray-400 shrink-0 ml-1" />
                      </button>

                      {isDropdownOpen && (
                        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-xl z-20 py-1 overflow-hidden animate-fade-in">
                          {product.options.map((opt, i) => (
                            <button
                              key={i}
                              type="button"
                              onClick={() => handleSelectOption(product.id, opt)}
                              className="w-full flex items-center justify-between px-2.5 py-1.5 text-[11px] text-left hover:bg-[#edf7f1] text-gray-700 cursor-pointer"
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

                  {/* Price & Add to Cart */}
                  <div className="pt-2 border-t border-gray-100 flex items-center justify-between gap-1">
                    <div>
                      <div className="font-serif font-black text-sm text-gray-900">
                        ₹{currentOption.price.toFixed(2)}
                      </div>
                      {currentOption.originalPrice > currentOption.price && (
                        <div className="text-[10px] text-gray-400 line-through">
                          ₹{currentOption.originalPrice.toFixed(2)}
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => handleAddToCart(product)}
                      className="inline-flex items-center gap-1 bg-[#01722C] hover:bg-[#0b542c] text-white px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-all shadow-2xs cursor-pointer active:scale-95"
                    >
                      <ShoppingCart className="w-3 h-3" />
                      <span>Add</span>
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

