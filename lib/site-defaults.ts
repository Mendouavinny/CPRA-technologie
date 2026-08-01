import {
  BRAND_NAME,
  CONTACT_EMAIL,
  CONTACT_PHONE,
  CONTACT_PHONE_HREF,
  LEGAL_NAME,
  WHATSAPP_URL,
} from "@/lib/contact";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export type Product = {
  id: number;
  name: string;
  category: string;
  description: string;
  image: string;
  specs: string;
  usage: string;
  technical: string[];
};

export type ContactInfo = {
  brandName: string;
  legalName: string;
  email: string;
  phone: string;
  address: string;
  hours: string;
  website: string;
  whatsappUrl: string;
};

export type Formation = {
  id: number;
  title: string;
  category: string; // "Data & IA" | "Développement" | "Bureautique" | "Industrie"
  level: string; // Débutant / Intermédiaire / Avancé
  duration: string;
  mode: string; // Présentiel / En ligne / Hybride
  price: string;
  description: string;
  highlights: string[];
};

export type CareerOpening = {
  id: number;
  title: string;
  type: "Emploi" | "Stage";
  department: string;
  location: string;
  description: string;
};

export type JobApplication = {
  id: number | string;
  name: string;
  email: string;
  phone: string;
  type: string; // Emploi / Stage
  position: string;
  message: string;
  date: string;
};

export type SiteMessages = {
  announcement: string;
  formationIntro: string;
  aiIntro: string;
  careersIntro: string;
};

export type SiteState = {
  products: Product[];
  categories: string[];
  formations: Formation[];
  careerOpenings: CareerOpening[];
  applications: JobApplication[];
  contact: ContactInfo;
  messages: SiteMessages;
};

/* ------------------------------------------------------------------ */
/*  Default contact (seeded from lib/contact.ts)                       */
/* ------------------------------------------------------------------ */

export const DEFAULT_CONTACT: ContactInfo = {
  brandName: BRAND_NAME,
  legalName: LEGAL_NAME,
  email: CONTACT_EMAIL,
  phone: CONTACT_PHONE,
  address: "DOUALA-Bonaberi, Cameroun",
  hours: "Lun-Ven: 8h-17h",
  website: "www.cpratechnology.com",
  whatsappUrl: WHATSAPP_URL,
};

export function phoneHrefFrom(phone: string): string {
  const digits = phone.replace(/[^0-9+]/g, "");
  return digits ? `tel:${digits}` : CONTACT_PHONE_HREF;
}

/* ------------------------------------------------------------------ */
/*  Default editable messages                                          */
/* ------------------------------------------------------------------ */

export const DEFAULT_MESSAGES: SiteMessages = {
  announcement:
    "Nouveau : CPRA élargit ses activités à la Formation et aux Services d'Intelligence Artificielle & Data au Cameroun.",
  formationIntro:
    "Montez en compétences avec nos formations professionnelles en Data, Intelligence Artificielle, développement et industrie, animées par des experts et orientées vers l'emploi.",
  aiIntro:
    "Nous mettons l'Intelligence Artificielle et la Data au service des entreprises camerounaises : des solutions concrètes, rentables et adaptées aux réalités locales.",
  careersIntro:
    "Rejoignez CPRA TECHNOLOGY. Déposez votre candidature spontanée ou postulez à nos offres d'emploi et de stage en fonction des besoins de l'entreprise.",
};

/* ------------------------------------------------------------------ */
/*  Default formations                                                 */
/* ------------------------------------------------------------------ */

export const DEFAULT_FORMATIONS: Formation[] = [
  {
    id: 1,
    title: "Data Science & Python",
    category: "Data & IA",
    level: "Débutant",
    duration: "8 semaines",
    mode: "Hybride",
    price: "Sur devis",
    description:
      "Initiation complète à la science des données avec Python : manipulation de données, visualisation et premiers modèles.",
    highlights: ["Python & Pandas", "Visualisation de données", "Projets pratiques", "Certificat de fin de formation"],
  },
  {
    id: 2,
    title: "Machine Learning appliqué",
    category: "Data & IA",
    level: "Intermédiaire",
    duration: "10 semaines",
    mode: "Hybride",
    price: "Sur devis",
    description:
      "Concevez et déployez des modèles de Machine Learning pour résoudre des problèmes métiers réels.",
    highlights: ["Scikit-learn", "Modèles supervisés & non supervisés", "Évaluation de modèles", "Cas pratiques camerounais"],
  },
  {
    id: 3,
    title: "Intelligence Artificielle Générative & Prompt Engineering",
    category: "Data & IA",
    level: "Débutant",
    duration: "4 semaines",
    mode: "En ligne",
    price: "Sur devis",
    description:
      "Maîtrisez les IA génératives (ChatGPT, Claude, etc.) et le prompt engineering pour booster votre productivité.",
    highlights: ["IA génératives", "Rédaction de prompts", "Automatisation de tâches", "Cas d'usage entreprise"],
  },
  {
    id: 4,
    title: "Analyse de données avec Excel & Power BI",
    category: "Data & IA",
    level: "Débutant",
    duration: "5 semaines",
    mode: "Présentiel",
    price: "Sur devis",
    description:
      "Transformez vos données en tableaux de bord décisionnels clairs avec Excel avancé et Power BI.",
    highlights: ["Excel avancé", "Power BI", "Tableaux de bord", "KPI & reporting"],
  },
  {
    id: 5,
    title: "Développement Web (Front & Back)",
    category: "Développement",
    level: "Intermédiaire",
    duration: "12 semaines",
    mode: "Hybride",
    price: "Sur devis",
    description:
      "Apprenez à concevoir des applications web modernes de la maquette au déploiement.",
    highlights: ["HTML/CSS/JavaScript", "React & Next.js", "API & bases de données", "Projet portfolio"],
  },
  {
    id: 6,
    title: "Cybersécurité & Protection des données",
    category: "Développement",
    level: "Intermédiaire",
    duration: "6 semaines",
    mode: "Hybride",
    price: "Sur devis",
    description:
      "Protégez les systèmes et les données de votre organisation face aux cybermenaces.",
    highlights: ["Sécurité réseau", "Bonnes pratiques", "Gestion des incidents", "Sensibilisation"],
  },
  {
    id: 7,
    title: "Bureautique & Compétences numériques",
    category: "Bureautique",
    level: "Débutant",
    duration: "3 semaines",
    mode: "Présentiel",
    price: "Sur devis",
    description:
      "Renforcez vos compétences numériques essentielles pour le monde professionnel.",
    highlights: ["Word, Excel, PowerPoint", "Internet & email pro", "Collaboration en ligne", "Certificat"],
  },
  {
    id: 8,
    title: "Sécurité industrielle & Génie chimique (HSE)",
    category: "Industrie",
    level: "Intermédiaire",
    duration: "5 semaines",
    mode: "Présentiel",
    price: "Sur devis",
    description:
      "Formation aux procédés chimiques, à la manipulation des réactifs et aux normes HSE en milieu industriel.",
    highlights: ["Manipulation des réactifs", "Normes HSE", "Traitement des surfaces", "Sécurité des procédés"],
  },
];

/* ------------------------------------------------------------------ */
/*  Default career openings                                            */
/* ------------------------------------------------------------------ */

export const DEFAULT_CAREER_OPENINGS: CareerOpening[] = [
  {
    id: 1,
    title: "Data Analyst",
    type: "Emploi",
    department: "Service IA & Data",
    location: "Douala, Cameroun",
    description:
      "Analyser les données clients et produire des tableaux de bord décisionnels pour nos clients et partenaires.",
  },
  {
    id: 2,
    title: "Développeur IA / Machine Learning",
    type: "Emploi",
    department: "Service IA & Data",
    location: "Douala / Télétravail",
    description:
      "Concevoir et déployer des solutions d'Intelligence Artificielle sur mesure pour les entreprises locales.",
  },
  {
    id: 3,
    title: "Formateur Data & IA",
    type: "Emploi",
    department: "Formation",
    location: "Douala, Cameroun",
    description:
      "Animer des formations en Data Science, IA et outils numériques auprès de nos apprenants.",
  },
  {
    id: 4,
    title: "Technicien traitement des surfaces",
    type: "Emploi",
    department: "Industrie",
    location: "Douala-Bonaberi, Cameroun",
    description:
      "Réaliser les opérations de traitement et revêtement des surfaces dans le respect des normes HSE.",
  },
  {
    id: 5,
    title: "Stage - Annotation & préparation de données",
    type: "Stage",
    department: "Service IA & Data",
    location: "Douala / Télétravail",
    description:
      "Participer à la collecte, au nettoyage et à l'annotation de données pour nos projets d'IA.",
  },
  {
    id: 6,
    title: "Stage - Assistant commercial & marketing digital",
    type: "Stage",
    department: "Commercial",
    location: "Douala, Cameroun",
    description:
      "Soutenir les actions commerciales et la communication digitale de l'entreprise.",
  },
];

/* ------------------------------------------------------------------ */
/*  Default categories & products                                      */
/* ------------------------------------------------------------------ */

export const DEFAULT_CATEGORIES = [
  "Tous",
  "Acides",
  "Bases",
  "Solvants",
  "Sels",
  "Additifs",
  "Équipements",
  "Laboratoire",
  "EPI",
  "Traitement de surface",
  "Revêtement de surface",
  "Cosmétique",
];

export const DEFAULT_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Acide sulfurique H2SO4",
    category: "Acides",
    description: "Acide sulfurique concentré pour procédés industriels.",
    image: "/images/products/acide-sulfurique.jpg",
    specs: "98% | 25 L",
    usage: "Décapage, ajustement de pH, batteries et procédés chimiques.",
    technical: ["Qualité industrielle", "Conditionnement bidon", "Produit corrosif à manipuler avec EPI"],
  },
  {
    id: 2,
    name: "Acide chlorhydrique HCl",
    category: "Acides",
    description: "Solution d'acide chlorhydrique pour nettoyage et décapage.",
    image: "/images/products/acide-chlorhydrique.jpg",
    specs: "37% | 25 L",
    usage: "Décapage des métaux, nettoyage industriel et traitement de surface.",
    technical: ["Solution aqueuse", "Forte action décapante", "Stockage ventilé recommandé"],
  },
  {
    id: 3,
    name: "Acide phosphorique H3PO4",
    category: "Acides",
    description: "Acide phosphorique pour phosphatation et préparation de surfaces.",
    image: "/images/products/acide-phosphorique.jpg",
    specs: "85% | 25 L",
    usage: "Conversion chimique, traitement anticorrosion et préparation avant peinture.",
    technical: ["Haute concentration", "Compatible procédés de phosphatation", "Application industrielle"],
  },
  {
    id: 4,
    name: "Acide nitrique HNO3",
    category: "Acides",
    description: "Acide nitrique pour passivation et traitements chimiques contrôlés.",
    image: "/images/products/acide-nitrique.jpg",
    specs: "68% | 25 L",
    usage: "Passivation d'inox, attaque chimique et préparation de pièces métalliques.",
    technical: ["Oxydant puissant", "Utilisation sous contrôle strict", "EPI complets requis"],
  },
  {
    id: 5,
    name: "Acide acétique glacial",
    category: "Acides",
    description: "Acide organique concentré pour formulation et analyse.",
    image: "/images/products/acide-phosphorique.jpg",
    specs: "99% | 25 L",
    usage: "Formulation, nettoyage, ajustement de pH et réactif de laboratoire.",
    technical: ["Grade technique", "Liquide incolore", "Odeur piquante caractéristique"],
  },
  {
    id: 6,
    name: "Acide citrique",
    category: "Acides",
    description: "Acide faible polyvalent pour nettoyage, formulation et détartrage.",
    image: "/images/products/acide-nitrique.jpg",
    specs: "Anhydre | 25 kg",
    usage: "Détartrage, formulation hygiène, cosmétique et maintenance légère.",
    technical: ["Poudre cristalline", "Bonne solubilité dans l'eau", "Alternative douce pour nettoyage"],
  },
  {
    id: 7,
    name: "Soude caustique NaOH",
    category: "Bases",
    description: "Hydroxyde de sodium en perles pour dégraissage industriel.",
    image: "/images/products/soude-caustique.jpg",
    specs: "99% | 25 kg",
    usage: "Dégraissage, neutralisation, nettoyage alcalin et formulation.",
    technical: ["Perles solides", "Base forte", "Dissolution exothermique"],
  },
  {
    id: 8,
    name: "Potasse caustique KOH",
    category: "Bases",
    description: "Hydroxyde de potassium pour formulations industrielles.",
    image: "/images/products/potasse.jpg",
    specs: "90% | 25 kg",
    usage: "Savonnerie, dégraissage alcalin et procédés chimiques.",
    technical: ["Base forte", "Soluble dans l'eau", "Stockage au sec recommandé"],
  },
  {
    id: 9,
    name: "Ammoniaque NH4OH",
    category: "Bases",
    description: "Solution d'ammoniaque pour nettoyage industriel.",
    image: "/images/products/ammoniaque.jpg",
    specs: "25% | 25 L",
    usage: "Nettoyage, ajustement de pH et préparation de solutions techniques.",
    technical: ["Solution alcaline", "Vapeurs irritantes", "Utilisation en zone ventilée"],
  },
  {
    id: 10,
    name: "Acétone",
    category: "Solvants",
    description: "Solvant technique pour nettoyage et dégraissage rapide.",
    image: "/images/products/acetone.jpg",
    specs: "99,5% | 25 L",
    usage: "Dégraissage de pièces, nettoyage d'outillage et dilution contrôlée.",
    technical: ["Évaporation rapide", "Très inflammable", "Compatible nombreux procédés de nettoyage"],
  },
  {
    id: 11,
    name: "Acétonitrile",
    category: "Solvants",
    description: "Solvant courant pour laboratoire et industrie chimique.",
    image: "/images/products/acetone.jpg",
    specs: "HPLC/technique | 4-25 L",
    usage: "Chromatographie, extraction, synthèse et analyses de laboratoire.",
    technical: ["Solvant polaire aprotique", "Faible viscosité", "Utilisation analytique possible"],
  },
  {
    id: 12,
    name: "Alcool isopropylique IPA",
    category: "Solvants",
    description: "Solvant de nettoyage pour surfaces, équipements et composants.",
    image: "/images/products/ethanol.jpg",
    specs: "99% | 25 L",
    usage: "Nettoyage de surfaces, dégraissage léger et préparation avant revêtement.",
    technical: ["Séchage rapide", "Faible résidu", "Liquide inflammable"],
  },
  {
    id: 13,
    name: "Toluène",
    category: "Solvants",
    description: "Solvant industriel polyvalent pour formulation.",
    image: "/images/products/toluene.jpg",
    specs: "99% | 200 L",
    usage: "Peintures, résines, nettoyage spécialisé et procédés organiques.",
    technical: ["Solvant aromatique", "Pouvoir solvant élevé", "Manipulation ventilée"],
  },
  {
    id: 14,
    name: "Xylène",
    category: "Solvants",
    description: "Solvant aromatique pour peintures, vernis et nettoyage.",
    image: "/images/products/toluene.jpg",
    specs: "Technique | 25-200 L",
    usage: "Dilution de peintures, nettoyage de pièces et formulation industrielle.",
    technical: ["Mélange d'isomères", "Fort pouvoir dissolvant", "Inflammable"],
  },
  {
    id: 15,
    name: "Méthanol",
    category: "Solvants",
    description: "Alcool méthylique pour applications industrielles.",
    image: "/images/products/methanol.jpg",
    specs: "99,9% | 200 L",
    usage: "Synthèse, nettoyage technique, formulation et procédés chimiques.",
    technical: ["Alcool léger", "Très inflammable", "Toxicité élevée"],
  },
  {
    id: 16,
    name: "Éthanol industriel",
    category: "Solvants",
    description: "Éthanol dénaturé pour solvant et nettoyage.",
    image: "/images/products/ethanol.jpg",
    specs: "96% | 200 L",
    usage: "Nettoyage, désinfection technique, formulation et extraction.",
    technical: ["Liquide volatil", "Dénaturé", "Utilisation polyvalente"],
  },
  {
    id: 17,
    name: "Chlorure de sodium NaCl",
    category: "Sels",
    description: "Sel industriel haute pureté.",
    image: "/images/products/chlorure-sodium.jpg",
    specs: "99,5% | 25 kg",
    usage: "Préparation de solutions, traitement d'eau et procédés industriels.",
    technical: ["Granulométrie régulière", "Haute pureté", "Stockage au sec"],
  },
  {
    id: 18,
    name: "Permanganate de potassium",
    category: "Sels",
    description: "Réactif oxydant pour analyse et traitement.",
    image: "/images/products/sulfate-zinc.jpg",
    specs: "Cristaux | 1-25 kg",
    usage: "Traitement d'eau, analyses, oxydation et décontamination contrôlée.",
    technical: ["Oxydant fort", "Cristaux violets", "Dosage précis requis"],
  },
  {
    id: 19,
    name: "Sulfate de cuivre",
    category: "Sels",
    description: "Sel métallique pour applications chimiques et industrielles.",
    image: "/images/products/sulfate-zinc.jpg",
    specs: "98% | 25 kg",
    usage: "Traitement, formulation, galvanoplastie et usages analytiques.",
    technical: ["Sel hydraté", "Bonne solubilité", "À stocker à l'abri de l'humidité"],
  },
  {
    id: 20,
    name: "Sulfate de zinc ZnSO4",
    category: "Sels",
    description: "Sulfate de zinc pour traitement et galvanisation.",
    image: "/images/products/sulfate-zinc.jpg",
    specs: "98% | 25 kg",
    usage: "Bains de traitement, galvanisation et préparation de solutions au zinc.",
    technical: ["Poudre ou cristaux", "Source de zinc", "Usage industriel"],
  },
  {
    id: 21,
    name: "Phosphate de zinc",
    category: "Additifs",
    description: "Additif anticorrosion pour peintures et primaires.",
    image: "/images/products/phosphate-zinc.jpg",
    specs: "99% | 25 kg",
    usage: "Formulation de peintures anticorrosion et primaires métalliques.",
    technical: ["Pigment anticorrosion", "Compatible systèmes peinture", "Améliore la durabilité"],
  },
  {
    id: 22,
    name: "Inhibiteur de corrosion",
    category: "Additifs",
    description: "Additif de protection anticorrosion longue durée.",
    image: "/images/products/inhibiteur.jpg",
    specs: "25 L",
    usage: "Protection de circuits, pièces métalliques et systèmes industriels.",
    technical: ["Film protecteur", "Réduction de l'oxydation", "Dosage selon procédé"],
  },
  {
    id: 23,
    name: "Béchers, erlenmeyers et fioles",
    category: "Laboratoire",
    description: "Verrerie à usage général issue du tableau produit.",
    image: "/images/about/laboratory.jpg",
    specs: "50 ml à 5 L",
    usage: "Préparation, mélange, dilution et manipulation de solutions.",
    technical: ["Verre borosilicate selon disponibilité", "Volumes gradués", "Usage laboratoire et industrie"],
  },
  {
    id: 24,
    name: "Pipettes, burettes et éprouvettes",
    category: "Laboratoire",
    description: "Verrerie volumétrique pour dosage et mesure.",
    image: "/images/about/laboratory.jpg",
    specs: "Graduées et jaugées",
    usage: "Mesure précise de volumes, titrage et préparation analytique.",
    technical: ["Graduation lisible", "Formats laboratoire", "Nettoyage facile"],
  },
  {
    id: 25,
    name: "Agitateur magnétique",
    category: "Laboratoire",
    description: "Équipement de mélange pour solutions de laboratoire.",
    image: "/images/products/agitateur.jpg",
    specs: "Vitesse réglable",
    usage: "Agitation homogène de solutions, essais et formulation.",
    technical: ["Plateau robuste", "Réglage progressif", "Compatible barreaux aimantés"],
  },
  {
    id: 26,
    name: "pH-mètre digital",
    category: "Laboratoire",
    description: "Instrument de mesure pH haute précision.",
    image: "/images/products/ph-metre.jpg",
    specs: "0-14 pH",
    usage: "Contrôle de pH en laboratoire, traitement d'eau et procédés chimiques.",
    technical: ["Affichage digital", "Étalonnage requis", "Électrode remplaçable selon modèle"],
  },
  {
    id: 27,
    name: "Conductimètre",
    category: "Laboratoire",
    description: "Instrument de mesure de conductivité des solutions.",
    image: "/images/products/ph-metre.jpg",
    specs: "µS/cm - mS/cm",
    usage: "Contrôle d'eau, bains chimiques et qualité de solutions.",
    technical: ["Mesure rapide", "Sonde conductivité", "Compensation température selon modèle"],
  },
  {
    id: 28,
    name: "Balance de précision",
    category: "Laboratoire",
    description: "Balance analytique pour pesées de laboratoire.",
    image: "/images/products/balance.jpg",
    specs: "0,001 g",
    usage: "Dosage de réactifs, formulation et contrôle qualité.",
    technical: ["Haute précision", "Affichage digital", "Calibration recommandée"],
  },
  {
    id: 29,
    name: "Centrifugeuse",
    category: "Laboratoire",
    description: "Équipement de séparation pour échantillons et suspensions.",
    image: "/images/products/filtre.jpg",
    specs: "Paillasse | tubes",
    usage: "Séparation liquide/solide, préparation d'échantillons et analyses.",
    technical: ["Vitesse réglable", "Rotor selon capacité", "Sécurité couvercle selon modèle"],
  },
  {
    id: 30,
    name: "Étuve de séchage",
    category: "Équipements",
    description: "Étuve industrielle avec contrôle de température.",
    image: "/images/products/etuve-sechage.jpg",
    specs: "50-300 °C",
    usage: "Séchage d'échantillons, pièces, poudres et contrôles de laboratoire.",
    technical: ["Température réglable", "Chambre ventilée selon modèle", "Usage laboratoire et industrie"],
  },
  {
    id: 31,
    name: "Réacteur chimique",
    category: "Équipements",
    description: "Réacteur inox 316L avec agitation intégrée.",
    image: "/images/products/reacteur.jpg",
    specs: "100-5000 L",
    usage: "Mélange, synthèse, réaction contrôlée et production de lots.",
    technical: ["Inox 316L", "Agitation adaptée", "Capacité selon besoin"],
  },
  {
    id: 32,
    name: "Pompe chimique",
    category: "Équipements",
    description: "Pompe centrifuge résistante aux produits chimiques.",
    image: "/images/products/pompe.jpg",
    specs: "10-500 m³/h",
    usage: "Transfert de fluides chimiques, alimentation de lignes et recirculation.",
    technical: ["Matériaux compatibles chimie", "Débit selon modèle", "Maintenance accessible"],
  },
  {
    id: 33,
    name: "Cuve de stockage",
    category: "Équipements",
    description: "Cuve inox ou PEHD pour stockage chimique.",
    image: "/images/products/cuve.jpg",
    specs: "500-50000 L",
    usage: "Stockage sécurisé de réactifs, eaux de process et solutions préparées.",
    technical: ["Inox ou PEHD", "Capacité sur demande", "Accessoires possibles"],
  },
  {
    id: 34,
    name: "Gants en nitrile",
    category: "EPI",
    description: "Protection des mains pour solvants pétroliers, huiles et graisses.",
    image: "/images/services/maintenance.jpg",
    specs: "Tailles S-XL",
    usage: "Manipulation de solvants, produits chimiques et maintenance.",
    technical: ["Résistance chimique générale", "Bonne dextérité", "Usage laboratoire et atelier"],
  },
  {
    id: 35,
    name: "Gants en butyle",
    category: "EPI",
    description: "Protection maximale contre gaz toxiques, cétones et esters.",
    image: "/images/services/maintenance.jpg",
    specs: "Protection renforcée",
    usage: "Travaux exposés à des produits agressifs et vapeurs chimiques.",
    technical: ["Haute résistance", "Adaptés aux cétones", "Choix selon fiche de sécurité"],
  },
  {
    id: 36,
    name: "Lunettes de sécurité étanches",
    category: "EPI",
    description: "Protection contre projections liquides avec champ périphérique.",
    image: "/images/services/maintenance.jpg",
    specs: "Étanches | anti-projection",
    usage: "Travaux de laboratoire, décapage, dosage et manipulation de bains.",
    technical: ["Protection latérale", "Port avec masque possible", "Écran transparent"],
  },
  {
    id: 37,
    name: "Masque complet à cartouches",
    category: "EPI",
    description: "Protection du visage et des voies respiratoires.",
    image: "/images/services/maintenance.jpg",
    specs: "Cartouches selon gaz",
    usage: "Interventions en présence de gaz, vapeurs et aérosols chimiques.",
    technical: ["Protection visage complet", "Filtres remplaçables", "Sélection selon exposition"],
  },
  {
    id: 38,
    name: "Combinaison Type 3 ou 4",
    category: "EPI",
    description: "Protection du corps contre jets liquides et éclaboussures intenses.",
    image: "/images/services/maintenance.jpg",
    specs: "Type 3/4",
    usage: "Travaux exposés, nettoyage chimique et traitements de surface.",
    technical: ["Barrière liquide", "Usage intervention", "À associer aux gants et lunettes"],
  },
  {
    id: 39,
    name: "Nettoyage et sablage",
    category: "Traitement de surface",
    description: "Préparation des surfaces par élimination des souillures et oxydes.",
    image: "/images/services/traitement.jpg",
    specs: "Préparation surface",
    usage: "Préparer les pièces avant peinture, revêtement ou conversion chimique.",
    technical: ["Retrait graisses et calamines", "Améliore l'adhérence", "Adapté aux pièces métalliques"],
  },
  {
    id: 40,
    name: "Passivation et phosphatation",
    category: "Traitement de surface",
    description: "Conversion chimique pour adhérence peinture et résistance corrosion.",
    image: "/images/services/traitement.jpg",
    specs: "Zn | Mn | Inox",
    usage: "Traitement avant peinture, protection anticorrosion et finition technique.",
    technical: ["Modification de couche superficielle", "Meilleure tenue mécanique", "Procédé contrôlé"],
  },
  {
    id: 41,
    name: "Zingage et nickelage",
    category: "Traitement de surface",
    description: "Dépôt métallique par électrolyse pour protection ou propriétés spécifiques.",
    image: "/images/services/anticorrosion.jpg",
    specs: "Zn | Ni | Cr | Cu",
    usage: "Protection de pièces métalliques, amélioration d'aspect et anticorrosion.",
    technical: ["Traitement électrolytique", "Épaisseur contrôlable", "Finition selon cahier des charges"],
  },
  {
    id: 42,
    name: "Métallisation thermique",
    category: "Traitement de surface",
    description: "Projection de zinc ou aluminium en fusion pour protection anticorrosion.",
    image: "/images/services/anticorrosion.jpg",
    specs: "Flamme | arc électrique",
    usage: "Protection de grandes structures métalliques et ouvrages exposés.",
    technical: ["Couche épaisse", "Très bonne tenue extérieure", "Adapté aux structures industrielles"],
  },
  {
    id: 43,
    name: "Cémentation et nitruration",
    category: "Traitement de surface",
    description: "Traitement thermique pour dureté, usure et fatigue.",
    image: "/images/services/traitement.jpg",
    specs: "Sous vide possible",
    usage: "Améliorer la résistance mécanique de pièces techniques.",
    technical: ["Modification en profondeur", "Dureté accrue", "Réduction de l'usure"],
  },
  {
    id: 44,
    name: "Galvanisation à chaud",
    category: "Revêtement de surface",
    description: "Revêtement de zinc par immersion dans un bain de zinc fondu.",
    image: "/images/services/revetement.jpg",
    specs: "Immersion zinc",
    usage: "Protection cathodique de structures et pièces métalliques.",
    technical: ["Haute résistance aux chocs", "Protection longue durée", "Idéal extérieur"],
  },
  {
    id: 45,
    name: "Peinture industrielle époxy/PU",
    category: "Revêtement de surface",
    description: "Revêtement liquide appliqué au pistolet ou rouleau.",
    image: "/images/services/revetement.jpg",
    specs: "Époxy | polyuréthane",
    usage: "Protection esthétique et barrière étanche sur supports industriels.",
    technical: ["Bonne adhérence", "Finition personnalisable", "Barrière anticorrosion"],
  },
  {
    id: 46,
    name: "Thermolaquage poudre",
    category: "Revêtement de surface",
    description: "Application électrostatique de poudre thermodurcissable cuite au four.",
    image: "/images/services/revetement.jpg",
    specs: "Poudre cuite au four",
    usage: "Finition décorative et durable sans solvant.",
    technical: ["Aspect haute qualité", "Bonne résistance", "Procédé propre sans solvant"],
  },
  {
    id: 47,
    name: "Traitement duplex",
    category: "Revêtement de surface",
    description: "Association galvanisation et thermolaquage pour anticorrosion maximale.",
    image: "/images/services/anticorrosion.jpg",
    specs: "Galva + poudre",
    usage: "Protection renforcée en milieu marin, humide ou très exposé.",
    technical: ["Double barrière", "Durabilité élevée", "Adapté aux environnements sévères"],
  },
  {
    id: 48,
    name: "Revêtement PVD/CVD",
    category: "Revêtement de surface",
    description: "Dépôt physique ou chimique en phase vapeur en couches fines.",
    image: "/images/services/revetement.jpg",
    specs: "Couches minces",
    usage: "Augmenter dureté, résistance à l'usure et aspect décoratif.",
    technical: ["Très faible épaisseur", "Haute dureté", "Application pièces techniques"],
  },
  {
    id: 49,
    name: "Huiles et beurres cosmétiques",
    category: "Cosmétique",
    description: "Huiles végétales et beurres pour formulation cosmétique.",
    image: "/images/services/cosmetiques.jpg",
    specs: "Coco | olive | karité",
    usage: "Savons, crèmes, baumes, soins capillaires et produits d'hygiène.",
    technical: ["Matières premières naturelles", "Formats selon besoin", "Formulation personnalisée possible"],
  },
  {
    id: 50,
    name: "Tensioactifs doux et base lavante",
    category: "Cosmétique",
    description: "Ingrédients pour produits lavants et formulations d'hygiène.",
    image: "/images/services/cosmetiques.jpg",
    specs: "Base lavante",
    usage: "Gels douche, shampoings, savons liquides et nettoyants doux.",
    technical: ["Formulation cosmétique", "Compatible actifs doux", "Dosage selon recette"],
  },
];

export const DEFAULT_SITE_STATE: SiteState = {
  products: DEFAULT_PRODUCTS,
  categories: DEFAULT_CATEGORIES,
  formations: DEFAULT_FORMATIONS,
  careerOpenings: DEFAULT_CAREER_OPENINGS,
  applications: [],
  contact: DEFAULT_CONTACT,
  messages: DEFAULT_MESSAGES,
};
