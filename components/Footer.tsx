"use client";

import React from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";

/**
 * Premium Dark Footer
 * As per CLAUDE.md: Dark background, brand messaging, social links
 */
export const Footer = () => {
  const t = useTranslations("Nav");
  const locale = useLocale();

  return (
    <footer className="bg-brand-black text-brand-off-white pt-32 pb-16">
      <div className="container mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 mb-32">
          
          {/* Brand Pillar */}
          <div className="space-y-12">
            <div className="space-y-4">
              <h2 className="font-display text-3xl tracking-[8px] font-light">BY GOLDENBOY</h2>
              <p className="text-[10px] text-brand-stone/40 tracking-[2px] uppercase">Good taste. Imported style.</p>
            </div>
            
            <p className="text-[11px] text-brand-stone/60 leading-relaxed max-w-xs font-body italic">
              &quot;No vendemos ropa. Vendemos la versión de ti que siempre quisiste ser.&quot;
            </p>
            
            <div className="flex space-x-8 pt-4">
              <SocialIcon type="instagram" />
              <SocialIcon type="whatsapp" />
              <SocialIcon type="email" />
            </div>
          </div>

          {/* Navigation Pillar */}
          <div>
            <h3 className="label-decorative text-brand-gold mb-12 border-b border-brand-stone/10 pb-4">Shopping</h3>
            <ul className="space-y-6 text-[10px] tracking-[3px] uppercase font-light text-brand-stone/70">
              <li><Link href={`/${locale}/shop?cat=women`} className="hover:text-brand-gold transition-colors duration-500">{t("women")}</Link></li>
              <li><Link href={`/${locale}/shop?cat=men`} className="hover:text-brand-gold transition-colors duration-500">{t("men")}</Link></li>
              <li><Link href={`/${locale}/shop?cat=kids`} className="hover:text-brand-gold transition-colors duration-500">{t("kids")}</Link></li>
              <li><Link href={`/${locale}/designers`} className="hover:text-brand-gold transition-colors duration-500">{t("designers")}</Link></li>
            </ul>
          </div>

          {/* Support Pillar */}
          <div>
            <h3 className="label-decorative text-brand-gold mb-12 border-b border-brand-stone/10 pb-4">Concierge</h3>
            <ul className="space-y-6 text-[10px] tracking-[3px] uppercase font-light text-brand-stone/70">
              <li><Link href="#" className="hover:text-brand-gold transition-colors duration-500">Autenticidad</Link></li>
              <li><Link href="#" className="hover:text-brand-gold transition-colors duration-500">Envíos & Devoluciones</Link></li>
              <li><Link href="#" className="hover:text-brand-gold transition-colors duration-500">FAQ</Link></li>
              <li><Link href={`/${locale}/contact`} className="hover:text-brand-gold transition-colors duration-500">Contacto</Link></li>
            </ul>
          </div>

          {/* Newsletter Pillar */}
          <div>
            <h3 className="label-decorative text-brand-gold mb-12 border-b border-brand-stone/10 pb-4">Exclusive Access</h3>
            <p className="text-[11px] text-brand-stone/50 mb-10 font-body leading-relaxed">
              Únete a nuestra lista curada para recibir acceso anticipado y lanzamientos de edición limitada.
            </p>
            <form className="relative group">
              <input 
                type="email" 
                placeholder="TU CORREO ELECTRÓNICO" 
                className="w-full bg-transparent border-b border-brand-stone/20 py-4 text-[9px] tracking-[3px] focus:outline-none focus:border-brand-gold transition-all duration-700 placeholder:text-brand-stone/20 uppercase"
              />
              <button 
                type="button"
                className="absolute right-0 top-1/2 -translate-y-1/2 text-[8px] tracking-[3px] uppercase text-brand-gold hover:text-white transition-all duration-500 font-bold"
              >
                Suscribir
              </button>
            </form>
          </div>
        </div>

        {/* Legal Bar */}
        <div className="border-t border-brand-stone/10 pt-16 flex flex-col md:flex-row items-center justify-between text-[8px] tracking-[5px] uppercase text-brand-stone/30 font-light">
          <p>© 2026 BY GOLDENBOY — ECOSYSTEM 120+</p>
          <div className="flex space-x-12 mt-10 md:mt-0 font-medium">
            <Link href="#" className="hover:text-brand-stone transition-colors duration-500">Privacy Policy</Link>
            <Link href="#" className="hover:text-brand-stone transition-colors duration-500">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialIcon = ({ type }: { type: string }) => {
  return (
    <Link href="#" className="text-brand-stone/40 hover:text-brand-gold transition-all duration-500 transform hover:-translate-y-1">
      <div className="w-5 h-5">
        {type === "instagram" && (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
          </svg>
        )}
        {type === "whatsapp" && (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        )}
        {type === "email" && (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
        )}
      </div>
    </Link>
  );
};
