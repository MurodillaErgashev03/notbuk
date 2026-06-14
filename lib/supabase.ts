import "server-only";
import { createClient } from "@supabase/supabase-js";

// Server-side Supabase client for Storage uploads. Uses the service-role key,
// so it must NEVER be imported into client components.
const url = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const BUCKET = process.env.SUPABASE_BUCKET ?? "uploads";

export function getSupabaseAdmin() {
  if (!url || !serviceKey) {
    throw new Error(
      "Supabase Storage sozlanmagan: SUPABASE_URL va SUPABASE_SERVICE_ROLE_KEY .env da bo'lishi kerak"
    );
  }
  return createClient(url, serviceKey, {
    auth: { persistSession: false },
  });
}

export function isStorageConfigured(): boolean {
  return Boolean(url && serviceKey);
}
