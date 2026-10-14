"use client";

import React from "react";
import { Phone, Mail, Star } from "lucide-react";

export default function TopBar() {
  return (
    <div className="bg-[#033b20] text-[#e3ece7] text-[10.5px] sm:text-[11.5px] py-1.5 px-3 sm:px-6 border-b border-[#054d2a] font-sans">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
        {/* Left: Contact Info */}
        <div className="flex items-center gap-2 sm:gap-4 overflow-hidden">
          <a
            href="tel:+918769215905"
            className="flex items-center gap-1 sm:gap-1.5 hover:text-white transition-colors tracking-wide shrink-0"
          >
            <Phone className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#58cf8b] shrink-0" />
            <span className="truncate">+91-87692 15905</span>
          </a>
          <span className="hidden md:inline text-white/30">|</span>
          <a
            href="mailto:contact@yourbrand.com"
            className="hidden sm:flex items-center gap-1.5 hover:text-white transition-colors tracking-wide shrink-0"
          >
            <Mail className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#58cf8b] shrink-0" />
            <span>contact@yourbrand.com</span>
          </a>
        </div>

        {/* Center: Brand Highlights (Desktop only) */}
        <div className="hidden xl:flex items-center gap-2 font-medium tracking-wider text-[11px] text-[#cfe3d7]">
          <span>PREMIUM QUALITY</span>
          <span className="text-[#58cf8b]">•</span>
          <span>NATURALLY SOURCED</span>
          <span className="text-[#58cf8b]">•</span>
          <span>EXPORT QUALITY</span>
        </div>

        {/* Right: Rating & Social */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <div className="flex items-center gap-1 bg-[#022816] px-2 py-0.5 rounded-full border border-[#06542d]">
            <div className="flex text-[#facc15]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-2 h-2 sm:w-2.5 sm:h-2.5 fill-current" />
              ))}
            </div>
            <span className="font-semibold text-white ml-0.5 text-[10px] sm:text-[11px]">
              4.8/5
            </span>
          </div>

          <span className="hidden sm:inline text-white/30">|</span>

          {/* Social Icons (hidden on very small screens, visible on sm+) */}
          <div className="hidden sm:flex items-center gap-2 text-[#b9d5c4]">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors p-0.5"
              aria-label="Facebook"
            >
              <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors p-0.5"
              aria-label="Instagram"
            >
              <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors p-0.5"
              aria-label="YouTube"
            >
              <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
