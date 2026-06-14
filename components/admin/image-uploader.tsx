"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Upload, X, Loader2 } from "lucide-react";
import { uploadImages } from "@/app/admin/actions/upload";
import { toast } from "sonner";

// Manages a list of image URLs. Renders a hidden input (newline-separated)
// so it submits with the surrounding <form>. Optionally reports changes via
// onChange (used by the settings form to sync the logo URL into its state).
export function ImageUploader({
  name = "images",
  initial = [],
  multiple = true,
  onChange,
}: {
  name?: string;
  initial?: string[];
  multiple?: boolean;
  onChange?: (urls: string[]) => void;
}) {
  const [urls, setUrls] = useState<string[]>(initial);
  const [busy, setBusy] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function update(next: string[]) {
    setUrls(next);
    onChange?.(next);
  }

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setBusy(true);
    try {
      const fd = new FormData();
      Array.from(files).forEach((f) => fd.append("files", f));
      const res = await uploadImages(fd);
      if (res.error) {
        toast.error(res.error);
      }
      if (res.urls.length) {
        update(multiple ? [...urls, ...res.urls] : res.urls);
      }
    } catch {
      toast.error("Yuklashda xatolik");
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  function remove(url: string) {
    update(urls.filter((u) => u !== url));
  }

  return (
    <div className="space-y-3">
      <input type="hidden" name={name} value={urls.join("\n")} />

      <div className="flex flex-wrap gap-3">
        {urls.map((url) => (
          <div
            key={url}
            className="group relative h-24 w-24 overflow-hidden rounded-lg border bg-muted"
          >
            <Image
              src={url}
              alt=""
              fill
              sizes="96px"
              className="object-cover"
            />
            <button
              type="button"
              onClick={() => remove(url)}
              className="absolute right-1 top-1 grid h-6 w-6 place-items-center rounded-full bg-black/60 text-white opacity-0 transition-opacity group-hover:opacity-100"
              aria-label="O'chirish"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={busy}
          className="grid h-24 w-24 place-items-center rounded-lg border-2 border-dashed text-muted-foreground transition-colors hover:border-primary hover:text-primary disabled:opacity-50"
        >
          {busy ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Upload className="h-5 w-5" />
          )}
        </button>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple={multiple}
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
      <p className="text-xs text-muted-foreground">
        PNG, JPG, WEBP — maks 5MB. Rasmlarni yuklang yoki tashlang.
      </p>
    </div>
  );
}
