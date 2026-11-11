"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { Product, ProductWeightOption, CartItem } from "@/types";
import { api } from "@/services/apiClient";
import { useAuth } from "@/context/AuthContext";

export type ToastType = "success" | "error" | "warning" | "info";

interface CartContextType {
  cartItems: CartItem[];
  cartCount: number;
  cartTotal: number;
  originalTotal: number;
  totalSavings: number;
  addToCart: (product: Product, option?: ProductWeightOption, quantity?: number) => void;
  removeFromCart: (cartLineId: string) => void;
  updateQuantity: (cartLineId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  isBulkModalOpen: boolean;
  setIsBulkModalOpen: (open: boolean) => void;
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: (open: boolean) => void;
  isTrackModalOpen: boolean;
  setIsTrackModalOpen: (open: boolean) => void;
  toastMessage: string | null;
  toastType: ToastType;
  showToast: (message: string, type?: ToastType) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

function dedupeCartItems(items: CartItem[]): CartItem[] {
  const map = new Map<string, CartItem>();
  for (const item of items) {
    if (!item || !item.id) continue;
    const key = item.id.trim().toLowerCase();
    if (map.has(key)) {
      map.get(key)!.quantity += item.quantity;
    } else {
      map.set(key, { ...item });
    }
  }
  return Array.from(map.values());
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  let authContext: any = null;
  try {
    authContext = useAuth();
  } catch {
    authContext = null;
  }
  const isAuthenticated = authContext?.isAuthenticated;
  const user = authContext?.user;

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const saved = localStorage.getItem("onaar_cart") || localStorage.getItem("yourbrand_cart");
      return saved ? dedupeCartItems(JSON.parse(saved)) : [];
    } catch {
      return [];
    }
  });
  const [wishlist, setWishlist] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const saved = localStorage.getItem("onaar_wishlist") || localStorage.getItem("yourbrand_wishlist");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isTrackModalOpen, setIsTrackModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<ToastType>("success");

  const isCartLoadedFromDb = useRef(false);
  const syncTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastSyncedCartJsonRef = useRef<string>("");
  const isWishlistLoadedFromDb = useRef(false);
  const syncWishlistTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastSyncedWishlistJsonRef = useRef<string>("");

  // 1. Fetch Cart from Database on mount or whenever user identity changes
  useEffect(() => {
    let isMounted = true;

    api.cart
      .getCart()
      .then((res) => {
        if (!isMounted) return;
        const rawDbItems = Array.isArray(res?.items) ? res.items : [];
        const dbItems = dedupeCartItems(rawDbItems);
        setCartItems((prev) => {
          // If backend has items, backend is the single source of truth
          if (dbItems.length > 0) {
            isCartLoadedFromDb.current = true;
            lastSyncedCartJsonRef.current = JSON.stringify(dbItems);
            return dbItems;
          }
          // If backend has no items but user had items in localStorage (guest), keep local items
          if (dbItems.length === 0 && prev.length > 0) {
            isCartLoadedFromDb.current = true;
            return dedupeCartItems(prev);
          }
          // Both empty
          isCartLoadedFromDb.current = true;
          lastSyncedCartJsonRef.current = JSON.stringify([]);
          return [];
        });
      })
      .catch(() => {
        isCartLoadedFromDb.current = true;
      });

    return () => {
      isMounted = false;
    };
  }, [isAuthenticated, user?.id]);

  // 2. Synchronize cart changes to local storage & database (debounced, only on actual change)
  useEffect(() => {
    try {
      localStorage.setItem("onaar_cart", JSON.stringify(cartItems));
    } catch {
      // ignore
    }

    if (!isCartLoadedFromDb.current) return;

    const currentJson = JSON.stringify(cartItems);
    // If the cart items haven't changed from what was loaded/synced, skip network call!
    if (currentJson === lastSyncedCartJsonRef.current) {
      return;
    }

    if (syncTimeoutRef.current) {
      clearTimeout(syncTimeoutRef.current);
    }
    syncTimeoutRef.current = setTimeout(() => {
      lastSyncedCartJsonRef.current = currentJson;
      api.cart.syncCart(cartItems).catch(() => {});
    }, 600);

    return () => {
      if (syncTimeoutRef.current) {
        clearTimeout(syncTimeoutRef.current);
      }
    };
  }, [cartItems]);

  // 3. Wishlist localStorage persistence & debounced DB sync
  useEffect(() => {
    try {
      localStorage.setItem("onaar_wishlist", JSON.stringify(wishlist));
    } catch {
      // ignore
    }

    if (!isWishlistLoadedFromDb.current) return;
    const currentJson = JSON.stringify(wishlist);
    if (currentJson === lastSyncedWishlistJsonRef.current) return;

    if (syncWishlistTimeoutRef.current) {
      clearTimeout(syncWishlistTimeoutRef.current);
    }
    syncWishlistTimeoutRef.current = setTimeout(() => {
      lastSyncedWishlistJsonRef.current = currentJson;
      api.wishlist.syncWishlist(wishlist).catch(() => {});
    }, 600);

    return () => {
      if (syncWishlistTimeoutRef.current) {
        clearTimeout(syncWishlistTimeoutRef.current);
      }
    };
  }, [wishlist]);

  // 4. Fetch Wishlist from Database on mount or user login
  useEffect(() => {
    let isMounted = true;
    api.wishlist
      .getWishlist()
      .then((res) => {
        if (!isMounted) return;
        if (res?.product_ids && Array.isArray(res.product_ids)) {
          setWishlist((prev) => {
            const merged = Array.from(new Set([...res.product_ids, ...prev]));
            isWishlistLoadedFromDb.current = true;
            lastSyncedWishlistJsonRef.current = JSON.stringify(merged);
            return merged;
          });
        } else {
          isWishlistLoadedFromDb.current = true;
        }
      })
      .catch(() => {
        isWishlistLoadedFromDb.current = true;
      });

    return () => {
      isMounted = false;
    };
  }, [isAuthenticated, user?.id]);

  const showToast = (message: string, type?: ToastType) => {
    let resolvedType: ToastType = type || "success";
    if (!type) {
      const lower = message.toLowerCase();
      if (
        lower.includes("suspend") ||
        lower.includes("denied") ||
        lower.includes("error") ||
        lower.includes("failed") ||
        lower.includes("forbidden") ||
        lower.includes("deactivated")
      ) {
        resolvedType = "error";
      } else if (
        lower.includes("warning") ||
        lower.includes("invalid") ||
        lower.includes("required") ||
        lower.includes("empty") ||
        lower.includes("already been redeemed")
      ) {
        resolvedType = "warning";
      }
    }
    setToastType(resolvedType);
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const addToCart = (
    product: Product,
    option?: ProductWeightOption,
    quantity = 1
  ) => {
    const selectedOption = option || product.options[0] || {
      label: product.subtitle,
      price: product.defaultPrice,
      originalPrice: product.defaultOriginalPrice,
      discount: product.defaultDiscount,
    };

    const normWeight = (selectedOption.label || "").trim().toLowerCase().replace(/[\s_-]+/g, "");
    const cartLineId = `${product.id}-${normWeight}`;

    setCartItems((prev) => {
      const existing = prev.find(
        (item) =>
          item.id === cartLineId ||
          (item.productId === product.id &&
            (item.weight || "").trim().toLowerCase().replace(/[\s_-]+/g, "") === normWeight) ||
          (item.name.trim().toLowerCase() === product.name.trim().toLowerCase() &&
            (item.weight || "").trim().toLowerCase().replace(/[\s_-]+/g, "") === normWeight)
      );
      if (existing) {
        return prev.map((item) =>
          item.id === existing.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [
          ...prev,
          {
            id: cartLineId,
            productId: product.id,
            name: product.name,
            subtitle: product.subtitle,
            price: selectedOption.price,
            originalPrice: selectedOption.originalPrice,
            weight: selectedOption.label,
            image: product.image,
            quantity,
          },
        ];
      }
    });

    showToast(`Added "${product.name} (${selectedOption.label})" to cart`);
  };

  const removeFromCart = (cartLineId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== cartLineId));
  };

  const updateQuantity = (cartLineId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartLineId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === cartLineId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    lastSyncedCartJsonRef.current = "[]";
    try {
      localStorage.removeItem("onaar_cart");
    } catch {
      // ignore
    }
    api.cart.clearCart().catch(() => {});
  };

  const toggleWishlist = (productId: string) => {
    const exists = wishlist.includes(productId);
    if (exists) {
      showToast("Removed item from wishlist");
      setWishlist((prev) => prev.filter((id) => id !== productId));
    } else {
      showToast("Saved item to wishlist");
      setWishlist((prev) => [...prev, productId]);
    }
    // Persist to PostgreSQL database asynchronously
    api.wishlist.toggleWishlist(productId).catch(() => {});
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const originalTotal = cartItems.reduce(
    (acc, item) => acc + item.originalPrice * item.quantity,
    0
  );
  const totalSavings = originalTotal - cartTotal;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        cartTotal,
        originalTotal,
        totalSavings,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        wishlist,
        toggleWishlist,
        isInWishlist,
        isBulkModalOpen,
        setIsBulkModalOpen,
        isLoginModalOpen,
        setIsLoginModalOpen,
        isTrackModalOpen,
        setIsTrackModalOpen,
        toastMessage,
        toastType,
        showToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
