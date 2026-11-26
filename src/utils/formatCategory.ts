/**
 * Formate algorithmiquement un slug de catégorie en libellé français propre sans tirets.
 * Exemples :
 * - "convertisseur-12v-220v-pur-sinus" -> "Convertisseur 12V 220V Pur Sinus"
 * - "convertisseur-pur-sinus-camping-car" -> "Convertisseur Pur Sinus Camping-Car"
 * - "convertisseur-24v-220v-3000w-pur-sinus" -> "Convertisseur 24V 220V 3000W Pur Sinus"
 */
export function formatCategoryLabel(slug: string): string {
  if (!slug) return '';
  return slug
    .split('-')
    .map(word => {
      if (/^\d+v$/i.test(word) || /^\d+w$/i.test(word) || /^\d+va$/i.test(word)) {
        return word.toUpperCase();
      }
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ')
    .replace(/\bCamping Car\b/gi, 'Camping-Car');
}
