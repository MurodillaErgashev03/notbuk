import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaClient } from "../lib/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

import { categories } from "../lib/data/categories";
import { products } from "../lib/data/products";
import { categoryToRow, productToRow } from "../lib/serialize";

// Seed via the DIRECT (session) pooler so it works alongside migrations.
const connectionString =
  process.env.DIRECT_URL ?? process.env.DATABASE_URL ?? "";
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

const DEFAULT_SETTINGS: Record<string, string> = {
  "site.name": "Compuz",
  "site.tagline.uz": "Eng yaxshi noutbuklar do'koni",
  "site.tagline.ru": "Лучший магазин ноутбуков",
  "site.tagline.en": "The best laptop store",
  "footer.phone": "+998 94 878 24 00",
  "footer.address.uz":
    "Toshkent shahar, Malika savdo kompleksi, A15 do'kon, ko'cha tomoni",
  "footer.address.ru": "г. Ташкент, ТЦ Малика, магазин A15, со стороны улицы",
  "footer.address.en": "Tashkent, Malika shopping complex, shop A15, street side",
  "footer.telegram": "https://t.me/apojan25",
  "footer.instagram": "https://instagram.com/compuz_",
  "logo.url": "/logo.png",
};

async function main() {
  console.log("Seeding database...");

  // Categories
  for (let i = 0; i < categories.length; i++) {
    const c = categories[i];
    await prisma.category.upsert({
      where: { slug: c.slug },
      update: { ...categoryToRow(c), sortOrder: i },
      create: { ...categoryToRow(c), sortOrder: i },
    });
  }
  console.log(`  ✓ ${categories.length} categories`);

  // Products — preserve original ids so existing links keep working
  for (let i = 0; i < products.length; i++) {
    const p = products[i];
    const { id, ...rest } = p;
    const row = { ...productToRow(rest), sortOrder: i };
    await prisma.product.upsert({
      where: { id },
      update: row,
      create: { id, ...row },
    });
  }
  console.log(`  ✓ ${products.length} products`);

  // Settings
  for (const [key, value] of Object.entries(DEFAULT_SETTINGS)) {
    await prisma.setting.upsert({
      where: { key },
      update: {}, // don't overwrite settings the admin may have changed
      create: { key, value },
    });
  }
  console.log(`  ✓ ${Object.keys(DEFAULT_SETTINGS).length} settings`);

  // Default admin user
  const email = process.env.ADMIN_EMAIL ?? "admin@compuz.uz";
  const password = process.env.ADMIN_PASSWORD ?? "admin123";
  const existing = await prisma.adminUser.findUnique({ where: { email } });
  if (!existing) {
    const hash = await bcrypt.hash(password, 10);
    await prisma.adminUser.create({
      data: { email, password: hash, name: "Admin" },
    });
    console.log(`  ✓ admin user created: ${email} / ${password}`);
  } else {
    console.log(`  • admin user already exists: ${email}`);
  }

  console.log("Done.");
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
