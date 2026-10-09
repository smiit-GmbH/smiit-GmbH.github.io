import type { Locale } from "@/lib/dictionary"
import { glossaryCatalog, glossaryExtras, glossaryTerms } from "@/content/glossary"

/**
 * Glossary content layer — mirrors the structure of `lib/case-studies.ts`.
 *
 * Two layers:
 *  1. `glossaryCatalog`  — the full roadmap of planned terms (name + short
 *     definition per language, cluster, role). Drives the overview page and the
 *     `DefinedTermSet` JSON-LD. Entries with `hasPage: true` link to a detail
 *     page; the rest render as plain catalog entries until they are written.
 *  2. `glossaryTerms`    — fully written, bilingual detail entries keyed by
 *     slug. Routes + sitemap pick these up automatically via `glossaryTermSlugs`.
 *
 * Data lives under `content/glossary/`: the catalog in `_catalog.ts`, and one
 * file per detail entry (`<slug>.ts`, default export = term, named `extras`
 * export = misconceptions + sources), registered in `content/glossary/index.ts`.
 *
 * Add a term by appending to the catalog; promote it to a full page by adding
 * a `content/glossary/<slug>.ts` entry, registering it in the index and
 * flipping `hasPage` to true.
 */

export * from "./glossary-meta"
import type {
  GlossaryCatalogEntry,
  GlossaryCluster,
  GlossaryLinkIndex,
  GlossaryMatcher,
  GlossaryTermContent,
} from "./glossary-meta"

// ---------------------------------------------------------------------------
// Catalog — the full roadmap (overview + DefinedTermSet schema)
// ---------------------------------------------------------------------------

/** Data: `content/glossary/_catalog.ts`. */
export { glossaryCatalog }

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Slugs of terms that have a full detail page. Used by routes + sitemap. */
export const glossaryTermSlugs = Object.keys(glossaryTerms)

export function getGlossaryTerm(slug: string, lang: Locale): GlossaryTermContent | undefined {
  const base = glossaryTerms[slug]?.[lang]
  if (!base) return undefined
  const extra = glossaryExtras[slug]?.[lang]
  if (!extra) return base
  return { ...base, misconceptions: extra.misconceptions, sources: extra.sources }
}

export function hasGlossaryPage(slug: string): boolean {
  return slug in glossaryTerms
}

/** Short definition of a term, used e.g. for in-text link tooltips. */
export function getGlossaryShortDefinition(slug: string, lang: Locale): string | undefined {
  return glossaryTerms[slug]?.[lang]?.shortDefinition
}

/** Synonyms of a term, used e.g. to widen glossary search. */
export function getGlossaryTermSynonyms(slug: string, lang: Locale): string[] {
  return glossaryTerms[slug]?.[lang]?.synonyms ?? []
}

/** Catalog entries for one cluster, in catalog order. */
export function listGlossaryCatalogByCluster(cluster: GlossaryCluster): GlossaryCatalogEntry[] {
  return glossaryCatalog.filter((entry) => entry.cluster === cluster)
}

/** Related catalog entries from the same cluster, excluding the given slug. */
export function listRelatedGlossaryTerms(slug: string, cluster: GlossaryCluster): GlossaryCatalogEntry[] {
  return glossaryCatalog.filter((entry) => entry.cluster === cluster && entry.slug !== slug)
}

/**
 * Phrases (term name + synonyms) that should auto-link to a glossary term in
 * body copy. Sorted longest-first so the most specific phrase wins; ambiguous
 * duplicates and overly generic words are dropped.
 */
export function getGlossaryMatchers(lang: Locale): GlossaryMatcher[] {
  const deny = new Set(["daten", "data", "software", "code", "api", "modell", "model"])
  const seen = new Set<string>()
  const out: GlossaryMatcher[] = []
  for (const slug of Object.keys(glossaryTerms)) {
    const t = glossaryTerms[slug][lang]
    const base = t.term.replace(/\s*\([^)]*\)/g, "").trim() // strip parenthetical
    // Split conjunctive names ("A & B", "A / B") into standalone phrases so the
    // common short form is matchable too (e.g. "Data Warehouse", "ETL", "ELT").
    const fragments = base.split(/\s+[&/]\s+/).map((f) => f.replace(/^[^\p{L}\p{N}]+/u, "").trim())
    for (const candidate of [base, ...fragments, ...t.synonyms]) {
      const text = candidate.trim()
      const key = text.toLowerCase()
      if (text.length < 2) continue
      if (deny.has(key)) continue
      if (seen.has(key)) continue // first term wins an ambiguous phrase
      seen.add(key)
      out.push({ slug, text })
    }
  }
  return out.sort((a, b) => b.text.length - a.text.length)
}

/** Catalog entries whose full term links to the given case study (pillars first). */
export function listGlossaryCatalogForCaseStudy(caseStudySlug: string): GlossaryCatalogEntry[] {
  const slugs = new Set(
    Object.keys(glossaryTerms).filter((s) => glossaryTerms[s].de.relatedCaseStudySlug === caseStudySlug),
  )
  return glossaryCatalog
    .filter((entry) => slugs.has(entry.slug))
    .sort((a, b) => (a.role === b.role ? 0 : a.role === "pillar" ? -1 : 1))
}

/** Matchers + short definitions for `autolinkGlossary`, computed at build time. */
export function getGlossaryLinkIndex(lang: Locale): GlossaryLinkIndex {
  const definitions: Record<string, string> = {}
  for (const slug of Object.keys(glossaryTerms)) definitions[slug] = glossaryTerms[slug][lang].shortDefinition
  return { matchers: getGlossaryMatchers(lang), definitions }
}
