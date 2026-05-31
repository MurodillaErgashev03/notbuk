"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Tag, ShieldCheck, Truck, CreditCard } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Button } from "@/components/ui/button";

export function Hero() {
  const { t } = useLanguage();

  const chips = [
    { icon: ShieldCheck, key: "hero.chip.warranty" },
    { icon: Truck, key: "hero.chip.delivery" },
    { icon: CreditCard, key: "hero.chip.installment" },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-indigo-700 to-indigo-900 text-white">
      <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-blue-400/20 blur-3xl" />
      <div className="absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-indigo-400/20 blur-3xl" />

      <div className="container relative grid items-center gap-10 py-14 md:grid-cols-2 md:py-20">
        <div className="space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm font-medium ring-1 ring-white/20">
            🇺🇿 NoutMarket
          </span>
          <h1 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            {t("hero.title")}
          </h1>
          <p className="max-w-md text-base text-blue-100 sm:text-lg">
            {t("hero.subtitle")}
          </p>

          <div className="flex flex-wrap gap-3">
            <Button
              asChild
              size="lg"
              className="bg-white text-indigo-700 hover:bg-blue-50"
            >
              <Link href="/category/top-noutbuklar">
                {t("hero.cta.catalog")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/40 bg-white/5 text-white hover:bg-white/15 hover:text-white"
            >
              <Link href="/category/chegirmadagi-noutbuklar">
                <Tag className="h-4 w-4" />
                {t("hero.cta.deals")}
              </Link>
            </Button>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            {chips.map((c) => (
              <span
                key={c.key}
                className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-sm ring-1 ring-white/20"
              >
                <c.icon className="h-4 w-4" />
                {t(c.key)}
              </span>
            ))}
          </div>
        </div>

        <div className="relative hidden md:block">
          <div className="relative mx-auto aspect-[4/3] w-full max-w-md animate-float">
            <div className="absolute inset-0 rounded-2xl bg-white/10 ring-1 ring-white/20 backdrop-blur" />
            <Image
              src="https://picsum.photos/seed/noutmarket-hero/800/600"
              alt="Laptop"
              fill
              priority
              sizes="(max-width:768px) 0px, 448px"
              className="rounded-2xl object-cover p-2"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
