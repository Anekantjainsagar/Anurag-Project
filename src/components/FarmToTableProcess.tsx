"use client";

import React from "react";
import Link from "next/link";
import { Sprout, Sun, Scale, Truck, ArrowRight, ShieldCheck } from "lucide-react";

const STEPS = [
  {
    step: "01",
    title: "Heirloom Seeds & Living Soil",
    desc: "Cultivated with non-GMO indigenous seeds and nurtured with cow-dung Jivamrit and natural bio-compost.",
    icon: Sprout,
    highlight: "100% Non-GMO",
  },
  {
    step: "02",
    title: "Natural Terroir Cultivation",
    desc: "Grown in their native biomes—Sharbati wheat in MP, pulses in Vidarbha, and high-curcumin turmeric in the Ghats.",
    icon: Sun,
    highlight: "Regional Terroir",
  },
  {
    step: "03",
    title: "Sortex Cleanse (Zero Polish)",
    desc: "Optical color-sorted and mechanically cleaned. We strictly prohibit talcum buffing, artificial dyes, and paraffin wax.",
    icon: Scale,
    highlight: "Unpolished Purity",
  },
  {
    step: "04",
    title: "Nitrogen Hermetic Pack",
    desc: "Sealed in food-grade multi-layer barrier pouches flushed with nitrogen to eliminate oxidation without preservatives.",
    icon: Truck,
    highlight: "12-Month Freshness",
  },
];

export default function FarmToTableProcess() {
  return (
    <section className="py-14 sm:py-20 bg-white w-full font-sans border-b border-[#ece7da]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#edf7f1] text-[#01722C] text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-[#01722C]" />
            <span>Farm-To-Fork Integrity</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
            How Pure Food Reaches Your Table
          </h2>
          <p className="text-xs sm:text-sm text-gray-500">
            An unbroken chain of custody ensuring zero artificial chemicals, talc, or wax
          </p>
        </div>

        {/* 4 Process Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-6 relative">
          {STEPS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="relative bg-[#fcfaf5] p-6 sm:p-7 rounded-3xl border border-[#e5decb] hover:border-[#01722C] hover:bg-white hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-serif font-black text-3xl text-[#01722C]/30 group-hover:text-[#01722C] transition-colors">
                      {item.step}
                    </span>
                    <span className="text-[10px] font-bold text-[#01722C] bg-[#edf7f1] px-2.5 py-0.5 rounded-full border border-[#cbe4d4]">
                      {item.highlight}
                    </span>
                  </div>

                  <div className="w-12 h-12 rounded-2xl bg-[#01722C] text-white flex items-center justify-center shadow-xs">
                    <Icon className="w-6 h-6 text-[#82e4ad]" />
                  </div>

                  <h3 className="font-serif font-bold text-base sm:text-lg text-gray-900 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs text-gray-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Sub-strip link */}
        <div className="mt-10 text-center">
          <Link
            href="/about"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#01722C] hover:text-[#0b542c] hover:underline"
          >
            <span>Learn more about our heritage & testing protocols</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

