"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Check, Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSiteStore } from "@/components/site-store";
import { universeIcons } from "@/components/universes";
import type { Universe } from "@/lib/universes";

function whatsappBase(url: string): string {
  const clean = url.split("?")[0].replace(/\/$/, "");
  return clean || "https://wa.me/";
}

export function UniverseView({ universe }: { universe: Universe }) {
  const { state } = useSiteStore();
  const { contact } = state;
  const Icon = universeIcons[universe.icon];

  const actionLabel = universe.special
    ? "Publier une annonce"
    : "Publier un besoin";

  const message = [
    `Bonjour ${contact.brandName},`,
    "",
    `Univers : ${universe.name}`,
    `Objet : ${actionLabel}`,
    "",
    "Description de mon besoin / annonce :",
    "",
    "Type (produit / service / équipement / occasion) :",
    "Ville :",
    "Budget indicatif :",
    "",
    "Coordonnées :",
    "Nom :",
    "Téléphone :",
    "",
    "Merci.",
  ].join("\n");

  const mailtoHref = `mailto:${contact.email}?subject=${encodeURIComponent(
    `${actionLabel} - ${universe.name}`
  )}&body=${encodeURIComponent(message)}`;

  const whatsappHref = `${whatsappBase(contact.whatsappUrl)}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <div className="pb-20">
      {/* Bannière image de l'univers */}
      <div className="relative h-72 sm:h-80 w-full">
        <Image
          src={universe.image}
          alt={universe.name}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/55 to-black/30" />
        <div className="absolute inset-0 pt-24 pb-8 flex flex-col justify-end">
          <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8">
            <Link
              href="/#univers"
              className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white mb-4"
            >
              <ArrowLeft className="h-4 w-4" />
              Tous les univers
            </Link>
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-primary/90 backdrop-blur-sm">
                {Icon && <Icon className="h-8 w-8 text-white" />}
              </div>
              <div>
                {universe.label && (
                  <span className="text-xs font-semibold text-white/90 tracking-wide">
                    {universe.label}
                  </span>
                )}
                <h1 className="text-3xl sm:text-4xl font-bold text-white">
                  {universe.name}
                </h1>
                <p className="mt-1 text-white/85">{universe.tagline}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <p className="text-muted-foreground max-w-3xl mb-10">
          {universe.description}
        </p>

        {/* Ce que vous pouvez faire */}
        <h2 className="text-xl font-semibold text-foreground mb-4">
          Ce que vous pouvez faire ici
        </h2>
        <div className="grid sm:grid-cols-2 gap-3 mb-10">
          {universe.offerings.map((offer) => (
            <div
              key={offer}
              className="flex items-center gap-3 rounded-lg border border-border bg-card p-4"
            >
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                <Check className="h-4 w-4 text-primary" />
              </div>
              <span className="text-sm text-foreground">{offer}</span>
            </div>
          ))}
        </div>

        {/* Exemples / légende */}
        {universe.examples && universe.examples.length > 0 && (
          <div className="mb-10">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              {universe.slug === "cpra-market" ? "États des annonces" : "Exemples"}
            </h2>
            <div className="space-y-3">
              {universe.examples.map((example) => (
                <div
                  key={example}
                  className="rounded-lg border border-dashed border-primary/40 bg-primary/5 p-4 text-sm text-foreground"
                >
                  {example}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Appels à l'action */}
        <div className="rounded-2xl bg-card border border-border p-8">
          <h2 className="text-2xl font-bold text-card-foreground mb-2">
            {universe.special
              ? "Publiez votre annonce"
              : "Exprimez votre besoin"}
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl">
            Décrivez ce que vous cherchez. Nous centralisons les offres des
            fournisseurs et prestataires, puis nous revenons vers vous avec la
            meilleure proposition.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button
              asChild
              className="gap-2 bg-[#25D366] text-white hover:bg-[#1ebe5b]"
            >
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-5 w-5" />
                {actionLabel} via WhatsApp
              </a>
            </Button>
            <Button asChild variant="outline" className="gap-2 border-border">
              <a href={mailtoHref}>
                <Mail className="h-5 w-5" />
                {actionLabel} par Email
              </a>
            </Button>
            <Button
              asChild
              variant="ghost"
              className="text-primary hover:bg-primary/10"
            >
              <Link href="/#catalogue">Voir le catalogue</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
