import React from "react";
import { ContactContent } from "@/components/ContactContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacto | By Goldenboy",
  description: "Ponte en contacto con By Goldenboy. Solicita acceso a nuestro grupo exclusivo de WhatsApp o haz un pedido especial.",
};

/**
 * Contact Page
 * High-end communication portal
 */
export default function ContactPage() {
  return (
    <main className="min-h-screen bg-brand-off-white">
      <ContactContent />
    </main>
  );
}
