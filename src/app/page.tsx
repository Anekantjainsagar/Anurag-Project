"use client";

import React, { useState } from "react";
import { CartProvider } from "@/context/CartContext";
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
import LoginModal from "@/components/LoginModal";
import ToastNotification from "@/components/ToastNotification";
import { CATEGORIES } from "@/data/mockData";

function MainContent() {
  // First category (CATEGORIES[0]) is ALWAYS selected by default!
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
    <div className="min-h-screen flex flex-col bg-white text-gray-900 font-sans">
      {/* 1. Top Announcement Bar */}
      <TopBar />

      {/* 2. Main Sticky Multi-Page Navbar */}
      <Navbar />

      {/* 3. Hero Carousel Section (Auto-scrolling, Smooth Transitions) */}
      <HeroSection />

      {/* 4. Shop by Category (8 Categories Grid with First Selected by Default) */}
      <CategorySection
        onSelectCategory={handleSelectCategory}
        selectedCategory={selectedCategory}
      />

      {/* 5. Our Best Sellers & Category Highlights (Top 8 Curated with Link to Full Catalogue) */}
      <BestSellersSection
        activeCategoryFilter={selectedCategory}
        onSelectCategory={handleSelectCategory}
        limit={8}
      />

      {/* 6. Dual Promo Banners */}
      <PromoBanners />

      {/* 7. Why Choose Our Products (6 Trust Pillars) */}
      <WhyChooseUs />

      {/* 8. Journal Highlights (Clean 3-Article Preview Linking to /blog) */}
      <BlogHighlights />

      {/* 9. Comprehensive Multi-Page Footer */}
      <Footer />

      {/* Global Interactive Drawers & Modals */}
      <CartDrawer />
      <BulkEnquiryModal />
      <LoginModal />
      <ToastNotification />
    </div>
  );
}

export default function Home() {
  return (
    <CartProvider>
      <MainContent />
    </CartProvider>
  );
}
