"use client";

import React, { useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Package, Search, ArrowLeft, ShieldCheck, Truck, Sparkles, HelpCircle } from "lucide-react";

function GeneralTrackContent() {
  const router = useRouter();
  const [orderNumber, setOrderNumber] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = orderNumber.trim().toUpperCase();
    if (!clean) {
      setError("Please enter your Order ID (e.g. YB-20261110-4588)");
      return;
    }
    router.push(`/orders/track/${encodeURIComponent(clean)}`);
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-16 bg-[#faf8f5] text-slate-900 font-sans">
      <div className="max-w-xl w-full text-center space-y-6">
        {/* Emblem */}
        <div className="w-20 h-20 rounded-full bg-emerald-100/80 border-2 border-emerald-300 flex items-center justify-center mx-auto text-emerald-800 shadow-sm">
          <Truck className="w-10 h-10" />
        </div>

        {/* Heading */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Pan-India Harvest Logistics</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Track Your Organic Order
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
            Enter the Order ID sent via SMS or email to inspect packaging status, courier partner, live AWB tracking, and GST tax invoice.
          </p>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="bg-white p-2.5 sm:p-3 rounded-2xl border border-slate-200 shadow-md flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
            <input
              type="text"
              placeholder="e.g. YB-20261110-4588"
              value={orderNumber}
              onChange={(e) => {
                setOrderNumber(e.target.value);
                if (error) setError(null);
              }}
              className="w-full text-xs sm:text-sm pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-600 focus:bg-white font-mono"
              autoFocus
            />
          </div>
          <button
            type="submit"
            className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-xl cursor-pointer transition-colors shadow-xs shrink-0"
          >
            Track Order
          </button>
        </form>

        {error && (
          <p className="text-xs text-rose-600 font-semibold">{error}</p>
        )}

        {/* Quick Demo Pill */}
        <div className="flex items-center justify-center gap-2 text-slate-500 text-xs">
          <span>Recent demo order:</span>
          <button
            type="button"
            onClick={() => {
              setOrderNumber("YB-20261110-4588");
              router.push("/orders/track/YB-20261110-4588");
            }}
            className="text-emerald-800 font-mono font-bold hover:underline cursor-pointer"
          >
            #YB-20261110-4588
          </button>
        </div>

        {/* Secondary Links */}
        <div className="pt-6 border-t border-slate-200/80 flex items-center justify-center gap-4 text-xs">
          <Link
            href="/profile?tab=orders"
            className="inline-flex items-center gap-1.5 text-slate-700 hover:text-emerald-800 font-semibold"
          >
            <Package className="w-3.5 h-3.5 text-emerald-700" />
            <span>My Account Orders</span>
          </Link>
          <span className="text-slate-300">•</span>
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 text-slate-700 hover:text-emerald-800 font-semibold"
          >
            <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
            <span>Help Desk</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function GeneralTrackPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#faf8f5] text-slate-500 text-xs">
          Loading order tracking...
        </div>
      }
    >
      <GeneralTrackContent />
    </Suspense>
  );
}
