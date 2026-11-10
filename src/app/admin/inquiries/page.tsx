"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  MessageSquare,
  RefreshCw,
  Mail,
  Phone,
  Building2,
  PackageCheck,
  Search,
  Download,
  Copy,
  Trash2,
  CheckCircle2,
  Clock,
  Sparkles,
  Tag,
  Calendar,
  MapPin,
  ExternalLink,
  X,
  Eye,
} from "lucide-react";
import { api } from "@/services/apiClient";
import { useCart } from "@/context/CartContext";
import { useConfirm } from "@/context/ConfirmContext";

type TabType = "retail" | "wholesale" | "newsletter";

export default function AdminInquiriesPage() {
  const { showToast } = useCart();
  const { confirm } = useConfirm();
  const [activeTab, setActiveTab] = useState<TabType>("retail");
  const [isLoading, setIsLoading] = useState(true);

  // Data states
  const [contactInquiries, setContactInquiries] = useState<any[]>([]);
  const [bulkInquiries, setBulkInquiries] = useState<any[]>([]);
  const [newsletterSubscribers, setNewsletterSubscribers] = useState<any[]>([]);

  // Search & Filter
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  // Notes editing state
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null);
  const [notesDraft, setNotesDraft] = useState("");
  const [isSavingNotes, setIsSavingNotes] = useState(false);

  // Inspection & Action Modals (One click row/action view)
  const [selectedContact, setSelectedContact] = useState<any | null>(null);
  const [selectedBulk, setSelectedBulk] = useState<any | null>(null);

  const openContactModal = (ci: any) => {
    setSelectedContact(ci);
    setNotesDraft(ci.vendor_notes || "");
  };

  const openBulkModal = (bi: any) => {
    setSelectedBulk(bi);
    setNotesDraft(bi.vendor_notes || "");
  };

  const loadAll = async () => {
    setIsLoading(true);
    try {
      const [contacts, bulks, newsletters] = await Promise.all([
        api.admin.getContactInquiries(),
        api.admin.getBulkEnquiries(),
        api.admin.getNewsletterSubscribers(),
      ]);
      setContactInquiries(contacts || []);
      setBulkInquiries(bulks || []);
      setNewsletterSubscribers(newsletters || []);
    } catch (err: any) {
      showToast(err.message || "Failed to load inquiries and subscribers");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAll();
  }, []);

  // Update Status for Contact Inquiry
  const handleUpdateContactStatus = async (id: string, newStatus: string) => {
    try {
      const updated = await api.admin.updateContactInquiryStatus(id, newStatus);
      setContactInquiries((prev) =>
        prev.map((c) => (c.id === id ? { ...c, status: updated.status } : c))
      );
      setSelectedContact((prev: any) => (prev?.id === id ? { ...prev, status: updated.status } : prev));
      showToast(`Inquiry marked as ${newStatus}`);
    } catch (err: any) {
      showToast(err.message || "Failed to update status");
    }
  };

  // Delete Contact Inquiry
  const handleDeleteContact = async (id: string) => {
    const isConfirmed = await confirm({
      title: "Delete Contact Message",
      message: "Are you sure you want to delete this contact message?",
      confirmText: "Delete Message",
      cancelText: "Cancel",
      variant: "danger",
    });
    if (!isConfirmed) return;

    try {
      await api.admin.deleteContactInquiry(id);
      setContactInquiries((prev) => prev.filter((c) => c.id !== id));
      if (selectedContact?.id === id) {
        setSelectedContact(null);
      }
      showToast("Contact inquiry deleted");
    } catch (err: any) {
      showToast(err.message || "Failed to delete inquiry");
    }
  };

  // Update Status for Bulk Enquiry
  const handleUpdateBulkStatus = async (id: string, newStatus: string) => {
    try {
      const updated = await api.admin.updateBulkEnquiryStatus(id, newStatus);
      setBulkInquiries((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status: updated.status } : b))
      );
      setSelectedBulk((prev: any) => (prev?.id === id ? { ...prev, status: updated.status } : prev));
      showToast(`Wholesale lead marked as ${newStatus}`);
    } catch (err: any) {
      showToast(err.message || "Failed to update status");
    }
  };

  // Delete Bulk Enquiry
  const handleDeleteBulk = async (id: string) => {
    const isConfirmed = await confirm({
      title: "Delete Wholesale Lead",
      message: "Are you sure you want to delete this wholesale lead?",
      confirmText: "Delete Lead",
      cancelText: "Cancel",
      variant: "danger",
    });
    if (!isConfirmed) return;

    try {
      await api.admin.deleteBulkEnquiry(id);
      setBulkInquiries((prev) => prev.filter((b) => b.id !== id));
      if (selectedBulk?.id === id) {
        setSelectedBulk(null);
      }
      showToast("Wholesale enquiry deleted");
    } catch (err: any) {
      showToast(err.message || "Failed to delete enquiry");
    }
  };

  // Save Vendor Notes
  const handleSaveNotes = async (type: "contact" | "bulk", id: string) => {
    setIsSavingNotes(true);
    try {
      if (type === "contact") {
        const item = contactInquiries.find((c) => c.id === id);
        const updated = await api.admin.updateContactInquiryStatus(id, item?.status || "NEW", notesDraft);
        setContactInquiries((prev) =>
          prev.map((c) => (c.id === id ? { ...c, vendor_notes: updated.vendor_notes } : c))
        );
        setSelectedContact((prev: any) => (prev?.id === id ? { ...prev, vendor_notes: updated.vendor_notes } : prev));
      } else {
        const item = bulkInquiries.find((b) => b.id === id);
        const updated = await api.admin.updateBulkEnquiryStatus(id, item?.status || "NEW", notesDraft);
        setBulkInquiries((prev) =>
          prev.map((b) => (b.id === id ? { ...b, vendor_notes: updated.vendor_notes } : b))
        );
        setSelectedBulk((prev: any) => (prev?.id === id ? { ...prev, vendor_notes: updated.vendor_notes } : prev));
      }
      showToast("Vendor notes saved");
      setEditingNotesId(null);
    } catch (err: any) {
      showToast(err.message || "Failed to save notes");
    } finally {
      setIsSavingNotes(false);
    }
  };

  // Toggle Newsletter Subscriber Status
  const handleToggleSubscriber = async (id: string, currentActive: boolean) => {
    try {
      const updated = await api.admin.updateNewsletterSubscriber(id, !currentActive);
      setNewsletterSubscribers((prev) =>
        prev.map((s) => (s.id === id ? { ...s, is_active: updated.is_active } : s))
      );
      showToast(`Subscriber marked as ${!currentActive ? "Active" : "Inactive"}`);
    } catch (err: any) {
      showToast(err.message || "Failed to toggle status");
    }
  };

  // Delete Newsletter Subscriber
  const handleDeleteSubscriber = async (id: string) => {
    const isConfirmed = await confirm({
      title: "Remove Newsletter Subscriber",
      message: "Are you sure you want to remove this newsletter subscriber?",
      confirmText: "Remove Subscriber",
      cancelText: "Cancel",
      variant: "danger",
    });
    if (!isConfirmed) return;

    try {
      await api.admin.deleteNewsletterSubscriber(id);
      setNewsletterSubscribers((prev) => prev.filter((s) => s.id !== id));
      showToast("Subscriber removed");
    } catch (err: any) {
      showToast(err.message || "Failed to delete subscriber");
    }
  };

  // Copy All Newsletter Emails to Clipboard
  const handleCopyEmails = () => {
    const emails = filteredSubscribers.map((s) => s.email).join(", ");
    if (!emails) {
      showToast("No emails to copy");
      return;
    }
    navigator.clipboard.writeText(emails);
    showToast(`Copied ${filteredSubscribers.length} email addresses to clipboard!`);
  };

  // Export Newsletter Subscribers to CSV
  const handleExportCSV = () => {
    if (filteredSubscribers.length === 0) {
      showToast("No subscribers to export");
      return;
    }
    const header = "Email,Coupon Code,Status,Subscribed Date\n";
    const rows = filteredSubscribers
      .map(
        (s) =>
          `"${s.email}","${s.coupon_code || "HARVEST10"}","${s.is_active ? "Active" : "Inactive"}","${
            s.subscribed_at ? new Date(s.subscribed_at).toISOString() : ""
          }"`
      )
      .join("\n");
    const blob = new Blob([header + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `onaar_newsletter_subscribers_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Newsletter CSV export downloaded successfully!");
  };

  // Filtered Lists
  const filteredContacts = useMemo(() => {
    return contactInquiries.filter((c) => {
      const matchesSearch =
        !searchTerm ||
        c.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.phone?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.message?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "ALL" || c.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [contactInquiries, searchTerm, statusFilter]);

  const filteredBulks = useMemo(() => {
    return bulkInquiries.filter((b) => {
      const matchesSearch =
        !searchTerm ||
        b.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.company_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.phone?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.destination?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.notes?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "ALL" || b.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [bulkInquiries, searchTerm, statusFilter]);

  const filteredSubscribers = useMemo(() => {
    return newsletterSubscribers.filter((s) => {
      const matchesSearch =
        !searchTerm || s.email?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "ALL" ||
        (statusFilter === "ACTIVE" && s.is_active) ||
        (statusFilter === "INACTIVE" && !s.is_active);
      return matchesSearch && matchesStatus;
    });
  }, [newsletterSubscribers, searchTerm, statusFilter]);

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Top Banner Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-sm font-bold text-slate-900 font-serif flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-emerald-700" />
            <span>Communications, Leads CRM & Farm Club Subscribers</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time capture of retail support tickets, B2B wholesale enquiries, and 10% off Farm Club newsletter subscriptions.
          </p>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={loadAll}
            className="px-3 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
            title="Refresh All Data"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin text-emerald-700" : ""}`} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Metric Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Retail Support Messages
            </div>
            <div className="text-2xl font-black text-slate-900 mt-1 font-serif">
              {contactInquiries.length}
            </div>
            <div className="text-[11px] text-emerald-700 font-medium mt-0.5 flex items-center gap-1">
              <span>{contactInquiries.filter((c) => c.status === "NEW").length} awaiting reply</span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <Mail className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Wholesale & Export Leads
            </div>
            <div className="text-2xl font-black text-slate-900 mt-1 font-serif">
              {bulkInquiries.length}
            </div>
            <div className="text-[11px] text-amber-700 font-medium mt-0.5 flex items-center gap-1">
              <span>{bulkInquiries.filter((b) => b.status === "NEW" || b.status === "QUOTE_SENT").length} in pipeline</span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
            <Building2 className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Farm Club Subscribers
            </div>
            <div className="text-2xl font-black text-slate-900 mt-1 font-serif">
              {newsletterSubscribers.length}
            </div>
            <div className="text-[11px] text-emerald-700 font-medium mt-0.5 flex items-center gap-1">
              <span>{newsletterSubscribers.filter((s) => s.is_active).length} active 10% coupon users</span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
            <Sparkles className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Tabs & Controls */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          {/* Main 3 Tabs */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => {
                setActiveTab("retail");
                setStatusFilter("ALL");
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold cursor-pointer transition-all flex items-center gap-2 ${
                activeTab === "retail"
                  ? "bg-emerald-700 text-white shadow-xs"
                  : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Retail Messages ({contactInquiries.length})</span>
            </button>

            <button
              onClick={() => {
                setActiveTab("wholesale");
                setStatusFilter("ALL");
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold cursor-pointer transition-all flex items-center gap-2 ${
                activeTab === "wholesale"
                  ? "bg-emerald-700 text-white shadow-xs"
                  : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Wholesale Leads ({bulkInquiries.length})</span>
            </button>

            <button
              onClick={() => {
                setActiveTab("newsletter");
                setStatusFilter("ALL");
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold cursor-pointer transition-all flex items-center gap-2 ${
                activeTab === "newsletter"
                  ? "bg-emerald-700 text-white shadow-xs"
                  : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Newsletter Subscribers ({newsletterSubscribers.length})</span>
            </button>
          </div>

          {/* Quick Actions (Export / Copy for Newsletter) */}
          {activeTab === "newsletter" && (
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyEmails}
                className="px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Copy comma-separated emails"
              >
                <Copy className="w-3.5 h-3.5 text-slate-500" />
                <span>Copy Emails</span>
              </button>
              <button
                onClick={handleExportCSV}
                className="px-3 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                title="Download CSV file"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export CSV</span>
              </button>
            </div>
          )}
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative w-full sm:flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5 pointer-events-none" />
            <input
              type="text"
              placeholder={
                activeTab === "newsletter"
                  ? "Search by subscriber email address..."
                  : activeTab === "retail"
                  ? "Search by name, email, phone, message content..."
                  : "Search wholesale leads by company, buyer, crop..."
              }
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 text-slate-800 text-xs pl-9 pr-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-700 focus:bg-white"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-slate-50 text-slate-700 text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-700 w-full sm:w-auto"
            >
              {activeTab === "newsletter" ? (
                <>
                  <option value="ALL">All Statuses ({newsletterSubscribers.length})</option>
                  <option value="ACTIVE">Active Subscribers</option>
                  <option value="INACTIVE">Unsubscribed / Inactive</option>
                </>
              ) : activeTab === "retail" ? (
                <>
                  <option value="ALL">All Statuses ({contactInquiries.length})</option>
                  <option value="NEW">New (Unresolved)</option>
                  <option value="CONTACTED">Contacted</option>
                  <option value="RESOLVED">Resolved</option>
                  <option value="ARCHIVED">Archived</option>
                </>
              ) : (
                <>
                  <option value="ALL">All Statuses ({bulkInquiries.length})</option>
                  <option value="NEW">New Lead</option>
                  <option value="QUOTE_SENT">Quote Sent</option>
                  <option value="IN_NEGOTIATION">In Negotiation</option>
                  <option value="FULFILLED">Fulfilled</option>
                  <option value="REJECTED">Rejected</option>
                </>
              )}
            </select>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      {isLoading ? (
        <div className="py-20 text-center text-slate-400 text-xs bg-white rounded-2xl border border-slate-200/80">
          <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-emerald-700" />
          <span>Synchronizing inquiries and subscribers from server...</span>
        </div>
      ) : activeTab === "newsletter" ? (
        /* TAB 3: NEWSLETTER SUBSCRIBERS */
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900 font-serif">
                Farm Club & Newsletter Subscribers
              </h3>
              <p className="text-xs text-slate-500">
                Customers who subscribed via the 10% coupon banner or footer newsletter form.
              </p>
            </div>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              {filteredSubscribers.length} total
            </span>
          </div>

          {filteredSubscribers.length === 0 ? (
            <div className="py-16 text-center text-xs text-slate-400">
              No newsletter subscribers match the search criteria.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200/70">
                  <tr>
                    <th className="py-3 px-4">Subscriber Email</th>
                    <th className="py-3 px-4">Coupon Code</th>
                    <th className="py-3 px-4">Subscription Date</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {filteredSubscribers.map((sub) => (
                    <tr key={sub.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3 px-4 font-mono font-medium text-slate-900">
                        <div className="flex items-center gap-2">
                          <Mail className="w-3.5 h-3.5 text-slate-400" />
                          <span>{sub.email}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 font-mono text-[11px] font-bold border border-amber-200">
                          <Tag className="w-3 h-3 text-amber-600" />
                          <span>{sub.coupon_code || "HARVEST10"}</span>
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-500 font-mono text-[11px]">
                        {sub.subscribed_at
                          ? new Date(sub.subscribed_at).toLocaleString("en-IN", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : "Recent"}
                      </td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => handleToggleSubscriber(sub.id, sub.is_active)}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold cursor-pointer transition-colors ${
                            sub.is_active
                              ? "bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100"
                              : "bg-slate-100 text-slate-600 border border-slate-200 hover:bg-slate-200"
                          }`}
                          title="Click to toggle status"
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              sub.is_active ? "bg-emerald-600" : "bg-slate-400"
                            }`}
                          />
                          <span>{sub.is_active ? "Active" : "Unsubscribed"}</span>
                        </button>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="inline-flex items-center gap-1">
                          <a
                            href={`mailto:${sub.email}?subject=ONAAR Organic Harvest Updates`}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-emerald-700 hover:bg-slate-100 transition-colors"
                            title="Send email"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                          <button
                            onClick={() => handleDeleteSubscriber(sub.id)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                            title="Delete subscriber"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ) : activeTab === "retail" ? (
        /* TAB 1: RETAIL CONTACT MESSAGES (TABLE VIEW) */
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="p-4 sm:p-5 flex items-center justify-between border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900 font-serif">
                Retail Support & Customer Messages
              </h3>
              <p className="text-xs text-slate-500">
                Direct customer inquiries submitted through the Contact Us desk.
              </p>
            </div>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              {filteredContacts.length} messages
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50/75 border-b border-slate-100 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Subject</th>
                  <th className="py-3 px-4">Message Preview</th>
                  <th className="py-3 px-4 whitespace-nowrap">Received On</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-sans">
                {filteredContacts.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-16 text-center text-xs text-slate-400">
                      No retail contact inquiries match your search.
                    </td>
                  </tr>
                ) : (
                  filteredContacts.map((ci) => (
                    <tr
                      key={ci.id}
                      onClick={() => openContactModal(ci)}
                      className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
                    >
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900 text-xs">
                          {ci.name}
                        </div>
                        <div className="text-[11px] text-slate-500 font-mono flex items-center gap-1.5 flex-wrap">
                          <span>{ci.email}</span>
                          {ci.phone && (
                            <>
                              <span className="text-slate-300">•</span>
                              <span>{ci.phone}</span>
                            </>
                          )}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className="font-bold text-emerald-900 bg-emerald-50/90 border border-emerald-200/80 px-2 py-0.5 rounded-md text-[11px]">
                          {ci.subject || "General Inquiry"}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 max-w-xs truncate text-slate-600">
                        {ci.message}
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap text-slate-500 font-mono text-[11px]">
                        {ci.created_at
                          ? new Date(ci.created_at).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })
                          : "—"}
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                        <select
                          value={ci.status}
                          onChange={(e) => handleUpdateContactStatus(ci.id, e.target.value)}
                          className={`text-[10px] font-bold px-2 py-1 rounded-md border cursor-pointer ${
                            ci.status === "NEW"
                              ? "bg-rose-50 text-rose-800 border-rose-200"
                              : ci.status === "CONTACTED"
                              ? "bg-amber-50 text-amber-800 border-amber-200"
                              : ci.status === "RESOLVED"
                              ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                              : "bg-slate-100 text-slate-700 border-slate-200"
                          }`}
                        >
                          <option value="NEW">NEW</option>
                          <option value="CONTACTED">CONTACTED</option>
                          <option value="RESOLVED">RESOLVED</option>
                          <option value="ARCHIVED">ARCHIVED</option>
                        </select>
                      </td>
                      <td className="py-3.5 px-4 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => openContactModal(ci)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors cursor-pointer"
                            title="Manage inquiry"
                          >
                            <Eye className="w-3 h-3" />
                            <span>Manage</span>
                          </button>
                          <button
                            onClick={() => handleDeleteContact(ci.id)}
                            className="p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                            title="Delete inquiry"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* TAB 2: WHOLESALE B2B ENQUIRIES (TABLE VIEW) */
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="p-4 sm:p-5 flex items-center justify-between border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900 font-serif">
                Wholesale & Export Commercial Inquiries
              </h3>
              <p className="text-xs text-slate-500">
                Institutional supply & export requests submitted through B2B channels.
              </p>
            </div>
            <span className="text-xs font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
              {filteredBulks.length} leads
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50/75 border-b border-slate-100 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3 px-4">Company & Buyer</th>
                  <th className="py-3 px-4">Commodity / Crop</th>
                  <th className="py-3 px-4 whitespace-nowrap">Volume & Destination</th>
                  <th className="py-3 px-4">Contact Info</th>
                  <th className="py-3 px-4 whitespace-nowrap">Received On</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-sans">
                {filteredBulks.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-16 text-center text-xs text-slate-400">
                      No wholesale or export leads match your search.
                    </td>
                  </tr>
                ) : (
                  filteredBulks.map((bi) => (
                    <tr
                      key={bi.id}
                      onClick={() => openBulkModal(bi)}
                      className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
                    >
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900 text-xs flex items-center gap-1.5 flex-wrap">
                          <span>{bi.name}</span>
                          {bi.company_name && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                              {bi.company_name}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className="font-bold text-emerald-900 bg-emerald-50/90 border border-emerald-200/80 px-2 py-0.5 rounded-md text-[11px]">
                          {bi.category}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 font-bold flex items-center gap-1 text-[11px]">
                            <PackageCheck className="w-3 h-3 text-emerald-600" />
                            <span>{bi.quantity}</span>
                          </span>
                          {bi.destination && (
                            <span className="text-slate-600 flex items-center gap-1 font-mono text-[11px]">
                              <MapPin className="w-3 h-3 text-slate-400" />
                              <span>{bi.destination}</span>
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="text-[11px] text-slate-500 font-mono space-y-0.5">
                          {bi.phone && (
                            <div className="flex items-center gap-1 text-slate-700">
                              <Phone className="w-3 h-3 text-emerald-600" />
                              <span>{bi.phone}</span>
                            </div>
                          )}
                          {bi.email && (
                            <div className="flex items-center gap-1 text-slate-500">
                              <Mail className="w-3 h-3 text-slate-400" />
                              <span className="truncate max-w-[140px]">{bi.email}</span>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap text-slate-500 font-mono text-[11px]">
                        {bi.created_at
                          ? new Date(bi.created_at).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })
                          : "—"}
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                        <select
                          value={bi.status}
                          onChange={(e) => handleUpdateBulkStatus(bi.id, e.target.value)}
                          className={`text-[10px] font-bold px-2 py-1 rounded-md border cursor-pointer ${
                            bi.status === "NEW"
                              ? "bg-rose-50 text-rose-800 border-rose-200"
                              : bi.status === "QUOTE_SENT"
                              ? "bg-blue-50 text-blue-800 border-blue-200"
                              : bi.status === "IN_NEGOTIATION"
                              ? "bg-amber-50 text-amber-800 border-amber-200"
                              : bi.status === "FULFILLED"
                              ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                              : "bg-slate-100 text-slate-700 border-slate-200"
                          }`}
                        >
                          <option value="NEW">NEW</option>
                          <option value="QUOTE_SENT">QUOTE SENT</option>
                          <option value="IN_NEGOTIATION">IN NEGOTIATION</option>
                          <option value="FULFILLED">FULFILLED</option>
                          <option value="REJECTED">REJECTED</option>
                        </select>
                      </td>
                      <td className="py-3.5 px-4 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => openBulkModal(bi)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200 transition-colors cursor-pointer"
                            title="Manage wholesale inquiry"
                          >
                            <Eye className="w-3 h-3" />
                            <span>Manage</span>
                          </button>
                          <button
                            onClick={() => handleDeleteBulk(bi.id)}
                            className="p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                            title="Delete wholesale inquiry"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODAL 1: RETAIL CONTACT INQUIRY MANAGEMENT */}
      {selectedContact && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-fade-in font-sans overflow-y-auto"
          onClick={() => setSelectedContact(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl max-w-lg w-full max-h-[92dvh] overflow-y-auto shadow-2xl border border-slate-200 p-5 sm:p-6 space-y-5 relative my-auto animate-fade-up"
          >
            {/* Header */}
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 uppercase tracking-wider mb-1">
                  <MessageSquare className="w-3 h-3" />
                  <span>Retail Customer Ticket</span>
                </div>
                <h3 className="font-serif font-bold text-base sm:text-lg text-slate-900">
                  {selectedContact.subject || "Customer Support Inquiry"}
                </h3>
                <p className="text-xs text-slate-500 font-mono">
                  ID: {selectedContact.id}
                </p>
              </div>
              <button
                onClick={() => setSelectedContact(null)}
                className="text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
                title="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Customer Details Box */}
            <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-100 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 text-sm">{selectedContact.name}</span>
                <span className="text-[11px] text-slate-500 font-mono">
                  {selectedContact.created_at
                    ? new Date(selectedContact.created_at).toLocaleString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : ""}
                </span>
              </div>
              <div className="flex items-center gap-4 text-[11px] text-slate-600 font-mono flex-wrap">
                <a
                  href={`mailto:${selectedContact.email}?subject=RE: ${selectedContact.subject || "ONAAR Inquiry"}`}
                  className="inline-flex items-center gap-1 text-emerald-700 hover:underline"
                >
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span>{selectedContact.email}</span>
                </a>
                {selectedContact.phone && (
                  <a
                    href={`tel:${selectedContact.phone}`}
                    className="inline-flex items-center gap-1 text-emerald-700 hover:underline"
                  >
                    <Phone className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{selectedContact.phone}</span>
                  </a>
                )}
              </div>
            </div>

            {/* Customer Message */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Customer Message</label>
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-800 leading-relaxed max-h-48 overflow-y-auto whitespace-pre-wrap font-sans">
                {selectedContact.message}
              </div>
            </div>

            {/* Status Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Ticket Workflow Status</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(["NEW", "CONTACTED", "RESOLVED", "ARCHIVED"] as const).map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => handleUpdateContactStatus(selectedContact.id, st)}
                    className={`py-1.5 px-2 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                      selectedContact.status === st
                        ? st === "NEW"
                          ? "bg-rose-600 text-white border-rose-600 shadow-xs"
                          : st === "CONTACTED"
                          ? "bg-amber-600 text-white border-amber-600 shadow-xs"
                          : st === "RESOLVED"
                          ? "bg-emerald-700 text-white border-emerald-700 shadow-xs"
                          : "bg-slate-700 text-white border-slate-700 shadow-xs"
                        : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Internal Vendor Notes */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Internal Operations / Vendor Notes</label>
              <textarea
                value={notesDraft}
                onChange={(e) => setNotesDraft(e.target.value)}
                placeholder="Log internal resolution steps, phone calls, or fulfillment reminders..."
                rows={3}
                className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-700 bg-amber-50/30 text-slate-800"
              />
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => handleSaveNotes("contact", selectedContact.id)}
                  disabled={isSavingNotes}
                  className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                >
                  {isSavingNotes ? "Saving..." : "Save Note"}
                </button>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
              <button
                type="button"
                onClick={() => handleDeleteContact(selectedContact.id)}
                className="inline-flex items-center gap-1 text-rose-600 hover:text-rose-700 hover:bg-rose-50 px-2.5 py-1.5 rounded-lg border border-rose-200 cursor-pointer font-semibold transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete</span>
              </button>

              <div className="flex items-center gap-2">
                <a
                  href={`mailto:${selectedContact.email}?subject=RE: ${selectedContact.subject || "ONAAR Support"}`}
                  className="inline-flex items-center gap-1.5 bg-emerald-700 hover:bg-emerald-800 text-white px-3 py-1.5 rounded-lg font-bold transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Reply Email</span>
                </a>
                <button
                  type="button"
                  onClick={() => setSelectedContact(null)}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg cursor-pointer transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: WHOLESALE B2B COMMERCIAL INQUIRY MANAGEMENT */}
      {selectedBulk && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-fade-in font-sans overflow-y-auto"
          onClick={() => setSelectedBulk(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl max-w-xl w-full max-h-[92dvh] overflow-y-auto shadow-2xl border border-slate-200 p-5 sm:p-6 space-y-5 relative my-auto animate-fade-up"
          >
            {/* Header */}
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200 uppercase tracking-wider mb-1">
                  <Building2 className="w-3 h-3" />
                  <span>B2B Commercial & Export Supply</span>
                </div>
                <h3 className="font-serif font-bold text-base sm:text-lg text-slate-900">
                  {selectedBulk.company_name || selectedBulk.name} — {selectedBulk.category}
                </h3>
                <p className="text-xs text-slate-500 font-mono">
                  ID: {selectedBulk.id}
                </p>
              </div>
              <button
                onClick={() => setSelectedBulk(null)}
                className="text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
                title="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Enterprise & Buyer Details Card */}
            <div className="bg-amber-50/40 rounded-xl p-3.5 border border-amber-200/80 space-y-2 text-xs">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <span className="font-bold text-slate-900 text-sm">{selectedBulk.name}</span>
                  {selectedBulk.company_name && (
                    <span className="ml-2 font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded text-[11px]">
                      {selectedBulk.company_name}
                    </span>
                  )}
                </div>
                <span className="text-[11px] text-slate-500 font-mono">
                  {selectedBulk.created_at
                    ? new Date(selectedBulk.created_at).toLocaleString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : ""}
                </span>
              </div>
              <div className="flex items-center gap-4 text-[11px] text-slate-600 font-mono flex-wrap">
                {selectedBulk.email && (
                  <a
                    href={`mailto:${selectedBulk.email}?subject=Wholesale Proposal: ${selectedBulk.category} Supply`}
                    className="inline-flex items-center gap-1 text-emerald-700 hover:underline"
                  >
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    <span>{selectedBulk.email}</span>
                  </a>
                )}
                {selectedBulk.phone && (
                  <a
                    href={`tel:${selectedBulk.phone}`}
                    className="inline-flex items-center gap-1 text-emerald-700 hover:underline"
                  >
                    <Phone className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{selectedBulk.phone}</span>
                  </a>
                )}
              </div>
            </div>

            {/* Order Specification Tags */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                <div className="text-[10px] uppercase font-bold text-slate-400">Target Crop</div>
                <div className="font-bold text-slate-800">{selectedBulk.category}</div>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                <div className="text-[10px] uppercase font-bold text-slate-400">Order Volume</div>
                <div className="font-bold text-emerald-700 font-mono">{selectedBulk.quantity}</div>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                <div className="text-[10px] uppercase font-bold text-slate-400">Delivery Port / City</div>
                <div className="font-bold text-slate-800">{selectedBulk.destination || "Domestic Dispatch"}</div>
              </div>
            </div>

            {/* Buyer Specifications & Packaging Notes */}
            {selectedBulk.notes && (
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Buyer Requirements & Specifications</label>
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-800 leading-relaxed max-h-40 overflow-y-auto whitespace-pre-wrap font-sans">
                  {selectedBulk.notes}
                </div>
              </div>
            )}

            {/* Status Workflow Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Wholesale Pipeline Status</label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5">
                {(["NEW", "QUOTE_SENT", "IN_NEGOTIATION", "FULFILLED", "REJECTED"] as const).map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => handleUpdateBulkStatus(selectedBulk.id, st)}
                    className={`py-1.5 px-2 rounded-lg text-[11px] font-bold border transition-all cursor-pointer ${
                      selectedBulk.status === st
                        ? st === "NEW"
                          ? "bg-rose-600 text-white border-rose-600 shadow-xs"
                          : st === "QUOTE_SENT"
                          ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                          : st === "IN_NEGOTIATION"
                          ? "bg-amber-600 text-white border-amber-600 shadow-xs"
                          : st === "FULFILLED"
                          ? "bg-emerald-700 text-white border-emerald-700 shadow-xs"
                          : "bg-slate-700 text-white border-slate-700 shadow-xs"
                        : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    {st.replace("_", " ")}
                  </button>
                ))}
              </div>
            </div>

            {/* Procurement / Quota Notes */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Internal Procurement & Quota Notes</label>
              <textarea
                value={notesDraft}
                onChange={(e) => setNotesDraft(e.target.value)}
                placeholder="Record farm batch allocations, container quote sent, or payment terms..."
                rows={3}
                className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-700 bg-amber-50/30 text-slate-800"
              />
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => handleSaveNotes("bulk", selectedBulk.id)}
                  disabled={isSavingNotes}
                  className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                >
                  {isSavingNotes ? "Saving..." : "Save Note"}
                </button>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
              <button
                type="button"
                onClick={() => handleDeleteBulk(selectedBulk.id)}
                className="inline-flex items-center gap-1 text-rose-600 hover:text-rose-700 hover:bg-rose-50 px-2.5 py-1.5 rounded-lg border border-rose-200 cursor-pointer font-semibold transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete</span>
              </button>

              <div className="flex items-center gap-2">
                {selectedBulk.email && (
                  <a
                    href={`mailto:${selectedBulk.email}?subject=ONAAR Wholesale Proposal: ${selectedBulk.category}`}
                    className="inline-flex items-center gap-1.5 bg-emerald-700 hover:bg-emerald-800 text-white px-3 py-1.5 rounded-lg font-bold transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Email Proposal</span>
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => setSelectedBulk(null)}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg cursor-pointer transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
