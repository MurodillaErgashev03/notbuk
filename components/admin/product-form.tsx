"use client";

import { useFormStatus } from "react-dom";
import Link from "next/link";
import { Save } from "lucide-react";
import type { AdminProduct } from "@/lib/db/admin";
import type { CategoryDef } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ImageUploader } from "@/components/admin/image-uploader";

const BADGES = ["", "TOP", "YANGI", "CHEGIRMA", "OMMABOP"];

function SaveButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      <Save className="h-4 w-4" />
      {pending ? "Saqlanmoqda..." : "Saqlash"}
    </Button>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      {children}
    </div>
  );
}

export function ProductForm({
  action,
  product,
  categories,
}: {
  action: (formData: FormData) => void;
  product?: AdminProduct;
  categories: CategoryDef[];
}) {
  const p = product;
  const specs = p?.specs;

  return (
    <form action={action} className="space-y-8">
      {/* Basic */}
      <section className="rounded-2xl border bg-card p-6">
        <h2 className="mb-4 font-semibold">Asosiy ma'lumotlar</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Nomi *">
            <Input name="name" defaultValue={p?.name} required />
          </Field>
          <Field label="Brend *">
            <Input name="brand" defaultValue={p?.brand} required />
          </Field>
          <Field label="Slug (bo'sh qoldirsangiz avtomatik)">
            <Input name="slug" defaultValue={p?.slug} placeholder="masalan: macbook-air-15" />
          </Field>
          <Field label="Badge">
            <select
              name="badge"
              defaultValue={p?.badge ?? ""}
              className="flex h-10 w-full rounded-lg border border-input bg-background px-3 text-sm"
            >
              {BADGES.map((b) => (
                <option key={b} value={b}>
                  {b || "— yo'q —"}
                </option>
              ))}
            </select>
          </Field>
        </div>
      </section>

      {/* Pricing */}
      <section className="rounded-2xl border bg-card p-6">
        <h2 className="mb-4 font-semibold">Narx (so'mda)</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="Narx *">
            <Input
              name="price"
              type="number"
              inputMode="numeric"
              defaultValue={p?.price}
              required
            />
          </Field>
          <Field label="Eski narx (chegirma uchun)">
            <Input
              name="originalPrice"
              type="number"
              inputMode="numeric"
              defaultValue={p?.originalPrice ?? ""}
            />
          </Field>
          <Field label="Chegirma %">
            <Input
              name="discountPercent"
              type="number"
              inputMode="numeric"
              defaultValue={p?.discountPercent ?? ""}
            />
          </Field>
        </div>
      </section>

      {/* Images */}
      <section className="rounded-2xl border bg-card p-6">
        <h2 className="mb-4 font-semibold">Rasmlar</h2>
        <ImageUploader name="images" initial={p?.images ?? []} />
      </section>

      {/* Categories */}
      <section className="rounded-2xl border bg-card p-6">
        <h2 className="mb-4 font-semibold">Kategoriyalar</h2>
        <div className="grid gap-2 sm:grid-cols-2">
          {categories.map((c) => (
            <label
              key={c.slug}
              className="flex cursor-pointer items-center gap-2 rounded-lg border p-3 text-sm"
            >
              <Checkbox
                name="categories"
                value={c.slug}
                defaultChecked={p?.category.includes(c.slug)}
              />
              {c.name.uz}
            </label>
          ))}
        </div>
      </section>

      {/* Specs */}
      <section className="rounded-2xl border bg-card p-6">
        <h2 className="mb-4 font-semibold">Xususiyatlar (Specs)</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Protsessor">
            <Input name="spec.processor" defaultValue={specs?.processor} />
          </Field>
          <Field label="RAM">
            <Input name="spec.ram" defaultValue={specs?.ram} placeholder="16GB" />
          </Field>
          <Field label="Xotira (Storage)">
            <Input name="spec.storage" defaultValue={specs?.storage} placeholder="512GB SSD" />
          </Field>
          <Field label="Ekran">
            <Input name="spec.display" defaultValue={specs?.display} />
          </Field>
          <Field label="Videokarta (GPU)">
            <Input name="spec.gpu" defaultValue={specs?.gpu} />
          </Field>
          <Field label="Batareya">
            <Input name="spec.battery" defaultValue={specs?.battery} />
          </Field>
          <Field label="OS">
            <Input name="spec.os" defaultValue={specs?.os} />
          </Field>
          <Field label="Og'irligi">
            <Input name="spec.weight" defaultValue={specs?.weight} placeholder="1.5 kg" />
          </Field>
        </div>
      </section>

      {/* Description */}
      <section className="rounded-2xl border bg-card p-6">
        <h2 className="mb-4 font-semibold">Tavsif (3 tilda)</h2>
        <div className="space-y-4">
          <Field label="O'zbekcha">
            <Textarea name="desc.uz" rows={3} defaultValue={p?.description.uz} />
          </Field>
          <Field label="Ruscha">
            <Textarea name="desc.ru" rows={3} defaultValue={p?.description.ru} />
          </Field>
          <Field label="Inglizcha">
            <Textarea name="desc.en" rows={3} defaultValue={p?.description.en} />
          </Field>
        </div>
      </section>

      {/* Flags */}
      <section className="rounded-2xl border bg-card p-6">
        <h2 className="mb-4 font-semibold">Holat</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Reyting (0-5)">
            <Input
              name="rating"
              type="number"
              step="0.1"
              defaultValue={p?.rating ?? 0}
            />
          </Field>
          <Field label="Sharhlar soni">
            <Input
              name="reviewCount"
              type="number"
              defaultValue={p?.reviewCount ?? 0}
            />
          </Field>
        </div>
        <div className="mt-4 flex flex-wrap gap-6">
          <label className="flex cursor-pointer items-center gap-2 text-sm">
            <Checkbox name="inStock" defaultChecked={p?.inStock ?? true} />
            Sotuvda bor
          </label>
          <label className="flex cursor-pointer items-center gap-2 text-sm">
            <Checkbox name="isNew" defaultChecked={p?.isNew ?? false} />
            Yangi
          </label>
          <label className="flex cursor-pointer items-center gap-2 text-sm">
            <Checkbox name="isFeatured" defaultChecked={p?.isFeatured ?? false} />
            Tavsiya etilgan (bosh sahifada)
          </label>
        </div>
      </section>

      <div className="flex items-center gap-3">
        <SaveButton />
        <Button variant="outline" asChild>
          <Link href="/admin/products">Bekor qilish</Link>
        </Button>
      </div>
    </form>
  );
}
