"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import { Save } from "lucide-react";
import type { AdminCategory } from "@/lib/db/admin";
import { CategoryIcon } from "@/components/category-icon";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

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

export function CategoryForm({
  action,
  category,
}: {
  action: (formData: FormData) => void;
  category?: AdminCategory;
}) {
  const c = category;
  const [icon, setIcon] = useState(c?.icon ?? "Tag");
  const [gradient, setGradient] = useState(c?.gradient ?? "");

  return (
    <form action={action} className="space-y-8">
      {/* Basic */}
      <section className="rounded-2xl border bg-card p-6">
        <h2 className="mb-4 font-semibold">Asosiy ma'lumotlar</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Slug *">
            <Input
              name="slug"
              defaultValue={c?.slug}
              placeholder="masalan: gaming-noutbuklar"
              required
            />
          </Field>
        </div>
      </section>

      {/* Name */}
      <section className="rounded-2xl border bg-card p-6">
        <h2 className="mb-4 font-semibold">Nomi (3 tilda)</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="O'zbekcha">
            <Input name="name.uz" defaultValue={c?.name.uz} />
          </Field>
          <Field label="Ruscha">
            <Input name="name.ru" defaultValue={c?.name.ru} />
          </Field>
          <Field label="Inglizcha">
            <Input name="name.en" defaultValue={c?.name.en} />
          </Field>
        </div>
      </section>

      {/* Description */}
      <section className="rounded-2xl border bg-card p-6">
        <h2 className="mb-4 font-semibold">Tavsif (3 tilda)</h2>
        <div className="space-y-4">
          <Field label="O'zbekcha">
            <Textarea name="desc.uz" rows={3} defaultValue={c?.description.uz} />
          </Field>
          <Field label="Ruscha">
            <Textarea name="desc.ru" rows={3} defaultValue={c?.description.ru} />
          </Field>
          <Field label="Inglizcha">
            <Textarea name="desc.en" rows={3} defaultValue={c?.description.en} />
          </Field>
        </div>
      </section>

      {/* Appearance */}
      <section className="rounded-2xl border bg-card p-6">
        <h2 className="mb-4 font-semibold">Ko'rinishi</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Ikonka (lucide nomi)">
            <div className="flex items-center gap-3">
              <Input
                name="icon"
                value={icon}
                onChange={(e) => setIcon(e.target.value)}
                placeholder="Tag"
              />
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border bg-muted">
                <CategoryIcon
                  name={icon}
                  className="h-5 w-5 text-muted-foreground"
                />
              </div>
            </div>
          </Field>
          <Field label="Gradient (tailwind klasslari)">
            <div className="space-y-2">
              <Input
                name="gradient"
                value={gradient}
                onChange={(e) => setGradient(e.target.value)}
                placeholder="from-blue-500 to-indigo-600"
              />
              <div
                className={`h-10 w-full rounded-lg border bg-gradient-to-r ${gradient}`}
              />
            </div>
          </Field>
        </div>
      </section>

      <div className="flex items-center gap-3">
        <SaveButton />
        <Button variant="outline" asChild>
          <Link href="/admin/categories">Bekor qilish</Link>
        </Button>
      </div>
    </form>
  );
}
