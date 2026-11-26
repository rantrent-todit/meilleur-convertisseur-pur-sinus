export interface SiteConfig {
  siteName: string;
  siteDomain: string;
  tagline: string;
  description: string;
  contactEmail: string;
  // Métadonnées SEO prioritaires (optimisation mot-clé "Meilleur", sans branding)
  primaryKeyword?: string;
  homeSeoTitle?: string;
  homeH1?: string;
  homeTagline?: string;
  homeDescription?: string;
  affiliate: {
    amazonTag: string;
    disclaimer: string;
  };
  theme: {
    primaryColor: string;
    primaryHoverColor: string;
    accentColor: string;
  };
}

export const siteConfig: SiteConfig = {
  siteName: "PurSinus Expert",
  siteDomain: "https://meilleur-convertisseur-pur-sinus.fr",
  tagline: "Le guide d'achat et comparatif indépendant des convertisseurs pur sinus",
  description: "Comparez les meilleurs convertisseurs pur sinus 12V, 24V et 48V : tests, avis d'experts, puissance et rendement pour votre van, camping-car ou installation solaire.",
  contactEmail: "contact@meilleur-convertisseur-pur-sinus.fr",
  primaryKeyword: "Meilleur convertisseur pur sinus",
  homeSeoTitle: "Meilleur convertisseur pur sinus : Comparatif, Tests & Guide",
  homeH1: "Meilleur convertisseur pur sinus",
  homeTagline: "Le comparatif indépendant et nos tests vérifiés",
  homeDescription: "Quel est le meilleur convertisseur pur sinus ? Retrouvez notre comparatif indépendant, nos tests vérifiés et notre guide d'achat complet.",
  affiliate: {
    amazonTag: "amazonwp0b-21",
    disclaimer: "En tant que Partenaire Amazon, ce site réalise un bénéfice sur les achats remplissant les conditions requises."
  },
  theme: {
    primaryColor: "#0284c7",
    primaryHoverColor: "#0369a1",
    accentColor: "#f59e0b"
  }
};
