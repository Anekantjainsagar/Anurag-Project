import React from "react";
import { Leaf } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 bg-[#faf8f5]/60 text-slate-800 font-sans">
      <div className="flex flex-col items-center space-y-4 max-w-sm text-center">
        {/* Animated Brand Emblem */}
        <div className="relative">
          <div className="w-16 h-16 rounded-full bg-[#01722C]/10 border-2 border-[#01722C]/30 flex items-center justify-center text-[#01722C] animate-pulse">
            <Leaf className="w-8 h-8 -rotate-12 text-[#01722C]" />
          </div>
          <span className="absolute inset-0 rounded-full border-2 border-[#01722C] border-t-transparent animate-spin" />
        </div>

        {/* Text */}
        <div className="space-y-1">
          <h3 className="font-serif font-bold text-lg text-slate-900 tracking-tight">
            ONAAR
          </h3>
          <p className="text-xs text-slate-500 font-medium tracking-wide">
            Loading pure organic harvest...
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-36 h-1 bg-slate-200 rounded-full overflow-hidden">
          <div className="w-full h-full bg-[#01722C] animate-[pulse_1.5s_ease-in-out_infinite]" />
        </div>
      </div>
    </div>
  );
}
