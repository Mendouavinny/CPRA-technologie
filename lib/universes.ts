export type Universe = {
  slug: string;
  name: string;
  label?: string; // nom de marque de la catégorie (CPRA JOB, CPRA CREATOR...)
  icon: string; // clé mappée vers une icône dans les composants
  image: string; // visuel de la carte / bannière
  tagline: string;
  description: string;
  offerings: string[];
  examples?: string[];
  special?: boolean; // univers "communautaire" (jeunes, créateurs, market)
};

export const UNIVERSES: Universe[] = [
  {
    slug: "particuliers",
    name: "Particuliers",
    icon: "home",
    image: "/images/services/maintenance.jpg",
    tagline: "Vos besoins du quotidien, au même endroit",
    description:
      "Trouvez des produits, des équipements et des services techniques pour votre maison. Nous vous mettons en relation avec des prestataires de confiance.",
    offerings: [
      "Produits & équipements",
      "Petits travaux & services techniques",
      "Produits d'entretien",
      "Équipements domestiques",
      "Demande de devis",
      "Livraison",
      "Mise en relation avec des prestataires",
    ],
  },
  {
    slug: "entreprises",
    name: "Entreprises",
    icon: "building",
    image: "/images/hero-industrial.jpg",
    tagline: "Votre espace professionnel d'approvisionnement",
    description:
      "Un espace B2B pour approvisionner votre activité. Publiez un besoin : nous consultons les fournisseurs et revenons vers vous avec la meilleure offre.",
    offerings: [
      "Rechercher des fournisseurs",
      "Demander plusieurs devis",
      "Acheter des équipements",
      "Commander des consommables",
      "Trouver des produits chimiques",
      "Demander maintenance / réparation",
      "Publier un besoin d'approvisionnement",
      "Trouver des équipements d'occasion",
    ],
  },
  {
    slug: "salons-de-beaute",
    name: "Salons de beauté",
    label: "BEAUTÉ & ESTHÉTIQUE",
    icon: "scissors",
    image: "/images/sectors/cosmetique.jpg",
    tagline: "Tout pour la beauté et l'esthétique",
    description:
      "Consommables, appareils professionnels et mobilier pour équiper et approvisionner votre salon.",
    offerings: [
      "Consommables beauté & esthétique",
      "Appareils professionnels",
      "Mobilier",
      "Produits d'hygiène",
      "Équipements d'occasion",
      "Maintenance",
      "Fournisseurs",
    ],
  },
  {
    slug: "sante",
    name: "Hôpitaux, cliniques & laboratoires",
    label: "SANTÉ & LABORATOIRE",
    icon: "health",
    image: "/images/about/laboratory.jpg",
    tagline: "Équiper et approvisionner les structures de santé",
    description:
      "Équipements médicaux et de laboratoire, consommables, réactifs et maintenance, avec devis institutionnels.",
    offerings: [
      "Équipements médicaux",
      "Équipements de laboratoire",
      "Consommables",
      "Réactifs",
      "Produits d'hygiène",
      "Maintenance",
      "Pièces de rechange",
      "Demandes de devis institutionnelles",
    ],
  },
  {
    slug: "hotels-restaurants",
    name: "Hôtels, restaurants & établissements",
    label: "HÔTELLERIE & RESTAURATION",
    icon: "horeca",
    image: "/images/sectors/agroalimentaire.jpg",
    tagline: "L'équipement et l'approvisionnement CHR",
    description:
      "Cuisine, blanchisserie, entretien et mobilier : tout l'approvisionnement des hôtels, restaurants et établissements.",
    offerings: [
      "Produits d'entretien",
      "Équipements de cuisine",
      "Équipements de blanchisserie",
      "Consommables",
      "Équipements électriques",
      "Mobilier",
      "Produits d'hygiène",
      "Maintenance",
    ],
  },
  {
    slug: "jeunes-etudiants",
    name: "Jeunes & Étudiants",
    label: "CPRA JOB & OPPORTUNITÉS",
    icon: "students",
    image: "/images/about/team.jpg",
    tagline: "Compétences, jobs, stages et projets",
    description:
      "Un espace pour proposer tes compétences, trouver des petits jobs et des stages, vendre tes services et publier tes projets.",
    offerings: [
      "Trouver des petits jobs",
      "Proposer ses compétences",
      "Trouver des stages",
      "Vendre ses services",
      "Publier ses projets",
      "Trouver des formations",
      "Rechercher du matériel d'occasion",
    ],
    examples: [
      "Étudiant en informatique — « Je propose la création de sites web à Douala. »",
      "Recherche stage — Technicien de laboratoire, Douala.",
    ],
    special: true,
  },
  {
    slug: "cpra-creator",
    name: "Influenceurs, TikTokeurs & créateurs",
    label: "CPRA CREATOR",
    icon: "creator",
    image: "/images/services/equipements.jpg",
    tagline: "Le marché des créateurs & des collaborations",
    description:
      "Le marché de collaboration entre entreprises et créateurs : proposez vos services, trouvez du matériel, des marques partenaires et des collaborations rémunérées.",
    offerings: [
      "Proposer ses services",
      "Rechercher du matériel vidéo",
      "Vendre du matériel d'occasion",
      "Trouver des marques partenaires",
      "Publier des annonces",
      "Rechercher des collaborations",
      "Promouvoir les produits des vendeurs",
    ],
    examples: [
      "Entreprise : recherche TikTokeur pour promouvoir un produit — Budget 75 000 FCFA · Douala · Profil : 10 000+ abonnés.",
    ],
    special: true,
  },
  {
    slug: "cpra-market",
    name: "Équipements & consommables d'occasion",
    label: "CPRA MARKET — OCCASION",
    icon: "market",
    image: "/images/products/reacteur.jpg",
    tagline: "La place de marché de l'occasion & du surplus",
    description:
      "Vendez ou trouvez du matériel d'occasion, neuf en surplus ou à réparer. Chaque annonce : photos, état, marque, modèle, année, prix, localisation. Nous centralisons les offres des vendeurs.",
    offerings: [
      "Machines & outillage",
      "Pompes, moteurs, groupes électrogènes",
      "Équipements de laboratoire",
      "Équipements de salon & hôteliers",
      "Matériel informatique",
      "Consommables neufs en surplus",
      "Pièces détachées",
      "Lots de fermeture / renouvellement d'entreprise",
    ],
    examples: [
      "🔵 NEUF   🟢 OCCASION   🟠 SURPLUS   🔴 À RÉPARER",
    ],
    special: true,
  },
];

export function getUniverse(slug: string): Universe | undefined {
  return UNIVERSES.find((u) => u.slug === slug);
}
