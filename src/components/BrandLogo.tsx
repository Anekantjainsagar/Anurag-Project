"use client";

import React from "react";
import { Leaf } from "lucide-react";

interface BrandLogoProps {
  variant?: "dark" | "light";
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function BrandLogo({
  variant = "dark",
  className = "",
  size = "md",
}: BrandLogoProps) {
  const isDark = variant === "dark";

  const imgSize =
    size === "sm"
      ? "w-8 h-8 sm:w-9 sm:h-9"
      : size === "lg"
      ? "w-12 h-12 sm:w-14 sm:h-14"
      : "w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11";

  const titleSize =
    size === "sm"
      ? "text-sm sm:text-base"
      : size === "lg"
      ? "text-xl sm:text-2xl"
      : "text-base sm:text-lg md:text-xl";

  const titleColor = isDark ? "text-[#01722C]" : "text-white";
  const subtitleColor = isDark ? "text-gray-500" : "text-[#d1ecd9]";

  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 select-none ${className}`}>
      {/* Brand Emblem */}
      <div
        className={`${imgSize} rounded-full bg-[#01722C] border-2 border-[#d4af37] flex items-center justify-center text-white shadow-2xs shrink-0 relative overflow-hidden`}
      >
        <Leaf className="w-5 h-5 text-[#f4d068] transform -rotate-12" />
        <span className="sr-only">ONAAR</span>
      </div>

      <div className="flex flex-col leading-none">
        <span
          className={`font-serif font-black tracking-wider ${titleSize} ${titleColor}`}
        >
          ONAAR
        </span>
        <span
          className={`font-sans font-semibold tracking-widest uppercase mt-0.5 text-[8px] sm:text-[9px] ${subtitleColor}`}
          style={{ letterSpacing: "0.14em" }}
        >
          ORGANIC FOODS • PURE & NATURAL
        </span>
      </div>
    </div>
  );
}
