"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from "next-intl";
import { useUIStore } from "@/lib/ui-store";
import { AddToCartSection } from "./AddToCartSection";
import { formatPrice } from "@/lib/utils";

/**
 * QuickViewModal Component
 * Elegant modal with blur backdrop and staggered animations.
 */
export const QuickViewModal = () => {
  const isOpen = useUIStore((state) => state.quickViewOpen);
  const product = useUIStore((state) => state.quickViewProduct);
  const onClose = useUIStore((state) => state.closeQuickView);
  const locale = useLocale();

  if (!product) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-brand-black/60 backdrop-blur-md z-[120] flex items-center justify-center p-6 md:p-12"
          >
            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-brand-off-white w-full max-w-5xl h-fit max-h-[90vh] overflow-hidden shadow-2xl relative flex flex-col md:flex-row pb-12"
            >
              {/* Close Button */}
              <button 
                onClick={onClose}
                className="absolute top-6 right-6 z-10 p-2 hover:rotate-90 transition-transform duration-500 hover:text-brand-gold"
              >
                <CloseIcon className="w-8 h-8" />
              </button>

              {/* LEFT: Image Selection */}
              <div className="w-full md:w-1/2 bg-white flex items-center justify-center p-12 lg:p-20 relative min-h-[400px]">
                 <motion.div 
                   initial={{ opacity: 0, x: -20 }}
                   animate={{ opacity: 1, x: 0 }}
                   transition={{ delay: 0.2 }}
                   className="relative w-full h-full aspect-[3/4]"
                 >
                   <Image 
                     src={product.image} 
                     alt={product.name} 
                     fill 
                     className="object-contain"
                   />
                 </motion.div>
                 
                 {/* Detail overlay */}
                 <div className="absolute bottom-10 left-10 label-decorative text-[8px] tracking-[4px] opacity-30 uppercase font-bold">
                    PREVIEW MODE / {product.origin}
                 </div>
              </div>

              {/* RIGHT: Product Info */}
              <div className="w-full md:w-1/2 p-10 md:p-16 overflow-y-auto">
                 <motion.div
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: 0.3 }}
                   className="space-y-4 mb-10"
                 >
                    <span className="label-decorative text-brand-gold text-[10px] tracking-[6px] uppercase font-bold">
                       {product.brand}
                    </span>
                    <h2 className="text-3xl lg:text-4xl font-display text-brand-black leading-tight tracking-tight">
                       {product.name}
                    </h2>
                    <p className="text-2xl font-display italic">
                       {formatPrice(product.price)}
                    </p>
                 </motion.div>

                 <motion.div
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   transition={{ delay: 0.4 }}
                 >
                    <AddToCartSection product={product} />
                    
                    <div className="mt-12 pt-8 border-t border-brand-stone/20">
                       <Link 
                         href={`/${locale}/product/${product.slug}`}
                         onClick={onClose}
                         className="group flex items-center space-x-6 text-[10px] tracking-[5px] uppercase font-bold text-brand-black/50 hover:text-brand-black transition-colors"
                       >
                          <span>Ver Página Completa</span>
                          <div className="w-10 h-[1px] bg-brand-gold transition-all duration-700 group-hover:w-20 group-hover:bg-brand-black" />
                       </Link>
                    </div>
                 </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// Icon
const CloseIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);
