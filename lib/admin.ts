// Code d'accès administrateur.
// NOTE DE SÉCURITÉ : ce site est statique (sans backend). Le contrôle d'accès
// est donc réalisé côté navigateur et ne protège que l'interface d'édition
// locale (localStorage). Pour une sécurité réelle multi-utilisateurs, il faut
// un backend avec authentification serveur.
export const ADMIN_CODE = "cpra=\"çé=çàé'_çèà)jkdhjg";

export function isValidAdminCode(code: string): boolean {
  return code === ADMIN_CODE;
}
