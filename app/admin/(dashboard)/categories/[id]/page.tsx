import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { adminGetCategory } from "@/lib/db/admin";
import { updateCategory } from "@/app/admin/actions/categories";
import { CategoryForm } from "@/components/admin/category-form";

export default async function EditCategoryPage({
  params,
}: {
  params: { id: string };
}) {
  const category = await adminGetCategory(params.id);
  if (!category) notFound();

  const action = updateCategory.bind(null, category.id);

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Link
        href="/admin/categories"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Kategoriyalar
      </Link>
      <h1 className="text-2xl font-bold">Kategoriyani tahrirlash</h1>
      <CategoryForm action={action} category={category} />
    </div>
  );
}
