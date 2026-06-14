"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { updateOrderStatus } from "@/app/admin/actions/orders";
import {
  ORDER_STATUSES,
  STATUS_LABELS,
  STATUS_COLORS,
} from "@/lib/order-status";
import { cn } from "@/lib/utils";

export function OrderStatusSelect({
  id,
  status,
}: {
  id: string;
  status: string;
}) {
  const [pending, start] = useTransition();

  return (
    <select
      value={status}
      disabled={pending}
      onChange={(e) => {
        const newStatus = e.target.value;
        start(async () => {
          const res = await updateOrderStatus(id, newStatus);
          if (res?.error) {
            toast.error(res.error);
          } else {
            toast.success("Status yangilandi");
          }
        });
      }}
      className={cn(
        "rounded-lg border px-2.5 py-1.5 text-sm font-medium outline-none transition-colors disabled:opacity-60",
        STATUS_COLORS[status] ?? "border-input bg-background"
      )}
      aria-label="Buyurtma statusi"
    >
      {ORDER_STATUSES.map((s) => (
        <option key={s} value={s} className="bg-background text-foreground">
          {STATUS_LABELS[s] ?? s}
        </option>
      ))}
    </select>
  );
}
