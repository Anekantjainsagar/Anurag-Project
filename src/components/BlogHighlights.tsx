"use client";

import React from "react";
import Link from "next/link";
import { BLOG_POSTS } from "@/data/mockData";
import { ArrowRight, BookOpen, Clock, Calendar, Sparkles } from "lucide-react";

export default function BlogHighlights() {
  const featuredArticles = BLOG_POSTS.slice(0, 3);

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

          <Link
            href="/blog"
            className="inline-flex items-center gap-2 bg-[#01722C] hover:bg-[#0b542c] text-white text-xs sm:text-sm font-bold px-6 py-2.5 rounded-xl transition-all shadow-xs"
          >
            <span>Read All 12 Articles</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 3 Featured Articles Full Width Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {featuredArticles.map((article) => {
            const authorName =
              typeof article.author === "string"
                ? article.author
                : article.author?.name || "Rajlakshmi Editorial";

            return (
              <article
                key={article.id}
                className="group bg-white rounded-2xl border border-[#e4ebe6] hover:border-[#01722C] hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                <div>
                  {/* Article Thumbnail */}
                  <Link
                    href="/blog"
                    className="block aspect-16/10 overflow-hidden relative bg-[#f2efe8]"
                  >
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
                  </Link>

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

                    <Link href="/blog" className="block">
                      <h3 className="font-serif text-base sm:text-lg font-bold text-gray-900 group-hover:text-[#01722C] transition-colors leading-snug line-clamp-2">
                        {article.title}
                      </h3>
                    </Link>

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
                  <Link
                    href="/blog"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#01722C] group-hover:underline"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
