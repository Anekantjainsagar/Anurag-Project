"use client";

import React from "react";
import BlogSection from "@/components/BlogSection";
import { BookOpen, Sparkles, HeartPulse, ShieldCheck } from "lucide-react";

export default function BlogPage() {
  return (
    <div className="w-full flex flex-col bg-white text-gray-900 font-sans">
      {/* Blog Header Banner */}
      <section className="w-full bg-[#014d1e] text-white py-12 sm:py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#7de0a8] text-xs font-semibold backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#58cf8b]" />
            <span>Ancient Ayurvedic Science & Modern Nutrition</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            The Holistic Health Journal
          </h1>
          <p className="text-sm sm:text-base text-[#c3decb] max-w-2xl mx-auto leading-relaxed">
            Explore in-depth scientific guides across all 8 product categories: pulses, millets, ancient grains, forest honey, organic spices, and natural wellness foods.
          </p>

          <div className="flex items-center justify-center gap-2 flex-wrap pt-2 text-xs text-white/80">
            <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full">
              <HeartPulse className="w-3.5 h-3.5 text-[#58cf8b]" />
              Gut Microbiome
            </span>
            <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full">
              <ShieldCheck className="w-3.5 h-3.5 text-[#58cf8b]" />
              Zero Chemical Polish
            </span>
            <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full">
              <BookOpen className="w-3.5 h-3.5 text-[#58cf8b]" />
              24 Research Articles (8 Categories)
            </span>
          </div>
        </div>
      </section>

      {/* Full Blog Component with Search, Filtering, Carousels & Modal Reader */}
      <main className="flex-1 w-full">
        <BlogSection />
      </main>
    </div>
  );
}
