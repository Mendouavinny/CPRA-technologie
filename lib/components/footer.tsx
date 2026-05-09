"use client";

import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import {
  BRAND_NAME,
  CONTACT_EMAIL,
  CONTACT_PHONE,
  CONTACT_PHONE_HREF,
  LEGAL_NAME,
} from "@/lib/contact";

const footerLinks = {
  services: [
    { name: "Réactifs chimiques", href: "#reactifs" },
    { name: "Équipements industriels", href: "#equipements" },
    { name: "Traitement des surfaces", href: "#traitement" },
    { name: "Revêtement des surfaces", href: "#revetement" },
    { name: "Protection anticorrosion", href: "#anticorrosion" },
    { name: "Formulation cosmétiques", href: "#cosmetiques" },
  ],
  sectors: [
    { name: "Industrie métallurgique", href: "#secteurs" },
    { name: "Pétrole & gaz", href: "#secteurs" },
    { name: "BTP & infrastructures", href: "#secteurs" },
    { name: "Automobile & transport", href: "#secteurs" },
    { name: "Agroalimentaire", href: "#secteurs" },
    { name: "Traitement des eaux", href: "#secteurs" },
  ],
  company: [
    { name: "À propos", href: "#apropos" },
    { name: "Catalogue", href: "#catalogue" },
    { name: "Contact", href: "#contact" },
  ],
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">CP</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg text-card-foreground">
                  {BRAND_NAME}
                </span>
                <span className="text-xs text-muted-foreground">{LEGAL_NAME}</span>
              </div>
            </Link>
            <p className="text-muted-foreground text-sm mb-6 max-w-sm">
              La chimie au service de l&apos;industrie, de la performance et de la
              durabilité. Votre partenaire de confiance au Cameroun et en Afrique.
            </p>

            <div className="space-y-3">
              <a
                href={CONTACT_PHONE_HREF}
                className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Phone className="h-4 w-4" />
                <span>{CONTACT_PHONE}</span>
              </a>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="h-4 w-4" />
                <span>{CONTACT_EMAIL}</span>
              </a>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>DOUALA-Bonaberi, Cameroun</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-card-foreground mb-4">Services</h4>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-card-foreground mb-4">Secteurs</h4>
            <ul className="space-y-2">
              {footerLinks.sectors.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-card-foreground mb-4">Entreprise</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {currentYear} {BRAND_NAME} - {LEGAL_NAME}. Tous droits réservés.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://www.cpratechsarl.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                www.cpratechsarl.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
