import type { MetadataRoute } from "next"
import { caseStudySlugs, getCaseStudy } from "@/lib/case-studies"

export const dynamic = "force-static"

const SITE_URL = "https://www.smiit.de"

type ChangeFrequency = "monthly" | "yearly"

type Route = {
  path: string
  priority: number
  changeFrequency: ChangeFrequency
  /** ISO date — overrides the build-time fallback so lastmod reflects real content changes. */
  lastModified?: string
}

const caseStudyDates = caseStudySlugs
  .map((slug) => getCaseStudy(slug, "de")?.datePublished)
  .filter((d): d is string => Boolean(d))
const latestCaseStudyDate = caseStudyDates.slice().sort().pop()

const routes: Route[] = [
  { path: "", priority: 1.0, changeFrequency: "monthly" },
  { path: "about", priority: 0.8, changeFrequency: "monthly" },
  { path: "contact", priority: 0.8, changeFrequency: "monthly" },
  { path: "services/analytics", priority: 0.9, changeFrequency: "monthly" },
  { path: "services/strategy", priority: 0.9, changeFrequency: "monthly" },
  { path: "services/apps", priority: 0.9, changeFrequency: "monthly" },
  { path: "products/smiit-analytics", priority: 0.9, changeFrequency: "monthly" },
  { path: "case-studies", priority: 0.6, changeFrequency: "monthly", lastModified: latestCaseStudyDate },
  ...caseStudySlugs.map(
    (slug): Route => ({
      path: `case-studies/${slug}`,
      priority: 0.5,
      changeFrequency: "monthly",
      lastModified: getCaseStudy(slug, "de")?.datePublished,
    }),
  ),
  { path: "legal-notice", priority: 0.2, changeFrequency: "yearly" },
  { path: "privacy", priority: 0.2, changeFrequency: "yearly" },
]

const languages = ["de", "en"] as const

export default function sitemap(): MetadataRoute.Sitemap {
  const buildLastModified = new Date()

  return routes.flatMap((route) =>
    languages.map((lang) => {
      const url = `${SITE_URL}/${lang}${route.path ? `/${route.path}` : ""}/`
      return {
        url,
        lastModified: route.lastModified ? new Date(route.lastModified) : buildLastModified,
        changeFrequency: route.changeFrequency,
        priority: route.priority,
        alternates: {
          languages: {
            de: `${SITE_URL}/de${route.path ? `/${route.path}` : ""}/`,
            en: `${SITE_URL}/en${route.path ? `/${route.path}` : ""}/`,
            "x-default": `${SITE_URL}/de${route.path ? `/${route.path}` : ""}/`,
          },
        },
      }
    }),
  )
}
