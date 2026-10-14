"use client";

import React, { useState } from "react";
import {
  ArrowRight,
  Leaf,
  Award,
  Sparkles,
  Globe,
  FileSpreadsheet,
} from "lucide-react";
import { useCart } from "@/context/CartContext";

const HERO_SLIDES = [
  {
    tagline: "NATURAL • NUTRITIOUS • PREMIUM",
    titleLine1: "PURE QUALITY.",
    titleLine2: "PREMIUM TASTE.",
    subtext: "— Premium Rice • Pulses • Dry Fruits —",
    description:
      "Handpicked from India's finest fertile plains. Grown with traditional care, packed with state-of-the-art hygiene, and delivered fresh to your dining table.",
  },
  {
    tagline: "100% FARM SOURCED • UNADULTERATED",
    titleLine1: "FROM SOIL.",
    titleLine2: "TO YOUR SPOON.",
    subtext: "— Farm Fresh • Direct Trade • Zero Chemicals —",
    description:
      "Partnered with over 5,000 certified organic farmers across Punjab, Madhya Pradesh, and Gujarat for unmatched purity and taste.",
  },
  {
    tagline: "GLOBAL STANDARDS • EXPORT GRADE",
    titleLine1: "TRUSTED GLOBALLY.",
    titleLine2: "CHERISHED LOCALLY.",
    subtext: "— Certified ISO 22000 • FSSAI Grade A —",
    description:
      "Serving high-end culinary kitchens, overseas distributors, and discerning households with uncompromised quality assurance.",
  },
];

export default function HeroSection() {
  const [activeSlide, setActiveSlide] = useState(0);
  const { setIsBulkModalOpen } = useCart();

  const slide = HERO_SLIDES[activeSlide];

  return (
    <section className="relative overflow-hidden bg-[#fbf8f2] border-b border-[#e9e3d5]">
      {/* Background panoramic image layer */}
      <div className="absolute inset-0 z-0 opacity-20 sm:opacity-25 lg:opacity-30 pointer-events-none mix-blend-multiply">
        <img
          src="/images/hero-bg.jpg"
          alt="Agricultural background"
          className="w-full h-full object-cover object-center"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-8 items-center">
          {/* Left Column: Headlines & CTAs */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-5 text-center lg:text-left">
            {/* Tagline */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#054b28]/10 text-[#054b28] text-[10px] sm:text-xs font-bold tracking-[0.18em] uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#054b28] animate-pulse"></span>
              {slide.tagline}
            </div>

            {/* Main Headline */}
            <div className="space-y-0.5 sm:space-y-1">
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#073f24] tracking-tight leading-[1.08]">
                {slide.titleLine1}
              </h1>
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#073f24] tracking-tight leading-[1.08]">
                {slide.titleLine2}
              </h1>
            </div>

            {/* Subheading with flourishes */}
            <div className="flex items-center justify-center lg:justify-start gap-2 text-[#795548] font-serif text-sm sm:text-base md:text-lg font-medium tracking-wide">
              <span>{slide.subtext}</span>
            </div>

            {/* Description */}
            <p className="text-gray-600 text-xs sm:text-sm md:text-base max-w-xl mx-auto lg:mx-0 leading-relaxed font-sans">
              {slide.description}
            </p>

            {/* 4 Feature Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 pt-1">
              <div className="flex items-center gap-2 bg-white/90 backdrop-blur-xs p-2 sm:p-2.5 rounded-xl border border-[#e5ded0] shadow-2xs">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#054b28]/10 flex items-center justify-center text-[#054b28] shrink-0">
                  <Leaf className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <div className="text-left">
                  <div className="text-[10px] sm:text-[11px] font-bold text-gray-800 leading-tight">
                    Naturally
                  </div>
                  <div className="text-[9px] sm:text-[10px] text-gray-500 leading-tight">
                    Sourced
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-white/90 backdrop-blur-xs p-2 sm:p-2.5 rounded-xl border border-[#e5ded0] shadow-2xs">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#054b28]/10 flex items-center justify-center text-[#054b28] shrink-0">
                  <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <div className="text-left">
                  <div className="text-[10px] sm:text-[11px] font-bold text-gray-800 leading-tight">
                    Quality
                  </div>
                  <div className="text-[9px] sm:text-[10px] text-gray-500 leading-tight">
                    Assured
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-white/90 backdrop-blur-xs p-2 sm:p-2.5 rounded-xl border border-[#e5ded0] shadow-2xs">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#054b28]/10 flex items-center justify-center text-[#054b28] shrink-0">
                  <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <div className="text-left">
                  <div className="text-[10px] sm:text-[11px] font-bold text-gray-800 leading-tight">
                    Rich in
                  </div>
                  <div className="text-[9px] sm:text-[10px] text-gray-500 leading-tight">
                    Nutrition
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-white/90 backdrop-blur-xs p-2 sm:p-2.5 rounded-xl border border-[#e5ded0] shadow-2xs">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#054b28]/10 flex items-center justify-center text-[#054b28] shrink-0">
                  <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <div className="text-left">
                  <div className="text-[10px] sm:text-[11px] font-bold text-gray-800 leading-tight">
                    Export
                  </div>
                  <div className="text-[9px] sm:text-[10px] text-gray-500 leading-tight">
                    Quality
                  </div>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-2.5 sm:gap-3.5 pt-2">
              <a
                href="#best-sellers"
                className="inline-flex items-center justify-center gap-2 bg-[#044a27] hover:bg-[#03391e] text-white font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-full transition-all shadow-sm hover:shadow-md"
              >
                <span>SHOP PRODUCTS</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={() => setIsBulkModalOpen(true)}
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-[#f2ede4] text-[#044a27] font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-full border-2 border-[#044a27] transition-all shadow-2xs cursor-pointer"
              >
                <FileSpreadsheet className="w-4 h-4" />
                <span>BULK / B2B ENQUIRY</span>
              </button>
            </div>
          </div>

          {/* Right Column: Hero Visual Artwork Composition */}
          <div className="lg:col-span-5 relative flex justify-center mt-2 lg:mt-0">
            <div className="relative w-full max-w-md sm:max-w-lg rounded-2xl overflow-hidden shadow-xl border-2 sm:border-4 border-white/90 bg-white group">
              <img
                src="/images/hero-food.jpg"
                alt="Finest grains, pulses and dry fruits collection"
                className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
              />

              {/* Floating Quality Seal */}
              <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 bg-[#033b20]/90 backdrop-blur-md text-white px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-[10px] sm:text-[11px] font-semibold border border-white/20 shadow-md flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#facc15]"></span>
                <span>100% Pure & Lab Tested</span>
              </div>

              {/* Bottom gradient accent */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3 sm:p-4 text-white">
                <div className="text-[11px] sm:text-xs font-semibold tracking-wide flex items-center justify-between">
                  <span>Farm-Fresh Harvest 2026</span>
                  <span className="text-[#facc15] font-bold">Grade-A Quality</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Dots */}
        <div className="flex items-center justify-center gap-2 mt-6 sm:mt-8">
          {HERO_SLIDES.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                activeSlide === index
                  ? "w-7 bg-[#044a27]"
                  : "w-2 bg-[#044a27]/30 hover:bg-[#044a27]/60"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
