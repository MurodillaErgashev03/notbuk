import { Trophy, Sparkles, Wallet, Tag, type LucideIcon } from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  Trophy,
  Sparkles,
  Wallet,
  Tag,
};

export function CategoryIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Icon = ICONS[name] ?? Tag;
  return <Icon className={className} />;
}
