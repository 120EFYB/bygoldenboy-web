"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useUIStore } from "@/lib/ui-store";

/**
 * SizeGuideModal Component
 * Elegant tables for luxury sizing comparisons.
 */
export const SizeGuideModal = () => {
  const isOpen = useUIStore((state) => state.sizeGuideOpen);
  const onClose = useUIStore((state) => state.closeSizeGuide);
  const product = useUIStore((state) => state.quickViewProduct); // Reuse product if in quickview
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isShoes = !product || product.category === "calzado";

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
            className="fixed inset-0 bg-brand-black/40 backdrop-blur-sm z-[200] flex items-center justify-center p-6"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 m-auto w-full max-w-2xl h-fit bg-brand-off-white z-[210] shadow-2xl p-10 md:p-16 overflow-y-auto max-h-[85vh]"
          >
            <div className="flex justify-between items-center mb-12">
               <h2 className="text-3xl font-display uppercase tracking-widest text-brand-black">Guía de Tallas</h2>
               <button onClick={onClose} className="p-2 hover:rotate-90 transition-transform duration-500">
                 <CloseIcon className="w-6 h-6" />
               </button>
            </div>

            <div className="space-y-12">
               <p className="text-[10px] text-brand-graphite opacity-60 uppercase tracking-[3px] leading-relaxed italic">
                 Nuestras piezas de diseñador siguen escalas de tallaje internacionales. Compara tu talla local para encontrar el ajuste perfecto.
               </p>

               {/* TABLA: CALZADO */}
               {isShoes ? (
                 <div className="space-y-6">
                    <h4 className="label-decorative text-[9px] tracking-[4px] text-brand-gold uppercase font-bold border-b border-brand-gold/20 pb-2">Calzado (Sneakers & Zapatos)</h4>
                    <table className="w-full text-left text-[10px] tracking-[2px] uppercase">
                       <thead className="border-b border-brand-stone/30">
                          <tr>
                             <th className="py-4 font-bold">EU</th>
                             <th className="py-4 font-bold">MX (CM)</th>
                             <th className="py-4 font-bold">US MEN</th>
                             <th className="py-4 font-bold">US WOMEN</th>
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-brand-stone/10 font-medium">
                          <tr><td className="py-4">37</td><td className="py-4">23.5</td><td className="py-4">-</td><td className="py-4">6</td></tr>
                          <tr><td className="py-4">38</td><td className="py-4">24.5</td><td className="py-4">-</td><td className="py-4">7</td></tr>
                          <tr><td className="py-4">39</td><td className="py-4">25</td><td className="py-4">6</td><td className="py-4">8</td></tr>
                          <tr><td className="py-4">40</td><td className="py-4">26</td><td className="py-4">7</td><td className="py-4">9</td></tr>
                          <tr><td className="py-4">41</td><td className="py-4">26.5</td><td className="py-4">8</td><td className="py-4">10</td></tr>
                          <tr><td className="py-4">42</td><td className="py-4">27.5</td><td className="py-4">9</td><td className="py-4">11</td></tr>
                          <tr><td className="py-4">43</td><td className="py-4">28</td><td className="py-4">10</td><td className="py-4">-</td></tr>
                          <tr><td className="py-4">44</td><td className="py-4">29</td><td className="py-4">11</td><td className="py-4">-</td></tr>
                          <tr><td className="py-4">45</td><td className="py-4">30</td><td className="py-4">12</td><td className="py-4">-</td></tr>
                       </tbody>
                    </table>
                 </div>
               ) : (
                 /* TABLA: ROPA */
                 <div className="space-y-6">
                    <h4 className="label-decorative text-[9px] tracking-[4px] text-brand-gold uppercase font-bold border-b border-brand-gold/20 pb-2">Ropa (T-Shirts, Knitwear & Jackets)</h4>
                    <table className="w-full text-left text-[10px] tracking-[2px] uppercase">
                       <thead className="border-b border-brand-stone/30">
                          <tr>
                             <th className="py-4 font-bold">Label</th>
                             <th className="py-4 font-bold">Pecho (CM)</th>
                             <th className="py-4 font-bold">Cintura (CM)</th>
                             <th className="py-4 font-bold">Hombros (CM)</th>
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-brand-stone/10 font-medium">
                          <tr><td className="py-4">XS</td><td className="py-4">88-92</td><td className="py-4">74-78</td><td className="py-4">42-43</td></tr>
                          <tr><td className="py-4">S</td><td className="py-4">92-96</td><td className="py-4">78-82</td><td className="py-4">43-44</td></tr>
                          <tr><td className="py-4">M</td><td className="py-4">96-100</td><td className="py-4">82-86</td><td className="py-4">44-45</td></tr>
                          <tr><td className="py-4">L</td><td className="py-4">100-104</td><td className="py-4">86-90</td><td className="py-4">45-46</td></tr>
                          <tr><td className="py-4">XL</td><td className="py-4">104-108</td><td className="py-4">90-94</td><td className="py-4">46-47</td></tr>
                       </tbody>
                    </table>
                 </div>
               )}

               <div className="pt-8 border-t border-brand-stone/20">
                  <p className="text-[9px] text-brand-graphite leading-relaxed opacity-40 uppercase tracking-[2px]">
                    * Estas medidas son orientativas. Para dudas específicas sobre el calce de una marca (ej. oversize), recomendamos contactar a nuestro equipo de Concierge vía WhatsApp.
                  </p>
               </div>
            </div>
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
