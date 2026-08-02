"use client";

import Link from "next/link";
import {
  Briefcase,
  Clapperboard,
  Megaphone,
  Recycle,
  ShoppingCart,
  Wrench,
} from "lucide-react";

const needs = [
  {
    icon: ShoppingCart,
    title: "Acheter",
    subtitle: "Produits & équipements",
    href: "/#catalogue",
  },
  {
    icon: Wrench,
    title: "Trouver un service",
    subtitle: "Maintenance, réparation, prestataires",
    href: "/univers/particuliers",
  },
  {
    icon: Megaphone,
    title: "Publier un besoin",
    subtitle: "On consulte les fournisseurs pour vous",
    href: "/#contact",
  },
  {
    icon: Recycle,
    title: "Occasion & surplus",
    subtitle: "CPRA Market",
    href: "/univers/cpra-market",
  },
  {
    icon: Briefcase,
    title: "Jobs & opportunités",
    subtitle: "CPRA Job",
    href: "/univers/jeunes-etudiants",
  },
  {
    icon: Clapperboard,
    title: "Créateurs & collabs",
    subtitle: "CPRA Creator",
    href: "/univers/cpra-creator",
  },
];

export function NeedFinder() {
  return (
    <section id="besoins" className="py-16 bg-background scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            Par besoin
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-foreground">
            Que recherchez-vous aujourd&apos;hui ?
          </h2>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            Dites-nous simplement ce dont vous avez besoin — nous nous occupons
            de trouver le produit, le service ou le fournisseur adapté.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {needs.map((need) => (
            <Link
              key={need.title}
              href={need.href}
              className="group flex flex-col items-center text-center gap-2 rounded-xl border border-border bg-card p-6 hover:border-primary/60 hover:shadow-md transition-all"
            >
              <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <need.icon className="h-6 w-6 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              <span className="font-semibold text-card-foreground">
                {need.title}
              </span>
              <span className="text-xs text-muted-foreground">
                {need.subtitle}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
