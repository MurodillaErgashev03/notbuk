import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { categories, getCategory } from "@/lib/data/categories";
import { CategoryView } from "@/components/category-view";

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const category = getCategory(params.slug);
  return {
    title: category
      ? `${category.name.uz} — NoutMarket`
      : "NoutMarket",
  };
}

export default function CategoryPage({
  params,
}: {
  params: { slug: string };
}) {
  const category = getCategory(params.slug);
  if (!category) notFound();
  return <CategoryView slug={params.slug} />;
}
