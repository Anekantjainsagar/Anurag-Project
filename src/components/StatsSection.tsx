"use client";

import React from "react";
import { Users, Package, MapPin, Calendar } from "lucide-react";

const STATS = [
  { icon: Users, value: "10,000+", label: "Happy Customers", color: "text-[#7de0a8]" },
  { icon: Package, value: "192+", label: "Organic Products", color: "text-[#7de0a8]" },
  { icon: MapPin, value: "100+", label: "Cities Served", color: "text-[#7de0a8]" },
  { icon: Calendar, value: "Since 2020", label: "Farm-to-Fork Legacy", color: "text-[#7de0a8]" },
];

export default function StatsSection() {
  return (
    <section className="py-10 sm:py-14 bg-[#014d1e] w-full font-sans">
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center">
          {STATS.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="space-y-2">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mx-auto">
                  <Icon className="w-6 h-6 text-[#7de0a8]" />
                </div>
                <div className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-white">
                  {stat.value}
                </div>
                <div className="font-bold text-xs sm:text-sm text-[#a9cfbe] tracking-wide uppercase">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
