"use client";

import React, { useState } from "react";
import { Mail, ArrowRight, CheckCircle2 } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail("");
      setTimeout(() => setSubmitted(false), 4000);
    }
  };

  return (
    <section className="py-12 sm:py-16 bg-[#013816] w-full font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center space-y-5">
          <div className="w-14 h-14 rounded-2xl bg-[#58cf8b]/20 flex items-center justify-center mx-auto">
            <Mail className="w-7 h-7 text-[#7de0a8]" />
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
            Get Organic Deals & Health Tips
          </h2>

          <p className="text-xs sm:text-sm text-[#a9cfbe] leading-relaxed max-w-lg mx-auto">
            Join 8,000+ health-conscious families. Get exclusive offers, seasonal harvest updates,
            and Ayurvedic nutrition tips delivered to your inbox.
          </p>

          {submitted ? (
            <div className="flex items-center justify-center gap-2 text-[#58cf8b] font-bold text-sm py-3">
              <CheckCircle2 className="w-5 h-5" />
              <span>Thank you! You&apos;re now on the list.</span>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto pt-2"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="flex-1 w-full bg-white/10 border border-white/20 text-white placeholder-[#a9cfbe] text-xs sm:text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-[#58cf8b] focus:bg-white/15 transition-all"
              />
              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#58cf8b] hover:bg-[#46bb77] text-[#013816] text-xs sm:text-sm font-extrabold uppercase tracking-wider px-6 py-3 rounded-xl transition-all shadow-md active:scale-98 cursor-pointer"
              >
                <span>Subscribe</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          <p className="text-[10px] text-[#6b9f7e]">
            No spam ever. Unsubscribe anytime. We respect your privacy.
          </p>
        </div>
      </div>
    </section>
  );
}
