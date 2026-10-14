"use client";

import React, { useState } from "react";
import BrandLogo from "./BrandLogo";
import { Phone, Mail, MapPin, ChevronRight } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function Footer() {
  const { setIsTrackModalOpen, showToast } = useCart();
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      showToast("Please enter a valid email address");
      return;
    }
    setIsSubscribed(true);
    showToast("Thank you for subscribing to our newsletter!");
    setEmail("");
  };

  return (
    <footer id="contact-info" className="bg-[#02331c] text-[#d1e5db] font-sans">
      {/* Main Footer Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 sm:pt-14 pb-8 sm:pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-7 lg:gap-6">
          {/* Col 1: Brand Info (3 cols) */}
          <div className="sm:col-span-2 lg:col-span-3 space-y-3.5">
            <BrandLogo variant="light" />

            <p className="text-xs text-[#a9cfbe] leading-relaxed pt-1">
              We bring you premium quality Rice, Pulses, Dry Fruits, Millets,
              Spices and more, sourced from trusted farms and delivered with
              purity and care to your table.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-2 pt-1 text-[#d1e5db]">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-7 h-7 rounded-full bg-[#054326] hover:bg-[#075933] flex items-center justify-center transition-colors hover:text-white"
                aria-label="Facebook"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-7 h-7 rounded-full bg-[#054326] hover:bg-[#075933] flex items-center justify-center transition-colors hover:text-white"
                aria-label="Instagram"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-7 h-7 rounded-full bg-[#054326] hover:bg-[#075933] flex items-center justify-center transition-colors hover:text-white"
                aria-label="YouTube"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-7 h-7 rounded-full bg-[#054326] hover:bg-[#075933] flex items-center justify-center transition-colors hover:text-white"
                aria-label="LinkedIn"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2: Contact Info (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif font-bold text-xs sm:text-sm text-white tracking-wide border-b border-[#0b4d2c] pb-2">
              Contact Info
            </h4>

            <div className="space-y-2.5 text-xs text-[#b8d6c7]">
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-full bg-[#054326] flex items-center justify-center text-[#58cf8b] shrink-0 mt-0.5">
                  <Phone className="w-3 h-3" />
                </div>
                <div>
                  <div className="text-[10px] text-[#7eb59a]">Call us at</div>
                  <a
                    href="tel:+918769215905"
                    className="hover:text-white transition-colors font-medium text-white block text-xs"
                  >
                    +91-8769215905, 8769115905
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-full bg-[#054326] flex items-center justify-center text-[#58cf8b] shrink-0 mt-0.5">
                  <Mail className="w-3 h-3" />
                </div>
                <div>
                  <div className="text-[10px] text-[#7eb59a]">Email us at</div>
                  <a
                    href="mailto:contact@yourbrand.com"
                    className="hover:text-white transition-colors font-medium text-white block text-xs"
                  >
                    contact@yourbrand.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-full bg-[#054326] flex items-center justify-center text-[#58cf8b] shrink-0 mt-0.5">
                  <MapPin className="w-3 h-3" />
                </div>
                <div>
                  <div className="text-[10px] text-[#7eb59a]">Our Address</div>
                  <p className="leading-snug text-white font-medium text-xs">
                    11, Manish Bag Colony, Near Vikram Tower, Sapna Sangeeta,
                    Indore - 452001 M. P. INDIA
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Col 3: Our Site (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif font-bold text-xs sm:text-sm text-white tracking-wide border-b border-[#0b4d2c] pb-2">
              Our Site
            </h4>
            <ul className="space-y-1 text-xs text-[#a9cfbe]">
              {[
                { name: "About Us", href: "#" },
                { name: "Certifications", href: "#certifications" },
                {
                  name: "Track Order",
                  action: () => setIsTrackModalOpen(true),
                },
                { name: "FAQs", href: "#" },
                { name: "Lab Report", href: "#certifications" },
                { name: "Blogs", href: "#blogs" },
                { name: "Gallery", href: "#" },
              ].map((link, idx) => (
                <li key={idx}>
                  {link.action ? (
                    <button
                      onClick={link.action}
                      className="flex items-center gap-1 hover:text-white transition-colors group cursor-pointer text-left"
                    >
                      <ChevronRight className="w-2.5 h-2.5 text-[#58cf8b] group-hover:translate-x-0.5 transition-transform" />
                      <span>{link.name}</span>
                    </button>
                  ) : (
                    <a
                      href={link.href}
                      className="flex items-center gap-1 hover:text-white transition-colors group"
                    >
                      <ChevronRight className="w-2.5 h-2.5 text-[#58cf8b] group-hover:translate-x-0.5 transition-transform" />
                      <span>{link.name}</span>
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Categories (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif font-bold text-xs sm:text-sm text-white tracking-wide border-b border-[#0b4d2c] pb-2">
              Categories
            </h4>
            <ul className="space-y-1 text-xs text-[#a9cfbe] uppercase font-semibold">
              {[
                "PULSES",
                "MILLET",
                "RICE & WHEAT",
                "MASALA",
                "DRY FRUITS",
                "SEEDS",
                "OTHER ITEMS",
              ].map((cat, idx) => (
                <li key={idx}>
                  <a
                    href="#categories"
                    className="flex items-center gap-1 hover:text-white transition-colors group"
                  >
                    <ChevronRight className="w-2.5 h-2.5 text-[#58cf8b] group-hover:translate-x-0.5 transition-transform" />
                    <span>{cat}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 5: Newsletter & Payments (2 cols) */}
          <div className="sm:col-span-2 lg:col-span-2 space-y-3">
            <h4 className="font-serif font-bold text-xs sm:text-sm text-white tracking-wide border-b border-[#0b4d2c] pb-2">
              Newsletter
            </h4>

            <p className="text-xs text-[#a9cfbe] leading-relaxed">
              Get latest updates, new arrivals and special offers.
            </p>

            {/* Newsletter Form */}
            <form onSubmit={handleSubscribe} className="space-y-2">
              <input
                type="email"
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white text-gray-900 text-xs px-3 py-2 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#58cf8b]"
              />
              <button
                type="submit"
                className="w-full bg-[#0a4d29] hover:bg-[#0d6134] text-white font-bold text-[11px] uppercase tracking-wider py-2 rounded-lg transition-colors border border-[#1b6b3e] cursor-pointer"
              >
                {isSubscribed ? "SUBSCRIBED ✓" : "SUBSCRIBE"}
              </button>
            </form>

            {/* Secure Payments Row */}
            <div className="pt-1">
              <div className="text-[10px] font-semibold text-[#81bba0] mb-1.5 uppercase tracking-wider">
                Secure Payments
              </div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <div className="bg-white rounded px-1.5 py-0.5 text-[9px] font-black text-[#1a1f71] tracking-tighter">
                  VISA
                </div>
                <div className="bg-white rounded px-1.5 py-0.5 flex items-center">
                  <div className="w-2 h-2 rounded-full bg-[#eb001b] -mr-0.5"></div>
                  <div className="w-2 h-2 rounded-full bg-[#f79e1b] opacity-80"></div>
                </div>
                <div className="bg-white rounded px-1.5 py-0.5 text-[9px] font-black text-[#0f7c41]">
                  UPI
                </div>
                <div className="bg-white rounded px-1.5 py-0.5 text-[9px] font-black text-[#00529b]">
                  RuPay
                </div>
                <div className="bg-white rounded px-1.5 py-0.5 text-[9px] font-black text-[#2e77bb]">
                  AMEX
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sub-footer Bar */}
      <div className="border-t border-[#064223] py-3.5 text-[10.5px] sm:text-[11px] text-[#86b59e] px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2.5 text-center md:text-left">
          <div>© 2026 Your Brand. All Rights Reserved.</div>

          <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-center">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <span>|</span>
            <a href="#" className="hover:text-white transition-colors">
              Terms & Conditions
            </a>
            <span>|</span>
            <a href="#" className="hover:text-white transition-colors">
              Shipping Policy
            </a>
            <span>|</span>
            <a href="#" className="hover:text-white transition-colors">
              Return Policy
            </a>
          </div>

          <div>
            Designed with <span className="text-red-400">❤️</span> for Better
            Food & A Healthier Life.
          </div>
        </div>
      </div>
    </footer>
  );
}
