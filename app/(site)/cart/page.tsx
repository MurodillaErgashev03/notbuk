"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { PageBreadcrumb } from "@/components/page-breadcrumb";
import { createOrder } from "@/app/(site)/actions/orders";

export default function CartPage() {
  const { t } = useLanguage();
  const {
    cartItems,
    cartCount,
    cartTotal,
    deliveryFee,
    grandTotal,
    updateQty,
    removeFromCart,
    clearCart,
  } = useCart();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");
  const [done, setDone] = useState(false);
  const [pending, start] = useTransition();

  const handleCheckout = () => {
    if (!name.trim() || !phone.trim()) {
      toast.error("Ism va telefon raqamini kiriting");
      return;
    }
    const items = cartItems.map(({ product, qty }) => ({
      productId: product.id,
      productName: product.name,
      price: product.price,
      qty,
    }));
    start(async () => {
      const res = await createOrder({
        customerName: name.trim(),
        phone: phone.trim(),
        address: address.trim() || undefined,
        note: note.trim() || undefined,
        items,
      });
      if (res?.error) {
        toast.error(res.error);
        return;
      }
      toast.success("Buyurtmangiz qabul qilindi!");
      clearCart();
      setDone(true);
    });
  };

  if (done) {
    return (
      <div className="container py-6">
        <PageBreadcrumb items={[{ label: t("cart.title") }]} />
        <div className="grid place-items-center rounded-2xl border border-dashed py-24 text-center">
          <span className="grid h-20 w-20 place-items-center rounded-full bg-emerald-50">
            <CheckCircle2 className="h-10 w-10 text-emerald-600" />
          </span>
          <h1 className="mt-5 text-xl font-bold">Buyurtmangiz qabul qilindi!</h1>
          <p className="mt-1 max-w-sm text-sm text-muted-foreground">
            Tez orada operatorlarimiz siz bilan bog'lanishadi.
          </p>
          <Button asChild className="mt-6" size="lg">
            <Link href="/category/top-noutbuklar">
              {t("cart.empty.cta")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="container py-6">
        <PageBreadcrumb items={[{ label: t("cart.title") }]} />
        <div className="grid place-items-center rounded-2xl border border-dashed py-24 text-center">
          <span className="grid h-20 w-20 place-items-center rounded-full bg-muted">
            <ShoppingBag className="h-10 w-10 text-muted-foreground" />
          </span>
          <h1 className="mt-5 text-xl font-bold">{t("cart.empty.title")}</h1>
          <p className="mt-1 max-w-sm text-sm text-muted-foreground">
            {t("cart.empty.text")}
          </p>
          <Button asChild className="mt-6" size="lg">
            <Link href="/category/top-noutbuklar">
              {t("cart.empty.cta")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-6">
      <PageBreadcrumb items={[{ label: t("cart.title") }]} />

      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-extrabold">
          {t("cart.title")}{" "}
          <span className="text-base font-medium text-muted-foreground">
            ({cartCount} {t("cart.itemsCount")})
          </span>
        </h1>
        <Button
          variant="ghost"
          size="sm"
          className="text-muted-foreground"
          onClick={() => {
            clearCart();
            toast(t("toast.cleared"));
          }}
        >
          <Trash2 className="h-4 w-4" />
          {t("cart.clear")}
        </Button>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        {/* Items */}
        <div className="space-y-4">
          {cartItems.map(({ product, qty }) => (
            <div
              key={product.id}
              className="flex gap-4 rounded-xl border bg-card p-4"
            >
              <Link
                href={`/product/${product.id}`}
                className="relative h-24 w-28 shrink-0 overflow-hidden rounded-lg bg-muted"
              >
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  sizes="112px"
                  className="object-cover"
                />
              </Link>

              <div className="flex flex-1 flex-col">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <Link
                      href={`/product/${product.id}`}
                      className="font-semibold leading-tight hover:text-primary"
                    >
                      {product.name}
                    </Link>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {product.specs.ram} • {product.specs.storage} •{" "}
                      {product.specs.display.split(" ")[0]}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      removeFromCart(product.id);
                      toast(t("toast.removed"), { description: product.name });
                    }}
                    className="text-muted-foreground transition-colors hover:text-destructive"
                    aria-label={t("cart.remove")}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                <div className="mt-auto flex items-end justify-between pt-3">
                  <div className="flex items-center rounded-lg border">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateQty(product.id, qty - 1)}
                      aria-label="-"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </Button>
                    <span className="w-8 text-center text-sm font-semibold">
                      {qty}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateQty(product.id, qty + 1)}
                      aria-label="+"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{formatPrice(product.price * qty)}</p>
                    {qty > 1 && (
                      <p className="text-xs text-muted-foreground">
                        {formatPrice(product.price)} × {qty}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <aside className="lg:sticky lg:top-20 lg:h-fit">
          <div className="space-y-4 rounded-2xl border bg-card p-6">
            <h2 className="text-lg font-bold">{t("cart.summary")}</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  {t("cart.subtotal")}
                </span>
                <span className="font-medium">{formatPrice(cartTotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  {t("cart.delivery")}
                </span>
                <span className="font-medium">
                  {deliveryFee === 0 ? (
                    <span className="text-emerald-600">
                      {t("cart.deliveryFree")}
                    </span>
                  ) : (
                    formatPrice(deliveryFee)
                  )}
                </span>
              </div>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <span className="font-semibold">{t("cart.total")}</span>
              <span className="text-xl font-extrabold">
                {formatPrice(grandTotal)}
              </span>
            </div>
            <Separator />
            <div className="space-y-3">
              <div className="space-y-1.5">
                <Label htmlFor="checkout-name">Ism</Label>
                <Input
                  id="checkout-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ismingiz"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="checkout-phone">Telefon</Label>
                <Input
                  id="checkout-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+998 90 123 45 67"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="checkout-address">Manzil</Label>
                <Textarea
                  id="checkout-address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Yetkazib berish manzili (ixtiyoriy)"
                  rows={2}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="checkout-note">Izoh</Label>
                <Textarea
                  id="checkout-note"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Qo'shimcha izoh (ixtiyoriy)"
                  rows={2}
                />
              </div>
            </div>
            <Button
              size="lg"
              className="w-full"
              disabled={pending || cartItems.length === 0}
              onClick={handleCheckout}
            >
              {t("cart.checkout")}
              <ArrowRight className="h-4 w-4" />
            </Button>
            <p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
              {t("usp.warranty.text")}
            </p>

            <Separator />
            <div>
              <p className="mb-2 text-xs font-medium text-muted-foreground">
                {t("cart.paymentMethods")}
              </p>
              <div className="flex flex-wrap gap-2">
                {["Payme", "Click", "Uzcard", "Humo"].map((p) => (
                  <span
                    key={p}
                    className="rounded-md border bg-background px-2.5 py-1 text-xs font-semibold"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
