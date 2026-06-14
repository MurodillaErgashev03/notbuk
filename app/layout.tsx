import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { Toaster } from "@/components/ui/sonner";
import { getSettings } from "@/lib/db/queries";

const inter = Inter({ subsets: ["latin", "cyrillic"], variable: "--font-sans" });

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  const name = settings["site.name"] ?? "Compuz";
  return {
    title: `${name} — O'zbekistondagi noutbuk do'koni`,
    description:
      settings["site.tagline.uz"] ??
      `${name} — O'zbekistonning eng yaxshi noutbuk do'koni.`,
    keywords: ["noutbuk", "laptop", "MacBook", "ASUS", "Lenovo", "Uzbekistan"],
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uz" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
