export interface Product {
  id: number;
  slug: string;
  name: string;
  brand: string;
  price: number;
  color: string;
  origin: string;
  image: string;
  category: "calzado" | "accesorios" | "ropa" | "bolsos";
  subcategory: string;
  gender: "women" | "men" | "unisex";
  isNew: boolean;
  stock: number;
  description: {
    es: string;
    en: string;
  };
}

export const CATEGORIES = [
  { id: "all", label: { es: "Todo", en: "All" } },
  { id: "calzado", label: { es: "Calzado", en: "Footwear" } },
  { id: "accesorios", label: { es: "Accesorios", en: "Accessories" } },
  { id: "ropa", label: { es: "Ropa", en: "Clothing" } },
  { id: "bolsos", label: { es: "Bolsos", en: "Bags" } },
];

export const FEATURED_DESIGNERS = [
  "Golden Goose",
  "Saint Laurent",
  "Maison Margiela",
  "Valentino Garavani",
  "Goyard",
  "Bottega Veneta",
  "Alexander McQueen",
  "Off-White",
  "Jacquemus",
  "The Row"
];

export interface Designer {
  name: string;
  featured?: boolean;
}

export const DESIGNERS: Designer[] = [
  "Acne Studios", "Alexander McQueen", "Alexander Wang", "AMI Paris", "Amiri", "Balenciaga", "Balmain", "Bottega Veneta", "Brunello Cucinelli", "Burberry", "Casablanca", "Celine", "Chloé", "Christian Louboutin", "Comme des Garçons", "Diesel", "Dior", "Dolce & Gabbana", "DSQUARED2", "Dries Van Noten", "Etro", "Fear of God", "Fendi", "Ferragamo", "Givenchy", "Golden Goose", "Goyard", "Gucci", "Hermès", "Hugo Boss", "Isabel Marant", "Issey Miyake", "Jacquemus", "JW Anderson", "Kenzo", "Kuboraum", "Lanvin", "Loewe", "Loro Piana", "Louis Vuitton", "Maison Kitsuné", "Maison Margiela", "Marc Jacobs", "Marni", "Max Mara", "Miu Miu", "Moncler", "Moschino", "Nike x Off-White", "New Balance", "Off-White", "Our Legacy", "Palm Angels", "Prada", "Philipp Plein", "Raf Simons", "Ralph Lauren", "Rick Owens", "Roger Vivier", "Saint Laurent", "Salvatore Ferragamo", "Sacai", "Stone Island", "Stussy", "The Row", "Thom Browne", "Tom Ford", "Tory Burch", "Totême", "Valentino", "Versace", "Vetements", "Vivienne Westwood", "Zegna"
].map(name => ({
  name,
  featured: FEATURED_DESIGNERS.includes(name)
}));
