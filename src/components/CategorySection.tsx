"use client";

import React from "react";
import { CATEGORIES } from "@/data/mockData";
import { ChevronRight } from "lucide-react";

interface CategorySectionProps {
  onSelectCategory?: (categoryName: string) => void;
  selectedCategory?: string | null;
}

export default function CategorySection({
  onSelectCategory,
  selectedCategory,
}: CategorySectionProps) {
  return (
    <section id="categories" className="py-8 sm:py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center space-y-1 mb-6 sm:mb-8">
          <h2 className="font-serif text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            Shop by Category
          </h2>
          <p className="text-gray-500 text-xs sm:text-sm">
            Explore our wide range of premium agricultural products
          </p>
        </div>

        {/* 7 Category Cards: Responsive Grid with Mobile Carousel / Tablet Grid */}
        <div className="flex sm:grid sm:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4 overflow-x-auto sm:overflow-x-visible pb-3 sm:pb-0 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.name;

            return (
              <div
                key={cat.id}
                id={`cat-${cat.slug}`}
                onClick={() => onSelectCategory && onSelectCategory(cat.name)}
                className={`group cursor-pointer rounded-2xl p-2.5 sm:p-3 flex flex-col items-center justify-between text-center transition-all duration-300 border min-w-[105px] sm:min-w-0 shrink-0 sm:shrink ${
                  isSelected
                    ? "bg-[#edf7f1] border-[#054b28] shadow-md scale-102"
                    : "bg-[#fbf7ee] hover:bg-[#f6eee0] border-[#ede4d3] hover:shadow-md hover:-translate-y-1"
                }`}
              >
                {/* Image Container */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden bg-white p-1 shadow-2xs border border-[#e3d7c1] mb-2 transition-transform duration-300 group-hover:scale-105">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>

                {/* Name & Arrow */}
                <div className="flex items-center justify-center gap-1 w-full mt-0.5">
                  <span className="font-medium text-xs sm:text-sm text-gray-900 group-hover:text-[#044a27] transition-colors truncate">
                    {cat.name}
                  </span>
                  <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-white shadow-2xs flex items-center justify-center text-gray-400 group-hover:text-[#044a27] group-hover:bg-[#044a27]/10 transition-colors shrink-0">
                    <ChevronRight className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
