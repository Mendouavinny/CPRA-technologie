"use client";

import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { useSiteStore } from "@/components/site-store";
import { phoneHrefFrom } from "@/lib/site-defaults";

const footerLinks = {
  services: [
    { name: "Réactifs chimiques", href: "#reactifs" },
    { name: "Équipements industriels", href: "#equipements" },
    { name: "Traitement des surfaces", href: "#traitement" },
    { name: "Revêtement des surfaces", href: "#revetement" },
    { name: "Protection anticorrosion", href: "#anticorrosion" },
    { name: "Formulation cosmétiques", href: "#cosmetiques" },
  ],
  activities: [
    { name: "Formation", href: "#formation" },
    { name: "Service IA & Data", href: "#ia" },
    { name: "Carrière", href: "#carriere" },
    { name: "Secteurs d'intervention", href: "#secteurs" },
  ],
  company: [
    { name: "À propos", href: "#apropos" },
    { name: "Catalogue", href: "#catalogue" },
    { name: "Contact", href: "#contact" },
  ],
};

export function Footer() {
  const { state } = useSiteStore();
  const { contact } = state;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <Image
                src="/logo.jpeg"
                alt={contact.brandName}
                width={40}
                height={40}
                className="w-10 h-10 rounded-lg object-cover"
              />
              <div className="flex flex-col">
                <span className="font-bold text-lg text-card-foreground">
                  {contact.brandName}
                </span>
                <span className="text-xs text-muted-foreground">{contact.legalName}</span>
              </div>
            </Link>
            <p className="text-muted-foreground text-sm mb-6 max-w-sm">
              La chimie au service de l&apos;industrie, de la performance et de la
              durabilité. Votre partenaire de confiance au Cameroun et en Afrique.
            </p>

            <div className="space-y-3">
              <a
                href={phoneHrefFrom(contact.phone)}
                className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Phone className="h-4 w-4" />
                <span>{contact.phone}</span>
              </a>
              <a
                href={`mailto:${contact.email}`}
                className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="h-4 w-4" />
                <span>{contact.email}</span>
              </a>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{contact.address}</span>
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
            <h4 className="font-semibold text-card-foreground mb-4">Activités</h4>
            <ul className="space-y-2">
              {footerLinks.activities.map((link) => (
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
              © {currentYear} {contact.brandName} - {contact.legalName}. Tous droits réservés.
            </p>
            <div className="flex items-center gap-4">
              <a
                href={`https://${contact.website.replace(/^https?:\/\//, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {contact.website}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
