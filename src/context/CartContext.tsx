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
      return saved ? JSON.parse(saved) : [];
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

  // Sync cart from database on mount or whenever user logs in / out
  useEffect(() => {
    let isMounted = true;
    const normalizeWeightKey = (w?: string) =>
      (w || "").trim().toLowerCase().replace(/[\s_-]+/g, "");

    const getCartKey = (item: CartItem) => {
      const pid = (item.productId || item.name || item.id).trim().toLowerCase();
      return `${pid}-${normalizeWeightKey(item.weight)}`;
    };

    api.cart
      .getCart()
      .then((res) => {
        if (!isMounted) return;
        if (res?.items && Array.isArray(res.items)) {
          setCartItems((prev) => {
            // Case 1: Backend has items and prev is empty (e.g. new device/browser after login)
            if (res.items.length > 0 && prev.length === 0) {
              isCartLoadedFromDb.current = true;
              return res.items;
            }
            // Case 2: Backend is empty but local has items -> sync local items to DB
            if (res.items.length === 0 && prev.length > 0) {
              api.cart.syncCart(prev).catch(() => {});
              isCartLoadedFromDb.current = true;
              return prev;
            }
            // Case 3: Merge both by product and normalized weight
            const map = new Map<string, CartItem>();
            res.items.forEach((item) => map.set(getCartKey(item), item));
            prev.forEach((item) => {
              const k = getCartKey(item);
              if (map.has(k)) {
                const existing = map.get(k)!;
                map.set(k, {
                  ...item,
                  id: existing.id || item.id,
                  quantity: Math.max(item.quantity, existing.quantity),
                });
              } else {
                map.set(k, item);
              }
            });
            const merged = Array.from(map.values());
            api.cart.syncCart(merged).catch(() => {});
            isCartLoadedFromDb.current = true;
            return merged;
          });
        }
      })
      .catch(() => {
        isCartLoadedFromDb.current = true;
      });

    return () => {
      isMounted = false;
    };
  }, [isAuthenticated, user?.id]);

  // Synchronize cart changes to local storage & database
  useEffect(() => {
    try {
      localStorage.setItem("onaar_cart", JSON.stringify(cartItems));
    } catch {
      // ignore
    }

    if (!isCartLoadedFromDb.current) return;

    if (syncTimeoutRef.current) {
      clearTimeout(syncTimeoutRef.current);
    }
    syncTimeoutRef.current = setTimeout(() => {
      api.cart.syncCart(cartItems).catch(() => {});
    }, 400);

    return () => {
      if (syncTimeoutRef.current) {
        clearTimeout(syncTimeoutRef.current);
      }
    };
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem("onaar_wishlist", JSON.stringify(wishlist));
    } catch {
      // ignore
    }
  }, [wishlist]);

  // Sync wishlist from PostgreSQL database on mount / device load
  useEffect(() => {
    api.wishlist
      .getWishlist()
      .then((res) => {
        if (res?.product_ids && Array.isArray(res.product_ids)) {
          setWishlist((prev) => {
            const merged = Array.from(new Set([...prev, ...res.product_ids]));
            const missingInDb = prev.filter((id) => !res.product_ids.includes(id));
            if (missingInDb.length > 0) {
              api.wishlist.syncWishlist(merged).catch(() => {});
            }
            return merged;
          });
        }
      })
      .catch(() => {});
  }, []);

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
