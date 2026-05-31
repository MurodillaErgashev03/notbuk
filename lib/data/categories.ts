import type { CategoryDef } from "@/lib/types";

export const categories: CategoryDef[] = [
  {
    slug: "top-noutbuklar",
    name: {
      uz: "Top Noutbuklar",
      ru: "Топ ноутбуки",
      en: "Top Laptops",
    },
    description: {
      uz: "Eng kuchli va eng ko'p sotilgan noutbuklar — eng yaxshi tanlov.",
      ru: "Самые мощные и популярные ноутбуки — лучший выбор.",
      en: "The most powerful and best-selling laptops — the best choice.",
    },
    icon: "Trophy",
    gradient: "from-amber-500 to-orange-600",
  },
  {
    slug: "yangi-noutbuklar",
    name: {
      uz: "Yangi Noutbuklar",
      ru: "Новые ноутбуки",
      en: "New Laptops",
    },
    description: {
      uz: "Bozordagi eng so'nggi modellar va yangi kelgan noutbuklar.",
      ru: "Самые свежие модели и новинки на рынке.",
      en: "The latest models and newly arrived laptops.",
    },
    icon: "Sparkles",
    gradient: "from-sky-500 to-blue-600",
  },
  {
    slug: "hamyonbop-noutbuklar",
    name: {
      uz: "Hamyonbop Noutbuklar",
      ru: "Бюджетные ноутбуки",
      en: "Budget Laptops",
    },
    description: {
      uz: "Hamyonbop narxlardagi ishonchli noutbuklar — sifat va tejamkorlik.",
      ru: "Надёжные ноутбуки по доступным ценам — качество и экономия.",
      en: "Reliable laptops at affordable prices — quality and savings.",
    },
    icon: "Wallet",
    gradient: "from-emerald-500 to-green-600",
  },
  {
    slug: "chegirmadagi-noutbuklar",
    name: {
      uz: "Chegirmadagi Noutbuklar",
      ru: "Ноутбуки со скидкой",
      en: "Discounted Laptops",
    },
    description: {
      uz: "Maxsus chegirmalar va aksiyalar — eng foydali narxlar.",
      ru: "Специальные скидки и акции — самые выгодные цены.",
      en: "Special discounts and promotions — the best prices.",
    },
    icon: "Tag",
    gradient: "from-rose-500 to-red-600",
  },
];

export function getCategory(slug: string): CategoryDef | undefined {
  return categories.find((c) => c.slug === slug);
}
