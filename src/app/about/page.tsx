"use client";

import React from "react";
import Link from "next/link";
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import BulkEnquiryModal from "@/components/BulkEnquiryModal";
import ToastNotification from "@/components/ToastNotification";
import {
  ShieldCheck,
  Award,
  Sparkles,
  Leaf,
  Globe,
  HeartHandshake,
  ArrowRight,
} from "lucide-react";

export default function AboutPage() {
  return (
    <div className="w-full min-h-screen flex flex-col bg-white text-gray-900 font-sans">
        <TopBar />
        <Navbar />

        {/* Full Width Hero Banner */}
        <section className="w-full bg-[#014d1e] text-white py-14 sm:py-20 relative overflow-hidden">
          <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 relative z-10 text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#7de0a8] text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-[#58cf8b]" />
              <span>Rajlakshmi Javiks International • Rooted in Earth, Committed to Purity</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-black text-white tracking-tight">
              Our Heritage & Quality Standards
            </h1>
            <p className="text-sm sm:text-base text-[#c3decb] leading-relaxed max-w-3xl mx-auto">
              Cultivating, sorting, and exporting certified authentic organic commodities
              directly from smallholder farmer co-operatives to health-conscious kitchens worldwide.
            </p>
          </div>
        </section>

        {/* Full Width Story Section */}
        <section className="py-14 sm:py-20 bg-[#faf9f5] w-full border-b border-[#f0eee6]">
          <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-bold text-[#01722C] uppercase tracking-wider">
                The Rajlakshmi Javiks Legacy
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-black text-gray-900 leading-tight">
                Restoring Pure Indian Agriculture Without Chemical Compromise
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Headquartered in Indore, Madhya Pradesh—the heartland of India&apos;s most fertile black-soil agricultural valleys—Rajlakshmi Javiks International was built with a singular mission: to eliminate chemical adulteration, toxic pesticide buffing, and synthetic polishing from everyday kitchen staples.
              </p>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                We work in direct partnership with certified organic farmer clusters across Madhya Pradesh, Rajasthan, Gujarat, and Kashmir. By paying fair trade premiums directly to growers, we preserve traditional cultivation: heirloom non-GMO seeds, natural cow dung composting, and ancient harvesting practices.
              </p>
              <div className="pt-2">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 bg-[#01722C] text-white text-xs sm:text-sm font-bold px-6 py-3 rounded-xl hover:bg-[#0b542c] transition-colors shadow-xs"
                >
                  <span>Explore Our 192 Products</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-2xl border border-[#e5dfd2] shadow-2xs space-y-2.5">
                <div className="w-10 h-10 rounded-xl bg-[#edf7f1] text-[#01722C] flex items-center justify-center">
                  <Leaf className="w-5 h-5" />
                </div>
                <div className="font-serif font-bold text-sm sm:text-base text-gray-900">100% Unpolished</div>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Natural pulses and whole grains retaining 100% natural dietary fiber, zinc, and B-vitamins.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-[#e5dfd2] shadow-2xs space-y-2.5">
                <div className="w-10 h-10 rounded-xl bg-[#edf7f1] text-[#01722C] flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="font-serif font-bold text-sm sm:text-base text-gray-900">Zero Chemicals</div>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Zero pesticide residues, zero artificial dye glazing, and zero sulphur fumigation.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-[#e5dfd2] shadow-2xs space-y-2.5">
                <div className="w-10 h-10 rounded-xl bg-[#edf7f1] text-[#01722C] flex items-center justify-center">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <div className="font-serif font-bold text-sm sm:text-base text-gray-900">Direct From Co-ops</div>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Ethical farmer agreements guaranteeing fair trade prices and sustainable organic soil health.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-[#e5dfd2] shadow-2xs space-y-2.5">
                <div className="w-10 h-10 rounded-xl bg-[#edf7f1] text-[#01722C] flex items-center justify-center">
                  <Globe className="w-5 h-5" />
                </div>
                <div className="font-serif font-bold text-sm sm:text-base text-gray-900">Export Certified</div>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Exported to international buyers with complete APEDA and global phytosanitary documentation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Certifications Full Width Section */}
        <section id="certifications" className="py-14 sm:py-20 bg-white w-full">
          <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 text-center space-y-10">
            <div className="space-y-2 max-w-2xl mx-auto">
              <span className="text-xs font-bold text-[#01722C] uppercase tracking-wider">
                Recognized Credentials
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-black text-gray-900">
                Audited & Certified by National Regulatory Authorities
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                Every shipment is quarantined and tested across 24 critical food safety parameters before packaging.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
              {[
                { title: "NPOP Organic India", desc: "Certified under National Programme for Organic Production Standards" },
                { title: "FSSAI Licensed", desc: "Fully compliant with Central Food Safety & Standards Authority of India" },
                { title: "Jaivik Bharat", desc: "Official unified trust mark for certified authentic organic food products" },
                { title: "APEDA & ISO 22000", desc: "Agricultural and Processed Food Products Export Development Authority accredited" },
              ].map((cert, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-[#faf8f4] border border-[#e8e2d4] text-center space-y-3"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#01722C] text-white flex items-center justify-center mx-auto shadow-xs">
                    <Award className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif font-bold text-sm sm:text-base text-gray-900">
                    {cert.title}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
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
        <ToastNotification />
      </div>
    );
}
