import fs from "node:fs"
import path from "node:path"

/** All page paths listed in the built sitemap (e.g. "/de/services/apps/"). */
export function sitemapPaths(): string[] {
  const sitemap = fs.readFileSync(path.join(process.cwd(), "out", "sitemap.xml"), "utf8")
  return [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname)
}

/** A representative page of every template, for the slower checks (axe, interactions). */
export const keyPages = [
  "/de/",
  "/en/",
  "/de/about/",
  "/de/contact/",
  "/de/services/analytics/",
  "/de/services/apps/",
  "/de/services/strategy/",
  "/de/website/",
  "/de/products/smiit-analytics/",
  "/de/blog/",
  "/de/blog/mlops-with-microsoft-azure/",
  "/de/case-studies/",
  "/de/case-studies/claimity-ag/",
  "/de/glossary/",
  "/de/glossary/power-bi/",
]
