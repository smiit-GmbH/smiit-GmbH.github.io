import type { Locale } from "@/lib/dictionary"
import { caseStudies } from "@/content/case-studies"

/**
 * Case studies are stored as a typed, dictionary-style structure (one entry per
 * slug, with a `de` and `en` variant) to match the existing content setup.
 * Each case study lives in its own file under `content/case-studies/<slug>.ts`;
 * add one by creating that file and registering it in
 * `content/case-studies/index.ts` (registry order = display order). The route +
 * sitemap pick it up automatically via `caseStudySlugs`.
 *
 * NOTE: Claimity content references concrete technologies (Azure, PostgreSQL,
 * Keycloak, …) and a customer quote. Get these cleared with the client before
 * relying on the page externally.
 */

export * from "./case-studies-meta"
import type { CaseStudyContent, CaseStudySummary } from "./case-studies-meta"

export const caseStudySlugs = Object.keys(caseStudies)

export function getCaseStudy(slug: string, lang: Locale): CaseStudyContent | undefined {
  return caseStudies[slug]?.[lang]
}

export function listCaseStudies(lang: Locale): CaseStudyContent[] {
  return caseStudySlugs.map((slug) => caseStudies[slug][lang])
}

export function listOtherCaseStudies(slug: string, lang: Locale): CaseStudyContent[] {
  return caseStudySlugs.filter((s) => s !== slug).map((s) => caseStudies[s][lang])
}

/** Overview data for the given case studies (drops the long narrative fields). */
export function toCaseStudySummary(study: CaseStudyContent): CaseStudySummary {
  const { slug, client, title, summary, serviceArea, heroMetric, metrics, image } = study
  return { slug, client, title, summary, serviceArea, heroMetric, metrics, image }
}

export function getCaseStudyHrefByClient(client: string, lang: Locale): string | undefined {
  const slug = caseStudySlugs.find((s) => caseStudies[s].de.client === client)
  return slug ? `/${lang}/case-studies/${slug}` : undefined
}

/** Case-study link per client name (as used in the service-page reviews). */
export function getCaseStudyHrefsByClient(lang: Locale): Record<string, string> {
  return Object.fromEntries(
    caseStudySlugs.map((slug) => [caseStudies[slug].de.client, `/${lang}/case-studies/${slug}`]),
  )
}
