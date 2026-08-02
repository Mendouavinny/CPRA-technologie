"use client";

import { type KeyboardEvent, useState } from "react";
import Image from "next/image";
import {
  ChevronRight,
  FileText,
  Info,
  Search,
  ShoppingCart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { BRAND_NAME, buildMailtoUrl } from "@/lib/contact";
import { useSiteStore } from "@/components/site-store";
import { useCart } from "@/components/cart-store";
import type { Product } from "@/lib/site-defaults";

function toCartItem(product: Product) {
  return {
    id: product.id,
    name: product.name,
    category: product.category,
    specs: product.specs,
    image: product.image,
  };
}

function buildProductMailto(product: Product, intent: "devis" | "commande") {
  const isOrder = intent === "commande";
  const subject = `${isOrder ? "Commande" : "Demande de devis"} - ${product.name}`;
  const body = [
    `Bonjour ${BRAND_NAME},`,
    "",
    `Je souhaite ${isOrder ? "commander" : "recevoir un devis pour"} le produit suivant :`,
    "",
    `Produit : ${product.name}`,
    `Catégorie : ${product.category}`,
    `Caractéristiques : ${product.specs}`,
    `Utilisation prévue : ${product.usage}`,
    "",
    "Quantité souhaitée :",
    "Entreprise :",
    "Nom :",
    "Téléphone :",
    "Adresse de livraison :",
    "",
    "Merci.",
  ].join("\n");

  return buildMailtoUrl(subject, body);
}

export function ProductCatalog() {
  const { state } = useSiteStore();
  const { products, categories } = state;
  const { addItem } = useCart();
  const [activeCategory, setActiveCategory] = useState("Tous");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts = products.filter((product) => {
    const query = searchQuery.toLowerCase();
    const matchesCategory =
      activeCategory === "Tous" || product.category === activeCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query) ||
      product.usage.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });

  const showAllProducts = () => {
    setActiveCategory("Tous");
    setSearchQuery("");
  };

  const handleCardKeyDown = (
    event: KeyboardEvent<HTMLDivElement>,
    product: Product
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setSelectedProduct(product);
    }
  };

  return (
    <section id="catalogue" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            Catalogue
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-foreground">
            Réactifs, équipements & surfaces
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Découvrez une gamme enrichie de produits chimiques, équipements,
            EPI, traitements et revêtements de surface.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Rechercher un produit..."
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              className="pl-10 bg-card border-border text-foreground placeholder:text-muted-foreground"
            />
          </div>

          <div className="sm:hidden">
            <select
              value={activeCategory}
              onChange={(event) => setActiveCategory(event.target.value)}
              className="w-full px-4 py-2 rounded-md bg-card border border-border text-foreground"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="hidden sm:flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              onClick={() => setActiveCategory(category)}
              className={
                activeCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "border-border text-foreground hover:bg-secondary"
              }
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              role="button"
              tabIndex={0}
              aria-label={`Voir les détails de ${product.name}`}
              onClick={() => setSelectedProduct(product)}
              onKeyDown={(event) => handleCardKeyDown(event, product)}
              className="group bg-card rounded-lg overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <div className="relative h-48 bg-secondary/50 overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-2 right-2 px-2 py-1 rounded text-xs font-medium bg-primary/90 text-primary-foreground">
                  {product.category}
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-card-foreground group-hover:text-primary transition-colors line-clamp-1">
                  {product.name}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                  {product.description}
                </p>
                <div className="mt-3 flex items-center justify-between gap-3">
                  <span className="text-xs text-primary font-medium bg-primary/10 px-2 py-1 rounded">
                    {product.specs}
                  </span>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-primary hover:text-primary hover:bg-primary/10"
                    onClick={(event) => {
                      event.stopPropagation();
                      setSelectedProduct(product);
                    }}
                  >
                    <Info className="h-4 w-4" />
                    Détails
                  </Button>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <Button
                    asChild
                    size="sm"
                    variant="outline"
                    className="border-border text-foreground hover:bg-secondary"
                    onClick={(event) => event.stopPropagation()}
                  >
                    <a href={buildProductMailto(product, "devis")}>
                      <FileText className="h-4 w-4" />
                      Devis
                    </a>
                  </Button>
                  <Button
                    size="sm"
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                    onClick={(event) => {
                      event.stopPropagation();
                      addItem(toCartItem(product));
                    }}
                  >
                    <ShoppingCart className="h-4 w-4" />
                    Ajouter
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="py-16 text-center text-muted-foreground">
            Aucun produit ne correspond à votre recherche.
          </div>
        )}

        <div className="mt-12 text-center">
          <Button
            size="lg"
            variant="outline"
            onClick={showAllProducts}
            className="border-border text-foreground hover:bg-secondary gap-2"
          >
            Voir tout le catalogue
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <Dialog
        open={Boolean(selectedProduct)}
        onOpenChange={(open) => {
          if (!open) setSelectedProduct(null);
        }}
      >
        {selectedProduct && (
          <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-4xl">
            <div className="grid gap-6 md:grid-cols-[260px_1fr]">
              <div className="relative h-64 md:h-full min-h-64 rounded-lg overflow-hidden bg-secondary">
                <Image
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="space-y-6">
                <DialogHeader>
                  <div className="text-sm font-medium text-primary">
                    {selectedProduct.category}
                  </div>
                  <DialogTitle className="text-2xl">
                    {selectedProduct.name}
                  </DialogTitle>
                  <DialogDescription>
                    {selectedProduct.description}
                  </DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-lg border border-border p-4">
                    <h4 className="font-semibold text-foreground">
                      Caractéristiques techniques
                    </h4>
                    <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                      <li>{selectedProduct.specs}</li>
                      {selectedProduct.technical.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-lg border border-border p-4">
                    <h4 className="font-semibold text-foreground">
                      Utilisation
                    </h4>
                    <p className="mt-3 text-sm text-muted-foreground">
                      {selectedProduct.usage}
                    </p>
                  </div>
                </div>

                <DialogFooter>
                  <Button
                    asChild
                    variant="outline"
                    className="border-border text-foreground hover:bg-secondary"
                  >
                    <a href={buildProductMailto(selectedProduct, "devis")}>
                      <FileText className="h-4 w-4" />
                      Demander un devis
                    </a>
                  </Button>
                  <Button
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                    onClick={() => {
                      addItem(toCartItem(selectedProduct));
                      setSelectedProduct(null);
                    }}
                  >
                    <ShoppingCart className="h-4 w-4" />
                    Ajouter à ma commande
                  </Button>
                </DialogFooter>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </section>
  );
}
