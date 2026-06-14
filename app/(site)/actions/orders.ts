"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

interface CreateOrderItem {
  productId: string;
  productName: string;
  price: number;
  qty: number;
}

export interface CreateOrderInput {
  customerName: string;
  phone: string;
  address?: string;
  note?: string;
  items: CreateOrderItem[];
}

export async function createOrder(input: CreateOrderInput) {
  const customerName = input.customerName?.trim();
  const phone = input.phone?.trim();
  const address = input.address?.trim();
  const note = input.note?.trim();
  const items = input.items ?? [];

  if (!customerName) {
    return { error: "Ismingizni kiriting" };
  }
  if (!phone) {
    return { error: "Telefon raqamingizni kiriting" };
  }
  if (items.length === 0) {
    return { error: "Savatcha bo'sh" };
  }

  const total = items.reduce((acc, i) => acc + i.price * i.qty, 0);

  const order = await prisma.order.create({
    data: {
      customerName,
      phone,
      address: address || null,
      note: note || null,
      total,
      items: {
        create: items.map((i) => ({
          productId: i.productId,
          productName: i.productName,
          price: i.price,
          qty: i.qty,
        })),
      },
    },
  });

  revalidatePath("/admin/orders");
  return { ok: true as const, id: order.id };
}
