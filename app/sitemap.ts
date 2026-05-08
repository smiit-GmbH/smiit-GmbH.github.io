import type { MetadataRoute } from "next"

export const dynamic = "force-static"

const SITE_URL = "https://www.smiit.de"

const routes = [
  { path: "", priority: 1.0, changeFrequency: "monthly" as const },
  { path: "about", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "contact", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "services/analytics", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "services/strategy", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "services/apps", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "products/smiit-analytics", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "legal-notice", priority: 0.2, changeFrequency: "yearly" as const },
  { path: "privacy", priority: 0.2, changeFrequency: "yearly" as const },
]

const languages = ["de", "en"] as const

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  return routes.flatMap((route) =>
    languages.map((lang) => {
      const url = `${SITE_URL}/${lang}${route.path ? `/${route.path}` : ""}/`
      return {
        url,
        lastModified,
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
