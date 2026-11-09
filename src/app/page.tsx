"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import HeroSection from "@/components/HeroSection";
import ValueTrustStrip from "@/components/ValueTrustStrip";
import CategorySection from "@/components/CategorySection";
import BestSellersSection from "@/components/BestSellersSection";
import SeasonalHarvestSpotlight from "@/components/SeasonalHarvestSpotlight";
import PromoBanners from "@/components/PromoBanners";
import StatsSection from "@/components/StatsSection";
import FarmToTableProcess from "@/components/FarmToTableProcess";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import BlogHighlights from "@/components/BlogHighlights";
import FarmClubNewsletter from "@/components/FarmClubNewsletter";
import TrustBadges from "@/components/TrustBadges";
import { CATEGORIES } from "@/data/mockData";

function HomeContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");

  const [selectedCategory, setSelectedCategory] = useState<string>(() => {
    if (categoryParam) {
      const match = CATEGORIES.find(
        (c) =>
          c.name.toLowerCase() === categoryParam.toLowerCase() ||
          c.slug.toLowerCase() === categoryParam.toLowerCase()
      );
      if (match) return match.name;
    }
    return CATEGORIES[0]?.name || "Pulses";
  });

  useEffect(() => {
    if (categoryParam) {
      const match = CATEGORIES.find(
        (c) =>
          c.name.toLowerCase() === categoryParam.toLowerCase() ||
          c.slug.toLowerCase() === categoryParam.toLowerCase()
      );
      if (match) {
        setSelectedCategory(match.name);
        const target = document.getElementById("best-sellers");
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  }, [categoryParam]);

  const handleSelectCategory = (catName: string) => {
    setSelectedCategory(catName);
    const target = document.getElementById("best-sellers");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="w-full flex flex-col bg-white text-gray-900 font-sans">
      {/* 1. Hero Carousel Section */}
      <HeroSection />

      {/* 4. Value & Trust Assurance Strip */}
      <ValueTrustStrip />

      {/* 5. Shop by Category (8 Categories) */}
      <CategorySection
        onSelectCategory={handleSelectCategory}
        selectedCategory={selectedCategory}
      />

      {/* 6. Our Best Sellers & Category Highlights */}
      <BestSellersSection
        activeCategoryFilter={selectedCategory}
        onSelectCategory={handleSelectCategory}
        limit={8}
      />

      {/* 7. Seasonal Signature Harvests & Superfoods Spotlight */}
      <SeasonalHarvestSpotlight />

      {/* 8. Dual Promo Banners */}
      <PromoBanners />

      {/* 9. Key Impact Numbers & Stats Bar */}
      <StatsSection />

      {/* 10. Farm-to-Fork 4-Step Purity Journey */}
      <FarmToTableProcess />

      {/* 11. Why Choose Us (6 Pillars & Certifications) */}
      <WhyChooseUs />

      {/* 12. Customer Reviews & Verified Testimonials */}
      <Testimonials />

      {/* 13. Health & Nutrition Journal Highlights */}
      <BlogHighlights />

      {/* 14. Farm Club / Newsletter 10% Off Community Box */}
      <FarmClubNewsletter />

      {/* 15. Trust Badges Ribbon */}
      <TrustBadges />
    </div>
  );
}

export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="w-full min-h-screen flex items-center justify-center bg-white text-gray-500 text-xs">
          Loading ONAAR store...
        </div>
      }
    >
      <HomeContent />
    </Suspense>
  );
}
