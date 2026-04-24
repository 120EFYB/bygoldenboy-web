import { getProducts } from "@/lib/products";
import { Hero } from "@/components/Hero";
import { BrandMarquee } from "@/components/BrandMarquee";
import { Statement } from "@/components/Statement";
import { ShopSection } from "@/components/ShopSection";
import { Guarantees } from "@/components/Guarantees";
import { Newsletter } from "@/components/Newsletter";

/**
 * Homepage (Localized)
 * Editorial experience for By Goldenboy
 */
export default async function Home() {
  // Fetch initial data from Google Sheets (ISR 3600s)
  const products = await getProducts();

  return (
    <div className="bg-brand-off-white overflow-hidden">
      <Hero />
      <BrandMarquee />
      <Statement />
      
      {/* Featured collection from the catalog */}
      <ShopSection products={products} />
      
      <Guarantees />
      <Newsletter />
    </div>
  );
}
