"use client";

import React from "react";
import { Truck, ShieldCheck, Leaf, Award, Clock, IndianRupee } from "lucide-react";

const TRUST_BADGES = [
  { icon: Leaf, label: "100% Organic", sub: "NPOP Certified" },
  { icon: ShieldCheck, label: "Lab Tested", sub: "Zero Pesticides" },
  { icon: Truck, label: "Pan India Delivery", sub: "Fast & Secure" },
  { icon: Award, label: "Farm Fresh", sub: "Direct Sourcing" },
  { icon: Clock, label: "12-Month Shelf Life", sub: "N₂ Flushed Packing" },
  { icon: IndianRupee, label: "Best Prices", sub: "No Middlemen" },
];

export default function TrustBadges() {
  return (
    <section className="py-6 sm:py-8 bg-[#013816] w-full font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {TRUST_BADGES.map((badge, idx) => {
            const Icon = badge.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl px-4 py-3 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-[#58cf8b]/20 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-[#7de0a8]" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white leading-tight">
                    {badge.label}
                  </div>
                  <div className="text-[10px] text-[#a9cfbe]">{badge.sub}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
