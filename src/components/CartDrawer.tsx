"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
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
} from "lucide-react";

export default function CartDrawer() {
  const router = useRouter();
  const {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    cartCount,
    cartTotal,
    totalSavings,
    updateQuantity,
    removeFromCart,
  } = useCart();

  // Lock body scroll and listen for Escape key when cart drawer is open
  useEffect(() => {
    if (isCartOpen) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") setIsCartOpen(false);
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = prevOverflow;
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isCartOpen, setIsCartOpen]);

  if (!isCartOpen) return null;

  const freeShippingThreshold = 499;
  const progressToFreeShipping = Math.min(
    100,
    (cartTotal / freeShippingThreshold) * 100
  );
  const neededForFreeShipping = Math.max(0, freeShippingThreshold - cartTotal);

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    router.push("/checkout");
  };

  return (
    <div className="fixed inset-0 z-[100] flex justify-end font-sans">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-2xs animate-fade-in"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 animate-slide-left">
        {/* Header */}
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between bg-[#fbfdfc]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#01722C]" />
            <h3 className="font-serif font-black text-gray-900 text-base">Your Cart</h3>
            <span className="bg-[#01722C] text-white text-xs px-2.5 py-0.5 rounded-full font-bold">
              {cartCount} Items
            </span>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Meter */}
        <div className="px-5 py-3 bg-[#edf7f1] border-b border-[#cfe6d8] text-xs">
          {neededForFreeShipping > 0 ? (
            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5 text-gray-800 font-medium">
                <Truck className="w-3.5 h-3.5 text-[#01722C]" />
                <span>
                  Add{" "}
                  <strong className="text-[#01722C]">
                    ₹{neededForFreeShipping.toFixed(0)}
                  </strong>{" "}
                  more to unlock <strong>FREE Delivery!</strong>
                </span>
              </div>
              <div className="w-full bg-[#d6e8dc] h-2 rounded-full overflow-hidden">
                <div
                  className="bg-[#01722C] h-full rounded-full transition-all duration-500"
                  style={{ width: `${progressToFreeShipping}%` }}
                />
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-[#01722C] font-bold">
              <Truck className="w-4 h-4 text-[#01722C]" />
              <span>You have unlocked FREE Standard Delivery! 🚀</span>
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="flex-1 min-h-0 overflow-y-auto p-5 space-y-3.5">
          {cartItems.length === 0 ? (
            <div className="py-16 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#edf7f1] text-[#01722C] mx-auto flex items-center justify-center">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h4 className="font-serif text-lg font-bold text-gray-900">
                Your cart is empty
              </h4>
              <p className="text-xs text-gray-500 max-w-xs mx-auto">
                Explore our 192 organic pulses, spices, raw honey, and whole grains to fill your pantry.
              </p>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  router.push("/products");
                }}
                className="bg-[#01722C] text-white text-xs font-bold px-6 py-2.5 rounded-xl hover:bg-[#0b542c] transition-colors cursor-pointer"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-3 p-3 bg-[#faf9f5] border border-[#ece4d6] rounded-xl hover:border-[#01722C] transition-colors"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg border border-gray-200 shrink-0 bg-white"
                />

                <div className="flex-1 min-w-0">
                  <div className="font-bold text-xs text-gray-900 truncate">
                    {item.name}
                  </div>
                  <div className="text-[11px] text-gray-500 font-medium mt-0.5">
                    {item.weight}
                  </div>

                  <div className="flex items-center gap-2 mt-1">
                    <span className="font-bold text-xs text-[#01722C]">
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
                    className="text-gray-400 hover:text-red-500 transition-colors p-1 cursor-pointer"
                    title="Remove item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white shadow-2xs">
                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.quantity - 1)
                      }
                      className="px-2 py-1 hover:bg-gray-100 text-gray-700 transition-colors cursor-pointer"
                    >
                      <Minus className="w-2.5 h-2.5" />
                    </button>
                    <span className="px-2.5 py-0.5 text-xs font-bold text-gray-900">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.quantity + 1)
                      }
                      className="px-2 py-1 hover:bg-gray-100 text-gray-700 transition-colors cursor-pointer"
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
        {cartItems.length > 0 && (
          <div className="p-5 border-t border-gray-100 bg-[#fbfdfc] space-y-3.5">
            <div className="space-y-1.5 text-xs text-gray-600">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="font-bold text-gray-900">
                  ₹{cartTotal.toFixed(2)}
                </span>
              </div>

              {totalSavings > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Organic Savings</span>
                  <span>-₹{totalSavings.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Shipping</span>
                <span>
                  {neededForFreeShipping === 0 ? (
                    <strong className="text-emerald-700">FREE Standard Delivery</strong>
                  ) : (
                    "₹50.00 (Standard Delivery)"
                  )}
                </span>
              </div>

              <div className="flex justify-between text-sm font-bold text-gray-900 border-t border-gray-200 pt-2">
                <span>Total Amount</span>
                <span className="text-[#01722C] font-serif text-lg font-black">
                  ₹{(cartTotal + (neededForFreeShipping === 0 ? 0 : 50)).toFixed(2)}
                </span>
              </div>
            </div>

            <button
              onClick={handleProceedToCheckout}
              className="w-full bg-[#01722C] hover:bg-[#0b542c] text-white py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
            >
              <span>PROCEED TO CHECKOUT</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[10.5px] text-gray-400 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#01722C]" />
              <span>Certified Organic • 100% Secure Checkout</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
