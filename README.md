# À la bonne heure

> Les bonnes nouvelles importantes de l'actualité française et internationale : vérifiées, sourcées, sans enjoliver.

**Site :** [a-la-bonne-heure.vercel.app](https://a-la-bonne-heure.vercel.app)

## Le problème

L'actualité est dominée par les mauvaises nouvelles, et les sites de « bonnes nouvelles » tombent souvent dans l'anecdotique ou l'exagération. Il manque un endroit qui recense les progrès réels (santé, paix, environnement, économie) avec le sérieux d'un journal.

**Pour qui :** un lecteur adulte et curieux, qui suit l'actualité à la télévision et dans le journal, n'est pas technophile et lit sur téléphone ou tablette. Il doit refermer le site mieux informé, pas bercé d'illusions.

## Fonctionnalités clés

- **Éditions en cinq rubriques** : santé et science, monde, environnement, économie et société, France.
- **Critères éditoriaux stricts** (dans [REDACTION.md](REDACTION.md)) : une avancée concrète, mesurable, vérifiée, qui touche beaucoup de monde ; liste explicite de ce qui n'entre jamais.
- **Archives**, **flux RSS** et **plan du site**.
- **Lisibilité** : police Source Serif 4 auto-hébergée, mise en page pensée pour la lecture sur mobile.
- **Installable sur l'écran d'accueil** (manifeste + service worker).
- **Contrôle qualité au build** : `scripts/check-editions.mjs` bloque la publication d'une édition mal formée.
- **Publication autonome** : une tâche planifiée Claude fait les recherches, écrit l'édition au format JSON, lance le build et pousse sur `main`. Vercel déploie à chaque push.

## Stack

| Catégorie | Technologie |
|---|---|
| Site | Astro (génération statique), `@astrojs/rss`, `@astrojs/sitemap` |
| Contenu | Un fichier JSON par édition dans `editions/` |
| Automatisation | Tâche planifiée Claude dans le cloud |
| Déploiement | Vercel, à chaque push sur `main` |

## Lancer en local

```bash
npm install
npm run dev     # site en local
npm run check   # contrôle qualité des éditions seul
npm run build   # contrôle qualité + build
```

## Statut

✅ **En production.** Lancé en édition quotidienne en octobre 2026, passé en édition hebdomadaire (le dimanche). Projet jumeau du [Fil IA](https://github.com/Clempiq/veille-ia), avec la même architecture.

## Ce que j'ai appris

- **Écrire pour un lecteur précis** : un persona décrit dans les règles éditoriales guide le ton, le vocabulaire et la sélection.
- **Transformer une exigence de qualité en règles vérifiables** : critères d'entrée, exclusions explicites, contrôle automatique au build.
- **Réutiliser une architecture éprouvée** : partir du Fil IA m'a permis de livrer vite et de me concentrer sur le contenu.
