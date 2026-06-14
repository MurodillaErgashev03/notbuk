"use client";

import { useFormState, useFormStatus } from "react-dom";
import { useSearchParams } from "next/navigation";
import { Laptop } from "lucide-react";
import { loginAction, type LoginState } from "@/app/admin/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? "Kirilmoqda..." : "Kirish"}
    </Button>
  );
}

export function LoginForm() {
  const params = useSearchParams();
  const from = params.get("from") ?? "/admin";
  const [state, formAction] = useFormState<LoginState, FormData>(loginAction, {});

  return (
    <div className="w-full max-w-sm rounded-2xl border bg-card p-8 shadow-sm">
      <div className="mb-6 flex flex-col items-center gap-2 text-center">
        <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary text-primary-foreground">
          <Laptop className="h-6 w-6" />
        </span>
        <h1 className="text-xl font-bold">Compuz Admin</h1>
        <p className="text-sm text-muted-foreground">
          Boshqaruv paneliga kirish
        </p>
      </div>

      <form action={formAction} className="space-y-4">
        <input type="hidden" name="from" value={from} />
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="username"
            placeholder="admin@compuz.uz"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Parol</Label>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
          />
        </div>

        {state.error && (
          <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {state.error}
          </p>
        )}

        <SubmitButton />
      </form>
    </div>
  );
}
