"use client";

import React, { useState } from "react";
import Link from "next/link";
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import BulkEnquiryModal from "@/components/BulkEnquiryModal";
import ToastNotification from "@/components/ToastNotification";
import {
  Sparkles,
  ShieldCheck,
  Leaf,
  HeartHandshake,
  Globe,
  ArrowRight,
  ChevronDown,
  HelpCircle,
  Sprout,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

const STATS = [
  { value: "4,200+", label: "Partner Farmers" },
  { value: "15,000+", label: "Organic Acres" },
  { value: "100%", label: "Unpolished Staples" },
  { value: "0%", label: "Synthetic Chemicals" },
];

const VALUES = [
  {
    icon: Leaf,
    title: "100% Unpolished & Natural",
    desc: "Our grains retain their natural outer bran and mineral layer — zero emery machine buffing, talcum, or synthetic wax.",
  },
  {
    icon: ShieldCheck,
    title: "Batch Lab-Tested (218 Tests)",
    desc: "Quarantined and verified for zero pesticide residue, zero heavy metals, and zero chemical fumigants before packing.",
  },
  {
    icon: HeartHandshake,
    title: "Direct Farmer Partnerships",
    desc: "Contracted directly with 4,200+ smallholder growers across MP, Vidarbha, and Kashmir with upfront fair premiums.",
  },
  {
    icon: Globe,
    title: "NPOP & Central FSSAI Certified",
    desc: "Fully accredited under the Government of India's National Programme for Organic Production and Jaivik Bharat framework.",
  },
];

const FAQS = [
  {
    q: "How does ONAAR prove products are 100% organic?",
    a: "Every batch is traced to registered organic farmer clusters with geo-tagged locations and tested in NABL-accredited laboratories for 218 pesticide residues and heavy metals. Certificates of analysis are available upon request.",
  },
  {
    q: "Why do your dals look less shiny than supermarket brands?",
    a: "Commercial brands buff pulses with talcum powder, food colors, and liquid paraffin wax for shine. Our dals are 100% unpolished and retain their nutrient-dense aleurone layer containing 80% of natural fiber and minerals.",
  },
  {
    q: "What does cold-pressed and traditional Bilona mean?",
    a: "Our cold-pressed oils are expelled in traditional wooden kohlus below 42°C to safeguard nutrients. Our A2 ghee is prepared by culturing whole A2 Gir cow milk into curd and hand-churning bilona makhan before slow simmering.",
  },
  {
    q: "Do you supply institutional and wholesale bulk orders?",
    a: "Yes. We partner with restaurants, organic retailers, and institutional kitchens across India with customized wholesale pricing and certified supply chains.",
  },
];

export default function AboutPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="w-full min-h-screen flex flex-col bg-[#faf8f4] text-gray-900 font-sans">
      <TopBar />
      <Navbar />

      {/* Header Banner */}
      <section className="w-full bg-[#014d1e] text-white py-12 sm:py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#7de0a8] text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#58cf8b]" />
            <span>ONAAR • Our Heritage & Standards</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-black text-white tracking-tight">
            About Our Heritage & Standards
          </h1>
          <p className="text-sm sm:text-base text-[#c3decb] max-w-xl mx-auto leading-relaxed">
            Restoring ancient agricultural purity through unpolished, chemical-free staples
            sourced directly from 4,200+ partner farmers across India.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 flex-1 space-y-12 sm:space-y-16">
        {/* Row 1: Direct Mission Overview & Story */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#01722C] uppercase tracking-wider">
                Our Story & Philosophy
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
                Why We Refuse To Polish Or Bleach
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed pt-1">
                Modern food processing routinely strips grains of their most nutrient-dense outer layers — buffing dals with emery stones, shining with paraffin wax, and treating with chemicals for cosmetic gloss.
              </p>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                <strong>ONAAR</strong> was founded to provide an honest alternative. We cultivate living soil with indigenous non-GMO heirloom seeds, cow-dung Jivamrit, and traditional organic farming methods.
              </p>
            </div>

            {/* Quick Stat Pill Cards */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              {STATS.map((stat, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-white border border-[#e8e2d4] text-center shadow-2xs"
                >
                  <div className="font-serif text-xl sm:text-2xl font-black text-[#01722C]">
                    {stat.value}
                  </div>
                  <div className="text-[11px] font-bold text-gray-600 uppercase tracking-wider mt-0.5">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: 4 Value Cards (7 cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {VALUES.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-5 sm:p-6 rounded-2xl bg-white border border-[#e8e2d4] shadow-2xs hover:border-[#01722C] transition-all duration-300 space-y-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#edf7f1] text-[#01722C] flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif font-bold text-sm sm:text-base text-gray-900">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Row 2: Frequently Asked Questions */}
        <div className="max-w-3xl mx-auto space-y-6 pt-4 border-t border-[#e8e2d4]">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#edf7f1] text-[#01722C] text-xs font-bold uppercase tracking-wider">
              <HelpCircle className="w-3.5 h-3.5 text-[#01722C]" />
              <span>Transparency</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-gray-500">
              Everything you need to know about our organic certification and harvesting
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-[#e8e2d4] bg-white overflow-hidden transition-colors shadow-2xs"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  >
                    <span className="font-serif font-bold text-sm text-gray-900 leading-snug">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#01722C] shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Row 3: Call to Action Banner */}
        <div className="rounded-3xl bg-[#014d1e] text-white p-8 sm:p-12 text-center space-y-4">
          <h3 className="font-serif text-2xl sm:text-3xl font-black text-white tracking-tight">
            Taste The Purity of Real Farm Staples
          </h3>
          <p className="text-xs sm:text-sm text-[#c3decb] max-w-xl mx-auto leading-relaxed">
            Discover our collection of 192+ lab-tested organic staples, delivered fresh to your doorstep across India.
          </p>
          <div className="pt-2 flex items-center justify-center gap-3 flex-wrap">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-[#58cf8b] hover:bg-[#46bb77] text-[#013816] text-xs sm:text-sm font-extrabold uppercase tracking-wider px-6 py-3 rounded-xl transition-all shadow-md active:scale-98"
            >
              <span>Explore All Products</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-bold px-5 py-3 rounded-xl transition-all border border-white/20"
            >
              <span>Contact & Bulk Orders</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
      <CartDrawer />
      <BulkEnquiryModal />
      <ToastNotification />
    </div>
  );
}
