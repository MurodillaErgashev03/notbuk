"use client";

import Link from "next/link";
import { Laptop, MapPin, Phone, Mail } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { categories } from "@/lib/data/categories";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  const { t, tl } = useLanguage();

  return (
    <footer className="mt-16 border-t bg-muted/40">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-3">
            <Link href="/" className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground">
                <Laptop className="h-5 w-5" />
              </span>
              <span className="text-lg font-extrabold">
                Nout<span className="text-primary">Market</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              {t("footer.aboutText")}
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold">{t("footer.shop")}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/category/${c.slug}`}
                    className="hover:text-foreground"
                  >
                    {tl(c.name)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold">{t("footer.info")}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-foreground">
                  {t("footer.delivery")}
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-foreground">
                  {t("footer.warranty")}
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-foreground">
                  {t("footer.payment")}
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-foreground">
                  {t("footer.faq")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold">{t("footer.contact")}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 shrink-0 text-primary" />
                {t("footer.address")}
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-primary" />
                +998 71 200 00 00
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-primary" />
                info@noutmarket.uz
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col items-center justify-between gap-3 text-sm text-muted-foreground sm:flex-row">
          <p>
            © {new Date().getFullYear()} NoutMarket. {t("footer.rights")}
          </p>
          <div className="flex items-center gap-2">
            {["Payme", "Click", "Uzcard", "Humo"].map((p) => (
              <span
                key={p}
                className="rounded-md border bg-background px-2.5 py-1 text-xs font-semibold"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
