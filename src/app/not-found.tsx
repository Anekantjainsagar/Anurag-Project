import React from "react";
import Link from "next/link";
import { Leaf, ArrowLeft, Package, Sparkles, HelpCircle, ShoppingBag } from "lucide-react";
import { CATEGORIES } from "@/data/mockData";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-16 bg-[#faf8f5] text-slate-900 font-sans">
      <div className="max-w-xl w-full text-center space-y-6">
        {/* Emblem */}
        <div className="relative inline-block">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#01722C]/10 border-2 border-[#01722C]/20 flex items-center justify-center mx-auto text-[#01722C] shadow-sm">
            <Leaf className="w-10 h-10 sm:w-12 sm:h-12 -rotate-12" />
          </div>
          <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-[11px] font-black px-2 py-0.5 rounded-full shadow-xs">
            404
          </span>
        </div>

        {/* Heading */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Organic Route Not Found</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            Lost in the Harvest?
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-md mx-auto leading-relaxed">
            The page, recipe, or order path you requested could not be found. It may have been moved, renamed, or temporarily harvested.
          </p>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#01722C] hover:bg-[#0b542c] text-white px-6 py-3 rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Storefront</span>
          </Link>

          <Link
            href="/products"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 px-6 py-3 rounded-xl text-sm font-semibold transition-all shadow-xs cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4 text-[#01722C]" />
            <span>Browse Products</span>
          </Link>
        </div>

        {/* Category Pills */}
        <div className="pt-6 border-t border-slate-200/60 space-y-3">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Explore Certified Categories
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {CATEGORIES.slice(0, 6).map((cat) => (
              <Link
                key={cat.id}
                href={`/products?category=${encodeURIComponent(cat.name)}`}
                className="inline-flex items-center gap-1.5 bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 border border-slate-200/80 px-3 py-1.5 rounded-full text-xs font-medium transition-all"
              >
                <span>{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Support Link */}
        <div className="pt-2 text-xs text-slate-500 flex items-center justify-center gap-1">
          <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
          <span>Need assistance?</span>
          <Link href="/contact" className="text-[#01722C] font-semibold hover:underline">
            Contact Support Desk
          </Link>
        </div>
      </div>
    </div>
  );
}
