
import { getCollection } from 'astro:content';

export async function debugCollections() {
  const categories = await getCollection('categories');
  console.log("--- DEBUG CATEGORIES ---");
  categories.forEach(c => {
    console.log(`ID: "${c.id}" | Title: "${c.data.titre_seo}"`);
  });
  
  const produits = await getCollection('produits');
  const categoriesNoms = [...new Set(produits.flatMap(p => p.data.categories))];
  console.log("--- DEBUG SLUGS FROM PRODUCTS ---");
  categoriesNoms.forEach(nom => {
    // We need to import slugify but for a simple script we can mimic it
    const slug = nom.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
    console.log(`Nom: "${nom}" -> Slug: "${slug}"`);
  });
}
