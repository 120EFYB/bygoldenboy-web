"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from "next-intl";
import { Product, CATEGORIES } from "@/types/product";
import { ProductCard } from "./ProductCard";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

interface ShopSectionProps {
  products: Product[];
}

/**
 * ShopSection Component for Home Page
 * Now receives products as props from Server Components
 */
export const ShopSection = ({ products }: ShopSectionProps) => {
  const [activeFilter, setActiveFilter] = useState("all");
  const locale = useLocale();

  // Filter logic: show all (subset for home) or category specific
  const filteredProducts = activeFilter === "all" 
    ? products.slice(0, 12) // Curated selection of 12 for Home
    : products.filter(p => p.category === activeFilter);

  return (
    <section className="py-40 bg-brand-off-white">
      <div className="container mx-auto px-8">
        
        {/* Header & Filter Bar */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-24 gap-12 border-b border-brand-stone/20 pb-12">
          <div>
            <Reveal>
              <span className="label-decorative mb-6 block">Colección Curada</span>
            </Reveal>
            <Reveal delay={0.2}>
              <h2 className="text-4xl md:text-5xl font-display text-brand-black leading-tight">
                Piezas Seleccionadas
              </h2>
            </Reveal>
          </div>

          <div className="flex flex-wrap gap-x-10 gap-y-6">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={cn(
                  "text-[9px] uppercase tracking-[4px] transition-all duration-700 pb-2 border-b font-medium",
                  activeFilter === cat.id 
                    ? "text-brand-gold border-brand-gold" 
                    : "text-brand-black/30 border-transparent hover:text-brand-black"
                )}
              >
                {locale === "es" ? cat.label.es : cat.label.en}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-20"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View All CTA */}
        <div className="mt-32 text-center">
          <Reveal delay={0.3}>
            <div className="flex flex-col items-center">
              <Link 
                href={`/${locale}/shop`}
                className="group relative px-14 py-5 bg-brand-black text-brand-off-white text-[10px] tracking-[6px] uppercase overflow-hidden transition-all duration-700 shadow-2xl"
              >
                <span className="relative z-10">Ver Catálogo Completo</span>
                <div className="absolute inset-0 bg-brand-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-premium" />
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
