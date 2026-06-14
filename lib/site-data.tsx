"use client";

import { createContext, useContext } from "react";
import type { CategoryDef } from "@/lib/types";

export interface SiteData {
  categories: CategoryDef[];
  brands: string[];
  settings: Record<string, string>;
  categoryCounts: Record<string, number>;
}

const SiteDataContext = createContext<SiteData>({
  categories: [],
  brands: [],
  settings: {},
  categoryCounts: {},
});

export function SiteDataProvider({
  value,
  children,
}: {
  value: SiteData;
  children: React.ReactNode;
}) {
  return (
    <SiteDataContext.Provider value={value}>
      {children}
    </SiteDataContext.Provider>
  );
}

export function useSiteData(): SiteData {
  return useContext(SiteDataContext);
}

export function useCategories(): CategoryDef[] {
  return useContext(SiteDataContext).categories;
}

export function useCategoryCounts(): Record<string, number> {
  return useContext(SiteDataContext).categoryCounts;
}

export function useBrands(): string[] {
  return useContext(SiteDataContext).brands;
}

export function useSettings(): Record<string, string> {
  return useContext(SiteDataContext).settings;
}

// Helper to read a setting with a fallback.
export function useSetting(key: string, fallback = ""): string {
  return useContext(SiteDataContext).settings[key] ?? fallback;
}
