import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getCategories } from "@/lib/db/queries";
import { createProduct } from "@/app/admin/actions/products";
import { ProductForm } from "@/components/admin/product-form";

export default async function NewProductPage() {
  const categories = await getCategories();

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Link
        href="/admin/products"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Mahsulotlar
      </Link>
      <h1 className="text-2xl font-bold">Yangi mahsulot</h1>
      <ProductForm action={createProduct} categories={categories} />
    </div>
  );
}
