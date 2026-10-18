import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: process.env.SITE_URL || "https://a-la-bonne-heure.vercel.app",
  trailingSlash: "ignore",
  integrations: [sitemap()],
});
