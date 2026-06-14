import { Suspense } from "react";
import { SearchView } from "@/components/search-view";
import { ProductGridSkeleton } from "@/components/product-card-skeleton";

export const metadata = {
  title: "Qidiruv — Compuz",
};

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="container py-10">
          <ProductGridSkeleton />
        </div>
      }
    >
      <SearchView />
    </Suspense>
  );
}
