"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import { Save } from "lucide-react";
import { toast } from "sonner";
import { updateSettings } from "@/app/admin/actions/settings";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ImageUploader } from "@/components/admin/image-uploader";

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

export function SettingsForm({
  settings,
}: {
  settings: Record<string, string>;
}) {
  const [logo, setLogo] = useState(settings["logo.url"] || "/logo.png");

  async function action(formData: FormData) {
    // Inject the logo url from the uploader state.
    formData.set("logo.url", logo);
    const res = await updateSettings(formData);
    if (res?.ok) toast.success("Sozlamalar saqlandi");
  }

  return (
    <form action={action} className="space-y-8">
      {/* Logo */}
      <section className="rounded-2xl border bg-card p-6">
        <h2 className="mb-4 font-semibold">Logo</h2>
        <ImageUploader
          name="logo.upload"
          initial={logo ? [logo] : []}
          multiple={false}
          onChange={(urls) => setLogo(urls[0] ?? "")}
        />
        <p className="mt-2 text-xs text-muted-foreground">
          Yangi logo yuklang yoki quyida URL kiriting.
        </p>
        <div className="mt-3">
          <Input
            value={logo}
            onChange={(e) => setLogo(e.target.value)}
            placeholder="/logo.png"
          />
        </div>
      </section>

      {/* Site identity */}
      <section className="rounded-2xl border bg-card p-6">
        <h2 className="mb-4 font-semibold">Sayt nomi va shiori</h2>
        <div className="space-y-4">
          <Field label="Sayt nomi">
            <Input name="site.name" defaultValue={settings["site.name"]} />
          </Field>
          <div className="grid gap-4 sm:grid-cols-3">
            <Field label="Shior (UZ)">
              <Input
                name="site.tagline.uz"
                defaultValue={settings["site.tagline.uz"]}
              />
            </Field>
            <Field label="Shior (RU)">
              <Input
                name="site.tagline.ru"
                defaultValue={settings["site.tagline.ru"]}
              />
            </Field>
            <Field label="Shior (EN)">
              <Input
                name="site.tagline.en"
                defaultValue={settings["site.tagline.en"]}
              />
            </Field>
          </div>
        </div>
      </section>

      {/* Contacts */}
      <section className="rounded-2xl border bg-card p-6">
        <h2 className="mb-4 font-semibold">Footer kontaktlari</h2>
        <div className="space-y-4">
          <Field label="Telefon">
            <Input
              name="footer.phone"
              defaultValue={settings["footer.phone"]}
              placeholder="+998 94 878 24 00"
            />
          </Field>
          <div className="grid gap-4 sm:grid-cols-3">
            <Field label="Manzil (UZ)">
              <Input
                name="footer.address.uz"
                defaultValue={settings["footer.address.uz"]}
              />
            </Field>
            <Field label="Manzil (RU)">
              <Input
                name="footer.address.ru"
                defaultValue={settings["footer.address.ru"]}
              />
            </Field>
            <Field label="Manzil (EN)">
              <Input
                name="footer.address.en"
                defaultValue={settings["footer.address.en"]}
              />
            </Field>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Telegram havola">
              <Input
                name="footer.telegram"
                defaultValue={settings["footer.telegram"]}
                placeholder="https://t.me/..."
              />
            </Field>
            <Field label="Instagram havola">
              <Input
                name="footer.instagram"
                defaultValue={settings["footer.instagram"]}
                placeholder="https://instagram.com/..."
              />
            </Field>
          </div>
        </div>
      </section>

      <SaveButton />
    </form>
  );
}
