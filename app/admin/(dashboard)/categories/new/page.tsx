import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createCategory } from "@/app/admin/actions/categories";
import { CategoryForm } from "@/components/admin/category-form";

export default function NewCategoryPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Link
        href="/admin/categories"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Kategoriyalar
      </Link>
      <h1 className="text-2xl font-bold">Yangi kategoriya</h1>
      <CategoryForm action={createCategory} />
    </div>
  );
}
