import { notFound } from "next/navigation";
import type { Metadata } from "next";

import {
  getProductById,
  getRelatedProducts,
  getSetting,
} from "@/lib/db/queries";
import { reviews } from "@/lib/data/reviews";
import { ProductView } from "@/components/product-view";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const product = await getProductById(params.id);
  const siteName = (await getSetting("site.name")) ?? "Compuz";
  return {
    title: product ? `${product.name} — ${siteName}` : siteName,
    description: product?.description.uz,
  };
}

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await getProductById(params.id);
  if (!product) notFound();
  const related = await getRelatedProducts(product);
  return <ProductView product={product} related={related} reviews={reviews} />;
}
