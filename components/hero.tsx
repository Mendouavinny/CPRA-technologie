"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Beaker, Shield, Sparkles, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LEGAL_NAME } from "@/lib/contact";

const features = [
  { icon: Beaker, label: "Ingénierie chimique" },
  { icon: Wrench, label: "Performance & qualité" },
  { icon: Shield, label: "Innovation & durabilité" },
  { icon: Sparkles, label: "Études et conseils" },
];

const heroSlides = [
  {
    src: "/images/hero-industrial.jpg",
    alt: "Installation industrielle de traitement chimique",
  },
  {
    src: "/images/services/traitement.jpg",
    alt: "Traitement de surface industriel",
  },
  {
    src: "/images/services/revetement.jpg",
    alt: "Revêtement de surface et protection anticorrosion",
  },
  {
    src: "/images/services/equipements.jpg",
    alt: "Équipements industriels pour procédés chimiques",
  },
];

export function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, 4500);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section
      id="accueil"
      className="relative min-h-[92vh] flex items-center pt-32 pb-20 overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        {heroSlides.map((slide, index) => (
          <Image
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            fill
            className={`object-cover transition-opacity duration-1000 ${
              index === activeSlide ? "opacity-100" : "opacity-0"
            }`}
            priority={index === 0}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/70" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-sm text-primary font-medium">
                {LEGAL_NAME}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-foreground">
              La chimie au service de{" "}
              <span className="text-primary">l&apos;industrie</span>, de la{" "}
              <span className="text-primary">performance</span> et de la{" "}
              <span className="text-primary">durabilité</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-xl">
              Votre partenaire de confiance pour la distribution de réactifs
              chimiques, équipements industriels et solutions de traitement des
              surfaces au Cameroun et en Afrique.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button
                asChild
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
              >
                <Link href="#catalogue">
                  Découvrir nos produits
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-border text-foreground hover:bg-secondary"
              >
                <Link href="#contact">Contactez-nous</Link>
              </Button>
            </div>

            <div className="flex items-center gap-2" aria-label="Images d'accueil">
              {heroSlides.map((slide, index) => (
                <button
                  key={slide.src}
                  type="button"
                  aria-label={`Afficher l'image ${index + 1}`}
                  onClick={() => setActiveSlide(index)}
                  className={`h-2.5 rounded-full transition-all ${
                    index === activeSlide
                      ? "w-8 bg-primary"
                      : "w-2.5 bg-muted-foreground/30 hover:bg-primary/60"
                  }`}
                />
              ))}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
              {features.map((feature) => (
                <div
                  key={feature.label}
                  className="flex flex-col items-center gap-2 p-4 rounded-lg bg-white shadow-sm border border-border hover:border-primary/50 transition-colors"
                >
                  <feature.icon className="h-6 w-6 text-primary" />
                  <span className="text-xs text-center text-muted-foreground font-medium">
                    {feature.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden lg:grid grid-cols-2 gap-6">
            <div className="space-y-6">
              <div className="p-6 rounded-xl bg-white shadow-md border border-border">
                <div className="text-4xl font-bold text-primary">10+</div>
                <div className="text-muted-foreground mt-1">
                  Secteurs d&apos;intervention
                </div>
              </div>
              <div className="p-6 rounded-xl bg-white shadow-md border border-border">
                <div className="text-4xl font-bold text-primary">100+</div>
                <div className="text-muted-foreground mt-1">
                  Produits chimiques
                </div>
              </div>
            </div>
            <div className="space-y-6 mt-12">
              <div className="p-6 rounded-xl bg-white shadow-md border border-border">
                <div className="text-4xl font-bold text-primary">50+</div>
                <div className="text-muted-foreground mt-1">
                  Équipements industriels
                </div>
              </div>
              <div className="p-6 rounded-xl bg-white shadow-md border border-border">
                <div className="text-4xl font-bold text-primary">24/7</div>
                <div className="text-muted-foreground mt-1">
                  Support technique
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <span className="text-xs uppercase tracking-wider">Défiler</span>
          <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-primary rounded-full animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}
