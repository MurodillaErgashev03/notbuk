"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import type { LocalizedText } from "@/lib/types";

function buildCategoryData(formData: FormData) {
  const name: LocalizedText = {
    uz: String(formData.get("name.uz") ?? ""),
    ru: String(formData.get("name.ru") ?? ""),
    en: String(formData.get("name.en") ?? ""),
  };
  const description: LocalizedText = {
    uz: String(formData.get("desc.uz") ?? ""),
    ru: String(formData.get("desc.ru") ?? ""),
    en: String(formData.get("desc.en") ?? ""),
  };
  return {
    slug: String(formData.get("slug") ?? "").trim(),
    name: JSON.stringify(name),
    description: JSON.stringify(description),
    icon: String(formData.get("icon") ?? "Tag").trim() || "Tag",
    gradient:
      String(formData.get("gradient") ?? "").trim() ||
      "from-slate-500 to-slate-700",
  };
}

export async function createCategory(formData: FormData) {
  await requireUser();
  const data = buildCategoryData(formData);
  const max = await prisma.category.aggregate({ _max: { sortOrder: true } });
  await prisma.category.create({
    data: { ...data, sortOrder: (max._max.sortOrder ?? 0) + 1 },
  });
  revalidatePath("/admin/categories");
  revalidatePath("/");
  redirect("/admin/categories");
}

export async function updateCategory(id: string, formData: FormData) {
  await requireUser();
  const data = buildCategoryData(formData);
  await prisma.category.update({ where: { id }, data });
  revalidatePath("/admin/categories");
  revalidatePath("/");
  redirect("/admin/categories");
}

export async function deleteCategory(id: string) {
  await requireUser();
  await prisma.category.delete({ where: { id } });
  revalidatePath("/admin/categories");
  revalidatePath("/");
}
