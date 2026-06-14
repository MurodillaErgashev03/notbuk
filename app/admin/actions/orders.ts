"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import { ORDER_STATUSES, type OrderStatus } from "@/lib/order-status";

export async function updateOrderStatus(id: string, status: string) {
  await requireUser();
  if (!ORDER_STATUSES.includes(status as OrderStatus)) {
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
