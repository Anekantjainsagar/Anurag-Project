"use client";

import React from "react";
import Link from "next/link";
import { CartProvider } from "@/context/CartContext";
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import BulkEnquiryModal from "@/components/BulkEnquiryModal";
import LoginModal from "@/components/LoginModal";
import ToastNotification from "@/components/ToastNotification";
import {
  ShieldCheck,
  Award,
  Sparkles,
  CheckCircle2,
  Leaf,
  Globe,
  Truck,
  HeartHandshake,
  ArrowRight,
  Flame,
} from "lucide-react";

export default function AboutPage() {
  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col bg-white text-gray-900 font-sans">
        <TopBar />
        <Navbar />

        {/* Hero Banner */}
        <section className="bg-gradient-to-b from-[#033b20] to-[#044a27] text-white py-14 sm:py-20 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#58cf8b_1px,transparent_1px)] [background-size:16px_16px]"></div>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#7de0a8] text-xs font-semibold backdrop-blur-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#58cf8b]" />
              <span>Rooted in Earth, Committed to Purity</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-black text-white tracking-tight">
              Our Heritage & Quality Pledge
            </h1>
            <p className="text-sm sm:text-base text-[#c3decb] leading-relaxed max-w-2xl mx-auto">
              Reviving India&apos;s rich agricultural legacy through ethical farm
              co-operatives, unpolished traditional grains, and 100% lab-tested
              organic food.
            </p>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-12 sm:py-16 bg-[#faf9f5]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="space-y-4">
              <span className="text-xs font-bold text-[#044a27] uppercase tracking-wider">
                The Origin Story
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-black text-gray-900 leading-tight">
                Restoring Food to Its Purest, Most Vital State
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Modern industrial farming has stripped staple grains of their
                nutrient-dense bran layer through aggressive chemical polishing,
                talc buffing, and sulfur fumigation.
              </p>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                We founded our brand to stand against adulteration. By working
                directly with over 1,200 farmer households across Madhya Pradesh,
                Rajasthan, Uttar Pradesh, and the Kashmir Valley, we bring you
                harvests processed through time-honored methods: slow stone chakki
                milling, wooden bilona ghee churning, and sun-drying without
                synthetic preservatives.
              </p>
              <div className="pt-2">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 bg-[#044a27] text-white text-xs font-bold px-5 py-2.5 rounded-xl hover:bg-[#03391e] transition-colors shadow-xs"
                >
                  <span>Explore Our 192 Products</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3.5">
              <div className="bg-white p-5 rounded-2xl border border-[#e5dfd2] shadow-2xs space-y-2">
                <div className="w-9 h-9 rounded-xl bg-[#edf7f1] text-[#044a27] flex items-center justify-center">
                  <Leaf className="w-5 h-5" />
                </div>
                <div className="font-bold text-sm text-gray-900">100% Unpolished</div>
                <p className="text-[11px] text-gray-500 leading-snug">
                  Retains 100% natural dietary fiber, zinc, and B-complex vitamins.
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-[#e5dfd2] shadow-2xs space-y-2">
                <div className="w-9 h-9 rounded-xl bg-[#edf7f1] text-[#044a27] flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="font-bold text-sm text-gray-900">Zero Chemicals</div>
                <p className="text-[11px] text-gray-500 leading-snug">
                  Zero pesticide residue, zero artificial color, zero synthetic waxes.
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-[#e5dfd2] shadow-2xs space-y-2">
                <div className="w-9 h-9 rounded-xl bg-[#edf7f1] text-[#044a27] flex items-center justify-center">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <div className="font-bold text-sm text-gray-900">Direct From Co-ops</div>
                <p className="text-[11px] text-gray-500 leading-snug">
                  Fair trade remunerations paid directly to organic farmer clusters.
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-[#e5dfd2] shadow-2xs space-y-2">
                <div className="w-9 h-9 rounded-xl bg-[#edf7f1] text-[#044a27] flex items-center justify-center">
                  <Globe className="w-5 h-5" />
                </div>
                <div className="font-bold text-sm text-gray-900">Export Certified</div>
                <p className="text-[11px] text-gray-500 leading-snug">
                  Meets international hygiene, moisture, and grading standards.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Certifications Section */}
        <section id="certifications" className="py-12 sm:py-16 bg-white border-t border-[#f0ece3]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center space-y-8">
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#044a27] uppercase tracking-wider">
                Rigorous Verification
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-black text-gray-900">
                Recognized & Certified by Apex Bodies
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 max-w-xl mx-auto">
                Every batch is quarantined and tested across 24 quality parameters
                before packaging in food-grade, nitrogen-flushed containers.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { title: "NPOP Organic India", desc: "Certified under National Programme for Organic Production" },
                { title: "FSSAI Licensed", desc: "Adheres strictly to Central Food Safety & Standards" },
                { title: "Jaivik Bharat", desc: "Unified logo for certified authentic organic food products" },
                { title: "ISO 22000 Certified", desc: "Global benchmark for food safety management systems" },
              ].map((cert, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-[#faf8f4] border border-[#e8e2d4] text-center space-y-2"
                >
                  <div className="w-10 h-10 rounded-full bg-[#044a27] text-white flex items-center justify-center mx-auto shadow-xs">
                    <Award className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif font-bold text-sm text-gray-900">
                    {cert.title}
                  </h3>
                  <p className="text-[11px] text-gray-500 leading-relaxed">
                    {cert.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Footer />
        <CartDrawer />
        <BulkEnquiryModal />
        <LoginModal />
        <ToastNotification />
      </div>
    </CartProvider>
  );
}
