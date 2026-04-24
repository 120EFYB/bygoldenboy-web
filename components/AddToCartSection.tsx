"use client";

import React, { useState } from "react";
import { Product } from "@/types/product";
import { useCartStore } from "@/lib/cart";
import { useUIStore } from "@/lib/ui-store";
import { cn } from "@/lib/utils";
import { triggerHaptic } from "@/lib/haptics";

interface AddToCartSectionProps {
  product: Product;
}

/**
 * Client-side section for PDP to handle size selection and cart actions
 */
export const AddToCartSection = ({ product }: AddToCartSectionProps) => {
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [error, setError] = useState(false);
  
  const addItem = useCartStore((state) => state.addItem);
  const openCart = useUIStore((state) => state.openCart);
  const openSizeGuide = useUIStore((state) => state.openSizeGuide);

  // Logic for sizes based on category
  const sizes = product.category === "calzado" 
    ? ["37", "38", "39", "40", "41", "42", "43", "44", "45"]
    : product.category === "ropa"
    ? ["XS", "S", "M", "L", "XL"]
    : ["Única"];

  const handleAddToCart = () => {
    if (!selectedSize && sizes.length > 1) {
      setError(true);
      triggerHaptic("error");
      return;
    }

    triggerHaptic("success");
    addItem({
      id: product.id,
      slug: product.slug,
      name: product.name,
      brand: product.brand,
      price: product.price,
      image: product.image,
      size: selectedSize || sizes[0],
      qty: 1,
    });

    openCart();
  };

  const handleWhatsAppBuy = () => {
    triggerHaptic("medium");
    const phone = "5219999999999";
    const message = `Hola By Goldenboy! Me interesa este producto:\n\n*${product.name}*\nMarca: ${product.brand}\nTalla: ${selectedSize || 'Por confirmar'}\nPrecio: $${product.price.toLocaleString()}\n\nLink: ${window.location.href}`;
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phone}?text=${encodedMessage}`, "_blank");
  };

  return (
    <div className="space-y-10">
      {/* Size Selection */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <label className="label-decorative text-[9px] tracking-[4px] font-bold">Seleccionar Talla</label>
          <button 
            onClick={openSizeGuide}
            className="text-[8px] tracking-[2px] uppercase opacity-40 border-b border-brand-stone hover:opacity-100 transition-opacity"
          >
            Guía de tallas
          </button>
        </div>
        
        <div className="flex flex-wrap gap-3">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => {
                setSelectedSize(size);
                setError(false);
              }}
              className={cn(
                "w-12 h-12 flex items-center justify-center text-[10px] transition-all duration-300 border",
                selectedSize === size 
                  ? "bg-brand-black text-white border-brand-black shadow-lg" 
                  : "bg-white text-brand-black border-brand-stone/40 hover:border-brand-gold"
              )}
            >
              {size}
            </button>
          ))}
        </div>
        {error && (
          <p className="text-[9px] text-red-500 uppercase tracking-widest animate-pulse">Por favor selecciona una talla</p>
        )}
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-4">
        <button 
          onClick={handleAddToCart}
          className="w-full py-5 bg-brand-black text-brand-off-white text-[10px] tracking-[6px] uppercase hover:bg-brand-gold transition-all duration-700 shadow-xl relative overflow-hidden group"
        >
          <span className="relative z-10 font-bold">Agregar a la Bolsa</span>
          <div className="absolute inset-0 bg-brand-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-premium" />
        </button>

        <button 
          onClick={handleWhatsAppBuy}
          className="w-full py-5 border border-brand-black text-brand-black text-[10px] tracking-[6px] uppercase hover:bg-brand-black hover:text-white transition-all duration-700 flex items-center justify-center space-x-3 group"
        >
          <span className="group-hover:translate-x-1 transition-transform duration-500 font-bold">Pedir Directamente</span>
          <svg className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        </button>
      </div>

      {/* Trust Badges */}
      <div className="pt-10 flex items-center justify-center space-x-12 border-t border-brand-stone/10 opacity-30">
        <div className="flex flex-col items-center gap-2">
          <ShieldCheckIcon className="w-6 h-6" />
          <span className="text-[7px] tracking-[3px] uppercase">Auténtico</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <TruckIcon className="w-6 h-6" />
          <span className="text-[7px] tracking-[3px] uppercase">Express</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <GlobeIcon className="w-6 h-6" />
          <span className="text-[7px] tracking-[3px] uppercase">Importado</span>
        </div>
      </div>
    </div>
  );
};

// Simple icons
const ShieldCheckIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);

const TruckIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
    <rect x="1" y="3" width="15" height="13" />
    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
    <circle cx="5.5" cy="18.5" r="2.5" />
    <circle cx="18.5" cy="18.5" r="2.5" />
  </svg>
);

const GlobeIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);
