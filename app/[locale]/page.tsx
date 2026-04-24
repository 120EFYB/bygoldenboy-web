import { getProducts } from "@/lib/products";
import { Hero } from "@/components/Hero";
import { BrandMarquee } from "@/components/BrandMarquee";
import { Statement } from "@/components/Statement";
import { ShopSection } from "@/components/ShopSection";
import { Guarantees } from "@/components/Guarantees";
import { Newsletter } from "@/components/Newsletter";

export default async function Home() {
  const products = await getProducts();

  return (
    <div className="bg-brand-off-white">
      <Hero />
      <BrandMarquee />
      <Statement />
      <ShopSection products={products} />
      <Guarantees />
      <Newsletter />
    </div>
  );
}
