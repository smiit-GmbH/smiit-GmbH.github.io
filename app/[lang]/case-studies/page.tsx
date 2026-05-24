import type { Metadata } from "next"
import { Locale } from "@/lib/dictionary"
import { buildBreadcrumbJsonLd, buildPageMetadata } from "@/lib/seo"
import { JsonLd } from "@/components/seo/json-ld"
import { getCaseStudiesUi } from "@/lib/case-studies"
import CaseStudiesIndexPage from "@/components/pages/case-studies/CaseStudiesIndexPage"

export async function generateStaticParams() {
  return [{ lang: "de" }, { lang: "en" }]
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>
}): Promise<Metadata> {
  const { lang } = await params
  return buildPageMetadata({
    lang,
    path: "case-studies",
    title: {
      de: "smiit GmbH – Case Studies aus dem Mittelstand",
      en: "smiit GmbH – Case studies from the SME world",
    },
    description: {
      de: "Echte Projekte, echte Zahlen: Wie smiit den Mittelstand mit individuellen Apps, Datenanalyse und Cloud-Architektur nach vorne bringt.",
      en: "Real projects, real numbers: how smiit moves SMEs forward with custom apps, data analytics and cloud architecture.",
    },
    ogImage: { url: "/og/case-studies.png", width: 1200, height: 630, alt: "smiit GmbH – Case Studies" },
  })
}

export default async function Page({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const ui = getCaseStudiesUi(lang)

  const breadcrumbJsonLd = buildBreadcrumbJsonLd(lang, [
    { name: ui.breadcrumbLabel, path: "case-studies" },
  ])

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <CaseStudiesIndexPage lang={lang} />
    </>
  )
}
