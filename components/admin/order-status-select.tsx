"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { updateOrderStatus, ORDER_STATUSES } from "@/app/admin/actions/orders";
import { cn } from "@/lib/utils";

const STATUS_LABELS: Record<string, string> = {
  new: "Yangi",
  confirmed: "Tasdiqlangan",
  shipped: "Yuborilgan",
  done: "Bajarilgan",
  cancelled: "Bekor qilingan",
};

const STATUS_COLORS: Record<string, string> = {
  new: "border-amber-300 bg-amber-50 text-amber-700",
  confirmed: "border-blue-300 bg-blue-50 text-blue-700",
  shipped: "border-indigo-300 bg-indigo-50 text-indigo-700",
  done: "border-emerald-300 bg-emerald-50 text-emerald-700",
  cancelled: "border-red-300 bg-red-50 text-red-700",
};

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
