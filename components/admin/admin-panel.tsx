"use client";

import { type ChangeEvent, type FormEvent, useState } from "react";
import { RotateCcw, Trash2, Plus, Save, Upload } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useSiteStore } from "@/components/site-store";
import type { ContactInfo, SiteMessages } from "@/lib/site-defaults";

function toList(value: string): string[] {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

/* -------------------------------------------------------------------- */
/*  Onglet Produits                                                     */
/* -------------------------------------------------------------------- */

function ProductsTab() {
  const { state, addProduct, removeProduct, uploadImage } = useSiteStore();
  const productCategories = state.categories.filter((c) => c !== "Tous");
  const [form, setForm] = useState({
    name: "",
    category: productCategories[0] ?? "Acides",
    specs: "",
    image: "/placeholder.jpg",
    description: "",
    usage: "",
    technical: "",
  });
  const [uploading, setUploading] = useState(false);

  const handleImage = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadImage(file);
      setForm((f) => ({ ...f, image: url }));
    } finally {
      setUploading(false);
    }
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!form.name.trim()) return;
    addProduct({
      name: form.name.trim(),
      category: form.category,
      description: form.description.trim(),
      image: form.image.trim() || "/placeholder.jpg",
      specs: form.specs.trim(),
      usage: form.usage.trim(),
      technical: toList(form.technical),
    });
    setForm((f) => ({
      ...f,
      name: "",
      specs: "",
      description: "",
      usage: "",
      technical: "",
      image: "/placeholder.jpg",
    }));
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <form
        onSubmit={submit}
        className="space-y-3 p-4 rounded-lg border border-border bg-secondary/30"
      >
        <h4 className="font-semibold text-foreground">Ajouter un produit</h4>
        <div className="space-y-1.5">
          <Label>Nom *</Label>
          <Input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Ex : Acide sulfurique H2SO4"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label>Catégorie</Label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full px-3 py-2 rounded-md bg-input border border-border text-foreground text-sm"
            >
              {productCategories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-1.5">
            <Label>Caractéristiques</Label>
            <Input
              value={form.specs}
              onChange={(e) => setForm({ ...form, specs: e.target.value })}
              placeholder="Ex : 98% | 25 L"
            />
          </div>
        </div>
        <div className="space-y-1.5">
          <Label>Photo du produit</Label>
          <div className="flex items-center gap-3">
            <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-border bg-secondary">
              {/* Aperçu (image importée ou par défaut). */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={form.image}
                alt="Aperçu"
                className="h-full w-full object-cover"
              />
            </div>
            <label className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-border bg-input px-3 py-2 text-sm text-foreground hover:bg-secondary">
              <Upload className="h-4 w-4" />
              {uploading ? "Import en cours..." : "Importer une image"}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImage}
                disabled={uploading}
              />
            </label>
          </div>
          <p className="text-xs text-muted-foreground">
            Choisis une photo depuis ton appareil (redimensionnée automatiquement).
          </p>
        </div>
        <div className="space-y-1.5">
          <Label>Description</Label>
          <Textarea
            rows={2}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>
        <div className="space-y-1.5">
          <Label>Utilisation</Label>
          <Textarea
            rows={2}
            value={form.usage}
            onChange={(e) => setForm({ ...form, usage: e.target.value })}
          />
        </div>
        <div className="space-y-1.5">
          <Label>Caractéristiques techniques (séparées par des virgules)</Label>
          <Input
            value={form.technical}
            onChange={(e) => setForm({ ...form, technical: e.target.value })}
            placeholder="Qualité industrielle, Corrosif, ..."
          />
        </div>
        <Button type="submit" className="w-full gap-2">
          <Plus className="h-4 w-4" />
          Ajouter le produit
        </Button>
      </form>

      <div className="space-y-2">
        <h4 className="font-semibold text-foreground">
          Produits ({state.products.length})
        </h4>
        <div className="max-h-[420px] overflow-y-auto space-y-2 pr-1">
          {state.products.map((product) => (
            <div
              key={product.id}
              className="flex items-center justify-between gap-3 p-3 rounded-lg border border-border bg-card"
            >
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {product.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {product.category} · {product.specs}
                </p>
              </div>
              <Button
                size="icon"
                variant="ghost"
                className="text-destructive hover:text-destructive hover:bg-destructive/10 flex-shrink-0"
                onClick={() => removeProduct(product.id)}
                aria-label={`Supprimer ${product.name}`}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------- */
/*  Onglet Formations                                                   */
/* -------------------------------------------------------------------- */

function FormationsTab() {
  const { state, addFormation, removeFormation } = useSiteStore();
  const [form, setForm] = useState({
    title: "",
    category: "Data & IA",
    level: "Débutant",
    duration: "",
    mode: "Présentiel",
    price: "Sur devis",
    description: "",
    highlights: "",
  });

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!form.title.trim()) return;
    addFormation({
      title: form.title.trim(),
      category: form.category,
      level: form.level,
      duration: form.duration.trim() || "À définir",
      mode: form.mode,
      price: form.price.trim() || "Sur devis",
      description: form.description.trim(),
      highlights: toList(form.highlights),
    });
    setForm((f) => ({
      ...f,
      title: "",
      duration: "",
      description: "",
      highlights: "",
    }));
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <form
        onSubmit={submit}
        className="space-y-3 p-4 rounded-lg border border-border bg-secondary/30"
      >
        <h4 className="font-semibold text-foreground">Ajouter une formation</h4>
        <div className="space-y-1.5">
          <Label>Titre *</Label>
          <Input
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label>Catégorie</Label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full px-3 py-2 rounded-md bg-input border border-border text-foreground text-sm"
            >
              {["Data & IA", "Développement", "Bureautique", "Industrie"].map(
                (c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                )
              )}
            </select>
          </div>
          <div className="space-y-1.5">
            <Label>Niveau</Label>
            <select
              value={form.level}
              onChange={(e) => setForm({ ...form, level: e.target.value })}
              className="w-full px-3 py-2 rounded-md bg-input border border-border text-foreground text-sm"
            >
              {["Débutant", "Intermédiaire", "Avancé"].map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-1.5">
            <Label>Durée</Label>
            <Input
              value={form.duration}
              onChange={(e) => setForm({ ...form, duration: e.target.value })}
              placeholder="Ex : 8 semaines"
            />
          </div>
          <div className="space-y-1.5">
            <Label>Modalité</Label>
            <select
              value={form.mode}
              onChange={(e) => setForm({ ...form, mode: e.target.value })}
              className="w-full px-3 py-2 rounded-md bg-input border border-border text-foreground text-sm"
            >
              {["Présentiel", "En ligne", "Hybride"].map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="space-y-1.5">
          <Label>Tarif</Label>
          <Input
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />
        </div>
        <div className="space-y-1.5">
          <Label>Description</Label>
          <Textarea
            rows={2}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>
        <div className="space-y-1.5">
          <Label>Points clés (séparés par des virgules)</Label>
          <Input
            value={form.highlights}
            onChange={(e) => setForm({ ...form, highlights: e.target.value })}
            placeholder="Python, Projets pratiques, Certificat"
          />
        </div>
        <Button type="submit" className="w-full gap-2">
          <Plus className="h-4 w-4" />
          Ajouter la formation
        </Button>
      </form>

      <div className="space-y-2">
        <h4 className="font-semibold text-foreground">
          Formations ({state.formations.length})
        </h4>
        <div className="max-h-[420px] overflow-y-auto space-y-2 pr-1">
          {state.formations.map((formation) => (
            <div
              key={formation.id}
              className="flex items-center justify-between gap-3 p-3 rounded-lg border border-border bg-card"
            >
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {formation.title}
                </p>
                <p className="text-xs text-muted-foreground">
                  {formation.category} · {formation.level} · {formation.duration}
                </p>
              </div>
              <Button
                size="icon"
                variant="ghost"
                className="text-destructive hover:text-destructive hover:bg-destructive/10 flex-shrink-0"
                onClick={() => removeFormation(formation.id)}
                aria-label={`Supprimer ${formation.title}`}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------- */
/*  Onglet Carrières                                                    */
/* -------------------------------------------------------------------- */

function CareersTab() {
  const { state, addOpening, removeOpening } = useSiteStore();
  const [form, setForm] = useState({
    title: "",
    type: "Emploi" as "Emploi" | "Stage",
    department: "",
    location: "Douala, Cameroun",
    description: "",
  });

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!form.title.trim()) return;
    addOpening({
      title: form.title.trim(),
      type: form.type,
      department: form.department.trim() || "Général",
      location: form.location.trim(),
      description: form.description.trim(),
    });
    setForm((f) => ({ ...f, title: "", department: "", description: "" }));
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <form
        onSubmit={submit}
        className="space-y-3 p-4 rounded-lg border border-border bg-secondary/30"
      >
        <h4 className="font-semibold text-foreground">Ajouter une offre</h4>
        <div className="space-y-1.5">
          <Label>Intitulé du poste *</Label>
          <Input
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label>Type</Label>
            <select
              value={form.type}
              onChange={(e) =>
                setForm({ ...form, type: e.target.value as "Emploi" | "Stage" })
              }
              className="w-full px-3 py-2 rounded-md bg-input border border-border text-foreground text-sm"
            >
              <option value="Emploi">Emploi</option>
              <option value="Stage">Stage</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <Label>Département</Label>
            <Input
              value={form.department}
              onChange={(e) => setForm({ ...form, department: e.target.value })}
              placeholder="Service IA & Data"
            />
          </div>
        </div>
        <div className="space-y-1.5">
          <Label>Lieu</Label>
          <Input
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
          />
        </div>
        <div className="space-y-1.5">
          <Label>Description</Label>
          <Textarea
            rows={3}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>
        <Button type="submit" className="w-full gap-2">
          <Plus className="h-4 w-4" />
          Ajouter l&apos;offre
        </Button>
      </form>

      <div className="space-y-2">
        <h4 className="font-semibold text-foreground">
          Offres ({state.careerOpenings.length})
        </h4>
        <div className="max-h-[420px] overflow-y-auto space-y-2 pr-1">
          {state.careerOpenings.map((opening) => (
            <div
              key={opening.id}
              className="flex items-center justify-between gap-3 p-3 rounded-lg border border-border bg-card"
            >
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {opening.title}
                </p>
                <p className="text-xs text-muted-foreground">
                  {opening.type} · {opening.department} · {opening.location}
                </p>
              </div>
              <Button
                size="icon"
                variant="ghost"
                className="text-destructive hover:text-destructive hover:bg-destructive/10 flex-shrink-0"
                onClick={() => removeOpening(opening.id)}
                aria-label={`Supprimer ${opening.title}`}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------- */
/*  Onglet Contact                                                      */
/* -------------------------------------------------------------------- */

const contactFields: { key: keyof ContactInfo; label: string }[] = [
  { key: "brandName", label: "Nom de la marque" },
  { key: "legalName", label: "Raison sociale" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Téléphone" },
  { key: "address", label: "Adresse" },
  { key: "hours", label: "Horaires" },
  { key: "website", label: "Site web" },
  { key: "whatsappUrl", label: "Lien WhatsApp" },
];

function ContactTab() {
  const { state, updateContact } = useSiteStore();
  const [form, setForm] = useState<ContactInfo>(state.contact);
  const [saved, setSaved] = useState(false);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    updateContact(form);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2500);
  };

  return (
    <form onSubmit={submit} className="max-w-2xl space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        {contactFields.map((field) => (
          <div key={field.key} className="space-y-1.5">
            <Label>{field.label}</Label>
            <Input
              value={form[field.key]}
              onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
            />
          </div>
        ))}
      </div>
      <div className="flex items-center gap-3">
        <Button type="submit" className="gap-2">
          <Save className="h-4 w-4" />
          Enregistrer les coordonnées
        </Button>
        {saved && (
          <span className="text-sm text-primary">Modifications enregistrées.</span>
        )}
      </div>
    </form>
  );
}

/* -------------------------------------------------------------------- */
/*  Onglet Textes / Messages                                            */
/* -------------------------------------------------------------------- */

const messageFields: { key: keyof SiteMessages; label: string }[] = [
  { key: "announcement", label: "Bandeau d'annonce (en haut du site)" },
  { key: "formationIntro", label: "Introduction — Formation" },
  { key: "aiIntro", label: "Introduction — Service IA" },
  { key: "careersIntro", label: "Introduction — Carrière" },
];

function MessagesTab() {
  const { state, updateMessages } = useSiteStore();
  const [form, setForm] = useState<SiteMessages>(state.messages);
  const [saved, setSaved] = useState(false);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    updateMessages(form);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2500);
  };

  return (
    <form onSubmit={submit} className="max-w-2xl space-y-4">
      {messageFields.map((field) => (
        <div key={field.key} className="space-y-1.5">
          <Label>{field.label}</Label>
          <Textarea
            rows={2}
            value={form[field.key]}
            onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
          />
        </div>
      ))}
      <div className="flex items-center gap-3">
        <Button type="submit" className="gap-2">
          <Save className="h-4 w-4" />
          Enregistrer les textes
        </Button>
        {saved && (
          <span className="text-sm text-primary">Modifications enregistrées.</span>
        )}
      </div>
    </form>
  );
}

/* -------------------------------------------------------------------- */
/*  Onglet Candidatures                                                 */
/* -------------------------------------------------------------------- */

function ApplicationsTab() {
  const { state, removeApplication } = useSiteStore();

  if (state.applications.length === 0) {
    return (
      <p className="text-sm text-muted-foreground py-8 text-center">
        Aucune candidature reçue pour le moment.
      </p>
    );
  }

  return (
    <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1">
      {state.applications.map((app) => (
        <div
          key={app.id}
          className="p-4 rounded-lg border border-border bg-card"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-medium text-foreground">
                {app.name}{" "}
                <span className="text-xs font-normal text-muted-foreground">
                  ({app.type})
                </span>
              </p>
              <p className="text-xs text-muted-foreground">
                {app.position || "Candidature spontanée"}
              </p>
            </div>
            <Button
              size="icon"
              variant="ghost"
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={() => removeApplication(app.id)}
              aria-label="Supprimer la candidature"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          <div className="mt-2 text-xs text-muted-foreground space-x-3">
            <a href={`mailto:${app.email}`} className="hover:text-primary">
              {app.email}
            </a>
            {app.phone && <span>{app.phone}</span>}
            <span>{new Date(app.date).toLocaleString("fr-FR")}</span>
          </div>
          {app.message && (
            <p className="mt-2 text-sm text-foreground/80 whitespace-pre-line">
              {app.message}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------- */
/*  Panneau principal                                                   */
/* -------------------------------------------------------------------- */

export function AdminPanel({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { resetSite, usingCloud } = useSiteStore();

  const handleReset = () => {
    if (
      window.confirm(
        "Réinitialiser tout le contenu du site aux valeurs par défaut ? Cette action est irréversible."
      )
    ) {
      resetSite();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-5xl max-h-[92vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Espace administrateur</DialogTitle>
          <DialogDescription>
            Gérez le contenu du site : produits, formations, offres de carrière,
            coordonnées, textes et candidatures.{" "}
            {usingCloud
              ? "Les modifications sont enregistrées dans la base de données et visibles par tous les visiteurs."
              : "Les modifications sont enregistrées dans ce navigateur (mode local)."}
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="produits" className="mt-2">
          <TabsList className="flex flex-wrap h-auto">
            <TabsTrigger value="produits">Produits</TabsTrigger>
            <TabsTrigger value="formations">Formations</TabsTrigger>
            <TabsTrigger value="carrieres">Carrières</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
            <TabsTrigger value="textes">Textes</TabsTrigger>
            <TabsTrigger value="candidatures">Candidatures</TabsTrigger>
          </TabsList>

          <TabsContent value="produits" className="mt-4">
            <ProductsTab />
          </TabsContent>
          <TabsContent value="formations" className="mt-4">
            <FormationsTab />
          </TabsContent>
          <TabsContent value="carrieres" className="mt-4">
            <CareersTab />
          </TabsContent>
          <TabsContent value="contact" className="mt-4">
            <ContactTab />
          </TabsContent>
          <TabsContent value="textes" className="mt-4">
            <MessagesTab />
          </TabsContent>
          <TabsContent value="candidatures" className="mt-4">
            <ApplicationsTab />
          </TabsContent>
        </Tabs>

        <div className="mt-6 pt-4 border-t border-border flex justify-end">
          <Button
            variant="outline"
            onClick={handleReset}
            className="gap-2 text-destructive border-destructive/40 hover:bg-destructive/10"
          >
            <RotateCcw className="h-4 w-4" />
            Réinitialiser le site
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
