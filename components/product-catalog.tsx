"use client";

import { type KeyboardEvent, useState } from "react";
import Image from "next/image";
import {
  ChevronRight,
  FileText,
  Info,
  Search,
  ShoppingCart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { BRAND_NAME, buildMailtoUrl } from "@/lib/contact";

type Product = {
  id: number;
  name: string;
  category: string;
  description: string;
  image: string;
  specs: string;
  usage: string;
  technical: string[];
};

const categories = [
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

const products: Product[] = [
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

function buildProductMailto(product: Product, intent: "devis" | "commande") {
  const isOrder = intent === "commande";
  const subject = `${isOrder ? "Commande" : "Demande de devis"} - ${product.name}`;
  const body = [
    `Bonjour ${BRAND_NAME},`,
    "",
    `Je souhaite ${isOrder ? "commander" : "recevoir un devis pour"} le produit suivant :`,
    "",
    `Produit : ${product.name}`,
    `Catégorie : ${product.category}`,
    `Caractéristiques : ${product.specs}`,
    `Utilisation prévue : ${product.usage}`,
    "",
    "Quantité souhaitée :",
    "Entreprise :",
    "Nom :",
    "Téléphone :",
    "Adresse de livraison :",
    "",
    "Merci.",
  ].join("\n");

  return buildMailtoUrl(subject, body);
}

export function ProductCatalog() {
  const [activeCategory, setActiveCategory] = useState("Tous");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts = products.filter((product) => {
    const query = searchQuery.toLowerCase();
    const matchesCategory =
      activeCategory === "Tous" || product.category === activeCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query) ||
      product.usage.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });

  const showAllProducts = () => {
    setActiveCategory("Tous");
    setSearchQuery("");
  };

  const handleCardKeyDown = (
    event: KeyboardEvent<HTMLDivElement>,
    product: Product
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setSelectedProduct(product);
    }
  };

  return (
    <section id="catalogue" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            Catalogue
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-foreground">
            Réactifs, équipements & surfaces
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Découvrez une gamme enrichie de produits chimiques, équipements,
            EPI, traitements et revêtements de surface.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Rechercher un produit..."
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              className="pl-10 bg-card border-border text-foreground placeholder:text-muted-foreground"
            />
          </div>

          <div className="sm:hidden">
            <select
              value={activeCategory}
              onChange={(event) => setActiveCategory(event.target.value)}
              className="w-full px-4 py-2 rounded-md bg-card border border-border text-foreground"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="hidden sm:flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              onClick={() => setActiveCategory(category)}
              className={
                activeCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "border-border text-foreground hover:bg-secondary"
              }
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              role="button"
              tabIndex={0}
              aria-label={`Voir les détails de ${product.name}`}
              onClick={() => setSelectedProduct(product)}
              onKeyDown={(event) => handleCardKeyDown(event, product)}
              className="group bg-card rounded-lg overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <div className="relative h-48 bg-secondary/50 overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-2 right-2 px-2 py-1 rounded text-xs font-medium bg-primary/90 text-primary-foreground">
                  {product.category}
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-card-foreground group-hover:text-primary transition-colors line-clamp-1">
                  {product.name}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                  {product.description}
                </p>
                <div className="mt-3 flex items-center justify-between gap-3">
                  <span className="text-xs text-primary font-medium bg-primary/10 px-2 py-1 rounded">
                    {product.specs}
                  </span>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-primary hover:text-primary hover:bg-primary/10"
                    onClick={(event) => {
                      event.stopPropagation();
                      setSelectedProduct(product);
                    }}
                  >
                    <Info className="h-4 w-4" />
                    Détails
                  </Button>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <Button
                    asChild
                    size="sm"
                    variant="outline"
                    className="border-border text-foreground hover:bg-secondary"
                    onClick={(event) => event.stopPropagation()}
                  >
                    <a href={buildProductMailto(product, "devis")}>
                      <FileText className="h-4 w-4" />
                      Devis
                    </a>
                  </Button>
                  <Button
                    asChild
                    size="sm"
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                    onClick={(event) => event.stopPropagation()}
                  >
                    <a href={buildProductMailto(product, "commande")}>
                      <ShoppingCart className="h-4 w-4" />
                      Commander
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="py-16 text-center text-muted-foreground">
            Aucun produit ne correspond à votre recherche.
          </div>
        )}

        <div className="mt-12 text-center">
          <Button
            size="lg"
            variant="outline"
            onClick={showAllProducts}
            className="border-border text-foreground hover:bg-secondary gap-2"
          >
            Voir tout le catalogue
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <Dialog
        open={Boolean(selectedProduct)}
        onOpenChange={(open) => {
          if (!open) setSelectedProduct(null);
        }}
      >
        {selectedProduct && (
          <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-4xl">
            <div className="grid gap-6 md:grid-cols-[260px_1fr]">
              <div className="relative h-64 md:h-full min-h-64 rounded-lg overflow-hidden bg-secondary">
                <Image
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="space-y-6">
                <DialogHeader>
                  <div className="text-sm font-medium text-primary">
                    {selectedProduct.category}
                  </div>
                  <DialogTitle className="text-2xl">
                    {selectedProduct.name}
                  </DialogTitle>
                  <DialogDescription>
                    {selectedProduct.description}
                  </DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-lg border border-border p-4">
                    <h4 className="font-semibold text-foreground">
                      Caractéristiques techniques
                    </h4>
                    <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                      <li>{selectedProduct.specs}</li>
                      {selectedProduct.technical.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-lg border border-border p-4">
                    <h4 className="font-semibold text-foreground">
                      Utilisation
                    </h4>
                    <p className="mt-3 text-sm text-muted-foreground">
                      {selectedProduct.usage}
                    </p>
                  </div>
                </div>

                <DialogFooter>
                  <Button
                    asChild
                    variant="outline"
                    className="border-border text-foreground hover:bg-secondary"
                  >
                    <a href={buildProductMailto(selectedProduct, "devis")}>
                      <FileText className="h-4 w-4" />
                      Demander un devis
                    </a>
                  </Button>
                  <Button
                    asChild
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    <a href={buildProductMailto(selectedProduct, "commande")}>
                      <ShoppingCart className="h-4 w-4" />
                      Commander ce produit
                    </a>
                  </Button>
                </DialogFooter>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </section>
  );
}
