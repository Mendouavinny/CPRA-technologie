# Base de données du site — CPRA TECHNOLOGY (version simple, sans compte externe)

La base de données est **un simple fichier JSON** stocké sur le serveur du site
(`data/store.json`), piloté par des **routes API Next.js**.

✅ **Aucune inscription, aucun service externe, aucune clé, aucun paiement.**
Les modifications de l'administrateur sont **partagées avec tous les visiteurs**.

---

## 1. Comment ça marche

- Le contenu du site (produits, formations, offres, coordonnées, textes) et les
  candidatures sont enregistrés dans **`data/store.json`**, créé automatiquement
  au premier lancement à partir des valeurs par défaut.
- Le site lit/écrit ces données via des **routes API** intégrées :

| Route API              | Méthode | Rôle                                    | Accès           |
| ---------------------- | ------- | --------------------------------------- | --------------- |
| `/api/content`         | GET     | Lire le contenu du site                 | Public          |
| `/api/content`         | PUT     | Modifier le contenu                     | Admin connecté  |
| `/api/applications`    | POST    | Envoyer une candidature                 | Public          |
| `/api/applications`    | GET     | Lister les candidatures                 | Admin connecté  |
| `/api/applications`    | DELETE  | Supprimer une candidature               | Admin connecté  |
| `/api/login`           | POST    | Se connecter (code admin)               | Public          |
| `/api/logout`          | POST    | Se déconnecter                          | Admin connecté  |
| `/api/reset`           | POST    | Réinitialiser le contenu                | Admin connecté  |

- La connexion admin dépose un **cookie sécurisé `httpOnly`** ; le serveur vérifie
  ce cookie avant toute écriture. Le code n'est jamais stocké en clair côté client.

---

## 2. Structure des données (`data/store.json`)

```json
{
  "products": [ /* liste de produits */ ],
  "categories": [ "Tous", "Acides", ... ],
  "formations": [ /* liste de formations */ ],
  "careerOpenings": [ /* offres d'emploi et de stage */ ],
  "contact": { "brandName": "...", "email": "...", "phone": "...", ... },
  "messages": { "announcement": "...", "formationIntro": "...", ... },
  "applications": [ /* candidatures reçues */ ]
}
```

Le détail de chaque champ (Product, Formation, CareerOpening, ContactInfo,
SiteMessages, JobApplication) est défini dans `lib/site-defaults.ts`.

---

## 3. Sécurité

| Donnée                | Lecture         | Écriture / suppression        |
| --------------------- | --------------- | ----------------------------- |
| Contenu du site       | Tout le monde   | Admin connecté uniquement     |
| Candidatures          | Admin connecté  | Envoi : public · Suppression : admin |

- Le **code administrateur** est celui du projet par défaut.
- Pour le **changer**, ajoute une variable `ADMIN_CODE=ton-code` dans le fichier
  `.env` (utilisé par Docker) ou `.env.local` (en local).

---

## 4. Déploiement (IMPORTANT pour ne pas perdre les données)

Le site tourne comme une **application Node** (déjà configuré en Docker dans ce dépôt).

### Avec Docker (ta configuration actuelle : image GHCR + Traefik)

La base est un fichier sur le disque du conteneur. **Sans volume, les données
seraient effacées à chaque redéploiement.** C'est déjà corrigé :

- `docker-compose.yml` monte un **volume persistant** `cpra-data` sur `/app/data`.
- Le `Dockerfile` crée `/app/data` avec les bons droits.

➡️ **Tu n'as rien à faire de plus** : relance simplement ton déploiement habituel
(`docker compose pull && docker compose up -d`). Les modifications de l'admin
survivront désormais aux redéploiements.

> 💾 **Sauvegarde** : pour sauvegarder la base, copie le fichier du volume :
> `docker cp cpra-app:/app/data/store.json ./sauvegarde-store.json`

### En local (pour tester)

```
npm install
npm run build
npm start
```

Puis ouvre http://localhost:3000. Le fichier `data/store.json` est créé
automatiquement.

> ⚠️ **Hébergements « serverless » (Vercel, Netlify)** : leur système de fichiers
> est temporaire/en lecture seule, donc cette base fichier **n'y persiste pas**.
> Ta configuration **Docker/VPS** est parfaite pour cette solution — reste dessus.

---

## 5. Initialiser / réinitialiser les données

Au premier lancement, la base contient déjà **tout le contenu par défaut**
(50 produits, formations, offres, etc.).

Pour tout remettre à zéro : connexion admin → **Panneau admin → « Réinitialiser le site »**.

---

## 6. Repli automatique (mode local)

Si le site est ouvert sans serveur API disponible (ex. prévisualisation statique),
il bascule automatiquement en **mode local** (localStorage), afin de toujours
fonctionner. Dès que le serveur est là, il repasse en **mode partagé**.
