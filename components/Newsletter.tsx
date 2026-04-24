"use client";

import React from "react";
import { Reveal } from "./Reveal";

/**
 * Newsletter Section
 * As per CLAUDE.md: Minimalist input and elegant CTA
 */
export const Newsletter = () => {
  return (
    <section className="py-48 bg-brand-off-white border-b border-brand-stone/10 overflow-hidden relative">
      {/* Subtle Background Accent */}
      <div className="absolute -right-20 -top-20 w-96 h-96 bg-brand-gold/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-8 max-w-4xl text-center relative z-10">
        <Reveal>
          <div className="flex flex-col items-center">
            <span className="label-decorative mb-8 block">Exclusive Access</span>
          </div>
        </Reveal>
        
        <Reveal delay={0.2}>
          <h2 className="text-[clamp(2.5rem,6vw,4.5rem)] font-display text-brand-black mb-10 leading-none tracking-tight">
            The Goldenboy List
          </h2>
        </Reveal>
        
        <Reveal delay={0.4} width="100%">
          <p className="text-[11px] font-body text-brand-graphite leading-relaxed mb-20 max-w-md mx-auto opacity-70">
            Únete a nuestra exclusiva comunidad para recibir notificaciones sobre importaciones de edición limitada, preventas de lujo y lanzamientos recién llegados de Europa.
          </p>
        </Reveal>

        <Reveal delay={0.6}>
          <form className="flex flex-col md:flex-row gap-0 justify-center items-stretch max-w-xl mx-auto shadow-2xl border border-brand-stone/20">
            <input 
              type="email" 
              required
              placeholder="TU DIRECCIÓN DE CORREO" 
              className="flex-1 bg-white px-8 py-5 text-[10px] tracking-[3px] focus:outline-none focus:placeholder:opacity-0 transition-all duration-500 placeholder:text-brand-stone/60 uppercase"
            />
            <button className="relative group px-12 py-5 bg-brand-black text-brand-off-white text-[10px] tracking-[5px] uppercase overflow-hidden transition-all duration-700">
              <span className="relative z-10">Unirme Ahora</span>
              <div className="absolute inset-0 bg-brand-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-premium" />
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
};
