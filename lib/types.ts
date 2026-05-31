export type Locale = "uz" | "ru" | "en";

export type LocalizedText = Record<Locale, string>;

export type ProductBadge = "TOP" | "YANGI" | "CHEGIRMA" | "OMMABOP";

export interface ProductSpecs {
  processor: string;
  ram: string;
  storage: string;
  display: string;
  gpu: string;
  battery: string;
  os: string;
  weight: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  slug: string;
  price: number; // in UZS
  originalPrice?: number; // for discounted items
  discountPercent?: number;
  images: string[];
  category: string[]; // category slugs
  specs: ProductSpecs;
  rating: number; // 1-5
  reviewCount: number;
  inStock: boolean;
  isNew: boolean;
  isFeatured: boolean;
  badge?: ProductBadge;
  description: LocalizedText;
}

export interface CategoryDef {
  slug: string;
  name: LocalizedText;
  description: LocalizedText;
  icon: string; // lucide icon name
  gradient: string; // tailwind gradient classes
}

export interface CartItem {
  product: Product;
  qty: number;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  text: LocalizedText;
}
