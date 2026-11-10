"use client";

import React, { useState } from "react";
import { Mail, Sparkles, Check, ArrowRight, ShieldCheck } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { api } from "@/services/apiClient";
import { isCouponRedeemed } from "@/utils/cookieUtils";

export default function FarmClubNewsletter() {
  const { showToast } = useCart();
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [feedback, setFeedback] = useState<{ alreadyRedeemed: boolean; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !cleanEmail.includes("@")) {
      showToast("Please enter a valid email address");
      return;
    }
    setIsSubmitted(true);

    try {
      const res = await api.inquiries.subscribeNewsletter(cleanEmail);
      if (res?.already_redeemed) {
        setFeedback({
          alreadyRedeemed: true,
          message: "Welcome back! You're subscribed. First-order discount was already availed on a prior order.",
        });
        showToast(res.message || "Welcome back to the Farm Club!");
        setEmail("");
        return;
      }
    } catch {
      // Graceful fallback
    }

    if (isCouponRedeemed("HARVEST10")) {
      setFeedback({
        alreadyRedeemed: true,
        message: "Welcome to the Farm Club Community! First-order discount was already availed.",
      });
      showToast("Thank you for subscribing to our Farm Club!");
    } else {
      setFeedback({
        alreadyRedeemed: false,
        message: "Coupon Code Activated: HARVEST10",
      });
      try {
        localStorage.setItem("onaar_active_coupon", "HARVEST10");
      } catch {
        // ignore
      }
      showToast("Welcome! Coupon HARVEST10 activated for 10% off at checkout.");
    }
    setEmail("");
  };

  return (
    <section className="py-14 sm:py-18 bg-[#013e18] text-white w-full font-sans relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#58cf8b_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#7de0a8] text-xs font-bold uppercase tracking-wider border border-white/15">
            <Sparkles className="w-3.5 h-3.5 text-[#58cf8b]" />
            <span>Farm Club • Direct Community</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
            Get 10% Off Your First Pure Harvest Order
          </h2>

          <p className="text-xs sm:text-sm text-[#c3decb] leading-relaxed max-w-xl mx-auto">
            Join over 25,000+ conscious families receiving seasonal harvest updates,
            traditional heirloom recipes, and exclusive community discounts.
          </p>

          {isSubmitted ? (
            <div className="p-4 bg-white/10 border border-[#58cf8b]/40 rounded-2xl max-w-md mx-auto text-center space-y-1 animate-fade-in">
              <div className="flex items-center justify-center gap-2 text-sm font-bold text-[#7de0a8]">
                <Check className="w-4 h-4" />
                <span>
                  {feedback?.alreadyRedeemed
                    ? "Welcome to the Farm Club Community!"
                    : "Coupon Code Activated: HARVEST10"}
                </span>
              </div>
              <p className="text-xs text-[#c3decb]">
                {feedback?.alreadyRedeemed
                  ? "You will receive exclusive seasonal harvest updates and recipes in your inbox. First-order discount was already used on a prior order."
                  : "Apply at checkout for 10% discount on your order."}
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row items-center justify-center gap-2 max-w-md mx-auto pt-2"
            >
              <div className="relative w-full">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5 pointer-events-none" />
                <input
                  type="email"
                  placeholder="Enter your email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white text-gray-900 placeholder-gray-400 text-xs sm:text-sm pl-10 pr-4 py-3 rounded-xl border border-transparent focus:outline-none focus:ring-2 focus:ring-[#58cf8b]"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-2 bg-[#58cf8b] hover:bg-[#46bb77] text-[#013816] font-black text-xs sm:text-sm uppercase tracking-wider px-6 py-3 rounded-xl transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <span>Get 10% Off</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          <div className="pt-2 flex items-center justify-center gap-4 text-[11px] text-[#a9d8ba]">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#58cf8b]" />
              No spam ever
            </span>
            <span>•</span>
            <span>Instant delivery coupon</span>
            <span>•</span>
            <span>Unsubscribe anytime</span>
          </div>
        </div>
      </div>
    </section>
  );
}

