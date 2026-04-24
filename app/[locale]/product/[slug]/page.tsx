import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProducts } from "@/lib/products";
import { formatPrice } from "@/lib/utils";
import { Reveal } from "@/components/Reveal";
import { ProductCard } from "@/components/ProductCard";
import { AddToCartSection } from "@/components/AddToCartSection";

/**
 * Static paths generated from Google Sheets data
 */
export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({
    slug: product.slug,
  }));
}

/**
 * Dynamic metadata for SEO
 */
export async function generateMetadata({ params }: { params: { locale: string; slug: string } }) {
  const products = await getProducts();
  const product = products.find((p) => p.slug === params.slug);

  if (!product) return {};

  return {
    title: `${product.brand} - ${product.name}`,
    description: params.locale === "es" ? product.description.es : product.description.en,
    openGraph: {
      title: `${product.brand} | ${product.name}`,
      description: params.locale === "es" ? product.description.es : product.description.en,
      images: [product.image],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.brand} | ${product.name}`,
      images: [product.image],
    },
  };
}

/**
 * Product Detail Page (PDP)
 * Dynamic route for each product in the catalog
 */
export default async function ProductPage({ 
  params 
}: { 
  params: { locale: string; slug: string } 
}) {
  const { locale, slug } = params;
  const products = await getProducts();
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  // Find products in same category for the "Related" section
  const relatedProducts = products.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  // JSON-LD Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "image": product.image,
    "description": locale === "es" ? product.description.es : product.description.en,
    "brand": {
      "@type": "Brand",
      "name": product.brand
    },
    "offers": {
      "@type": "Offer",
      "url": `https://bygoldenboy.com/${locale}/product/${product.slug}`,
      "priceCurrency": "MXN",
      "price": product.price,
      "availability": "https://schema.org/InStock"
    }
  };

  return (
    <main className="pt-40 pb-40 min-h-screen bg-brand-off-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container mx-auto px-8">
        
        {/* Breadcrumbs Navigation */}
        <nav className="mb-16 flex flex-wrap items-center gap-x-4 gap-y-2 text-[8px] tracking-[4px] uppercase opacity-40 font-bold">
          <Link href={`/${locale}`} className="hover:text-brand-gold transition-colors">By Goldenboy</Link>
          <span className="opacity-30">/</span>
          <Link href={`/${locale}/shop?cat=${product.category}`} className="hover:text-brand-gold transition-colors">{product.category}</Link>
          <span className="opacity-30">/</span>
          <span className="text-brand-black">{product.brand} {product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          
          {/* LEFT: Premium Image Gallery (Sticky on Desktop) */}
          <div className="lg:sticky lg:top-40 h-fit">
             <Reveal width="100%" duration={1.5}>
               <div className="relative aspect-[3/4] bg-white border border-brand-stone/30 flex items-center justify-center overflow-hidden group shadow-sm transition-all duration-700 hover:shadow-2xl">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain p-12 transition-transform duration-[2.5s] ease-premium group-hover:scale-110"
                    priority
                  />
                  
                  {/* Decorative Brand Corner Accent */}
                  <div className="absolute top-0 right-0 w-24 h-24 border-t-[0.5px] border-r-[0.5px] border-brand-gold/30 m-8 transition-all duration-1000 group-hover:w-32 group-hover:h-32 group-hover:border-brand-gold" />
               </div>
             </Reveal>
             
             {/* Thumbnail hints (Simulated) */}
             <div className="grid grid-cols-4 gap-4 mt-8 opacity-40 hover:opacity-100 transition-opacity duration-500">
                <div className="aspect-square bg-white border border-brand-stone/20" />
                <div className="aspect-square bg-white border border-brand-stone/20" />
                <div className="aspect-square bg-white border border-brand-stone/20" />
                <div className="aspect-square bg-white border border-brand-stone/20" />
             </div>
          </div>

          {/* RIGHT: Sophisticated Product Details */}
          <div className="flex flex-col">
            <div className="mb-16">
              <Reveal>
                <div className="flex flex-col">
                  <p className="label-decorative text-[10px] tracking-[8px] text-brand-gold mb-6 uppercase border-b border-brand-gold/30 pb-3 w-fit font-bold">
                    {product.brand}
                  </p>
                </div>
              </Reveal>
              <Reveal delay={0.2}>
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-display text-brand-black leading-[1] mb-10 tracking-tight">
                  {product.name}
                </h1>
              </Reveal>
              <Reveal delay={0.3}>
                <p className="text-3xl md:text-4xl font-light text-brand-black/90 font-display italic">
                  {formatPrice(product.price)}
                </p>
              </Reveal>
            </div>

            {/* Narrative Description */}
            <div className="mb-20">
              <Reveal delay={0.4}>
                <div className="space-y-6">
                  <h4 className="label-decorative text-[9px] tracking-[5px] opacity-40 uppercase font-bold">Editorial Note</h4>
                  <p className="text-[12px] leading-relaxed font-body text-brand-graphite/80 whitespace-pre-line max-w-lg italic border-l-2 border-brand-gold/30 pl-8">
                     &quot;{locale === "es" ? product.description.es : product.description.en}&quot;
                  </p>
                </div>
              </Reveal>
            </div>

            {/* Interactive Section (Size, Add to Cart, WhatsApp) */}
            <AddToCartSection product={product} />

            {/* Technical Specifications */}
            <div className="mt-24 pt-20 border-t-[0.5px] border-brand-stone/30 space-y-12">
              <div className="grid grid-cols-2 gap-16">
                 <div className="space-y-3">
                  <span className="label-decorative text-[9px] opacity-40 block tracking-[4px] uppercase font-bold">Manufacturing</span>
                  <span className="text-[11px] tracking-[4px] uppercase font-bold text-brand-black leading-none">{product.origin}</span>
                 </div>
                 <div className="space-y-3">
                  <span className="label-decorative text-[9px] opacity-40 block tracking-[4px] uppercase font-bold">Official Color</span>
                  <span className="text-[11px] tracking-[4px] uppercase font-bold text-brand-black leading-none">{product.color}</span>
                 </div>
              </div>

              {/* Information Accordions (Static Mockup) */}
              <div className="space-y-10 pt-10">
                 <div className="flex items-center justify-between border-b border-brand-stone/10 pb-6 group cursor-pointer">
                    <span className="text-[9px] tracking-[5px] uppercase font-bold group-hover:text-brand-gold transition-colors">Composition & Care</span>
                    <span className="text-2xl font-light opacity-30">+</span>
                 </div>
                 <div className="flex items-center justify-between border-b border-brand-stone/10 pb-6 group cursor-pointer text-brand-gold">
                    <span className="text-[9px] tracking-[5px] uppercase font-bold group-hover:text-brand-black transition-colors underline underline-offset-8">Shipping & Returns</span>
                    <span className="text-2xl font-light opacity-100">+</span>
                 </div>
              </div>
            </div>
          </div>
        </div>

        {/* RELATED PRODUCTS GRID */}
        {relatedProducts.length > 0 && (
          <div className="mt-80">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 pb-10 border-b-[0.5px] border-brand-stone/40 gap-10">
              <div>
                <Reveal>
                  <span className="label-decorative mb-6 block opacity-50 tracking-[6px]">Curated Recommendations</span>
                </Reveal>
                <h2 className="text-4xl md:text-5xl font-display text-brand-black tracking-tight leading-none">También te podría gustar</h2>
              </div>
              <Link 
                href={`/${locale}/shop?cat=${product.category}`} 
                className="group flex items-center space-x-6 text-[10px] tracking-[5px] uppercase font-bold mb-2"
              >
                <span>View Full {product.category} Collection</span>
                <div className="w-12 h-[1px] bg-brand-gold transition-all duration-700 group-hover:w-24 group-hover:bg-brand-black" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-24">
              {relatedProducts.map((p, idx) => (
                <ProductCard key={p.id} product={p} index={idx} />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
