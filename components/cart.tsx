"use client";

import { type ChangeEvent, useState } from "react";
import Image from "next/image";
import {
  Mail,
  MessageCircle,
  Minus,
  Plus,
  ShoppingCart,
  Trash2,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCart } from "@/components/cart-store";
import { useSiteStore } from "@/components/site-store";

const emptyForm = { name: "", company: "", phone: "", address: "", note: "" };

function whatsappBase(url: string): string {
  // Retire une éventuelle query et normalise vers https://wa.me/<num>
  const clean = url.split("?")[0].replace(/\/$/, "");
  return clean || "https://wa.me/";
}

export function Cart() {
  const {
    items,
    count,
    isOpen,
    setOpen,
    open,
    increment,
    decrement,
    setQuantity,
    removeItem,
    clear,
  } = useCart();
  const { state } = useSiteStore();
  const { contact } = state;
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [event.target.name]: event.target.value });
    setError("");
  };

  const buildMessage = () => {
    const lines = [
      `Bonjour ${contact.brandName},`,
      "",
      "Je souhaite passer la commande suivante :",
      "",
      ...items.map(
        (it, index) =>
          `${index + 1}. ${it.name} (${it.category}) - ${it.specs} - Quantité : ${it.quantity}`
      ),
      "",
      "Coordonnées :",
      `Nom : ${form.name}`,
      `Entreprise : ${form.company || "-"}`,
      `Téléphone : ${form.phone || "-"}`,
      `Adresse de livraison : ${form.address || "-"}`,
    ];
    if (form.note.trim()) {
      lines.push("", `Note : ${form.note.trim()}`);
    }
    lines.push("", "Merci.");
    return lines.join("\n");
  };

  const validate = () => {
    if (items.length === 0) {
      setError("Votre panier est vide.");
      return false;
    }
    if (!form.name.trim()) {
      setError("Merci d'indiquer votre nom.");
      return false;
    }
    return true;
  };

  const sendWhatsApp = () => {
    if (!validate()) return;
    const url = `${whatsappBase(contact.whatsappUrl)}?text=${encodeURIComponent(
      buildMessage()
    )}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const sendEmail = () => {
    if (!validate()) return;
    const subject = `Commande - ${form.name || "Client"}`;
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(buildMessage())}`;
  };

  return (
    <>
      {/* Bouton flottant du panier */}
      <button
        type="button"
        onClick={open}
        aria-label="Ouvrir la commande"
        className="fixed bottom-4 left-4 z-40 flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-primary-foreground shadow-lg hover:bg-primary/90 transition-colors print:hidden"
      >
        <span className="relative">
          <ShoppingCart className="h-5 w-5" />
          {count > 0 && (
            <span className="absolute -top-2 -right-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-[11px] font-bold text-white">
              {count}
            </span>
          )}
        </span>
        <span className="hidden sm:inline text-sm font-medium">Commande</span>
      </button>

      <Sheet open={isOpen} onOpenChange={setOpen}>
        <SheetContent className="w-full sm:max-w-md flex flex-col p-0">
          <SheetHeader className="p-6 pb-4 border-b border-border">
            <SheetTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5 text-primary" />
              Ma commande
            </SheetTitle>
            <SheetDescription>
              Ajoutez plusieurs produits, ajustez les quantités, puis envoyez
              votre commande par WhatsApp ou par email.
            </SheetDescription>
          </SheetHeader>

          {/* Liste des articles */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="py-12 text-center text-muted-foreground">
                <ShoppingCart className="h-10 w-10 mx-auto mb-3 opacity-40" />
                Votre panier est vide.
                <br />
                Ajoutez des produits depuis le catalogue.
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 rounded-lg border border-border p-3"
                >
                  <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md bg-secondary">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-foreground line-clamp-2">
                      {item.name}
                    </p>
                    <p className="text-xs text-muted-foreground">{item.specs}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <div className="flex items-center rounded-md border border-border">
                        <button
                          type="button"
                          onClick={() => decrement(item.id)}
                          className="p-1.5 text-foreground hover:text-primary"
                          aria-label="Diminuer la quantité"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <input
                          type="number"
                          min={1}
                          value={item.quantity}
                          onChange={(e) =>
                            setQuantity(
                              item.id,
                              Math.max(1, Number(e.target.value) || 1)
                            )
                          }
                          className="w-10 border-x border-border bg-transparent py-1 text-center text-sm text-foreground outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => increment(item.id)}
                          className="p-1.5 text-foreground hover:text-primary"
                          aria-label="Augmenter la quantité"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="ml-auto p-1.5 text-destructive hover:bg-destructive/10 rounded-md"
                        aria-label="Retirer du panier"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}

            {items.length > 0 && (
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">
                    Vos coordonnées
                  </span>
                  <button
                    type="button"
                    onClick={clear}
                    className="text-xs text-muted-foreground hover:text-destructive"
                  >
                    Vider le panier
                  </button>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="cart-name">Nom *</Label>
                  <Input
                    id="cart-name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Votre nom"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="cart-company">Entreprise</Label>
                    <Input
                      id="cart-company"
                      name="company"
                      value={form.company}
                      onChange={handleChange}
                      placeholder="Optionnel"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="cart-phone">Téléphone</Label>
                    <Input
                      id="cart-phone"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+237 6XX..."
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="cart-address">Adresse de livraison</Label>
                  <Input
                    id="cart-address"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="Optionnel"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="cart-note">Note</Label>
                  <Textarea
                    id="cart-note"
                    name="note"
                    rows={2}
                    value={form.note}
                    onChange={handleChange}
                    placeholder="Précisions sur la commande (optionnel)"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Actions de commande */}
          {items.length > 0 && (
            <div className="border-t border-border p-6 space-y-3">
              {error && <p className="text-sm text-destructive">{error}</p>}
              <p className="text-xs text-muted-foreground">
                {count} article{count > 1 ? "s" : ""} · Le prix vous sera
                communiqué en réponse à votre commande.
              </p>
              <Button
                onClick={sendWhatsApp}
                className="w-full gap-2 bg-[#25D366] text-white hover:bg-[#1ebe5b]"
              >
                <MessageCircle className="h-5 w-5" />
                Commander via WhatsApp
              </Button>
              <Button
                onClick={sendEmail}
                variant="outline"
                className="w-full gap-2 border-border"
              >
                <Mail className="h-5 w-5" />
                Commander par Email
              </Button>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
