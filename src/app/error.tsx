"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RotateCcw, Home, HelpCircle } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application runtime error:", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 bg-[#faf8f5] text-slate-900 font-sans">
      <div className="max-w-md w-full bg-white p-8 rounded-3xl border border-slate-200 shadow-md text-center space-y-5">
        <div className="w-14 h-14 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto border border-rose-200">
          <AlertCircle className="w-7 h-7" />
        </div>

        <div className="space-y-1">
          <h2 className="font-serif text-2xl font-bold text-slate-900">
            Something went wrong
          </h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            An unexpected error occurred while loading this page. Our engineers have been alerted.
          </p>
        </div>

        {error?.message && (
          <div className="p-3 bg-slate-50 rounded-xl text-left border border-slate-200 text-[11px] font-mono text-slate-700 max-h-24 overflow-y-auto">
            {error.message}
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 pt-2">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold px-5 py-2.5 rounded-xl cursor-pointer transition-colors shadow-xs"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Try Again</span>
          </button>
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold px-5 py-2.5 rounded-xl transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Storefront</span>
          </Link>
        </div>

        <div className="pt-4 border-t border-slate-100 text-[11px] text-slate-400">
          Need immediate support? Call our helpline: +91-98765 43210
        </div>
      </div>
    </div>
  );
}
