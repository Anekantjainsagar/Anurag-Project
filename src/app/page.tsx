"use client";

import React, { useState } from "react";
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

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string>(
    CATEGORIES[0]?.name || "Pulses"
  );

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
