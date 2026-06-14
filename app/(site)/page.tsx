import {
  getTopProducts,
  getNewProducts,
  getDiscountedProducts,
  getBudgetProducts,
} from "@/lib/db/queries";
import { HomeContent } from "@/components/home/home-content";

export default async function HomePage() {
  const [top, fresh, sale, budget] = await Promise.all([
    getTopProducts(),
    getNewProducts(),
    getDiscountedProducts(),
    getBudgetProducts(),
  ]);

  return (
    <HomeContent
      top={top.slice(0, 8)}
      fresh={fresh.slice(0, 8)}
      sale={sale.slice(0, 8)}
      budget={budget}
    />
  );
}
