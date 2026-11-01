"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { BLOG_POSTS } from "@/data/mockData";
import { BlogPost } from "@/types";
import { useCart } from "@/context/CartContext";
import {
  ArrowRight,
  Calendar,
  Clock,
  X,
  BookOpen,
  Sparkles,
  Share2,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Search,
  ArrowUp,
  Check,
  User,
  Tag,
  Leaf,
  Camera,
} from "lucide-react";

function getAuthorName(author?: string | { name: string; role: string }) {
  if (!author) return "Pure Food Editorial";
  if (typeof author === "string") return author;
  return author.name;
}

function getAuthorRole(author?: string | { name: string; role: string }) {
  if (!author || typeof author === "string") return "Editorial Team";
  return author.role;
}

// -------------------------------------------------------------
// SUB-COMPONENT: BlogImageCarousel (Interactive Photo Carousel)
// -------------------------------------------------------------
function BlogImageCarousel({
  images,
  title,
  category,
  readTime,
  badgeIndex,
  className = "",
}: {
  images: string[];
  title: string;
  category?: string;
  readTime?: string;
  badgeIndex?: number;
  className?: string;
}) {
  const [currentIdx, setCurrentIdx] = useState(0);

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIdx((prev) => (prev - 1 + images.length) % images.length);
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIdx((prev) => (prev + 1) % images.length);
  };

  return (
    <div
      className={`relative overflow-hidden bg-gray-900 group/carousel ${className}`}
    >
      {/* Sliding Images */}
      {images.map((img, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
            i === currentIdx ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
          }`}
        >
          <img
            src={img}
            alt={`${title} - photo ${i + 1}`}
            className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover/carousel:scale-105"
            loading="lazy"
          />
        </div>
      ))}

      {/* Subtle Dark Gradient at Bottom & Top */}
      <div className="absolute inset-0 bg-linear-to-t from-black/75 via-transparent to-black/30 z-20 pointer-events-none" />

      {/* Top Left: Category Pill */}
      {category && (
        <span className="absolute top-3 left-3 z-30 bg-[#044a27]/90 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
          {category}
        </span>
      )}

      {/* Top Right: Sequential Index or Camera Counter */}
      <div className="absolute top-3 right-3 z-30 flex items-center gap-1.5">
        {images.length > 1 && (
          <span className="bg-black/60 backdrop-blur-xs text-white text-[10px] font-medium px-2 py-0.5 rounded-full flex items-center gap-1">
            <Camera className="w-2.5 h-2.5 text-[#facc15]" />
            <span>
              {currentIdx + 1}/{images.length}
            </span>
          </span>
        )}
        {badgeIndex && (
          <span className="bg-white/90 text-[#044a27] text-[10px] font-black px-2 py-0.5 rounded-full shadow-2xs font-mono">
            #{badgeIndex}
          </span>
        )}
      </div>

      {/* Left / Right Carousel Arrow Buttons (Visible on hover or mobile) */}
      {images.length > 1 && (
        <>
          <button
            onClick={prevImage}
            aria-label="Previous article image"
            className="absolute left-2 top-1/2 -translate-y-1/2 z-30 w-7 h-7 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center opacity-80 sm:opacity-0 group-hover/carousel:opacity-100 transition-opacity cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={nextImage}
            aria-label="Next article image"
            className="absolute right-2 top-1/2 -translate-y-1/2 z-30 w-7 h-7 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center opacity-80 sm:opacity-0 group-hover/carousel:opacity-100 transition-opacity cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </>
      )}

      {/* Bottom Floating Bar with Read Time */}
      {readTime && (
        <div className="absolute bottom-2.5 right-3 z-30 flex items-center gap-1 text-[11px] font-semibold text-white/90 bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded-md">
          <Clock className="w-3 h-3 text-[#facc15]" />
          <span>{readTime}</span>
        </div>
      )}

      {/* Bottom Carousel Dot Indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-2.5 left-3 z-30 flex items-center gap-1">
          {images.map((_, dotIdx) => (
            <button
              key={dotIdx}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIdx(dotIdx);
              }}
              aria-label={`Jump to image ${dotIdx + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                dotIdx === currentIdx
                  ? "w-4 bg-[#facc15]"
                  : "w-1.5 bg-white/60 hover:bg-white"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// -------------------------------------------------------------
// MAIN COMPONENT: BlogSection (Shows ALL blogs by default)
// -------------------------------------------------------------
export default function BlogSection() {
  const { showToast } = useCart();
  const [activeBlog, setActiveBlog] = useState<BlogPost | null>(null);
  const [modalImageIndex, setModalImageIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Extract unique categories for filter pills
  const categories = useMemo(() => {
    const cats = new Set<string>();
    BLOG_POSTS.forEach((post) => {
      if (post.category) cats.add(post.category);
    });
    return ["All", ...Array.from(cats)];
  }, []);

  // Filtered blogs based on search & category
  const filteredBlogs = useMemo(() => {
    return BLOG_POSTS.filter((post) => {
      const matchesCategory =
        selectedCategory === "All" || post.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === "" ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags?.some((t) =>
          t.toLowerCase().includes(searchQuery.toLowerCase())
        ) ||
        post.category?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Open modal handler (resets image index)
  const handleOpenBlog = (blog: BlogPost) => {
    setActiveBlog(blog);
    setModalImageIndex(0);
  };

  // Share link handler
  const handleShare = (blog: BlogPost, e: React.MouseEvent) => {
    e.stopPropagation();
    if (typeof window !== "undefined") {
      navigator.clipboard?.writeText(window.location.href);
      setCopiedId(blog.id);
      showToast("Article link copied to clipboard!");
      setTimeout(() => setCopiedId(null), 2500);
    }
  };

  return (
    <section
      id="blogs"
      className="py-10 sm:py-14 bg-[#faf8f4] border-t border-[#f0ece1]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header (Clean, Formal, Direct) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-6 border-b border-[#e7decb]">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e8f3ec] text-[#044a27] text-xs font-bold tracking-wide uppercase mb-2">
              <Leaf className="w-3.5 h-3.5 text-[#044a27]" />
              <span>Healthy Living & Nutrition</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
              All Healthy Food & Wellness Articles
            </h2>
            <p className="text-gray-600 text-xs sm:text-sm mt-1 max-w-2xl">
              Browse our complete collection of 12 science-backed guides. Click images to scroll through photos, explore verified nutritional highlights, and discover farm purity.
            </p>
          </div>

          <div className="text-xs text-gray-500 font-medium">
            Showing <strong className="text-[#044a27] font-bold">{filteredBlogs.length}</strong> of{" "}
            <strong>{BLOG_POSTS.length}</strong> articles
          </div>
        </div>

        {/* Filter Pills & Live Search Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#e4ebe6] shadow-xs mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles by topic (e.g. Basmati, Curcumin, Protein, GI)..."
                className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-[#faf9f5] border border-[#d8e2dc] rounded-full focus:outline-hidden focus:border-[#044a27] focus:ring-1 focus:ring-[#044a27] transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Quick Reset Button if filtered */}
            {(selectedCategory !== "All" || searchQuery) && (
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                }}
                className="text-xs font-semibold text-[#044a27] hover:underline self-end sm:self-center cursor-pointer"
              >
                Clear all filters
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`whitespace-nowrap px-3.5 py-1.5 rounded-full font-medium transition-all cursor-pointer text-xs ${
                    isSelected
                      ? "bg-[#044a27] text-white shadow-2xs"
                      : "bg-[#f5f3ec] text-gray-600 hover:bg-[#e7e3d6]"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Empty Search Result */}
        {filteredBlogs.length === 0 && (
          <div className="bg-white rounded-2xl p-10 text-center border border-gray-100 my-6">
            <BookOpen className="w-10 h-10 text-gray-300 mx-auto mb-2" />
            <h3 className="font-serif font-bold text-base text-gray-800">
              No articles found
            </h3>
            <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto">
              We couldn&apos;t find any articles matching &quot;{searchQuery}&quot;. Try selecting a different category or clearing your search.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="mt-4 text-xs font-semibold text-[#044a27] underline cursor-pointer"
            >
              Reset all filters
            </button>
          </div>
        )}

        {/* ALL BLOG ARTICLES LIST (All 12 Shown by Default!) */}
        <div className="space-y-6">
          {filteredBlogs.map((blog, idx) => {
            const blogImages =
              blog.images && blog.images.length > 0
                ? blog.images
                : [blog.image];

            return (
              <article
                key={blog.id}
                onClick={() => handleOpenBlog(blog)}
                className="group cursor-pointer bg-white border border-[#e2eae4] hover:border-[#b8d6c5] rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row hover:-translate-y-1"
              >
                {/* Left Column: Fixed Uniform Dimension Gallery Carousel */}
                <div className="w-full md:w-[380px] lg:w-[420px] h-[240px] sm:h-[270px] md:h-auto md:min-h-[310px] shrink-0 relative overflow-hidden bg-gray-900">
                  <BlogImageCarousel
                    images={blogImages}
                    title={blog.title}
                    category={blog.category}
                    readTime={blog.readTime}
                    badgeIndex={idx + 1}
                    className="w-full h-full"
                  />
                </div>

                {/* Right Column: Filled, Balanced Content with Verified Nutritional Highlights */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-3 min-w-0">
                  <div>
                    {/* Date & Author */}
                    <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 mb-1.5">
                      <span className="flex items-center gap-1 text-[#c29336] font-medium">
                        <Calendar className="w-3.5 h-3.5" />
                        {blog.date}
                      </span>
                      {blog.author && (
                        <>
                          <span>•</span>
                          <span className="flex items-center gap-1 text-gray-600">
                            <User className="w-3 h-3 text-gray-400" />
                            <strong>{getAuthorName(blog.author)}</strong>
                            <span className="hidden sm:inline text-gray-400">
                              ({getAuthorRole(blog.author)})
                            </span>
                          </span>
                        </>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="font-serif font-black text-base sm:text-lg lg:text-xl text-gray-900 group-hover:text-[#044a27] transition-colors leading-snug">
                      {blog.title}
                    </h3>

                    {/* Summary */}
                    <p className="text-gray-600 text-xs sm:text-sm mt-1.5 leading-relaxed line-clamp-2">
                      {blog.summary}
                    </p>

                    {/* Key Health Benefits Checklist (Pills) */}
                    {blog.keyBenefits && (
                      <div className="mt-2.5 grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                        {blog.keyBenefits.slice(0, 2).map((benefit, i) => (
                          <div
                            key={i}
                            className="flex items-start gap-1.5 text-xs text-gray-700"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#044a27] shrink-0 mt-0.5" />
                            <span className="line-clamp-1">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* VERIFIED NUTRITIONAL HIGHLIGHTS */}
                  {blog.nutritionalHighlights &&
                    blog.nutritionalHighlights.length > 0 && (
                      <div className="pt-2 border-t border-[#f0eee6]">
                        <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#044a27] uppercase tracking-wide mb-1.5">
                          <Sparkles className="w-3 h-3 text-[#c29336]" />
                          <span>Verified Nutritional Highlights</span>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {blog.nutritionalHighlights
                            .slice(0, 4)
                            .map((stat, i) => (
                              <div
                                key={i}
                                className="bg-[#fbf9f4] hover:bg-[#f6f2e8] transition-colors p-2 rounded-xl border border-[#ece4d4] text-center"
                              >
                                <div className="text-[10px] text-gray-500 font-medium truncate">
                                  {stat.label}
                                </div>
                                <div className="font-bold text-xs text-[#044a27] mt-0.5 truncate">
                                  {stat.value}
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    )}

                  {/* Footer Row: Tags & Read Button */}
                  <div className="pt-2 border-t border-gray-100 flex items-center justify-between gap-3">
                    <div className="text-xs text-gray-400 font-medium">
                      Click image or arrows to preview photos
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => handleShare(blog, e)}
                        title="Share article link"
                        className="p-1.5 text-gray-400 hover:text-[#044a27] hover:bg-[#e8f3ec] rounded-full transition-colors cursor-pointer"
                      >
                        {copiedId === blog.id ? (
                          <Check className="w-4 h-4 text-green-600" />
                        ) : (
                          <Share2 className="w-4 h-4" />
                        )}
                      </button>
                      <span className="inline-flex items-center gap-1.5 bg-[#044a27] group-hover:bg-[#033b20] text-white text-xs font-semibold px-4 py-1.5 rounded-full shadow-2xs transition-all">
                        <span>Read Full Story</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Bottom Back-to-Top Bar */}
        {filteredBlogs.length > 0 && (
          <div className="mt-10 p-6 bg-white rounded-2xl border border-[#dce8e1] text-center shadow-xs">
            <div className="w-10 h-10 rounded-full bg-[#e8f3ec] text-[#044a27] flex items-center justify-center mx-auto mb-2">
              <Leaf className="w-5 h-5 text-[#044a27]" />
            </div>
            <h4 className="font-serif font-bold text-sm sm:text-base text-gray-900">
              Viewing All {filteredBlogs.length} Healthy Living Articles
            </h4>
            <p className="text-xs text-gray-500 mt-1 max-w-md mx-auto">
              Every harvest is unadulterated, farm-fresh, and tested for pure nutrition.
            </p>
            <div className="mt-4 flex items-center justify-center gap-3">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-700 hover:text-gray-900 bg-[#f5f3ec] hover:bg-[#ebe7dc] px-4 py-2 rounded-full transition-all cursor-pointer"
              >
                <ArrowUp className="w-3.5 h-3.5" />
                <span>Back to Top</span>
              </button>
              <Link
                href="/products"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-[#044a27] hover:bg-[#033b20] px-4 py-2 rounded-full transition-all shadow-2xs"
              >
                <span>Browse Products (192)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* ------------------------------------------------------------- */}
      {/* COMPREHENSIVE BLOG DETAIL READING MODAL                        */}
      {/* ------------------------------------------------------------- */}
      {activeBlog && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/65 backdrop-blur-xs animate-fade-in overflow-y-auto"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl max-w-2xl w-full my-auto overflow-hidden shadow-2xl border border-gray-200 max-h-[90vh] flex flex-col"
          >
            {/* Modal Hero Image with Carousel Controls */}
            {(() => {
              const modalGallery =
                activeBlog.images && activeBlog.images.length > 0
                  ? activeBlog.images
                  : [activeBlog.image];

              return (
                <div className="relative aspect-16/9 w-full shrink-0 overflow-hidden bg-gray-900 group/modalImg">
                  <img
                    src={modalGallery[modalImageIndex % modalGallery.length]}
                    alt={activeBlog.title}
                    className="w-full h-full object-cover transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                  {/* Close Button */}
                  <button
                    onClick={() => setActiveBlog(null)}
                    aria-label="Close article modal"
                    className="absolute top-3.5 right-3.5 bg-black/60 hover:bg-black text-white p-2 rounded-full transition-colors cursor-pointer z-20"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  {/* Modal Image Carousel Controls if multiple images */}
                  {modalGallery.length > 1 && (
                    <>
                      <button
                        onClick={() =>
                          setModalImageIndex(
                            (prev) =>
                              (prev - 1 + modalGallery.length) %
                              modalGallery.length
                          )
                        }
                        aria-label="Previous photo"
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center z-20 cursor-pointer"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() =>
                          setModalImageIndex(
                            (prev) => (prev + 1) % modalGallery.length
                          )
                        }
                        aria-label="Next photo"
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center z-20 cursor-pointer"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>

                      <div className="absolute top-3.5 left-3.5 z-20 bg-black/60 text-white text-[11px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 backdrop-blur-xs">
                        <Camera className="w-3 h-3 text-[#facc15]" />
                        <span>
                          {(modalImageIndex % modalGallery.length) + 1} /{" "}
                          {modalGallery.length} Photos
                        </span>
                      </div>
                    </>
                  )}

                  {/* Badges on hero image */}
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white text-xs z-10 pointer-events-none">
                    {activeBlog.category && (
                      <span className="bg-[#044a27]/90 backdrop-blur-xs font-bold px-3 py-1 rounded-full text-[11px] shadow-sm">
                        {activeBlog.category}
                      </span>
                    )}
                    <div className="flex items-center gap-2 font-medium text-[11.5px] bg-black/50 px-2.5 py-1 rounded-full backdrop-blur-xs">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-[#facc15]" />
                        {activeBlog.date}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#facc15]" />
                        {activeBlog.readTime}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Modal Scrollable Article Body */}
            <div className="p-5 sm:p-7 overflow-y-auto space-y-4">
              {/* Author Banner */}
              {activeBlog.author && (
                <div className="flex items-center justify-between p-3 bg-[#f8f6f0] rounded-xl border border-[#ede5d3]">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#044a27] text-white flex items-center justify-center font-bold text-xs">
                      {getAuthorName(activeBlog.author).charAt(0)}
                    </div>
                    <div>
                      <h5 className="font-bold text-xs text-gray-900">
                        {getAuthorName(activeBlog.author)}
                      </h5>
                      <p className="text-[11px] text-gray-500">
                        {getAuthorRole(activeBlog.author)}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={(e) => handleShare(activeBlog, e)}
                    className="inline-flex items-center gap-1 text-xs text-[#044a27] font-semibold hover:underline cursor-pointer"
                  >
                    {copiedId === activeBlog.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-green-600" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="w-3.5 h-3.5" />
                        <span>Share</span>
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* Title */}
              <h2 className="font-serif text-xl sm:text-2xl font-black text-gray-900 leading-snug">
                {activeBlog.title}
              </h2>

              {/* Summary Lead */}
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-medium bg-[#f2f8f4] p-3.5 rounded-xl border-l-4 border-[#044a27]">
                {activeBlog.summary}
              </p>

              {/* Key Health Benefits */}
              {activeBlog.keyBenefits && activeBlog.keyBenefits.length > 0 && (
                <div className="p-4 bg-white rounded-xl border border-[#dce8e1] shadow-2xs space-y-2">
                  <h4 className="font-serif font-bold text-xs sm:text-sm text-[#044a27] flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-[#c29336]" />
                    <span>Key Health & Nutritional Takeaways</span>
                  </h4>
                  <ul className="space-y-1.5">
                    {activeBlog.keyBenefits.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-xs text-gray-700"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#044a27] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Main Article Paragraphs */}
              <div className="space-y-3 pt-1 text-xs sm:text-sm text-gray-600 leading-relaxed">
                {activeBlog.content && activeBlog.content.length > 0 ? (
                  activeBlog.content.map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))
                ) : (
                  <p>{activeBlog.summary}</p>
                )}
              </div>

              {/* Nutritional Highlights Grid */}
              {activeBlog.nutritionalHighlights && (
                <div className="pt-2">
                  <h4 className="font-serif font-bold text-xs text-gray-900 mb-2">
                    Verified Nutritional Highlights:
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {activeBlog.nutritionalHighlights.map((stat, i) => (
                      <div
                        key={i}
                        className="bg-[#fbf7ee] p-2.5 rounded-xl border border-[#ede3cf] text-center"
                      >
                        <div className="text-[10px] text-gray-500 font-medium">
                          {stat.label}
                        </div>
                        <div className="font-bold text-xs sm:text-sm text-[#044a27] mt-0.5">
                          {stat.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Expert Purity / Cooking Tip Box */}
              {activeBlog.healthTip && (
                <div className="p-3.5 bg-[#fef9ee] rounded-xl text-xs text-gray-800 leading-relaxed border border-[#f3e1b7]">
                  💡 <strong>Farm Nutrition Tip:</strong> {activeBlog.healthTip}
                </div>
              )}

              {/* Tags */}
              {activeBlog.tags && activeBlog.tags.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5 pt-2">
                  <Tag className="w-3.5 h-3.5 text-gray-400" />
                  {activeBlog.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-gray-100 text-gray-600 text-[11px] font-medium px-2.5 py-0.5 rounded-md"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Modal Footer Actions */}
            <div className="p-4 sm:p-5 bg-gray-50 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
              <Link
                href="/products"
                onClick={() => setActiveBlog(null)}
                className="text-xs font-bold text-[#044a27] hover:underline flex items-center gap-1"
              >
                <span>Shop Related Farm-Fresh Commodities</span>
                <ArrowRight className="w-3 h-3" />
              </Link>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <button
                  onClick={() => setActiveBlog(null)}
                  className="w-full sm:w-auto bg-[#044a27] hover:bg-[#033b20] text-white text-xs font-bold px-5 py-2.5 rounded-full transition-transform active:scale-95 cursor-pointer shadow-xs"
                >
                  Close Article
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
