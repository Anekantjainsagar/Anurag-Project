"use client";

import React from "react";
import { CATEGORIES } from "@/data/mockData";
import { ChevronRight, Check } from "lucide-react";

interface CategorySectionProps {
  onSelectCategory?: (categoryName: string) => void;
  selectedCategory?: string | null;
}

export default function CategorySection({
  onSelectCategory,
  selectedCategory = "Rice", // First category selected by default!
}: CategorySectionProps) {
  return (
    <section id="categories" className="py-8 sm:py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center space-y-1 mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#054b28]/10 text-[#054b28] text-[10px] sm:text-xs font-bold uppercase tracking-wider">
            Explore 100% Pure Agricultural Staples
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            Shop by Category
          </h2>
          <p className="text-gray-500 text-xs sm:text-sm">
            Select a category to view freshly harvested products
          </p>
        </div>

        {/* 7 Category Cards: Responsive Grid with Mobile Carousel / Tablet Grid */}
        <div className="flex sm:grid sm:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4 overflow-x-auto sm:overflow-x-visible pb-3 sm:pb-0 scrollbar-none">
          {CATEGORIES.map((cat, index) => {
            // First category selected if selectedCategory matches or if index === 0 when null
            const isSelected = selectedCategory
              ? selectedCategory === cat.name
              : index === 0;

            return (
              <div
                key={cat.id}
                id={`cat-${cat.slug}`}
                onClick={() => onSelectCategory && onSelectCategory(cat.name)}
                className={`group relative cursor-pointer rounded-2xl p-3 flex flex-col items-center justify-between text-center transition-all duration-300 min-w-[115px] sm:min-w-0 shrink-0 sm:shrink ${
                  isSelected
                    ? "bg-[#edf7f1] border-2 border-[#044a27] shadow-lg scale-103 -translate-y-1"
                    : "bg-[#fbf7ee] hover:bg-[#f5ede0] border border-[#ede4d3] hover:shadow-md hover:-translate-y-0.5"
                }`}
              >
                {/* Active check pill */}
                {isSelected && (
                  <div className="absolute -top-2 right-2 bg-[#044a27] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-0.5 shadow-sm">
                    <Check className="w-2.5 h-2.5" />
                    <span>Active</span>
                  </div>
                )}

                {/* Circular Image Container */}
                <div
                  className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden bg-white p-1 mb-2.5 transition-transform duration-300 group-hover:scale-105 shadow-sm ${
                    isSelected ? "border-2 border-[#044a27]" : "border border-[#e3d7c1]"
                  }`}
                >
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>

                {/* Name & Arrow */}
                <div className="flex items-center justify-center gap-1 w-full mt-0.5">
                  <span
                    className={`font-semibold text-xs sm:text-sm truncate transition-colors ${
                      isSelected ? "text-[#044a27] font-bold" : "text-gray-900 group-hover:text-[#044a27]"
                    }`}
                  >
                    {cat.name}
                  </span>
                  <div
                    className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center transition-colors shrink-0 ${
                      isSelected
                        ? "bg-[#044a27] text-white"
                        : "bg-white text-gray-400 shadow-2xs group-hover:text-[#044a27] group-hover:bg-[#044a27]/10"
                    }`}
                  >
                    <ChevronRight className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                  </div>
                </div>

                <div className="text-[10px] text-gray-500 mt-0.5">
                  {cat.itemCount} Items
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
