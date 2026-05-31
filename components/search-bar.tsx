"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function SearchBar({
  className,
  onSubmitted,
  autoFocus,
}: {
  className?: string;
  onSubmitted?: () => void;
  autoFocus?: boolean;
}) {
  const { t } = useLanguage();
  const router = useRouter();
  const [q, setQ] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = q.trim();
    if (!query) return;
    router.push(`/search?q=${encodeURIComponent(query)}`);
    onSubmitted?.();
  };

  return (
    <form onSubmit={submit} className={cn("relative w-full", className)}>
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder={t("nav.search.placeholder")}
        autoFocus={autoFocus}
        className="pl-9"
        aria-label={t("nav.search.placeholder")}
      />
    </form>
  );
}
