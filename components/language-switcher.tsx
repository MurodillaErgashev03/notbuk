"use client";

import { Globe, Check } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { LOCALES, LOCALE_LABELS } from "@/lib/i18n/translations";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-1.5 px-2">
          <Globe className="h-4 w-4" />
          <span className="hidden text-sm font-medium uppercase sm:inline">
            {locale}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44">
        {LOCALES.map((l) => (
          <DropdownMenuItem
            key={l}
            onClick={() => setLocale(l)}
            className="cursor-pointer justify-between"
          >
            <span className="flex items-center gap-2">
              <span>{LOCALE_LABELS[l].flag}</span>
              {LOCALE_LABELS[l].label}
            </span>
            {locale === l && <Check className="h-4 w-4 text-primary" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
