import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function SectionHeading({
  icon: Icon,
  title,
  viewAllHref,
  viewAllLabel,
  accent = "text-primary",
  className,
}: {
  icon?: LucideIcon;
  title: string;
  viewAllHref?: string;
  viewAllLabel?: string;
  accent?: string;
  className?: string;
}) {
  return (
    <div className={cn("mb-6 flex items-end justify-between gap-4", className)}>
      <h2 className="flex items-center gap-2.5 text-xl font-bold tracking-tight sm:text-2xl">
        {Icon && (
          <span className={cn("grid place-items-center", accent)}>
            <Icon className="h-6 w-6" />
          </span>
        )}
        {title}
      </h2>
      {viewAllHref && (
        <Link
          href={viewAllHref}
          className="group inline-flex shrink-0 items-center gap-1 text-sm font-medium text-primary hover:underline"
        >
          {viewAllLabel}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      )}
    </div>
  );
}
