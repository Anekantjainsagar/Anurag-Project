"use client";

import React from "react";
import { Phone, Mail, ShieldCheck, Truck, Sparkles } from "lucide-react";

export default function TopBar() {
  return (
    <div className="w-full bg-[#014d1e] text-[#e3ece7] text-[11px] sm:text-xs py-2 px-4 sm:px-8 lg:px-12 xl:px-16 border-b border-[#015c24] font-sans">
      <div className="w-full flex items-center justify-between gap-3">
        {/* Left: Official Contact Phone & Email */}
        <div className="flex items-center gap-3 sm:gap-5">
          <a
            href="tel:+918769215905"
            className="flex items-center gap-1.5 hover:text-white transition-colors font-medium shrink-0"
          >
            <Phone className="w-3 h-3 text-[#58cf8b] shrink-0" />
            <span>+91-87692 15905</span>
          </a>
          <span className="hidden md:inline text-white/30">|</span>
          <a
            href="mailto:contact@rajlakshmijaviks.com"
            className="hidden sm:flex items-center gap-1.5 hover:text-white transition-colors shrink-0"
          >
            <Mail className="w-3 h-3 text-[#58cf8b] shrink-0" />
            <span>contact@rajlakshmijaviks.com</span>
          </a>
        </div>

        {/* Center: Delivery Announcement (Edge-to-Edge feel) */}
        <div className="hidden lg:flex items-center gap-2 font-semibold text-white/90 tracking-wide text-xs">
          <Truck className="w-3.5 h-3.5 text-[#58cf8b]" />
          <span>FREE PAN-INDIA DELIVERY ON ORDERS OVER ₹499</span>
          <span className="text-[#58cf8b]">•</span>
          <ShieldCheck className="w-3.5 h-3.5 text-[#58cf8b]" />
          <span>FSSAI & NPOP INDIA ORGANIC CERTIFIED</span>
        </div>

        {/* Right: City & Operating Badge */}
        <div className="flex items-center gap-3 shrink-0 text-xs">
          <span className="hidden sm:inline bg-[#023b18] px-2.5 py-0.5 rounded-full border border-white/10 text-white/90 font-medium">
            Indore, MP • Worldwide Export
          </span>
          <a
            href="https://wa.me/918769215905?text=Hello%20Rajlakshmi%20Javiks%20International"
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
