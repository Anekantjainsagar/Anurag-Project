"use client";

import React, { useState, useEffect } from "react";
import { MessageSquare, RefreshCw, Mail, Phone, Building2, PackageCheck } from "lucide-react";
import { api } from "@/services/apiClient";
import { useCart } from "@/context/CartContext";

export default function AdminInquiriesPage() {
  const { showToast } = useCart();
  const [contactInquiries, setContactInquiries] = useState<any[]>([]);
  const [bulkInquiries, setBulkInquiries] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"retail" | "wholesale">("retail");

  const loadInquiries = async () => {
    setIsLoading(true);
    try {
      const [contacts, bulks] = await Promise.all([
        api.admin.getContactInquiries(),
        api.admin.getBulkEnquiries(),
      ]);
      setContactInquiries(contacts || []);
      setBulkInquiries(bulks || []);
    } catch (err: any) {
      showToast(err.message || "Failed to load customer inquiries");
      setContactInquiries([]);
      setBulkInquiries([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadInquiries();
  }, []);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-sm font-bold text-slate-900 font-serif flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-emerald-700" />
            <span>Customer CRM & Wholesale Inquiries</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Incoming support questions, feedback messages, and bulk/export procurement leads.
          </p>
        </div>
        <button
          onClick={loadInquiries}
          className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors cursor-pointer self-start sm:self-auto"
          title="Refresh Inquiries"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab("retail")}
          className={`px-4 py-2 rounded-xl text-xs font-bold cursor-pointer transition-all flex items-center gap-2 ${
            activeTab === "retail"
              ? "bg-emerald-700 text-white shadow-xs"
              : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          <Mail className="w-3.5 h-3.5" />
          <span>Retail Messages ({contactInquiries.length})</span>
        </button>
        <button
          onClick={() => setActiveTab("wholesale")}
          className={`px-4 py-2 rounded-xl text-xs font-bold cursor-pointer transition-all flex items-center gap-2 ${
            activeTab === "wholesale"
              ? "bg-emerald-700 text-white shadow-xs"
              : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          <Building2 className="w-3.5 h-3.5" />
          <span>Wholesale & Export Leads ({bulkInquiries.length})</span>
        </button>
      </div>

      {isLoading ? (
        <div className="py-20 text-center text-slate-400 text-xs">
          <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-emerald-600" />
          Loading customer communications...
        </div>
      ) : activeTab === "retail" ? (
        /* Contact Messages List */
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
          <h3 className="text-sm font-bold text-slate-900">Retail Support & Feedback Messages</h3>
          <div className="divide-y divide-slate-100">
            {contactInquiries.length === 0 ? (
              <div className="py-12 text-center text-xs text-slate-400">
                No retail contact messages received yet.
              </div>
            ) : (
              contactInquiries.map((ci) => (
                <div key={ci.id} className="py-4 space-y-2 text-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <strong className="text-slate-900 font-bold text-sm">
                      {ci.name}
                      <span className="text-slate-500 font-normal ml-2">({ci.email})</span>
                    </strong>
                    <div className="flex items-center gap-3 text-slate-400 font-mono text-[11px]">
                      {ci.phone && (
                        <a href={`tel:${ci.phone}`} className="hover:text-emerald-700 flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          <span>{ci.phone}</span>
                        </a>
                      )}
                      <span>
                        {ci.created_at ? new Date(ci.created_at).toLocaleDateString("en-IN") : "Recent"}
                      </span>
                    </div>
                  </div>
                  {ci.subject && (
                    <div className="text-emerald-700 font-bold text-xs">{ci.subject}</div>
                  )}
                  <p className="text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100 leading-relaxed">
                    {ci.message}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      ) : (
        /* Wholesale B2B Enquiries List */
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
          <h3 className="text-sm font-bold text-slate-900">Wholesale & Export Commercial Inquiries</h3>
          <div className="divide-y divide-slate-100">
            {bulkInquiries.length === 0 ? (
              <div className="py-12 text-center text-xs text-slate-400">
                No wholesale or institutional inquiries recorded yet.
              </div>
            ) : (
              bulkInquiries.map((bi) => (
                <div key={bi.id} className="py-4 space-y-2 text-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div className="flex items-center gap-2">
                      <strong className="text-slate-900 font-bold text-sm">{bi.name}</strong>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                        {bi.business_type || "Commercial Buyer"}
                      </span>
                    </div>
                    <span className="font-mono text-emerald-700 font-bold text-xs flex items-center gap-1">
                      <PackageCheck className="w-3.5 h-3.5" />
                      <span>Volume: {bi.quantity_needed || "Bulk lot"}</span>
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-slate-500 font-mono text-[11px]">
                    {bi.email && (
                      <a href={`mailto:${bi.email}`} className="hover:text-emerald-700 flex items-center gap-1">
                        <Mail className="w-3 h-3 text-slate-400" />
                        <span>{bi.email}</span>
                      </a>
                    )}
                    {bi.phone && (
                      <a href={`tel:${bi.phone}`} className="hover:text-emerald-700 flex items-center gap-1">
                        <Phone className="w-3 h-3 text-slate-400" />
                        <span>{bi.phone}</span>
                      </a>
                    )}
                    {bi.created_at && (
                      <span className="text-slate-400">
                        {new Date(bi.created_at).toLocaleDateString("en-IN")}
                      </span>
                    )}
                  </div>
                  <p className="text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100 leading-relaxed">
                    {bi.message || "Requested wholesale pricing & harvest batch COA."}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
