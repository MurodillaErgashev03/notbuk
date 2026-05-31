import { Badge } from "@/components/ui/badge";
import type { Locale, ProductBadge } from "@/lib/types";
import { cn } from "@/lib/utils";

const LABELS: Record<ProductBadge, Record<Locale, string>> = {
  TOP: { uz: "TOP", ru: "ТОП", en: "TOP" },
  YANGI: { uz: "YANGI", ru: "НОВИНКА", en: "NEW" },
  CHEGIRMA: { uz: "CHEGIRMA", ru: "СКИДКА", en: "SALE" },
  OMMABOP: { uz: "OMMABOP", ru: "ХИТ", en: "POPULAR" },
};

const STYLES: Record<ProductBadge, string> = {
  TOP: "bg-amber-500 text-white",
  YANGI: "bg-sky-500 text-white",
  CHEGIRMA: "bg-red-500 text-white",
  OMMABOP: "bg-violet-500 text-white",
};

export function ProductBadgeChip({
  badge,
  locale,
  className,
}: {
  badge: ProductBadge;
  locale: Locale;
  className?: string;
}) {
  return (
    <Badge className={cn("border-0 shadow", STYLES[badge], className)}>
      {LABELS[badge][locale]}
    </Badge>
  );
}
