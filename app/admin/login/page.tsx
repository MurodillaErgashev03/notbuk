import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { LoginForm } from "./login-form";

export const metadata = {
  title: "Admin — Kirish",
  robots: { index: false, follow: false },
};

export default async function LoginPage() {
  // If already logged in, go straight to the dashboard.
  const user = await getCurrentUser();
  if (user) redirect("/admin");

  return (
    <div className="grid min-h-screen place-items-center bg-muted/40 p-4">
      <Suspense>
        <LoginForm />
      </Suspense>
    </div>
  );
}
