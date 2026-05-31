"use client";

import { useState } from "react";
import type { Product } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ProductCard } from "@/components/product-card";
import { QuickViewDialog } from "@/components/quick-view-dialog";

export function ProductGrid({
  products,
  className,
}: {
  products: Product[];
  className?: string;
}) {
  const [quick, setQuick] = useState<Product | null>(null);
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        className={cn(
          "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3",
          className
        )}
      >
        {products.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
            onQuickView={(prod) => {
              setQuick(prod);
              setOpen(true);
            }}
          />
        ))}
      </div>
      <QuickViewDialog product={quick} open={open} onOpenChange={setOpen} />
    </>
  );
}
