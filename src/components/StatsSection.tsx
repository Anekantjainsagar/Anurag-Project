"use client";

import React, { useState, useEffect, useRef } from "react";
import { Users, Package, MapPin, Calendar, Sparkles } from "lucide-react";

interface StatItemConfig {
  icon: React.ComponentType<{ className?: string }>;
  target: number;
  prefix?: string;
  suffix?: string;
  start?: number;
  label: string;
  sublabel?: string;
}

const STATS_CONFIG: StatItemConfig[] = [
  {
    icon: Users,
    target: 10000,
    prefix: "",
    suffix: "+",
    start: 0,
    label: "Happy Customers",
    sublabel: "Across Pan-India",
  },
  {
    icon: Package,
    target: 192,
    prefix: "",
    suffix: "+",
    start: 0,
    label: "Organic Products",
    sublabel: "100% Lab-Tested",
  },
  {
    icon: MapPin,
    target: 100,
    prefix: "",
    suffix: "+",
    start: 0,
    label: "Cities Served",
    sublabel: "Express Delivery",
  },
  {
    icon: Calendar,
    target: 2020,
    prefix: "Since ",
    suffix: "",
    start: 1990,
    label: "Farm-to-Fork Legacy",
    sublabel: "6+ Years of Purity",
  },
];

function CounterCard({
  item,
  isTriggered,
  duration = 2000,
}: {
  item: StatItemConfig;
  isTriggered: boolean;
  duration?: number;
}) {
  const [count, setCount] = useState(item.start ?? 0);
  const Icon = item.icon;

  useEffect(() => {
    if (!isTriggered) return;

    const startVal = item.start ?? 0;
    const endVal = item.target;
    let startTime: number | null = null;
    let animationFrameId: number;

    // Smooth cubic ease-out
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(progress);
      const current = Math.floor(startVal + (endVal - startVal) * eased);

      setCount(current);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCount(endVal);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [isTriggered, item.target, item.start, duration]);

  // Format with commas if applicable
  const formattedNumber =
    item.prefix?.trim() === "Since"
      ? count.toString()
      : count.toLocaleString("en-IN");

  return (
    <div className="relative group p-4 sm:p-6 lg:p-7 rounded-2xl sm:rounded-3xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#58cf8b]/40 transition-all duration-300 shadow-sm flex flex-col items-center justify-center text-center">
      {/* Icon Pill */}
      <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center mx-auto text-[#7de0a8] shadow-inner mb-3 sm:mb-4 group-hover:scale-110 group-hover:bg-[#01722C]/40 transition-all duration-300">
        <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#7de0a8]" />
      </div>

      {/* Counter Value */}
      <div className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight tabular-nums drop-shadow-sm flex items-baseline justify-center">
        {item.prefix && (
          <span className="text-base sm:text-xl md:text-2xl font-serif text-[#a9cfbe] mr-1 sm:mr-1.5 font-bold">
            {item.prefix}
          </span>
        )}
        <span>{formattedNumber}</span>
        {item.suffix && (
          <span className="text-[#58cf8b] ml-0.5">{item.suffix}</span>
        )}
      </div>

      {/* Metric Label */}
      <div className="font-bold text-[11px] sm:text-xs md:text-sm text-[#e3ece7] tracking-wider uppercase mt-2">
        {item.label}
      </div>

      {/* Sub-label */}
      {item.sublabel && (
        <div className="text-[9.5px] sm:text-[11px] text-[#86caa3] mt-0.5 font-medium">
          {item.sublabel}
        </div>
      )}
    </div>
  );
}

export default function StatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isTriggered, setIsTriggered] = useState(false);

  useEffect(() => {
    // If IntersectionObserver is unavailable, trigger immediately
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setIsTriggered(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsTriggered(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Safety fallback: trigger after 1.5 seconds if scroll doesn't fire
    const fallbackTimer = setTimeout(() => {
      setIsTriggered(true);
    }, 1500);

    return () => {
      observer.disconnect();
      clearTimeout(fallbackTimer);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-12 sm:py-16 bg-[#014d1e] w-full font-sans relative overflow-hidden"
    >
      {/* Subtle organic background decoration */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#58cf8b_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10 space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#7de0a8] text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#58cf8b]" />
            <span>Pure Food Trust & Numbers</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Our Growing Organic Footprint
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {STATS_CONFIG.map((item, idx) => (
            <CounterCard
              key={idx}
              item={item}
              isTriggered={isTriggered}
              duration={2000}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
