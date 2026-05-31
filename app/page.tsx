"use client";

import { Trophy, Sparkles, Flame, Wallet } from "lucide-react";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import {
  getTopProducts,
  getNewProducts,
  getDiscountedProducts,
} from "@/lib/data/products";
import { Hero } from "@/components/home/hero";
import { CategoryCards } from "@/components/home/category-cards";
import { UspSection } from "@/components/home/usp-section";
import { BrandRow } from "@/components/home/brand-row";
import { Countdown } from "@/components/home/countdown";
import { BudgetSection } from "@/components/home/budget-section";
import { ProductRail } from "@/components/product-rail";
import { SectionHeading } from "@/components/section-heading";

export default function HomePage() {
  const { t } = useLanguage();

  const top = getTopProducts().slice(0, 8);
  const fresh = getNewProducts().slice(0, 8);
  const sale = getDiscountedProducts().slice(0, 8);

  return (
    <>
      <Hero />

      <div className="container space-y-16 py-12">
        {/* Categories */}
        <section>
          <CategoryCards />
        </section>

        {/* Top laptops */}
        <section>
          <SectionHeading
            icon={Trophy}
            title={t("section.top")}
            accent="text-amber-500"
            viewAllHref="/category/top-noutbuklar"
            viewAllLabel={t("section.viewAll")}
          />
          <ProductRail products={top} />
        </section>

        {/* New arrivals */}
        <section>
          <SectionHeading
            icon={Sparkles}
            title={t("section.new")}
            accent="text-sky-500"
            viewAllHref="/category/yangi-noutbuklar"
            viewAllLabel={t("section.viewAll")}
          />
          <ProductRail products={fresh} />
        </section>

        {/* Sale */}
        <section className="rounded-3xl border border-red-200 bg-red-50/60 p-6 sm:p-8">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="flex items-center gap-2.5 text-xl font-bold tracking-tight text-red-600 sm:text-2xl">
              <Flame className="h-6 w-6" />
              {t("section.sale")}
            </h2>
            <Countdown />
          </div>
          <ProductRail products={sale} />
        </section>

        {/* USP */}
        <section>
          <UspSection />
        </section>

        {/* Brands */}
        <section>
          <BrandRow />
        </section>

        {/* Budget */}
        <section>
          <SectionHeading
            icon={Wallet}
            title={t("section.budget")}
            accent="text-emerald-500"
            viewAllHref="/category/hamyonbop-noutbuklar"
            viewAllLabel={t("section.viewAll")}
          />
          <BudgetSection />
        </section>
      </div>
    </>
  );
}
