"use client";

import { useMemo, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";

import type { Product } from "@/lib/types";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useBrands } from "@/lib/site-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ProductGrid } from "@/components/product-grid";

const RAM_OPTIONS = ["8GB", "16GB", "32GB", "64GB"];
const STORAGE_OPTIONS = ["256GB", "512GB", "1TB", "2TB"];
const PROCESSOR_OPTIONS = [
  { key: "Intel", match: ["intel"] },
  { key: "AMD", match: ["amd", "ryzen"] },
  { key: "Apple M-series", match: ["apple", "m1", "m2", "m3"] },
];

type SortKey = "priceAsc" | "priceDesc" | "rating" | "new";

const PAGE_SIZE = 9;

export function ProductBrowser({ products }: { products: Product[] }) {
  const { t } = useLanguage();
  const allBrands = useBrands();

  const [brands, setBrands] = useState<string[]>([]);
  const [ram, setRam] = useState<string[]>([]);
  const [storage, setStorage] = useState<string[]>([]);
  const [processors, setProcessors] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sort, setSort] = useState<SortKey>("rating");
  const [visible, setVisible] = useState(PAGE_SIZE);

  const toggle = (
    value: string,
    list: string[],
    setList: (v: string[]) => void
  ) => {
    setList(
      list.includes(value)
        ? list.filter((x) => x !== value)
        : [...list, value]
    );
    setVisible(PAGE_SIZE);
  };

  const reset = () => {
    setBrands([]);
    setRam([]);
    setStorage([]);
    setProcessors([]);
    setMinPrice("");
    setMaxPrice("");
    setInStockOnly(false);
    setVisible(PAGE_SIZE);
  };

  const filtered = useMemo(() => {
    const min = minPrice ? Number(minPrice) : 0;
    const max = maxPrice ? Number(maxPrice) : Infinity;

    const result = products.filter((p) => {
      if (brands.length && !brands.includes(p.brand)) return false;
      if (p.price < min || p.price > max) return false;
      if (ram.length && !ram.some((r) => p.specs.ram.includes(r)))
        return false;
      if (storage.length && !storage.some((s) => p.specs.storage.includes(s)))
        return false;
      if (processors.length) {
        const proc = p.specs.processor.toLowerCase();
        const ok = processors.some((key) => {
          const opt = PROCESSOR_OPTIONS.find((o) => o.key === key);
          return opt?.match.some((m) => proc.includes(m));
        });
        if (!ok) return false;
      }
      if (inStockOnly && !p.inStock) return false;
      return true;
    });

    switch (sort) {
      case "priceAsc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "priceDesc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "new":
        result.sort((a, b) => Number(b.isNew) - Number(a.isNew));
        break;
    }
    return result;
  }, [products, brands, ram, storage, processors, minPrice, maxPrice, inStockOnly, sort]);

  const FilterContent = (
    <div className="space-y-6">
      {/* Brand */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold">{t("filter.brand")}</h3>
        <div className="space-y-2">
          {allBrands.map((b) => (
            <label
              key={b}
              className="flex cursor-pointer items-center gap-2 text-sm"
            >
              <Checkbox
                checked={brands.includes(b)}
                onCheckedChange={() => toggle(b, brands, setBrands)}
              />
              {b}
            </label>
          ))}
        </div>
      </div>
      <Separator />

      {/* Price */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold">{t("filter.price")}</h3>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            inputMode="numeric"
            placeholder={t("filter.priceMin")}
            value={minPrice}
            onChange={(e) => {
              setMinPrice(e.target.value);
              setVisible(PAGE_SIZE);
            }}
          />
          <span className="text-muted-foreground">—</span>
          <Input
            type="number"
            inputMode="numeric"
            placeholder={t("filter.priceMax")}
            value={maxPrice}
            onChange={(e) => {
              setMaxPrice(e.target.value);
              setVisible(PAGE_SIZE);
            }}
          />
        </div>
      </div>
      <Separator />

      {/* RAM */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold">{t("filter.ram")}</h3>
        <div className="flex flex-wrap gap-2">
          {RAM_OPTIONS.map((r) => (
            <button
              key={r}
              onClick={() => toggle(r, ram, setRam)}
              className={chipClass(ram.includes(r))}
            >
              {r}
            </button>
          ))}
        </div>
      </div>
      <Separator />

      {/* Storage */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold">{t("filter.storage")}</h3>
        <div className="flex flex-wrap gap-2">
          {STORAGE_OPTIONS.map((s) => (
            <button
              key={s}
              onClick={() => toggle(s, storage, setStorage)}
              className={chipClass(storage.includes(s))}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
      <Separator />

      {/* Processor */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold">{t("filter.processor")}</h3>
        <div className="space-y-2">
          {PROCESSOR_OPTIONS.map((o) => (
            <label
              key={o.key}
              className="flex cursor-pointer items-center gap-2 text-sm"
            >
              <Checkbox
                checked={processors.includes(o.key)}
                onCheckedChange={() =>
                  toggle(o.key, processors, setProcessors)
                }
              />
              {o.key}
            </label>
          ))}
        </div>
      </div>
      <Separator />

      {/* In stock */}
      <div className="flex items-center justify-between">
        <Label htmlFor="inStock" className="cursor-pointer text-sm">
          {t("filter.inStockOnly")}
        </Label>
        <Switch
          id="inStock"
          checked={inStockOnly}
          onCheckedChange={(v) => {
            setInStockOnly(v);
            setVisible(PAGE_SIZE);
          }}
        />
      </div>

      <Button variant="outline" className="w-full" onClick={reset}>
        <X className="h-4 w-4" />
        {t("filter.reset")}
      </Button>
    </div>
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
      {/* Desktop sidebar */}
      <aside className="hidden lg:block">
        <div className="sticky top-20 rounded-xl border bg-card p-5">
          <h2 className="mb-4 flex items-center gap-2 font-semibold">
            <SlidersHorizontal className="h-4 w-4" />
            {t("filter.title")}
          </h2>
          {FilterContent}
        </div>
      </aside>

      <div>
        {/* Toolbar */}
        <div className="mb-5 flex items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground">
            {filtered.length} {t("listing.results")}
          </p>
          <div className="flex items-center gap-2">
            {/* Mobile filter */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="lg:hidden">
                  <SlidersHorizontal className="h-4 w-4" />
                  {t("filter.open")}
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[88vw] max-w-sm">
                <SheetHeader className="mb-4">
                  <SheetTitle>{t("filter.title")}</SheetTitle>
                </SheetHeader>
                {FilterContent}
              </SheetContent>
            </Sheet>

            <Select value={sort} onValueChange={(v) => setSort(v as SortKey)}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder={t("sort.label")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">{t("sort.rating")}</SelectItem>
                <SelectItem value="new">{t("sort.new")}</SelectItem>
                <SelectItem value="priceAsc">{t("sort.priceAsc")}</SelectItem>
                <SelectItem value="priceDesc">{t("sort.priceDesc")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="grid place-items-center rounded-xl border border-dashed py-20 text-center">
            <p className="text-lg font-semibold">{t("listing.noResults")}</p>
            <p className="mt-1 max-w-sm text-sm text-muted-foreground">
              {t("listing.noResultsHint")}
            </p>
            <Button variant="outline" className="mt-4" onClick={reset}>
              {t("filter.reset")}
            </Button>
          </div>
        ) : (
          <>
            <ProductGrid products={filtered.slice(0, visible)} />
            {visible < filtered.length && (
              <div className="mt-8 flex justify-center">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setVisible((v) => v + PAGE_SIZE)}
                >
                  {t("listing.loadMore")} ({filtered.length - visible})
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function chipClass(active: boolean) {
  return [
    "rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors",
    active
      ? "border-primary bg-primary text-primary-foreground"
      : "bg-background hover:bg-accent",
  ].join(" ");
}
