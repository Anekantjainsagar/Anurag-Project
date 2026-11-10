"use client";

import React, { useEffect, useState } from "react";
import { Phone, Mail, Truck } from "lucide-react";
import { api } from "@/services/apiClient";

export default function TopBar() {
  const [tickerText, setTickerText] = useState("FREE PAN-INDIA DELIVERY ON ORDERS OVER ₹499");
  const [phone, setPhone] = useState("+91 98765 43210");
  const [email, setEmail] = useState("support@onaar.com");
  const [whatsappNumber, setWhatsappNumber] = useState("+919876543210");
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    api.settings
      .getSiteSettings()
      .then((res) => {
        if (res?.announcement_bar) {
          if (res.announcement_bar.ticker_text) {
            setTickerText(res.announcement_bar.ticker_text);
          }
          if (res.announcement_bar.whatsapp_number) {
            setWhatsappNumber(res.announcement_bar.whatsapp_number);
          }
          if (typeof res.announcement_bar.is_active === "boolean") {
            setIsActive(res.announcement_bar.is_active);
          }
        } else if (res?.shipping_policy?.free_shipping_threshold) {
          setTickerText(`FREE PAN-INDIA DELIVERY ON ORDERS OVER ₹${res.shipping_policy.free_shipping_threshold}`);
        }

        if (res?.store_details) {
          if (res.store_details.contact_phone) {
            setPhone(res.store_details.contact_phone);
          }
          if (res.store_details.support_email) {
            setEmail(res.store_details.support_email);
          }
        } else if (res?.vendor_info) {
          if (res.vendor_info.phone) setPhone(res.vendor_info.phone);
          if (res.vendor_info.email) setEmail(res.vendor_info.email);
        }
      })
      .catch(() => {});
  }, []);

  const cleanPhone = phone.replace(/[^0-9+]/g, "");
  const cleanWhatsapp = whatsappNumber.replace(/[^0-9]/g, "");

  return (
    <div className="w-full bg-[#014d1e] text-[#e3ece7] text-[11px] sm:text-xs py-2 border-b border-[#015c24] font-sans">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-0 flex items-center justify-between gap-2 sm:gap-4">
        {/* Left: Contact Phone & Email */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          <a
            href={`tel:${cleanPhone}`}
            className="flex items-center gap-1.5 hover:text-white transition-colors font-medium"
          >
            <Phone className="w-3 h-3 text-[#58cf8b] shrink-0" />
            <span>{phone}</span>
          </a>
          <span className="hidden md:inline text-white/30">|</span>
          <a
            href={`mailto:${email}`}
            className="hidden sm:flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <Mail className="w-3 h-3 text-[#58cf8b] shrink-0" />
            <span>{email}</span>
          </a>
        </div>

        {/* Center: Free Delivery Announcement (Dynamic from Admin Settings) */}
        {isActive && (
          <div className="hidden lg:flex items-center gap-2 font-semibold text-white/90 tracking-wide text-xs truncate">
            <Truck className="w-3.5 h-3.5 text-[#58cf8b] shrink-0" />
            <span className="truncate">{tickerText}</span>
          </div>
        )}

        {/* Right: WhatsApp Support */}
        <div className="flex items-center gap-3 shrink-0 text-xs">
          <a
            href={`https://wa.me/${cleanWhatsapp}?text=Hello%20ONAAR%20Support`}
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
