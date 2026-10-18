// Contrôle qualité des éditions, lancé avant chaque build.
// Un build qui échoue ici n'est pas déployé par Vercel : le site en ligne reste intact.
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const DIR = new URL("../editions/", import.meta.url).pathname;
const RUBRIQUES = ["sante", "monde", "environnement", "societe", "france"];
const FIELDS = ["rubrique", "title", "summary", "caveat", "why", "sources"];
const REDIRECTS = /(google\.[a-z.]+\/url\?|news\.google\.|\/\/t\.co\/|bit\.ly\/|ow\.ly\/|tinyurl\.com\/|lnkd\.in\/|feedproxy\.|flipboard\.com\/)/i;
const PERSONAL = /\b(Clem|Clément|Piquenet|Clempiq|mon père|ton père|votre père)\b/i;
const errors = [];
const warnings = [];
const seenTitles = new Map();

const today = new Date(new Date().toLocaleString("en-US", { timeZone: "Europe/Paris" }));
const todayIso = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

// Nombre approximatif de phrases : ponctuation finale suivie d'une espace ou de la fin.
const sentences = (s) => (s.match(/[.!?…](?=\s|$)/g) || []).length;
// Citations entre guillemets français ou droits.
const quotes = (s) => [...s.matchAll(/«\s*([^»]+?)\s*»|"([^"]+)"/g)].map((m) => (m[1] || m[2]).trim());

const files = readdirSync(DIR).filter((f) => f.endsWith(".json")).sort();
if (files.length === 0) errors.push("Aucune édition dans editions/.");

for (const file of files) {
  const where = `editions/${file}`;
  const raw = readFileSync(join(DIR, file), "utf8");
  let ed;
  try {
    ed = JSON.parse(raw);
  } catch (e) {
    errors.push(`${where} : JSON invalide (${e.message})`);
    continue;
  }
  if (raw.includes("—")) errors.push(`${where} : tiret cadratin interdit, le remplacer par une virgule, deux-points ou parenthèses`);
  if (REDIRECTS.test(raw)) errors.push(`${where} : lien de redirection ou raccourci, mettre l'URL directe de l'article`);
  if (PERSONAL.test(raw)) errors.push(`${where} : mention personnelle interdite sur le site public`);

  if (!/^\d{4}-\d{2}-\d{2}$/.test(ed.date || "")) errors.push(`${where} : champ date manquant ou mal formé`);
  if (file !== `${ed.date}.json`) errors.push(`${where} : le nom du fichier doit être ${ed.date}.json`);
  if (ed.date > todayIso) errors.push(`${where} : date dans le futur (aujourd'hui à Paris : ${todayIso})`);
  if (typeof ed.window !== "string" || ed.window.length < 5) errors.push(`${where} : champ window manquant (ex. « 17 au 18 octobre 2026 »)`);
  if (typeof ed.calm !== "boolean") errors.push(`${where} : champ calm doit valoir true ou false`);
  if (typeof ed.intro !== "string" || ed.intro.length < 60) errors.push(`${where} : intro manquante ou trop courte`);
  if (ed.intro && ed.intro.length > 600) errors.push(`${where} : intro trop longue (${ed.intro.length} > 600)`);
  if (!Array.isArray(ed.items)) {
    errors.push(`${where} : items doit être une liste`);
    continue;
  }
  if (ed.items.length > 10) errors.push(`${where} : ${ed.items.length} entrées, 10 au maximum`);
  if (ed.items.length < 5 && !ed.calm) warnings.push(`${where} : moins de 5 entrées, mettre "calm": true et le dire dans l'intro si la journée est pauvre`);
  if (ed.items.length === 0 && !ed.calm) errors.push(`${where} : aucune entrée, "calm": true est obligatoire`);

  ed.items.forEach((it, i) => {
    const w = `${where} entrée ${i + 1}`;
    Object.keys(it).forEach((k) => { if (!FIELDS.includes(k)) errors.push(`${w} : champ inconnu « ${k} »`); });
    if (!RUBRIQUES.includes(it.rubrique)) errors.push(`${w} : rubrique doit être ${RUBRIQUES.join(", ")}`);
    if (!it.title || it.title.length < 20 || it.title.length > 140) errors.push(`${w} : titre absent ou longueur hors 20-140`);
    if (it.title && /[.!]$/.test(it.title)) errors.push(`${w} : pas de point final dans un titre`);
    if (!it.summary || it.summary.length < 200) errors.push(`${w} : résumé trop court (200 caractères minimum)`);
    if (it.summary && it.summary.length > 750) errors.push(`${w} : résumé trop long (${it.summary.length} > 750), raccourcir`);
    if (it.summary) {
      const n = sentences(it.summary);
      if (n < 3 || n > 5) errors.push(`${w} : le résumé doit compter 3 ou 4 phrases (${n} détectées)`);
    }
    if (it.caveat !== undefined) {
      if (typeof it.caveat !== "string" || it.caveat.length < 30 || it.caveat.length > 280) errors.push(`${w} : caveat doit être une phrase de 30 à 280 caractères`);
      else if (sentences(it.caveat) > 2) errors.push(`${w} : caveat doit tenir en une phrase`);
    }
    if (!it.why || it.why.length < 40 || it.why.length > 280) errors.push(`${w} : champ why (« Pourquoi c'est important ») manquant ou hors 40-280 caractères`);
    else if (sentences(it.why) > 1) errors.push(`${w} : why doit tenir en une phrase`);
    if (!Array.isArray(it.sources) || it.sources.length === 0) errors.push(`${w} : au moins une source`);
    if (Array.isArray(it.sources) && it.sources.length > 3) errors.push(`${w} : 3 sources au maximum`);
    const hosts = new Set();
    (it.sources || []).forEach((s) => {
      if (!s.name || !/^https:\/\/[^\s]+\.[^\s]+/.test(s.url || "")) {
        errors.push(`${w} : source invalide (${JSON.stringify(s)})`);
        return;
      }
      if (/^https:\/\/[^/]+\/?$/.test(s.url)) errors.push(`${w} : la source ${s.name} pointe vers une page d'accueil, mettre l'article précis`);
      const url = s.url.split("#")[0];
      if (hosts.has(url)) errors.push(`${w} : la même URL est citée deux fois`);
      hosts.add(url);
    });
    for (const field of ["title", "summary", "caveat", "why"]) {
      for (const q of quotes(it[field] || "")) {
        const n = q.split(/\s+/).length;
        if (n > 15) errors.push(`${w} : citation de ${n} mots dans ${field}, 15 au maximum (mieux : reformuler)`);
      }
    }
    const key = (it.title || "").toLowerCase().trim();
    if (seenTitles.has(key)) errors.push(`${w} : titre identique à ${seenTitles.get(key)}`);
    seenTitles.set(key, w);
  });
}

warnings.forEach((m) => console.warn("Avertissement :", m));
if (errors.length) {
  errors.forEach((m) => console.error("Erreur :", m));
  console.error(`\nContrôle qualité échoué : ${errors.length} erreur(s).`);
  process.exit(1);
}
console.log(`Contrôle qualité réussi : ${files.length} édition(s).`);
