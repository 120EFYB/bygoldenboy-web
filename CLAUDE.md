# BY GOLDENBOY — Guía Completa de Desarrollo

> Este documento contiene TODA la información necesaria para construir el e-commerce completo de By Goldenboy desde cero. Léelo completamente antes de escribir una sola línea de código.

---

## 01. QUÉ ES BY GOLDENBOY

By Goldenboy es un e-commerce de lujo que importa piezas de diseñador NUEVAS directamente de boutiques de Europa, Canada, Asia y Estados Unidos para venderlas en México y Latinoamérica. NO es segunda mano, NO es resale. Es importación directa de producto nuevo.

- Dominio: bygoldenboy.com
- Tagline: "Good taste. Imported style."
- Filosofía: "No vendemos ropa. Vendemos la versión de ti que siempre quisiste ser."
- Proyecto del Ecosistema 120+

---

## 02. TECH STACK (obligatorio, no cambiar)

- Next.js 14 con App Router (NO Pages Router)
- TypeScript estricto
- Tailwind CSS (con colores de marca custom)
- Framer Motion (para TODAS las animaciones)
- Zustand (para estado del carrito, persistido en localStorage)
- next-intl (internacionalización ES/EN, español por defecto)
- next/image (para todas las imágenes)
- Deploy objetivo: Vercel

---

## 03. IDENTIDAD VISUAL — NO IMPROVISAR

### Paleta de colores (aplicar en tailwind.config.ts como "brand")
- Negro profundo: #0A0A0A (brand-black)
- Gold sutil: #C9A96E (brand-gold)
- Gold oscuro: #A08A52 (brand-gold-dark)
- Gold claro: #E8D5A3 (brand-gold-light)
- Crema: #F5F0E8 (brand-cream)
- Blanco roto: #FAFAF8 (brand-off-white) — color de fondo principal
- Grafito: #3D3D3D (brand-graphite)
- Piedra: #E8E4DC (brand-stone) — para bordes y separadores

Proporción de uso: 40% blanco roto, 25% crema, 15% negro, 10% grafito, 10% gold.

### Tipografías (cargar con next/font/google)
- Display/títulos: Cormorant Garamond, weight 300 (Light). Variable: --font-cormorant
- Subtítulos/accent: Syne, weight 500 (Medium). Variable: --font-syne
- Body/UI: DM Sans, weight 300-500. Variable: --font-dm-sans

### Estilo visual general
- Estética: galería de arte minimalista + editorial de moda + energía joven
- Referencia visual principal: Cettire.com, Maison Margiela, The Row
- Hero del home: imagen de moda en blanco y negro (grayscale), texto centrado
- Fondos de producto: blanco puro (#FFFFFF), sin fondo de color
- Animaciones: sutiles, con easing cubic-bezier(0.16, 1, 0.3, 1)
- Tipografía del logotipo: "BY GOLDENBOY" en Cormorant Garamond Light, tracking de 4px
- Al hacer scroll, el logo cambia a "BG" con letter-spacing de 6px
- Línea decorativa gold de 0.5px como separador entre secciones
- El gold (#C9A96E) se usa SOLO para acentos, labels, hovers — NUNCA como fondo principal

### Isotipo / mascota
- Golden Retriever cachorro de 5 meses con suéter de punto crema, jeans con dobladillo, sneakers con estrella (estilo Golden Goose)
- Versiones: detallado, fine line, blanco y negro, silueta
- NO lo implementes en código, es un asset gráfico que se agrega como imagen

---

## 04. ESTRUCTURA DE ARCHIVOS DEL PROYECTO

```
bygoldenboy/
├── app/
│   └── [locale]/
│       ├── layout.tsx          ← Layout principal con fonts + NextIntlClientProvider
│       ├── page.tsx            ← Home
│       ├── shop/
│       │   └── page.tsx        ← Catálogo completo con filtros
│       ├── product/
│       │   └── [slug]/
│       │       └── page.tsx    ← Detalle de producto
│       ├── cart/
│       │   └── page.tsx        ← Página de carrito completa
│       ├── about/
│       │   └── page.tsx        ← Historia de la marca (7 secciones)
│       ├── contact/
│       │   └── page.tsx        ← Contacto con WhatsApp, email, IG, formulario, FAQ
│       └── designers/
│           └── page.tsx        ← Directorio A-Z de diseñadores
├── components/
│   ├── Navbar.tsx              ← Header estilo Cettire con mega menú
│   ├── Hero.tsx                ← Hero del home centrado con imagen B&W
│   ├── BrandMarquee.tsx        ← Marquee infinito de marcas
│   ├── Statement.tsx           ← Sección de filosofía con comilla decorativa
│   ├── ShopSection.tsx         ← Grid de productos con filtros
│   ├── ProductCard.tsx         ← Card individual de producto
│   ├── ProductDetail.tsx       ← Vista completa de producto
│   ├── CartDrawer.tsx          ← Drawer lateral del carrito (slide from right)
│   ├── CartPageContent.tsx     ← Contenido de la página /cart
│   ├── Guarantees.tsx          ← Sección 01/02/03
│   ├── Newsletter.tsx          ← Input de email + submit
│   ├── Footer.tsx              ← Footer oscuro completo
│   ├── AboutContent.tsx        ← Contenido editorial de /about
│   ├── ContactContent.tsx      ← Contenido de /contact con form
│   ├── DesignersContent.tsx    ← Contenido de /designers con A-Z
│   └── Reveal.tsx              ← Componente wrapper para scroll animations
├── lib/
│   ├── products.ts             ← Base de datos de productos + diseñadores + categorías
│   ├── cart.ts                 ← Zustand store del carrito
│   ├── ui-store.ts             ← Zustand store para UI (cart drawer open/close)
│   └── utils.ts                ← formatPrice, cn helper
├── messages/
│   ├── es.json                 ← Traducciones español
│   └── en.json                 ← Traducciones inglés
├── styles/
│   └── globals.css             ← Tailwind directives + custom scrollbar + selection
├── public/
│   └── images/
│       └── products/           ← Imágenes de producto (JPG)
├── i18n.ts                     ← Config de next-intl
├── middleware.ts               ← Middleware de locale routing
├── tailwind.config.ts          ← Config con colores brand + fuentes + animaciones
├── next.config.js              ← Config de Next.js con next-intl plugin
├── tsconfig.json
├── package.json
├── postcss.config.js
└── CLAUDE.md                   ← ESTE ARCHIVO
```

---

## 05. HEADER / NAVEGACIÓN — ESTILO CETTIRE (el más importante)

El header es el componente más complejo. Debe funcionar EXACTAMENTE así:

### Layout del header:
```
LEFT:     Mujer | Hombre | Kids | Diseñadores | Nosotros
CENTER:   BY GOLDENBOY (se convierte en "GB" al hacer scroll)
RIGHT:    [Search icon] [Wishlist heart] [Account person] [ES/EN toggle] [Cart bag + badge]
```

### Mega menú desplegable:
Cada link de la izquierda (Mujer, Hombre, Kids, Diseñadores) abre un panel al hacer hover:

**Panel Mujer/Hombre** (3 columnas):
- Col 1: Categorías (Vestidos, Tops, Sneakers, Bolsos, Accesorios, etc.) — links a /shop con filtro
- Col 2: Diseñadores destacados (Golden Goose, Saint Laurent, etc.) — links a /shop con filtro de marca
- Col 3: CTA editorial centrado ("Nueva temporada" / "Colección curada" + botón Explorar)

**Panel Diseñadores** (2 columnas):
- Col 1: 10 diseñadores destacados con font-weight bold
- Col 2: Lista A-Z COMPLETA de todos los diseñadores con scroll, agrupados por letra

### Comportamiento:
- El header es fixed, z-index alto
- Al hacer scroll > 80px: fondo con backdrop-blur, logo cambia a "BG"
- Al hacer scroll rápido hacia abajo > 120px: se oculta (translateY -100%)
- Al hacer scroll hacia arriba: reaparece
- Al hacer hover sobre un link del nav: se abre el mega menú correspondiente con animación
- Al salir del mega menú: se cierra con delay de 200ms

---

## 06. CATÁLOGO DE PRODUCTOS — 36 PRODUCTOS

### Golden Goose — Superstar (5 modelos)
1. Superstar Navy — $12,800 MXN — White/Navy — Milán, Italia — isNew
2. Superstar Red Star — $13,200 MXN — White/Red Star — Milán, Italia
3. Superstar Black — $13,500 MXN — Black/White Star — Milán, Italia
4. Superstar Silver Glitter — $14,200 MXN — White/Silver — Milán, Italia — women — isNew
5. Superstar Ice — $13,800 MXN — Ice/Grey — Milán, Italia — men

### Golden Goose — Ball Star (5 modelos)
6. Ball Star — $11,800 MXN — White/Grey — Milán, Italia
7. Ball Star Black Gold — $12,500 MXN — Black/Gold Star — Milán, Italia — isNew
8. Ball Star Nappa — $12,200 MXN — White/Tobacco — Milán, Italia — men
9. Ball Star Pink Glitter — $13,000 MXN — White/Pink — Milán, Italia — women
10. Ball Star Full Suede — $12,800 MXN — Sand Suede — Milán, Italia

### Sneakers de otros diseñadores (5)
11. Replica Sneakers — Maison Margiela — $15,200 — París, Francia
12. Open Sneakers — Valentino Garavani — $18,500 — Roma, Italia
13. Court Classic SL/06 — Saint Laurent — $16,800 — París, Francia
14. Oversized Sneaker — Alexander McQueen — $16,500 — Londres, UK — isNew
15. Out Of Office — Off-White — $14,800 — Milán, Italia

### Tarjeteros y Carteras (9)
16. Cassandre Card Holder — Saint Laurent — $6,800 — Noir
17. Monogram Bifold Wallet — Saint Laurent — $9,500 — Black
18. Four Stitch Card Holder — Maison Margiela — $5,900 — Black
19. Zip-Around Wallet — Maison Margiela — $12,500 — Black
20. Arrow Card Holder — Off-White — $5,200 — Black — isNew
21. Quote Bifold Wallet — Off-White — $8,900 — Black
22. Skull Card Holder — Alexander McQueen — $6,200 — Black
23. Skull Zip Wallet — Alexander McQueen — $11,500 — Black/Gold
24. Saint Sulpice Card Holder — Goyard — $8,900 — Navy Blue

### Ropa (5)
25. Teddy Jacket — Saint Laurent — $45,000 — Black/White — men
26. Cable-Knit Sweater — Ralph Lauren — $8,900 — Cream — men
27. Oversized Blazer — The Row — $38,000 — Black — women
28. Core Logo T-Shirt — Amiri — $7,200 — Black — men — isNew
29. Track Jacket — Palm Angels — $18,500 — Black/White — men

### Bolsos (3)
30. Le Bambino — Jacquemus — $16,200 — Light Brown — women — isNew
31. Cassette Bag — Bottega Veneta — $52,000 — Thunder — women
32. Loulou Small — Saint Laurent — $42,000 — Black/Gold — women

### Accesorios extra (4)
33. SL 01 Sunglasses — Saint Laurent — $7,200 — Shiny Black
34. Intrecciato Wallet — Bottega Veneta — $14,500 — Thunder Grey
35. GG Marmont Belt — Gucci — $12,800 — Black/Gold — isNew
### Próximas Funcionalidades (Roadmap)
- **Styling Edit / Outfit Builder**: Herramienta interactiva para que el usuario combine piezas y cree looks completos.

NOTA: Todos los precios están en MXN. La moneda se muestra como "$12,800" formateado con separador de miles.


---

## 07. DIRECTORIO DE DISEÑADORES — 71 marcas A-Z

Acne Studios, Alexander McQueen, Alexander Wang, AMI Paris, Amiri, Balenciaga, Balmain, Bottega Veneta, Brunello Cucinelli, Burberry, Casablanca, Celine, Chloé, Christian Louboutin, Comme des Garçons, Diesel, Dior, Dolce & Gabbana, DSQUARED2, Dries Van Noten, Etro, Fear of God, Fendi, Ferragamo, Givenchy, Golden Goose, Goyard, Gucci, Hermès, Hugo Boss, Isabel Marant, Issey Miyake, Jacquemus, JW Anderson, Kenzo, Kuboraum, Lanvin, Loewe, Loro Piana, Louis Vuitton, Maison Kitsuné, Maison Margiela, Marc Jacobs, Marni, Max Mara, Miu Miu, Moncler, Moschino, Nike x Off-White, New Balance, Off-White, Our Legacy, Palm Angels, Prada, Philipp Plein, Raf Simons, Ralph Lauren, Rick Owens, Roger Vivier, Saint Laurent, Salvatore Ferragamo, Sacai, Stone Island, Stussy, The Row, Thom Browne, Tom Ford, Tory Burch, Totême, Valentino, Versace, Vetements, Vivienne Westwood, Zegna

Diseñadores destacados (para mega menú y sección featured):
Golden Goose, Saint Laurent, Maison Margiela, Valentino Garavani, Goyard, Bottega Veneta, Alexander McQueen, Off-White, Jacquemus, The Row

---

## 08. CATEGORÍAS Y SUBCATEGORÍAS

### Mujer
Vestidos, Tops & Blusas, Pantalones, Faldas, Abrigos & Chamarras, Tejidos, Zapatos, Sneakers, Bolsos, Accesorios

### Hombre
Camisas, Playeras, Pantalones, Abrigos & Chamarras, Tejidos, Zapatos, Sneakers, Bolsos & Mochilas, Carteras & Tarjeteros, Accesorios

### Kids
Ropa, Zapatos, Accesorios

---

## 09. FUNCIONALIDAD DEL CARRITO

### Cart Store (Zustand con persist)
- items: array de CartItem (id, slug, name, brand, price, image, size, qty)
- add(item): agrega item o incrementa qty si ya existe con misma talla
- remove(id, size): elimina item
- updateQty(id, size, qty): actualiza cantidad, elimina si qty < 1
- clear(): vacía el carrito
- total(): calcula el total sumando price * qty
- count(): cuenta total de items

### Cart Drawer (componente CartDrawer.tsx)
- Se abre desde la derecha con animación (Framer Motion, spring)
- Backdrop con blur y opacity
- Estado vacío: icono de bolsa + texto "Vacío" + botón explorar
- Con items: lista con imagen, marca, nombre, talla, controles +/-, botón eliminar
- Footer: subtotal, botón "Proceder al pago", botón "Pedir por WhatsApp"
- WhatsApp genera mensaje automático con todos los items del carrito

### UI Store (Zustand, NO persist)
- cartOpen: boolean
- openCart(): abre el drawer
- closeCart(): cierra el drawer

### Flujo:
1. Usuario selecciona talla en ProductDetail
2. Click "Añadir al carrito"
3. Botón cambia a "Añadido ✓" (verde) por 1.2 segundos
4. Se abre el CartDrawer automáticamente
5. Usuario puede ajustar qty, eliminar, o ir a checkout
6. "Pedir por WhatsApp" genera mensaje con lista de productos + total

---

## 10. PÁGINAS COMPLETAS

### Home (/)
1. Hero centrado con imagen de moda B&W, título "By Goldenboy", subtítulo en itálica gold, botón "Discover Collection"
2. Marquee infinito de marcas con diamantes (◆) como separadores
3. Statement con comilla decorativa gigante semi-transparente
4. Sección de Shop con filtros por categoría + grid de productos
5. Garantías (01 Autenticidad, 02 Origen, 03 Envío)
6. Newsletter (input + botón)
7. Footer oscuro

### Shop (/shop)
- Header con label "Colección curada" + título "Piezas seleccionadas"
- Filtros: Todo | Calzado | Accesorios | Ropa | Bolsos
- Grid de productos (3 columnas desktop, 2 tablet, 1 mobile)

### Producto (/product/[slug])
- Layout de 2 columnas: imagen (fondo blanco) | info
- Info: origen, nombre, marca, precio, separador, descripción, color, selector de tallas, botón add to cart, botón WhatsApp, garantía + envío
- generateStaticParams con todos los slugs

### Carrito (/cart)
- Vista vacía con CTA a shop
- Lista de items con controles
- Sidebar sticky con resumen: subtotal, envío, total, botón checkout, botón WhatsApp

### About (/about) — 7 secciones para impresionar a un inversor
1. Hero con imagen B&W fullwidth + título "El estilo de vida que aspiras ya existe"
2. Misión — texto editorial grande
3. Cómo funciona — 3 pilares (Curaduría, Importación, Entrega) con números 01/02/03
4. Break editorial — imagen panorámica B&W con texto overlay
5. Métricas — 6+ países, 30+ boutiques, 100% auténticas, 48h envío
6. Marcas que importamos — grid de 12 marcas principales
7. Visión — sección con fondo negro, texto sobre futuro + mención Ecosistema 120+

### Contact (/contact)
1. Hero — "Hablemos"
2. Canales directos — WhatsApp (primario, respuesta <2h), Email (hola@bygoldenboy.com), Instagram (@bygoldenboy)
3. Formulario — nombre, email, tipo de consulta (dropdown), mensaje, botón enviar
4. FAQ — autenticidad, envíos, devoluciones, pedidos especiales

### Diseñadores (/designers)
1. Hero — "Diseñadores" + descripción
2. Grid de diseñadores destacados (10, en cards con hover gold)
3. Navegación por letra del alfabeto (click salta a la sección)
4. Lista completa A-Z agrupada por letra con contador de marcas

---

## 11. BILINGÜE (ES/EN)

- Idioma por defecto: español (es)
- Toggle de idioma en el navbar (muestra "EN" cuando está en español, "ES" cuando está en inglés)
- Middleware con locales: ["es", "en"], defaultLocale: "es"
- Todos los textos van en messages/es.json y messages/en.json
- Las descripciones de productos tienen campo { es: "...", en: "..." }
- Usar useTranslations() de next-intl en cada componente client
- Rutas: /es/... y /en/...

---

## 12. ANIMACIONES (Framer Motion + CSS)

- Componente Reveal.tsx: wrapper que anima opacity 0→1 y translateY 50→0 al entrar al viewport (IntersectionObserver)
- Hero: text reveal staggered (cada línea aparece con delay incremental)
- Marquee: animación CSS infinita (translateX 0 → -50%)
- Scroll indicator en el hero: línea que baja en loop (keyframes)
- Navbar hide/show en scroll (translateY)
- Mega menú: animación de height 0→auto con Framer Motion
- ProductCard: escala de imagen al hover (scale 1.06), borde gold aparece, tags slide up
- CartDrawer: spring animation desde la derecha (x: 100% → 0)
- Newsletter botón: hover cambia background de negro a gold

---

## 13. CONVENCIONES DE CÓDIGO

- Todos los componentes son "use client" (excepto layout que es server)
- Nomenclatura: PascalCase para componentes, camelCase para funciones/variables
- Imports con alias @/ (configurado en tsconfig paths)
- Tailwind: usar clamp() para responsive (font-size, padding)
- Colores: siempre usar las variables de brand (brand-gold, brand-black, etc.)
- Textos decorativos: 9px tracking-[6px] uppercase para labels/eyebrows
- Títulos grandes: font-display (Cormorant Garamond) font-light
- Body text: 13px text-brand-graphite leading-[1.85]
- Separadores: h-[0.5px] bg-brand-stone o bg-brand-gold
- Hover effects: transition-all duration-300 o duration-500
- Icons: SVG inline (no librerías externas), strokeWidth 1.2-1.3

---

## 14. RESPONSIVE

- Mobile first con breakpoints de Tailwind (sm, md, lg)
- Grid de productos: 1 col mobile, 2 cols tablet (sm), 3-4 cols desktop (lg)
- Navbar: en mobile los links About/Contact se ocultan (hidden sm:block)
- Mega menú: en mobile se convierte en acordeón o se desactiva
- Hero font sizes: usar clamp(mobileSize, vw, desktopSize)
- Cart drawer: width min(420px, 90vw) para no desbordar en mobile

---

## 15. COMANDOS

```bash
npm install          # Instalar dependencias
npm run dev          # Dev server en localhost:3000
npm run build        # Build de producción
npm run lint         # Linting
```

---

## 16. DEPLOY

- Target: Vercel
- Framework preset: Next.js
- Build command: next build
- Output directory: .next
- Environment variables: ninguna requerida por ahora
- Dominio: bygoldenboy.com

---

## 17. IMÁGENES DE PRODUCTO

Las imágenes van en public/images/products/ con estos nombres:
- gg-superstar-navy.jpg, gg-superstar-red.jpg, gg-superstar-black.jpg, etc.
- mm-replica.jpg, valentino-open.jpg, sl-court.jpg, amq-oversized.jpg, ow-ooo.jpg
- ysl-card-black.jpg, ysl-wallet.jpg, mm-card.jpg, mm-wallet.jpg, ow-card.jpg, etc.
- sl-teddy.jpg, rl-knit.jpg, row-blazer.jpg, amiri-tee.jpg, pa-track.jpg
- jacq-bambino.jpg, bv-cassette.jpg, sl-loulou.jpg
- sl-sun.jpg, bv-wallet.jpg, gucci-belt.jpg

Si no hay imágenes disponibles, usar placeholders con fondo blanco y texto del nombre del producto.

---

## 18. ORDEN DE CONSTRUCCIÓN (build route)

### Fase 1 — Fundación
1. Crear el proyecto con `npx create-next-app@14 bygoldenboy --typescript --tailwind --app`
2. Configurar tailwind.config.ts con colores brand y fuentes
3. Configurar next-intl (i18n.ts, middleware.ts, messages/)
4. Crear layout.tsx con fonts de Google
5. Crear globals.css con directivas Tailwind + custom styles

### Fase 2 — Componentes base
6. Crear Reveal.tsx (scroll animation wrapper)
7. Crear lib/products.ts con TODOS los 36 productos + DESIGNERS + CATEGORIES
8. Crear lib/cart.ts (Zustand store)
9. Crear lib/ui-store.ts (cart drawer state)
10. Crear lib/utils.ts (formatPrice, cn)

### Fase 3 — Navbar + Footer
11. Crear Navbar.tsx con mega menú Cettire-style (COMPONENTE MÁS IMPORTANTE)
12. Crear Footer.tsx
13. Crear CartDrawer.tsx completo

### Fase 4 — Home
14. Crear Hero.tsx (centrado, B&W background, text reveal)
15. Crear BrandMarquee.tsx
16. Crear Statement.tsx
17. Crear ShopSection.tsx + ProductCard.tsx
18. Crear Guarantees.tsx
19. Crear Newsletter.tsx
20. Crear page.tsx del home

### Fase 5 — Shop + Product
21. Crear shop/page.tsx
22. Crear ProductDetail.tsx (con selector de talla + add to cart + WhatsApp)
23. Crear product/[slug]/page.tsx con generateStaticParams

### Fase 6 — Cart
24. Crear CartPageContent.tsx (página completa de carrito)
25. Crear cart/page.tsx

### Fase 7 — About + Contact + Designers
26. Crear AboutContent.tsx (7 secciones editoriales)
27. Crear about/page.tsx
28. Crear ContactContent.tsx (canales + form + FAQ)
29. Crear contact/page.tsx
30. Crear DesignersContent.tsx (A-Z con alphabet nav)
31. Crear designers/page.tsx

### Fase 8 — Refinamiento
32. Verificar que TODAS las animaciones funcionen
33. Verificar responsive en mobile
34. Verificar que el carrito funcione end-to-end
35. Verificar que el toggle ES/EN funcione en todas las páginas
36. Verificar que el mega menú abra/cierre correctamente

---

## 19. NOTAS CRÍTICAS

- NUNCA uses fondo de color en las cards de producto. Siempre fondo blanco (#FFFFFF).
- NUNCA uses emojis en la UI del sitio.
- El gold (#C9A96E) es un acento, NO un color principal. Úsalo para labels, hovers, líneas decorativas.
- Los precios SIEMPRE se muestran en MXN formateados con separador de miles: $12,800
- Las imágenes de producto se muestran con object-fit: contain (NO cover) y max-width ~72%
- El hero SIEMPRE tiene la imagen en grayscale con opacity baja (0.12-0.15) y gradient overlay hacia el fondo
- La tipografía de títulos es Cormorant Garamond Light (300), NUNCA bold
- Los textos decorativos (labels/eyebrows) son SIEMPRE 9px, tracking 5-6px, uppercase, color gold
- El carrito se abre automáticamente después de añadir un producto (delay de 1.2 segundos)
- WhatsApp number: 5219999999999 (placeholder, cambiar después)

---

*Documento creado para By Goldenboy — Ecosistema 120+*
*Última actualización: Abril 2026*
