"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import type { CategoryDef, Product } from "@/lib/types";
import { PageBreadcrumb } from "@/components/page-breadcrumb";
import { ProductBrowser } from "@/components/product-browser";
import { CategoryIcon } from "@/components/category-icon";
import { cn } from "@/lib/utils";

export function CategoryView({
  category,
  products,
}: {
  category: CategoryDef;
  products: Product[];
}) {
  const { tl, t } = useLanguage();

  if (!category) return null;

  return (
    <div className="container py-6">
      <PageBreadcrumb items={[{ label: tl(category.name) }]} />

      <div
        className={cn(
          "relative mb-8 overflow-hidden rounded-2xl bg-gradient-to-br p-6 text-white sm:p-8",
          category.gradient
        )}
      >
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10" />
        <div className="relative flex items-start gap-4">
          <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-white/20 backdrop-blur">
            <CategoryIcon name={category.icon} className="h-7 w-7" />
          </span>
          <div>
            <h1 className="text-2xl font-extrabold sm:text-3xl">
              {tl(category.name)}
            </h1>
            <p className="mt-1 max-w-2xl text-sm text-white/85 sm:text-base">
              {tl(category.description)}
            </p>
            <p className="mt-2 text-sm font-medium text-white/90">
              {products.length} {t("listing.count")}
            </p>
          </div>
        </div>
      </div>

      <ProductBrowser products={products} />
    </div>
  );
}
