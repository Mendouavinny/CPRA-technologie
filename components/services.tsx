"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Beaker,
  Cog,
  Paintbrush,
  Shield,
  Sparkles,
  Wrench,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    id: "reactifs",
    icon: Beaker,
    title: "Distribution de réactifs chimiques",
    description:
      "Acides, bases, solvants, sels, additifs et produits de haute qualité pour vos procédés industriels.",
    image: "/images/services/reactifs.jpg",
  },
  {
    id: "traitement",
    icon: Cog,
    title: "Traitement des surfaces",
    description:
      "Décapage, phosphatation, anodisation, passivation, conversion chimique, sablage et grenaillage.",
    image: "/images/services/traitement.jpg",
  },
  {
    id: "revetement",
    icon: Paintbrush,
    title: "Revêtement des surfaces",
    description:
      "Peinture industrielle, thermolaquage, poudrage et revêtements spéciaux pour une protection optimale.",
    image: "/images/services/revetement.jpg",
  },
  {
    id: "anticorrosion",
    icon: Shield,
    title: "Protection anticorrosion",
    description:
      "Solutions anticorrosion haute performance pour prolonger la durée de vie de vos équipements.",
    image: "/images/services/anticorrosion.jpg",
  },
  {
    id: "cosmetiques",
    icon: Sparkles,
    title: "Formulation cosmétiques",
    description:
      "Formulations, fabrication et conditionnement de produits cosmétiques selon vos spécifications.",
    image: "/images/services/cosmetiques.jpg",
  },
  {
    id: "equipements",
    icon: Wrench,
    title: "Distribution équipements industriels",
    description:
      "Réacteurs, agitateurs, pompes, échangeurs, cuves, filtres et instrumentation pour vos procédés.",
    image: "/images/services/equipements.jpg",
  },
];

export function Services() {
  return (
    <section id="services" className="py-20 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            Nos Services
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-foreground">
            Nos domaines d&apos;activités
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Des solutions complètes pour l&apos;industrie chimique, du traitement des
            surfaces à la distribution d&apos;équipements spécialisés.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              id={service.id}
              key={service.title}
              className="group relative bg-card rounded-xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 scroll-mt-32"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                <div className="absolute top-4 left-4 p-3 rounded-lg bg-primary/90">
                  <service.icon className="h-6 w-6 text-primary-foreground" />
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-card-foreground mb-3">
                  {service.title}
                </h3>
                <p className="text-muted-foreground mb-4 line-clamp-3">
                  {service.description}
                </p>
                <Button
                  asChild
                  variant="ghost"
                  className="text-primary hover:text-primary hover:bg-primary/10 p-0 h-auto"
                >
                  <Link href="#catalogue">
                    En savoir plus
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 p-8 rounded-xl bg-card border border-border">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-card-foreground mb-4">
                Inspection & maintenance des équipements
              </h3>
              <p className="text-muted-foreground mb-6">
                Inspection, contrôle, entretien préventif et correctif pour
                assurer la fiabilité, la sécurité et la performance de vos
                équipements industriels.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  "Équipements de qualité",
                  "Performance optimale",
                  "Conformité aux normes",
                  "Service après vente",
                  "Inspection & contrôle",
                  "Intervention rapide",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span className="text-sm text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-64 rounded-lg overflow-hidden">
              <Image
                src="/images/services/maintenance.jpg"
                alt="Maintenance industrielle"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
