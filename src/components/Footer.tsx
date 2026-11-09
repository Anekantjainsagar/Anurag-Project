"use client";

import React, { useState } from "react";
import Link from "next/link";
import BrandLogo from "./BrandLogo";
import { Phone, Mail, MapPin, ChevronRight, ShieldCheck, Heart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { CATEGORIES } from "@/data/mockData";

export default function Footer() {
  const { showToast } = useCart();
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      showToast("Please enter a valid email address");
      return;
    }
    setIsSubscribed(true);
    showToast("Thank you for subscribing to ONAAR updates!");
    setEmail("");
  };

  return (
    <footer id="contact-info" className="w-full bg-[#013816] text-[#d1e5db] font-sans border-t border-[#014d1f]">
      {/* Centered Responsive Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-10 sm:pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Col 1: Brand Info (3.5 cols) */}
          <div className="sm:col-span-2 lg:col-span-3 space-y-4">
            <Link href="/" className="inline-block">
              <BrandLogo variant="light" size="lg" />
            </Link>

            <p className="text-xs text-[#a9cfbe] leading-relaxed">
              ONAAR is dedicated to bringing 100% certified organic, pure,
              unadulterated farm staples to households across India. Hand-harvested,
              pesticide-free, and ethically cultivated directly with farmer collectives.
            </p>

            {/* Certifications Mini Badges */}
            <div className="pt-1 flex items-center gap-2 flex-wrap text-[11px] text-[#86caa3]">
              <span className="bg-[#024a1e] px-2.5 py-1 rounded-md border border-[#046128]">
                FSSAI Certified
              </span>
              <span className="bg-[#024a1e] px-2.5 py-1 rounded-md border border-[#046128]">
                NPOP India Organic
              </span>
              <span className="bg-[#024a1e] px-2.5 py-1 rounded-md border border-[#046128]">
                Jaivik Bharat
              </span>
            </div>
          </div>

          {/* Col 2: Contact Info (3 cols) */}
          <div className="lg:col-span-3 space-y-3.5">
            <h4 className="font-serif font-bold text-sm text-white tracking-wide border-b border-[#055724] pb-2">
              Customer Support & Enquiries
            </h4>

            <div className="space-y-3 text-xs text-[#b8d6c7]">
              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-xl bg-[#024a1e] flex items-center justify-center text-[#58cf8b] shrink-0 mt-0.5">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-[10.5px] text-[#7eb59a] font-medium">Helpline & WhatsApp</div>
                  <a
                    href="tel:+919876543210"
                    className="hover:text-white transition-colors font-bold text-white block text-xs mt-0.5"
                  >
                    +91-98765 43210
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-xl bg-[#024a1e] flex items-center justify-center text-[#58cf8b] shrink-0 mt-0.5">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-[10.5px] text-[#7eb59a] font-medium">Customer Support Email</div>
                  <a
                    href="mailto:support@onaar.com"
                    className="hover:text-white transition-colors font-bold text-white block text-xs mt-0.5"
                  >
                    support@onaar.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-xl bg-[#024a1e] flex items-center justify-center text-[#58cf8b] shrink-0 mt-0.5">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-[10.5px] text-[#7eb59a] font-medium">Central Office & Logistics Hub</div>
                  <p className="leading-snug text-white font-medium text-xs mt-0.5">
                    Plot 104, Organic Agro Park, Central Logistics Zone,
                    Madhya Pradesh - 452001, INDIA
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Col 3: Quick Navigation (2 cols) */}
          <div className="lg:col-span-2 space-y-3.5">
            <h4 className="font-serif font-bold text-sm text-white tracking-wide border-b border-[#055724] pb-2">
              E-Commerce Pages
            </h4>
            <ul className="space-y-1.5 text-xs text-[#a9cfbe]">
              {[
                { name: "Home", href: "/" },
                { name: "All Products (192)", href: "/products" },
                { name: "My Saved Wishlist", href: "/wishlist" },
                { name: "Checkout", href: "/checkout" },
                { name: "Our Heritage & Standards", href: "/about" },
                { name: "Health & Nutrition Journal", href: "/blog" },
                { name: "Contact & Wholesale Supply", href: "/contact" },
              ].map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-1 hover:text-white transition-colors group"
                  >
                    <ChevronRight className="w-3 h-3 text-[#58cf8b] group-hover:translate-x-1 transition-transform" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Categories (2 cols) */}
          <div className="lg:col-span-2 space-y-3.5">
            <h4 className="font-serif font-bold text-sm text-white tracking-wide border-b border-[#055724] pb-2">
              Categories
            </h4>
            <ul className="space-y-1.5 text-xs text-[#a9cfbe] uppercase font-semibold">
              {CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/products?category=${encodeURIComponent(cat.name)}`}
                    className="flex items-center gap-1 hover:text-white transition-colors group"
                  >
                    <ChevronRight className="w-3 h-3 text-[#58cf8b] group-hover:translate-x-1 transition-transform" />
                    <span>{cat.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 5: Newsletter & Security (2 cols) */}
          <div className="sm:col-span-2 lg:col-span-2 space-y-3.5">
            <h4 className="font-serif font-bold text-sm text-white tracking-wide border-b border-[#055724] pb-2">
              Newsletter
            </h4>

            <p className="text-xs text-[#a9cfbe] leading-relaxed">
              Subscribe for harvest alerts, organic health tips, and festive discounts.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <input
                type="email"
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white text-gray-900 text-xs px-3.5 py-2.5 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#58cf8b]"
              />
              <button
                type="submit"
                className="w-full bg-[#01722C] hover:bg-[#0b542c] text-white font-bold text-xs uppercase tracking-wider py-2.5 rounded-xl transition-colors border border-[#056128] cursor-pointer"
              >
                {isSubscribed ? "SUBSCRIBED ✓" : "SUBSCRIBE"}
              </button>
            </form>

            <div className="pt-2 text-[11px] text-[#86caa3] flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#58cf8b]" />
              <span>256-Bit SSL Encrypted Checkout</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sub-Footer */}
      <div className="border-t border-[#014d1f] py-4 text-xs text-[#86b59e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
          <div>
            Copyright 2026 © <strong>ONAAR</strong>. All Rights Reserved.
          </div>

          <div className="flex items-center gap-3 flex-wrap justify-center text-xs">
            <Link href="/about" className="hover:text-white transition-colors">
              About Us
            </Link>
            <span>|</span>
            <Link href="/products" className="hover:text-white transition-colors">
              Organic Catalogue
            </Link>
            <span>|</span>
            <Link href="/blog" className="hover:text-white transition-colors">
              Health Journal
            </Link>
            <span>|</span>
            <Link href="/contact" className="hover:text-white transition-colors">
              B2B & Contact
            </Link>
          </div>

          <div>
            100% Certified Organic Food Products • India
          </div>
        </div>
      </div>
    </footer>
  );
}
