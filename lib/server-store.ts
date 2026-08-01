import { promises as fs } from "fs";
import path from "path";
import {
  DEFAULT_SITE_STATE,
  type JobApplication,
  type SiteState,
} from "@/lib/site-defaults";

/**
 * Base de données "simple" : un fichier JSON stocké sur le serveur.
 * Aucune inscription ni service externe requis.
 *
 * ⚠️ Nécessite que le site tourne comme une application Node
 * (`npm run build && npm start`) sur un hébergement qui conserve le disque.
 */

export type SiteContent = Omit<SiteState, "applications">;

const DATA_DIR = path.join(process.cwd(), "data");
const FILE = path.join(DATA_DIR, "store.json");

async function ensureDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

async function readStore(): Promise<SiteState> {
  try {
    const raw = await fs.readFile(FILE, "utf8");
    const parsed = JSON.parse(raw) as Partial<SiteState>;
    return { ...DEFAULT_SITE_STATE, ...parsed };
  } catch {
    // Fichier absent ou illisible : on repart des valeurs par défaut.
    return DEFAULT_SITE_STATE;
  }
}

async function writeStore(state: SiteState) {
  await ensureDir();
  await fs.writeFile(FILE, JSON.stringify(state, null, 2), "utf8");
}

/** Contenu public du site (sans les candidatures). */
export async function getContent(): Promise<SiteContent> {
  const state = await readStore();
  const { applications: _applications, ...content } = state;
  return content;
}

/** Remplace le contenu éditable (réservé à l'admin). */
export async function saveContent(content: SiteContent) {
  const state = await readStore();
  await writeStore({ ...state, ...content });
}

/** Liste des candidatures (réservé à l'admin). */
export async function getApplications(): Promise<JobApplication[]> {
  const state = await readStore();
  return state.applications;
}

/** Ajoute une candidature (public). */
export async function addApplication(
  application: Omit<JobApplication, "id" | "date">
): Promise<JobApplication> {
  const state = await readStore();
  const id =
    state.applications.reduce(
      (max, a) => Math.max(max, typeof a.id === "number" ? a.id : 0),
      0
    ) + 1;
  const record: JobApplication = {
    ...application,
    id,
    date: new Date().toISOString(),
  };
  await writeStore({
    ...state,
    applications: [record, ...state.applications],
  });
  return record;
}

/** Supprime une candidature (réservé à l'admin). */
export async function deleteApplication(id: number | string) {
  const state = await readStore();
  await writeStore({
    ...state,
    applications: state.applications.filter(
      (a) => String(a.id) !== String(id)
    ),
  });
}

/** Réinitialise tout le contenu aux valeurs par défaut. */
export async function resetStore() {
  await writeStore(DEFAULT_SITE_STATE);
}
