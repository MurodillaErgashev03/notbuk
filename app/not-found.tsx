import Link from "next/link";
import { Laptop } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container grid place-items-center py-32 text-center">
      <span className="grid h-20 w-20 place-items-center rounded-2xl bg-primary/10 text-primary">
        <Laptop className="h-10 w-10" />
      </span>
      <h1 className="mt-6 text-5xl font-extrabold">404</h1>
      <p className="mt-2 max-w-sm text-muted-foreground">
        Sahifa topilmadi / Страница не найдена / Page not found
      </p>
      <Button asChild className="mt-6">
        <Link href="/">NoutMarket</Link>
      </Button>
    </div>
  );
}
