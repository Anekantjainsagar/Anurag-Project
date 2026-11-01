"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
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
  ChevronDown,
  Search,
  ArrowUp,
  LayoutGrid,
  Check,
  User,
  Tag,
  Flame,
  Leaf,
  Loader2,
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

export default function BlogSection() {
  const { showToast } = useCart();
  const [activeBlog, setActiveBlog] = useState<BlogPost | null>(null);
  const [viewMode, setViewMode] = useState<"featured" | "all">("featured");
  const [visibleCount, setVisibleCount] = useState<number>(5);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);

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

  // Blogs currently visible in "one by one" feed
  const displayedBlogs = useMemo(() => {
    return filteredBlogs.slice(0, visibleCount);
  }, [filteredBlogs, visibleCount]);

  const hasMore = visibleCount < filteredBlogs.length;

  // Load more handler
  const loadMore = useCallback(() => {
    if (isLoadingMore || !hasMore) return;
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleCount((prev) => Math.min(prev + 3, filteredBlogs.length));
      setIsLoadingMore(false);
    }, 450);
  }, [isLoadingMore, hasMore, filteredBlogs.length]);

  // Infinite scroll observer on sentinel
  useEffect(() => {
    if (viewMode !== "all" || !hasMore) return;

    const currentSentinel = sentinelRef.current;
    if (!currentSentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && !isLoadingMore) {
          loadMore();
        }
      },
      {
        root: null,
        rootMargin: "200px",
        threshold: 0.1,
      }
    );

    observer.observe(currentSentinel);

    return () => {
      if (currentSentinel) observer.unobserve(currentSentinel);
      observer.disconnect();
    };
  }, [viewMode, hasMore, isLoadingMore, loadMore]);

  // Fallback scroll listener for smooth loading
  useEffect(() => {
    if (viewMode !== "all" || !hasMore) return;

    const handleScroll = () => {
      if (isLoadingMore) return;
      const scrollPosition = window.innerHeight + window.scrollY;
      const documentHeight = document.documentElement.offsetHeight;
      if (documentHeight - scrollPosition < 300) {
        loadMore();
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [viewMode, hasMore, isLoadingMore, loadMore]);

  // Handle switching to "All Blogs"
  const handleViewAll = () => {
    setViewMode("all");
    setVisibleCount(5);
    // Smooth scroll to top of blog section
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Handle switching back to Featured
  const handleBackToFeatured = () => {
    setViewMode("featured");
    setVisibleCount(5);
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Share article handler
  const handleShare = (blog: BlogPost, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const url = typeof window !== "undefined" ? window.location.href : "";
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${url}#${blog.id}`);
      setCopiedId(blog.id);
      showToast(`Link copied for "${blog.title.slice(0, 32)}..."`);
      setTimeout(() => setCopiedId(null), 2500);
    }
  };

  // Keyboard shortcut to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveBlog(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="blogs"
      className="py-10 sm:py-16 bg-[#fcfaf5] border-t border-[#ede7d8] scroll-mt-14"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-10 pb-6 border-b border-[#e7decb]">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e8f3ec] text-[#044a27] text-xs font-bold tracking-wide uppercase mb-2">
              <Leaf className="w-3.5 h-3.5 text-[#044a27]" />
              <span>Healthy Living & Nutrition</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
              {viewMode === "all"
                ? "All Healthy Food & Wellness Articles"
                : "From Our Healthy Living Blog"}
            </h2>
            <p className="text-gray-600 text-xs sm:text-sm mt-1 max-w-2xl">
              {viewMode === "all"
                ? "Browse our complete collection of 12 science-backed guides on pure basmati, unpolished pulses, dry fruits, ancient millets, and cold-pressed oils."
                : "Science-backed nutrition advice, traditional harvesting wisdom, and delicious recipes for a pure and vibrant life."}
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            {viewMode === "featured" ? (
              <button
                onClick={handleViewAll}
                className="inline-flex items-center gap-2 text-xs font-bold text-white bg-[#044a27] hover:bg-[#033b20] active:scale-95 px-5 py-2.5 rounded-full shadow-sm hover:shadow-md transition-all cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>View All Blogs ({BLOG_POSTS.length})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={handleBackToFeatured}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#044a27] bg-white hover:bg-[#e8f3ec] border border-[#cde1d6] px-4 py-2 rounded-full transition-all cursor-pointer"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Back to Featured Grid</span>
              </button>
            )}
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* VIEW MODE 1: FEATURED GRID (Compact 4-Card View)             */}
        {/* ------------------------------------------------------------- */}
        {viewMode === "featured" && (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
              {BLOG_POSTS.slice(0, 4).map((post) => (
                <article
                  key={post.id}
                  onClick={() => setActiveBlog(post)}
                  className="group cursor-pointer bg-white border border-[#e4ebe6] rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5"
                >
                  {/* Blog Image */}
                  <div className="relative aspect-16/10 overflow-hidden bg-gray-100">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-108"
                      loading="lazy"
                    />
                    {post.category && (
                      <span className="absolute top-2.5 left-2.5 bg-black/65 backdrop-blur-xs text-white text-[10.5px] font-semibold px-2.5 py-0.5 rounded-full">
                        {post.category}
                      </span>
                    )}
                    <span className="absolute bottom-2.5 right-2.5 bg-white/90 backdrop-blur-xs text-gray-800 text-[10.5px] font-medium px-2 py-0.5 rounded-md flex items-center gap-1 shadow-2xs">
                      <Clock className="w-2.5 h-2.5 text-[#044a27]" />
                      {post.readTime}
                    </span>
                  </div>

                  {/* Blog Details */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex items-center gap-1.5 text-[11px] text-gray-400 mb-1.5">
                        <Calendar className="w-3 h-3 text-[#c29336]" />
                        <span>{post.date}</span>
                      </div>

                      <h3 className="font-serif font-bold text-sm sm:text-base text-gray-900 group-hover:text-[#044a27] transition-colors leading-snug line-clamp-2">
                        {post.title}
                      </h3>

                      <p className="text-gray-500 text-xs mt-2 line-clamp-2 leading-relaxed">
                        {post.summary}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs">
                      <span className="text-[11px] text-gray-500 font-medium">
                        {getAuthorName(post.author)}
                      </span>
                      <span className="text-[#044a27] font-bold group-hover:underline flex items-center gap-1">
                        Read Story <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Quick banner to explore all 12 blogs */}
            <div className="mt-8 p-4 sm:p-5 bg-linear-to-r from-[#043e23] to-[#065430] rounded-2xl text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                  <Sparkles className="w-5 h-5 text-[#facc15]" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-sm sm:text-base">
                    Want to explore more farm-fresh food insights?
                  </h4>
                  <p className="text-white/80 text-xs">
                    We have 12 in-depth articles on pure grains, cold-pressed oils, unpolished dals, and spices.
                  </p>
                </div>
              </div>
              <button
                onClick={handleViewAll}
                className="shrink-0 bg-[#facc15] hover:bg-[#eab308] text-[#033b20] font-bold text-xs px-5 py-2.5 rounded-full transition-transform active:scale-95 shadow-sm cursor-pointer flex items-center gap-1.5"
              >
                <span>Browse All 12 Articles</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* VIEW MODE 2: ALL BLOGS "ONE BY ONE" FEED WITH SCROLL-TO-LOAD */}
        {/* ------------------------------------------------------------- */}
        {viewMode === "all" && (
          <div>
            {/* Filter Pills & Search Bar */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#e4ebe6] shadow-xs mb-8 space-y-4">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                {/* Search Input */}
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setVisibleCount(5); // Reset to 5 on new search
                    }}
                    placeholder="Search articles by topic (e.g. Basmati, Curcumin, Protein, GI)..."
                    className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-[#faf9f5] border border-[#d8e2dc] rounded-full focus:outline-hidden focus:border-[#044a27] focus:ring-1 focus:ring-[#044a27] transition-all"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Article Counter */}
                <div className="text-xs text-gray-500 font-medium self-end sm:self-center">
                  Showing{" "}
                  <strong className="text-[#044a27]">
                    {Math.min(displayedBlogs.length, filteredBlogs.length)}
                  </strong>{" "}
                  of <strong>{filteredBlogs.length}</strong> articles
                </div>
              </div>

              {/* Category Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
                {categories.map((cat) => {
                  const isSelected = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => {
                        setSelectedCategory(cat);
                        setVisibleCount(5); // Reset to 5 on category change
                      }}
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
              <div className="bg-white rounded-2xl p-8 text-center border border-gray-100 my-6">
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

            {/* ONE BY ONE LIST OF BLOG ARTICLES (Starts at 5, loads more on scroll) */}
            <div className="space-y-6">
              {displayedBlogs.map((blog, idx) => (
                <article
                  key={blog.id}
                  onClick={() => setActiveBlog(blog)}
                  className="group cursor-pointer bg-white border border-[#e2eae4] hover:border-[#b8d6c5] rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row hover:-translate-y-1"
                >
                  {/* Left Column: Image with badges (16:9 on mobile, ~340px fixed width on desktop) */}
                  <div className="relative md:w-80 lg:w-96 shrink-0 aspect-16/10 md:aspect-auto overflow-hidden bg-gray-100">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-106"
                      loading="lazy"
                    />
                    {/* Index counter badge */}
                    <div className="absolute top-3 left-3 bg-[#044a27] text-white text-[11px] font-bold w-6 h-6 rounded-full flex items-center justify-center shadow-md">
                      {idx + 1}
                    </div>
                    {blog.category && (
                      <span className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-xs text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
                        {blog.category}
                      </span>
                    )}
                    <span className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-xs text-gray-800 text-[11px] font-semibold px-2 py-0.5 rounded-md flex items-center gap-1 shadow-2xs">
                      <Clock className="w-3 h-3 text-[#044a27]" />
                      {blog.readTime}
                    </span>
                  </div>

                  {/* Right Column: Rich Content */}
                  <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      {/* Date & Author */}
                      <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 mb-2">
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
                      <p className="text-gray-600 text-xs sm:text-sm mt-2 leading-relaxed">
                        {blog.summary}
                      </p>

                      {/* Key Health Benefits Checklist (Pills) */}
                      {blog.keyBenefits && (
                        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-2">
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

                    {/* Footer Row: Tags & Read Button */}
                    <div className="pt-3 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      {/* Nutrition highlight pill */}
                      {blog.nutritionalHighlights && blog.nutritionalHighlights[0] && (
                        <div className="inline-flex items-center gap-1.5 bg-[#f5f8f6] px-2.5 py-1 rounded-lg text-[11px] text-[#044a27] font-semibold border border-[#d6e5dc]">
                          <Flame className="w-3 h-3 text-[#c29336]" />
                          <span>
                            {blog.nutritionalHighlights[0].label}:{" "}
                            <strong>{blog.nutritionalHighlights[0].value}</strong>
                          </span>
                        </div>
                      )}

                      <div className="flex items-center gap-2 self-end sm:self-auto">
                        <button
                          onClick={(e) => handleShare(blog, e)}
                          title="Share article link"
                          className="p-1.5 text-gray-400 hover:text-[#044a27] hover:bg-[#e8f3ec] rounded-full transition-colors"
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
              ))}
            </div>

            {/* SCROLL SENTINEL & LOAD MORE ANIMATION */}
            {hasMore && (
              <div
                ref={sentinelRef}
                className="py-10 flex flex-col items-center justify-center text-center"
              >
                {isLoadingMore ? (
                  <div className="flex items-center gap-2.5 bg-white px-5 py-3 rounded-full border border-[#cde1d6] shadow-sm animate-fade-in">
                    <Loader2 className="w-4 h-4 text-[#044a27] animate-spin" />
                    <span className="text-xs font-semibold text-[#044a27]">
                      Loading more healthy food stories...
                    </span>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p className="text-xs text-gray-400">
                      Scroll down to automatically load more articles ({filteredBlogs.length - visibleCount} remaining)
                    </p>
                    <button
                      onClick={loadMore}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#044a27] bg-white hover:bg-[#e8f3ec] border border-[#cde1d6] px-4 py-2 rounded-full shadow-2xs transition-all cursor-pointer"
                    >
                      <span>Load Next Articles</span>
                      <ChevronDown className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* ALL BLOGS LOADED COMPLETION NOTICE */}
            {!hasMore && filteredBlogs.length > 0 && (
              <div className="mt-10 p-6 bg-white rounded-2xl border border-[#dce8e1] text-center shadow-xs">
                <div className="w-10 h-10 rounded-full bg-[#e8f3ec] text-[#044a27] flex items-center justify-center mx-auto mb-2">
                  <Leaf className="w-5 h-5 text-[#044a27]" />
                </div>
                <h4 className="font-serif font-bold text-sm sm:text-base text-gray-900">
                  You&apos;ve reached the end of our healthy living articles!
                </h4>
                <p className="text-xs text-gray-500 mt-1 max-w-md mx-auto">
                  Every product we harvest and pack is unadulterated, farm-fresh, and tested for pure nutrition.
                </p>
                <div className="mt-4 flex items-center justify-center gap-3">
                  <button
                    onClick={() => {
                      if (sectionRef.current) {
                        sectionRef.current.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-gray-900 bg-[#f5f3ec] hover:bg-[#ebe7dc] px-3.5 py-1.5 rounded-full transition-all cursor-pointer"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                    <span>Back to Top</span>
                  </button>
                  <button
                    onClick={handleBackToFeatured}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#044a27] bg-[#e8f3ec] hover:bg-[#d6ebd9] px-3.5 py-1.5 rounded-full transition-all cursor-pointer"
                  >
                    <LayoutGrid className="w-3.5 h-3.5" />
                    <span>Return to Grid View</span>
                  </button>
                </div>
              </div>
            )}
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
            {/* Modal Hero Image */}
            <div className="relative aspect-16/9 w-full shrink-0 overflow-hidden bg-gray-900">
              <img
                src={activeBlog.image}
                alt={activeBlog.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

              {/* Close Button */}
              <button
                onClick={() => setActiveBlog(null)}
                aria-label="Close article modal"
                className="absolute top-3.5 right-3.5 bg-black/60 hover:bg-black text-white p-2 rounded-full transition-colors cursor-pointer z-10"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Badges on hero image */}
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white text-xs">
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
              <a
                href="#best-sellers"
                onClick={() => setActiveBlog(null)}
                className="text-xs font-bold text-[#044a27] hover:underline flex items-center gap-1"
              >
                <span>Shop Related Farm-Fresh Commodities</span>
                <ArrowRight className="w-3 h-3" />
              </a>

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
