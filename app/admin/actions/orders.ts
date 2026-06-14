"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";

export const ORDER_STATUSES = [
  "new",
  "confirmed",
  "shipped",
  "done",
  "cancelled",
] as const;

export async function updateOrderStatus(id: string, status: string) {
  await requireUser();
  if (!ORDER_STATUSES.includes(status as (typeof ORDER_STATUSES)[number])) {
    return { error: "Noto'g'ri status" };
  }
  await prisma.order.update({ where: { id }, data: { status } });
  revalidatePath("/admin/orders");
  return { ok: true };
}

export async function deleteOrder(id: string) {
  await requireUser();
  await prisma.order.delete({ where: { id } });
  revalidatePath("/admin/orders");
}
