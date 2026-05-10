# CPRA Technology

Site vitrine de **ChemProcess Africa Technology SARL** — [cpratechnology.com](https://cpratechnology.com)

Construit avec Next.js 16, React 19, Tailwind CSS et shadcn/ui.

## Développement local

```bash
npm install
npm run dev
```

Ouvre [http://localhost:3000](http://localhost:3000).

## Test Docker en local

Valide que l'image se build et tourne correctement avant de pousser :

```bash
docker compose -f docker-compose.test.yml up --build
```

Ouvre [http://localhost:3000](http://localhost:3000), puis :

```bash
docker compose -f docker-compose.test.yml down
```

## Pipeline CI/CD

Chaque push sur `main` déclenche le workflow [build-push.yml](.github/workflows/build-push.yml) :

1. Build de l'image Docker (multi-stage, Next.js standalone)
2. Push sur GitHub Container Registry avec deux tags :
   - `ghcr.io/mendouavinny/cpra-technologie:latest`
   - `ghcr.io/mendouavinny/cpra-technologie:sha-<commit>`

## Déploiement VPS

Prérequis : Docker, Docker Compose et Traefik déjà installés sur le serveur.

### Première fois

```bash
# 1. Autoriser Docker à lire le registry GitHub
echo "<GITHUB_TOKEN>" | docker login ghcr.io -u Mendouavinny --password-stdin

# 2. Copier les fichiers nécessaires sur le VPS
scp docker-compose.yml .env user@vps:~/cpra/

# 3. Lancer
cd ~/cpra
docker compose pull && docker compose up -d
```

> Le token GitHub doit avoir le scope `read:packages`.  
> Génère-le sur GitHub → Settings → Developer settings → Personal access tokens.

### Mise à jour

```bash
docker compose pull && docker compose up -d
```

Pour rollback vers un commit précis :

```bash
docker compose down
# Éditer docker-compose.yml : remplacer :latest par :sha-<commit>
docker compose pull && docker compose up -d
```
