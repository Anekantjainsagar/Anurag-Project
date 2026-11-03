"use client";

import React, { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import BrandLogo from "@/components/BrandLogo";
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/CartDrawer";
import BulkEnquiryModal from "@/components/BulkEnquiryModal";
import ToastNotification from "@/components/ToastNotification";
import Footer from "@/components/Footer";
import { OrderPayload } from "@/services/emailService";
import {
  CheckCircle2,
  Package,
  Printer,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Sparkles,
  ShoppingBag,
} from "lucide-react";

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderIdParam = searchParams.get("orderId") || "YB-2026-CONFIRMED";
  const [order, setOrder] = useState<OrderPayload | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = sessionStorage.getItem("rj_last_order");
        if (stored) {
          setOrder(JSON.parse(stored));
        }
      } catch {
        // Ignore JSON error
      }
    }
  }, []);

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const customerName = order?.customer.fullName || "Valued Customer";
  const customerEmail = order?.customer.email || "your provided email";
  const customerPhone = order?.customer.phone || "";
  const totalAmount = order?.totalAmount ? `₹${order.totalAmount.toFixed(2)}` : "";
  const paymentMethod = order?.paymentMethod || "Cash on Delivery (COD)";

  const whatsappMessage = encodeURIComponent(
    `Hello ONAAR Support, I have placed order #${orderIdParam} for ${totalAmount}. Please confirm dispatch status.`
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#faf8f4] text-gray-900 font-sans">
      <TopBar />
      <Navbar />

      {/* Order Status Sub-header */}
      <div className="w-full bg-[#edf7f1] border-b border-[#b8ddc6]/70 py-2.5 px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
        <div className="w-full flex items-center justify-between text-xs text-[#01722C]">
          <div className="flex items-center gap-2 font-bold">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#01722C]" />
            <span>Order Confirmed & Payment on Delivery Scheduled</span>
          </div>
          <div className="hidden sm:flex items-center gap-3 text-[11px] font-medium text-emerald-800">
            <span>✓ Farm-Fresh Handpack</span>
            <span>•</span>
            <span>✓ Free Pan-India Delivery</span>
          </div>
        </div>
      </div>

      {/* Main Confirmation Canvas */}
      <main className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 py-10 sm:py-16 flex-1">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Top Success Celebration Card */}
          <div className="bg-white p-6 sm:p-10 rounded-3xl border border-[#e4ebe6] shadow-sm text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#edf7f1] text-[#01722C] flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold text-[#01722C] uppercase tracking-wider">
                Thank You, {customerName}!
              </span>
              <h1 className="font-serif text-2xl sm:text-4xl font-black text-gray-900">
                Your Order is Confirmed!
              </h1>
              <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
                We have received your order. A detailed confirmation receipt has been
                dispatched to <strong className="text-gray-900">{customerEmail}</strong> and
                our central fulfillment desk is preparing your items.
              </p>
            </div>

            {/* Order Meta Ribbon */}
            <div className="inline-flex items-center gap-4 bg-[#fcfbf7] px-5 py-3 rounded-2xl border border-[#e8e2d4] text-xs">
              <div>
                <span className="text-gray-400 block text-[10px] uppercase font-bold">Order ID</span>
                <strong className="text-gray-900 font-mono text-sm">{orderIdParam}</strong>
              </div>
              <div className="h-6 w-px bg-gray-200"></div>
              <div>
                <span className="text-gray-400 block text-[10px] uppercase font-bold">Estimated Delivery</span>
                <strong className="text-[#01722C] font-semibold">3 - 5 Business Days</strong>
              </div>
              <div className="h-6 w-px bg-gray-200"></div>
              <div>
                <span className="text-gray-400 block text-[10px] uppercase font-bold">Payment Status</span>
                <strong className="text-emerald-700 font-semibold">{paymentMethod || "Pay on Delivery / COD"}</strong>
              </div>
            </div>

            {/* Vendor Contact Notice */}
            <div className="p-4 rounded-2xl bg-[#edf7f1] border border-[#b8dfc7] text-left max-w-xl mx-auto flex items-start gap-3 mt-2 shadow-2xs">
              <div className="w-9 h-9 rounded-xl bg-[#01722C] text-white flex items-center justify-center shrink-0 mt-0.5">
                <Phone className="w-4 h-4" />
              </div>
              <div className="space-y-0.5 text-xs text-gray-700">
                <div className="font-bold text-[#013816] text-sm">
                  Vendor Verification & Payment Coordination
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Confirmation emails have been dispatched to both you and our vendor fulfillment team.
                  Our representative will contact you via Phone / WhatsApp to verify delivery details and
                  collect payment upon arrival (Cash or UPI on delivery).
                </p>
              </div>
            </div>
          </div>

          {/* Itemized Invoice & Delivery Summary */}
          {order && (
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#e4ebe6] shadow-2xs space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <h3 className="font-serif text-lg font-bold text-gray-900">
                  Itemized Order Receipt
                </h3>
                <span className="text-xs text-gray-500">{order.items.length} Products</span>
              </div>

              {/* Items List */}
              <div className="divide-y divide-gray-100">
                {order.items.map((item, idx) => (
                  <div key={idx} className="py-3 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-bold text-gray-900">{item.name}</div>
                      <div className="text-[11px] text-gray-500">
                        Variant: {item.weight} • Qty: {item.quantity}
                      </div>
                    </div>
                    <span className="font-bold text-gray-900">₹{item.total.toFixed(2)}</span>
                  </div>
                ))}
              </div>

              {/* Delivery Address Summary */}
              <div className="p-4 rounded-2xl bg-[#fcfbf7] border border-[#e8e2d4] text-xs space-y-1">
                <div className="font-bold text-gray-900 flex items-center gap-1.5 text-xs">
                  <MapPin className="w-3.5 h-3.5 text-[#01722C]" />
                  <span>Delivery Destination:</span>
                </div>
                <p className="text-gray-600 pl-5 leading-relaxed">
                  {order.customer.fullName} ({order.customer.phone})
                  <br />
                  {order.customer.flatNo}, {order.customer.street}
                  {order.customer.landmark ? `, Near ${order.customer.landmark}` : ""},{" "}
                  {order.customer.city}, {order.customer.state} - {order.customer.pincode}
                </p>
              </div>

              {/* Price Breakdown */}
              <div className="pt-2 border-t border-gray-100 space-y-1.5 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-gray-900">₹{order.subtotal.toFixed(2)}</span>
                </div>
                {order.discount && order.discount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>Coupon Discount {order.couponCode ? `(${order.couponCode})` : ""}</span>
                    <span>-₹{order.discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping Fee</span>
                  <span>
                    {order.shippingFee === 0 ? (
                      <strong className="text-emerald-700 font-bold">FREE Standard Delivery</strong>
                    ) : (
                      `₹${order.shippingFee.toFixed(2)}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-base font-black text-gray-900 border-t border-gray-200 pt-2">
                  <span>Total Amount Paid / Due on Delivery</span>
                  <span className="text-[#01722C] font-serif text-xl">
                    ₹{order.totalAmount.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <button
              onClick={handlePrint}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-800 text-xs font-bold px-5 py-3 rounded-xl border border-gray-300 transition-colors shadow-2xs cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print Official Invoice</span>
            </button>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <a
                href={`https://wa.me/919876543210?text=${whatsappMessage}`}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 bg-[#25D366] hover:bg-[#1ebd5b] text-white text-xs font-bold px-5 py-3 rounded-xl transition-colors shadow-xs"
              >
                <span>Track via WhatsApp</span>
              </a>

              <Link
                href="/products"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#01722C] hover:bg-[#0b542c] text-white text-xs font-bold px-6 py-3 rounded-xl transition-all shadow-xs"
              >
                <span>Continue Shopping</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
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

export default function OrderSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-white text-gray-500 text-xs">
          Loading order confirmation...
        </div>
      }
    >
      <OrderSuccessContent />
    </Suspense>
  );
}
