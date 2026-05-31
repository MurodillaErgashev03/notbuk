"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { SearchX } from "lucide-react";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import { searchProducts } from "@/lib/data/products";
import { ProductBrowser } from "@/components/product-browser";
import { PageBreadcrumb } from "@/components/page-breadcrumb";

const SUGGESTIONS = ["MacBook", "ASUS", "Lenovo", "RTX", "Gaming", "16GB"];

export function SearchView() {
  const { t } = useLanguage();
  const params = useSearchParams();
  const query = params.get("q") ?? "";
  const results = searchProducts(query);

  return (
    <div className="container py-6">
      <PageBreadcrumb items={[{ label: t("search.title") }]} />

      <div className="mb-6">
        <h1 className="text-2xl font-extrabold">
          {query ? (
            <>
              «{query}» {t("search.forQuery")}{" "}
              <span className="text-primary">{results.length}</span>{" "}
              {t("listing.results")}
            </>
          ) : (
            t("search.title")
          )}
        </h1>
      </div>

      {results.length === 0 ? (
        <div className="grid place-items-center rounded-2xl border border-dashed py-20 text-center">
          <span className="grid h-16 w-16 place-items-center rounded-full bg-muted">
            <SearchX className="h-8 w-8 text-muted-foreground" />
          </span>
          <p className="mt-4 text-lg font-semibold">
            {t("listing.noResults")}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            {t("search.suggestions")}
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {SUGGESTIONS.map((s) => (
              <Link
                key={s}
                href={`/search?q=${encodeURIComponent(s)}`}
                className="rounded-full border bg-background px-4 py-1.5 text-sm font-medium transition-colors hover:bg-accent"
              >
                {s}
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <ProductBrowser products={results} />
      )}
    </div>
  );
}
