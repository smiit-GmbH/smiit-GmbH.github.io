import assert from "node:assert/strict"
import { describe, test } from "node:test"

import { glossaryExtras, glossaryTerms } from "@/content/glossary"
import { caseStudySlugs } from "@/lib/case-studies"
import {
  getGlossaryMatchers,
  getGlossaryTerm,
  glossaryCatalog,
  glossaryClusterMeta,
  glossaryTermSlugs,
  hasGlossaryPage,
  type GlossaryTermContent,
} from "@/lib/glossary"
import {
  LOCALES,
  URL_SAFE_SLUG,
  contentFileSlugs,
  duplicates,
  isIsoDate,
  isNonEmpty,
  localizedRouteExists,
} from "./helpers"

const variants: { slug: string; lang: string; term: GlossaryTermContent }[] = glossaryTermSlugs.flatMap((slug) =>
  LOCALES.map((lang) => ({ slug, lang, term: glossaryTerms[slug][lang] })),
)

const catalogSlugs = glossaryCatalog.map((entry) => entry.slug)

describe("glossary content", () => {
  test("registry and content/glossary/*.ts files match one-to-one", () => {
    assert.deepEqual([...glossaryTermSlugs].sort(), contentFileSlugs("glossary"))
  })

  test("term slugs are unique and URL-safe", () => {
    assert.deepEqual(duplicates(glossaryTermSlugs), [])
    for (const slug of glossaryTermSlugs) assert.match(slug, URL_SAFE_SLUG)
  })

  test("every term has both locale variants whose slug matches the file name", () => {
    for (const slug of glossaryTermSlugs) {
      for (const lang of LOCALES) {
        const term = glossaryTerms[slug][lang]
        assert.ok(term, `${slug}: missing ${lang}`)
        assert.equal(term.slug, slug, `${slug} (${lang})`)
      }
    }
  })

  test("locale variants agree on language-agnostic fields", () => {
    for (const slug of glossaryTermSlugs) {
      const { de, en } = glossaryTerms[slug]
      for (const key of ["cluster", "dateModified", "relatedServicePath", "relatedCaseStudySlug"] as const) {
        assert.equal(en[key], de[key], `${slug}: ${key} differs between locales`)
      }
    }
  })

  test("required text fields are non-empty", () => {
    for (const { slug, lang, term } of variants) {
      for (const key of ["term", "title", "shortDefinition", "metaTitle", "metaDescription"] as const) {
        assert.ok(isNonEmpty(term[key]), `${slug} (${lang}): empty ${key}`)
      }
      assert.ok(term.sections.length > 0, `${slug} (${lang}): no sections`)
      for (const section of term.sections) {
        assert.ok(isNonEmpty(section.heading), `${slug} (${lang}): section without heading`)
        assert.ok(section.paragraphs.length > 0 && section.paragraphs.every(isNonEmpty), `${slug} (${lang}): "${section.heading}" has empty paragraphs`)
      }
      assert.ok(term.faq.length > 0, `${slug} (${lang}): no FAQ`)
      for (const item of term.faq) {
        assert.ok(isNonEmpty(item.question) && isNonEmpty(item.answer), `${slug} (${lang}): empty FAQ item`)
      }
      assert.ok(term.synonyms.every(isNonEmpty), `${slug} (${lang}): empty synonym`)
    }
  })

  test("dateModified is a valid ISO date", () => {
    for (const { slug, lang, term } of variants) assert.ok(isIsoDate(term.dateModified), `${slug} (${lang}): ${term.dateModified}`)
  })

  test("cluster is known and relatedServicePath points to an existing service route", () => {
    for (const { slug, lang, term } of variants) {
      assert.ok(term.cluster in glossaryClusterMeta, `${slug} (${lang}): unknown cluster ${term.cluster}`)
      assert.ok(localizedRouteExists(term.relatedServicePath), `${slug} (${lang}): ${term.relatedServicePath}`)
    }
  })

  test("relatedCaseStudySlug resolves to an existing case study", () => {
    for (const { slug, lang, term } of variants) {
      if (term.relatedCaseStudySlug === undefined) continue
      assert.ok(caseStudySlugs.includes(term.relatedCaseStudySlug), `${slug} (${lang}): ${term.relatedCaseStudySlug}`)
    }
  })

  test("extras belong to existing terms, cover both locales and have https sources", () => {
    for (const [slug, extra] of Object.entries(glossaryExtras)) {
      assert.ok(hasGlossaryPage(slug), `extras for unknown term ${slug}`)
      for (const lang of LOCALES) {
        const e = extra[lang]
        assert.ok(e, `${slug}: extras missing ${lang}`)
        assert.ok(e.misconceptions.length > 0 && e.misconceptions.every(isNonEmpty), `${slug} (${lang}): empty misconceptions`)
        for (const source of e.sources) {
          assert.ok(isNonEmpty(source.title), `${slug} (${lang}): source without title`)
          assert.match(source.url, /^https:\/\/\S+$/, `${slug} (${lang}): ${source.url}`)
        }
      }
    }
  })

  test("getGlossaryTerm merges extras into the term", () => {
    for (const slug of Object.keys(glossaryExtras)) {
      for (const lang of LOCALES) {
        const merged = getGlossaryTerm(slug, lang)
        assert.deepEqual(merged?.misconceptions, glossaryExtras[slug][lang].misconceptions, `${slug} (${lang})`)
        assert.deepEqual(merged?.sources, glossaryExtras[slug][lang].sources, `${slug} (${lang})`)
      }
    }
  })

  test("catalog slugs are unique and URL-safe", () => {
    assert.deepEqual(duplicates(catalogSlugs), [])
    for (const slug of catalogSlugs) assert.match(slug, URL_SAFE_SLUG)
  })

  test("catalog entries have non-empty term + short definition in both locales", () => {
    for (const entry of glossaryCatalog) {
      for (const lang of LOCALES) {
        assert.ok(isNonEmpty(entry.term[lang]), `${entry.slug} (${lang}): empty term`)
        assert.ok(isNonEmpty(entry.shortDefinition[lang]), `${entry.slug} (${lang}): empty shortDefinition`)
      }
      assert.ok(entry.cluster in glossaryClusterMeta, `${entry.slug}: unknown cluster ${entry.cluster}`)
    }
  })

  test("catalog hasPage flag matches the existence of a detail entry", () => {
    for (const entry of glossaryCatalog) {
      assert.equal(entry.hasPage, hasGlossaryPage(entry.slug), `${entry.slug}: hasPage=${entry.hasPage}`)
    }
  })

  test("every detail entry is listed in the catalog under the same cluster", () => {
    for (const slug of glossaryTermSlugs) {
      const entry = glossaryCatalog.find((e) => e.slug === slug)
      assert.ok(entry, `${slug}: missing from catalog`)
      assert.equal(entry.cluster, glossaryTerms[slug].de.cluster, `${slug}: catalog cluster differs`)
    }
  })

  test("auto-link matchers only point to terms with a detail page", () => {
    for (const lang of LOCALES) {
      for (const matcher of getGlossaryMatchers(lang)) {
        assert.ok(hasGlossaryPage(matcher.slug), `${lang}: matcher "${matcher.text}" -> ${matcher.slug}`)
      }
    }
  })
})
