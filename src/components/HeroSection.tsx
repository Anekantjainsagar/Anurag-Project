"use client";

import React, { useState, useEffect, useRef } from "react";
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
    tagline: "NATURAL • NUTRITIOUS • PREMIUM",
    titleLine1: "PURE QUALITY.",
    titleLine2: "PREMIUM TASTE.",
    subtext: "— Royal Himalayan Basmati • Unpolished Pulses • California Dry Fruits —",
    description:
      "Harvested from India's most fertile river valleys. Aged naturally, sorted with precision optics, and delivered fresh to your dining table.",
    bgImage:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1920&q=80",
    showcaseImage:
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=1000&q=80",
    badge: "24-Month Naturally Aged",
    categoryTarget: "Rice",
  },
  {
    tagline: "100% UNPOLISHED • DESI HARVEST",
    titleLine1: "RICH IN NUTRITION.",
    titleLine2: "HONEST FOOD.",
    subtext: "— Farm-Direct Toor, Moong, Chana & Urad Dals —",
    description:
      "Zero artificial leather polish or chemical glazing. Retaining 100% of natural dietary fiber, plant proteins, and authentic earthy taste.",
    bgImage:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1920&q=80",
    showcaseImage:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1000&q=80",
    badge: "100% Chemical & Oil Free",
    categoryTarget: "Pulses",
  },
  {
    tagline: "GLOBAL EXPORT GRADE • ISO 22000",
    titleLine1: "HANDPICKED NUTS.",
    titleLine2: "VEDIC SUPERFOODS.",
    subtext: "— Jumbo California Almonds, Kashmiri Walnuts & A2 Cow Ghee —",
    description:
      "Vacuum nitrogen-flushed packaging ensures peak crunchiness, enzymatic vitality, and authentic farm-fresh aroma in every single pack.",
    bgImage:
      "https://images.unsplash.com/photo-1508061257970-57e3467f7ef7?auto=format&fit=crop&w=1920&q=80",
    showcaseImage:
      "https://images.unsplash.com/photo-1508061257970-57e3467f7ef7?auto=format&fit=crop&w=1000&q=80",
    badge: "Triple Sortex Inspected",
    categoryTarget: "Dry Fruits",
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

  // Auto slide interval
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextSlide, 5500);
    return () => clearInterval(interval);
  }, [isPaused, activeSlide]);

  const slide = HERO_SLIDES[activeSlide];

  return (
    <section
      className="relative overflow-hidden bg-[#faf7f0] border-b border-[#e9e3d5]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background panoramic image layer with subtle cross-fade */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {HERO_SLIDES.map((s, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              activeSlide === idx ? "opacity-20" : "opacity-0"
            }`}
          >
            <img
              src={s.bgImage}
              alt={s.titleLine1}
              className="w-full h-full object-cover object-center scale-105 transform transition-transform duration-7000 ease-out"
            />
          </div>
        ))}
        {/* Soft gradient wash */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#faf7f0] via-[#faf7f0]/85 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Headlines & CTAs */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-5 text-center lg:text-left animate-fade-in key={activeSlide}">
            {/* Tagline */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#054b28]/10 text-[#054b28] text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#054b28] animate-ping"></span>
              <span>{slide.tagline}</span>
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

            {/* Subheading flourish */}
            <div className="flex items-center justify-center lg:justify-start gap-2 text-[#795548] font-serif text-xs sm:text-sm md:text-base font-semibold tracking-wide">
              <span>{slide.subtext}</span>
            </div>

            {/* Description */}
            <p className="text-gray-600 text-xs sm:text-sm md:text-base max-w-xl mx-auto lg:mx-0 leading-relaxed font-sans">
              {slide.description}
            </p>

            {/* 4 Feature Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5 pt-1">
              <div className="flex items-center gap-2 bg-white/95 backdrop-blur-xs p-2 sm:p-2.5 rounded-xl border border-[#e5ded0] shadow-2xs hover:border-[#054b28] transition-colors">
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

              <div className="flex items-center gap-2 bg-white/95 backdrop-blur-xs p-2 sm:p-2.5 rounded-xl border border-[#e5ded0] shadow-2xs hover:border-[#054b28] transition-colors">
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

              <div className="flex items-center gap-2 bg-white/95 backdrop-blur-xs p-2 sm:p-2.5 rounded-xl border border-[#e5ded0] shadow-2xs hover:border-[#054b28] transition-colors">
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

              <div className="flex items-center gap-2 bg-white/95 backdrop-blur-xs p-2 sm:p-2.5 rounded-xl border border-[#e5ded0] shadow-2xs hover:border-[#054b28] transition-colors">
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
                className="inline-flex items-center justify-center gap-2 bg-[#044a27] hover:bg-[#03391e] text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-full transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
              >
                <span>SHOP PRODUCTS</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={() => setIsBulkModalOpen(true)}
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-[#f2ede4] text-[#044a27] font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-full border-2 border-[#044a27] transition-all hover:-translate-y-0.5 shadow-2xs cursor-pointer"
              >
                <FileSpreadsheet className="w-4 h-4" />
                <span>BULK / B2B ENQUIRY</span>
              </button>
            </div>
          </div>

          {/* Right Column: Hero Visual Artwork Composition in Carousel Frame */}
          <div className="lg:col-span-5 relative flex justify-center mt-4 lg:mt-0">
            <div className="relative w-full max-w-md sm:max-w-lg aspect-4/3 rounded-3xl overflow-hidden shadow-2xl border-4 border-white/95 bg-white group">
              <img
                key={slide.showcaseImage}
                src={slide.showcaseImage}
                alt={slide.titleLine1}
                className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105 animate-fade-in"
              />

              {/* Floating Quality Seal */}
              <div className="absolute top-3 right-3 bg-[#033b20]/95 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-[10px] sm:text-[11px] font-semibold border border-white/20 shadow-md flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#facc15] animate-pulse"></span>
                <span>{slide.badge}</span>
              </div>

              {/* Floating Certificate Pill */}
              <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md text-gray-800 px-3 py-1.5 rounded-full text-[10.5px] font-bold border border-gray-200 shadow-md flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#044a27]" />
                <span>FSSAI & Export Certified</span>
              </div>

              {/* Slide Nav Chevrons over image */}
              <button
                onClick={prevSlide}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-[#044a27] text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-[#044a27] text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Next slide"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Indicator Bars & Counter */}
        <div className="flex items-center justify-between mt-8 pt-4 border-t border-[#e8dfcf]">
          <div className="text-xs font-serif font-bold text-gray-500">
            <span className="text-[#044a27] text-sm">0{activeSlide + 1}</span> / 0{slideCount}
          </div>

          <div className="flex items-center gap-2">
            {HERO_SLIDES.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveSlide(index)}
                className={`h-2 rounded-full transition-all duration-400 cursor-pointer ${
                  activeSlide === index
                    ? "w-8 bg-[#044a27]"
                    : "w-2.5 bg-[#044a27]/30 hover:bg-[#044a27]/60"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <div className="text-[11px] text-gray-500 font-medium hidden sm:block">
            Auto-advancing • Pure agricultural bounty
          </div>
        </div>
      </div>
    </section>
  );
}
