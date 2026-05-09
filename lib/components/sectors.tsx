"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Building2,
  Car,
  Droplets,
  Factory,
  FlaskConical,
  Fuel,
  Mountain,
  Pill,
  Sparkles,
  Zap,
} from "lucide-react";

const sectors = [
  {
    icon: Factory,
    name: "Industrie métallurgique",
    description: "Traitement et protection des métaux",
    image: "/images/sectors/metallurgie.jpg",
  },
  {
    icon: Fuel,
    name: "Pétrole & gaz",
    description: "Solutions pour l'industrie pétrolière",
    image: "/images/sectors/petrole.jpg",
  },
  {
    icon: Building2,
    name: "BTP & infrastructures",
    description: "Protection des structures et ouvrages",
    image: "/images/sectors/btp.jpg",
  },
  {
    icon: Car,
    name: "Automobile & transport",
    description: "Traitement des pièces automobiles",
    image: "/images/sectors/automobile.jpg",
  },
  {
    icon: Sparkles,
    name: "Cosmétique & bien-être",
    description: "Ingrédients et formulations cosmétiques",
    image: "/images/sectors/cosmetique.jpg",
  },
  {
    icon: Pill,
    name: "Agroalimentaire & pharmaceutique",
    description: "Solutions pour l'industrie alimentaire",
    image: "/images/sectors/agroalimentaire.jpg",
  },
  {
    icon: FlaskConical,
    name: "Chimie fine & spécialités",
    description: "Réactifs de haute pureté",
    image: "/images/sectors/chimie.jpg",
  },
  {
    icon: Zap,
    name: "Énergie & environnement",
    description: "Solutions durables et écologiques",
    image: "/images/sectors/energie.jpg",
  },
  {
    icon: Mountain,
    name: "Mines & carrières",
    description: "Traitement des minerais",
    image: "/images/sectors/mines.jpg",
  },
  {
    icon: Droplets,
    name: "Traitement des eaux & déchets",
    description: "Solutions de purification",
    image: "/images/sectors/eaux.jpg",
  },
];

export function Sectors() {
  return (
    <section id="secteurs" className="py-20 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            Secteurs
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-foreground">
            Nos secteurs d&apos;intervention
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Qualité, sécurité et environnement au cœur de toutes nos actions.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {sectors.map((sector) => (
            <Link
              key={sector.name}
              href="#contact"
              className="group relative rounded-xl overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <div className="relative h-64 xl:h-48">
                <Image
                  src={sector.image}
                  alt={sector.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              </div>

              <div className="absolute inset-0 flex flex-col justify-end p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-primary">
                    <sector.icon className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-semibold text-white text-sm">
                    {sector.name}
                  </h3>
                </div>
                <p className="text-xs text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {sector.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
