"use client";

import React, { useState } from "react";
import Link from "next/link";
import BrandLogo from "./BrandLogo";
import {
  X,
  Printer,
  Truck,
  Package,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  Mail,
  FileText,
  ShieldCheck,
  ExternalLink,
  ChevronRight,
  Receipt,
} from "lucide-react";

interface OrderItem {
  id?: string;
  product_id?: string;
  product_name: string;
  weight_label?: string;
  packaging_size?: string;
  weight?: string;
  product_image?: string;
  unit_price: number;
  quantity: number;
  line_total?: number;
}

interface OrderData {
  id: string;
  order_number: string;
  created_at?: string;
  order_status?: string;
  status?: string;
  customer_name: string;
  customer_phone: string;
  customer_email: string;
  shipping_flat_no: string;
  shipping_street: string;
  shipping_landmark?: string | null;
  shipping_city: string;
  shipping_state: string;
  shipping_pincode: string;
  order_notes?: string | null;
  vendor_notes?: string | null;
  subtotal: number;
  shipping_fee: number;
  discount_amount: number;
  total_amount: number;
  payment_method: string;
  courier_name?: string | null;
  tracking_awb?: string | null;
  tracking_url?: string | null;
  items: OrderItem[];
  tracking_events?: Array<{
    id?: string;
    status: string;
    title: string;
    description: string;
    location?: string | null;
    timestamp: string;
  }>;
}

interface OrderInvoiceModalProps {
  order: OrderData | null;
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: "details" | "invoice";
}

// Convert numbers to Indian Rupees in words
function numberToWordsINR(amount: number): string {
  const units = [
    "",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen",
  ];
  const tens = [
    "",
    "",
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety",
  ];

  const intPart = Math.floor(amount);
  if (intPart === 0) return "Zero Rupees Only";

  function convertTwoDigits(n: number): string {
    if (n === 0) return "";
    if (n < 20) return units[n] + " ";
    return tens[Math.floor(n / 10)] + " " + (n % 10 !== 0 ? units[n % 10] + " " : "");
  }

  function convertThreeDigits(n: number): string {
    let result = "";
    if (Math.floor(n / 100) > 0) {
      result += units[Math.floor(n / 100)] + " Hundred ";
    }
    const rem = n % 100;
    if (rem > 0) {
      result += convertTwoDigits(rem);
    }
    return result;
  }

  let words = "";
  const crore = Math.floor(intPart / 10000000);
  let rem = intPart % 10000000;
  const lakh = Math.floor(rem / 100000);
  rem = rem % 100000;
  const thousand = Math.floor(rem / 1000);
  rem = rem % 1000;

  if (crore > 0) words += convertThreeDigits(crore) + "Crore ";
  if (lakh > 0) words += convertThreeDigits(lakh) + "Lakh ";
  if (thousand > 0) words += convertThreeDigits(thousand) + "Thousand ";
  if (rem > 0) words += convertThreeDigits(rem);

  return words.trim() + " Rupees Only";
}

// HSN Code heuristic for organic categories
function getHsnCode(productName: string): string {
  const lower = productName.toLowerCase();
  if (lower.includes("dal") || lower.includes("lentil") || lower.includes("pulse") || lower.includes("chana") || lower.includes("rajma") || lower.includes("moong")) {
    return "0713.40"; // Dried leguminous vegetables/pulses
  }
  if (lower.includes("rice") || lower.includes("basmati") || lower.includes("chawal")) {
    return "1006.30"; // Semi-milled or wholly milled rice
  }
  if (lower.includes("wheat") || lower.includes("atta") || lower.includes("flour") || lower.includes("khapli")) {
    return "1101.00"; // Wheat flour / atta
  }
  if (lower.includes("millet") || lower.includes("ragi") || lower.includes("jowar") || lower.includes("bajra")) {
    return "1008.29"; // Millets
  }
  if (lower.includes("spice") || lower.includes("haldi") || lower.includes("turmeric") || lower.includes("mirch") || lower.includes("pepper") || lower.includes("jeera") || lower.includes("masala")) {
    return "0910.30"; // Spices & ginger/turmeric
  }
  if (lower.includes("honey") || lower.includes("shehad")) {
    return "0409.00"; // Natural wild honey
  }
  if (lower.includes("cashew") || lower.includes("kaju") || lower.includes("badam") || lower.includes("almond") || lower.includes("walnut") || lower.includes("akhrot") || lower.includes("dry fruit")) {
    return "0801.32"; // Cashew nuts / almonds
  }
  if (lower.includes("ghee") || lower.includes("oil")) {
    return "0405.90"; // Pure desi ghee
  }
  return "2106.90"; // Certified organic food preparation
}

export default function OrderInvoiceModal({
  order,
  isOpen,
  onClose,
  defaultTab = "details",
}: OrderInvoiceModalProps) {
  const [activeTab, setActiveTab] = useState<"details" | "invoice">(defaultTab);

  if (!isOpen || !order) return null;

  const currentStatus = (order.order_status || order.status || "CONFIRMED").toUpperCase();
  const orderDate = new Date(order.created_at || Date.now()).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  const orderTime = new Date(order.created_at || Date.now()).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const invoiceNumber = `INV-${order.order_number}`;

  // Print handler
  const handlePrint = () => {
    window.print();
  };

  const statusProgressSteps = [
    { label: "Placed", key: "PLACED", done: true },
    {
      label: "Confirmed",
      key: "CONFIRMED",
      done: ["CONFIRMED", "PREPARING", "DISPATCHED", "DELIVERED"].includes(currentStatus),
    },
    {
      label: "Farm Packed",
      key: "PREPARING",
      done: ["PREPARING", "DISPATCHED", "DELIVERED"].includes(currentStatus),
    },
    {
      label: "Dispatched",
      key: "DISPATCHED",
      done: ["DISPATCHED", "DELIVERED"].includes(currentStatus),
    },
    {
      label: "Delivered",
      key: "DELIVERED",
      done: currentStatus === "DELIVERED",
    },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-xs animate-fade-in font-sans overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl max-w-4xl w-full my-auto overflow-hidden shadow-2xl border border-gray-100 flex flex-col max-h-[92dvh] animate-scale-up"
      >
        {/* Modal Top Control Bar (Hidden on print) */}
        <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center justify-between bg-[#fbfdfc] shrink-0 print:hidden">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#edf7f1] text-[#01722C] flex items-center justify-center font-bold shrink-0">
              <Receipt className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif font-bold text-base sm:text-lg text-gray-900 leading-tight">
                  Order #{order.order_number}
                </h3>
                <span
                  className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                    currentStatus === "DELIVERED"
                      ? "bg-emerald-100 text-[#01722C]"
                      : currentStatus === "DISPATCHED"
                      ? "bg-blue-100 text-blue-800"
                      : currentStatus === "CANCELLED"
                      ? "bg-rose-100 text-rose-800"
                      : "bg-amber-100 text-amber-800"
                  }`}
                >
                  {currentStatus}
                </span>
              </div>
              <p className="text-[11px] text-gray-500 font-mono">
                Booked on {orderDate} at {orderTime}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Tab Toggles */}
            <div className="hidden sm:flex items-center bg-gray-100 p-1 rounded-xl text-xs font-semibold">
              <button
                onClick={() => setActiveTab("details")}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeTab === "details"
                    ? "bg-white text-gray-900 shadow-2xs font-bold"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                Order Details
              </button>
              <button
                onClick={() => setActiveTab("invoice")}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === "invoice"
                    ? "bg-[#01722C] text-white shadow-2xs font-bold"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Tax Invoice</span>
              </button>
            </div>

            {/* Print Button */}
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer"
              title="Print official tax invoice"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Print</span>
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 cursor-pointer"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile Tab Strip (Only on phones) */}
        <div className="sm:hidden flex border-b border-gray-100 bg-gray-50 text-xs font-semibold print:hidden">
          <button
            onClick={() => setActiveTab("details")}
            className={`flex-1 py-2.5 text-center border-b-2 transition-all ${
              activeTab === "details"
                ? "border-[#01722C] text-[#01722C] font-bold bg-white"
                : "border-transparent text-gray-500"
            }`}
          >
            Order Overview
          </button>
          <button
            onClick={() => setActiveTab("invoice")}
            className={`flex-1 py-2.5 text-center border-b-2 transition-all flex items-center justify-center gap-1.5 ${
              activeTab === "invoice"
                ? "border-[#01722C] text-[#01722C] font-bold bg-white"
                : "border-transparent text-gray-500"
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Tax Invoice</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* ======================================================== */}
          {/* TAB 1: ORDER OVERVIEW & LIVE MILESTONE TRACKING          */}
          {/* ======================================================== */}
          {activeTab === "details" && (
            <div className="space-y-6 animate-fade-in print:hidden">
              {/* Order Milestone Stepper */}
              <div className="bg-[#fcfbf7] p-4 sm:p-5 rounded-2xl border border-[#ece4d4]">
                <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center justify-between">
                  <span>Fulfillment Progress</span>
                  <span className="font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full text-[10px]">
                    {order.order_status?.replace(/_/g, " ") || "In Progress"}
                  </span>
                </div>
                <div className="grid grid-cols-5 gap-1 relative">
                  {statusProgressSteps.map((step, idx) => (
                    <div key={step.key} className="flex flex-col items-center text-center space-y-1.5">
                      <div
                        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                          step.done
                            ? "bg-[#01722C] text-white shadow-xs"
                            : "bg-gray-200 text-gray-400"
                        }`}
                      >
                        {step.done ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                      </div>
                      <span
                        className={`text-[10px] sm:text-xs font-semibold ${
                          step.done ? "text-gray-900" : "text-gray-400"
                        }`}
                      >
                        {step.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Courier Tracking Dispatch Card if Dispatched */}
              {order.courier_name && (
                <div className="p-4 rounded-2xl bg-blue-50/90 border border-blue-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
                      <Truck className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold text-blue-900">
                        Dispatched via {order.courier_name}
                      </div>
                      <div className="text-blue-700 font-mono text-[11px]">
                        AWB / Tracking Number: <strong>{order.tracking_awb || "In Transit"}</strong>
                      </div>
                    </div>
                  </div>
                  {order.tracking_awb ? (
                    <a
                      href={
                        order.courier_name?.toLowerCase().includes("blue")
                          ? `https://www.bluedart.com/tracking?numbers=${order.tracking_awb}`
                          : order.courier_name?.toLowerCase().includes("delhivery")
                          ? `https://www.delhivery.com/track/package/${order.tracking_awb}`
                          : `https://www.google.com/search?q=${encodeURIComponent(
                              `${order.courier_name || "Courier"} tracking ${order.tracking_awb}`
                            )}`
                      }
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 bg-blue-700 hover:bg-blue-800 text-white px-3.5 py-2 rounded-xl font-bold transition-all shadow-xs shrink-0 cursor-pointer"
                      title="Open courier's official tracking portal"
                    >
                      <span>Track on {order.courier_name || "Carrier"}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <span className="text-[11px] text-blue-600 font-medium">In Transit</span>
                  )}
                </div>
              )}

              {/* Items Table */}
              <div className="border border-gray-100 rounded-2xl overflow-hidden bg-white shadow-2xs">
                <div className="p-4 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
                  <h4 className="font-serif font-bold text-sm text-gray-900">
                    Purchased Harvest Items ({order.items?.length || 0})
                  </h4>
                  <span className="text-xs text-gray-500 font-mono">
                    All items 100% Certified Organic
                  </span>
                </div>
                <div className="divide-y divide-gray-100">
                  {(order.items || []).map((item, idx) => {
                    const weightLabel =
                      item.weight_label ||
                      item.packaging_size ||
                      item.weight ||
                      "1 Standard Pack";
                    const itemTotal =
                      item.line_total || Number(item.unit_price) * Number(item.quantity);

                    return (
                      <div
                        key={idx}
                        className="p-3.5 sm:p-4 flex items-center justify-between gap-3 text-xs hover:bg-gray-50/50 transition-colors"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          {item.product_image && (
                            <img
                              src={item.product_image}
                              alt={item.product_name}
                              className="w-12 h-12 object-cover rounded-xl border border-gray-100 shrink-0"
                            />
                          )}
                          <div className="min-w-0 truncate">
                            <h5 className="font-bold text-gray-900 truncate text-xs sm:text-sm">
                              {item.product_name}
                            </h5>
                            <div className="text-gray-500 text-[11px] flex items-center gap-2 mt-0.5">
                              <span className="bg-[#edf7f1] text-[#01722C] px-2 py-0.5 rounded-md font-semibold">
                                {weightLabel}
                              </span>
                              <span>•</span>
                              <span>Qty: {item.quantity}</span>
                              <span>•</span>
                              <span>₹{Number(item.unit_price).toFixed(2)} each</span>
                            </div>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <span className="font-bold text-gray-900 text-sm">
                            ₹{Number(itemTotal).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Delivery Address & Financial Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Delivery Address */}
                <div className="p-4 sm:p-5 rounded-2xl bg-gray-50 border border-gray-200/80 space-y-2 text-xs">
                  <div className="font-bold text-gray-900 flex items-center gap-1.5 uppercase tracking-wider text-[11px] text-gray-500">
                    <MapPin className="w-3.5 h-3.5 text-[#01722C]" />
                    <span>Delivery Address</span>
                  </div>
                  <div className="font-bold text-gray-900 text-sm">
                    {order.customer_name}
                  </div>
                  <div className="text-gray-600 font-mono text-[11px] flex items-center gap-2">
                    <Phone className="w-3 h-3 text-[#01722C]" />
                    <span>{order.customer_phone}</span>
                  </div>
                  <div className="text-gray-600 font-mono text-[11px] flex items-center gap-2">
                    <Mail className="w-3 h-3 text-[#01722C]" />
                    <span>{order.customer_email}</span>
                  </div>
                  <div className="text-gray-700 leading-relaxed pt-1 border-t border-gray-200/60 mt-2">
                    {order.shipping_flat_no}, {order.shipping_street}
                    {order.shipping_landmark ? `, Near ${order.shipping_landmark}` : ""}
                    <br />
                    {order.shipping_city}, {order.shipping_state} -{" "}
                    <strong className="text-gray-900">{order.shipping_pincode}</strong>
                  </div>
                  {order.order_notes && (
                    <div className="mt-2 p-2 bg-amber-50 border border-amber-200 rounded-xl text-[11px] text-amber-800">
                      <strong>Customer Note:</strong> {order.order_notes}
                    </div>
                  )}
                </div>

                {/* Price Breakdown */}
                <div className="p-4 sm:p-5 rounded-2xl bg-gray-50 border border-gray-200/80 space-y-2.5 text-xs">
                  <div className="font-bold text-gray-900 uppercase tracking-wider text-[11px] text-gray-500">
                    Payment & Invoice Summary
                  </div>

                  <div className="space-y-1.5 text-gray-600 pt-1">
                    <div className="flex justify-between">
                      <span>Item Subtotal</span>
                      <span className="font-semibold text-gray-900">
                        ₹{Number(order.subtotal).toFixed(2)}
                      </span>
                    </div>

                    {Number(order.discount_amount) > 0 && (
                      <div className="flex justify-between text-[#01722C] font-bold">
                        <span>Promotional Discount</span>
                        <span>-₹{Number(order.discount_amount).toFixed(2)}</span>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span>Pan-India Shipping Fee</span>
                      <span>
                        {Number(order.shipping_fee) === 0 ? (
                          <strong className="text-[#01722C] font-bold">FREE Standard Delivery</strong>
                        ) : (
                          `₹${Number(order.shipping_fee).toFixed(2)}`
                        )}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span>Applicable GST (0% Organic Agri)</span>
                      <span className="text-gray-500">₹0.00 (Exempt)</span>
                    </div>

                    <div className="pt-2 border-t border-gray-200 flex justify-between items-baseline">
                      <span className="font-bold text-gray-900 text-sm">Grand Total Amount</span>
                      <span className="font-serif font-black text-xl text-[#01722C]">
                        ₹{Number(order.total_amount).toFixed(2)}
                      </span>
                    </div>

                    <div className="text-[11px] text-gray-500 font-medium pt-1">
                      Payment Mode:{" "}
                      <strong className="text-gray-800">
                        {order.payment_method === "COD_VENDOR_CONTACT"
                          ? "Cash / UPI on Delivery (Verified by Vendor Desk)"
                          : order.payment_method}
                      </strong>
                    </div>
                  </div>

                  {/* Quick Switch to Full Invoice View */}
                  <button
                    onClick={() => setActiveTab("invoice")}
                    className="w-full mt-3 py-2.5 px-3 rounded-xl bg-[#01722C] hover:bg-[#0b542c] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>View & Download Official Tax Invoice</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 2: OFFICIAL TAX INVOICE (Screen + Print Perfect)     */}
          {/* ======================================================== */}
          {(activeTab === "invoice" || typeof window !== "undefined") && (
            <div
              id="onaar-official-tax-invoice"
              className={`bg-white rounded-2xl border border-gray-300 p-6 sm:p-8 space-y-6 text-gray-800 text-xs shadow-xs ${
                activeTab !== "invoice" ? "hidden print:block" : "block"
              }`}
            >
              {/* Invoice Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b-2 border-gray-900 pb-4">
                <div className="space-y-1">
                  <BrandLogo variant="dark" size="md" />
                  <p className="text-[10px] text-gray-500 font-mono tracking-tight mt-1">
                    ONAAR ORGANIC FOODS PRIVATE LIMITED
                  </p>
                  <p className="text-[10px] text-gray-500">
                    Plot 104, Organic Agro Park, Central Logistics Zone, Indore, MP - 452001
                  </p>
                  <p className="text-[10px] text-gray-500 font-mono">
                    GSTIN: <strong>23AABCO1234F1Z5</strong> • FSSAI Lic: <strong>11424999000182</strong>
                  </p>
                  <p className="text-[10px] text-gray-500">
                    Helpline: +91-98765 43210 • Email: support@onaar.com
                  </p>
                </div>

                <div className="text-left sm:text-right space-y-1 shrink-0">
                  <div className="inline-block bg-[#01722C] text-white px-3 py-1 rounded-md text-xs font-black uppercase tracking-wider mb-1">
                    Tax Invoice / Bill of Supply
                  </div>
                  <div className="text-sm font-bold font-mono text-gray-900">
                    Invoice No: {invoiceNumber}
                  </div>
                  <div className="text-[11px] text-gray-600">
                    Invoice Date: <strong>{orderDate}</strong>
                  </div>
                  <div className="text-[11px] text-gray-600 font-mono">
                    Order Ref: <strong>{order.order_number}</strong>
                  </div>
                  <div className="text-[11px] text-gray-600">
                    Place of Supply: <strong>{order.shipping_state} (India)</strong>
                  </div>
                </div>
              </div>

              {/* Billed To / Shipped To Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border border-gray-200 rounded-xl p-4 bg-[#faf9f5]">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                    Billed To & Shipped To (Customer)
                  </span>
                  <div className="font-bold text-sm text-gray-900">
                    {order.customer_name}
                  </div>
                  <div className="font-mono text-[11px] text-gray-700">
                    Phone: {order.customer_phone}
                  </div>
                  <div className="font-mono text-[11px] text-gray-700">
                    Email: {order.customer_email}
                  </div>
                  <div className="text-gray-700 leading-relaxed text-[11px] pt-1">
                    {order.shipping_flat_no}, {order.shipping_street}
                    {order.shipping_landmark ? `, Near ${order.shipping_landmark}` : ""}
                    <br />
                    {order.shipping_city}, {order.shipping_state} -{" "}
                    <strong>{order.shipping_pincode}</strong>
                  </div>
                </div>

                <div className="space-y-1 text-[11px] sm:border-l sm:border-gray-200 sm:pl-4">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                    Payment & Dispatch Information
                  </span>
                  <div>
                    Payment Method:{" "}
                    <strong className="text-gray-900">
                      {order.payment_method === "COD_VENDOR_CONTACT"
                        ? "Pay on Delivery (Cash / UPI)"
                        : order.payment_method}
                    </strong>
                  </div>
                  <div>
                    Fulfillment Status:{" "}
                    <strong className="text-[#01722C] uppercase">{currentStatus}</strong>
                  </div>
                  {order.courier_name && (
                    <div>
                      Courier Partner: <strong>{order.courier_name}</strong>
                    </div>
                  )}
                  {order.tracking_awb && (
                    <div className="font-mono">
                      AWB / Consignment: <strong>{order.tracking_awb}</strong>
                    </div>
                  )}
                  <div className="pt-2 text-[10px] text-emerald-800 font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#01722C]" />
                    <span>NPOP / Jaivik Bharat Certified Organic Staples</span>
                  </div>
                </div>
              </div>

              {/* Itemized Invoice Table */}
              <div className="border border-gray-300 rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-[#033b20] text-white font-bold text-[11px] uppercase tracking-wider">
                    <tr>
                      <th className="py-2.5 px-3 text-center w-10">#</th>
                      <th className="py-2.5 px-3">Description of Goods</th>
                      <th className="py-2.5 px-3 text-center">HSN Code</th>
                      <th className="py-2.5 px-3 text-center">Pack Size</th>
                      <th className="py-2.5 px-3 text-center">Qty</th>
                      <th className="py-2.5 px-3 text-right">Unit Rate</th>
                      <th className="py-2.5 px-3 text-center">GST %</th>
                      <th className="py-2.5 px-3 text-right">Total (₹)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 text-gray-800">
                    {(order.items || []).map((item, idx) => {
                      const packLabel =
                        item.weight_label ||
                        item.packaging_size ||
                        item.weight ||
                        "1 Pack";
                      const hsn = getHsnCode(item.product_name);
                      const lineTotal =
                        item.line_total || Number(item.unit_price) * Number(item.quantity);

                      return (
                        <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50/60"}>
                          <td className="py-2.5 px-3 text-center font-mono text-[11px]">
                            {idx + 1}
                          </td>
                          <td className="py-2.5 px-3 font-semibold text-gray-900">
                            {item.product_name}
                          </td>
                          <td className="py-2.5 px-3 text-center font-mono text-[11px] text-gray-600">
                            {hsn}
                          </td>
                          <td className="py-2.5 px-3 text-center font-medium">
                            {packLabel}
                          </td>
                          <td className="py-2.5 px-3 text-center font-bold">
                            {item.quantity}
                          </td>
                          <td className="py-2.5 px-3 text-right font-mono">
                            ₹{Number(item.unit_price).toFixed(2)}
                          </td>
                          <td className="py-2.5 px-3 text-center text-gray-500 font-mono text-[11px]">
                            0% (Exempt)
                          </td>
                          <td className="py-2.5 px-3 text-right font-bold text-gray-900 font-mono">
                            ₹{Number(lineTotal).toFixed(2)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Tax & Grand Total Breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
                {/* Left: Total in Words & Certification Note */}
                <div className="space-y-3 bg-[#fcfbf7] p-4 rounded-xl border border-gray-200 text-xs">
                  <div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                      Total Invoice Amount in Words
                    </span>
                    <strong className="text-gray-900 text-xs leading-relaxed block mt-0.5">
                      {numberToWordsINR(Number(order.total_amount))}
                    </strong>
                  </div>

                  <div className="text-[10px] text-gray-500 space-y-1 border-t border-gray-200 pt-2 leading-relaxed">
                    <div>
                      • Certified pure and unpolished. Unprocessed organic agri-food staples are exempt from GST under Notification No. 2/2017-Central Tax (Rate).
                    </div>
                    <div>
                      • This is a computer-generated tax invoice verified by the ONAAR fulfillment dispatch system.
                    </div>
                  </div>
                </div>

                {/* Right: Numbers Calculation */}
                <div className="border border-gray-200 rounded-xl p-4 bg-gray-50/80 space-y-2 text-xs">
                  <div className="flex justify-between text-gray-700">
                    <span>Taxable Value (Subtotal):</span>
                    <span className="font-mono font-semibold">
                      ₹{Number(order.subtotal).toFixed(2)}
                    </span>
                  </div>

                  {Number(order.discount_amount) > 0 && (
                    <div className="flex justify-between text-[#01722C] font-semibold">
                      <span>Promotional Discount:</span>
                      <span className="font-mono">
                        -₹{Number(order.discount_amount).toFixed(2)}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between text-gray-700">
                    <span>Shipping / Freight Delivery:</span>
                    <span className="font-mono">
                      {Number(order.shipping_fee) === 0 ? "FREE" : `₹${Number(order.shipping_fee).toFixed(2)}`}
                    </span>
                  </div>

                  <div className="flex justify-between text-gray-500 text-[11px]">
                    <span>Integrated GST / CGST+SGST (0%):</span>
                    <span className="font-mono">₹0.00</span>
                  </div>

                  <div className="border-t-2 border-gray-900 pt-2 flex justify-between items-baseline font-bold text-gray-900">
                    <span className="text-sm">Invoice Grand Total:</span>
                    <span className="font-serif font-black text-lg text-[#01722C] font-mono">
                      ₹{Number(order.total_amount).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Signatory & Footer */}
              <div className="border-t border-gray-200 pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[11px] text-gray-500">
                <div className="space-y-0.5">
                  <div className="font-bold text-gray-800">
                    ONAAR Quality & Purity Assurance
                  </div>
                  <div>Direct Farm-to-Kitchen Supply Chain • Madhya Pradesh, India</div>
                </div>

                <div className="text-left sm:text-right space-y-1">
                  <div className="font-serif font-bold text-xs text-[#01722C]">
                    For ONAAR ORGANIC FOODS PVT. LTD.
                  </div>
                  <div className="text-[10px] text-gray-400 italic">
                    [Authorized Digital Seal & Signature]
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Action Bar (Hidden on Print) */}
        <div className="p-4 sm:p-5 border-t border-gray-100 bg-gray-50 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0 print:hidden">
          <div className="flex items-center gap-2 text-xs text-gray-500 w-full sm:w-auto">
            <ShieldCheck className="w-4 h-4 text-[#01722C] shrink-0" />
            <span>Need help with this order? Call helpline: +91-98765 43210</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={handlePrint}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#01722C] hover:bg-[#0b542c] text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print Official Invoice</span>
            </button>
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-gray-300 hover:bg-gray-100 text-gray-700 text-xs font-bold transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
