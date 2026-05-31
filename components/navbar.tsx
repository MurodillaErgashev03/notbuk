"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Laptop,
  ShoppingCart,
  Menu,
  ChevronDown,
  GitCompareArrows,
  Search as SearchIcon,
} from "lucide-react";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useCart } from "@/lib/cart-context";
import { useWishlist } from "@/lib/wishlist-context";
import { categories } from "@/lib/data/categories";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { SearchBar } from "@/components/search-bar";
import { LanguageSwitcher } from "@/components/language-switcher";
import { CategoryIcon } from "@/components/category-icon";

export function Navbar() {
  const { t, tl } = useLanguage();
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const [mobileSearch, setMobileSearch] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container flex h-16 items-center gap-3">
        {/* Mobile menu */}
        <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label={t("nav.menu")}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80">
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2">
                <Laptop className="h-5 w-5 text-primary" />
                NoutMarket
              </SheetTitle>
            </SheetHeader>
            <div className="mt-6 flex flex-col gap-1">
              <p className="px-2 pb-1 text-xs font-semibold uppercase text-muted-foreground">
                {t("nav.categories")}
              </p>
              {categories.map((c) => (
                <SheetClose asChild key={c.slug}>
                  <Link
                    href={`/category/${c.slug}`}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-accent"
                  >
                    <CategoryIcon name={c.icon} className="h-4 w-4 text-primary" />
                    {tl(c.name)}
                  </Link>
                </SheetClose>
              ))}
            </div>
          </SheetContent>
        </Sheet>

        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground">
            <Laptop className="h-5 w-5" />
          </span>
          <span className="text-lg font-extrabold tracking-tight">
            Nout<span className="text-primary">Market</span>
          </span>
        </Link>

        {/* Categories dropdown (desktop) */}
        <nav className="hidden items-center md:flex">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-1">
                {t("nav.catalog")}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-64">
              {categories.map((c) => (
                <DropdownMenuItem key={c.slug} asChild>
                  <Link
                    href={`/category/${c.slug}`}
                    className="cursor-pointer gap-3"
                  >
                    <CategoryIcon
                      name={c.icon}
                      className="h-4 w-4 text-primary"
                    />
                    {tl(c.name)}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        {/* Search (desktop) */}
        <div className="hidden flex-1 lg:block">
          <SearchBar />
        </div>

        <div className="flex flex-1 items-center justify-end gap-1 lg:flex-none">
          {/* Mobile search toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            aria-label={t("nav.search.placeholder")}
            onClick={() => setMobileSearch((s) => !s)}
          >
            <SearchIcon className="h-5 w-5" />
          </Button>

          <LanguageSwitcher />

          <Button
            variant="ghost"
            size="icon"
            className="relative hidden sm:inline-flex"
            aria-label={t("nav.compare")}
          >
            <GitCompareArrows className="h-5 w-5" />
            {wishlistCount > 0 && (
              <Badge className="absolute -right-1 -top-1 h-5 min-w-5 justify-center rounded-full px-1 text-[10px]">
                {wishlistCount}
              </Badge>
            )}
          </Button>

          <Button
            asChild
            variant="ghost"
            size="icon"
            className="relative"
            aria-label={t("nav.cart")}
          >
            <Link href="/cart">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <Badge className="absolute -right-1 -top-1 h-5 min-w-5 justify-center rounded-full px-1 text-[10px]">
                  {cartCount}
                </Badge>
              )}
            </Link>
          </Button>
        </div>
      </div>

      {/* Mobile expandable search */}
      {mobileSearch && (
        <div className="border-t p-3 lg:hidden">
          <SearchBar autoFocus onSubmitted={() => setMobileSearch(false)} />
        </div>
      )}
    </header>
  );
}
