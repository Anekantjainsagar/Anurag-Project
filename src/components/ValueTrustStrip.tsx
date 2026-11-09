"use client";

import React from "react";
import { Truck, ShieldCheck, Sprout, HeartHandshake } from "lucide-react";

const VALUE_PROPS = [
  {
    icon: Truck,
    title: "Pan-India Free Delivery",
    desc: "Free standard shipping on orders over ₹499",
  },
  {
    icon: Sprout,
    title: "100% Heirloom & Non-GMO",
    desc: "Indigenous heritage seeds grown in living soil",
  },
  {
    icon: ShieldCheck,
    title: "Zero Synthetic Buffing",
    desc: "218 pesticide tests • Unpolished purity",
  },
  {
    icon: HeartHandshake,
    title: "4,200+ Partner Farmers",
    desc: "Fair-trade pricing direct to grower collectives",
  },
];

export default function ValueTrustStrip() {
  return (
    <section className="w-full bg-[#faf8f4] border-b border-[#e8e2d4] py-5 sm:py-6 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {VALUE_PROPS.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex items-center gap-3 sm:gap-3.5 p-2 rounded-xl"
              >
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-[#edf7f1] text-[#01722C] flex items-center justify-center shrink-0 shadow-2xs border border-[#cfe6d8]">
                  <Icon className="w-5 h-5 sm:w-5.5 sm:h-5.5" />
                </div>
                <div className="min-w-0">
                  <h4 className="font-serif font-bold text-xs sm:text-sm text-gray-900 truncate">
                    {item.title}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-gray-500 truncate">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

