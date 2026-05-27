import type { MetadataRoute } from "next"
import { caseStudySlugs, getCaseStudy } from "@/lib/case-studies"
import { glossaryTermSlugs, getGlossaryTerm } from "@/lib/glossary"
import { blogPostSlugsFor, getBlogPost } from "@/lib/blog"

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

const glossaryDates = glossaryTermSlugs
  .map((slug) => getGlossaryTerm(slug, "de")?.dateModified)
  .filter((d): d is string => Boolean(d))
const latestGlossaryDate = glossaryDates.slice().sort().pop()

// Blog posts can be locale-specific, so their URLs are emitted per language in
// the default export below (not via the uniform `routes` × `languages` map).
const blogDates = blogPostSlugsFor("de")
  .map((slug) => getBlogPost(slug, "de")?.dateModified)
  .filter((d): d is string => Boolean(d))
const latestBlogDate = blogDates.slice().sort().pop()

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
  { path: "blog", priority: 0.6, changeFrequency: "monthly", lastModified: latestBlogDate },
  { path: "glossary", priority: 0.6, changeFrequency: "monthly", lastModified: latestGlossaryDate },
  ...glossaryTermSlugs.map(
    (slug): Route => ({
      path: `glossary/${slug}`,
      priority: 0.5,
      changeFrequency: "monthly",
      lastModified: getGlossaryTerm(slug, "de")?.dateModified,
    }),
  ),
  { path: "legal-notice", priority: 0.2, changeFrequency: "yearly" },
  { path: "privacy", priority: 0.2, changeFrequency: "yearly" },
]

const languages = ["de", "en"] as const

export default function sitemap(): MetadataRoute.Sitemap {
  const buildLastModified = new Date()

  const staticEntries = routes.flatMap((route) =>
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

  // Blog posts: emitted only for the languages a post actually exists in, so a
  // single-language post does not produce a 404 URL in the other locale.
  const blogEntries: MetadataRoute.Sitemap = languages.flatMap((lang) =>
    blogPostSlugsFor(lang).map((slug) => {
      const post = getBlogPost(slug, lang)
      return {
        url: `${SITE_URL}/${lang}/blog/${slug}/`,
        lastModified: post?.dateModified ? new Date(post.dateModified) : buildLastModified,
        changeFrequency: "monthly" as const,
        priority: 0.5,
      }
    }),
  )

  return [...staticEntries, ...blogEntries]
}
