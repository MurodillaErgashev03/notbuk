// Plain constants shared between server actions and client components.
// (Must NOT live in a "use server" file — those may only export async functions.)

export const ORDER_STATUSES = [
  "new",
  "confirmed",
  "shipped",
  "done",
  "cancelled",
] as const;

export type OrderStatus = (typeof ORDER_STATUSES)[number];

export const STATUS_LABELS: Record<string, string> = {
  new: "Yangi",
  confirmed: "Tasdiqlangan",
  shipped: "Yuborilgan",
  done: "Bajarilgan",
  cancelled: "Bekor qilingan",
};

export const STATUS_COLORS: Record<string, string> = {
  new: "border-amber-300 bg-amber-50 text-amber-700",
  confirmed: "border-blue-300 bg-blue-50 text-blue-700",
  shipped: "border-indigo-300 bg-indigo-50 text-indigo-700",
  done: "border-emerald-300 bg-emerald-50 text-emerald-700",
  cancelled: "border-red-300 bg-red-50 text-red-700",
};
