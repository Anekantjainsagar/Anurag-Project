"use client";

import React from "react";
import { Phone, Mail, ShieldCheck, Truck, Sparkles } from "lucide-react";

export default function TopBar() {
  return (
    <div className="w-full bg-[#014d1e] text-[#e3ece7] text-[11px] sm:text-xs py-2 border-b border-[#015c24] font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Left: Contact Phone & Email */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          <a
            href="tel:+919876543210"
            className="flex items-center gap-1.5 hover:text-white transition-colors font-medium"
          >
            <Phone className="w-3 h-3 text-[#58cf8b] shrink-0" />
            <span>+91-98765 43210</span>
          </a>
          <span className="hidden md:inline text-white/30">|</span>
          <a
            href="mailto:support@onaar.com"
            className="hidden sm:flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <Mail className="w-3 h-3 text-[#58cf8b] shrink-0" />
            <span>support@onaar.com</span>
          </a>
        </div>

        {/* Center: Free Delivery Announcement */}
        <div className="hidden lg:flex items-center gap-2 font-semibold text-white/90 tracking-wide text-xs truncate">
          <Truck className="w-3.5 h-3.5 text-[#58cf8b] shrink-0" />
          <span className="truncate">FREE PAN-INDIA DELIVERY ON ORDERS OVER ₹499</span>
        </div>

        {/* Right: WhatsApp Support */}
        <div className="flex items-center gap-3 shrink-0 text-xs">
          <a
            href="https://wa.me/919876543210?text=Hello%20ONAAR%20Support"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-[#58cf8b] hover:text-white font-bold transition-colors"
          >
            <span>WhatsApp Support</span>
          </a>
        </div>
      </div>
    </div>
  );
}
