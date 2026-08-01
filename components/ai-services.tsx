"use client";

import {
  BarChart3,
  Bot,
  Cpu,
  Database,
  LineChart,
  ScanText,
  Sprout,
  Store,
  Wallet,
  Workflow,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSiteStore } from "@/components/site-store";
import { buildMailtoUrl } from "@/lib/contact";

const aiServices = [
  {
    icon: BarChart3,
    title: "Business Intelligence & Tableaux de bord",
    description:
      "Transformez vos données en décisions : tableaux de bord Power BI, indicateurs de performance et reporting automatisé pour PME et institutions.",
    tags: ["Power BI", "KPI", "Reporting"],
  },
  {
    icon: Sprout,
    title: "Agritech & IA pour l'agriculture",
    description:
      "Prévision des rendements, détection des maladies des cultures par vision par ordinateur et optimisation des intrants pour les exploitations camerounaises.",
    tags: ["Vision IA", "Prévision", "Agriculture"],
  },
  {
    icon: Wallet,
    title: "Scoring crédit & Fintech",
    description:
      "Modèles de scoring pour microfinances et établissements de crédit afin d'évaluer le risque et faciliter l'inclusion financière.",
    tags: ["Scoring", "Microfinance", "Risque"],
  },
  {
    icon: Bot,
    title: "Chatbots & Assistants IA",
    description:
      "Assistants intelligents multilingues (WhatsApp, site web) pour le service client, la prise de commandes et le support 24/7.",
    tags: ["Chatbot", "WhatsApp", "Support"],
  },
  {
    icon: ScanText,
    title: "OCR & Numérisation intelligente",
    description:
      "Extraction automatique de données depuis factures, reçus et documents administratifs pour digitaliser vos archives.",
    tags: ["OCR", "Documents", "Automatisation"],
  },
  {
    icon: Store,
    title: "Digitalisation des PME",
    description:
      "Sites web, e-commerce, CRM et outils de gestion connectés pour moderniser les commerces et entreprises locales.",
    tags: ["Web", "E-commerce", "CRM"],
  },
  {
    icon: Workflow,
    title: "Automatisation des processus (RPA)",
    description:
      "Automatisation des tâches répétitives (saisie, e-mails, rapports) pour gagner en productivité et réduire les erreurs.",
    tags: ["RPA", "Productivité", "No-code"],
  },
  {
    icon: Database,
    title: "Collecte & Annotation de données",
    description:
      "Services de collecte, nettoyage et annotation de données pour entraîner des modèles d'IA, avec création d'emplois numériques locaux.",
    tags: ["Data", "Annotation", "Datasets"],
  },
  {
    icon: LineChart,
    title: "Analyse prédictive & Data Science",
    description:
      "Prévision des ventes, segmentation client et détection de fraude grâce à des modèles de Machine Learning sur mesure.",
    tags: ["Machine Learning", "Prédiction", "Analyse"],
  },
];

export function AiServices() {
  const { state } = useSiteStore();
  const { messages } = state;

  return (
    <section
      id="ia"
      className="relative py-20 overflow-hidden bg-secondary/30 scroll-mt-24"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 text-primary font-medium text-sm uppercase tracking-wider">
            <Cpu className="h-4 w-4" />
            Intelligence Artificielle &amp; Data
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-foreground">
            Nos services IA &amp; Data au Cameroun
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            {messages.aiIntro}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {aiServices.map((service) => (
            <div
              key={service.title}
              className="group bg-card rounded-xl border border-border p-6 hover:border-primary/50 hover:shadow-lg transition-all duration-300"
            >
              <div className="p-3 rounded-lg bg-primary/10 w-fit mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <service.icon className="h-6 w-6 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              <h3 className="text-lg font-semibold text-card-foreground mb-2">
                {service.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {service.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-medium text-muted-foreground bg-secondary px-2.5 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 grid md:grid-cols-[1.4fr_1fr] gap-8 items-center p-8 rounded-2xl bg-card border border-border">
          <div>
            <h3 className="text-2xl font-bold text-card-foreground mb-3">
              Un projet IA ou Data ? Parlons-en.
            </h3>
            <p className="text-muted-foreground mb-6">
              De l&apos;idée au déploiement, nous accompagnons les entreprises,
              coopératives et institutions camerounaises pour concevoir des
              solutions d&apos;Intelligence Artificielle rentables et durables.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                asChild
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
              >
                <a
                  href={buildMailtoUrl(
                    "Projet IA / Data",
                    "Bonjour CPRA TECHNOLOGY,\n\nNous avons un projet en Intelligence Artificielle / Data et souhaitons échanger.\n\nEntreprise :\nSecteur :\nDescription du besoin :\n\nMerci."
                  )}
                >
                  Démarrer un projet
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-border text-foreground hover:bg-secondary"
              >
                <a href="#formation">Voir nos formations IA</a>
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: "IA", label: "Solutions sur mesure" },
              { value: "24/7", label: "Assistants intelligents" },
              { value: "100%", label: "Adapté au contexte local" },
              { value: "PME", label: "& grandes entreprises" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="p-4 rounded-xl bg-secondary/60 border border-border text-center"
              >
                <div className="text-2xl font-bold text-primary">
                  {stat.value}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
