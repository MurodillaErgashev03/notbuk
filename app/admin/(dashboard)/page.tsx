import Link from "next/link";
import { Package, FolderTree, ShoppingBag, Bell } from "lucide-react";
import { adminStats, adminListOrders } from "@/lib/db/admin";
import { formatPrice } from "@/lib/utils";

const STATUS_LABELS: Record<string, string> = {
  new: "Yangi",
  confirmed: "Tasdiqlangan",
  shipped: "Yuborilgan",
  done: "Bajarilgan",
  cancelled: "Bekor qilingan",
};

export default async function AdminDashboard() {
  const stats = await adminStats();
  const orders = (await adminListOrders()).slice(0, 5);

  const cards = [
    {
      label: "Mahsulotlar",
      value: stats.products,
      icon: Package,
      href: "/admin/products",
      color: "text-blue-600 bg-blue-100",
    },
    {
      label: "Kategoriyalar",
      value: stats.categories,
      icon: FolderTree,
      href: "/admin/categories",
      color: "text-emerald-600 bg-emerald-100",
    },
    {
      label: "Buyurtmalar",
      value: stats.orders,
      icon: ShoppingBag,
      href: "/admin/orders",
      color: "text-violet-600 bg-violet-100",
    },
    {
      label: "Yangi buyurtmalar",
      value: stats.newOrders,
      icon: Bell,
      href: "/admin/orders",
      color: "text-amber-600 bg-amber-100",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Boshqaruv paneli</h1>
        <p className="text-sm text-muted-foreground">
          Compuz do'koni statistikasi
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <Link
            key={c.label}
            href={c.href}
            className="rounded-2xl border bg-card p-5 transition-shadow hover:shadow-md"
          >
            <span
              className={`grid h-11 w-11 place-items-center rounded-xl ${c.color}`}
            >
              <c.icon className="h-5 w-5" />
            </span>
            <p className="mt-4 text-3xl font-bold">{c.value}</p>
            <p className="text-sm text-muted-foreground">{c.label}</p>
          </Link>
        ))}
      </div>

      <div className="rounded-2xl border bg-card">
        <div className="flex items-center justify-between border-b p-5">
          <h2 className="font-semibold">So'nggi buyurtmalar</h2>
          <Link
            href="/admin/orders"
            className="text-sm text-primary hover:underline"
          >
            Barchasi
          </Link>
        </div>
        {orders.length === 0 ? (
          <p className="p-8 text-center text-sm text-muted-foreground">
            Hozircha buyurtmalar yo'q
          </p>
        ) : (
          <div className="divide-y">
            {orders.map((o) => (
              <div
                key={o.id}
                className="flex items-center justify-between gap-4 p-4 text-sm"
              >
                <div className="min-w-0">
                  <p className="truncate font-medium">{o.customerName}</p>
                  <p className="text-muted-foreground">{o.phone}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{formatPrice(o.total)}</p>
                  <p className="text-xs text-muted-foreground">
                    {STATUS_LABELS[o.status] ?? o.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
