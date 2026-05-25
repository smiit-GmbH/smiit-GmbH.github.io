import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Locale } from "@/lib/dictionary"
import {
  buildBreadcrumbJsonLd,
  buildDefinedTermJsonLd,
  buildFaqJsonLd,
  buildGlossaryArticleJsonLd,
  buildPageMetadata,
} from "@/lib/seo"
import { JsonLd } from "@/components/seo/json-ld"
import { glossaryClusterMeta, glossaryTermSlugs, getGlossaryTerm, getGlossaryUi } from "@/lib/glossary"
import GlossaryTermPage from "@/components/pages/glossary/GlossaryTermPage"

export const dynamicParams = false

export async function generateStaticParams() {
  const langs: Locale[] = ["de", "en"]
  return langs.flatMap((lang) => glossaryTermSlugs.map((slug) => ({ lang, slug })))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale; slug: string }>
}): Promise<Metadata> {
  const { lang, slug } = await params
  const term = getGlossaryTerm(slug, lang)
  if (!term) return {}

  return buildPageMetadata({
    lang,
    path: `glossary/${slug}`,
    title: { de: term.metaTitle, en: term.metaTitle },
    description: { de: term.metaDescription, en: term.metaDescription },
    ogImage: { url: "/og/glossary-term.png", width: 1200, height: 630, alt: `smiit GmbH – ${term.term}` },
  })
}

export default async function Page({
  params,
}: {
  params: Promise<{ lang: Locale; slug: string }>
}) {
  const { lang, slug } = await params
  const term = getGlossaryTerm(slug, lang)
  if (!term) notFound()

  const ui = getGlossaryUi(lang)

  const breadcrumbJsonLd = buildBreadcrumbJsonLd(
    lang,
    [
      { name: ui.breadcrumbLabel, path: "glossary" },
      { name: term.term, path: `glossary/${slug}` },
    ],
    false,
  )

  const definedTermJsonLd = buildDefinedTermJsonLd({
    lang,
    slug,
    name: term.term,
    description: term.shortDefinition,
  })

  const faqJsonLd = buildFaqJsonLd(term.faq)

  const articleJsonLd = buildGlossaryArticleJsonLd({
    lang,
    slug,
    headline: term.title,
    description: term.shortDefinition,
    dateModified: term.dateModified,
    articleSection: glossaryClusterMeta[term.cluster].label[lang],
    keywords: [...term.synonyms, term.term],
  })

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={definedTermJsonLd} />
      <JsonLd data={articleJsonLd} />
      <JsonLd data={faqJsonLd} />
      <GlossaryTermPage lang={lang} term={term} />
    </>
  )
}
