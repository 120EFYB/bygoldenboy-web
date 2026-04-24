import React from "react";
import { getProducts } from "@/lib/products";
import ShopView from "@/components/ShopView";

/**
 * Shop Page (Server Side)
 * Fetches products from Google Sheets and passes them to the Client View
 */
export default async function ShopPage() {
  const products = await getProducts();
  
  return (
    <main className="pt-40 pb-40 min-h-screen bg-brand-off-white">
       <ShopView initialProducts={products} />
    </main>
  );
}
