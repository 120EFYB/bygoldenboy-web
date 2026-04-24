import React from "react";
import { getProducts } from "@/lib/products";
import ShopView from "@/components/ShopView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop | By Goldenboy",
  description: "Explora nuestra curaduría completa de lujo: prendas y accesorios importados de las mejores boutiques del mundo.",
};

/**
 * Shop Page (Server Side)
 * Dynamic catalog connected to Google Sheets
 */
export default async function ShopPage() {
  // SSR fetch to ensure inventory is fresh on each load or revalidation
  const products = await getProducts();
  
  return (
    <main className="pt-40 pb-40 min-h-screen bg-brand-off-white">
       <ShopView initialProducts={products} />
    </main>
  );
}
