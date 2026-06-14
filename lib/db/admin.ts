import "server-only";
import { prisma } from "@/lib/prisma";
import { rowToCategory, rowToProduct } from "@/lib/serialize";
import type { Product, CategoryDef } from "@/lib/types";

// Admin list/detail helpers that keep the DB id alongside the domain object,
// since the admin UI needs ids to edit and delete.

export interface AdminCategory extends CategoryDef {
  id: string;
  sortOrder: number;
}

export interface AdminProduct extends Product {
  sortOrder: number;
}

export async function adminListProducts(): Promise<AdminProduct[]> {
  const rows = await prisma.product.findMany({ orderBy: { sortOrder: "asc" } });
  return rows.map((r) => ({ ...rowToProduct(r), sortOrder: r.sortOrder }));
}

export async function adminGetProduct(
  id: string
): Promise<AdminProduct | null> {
  const r = await prisma.product.findUnique({ where: { id } });
  return r ? { ...rowToProduct(r), sortOrder: r.sortOrder } : null;
}

export async function adminListCategories(): Promise<AdminCategory[]> {
  const rows = await prisma.category.findMany({ orderBy: { sortOrder: "asc" } });
  return rows.map((r) => ({
    ...rowToCategory(r),
    id: r.id,
    sortOrder: r.sortOrder,
  }));
}

export async function adminGetCategory(
  id: string
): Promise<AdminCategory | null> {
  const r = await prisma.category.findUnique({ where: { id } });
  return r ? { ...rowToCategory(r), id: r.id, sortOrder: r.sortOrder } : null;
}

export async function adminListOrders() {
  return prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: { items: true },
  });
}

export async function adminStats() {
  const [products, categories, orders, newOrders] = await Promise.all([
    prisma.product.count(),
    prisma.category.count(),
    prisma.order.count(),
    prisma.order.count({ where: { status: "new" } }),
  ]);
  return { products, categories, orders, newOrders };
}
