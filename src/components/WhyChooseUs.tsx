"use client";

import React from "react";
import {
  Leaf,
  Diamond,
  FlaskConical,
  Wheat,
  Package,
  Globe2,
  Award,
  ShieldCheck,
} from "lucide-react";

const FEATURES = [
  {
    id: "1",
    title: "100% Certified Organic",
    description: "Sourced directly from certified organic farmer collectives across MP & Rajasthan.",
    icon: Leaf,
  },
  {
    id: "2",
    title: "Traditional Bilona & Stone Milling",
    description: "Cold processing preserves natural enzymes, fiber, and volatile therapeutic oils.",
    icon: Diamond,
  },
  {
    id: "3",
    title: "Batch Lab-Tested",
    description: "Rigorous testing for zero pesticide residue, zero heavy metals, and zero artificial wax.",
    icon: FlaskConical,
  },
  {
    id: "4",
    title: "Unpolished Desi Grains",
    description: "Retains the mineral-rich bran layer for lower GI and wholesome digestion.",
    icon: Wheat,
  },
  {
    id: "5",
    title: "Hygienic Sortex Packing",
    description: "Nitrogen-flushed, food-grade packaging guarantees farm freshness and zero pests.",
    icon: Package,
  },
  {
    id: "6",
    title: "Global Export Credibility",
    description: "Trusted worldwide for international phytosanitary and organic food standards.",
    icon: Globe2,
  },
];

export default function WhyChooseUs() {
  return (
    <section id="certifications" className="py-12 sm:py-16 bg-white w-full font-sans border-b border-[#f0ece1]">
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
        {/* Full Width Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#edf7f1] text-[#01722C] text-xs font-bold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5" />
            <span>The ONAAR Organic Guarantee</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
            Why Discerning Families & Chefs Choose Our Food
          </h2>
          <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
            Every grain, spice, pulse, and drop of honey is cultivated with integrity, tested in accredited laboratories, and packaged with uncompromising hygiene.
          </p>
        </div>

        {/* 6 Feature Pillars Full Width Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
          {FEATURES.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="bg-[#fcfbf7] border border-[#ece4d6] hover:border-[#01722C] rounded-2xl p-5 flex flex-col items-center text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group"
              >
                {/* Icon Container */}
                <div className="w-12 h-12 rounded-2xl bg-white border border-[#e0dad0] group-hover:border-[#01722C] group-hover:bg-[#edf7f1] flex items-center justify-center text-[#01722C] shadow-xs mb-3 transition-colors">
                  <Icon className="w-6 h-6 stroke-[1.8]" />
                </div>

                {/* Title */}
                <h3 className="font-serif font-bold text-xs sm:text-sm text-gray-900 group-hover:text-[#01722C] transition-colors leading-tight">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-[11px] text-gray-500 mt-2 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
