"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Mail, MapPin, Menu, Phone, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSiteStore } from "@/components/site-store";
import { phoneHrefFrom } from "@/lib/site-defaults";

const navigation = [
  { name: "Accueil", href: "#accueil" },
  {
    name: "Services",
    href: "#services",
    submenu: [
      { name: "Réactifs chimiques", href: "#reactifs" },
      { name: "Équipements industriels", href: "#equipements" },
      { name: "Traitement des surfaces", href: "#traitement" },
      { name: "Revêtement des surfaces", href: "#revetement" },
      { name: "Protection anticorrosion", href: "#anticorrosion" },
      { name: "Cosmétiques", href: "#cosmetiques" },
    ],
  },
  { name: "Catalogue", href: "#catalogue" },
  { name: "Formation", href: "#formation" },
  { name: "Service IA", href: "#ia" },
  { name: "Secteurs", href: "#secteurs" },
  { name: "Carrière", href: "#carriere" },
  { name: "À propos", href: "#apropos" },
  { name: "Contact", href: "#contact" },
];

export function Header() {
  const { state } = useSiteStore();
  const { contact, messages } = state;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [announcementOpen, setAnnouncementOpen] = useState(true);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      {announcementOpen && messages.announcement.trim() && (
        <div className="bg-primary text-primary-foreground">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex items-center justify-center gap-3 text-center text-xs sm:text-sm">
            <span className="line-clamp-2">{messages.announcement}</span>
            <button
              type="button"
              onClick={() => setAnnouncementOpen(false)}
              aria-label="Fermer l'annonce"
              className="flex-shrink-0 opacity-80 hover:opacity-100"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
      <div className="bg-primary/10 py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-6">
              <a
                href={phoneHrefFrom(contact.phone)}
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <Phone className="h-4 w-4" />
                <span>{contact.phone}</span>
              </a>
              <a
                href={`mailto:${contact.email}`}
                className="hidden sm:flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="h-4 w-4" />
                <span>{contact.email}</span>
              </a>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span className="hidden sm:inline">{contact.address}</span>
              <span className="sm:hidden">{contact.address.split(",")[0]}</span>
            </div>
          </div>
        </div>
      </div>

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">CP</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg text-foreground">
                {contact.brandName}
              </span>
              <span className="text-xs text-muted-foreground hidden sm:block">
                {contact.legalName}
              </span>
            </div>
          </Link>

          <div className="hidden xl:flex items-center gap-0.5">
            {navigation.map((item) =>
              item.submenu ? (
                <DropdownMenu key={item.name}>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="flex items-center gap-1 text-foreground hover:text-primary hover:bg-primary/10"
                    >
                      {item.name}
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-card border-border">
                    {item.submenu.map((subitem) => (
                      <DropdownMenuItem key={subitem.name} asChild>
                        <Link
                          href={subitem.href}
                          className="cursor-pointer text-card-foreground hover:text-primary"
                        >
                          {subitem.name}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className="px-3 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors whitespace-nowrap"
                >
                  {item.name}
                </Link>
              )
            )}
          </div>

          <div className="hidden xl:block">
            <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Link href="#contact">Demander un devis</Link>
            </Button>
          </div>

          <button
            type="button"
            className="xl:hidden p-2 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Ouvrir le menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="xl:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-2">
              {navigation.map((item) => (
                <div key={item.name}>
                  <Link
                    href={item.href}
                    className="block px-4 py-2 text-foreground hover:text-primary hover:bg-primary/10 rounded-md transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                  {item.submenu && (
                    <div className="ml-4">
                      {item.submenu.map((subitem) => (
                        <Link
                          key={subitem.name}
                          href={subitem.href}
                          className="block px-4 py-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {subitem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="px-4 pt-4">
                <Button
                  asChild
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <Link href="#contact" onClick={() => setMobileMenuOpen(false)}>
                    Demander un devis
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
