import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { Providers } from "@/components/providers";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const inter = Inter({ subsets: ["latin", "cyrillic"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "NoutMarket — O'zbekistondagi noutbuk do'koni",
  description:
    "NoutMarket — O'zbekistonning eng yaxshi noutbuk do'koni. Kafolat bilan, tez yetkazib berish, 0% bo'lib to'lash.",
  keywords: ["noutbuk", "laptop", "MacBook", "ASUS", "Lenovo", "Uzbekistan"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uz" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans`}>
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
