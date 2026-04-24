"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from "next-intl";
import { useUIStore } from "@/lib/ui-store";
import { useWishlistStore } from "@/lib/wishlist-store";
import { formatPrice } from "@/lib/utils";

/**
 * WishlistDrawer Component
 * Slides from the right, showing saved designer pieces.
 */
export const WishlistDrawer = () => {
  const isOpen = useUIStore((state) => state.wishlistOpen);
  const onClose = useUIStore((state) => state.closeWishlist);
  const openCart = useUIStore((state) => state.openCart);
  
  const { items, removeItem, getItemCount } = useWishlistStore();
  const locale = useLocale();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

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
            className="fixed inset-0 bg-brand-black/40 backdrop-blur-sm z-[100]"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-[420px] bg-brand-off-white z-[110] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-8 flex justify-between items-center border-b border-brand-stone/30">
              <div className="flex items-baseline space-x-4">
                <h2 className="text-xl font-display uppercase tracking-widest text-brand-black">Wishlist</h2>
                <span className="text-[9px] tracking-[4px] opacity-40 uppercase">({getItemCount()})</span>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:text-brand-gold transition-colors"
                aria-label="Close"
              >
                <CloseIcon className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-8 py-10">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-8">
                  <HeartIcon strokeWidth={0.5} className="w-20 h-20 opacity-10" />
                  <div>
                    <h3 className="text-xl font-display uppercase mb-4 tracking-tight">Tu lista está vacía</h3>
                    <p className="text-[10px] text-brand-graphite opacity-50 uppercase tracking-[4px] leading-relaxed">
                      Guarda las piezas que amas para verlas después.
                    </p>
                  </div>
                  <button 
                    onClick={onClose}
                    className="px-12 py-5 bg-brand-black text-white text-[9px] tracking-[5px] uppercase hover:bg-brand-gold transition-all duration-700"
                  >
                    Explorar Colección
                  </button>
                </div>
              ) : (
                <div className="space-y-12">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-6 group">
                      <div className="relative w-24 h-32 bg-white border border-brand-stone/20 overflow-hidden flex-shrink-0">
                         <Image 
                           src={item.image} 
                           alt={item.name} 
                           fill 
                           className="object-contain p-2"
                         />
                      </div>
                      <div className="flex-1 py-1">
                        <div className="flex justify-between items-start mb-2">
                           <div>
                            <span className="text-[8px] tracking-[4px] opacity-60 uppercase mb-1 block">{item.brand}</span>
                            <Link 
                              href={`/${locale}/product/${item.slug}`} 
                              onClick={onClose}
                              className="text-[11px] font-bold uppercase tracking-[2px] hover:text-brand-gold transition-colors leading-tight block"
                            >
                              {item.name}
                            </Link>
                           </div>
                           <button 
                             onClick={() => removeItem(item.id)}
                             className="text-brand-stone hover:text-brand-gold p-1"
                           >
                             <TrashIcon className="w-4 h-4" />
                           </button>
                        </div>
                        <p className="text-sm font-display mb-6">{formatPrice(item.price)}</p>
                        
                        <Link 
                          href={`/${locale}/product/${item.slug}`} 
                          onClick={onClose}
                          className="inline-block text-[9px] tracking-[4px] uppercase underline underline-offset-4 hover:text-brand-gold"
                        >
                          Ver Detalles
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer - Only if has items */}
            {items.length > 0 && (
               <div className="p-8 bg-brand-cream/50 border-t border-brand-stone/30">
                  <button 
                    onClick={() => {
                        onClose();
                        openCart();
                    }}
                    className="w-full py-6 bg-brand-black text-white text-[10px] tracking-[6px] uppercase hover:bg-brand-gold transition-all duration-700"
                  >
                    Ver Carrito
                  </button>
               </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// Icons (Shared with others usually but kept local for speed)
const CloseIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const HeartIcon = ({ className, strokeWidth = 1 }: { className?: string; strokeWidth?: number }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const TrashIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 6h18m-2 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
);
