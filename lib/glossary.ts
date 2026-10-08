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

export type GlossaryCluster = "analytics" | "apps" | "strategy"

export type GlossaryRole = "pillar" | "sub"

/** One narrative block on a detail page. Bullets are optional. */
export type GlossarySection = {
  heading: string
  paragraphs: string[]
  bullets?: string[]
}

export type GlossaryFaqItem = { question: string; answer: string }

/** External, authoritative reference shown under "Quellen & weiterführende Links". */
export type GlossarySource = { title: string; url: string }

export type GlossaryTermContent = {
  /** Stable, language-agnostic URL slug. */
  slug: string
  cluster: GlossaryCluster
  /** ISO date used for Article JSON-LD + sitemap lastmod. */
  dateModified: string
  /** Term name, e.g. "Power BI". */
  term: string
  /** H1, e.g. "Was ist Power BI?". */
  title: string
  /** Definition-first: 2–3 sentences answering the term directly. */
  shortDefinition: string
  /** German/English synonyms and related spellings for entity matching. */
  synonyms: string[]
  sections: GlossarySection[]
  /** Common mistakes / misconceptions (template point 5). Merged from glossaryExtras. */
  misconceptions?: string[]
  faq: GlossaryFaqItem[]
  /** External references / further reading (template point 9). Merged from glossaryExtras. */
  sources?: GlossarySource[]
  /** Path of the related service page, e.g. "services/analytics". */
  relatedServicePath: string
  /** Slug of a related case study (see lib/case-studies.ts), if any. */
  relatedCaseStudySlug?: string
  metaTitle: string
  metaDescription: string
}

/** Per-language extras kept separate from the large term objects, merged on read. */
export type GlossaryExtra = { misconceptions: string[]; sources: GlossarySource[] }

export type LocalizedGlossaryTerm = Record<Locale, GlossaryTermContent>

export type GlossaryCatalogEntry = {
  slug: string
  cluster: GlossaryCluster
  role: GlossaryRole
  term: { de: string; en: string }
  shortDefinition: { de: string; en: string }
  /** True once a full detail page exists in `glossaryTerms`. */
  hasPage: boolean
}

// ---------------------------------------------------------------------------
// Cluster metadata
// ---------------------------------------------------------------------------

export const glossaryClusterMeta: Record<
  GlossaryCluster,
  { label: { de: string; en: string }; color: string; servicePath: string }
> = {
  analytics: {
    label: { de: "Analytics, Daten & KI", en: "Analytics, data & AI" },
    color: "#21569c",
    servicePath: "services/analytics",
  },
  apps: {
    label: { de: "Plattformen, Apps & Cloud", en: "Platforms, apps & cloud" },
    color: "#F703EB",
    servicePath: "services/apps",
  },
  strategy: {
    label: { de: "Strategie, Automatisierung & Security", en: "Strategy, automation & security" },
    color: "#64748B",
    servicePath: "services/strategy",
  },
}

export const glossaryClusterOrder: GlossaryCluster[] = ["analytics", "apps", "strategy"]

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

export type GlossaryMatcher = { slug: string; text: string }

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
    const fragments = base
      .split(/\s+[&/]\s+/)
      .map((f) => f.replace(/^[^\p{L}\p{N}]+/u, "").trim())
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
    Object.keys(glossaryTerms).filter(
      (s) => glossaryTerms[s].de.relatedCaseStudySlug === caseStudySlug,
    ),
  )
  return glossaryCatalog
    .filter((entry) => slugs.has(entry.slug))
    .sort((a, b) => (a.role === b.role ? 0 : a.role === "pillar" ? -1 : 1))
}

// ---------------------------------------------------------------------------
// UI strings
// ---------------------------------------------------------------------------

type GlossaryUi = {
  eyebrow: string
  indexTitleLead: string
  indexTitleHighlight: string
  indexSubtitle: string
  breadcrumbLabel: string
  backToOverview: string
  definitionHeading: string
  onThisRoadmap: string
  pillarLabel: string
  subLabel: string
  comingSoon: string
  readTerm: string
  relatedServiceLabel: string
  relatedCaseStudyLabel: string
  relatedTermsHeading: string
  misconceptionsHeading: string
  sourcesHeading: string
  faqHeading: string
  synonymsLabel: string
  updatedLabel: string
  ctaHeading: string
  ctaSubtitle: string
  ctaButton: string
}

const glossaryUi: Record<Locale, GlossaryUi> = {
  de: {
    eyebrow: "Glossar",
    indexTitleLead: "Glossar: Fachbegriffe, die wir nicht nur erklären,",
    indexTitleHighlight: "sondern umsetzen",
    indexSubtitle:
      "Unser Glossar erklärt die zentralen Begriffe rund um Datenanalyse, digitale Plattformen, Automatisierung und Cloud – fachlich fundiert und mit Bezug zu echten Projekten.",
    breadcrumbLabel: "Glossar",
    backToOverview: "Zurück zum Glossar",
    definitionHeading: "Definition",
    onThisRoadmap: "Begriffe in diesem Bereich",
    pillarLabel: "Schwerpunktthema",
    subLabel: "Detailbegriff",
    comingSoon: "in Vorbereitung",
    readTerm: "Begriff lesen",
    relatedServiceLabel: "Passende Leistung",
    relatedCaseStudyLabel: "Passende Case Study",
    relatedTermsHeading: "Verwandte Begriffe",
    misconceptionsHeading: "Häufige Fehler & Missverständnisse",
    sourcesHeading: "Quellen & weiterführende Links",
    faqHeading: "Häufige Fragen",
    synonymsLabel: "Auch bekannt als",
    updatedLabel: "Aktualisiert am",
    ctaHeading: "Sie möchten dieses Thema in Ihrem Unternehmen umsetzen?",
    ctaSubtitle: "Erzählen Sie uns von Ihrer Herausforderung — wir zeigen Ihnen, was technisch möglich ist.",
    ctaButton: "Kontaktieren Sie uns",
  },
  en: {
    eyebrow: "Glossary",
    indexTitleLead: "Glossary: terms we don't just explain,",
    indexTitleHighlight: "we deliver them",
    indexSubtitle:
      "Our glossary explains the key terms around data analytics, digital platforms, automation and cloud — grounded in expertise and tied to real projects.",
    breadcrumbLabel: "Glossary",
    backToOverview: "Back to the glossary",
    definitionHeading: "Definition",
    onThisRoadmap: "Terms in this area",
    pillarLabel: "Pillar topic",
    subLabel: "Detail term",
    comingSoon: "coming soon",
    readTerm: "Read term",
    relatedServiceLabel: "Related service",
    relatedCaseStudyLabel: "Related case study",
    relatedTermsHeading: "Related terms",
    misconceptionsHeading: "Common mistakes & misconceptions",
    sourcesHeading: "Sources & further reading",
    faqHeading: "Frequently asked questions",
    synonymsLabel: "Also known as",
    updatedLabel: "Updated",
    ctaHeading: "Want to put this topic to work in your company?",
    ctaSubtitle: "Tell us about your challenge — we'll show you what's technically possible.",
    ctaButton: "Get in touch",
  },
}

export function getGlossaryUi(lang: Locale): GlossaryUi {
  return glossaryUi[lang]
}
