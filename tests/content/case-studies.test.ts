import assert from "node:assert/strict"
import { describe, test } from "node:test"

import { caseStudies } from "@/content/case-studies"
import { caseStudySlugs, getCaseStudyHrefByClient, type CaseStudyContent } from "@/lib/case-studies"
import {
  LOCALES,
  URL_SAFE_SLUG,
  contentFileSlugs,
  duplicates,
  isIsoDate,
  isNonEmpty,
  localizedRouteExists,
  publicFileExists,
} from "./helpers"

const variants: { slug: string; lang: string; study: CaseStudyContent }[] = caseStudySlugs.flatMap((slug) =>
  LOCALES.map((lang) => ({ slug, lang, study: caseStudies[slug][lang] })),
)

describe("case study content", () => {
  test("registry and content/case-studies/*.ts files match one-to-one", () => {
    assert.deepEqual([...caseStudySlugs].sort(), contentFileSlugs("case-studies"))
  })

  test("slugs are unique and URL-safe", () => {
    assert.deepEqual(duplicates(caseStudySlugs), [])
    for (const slug of caseStudySlugs) assert.match(slug, URL_SAFE_SLUG)
  })

  test("every case study has both locale variants whose slug matches the file name", () => {
    for (const slug of caseStudySlugs) {
      for (const lang of LOCALES) {
        const study = caseStudies[slug][lang]
        assert.ok(study, `${slug}: missing ${lang}`)
        assert.equal(study.slug, slug, `${slug} (${lang})`)
      }
    }
  })

  test("locale variants agree on language-agnostic fields", () => {
    for (const slug of caseStudySlugs) {
      const { de, en } = caseStudies[slug]
      for (const key of ["serviceArea", "relatedServicePath", "datePublished", "client"] as const) {
        assert.equal(en[key], de[key], `${slug}: ${key} differs between locales`)
      }
    }
  })

  test("required text fields are non-empty", () => {
    for (const { slug, lang, study } of variants) {
      for (const key of ["client", "industry", "companySize", "title", "summary", "metaTitle", "metaDescription"] as const) {
        assert.ok(isNonEmpty(study[key]), `${slug} (${lang}): empty ${key}`)
      }
      assert.ok(isNonEmpty(study.heroMetric.value) && isNonEmpty(study.heroMetric.label), `${slug} (${lang}): empty heroMetric`)
      assert.ok(study.sections.length > 0, `${slug} (${lang}): no sections`)
      for (const section of study.sections) {
        assert.ok(isNonEmpty(section.heading), `${slug} (${lang}): section without heading`)
        assert.ok(section.paragraphs.every(isNonEmpty), `${slug} (${lang}): "${section.heading}" has empty paragraphs`)
      }
      for (const metric of study.metrics) assert.ok(isNonEmpty(metric.value) && isNonEmpty(metric.label), `${slug} (${lang}): empty metric`)
      for (const fact of study.facts) assert.ok(isNonEmpty(fact.label) && isNonEmpty(fact.value), `${slug} (${lang}): empty fact`)
      for (const item of study.techStack) assert.ok(isNonEmpty(item.name) && isNonEmpty(item.description), `${slug} (${lang}): empty tech item`)
      assert.ok(isNonEmpty(study.quote.text) && isNonEmpty(study.quote.author), `${slug} (${lang}): empty quote`)
    }
  })

  test("datePublished is a valid ISO date", () => {
    for (const { slug, lang, study } of variants) assert.ok(isIsoDate(study.datePublished), `${slug} (${lang}): ${study.datePublished}`)
  })

  test("relatedServicePath points to an existing service route", () => {
    for (const { slug, lang, study } of variants) {
      assert.ok(localizedRouteExists(study.relatedServicePath), `${slug} (${lang}): ${study.relatedServicePath}`)
    }
  })

  test("referenced local images exist under public/ and have alt text", () => {
    for (const { slug, lang, study } of variants) {
      for (const image of [study.ogImage, study.image]) {
        if (!image) continue
        if (image.url.startsWith("/")) assert.ok(publicFileExists(image.url), `${slug} (${lang}): missing ${image.url}`)
        assert.ok(isNonEmpty(image.alt), `${slug} (${lang}): ${image.url} without alt`)
      }
    }
  })

  test("client names are unique so getCaseStudyHrefByClient is unambiguous", () => {
    assert.deepEqual(duplicates(caseStudySlugs.map((slug) => caseStudies[slug].de.client)), [])
    for (const slug of caseStudySlugs) {
      for (const lang of LOCALES) {
        assert.equal(getCaseStudyHrefByClient(caseStudies[slug].de.client, lang), `/${lang}/case-studies/${slug}`)
      }
    }
  })
})
