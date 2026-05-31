"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Eye, ShoppingCart, Cpu, HardDrive, Monitor } from "lucide-react";
import { toast } from "sonner";

import type { Product } from "@/lib/types";
import { cn, formatPrice } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useCart } from "@/lib/cart-context";
import { useWishlist } from "@/lib/wishlist-context";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StarRating } from "@/components/star-rating";
import { ProductBadgeChip } from "@/components/product-badge";

export function ProductCard({
  product,
  onQuickView,
}: {
  product: Product;
  onQuickView?: (product: Product) => void;
}) {
  const { t, locale } = useLanguage();
  const { addToCart } = useCart();
  const { isWished, toggleWishlist } = useWishlist();
  const wished = isWished(product.id);

  const handleAdd = () => {
    addToCart(product, 1);
    toast.success(t("toast.added"), { description: product.name });
  };

  const handleWish = () => {
    const added = toggleWishlist(product.id);
    toast(added ? t("toast.wishAdded") : t("toast.wishRemoved"), {
      description: product.name,
    });
  };

  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-xl border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <Link href={`/product/${product.id}`} aria-label={product.name}>
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width:768px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </Link>

        <div className="absolute left-2 top-2 flex flex-col gap-1.5">
          <Badge
            variant="secondary"
            className="bg-white/90 text-foreground shadow-sm backdrop-blur"
          >
            {product.brand}
          </Badge>
          {product.badge && (
            <ProductBadgeChip badge={product.badge} locale={locale} />
          )}
        </div>

        <button
          onClick={handleWish}
          aria-label={t("product.save")}
          className="absolute right-2 top-2 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-foreground shadow-sm backdrop-blur transition-colors hover:bg-white"
        >
          <Heart
            className={cn(
              "h-[18px] w-[18px] transition-colors",
              wished ? "fill-red-500 text-red-500" : "text-foreground"
            )}
          />
        </button>

        {onQuickView && (
          <div className="absolute inset-x-0 bottom-0 translate-y-full p-2 transition-transform duration-300 group-hover:translate-y-0">
            <Button
              variant="secondary"
              size="sm"
              className="w-full bg-white/95 shadow backdrop-blur hover:bg-white"
              onClick={() => onQuickView(product)}
            >
              <Eye className="h-4 w-4" />
              {t("product.quickView")}
            </Button>
          </div>
        )}

        {!product.inStock && (
          <div className="absolute inset-0 grid place-items-center bg-background/60">
            <Badge variant="destructive">{t("product.outOfStock")}</Badge>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <Link
          href={`/product/${product.id}`}
          className="line-clamp-2 min-h-[2.5rem] text-sm font-semibold leading-tight hover:text-primary"
        >
          {product.name}
        </Link>

        <div className="flex items-center gap-1.5">
          <StarRating rating={product.rating} />
          <span className="text-xs text-muted-foreground">
            {product.rating.toFixed(1)} ({product.reviewCount})
          </span>
        </div>

        <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <Cpu className="h-3.5 w-3.5" />
            {product.specs.ram}
          </span>
          <span className="inline-flex items-center gap-1">
            <HardDrive className="h-3.5 w-3.5" />
            {product.specs.storage}
          </span>
          <span className="inline-flex items-center gap-1">
            <Monitor className="h-3.5 w-3.5" />
            {product.specs.display.split(" ")[0]}
          </span>
        </div>

        <div className="mt-auto pt-2">
          <div className="flex items-end gap-2">
            <span className="text-base font-bold text-foreground">
              {formatPrice(product.price)}
            </span>
          </div>
          {product.originalPrice && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground line-through">
                {formatPrice(product.originalPrice)}
              </span>
              <span className="text-xs font-semibold text-red-500">
                -{product.discountPercent}%
              </span>
            </div>
          )}
        </div>

        <Button
          onClick={handleAdd}
          disabled={!product.inStock}
          className="mt-2 w-full"
          size="sm"
        >
          <ShoppingCart className="h-4 w-4" />
          {t("product.addToCart")}
        </Button>
      </div>
    </div>
  );
}
