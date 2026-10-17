"use client";

import React, { useState, useEffect } from "react";
import {
  ArrowRight,
  Leaf,
  Award,
  Sparkles,
  Globe,
  FileSpreadsheet,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import { useCart } from "@/context/CartContext";

const HERO_SLIDES = [
  {
    id: "slide-rice",
    tagline: "NATURAL • NUTRITIOUS • PREMIUM",
    titleLine1: "PURE QUALITY.",
    titleLine2: "PREMIUM TASTE.",
    subtext: "— Royal Himalayan Basmati • Unpolished Pulses • California Dry Fruits —",
    description:
      "Harvested from India's most fertile river valleys. Aged naturally, sorted with precision optics, and delivered fresh to your dining table.",
    bgImage: "/images/categories/rice.jpg",
    showcaseImage: "/images/products/rice-basmati-1.jpg",
    badge: "24-Month Naturally Aged",
    categoryTarget: "Rice",
    label: "Aged Basmati",
  },
  {
    id: "slide-pulses",
    tagline: "100% UNPOLISHED • DESI HARVEST",
    titleLine1: "RICH IN NUTRITION.",
    titleLine2: "HONEST HARVEST.",
    subtext: "— Farm-Direct Toor, Moong, Chana & Urad Lentils —",
    description:
      "Zero artificial leather polish or chemical glazing. Retaining 100% of natural dietary fiber, plant proteins, and authentic earthy taste.",
    bgImage: "/images/categories/pulses.jpg",
    showcaseImage: "/images/products/pulse-toor-1.jpg",
    badge: "100% Chemical & Oil Free",
    categoryTarget: "Pulses",
    label: "Desi Pulses",
  },
  {
    id: "slide-dryfruits",
    tagline: "GLOBAL EXPORT GRADE • ISO 22000",
    titleLine1: "HANDPICKED NUTS.",
    titleLine2: "VEDIC SUPERFOODS.",
    subtext: "— Jumbo California Almonds, Kashmiri Walnuts & A2 Cow Ghee —",
    description:
      "Vacuum nitrogen-flushed packaging ensures peak crunchiness, enzymatic vitality, and authentic farm-fresh aroma in every single pack.",
    bgImage: "/images/categories/dry-fruits.jpg",
    showcaseImage: "/images/products/dryfruit-almond-1.jpg",
    badge: "Triple Sortex Inspected",
    categoryTarget: "Dry Fruits",
    label: "Dry Fruits",
  },
  {
    id: "slide-millets",
    tagline: "CLIMATE RESILIENT • NUTRI-CEREALS",
    titleLine1: "ANCIENT MILLETS.",
    titleLine2: "PURE SPICES.",
    subtext: "— Gluten-Free Supergrains, High-Curcumin Spices & Cold-Pressed Oils —",
    description:
      "Traditional heirloom seeds cultivated by organic farmer collectives. Rich in bioavailable iron, dietary fiber, and natural minerals.",
    bgImage: "/images/categories/millets.jpg",
    showcaseImage: "/images/products/millet-bajra-1.jpg",
    badge: "Certified Nutrient Dense",
    categoryTarget: "Millets",
    label: "Millets & Spices",
  },
];

export default function HeroSection() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const { setIsBulkModalOpen } = useCart();
  const slideCount = HERO_SLIDES.length;

  const nextSlide = () => setActiveSlide((prev) => (prev + 1) % slideCount);
  const prevSlide = () =>
    setActiveSlide((prev) => (prev - 1 + slideCount) % slideCount);

  // Auto slide interval: auto scroll after 3 seconds
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, [isPaused, activeSlide]);

  const slide = HERO_SLIDES[activeSlide];

  return (
    <section
      className="relative overflow-hidden bg-[#faf8f4] border-b border-[#e7e1d4]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background panoramic image layer with subtle cross-fade */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {HERO_SLIDES.map((s, idx) => (
          <div
            key={s.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              activeSlide === idx ? "opacity-15" : "opacity-0"
            }`}
          >
            <img
              src={s.bgImage}
              alt={s.titleLine1}
              className="w-full h-full object-cover object-center scale-105"
            />
          </div>
        ))}
        {/* Soft gradient wash */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#faf8f4] via-[#faf8f4]/90 to-[#faf8f4]/70"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 lg:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Headlines & CTAs */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-5 text-center lg:text-left">
            {/* Tagline */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#054b28]/10 text-[#054b28] text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase">
              <span className="w-2 h-2 rounded-full bg-[#054b28]"></span>
              <span>{slide.tagline}</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-1">
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#073f24] tracking-tight leading-[1.08]">
                {slide.titleLine1}
              </h1>
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#073f24] tracking-tight leading-[1.08]">
                {slide.titleLine2}
              </h1>
            </div>

            {/* Subheading flourish */}
            <div className="flex items-center justify-center lg:justify-start gap-2 text-[#795548] font-serif text-xs sm:text-sm md:text-base font-semibold tracking-wide">
              <span>{slide.subtext}</span>
            </div>

            {/* Description */}
            <p className="text-gray-600 text-xs sm:text-sm md:text-base max-w-xl mx-auto lg:mx-0 leading-relaxed font-sans">
              {slide.description}
            </p>

            {/* 4 Feature Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 pt-1">
              <div className="flex items-center gap-2.5 bg-white p-2.5 rounded-xl border border-[#e5ded0] shadow-2xs">
                <div className="w-8 h-8 rounded-lg bg-[#054b28]/10 flex items-center justify-center text-[#054b28] shrink-0">
                  <Leaf className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="text-[11px] font-bold text-gray-800 leading-tight">
                    Naturally
                  </div>
                  <div className="text-[10px] text-gray-500 leading-tight">
                    Sourced
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 bg-white p-2.5 rounded-xl border border-[#e5ded0] shadow-2xs">
                <div className="w-8 h-8 rounded-lg bg-[#054b28]/10 flex items-center justify-center text-[#054b28] shrink-0">
                  <Award className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="text-[11px] font-bold text-gray-800 leading-tight">
                    Quality
                  </div>
                  <div className="text-[10px] text-gray-500 leading-tight">
                    Assured
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 bg-white p-2.5 rounded-xl border border-[#e5ded0] shadow-2xs">
                <div className="w-8 h-8 rounded-lg bg-[#054b28]/10 flex items-center justify-center text-[#054b28] shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="text-[11px] font-bold text-gray-800 leading-tight">
                    Rich in
                  </div>
                  <div className="text-[10px] text-gray-500 leading-tight">
                    Nutrition
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 bg-white p-2.5 rounded-xl border border-[#e5ded0] shadow-2xs">
                <div className="w-8 h-8 rounded-lg bg-[#054b28]/10 flex items-center justify-center text-[#054b28] shrink-0">
                  <Globe className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="text-[11px] font-bold text-gray-800 leading-tight">
                    Export
                  </div>
                  <div className="text-[10px] text-gray-500 leading-tight">
                    Quality
                  </div>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
              <a
                href="#best-sellers"
                className="inline-flex items-center justify-center gap-2 bg-[#044a27] hover:bg-[#03391e] text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-lg transition-all shadow-sm hover:shadow-md cursor-pointer"
              >
                <span>SHOP PRODUCTS</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={() => setIsBulkModalOpen(true)}
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-[#f6f2e9] text-[#044a27] font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-lg border border-[#044a27] transition-all cursor-pointer shadow-2xs"
              >
                <FileSpreadsheet className="w-4 h-4" />
                <span>BULK / B2B ENQUIRY</span>
              </button>
            </div>
          </div>

          {/* Right Column: Hero Visual Artwork Composition in Clean Formal Frame */}
          <div className="lg:col-span-5 relative flex flex-col items-center">
            <div className="relative w-full max-w-md sm:max-w-lg aspect-4/3 rounded-2xl overflow-hidden shadow-xl border border-[#e0d8ca] bg-white group">
              <img
                key={slide.showcaseImage}
                src={slide.showcaseImage}
                alt={slide.titleLine1}
                className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-104"
              />

              {/* Clean Formal Quality Badge in top corner */}
              <div className="absolute top-3 right-3 bg-[#033b20] text-white px-3 py-1 rounded-md text-[11px] font-semibold tracking-wide border border-white/20 shadow-sm">
                {slide.badge}
              </div>

              {/* Discreet Certification Strip in bottom corner */}
              <div className="absolute bottom-3 left-3 bg-white/95 text-gray-800 px-3 py-1 rounded-md text-[11px] font-semibold border border-gray-200 shadow-sm flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#044a27]" />
                <span>FSSAI & Export Certified</span>
              </div>
            </div>
          </div>
        </div>

        {/* Clean, Formal Bottom Navigation Bar (No tacky floating arrows) */}
        <div className="mt-8 pt-4 border-t border-[#e8dfcf] flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Slide Tab Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
            {HERO_SLIDES.map((s, index) => {
              const isActive = activeSlide === index;
              return (
                <button
                  key={s.id}
                  onClick={() => setActiveSlide(index)}
                  className={`relative overflow-hidden px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? "bg-[#044a27] text-white shadow-xs"
                      : "bg-white/80 text-gray-600 hover:bg-white hover:text-[#044a27] border border-[#e2d8c7]"
                  }`}
                >
                  <span className="opacity-70 mr-1.5 font-mono text-[10px]">
                    0{index + 1}
                  </span>
                  <span>{s.label}</span>
                  {isActive && !isPaused && (
                    <span
                      key={activeSlide}
                      className="absolute bottom-0 left-0 h-0.5 bg-[#facc15] animate-slide-progress"
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Understated formal Prev / Next Controls */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={prevSlide}
              className="px-3 py-1.5 rounded-md bg-white border border-[#dcd2c0] hover:border-[#044a27] hover:text-[#044a27] text-gray-700 text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Prev</span>
            </button>

            <span className="text-xs text-gray-400 font-mono px-1">
              0{activeSlide + 1} / 0{slideCount}
            </span>

            <button
              onClick={nextSlide}
              className="px-3 py-1.5 rounded-md bg-white border border-[#dcd2c0] hover:border-[#044a27] hover:text-[#044a27] text-gray-700 text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer"
              aria-label="Next slide"
            >
              <span>Next</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
