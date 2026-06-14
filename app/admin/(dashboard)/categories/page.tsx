import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { adminListCategories } from "@/lib/db/admin";
import { CategoryIcon } from "@/components/category-icon";
import { Button } from "@/components/ui/button";
import { DeleteCategoryButton } from "@/components/admin/delete-buttons";

export default async function CategoriesPage() {
  const categories = await adminListCategories();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Kategoriyalar</h1>
          <p className="text-sm text-muted-foreground">
            {categories.length} ta kategoriya
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/categories/new">
            <Plus className="h-4 w-4" />
            Yangi kategoriya
          </Link>
        </Button>
      </div>

      <div className="overflow-hidden rounded-2xl border bg-card">
        {categories.length === 0 ? (
          <p className="p-10 text-center text-sm text-muted-foreground">
            Hozircha kategoriya yo'q. «Yangi kategoriya» tugmasi orqali qo'shing.
          </p>
        ) : (
          <div className="divide-y">
            {categories.map((cat) => (
              <div key={cat.id} className="flex items-center gap-4 p-3 sm:p-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg border bg-muted">
                  <CategoryIcon
                    name={cat.icon}
                    className="h-6 w-6 text-muted-foreground"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium">{cat.name.uz}</p>
                  <p className="text-sm text-muted-foreground">{cat.slug}</p>
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" asChild>
                    <Link
                      href={`/admin/categories/${cat.id}`}
                      aria-label="Tahrirlash"
                    >
                      <Pencil className="h-4 w-4" />
                    </Link>
                  </Button>
                  <DeleteCategoryButton id={cat.id} name={cat.name.uz} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
