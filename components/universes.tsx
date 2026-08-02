"use client";

import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Clapperboard,
  GraduationCap,
  Home,
  Recycle,
  Scissors,
  Stethoscope,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";
import { UNIVERSES } from "@/lib/universes";

export const universeIcons: Record<string, LucideIcon> = {
  home: Home,
  building: Building2,
  scissors: Scissors,
  health: Stethoscope,
  horeca: UtensilsCrossed,
  students: GraduationCap,
  creator: Clapperboard,
  market: Recycle,
};

export function Universes() {
  return (
    <section id="univers" className="py-20 bg-secondary/30 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            Nos univers
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-foreground">
            Une plateforme, tous vos besoins
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Particuliers ou professionnels, chacun trouve son espace dédié.
            Choisissez le vôtre.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {UNIVERSES.map((universe) => {
            const Icon = universeIcons[universe.icon] ?? Home;
            return (
              <Link
                key={universe.slug}
                href={`/univers/${universe.slug}`}
                className="group flex flex-col rounded-xl border border-border bg-card p-6 hover:border-primary/60 hover:shadow-lg transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary transition-colors">
                    <Icon className="h-6 w-6 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
                {universe.label && (
                  <span className="text-[11px] font-semibold text-primary tracking-wide mb-1">
                    {universe.label}
                  </span>
                )}
                <h3 className="font-semibold text-card-foreground">
                  {universe.name}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                  {universe.tagline}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
