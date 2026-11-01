"use client";

import React from "react";
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import BlogSection from "@/components/BlogSection";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import BulkEnquiryModal from "@/components/BulkEnquiryModal";
import ToastNotification from "@/components/ToastNotification";
import { BookOpen, Sparkles, HeartPulse, ShieldCheck } from "lucide-react";

export default function BlogPage() {
  return (
    <div className="w-full min-h-screen flex flex-col bg-white text-gray-900 font-sans">
      <TopBar />
      <Navbar />

      {/* Dedicated Full Width Blog Header Banner */}
      <section className="w-full bg-[#014d1e] text-white py-12 sm:py-16 relative overflow-hidden">
        <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 relative z-10 text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#7de0a8] text-xs font-semibold backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#58cf8b]" />
            <span>Ancient Ayurvedic Science & Modern Nutrition</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            The Holistic Health Journal
          </h1>
          <p className="text-sm sm:text-base text-[#c3decb] max-w-2xl mx-auto leading-relaxed">
            Explore in-depth scientific guides on whole grains, bilona ghee,
            cold-pressed therapeutic spices, and living sprouted legumes.
          </p>

          <div className="flex items-center justify-center gap-2 flex-wrap pt-2 text-xs text-white/80">
            <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full">
              <HeartPulse className="w-3.5 h-3.5 text-[#58cf8b]" />
              Gut Microbiome
            </span>
            <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full">
              <ShieldCheck className="w-3.5 h-3.5 text-[#58cf8b]" />
              Zero Chemical Agni
            </span>
            <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full">
              <BookOpen className="w-3.5 h-3.5 text-[#58cf8b]" />
              12 Research Articles
            </span>
          </div>
        </div>
      </section>

      {/* Full Blog Component with Search, Filtering, Carousels & Modal Reader */}
      <main className="flex-1 w-full">
        <BlogSection />
      </main>

      <Footer />
      <CartDrawer />
      <BulkEnquiryModal />
      <ToastNotification />
    </div>
  );
}
