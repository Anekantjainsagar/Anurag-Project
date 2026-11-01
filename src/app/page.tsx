"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CategorySection from "@/components/CategorySection";
import BestSellersSection from "@/components/BestSellersSection";
import PromoBanners from "@/components/PromoBanners";
import WhyChooseUs from "@/components/WhyChooseUs";
import BlogHighlights from "@/components/BlogHighlights";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import BulkEnquiryModal from "@/components/BulkEnquiryModal";
import ToastNotification from "@/components/ToastNotification";
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
    <div className="w-full min-h-screen flex flex-col bg-white text-gray-900 font-sans">
      {/* 1. Top Announcement Bar (Full Width) */}
      <TopBar />

      {/* 2. Main Sticky Multi-Page Navbar (Full Width) */}
      <Navbar />

      {/* 3. Hero Carousel Section (Full Bleed Edge-to-Edge) */}
      <HeroSection />

      {/* 4. Shop by Category (Full Width 8-Category Grid) */}
      <CategorySection
        onSelectCategory={handleSelectCategory}
        selectedCategory={selectedCategory}
      />

      {/* 5. Our Best Sellers & Category Highlights (Full Width Grid) */}
      <BestSellersSection
        activeCategoryFilter={selectedCategory}
        onSelectCategory={handleSelectCategory}
        limit={8}
      />

      {/* 6. Dual Promo Banners (Full Width) */}
      <PromoBanners />

      {/* 7. Why Choose Our Products (Full Width 6 Pillars) */}
      <WhyChooseUs />

      {/* 8. Journal Highlights (Full Width 3-Article Preview) */}
      <BlogHighlights />

      {/* 9. Comprehensive Multi-Page Footer (Full Width) */}
      <Footer />

      {/* Global Interactive Drawers & Modals */}
      <CartDrawer />
      <BulkEnquiryModal />
      <ToastNotification />
    </div>
  );
}

export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="w-full min-h-screen flex items-center justify-center bg-white text-gray-500 text-xs">
          Loading YOUR BRAND store...
        </div>
      }
    >
      <HomeContent />
    </Suspense>
  );
}
