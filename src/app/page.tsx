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
import BlogSection from "@/components/BlogSection";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import BulkEnquiryModal from "@/components/BulkEnquiryModal";
import LoginModal from "@/components/LoginModal";
import TrackOrderModal from "@/components/TrackOrderModal";
import ToastNotification from "@/components/ToastNotification";

function MainContent() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleSelectCategory = (catName: string) => {
    setSelectedCategory((prev) => (prev === catName ? null : catName));
    const target = document.getElementById("best-sellers");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      {/* 1. Top Announcement Bar */}
      <TopBar />

      {/* 2. Main Sticky Navbar */}
      <Navbar />

      {/* 3. Hero Banner Section */}
      <HeroSection />

      {/* 4. Shop by Category */}
      <CategorySection
        onSelectCategory={handleSelectCategory}
        selectedCategory={selectedCategory}
      />

      {/* 5. Our Best Sellers */}
      <BestSellersSection activeCategoryFilter={selectedCategory} />

      {/* 6. Dual Promo Banners */}
      <PromoBanners />

      {/* 7. Why Choose Our Products */}
      <WhyChooseUs />

      {/* 8. From Our Blog */}
      <BlogSection />

      {/* 9. Comprehensive Footer */}
      <Footer />

      {/* Global Interactive Drawers & Modals */}
      <CartDrawer />
      <BulkEnquiryModal />
      <LoginModal />
      <TrackOrderModal />
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
