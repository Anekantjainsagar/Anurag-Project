"use client";

import React from "react";
import { useCart } from "@/context/CartContext";
import { CheckCircle2 } from "lucide-react";

export default function ToastNotification() {
  const { toastMessage } = useCart();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-fade-in font-sans">
      <div className="bg-[#033b20] text-white px-4 py-3 rounded-xl shadow-2xl border border-[#0d6b3a] flex items-center gap-3">
        <CheckCircle2 className="w-5 h-5 text-[#58cf8b] shrink-0" />
        <span className="text-xs font-semibold tracking-wide">
          {toastMessage}
        </span>
      </div>
    </div>
  );
}
