"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";

const BANNERS = [
  {
    id: "banner-1",
    image: "/images/banners/hero-banner-1.jpg",
    badge: "ONAAR • 100% CERTIFIED ORGANIC",
    title: "Pure Nourishment Directly From Nature's Soil",
    subtitle: "Hand-harvested heritage pulses, aromatic whole spices, and unpolished grains for a vibrant life.",
    buttonText: "EXPLORE ORGANIC CATALOGUE",
    targetHref: "/products",
  },
  {
    id: "banner-2",
    image: "/images/banners/hero-banner-2.jpg",
    badge: "ONAAR • FARM TO TABLE EXCELLENCE",
    title: "Golden Harvest Grains & Traditional Essentials",
    subtitle: "Ancient heirloom wheat, stone-ground flours, and wood-pressed staples cultured with purity.",
    buttonText: "DISCOVER WHOLE GRAINS",
    targetHref: "/products?category=Rice%20%26%20Wheat",
  },
  {
    id: "banner-3",
    image: "/images/banners/hero-banner-3.jpg",
    badge: "ONAAR • ANCIENT SUPERFOODS",
    title: "Heritage Millets, Raw Wild Honey & Dry Fruits",
    subtitle: "Nutrient-dense, low-glycemic, non-GMO staples lab-tested for zero pesticide residues.",
    buttonText: "SHOP SUPERFOODS",
    targetHref: "/products?category=Millets",
  },
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % BANNERS.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + BANNERS.length) % BANNERS.length);
  };

  // Auto-scroll every 3.5 seconds
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextSlide, 3500);
    return () => clearInterval(interval);
  }, [isPaused, currentSlide]);

  return (
    <section
      className="relative w-full overflow-hidden bg-[#faf8f4]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Full-Bleed Edge-to-Edge Slider Container */}
      <div className="relative w-full aspect-16/10 sm:aspect-21/9 md:aspect-24/9 lg:aspect-28/10 min-h-[360px] sm:min-h-[460px] max-h-[560px] overflow-hidden">
        {BANNERS.map((banner, index) => {
          const isActive = index === currentSlide;
          return (
            <div
              key={banner.id}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              {/* Background Image */}
              <img
                src={banner.image}
                alt={banner.title}
                className="w-full h-full object-cover object-center transform transition-transform duration-1200 ease-out scale-100"
              />

              {/* Gradient Scrim for maximum legibility */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/30 sm:to-transparent" />

              {/* Content Overlay */}
              <div className="absolute inset-0 z-10 flex items-center px-10 sm:px-16 md:px-20">
                <div className="max-w-2xl text-white space-y-2.5 sm:space-y-4">
                  <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-[#88e8b2] text-[9.5px] sm:text-xs font-bold uppercase tracking-wider border border-white/20">
                    <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#58cf8b]" />
                    <span>{banner.badge}</span>
                  </div>

                  <h1 className="font-serif text-xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight drop-shadow-sm">
                    {banner.title}
                  </h1>

                  <p className="text-xs sm:text-sm md:text-base text-gray-200 line-clamp-2 sm:line-clamp-none max-w-xl leading-relaxed">
                    {banner.subtitle}
                  </p>

                  <div className="pt-1 sm:pt-2">
                    <Link
                      href={banner.targetHref}
                      className="inline-flex items-center gap-2 bg-[#01722C] hover:bg-[#0b542c] active:scale-95 text-white text-xs sm:text-sm font-bold uppercase tracking-wider px-4 sm:px-6 py-2.5 sm:py-3.5 rounded-xl shadow-lg transition-all"
                    >
                      <span>{banner.buttonText}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Carousel Navigation Arrows */}
        <button
          onClick={prevSlide}
          aria-label="Previous Slide"
          className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-white/85 hover:bg-white text-gray-800 hover:text-[#01722C] flex items-center justify-center shadow-lg transition-all cursor-pointer backdrop-blur-xs"
        >
          <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
        </button>

        <button
          onClick={nextSlide}
          aria-label="Next Slide"
          className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-white/85 hover:bg-white text-gray-800 hover:text-[#01722C] flex items-center justify-center shadow-lg transition-all cursor-pointer backdrop-blur-xs"
        >
          <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
        </button>

        {/* Carousel Indicators */}
        <div className="absolute bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
          {BANNERS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              aria-label={`Jump to slide ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                i === currentSlide ? "w-8 bg-[#01722C]" : "w-2 bg-white/70 hover:bg-white"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Full Width Quick Trust Ribbon Beneath Hero */}
      <div className="w-full bg-[#01722C] text-white py-3 px-4 sm:px-8 lg:px-12 xl:px-16 shadow-xs font-sans">
        <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 text-center text-xs sm:text-sm font-semibold">
          <div className="flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#7de0a8] shrink-0" />
            <span>100% Certified Organic</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-[#7de0a8] shrink-0" />
            <span>Unpolished & Chemical Free</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#7de0a8] shrink-0" />
            <span>Lab Tested Every Batch</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-[#7de0a8] shrink-0" />
            <span>PAN India & Global Export</span>
          </div>
        </div>
      </div>
    </section>
  );
}
