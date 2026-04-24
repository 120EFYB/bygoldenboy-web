"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";
import { useCartStore } from "@/lib/cart";
import { formatPrice } from "@/lib/utils";
import { Reveal } from "./Reveal";
import { motion, AnimatePresence } from "framer-motion";

/**
 * CartPageContent Component
 * Full-page shopping bag experience
 */
export const CartPageContent = () => {
  const { items, removeItem, updateQty, getTotal, getItemCount } = useCartStore();
  const locale = useLocale();

  const handleWhatsAppOrder = () => {
    const phone = "5219999999999";
    let message = "Hola By Goldenboy! Me gustaría confirmar mi pedido:\n\n";
    
    items.forEach((item) => {
      message += `- ${item.name} (${item.brand}) - Talla: ${item.size} - Cant: ${item.qty} - ${formatPrice(item.price * item.qty)}\n`;
    });
    
    message += `\nTotal: ${formatPrice(getTotal())}`;
    message += `\n\nEnvío a: (Por favor, escribe tu dirección aquí)`;
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phone}?text=${encodedMessage}`, "_blank");
  };

  if (items.length === 0) {
    return (
      <div className="py-40 flex flex-col items-center text-center">
        <Reveal>
          <div className="mb-12 opacity-10">
            <BagIcon className="w-32 h-32" />
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <h2 className="text-4xl font-display mb-6 uppercase tracking-tight">Tu bolsa está vacía</h2>
          <p className="font-accent italic text-brand-graphite/60 tracking-[4px] uppercase mb-12">
            La elegancia te espera
          </p>
          <Link 
            href={`/${locale}/shop`}
            className="inline-block px-12 py-5 bg-brand-black text-brand-off-white text-[10px] tracking-[6px] uppercase hover:bg-brand-gold transition-all duration-700"
          >
            Explorar Colección
          </Link>
        </Reveal>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
      {/* Left Column: Item List */}
      <div className="lg:col-span-8">
        <div className="flex items-end justify-between mb-16 border-b border-brand-stone/30 pb-10">
          <Reveal>
            <h1 className="text-4xl md:text-5xl font-display uppercase tracking-tight">Tu Bolsa</h1>
          </Reveal>
          <Reveal delay={0.1}>
            <span className="label-decorative opacity-60">
              {getItemCount()} {locale === "es" ? "Artículos" : "Items"}
            </span>
          </Reveal>
        </div>

        <div className="space-y-12">
          <AnimatePresence mode="popLayout">
            {items.map((item, index) => (
              <motion.div 
                key={`${item.id}-${item.size}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="flex flex-col sm:flex-row sm:items-center gap-8 py-8 border-b border-brand-stone/10 group"
              >
                <div className="relative w-full sm:w-40 h-52 bg-white border border-brand-stone/20 overflow-hidden flex-shrink-0">
                  <Image 
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-contain p-4 transition-transform duration-1000 group-hover:scale-110"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between h-full py-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="label-decorative text-[8px] tracking-[5px] opacity-60 mb-2 block">{item.brand}</span>
                      <h3 className="text-lg font-medium uppercase tracking-wider mb-2">{item.name}</h3>
                      <p className="text-[10px] text-brand-graphite opacity-50 uppercase tracking-[3px]">Talla: <span className="font-bold text-brand-black">{item.size}</span></p>
                    </div>
                    <button 
                      onClick={() => removeItem(item.id, item.size)}
                      className="p-2 text-brand-stone hover:text-brand-gold transition-colors"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-auto pt-8">
                    <div className="flex items-center border border-brand-stone/50 bg-white mb-6 sm:mb-0">
                      <button 
                        onClick={() => updateQty(item.id, item.size, item.qty - 1)}
                        className="w-10 h-10 flex items-center justify-center hover:bg-brand-stone/10 transition-colors"
                      >
                        -
                      </button>
                      <span className="w-12 text-center text-xs font-medium">{item.qty}</span>
                      <button 
                        onClick={() => updateQty(item.id, item.size, item.qty + 1)}
                        className="w-10 h-10 flex items-center justify-center hover:bg-brand-stone/10 transition-colors"
                      >
                        +
                      </button>
                    </div>
                    <p className="text-xl font-display font-light text-brand-black">
                      {formatPrice(item.price * item.qty)}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Right Column: Order Summary (Sticky) */}
      <div className="lg:col-span-4">
        <div className="sticky top-40 bg-brand-cream border border-brand-stone/30 p-10 lg:p-12 shadow-sm">
          <h2 className="label-decorative text-base mb-12 border-b border-brand-stone pb-4 tracking-[8px]">Resumen</h2>
          
          <div className="space-y-8 mb-12">
            <div className="flex justify-between text-[11px] uppercase tracking-[3px] opacity-70">
              <span>Subtotal</span>
              <span>{formatPrice(getTotal())}</span>
            </div>
            <div className="flex justify-between text-[11px] uppercase tracking-[3px] opacity-70">
              <span>Envío</span>
              <span className="text-brand-gold font-bold">Gratis</span>
            </div>
            <div className="h-[0.5px] bg-brand-stone/50 my-2" />
            <div className="flex justify-between items-baseline pt-4">
              <span className="label-decorative text-[12px] font-bold">Total</span>
              <span className="text-3xl font-display text-brand-black">{formatPrice(getTotal())}</span>
            </div>
          </div>

          <div className="space-y-4">
            <button className="w-full py-6 bg-brand-black text-brand-off-white text-[10px] tracking-[6px] uppercase hover:bg-brand-gold transition-all duration-700 shadow-2xl relative overflow-hidden group">
              <span className="relative z-10 transition-transform duration-500 block group-hover:scale-110">Finalizar Pedido</span>
            </button>
            <button 
              onClick={handleWhatsAppOrder}
              className="w-full py-5 border border-brand-black text-brand-black text-[9px] tracking-[5px] uppercase hover:bg-brand-black hover:text-white transition-all duration-700 flex items-center justify-center group"
            >
              Pedir por WhatsApp
            </button>
          </div>

          <div className="mt-12 space-y-6 pt-10 border-t border-brand-stone/30">
            <div className="flex items-start gap-4">
              <div className="w-4 h-4 mt-1 border border-brand-gold rounded-full flex items-center justify-center text-[8px] text-brand-gold font-bold">✓</div>
              <p className="text-[10px] leading-[1.8] text-brand-graphite font-body">
                Autenticidad 100% garantizada en todas las piezas.
              </p>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-4 h-4 mt-1 border border-brand-gold rounded-full flex items-center justify-center text-[8px] text-brand-gold font-bold">✓</div>
              <p className="text-[10px] leading-[1.8] text-brand-graphite font-body">
                Envío prioritario desde boutiques europeas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Icons components
const TrashIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 6h18m-2 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
);

const BagIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
    <path d="M3 6h18" />
    <path d="M9 10a3 3 0 0 0 6 0" />
  </svg>
);
