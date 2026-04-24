import React from "react";
import { AboutContent } from "@/components/AboutContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nosotros | By Goldenboy",
  description: "Descubre la misión y visión de By Goldenboy, la curaduría de lujo líder en importación directa de boutiques europeas.",
};

/**
 * About Page
 * Full editorial experience
 */
export default function AboutPage() {
  return (
    <main className="min-h-screen bg-brand-off-white">
      <AboutContent />
    </main>
  );
}
