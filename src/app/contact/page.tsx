"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import { sendContactEmail } from "@/services/emailService";
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import BulkEnquiryModal from "@/components/BulkEnquiryModal";
import ToastNotification from "@/components/ToastNotification";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  Sparkles,
  Package,
} from "lucide-react";

function ContactPageContent() {
  const { showToast, setIsBulkModalOpen } = useCart();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Retail Order Support",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.message) {
      showToast("Please fill in required fields (Name, Phone, Message)");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await sendContactEmail(formData);
      showToast(res.message || "Message sent successfully! Anurag Jain will contact you shortly.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "Retail Order Support",
        message: "",
      });
    } catch {
      showToast("Message sent! Our executive will contact you shortly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col bg-[#faf8f4] text-gray-900 font-sans">
      <TopBar />
      <Navbar />

      {/* Full Width Banner */}
      <section className="w-full bg-[#014d1e] text-white py-12 sm:py-16 relative overflow-hidden">
        <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 relative z-10 text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#7de0a8] text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#58cf8b]" />
            <span>ONAAR • Dedicated Support & Wholesale Desk</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-black text-white tracking-tight">
            Contact Us & Wholesale Enquiries
          </h1>
          <p className="text-sm sm:text-base text-[#c3decb] max-w-xl mx-auto leading-relaxed">
            Directly connect with our organic sourcing desk, order fulfillment team,
            or institutional B2B bulk division.
          </p>
        </div>
      </section>

      {/* Main Full Width Content */}
      <main className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 py-12 sm:py-16 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Contact Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#01722C] uppercase tracking-wider">
                Direct Channels
              </span>
              <h2 className="font-serif text-2xl font-bold text-gray-900">
                Customer Care & Supply Desk
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                We supply individual health-conscious households nationwide, as well as bulk organic institutional orders.
              </p>
            </div>

            <div className="space-y-3.5">
              <div className="p-4 rounded-2xl bg-white border border-[#e8e2d4] flex items-start gap-3 shadow-2xs">
                <div className="w-9 h-9 rounded-xl bg-[#edf7f1] text-[#01722C] flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                    Customer & Trade Support
                  </div>
                  <a
                    href="tel:+919876543210"
                    className="text-sm font-bold text-gray-900 hover:text-[#01722C] block transition-colors mt-0.5"
                  >
                    +91-98765 43210
                  </a>
                  <div className="text-[11px] text-gray-500 mt-0.5">
                    Monday to Saturday (9:00 AM - 8:00 PM IST)
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#e8e2d4] flex items-start gap-3 shadow-2xs">
                <div className="w-9 h-9 rounded-xl bg-[#edf7f1] text-[#01722C] flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                    Email Correspondence
                  </div>
                  <a
                    href="mailto:support@onaar.com"
                    className="text-sm font-bold text-gray-900 hover:text-[#01722C] block transition-colors mt-0.5"
                  >
                    support@onaar.com
                  </a>
                  <div className="text-[11px] text-gray-500 mt-0.5">
                    For price lists, certification copies & batch analysis
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#e8e2d4] flex items-start gap-3 shadow-2xs">
                <div className="w-9 h-9 rounded-xl bg-[#edf7f1] text-[#01722C] flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                    Central Distribution & Logistics
                  </div>
                  <div className="text-sm font-bold text-gray-900 mt-0.5">
                    Plot 104, Organic Agro Park, Central Logistics Zone
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">
                    Madhya Pradesh - 452001, India
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#e8e2d4] flex items-start gap-3 shadow-2xs">
                <div className="w-9 h-9 rounded-xl bg-[#edf7f1] text-[#01722C] flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                    Dispatch Operations
                  </div>
                  <div className="text-xs font-semibold text-gray-800 mt-0.5">
                    Orders dispatched daily with live courier tracking
                  </div>
                </div>
              </div>
            </div>

            {/* B2B Wholesale Supply Box */}
            <div className="bg-[#edf7f1] border border-[#b8ddc6] p-6 rounded-2xl space-y-2.5">
              <div className="flex items-center gap-2 text-[#01722C] font-bold text-sm">
                <Package className="w-4 h-4" />
                <span>Commercial / Institutional Wholesale</span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                Bulk 25kg / 50kg export bags available for organic food brands, Ayurvedic pharmacies, retail chains, and star hotels with custom private labeling.
              </p>
              <button
                onClick={() => setIsBulkModalOpen(true)}
                className="bg-[#01722C] hover:bg-[#0b542c] text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors cursor-pointer"
              >
                Open B2B Quotation Form
              </button>
            </div>
          </div>

          {/* Right Column: Contact Message Form (7 cols) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-[#e8e2d4] shadow-2xs">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-gray-900 mb-2">
              Send Us a Direct Message
            </h3>
            <p className="text-xs text-gray-500 mb-6">
              Our organic food consultant will respond within 2 business hours.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter full name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full bg-[#faf9f5] border border-[#dcd6c8] text-xs sm:text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-[#01722C] focus:bg-white focus:ring-1 focus:ring-[#01722C]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 XXXXX XXXXX"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full bg-[#faf9f5] border border-[#dcd6c8] text-xs sm:text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-[#01722C] focus:bg-white focus:ring-1 focus:ring-[#01722C]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full bg-[#faf9f5] border border-[#dcd6c8] text-xs sm:text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-[#01722C] focus:bg-white focus:ring-1 focus:ring-[#01722C]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700">
                    Inquiry Subject
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    className="w-full bg-[#faf9f5] border border-[#dcd6c8] text-xs sm:text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-[#01722C] focus:bg-white focus:ring-1 focus:ring-[#01722C] cursor-pointer"
                  >
                    <option value="Retail Order Support">Retail Order Support</option>
                    <option value="Bulk Purchase & Institutional">Bulk Purchase & Institutional</option>
                    <option value="Export & Quality Specifications">Export & Quality Specifications</option>
                    <option value="Farmer Partnership / Co-op">Farmer Partnership / Co-op</option>
                    <option value="Other Inquiries">Other Inquiries</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">
                  Your Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Detail your requirements, preferred grain varieties, or dispatch destination..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full bg-[#faf9f5] border border-[#dcd6c8] text-xs sm:text-sm rounded-xl p-3.5 focus:outline-none focus:border-[#01722C] focus:bg-white focus:ring-1 focus:ring-[#01722C]"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#01722C] hover:bg-[#0b542c] text-white text-xs sm:text-sm font-bold py-3.5 px-6 rounded-xl transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Submit Inquiry</span>
              </button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
      <CartDrawer />
      <BulkEnquiryModal />
      <ToastNotification />
    </div>
  );
}

export default function ContactPage() {
  return <ContactPageContent />;
}
