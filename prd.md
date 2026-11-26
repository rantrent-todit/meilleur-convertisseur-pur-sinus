# PRD — meilleur-convertiseur-pur-sinus.fr

## 1. Contexte & Stratégie d'affiliation
Le site **meilleur-convertiseur-pur-sinus.fr** se concentre sur la niche des convertisseurs pur sinus.
- **Plateforme d'affiliation :** Amazon
- **Tag partenaire :** amazonwp0b-21
- **Audience cible :** Personnes recherchant des solutions pour convertir l'énergie en utilisant des convertisseurs pur sinus, généralement pour des besoins en énergies renouvelables, véhicules récréatifs, ou équipements électroniques sensibles.
- **Stratégie :** « Clic de curiosité »
  - Aucun prix affiché sur le site
  - Pas de panier ni de processus de commande
  - Un seul CTA par produit : **« Vérifiez le prix sur Amazon »**
  - Ce CTA redirige vers l'URL d'affiliation Amazon pour déposer le cookie de 24h
- **E-E-A-T :** Le site adopte un ton humain, transparent sur son modèle d'affiliation. Une page /a-propos/ (Histoire / Storytelling) renforce la confiance des visiteurs et les signaux E-E-A-T de Google.

## 2. Stratégie SEO & Technique
- **Mots-clés ciblés :** Requêtes « avis [modèle précis] »
- **Intention de recherche :** Achat et comparaison de produits
- **Hiérarchie des titres :** H1 unique par page — H2 sections — H3 sous-sections
- **Meta :** title et description uniques sur chaque page
- **Balises canoniques :** Chaque page déclare sa propre URL canonique dans le `<head>`
- **Open Graph & Twitter Cards :** Chaque page expose les métadonnées sociales (og:title, og:description, og:image, twitter:card)
- **Données structurées (JSON-LD) :** BreadcrumbList, Product (fiches — inclut le vendeur Amazon et l'URL canonique) et FAQPage (comparatifs optimisés)
- **Anti-Duplicate Content :** Les comparatifs sans contenu spécifique (/src/content/categories/) n'affichent pas de FAQ générique.
- **Maillage interne :** centralisé dans les templates ([slug].astro)
- **Slugs :** Toutes les URLs de catégories sont générées via une fonction `slugify()` robuste (suppression des accents, minuscules, remplacement des espaces par des tirets, retrait des caractères spéciaux)
- **Trailing slash :** `trailingSlash: 'always'` configuré dans `astro.config.mjs` (indispensable pour Apache / o2switch)

## 3. Structure du site
| Page | URL | Description |
|---|---|---|
| Accueil | / | Hero, avantages, grille produits, liens comparatifs |
| Listing avis | /avis/ | Grille de toutes les fiches produits |
| Fiche produit | /avis/[slug]/ | Avis complet, CTA Amazon, produits similaires |
| Listing comparatifs | /comparatifs/ | Grille de toutes les catégories détectées dynamiquement |
| Comparatif | /comparatifs/[slug]/ | Top 10 produits filtrés, contenu SEO optionnel |
| Guide d'achat | /guide-achat/ | Sections conseils, maillage interne |
| À propos | /a-propos/ | Histoire du site, storytelling, transparence affiliation (E-E-A-T) |
| Mentions légales | /mentions-legales/ | Infos légales et affiliation |
| 404 | /404/ | Erreur avec redirection |

### Système de Comparatifs Dynamiques :
Le site génère automatiquement une page pour chaque catégorie trouvée dans le frontmatter des produits.
- Si un fichier .md existe dans src/content/categories/[slug].md, le template utilise son titre SEO, son texte de présentation et sa FAQ spécifique.
- Si aucun fichier n'existe, le template génère une page standard avec la liste des produits pour éviter les pages vides tout en protégeant le SEO.

## 4. UI/UX & Design
- **Ligne de flottaison (desktop) :** Typographie et paddings réduits pour que les produits soient visibles above the fold sans scroll dès l'arrivée sur la page.
- **Sticky CTA mobile :** Sur les pages avis (/avis/[slug]/), un bouton « Vérifiez le prix sur Amazon » est fixé en bas d'écran (position: fixed) sur mobile.
- **Breadcrumb adaptatif :** Le fil d'Ariane supporte le retour à la ligne et tronque proprement les titres longs (text-ellipsis) pour éviter tout débordement sur mobile.
- **Identité visuelle recommandée :**
  - Palette : thème Slate & Blue (Tailwind)
  - Typographie : Plus Jakarta Sans (Google Fonts)
  - Composants : `rounded-3xl` pour les cartes produits et boutons CTA

## 5. Stack technique
| Élément | Choix |
|---|---|
| Framework | Astro 5 SSG (v5.18.0) |
| CSS | Tailwind CSS v3 + @tailwindcss/typography |
| Gestion de contenu | Content Collections Astro 5 avec glob loader |
| Serveur | Apache (o2switch) — .htaccess requis dans public/ |

### Fichiers clés
```
/
├── public/
│   ├── robots.txt
│   └── .htaccess              # Réécritures d'URLs Apache + redirection vers répertoires + ErrorDocument 404 /404.html
├── src/
│   ├── content/
│   │   ├── config.ts              # Schémas Produits et Catégories
│   │   ├── produits/              # Fiches produits .md
│   │   └── categories/            # Textes SEO des comparatifs .md
│   ├── layouts/
│   │   └── Layout.astro           # Head SEO (canonical, OG, Twitter Cards), header, footer
│   ├── components/
│   │   ├── BoutonAmazon.astro     # CTA Amazon
│   │   └── CarteApercu.astro      # Carte produit
│   └── pages/
│       ├── index.astro            # Accueil
│       ├── guide-achat.astro      # Guide d'achat
│       ├── a-propos.astro         # Histoire / Storytelling (E-E-A-T)
│       ├── mentions-legales.astro # Mentions
│       ├── 404.astro              # Erreur
│       ├── avis/
│       │   ├── index.astro        # Listing avis
│       │   └── [slug].astro       # Template fiche (inclut logs debug console.log des slugs générés)
│       └── comparatifs/
│           ├── index.astro        # Listing comparatifs
│           └── [slug].astro       # Template comparatif (inclut logs debug console.log des slugs générés)
├── astro.config.mjs               # trailingSlash: 'always'
├── tailwind.config.mjs
├── package.json
└── prd.md
```

### Schéma Frontmatter produit (src/content/config.ts)
```yaml
---
titre: ""               # Nom du modèle uniquement — SANS "Avis"
description_courte: ""  # ~160 caractères
description_longue: ""  # Paragraphe complet
image_url: ""           # URL image Amazon
lien_affiliation: ""    # https://www.amazon.fr/dp/[ASIN]/?tag=amazonwp0b-21
meta_title: ""          # Optionnel
meta_description: ""    # Optionnel
categories: [convertisseur 12v 220v pur sinus, convertisseur 24v 220v pur sinus, convertisseur 48v 220v pur sinus, convertisseur 12v 230v pur sinus, convertisseur 24v 220v 3000w pur sinus, convertisseur 12v 220v 2000w pur sinus, convertisseur 24v 220v 2000w pur sinus, convertisseur 12v 220v 1000w pur sinus, convertisseur 24v 220v 6000w pur sinus, convertisseur 12v 220v 6000w pur sinus, convertisseur 12v 220v 1500w pur sinus]          # [Liste des catégories fournies ici]
---
```

## 6. Directives de développement
- **Langue :** commentaires en français
- **CTA :** texte fixe « Vérifiez le prix sur Amazon »
- **Slugs :** Toujours générer les slugs de catégories via `slugify()` — jamais manuellement
- **Liens internes :** Toujours terminer les URLs internes par `/` (cohérence avec `trailingSlash: 'always'`)
- **Ton E-E-A-T :** Maintenir un ton humain et transparent sur le modèle d'affiliation dans tous les contenus textuels
- **Ajout d'un produit :** Créer le .md dans produits/. La catégorie associée sera automatiquement créée.
- **Optimisation d'un comparatif :** Créer un .md dans categories/ portant le nom du slug pour ajouter du texte riche et une FAQ.
- **Validation au build :** Vérifier les logs console durant `npm run build` pour s'assurer que tous les chemins statiques (slugs) sont correctement générés