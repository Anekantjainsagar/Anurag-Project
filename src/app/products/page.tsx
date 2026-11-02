"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCart } from "@/context/CartContext";
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import BulkEnquiryModal from "@/components/BulkEnquiryModal";
import ToastNotification from "@/components/ToastNotification";
import { ALL_PRODUCTS, CATEGORIES } from "@/data/mockData";
import { Product, ProductWeightOption } from "@/types";
import {
  Search,
  Heart,
  Star,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  X,
  ArrowUpDown,
  ShoppingBag,
  ShoppingCart,
  ShieldCheck,
} from "lucide-react";

/**
 * Resolves any category name, slug, or search parameter variant
 * into the canonical category name from CATEGORIES (e.g. 'millets' -> 'Millets', 'masala-spices' -> 'Masala & Spices').
 */
function resolveCategoryName(param?: string | null): string {
  if (!param || param.toLowerCase() === "all") return "All";
  let decoded = param;
  try {
    decoded = decodeURIComponent(param);
  } catch {
    // keep as is
  }
  const pLower = decoded.toLowerCase().trim();

  // 1. Exact match by name
  const exact = CATEGORIES.find((c) => c.name.toLowerCase() === pLower);
  if (exact) return exact.name;

  // 2. Match by slug
  const slugMatch = CATEGORIES.find((c) => c.slug.toLowerCase() === pLower);
  if (slugMatch) return slugMatch.name;

  // 3. Alphanumeric match (handles '&' vs 'and', hyphens, etc.)
  const pAlpha = pLower.replace(/[^a-z0-9]/g, "");
  const alphaMatch = CATEGORIES.find((c) => {
    const cAlpha = c.name.toLowerCase().replace(/[^a-z0-9]/g, "");
    const sAlpha = c.slug.toLowerCase().replace(/[^a-z0-9]/g, "");
    return pAlpha === cAlpha || pAlpha === sAlpha;
  });
  if (alphaMatch) return alphaMatch.name;

  // 4. Substring inclusion
  const partial = CATEGORIES.find(
    (c) =>
      c.name.toLowerCase().includes(pLower) ||
      pLower.includes(c.name.toLowerCase()) ||
      c.slug.toLowerCase().includes(pLower)
  );
  if (partial) return partial.name;

  return decoded;
}

function ProductsCatalogContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedCategory, setSelectedCategory] = useState<string>(() => {
    return resolveCategoryName(searchParams.get("category"));
  });
  const [searchQuery, setSearchQuery] = useState<string>(() => {
    return searchParams.get("search") || "";
  });
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "rating">("featured");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 24;

  // Synchronize category selection whenever URL searchParams change
  useEffect(() => {
    const categoryParam = searchParams.get("category");
    const resolvedCat = resolveCategoryName(categoryParam);
    setSelectedCategory(resolvedCat);
    setCurrentPage(1);
  }, [searchParams]);

  // Synchronize search query whenever URL searchParams change
  useEffect(() => {
    const searchParam = searchParams.get("search");
    setSearchQuery(searchParam || "");
    setCurrentPage(1);
  }, [searchParams]);

  const { addToCart, toggleWishlist, isInWishlist } = useCart();

  // Selected weight options for each product
  const [selectedOptions, setSelectedOptions] = useState<Record<string, ProductWeightOption>>(() => {
    const init: Record<string, ProductWeightOption> = {};
    ALL_PRODUCTS.forEach((p) => {
      init[p.id] = p.options[0];
    });
    return init;
  });

  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  const handleOptionSelect = (productId: string, opt: ProductWeightOption) => {
    setSelectedOptions((prev) => ({ ...prev, [productId]: opt }));
    setOpenDropdownId(null);
  };

  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const option = selectedOptions[product.id] || product.options[0];
    addToCart(product, option, 1);
  };

  const handleBuyNow = (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const option = selectedOptions[product.id] || product.options[0];
    addToCart(product, option, 1);
    router.push("/checkout");
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    let result = [...ALL_PRODUCTS];

    if (selectedCategory !== "All") {
      const targetCat = resolveCategoryName(selectedCategory);
      result = result.filter(
        (p) => p.category.toLowerCase() === targetCat.toLowerCase()
      );
    }

    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          p.ingredients?.toLowerCase().includes(q) ||
          p.healthBenefits?.toLowerCase().includes(q)
      );
    }

    if (sortBy === "price-asc") {
      result.sort((a, b) => a.defaultPrice - b.defaultPrice);
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.defaultPrice - a.defaultPrice);
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [selectedCategory, searchQuery, sortBy]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage, itemsPerPage]);

  const handleCategoryChange = (catName: string) => {
    const resolved = resolveCategoryName(catName);
    setSelectedCategory(resolved);
    setCurrentPage(1);

    const params = new URLSearchParams(searchParams.toString());
    if (resolved === "All") {
      params.delete("category");
    } else {
      params.set("category", resolved);
    }
    const newQuery = params.toString();
    router.replace(newQuery ? `/products?${newQuery}` : "/products", { scroll: false });
  };

  const handleSearchInput = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
    const params = new URLSearchParams(searchParams.toString());
    if (!value.trim()) {
      params.delete("search");
    } else {
      params.set("search", value.trim());
    }
    const newQuery = params.toString();
    router.replace(newQuery ? `/products?${newQuery}` : "/products", { scroll: false });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#faf8f4] text-gray-900 font-sans w-full">
      <TopBar />
      <Navbar />

      {/* Full-Width Header Banner */}
      <section className="w-full bg-[#014d1e] text-white py-10 sm:py-14 relative overflow-hidden">
        <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 relative z-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#7de0a8] text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-[#58cf8b]" />
                <span>ONAAR • 100% Certified Organic Staples</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
                Complete Organic Catalogue (192 Harvests)
              </h1>
              <p className="text-sm sm:text-base text-[#c3decb] max-w-2xl leading-relaxed">
                Explore our full spectrum of unpolished pulses, aged basmati rice,
                heirloom millets, cold-pressed spices, pure honey, and California dry fruits.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 shrink-0">
              <div className="text-center px-4 border-r border-white/20">
                <div className="text-2xl font-black text-white">192</div>
                <div className="text-[11px] text-[#9fc7ad] uppercase tracking-wider font-semibold">
                  Items
                </div>
              </div>
              <div className="text-center px-4 border-r border-white/20">
                <div className="text-2xl font-black text-white">8</div>
                <div className="text-[11px] text-[#9fc7ad] uppercase tracking-wider font-semibold">
                  Categories
                </div>
              </div>
              <div className="text-center px-4">
                <div className="text-2xl font-black text-[#58cf8b]">100%</div>
                <div className="text-[11px] text-[#9fc7ad] uppercase tracking-wider font-semibold">
                  Pure Tested
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Catalog Workspace - Full Width Fluid Container */}
      <main className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 py-8 sm:py-12 flex-1">
        {/* Controls Toolbar: Search, Category Pills, Sort */}
        <div className="space-y-4 mb-8">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-[#e8e4db] shadow-2xs">
            {/* Search Input */}
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search products by name, benefit, or culinary use..."
                value={searchQuery}
                onChange={(e) => handleSearchInput(e.target.value)}
                className="w-full bg-[#f9f8f5] border border-[#dcd6c8] text-gray-900 text-xs sm:text-sm rounded-xl pl-10 pr-9 py-2.5 focus:outline-none focus:border-[#01722C] focus:bg-white focus:ring-1 focus:ring-[#01722C]"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
              {searchQuery && (
                <button
                  onClick={() => handleSearchInput("")}
                  className="w-5 h-5 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-600 flex items-center justify-center absolute right-3 top-3 cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Sort Dropdown & Product Count */}
            <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
              <span className="text-xs text-gray-500 font-medium whitespace-nowrap">
                <strong className="text-gray-900">{filteredProducts.length}</strong> Products Found
              </span>

              <div className="flex items-center gap-1.5 bg-[#f9f8f5] border border-[#dcd6c8] rounded-xl px-3 py-2 text-xs text-gray-700">
                <ArrowUpDown className="w-3.5 h-3.5 text-gray-500" />
                <span className="font-semibold text-gray-500 hidden sm:inline">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent border-none text-xs font-semibold text-gray-900 focus:outline-none cursor-pointer"
                >
                  <option value="featured">Featured Bestsellers</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>
          </div>

          {/* Category Filter Pills (All 8 Categories + "All") */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <button
              onClick={() => handleCategoryChange("All")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                selectedCategory === "All"
                  ? "bg-[#01722C] text-white shadow-sm"
                  : "bg-white text-gray-700 border border-[#e2ddd3] hover:border-[#01722C] hover:bg-[#edf7f1]"
              }`}
            >
              All Harvests (192)
            </button>

            {CATEGORIES.map((cat) => {
              const isSelected =
                selectedCategory.toLowerCase() === cat.name.toLowerCase();
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.name)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                    isSelected
                      ? "bg-[#01722C] text-white shadow-sm"
                      : "bg-white text-gray-700 border border-[#e2ddd3] hover:border-[#01722C] hover:bg-[#edf7f1]"
                  }`}
                >
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-4 h-4 rounded-full object-cover"
                  />
                  <span>{cat.name}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isSelected
                        ? "bg-white/20 text-white"
                        : "bg-gray-100 text-gray-500 font-bold"
                    }`}
                  >
                    24
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Product Cards Full-Width Responsive Grid */}
        {paginatedProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 sm:gap-5">
            {paginatedProducts.map((product) => {
              const currentOption =
                selectedOptions[product.id] || product.options[0];
              const isFav = isInWishlist(product.id);
              const isDropdownOpen = openDropdownId === product.id;

              return (
                <div
                  key={product.id}
                  className="group bg-white rounded-2xl border border-[#e4ebe6] hover:border-[#01722C] hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
                >
                  {/* Card Header & Image */}
                  <div className="relative">
                    <div className="absolute top-2.5 left-2.5 right-2.5 z-10 flex items-center justify-between pointer-events-none">
                      <span className="bg-[#01722C] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-xs pointer-events-auto">
                        {product.tag || product.category}
                      </span>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          toggleWishlist(product.id);
                        }}
                        className={`w-7 h-7 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-xs pointer-events-auto ${
                          isFav
                            ? "bg-rose-50 text-rose-600"
                            : "bg-white/90 backdrop-blur-xs text-gray-500 hover:text-rose-600 hover:bg-white"
                        }`}
                        aria-label="Wishlist"
                      >
                        <Heart
                          className={`w-3.5 h-3.5 ${
                            isFav ? "fill-rose-600 text-rose-600" : ""
                          }`}
                        />
                      </button>
                    </div>

                    <Link
                      href={`/products/${product.id}`}
                      className="block aspect-square w-full bg-[#f8f6f0] overflow-hidden relative"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                        loading="lazy"
                      />
                    </Link>
                  </div>

                  {/* Card Body */}
                  <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Category & Rating */}
                      <div className="flex items-center justify-between gap-1 mb-1 text-[11px] text-gray-500">
                        <span className="font-semibold uppercase text-[#01722C]">
                          {product.category}
                        </span>
                        <div className="flex items-center gap-0.5 text-amber-500 font-bold">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                          <span>{product.rating.toFixed(1)}</span>
                          <span className="text-[10px] text-gray-400 font-normal">
                            ({product.reviewsCount})
                          </span>
                        </div>
                      </div>

                      {/* Product Name */}
                      <Link
                        href={`/products/${product.id}`}
                        className="font-serif text-xs sm:text-sm font-bold text-gray-900 group-hover:text-[#01722C] transition-colors line-clamp-2 leading-snug"
                        title={product.name}
                      >
                        {product.name}
                      </Link>

                      {/* Weight Variant Selector */}
                      <div className="mt-2.5 relative">
                        <button
                          type="button"
                          onClick={() =>
                            setOpenDropdownId(
                              isDropdownOpen ? null : product.id
                            )
                          }
                          className="w-full flex items-center justify-between px-2.5 py-1.5 bg-[#fbfaf7] border border-[#e5dfd2] rounded-lg text-xs font-semibold text-gray-700 hover:border-[#01722C] transition-colors cursor-pointer"
                        >
                          <span className="truncate mr-1">{currentOption.label}</span>
                          <ChevronDown
                            className={`w-3 h-3 text-gray-500 shrink-0 transition-transform ${
                              isDropdownOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>

                        {isDropdownOpen && (
                          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-xl py-1 z-30 animate-fade-in max-h-48 overflow-y-auto">
                            {product.options.map((opt, optIdx) => (
                              <button
                                key={optIdx}
                                type="button"
                                onClick={() =>
                                  handleOptionSelect(product.id, opt)
                                }
                                className={`w-full flex items-center justify-between px-3 py-1.5 text-xs text-left cursor-pointer transition-colors ${
                                  opt.label === currentOption.label
                                    ? "bg-[#edf7f1] text-[#01722C] font-bold"
                                    : "text-gray-700 hover:bg-gray-50"
                                }`}
                              >
                                <span>{opt.label}</span>
                                <span className="font-semibold">
                                  ₹{opt.price.toFixed(2)}
                                </span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Pricing & CTA */}
                    <div className="mt-3 pt-3 border-t border-gray-100 flex flex-col gap-2">
                      <div className="flex items-baseline justify-between">
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-sm sm:text-base font-black text-gray-900">
                            ₹{currentOption.price.toFixed(2)}
                          </span>
                          {currentOption.originalPrice && (
                            <span className="text-[11px] text-gray-400 line-through">
                              ₹{currentOption.originalPrice.toFixed(2)}
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                          In Stock
                        </span>
                      </div>

                      {/* Action Buttons */}
                      <div className="grid grid-cols-2 gap-1.5">
                        <button
                          onClick={(e) => handleAddToCart(product, e)}
                          className="bg-white hover:bg-[#edf7f1] text-[#01722C] border border-[#01722C] text-xs font-bold py-1.5 px-2 rounded-xl transition-all cursor-pointer text-center"
                        >
                          Add to Cart
                        </button>
                        <button
                          onClick={(e) => handleBuyNow(product, e)}
                          className="bg-[#01722C] hover:bg-[#0b542c] text-white text-xs font-bold py-1.5 px-2 rounded-xl transition-all shadow-xs cursor-pointer text-center"
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
        ) : (
          <div className="bg-white rounded-3xl border border-[#e8e4db] p-12 text-center max-w-xl mx-auto space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#edf7f1] text-[#01722C] flex items-center justify-center mx-auto">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-xl font-bold text-gray-900">
              No products found
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
              We couldn&apos;t find any products matching &quot;{searchQuery}&quot;
              in category &quot;{selectedCategory}&quot;.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="bg-[#01722C] text-white text-xs font-bold px-6 py-2.5 rounded-xl hover:bg-[#0b542c] transition-colors cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-[#e8e4db]">
            <div className="text-xs text-gray-500">
              Showing page <strong className="text-gray-900">{currentPage}</strong> of{" "}
              <strong className="text-gray-900">{totalPages}</strong> (
              {filteredProducts.length} total products)
            </div>

            <div className="flex items-center gap-1.5">
              <button
                disabled={currentPage === 1}
                onClick={() => {
                  setCurrentPage((p) => Math.max(1, p - 1));
                  window.scrollTo({ top: 250, behavior: "smooth" });
                }}
                className="p-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                aria-label="Previous Page"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
                <button
                  key={pg}
                  onClick={() => {
                    setCurrentPage(pg);
                    window.scrollTo({ top: 250, behavior: "smooth" });
                  }}
                  className={`w-8 h-8 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    currentPage === pg
                      ? "bg-[#01722C] text-white shadow-xs"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {pg}
                </button>
              ))}

              <button
                disabled={currentPage === totalPages}
                onClick={() => {
                  setCurrentPage((p) => Math.min(totalPages, p + 1));
                  window.scrollTo({ top: 250, behavior: "smooth" });
                }}
                className="p-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                aria-label="Next Page"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </main>

      <Footer />
      <CartDrawer />
      <BulkEnquiryModal />
      <ToastNotification />
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-white text-gray-500 text-sm">
          Loading organic catalogue...
        </div>
      }
    >
      <ProductsCatalogContent />
    </Suspense>
  );
}
