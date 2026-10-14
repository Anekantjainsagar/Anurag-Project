"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Truck,
  CheckCircle2,
} from "lucide-react";

export default function CartDrawer() {
  const {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    cartCount,
    cartTotal,
    totalSavings,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  if (!isCartOpen) return null;

  const freeShippingThreshold = 500;
  const progressToFreeShipping = Math.min(
    100,
    (cartTotal / freeShippingThreshold) * 100
  );
  const neededForFreeShipping = Math.max(0, freeShippingThreshold - cartTotal);

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderComplete(true);
      clearCart();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end animate-fade-in font-sans">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-2xs transition-opacity"
        onClick={() => {
          setIsCartOpen(false);
          setOrderComplete(false);
        }}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 animate-slide-left">
        {/* Header */}
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between bg-[#fbfdfc]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#044a27]" />
            <h3 className="font-bold text-gray-900 text-base">Your Cart</h3>
            <span className="bg-[#044a27] text-white text-xs px-2 py-0.5 rounded-full font-bold">
              {cartCount}
            </span>
          </div>

          <button
            onClick={() => {
              setIsCartOpen(false);
              setOrderComplete(false);
            }}
            className="p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Meter */}
        <div className="px-5 py-3 bg-[#f3f9f5] border-b border-[#ddede4] text-xs">
          {neededForFreeShipping > 0 ? (
            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5 text-gray-700 font-medium">
                <Truck className="w-3.5 h-3.5 text-[#044a27]" />
                <span>
                  Add{" "}
                  <strong className="text-[#044a27]">
                    ₹{neededForFreeShipping.toFixed(0)}
                  </strong>{" "}
                  more for <strong>FREE Delivery!</strong>
                </span>
              </div>
              <div className="w-full bg-[#d6e8dc] h-2 rounded-full overflow-hidden">
                <div
                  className="bg-[#044a27] h-full rounded-full transition-all duration-500"
                  style={{ width: `${progressToFreeShipping}%` }}
                />
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-[#044a27] font-bold">
              <Truck className="w-4 h-4" />
              <span>You have unlocked FREE Standard Delivery! 🚀</span>
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {orderComplete ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#044a27] mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="font-serif text-2xl font-bold text-gray-900">
                Order Placed Successfully!
              </h4>
              <p className="text-xs text-gray-600 max-w-xs mx-auto leading-relaxed">
                Thank you for choosing pure food. We have received your order
                and our farm-fresh packaging team is preparing your items.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => {
                    setOrderComplete(false);
                    setIsCartOpen(false);
                  }}
                  className="bg-[#044a27] text-white text-xs font-bold px-6 py-3 rounded-full hover:bg-[#03391e] transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          ) : cartItems.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <div className="w-14 h-14 rounded-full bg-gray-100 text-gray-400 mx-auto flex items-center justify-center">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <p className="text-sm font-semibold text-gray-700">
                Your cart is currently empty
              </p>
              <p className="text-xs text-gray-400 max-w-xs mx-auto">
                Explore our best selling rice, pulses, and dry fruits to add
                premium health to your cart.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="bg-[#044a27] text-white text-xs font-semibold px-5 py-2.5 rounded-full"
                >
                  Explore Products
                </button>
              </div>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 p-3 bg-white border border-gray-100 rounded-xl shadow-xs"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg border border-gray-200 shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-xs text-gray-900 truncate">
                    {item.name}
                  </div>
                  <div className="text-[11px] text-gray-500 font-medium mt-0.5">
                    {item.weight}
                  </div>

                  <div className="flex items-center gap-2 mt-1">
                    <span className="font-bold text-xs text-[#044a27]">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </span>
                    {item.originalPrice > item.price && (
                      <span className="text-[10px] text-gray-400 line-through">
                        ₹{(item.originalPrice * item.quantity).toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors p-1"
                    title="Remove item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.quantity - 1)
                      }
                      className="px-2 py-1 hover:bg-gray-200 text-gray-600 transition-colors"
                    >
                      <Minus className="w-2.5 h-2.5" />
                    </button>
                    <span className="px-2.5 py-0.5 text-xs font-bold text-gray-800">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.quantity + 1)
                      }
                      className="px-2 py-1 hover:bg-gray-200 text-gray-600 transition-colors"
                    >
                      <Plus className="w-2.5 h-2.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Summary */}
        {cartItems.length > 0 && !orderComplete && (
          <div className="p-5 border-t border-gray-100 bg-[#fbfdfc] space-y-3">
            <div className="space-y-1.5 text-xs text-gray-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-gray-900">
                  ₹{cartTotal.toFixed(2)}
                </span>
              </div>

              {totalSavings > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Total Discount Savings</span>
                  <span>-₹{totalSavings.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Estimated Shipping</span>
                <span>
                  {neededForFreeShipping === 0 ? (
                    <strong className="text-emerald-700">FREE</strong>
                  ) : (
                    "₹49.00"
                  )}
                </span>
              </div>

              <div className="flex justify-between text-sm font-bold text-gray-900 border-t border-gray-200 pt-2">
                <span>Total Amount</span>
                <span className="text-[#044a27] font-serif text-base">
                  ₹{(cartTotal + (neededForFreeShipping === 0 ? 0 : 49)).toFixed(
                    2
                  )}
                </span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="w-full bg-[#044a27] hover:bg-[#03391e] text-white py-3.5 rounded-full font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer disabled:opacity-50"
            >
              {isCheckingOut ? (
                <span>PROCESSING SECURE ORDER...</span>
              ) : (
                <>
                  <span>PROCEED TO CHECKOUT</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[10px] text-gray-400 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#044a27]" />
              <span>100% Purity Guarantee • Secure Encrypted Payment</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
