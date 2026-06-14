import type {
  Product,
  CategoryDef,
  LocalizedText,
  ProductSpecs,
  ProductBadge,
} from "@/lib/types";

// Prisma rows store JSON fields as strings (SQLite has no JSON/array column).
// These helpers convert between DB rows and the app-facing domain types.

export type ProductRow = {
  id: string;
  name: string;
  brand: string;
  slug: string;
  price: number;
  originalPrice: number | null;
  discountPercent: number | null;
  images: string;
  categories: string;
  specs: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  isNew: boolean;
  isFeatured: boolean;
  badge: string | null;
  description: string;
};

export type CategoryRow = {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon: string;
  gradient: string;
  sortOrder: number;
};

function parseJSON<T>(value: string, fallback: T): T {
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

export function rowToProduct(row: ProductRow): Product {
  return {
    id: row.id,
    name: row.name,
    brand: row.brand,
    slug: row.slug,
    price: row.price,
    originalPrice: row.originalPrice ?? undefined,
    discountPercent: row.discountPercent ?? undefined,
    images: parseJSON<string[]>(row.images, []),
    category: parseJSON<string[]>(row.categories, []),
    specs: parseJSON<ProductSpecs>(row.specs, {
      processor: "",
      ram: "",
      storage: "",
      display: "",
      gpu: "",
      battery: "",
      os: "",
      weight: "",
    }),
    rating: row.rating,
    reviewCount: row.reviewCount,
    inStock: row.inStock,
    isNew: row.isNew,
    isFeatured: row.isFeatured,
    badge: (row.badge as ProductBadge) ?? undefined,
    description: parseJSON<LocalizedText>(row.description, {
      uz: "",
      ru: "",
      en: "",
    }),
  };
}

export function rowToCategory(row: CategoryRow): CategoryDef {
  return {
    slug: row.slug,
    name: parseJSON<LocalizedText>(row.name, { uz: "", ru: "", en: "" }),
    description: parseJSON<LocalizedText>(row.description, {
      uz: "",
      ru: "",
      en: "",
    }),
    icon: row.icon,
    gradient: row.gradient,
  };
}

// Convert app-facing input into the column values Prisma expects.
export function productToRow(p: Omit<Product, "id">) {
  return {
    name: p.name,
    brand: p.brand,
    slug: p.slug,
    price: p.price,
    originalPrice: p.originalPrice ?? null,
    discountPercent: p.discountPercent ?? null,
    images: JSON.stringify(p.images ?? []),
    categories: JSON.stringify(p.category ?? []),
    specs: JSON.stringify(p.specs),
    rating: p.rating ?? 0,
    reviewCount: p.reviewCount ?? 0,
    inStock: p.inStock ?? true,
    isNew: p.isNew ?? false,
    isFeatured: p.isFeatured ?? false,
    badge: p.badge ?? null,
    description: JSON.stringify(p.description),
  };
}

export function categoryToRow(c: CategoryDef) {
  return {
    slug: c.slug,
    name: JSON.stringify(c.name),
    description: JSON.stringify(c.description),
    icon: c.icon,
    gradient: c.gradient,
  };
}
