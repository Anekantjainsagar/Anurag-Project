"use client";

import React from "react";
import { useCart } from "@/context/CartContext";
import { CheckCircle2, AlertCircle, AlertTriangle, Info } from "lucide-react";

export default function ToastNotification() {
  const { toastMessage, toastType } = useCart();

  if (!toastMessage) return null;

  const isError = toastType === "error";
  const isWarning = toastType === "warning";
  const isInfo = toastType === "info";

  return (
    <div className="fixed bottom-6 right-6 z-[120] animate-fade-in font-sans max-w-sm sm:max-w-md">
      <div
        className={`px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 border transition-all ${
          isError
            ? "bg-rose-950 text-rose-100 border-rose-800 shadow-rose-950/40"
            : isWarning
            ? "bg-amber-950 text-amber-100 border-amber-800 shadow-amber-950/40"
            : isInfo
            ? "bg-slate-900 text-slate-100 border-slate-700 shadow-slate-950/40"
            : "bg-[#033b20] text-white border-[#0d6b3a] shadow-emerald-950/40"
        }`}
      >
        {isError ? (
          <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
        ) : isWarning ? (
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
        ) : isInfo ? (
          <Info className="w-5 h-5 text-sky-400 shrink-0" />
        ) : (
          <CheckCircle2 className="w-5 h-5 text-[#58cf8b] shrink-0" />
        )}
        <span className="text-xs font-semibold tracking-wide leading-relaxed">
          {toastMessage}
        </span>
      </div>
    </div>
  );
}
