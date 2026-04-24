import React from "react";
import { CartPageContent } from "@/components/CartPageContent";

/**
 * Cart Page
 * Dedicated full summary page for the shopping bag
 */
export default function CartPage() {
  return (
    <main className="pt-40 pb-40 min-h-screen bg-brand-off-white">
      <div className="container mx-auto px-8">
        <CartPageContent />
      </div>
    </main>
  );
}
