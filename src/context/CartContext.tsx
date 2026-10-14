"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, ProductWeightOption, CartItem } from "@/types";

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
  showToast: (message: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isTrackModalOpen, setIsTrackModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load initial cart and wishlist from localStorage if available
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("yourbrand_cart");
      if (savedCart) setCartItems(JSON.parse(savedCart));

      const savedWishlist = localStorage.getItem("yourbrand_wishlist");
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
    } catch {
      // ignore
    }
  }, []);

  // Save changes
  useEffect(() => {
    try {
      localStorage.setItem("yourbrand_cart", JSON.stringify(cartItems));
    } catch {
      // ignore
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem("yourbrand_wishlist", JSON.stringify(wishlist));
    } catch {
      // ignore
    }
  }, [wishlist]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
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

    const cartLineId = `${product.id}-${selectedOption.label}`;

    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === cartLineId);
      if (existing) {
        return prev.map((item) =>
          item.id === cartLineId
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

  const clearCart = () => setCartItems([]);

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast("Removed item from wishlist");
        return prev.filter((id) => id !== productId);
      } else {
        showToast("Saved item to wishlist");
        return [...prev, productId];
      }
    });
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
