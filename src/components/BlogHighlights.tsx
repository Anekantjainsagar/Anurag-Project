"use client";

import React from "react";
import Link from "next/link";
import { BLOG_POSTS } from "@/data/mockData";
import { ArrowRight, BookOpen, Clock, Calendar, Sparkles } from "lucide-react";

export default function BlogHighlights() {
  // Select 3 featured health articles for home page preview
  const featuredArticles = BLOG_POSTS.slice(0, 3);

  return (
    <section className="py-12 sm:py-16 bg-[#faf9f5] border-t border-[#f0eee6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 sm:mb-10 text-center sm:text-left">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#054b28]/10 text-[#054b28] text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-1.5">
              <Sparkles className="w-3 h-3 text-[#054b28]" />
              <span>Ancient Science & Nutritional Research</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              From Our Health Journal
            </h2>
            <p className="text-gray-500 text-xs sm:text-sm mt-0.5">
              Evidence-based insights into unpolished grains, raw honey, and gut health
            </p>
          </div>

          <Link
            href="/blog"
            className="inline-flex items-center gap-2 bg-[#044a27] hover:bg-[#03391e] text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all shadow-xs"
          >
            <span>Read All 12 Articles</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 3 Featured Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredArticles.map((article) => {
            const authorName =
              typeof article.author === "string"
                ? article.author
                : article.author?.name || "Pure Food Editorial";

            return (
              <article
                key={article.id}
                className="group bg-white rounded-2xl border border-[#e8e4db] hover:border-[#b8cbbd] hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
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
                      <span className="absolute top-3 left-3 bg-[#044a27]/90 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                        {article.category}
                      </span>
                    )}
                  </Link>

                  {/* Body */}
                  <div className="p-5 space-y-2.5">
                    <div className="flex items-center gap-3 text-[11px] text-gray-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-gray-400" />
                        {article.date}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-gray-400" />
                        {article.readTime}
                      </span>
                    </div>

                    <Link href="/blog" className="block">
                      <h3 className="font-serif text-base font-bold text-gray-900 group-hover:text-[#044a27] transition-colors leading-snug line-clamp-2">
                        {article.title}
                      </h3>
                    </Link>

                    <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">
                      {article.summary}
                    </p>
                  </div>
                </div>

                {/* Footer Link */}
                <div className="p-5 pt-0 border-t border-gray-50 flex items-center justify-between mt-2">
                  <span className="text-[11px] font-semibold text-gray-500">
                    By {authorName}
                  </span>
                  <Link
                    href="/blog"
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#044a27] group-hover:underline"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
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
