"use client";

import { useState } from "react";
import type { Product } from "@/lib/types";
import { ProductCard } from "@/components/product-card";
import { QuickViewDialog } from "@/components/quick-view-dialog";

export function ProductRail({ products }: { products: Product[] }) {
  const [quick, setQuick] = useState<Product | null>(null);
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 no-scrollbar md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0 lg:grid-cols-4">
        {products.map((p) => (
          <div
            key={p.id}
            className="w-[70%] shrink-0 snap-start sm:w-[45%] md:w-auto"
          >
            <ProductCard
              product={p}
              onQuickView={(prod) => {
                setQuick(prod);
                setOpen(true);
              }}
            />
          </div>
        ))}
      </div>
      <QuickViewDialog product={quick} open={open} onOpenChange={setOpen} />
    </>
  );
}
