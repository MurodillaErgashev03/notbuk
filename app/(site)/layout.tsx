import { Providers } from "@/components/providers";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import {
  getCategories,
  getBrands,
  getSettings,
  getCategoryCounts,
} from "@/lib/db/queries";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [categories, brands, settings, categoryCounts] = await Promise.all([
    getCategories(),
    getBrands(),
    getSettings(),
    getCategoryCounts(),
  ]);

  return (
    <Providers siteData={{ categories, brands, settings, categoryCounts }}>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </Providers>
  );
}
