"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useBrands } from "@/lib/site-data";

export function BrandRow() {
  const { t } = useLanguage();
  const BRANDS = useBrands();
  return (
    <div className="rounded-2xl border bg-muted/40 p-8">
      <p className="mb-6 text-center text-sm font-medium uppercase tracking-wide text-muted-foreground">
        {t("usp.brands")}
      </p>
      <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5">
        {BRANDS.map((b) => (
          <span
            key={b}
            className="text-xl font-bold text-muted-foreground/60 grayscale transition-all hover:text-foreground hover:grayscale-0"
          >
            {b}
          </span>
        ))}
      </div>
    </div>
  );
}
