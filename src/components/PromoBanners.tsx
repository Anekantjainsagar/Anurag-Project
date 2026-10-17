"use client";

import React from "react";
import { ArrowRight } from "lucide-react";

export default function PromoBanners() {
  return (
    <section className="py-6 sm:py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {/* Left Banner: Premium Rice Collection */}
          <div className="relative overflow-hidden rounded-2xl border border-[#e3dcd1] shadow-xs bg-[#f4eee4] flex flex-col justify-between group min-h-[200px] sm:min-h-[220px]">
            {/* Background high-res local image covering right half */}
            <div className="absolute right-0 top-0 bottom-0 w-3/5 sm:w-1/2 pointer-events-none overflow-hidden">
              <img
                src="/images/categories/rice.jpg"
                alt="Premium Rice Collection"
                className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#f4eee4] via-[#f4eee4]/80 to-transparent"></div>
            </div>

            {/* Content on left */}
            <div className="relative z-10 p-5 sm:p-6 md:p-7 max-w-xs sm:max-w-sm space-y-2 sm:space-y-3">
              <div className="text-[10px] sm:text-[11px] font-bold text-[#054b28] uppercase tracking-wider">
                Estate Reserve
              </div>

              <h3 className="font-serif text-lg sm:text-xl md:text-2xl font-bold text-[#1a2e22] tracking-tight">
                Premium Rice Collection
              </h3>

              <p className="text-xs sm:text-sm text-gray-700 font-medium">
                Aged Himalayan Basmati, Sella & Scented Heritage Rice
              </p>

              <div className="pt-1 sm:pt-2">
                <a
                  href="#best-sellers"
                  className="inline-flex items-center gap-2 bg-[#044a27] hover:bg-[#03391e] text-white text-[11px] sm:text-xs font-bold uppercase tracking-wider px-4 sm:px-5 py-2.5 rounded-lg transition-all shadow-xs"
                >
                  <span>Explore Rice</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Banner: Pulses & Dry Fruits */}
          <div className="relative overflow-hidden rounded-2xl border border-[#dcd8cb] shadow-xs bg-[#ebe6d8] flex flex-col justify-between group min-h-[200px] sm:min-h-[220px]">
            {/* Background high-res local image covering right half */}
            <div className="absolute right-0 top-0 bottom-0 w-3/5 sm:w-1/2 pointer-events-none overflow-hidden">
              <img
                src="/images/categories/pulses.jpg"
                alt="Pulses and Superfoods"
                className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#ebe6d8] via-[#ebe6d8]/80 to-transparent"></div>
            </div>

            {/* Content on left */}
            <div className="relative z-10 p-5 sm:p-6 md:p-7 max-w-xs sm:max-w-sm space-y-2 sm:space-y-3">
              <div className="text-[10px] sm:text-[11px] font-bold text-[#054b28] uppercase tracking-wider">
                Unpolished & Natural
              </div>

              <h3 className="font-serif text-lg sm:text-xl md:text-2xl font-bold text-[#1a2e22] tracking-tight">
                Pulses & Superfoods
              </h3>

              <p className="text-xs sm:text-sm text-gray-700 font-medium">
                Desi Dals, Jumbo California Almonds & Millets
              </p>

              <div className="pt-1 sm:pt-2">
                <a
                  href="#best-sellers"
                  className="inline-flex items-center gap-2 bg-[#044a27] hover:bg-[#03391e] text-white text-[11px] sm:text-xs font-bold uppercase tracking-wider px-4 sm:px-5 py-2.5 rounded-lg transition-all shadow-xs"
                >
                  <span>Explore Collection</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
