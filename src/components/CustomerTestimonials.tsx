"use client";

import React from "react";
import { Star, ShieldCheck, Quote, CheckCircle2 } from "lucide-react";

const REVIEWS = [
  {
    name: "Dr. Ananya Sharma",
    role: "Clinical Nutritionist, New Delhi",
    review:
      "YOUR BRAND unpolished toor and chana dals have a distinct earthy aroma and natural texture. They don't have that artificial water-polished shine. My patients notice a genuine difference in digestion and energy.",
    rating: 5,
    tag: "Verified Household",
  },
  {
    name: "Chef Vikramaditya Rao",
    role: "Culinary Consultant, Bengaluru",
    review:
      "Sourcing unadulterated spices with authentic aroma oils is tough. Their Lakadong turmeric and Tellicherry black pepper are intensely fragrant and completely free from artificial colorants.",
    rating: 5,
    tag: "Verified Chef",
  },
  {
    name: "Priya & Rajesh Mehra",
    role: "Organic Home Cooks, Mumbai",
    review:
      "Our daily rotis are softer and noticeably sweeter with the Sharbati wheat flour. Knowing every batch is lab-tested against 218 pesticide residues gives our family absolute peace of mind.",
    rating: 5,
    tag: "Verified Buyer",
  },
];

export default function CustomerTestimonials() {
  return (
    <section className="py-14 sm:py-20 bg-[#faf8f4] w-full font-sans border-b border-[#ece7da]">
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#edf7f1] text-[#01722C] text-xs font-bold uppercase tracking-wider">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#01722C]" />
            <span>Trusted By 12,000+ Indian Kitchens</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
            Loved For Purity & Honest Flavor
          </h2>
          <div className="flex items-center justify-center gap-1.5 pt-1">
            <div className="flex items-center text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <span className="text-xs font-bold text-gray-700 ml-1">
              4.9 / 5 Overall Satisfaction Rating
            </span>
          </div>
        </div>

        {/* 3 Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {REVIEWS.map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-6 sm:p-7 rounded-3xl border border-[#e4ded0] shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between space-y-5"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-amber-400 gap-0.5">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold text-[#01722C] bg-[#edf7f1] px-2 py-0.5 rounded-full">
                    {item.tag}
                  </span>
                </div>

                <Quote className="w-7 h-7 text-[#01722C]/20" />

                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed italic">
                  &ldquo;{item.review}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <div className="font-serif font-bold text-sm text-gray-900">
                  {item.name}
                </div>
                <div className="text-[11px] text-gray-500 font-medium">
                  {item.role}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

