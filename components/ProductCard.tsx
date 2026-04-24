"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import { Product } from "@/types/product";
import { formatPrice } from "@/lib/utils";
import { useWishlistStore } from "@/lib/wishlist-store";
import { useUIStore } from "@/lib/ui-store";
import { triggerHaptic } from "@/lib/haptics";

interface ProductCardProps {
  product: Product;
  index: number;
}

/**
 * ProductCard Component
 * As per CLAUDE.md: white background (#FFFFFF), image contain 72%, scale 1.06 on hover, gold border
 */
export const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const locale = useLocale();
  const { addItem, removeItem, isInWishlist } = useWishlistStore();
  const openQuickView = useUIStore((state) => state.openQuickView);
  
  const isWishlisted = isInWishlist(product.id);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isWishlisted) {
      removeItem(product.id);
      triggerHaptic("medium");
    } else {
      addItem(product);
      triggerHaptic("success");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Link href={`/${locale}/product/${product.slug}`} className="group block h-full">
        <div className="relative aspect-[3/4] bg-white border border-brand-stone/30 overflow-hidden group mb-6 shadow-sm transition-all duration-700 hover:shadow-xl">
          
          {/* New Label */}
          {product.isNew && (
            <div className="absolute top-6 left-6 z-10">
              <span className="label-decorative text-[7px] bg-brand-gold text-white px-2.5 py-1.5 font-bold tracking-[3px]">
                isNew
              </span>
            </div>
          )}

          {/* Product Image (72% size, contain) */}
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-contain p-10 transition-transform duration-[2s] ease-premium group-hover:scale-110"
          />
          
          {/* BRAND OVERLAY (Top Left) */}
          <div className="absolute top-4 left-4">
             <span className="text-[7px] tracking-[4px] uppercase font-bold text-brand-black opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-white/80 backdrop-blur-md px-3 py-1.5 border border-brand-stone/20">
               {product.origin}
             </span>
          </div>

          {/* WISHLIST BUTTON (Top Right) */}
          <button 
            onClick={toggleWishlist}
            className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-md rounded-full border border-brand-stone/20 shadow-sm transition-all duration-500 hover:scale-110 active:scale-90"
          >
            <HeartIcon 
              className={`w-4 h-4 transition-colors ${isWishlisted ? 'fill-brand-gold text-brand-gold' : 'text-brand-black/40 hover:text-brand-gold'}`} 
            />
          </button>

          {/* QUICK VIEW BUTTON (Bottom Center) */}
          <div className="absolute inset-x-0 bottom-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-premium">
             <button 
               onClick={(e) => {
                 e.preventDefault();
                 e.stopPropagation();
                 triggerHaptic("light");
                 openQuickView(product);
               }}
               className="w-full bg-brand-black/90 backdrop-blur-md text-brand-off-white text-[8px] tracking-[4px] py-4 uppercase font-bold hover:bg-brand-gold transition-colors shadow-2xl"
             >
               Vista Rápida
             </button>
          </div>

          {/* Decorative Corner */}
          <div className="absolute bottom-0 right-0 w-16 h-16 border-b-[0.5px] border-r-[0.5px] border-brand-gold/0 group-hover:border-brand-gold/40 transition-all duration-1000 m-4" />
        </div>

        {/* Product Details */}
        <div className="mt-8 text-center space-y-2.5 px-2">
          {/* STOCK LABEL (Scarcity) */}
          {product.stock <= 5 && product.stock > 0 && (
            <div className="flex items-center justify-center space-x-2 animate-pulse mb-1">
               <div className={`w-1 h-1 rounded-full ${product.stock <= 2 ? 'bg-brand-gold' : 'bg-brand-graphite opacity-30'}`} />
               <span className={`text-[7px] tracking-[3px] uppercase font-bold ${product.stock <= 2 ? 'text-brand-gold' : 'text-brand-graphite/40'}`}>
                  {product.stock <= 2 
                    ? `¡Casi agotado / Solo ${product.stock}!` 
                    : 'Últimas piezas'}
               </span>
            </div>
          )}
          <p className="label-decorative text-[7.5px] tracking-[5px] opacity-50 uppercase">{product.brand}</p>
          <h3 className="text-[11px] font-medium tracking-[3px] uppercase truncate group-hover:text-brand-gold transition-colors duration-500">
            {product.name}
          </h3>
          <p className="text-xs font-body text-brand-graphite/70 font-light tracking-wide">
            {formatPrice(product.price)}
          </p>
        </div>
      </Link>
    </motion.div>
  );
};

// Local Heart Icon for Wishlist
const HeartIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);
