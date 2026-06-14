"use server";

import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { requireUser } from "@/lib/auth";
import {
  getSupabaseAdmin,
  isStorageConfigured,
  BUCKET,
} from "@/lib/supabase";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");
const ALLOWED = ["image/png", "image/jpeg", "image/webp", "image/gif"];
const MAX_BYTES = 5 * 1024 * 1024; // 5MB

function safeName(original: string, seed: number): string {
  const ext = (original.split(".").pop() ?? "png").toLowerCase().slice(0, 5);
  const base = original
    .replace(/\.[^.]+$/, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);
  return `${base || "image"}-${seed}.${ext}`;
}

// Uploads images to Supabase Storage (production) or the local public/uploads
// folder (local dev, when Storage isn't configured). Returns public URLs.
export async function uploadImages(
  formData: FormData
): Promise<{ urls: string[]; error?: string }> {
  await requireUser();

  const files = formData
    .getAll("files")
    .filter((f): f is File => f instanceof File);
  if (files.length === 0) return { urls: [] };

  // Validate first.
  for (const file of files) {
    if (file.size === 0) continue;
    if (!ALLOWED.includes(file.type)) {
      return { urls: [], error: `Fayl turi qo'llab-quvvatlanmaydi: ${file.type}` };
    }
    if (file.size > MAX_BYTES) {
      return { urls: [], error: `Fayl juda katta (maks 5MB): ${file.name}` };
    }
  }

  const useStorage = isStorageConfigured();
  const urls: string[] = [];
  let seed = Date.now();

  if (useStorage) {
    const supabase = getSupabaseAdmin();
    for (const file of files) {
      if (file.size === 0) continue;
      const bytes = Buffer.from(await file.arrayBuffer());
      const filename = safeName(file.name, seed++);
      const { error } = await supabase.storage
        .from(BUCKET)
        .upload(filename, bytes, {
          contentType: file.type,
          upsert: true,
        });
      if (error) {
        return { urls, error: `Yuklashda xatolik: ${error.message}` };
      }
      const { data } = supabase.storage.from(BUCKET).getPublicUrl(filename);
      urls.push(data.publicUrl);
    }
    return { urls };
  }

  // Local-disk fallback (development only).
  await mkdir(UPLOAD_DIR, { recursive: true });
  for (const file of files) {
    if (file.size === 0) continue;
    const bytes = Buffer.from(await file.arrayBuffer());
    const filename = safeName(file.name, seed++);
    await writeFile(path.join(UPLOAD_DIR, filename), bytes);
    urls.push(`/uploads/${filename}`);
  }
  return { urls };
}
