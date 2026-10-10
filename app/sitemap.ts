import type { MetadataRoute } from "next"
import type { Locale } from "@/lib/dictionary"
import { caseStudySlugs, getCaseStudy } from "@/lib/case-studies"
import { glossaryTermSlugs, getGlossaryTerm } from "@/lib/glossary"
import { blogPostSlugsFor, getBlogPost } from "@/lib/blog"

export const dynamic = "force-static"

const SITE_URL = "https://www.smiit.de"
const languages = ["de", "en"] as const

type ChangeFrequency = "monthly" | "yearly"

type Route = {
  path: string
  priority: number
  changeFrequency: ChangeFrequency
  /**
   * Real content date per locale. Routes without one get no lastmod at all:
   * search engines only use lastmod when it is consistently accurate, and a
   * build timestamp would claim every page changed on every deploy.
   */
  lastModified?: (lang: Locale) => string | undefined
}

const latest = (dates: Array<string | undefined>) =>
  dates
    .filter((d): d is string => Boolean(d))
    .sort()
    .pop()

const routes: Route[] = [
  { path: "", priority: 1.0, changeFrequency: "monthly" },
  { path: "about", priority: 0.8, changeFrequency: "monthly" },
  { path: "contact", priority: 0.8, changeFrequency: "monthly" },
  { path: "services/analytics", priority: 0.9, changeFrequency: "monthly" },
  { path: "services/strategy", priority: 0.9, changeFrequency: "monthly" },
  { path: "services/apps", priority: 0.9, changeFrequency: "monthly" },
  { path: "website", priority: 0.9, changeFrequency: "monthly" },
  { path: "products/smiit-analytics", priority: 0.9, changeFrequency: "monthly" },
  {
    path: "case-studies",
    priority: 0.6,
    changeFrequency: "monthly",
    lastModified: (lang) => latest(caseStudySlugs.map((slug) => getCaseStudy(slug, lang)?.datePublished)),
  },
  ...caseStudySlugs.map((slug): Route => ({
    path: `case-studies/${slug}`,
    priority: 0.5,
    changeFrequency: "monthly",
    lastModified: (lang) => getCaseStudy(slug, lang)?.datePublished,
  })),
  {
    path: "blog",
    priority: 0.6,
    changeFrequency: "monthly",
    lastModified: (lang) => latest(blogPostSlugsFor(lang).map((slug) => getBlogPost(slug, lang)?.dateModified)),
  },
  {
    path: "glossary",
    priority: 0.6,
    changeFrequency: "monthly",
    lastModified: (lang) => latest(glossaryTermSlugs.map((slug) => getGlossaryTerm(slug, lang)?.dateModified)),
  },
  ...glossaryTermSlugs.map((slug): Route => ({
    path: `glossary/${slug}`,
    priority: 0.5,
    changeFrequency: "monthly",
    lastModified: (lang) => getGlossaryTerm(slug, lang)?.dateModified,
  })),
  { path: "legal-notice", priority: 0.2, changeFrequency: "yearly" },
  { path: "privacy", priority: 0.2, changeFrequency: "yearly" },
]

const url = (lang: string, path: string) => `${SITE_URL}/${lang}${path ? `/${path}` : ""}/`

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = routes.flatMap((route) =>
    languages.map((lang) => {
      const date = route.lastModified?.(lang)
      return {
        url: url(lang, route.path),
        ...(date ? { lastModified: new Date(date) } : {}),
        changeFrequency: route.changeFrequency,
        priority: route.priority,
        alternates: {
          languages: { de: url("de", route.path), en: url("en", route.path), "x-default": url("de", route.path) },
        },
      }
    }),
  )

  // Blog posts: emitted only for the languages a post actually exists in, so a
  // single-language post does not produce a 404 URL in the other locale; the
  // hreflang alternates likewise list only the existing language versions.
  const blogEntries: MetadataRoute.Sitemap = languages.flatMap((lang) =>
    blogPostSlugsFor(lang).map((slug) => {
      const post = getBlogPost(slug, lang)
      const versions = languages.filter((l) => getBlogPost(slug, l))
      return {
        url: url(lang, `blog/${slug}`),
        ...(post?.dateModified ? { lastModified: new Date(post.dateModified) } : {}),
        changeFrequency: "monthly" as const,
        priority: 0.5,
        ...(versions.length > 1
          ? {
              alternates: {
                languages: {
                  ...Object.fromEntries(versions.map((l) => [l, url(l, `blog/${slug}`)])),
                  "x-default": url(versions.includes("de") ? "de" : versions[0], `blog/${slug}`),
                },
              },
            }
          : {}),
      }
    }),
  )

  return [...staticEntries, ...blogEntries]
}
