"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Product } from "@/types/product";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/lib/cart";
import { useUIStore } from "@/lib/ui-store";

interface StylingToolProps {
  products: Product[];
}

type OutfitCategory = "calzado" | "ropa" | "bolsos" | "accesorios";

/**
 * StylingTool Component
 * An interactive fashion canvas to build and buy full looks.
 */
export const StylingTool = ({ products }: StylingToolProps) => {
  const [selectedItems, setSelectedItems] = useState<Partial<Record<OutfitCategory, Product>>>({});
  const [activeTab, setActiveTab] = useState<OutfitCategory>("calzado");
  const [isAdding, setIsAdding] = useState(false);

  const addItems = useCartStore((state) => state.addItems);
  const openCart = useUIStore((state) => state.openCart);

  const categories: { id: OutfitCategory; label: string }[] = [
    { id: "calzado", label: "Calzado" },
    { id: "ropa", label: "Ropa & Tops" },
    { id: "bolsos", label: "Bolsos" },
    { id: "accesorios", label: "Accesorios" },
  ];

  const filteredLibrary = useMemo(() => {
    return products.filter((p) => {
      if (activeTab === "ropa") return p.category === "ropa";
      return p.category === activeTab;
    });
  }, [activeTab, products]);

  const toggleItem = (product: Product) => {
    const cat = product.category as OutfitCategory;
    setSelectedItems((prev) => {
      if (prev[cat]?.id === product.id) {
        const next = { ...prev };
        delete next[cat];
        return next;
      }
      return { ...prev, [cat]: product };
    });
  };

  const totalPrice = useMemo(() => {
    return Object.values(selectedItems).reduce((sum, item) => sum + (item?.price || 0), 0);
  }, [selectedItems]);

  const handleBuyLook = () => {
    const itemsToBuy = Object.values(selectedItems).map((p) => ({
      id: p!.id,
      slug: p!.slug,
      name: p!.name,
      brand: p!.brand,
      price: p!.price,
      image: p!.image,
      size: p!.category === "calzado" ? "42" : p!.category === "ropa" ? "M" : "Única",
      qty: 1,
    }));

    if (itemsToBuy.length === 0) return;

    setIsAdding(true);
    addItems(itemsToBuy);
    
    setTimeout(() => {
      setIsAdding(false);
      openCart();
    }, 800);
  };

  const handleWhatsAppShare = () => {
    const phone = "5219999999999";
    let message = "Hola By Goldenboy! He creado este outfit en la web y me encantaría una cotización personalizada:\n\n";
    
    Object.values(selectedItems).forEach((p) => {
      message += `- ${p!.name} (${p!.brand}) - ${formatPrice(p!.price)}\n`;
    });
    
    message += `\nTotal del Look: ${formatPrice(totalPrice)}`;
    
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen pt-20 bg-white overflow-hidden">
      
      {/* LEFT: Library Panel */}
      <div className="w-full lg:w-[450px] border-r border-brand-stone/30 flex flex-col bg-brand-off-white/30">
        <div className="p-8 border-b border-brand-stone/30 space-y-6">
           <div className="flex flex-col">
              <span className="label-decorative text-[9px] tracking-[5px] uppercase opacity-40 mb-2">Editor de Estilo</span>
              <h2 className="text-3xl font-display uppercase tracking-tight">Biblioteca</h2>
           </div>
           
           <div className="flex space-x-4 overflow-x-auto scrollbar-hide py-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={`text-[10px] tracking-[3px] uppercase whitespace-nowrap pb-2 border-b-2 transition-all duration-500 font-bold ${
                    activeTab === cat.id ? "border-brand-gold text-brand-black" : "border-transparent text-brand-black/30"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
           </div>
        </div>

        <div className="flex-1 overflow-y-auto p-8 grid grid-cols-2 gap-6 scrollbar-hide">
           {filteredLibrary.map((product) => {
             const isSelected = selectedItems[product.category as OutfitCategory]?.id === product.id;
             return (
               <motion.div
                 key={product.id}
                 whileHover={{ y: -5 }}
                 onClick={() => toggleItem(product)}
                 className={`relative aspect-[3/4] p-6 cursor-pointer border transition-all duration-700 bg-white ${
                   isSelected ? "border-brand-gold shadow-lg" : "border-brand-stone/10 hover:border-brand-stone/40"
                 }`}
               >
                 <div className="relative w-full h-full">
                    <Image src={product.image} alt={product.name} fill className="object-contain" />
                 </div>
                 {isSelected && (
                   <div className="absolute top-2 right-2 bg-brand-gold text-white rounded-full p-1">
                      <CheckIcon className="w-3 h-3" />
                   </div>
                 )}
                 <div className="absolute bottom-4 left-0 w-full px-4">
                    <p className="text-[7px] tracking-[2px] uppercase font-bold text-center opacity-40 truncate">{product.name}</p>
                 </div>
               </motion.div>
             );
           })}
        </div>
      </div>

      {/* RIGHT: Creative Canvas */}
      <div className="flex-1 relative bg-white flex flex-col items-center justify-center p-12 lg:p-24 overflow-hidden">
         {/* Grid background pattern */}
         <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 0)', backgroundSize: '40px 40px' }} />
         
         <div className="relative z-10 w-full max-w-4xl h-full flex flex-col">
            <div className="flex-1 relative">
               <AnimatePresence>
                  {Object.entries(selectedItems).length === 0 ? (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 flex flex-col items-center justify-center text-center space-y-6"
                    >
                       <p className="font-display text-4xl lg:text-6xl text-brand-stone/40 italic">Comienza tu diseño</p>
                       <p className="text-[10px] tracking-[6px] uppercase opacity-30">Elige piezas de la biblioteca para montar tu look</p>
                    </motion.div>
                  ) : (
                    <div className="grid grid-cols-2 gap-12 lg:gap-20 h-full py-12">
                       {/* Top row */}
                       <div className="flex items-center justify-center">
                          <OutfitSlot product={selectedItems.ropa} label="TOP / JACKET" />
                       </div>
                       <div className="flex items-center justify-center">
                          <OutfitSlot product={selectedItems.bolsos} label="ACCESSORIES" />
                       </div>
                       {/* Bottom row */}
                       <div className="flex items-center justify-center">
                          <OutfitSlot product={selectedItems.calzado} label="FOOTWEAR" />
                       </div>
                       <div className="flex items-center justify-center">
                          <OutfitSlot product={selectedItems.accesorios} label="DETAILS" />
                       </div>
                    </div>
                  )}
               </AnimatePresence>
            </div>

            {/* Bottom Controls */}
            <motion.div 
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              className="mt-auto bg-brand-black p-10 lg:p-14 text-white flex flex-col lg:flex-row items-center justify-between gap-10 shadow-2xl relative z-20"
            >
               <div className="space-y-2 text-center lg:text-left">
                  <span className="text-[9px] tracking-[4px] opacity-40 uppercase">Inversión del Outfit</span>
                  <p className="text-3xl lg:text-4xl font-display">{formatPrice(totalPrice)}</p>
               </div>

               <div className="flex flex-col sm:flex-row gap-6 w-full lg:w-auto">
                  <button 
                    onClick={handleWhatsAppShare}
                    className="px-10 py-5 border border-white/20 text-[9px] tracking-[5px] uppercase hover:bg-white/10 transition-all font-bold"
                  >
                    Asesoría WhatsApp
                  </button>
                  <button 
                    onClick={handleBuyLook}
                    disabled={isAdding || totalPrice === 0}
                    className={`px-12 py-5 bg-brand-gold text-white text-[9px] tracking-[6px] uppercase font-bold relative overflow-hidden transition-all duration-500 ${totalPrice === 0 ? 'opacity-20 translate-y-4' : 'hover:bg-white hover:text-brand-black shadow-xl'}`}
                  >
                    {isAdding ? "Añadiendo..." : "Comprar Look Completo"}
                  </button>
               </div>
            </motion.div>
         </div>
      </div>
    </div>
  );
};

const OutfitSlot = ({ product, label }: { product?: Product; label: string }) => {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center group">
       <div className="absolute top-0 text-[8px] tracking-[5px] uppercase opacity-20 group-hover:opacity-100 transition-opacity font-bold">{label}</div>
       <AnimatePresence mode="wait">
          {product ? (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.1, y: -30 }}
              transition={{ type: "spring", damping: 15 }}
              className="relative w-[80%] h-[80%] drop-shadow-2xl"
            >
               <Image src={product.image} alt={product.name} fill className="object-contain" />
               <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] tracking-[3px] uppercase font-bold">
                  {product.brand}
               </div>
            </motion.div>
          ) : (
            <div className="w-24 h-24 border border-dashed border-brand-stone/30 rounded-full flex items-center justify-center">
               <span className="text-[15px] text-brand-stone/30">+</span>
            </div>
          )}
       </AnimatePresence>
    </div>
  );
};

// Icons
const CheckIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
