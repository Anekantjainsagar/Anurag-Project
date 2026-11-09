"use client";

import React, { useState } from "react";
import { Sliders, Save, Store, Truck, MapPin } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function AdminSettingsPage() {
  const { showToast } = useCart();
  const [isSaving, setIsSaving] = useState(false);

  const [shippingPolicy, setShippingPolicy] = useState({
    free_shipping_threshold: 499,
    standard_shipping_fee: 49,
    express_shipping_fee: 99,
  });

  const [storeDetails, setStoreDetails] = useState({
    name: "ONAAR Organic Foods",
    legal_entity: "ONAAR Pure Harvest Agri Pvt Ltd",
    contact_phone: "+91 98765 43210",
    support_email: "support@onaar.com",
    gst_number: "23AABCU9603R1ZM",
    fssai_license: "11422850000341",
    warehouse_address: "Khasra No. 142/2, Nemawar Agro Hub, Bypass Road, Indore, Madhya Pradesh - 452016",
  });

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      showToast("Store policies & fulfillment parameters saved successfully!");
    }, 400);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Top Banner */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold text-slate-900 font-serif flex items-center gap-2">
            <Sliders className="w-4 h-4 text-emerald-700" />
            <span>Store Policies, CMS &amp; Fulfillment Settings</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure free shipping thresholds, logistics dispatch centers, and vendor regulatory identifiers.
          </p>
        </div>
      </div>

      <form onSubmit={handleSaveSettings} className="space-y-6">
        {/* Logistics & Shipping Thresholds */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
            <Truck className="w-4 h-4 text-emerald-700" />
            <span>Shipping Rates &amp; Free Delivery Policy</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">
                Free Shipping Order Threshold (₹) *
              </label>
              <input
                type="number"
                required
                value={shippingPolicy.free_shipping_threshold}
                onChange={(e) =>
                  setShippingPolicy({
                    ...shippingPolicy,
                    free_shipping_threshold: Number(e.target.value),
                  })
                }
                className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono text-xs focus:outline-emerald-600"
              />
              <p className="text-[10px] text-slate-400 mt-1">Orders above this cart value ship free across India.</p>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">
                Standard Shipping Fee (₹)
              </label>
              <input
                type="number"
                required
                value={shippingPolicy.standard_shipping_fee}
                onChange={(e) =>
                  setShippingPolicy({
                    ...shippingPolicy,
                    standard_shipping_fee: Number(e.target.value),
                  })
                }
                className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono text-xs focus:outline-emerald-600"
              />
              <p className="text-[10px] text-slate-400 mt-1">Applied when cart value is below free threshold.</p>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">
                Express Priority Delivery Fee (₹)
              </label>
              <input
                type="number"
                required
                value={shippingPolicy.express_shipping_fee}
                onChange={(e) =>
                  setShippingPolicy({
                    ...shippingPolicy,
                    express_shipping_fee: Number(e.target.value),
                  })
                }
                className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono text-xs focus:outline-emerald-600"
              />
              <p className="text-[10px] text-slate-400 mt-1">For urgent air-courier dispatch.</p>
            </div>
          </div>
        </div>

        {/* Vendor & Regulatory Identifiers */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
            <Store className="w-4 h-4 text-emerald-700" />
            <span>Store Profile &amp; Regulatory Credentials</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Brand Trading Name</label>
              <input
                type="text"
                value={storeDetails.name}
                onChange={(e) => setStoreDetails({ ...storeDetails, name: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-emerald-600"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Registered Legal Entity</label>
              <input
                type="text"
                value={storeDetails.legal_entity}
                onChange={(e) => setStoreDetails({ ...storeDetails, legal_entity: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-emerald-600"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Customer Helpline Phone</label>
              <input
                type="text"
                value={storeDetails.contact_phone}
                onChange={(e) => setStoreDetails({ ...storeDetails, contact_phone: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono focus:outline-emerald-600"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Official Support Email</label>
              <input
                type="email"
                value={storeDetails.support_email}
                onChange={(e) => setStoreDetails({ ...storeDetails, support_email: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono focus:outline-emerald-600"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">GSTIN Number</label>
              <input
                type="text"
                value={storeDetails.gst_number}
                onChange={(e) => setStoreDetails({ ...storeDetails, gst_number: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono uppercase focus:outline-emerald-600"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">FSSAI Organic License #</label>
              <input
                type="text"
                value={storeDetails.fssai_license}
                onChange={(e) => setStoreDetails({ ...storeDetails, fssai_license: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono focus:outline-emerald-600"
              />
            </div>
          </div>
        </div>

        {/* Central Warehouse Destination */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
            <MapPin className="w-4 h-4 text-emerald-700" />
            <span>Central Sort &amp; Packaging Warehouse Address</span>
          </div>

          <div className="text-xs">
            <label className="font-bold text-slate-700 block mb-1">Physical Dispatch Address</label>
            <textarea
              rows={3}
              value={storeDetails.warehouse_address}
              onChange={(e) =>
                setStoreDetails({ ...storeDetails, warehouse_address: e.target.value })
              }
              className="w-full px-3 py-2 rounded-xl border border-slate-200 leading-relaxed focus:outline-emerald-600"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className="bg-emerald-700 hover:bg-emerald-800 text-white px-6 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-xs cursor-pointer disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? "Saving..." : "Save All Store Settings"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
