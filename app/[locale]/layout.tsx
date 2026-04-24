import type { Metadata } from "next";
import { Cormorant_Garamond, Syne, DM_Sans } from "next/font/google";
import "../globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { locales, Locale } from "@/i18n/config";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { WishlistDrawer } from "@/components/WishlistDrawer";
import { QuickViewModal } from "@/components/QuickViewModal";
import { SizeGuideModal } from "@/components/SizeGuideModal";
import { CustomCursor } from "@/components/CustomCursor";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300"],
  variable: "--font-cormorant",
});

const syne = Syne({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-syne",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "By Goldenboy | Concept Store de Lujo",
  description: "Curaduría exclusiva de moda y accesorios importados directamente de boutiques europeas.",
};

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as Locale)) notFound();

  // Providing all messages to the client-side
  const messages = await getMessages();

  return (
    <html lang={locale} className="scroll-smooth">
      <body className={`${cormorant.variable} ${syne.variable} ${dmSans.variable} font-body antialiased bg-brand-off-white text-brand-graphite selection:bg-brand-gold selection:text-brand-black`}>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <Navbar />
          <CartDrawer />
          <WishlistDrawer />
          <QuickViewModal />
          <SizeGuideModal />
          <CustomCursor />
          
          <main className="min-h-screen">
            {children}
          </main>
          
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
