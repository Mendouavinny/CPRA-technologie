"use client";

import Image from "next/image";
import { CheckCircle, Eye, Target, Users } from "lucide-react";
import { BRAND_NAME } from "@/lib/contact";

const values = [
  {
    icon: Target,
    title: "Notre mission",
    description:
      "Fournir des solutions chimiques et industrielles de haute qualité, adaptées aux besoins spécifiques de chaque client en Afrique.",
  },
  {
    icon: Eye,
    title: "Notre vision",
    description:
      "Devenir le partenaire de référence en ingénierie chimique et distribution d'équipements industriels en Afrique subsaharienne.",
  },
  {
    icon: Users,
    title: "Nos valeurs",
    description:
      "Excellence, intégrité, innovation et engagement envers la satisfaction client et le développement durable.",
  },
];

const commitments = [
  "Produits certifiés et conformes aux normes internationales",
  "Équipe technique qualifiée et expérimentée",
  "Service après-vente réactif et efficace",
  "Conseils personnalisés et accompagnement projet",
  "Respect des normes HSE (Hygiène, Sécurité, Environnement)",
  "Prix compétitifs et livraison rapide",
];

export function About() {
  return (
    <section id="apropos" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="relative h-96 rounded-xl overflow-hidden">
              <Image
                src="/images/about/team.jpg"
                alt={`Équipe ${BRAND_NAME}`}
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-48 h-48 rounded-xl overflow-hidden border-4 border-background shadow-xl hidden md:block">
              <Image
                src="/images/about/laboratory.jpg"
                alt="Laboratoire"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <span className="text-primary font-medium text-sm uppercase tracking-wider">
                À propos
              </span>
              <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-foreground">
                ChemProcess Africa Technology
              </h2>
              <p className="mt-4 text-muted-foreground">
                <strong className="text-foreground">{BRAND_NAME}</strong> est
                une entreprise camerounaise spécialisée dans la distribution de
                réactifs chimiques, d&apos;équipements industriels et de solutions
                de traitement des surfaces. Nous accompagnons les industries
                locales et régionales dans leur quête de performance et de
                durabilité.
              </p>
            </div>

            <div className="grid gap-6">
              {values.map((value) => (
                <div key={value.title} className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{value.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {value.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-20 p-8 rounded-xl bg-card border border-border">
          <h3 className="text-2xl font-bold text-card-foreground text-center mb-8">
            Nos engagements
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {commitments.map((commitment) => (
              <div key={commitment} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">{commitment}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
