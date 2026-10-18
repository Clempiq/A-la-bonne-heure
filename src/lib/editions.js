const modules = import.meta.glob("/editions/*.json", { eager: true });

// Rubriques, dans l'ordre d'affichage du sommaire.
export const RUBRIQUES = {
  sante: { label: "Santé et science" },
  monde: { label: "Monde" },
  environnement: { label: "Environnement" },
  societe: { label: "Économie et société" },
  france: { label: "France" },
};

export const editions = Object.values(modules)
  .map((m) => m.default ?? m)
  .sort((a, b) => b.date.localeCompare(a.date));

const opts = { timeZone: "UTC" };
const fmtDay = new Intl.DateTimeFormat("fr-FR", { ...opts, weekday: "long", day: "numeric", month: "long" });
const fmtLong = new Intl.DateTimeFormat("fr-FR", { ...opts, weekday: "long", day: "numeric", month: "long", year: "numeric" });
const fmtShort = new Intl.DateTimeFormat("fr-FR", { ...opts, day: "numeric", month: "long" });
const fmtWeekday = new Intl.DateTimeFormat("fr-FR", { ...opts, weekday: "long" });
const fmtMonth = new Intl.DateTimeFormat("fr-FR", { ...opts, month: "long", year: "numeric" });

const d = (iso) => new Date(`${iso}T00:00:00Z`);
const cap = (s) => s.replace(/^./, (c) => c.toUpperCase());
// Intl écrit « 1 novembre » : en français on écrit « 1er novembre ».
const premier = (s) => s.replace(/(^|\s)1(\s)/, "$11er$2");

export const toDate = d;
export const dayDate = (iso) => premier(fmtDay.format(d(iso))); // dimanche 18 octobre
export const longDate = (iso) => premier(fmtLong.format(d(iso))); // dimanche 18 octobre 2026
export const shortDate = (iso) => premier(fmtShort.format(d(iso))); // 18 octobre
export const weekday = (iso) => cap(fmtWeekday.format(d(iso))); // Dimanche
export const monthLabel = (iso) => cap(fmtMonth.format(d(iso))); // Octobre 2026

export const greeting = (iso) => `Les bonnes nouvelles du ${dayDate(iso)}`;
export const countLabel = (n) => (n === 0 ? "aucune nouvelle" : n === 1 ? "1 nouvelle" : `${n} nouvelles`);

export const slug = (s) =>
  s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60);

export function siblings(date) {
  const i = editions.findIndex((e) => e.date === date);
  return { newer: editions[i - 1] ?? null, older: editions[i + 1] ?? null };
}

// Typographie française : espace insécable avant « : ; ? ! » et à l'intérieur des guillemets,
// pour éviter qu'un deux-points se retrouve seul en début de ligne sur téléphone.
export const typo = (s = "") =>
  String(s)
    .replace(/ :/g, "\u00A0:")
    .replace(/ ([;?!»])/g, "\u202F$1")
    .replace(/« /g, "«\u202F")
    .replace(/(\d) (\d{3})\b/g, "$1\u202F$2")
    .replace(/(\d) (%|km²|km|mois|ans|heures|millions|milliards)/g, "$1\u00A0$2");
