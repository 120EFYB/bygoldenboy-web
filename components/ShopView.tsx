"use client";

import React, { useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useLocale } from "next-intl";
import Link from "next/link";
import { Product, CATEGORIES } from "@/types/product";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { ShopSkeleton } from "@/components/SkeletonLoader";
import { cn } from "@/lib/utils";

interface ShopViewProps {
  initialProducts: Product[];
}

function ShopContent({ initialProducts }: ShopViewProps) {
  const searchParams = useSearchParams();
  const locale = useLocale();
  
  const catParam = searchParams.get("cat") || "all";
  const designerParam = searchParams.get("designer") || "all";

  // Filtering logic based on dynamic products
  const filteredProducts = useMemo(() => {
    let result = [...initialProducts];
    
    if (catParam !== "all") {
      result = result.filter(p => 
        p.category === catParam || 
        p.gender === catParam || 
        (catParam === "new" && p.isNew)
      );
    }
    
    if (designerParam !== "all") {
      result = result.filter(p => p.brand.toLowerCase() === designerParam.toLowerCase());
    }
    
    return result;
  }, [catParam, designerParam, initialProducts]);

  // Dynamic Title logic
  const pageTitle = useMemo(() => {
    if (designerParam !== "all") return designerParam;
    if (catParam !== "all") {
      const cat = CATEGORIES.find(c => c.id === catParam);
      return cat ? (locale === "es" ? cat.label.es : cat.label.en) : catParam;
    }
    return locale === "es" ? "Catálogo Completo" : "Full Catalog";
  }, [catParam, designerParam, locale]);

  return (
    <div className="container mx-auto px-8">
      {/* Editorial Header */}
      <div className="mb-24 text-center">
        <Reveal>
          <div className="flex flex-col items-center">
            <span className="label-decorative mb-6 text-[9px] tracking-[6px] opacity-60">
              By Goldenboy Store
            </span>
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <h1 className="text-5xl md:text-7xl font-display text-brand-black leading-tight uppercase tracking-tight">
            {pageTitle}
          </h1>
        </Reveal>
      </div>

      {/* Filter Navigation Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-16 border-y border-brand-stone/20 py-8 gap-8 overflow-x-auto scrollbar-hide">
        <div className="flex items-center space-x-10 whitespace-nowrap">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/${locale}/shop?cat=${cat.id}`}
              className={cn(
                "text-[10px] uppercase tracking-[4px] transition-all duration-700 pb-1 border-b font-medium",
                catParam === cat.id 
                  ? "text-brand-gold border-brand-gold" 
                  : "text-brand-black/30 border-transparent hover:text-brand-black"
              )}
            >
              {locale === "es" ? cat.label.es : cat.label.en}
            </Link>
          ))}
          <Link
            href={`/${locale}/shop?cat=new`}
            className={cn(
              "text-[10px] uppercase tracking-[4px] transition-all duration-700 pb-1 border-b font-medium",
              catParam === "new" ? "text-brand-gold border-brand-gold" : "text-brand-black/30 border-transparent hover:text-brand-black"
            )}
          >
            New Arrivals
          </Link>
        </div>
        
        <div className="text-[10px] uppercase tracking-[4px] text-brand-black/40 font-bold whitespace-nowrap">
          {filteredProducts.length} {locale === "es" ? "Artículos" : "Items"}
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-24">
          {filteredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      ) : (
        <div className="py-40 text-center flex flex-col items-center">
          <p className="font-accent italic text-brand-graphite/40 tracking-[4px] uppercase mb-10">
            {locale === "es" ? "No se encontraron piezas en esta selección" : "No pieces found in this selection"}
          </p>
          <Link 
            href={`/${locale}/shop`} 
            className="px-12 py-5 bg-brand-black text-brand-off-white text-[10px] tracking-[5px] uppercase hover:bg-brand-gold transition-all duration-700"
          >
            {locale === "es" ? "Ver todo el catálogo" : "View Full Catalog"}
          </Link>
        </div>
      )}
    </div>
  );
}

export default function ShopView({ initialProducts }: ShopViewProps) {
  return (
    <Suspense fallback={<div className="container mx-auto px-8"><ShopSkeleton count={8} /></div>}>
      <ShopContent initialProducts={initialProducts} />
    </Suspense>
  );
}
