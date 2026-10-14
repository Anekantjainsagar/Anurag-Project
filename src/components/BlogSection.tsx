"use client";

import React, { useState } from "react";
import { BLOG_POSTS } from "@/data/mockData";
import { BlogPost } from "@/types";
import { ArrowRight, Calendar, Clock, X } from "lucide-react";

export default function BlogSection() {
  const [activeBlog, setActiveBlog] = useState<BlogPost | null>(null);

  return (
    <section id="blogs" className="py-8 sm:py-12 bg-white border-t border-[#f0eee6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              From Our Blog
            </h2>
            <p className="text-gray-500 text-xs sm:text-sm mt-0.5 sm:mt-1">
              Helpful tips, recipes and insights about rice, pulses and dry fruits
            </p>
          </div>

          <a
            href="#blogs"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#044a27] bg-[#f2f8f4] hover:bg-[#044a27] hover:text-white px-3.5 py-1.5 sm:py-2 rounded-full border border-[#cde1d6] transition-all self-start sm:self-auto"
          >
            <span>View All Blogs</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* 4 Blog Cards: 1 col on mobile, 2 on tablet, 4 on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.id}
              onClick={() => setActiveBlog(post)}
              className="group cursor-pointer bg-white border border-[#e4ebe6] rounded-2xl overflow-hidden shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
            >
              {/* Blog Image */}
              <div className="relative aspect-16/10 overflow-hidden bg-gray-100">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Blog Details */}
              <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between space-y-2">
                <h3 className="font-bold text-xs sm:text-sm text-gray-900 group-hover:text-[#044a27] transition-colors leading-snug line-clamp-2">
                  {post.title}
                </h3>

                <div className="flex items-center justify-between text-[10.5px] sm:text-[11px] text-gray-400 pt-1.5 border-t border-gray-100">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-gray-400" />
                    <span>{post.date}</span>
                  </div>
                  <span className="text-[#044a27] font-semibold group-hover:underline">
                    Read More →
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Blog Detail Modal */}
      {activeBlog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-2xs animate-fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-gray-100">
            <div className="relative aspect-16/9">
              <img
                src={activeBlog.image}
                alt={activeBlog.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setActiveBlog(null)}
                className="absolute top-3 right-3 bg-black/60 hover:bg-black text-white p-1.5 rounded-full transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 sm:p-6 space-y-3">
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {activeBlog.date}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {activeBlog.readTime}
                </span>
              </div>

              <h2 className="font-serif text-lg sm:text-xl font-bold text-gray-900">
                {activeBlog.title}
              </h2>

              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                {activeBlog.summary}
              </p>

              <div className="p-3 bg-[#f6f9f7] rounded-xl text-xs text-gray-700 leading-relaxed border border-[#dce8e1]">
                💡 <strong>Purity Tip:</strong> When sourcing whole grains and
                pulses, choose unpolished varieties that preserve natural fiber,
                iron, and phytonutrients for maximum vitality.
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setActiveBlog(null)}
                  className="bg-[#044a27] text-white text-xs font-semibold px-4 py-2 rounded-full cursor-pointer"
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
