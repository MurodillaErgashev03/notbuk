"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import type { ProductSpecs, LocalizedText, ProductBadge } from "@/lib/types";

function slugify(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function parseList(value: FormDataEntryValue | null): string[] {
  return String(value ?? "")
    .split(/[\n,]/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function num(value: FormDataEntryValue | null): number | null {
  const n = Number(value);
  return Number.isFinite(n) && String(value ?? "").trim() !== "" ? n : null;
}

// Build the column payload from a product form.
function buildProductData(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const brand = String(formData.get("brand") ?? "").trim();
  let slug = String(formData.get("slug") ?? "").trim();
  if (!slug) slug = slugify(name);

  const specs: ProductSpecs = {
    processor: String(formData.get("spec.processor") ?? ""),
    ram: String(formData.get("spec.ram") ?? ""),
    storage: String(formData.get("spec.storage") ?? ""),
    display: String(formData.get("spec.display") ?? ""),
    gpu: String(formData.get("spec.gpu") ?? ""),
    battery: String(formData.get("spec.battery") ?? ""),
    os: String(formData.get("spec.os") ?? ""),
    weight: String(formData.get("spec.weight") ?? ""),
  };

  const description: LocalizedText = {
    uz: String(formData.get("desc.uz") ?? ""),
    ru: String(formData.get("desc.ru") ?? ""),
    en: String(formData.get("desc.en") ?? ""),
  };

  const badgeRaw = String(formData.get("badge") ?? "").trim();
  const badge = badgeRaw ? (badgeRaw as ProductBadge) : null;

  return {
    name,
    brand,
    slug,
    price: num(formData.get("price")) ?? 0,
    originalPrice: num(formData.get("originalPrice")),
    discountPercent: num(formData.get("discountPercent")),
    images: JSON.stringify(parseList(formData.get("images"))),
    categories: JSON.stringify(formData.getAll("categories").map(String)),
    specs: JSON.stringify(specs),
    rating: num(formData.get("rating")) ?? 0,
    reviewCount: num(formData.get("reviewCount")) ?? 0,
    inStock: formData.get("inStock") === "on",
    isNew: formData.get("isNew") === "on",
    isFeatured: formData.get("isFeatured") === "on",
    badge,
    description: JSON.stringify(description),
  };
}

export async function createProduct(formData: FormData) {
  await requireUser();
  const data = buildProductData(formData);
  await prisma.product.create({ data });
  revalidatePath("/admin/products");
  revalidatePath("/");
  redirect("/admin/products");
}

export async function updateProduct(id: string, formData: FormData) {
  await requireUser();
  const data = buildProductData(formData);
  await prisma.product.update({ where: { id }, data });
  revalidatePath("/admin/products");
  revalidatePath("/");
  revalidatePath(`/product/${id}`);
  redirect("/admin/products");
}

export async function deleteProduct(id: string) {
  await requireUser();
  await prisma.product.delete({ where: { id } });
  revalidatePath("/admin/products");
  revalidatePath("/");
}
