"use client";

import { useState } from "react";
import {
  BrainCircuit,
  Clock,
  Code2,
  GraduationCap,
  MonitorSmartphone,
  ShieldCheck,
  Factory,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSiteStore } from "@/components/site-store";
import { buildMailtoUrl } from "@/lib/contact";
import type { Formation as FormationType } from "@/lib/site-defaults";

const categoryIcons: Record<string, typeof BrainCircuit> = {
  "Data & IA": BrainCircuit,
  Développement: Code2,
  Bureautique: MonitorSmartphone,
  Industrie: Factory,
};

const categoryOrder = ["Toutes", "Data & IA", "Développement", "Bureautique", "Industrie"];

function buildFormationMailto(formation: FormationType, contactEmail: string) {
  const subject = `Inscription formation - ${formation.title}`;
  const body = [
    "Bonjour CPRA TECHNOLOGY,",
    "",
    `Je souhaite m'inscrire / recevoir plus d'informations sur la formation suivante :`,
    "",
    `Formation : ${formation.title}`,
    `Catégorie : ${formation.category}`,
    `Niveau : ${formation.level}`,
    `Durée : ${formation.duration}`,
    `Modalité : ${formation.mode}`,
    "",
    "Nom :",
    "Téléphone :",
    "Disponibilité :",
    "",
    "Merci.",
  ].join("\n");
  return `mailto:${contactEmail}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
}

export function Formation() {
  const { state } = useSiteStore();
  const { formations, messages, contact } = state;
  const [activeCategory, setActiveCategory] = useState("Toutes");

  const filtered =
    activeCategory === "Toutes"
      ? formations
      : formations.filter((f) => f.category === activeCategory);

  return (
    <section id="formation" className="py-20 bg-background scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            Formation
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-foreground">
            Nos formations professionnelles
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            {messages.formationIntro}
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categoryOrder.map((category) => (
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((formation) => {
            const Icon = categoryIcons[formation.category] ?? GraduationCap;
            return (
              <div
                key={formation.id}
                className="flex flex-col bg-card rounded-xl border border-border overflow-hidden hover:border-primary/50 transition-all duration-300"
              >
                <div className="p-6 flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <span className="text-xs font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                      {formation.level}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-card-foreground mb-2">
                    {formation.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {formation.description}
                  </p>

                  <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mb-4">
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="h-4 w-4 text-primary" />
                      {formation.duration}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <MonitorSmartphone className="h-4 w-4 text-primary" />
                      {formation.mode}
                    </span>
                  </div>

                  <ul className="space-y-1.5">
                    {formation.highlights.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <ShieldCheck className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-6 pt-0 mt-auto">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-muted-foreground">Tarif</span>
                    <span className="font-semibold text-foreground">
                      {formation.price}
                    </span>
                  </div>
                  <Button
                    asChild
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
                  >
                    <a href={buildFormationMailto(formation, contact.email)}>
                      <GraduationCap className="h-4 w-4" />
                      S&apos;inscrire
                    </a>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="py-16 text-center text-muted-foreground">
            Aucune formation disponible dans cette catégorie pour le moment.
          </div>
        )}

        <div className="mt-14 p-8 rounded-xl bg-primary/10 border border-primary/20 text-center">
          <Award className="h-10 w-10 text-primary mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-foreground mb-2">
            Formations en entreprise & sur mesure
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Nous concevons des programmes de formation adaptés aux besoins de vos
            équipes, en présentiel ou à distance, partout au Cameroun.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <a
              href={buildMailtoUrl(
                "Demande de formation sur mesure",
                "Bonjour CPRA TECHNOLOGY,\n\nNous souhaitons organiser une formation sur mesure pour nos équipes.\n\nEntreprise :\nNombre de participants :\nThématique souhaitée :\n\nMerci."
              )}
            >
              Demander un programme sur mesure
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
