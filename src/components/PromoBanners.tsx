"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function PromoBanners() {
  return (
    <section className="py-8 sm:py-12 bg-white w-full font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Left Banner: Premium Rice Collection */}
          <div className="relative overflow-hidden rounded-3xl border border-[#e3dcd1] shadow-xs bg-[#f4eee4] flex flex-col justify-between group min-h-[220px] sm:min-h-[260px]">
            <div className="absolute right-0 top-0 bottom-0 w-3/5 sm:w-1/2 pointer-events-none overflow-hidden">
              <img
                src="/images/categories/rice.jpg"
                alt="Premium Rice Collection"
                className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#f4eee4] via-[#f4eee4]/85 to-transparent"></div>
            </div>

            <div className="relative z-10 p-5 sm:p-8 max-w-[80%] sm:max-w-sm space-y-2.5 sm:space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#01722C]/10 text-[#01722C] text-[10.5px] font-bold uppercase tracking-wider">
                <Sparkles className="w-3 h-3 text-[#01722C]" />
                <span>Estate Reserve</span>
              </div>

              <h3 className="font-serif text-lg sm:text-2xl lg:text-3xl font-black text-[#1a2e22] tracking-tight leading-snug">
                Royal Aged Basmati & Heritage Grains
              </h3>

              <p className="text-xs sm:text-sm text-gray-700 font-medium leading-relaxed">
                2-Year Aged Himalayan Basmati, Khapli Ancient Wheat & Gobindobhog Scented Rice.
              </p>

              <div className="pt-1.5 sm:pt-2">
                <Link
                  href="/products?category=Rice%20%26%20Wheat"
                  className="inline-flex items-center gap-2 bg-[#01722C] hover:bg-[#0b542c] text-white text-xs font-bold uppercase tracking-wider px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl transition-all shadow-xs"
                >
                  <span>Explore Rice & Wheat (24)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Right Banner: Pulses & Superfoods */}
          <div className="relative overflow-hidden rounded-3xl border border-[#dcd8cb] shadow-xs bg-[#ebe6d8] flex flex-col justify-between group min-h-[220px] sm:min-h-[260px]">
            <div className="absolute right-0 top-0 bottom-0 w-3/5 sm:w-1/2 pointer-events-none overflow-hidden">
              <img
                src="/images/categories/pulses.jpg"
                alt="Pulses and Superfoods"
                className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#ebe6d8] via-[#ebe6d8]/85 to-transparent"></div>
            </div>

            <div className="relative z-10 p-5 sm:p-8 max-w-[80%] sm:max-w-sm space-y-2.5 sm:space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#01722C]/10 text-[#01722C] text-[10.5px] font-bold uppercase tracking-wider">
                <Sparkles className="w-3 h-3 text-[#01722C]" />
                <span>100% Unpolished</span>
              </div>

              <h3 className="font-serif text-lg sm:text-2xl lg:text-3xl font-black text-[#1a2e22] tracking-tight leading-snug">
                Desi Pulses & Ayurvedic Superfoods
              </h3>

              <p className="text-xs sm:text-sm text-gray-700 font-medium leading-relaxed">
                Desi Dals, Kashmiri Walnuts, Mamra Almonds & Forest Blossom Raw Honey.
              </p>

              <div className="pt-1.5 sm:pt-2">
                <Link
                  href="/products?category=Pulses"
                  className="inline-flex items-center gap-2 bg-[#01722C] hover:bg-[#0b542c] text-white text-xs font-bold uppercase tracking-wider px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl transition-all shadow-xs"
                >
                  <span>Explore Pulses (24)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
