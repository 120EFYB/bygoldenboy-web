"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { Reveal } from "./Reveal";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * ContactContent Component
 * Features a high-end form, Exclusive WhatsApp Group request, and FAQ accordion.
 */
export const ContactContent = () => {
  const t = useTranslations("Contact");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleExclusiveGroupRequest = () => {
    const phone = "5219999999999";
    const message = "Hola! Me gustaría solicitar acceso a la comunidad exclusiva de By Goldenboy y conocer las piezas exclusivas que llegan primero.";
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phone}?text=${encodedMessage}`, "_blank");
  };

  const faqs = [
    { q: t("faq.q1"), a: t("faq.a1") },
    { q: t("faq.q2"), a: t("faq.a2") },
    { q: t("faq.q3"), a: t("faq.a3") },
  ];

  return (
    <div className="pb-40">
      {/* 1. Hero Section */}
      <section className="pt-40 pb-20 text-center border-b border-brand-stone/20">
        <Reveal>
          <span className="label-decorative text-brand-gold mb-6 block tracking-[8px]">By Goldenboy</span>
        </Reveal>
        <Reveal delay={0.2}>
          <h1 className="text-6xl md:text-8xl font-display uppercase tracking-tight mb-8">
            {t("heroTitle")}
          </h1>
        </Reveal>
        <Reveal delay={0.4}>
          <p className="font-accent italic text-brand-graphite/60 tracking-[4px] uppercase max-w-2xl mx-auto">
            {t("heroSubtitle")}
          </p>
        </Reveal>
      </section>

      <div className="container mx-auto px-8 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
          
          {/* Left Column: Form & Info */}
          <div className="lg:col-span-7">
            <Reveal>
              <h2 className="text-3xl font-display mb-12 uppercase tracking-tight">{t("form.title")}</h2>
            </Reveal>

            <form className="space-y-10" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-4">
                  <label className="label-decorative text-[9px] tracking-[4px] opacity-60 uppercase">{t("form.name")}</label>
                  <input 
                    type="text" 
                    className="w-full bg-transparent border-b border-brand-stone/60 pb-4 focus:border-brand-gold outline-none transition-colors font-body text-sm"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-4">
                  <label className="label-decorative text-[9px] tracking-[4px] opacity-60 uppercase">{t("form.email")}</label>
                  <input 
                    type="email" 
                    className="w-full bg-transparent border-b border-brand-stone/60 pb-4 focus:border-brand-gold outline-none transition-colors font-body text-sm"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <label className="label-decorative text-[9px] tracking-[4px] opacity-60 uppercase">{t("form.subject")}</label>
                <div className="relative">
                    <select className="w-full bg-transparent border-b border-brand-stone/60 pb-4 focus:border-brand-gold outline-none transition-colors font-body text-sm appearance-none cursor-pointer">
                    <option className="bg-brand-off-white">{t("form.options.special")}</option>
                    <option className="bg-brand-off-white">{t("form.options.auth")}</option>
                    <option className="bg-brand-off-white">{t("form.options.shipping")}</option>
                    <option className="bg-brand-off-white">{t("form.options.other")}</option>
                    </select>
                    <span className="absolute right-0 top-0 pointer-events-none opacity-30">↓</span>
                </div>
              </div>

              <div className="space-y-4">
                <label className="label-decorative text-[9px] tracking-[4px] opacity-60 uppercase">{t("form.message")}</label>
                <textarea 
                  rows={4}
                  className="w-full bg-transparent border-b border-brand-stone/60 pb-4 focus:border-brand-gold outline-none transition-colors font-body text-sm resize-none"
                  placeholder="..."
                />
              </div>

              <Reveal delay={0.6}>
                <button 
                  type="submit"
                  className="px-16 py-6 bg-brand-black text-brand-off-white text-[10px] tracking-[6px] uppercase hover:bg-brand-gold transition-all duration-700 shadow-2xl"
                >
                  {t("form.send")}
                </button>
              </Reveal>
            </form>
          </div>

          {/* Right Column: Exclusive Group & FAQs */}
          <div className="lg:col-span-5 space-y-20">
            
            {/* Exclusive Group CTA */}
            <Reveal>
              <div className="bg-brand-black text-brand-off-white p-12 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold opacity-5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:opacity-20 transition-opacity duration-1000" />
                
                <span className="label-decorative text-brand-gold mb-6 block tracking-[5px] text-[10px] font-bold">Concept Group</span>
                <h3 className="text-3xl font-display mb-6 tracking-tight">{t("exclusive.title")}</h3>
                <p className="text-sm font-light opacity-70 leading-relaxed mb-10 italic">
                  &quot;{t("exclusive.text")}&quot;
                </p>
                <button 
                  onClick={handleExclusiveGroupRequest}
                  className="w-full py-5 border border-brand-gold/30 text-brand-gold text-[9px] tracking-[5px] uppercase hover:bg-brand-gold hover:text-brand-black transition-all duration-700"
                >
                  {t("exclusive.cta")}
                </button>
              </div>
            </Reveal>

            {/* FAQ Accordion */}
            <div className="space-y-8">
              <Reveal delay={0.3}>
                <h2 className="label-decorative opacity-40 tracking-[6px] uppercase text-xs mb-10">{t("faq.title")}</h2>
              </Reveal>
              <div className="space-y-4">
                {faqs.map((faq, idx) => (
                  <Reveal key={idx} delay={idx * 0.1}>
                    <div className="border-b border-brand-stone/30 pb-4">
                      <button 
                        onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                        className="w-full flex items-center justify-between text-left py-4 hover:text-brand-gold transition-colors"
                      >
                        <span className="text-sm font-medium uppercase tracking-wider">{faq.q}</span>
                        <span className={cn("transition-transform duration-500", openFaq === idx ? "rotate-45" : "")}>+</span>
                      </button>
                      <AnimatePresence>
                        {openFaq === idx && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                            className="overflow-hidden"
                          >
                            <p className="text-sm font-body text-brand-graphite leading-relaxed py-4 pr-10">
                              {faq.a}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            {/* Social Channels */}
            <Reveal delay={0.6}>
              <div className="pt-10 flex items-center space-x-12 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-1000">
                <a href="#" className="label-decorative text-[9px] tracking-[4px] uppercase hover:text-brand-gold">Instagram</a>
                <a href="#" className="label-decorative text-[9px] tracking-[4px] uppercase hover:text-brand-gold">Email</a>
                <a href="#" className="label-decorative text-[9px] tracking-[4px] uppercase hover:text-brand-gold">Pinterest</a>
              </div>
            </Reveal>

          </div>
        </div>
      </div>
    </div>
  );
};
