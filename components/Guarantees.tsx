"use client";

import React from "react";
import { useLocale } from "next-intl";
import { Reveal } from "./Reveal";

const GUARANTEES = [
  {
    num: "01",
    title: { es: "Autenticidad", en: "Authenticity" },
    desc: { 
      es: "Cada pieza es 100% nueva y auténtica, seleccionada directamente de boutiques autorizadas en Europa y EE.UU.",
      en: "Every piece is 100% new and authentic, sourced directly from authorized boutiques in Europe and physical stores in the US."
    }
  },
  {
    num: "02",
    title: { es: "Origen", en: "Origin" },
    desc: { 
      es: "Importamos estilo. Traemos las colecciones más recientes de Milán, París y Londres directamente a tu puerta.",
      en: "We import style. We bring the latest collections from Milan, Paris, and London directly to your doorstep."
    }
  },
  {
    num: "03",
    title: { es: "Envío Premium", en: "Premium Delivery" },
    desc: { 
      es: "Logística especializada con entrega asegurada en 48-72h para piezas en stock a todo México.",
      en: "Specialized logistics with insured 48-72h delivery for in-stock pieces all across Mexico."
    }
  }
];

/**
 * Guarantees Section
 * As per CLAUDE.md: 01 Autenticidad, 02 Origen, 03 Envío
 */
export const Guarantees = () => {
  const locale = useLocale();

  return (
    <section className="py-40 bg-white border-b border-brand-stone/10">
      <div className="container mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-24">
          {GUARANTEES.map((item, idx) => (
            <Reveal key={item.num} delay={idx * 0.2}>
              <div className="space-y-8 group">
                <div className="relative inline-block">
                  <span className="font-display text-7xl text-brand-gold opacity-[0.15] leading-none transition-opacity duration-700 group-hover:opacity-30">
                    {item.num}
                  </span>
                  <div className="absolute top-1/2 left-0 w-8 h-[0.5px] bg-brand-gold transform -translate-y-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-700" />
                </div>
                
                <div className="space-y-4">
                  <h3 className="label-decorative text-brand-black tracking-[5px] font-bold">
                    {locale === "es" ? item.title.es : item.title.en}
                  </h3>
                  <p className="text-[11px] text-brand-graphite/70 leading-relaxed font-body max-w-xs">
                    {locale === "es" ? item.desc.es : item.desc.en}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
