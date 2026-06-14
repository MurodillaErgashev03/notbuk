import { notFound } from "next/navigation";
import type { Metadata } from "next";

import {
  getCategoryBySlug,
  getProductsByCategory,
  getSetting,
} from "@/lib/db/queries";
import { CategoryView } from "@/components/category-view";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const category = await getCategoryBySlug(params.slug);
  const siteName = (await getSetting("site.name")) ?? "Compuz";
  return {
    title: category ? `${category.name.uz} — ${siteName}` : siteName,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: { slug: string };
}) {
  const category = await getCategoryBySlug(params.slug);
  if (!category) notFound();
  const products = await getProductsByCategory(params.slug);
  return <CategoryView category={category} products={products} />;
}
