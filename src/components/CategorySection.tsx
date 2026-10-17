"use client";

import React from "react";
import { CATEGORIES } from "@/data/mockData";

interface CategorySectionProps {
  onSelectCategory?: (categoryName: string) => void;
  selectedCategory?: string | null;
}

export default function CategorySection({
  onSelectCategory,
  selectedCategory = "Rice", // First category selected by default!
}: CategorySectionProps) {
  return (
    <section id="categories" className="py-8 sm:py-10 bg-white border-b border-[#f0eee6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center space-y-1 mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#054b28]/10 text-[#054b28] text-[10px] sm:text-xs font-bold uppercase tracking-wider">
            Agricultural Commodities & Staples
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            Shop by Category
          </h2>
          <p className="text-gray-500 text-xs sm:text-sm">
            Select a category to view freshly harvested, graded products
          </p>
        </div>

        {/* 7 Category Cards: Clean, Formal Grid */}
        <div className="flex sm:grid sm:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4 overflow-x-auto sm:overflow-x-visible pb-3 sm:pb-0 scrollbar-none">
          {CATEGORIES.map((cat, index) => {
            // First category selected if selectedCategory matches or if index === 0 when null
            const isSelected = selectedCategory
              ? selectedCategory.toLowerCase() === cat.name.toLowerCase()
              : index === 0;

            return (
              <div
                key={cat.id}
                id={`cat-${cat.slug}`}
                onClick={() => onSelectCategory && onSelectCategory(cat.name)}
                className={`group relative cursor-pointer rounded-xl p-3.5 flex flex-col items-center justify-between text-center transition-all duration-300 ease-out min-w-[120px] sm:min-w-0 shrink-0 sm:shrink ${
                  isSelected
                    ? "bg-[#f4f8f5] border-2 border-[#044a27] shadow-sm"
                    : "bg-[#faf9f5] hover:bg-[#f2efe6] border border-[#e8e2d4] hover:border-[#d6cbb5]"
                }`}
              >
                {/* Circular Image Container */}
                <div
                  className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden bg-white p-1 mb-2.5 transition-transform duration-300 ease-out group-hover:scale-105 shadow-2xs ${
                    isSelected
                      ? "border-2 border-[#044a27]"
                      : "border border-[#ded6c5]"
                  }`}
                >
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>

                {/* Name */}
                <div className="w-full">
                  <h3
                    className={`text-xs sm:text-sm font-semibold truncate transition-colors duration-200 ${
                      isSelected
                        ? "text-[#044a27] font-bold"
                        : "text-gray-900 group-hover:text-[#044a27]"
                    }`}
                  >
                    {cat.name}
                  </h3>
                  <div className="text-[10px] text-gray-500 mt-0.5">
                    {cat.itemCount} Items
                  </div>
                </div>

                {/* Subtle bottom active bar indicator */}
                <div
                  className={`w-8 h-1 rounded-full mt-2 transition-all duration-300 ease-out ${
                    isSelected ? "bg-[#044a27]" : "bg-transparent group-hover:bg-gray-300"
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
