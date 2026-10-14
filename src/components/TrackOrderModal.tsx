"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import {
  X,
  Search,
  Package,
  CheckCircle,
  Truck,
  MapPin,
  Clock,
} from "lucide-react";

export default function TrackOrderModal() {
  const { isTrackModalOpen, setIsTrackModalOpen } = useCart();
  const [orderId, setOrderId] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  if (!isTrackModalOpen) return null;

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderId.trim()) {
      setHasSearched(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in font-sans">
      <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-gray-100 relative">
        {/* Header */}
        <div className="p-5 bg-[#033b20] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-[#58cf8b]" />
            <h3 className="font-serif font-bold text-lg">Track Your Order</h3>
          </div>
          <button
            onClick={() => {
              setIsTrackModalOpen(false);
              setHasSearched(false);
            }}
            className="text-white/70 hover:text-white p-1 rounded-full cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 text-xs">
          <form onSubmit={handleTrack} className="flex gap-2">
            <input
              type="text"
              placeholder="Enter Order ID (e.g. YB-8921)"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              className="flex-1 bg-[#f8faf9] border border-gray-200 rounded-lg px-3 py-2.5 text-gray-900 focus:outline-none focus:border-[#044a27]"
            />
            <button
              type="submit"
              className="bg-[#044a27] hover:bg-[#03391e] text-white font-bold px-5 py-2.5 rounded-lg flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Track</span>
            </button>
          </form>

          {/* Quick Demo Pill */}
          <div className="flex items-center gap-2 text-gray-500 text-[11px]">
            <span>Try sample order:</span>
            <button
              type="button"
              onClick={() => {
                setOrderId("YB-8921-IN");
                setHasSearched(true);
              }}
              className="text-[#044a27] font-semibold underline cursor-pointer"
            >
              YB-8921-IN
            </button>
          </div>

          {hasSearched && (
            <div className="border border-[#d9e6de] bg-[#f9fbf9] rounded-xl p-4 space-y-4 animate-fade-in">
              <div className="flex justify-between items-start border-b border-gray-200 pb-3">
                <div>
                  <div className="font-bold text-sm text-gray-900">
                    Order #{orderId || "YB-8921-IN"}
                  </div>
                  <div className="text-[11px] text-gray-500">
                    Placed on 12 Oct 2026 • 2 items (Basmati Rice, Toor Dal)
                  </div>
                </div>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  IN TRANSIT
                </span>
              </div>

              {/* Progress Steps */}
              <div className="space-y-4 pt-1">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#044a27] text-white flex items-center justify-center shrink-0">
                    <CheckCircle className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">
                      Order Confirmed & Farm Packed
                    </div>
                    <div className="text-gray-500 text-[10px]">
                      12 Oct 2026, 11:30 AM • Indore Warehouse
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#044a27] text-white flex items-center justify-center shrink-0">
                    <Truck className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">
                      Dispatched with Bluedart Express
                    </div>
                    <div className="text-gray-500 text-[10px]">
                      13 Oct 2026, 04:15 PM • AWB: 7891230491
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 animate-pulse">
                    <Clock className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">
                      Out for Delivery
                    </div>
                    <div className="text-gray-500 text-[10px]">
                      Expected Today by 05:00 PM
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 opacity-40">
                  <div className="w-6 h-6 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center shrink-0">
                    <MapPin className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">Delivered</div>
                    <div className="text-gray-500 text-[10px]">
                      Pending delivery confirmation
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
