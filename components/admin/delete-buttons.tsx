"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { deleteProduct } from "@/app/admin/actions/products";
import { deleteCategory } from "@/app/admin/actions/categories";
import { deleteOrder } from "@/app/admin/actions/orders";
import { Button } from "@/components/ui/button";

function ConfirmDelete({
  onConfirm,
  message,
}: {
  onConfirm: () => Promise<void>;
  message: string;
}) {
  const [pending, start] = useTransition();

  return (
    <Button
      variant="ghost"
      size="icon"
      disabled={pending}
      onClick={() => {
        if (!window.confirm(message)) return;
        start(async () => {
          try {
            await onConfirm();
            toast.success("O'chirildi");
          } catch {
            toast.error("O'chirishda xatolik");
          }
        });
      }}
      aria-label="O'chirish"
      className="text-destructive hover:bg-destructive/10 hover:text-destructive"
    >
      <Trash2 className="h-4 w-4" />
    </Button>
  );
}

export function DeleteProductButton({
  id,
  name,
}: {
  id: string;
  name: string;
}) {
  return (
    <ConfirmDelete
      message={`"${name}" mahsulotini o'chirasizmi?`}
      onConfirm={() => deleteProduct(id)}
    />
  );
}

export function DeleteCategoryButton({
  id,
  name,
}: {
  id: string;
  name: string;
}) {
  return (
    <ConfirmDelete
      message={`"${name}" kategoriyasini o'chirasizmi?`}
      onConfirm={() => deleteCategory(id)}
    />
  );
}

export function DeleteOrderButton({ id }: { id: string }) {
  return (
    <ConfirmDelete
      message="Bu buyurtmani o'chirasizmi?"
      onConfirm={() => deleteOrder(id)}
    />
  );
}
