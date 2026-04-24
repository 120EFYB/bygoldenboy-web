"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useUIStore } from "@/lib/ui-store";
import { useCartStore } from "@/lib/cart";
import { formatPrice } from "@/lib/utils";
import { triggerHaptic } from "@/lib/haptics";

/**
 * Premium Cart Drawer
 * As per CLAUDE.md: slide from right, backdrop blur, WhatsApp integration
 */
export const CartDrawer = () => {
  const { cartOpen, closeCart } = useUIStore();
  const { items, removeItem, updateQty, getTotal } = useCartStore();

  const handleWhatsAppOrder = () => {
    const phone = "5219999999999";
    let message = "Hola By Goldenboy! Me gustaría pedir los siguientes artículos:\n\n";
    
    items.forEach((item) => {
      message += `- ${item.name} (${item.brand}) - Talla: ${item.size} - Cant: ${item.qty} - ${formatPrice(item.price * item.qty)}\n`;
    });
    
    message += `\nTotal: ${formatPrice(getTotal())}`;
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phone}?text=${encodedMessage}`, "_blank");
  };

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          {/* Backdrop blur with dark overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-brand-black/40 backdrop-blur-sm z-[60]"
          />

          {/* Drawer content */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-[420px] bg-brand-off-white shadow-2xl z-[70] flex flex-col"
          >
            {/* Header */}
            <div className="p-8 border-b border-brand-stone/30 flex items-center justify-between">
              <h2 className="label-decorative text-base font-bold tracking-[8px]">Carrito</h2>
              <button 
                onClick={closeCart}
                className="p-2 hover:text-brand-gold transition-colors duration-300"
              >
                <CloseIcon className="w-6 h-6" />
              </button>
            </div>

            {/* Scrollable Item List */}
            <div className="flex-1 overflow-y-auto p-8 scrollbar-hide">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-10">
                  <BagIcon className="w-20 h-20 opacity-5" />
                  <div>
                    <p className="font-accent uppercase tracking-[4px] text-[10px] mb-2 opacity-60">Tu bolsa está vacía</p>
                    <p className="text-xs font-body italic">&quot;Good taste. Imported style.&quot;</p>
                  </div>
                  <button 
                    onClick={closeCart}
                    className="px-10 py-4 bg-brand-black text-brand-off-white text-[9px] tracking-[5px] uppercase hover:bg-brand-gold transition-all duration-500"
                  >
                    Explorar Colección
                  </button>
                </div>
              ) : (
                <div className="space-y-10">
                  {items.map((item) => (
                    <div key={`${item.id}-${item.size}`} className="flex space-x-6 group">
                      <div className="relative w-24 h-32 bg-white flex-shrink-0 border border-brand-stone/20 overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-contain p-2 transition-transform duration-700 group-hover:scale-110"
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-between py-1">
                        <div>
                          <div className="flex items-start justify-between mb-1">
                            <p className="label-decorative text-[7px] tracking-[4px] opacity-70">{item.brand}</p>
                            <button 
                              onClick={() => {
                                removeItem(item.id, item.size);
                                triggerHaptic("medium");
                              }}
                              className="text-brand-graphite/40 hover:text-brand-gold transition-colors"
                            >
                              <TrashIcon className="w-3 h-3" />
                            </button>
                          </div>
                          <p className="text-[11px] font-medium uppercase tracking-wider mb-1 leading-tight">{item.name}</p>
                          <p className="text-[9px] text-brand-graphite/60 font-body">Talla: <span className="font-semibold text-brand-black">{item.size}</span></p>
                        </div>
                        
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center border border-brand-stone/40 rounded-none bg-white">
                            <button 
                              onClick={() => {
                                updateQty(item.id, item.size, item.qty - 1);
                                triggerHaptic("light");
                              }}
                              className="w-7 h-7 flex items-center justify-center text-[10px] hover:bg-brand-stone/10 transition-colors"
                            >
                              -
                            </button>
                            <span className="w-8 text-center text-[10px] font-medium">{item.qty}</span>
                            <button 
                              onClick={() => {
                                updateQty(item.id, item.size, item.qty + 1);
                                triggerHaptic("light");
                              }}
                              className="w-7 h-7 flex items-center justify-center text-[10px] hover:bg-brand-stone/10 transition-colors"
                            >
                              +
                            </button>
                          </div>
                          <p className="text-xs font-medium tracking-wide">{formatPrice(item.price * item.qty)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Complementary Recommendations */}
              {items.length > 0 && (
                <div className="mt-20 pt-16 border-t border-brand-stone/20">
                  <h4 className="label-decorative text-[8px] tracking-[4px] uppercase font-bold text-center mb-10 opacity-60">Complementa tu Look</h4>
                  <div className="grid grid-cols-2 gap-6">
                    {/* Simplified Recommendations Mockup */}
                    {[1, 2].map((i) => (
                      <div key={i} className="space-y-4 group cursor-pointer" onClick={closeCart}>
                        <div className="aspect-[3/4] bg-white border border-brand-stone/10 p-4 transition-all duration-700 group-hover:shadow-lg">
                           <div className="w-full h-full bg-brand-stone/5 animate-pulse" />
                        </div>
                        <div className="text-center">
                          <span className="text-[6px] tracking-[3px] uppercase opacity-40 block mb-1">Designer Piece</span>
                          <span className="text-[9px] tracking-[2px] uppercase font-medium group-hover:text-brand-gold transition-colors block">Shop Accessories</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Checkout Footer */}
            {items.length > 0 && (
              <div className="p-8 border-t border-brand-stone/30 bg-white space-y-6">
                <div className="flex items-center justify-between">
                  <span className="label-decorative text-[10px] font-bold tracking-[4px]">Subtotal</span>
                  <span className="text-xl font-display font-light">{formatPrice(getTotal())}</span>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  <button className="w-full py-5 bg-brand-black text-brand-off-white text-[10px] tracking-[5px] uppercase hover:bg-brand-gold transition-all duration-700 shadow-xl">
                    Finalizar Pedido
                  </button>
                  <button 
                    onClick={handleWhatsAppOrder}
                    className="w-full py-4 border border-brand-black text-brand-black text-[9px] tracking-[4px] uppercase hover:bg-brand-black hover:text-white transition-all duration-700 flex items-center justify-center group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-500">Pedir por WhatsApp</span>
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const CloseIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const TrashIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 6h18m-2 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
);

const BagIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
    <path d="M3 6h18" />
    <path d="M9 10a3 3 0 0 0 6 0" />
  </svg>
);
