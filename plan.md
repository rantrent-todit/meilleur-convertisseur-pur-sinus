# Plan de Développement : meilleur-convertiseur-pur-sinus.fr

Ce plan détaille les étapes de réalisation du site Astro 5 en suivant la stratégie d'affiliation Amazon "Clic de curiosité".

## 1. Initialisation du Projet
- [x] Initialiser le projet Astro 5 (`npm create astro@latest`)
    - [x] Choisir TypeScript (recommandé)
    - [x] Installer les dépendances : `tailwindcss`, `@astrojs/tailwind`, `@tailwindcss/typography`
- [x] Configurer `astro.config.mjs`
    - [x] `site: 'https://meilleur-convertiseur-pur-sinus.fr'`
    - [x] `trailingSlash: 'always'`
- [x] Configurer `tailwind.config.mjs` (via global.css pour Tailwind 4)
    - [x] Thème : Slate & Blue
    - [x] Border Radius : `rounded-3xl` par défaut
    - [x] Police : Plus Jakarta Sans (via `@fontsource` ou Google Fonts)
- [x] Créer la structure des dossiers dans `src/content/` : `produits/` et `categories/`
- [x] Créer le fichier `public/.htaccess` pour la gestion des redirections Apache (o2switch)

## 2. Configuration du Contenu (Content Collections)
- [x] Définir le schéma dans `src/content/config.ts`
    - [x] **Collection Produits** : titre, description_courte, description_longue, image_url, lien_affiliation, meta_title, meta_description, categories (array)
    - [x] **Collection Catégories** : titre_seo, texte_presentation, faq (JSON-LD compatible)
- [x] Créer une fonction utilitaire `slugify()` robuste dans `src/utils/slugify.ts`
    - [x] Suppression des accents, minuscules, tirets pour les espaces, retrait des caractères spéciaux

## 3. Architecture Layout & SEO
- [x] Créer `src/layouts/Layout.astro`
    - [x] Intégration des balises Meta (Title, Description) dynamiques
    - [x] Balise `<link rel="canonical" ... />` avec slash final
    - [x] Open Graph & Twitter Cards
    - [x] Script JSON-LD de base (BreadcrumbList)
    - [x] Header (Logo simple, Menu : Accueil, Avis, Comparatifs, Guide)
    - [x] Footer (Liens légaux, mention affiliation, E-E-A-T)

## 4. Composants UI (Design & UX)
- [x] `BoutonAmazon.astro` : CTA fixe "Vérifiez le prix sur Amazon"
- [x] `CarteApercu.astro` : Carte produit (Image, Titre, Description courte, CTA)
- [x] `Breadcrumb.astro` : Fil d'ariane adaptatif avec `text-ellipsis`
- [x] `StickyCTA.astro` : Bouton flottant mobile pour les pages avis

## 5. Développement des Pages
- [x] **Accueil (`index.astro`)** : Hero section, grille des derniers produits, liens vers catégories
- [x] **Listing Avis (`avis/index.astro`)** : Grille complète de tous les produits
- [x] **Fiche Produit (`avis/[slug].astro`)** :
    - [x] Affichage complet du test/avis
    - [x] CTA Amazon proéminent (sticky sur mobile)
    - [x] Section produits similaires
    - [x] Données structurées `Product` (JSON-LD)
- [x] **Listing Comparatifs (`comparatifs/index.astro`)** : Liste des catégories extraites dynamiquement des produits
- [x] **Template Comparatif (`comparatifs/[slug].astro`)** :
    - [x] Logique de filtrage des produits par catégorie
    - [x] Top 10 produits
    - [x] Récupération du contenu SEO si le fichier `.md` existe dans `categories/`
    - [x] Données structurées `FAQPage`
- [x] **Pages Statiques** :
    - [x] `guide-achat.astro`
    - [x] `a-propos.astro` (Storytelling E-E-A-T)
    - [x] `mentions-legales.astro`
    - [x] `404.astro`

## 6. Logique Métier & SEO Technique
- [x] Implémenter la génération dynamique des routes pour les catégories (basée sur les tags des produits)
- [x] Vérifier que chaque lien interne se termine par `/`
- [x] Ajouter les logs de debug dans `getStaticPaths` pour valider les slugs générés au build
- [x] Configurer `robots.txt` et ajouter `@astrojs/sitemap`

## 7. Contenu & Validation
- [x] Rédiger les premiers produits dans `src/content/produits/` (respecter le format YAML)
- [x] Rédiger les textes SEO pour les catégories principales dans `src/content/categories/`
- [x] Lancer `npm run build` et vérifier :
    - [x] Absence d'erreurs de build
    - [x] Structure des dossiers (index.html dans chaque sous-dossier pour le trailing slash)
    - [x] Validité du flux de données (les produits apparaissent dans les bonnes catégories)

## 8. Déploiement
- [x] Préparer le dossier `dist/` pour l'upload sur o2switch
- [x] Vérifier la configuration `.htaccess` (terminé)
- [x] Vérification finale du rendu mobile (Sticky CTA) (terminé)
