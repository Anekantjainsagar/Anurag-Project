"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { api } from "@/services/apiClient";
import OrderInvoiceModal from "@/components/OrderInvoiceModal";
import {
  Package,
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  Mail,
  ArrowLeft,
  FileText,
  ExternalLink,
  ShieldCheck,
  Search,
  RefreshCw,
  AlertCircle,
  Copy,
  Check,
} from "lucide-react";

function OrderTrackContent() {
  const params = useParams();
  const router = useRouter();
  const rawOrderNumber = params?.orderNumber as string;
  const orderNumber = rawOrderNumber ? decodeURIComponent(rawOrderNumber).trim().toUpperCase() : "";

  const [order, setOrder] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lookupInput, setLookupInput] = useState("");
  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);
  const [copiedAwb, setCopiedAwb] = useState(false);

  const fetchOrder = async (num: string) => {
    if (!num) return;
    setIsLoading(true);
    setError(null);
    try {
      const data = await api.orders.trackOrder(num);
      setOrder(data);
    } catch (err: any) {
      setOrder(null);
      setError(err?.message || `Order "${num}" was not found in our fulfillment ledger.`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (orderNumber) {
      fetchOrder(orderNumber);
    } else {
      setIsLoading(false);
      setError("Please provide an order number to track.");
    }
  }, [orderNumber]);

  const handleLookupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = lookupInput.trim().toUpperCase();
    if (clean) {
      router.push(`/orders/track/${encodeURIComponent(clean)}`);
    }
  };

  const handleCopyAwb = (awb: string) => {
    navigator.clipboard.writeText(awb);
    setCopiedAwb(true);
    setTimeout(() => setCopiedAwb(false), 2000);
  };

  // Stepper milestones
  const MILESTONES = [
    {
      key: "PENDING_VERIFICATION",
      label: "Order Placed",
      subtext: "Order recorded in farm ledger",
      icon: CheckCircle2,
    },
    {
      key: "CONFIRMED",
      label: "Order Confirmed",
      subtext: "Harvest lot verified & allocated",
      icon: ShieldCheck,
    },
    {
      key: "PACKED",
      label: "Packed & Sealed",
      subtext: "Eco barrier pouch sealed",
      icon: Package,
    },
    {
      key: "DISPATCHED",
      label: "Dispatched",
      subtext: "Handed over to courier partner",
      icon: Truck,
    },
    {
      key: "DELIVERED",
      label: "Delivered",
      subtext: "Delivered to recipient doorstep",
      icon: CheckCircle2,
    },
  ];

  const getMilestoneIndex = (status?: string) => {
    switch (status?.toUpperCase()) {
      case "PENDING_VERIFICATION":
        return 0;
      case "CONFIRMED":
        return 1;
      case "PACKED":
        return 2;
      case "DISPATCHED":
        return 3;
      case "DELIVERED":
        return 4;
      case "CANCELLED":
        return -1;
      default:
        return 1;
    }
  };

  const currentStep = getMilestoneIndex(order?.order_status);

  return (
    <div className="min-h-screen bg-[#faf8f5] text-slate-900 font-sans pb-16">
      {/* Top Breadcrumb Header */}
      <div className="bg-white border-b border-slate-200/80 sticky top-16 sm:top-20 z-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          <Link
            href="/profile?tab=orders"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-emerald-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to My Orders</span>
          </Link>

          {/* Quick Lookup Input in Header */}
          <form onSubmit={handleLookupSubmit} className="hidden sm:flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Track another order (e.g. YB-20261110-4588)"
                value={lookupInput}
                onChange={(e) => setLookupInput(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-xs rounded-full pl-8 pr-3 py-1.5 w-64 focus:outline-none focus:border-emerald-600 focus:bg-white"
              />
            </div>
            <button
              type="submit"
              className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold px-3 py-1.5 rounded-full cursor-pointer transition-colors"
            >
              Track
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 space-y-6">
        {isLoading ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm space-y-3">
            <RefreshCw className="w-8 h-8 animate-spin text-emerald-700 mx-auto" />
            <div className="font-serif font-bold text-lg text-slate-800">
              Fetching Dispatch & Logistics Ledger...
            </div>
            <p className="text-xs text-slate-500">
              Retrieving live milestone timestamps and courier AWB status for #{orderNumber}
            </p>
          </div>
        ) : error || !order ? (
          <div className="bg-white rounded-3xl p-8 sm:p-12 text-center border border-rose-200 shadow-sm space-y-5">
            <div className="w-14 h-14 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto border border-rose-200">
              <AlertCircle className="w-7 h-7" />
            </div>
            <div className="space-y-1 max-w-md mx-auto">
              <h2 className="font-serif text-2xl font-bold text-slate-900">
                Order Tracking Unavailable
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                {error || `We could not locate an active order matching "${orderNumber}".`}
              </p>
            </div>

            {/* Tracking Search Form */}
            <form onSubmit={handleLookupSubmit} className="max-w-md mx-auto flex gap-2">
              <input
                type="text"
                placeholder="Enter valid Order ID (e.g. YB-20261110-4588)"
                value={lookupInput}
                onChange={(e) => setLookupInput(e.target.value)}
                className="flex-1 bg-slate-50 border border-slate-200 text-xs sm:text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-emerald-600 focus:bg-white"
              />
              <button
                type="submit"
                className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-xl cursor-pointer transition-colors shadow-xs"
              >
                Track
              </button>
            </form>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-center gap-4 text-xs">
              <Link href="/products" className="text-emerald-700 font-semibold hover:underline">
                Explore Storefront
              </Link>
              <span className="text-slate-300">•</span>
              <Link href="/contact" className="text-emerald-700 font-semibold hover:underline">
                Contact Customer Desk
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* Primary Status Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              {/* Header Info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Tracking Order
                    </span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${
                        order.order_status === "DELIVERED"
                          ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                          : order.order_status === "DISPATCHED"
                          ? "bg-blue-50 text-blue-800 border-blue-200"
                          : order.order_status === "CANCELLED"
                          ? "bg-rose-50 text-rose-800 border-rose-200"
                          : "bg-amber-50 text-amber-800 border-amber-200"
                      }`}
                    >
                      {order.order_status?.replace(/_/g, " ")}
                    </span>
                  </div>
                  <h1 className="font-mono text-2xl sm:text-3xl font-black text-slate-900 mt-1">
                    #{order.order_number}
                  </h1>
                  <p className="text-xs text-slate-500 mt-1">
                    Placed on{" "}
                    {order.created_at
                      ? new Date(order.created_at).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "Recent"}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsInvoiceOpen(true)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-emerald-50 text-slate-800 hover:text-emerald-800 border border-slate-200 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs"
                    title="View & Print Official GST Tax Invoice"
                  >
                    <FileText className="w-4 h-4 text-emerald-700" />
                    <span>View Tax Invoice</span>
                  </button>
                </div>
              </div>

              {/* Milestone Stepper */}
              <div className="py-2">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-6">
                  Fulfillment & Delivery Progress
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 relative">
                  {MILESTONES.map((milestone, idx) => {
                    const isDone = currentStep >= idx && currentStep !== -1;
                    const isCurrent = currentStep === idx && currentStep !== -1;
                    const IconComp = milestone.icon;

                    return (
                      <div
                        key={milestone.key}
                        className={`flex sm:flex-col items-center sm:items-center text-left sm:text-center gap-3 sm:gap-2 p-3 sm:p-2 rounded-2xl transition-all ${
                          isCurrent
                            ? "bg-emerald-50/70 border border-emerald-200"
                            : isDone
                            ? "bg-slate-50/60"
                            : "opacity-45"
                        }`}
                      >
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-2 transition-all ${
                            isCurrent
                              ? "bg-emerald-700 border-emerald-700 text-white shadow-md ring-4 ring-emerald-100"
                              : isDone
                              ? "bg-emerald-600 border-emerald-600 text-white"
                              : "bg-white border-slate-300 text-slate-400"
                          }`}
                        >
                          <IconComp className="w-5 h-5" />
                        </div>
                        <div className="min-w-0">
                          <div
                            className={`text-xs font-bold leading-tight ${
                              isCurrent
                                ? "text-emerald-900"
                                : isDone
                                ? "text-slate-800"
                                : "text-slate-400"
                            }`}
                          >
                            {milestone.label}
                          </div>
                          <div className="text-[10px] text-slate-500 hidden sm:block mt-0.5">
                            {milestone.subtext}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Courier & AWB Banner */}
              {order.courier_name && (
                <div className="bg-linear-to-r from-emerald-900 to-[#024420] text-white p-5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-md">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-white shrink-0">
                      <Truck className="w-6 h-6 text-[#58cf8b]" />
                    </div>
                    <div>
                      <div className="text-[11px] font-bold uppercase text-[#7de0a8] tracking-wider">
                        Logistics Partner Assigned
                      </div>
                      <div className="text-base font-bold text-white">
                        {order.courier_name}
                      </div>
                      {order.tracking_awb && (
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs font-mono text-white/90">
                            AWB: <strong>{order.tracking_awb}</strong>
                          </span>
                          <button
                            onClick={() => handleCopyAwb(order.tracking_awb)}
                            className="text-white/70 hover:text-white transition-colors cursor-pointer"
                            title="Copy AWB number"
                          >
                            {copiedAwb ? (
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {order.tracking_awb && (
                    <a
                      href={
                        order.courier_name.toLowerCase().includes("blue")
                          ? `https://www.bluedart.com/tracking?numbers=${order.tracking_awb}`
                          : order.courier_name.toLowerCase().includes("delhivery")
                          ? `https://www.delhivery.com/track/package/${order.tracking_awb}`
                          : `https://www.google.com/search?q=${encodeURIComponent(
                              `${order.courier_name} tracking ${order.tracking_awb}`
                            )}`
                      }
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 bg-white text-emerald-950 px-4 py-2 rounded-xl text-xs font-bold hover:bg-emerald-50 transition-colors shadow-sm shrink-0"
                    >
                      <span>Track on {order.courier_name}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              )}

              {/* Event Timeline */}
              {order.tracking_events && order.tracking_events.length > 0 && (
                <div className="pt-4 border-t border-slate-100">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
                    Milestone Event Log ({order.tracking_events.length})
                  </div>
                  <div className="space-y-4">
                    {order.tracking_events.map((evt: any, i: number) => (
                      <div key={evt.id || i} className="flex items-start gap-3 text-xs">
                        <div className="w-2 h-2 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="font-bold text-slate-800">{evt.title}</div>
                          {evt.description && (
                            <div className="text-slate-600 text-[11px] mt-0.5">
                              {evt.description}
                            </div>
                          )}
                          <div className="text-slate-400 text-[10px] mt-0.5 flex items-center gap-2 flex-wrap">
                            {evt.location && (
                              <span className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {evt.location}
                              </span>
                            )}
                            {evt.timestamp && (
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {new Date(evt.timestamp).toLocaleString("en-IN")}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Grid for Destination & Items */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Shipping Address */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-2">
                  <MapPin className="w-4 h-4 text-emerald-700" />
                  <span>Delivery Destination</span>
                </div>
                <div className="text-xs space-y-1">
                  <div className="font-bold text-slate-900 text-sm">
                    {order.customer_name}
                  </div>
                  <div className="text-slate-600">
                    {order.shipping_flat_no}, {order.shipping_street}
                  </div>
                  {order.shipping_landmark && (
                    <div className="text-slate-500 text-[11px]">
                      Landmark: {order.shipping_landmark}
                    </div>
                  )}
                  <div className="text-slate-700 font-semibold">
                    {order.shipping_city}, {order.shipping_state} - {order.shipping_pincode}
                  </div>
                  <div className="text-slate-600 pt-2 flex items-center gap-1.5 font-mono">
                    <Phone className="w-3 h-3 text-slate-400" />
                    <span>{order.customer_phone}</span>
                  </div>
                  {order.customer_email && (
                    <div className="text-slate-600 flex items-center gap-1.5 font-mono">
                      <Mail className="w-3 h-3 text-slate-400" />
                      <span>{order.customer_email}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Order & Payment Summary */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-2">
                  <Package className="w-4 h-4 text-emerald-700" />
                  <span>Order Ledger & Payment</span>
                </div>
                <div className="text-xs space-y-2">
                  <div className="flex justify-between text-slate-600">
                    <span>Subtotal</span>
                    <span className="font-mono">₹{Number(order.subtotal || 0).toFixed(2)}</span>
                  </div>
                  {Number(order.discount_amount || 0) > 0 && (
                    <div className="flex justify-between text-emerald-700 font-semibold">
                      <span>Harvest Savings / Discount</span>
                      <span className="font-mono">-₹{Number(order.discount_amount).toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-slate-600">
                    <span>Pan-India Delivery</span>
                    <span className="font-mono">
                      {Number(order.shipping_fee || 0) === 0 ? "FREE" : `₹${Number(order.shipping_fee).toFixed(2)}`}
                    </span>
                  </div>
                  <div className="border-t border-slate-100 pt-2 flex justify-between text-slate-900 font-bold text-sm">
                    <span>Total Amount</span>
                    <span className="font-mono text-emerald-800 text-base">
                      ₹{Number(order.total_amount).toFixed(2)}
                    </span>
                  </div>
                  <div className="pt-2 text-[11px] text-slate-500">
                    Payment Method:{" "}
                    <strong className="text-slate-800 uppercase">
                      {order.payment_method === "COD_VENDOR_CONTACT"
                        ? "Pay on Delivery (COD)"
                        : order.payment_method}
                    </strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Shipment Items */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-2">
                Harvest Items in Package ({order.items?.length || 0})
              </div>
              <div className="divide-y divide-slate-100">
                {order.items?.map((item: any, i: number) => (
                  <div key={item.id || i} className="py-3 flex items-center justify-between gap-3 text-xs">
                    <div className="min-w-0">
                      <div className="font-bold text-slate-900">
                        {item.product_name}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        Weight: {item.weight_label || "1pk"} • Qty: {item.quantity}
                      </div>
                    </div>
                    <div className="font-mono font-bold text-slate-900 text-right shrink-0">
                      ₹{Number(item.line_total || item.unit_price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Helpline / Support Card */}
            <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-emerald-900">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>
                  Questions regarding this shipment? Our logistics desk is available:{" "}
                  <strong>+91-98765 43210</strong>
                </span>
              </div>
              <a
                href={`https://wa.me/919876543210?text=${encodeURIComponent(
                  `Hello ONAAR, I am inquiring about tracking my order #${order.order_number}`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-3 py-1.5 rounded-lg transition-colors shrink-0"
              >
                WhatsApp Desk
              </a>
            </div>
          </>
        )}
      </div>

      {/* Official Tax Invoice Modal */}
      {order && (
        <OrderInvoiceModal
          order={order}
          isOpen={isInvoiceOpen}
          onClose={() => setIsInvoiceOpen(false)}
          defaultTab="invoice"
        />
      )}
    </div>
  );
}

export default function OrderTrackPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#faf8f5] text-slate-500 text-xs">
          Loading order tracking...
        </div>
      }
    >
      <OrderTrackContent />
    </Suspense>
  );
}
