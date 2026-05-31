"use client";

import { Truck, ShieldCheck, CreditCard, Headphones } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export function UspSection() {
  const { t } = useLanguage();

  const items = [
    { icon: Truck, title: "usp.delivery.title", text: "usp.delivery.text" },
    {
      icon: ShieldCheck,
      title: "usp.warranty.title",
      text: "usp.warranty.text",
    },
    {
      icon: CreditCard,
      title: "usp.installment.title",
      text: "usp.installment.text",
    },
    {
      icon: Headphones,
      title: "usp.support.title",
      text: "usp.support.text",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((it) => (
        <div
          key={it.title}
          className="flex items-start gap-4 rounded-xl border bg-card p-5 transition-shadow hover:shadow-md"
        >
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
            <it.icon className="h-6 w-6" />
          </span>
          <div>
            <h3 className="font-semibold">{t(it.title)}</h3>
            <p className="text-sm text-muted-foreground">{t(it.text)}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
