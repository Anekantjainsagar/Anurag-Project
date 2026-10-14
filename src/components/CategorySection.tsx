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
    <section id="categories" className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center space-y-1.5 mb-8">
          <h2 className="font-serif text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            Shop by Category
          </h2>
          <p className="text-gray-500 text-xs sm:text-sm">
            Explore our wide range of premium agricultural products
          </p>
        </div>

        {/* 7 Category Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.name;

            return (
              <div
                key={cat.id}
                id={`cat-${cat.slug}`}
                onClick={() => onSelectCategory && onSelectCategory(cat.name)}
                className={`group cursor-pointer rounded-2xl p-3 flex flex-col items-center justify-between text-center transition-all duration-300 border ${
                  isSelected
                    ? "bg-[#edf7f1] border-[#054b28] shadow-md scale-102"
                    : "bg-[#fbf7ee] hover:bg-[#f6eee0] border-[#ede4d3] hover:shadow-md hover:-translate-y-1"
                }`}
              >
                {/* Image Container with circular styling */}
                <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-full overflow-hidden bg-white p-1 shadow-xs border border-[#e3d7c1] mb-2.5 transition-transform duration-300 group-hover:scale-105">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>

                {/* Name & Arrow */}
                <div className="flex items-center justify-center gap-1.5 w-full mt-1">
                  <span className="font-medium text-xs sm:text-sm text-gray-900 group-hover:text-[#044a27] transition-colors truncate">
                    {cat.name}
                  </span>
                  <div className="w-5 h-5 rounded-full bg-white shadow-xs flex items-center justify-center text-gray-400 group-hover:text-[#044a27] group-hover:bg-[#044a27]/10 transition-colors shrink-0">
                    <ChevronRight className="w-3 h-3" />
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
