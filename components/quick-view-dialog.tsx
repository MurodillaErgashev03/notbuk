"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, ArrowRight } from "lucide-react";
import { toast } from "sonner";

import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useCart } from "@/lib/cart-context";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StarRating } from "@/components/star-rating";
import { ProductBadgeChip } from "@/components/product-badge";

export function QuickViewDialog({
  product,
  open,
  onOpenChange,
}: {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { t, tl, locale } = useLanguage();
  const { addToCart } = useCart();

  if (!product) return null;

  const specEntries: [string, string][] = [
    ["spec.processor", product.specs.processor],
    ["spec.ram", product.specs.ram],
    ["spec.storage", product.specs.storage],
    ["spec.display", product.specs.display],
    ["spec.gpu", product.specs.gpu],
    ["spec.os", product.specs.os],
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl gap-0 overflow-hidden p-0">
        <div className="grid md:grid-cols-2">
          <div className="relative aspect-square bg-muted">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              sizes="(max-width:768px) 100vw, 384px"
              className="object-cover"
            />
            {product.badge && (
              <ProductBadgeChip
                badge={product.badge}
                locale={locale}
                className="absolute left-3 top-3"
              />
            )}
          </div>

          <div className="flex flex-col gap-3 p-6">
            <DialogHeader>
              <Badge variant="secondary" className="w-fit">
                {product.brand}
              </Badge>
              <DialogTitle className="text-left text-lg">
                {product.name}
              </DialogTitle>
            </DialogHeader>

            <div className="flex items-center gap-2">
              <StarRating rating={product.rating} />
              <span className="text-xs text-muted-foreground">
                {product.rating.toFixed(1)} · {product.reviewCount}{" "}
                {t("product.reviews")}
              </span>
            </div>

            <div>
              <div className="text-2xl font-bold">
                {formatPrice(product.price)}
              </div>
              {product.originalPrice && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                  <span className="text-sm font-semibold text-red-500">
                    -{product.discountPercent}%
                  </span>
                </div>
              )}
            </div>

            <ul className="grid gap-1 text-sm">
              {specEntries.map(([key, val]) => (
                <li key={key} className="flex justify-between gap-2">
                  <span className="text-muted-foreground">{t(key)}</span>
                  <span className="text-right font-medium">{val}</span>
                </li>
              ))}
            </ul>

            <p className="line-clamp-3 text-sm text-muted-foreground">
              {tl(product.description)}
            </p>

            <div className="mt-auto flex flex-col gap-2 pt-2">
              <Button
                disabled={!product.inStock}
                onClick={() => {
                  addToCart(product, 1);
                  toast.success(t("toast.added"), {
                    description: product.name,
                  });
                }}
              >
                <ShoppingCart className="h-4 w-4" />
                {t("product.addToCart")}
              </Button>
              <Button asChild variant="outline">
                <Link href={`/product/${product.id}`}>
                  {t("product.quickView")}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
