"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { CartItem, Product } from "@/lib/types";

const STORAGE_KEY = "noutmarket-cart";
export const FREE_DELIVERY_THRESHOLD = 1_000_000;
export const DELIVERY_FEE = 50_000;

interface CartContextValue {
  cartItems: CartItem[];
  cartCount: number;
  cartTotal: number;
  deliveryFee: number;
  grandTotal: number;
  addToCart: (product: Product, qty?: number) => void;
  removeFromCart: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clearCart: () => void;
  isInCart: (id: string) => boolean;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) setCartItems(JSON.parse(stored) as CartItem[]);
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems, hydrated]);

  const addToCart = useCallback((product: Product, qty = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, qty: i.qty + qty } : i
        );
      }
      return [...prev, { product, qty }];
    });
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCartItems((prev) => prev.filter((i) => i.product.id !== id));
  }, []);

  const updateQty = useCallback((id: string, qty: number) => {
    setCartItems((prev) =>
      prev
        .map((i) => (i.product.id === id ? { ...i, qty: Math.max(1, qty) } : i))
        .filter((i) => i.qty > 0)
    );
  }, []);

  const clearCart = useCallback(() => setCartItems([]), []);

  const isInCart = useCallback(
    (id: string) => cartItems.some((i) => i.product.id === id),
    [cartItems]
  );

  const cartCount = useMemo(
    () => cartItems.reduce((acc, i) => acc + i.qty, 0),
    [cartItems]
  );

  const cartTotal = useMemo(
    () => cartItems.reduce((acc, i) => acc + i.product.price * i.qty, 0),
    [cartItems]
  );

  const deliveryFee = useMemo(
    () =>
      cartItems.length === 0 || cartTotal >= FREE_DELIVERY_THRESHOLD
        ? 0
        : DELIVERY_FEE,
    [cartItems.length, cartTotal]
  );

  const grandTotal = cartTotal + deliveryFee;

  const value: CartContextValue = {
    cartItems,
    cartCount,
    cartTotal,
    deliveryFee,
    grandTotal,
    addToCart,
    removeFromCart,
    updateQty,
    clearCart,
    isInCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
