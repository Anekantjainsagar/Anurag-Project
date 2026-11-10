"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Search,
  X,
  Truck,
  Eye,
  RefreshCw,
  Users,
  MapPin,
  CheckCircle,
  Package,
} from "lucide-react";
import { api } from "@/services/apiClient";
import { useCart } from "@/context/CartContext";

function OrdersContent() {
  const { showToast } = useCart();
  const searchParams = useSearchParams();
  const initialUserId = searchParams.get("userId");

  const [orders, setOrders] = useState<any[]>([]);
  const [isLoadingOrders, setIsLoadingOrders] = useState(true);
  const [orderFilter, setOrderFilter] = useState("ALL");
  const [orderSearch, setOrderSearch] = useState("");
  const [orderUserFilter, setOrderUserFilter] = useState<string | null>(initialUserId);
  const [orderUserFilterName, setOrderUserFilterName] = useState<string | null>(null);

  // Modals state
  const [inspectedOrder, setInspectedOrder] = useState<any | null>(null);
  const [isLoadingInspectedOrder, setIsLoadingInspectedOrder] = useState(false);
  const [selectedOrderForDispatch, setSelectedOrderForDispatch] = useState<any | null>(null);
  const [isUpdatingOrder, setIsUpdatingOrder] = useState(false);
  const [dispatchForm, setDispatchForm] = useState({
    courier_name: "Delhivery Express",
    tracking_awb: "",
  });

  const loadOrders = async (overrideUserId?: string | null, overrideSearch?: string) => {
    setIsLoadingOrders(true);
    try {
      const uid = overrideUserId !== undefined ? overrideUserId : orderUserFilter;
      const srch = overrideSearch !== undefined ? overrideSearch : orderSearch;
      const data = await api.admin.getOrders({
        status: orderFilter === "ALL" ? undefined : orderFilter,
        search: srch || undefined,
        user_id: uid || undefined,
      });
      setOrders(data || []);
    } catch (err: any) {
      showToast(err.message || "Failed to load orders");
      setOrders([]);
    } finally {
      setIsLoadingOrders(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, [orderFilter]);

  const handleInspectOrder = async (orderId: string) => {
    setIsLoadingInspectedOrder(true);
    setInspectedOrder(null);
    try {
      const fullOrder = await api.admin.getOrder(orderId);
      setInspectedOrder(fullOrder);
    } catch (err: any) {
      showToast(err.message || "Failed to load order details");
    } finally {
      setIsLoadingInspectedOrder(false);
    }
  };

  const handleDispatchOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrderForDispatch || !dispatchForm.tracking_awb.trim()) {
      showToast("Please enter tracking AWB");
      return;
    }
    setIsUpdatingOrder(true);
    try {
      await api.admin.dispatchOrder(
        selectedOrderForDispatch.id,
        dispatchForm.courier_name,
        dispatchForm.tracking_awb.trim()
      );
      showToast(`Order dispatched via ${dispatchForm.courier_name || "courier"}!`);
      setSelectedOrderForDispatch(null);
      setDispatchForm({ courier_name: "Delhivery Express", tracking_awb: "" });
      loadOrders();
    } catch (err: any) {
      showToast(err.message || "Failed to dispatch order");
    } finally {
      setIsUpdatingOrder(false);
    }
  };

  const handleClearOrderUserFilter = () => {
    setOrderUserFilter(null);
    setOrderUserFilterName(null);
    loadOrders(null, orderSearch);
  };

  return (
    <div className="space-y-4">
      {/* Order Controls Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Status Filters */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
            {["ALL", "PENDING_VERIFICATION", "CONFIRMED", "DISPATCHED", "DELIVERED", "CANCELLED"].map((st) => (
              <button
                key={st}
                onClick={() => setOrderFilter(st)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-all whitespace-nowrap ${
                  orderFilter === st
                    ? "bg-emerald-700 text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {st.replace(/_/g, " ")}
              </button>
            ))}
          </div>

          {/* Search Orders & Refresh */}
          <div className="flex items-center gap-2">
            <div className="relative min-w-[240px] flex-1">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search Order #, Customer, Phone..."
                value={orderSearch}
                onChange={(e) => {
                  setOrderSearch(e.target.value);
                  loadOrders(orderUserFilter, e.target.value);
                }}
                className="w-full pl-9 pr-8 py-1.5 rounded-xl border border-slate-200 text-xs focus:outline-emerald-600 bg-slate-50 focus:bg-white transition-all"
              />
              {orderSearch && (
                <button
                  onClick={() => {
                    setOrderSearch("");
                    loadOrders(orderUserFilter, "");
                  }}
                  className="absolute right-2.5 top-2 text-slate-400 hover:text-slate-600 text-xs cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <button
              onClick={() => loadOrders()}
              className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors cursor-pointer shrink-0"
              title="Refresh Orders"
            >
              <RefreshCw className={`w-4 h-4 ${isLoadingOrders ? "animate-spin" : ""}`} />
            </button>
          </div>
        </div>

        {/* Filtered by Customer Indicator Banner */}
        {orderUserFilter && (
          <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 px-3.5 py-2 rounded-xl text-xs text-emerald-800">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-emerald-600" />
              <span>
                Showing orders placed by <strong>{orderUserFilterName || `Customer (${orderUserFilter})`}</strong>
              </span>
            </div>
            <button
              onClick={handleClearOrderUserFilter}
              className="text-xs font-bold text-emerald-700 hover:text-emerald-900 underline cursor-pointer"
            >
              Clear Customer Filter (Show All Orders)
            </button>
          </div>
        )}
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 font-semibold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="px-5 py-3.5">Order ID & Date</th>
                <th className="px-4 py-3.5">Customer</th>
                <th className="px-4 py-3.5">Items Ordered</th>
                <th className="px-4 py-3.5">Total & Payment</th>
                <th className="px-4 py-3.5">Status</th>
                <th className="px-4 py-3.5">Logistics & AWB</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoadingOrders ? (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center text-slate-400">
                    <RefreshCw className="w-5 h-5 animate-spin mx-auto mb-2 text-emerald-600" />
                    Loading dispatch queue...
                  </td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center text-slate-400">
                    <Package className="w-6 h-6 mx-auto mb-2 text-slate-300" />
                    No orders match the current filter.
                  </td>
                </tr>
              ) : (
                orders.map((o) => {
                  let statusColor = "bg-slate-100 text-slate-700 border-slate-200";
                  if (o.order_status === "PENDING_VERIFICATION")
                    statusColor = "bg-amber-50 text-amber-800 border-amber-200";
                  if (o.order_status === "CONFIRMED")
                    statusColor = "bg-blue-50 text-blue-800 border-blue-200";
                  if (o.order_status === "DISPATCHED")
                    statusColor = "bg-purple-50 text-purple-800 border-purple-200";
                  if (o.order_status === "DELIVERED")
                    statusColor = "bg-emerald-50 text-emerald-800 border-emerald-200";
                  if (o.order_status === "CANCELLED")
                    statusColor = "bg-rose-50 text-rose-800 border-rose-200";

                  return (
                    <tr key={o.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-5 py-3.5">
                        <div className="font-bold text-slate-900 font-mono">
                          #{o.order_number || o.id.slice(0, 8)}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {o.created_at ? new Date(o.created_at).toLocaleDateString("en-IN") : "Recent"}
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        {o.user_id ? (
                          <Link
                            href={`/admin/users?highlight=${o.user_id}`}
                            className="text-left font-bold text-emerald-700 hover:underline cursor-pointer block"
                            title="View customer profile"
                          >
                            {o.customer_name || "Customer"}
                          </Link>
                        ) : (
                          <div className="font-bold text-slate-900">{o.customer_name || "Customer"}</div>
                        )}
                        <div className="text-[11px] text-slate-500 font-mono">{o.customer_phone}</div>
                        {o.customer_email && (
                          <div className="text-[10px] text-slate-400 truncate max-w-[150px]">{o.customer_email}</div>
                        )}
                      </td>
                      <td className="px-4 py-3.5 max-w-[220px]">
                        <div className="font-medium text-slate-800 truncate">
                          {o.items && o.items.length > 0
                            ? o.items.map((i: any) => `${i.product_name} (${i.weight_label}) ×${i.quantity}`).join(", ")
                            : "Items in package"}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {o.items?.length || 0} distinct pack sizes
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="font-bold text-slate-900 font-mono">
                          ₹{Number(o.total_amount).toFixed(2)}
                        </div>
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                          {o.payment_method === "COD_VENDOR_CONTACT" ? "Pay on Delivery (COD)" : o.payment_method}
                        </span>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${statusColor}`}>
                          {o.order_status.replace(/_/g, " ")}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-slate-600 font-mono text-[11px]">
                        {o.courier_name ? (
                          <div>
                            <div className="font-bold text-slate-800">{o.courier_name}</div>
                            <div className="text-[10px] text-slate-500">{o.tracking_awb}</div>
                          </div>
                        ) : (
                          <span className="text-slate-400 italic">Pending dispatch</span>
                        )}
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleInspectOrder(o.id)}
                            className="p-1.5 bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 rounded-lg cursor-pointer transition-all"
                            title="Inspect Order Details"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          {o.order_status !== "DELIVERED" && o.order_status !== "CANCELLED" && (
                            <button
                              onClick={() => {
                                setSelectedOrderForDispatch(o);
                                setDispatchForm({
                                  courier_name: o.courier_name || "Delhivery Express",
                                  tracking_awb: o.tracking_awb || "",
                                });
                              }}
                              className="bg-emerald-700 hover:bg-emerald-800 text-white px-2.5 py-1 rounded-lg text-xs font-bold cursor-pointer transition-all flex items-center gap-1 shadow-xs"
                            >
                              <Truck className="w-3 h-3" />
                              <span>Dispatch</span>
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* DISPATCH ORDER MODAL */}
      {selectedOrderForDispatch && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setSelectedOrderForDispatch(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-fade-in overflow-y-auto"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl sm:rounded-3xl max-w-md w-full my-auto shadow-2xl border border-slate-100 p-4 sm:p-6 space-y-4 text-xs"
          >
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-base font-bold text-slate-900 font-serif">
                Dispatch Order #{selectedOrderForDispatch.order_number || selectedOrderForDispatch.id.slice(0, 8)}
              </h3>
              <button
                onClick={() => setSelectedOrderForDispatch(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleDispatchOrder} className="space-y-3">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Courier Partner</label>
                <select
                  value={dispatchForm.courier_name}
                  onChange={(e) => setDispatchForm({ ...dispatchForm, courier_name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 font-medium bg-white"
                >
                  <option value="Delhivery Express">Delhivery Express</option>
                  <option value="Blue Dart Express">Blue Dart Express</option>
                  <option value="DTDC Surface">DTDC Surface</option>
                  <option value="India Post Speed Post">India Post Speed Post</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Tracking AWB Number *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. DLHVY8923471029"
                  value={dispatchForm.tracking_awb}
                  onChange={(e) => setDispatchForm({ ...dispatchForm, tracking_awb: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono"
                />
              </div>

              <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2 border-t border-slate-100 pt-4">
                <button
                  type="button"
                  onClick={() => setSelectedOrderForDispatch(null)}
                  className="w-full sm:w-auto px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl font-bold cursor-pointer text-center whitespace-nowrap"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUpdatingOrder}
                  className="w-full sm:w-auto px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold cursor-pointer disabled:opacity-50 text-center whitespace-nowrap shadow-xs"
                >
                  {isUpdatingOrder ? "Dispatching..." : "Confirm & Send Tracking"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* FULL ORDER INSPECTION MODAL */}
      {inspectedOrder && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setInspectedOrder(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-fade-in overflow-y-auto"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl sm:rounded-3xl max-w-3xl w-full max-h-[92dvh] sm:max-h-[90vh] my-auto overflow-y-auto shadow-2xl border border-slate-100 p-4 sm:p-6 space-y-6 text-xs"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-slate-900 font-mono">
                      Order #{inspectedOrder.order_number || inspectedOrder.id.slice(0, 8)}
                    </h3>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      {inspectedOrder.order_status}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                    Placed on: {inspectedOrder.created_at ? new Date(inspectedOrder.created_at).toLocaleString("en-IN") : "Recent"}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setInspectedOrder(null)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Customer & Shipping Summary Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2">
                <div className="font-bold text-slate-900 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Customer Details</span>
                  </span>
                  {inspectedOrder.user_id && (
                    <Link
                      href={`/admin/users?highlight=${inspectedOrder.user_id}`}
                      className="text-[10px] text-emerald-700 hover:underline cursor-pointer font-bold"
                    >
                      View Profile →
                    </Link>
                  )}
                </div>
                <div className="font-semibold text-slate-800">{inspectedOrder.customer_name}</div>
                <div className="text-slate-600 font-mono">{inspectedOrder.customer_phone}</div>
                <div className="text-slate-500">{inspectedOrder.customer_email}</div>
                {inspectedOrder.order_notes && (
                  <div className="text-[11px] text-slate-600 bg-white p-2 rounded-xl border border-slate-200 mt-2">
                    <strong>Customer Note:</strong> {inspectedOrder.order_notes}
                  </div>
                )}
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2">
                <div className="font-bold text-slate-900 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Delivery Destination</span>
                </div>
                <div className="text-slate-700 leading-relaxed">
                  {inspectedOrder.shipping_flat_no}, {inspectedOrder.shipping_street}
                  {inspectedOrder.shipping_landmark && `, ${inspectedOrder.shipping_landmark}`}
                  <br />
                  {inspectedOrder.shipping_city}, {inspectedOrder.shipping_state} - {inspectedOrder.shipping_pincode}
                </div>
                <div className="pt-1 flex items-center gap-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                    Payment: {inspectedOrder.payment_method === "COD_VENDOR_CONTACT" ? "Pay on Delivery (COD)" : inspectedOrder.payment_method}
                  </span>
                </div>
              </div>
            </div>

            {/* Line Items Table */}
            <div className="border border-slate-200 rounded-2xl overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 font-semibold uppercase text-[10px]">
                  <tr>
                    <th className="px-4 py-2.5">Crop Item</th>
                    <th className="px-3 py-2.5">Pack Size</th>
                    <th className="px-3 py-2.5 text-right">Unit Price</th>
                    <th className="px-3 py-2.5 text-center">Qty</th>
                    <th className="px-4 py-2.5 text-right">Line Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {inspectedOrder.items && inspectedOrder.items.length > 0 ? (
                    inspectedOrder.items.map((item: any) => (
                      <tr key={item.id} className="hover:bg-slate-50">
                        <td className="px-4 py-3 font-semibold text-slate-800">
                          {item.product_name}
                        </td>
                        <td className="px-3 py-3 font-mono text-slate-500">{item.weight_label}</td>
                        <td className="px-3 py-3 text-right font-mono text-slate-600">₹{Number(item.unit_price).toFixed(2)}</td>
                        <td className="px-3 py-3 text-center font-bold text-slate-900">{item.quantity}</td>
                        <td className="px-4 py-3 text-right font-bold text-slate-900 font-mono">
                          ₹{Number(item.line_total).toFixed(2)}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-4 py-6 text-center text-slate-400">
                        No item breakdown available.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              {/* Price Calculation Summary */}
              <div className="bg-slate-50 p-4 border-t border-slate-200 flex flex-col items-end space-y-1 font-mono text-xs">
                <div className="flex justify-between w-64 text-slate-600">
                  <span>Subtotal:</span>
                  <span>₹{Number(inspectedOrder.subtotal || inspectedOrder.total_amount).toFixed(2)}</span>
                </div>
                <div className="flex justify-between w-64 text-slate-600">
                  <span>Shipping Fee:</span>
                  <span>₹{Number(inspectedOrder.shipping_fee || 0).toFixed(2)}</span>
                </div>
                {Number(inspectedOrder.discount_amount || 0) > 0 && (
                  <div className="flex justify-between w-64 text-emerald-700">
                    <span>Discount:</span>
                    <span>-₹{Number(inspectedOrder.discount_amount).toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between w-64 text-slate-900 font-bold border-t border-slate-200 pt-1 text-sm">
                  <span>Grand Total:</span>
                  <span>₹{Number(inspectedOrder.total_amount).toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Logistics & Tracking Timeline */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Logistics & Courier Tracking</span>
                </span>
                {inspectedOrder.courier_name && (
                  <span className="font-mono text-xs font-bold text-slate-800">
                    {inspectedOrder.courier_name} · AWB: {inspectedOrder.tracking_awb}
                  </span>
                )}
              </div>

              {inspectedOrder.tracking_events && inspectedOrder.tracking_events.length > 0 ? (
                <div className="space-y-2 relative pl-4 border-l-2 border-emerald-300 ml-2">
                  {inspectedOrder.tracking_events.map((evt: any) => (
                    <div key={evt.id} className="relative">
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-600 absolute -left-[21px] top-1"></div>
                      <div className="font-bold text-slate-800">{evt.title}</div>
                      <div className="text-slate-600 text-[11px]">{evt.description}</div>
                      <div className="text-[10px] text-slate-400 font-mono">
                        {evt.location && `${evt.location} · `}
                        {evt.timestamp ? new Date(evt.timestamp).toLocaleString("en-IN") : ""}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-slate-400 italic text-[11px]">No shipment milestones recorded yet.</div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between border-t border-slate-100 pt-3">
              <div>
                {inspectedOrder.order_status !== "DELIVERED" && inspectedOrder.order_status !== "CANCELLED" && (
                  <button
                    onClick={() => {
                      setSelectedOrderForDispatch(inspectedOrder);
                      setDispatchForm({
                        courier_name: inspectedOrder.courier_name || "Delhivery Express",
                        tracking_awb: inspectedOrder.tracking_awb || "",
                      });
                      setInspectedOrder(null);
                    }}
                    className="bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2 rounded-xl font-bold flex items-center gap-1.5 shadow-xs cursor-pointer"
                  >
                    <Truck className="w-4 h-4" />
                    <span>Dispatch Package</span>
                  </button>
                )}
              </div>
              <button
                onClick={() => setInspectedOrder(null)}
                className="px-5 py-2 bg-slate-900 text-white rounded-xl font-bold cursor-pointer hover:bg-slate-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminOrdersPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs text-slate-400">Loading orders...</div>}>
      <OrdersContent />
    </Suspense>
  );
}
