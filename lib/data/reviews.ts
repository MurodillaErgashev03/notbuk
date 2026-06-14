import type { Review } from "@/lib/types";

// Sample customer reviews shown on product pages.
export const reviews: Review[] = [
  {
    id: "r1",
    author: "Jasur T.",
    rating: 5,
    date: "2026-04-12",
    text: {
      uz: "Ajoyib noutbuk! Tez yetkazib berishdi, hammasi kafolat bilan. Tavsiya qilaman.",
      ru: "Отличный ноутбук! Доставили быстро, всё с гарантией. Рекомендую.",
      en: "Excellent laptop! Delivered fast, everything with warranty. Recommended.",
    },
  },
  {
    id: "r2",
    author: "Dilnoza K.",
    rating: 4,
    date: "2026-03-28",
    text: {
      uz: "Narxiga arziydi. Ekrani juda chiroyli, batareyasi uzoq ishlaydi.",
      ru: "Стоит своих денег. Экран очень красивый, батарея держит долго.",
      en: "Worth the money. The screen is beautiful and the battery lasts long.",
    },
  },
  {
    id: "r3",
    author: "Sardor M.",
    rating: 5,
    date: "2026-03-15",
    text: {
      uz: "Bo'lib to'lash juda qulay bo'ldi. Do'kon xodimlari professional.",
      ru: "Рассрочка оказалась очень удобной. Сотрудники магазина профессиональны.",
      en: "The installment plan was very convenient. The store staff are professional.",
    },
  },
  {
    id: "r4",
    author: "Madina A.",
    rating: 4,
    date: "2026-02-20",
    text: {
      uz: "Ish uchun sotib oldim, hammasi joyida ishlayapti. Mamnunman.",
      ru: "Купила для работы, всё работает отлично. Довольна.",
      en: "Bought it for work, everything runs great. I'm satisfied.",
    },
  },
];
