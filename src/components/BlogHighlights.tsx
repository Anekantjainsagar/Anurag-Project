"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { BLOG_POSTS } from "@/data/mockData";
import { BlogPost } from "@/types";
import {
  ArrowRight,
  BookOpen,
  Clock,
  Calendar,
  Sparkles,
  X,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Share2,
  Check,
  Tag,
} from "lucide-react";

export default function BlogHighlights() {
  const featuredArticles = BLOG_POSTS.slice(0, 3);
  const [activeArticle, setActiveArticle] = useState<BlogPost | null>(null);
  const [modalImageIndex, setModalImageIndex] = useState(0);
  const [isCopied, setIsCopied] = useState(false);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (activeArticle) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [activeArticle]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveArticle(null);
      }
    };
    if (activeArticle) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeArticle]);

  const handleOpenArticle = (article: BlogPost) => {
    setActiveArticle(article);
    setModalImageIndex(0);
    setIsCopied(false);
  };

  const handleShare = (article: BlogPost) => {
    if (typeof window !== "undefined") {
      const shareUrl = `${window.location.origin}/blog`;
      navigator.clipboard.writeText(`${article.title} - ${shareUrl}`);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    }
  };

  const getAuthorName = (author?: { name: string; role: string } | string) => {
    if (!author) return "ONAAR Editorial";
    return typeof author === "string" ? author : author.name;
  };

  const getAuthorRole = (author?: { name: string; role: string } | string) => {
    if (!author || typeof author === "string") return "Agronomy & Ayurvedic Research";
    return author.role;
  };

  return (
    <section className="py-12 sm:py-16 bg-[#faf8f4] border-t border-[#f0eee6] w-full font-sans">
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
        {/* Full Width Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8 sm:mb-10 pb-4 border-b border-[#e7decb]">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#edf7f1] text-[#01722C] text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#01722C]" />
              <span>Ancient Science & Nutritional Insights</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
              From Our Health & Nutrition Journal
            </h2>
            <p className="text-gray-500 text-xs sm:text-sm mt-1">
              Scientific guides on unpolished grains, bilona cow ghee, glycemic index, and gut harmony
            </p>
          </div>

          {/* Top Button Navigates to Dedicated /blog Page */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 bg-[#01722C] hover:bg-[#0b542c] text-white text-xs sm:text-sm font-bold px-6 py-2.5 rounded-xl transition-all shadow-xs cursor-pointer"
          >
            <span>Read All {BLOG_POSTS.length} Articles</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 3 Featured Articles Full Width Grid (Opens in Modal Right Here) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {featuredArticles.map((article) => {
            const authorName = getAuthorName(article.author);

            return (
              <article
                key={article.id}
                onClick={() => handleOpenArticle(article)}
                className="group bg-white rounded-2xl border border-[#e4ebe6] hover:border-[#01722C] hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer"
              >
                <div>
                  {/* Article Thumbnail */}
                  <div className="block aspect-16/10 overflow-hidden relative bg-[#f2efe8]">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    {article.category && (
                      <span className="absolute top-3 left-3 bg-[#01722C]/90 backdrop-blur-xs text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                        {article.category}
                      </span>
                    )}
                  </div>

                  {/* Body */}
                  <div className="p-5 sm:p-6 space-y-3">
                    <div className="flex items-center gap-3 text-xs text-gray-400">
                      <span className="flex items-center gap-1 text-[#c29336] font-medium">
                        <Calendar className="w-3.5 h-3.5" />
                        {article.date}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-gray-500">
                        <Clock className="w-3.5 h-3.5" />
                        {article.readTime}
                      </span>
                    </div>

                    <h3 className="font-serif text-base sm:text-lg font-bold text-gray-900 group-hover:text-[#01722C] transition-colors leading-snug line-clamp-2">
                      {article.title}
                    </h3>

                    <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">
                      {article.summary}
                    </p>
                  </div>
                </div>

                {/* Footer */}
                <div className="p-5 sm:p-6 pt-0 border-t border-gray-100 flex items-center justify-between mt-2">
                  <span className="text-xs font-semibold text-gray-500">
                    By {authorName}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenArticle(article);
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#01722C] group-hover:underline cursor-pointer"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* IN-PLACE ARTICLE READING MODAL (Opens right on the Home Page) */}
      {/* ------------------------------------------------------------- */}
      {activeArticle && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setActiveArticle(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/70 backdrop-blur-xs animate-fade-in overflow-y-auto"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl max-w-2xl w-full my-auto overflow-hidden shadow-2xl border border-gray-200 max-h-[90vh] flex flex-col animate-scale-up"
          >
            {/* Modal Hero Image */}
            {(() => {
              const modalGallery =
                activeArticle.images && activeArticle.images.length > 0
                  ? activeArticle.images
                  : [activeArticle.image];

              return (
                <div className="relative aspect-16/9 w-full shrink-0 overflow-hidden bg-gray-900 group/modalImg">
                  <img
                    src={modalGallery[modalImageIndex % modalGallery.length]}
                    alt={activeArticle.title}
                    className="w-full h-full object-cover transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                  {/* Close Button */}
                  <button
                    onClick={() => setActiveArticle(null)}
                    aria-label="Close article modal"
                    className="absolute top-3.5 right-3.5 bg-black/60 hover:bg-black text-white p-2 rounded-full transition-colors cursor-pointer z-20"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  {/* Carousel Controls if multiple images */}
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
                        <span>
                          {(modalImageIndex % modalGallery.length) + 1} /{" "}
                          {modalGallery.length} Photos
                        </span>
                      </div>
                    </>
                  )}

                  {/* Badges on hero image */}
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white text-xs z-10 pointer-events-none">
                    {activeArticle.category && (
                      <span className="bg-[#01722C]/90 backdrop-blur-xs font-bold px-3 py-1 rounded-full text-[11px] shadow-sm">
                        {activeArticle.category}
                      </span>
                    )}
                    <div className="flex items-center gap-2 font-medium text-[11.5px] bg-black/50 px-2.5 py-1 rounded-full backdrop-blur-xs">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-[#facc15]" />
                        {activeArticle.date}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#facc15]" />
                        {activeArticle.readTime}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Modal Scrollable Article Body */}
            <div className="p-5 sm:p-7 overflow-y-auto space-y-4">
              {/* Author & Share Bar */}
              <div className="flex items-center justify-between p-3 bg-[#f8f6f0] rounded-xl border border-[#ede5d3]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#01722C] text-white flex items-center justify-center font-bold text-xs">
                    {getAuthorName(activeArticle.author).charAt(0)}
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-gray-900">
                      {getAuthorName(activeArticle.author)}
                    </h5>
                    <p className="text-[11px] text-gray-500">
                      {getAuthorRole(activeArticle.author)}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleShare(activeArticle)}
                  className="inline-flex items-center gap-1.5 text-xs text-[#01722C] font-semibold hover:underline cursor-pointer bg-white px-2.5 py-1 rounded-lg border border-[#e2dacb]"
                >
                  {isCopied ? (
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

              {/* Title */}
              <h2 className="font-serif text-xl sm:text-2xl font-black text-gray-900 leading-snug">
                {activeArticle.title}
              </h2>

              {/* Summary Lead */}
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-medium bg-[#f2f8f4] p-3.5 rounded-xl border-l-4 border-[#01722C]">
                {activeArticle.summary}
              </p>

              {/* Key Health Benefits */}
              {activeArticle.keyBenefits && activeArticle.keyBenefits.length > 0 && (
                <div className="p-4 bg-white rounded-xl border border-[#dce8e1] shadow-2xs space-y-2">
                  <h4 className="font-serif font-bold text-xs sm:text-sm text-[#01722C] flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-[#c29336]" />
                    <span>Key Health & Nutritional Takeaways</span>
                  </h4>
                  <ul className="space-y-1.5">
                    {activeArticle.keyBenefits.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-xs text-gray-700"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#01722C] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Main Article Paragraphs */}
              <div className="space-y-3 pt-1 text-xs sm:text-sm text-gray-600 leading-relaxed">
                {activeArticle.content && activeArticle.content.length > 0 ? (
                  activeArticle.content.map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))
                ) : (
                  <p>{activeArticle.summary}</p>
                )}
              </div>

              {/* Nutritional Highlights Grid */}
              {activeArticle.nutritionalHighlights && (
                <div className="pt-2">
                  <h4 className="font-serif font-bold text-xs text-gray-900 mb-2">
                    Verified Nutritional Highlights:
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {activeArticle.nutritionalHighlights.map((stat, i) => (
                      <div
                        key={i}
                        className="bg-[#fbf7ee] p-2.5 rounded-xl border border-[#ede3cf] text-center"
                      >
                        <div className="text-[10px] text-gray-500 font-medium">
                          {stat.label}
                        </div>
                        <div className="font-bold text-xs sm:text-sm text-[#01722C] mt-0.5">
                          {stat.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Farm Nutrition Tip */}
              {activeArticle.healthTip && (
                <div className="p-3.5 bg-[#fef9ee] rounded-xl text-xs text-gray-800 leading-relaxed border border-[#f3e1b7]">
                  💡 <strong>Farm Nutrition Tip:</strong> {activeArticle.healthTip}
                </div>
              )}

              {/* Featured Store Commodity Spotlight */}
              {activeArticle.featuredProduct && (
                <div className="p-4 bg-[#f0f8f3] rounded-2xl border border-[#b8dfc7] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-[#01722C] mb-0.5 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-[#c29336]" />
                      <span>Featured Store Commodity</span>
                    </div>
                    <div className="font-bold text-sm sm:text-base text-gray-900">
                      {activeArticle.featuredProduct.name}
                    </div>
                    <p className="text-xs text-gray-600 mt-0.5">
                      {activeArticle.featuredProduct.benefitHighlight}
                    </p>
                  </div>
                  <Link
                    href={`/products?category=${activeArticle.featuredProduct.categorySlug}`}
                    onClick={() => setActiveArticle(null)}
                    className="inline-flex items-center justify-center gap-1.5 bg-[#01722C] hover:bg-[#0b542c] text-white text-xs font-bold px-4 py-2.5 rounded-full transition-all shrink-0 shadow-2xs"
                  >
                    <span>Shop This Commodity</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              )}

              {/* Tags */}
              {activeArticle.tags && activeArticle.tags.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5 pt-2">
                  <Tag className="w-3.5 h-3.5 text-gray-400" />
                  {activeArticle.tags.map((tag) => (
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
                href={
                  activeArticle.featuredProduct
                    ? `/products?category=${activeArticle.featuredProduct.categorySlug}`
                    : "/products"
                }
                onClick={() => setActiveArticle(null)}
                className="text-xs font-bold text-[#01722C] hover:underline flex items-center gap-1"
              >
                <span>
                  {activeArticle.featuredProduct
                    ? `Shop ${activeArticle.category} (${activeArticle.featuredProduct.name})`
                    : "Shop Related Farm-Fresh Commodities"}
                </span>
                <ArrowRight className="w-3 h-3" />
              </Link>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <Link
                  href="/blog"
                  onClick={() => setActiveArticle(null)}
                  className="w-full sm:w-auto text-center border border-gray-300 hover:border-[#01722C] text-gray-700 hover:text-[#01722C] text-xs font-bold px-4 py-2.5 rounded-full transition-colors"
                >
                  View All {BLOG_POSTS.length} Articles
                </Link>
                <button
                  type="button"
                  onClick={() => setActiveArticle(null)}
                  className="w-full sm:w-auto bg-[#01722C] hover:bg-[#0b542c] text-white text-xs font-bold px-5 py-2.5 rounded-full transition-transform active:scale-95 cursor-pointer shadow-xs"
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
