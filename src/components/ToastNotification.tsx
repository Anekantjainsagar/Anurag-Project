"use client";

import React from "react";
import { useCart } from "@/context/CartContext";
import { CheckCircle2, AlertCircle, AlertTriangle, Info } from "lucide-react";

export default function ToastNotification() {
  const { toastMessage, toastType } = useCart();

  if (!toastMessage) return null;

  const lowerMsg = (toastMessage || "").toLowerCase();
  const isSuspendedOrBanned =
    lowerMsg.includes("suspend") ||
    lowerMsg.includes("deactivated") ||
    lowerMsg.includes("banned") ||
    lowerMsg.includes("forbidden") ||
    lowerMsg.includes("blocked") ||
    lowerMsg.includes("contact customer support");

  const isError = toastType === "error" || isSuspendedOrBanned;
  const isWarning =
    !isError &&
    (toastType === "warning" ||
      lowerMsg.includes("warning") ||
      lowerMsg.includes("invalid") ||
      lowerMsg.includes("required") ||
      lowerMsg.includes("empty"));
  const isInfo = !isError && !isWarning && toastType === "info";

  return (
    <div className="fixed bottom-6 right-6 z-[200] animate-fade-in font-sans max-w-sm sm:max-w-md pointer-events-auto">
      <div
        className={`px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border transition-all ${
          isError
            ? "bg-rose-900 text-white border-2 border-rose-500 shadow-rose-950/60"
            : isWarning
            ? "bg-amber-800 text-amber-50 border-2 border-amber-400 shadow-amber-950/50"
            : isInfo
            ? "bg-slate-900 text-slate-100 border border-slate-700 shadow-slate-950/40"
            : "bg-[#033b20] text-white border border-[#0d6b3a] shadow-emerald-950/40"
        }`}
      >
        {isError ? (
          <AlertCircle className="w-5 h-5 text-rose-200 shrink-0" />
        ) : isWarning ? (
          <AlertTriangle className="w-5 h-5 text-amber-300 shrink-0" />
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
