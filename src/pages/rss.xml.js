import rss from "@astrojs/rss";
import { editions, greeting, toDate, RUBRIQUES } from "../lib/editions.js";

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function GET(context) {
  return rss({
    title: "À la bonne heure",
    description: "Chaque matin, les bonnes nouvelles importantes de l'actualité française et internationale, vérifiées et sourcées.",
    site: context.site,
    customData: "<language>fr-fr</language>",
    items: editions.slice(0, 30).map((e) => ({
      title: greeting(e.date),
      pubDate: toDate(e.date),
      link: `/edition/${e.date}`,
      description: e.intro,
      content: e.items
        .map(
          (i) =>
            `<h3>${esc(RUBRIQUES[i.rubrique]?.label ?? "")} : ${esc(i.title)}</h3><p>${esc(i.summary)}</p>` +
            (i.caveat ? `<p><em>À nuancer.</em> ${esc(i.caveat)}</p>` : "") +
            `<p><strong>Pourquoi c'est important.</strong> ${esc(i.why)}</p><p>${i.sources.map((s) => `<a href="${esc(s.url)}">${esc(s.name)}</a>`).join(" · ")}</p>`
        )
        .join(""),
    })),
  });
}
