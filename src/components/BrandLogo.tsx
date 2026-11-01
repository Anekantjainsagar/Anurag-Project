"use client";

import React from "react";

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
      {/* Official Rajlakshmi Javiks Brand Logo */}
      <img
        src="/images/logo.png"
        alt="Rajlakshmi Javiks International"
        className={`${imgSize} object-contain shrink-0 rounded-full bg-white p-0.5 shadow-2xs`}
      />

      <div className="flex flex-col leading-none">
        <span
          className={`font-serif font-black tracking-tight ${titleSize} ${titleColor}`}
        >
          Rajlakshmi Javiks
        </span>
        <span
          className={`font-sans font-bold tracking-widest uppercase mt-0.5 text-[8px] sm:text-[9px] ${subtitleColor}`}
          style={{ letterSpacing: "0.14em" }}
        >
          International • Pure Organic Food
        </span>
      </div>
    </div>
  );
}
