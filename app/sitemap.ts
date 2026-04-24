import { MetadataRoute } from 'next';
import { getProducts } from '@/lib/products';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://bygoldenboy.com';
  const locales = ['es', 'en'];
  
  // Base routes
  const routes = ['', '/shop', '/about', '/contact', '/designers', '/cart', '/styling'];
  
  const staticEntries: MetadataRoute.Sitemap = [];
  
  locales.forEach((locale) => {
    routes.forEach((route) => {
      staticEntries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: route === '' ? 1 : 0.8,
      });
    });
  });

  // Dynamic product routes
  const products = await getProducts();
  const productEntries: MetadataRoute.Sitemap = [];
  
  products.forEach((product) => {
    locales.forEach((locale) => {
      productEntries.push({
        url: `${baseUrl}/${locale}/product/${product.slug}`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.6,
      });
    });
  });

  return [...staticEntries, ...productEntries];
}
