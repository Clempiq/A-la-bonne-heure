# À la bonne heure

Chaque matin, les bonnes nouvelles importantes de l'actualité française et internationale : vérifiées, sourcées, sans enjoliver.

- **Site** : https://a-la-bonne-heure.vercel.app
- **Contenu** : un fichier JSON par jour dans `editions/`, règles éditoriales dans `REDACTION.md`
- **Stack** : Astro (statique), police Source Serif 4 auto-hébergée, installable sur l'écran d'accueil (manifest + service worker), déployé par Vercel à chaque push sur `main`
- **Publication** : une tâche planifiée Claude fait les recherches chaque matin, écrit l'édition du jour, lance `npm run build` (contrôle qualité compris) et pousse sur `main`

```bash
npm install
npm run dev     # site en local
npm run check   # contrôle qualité des éditions seul
npm run build   # contrôle qualité + build
```
