import "server-only";
import { prisma } from "@/lib/prisma";
import { rowToProduct, rowToCategory } from "@/lib/serialize";
import type { Product, CategoryDef } from "@/lib/types";

// ---------- Categories ----------

export async function getCategories(): Promise<CategoryDef[]> {
  const rows = await prisma.category.findMany({ orderBy: { sortOrder: "asc" } });
  return rows.map(rowToCategory);
}

export async function getCategoryBySlug(
  slug: string
): Promise<CategoryDef | undefined> {
  const row = await prisma.category.findUnique({ where: { slug } });
  return row ? rowToCategory(row) : undefined;
}

// ---------- Products ----------

export async function getAllProducts(): Promise<Product[]> {
  const rows = await prisma.product.findMany({ orderBy: { sortOrder: "asc" } });
  return rows.map(rowToProduct);
}

export async function getProductById(
  id: string
): Promise<Product | undefined> {
  const row = await prisma.product.findUnique({ where: { id } });
  return row ? rowToProduct(row) : undefined;
}

export async function getProductBySlug(
  slug: string
): Promise<Product | undefined> {
  const row = await prisma.product.findUnique({ where: { slug } });
  return row ? rowToProduct(row) : undefined;
}

export async function getProductsByCategory(
  slug: string
): Promise<Product[]> {
  const all = await getAllProducts();
  return all.filter((p) => p.category.includes(slug));
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const all = await getAllProducts();
  return all.filter((p) => p.isFeatured);
}

export async function getNewProducts(): Promise<Product[]> {
  const all = await getAllProducts();
  return all.filter((p) => p.isNew);
}

export async function getDiscountedProducts(): Promise<Product[]> {
  const all = await getAllProducts();
  return all.filter((p) => p.discountPercent && p.discountPercent > 0);
}

export async function getBudgetProducts(): Promise<Product[]> {
  return getProductsByCategory("hamyonbop-noutbuklar");
}

export async function getTopProducts(): Promise<Product[]> {
  return getProductsByCategory("top-noutbuklar");
}

export async function getRelatedProducts(
  product: Product,
  limit = 4
): Promise<Product[]> {
  const all = await getAllProducts();
  return all
    .filter(
      (p) =>
        p.id !== product.id &&
        (p.brand === product.brand ||
          p.category.some((c) => product.category.includes(c)))
    )
    .slice(0, limit);
}

export async function searchProducts(query: string): Promise<Product[]> {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const all = await getAllProducts();
  return all.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.specs.processor.toLowerCase().includes(q) ||
      p.specs.gpu.toLowerCase().includes(q)
  );
}

export async function getBrands(): Promise<string[]> {
  const all = await getAllProducts();
  return Array.from(new Set(all.map((p) => p.brand))).sort();
}

export async function getCategoryCounts(): Promise<Record<string, number>> {
  const all = await getAllProducts();
  const counts: Record<string, number> = {};
  for (const p of all) {
    for (const slug of p.category) {
      counts[slug] = (counts[slug] ?? 0) + 1;
    }
  }
  return counts;
}

// ---------- Settings ----------

export async function getSettings(): Promise<Record<string, string>> {
  const rows = await prisma.setting.findMany();
  return Object.fromEntries(rows.map((r) => [r.key, r.value]));
}

export async function getSetting(
  key: string
): Promise<string | undefined> {
  const row = await prisma.setting.findUnique({ where: { key } });
  return row?.value;
}
