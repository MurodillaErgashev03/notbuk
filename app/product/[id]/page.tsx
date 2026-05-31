import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { products, getProductById } from "@/lib/data/products";
import { ProductView } from "@/components/product-view";

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export function generateMetadata({
  params,
}: {
  params: { id: string };
}): Metadata {
  const product = getProductById(params.id);
  return {
    title: product ? `${product.name} — NoutMarket` : "NoutMarket",
    description: product?.description.uz,
  };
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = getProductById(params.id);
  if (!product) notFound();
  return <ProductView id={params.id} />;
}
