"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

export function Countdown() {
  const { t } = useLanguage();
  // Fixed dummy target: 2 days, 8 hours from a stable reference set on mount.
  const [target] = useState(() => Date.now() + (2 * 24 * 60 * 60 + 8 * 3600) * 1000);
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const diff = now === null ? 0 : Math.max(0, target - now);
  const days = Math.floor(diff / (24 * 3600 * 1000));
  const hours = Math.floor((diff % (24 * 3600 * 1000)) / (3600 * 1000));
  const minutes = Math.floor((diff % (3600 * 1000)) / (60 * 1000));
  const seconds = Math.floor((diff % (60 * 1000)) / 1000);

  const units = [
    { value: days, label: t("time.days") },
    { value: hours, label: t("time.hours") },
    { value: minutes, label: t("time.minutes") },
    { value: seconds, label: t("time.seconds") },
  ];

  return (
    <div className="flex items-center gap-2">
      <span className="hidden text-sm font-medium text-red-600 sm:inline">
        {t("sale.endsIn")}
      </span>
      <div className="flex items-center gap-1.5">
        {units.map((u, i) => (
          <div key={i} className="flex flex-col items-center">
            <span className="grid h-11 w-11 place-items-center rounded-lg bg-red-500 font-mono text-lg font-bold text-white tabular-nums">
              {now === null ? "--" : pad(u.value)}
            </span>
            <span className="mt-1 text-[10px] uppercase text-muted-foreground">
              {u.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
