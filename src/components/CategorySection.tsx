"use client";

import React from "react";
import Link from "next/link";
import { CATEGORIES } from "@/data/mockData";
import { ArrowRight } from "lucide-react";

interface CategorySectionProps {
  onSelectCategory?: (categoryName: string) => void;
  selectedCategory?: string | null;
}

export default function CategorySection({
  onSelectCategory,
  selectedCategory = CATEGORIES[0]?.name || "Pulses",
}: CategorySectionProps) {
  return (
    <section id="categories" className="py-10 sm:py-14 bg-white border-b border-[#f0eee6] w-full font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3 mb-8 pb-4 border-b border-gray-100">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#edf7f1] text-[#01722C] text-xs font-bold uppercase tracking-wider mb-2">
              Agricultural Commodities & Pure Groceries
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
              Explore Our Product Categories
            </h2>
            <p className="text-gray-500 text-xs sm:text-sm mt-1">
              Select a category to view unadulterated, sortex-cleaned, farm-direct staples
            </p>
          </div>

          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#01722C] hover:text-[#0b542c] bg-[#edf7f1] hover:bg-[#e1f1e7] px-5 py-2.5 rounded-xl transition-all shadow-2xs"
          >
            <span>View All Harvests</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 8 Categories Full Width Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4 md:gap-5">
          {CATEGORIES.map((cat, index) => {
            const isSelected = selectedCategory
              ? selectedCategory.toLowerCase() === cat.name.toLowerCase()
              : index === 0;

            return (
              <div
                key={cat.id}
                id={`cat-${cat.slug}`}
                onClick={() => onSelectCategory && onSelectCategory(cat.name)}
                className={`group relative cursor-pointer rounded-2xl p-4 flex flex-col items-center justify-between text-center transition-all duration-300 ease-out border ${
                  isSelected
                    ? "bg-[#edf7f1] border-[#01722C] shadow-sm scale-102"
                    : "bg-[#fcfbf7] hover:bg-[#f6f3eb] border-[#e8e2d4] hover:border-[#01722C] hover:shadow-md"
                }`}
              >
                {/* Image Container */}
                <div
                  className={`w-18 h-18 sm:w-22 sm:h-22 rounded-full overflow-hidden bg-white p-1 mb-3 transition-transform duration-300 group-hover:scale-106 shadow-xs ${
                    isSelected ? "border-2 border-[#01722C]" : "border border-[#ded6c5]"
                  }`}
                >
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>

                {/* Category Name */}
                <div className="w-full">
                  <h3
                    className={`text-xs sm:text-sm font-bold truncate transition-colors ${
                      isSelected
                        ? "text-[#01722C]"
                        : "text-gray-900 group-hover:text-[#01722C]"
                    }`}
                  >
                    {cat.name}
                  </h3>
                  <div className="text-[11px] text-gray-500 font-medium mt-0.5">
                    24 Products
                  </div>
                </div>

                {/* Bottom Active Indicator */}
                <div
                  className={`w-10 h-1 rounded-full mt-2.5 transition-all duration-300 ${
                    isSelected ? "bg-[#01722C]" : "bg-transparent group-hover:bg-[#01722C]/40"
                  }`}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
