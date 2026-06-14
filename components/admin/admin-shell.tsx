"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  FolderTree,
  ShoppingBag,
  Settings,
  LogOut,
  ExternalLink,
} from "lucide-react";
import { logoutAction } from "@/app/admin/actions/auth";
import { cn } from "@/lib/utils";
import type { SessionUser } from "@/lib/auth";

const NAV = [
  { href: "/admin", label: "Boshqaruv", icon: LayoutDashboard, exact: true },
  { href: "/admin/products", label: "Mahsulotlar", icon: Package },
  { href: "/admin/categories", label: "Kategoriyalar", icon: FolderTree },
  { href: "/admin/orders", label: "Buyurtmalar", icon: ShoppingBag },
  { href: "/admin/settings", label: "Sozlamalar", icon: Settings },
];

export function AdminShell({
  user,
  children,
}: {
  user: SessionUser;
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-muted/30">
      {/* Sidebar */}
      <aside className="hidden w-64 shrink-0 flex-col border-r bg-card md:flex">
        <div className="flex h-16 items-center gap-2 border-b px-6">
          <span className="text-lg font-extrabold tracking-tight">
            Compuz<span className="text-primary">_</span>
          </span>
          <span className="rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-bold uppercase text-primary">
            Admin
          </span>
        </div>

        <nav className="flex-1 space-y-1 p-3">
          {NAV.map((item) => {
            const active = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  active
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t p-3">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground"
          >
            <ExternalLink className="h-4 w-4" />
            Saytni ochish
          </Link>
        </div>
      </aside>

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-16 items-center justify-between border-b bg-card px-4 md:px-8">
          {/* Mobile nav */}
          <nav className="flex items-center gap-1 overflow-x-auto md:hidden">
            {NAV.map((item) => {
              const active = item.exact
                ? pathname === item.href
                : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "grid h-9 w-9 shrink-0 place-items-center rounded-lg",
                    active
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-accent"
                  )}
                  aria-label={item.label}
                >
                  <item.icon className="h-4 w-4" />
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:block" />

          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">{user.email}</span>
            <form action={logoutAction}>
              <button
                type="submit"
                className="flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm font-medium hover:bg-accent"
              >
                <LogOut className="h-4 w-4" />
                Chiqish
              </button>
            </form>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}
