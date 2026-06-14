import Link from "next/link";
import Image from "next/image";
import { Plus, Pencil } from "lucide-react";
import { adminListProducts } from "@/lib/db/admin";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { DeleteProductButton } from "@/components/admin/delete-buttons";

export default async function ProductsPage() {
  const products = await adminListProducts();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Mahsulotlar</h1>
          <p className="text-sm text-muted-foreground">
            {products.length} ta mahsulot
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/products/new">
            <Plus className="h-4 w-4" />
            Yangi mahsulot
          </Link>
        </Button>
      </div>

      <div className="overflow-hidden rounded-2xl border bg-card">
        {products.length === 0 ? (
          <p className="p-10 text-center text-sm text-muted-foreground">
            Hozircha mahsulot yo'q. «Yangi mahsulot» tugmasi orqali qo'shing.
          </p>
        ) : (
          <div className="divide-y">
            {products.map((p) => (
              <div
                key={p.id}
                className="flex items-center gap-4 p-3 sm:p-4"
              >
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg border bg-muted">
                  {p.images[0] && (
                    <Image
                      src={p.images[0]}
                      alt={p.name}
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium">{p.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {p.brand} · {formatPrice(p.price)}
                  </p>
                </div>
                <div className="hidden items-center gap-2 sm:flex">
                  {!p.inStock && (
                    <span className="rounded bg-destructive/10 px-2 py-0.5 text-xs font-medium text-destructive">
                      Tugagan
                    </span>
                  )}
                  {p.badge && (
                    <span className="rounded bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                      {p.badge}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" asChild>
                    <Link
                      href={`/admin/products/${p.id}`}
                      aria-label="Tahrirlash"
                    >
                      <Pencil className="h-4 w-4" />
                    </Link>
                  </Button>
                  <DeleteProductButton id={p.id} name={p.name} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
