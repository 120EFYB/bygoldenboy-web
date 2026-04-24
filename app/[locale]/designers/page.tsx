import React from "react";
import { DesignersContent } from "@/components/DesignersContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Diseñadores | By Goldenboy",
  description: "Explora nuestra curaduría A-Z de las mejores marcas de lujo del mundo. From Saint Laurent to Golden Goose.",
};

/**
 * Designers Directory Page
 * A-Z Brand library
 */
export default function DesignersPage() {
  return (
    <main className="min-h-screen bg-brand-off-white">
      <DesignersContent />
    </main>
  );
}
