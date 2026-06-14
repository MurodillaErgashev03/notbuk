import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getCategories } from "@/lib/db/queries";
import { adminGetProduct } from "@/lib/db/admin";
import { updateProduct } from "@/app/admin/actions/products";
import { ProductForm } from "@/components/admin/product-form";

export default async function EditProductPage({
  params,
}: {
  params: { id: string };
}) {
  const [product, categories] = await Promise.all([
    adminGetProduct(params.id),
    getCategories(),
  ]);
  if (!product) notFound();

  const action = updateProduct.bind(null, product.id);

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Link
        href="/admin/products"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Mahsulotlar
      </Link>
      <h1 className="text-2xl font-bold">Mahsulotni tahrirlash</h1>
      <ProductForm
        action={action}
        product={product}
        categories={categories}
      />
    </div>
  );
}
