"use client";

import Link from "next/link";
import Image from "next/image";
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
                className="group relative rounded-xl overflow-hidden border border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <div className="relative h-52">
                  <Image
                    src={universe.image}
                    alt={universe.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/10" />

                  <div className="absolute top-3 left-3 p-2.5 rounded-lg bg-primary/90 backdrop-blur-sm">
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="absolute top-3 right-3 h-8 w-8 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight className="h-4 w-4 text-white" />
                  </div>

                  <div className="absolute inset-x-0 bottom-0 p-4">
                    {universe.label && (
                      <span className="text-[11px] font-semibold text-white/90 tracking-wide">
                        {universe.label}
                      </span>
                    )}
                    <h3 className="font-semibold text-white leading-tight">
                      {universe.name}
                    </h3>
                    <p className="mt-1 text-xs text-white/80 line-clamp-2">
                      {universe.tagline}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
