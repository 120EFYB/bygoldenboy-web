import { cache } from "react";
import { getProductsFromSheet } from "./sheets";
import { Product } from "@/types/product";

// Revalidate data every hour (ISR)
export const revalidate = 3600;

/**
 * Static Fallback Products (used if Sheets API fails)
 */
const FALLBACK_PRODUCTS: Product[] = [
  // Golden Goose — Superstar
  {
    id: 1,
    slug: "gg-superstar-navy",
    name: "Superstar Navy",
    brand: "Golden Goose",
    price: 12800,
    color: "White/Navy",
    origin: "Milán, Italia",
    image: "/images/products/gg-superstar-navy.jpg",
    category: "calzado",
    subcategory: "Sneakers",
    gender: "unisex",
    isNew: true,
    stock: 15, description: {
      es: "Sneakers Superstar con estrella en azul marino y efecto desgastado artesanal.",
      en: "Superstar sneakers with navy blue star and handcrafted distressed effect."
    }
  },
  {
    id: 2,
    slug: "gg-superstar-red-star",
    name: "Superstar Red Star",
    brand: "Golden Goose",
    price: 13200,
    color: "White/Red Star",
    origin: "Milán, Italia",
    image: "/images/products/gg-superstar-red.jpg",
    category: "calzado",
    subcategory: "Sneakers",
    gender: "unisex",
    isNew: false, stock: 15, description: {
      es: "Las icónicas Superstar en cuero blanco con la estrella característica en rojo.",
      en: "Iconic Superstar in white leather with the signature star in red."
    }
  },
  {
    id: 3,
    slug: "gg-superstar-black",
    name: "Superstar Black",
    brand: "Golden Goose",
    price: 13500,
    color: "Black/White Star",
    origin: "Milán, Italia",
    image: "/images/products/gg-superstar-black.jpg",
    category: "calzado",
    subcategory: "Sneakers",
    gender: "unisex",
    isNew: false, stock: 15, description: {
      es: "Versión sofisticada en cuero negro con detalles en blanco y acabado vintage.",
      en: "Sophisticated version in black leather with white details and vintage finish."
    }
  },
  {
    id: 4,
    slug: "gg-superstar-silver-glitter",
    name: "Superstar Silver Glitter",
    brand: "Golden Goose",
    price: 14200,
    color: "White/Silver",
    origin: "Milán, Italia",
    image: "/images/products/gg-superstar-silver.jpg",
    category: "calzado",
    subcategory: "Sneakers",
    gender: "women",
    isNew: true,
    stock: 15, description: {
      es: "Sneakers con destellos plateados y purpurina, perfectas para un look elevado.",
      en: "Sneakers with silver sparkles and glitter, perfect for an elevated look."
    }
  },
  {
    id: 5,
    slug: "gg-superstar-ice",
    name: "Superstar Ice",
    brand: "Golden Goose",
    price: 13800,
    color: "Ice/Grey",
    origin: "Milán, Italia",
    image: "/images/products/gg-superstar-ice.jpg",
    category: "calzado",
    subcategory: "Sneakers",
    gender: "men",
    isNew: false, stock: 15, description: {
      es: "Tono hielo con detalles grises, una pieza versátil para el armario masculino.",
      en: "Ice tone with grey details, a versatile piece for the male wardrobe."
    }
  },
  {
    id: 6,
    slug: "gg-ball-star-white",
    name: "Ball Star",
    brand: "Golden Goose",
    price: 11800,
    category: "calzado",
    subcategory: "Sneakers",
    gender: "unisex",
    color: "White/Grey",
    origin: "Milán, Italia",
    image: "/images/products/gg-ball-star.jpg",
    isNew: false, stock: 15, description: {
      es: "Diseño inspirado en el baloncesto de los años 80 con espíritu contemporáneo.",
      en: "Design inspired by 1980s basketball with a contemporary spirit."
    }
  },
  {
    id: 7,
    slug: "gg-ball-star-black-gold",
    name: "Ball Star Black Gold",
    brand: "Golden Goose",
    price: 12500,
    category: "calzado",
    subcategory: "Sneakers",
    gender: "unisex",
    
    color: "Black/Gold Star",
    origin: "Milán, Italia",
    image: "/images/products/gg-ball-star-black-gold.jpg",
    isNew: false, stock: 15, description: {
      es: "Combinación de negro y oro que aporta un toque de lujo a la silueta clásica.",
      en: "Combination of black and gold that adds a touch of luxury to the classic silhouette."
    }
  },
  {
    id: 8,
    slug: "gg-ball-star-nappa",
    name: "Ball Star Nappa",
    brand: "Golden Goose",
    price: 12200,
    category: "calzado",
    subcategory: "Sneakers",
    gender: "men",
    color: "White/Tobacco",
    origin: "Milán, Italia",
    image: "/images/products/gg-ball-star-nappa.jpg",
    isNew: false, stock: 15, description: {
      es: "Cuero nappa suave con detalles en color tabaco para una comodidad premium.",
      en: "Soft nappa leather with tobacco-colored details for premium comfort."
    }
  },
  {
    id: 9,
    slug: "gg-ball-star-pink-glitter",
    name: "Ball Star Pink Glitter",
    brand: "Golden Goose",
    price: 13000,
    category: "calzado",
    subcategory: "Sneakers",
    gender: "women",
    color: "White/Pink",
    origin: "Milán, Italia",
    image: "/images/products/gg-ball-star-pink.jpg",
    isNew: false, stock: 15, description: {
      es: "Detalles en rosa brillante para una interpretación femenina y moderna.",
      en: "Pink glitter details for a feminine and modern interpretation."
    }
  },
  {
    id: 10,
    slug: "gg-ball-star-full-suede",
    name: "Ball Star Full Suede",
    brand: "Golden Goose",
    price: 12800,
    category: "calzado",
    subcategory: "Sneakers",
    gender: "unisex",
    color: "Sand Suede",
    origin: "Milán, Italia",
    image: "/images/products/gg-ball-star-suede.jpg",
    isNew: false, stock: 15, description: {
      es: "Completamente en ante color arena, textura suave y elegancia relajada.",
      en: "Fully in sand-colored suede, soft texture and relaxed elegance."
    }
  },
  {
    id: 11,
    slug: "mm-replica-sneakers",
    name: "Replica Sneakers",
    brand: "Maison Margiela",
    price: 15200,
    category: "calzado",
    subcategory: "Sneakers",
    gender: "unisex",
    color: "Classic White/Gum",
    origin: "París, Francia",
    image: "/images/products/mm-replica.jpg",
    isNew: false, stock: 15, description: {
      es: "Inspiradas en las zapatillas militares alemanas de los años 70.",
      en: "Inspired by 1970s German military sneakers."
    }
  },
  {
    id: 12,
    slug: "valentino-open-sneakers",
    name: "Open Sneakers",
    brand: "Valentino Garavani",
    price: 18500,
    category: "calzado",
    subcategory: "Sneakers",
    gender: "unisex",
    color: "White/Black Band",
    origin: "Roma, Italia",
    image: "/images/products/valentino-open.jpg",
    isNew: false, stock: 15, description: {
      es: "Sneakers minimalistas con una banda de color en contraste y tachuelas icónicas.",
      en: "Minimalist sneakers with a contrasting color band and iconic studs."
    }
  },
  {
    id: 13,
    slug: "ysl-court-classic",
    name: "Court Classic SL/06",
    brand: "Saint Laurent",
    price: 16800,
    category: "calzado",
    subcategory: "Sneakers",
    gender: "unisex",
    color: "Off-White/Gold",
    origin: "París, Francia",
    image: "/images/products/sl-court.jpg",
    isNew: false, stock: 15, description: {
      es: "Zapatillas de lona y cuero con el logo de Saint Laurent bordado.",
      en: "Canvas and leather sneakers with embroidered Saint Laurent logo."
    }
  },
  {
    id: 14,
    slug: "amq-oversized-sneaker",
    name: "Oversized Sneaker",
    brand: "Alexander McQueen",
    price: 16500,
    category: "calzado",
    subcategory: "Sneakers",
    gender: "unisex",
    
    color: "White/Black",
    origin: "Londres, UK",
    image: "/images/products/amq-oversized.jpg",
    isNew: false, stock: 15, description: {
      es: "Diseño con suela exagerada que se ha convertido en un básico del streetwear de lujo.",
      en: "Design with an exaggerated sole that has become a staple of luxury streetwear."
    }
  },
  {
    id: 15,
    slug: "ow-out-of-office",
    name: "Out Of Office",
    brand: "Off-White",
    price: 14800,
    category: "calzado",
    subcategory: "Sneakers",
    gender: "unisex",
    color: "White/Blue",
    origin: "Milán, Italia",
    image: "/images/products/ow-ooo.jpg",
    isNew: false, stock: 15, description: {
      es: "Sneakers de corte bajo que fusionan el estilo del baloncesto y el skate.",
      en: "Low-top sneakers merging basketball and skate styles."
    }
  },
  {
    id: 16,
    slug: "ysl-cassandre-card-holder",
    name: "Cassandre Card Holder",
    brand: "Saint Laurent",
    price: 6800,
    category: "accesorios",
    subcategory: "Carteras y Tarjeteros",
    gender: "unisex",
    color: "Noir",
    origin: "París, Francia",
    image: "/images/products/ysl-card-black.jpg",
    isNew: false, stock: 15, description: {
      es: "Tarjetero de cuero granulado con el icónico logo YSL entrelazado.",
      en: "Grained leather card holder with the iconic interlocking YSL logo."
    }
  },
  {
    id: 17,
    slug: "ysl-monogram-bifold",
    name: "Monogram Bifold Wallet",
    brand: "Saint Laurent",
    price: 9500,
    category: "accesorios",
    subcategory: "Carteras y Tarjeteros",
    gender: "unisex",
    color: "Black",
    origin: "París, Francia",
    image: "/images/products/ysl-wallet.jpg",
    isNew: false, stock: 15, description: {
      es: "Cartera plegable con el monograma de Saint Laurent en herrajes metálicos.",
      en: "Bifold wallet with Saint Laurent monogram in metallic hardware."
    }
  },
  {
    id: 18,
    slug: "mm-four-stitch-card-holder",
    name: "Four Stitch Card Holder",
    brand: "Maison Margiela",
    price: 5900,
    category: "accesorios",
    subcategory: "Carteras y Tarjeteros",
    gender: "unisex",
    color: "Black",
    origin: "París, Francia",
    image: "/images/products/mm-card.jpg",
    isNew: false, stock: 15, description: {
      es: "Minimalismo absoluto con las icónicas cuatro costuras blancas de la marca.",
      en: "Absolute minimalism featuring the brand's iconic four white stitches."
    }
  },
  {
    id: 19,
    slug: "mm-zip-around-wallet",
    name: "Zip-Around Wallet",
    brand: "Maison Margiela",
    price: 12500,
    category: "accesorios",
    subcategory: "Carteras y Tarjeteros",
    gender: "unisex",
    color: "Black",
    origin: "París, Francia",
    image: "/images/products/mm-wallet.jpg",
    isNew: false, stock: 15, description: {
      es: "Cartera con cremallera completa, funcional y con el estilo vanguardista de Margiela.",
      en: "Full zip-around wallet, functional and in Margiela's avant-garde style."
    }
  },
  {
    id: 20,
    slug: "ow-arrow-card-holder",
    name: "Arrow Card Holder",
    brand: "Off-White",
    price: 5200,
    category: "accesorios",
    subcategory: "Carteras y Tarjeteros",
    gender: "unisex",
    
    color: "Black",
    origin: "Milán, Italia",
    image: "/images/products/ow-card.jpg",
    isNew: false, stock: 15, description: {
      es: "Tarjetero de cuero con el logo de flechas característico de Off-White.",
      en: "Leather card holder featuring Off-White's signature arrows logo."
    }
  },
  {
    id: 21,
    slug: "ow-quote-bifold",
    name: "Quote Bifold Wallet",
    brand: "Off-White",
    price: 8900,
    category: "accesorios",
    subcategory: "Carteras y Tarjeteros",
    gender: "unisex",
    color: "Black",
    origin: "Milán, Italia",
    image: "/images/products/ow-wallet-quote.jpg",
    isNew: false, stock: 15, description: {
      es: "Cartera con las famosas comillas decorativas de Virgil Abloh.",
      en: "Wallet featuring Virgil Abloh's famous decorative quotes."
    }
  },
  {
    id: 22,
    slug: "amq-skull-card-holder",
    name: "Skull Card Holder",
    brand: "Alexander McQueen",
    price: 6200,
    category: "accesorios",
    subcategory: "Carteras y Tarjeteros",
    gender: "unisex",
    color: "Black",
    origin: "Londres, UK",
    image: "/images/products/amq-card.jpg",
    isNew: false, stock: 15, description: {
      es: "Cuero de alta calidad con el detalle de calavera gótica en relieve.",
      en: "High-quality leather with embossed gothic skull detail."
    }
  },
  {
    id: 23,
    slug: "amq-skull-zip-wallet",
    name: "Skull Zip Wallet",
    brand: "Alexander McQueen",
    price: 11500,
    category: "accesorios",
    subcategory: "Carteras y Tarjeteros",
    gender: "unisex",
    color: "Black/Gold",
    origin: "Londres, UK",
    image: "/images/products/amq-zip-wallet.jpg",
    isNew: false, stock: 15, description: {
      es: "Cartera con cremallera y herrajes dorados en forma de calavera.",
      en: "Zip wallet with gold-toned skull hardware."
    }
  },
  {
    id: 24,
    slug: "goyard-st-sulpice",
    name: "Saint Sulpice Card Holder",
    brand: "Goyard",
    price: 8900,
    category: "accesorios",
    subcategory: "Carteras y Tarjeteros",
    gender: "unisex",
    color: "Navy Blue",
    origin: "París, Francia",
    image: "/images/products/goyard-card-navy.jpg",
    isNew: false, stock: 15, description: {
      es: "El clásico tarjetero con el icónico patrón Goyardine en color azul marino.",
      en: "The classic card holder with the iconic Goyardine pattern in navy blue."
    }
  },
  {
    id: 25,
    slug: "ysl-teddy-jacket",
    name: "Teddy Jacket",
    brand: "Saint Laurent",
    price: 45000,
    category: "ropa",
    subcategory: "Chamarras",
    gender: "men",
    color: "Black/White",
    origin: "París, Francia",
    image: "/images/products/sl-teddy.jpg",
    isNew: false, stock: 15, description: {
      es: "Chaqueta estilo varsity que encarna el rock'n'roll chic de Saint Laurent.",
      en: "Varsity-style jacket embodying Saint Laurent's rock'n'roll chic."
    }
  },
  {
    id: 26,
    slug: "rl-cable-knit-sweater",
    name: "Cable-Knit Sweater",
    brand: "Ralph Lauren",
    price: 8900,
    category: "ropa",
    subcategory: "Prendas de punto y Sweaters",
    gender: "men",
    color: "Cream",
    origin: "USA",
    image: "/images/products/rl-knit.jpg",
    isNew: false, stock: 15, description: {
      es: "Suéter de punto de ochos clásico y atemporal, un básico de lujo.",
      en: "Classic and timeless cable-knit sweater, a luxury staple."
    }
  },
  {
    id: 27,
    slug: "row-oversized-blazer",
    name: "Oversized Blazer",
    brand: "The Row",
    price: 38000,
    category: "ropa",
    subcategory: "Chamarras",
    gender: "women",
    color: "Black",
    origin: "USA",
    image: "/images/products/row-blazer.jpg",
    isNew: false, stock: 15, description: {
      es: "Sastrería impecable con un corte oversized moderno y elegante.",
      en: "Impeccable tailoring with a modern and elegant oversized cut."
    }
  },
  {
    id: 28,
    slug: "amiri-core-logo-tee",
    name: "Core Logo T-Shirt",
    brand: "Amiri",
    price: 7200,
    category: "ropa",
    subcategory: "Camisetas (T-shirts)",
    gender: "men",
    
    color: "Black",
    origin: "USA",
    image: "/images/products/amiri-tee.jpg",
    isNew: false, stock: 15, description: {
      es: "Playera de algodón premium con el logo core de Amiri en el pecho.",
      en: "Premium cotton T-shirt with Amiri's core logo on the chest."
    }
  },
  {
    id: 29,
    slug: "pa-track-jacket",
    name: "Track Jacket",
    brand: "Palm Angels",
    price: 18500,
    category: "ropa",
    subcategory: "Trajes deportivos",
    gender: "men",
    color: "Black/White",
    origin: "Milán, Italia",
    image: "/images/products/pa-track.jpg",
    isNew: false, stock: 15, description: {
      es: "Chaqueta de chándal con las icónicas bandas laterales y logo gótico.",
      en: "Track jacket with iconic side stripes and gothic logo."
    }
  },
  {
    id: 30,
    slug: "jacq-le-bambino",
    name: "Le Bambino",
    brand: "Jacquemus",
    price: 16200,
    category: "bolsos",
    subcategory: "Bolsos de mano",
    gender: "women",
    
    color: "Light Brown",
    origin: "Francia",
    image: "/images/products/jacq-bambino.jpg",
    isNew: false, stock: 15, description: {
      es: "Bolso de mano estructurado con proporciones minimalistas y logo dorado.",
      en: "Structured handbag with minimalist proportions and gold logo."
    }
  },
  {
    id: 31,
    slug: "bv-cassette-bag",
    name: "Cassette Bag",
    brand: "Bottega Veneta",
    price: 52000,
    category: "bolsos",
    subcategory: "Bolsos de mano",
    gender: "women",
    color: "Thunder",
    origin: "Italia",
    image: "/images/products/bv-cassette.jpg",
    isNew: false, stock: 15, description: {
      es: "Piel tejida con la técnica Intrecciato en una silueta acolchada y moderna.",
      en: "Intrecciato woven leather in a padded and modern silhouette."
    }
  },
  {
    id: 32,
    slug: "ysl-loulou-small",
    name: "Loulou Small",
    brand: "Saint Laurent",
    price: 42000,
    category: "bolsos",
    subcategory: "Bolsos de mano",
    gender: "women",
    color: "Black/Gold",
    origin: "París, Francia",
    image: "/images/products/sl-loulou.jpg",
    isNew: false, stock: 15, description: {
      es: "Bolso de piel acolchada con costuras en forma de Y y herrajes Cassandre.",
      en: "Padded leather bag with Y-shaped quilting and Cassandre hardware."
    }
  },
  {
    id: 33,
    slug: "ysl-sl-01-sun",
    name: "SL 01 Sunglasses",
    brand: "Saint Laurent",
    price: 7200,
    category: "accesorios",
    subcategory: "Gafas de sol",
    gender: "unisex",
    color: "Shiny Black",
    origin: "Italia",
    image: "/images/products/sl-sun.jpg",
    isNew: false, stock: 15, description: {
      es: "Gafas de sol de acetato con forma rectangular de inspiración retro.",
      en: "Acetate sunglasses with retro-inspired rectangular shape."
    }
  },
  {
    id: 34,
    slug: "bv-intrecciato-wallet",
    name: "Intrecciato Wallet",
    brand: "Bottega Veneta",
    price: 14500,
    category: "accesorios",
    subcategory: "Carteras y Tarjeteros",
    gender: "unisex",
    color: "Thunder Grey",
    origin: "Italia",
    image: "/images/products/bv-wallet.jpg",
    isNew: false, stock: 15, description: {
      es: "Cartera de piel con el icónico tejido Intrecciato, elegancia discreta.",
      en: "Leather wallet featuring the iconic Intrecciato weave, discreet elegance."
    }
  },
  {
    id: 35,
    slug: "gucci-gg-marmont-belt",
    name: "GG Marmont Belt",
    brand: "Gucci",
    price: 12800,
    category: "accesorios",
    subcategory: "Cinturones",
    gender: "unisex",
    
    color: "Black/Gold",
    origin: "Italia",
    image: "/images/products/gucci-belt.jpg",
    isNew: false, stock: 15, description: {
      es: "Cinturón de cuero suave con la hebilla de doble G en metal envejecido.",
      en: "Smooth leather belt with double G buckle in aged metal."
    }
  }
];

/**
 * Consolidated product fetcher
 * Prioritizes Google Sheets and falls back to hardcoded data
 */
export const getProducts = cache(async () => {
  try {
    const sheetProducts = await getProductsFromSheet();
    if (sheetProducts && sheetProducts.length > 0) {
      return sheetProducts;
    }
    return FALLBACK_PRODUCTS;
  } catch (error) {
    console.error("Using fallback products due to fetch error:", error);
    return FALLBACK_PRODUCTS;
  }
});
