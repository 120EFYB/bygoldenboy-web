import React from "react";
import { getProducts } from "@/lib/products";
import { StylingTool } from "@/components/StylingTool";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Styling Edit | By Goldenboy",
  description: "Crea tu outfit ideal combinando piezas exclusivas de nuestra curaduría. Una experiencia de estilismo digital de lujo.",
};

/**
 * Styling Page (Server Side)
 * Fetches products and passes them to the StylingTool
 */
export default async function StylingPage() {
  const products = await getProducts();
  
  return (
    <main className="min-h-screen bg-white">
      <StylingTool products={products} />
    </main>
  );
}
