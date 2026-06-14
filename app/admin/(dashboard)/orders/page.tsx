import { Phone } from "lucide-react";
import { adminListOrders } from "@/lib/db/admin";
import { formatPrice } from "@/lib/utils";
import { DeleteOrderButton } from "@/components/admin/delete-buttons";
import { OrderStatusSelect } from "@/components/admin/order-status-select";

export default async function OrdersPage() {
  const orders = await adminListOrders();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Buyurtmalar</h1>
        <p className="text-sm text-muted-foreground">
          {orders.length} ta buyurtma
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="rounded-2xl border bg-card p-10 text-center text-sm text-muted-foreground">
          Hozircha buyurtma yo'q.
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((o) => (
            <div key={o.id} className="rounded-2xl border bg-card p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-semibold">{o.customerName}</p>
                  <a
                    href={`tel:${o.phone}`}
                    className="mt-0.5 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary"
                  >
                    <Phone className="h-3.5 w-3.5" />
                    {o.phone}
                  </a>
                  {o.address && (
                    <p className="mt-1 text-sm text-muted-foreground">
                      Manzil: {o.address}
                    </p>
                  )}
                  {o.note && (
                    <p className="mt-1 text-sm text-muted-foreground">
                      Izoh: {o.note}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <OrderStatusSelect id={o.id} status={o.status} />
                  <DeleteOrderButton id={o.id} />
                </div>
              </div>

              <div className="mt-3 space-y-1 border-t pt-3 text-sm">
                {o.items.map((it) => (
                  <div key={it.id} className="flex justify-between gap-3">
                    <span className="min-w-0 truncate">
                      {it.productName}{" "}
                      <span className="text-muted-foreground">× {it.qty}</span>
                    </span>
                    <span className="shrink-0 text-muted-foreground">
                      {formatPrice(it.price)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t pt-3">
                <span className="text-xs text-muted-foreground">
                  {new Date(o.createdAt).toLocaleString("uz-UZ")}
                </span>
                <span className="text-base font-bold">
                  {formatPrice(o.total)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
