"use client";

import { useState } from "react";
import {
  ShoppingCart,
  Minus,
  Plus,
  Heart,
  GitCompareArrows,
  Truck,
  CreditCard,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { toast } from "sonner";

import { getProductById, getRelatedProducts, reviews } from "@/lib/data/products";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useCart } from "@/lib/cart-context";
import { useWishlist } from "@/lib/wishlist-context";
import { cn, formatPrice, monthlyInstallment } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { StarRating } from "@/components/star-rating";
import { ProductGallery } from "@/components/product-gallery";
import { ProductBadgeChip } from "@/components/product-badge";
import { PageBreadcrumb } from "@/components/page-breadcrumb";
import { SectionHeading } from "@/components/section-heading";
import { ProductRail } from "@/components/product-rail";

export function ProductView({ id }: { id: string }) {
  const product = getProductById(id);
  const { t, tl, locale } = useLanguage();
  const { addToCart } = useCart();
  const { isWished, toggleWishlist } = useWishlist();
  const [qty, setQty] = useState(1);

  if (!product) return null;

  const related = getRelatedProducts(product);
  const wished = isWished(product.id);

  const specEntries: [string, string][] = [
    ["spec.processor", product.specs.processor],
    ["spec.ram", product.specs.ram],
    ["spec.storage", product.specs.storage],
    ["spec.display", product.specs.display],
    ["spec.gpu", product.specs.gpu],
    ["spec.battery", product.specs.battery],
    ["spec.os", product.specs.os],
    ["spec.weight", product.specs.weight],
  ];

  const handleAdd = (extra?: string) => {
    addToCart(product, qty);
    toast.success(t("toast.added"), {
      description: extra ?? `${product.name} × ${qty}`,
    });
  };

  return (
    <div className="container py-6">
      <PageBreadcrumb
        items={[
          { label: product.brand },
          { label: product.name },
        ]}
      />

      <div className="grid gap-8 lg:grid-cols-2">
        <ProductGallery images={product.images} alt={product.name} />

        <div className="space-y-5">
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{product.brand}</Badge>
            {product.badge && (
              <ProductBadgeChip badge={product.badge} locale={locale} />
            )}
          </div>

          <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
            {product.name}
          </h1>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5">
              <StarRating rating={product.rating} size={16} />
              <span className="text-sm font-medium">
                {product.rating.toFixed(1)}
              </span>
            </div>
            <span className="text-sm text-muted-foreground">
              {product.reviewCount} {t("product.reviews")}
            </span>
            <a href="#reviews" className="text-sm text-primary hover:underline">
              {t("product.writeReview")}
            </a>
          </div>

          {product.inStock ? (
            <Badge className="gap-1 bg-emerald-500 text-white hover:bg-emerald-500">
              <CheckCircle2 className="h-3.5 w-3.5" />
              {t("product.inStock")}
            </Badge>
          ) : (
            <Badge variant="destructive" className="gap-1">
              <XCircle className="h-3.5 w-3.5" />
              {t("product.outOfStock")}
            </Badge>
          )}

          <div className="rounded-xl border bg-card p-4">
            <div className="flex flex-wrap items-end gap-3">
              <span className="text-3xl font-extrabold">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-lg text-muted-foreground line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                  <Badge variant="destructive">
                    -{product.discountPercent}%
                  </Badge>
                </>
              )}
            </div>
            <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
              <CreditCard className="h-4 w-4 text-primary" />
              {t("product.installment.box")}{" "}
              <span className="font-semibold text-foreground">
                {formatPrice(monthlyInstallment(product.price))}
              </span>
              {t("product.perMonth")}
            </p>
          </div>

          {/* Specs quick view */}
          <div className="grid grid-cols-2 gap-3">
            {specEntries.slice(0, 8).map(([key, val]) => (
              <div key={key} className="rounded-lg border bg-card p-3">
                <p className="text-xs text-muted-foreground">{t(key)}</p>
                <p className="text-sm font-semibold">{val}</p>
              </div>
            ))}
          </div>

          {/* Quantity + actions */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center rounded-lg border">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                aria-label="-"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-10 text-center text-sm font-semibold">
                {qty}
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setQty((q) => q + 1)}
                aria-label="+"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <span className="text-sm text-muted-foreground">
              {t("product.quantity")}
            </span>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Button
              size="lg"
              disabled={!product.inStock}
              onClick={() => handleAdd()}
            >
              <ShoppingCart className="h-5 w-5" />
              {t("product.addToCart")}
            </Button>
            <Button
              size="lg"
              variant="outline"
              disabled={!product.inStock}
              onClick={() => handleAdd(t("toast.orderPlaced"))}
            >
              {t("product.buyNow")}
            </Button>
          </div>

          <div className="flex gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                const added = toggleWishlist(product.id);
                toast(added ? t("toast.wishAdded") : t("toast.wishRemoved"));
              }}
            >
              <Heart
                className={cn(
                  "h-4 w-4",
                  wished && "fill-red-500 text-red-500"
                )}
              />
              {t("product.save")}
            </Button>
            <Button variant="ghost" size="sm">
              <GitCompareArrows className="h-4 w-4" />
              {t("nav.compare")}
            </Button>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-primary/20 bg-primary/5 p-3 text-sm font-medium">
            <Truck className="h-5 w-5 text-primary" />
            {t("product.delivery.box")}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-12" id="reviews">
        <Tabs defaultValue="description">
          <TabsList className="flex w-full justify-start overflow-x-auto sm:w-auto">
            <TabsTrigger value="description">{t("tab.description")}</TabsTrigger>
            <TabsTrigger value="specs">{t("tab.specs")}</TabsTrigger>
            <TabsTrigger value="reviews">{t("tab.reviews")}</TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="max-w-3xl pt-4">
            <p className="leading-relaxed text-muted-foreground">
              {tl(product.description)}
            </p>
          </TabsContent>

          <TabsContent value="specs" className="pt-4">
            <div className="max-w-2xl overflow-hidden rounded-xl border">
              {specEntries.map(([key, val], i) => (
                <div
                  key={key}
                  className={cn(
                    "flex justify-between gap-4 px-4 py-3 text-sm",
                    i % 2 === 0 ? "bg-muted/40" : "bg-background"
                  )}
                >
                  <span className="text-muted-foreground">{t(key)}</span>
                  <span className="text-right font-medium">{val}</span>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="max-w-3xl space-y-4 pt-4">
            {reviews.map((r) => (
              <div key={r.id} className="rounded-xl border bg-card p-4">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-primary/10 font-semibold text-primary">
                    {r.author.charAt(0)}
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-semibold">{r.author}</p>
                    <p className="text-xs text-muted-foreground">{r.date}</p>
                  </div>
                  <StarRating rating={r.rating} />
                </div>
                <p className="mt-3 text-sm text-muted-foreground">
                  {tl(r.text)}
                </p>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div className="mt-16">
          <SectionHeading title={t("section.related")} />
          <ProductRail products={related} />
        </div>
      )}
    </div>
  );
}
