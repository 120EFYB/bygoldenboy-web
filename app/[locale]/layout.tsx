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
import { PageTransition } from "@/components/PageTransition";

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
  weight: ["300", "400", "500"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "By Goldenboy | Luxury Imported Fashion",
  description: "By Goldenboy imports new designer pieces directly from Europe and the US.",
};

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!locales.includes(locale as Locale)) notFound();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${cormorant.variable} ${syne.variable} ${dmSans.variable} font-body antialiased bg-brand-off-white text-brand-graphite`}>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <Navbar />
          <CartDrawer />
          <WishlistDrawer />
          <QuickViewModal />
          <SizeGuideModal />
          <CustomCursor />
          <main className="min-h-screen">
            <PageTransition>
              {children}
            </PageTransition>
          </main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
