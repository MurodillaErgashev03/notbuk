"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useCategories, useCategoryCounts } from "@/lib/site-data";
import { CategoryIcon } from "@/components/category-icon";
import { cn } from "@/lib/utils";

export function CategoryCards() {
  const { tl, t } = useLanguage();
  const categories = useCategories();
  const counts = useCategoryCounts();

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {categories.map((c) => {
        const count = counts[c.slug] ?? 0;
        return (
          <Link
            key={c.slug}
            href={`/category/${c.slug}`}
            className={cn(
              "group relative overflow-hidden rounded-2xl bg-gradient-to-br p-5 text-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl",
              c.gradient
            )}
          >
            <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/10 transition-transform duration-300 group-hover:scale-150" />
            <div className="relative space-y-6">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-white/20 backdrop-blur">
                <CategoryIcon name={c.icon} className="h-6 w-6" />
              </span>
              <div>
                <h3 className="text-lg font-bold">{tl(c.name)}</h3>
                <p className="text-sm text-white/80">
                  {count} {t("listing.count")}
                </p>
              </div>
              <span className="inline-flex items-center gap-1 text-sm font-medium">
                {t("section.viewAll")}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
