import type { Locale } from "@/lib/types";

export const LOCALES: Locale[] = ["uz", "ru", "en"];

export const LOCALE_LABELS: Record<Locale, { label: string; flag: string }> = {
  uz: { label: "O'zbekcha", flag: "🇺🇿" },
  ru: { label: "Русский", flag: "🇷🇺" },
  en: { label: "English", flag: "🇬🇧" },
};

type Dict = Record<string, Record<Locale, string>>;

export const dict: Dict = {
  // ---- Brand / generic ----
  "brand.name": { uz: "Compuz", ru: "Compuz", en: "Compuz" },
  "brand.tagline": {
    uz: "Ishonchli noutbuk do'koni",
    ru: "Надёжный магазин ноутбуков",
    en: "Trusted laptop store",
  },

  // ---- Navbar ----
  "nav.catalog": { uz: "Katalog", ru: "Каталог", en: "Catalog" },
  "nav.categories": { uz: "Kategoriyalar", ru: "Категории", en: "Categories" },
  "nav.search.placeholder": {
    uz: "Noutbuk qidirish...",
    ru: "Поиск ноутбука...",
    en: "Search laptops...",
  },
  "nav.cart": { uz: "Savat", ru: "Корзина", en: "Cart" },
  "nav.compare": { uz: "Solishtirish", ru: "Сравнить", en: "Compare" },
  "nav.menu": { uz: "Menyu", ru: "Меню", en: "Menu" },
  "nav.allCategories": {
    uz: "Barcha kategoriyalar",
    ru: "Все категории",
    en: "All categories",
  },

  // ---- Hero ----
  "hero.title": {
    uz: "O'zbekistonning eng yaxshi noutbuk do'koni",
    ru: "Лучший магазин ноутбуков в Узбекистане",
    en: "Uzbekistan's best laptop store",
  },
  "hero.subtitle": {
    uz: "Eng yangi modellar. Kafolat bilan. Tez yetkazib berish.",
    ru: "Самые новые модели. С гарантией. Быстрая доставка.",
    en: "The newest models. With warranty. Fast delivery.",
  },
  "hero.cta.catalog": {
    uz: "Katalogni ko'rish",
    ru: "Смотреть каталог",
    en: "View catalog",
  },
  "hero.cta.deals": { uz: "Chegirmalar", ru: "Скидки", en: "Deals" },
  "hero.chip.warranty": {
    uz: "✓ 2 yil kafolat",
    ru: "✓ 2 года гарантии",
    en: "✓ 2 year warranty",
  },
  "hero.chip.delivery": {
    uz: "✓ Toshkentga 1 kunda",
    ru: "✓ В Ташкент за 1 день",
    en: "✓ Tashkent in 1 day",
  },
  "hero.chip.installment": {
    uz: "✓ Bo'lib to'lash",
    ru: "✓ Рассрочка",
    en: "✓ Installments",
  },

  // ---- Sections ----
  "section.top": { uz: "Top Noutbuklar", ru: "Топ ноутбуки", en: "Top Laptops" },
  "section.new": {
    uz: "Yangi Noutbuklar",
    ru: "Новые ноутбуки",
    en: "New Arrivals",
  },
  "section.sale": {
    uz: "Chegirmadagi Noutbuklar",
    ru: "Ноутбуки со скидкой",
    en: "Laptops on Sale",
  },
  "section.budget": {
    uz: "Hamyonbop tanlov",
    ru: "Бюджетный выбор",
    en: "Budget Picks",
  },
  "section.viewAll": {
    uz: "Barchasini ko'rish",
    ru: "Смотреть все",
    en: "View all",
  },
  "section.related": {
    uz: "O'xshash noutbuklar",
    ru: "Похожие ноутбуки",
    en: "Related laptops",
  },

  // ---- Countdown ----
  "sale.endsIn": {
    uz: "Aksiya tugashiga:",
    ru: "До конца акции:",
    en: "Sale ends in:",
  },
  "time.days": { uz: "kun", ru: "дн", en: "days" },
  "time.hours": { uz: "soat", ru: "ч", en: "hrs" },
  "time.minutes": { uz: "daqiqa", ru: "мин", en: "min" },
  "time.seconds": { uz: "soniya", ru: "сек", en: "sec" },

  // ---- USP ----
  "usp.delivery.title": {
    uz: "Tez yetkazib berish",
    ru: "Быстрая доставка",
    en: "Fast delivery",
  },
  "usp.delivery.text": {
    uz: "Toshkentga 1 kunda yetkazib berish",
    ru: "Доставка в Ташкент за 1 день",
    en: "Delivery to Tashkent in 1 day",
  },
  "usp.warranty.title": {
    uz: "Rasmiy kafolat",
    ru: "Официальная гарантия",
    en: "Official warranty",
  },
  "usp.warranty.text": {
    uz: "2 yil rasmiy kafolat",
    ru: "2 года официальной гарантии",
    en: "2 years official warranty",
  },
  "usp.installment.title": {
    uz: "0% bo'lib to'lash",
    ru: "Рассрочка 0%",
    en: "0% installments",
  },
  "usp.installment.text": {
    uz: "0% bo'lib to'lash — 12 oy",
    ru: "Рассрочка 0% — 12 месяцев",
    en: "0% installments — 12 months",
  },
  "usp.support.title": {
    uz: "24/7 yordam",
    ru: "Поддержка 24/7",
    en: "24/7 support",
  },
  "usp.support.text": {
    uz: "24/7 texnik yordam",
    ru: "Техподдержка 24/7",
    en: "24/7 technical support",
  },
  "usp.brands": {
    uz: "Bizga ishonadigan brendlar",
    ru: "Бренды, которым мы доверяем",
    en: "Brands we trust",
  },

  // ---- Budget chips ----
  "budget.3-5": { uz: "3-5 mln", ru: "3-5 млн", en: "3-5 M" },
  "budget.5-8": { uz: "5-8 mln", ru: "5-8 млн", en: "5-8 M" },
  "budget.8-12": { uz: "8-12 mln", ru: "8-12 млн", en: "8-12 M" },

  // ---- Product card ----
  "product.addToCart": {
    uz: "Savatga qo'shish",
    ru: "В корзину",
    en: "Add to cart",
  },
  "product.quickView": {
    uz: "Tezkor ko'rish",
    ru: "Быстрый просмотр",
    en: "Quick view",
  },
  "product.inStock": { uz: "Mavjud", ru: "В наличии", en: "In stock" },
  "product.outOfStock": { uz: "Tugagan", ru: "Нет в наличии", en: "Out of stock" },
  "product.buyNow": { uz: "Xarid qilish", ru: "Купить", en: "Buy now" },
  "product.save": { uz: "Saqlash", ru: "Сохранить", en: "Save" },
  "product.writeReview": {
    uz: "Sharh yozish",
    ru: "Написать отзыв",
    en: "Write a review",
  },
  "product.reviews": { uz: "sharh", ru: "отзывов", en: "reviews" },
  "product.quantity": { uz: "Miqdori", ru: "Количество", en: "Quantity" },
  "product.delivery.box": {
    uz: "Toshkentga 1 kunda yetkazib beramiz 🚚",
    ru: "Доставим в Ташкент за 1 день 🚚",
    en: "We deliver to Tashkent in 1 day 🚚",
  },
  "product.installment.box": {
    uz: "0% bo'lib to'lash: 12 oy ×",
    ru: "Рассрочка 0%: 12 мес ×",
    en: "0% installments: 12 months ×",
  },
  "product.perMonth": { uz: "/oy", ru: "/мес", en: "/mo" },

  // ---- Tabs ----
  "tab.description": { uz: "Tavsif", ru: "Описание", en: "Description" },
  "tab.specs": { uz: "Xususiyatlar", ru: "Характеристики", en: "Specifications" },
  "tab.reviews": { uz: "Sharhlar", ru: "Отзывы", en: "Reviews" },

  // ---- Specs labels ----
  "spec.processor": { uz: "Protsessor", ru: "Процессор", en: "Processor" },
  "spec.ram": { uz: "Operativ xotira", ru: "Оперативная память", en: "RAM" },
  "spec.storage": { uz: "Xotira", ru: "Накопитель", en: "Storage" },
  "spec.display": { uz: "Ekran", ru: "Экран", en: "Display" },
  "spec.gpu": { uz: "Videokarta", ru: "Видеокарта", en: "GPU" },
  "spec.battery": { uz: "Batareya", ru: "Батарея", en: "Battery" },
  "spec.os": { uz: "Operatsion tizim", ru: "Операционная система", en: "OS" },
  "spec.weight": { uz: "Og'irligi", ru: "Вес", en: "Weight" },

  // ---- Category / filters ----
  "filter.title": { uz: "Filtrlar", ru: "Фильтры", en: "Filters" },
  "filter.brand": { uz: "Brend", ru: "Бренд", en: "Brand" },
  "filter.price": { uz: "Narx (UZS)", ru: "Цена (UZS)", en: "Price (UZS)" },
  "filter.priceMin": { uz: "Eng kam", ru: "Мин", en: "Min" },
  "filter.priceMax": { uz: "Eng ko'p", ru: "Макс", en: "Max" },
  "filter.ram": { uz: "Operativ xotira", ru: "Оперативная память", en: "RAM" },
  "filter.storage": { uz: "Xotira", ru: "Накопитель", en: "Storage" },
  "filter.processor": { uz: "Protsessor", ru: "Процессор", en: "Processor" },
  "filter.inStockOnly": {
    uz: "Faqat mavjud",
    ru: "Только в наличии",
    en: "In stock only",
  },
  "filter.reset": { uz: "Tozalash", ru: "Сбросить", en: "Reset" },
  "filter.apply": { uz: "Qo'llash", ru: "Применить", en: "Apply" },
  "filter.open": { uz: "Filtrlar", ru: "Фильтры", en: "Filters" },

  // ---- Sort ----
  "sort.label": { uz: "Saralash", ru: "Сортировка", en: "Sort" },
  "sort.priceAsc": { uz: "Narx ↑", ru: "Цена ↑", en: "Price ↑" },
  "sort.priceDesc": { uz: "Narx ↓", ru: "Цена ↓", en: "Price ↓" },
  "sort.rating": { uz: "Reyting", ru: "Рейтинг", en: "Rating" },
  "sort.new": { uz: "Yangi", ru: "Новинки", en: "Newest" },
  "sort.popular": { uz: "Ommabop", ru: "Популярные", en: "Popular" },

  // ---- Listing ----
  "listing.results": { uz: "ta natija", ru: "результатов", en: "results" },
  "listing.loadMore": {
    uz: "Ko'proq yuklash",
    ru: "Загрузить ещё",
    en: "Load more",
  },
  "listing.noResults": {
    uz: "Hech narsa topilmadi",
    ru: "Ничего не найдено",
    en: "Nothing found",
  },
  "listing.noResultsHint": {
    uz: "Boshqa filtrlarni sinab ko'ring yoki qidiruvni o'zgartiring.",
    ru: "Попробуйте другие фильтры или измените запрос.",
    en: "Try different filters or change your search.",
  },
  "listing.count": { uz: "mahsulot", ru: "товаров", en: "products" },

  // ---- Search ----
  "search.title": { uz: "Qidiruv natijalari", ru: "Результаты поиска", en: "Search results" },
  "search.forQuery": { uz: "bo'yicha", ru: "по запросу", en: "for" },
  "search.suggestions": {
    uz: "Mashhur qidiruvlar:",
    ru: "Популярные запросы:",
    en: "Popular searches:",
  },

  // ---- Cart ----
  "cart.title": { uz: "Savat", ru: "Корзина", en: "Cart" },
  "cart.empty.title": {
    uz: "Savatingiz bo'sh",
    ru: "Ваша корзина пуста",
    en: "Your cart is empty",
  },
  "cart.empty.text": {
    uz: "Katalogdan noutbuk tanlang va savatga qo'shing.",
    ru: "Выберите ноутбук из каталога и добавьте в корзину.",
    en: "Pick a laptop from the catalog and add it to your cart.",
  },
  "cart.empty.cta": {
    uz: "Katalogga o'tish",
    ru: "Перейти в каталог",
    en: "Go to catalog",
  },
  "cart.summary": { uz: "Buyurtma xulosasi", ru: "Сумма заказа", en: "Order summary" },
  "cart.subtotal": { uz: "Mahsulotlar", ru: "Товары", en: "Subtotal" },
  "cart.delivery": { uz: "Yetkazib berish", ru: "Доставка", en: "Delivery" },
  "cart.deliveryFree": { uz: "Bepul", ru: "Бесплатно", en: "Free" },
  "cart.total": { uz: "Jami", ru: "Итого", en: "Total" },
  "cart.checkout": { uz: "Buyurtma berish", ru: "Оформить заказ", en: "Checkout" },
  "cart.remove": { uz: "O'chirish", ru: "Удалить", en: "Remove" },
  "cart.clear": { uz: "Savatni tozalash", ru: "Очистить корзину", en: "Clear cart" },
  "cart.paymentMethods": {
    uz: "To'lov usullari",
    ru: "Способы оплаты",
    en: "Payment methods",
  },
  "cart.itemsCount": { uz: "ta mahsulot", ru: "товаров", en: "items" },

  // ---- Toasts ----
  "toast.added": {
    uz: "Savatga qo'shildi",
    ru: "Добавлено в корзину",
    en: "Added to cart",
  },
  "toast.removed": {
    uz: "Savatdan o'chirildi",
    ru: "Удалено из корзины",
    en: "Removed from cart",
  },
  "toast.wishAdded": {
    uz: "Saqlanganlarga qo'shildi",
    ru: "Добавлено в избранное",
    en: "Added to wishlist",
  },
  "toast.wishRemoved": {
    uz: "Saqlanganlardan o'chirildi",
    ru: "Удалено из избранного",
    en: "Removed from wishlist",
  },
  "toast.cleared": {
    uz: "Savat tozalandi",
    ru: "Корзина очищена",
    en: "Cart cleared",
  },
  "toast.orderPlaced": {
    uz: "Buyurtma qabul qilindi! Tez orada bog'lanamiz.",
    ru: "Заказ принят! Мы скоро свяжемся.",
    en: "Order placed! We'll contact you soon.",
  },

  // ---- Footer ----
  "footer.about": { uz: "Biz haqimizda", ru: "О нас", en: "About us" },
  "footer.aboutText": {
    uz: "Compuz — O'zbekistondagi rasmiy noutbuk do'koni. Kafolat va tez yetkazib berish.",
    ru: "Compuz — официальный магазин ноутбуков в Узбекистане. Гарантия и быстрая доставка.",
    en: "Compuz — the official laptop store in Uzbekistan. Warranty and fast delivery.",
  },
  "footer.shop": { uz: "Do'kon", ru: "Магазин", en: "Shop" },
  "footer.info": { uz: "Ma'lumot", ru: "Информация", en: "Information" },
  "footer.contact": { uz: "Aloqa", ru: "Контакты", en: "Contact" },
  "footer.delivery": { uz: "Yetkazib berish", ru: "Доставка", en: "Delivery" },
  "footer.warranty": { uz: "Kafolat", ru: "Гарантия", en: "Warranty" },
  "footer.payment": { uz: "To'lov", ru: "Оплата", en: "Payment" },
  "footer.faq": { uz: "Savol-javob", ru: "Вопросы и ответы", en: "FAQ" },
  "footer.rights": {
    uz: "Barcha huquqlar himoyalangan.",
    ru: "Все права защищены.",
    en: "All rights reserved.",
  },
  "footer.address": {
    uz: "Toshkent shahar, Malika savdo kompleksi, A15 do'kon, ko'cha tomoni",
    ru: "г. Ташкент, ТЦ Малика, магазин A15, со стороны улицы",
    en: "Tashkent, Malika shopping complex, shop A15, street side",
  },

  // ---- Breadcrumb ----
  "breadcrumb.home": { uz: "Bosh sahifa", ru: "Главная", en: "Home" },

  // ---- Misc ----
  "common.from": { uz: "dan", ru: "от", en: "from" },
};

export function translate(key: string, locale: Locale): string {
  const entry = dict[key];
  if (!entry) return key;
  return entry[locale] ?? entry.uz ?? key;
}
