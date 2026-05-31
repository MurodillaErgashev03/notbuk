"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const STORAGE_KEY = "noutmarket-wishlist";

interface WishlistContextValue {
  wishlist: string[];
  toggleWishlist: (id: string) => boolean; // returns new state (true = added)
  isWished: (id: string) => boolean;
  wishlistCount: number;
}

const WishlistContext = createContext<WishlistContextValue | undefined>(
  undefined
);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) setWishlist(JSON.parse(stored) as string[]);
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlist));
  }, [wishlist, hydrated]);

  const isWished = useCallback(
    (id: string) => wishlist.includes(id),
    [wishlist]
  );

  const toggleWishlist = useCallback((id: string) => {
    let added = false;
    setWishlist((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      added = true;
      return [...prev, id];
    });
    return added;
  }, []);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        toggleWishlist,
        isWished,
        wishlistCount: wishlist.length,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx)
    throw new Error("useWishlist must be used within a WishlistProvider");
  return ctx;
}
