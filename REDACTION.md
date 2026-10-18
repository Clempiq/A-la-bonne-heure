# Règles de rédaction d'À la bonne heure

Ce fichier fait autorité pour la tâche quotidienne qui publie une édition. Il est relu en entier à chaque exécution.

## Le lecteur

Un lecteur adulte, curieux, qui suit beaucoup l'actualité à la télévision et dans le journal, et qui n'est pas technophile. Il connaît le monde, il n'a pas besoin qu'on lui explique ce qu'est l'OMS, mais il n'a que faire du jargon. Il lit sur téléphone ou tablette, le matin. Il doit refermer le site mieux informé, pas bercé d'illusions.

## Ce qu'est une bonne nouvelle importante

Une avancée **concrète, mesurable et vérifiée** qui **touche beaucoup de monde** ou **change durablement les choses**. Le test : est-ce que ce fait sera encore vrai et utile dans un mois ? Est-ce qu'un journaliste sérieux le jugerait digne d'une brève ?

## Les cinq rubriques

| Clé | Libellé affiché | Exemples |
|---|---|---|
| `sante` | Santé et science | traitement validé par une autorité, maladie qui recule, vaccin, découverte scientifique majeure publiée |
| `monde` | Monde | accord de paix ou cessez-le-feu qui tient, libération d'otages ou de prisonniers politiques, recul de la faim ou de la pauvreté, élection apaisée |
| `environnement` | Environnement | espèce sauvée ou revenue, record d'énergie renouvelable, pollution en baisse, aire protégée créée, forêt qui repousse |
| `societe` | Économie et société | chômage ou inflation en baisse, loi utile adoptée, progrès pour l'éducation, les droits, l'accès à l'eau ou à l'électricité |
| `france` | France | réussite nationale concrète : chiffre officiel qui s'améliore, projet livré, décision appliquée, découverte faite en France |

Une nouvelle française qui relève clairement d'une autre rubrique (un traitement validé en France, par exemple) peut aller dans `france` ou dans sa rubrique thématique : choisir celle qui éclaire le mieux le lecteur. Viser au moins 2 entrées France quand l'actualité le permet, sans jamais faire passer une nouvelle française faible devant une nouvelle internationale forte.

## Ce qui n'entre jamais

- Faits divers, sauvetages individuels, histoires attendrissantes sans portée.
- Promesses, annonces et plans politiques sans résultat (une loi **adoptée** entre, un projet de loi **déposé** non ; un plan **financé et lancé** se discute, un plan **annoncé** non).
- Levées de fonds, communiqués d'entreprise, lancements de produits, résultats financiers.
- Sport, sauf exploit historique d'une portée exceptionnelle.
- People, célébrités, rumeurs, sondages d'opinion.
- Tout ce qui ne peut pas être recoupé dans une source sérieuse.

## Honnêteté

1. **Pas de positivité forcée.** Une journée pauvre est annoncée comme telle dans l'intro, avec `"calm": true`, et l'édition est courte. On ne gonfle jamais une nouvelle anodine pour atteindre un nombre.
2. **Les limites se disent.** Si une nouvelle n'est valable que dans un pays, si l'étude est préliminaire ou faite sur l'animal, si le chiffre vient seulement d'un gouvernement, d'une entreprise ou d'un camp, si un cessez-le-feu reste fragile : on le dit en une phrase dans le champ `caveat`, affiché sous la mention « À nuancer ». Une entrée sans limite notable n'a pas de `caveat`.
3. **Pas de propagande.** Un chiffre favorable publié par un gouvernement autoritaire ou par une partie à un conflit n'entre que s'il est recoupé par une source indépendante.
4. **Pas de parti pris politique.** On rapporte des faits et leurs effets, sans féliciter ni critiquer un camp. Une loi entre pour ce qu'elle change concrètement, pas pour qui l'a votée.

## Fraîcheur et non-répétition

1. **Fenêtre : depuis la dernière édition publiée, 72 heures au maximum.** En pratique, les faits de la veille et de l'avant-veille, et le lundi tout le week-end. Vérifier la date d'origine de chaque fait, pas seulement celle de l'article : un article d'hier qui raconte une décision vieille d'une semaine n'entre pas.
2. **Aucune redite d'un jour à l'autre.** Avant de chercher, relire les éditions des 7 derniers jours et dresser une liste d'exclusion des faits déjà publiés. Un sujet déjà publié ne revient pas, ni reformulé, ni parce qu'un autre média en parle. Seule exception : un développement réellement nouveau (décision définitive, nouveau chiffre officiel, mise en œuvre effective). Le titre commence alors par « Suite : » et l'entrée ne porte que sur ce développement, avec une phrase de rappel au maximum.
3. **Garde-fou automatique.** Le contrôle qualité refuse une entrée qui cite le même article qu'une édition des 7 jours précédents, ou dont le titre est trop proche d'un titre déjà publié, sauf si son titre commence par « Suite : ». Ce garde-fou ne remplace pas la liste d'exclusion : il attrape seulement les redites les plus visibles.

## Sources

- **1 à 3 sources par entrée**, chacune une URL directe d'article ou de communiqué officiel, obtenue dans un résultat de recherche de la session. Jamais d'URL reconstruite de mémoire, jamais de lien de redirection ou raccourci (google.com/url, news.google.com, t.co, bit.ly), jamais de page d'accueil.
- **Sources de référence** : agences (AFP, Reuters, AP), presse française (Le Monde, France Info, Le Figaro, Libération, Ouest-France, La Croix, Les Échos, 20 Minutes, Radio France), presse internationale (BBC, The Guardian, The New York Times, Le Temps, RFI, France 24, Al Jazeera), science (Nature, Science, The Lancet, NEJM, CNRS, Inserm, Institut Pasteur), institutions (OMS, ONU, Unicef, PAM, FAO, Banque mondiale, Commission européenne, Insee, Dares, Santé publique France, ministères, Journal officiel).
- **Pistes à recouper** : Fix the News, Reasons to be Cheerful, Positive News, Good News Network. Ne jamais les citer comme unique source : remonter à la source primaire ou à un grand média.
- Le nom affiché est celui du média ou de l'organisme (« Le Monde », « OMS », « Reuters »).

## Format d'une édition

Un fichier par jour : `editions/AAAA-MM-JJ.json`, à la date du jour de publication, heure de Paris.

```json
{
  "date": "2026-10-18",
  "window": "16 au 18 octobre 2026",
  "calm": false,
  "intro": "2 ou 3 phrases qui donnent la couleur du jour, sans formule creuse.",
  "items": [
    {
      "rubrique": "sante | monde | environnement | societe | france",
      "title": "Un titre qui dit l'information, sans point final",
      "summary": "3 ou 4 phrases simples et concrètes, avec les chiffres et dates utiles. 200 à 750 caractères.",
      "caveat": "Facultatif : la limite de la nouvelle, en une phrase.",
      "why": "Une phrase : pourquoi c'est important, concrètement, pour qui.",
      "sources": [{ "name": "Le Monde", "url": "https://www.lemonde.fr/..." }]
    }
  ]
}
```

- **Entre 5 et 8 entrées** les jours normaux. Moins si la journée est pauvre (`"calm": true`), 10 au maximum.
- **Ordre** : de la plus importante à la moins importante, toutes rubriques confondues. La première entrée est celle qu'on retiendrait si on n'en lisait qu'une. Varier les rubriques quand c'est possible.
- **Intro** : 2 ou 3 phrases (60 à 600 caractères) qui disent de quoi le jour est fait. Pas de « bonne nouvelle : » en ouverture, pas de point d'exclamation.

## Style

1. **Nos mots.** Le site est public. Tous les textes sont entièrement réécrits, jamais copiés ni calqués sur la structure d'un article. Aucune citation de plus de 15 mots, une seule par source au maximum, et de préférence aucune.
2. **Simple et concret.** Phrases courtes, un fait par phrase. Des chiffres, des dates, des lieux. Les sigles sont développés à la première occurrence sauf les plus connus (OMS, ONU, UE, SNCF).
3. **Le titre dit l'information.** « Le paludisme recule de 30 % au Rwanda en cinq ans », pas « Une bonne nouvelle pour le Rwanda ».
4. **Sobre.** Pas de point d'exclamation, pas d'émoji, pas de superlatifs gratuits (« incroyable », « historique » sauf si c'est littéralement une première), pas de formules creuses (« dans un monde où », « lueur d'espoir », « ça fait du bien »).
5. **Neutre et public.** Vouvoiement ou tournures neutres. Aucune référence à une personne en particulier, ni au lecteur, ni à l'auteur du site.
6. **Jamais de tiret cadratin.** Utiliser la virgule, les deux-points ou les parenthèses.

## Contrôle

`npm run check` vérifie le format, les rubriques, l'absence de redite avec les 7 derniers jours, la longueur et le nombre de phrases des résumés, les sources (1 à 3, URL directes, pas de redirection ni de page d'accueil), les citations de plus de 15 mots, les doublons de titres, l'absence de tiret cadratin et de mention personnelle. `npm run build` lance ce contrôle puis construit le site. Un build en échec n'est jamais poussé.
