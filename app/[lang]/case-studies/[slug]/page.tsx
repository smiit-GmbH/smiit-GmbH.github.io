import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Locale } from "@/lib/dictionary"
import { buildBreadcrumbJsonLd, buildCaseStudyJsonLd, buildPageMetadata } from "@/lib/seo"
import { JsonLd } from "@/components/seo/json-ld"
import { caseStudySlugs, getCaseStudiesUi, getCaseStudy } from "@/lib/case-studies"
import CaseStudyDetailPage from "@/components/pages/case-studies/CaseStudyDetailPage"

export const dynamicParams = false

export async function generateStaticParams() {
  const langs: Locale[] = ["de", "en"]
  return langs.flatMap((lang) => caseStudySlugs.map((slug) => ({ lang, slug })))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale; slug: string }>
}): Promise<Metadata> {
  const { lang, slug } = await params
  const study = getCaseStudy(slug, lang)
  if (!study) return {}

  return buildPageMetadata({
    lang,
    path: `case-studies/${slug}`,
    title: { de: study.metaTitle, en: study.metaTitle },
    description: { de: study.metaDescription, en: study.metaDescription },
    ogImage: study.ogImage,
  })
}

export default async function Page({
  params,
}: {
  params: Promise<{ lang: Locale; slug: string }>
}) {
  const { lang, slug } = await params
  const study = getCaseStudy(slug, lang)
  if (!study) notFound()

  const ui = getCaseStudiesUi(lang)

  const breadcrumbJsonLd = buildBreadcrumbJsonLd(
    lang,
    [
      { name: ui.breadcrumbLabel, path: "case-studies" },
      { name: study.client, path: `case-studies/${slug}` },
    ],
    false, // omit the home crumb to match the visible breadcrumb
  )

  const sectionLabels: Record<typeof study.serviceArea, { de: string; en: string }> = {
    apps: { de: "Apps & Workflows", en: "Apps & workflows" },
    analytics: { de: "Datenanalyse", en: "Data analytics" },
    strategy: { de: "Digitale Strategie", en: "Digital strategy" },
  }

  const articleJsonLd = buildCaseStudyJsonLd({
    lang,
    slug,
    headline: study.title,
    description: study.metaDescription,
    datePublished: study.datePublished,
    image: study.ogImage?.url,
    about: study.client,
    articleSection: sectionLabels[study.serviceArea][lang],
    keywords: [...study.techStack.map((t) => t.name), study.client],
  })

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={articleJsonLd} />
      <CaseStudyDetailPage lang={lang} study={study} />
    </>
  )
}
