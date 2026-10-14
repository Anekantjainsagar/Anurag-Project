"use client";

import React from "react";
import {
  Leaf,
  Diamond,
  FlaskConical,
  Wheat,
  Package,
  Globe2,
} from "lucide-react";

const FEATURES = [
  {
    id: "1",
    title: "Naturally Sourced",
    description: "From trusted farms",
    icon: Leaf,
  },
  {
    id: "2",
    title: "Premium Quality",
    description: "Carefully selected and graded",
    icon: Diamond,
  },
  {
    id: "3",
    title: "Quality Tested",
    description: "Hygienically processed",
    icon: FlaskConical,
  },
  {
    id: "4",
    title: "Rich in Nutrition",
    description: "Healthy food for a better life",
    icon: Wheat,
  },
  {
    id: "5",
    title: "Secure Packaging",
    description: "Freshness and safety",
    icon: Package,
  },
  {
    id: "6",
    title: "Global Export",
    description: "Bulk supply and worldwide delivery",
    icon: Globe2,
  },
];

export default function WhyChooseUs() {
  return (
    <section id="certifications" className="py-8 sm:py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="font-serif text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            Why Choose Our Products
          </h2>
        </div>

        {/* 6 Feature Badges Grid: 2 on mobile, 3 on tablet, 6 on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-4">
          {FEATURES.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="bg-[#fcfaf5] border border-[#ece4d6] hover:border-[#044a27] rounded-2xl p-3 sm:p-4 flex flex-col items-center text-center transition-all duration-300 hover:shadow-md hover:-translate-y-1 group"
              >
                {/* Icon Container */}
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white border border-[#e4dcce] group-hover:border-[#044a27] flex items-center justify-center text-[#044a27] shadow-2xs mb-2.5 transition-colors">
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.8]" />
                </div>

                {/* Title */}
                <h3 className="font-bold text-xs sm:text-sm text-gray-900 group-hover:text-[#044a27] transition-colors leading-tight">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-[10px] sm:text-[11px] text-gray-500 mt-1 leading-snug">
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
