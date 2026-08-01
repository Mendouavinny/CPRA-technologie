"use client";

import { type ChangeEvent, type FormEvent, useState } from "react";
import {
  Briefcase,
  Building2,
  CheckCircle,
  GraduationCap,
  MapPin,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSiteStore } from "@/components/site-store";
import type { CareerOpening } from "@/lib/site-defaults";

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  type: "Emploi",
  position: "",
  message: "",
};

export function Careers() {
  const { state, addApplication } = useSiteStore();
  const { careerOpenings, messages, contact } = state;
  const [formData, setFormData] = useState(emptyForm);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const jobs = careerOpenings.filter((o) => o.type === "Emploi");
  const internships = careerOpenings.filter((o) => o.type === "Stage");

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const applyTo = (opening: CareerOpening) => {
    setFormData((current) => ({
      ...current,
      type: opening.type,
      position: opening.title,
    }));
    document
      .getElementById("candidature-form")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    // Enregistrement local (consultable par l'administrateur).
    addApplication(formData);

    // Ouverture de la messagerie pour transmettre la candidature.
    const subject = `Candidature (${formData.type}) - ${formData.position || "Spontanée"} - ${formData.name}`;
    const body = [
      "Bonjour CPRA TECHNOLOGY,",
      "",
      `Je souhaite déposer une candidature pour un(e) ${formData.type.toLowerCase()}.`,
      "",
      `Poste visé : ${formData.position || "Candidature spontanée"}`,
      `Nom : ${formData.name}`,
      `Email : ${formData.email}`,
      `Téléphone : ${formData.phone || "Non renseigné"}`,
      "",
      "Message / motivation :",
      formData.message,
      "",
      "(Merci de joindre mon CV à ce message.)",
      "",
      "Cordialement.",
    ].join("\n");

    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    setIsSubmitted(true);
    window.setTimeout(() => setIsSubmitted(false), 4000);
    setFormData(emptyForm);
  };

  const renderOpenings = (
    openings: CareerOpening[],
    Icon: typeof Briefcase,
    emptyLabel: string
  ) => (
    <div className="space-y-4">
      {openings.length === 0 && (
        <p className="text-sm text-muted-foreground">{emptyLabel}</p>
      )}
      {openings.map((opening) => (
        <div
          key={opening.id}
          className="p-5 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-lg bg-primary/10 flex-shrink-0">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-card-foreground">
                  {opening.title}
                </h4>
                <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <Building2 className="h-3.5 w-3.5" />
                    {opening.department}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    {opening.location}
                  </span>
                </div>
              </div>
            </div>
            <span
              className={`text-xs font-medium px-2.5 py-1 rounded-full flex-shrink-0 ${
                opening.type === "Emploi"
                  ? "bg-primary/10 text-primary"
                  : "bg-secondary text-foreground"
              }`}
            >
              {opening.type}
            </span>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            {opening.description}
          </p>
          <Button
            size="sm"
            onClick={() => applyTo(opening)}
            className="mt-4 bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Postuler
          </Button>
        </div>
      ))}
    </div>
  );

  return (
    <section id="carriere" className="py-20 bg-background scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            Carrière
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-foreground">
            Rejoignez nos équipes
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            {messages.careersIntro}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <div>
            <h3 className="flex items-center gap-2 text-xl font-semibold text-foreground mb-5">
              <Briefcase className="h-5 w-5 text-primary" />
              Offres d&apos;emploi
            </h3>
            {renderOpenings(
              jobs,
              Briefcase,
              "Aucune offre d'emploi pour le moment. Déposez une candidature spontanée."
            )}
          </div>
          <div>
            <h3 className="flex items-center gap-2 text-xl font-semibold text-foreground mb-5">
              <GraduationCap className="h-5 w-5 text-primary" />
              Offres de stage
            </h3>
            {renderOpenings(
              internships,
              GraduationCap,
              "Aucune offre de stage pour le moment. Déposez une candidature spontanée."
            )}
          </div>
        </div>

        <div
          id="candidature-form"
          className="scroll-mt-28 p-8 rounded-2xl bg-card border border-border"
        >
          <h3 className="text-xl font-semibold text-card-foreground mb-1">
            Déposer une candidature
          </h3>
          <p className="text-sm text-muted-foreground mb-6">
            Candidature spontanée ou en réponse à une offre : remplissez le
            formulaire ci-dessous.
          </p>

          <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="c-name" className="text-sm font-medium text-card-foreground">
                Nom complet *
              </label>
              <Input
                id="c-name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Votre nom"
                className="bg-input border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="c-email" className="text-sm font-medium text-card-foreground">
                Email *
              </label>
              <Input
                id="c-email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="votre@email.com"
                className="bg-input border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="c-phone" className="text-sm font-medium text-card-foreground">
                Téléphone
              </label>
              <Input
                id="c-phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+237 6XX XXX XXX"
                className="bg-input border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="c-type" className="text-sm font-medium text-card-foreground">
                Type de demande *
              </label>
              <select
                id="c-type"
                name="type"
                required
                value={formData.type}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-md bg-input border border-border text-foreground"
              >
                <option value="Emploi">Emploi</option>
                <option value="Stage">Stage</option>
              </select>
            </div>

            <div className="sm:col-span-2 space-y-2">
              <label htmlFor="c-position" className="text-sm font-medium text-card-foreground">
                Poste souhaité
              </label>
              <Input
                id="c-position"
                name="position"
                value={formData.position}
                onChange={handleChange}
                placeholder="Ex : Data Analyst, ou candidature spontanée"
                className="bg-input border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>

            <div className="sm:col-span-2 space-y-2">
              <label htmlFor="c-message" className="text-sm font-medium text-card-foreground">
                Message / Motivation *
              </label>
              <textarea
                id="c-message"
                name="message"
                required
                rows={5}
                value={formData.message}
                onChange={handleChange}
                placeholder="Présentez-vous, vos compétences et vos motivations..."
                className="w-full px-3 py-2 rounded-md bg-input border border-border text-foreground placeholder:text-muted-foreground resize-none"
              />
            </div>

            <div className="sm:col-span-2 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitted}
                className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
              >
                {isSubmitted ? (
                  <>
                    <CheckCircle className="h-5 w-5" />
                    Candidature envoyée
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    Envoyer ma candidature
                  </>
                )}
              </Button>
              <span className="text-xs text-muted-foreground">
                Votre messagerie s&apos;ouvre pour joindre votre CV. Pensez à
                l&apos;attacher avant l&apos;envoi.
              </span>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
