"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";

const BANNERS = [
  {
    id: "banner-1",
    image: "/images/banners/hero-banner-1.jpg",
    title: "100% Certified Organic & Pure Staples",
    subtitle: "From India's Trusted Organic Farmers • Lab Tested & Export Graded",
    targetCategory: "Pulses",
  },
  {
    id: "banner-2",
    image: "/images/banners/hero-banner-2.jpg",
    title: "A2 Gir Cow Bilona Ghee & Cold-Pressed Spices",
    subtitle: "Traditional Wooden Churned • Zero Adulteration • Pan-India Delivery",
    targetCategory: "Rice & Wheat",
  },
  {
    id: "banner-3",
    image: "/images/banners/hero-banner-3.jpg",
    title: "Unpolished Heritage Millets & Natural Raw Honey",
    subtitle: "Ancient Nutri-Cereals • Pure Forest Blossom • Nutrient Dense",
    targetCategory: "Millets",
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
      <div className="relative w-full aspect-16/9 sm:aspect-21/9 md:aspect-24/9 lg:aspect-28/10 max-h-[560px] overflow-hidden">
        {BANNERS.map((banner, index) => {
          const isActive = index === currentSlide;
          return (
            <div
              key={banner.id}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              <Link href="/products" className="block w-full h-full relative cursor-pointer">
                <img
                  src={banner.image}
                  alt={banner.title}
                  className="w-full h-full object-cover object-center transform transition-transform duration-1200 ease-out hover:scale-101"
                />
              </Link>
            </div>
          );
        })}

        {/* Carousel Navigation Arrows */}
        <button
          onClick={prevSlide}
          aria-label="Previous Slide"
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/85 hover:bg-white text-gray-800 hover:text-[#01722C] flex items-center justify-center shadow-lg transition-all cursor-pointer backdrop-blur-xs"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <button
          onClick={nextSlide}
          aria-label="Next Slide"
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/85 hover:bg-white text-gray-800 hover:text-[#01722C] flex items-center justify-center shadow-lg transition-all cursor-pointer backdrop-blur-xs"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
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
