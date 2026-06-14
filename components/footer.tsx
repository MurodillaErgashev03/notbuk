"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Send } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useCategories, useSettings } from "@/lib/site-data";
import { Separator } from "@/components/ui/separator";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

export function Footer() {
  const { t, tl, locale } = useLanguage();
  const categories = useCategories();
  const settings = useSettings();

  const logoUrl = settings["logo.url"] || "/logo.png";
  const siteName = settings["site.name"] || "Compuz";
  const phone = settings["footer.phone"] || "";
  const telegram = settings["footer.telegram"] || "";
  const instagram = settings["footer.instagram"] || "";
  const address =
    settings[`footer.address.${locale}`] ||
    settings["footer.address.uz"] ||
    t("footer.address");

  const telHref = phone ? `tel:${phone.replace(/[^\d+]/g, "")}` : undefined;
  const igHandle = instagram
    ? "@" + instagram.replace(/\/+$/, "").split("/").pop()
    : "";

  return (
    <footer className="mt-16 border-t bg-muted/40">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-3">
            <Link href="/" className="flex items-center gap-2">
              <span className="grid h-11 w-11 place-items-center overflow-hidden rounded-lg">
                <Image
                  src={logoUrl}
                  alt={siteName}
                  width={44}
                  height={44}
                  className="h-11 w-11 object-cover"
                />
              </span>
              <span className="text-lg font-extrabold">
                {siteName}
                <span className="text-primary">_</span>
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
              {address && (
                <li className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  {address}
                </li>
              )}
              {phone && (
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4 shrink-0 text-primary" />
                  <a href={telHref} className="hover:text-foreground">
                    {phone}
                  </a>
                </li>
              )}
              {telegram && (
                <li className="flex items-center gap-2">
                  <Send className="h-4 w-4 shrink-0 text-primary" />
                  <a
                    href={telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-foreground"
                  >
                    Telegram
                  </a>
                </li>
              )}
              {instagram && (
                <li className="flex items-center gap-2">
                  <InstagramIcon className="h-4 w-4 shrink-0 text-primary" />
                  <a
                    href={instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-foreground"
                  >
                    {igHandle}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col items-center justify-between gap-3 text-sm text-muted-foreground sm:flex-row">
          <p>
            © {new Date().getFullYear()} {siteName}. {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
