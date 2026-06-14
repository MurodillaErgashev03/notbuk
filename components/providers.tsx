"use client";

import React from "react";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import { CartProvider } from "@/lib/cart-context";
import { WishlistProvider } from "@/lib/wishlist-context";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SiteDataProvider, type SiteData } from "@/lib/site-data";

export function Providers({
  children,
  siteData,
}: {
  children: React.ReactNode;
  siteData: SiteData;
}) {
  return (
    <SiteDataProvider value={siteData}>
      <LanguageProvider>
        <CartProvider>
          <WishlistProvider>
            <TooltipProvider delayDuration={150}>
              {children}
            </TooltipProvider>
          </WishlistProvider>
        </CartProvider>
      </LanguageProvider>
    </SiteDataProvider>
  );
}
