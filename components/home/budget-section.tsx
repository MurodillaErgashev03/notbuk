"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { getBudgetProducts } from "@/lib/data/products";
import { ProductRail } from "@/components/product-rail";
import { cn } from "@/lib/utils";

const RANGES: { key: string; min: number; max: number }[] = [
  { key: "budget.3-5", min: 3_000_000, max: 5_000_000 },
  { key: "budget.5-8", min: 5_000_000, max: 8_000_000 },
  { key: "budget.8-12", min: 8_000_000, max: 12_000_000 },
];

export function BudgetSection() {
  const { t } = useLanguage();
  const [active, setActive] = useState<number | null>(null);

  const all = getBudgetProducts();
  const filtered =
    active === null
      ? all
      : all.filter(
          (p) => p.price >= RANGES[active].min && p.price <= RANGES[active].max
        );

  return (
    <div>
      <div className="mb-5 flex flex-wrap gap-2">
        <button
          onClick={() => setActive(null)}
          className={cn(
            "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
            active === null
              ? "border-primary bg-primary text-primary-foreground"
              : "bg-background hover:bg-accent"
          )}
        >
          {t("section.viewAll")}
        </button>
        {RANGES.map((r, i) => (
          <button
            key={r.key}
            onClick={() => setActive(i)}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
              active === i
                ? "border-primary bg-primary text-primary-foreground"
                : "bg-background hover:bg-accent"
            )}
          >
            {t(r.key)}
          </button>
        ))}
      </div>
      {filtered.length > 0 ? (
        <ProductRail products={filtered.slice(0, 8)} />
      ) : (
        <p className="py-8 text-center text-sm text-muted-foreground">
          {t("listing.noResults")}
        </p>
      )}
    </div>
  );
}
