"use client";

import React, { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { api } from "@/services/apiClient";
import { sendContactEmail } from "@/services/emailService";
import { X, Send, Building2, CheckCircle2 } from "lucide-react";

export default function BulkEnquiryModal() {
  const { isBulkModalOpen, setIsBulkModalOpen, showToast } = useCart();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    category: "Rice",
    quantity: "1 - 5 Metric Tonnes",
    destination: "",
    notes: "",
  });

  // Lock background scroll and listen for Escape key when modal is open
  useEffect(() => {
    if (isBulkModalOpen) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setIsBulkModalOpen(false);
          setSubmitted(false);
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = prevOverflow;
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isBulkModalOpen, setIsBulkModalOpen]);

  if (!isBulkModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    try {
      await api.inquiries.submitBulkEnquiry({
        name: formData.name,
        company_name: formData.company || null,
        email: formData.email,
        phone: formData.phone,
        category: formData.category,
        quantity: formData.quantity,
        destination: formData.destination || null,
        notes: formData.notes || null,
      });

      sendContactEmail({
        name: `${formData.name} (${formData.company || "Individual"})`,
        email: formData.email,
        phone: formData.phone,
        subject: `B2B Bulk Supply Request: ${formData.category} (${formData.quantity})`,
        message: `Category: ${formData.category}\nQuantity: ${formData.quantity}\nDelivery Destination: ${formData.destination || "Not specified"}\nNotes: ${formData.notes || "None"}`,
      }).catch(() => {});

      showToast("Bulk enquiry captured in admin CRM! Anurag Jain will reach out within 24 hours.");
    } catch (err: any) {
      showToast(err.message || "Bulk enquiry received! Our team will reach out within 24 hours.");
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={() => {
        setIsBulkModalOpen(false);
        setSubmitted(false);
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-xs animate-fade-in font-sans overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl sm:rounded-3xl max-w-xl w-full my-auto overflow-hidden shadow-2xl border border-gray-100 max-h-[92dvh] sm:max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="p-5 bg-[#033b20] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[#58cf8b]">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg leading-tight">
                Bulk & B2B Enquiry
              </h3>
              <p className="text-[11px] text-[#b9dfcb]">
                Direct farm sourcing, contract packaging & global export
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setIsBulkModalOpen(false);
              setSubmitted(false);
            }}
            className="text-white/70 hover:text-white p-1 rounded-full cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 overflow-y-auto">
          {submitted ? (
            <div className="py-10 text-center space-y-3">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-[#044a27] mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-serif text-xl font-bold text-gray-900">
                Enquiry Submitted!
              </h4>
              <p className="text-xs text-gray-600 max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{formData.name}</strong>. Our enterprise sales
                and export division has received your inquiry for{" "}
                <strong>{formData.category}</strong> ({formData.quantity}). We
                will email wholesale quotation and phytosanitary certificates to{" "}
                <strong>{formData.email}</strong> shortly.
              </p>
              <div className="pt-4">
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setIsBulkModalOpen(false);
                  }}
                  className="bg-[#044a27] text-white text-xs font-bold px-6 py-2.5 rounded-full"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                    Contact Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Anurag Sharma"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full bg-[#f8faf9] border border-gray-200 rounded-lg p-2.5 text-gray-900 focus:outline-none focus:border-[#044a27]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                    Company / Organization *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Apex Global Foods Ltd"
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                    className="w-full bg-[#f8faf9] border border-gray-200 rounded-lg p-2.5 text-gray-900 focus:outline-none focus:border-[#044a27]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                    Work Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="contact@company.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full bg-[#f8faf9] border border-gray-200 rounded-lg p-2.5 text-gray-900 focus:outline-none focus:border-[#044a27]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full bg-[#f8faf9] border border-gray-200 rounded-lg p-2.5 text-gray-900 focus:outline-none focus:border-[#044a27]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                    Product Line *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full bg-[#f8faf9] border border-gray-200 rounded-lg p-2.5 text-gray-900 focus:outline-none focus:border-[#044a27]"
                  >
                    <option value="Basmati & Non-Basmati Rice">
                      Basmati & Non-Basmati Rice
                    </option>
                    <option value="Pulses & Lentils (Dals)">
                      Pulses & Lentils (Dals)
                    </option>
                    <option value="Premium Dry Fruits & Nuts">
                      Premium Dry Fruits & Nuts
                    </option>
                    <option value="Millets & Ancient Grains">
                      Millets & Ancient Grains
                    </option>
                    <option value="Seeds & Spices">Seeds & Spices</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                    Expected Volume *
                  </label>
                  <select
                    value={formData.quantity}
                    onChange={(e) =>
                      setFormData({ ...formData, quantity: e.target.value })
                    }
                    className="w-full bg-[#f8faf9] border border-gray-200 rounded-lg p-2.5 text-gray-900 focus:outline-none focus:border-[#044a27]"
                  >
                    <option value="100 Kg - 500 Kg">100 Kg - 500 Kg</option>
                    <option value="500 Kg - 1 Tonne">500 Kg - 1 Tonne</option>
                    <option value="1 - 5 Metric Tonnes">
                      1 - 5 Metric Tonnes
                    </option>
                    <option value="FCL 20ft Container (25 Tonnes)">
                      FCL 20ft Container (25 Tonnes)
                    </option>
                    <option value="Custom Contract Farming">
                      Custom Contract Farming
                    </option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Destination Port / Delivery Location *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Nhava Sheva (Mumbai) / Dubai / London / Domestic Depot"
                  value={formData.destination}
                  onChange={(e) =>
                    setFormData({ ...formData, destination: e.target.value })
                  }
                  className="w-full bg-[#f8faf9] border border-gray-200 rounded-lg p-2.5 text-gray-900 focus:outline-none focus:border-[#044a27]"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Requirements & Specifications
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe your packaging specifications (Jute bag, vacuum pack, retail box), moisture content or certification demands."
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                  className="w-full bg-[#f8faf9] border border-gray-200 rounded-lg p-2.5 text-gray-900 focus:outline-none focus:border-[#044a27]"
                ></textarea>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-[#044a27] hover:bg-[#03391e] text-white py-3 rounded-full font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>REQUEST QUOTE & SPEC SHEET</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
