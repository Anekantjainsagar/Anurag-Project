"use client";

import React from "react";
import { ArrowRight } from "lucide-react";

export default function PromoBanners() {
  return (
    <section className="py-4 sm:py-6 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {/* Left Banner: Premium Rice Collection */}
          <div className="relative overflow-hidden rounded-2xl border border-[#decbb0] shadow-2xs bg-[#dfd0bd] flex flex-col justify-between group min-h-[190px] sm:min-h-[220px]">
            {/* Background high-res image covering right half */}
            <div className="absolute right-0 top-0 bottom-0 w-3/5 sm:w-1/2 pointer-events-none overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=1000&q=80"
                alt="Premium Rice Collection"
                className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#dfd0bd] via-[#dfd0bd]/85 to-transparent"></div>
            </div>

            {/* Content on left */}
            <div className="relative z-10 p-5 sm:p-6 md:p-7 max-w-xs sm:max-w-sm space-y-2 sm:space-y-3">
              <h3 className="font-serif text-lg sm:text-xl md:text-2xl font-bold text-[#1f2937] tracking-tight">
                Premium Rice Collection
              </h3>

              <p className="text-xs sm:text-sm text-gray-700 font-medium">
                From farm-fresh fields to your table
              </p>

              <div className="text-[10px] sm:text-[11px] text-gray-600 font-semibold tracking-wide">
                Basmati | Sella | Non-Basmati | Specialty Rice
              </div>

              <div className="pt-1 sm:pt-2">
                <a
                  href="#best-sellers"
                  className="inline-flex items-center gap-1.5 sm:gap-2 bg-[#044a27] hover:bg-[#03391e] text-white text-[10.5px] sm:text-xs font-bold uppercase tracking-wider px-4 sm:px-5 py-2 sm:py-2.5 rounded-full transition-all shadow-xs"
                >
                  <span>EXPLORE RICE</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Banner: Pulses & Dry Fruits */}
          <div className="relative overflow-hidden rounded-2xl border border-[#d2b8a7] shadow-2xs bg-[#c9b19e] flex flex-col justify-between group min-h-[190px] sm:min-h-[220px]">
            {/* Background high-res image covering right half */}
            <div className="absolute right-0 top-0 bottom-0 w-3/5 sm:w-1/2 pointer-events-none overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1514733670139-4d87a1941d55?auto=format&fit=crop&w=1000&q=80"
                alt="Pulses and Dry Fruits"
                className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#c9b19e] via-[#c9b19e]/85 to-transparent"></div>
            </div>

            {/* Content on left */}
            <div className="relative z-10 p-5 sm:p-6 md:p-7 max-w-xs sm:max-w-sm space-y-2 sm:space-y-3">
              <h3 className="font-serif text-lg sm:text-xl md:text-2xl font-bold text-white tracking-tight drop-shadow-2xs">
                Pulses & Dry Fruits
              </h3>

              <p className="text-xs sm:text-sm text-gray-100 font-medium">
                Nutritious. Natural. Premium.
              </p>

              <div className="text-[10px] sm:text-[11px] text-gray-200 font-semibold tracking-wide">
                Pulses | Dry Fruits | Millets | Seeds
              </div>

              <div className="pt-1 sm:pt-2">
                <a
                  href="#best-sellers"
                  className="inline-flex items-center gap-1.5 sm:gap-2 bg-[#044a27] hover:bg-[#03391e] text-white text-[10.5px] sm:text-xs font-bold uppercase tracking-wider px-4 sm:px-5 py-2 sm:py-2.5 rounded-full transition-all shadow-xs"
                >
                  <span>EXPLORE COLLECTION</span>
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
