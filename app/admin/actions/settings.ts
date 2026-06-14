"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";

// Persist every submitted setting key. The form uses field names that
// match the setting keys directly (e.g. "site.name", "footer.phone").
const SETTING_KEYS = [
  "site.name",
  "site.tagline.uz",
  "site.tagline.ru",
  "site.tagline.en",
  "logo.url",
  "footer.phone",
  "footer.address.uz",
  "footer.address.ru",
  "footer.address.en",
  "footer.telegram",
  "footer.instagram",
];

export async function updateSettings(formData: FormData) {
  await requireUser();

  for (const key of SETTING_KEYS) {
    if (!formData.has(key)) continue;
    const value = String(formData.get(key) ?? "");
    await prisma.setting.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    });
  }

  revalidatePath("/admin/settings");
  revalidatePath("/", "layout");
  return { ok: true };
}
