"use client";

import React, { useState } from "react";
import { CartProvider, useCart } from "@/context/CartContext";
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import BulkEnquiryModal from "@/components/BulkEnquiryModal";
import LoginModal from "@/components/LoginModal";
import ToastNotification from "@/components/ToastNotification";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  Sparkles,
  Package,
  CheckCircle2,
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
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.message) {
      showToast("Please fill in required fields (Name, Phone, Message)");
      return;
    }
    setIsSubmitted(true);
    showToast("Message sent successfully! Our executive will contact you shortly.");
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "Retail Order Support",
      message: "",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900 font-sans">
      <TopBar />
      <Navbar />

      {/* Banner */}
      <section className="bg-gradient-to-b from-[#033b20] to-[#044a27] text-white py-12 sm:py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#58cf8b_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#7de0a8] text-xs font-semibold backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#58cf8b]" />
            <span>Dedicated Customer Care & Wholesale Trade</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-black text-white tracking-tight">
            Get in Touch With Our Team
          </h1>
          <p className="text-sm sm:text-base text-[#c3decb] max-w-xl mx-auto leading-relaxed">
            Have questions about grain varieties, custom weight packaging, or
            institutional supply? We are here to help.
          </p>
        </div>
      </section>

      {/* Main Content Form & Contact Cards */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-12 flex-1 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Contact Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#044a27] uppercase tracking-wider">
                Direct Channels
              </span>
              <h2 className="font-serif text-2xl font-bold text-gray-900">
                Reach Our Agro Headquarters
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                Connect directly with our sourcing desk, order fulfillment team,
                or wholesale export department.
              </p>
            </div>

            <div className="space-y-3.5">
              <div className="p-4 rounded-2xl bg-[#faf9f5] border border-[#e8e2d4] flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#edf7f1] text-[#044a27] flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                    Customer Support
                  </div>
                  <a
                    href="tel:+918769215905"
                    className="text-sm font-bold text-gray-900 hover:text-[#044a27] block transition-colors"
                  >
                    +91-8769215905 / 8769115905
                  </a>
                  <div className="text-[11px] text-gray-500 mt-0.5">
                    Toll-free customer guidance & order assistance
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#faf9f5] border border-[#e8e2d4] flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#edf7f1] text-[#044a27] flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                    Email Correspondence
                  </div>
                  <a
                    href="mailto:contact@yourbrand.com"
                    className="text-sm font-bold text-gray-900 hover:text-[#044a27] block transition-colors"
                  >
                    contact@yourbrand.com
                  </a>
                  <div className="text-[11px] text-gray-500 mt-0.5">
                    For general inquiries & lab test report requests
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#faf9f5] border border-[#e8e2d4] flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#edf7f1] text-[#044a27] flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                    Corporate & Logistics Center
                  </div>
                  <p className="text-xs font-semibold text-gray-800 leading-snug">
                    11, Manish Bag Colony, Near Vikram Tower, Sapna Sangeeta,
                    Indore - 452001 M. P. INDIA
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#faf9f5] border border-[#e8e2d4] flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#edf7f1] text-[#044a27] flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                    Operational Hours
                  </div>
                  <div className="text-xs font-semibold text-gray-800">
                    Monday - Saturday: 9:00 AM - 8:00 PM IST
                  </div>
                  <div className="text-[11px] text-gray-500 mt-0.5">
                    Sunday: Closed (Farm maintenance day)
                  </div>
                </div>
              </div>
            </div>

            {/* Bulk Order Banner */}
            <div className="bg-[#edf7f1] border border-[#b8ddc6] p-5 rounded-2xl space-y-2">
              <div className="flex items-center gap-2 text-[#044a27] font-bold text-sm">
                <Package className="w-4 h-4" />
                <span>Looking for Commercial / Wholesale Supply?</span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                We supply bulk container loads of unpolished pulses, aged basmati
                rice, and cold-pressed spices to hotels, restaurants, and retail
                chains across India and worldwide.
              </p>
              <button
                onClick={() => setIsBulkModalOpen(true)}
                className="bg-[#044a27] hover:bg-[#03391e] text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors cursor-pointer"
              >
                Open Bulk Enquiry Form
              </button>
            </div>
          </div>

          {/* Right Column: Contact Message Form (7 cols) */}
          <div className="lg:col-span-7 bg-[#faf9f5] p-6 sm:p-8 rounded-3xl border border-[#e8e2d4] shadow-2xs">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-gray-900 mb-2">
              Send Us a Direct Message
            </h3>
            <p className="text-xs text-gray-500 mb-6">
              Fill in your details below and an agricultural specialist will reply within 2 business hours.
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
                    className="w-full bg-white border border-[#dcd6c8] text-xs sm:text-sm rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#044a27] focus:ring-1 focus:ring-[#044a27]"
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
                    className="w-full bg-white border border-[#dcd6c8] text-xs sm:text-sm rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#044a27] focus:ring-1 focus:ring-[#044a27]"
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
                    className="w-full bg-white border border-[#dcd6c8] text-xs sm:text-sm rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#044a27] focus:ring-1 focus:ring-[#044a27]"
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
                    className="w-full bg-white border border-[#dcd6c8] text-xs sm:text-sm rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#044a27] focus:ring-1 focus:ring-[#044a27] cursor-pointer"
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
                  placeholder="Tell us what products you need, quantities, or questions..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full bg-white border border-[#dcd6c8] text-xs sm:text-sm rounded-xl p-3.5 focus:outline-none focus:border-[#044a27] focus:ring-1 focus:ring-[#044a27]"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#044a27] hover:bg-[#03391e] text-white text-xs sm:text-sm font-bold py-3 px-6 rounded-xl transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer"
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
      <LoginModal />
      <ToastNotification />
    </div>
  );
}

export default function ContactPage() {
  return (
    <CartProvider>
      <ContactPageContent />
    </CartProvider>
  );
}
