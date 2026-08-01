import crypto from "crypto";
import { cookies } from "next/headers";
import { ADMIN_CODE } from "@/lib/admin";

const COOKIE_NAME = "cpra_admin";

/** Code administrateur : variable d'environnement ADMIN_CODE, sinon valeur par défaut. */
export function getAdminCode(): string {
  return process.env.ADMIN_CODE || ADMIN_CODE;
}

/** Jeton de session (empreinte du code) — sans caractères spéciaux, sûr en cookie. */
export function sessionToken(): string {
  return crypto.createHash("sha256").update(getAdminCode()).digest("hex");
}

export const ADMIN_COOKIE = COOKIE_NAME;

/** Vrai si la requête courante provient d'un administrateur connecté. */
export async function isAdminRequest(): Promise<boolean> {
  const store = await cookies();
  return store.get(COOKIE_NAME)?.value === sessionToken();
}
