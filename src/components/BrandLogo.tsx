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

  const leafColor = isDark ? "#08492b" : "#e6b343";
  const leafAccent = isDark ? "#127546" : "#f5d47a";
  const titleColor = isDark ? "#08492b" : "#ffffff";
  const subtitleColor = isDark ? "#4b5563" : "#d1e7dd";

  const scale = size === "sm" ? 0.8 : size === "lg" ? 1.25 : 1;

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Crisp SVG Sprout Emblem */}
      <svg
        width={36 * scale}
        height={36 * scale}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-300 hover:rotate-3"
      >
        <path
          d="M24 42C24 42 23.5 32 17 25C10.5 18 8 18 8 18C8 18 13 18 20 23C22.5 24.8 24 28 24 28"
          stroke={leafColor}
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M24 42C24 42 24.5 30 33 22C40 15 42 15 42 15C42 15 37 16 29 23C26.5 25.2 24 29 24 29"
          stroke={leafColor}
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Left leaf fill */}
        <path
          d="M17 25C10.5 18 8 18 8 18C8 18 13 14 21 17C26 19 23 27 17 25Z"
          fill={leafColor}
          opacity="0.9"
        />
        {/* Right leaf fill */}
        <path
          d="M33 22C40 15 42 15 42 15C42 15 39 10 30 13C24 15 27 24 33 22Z"
          fill={leafAccent}
          opacity="0.9"
        />
        {/* Center sprout stem */}
        <path
          d="M24 44V26"
          stroke={leafColor}
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>

      <div className="flex flex-col leading-none">
        <span
          className="font-serif font-black tracking-tight"
          style={{
            color: titleColor,
            fontSize: `${1.35 * scale}rem`,
            letterSpacing: "0.02em",
          }}
        >
          YOUR BRAND
        </span>
        <span
          className="font-sans font-semibold tracking-widest uppercase mt-0.5"
          style={{
            color: subtitleColor,
            fontSize: `${0.56 * scale}rem`,
            letterSpacing: "0.22em",
          }}
        >
          PURE FOOD. BETTER LIFE.
        </span>
      </div>
    </div>
  );
}
