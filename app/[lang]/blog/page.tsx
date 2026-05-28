import type { Metadata } from "next"
import { Locale } from "@/lib/dictionary"
import { buildBreadcrumbJsonLd, buildPageMetadata } from "@/lib/seo"
import { JsonLd } from "@/components/seo/json-ld"
import { getBlogUi } from "@/lib/blog"
import BlogIndexPage from "@/components/pages/blog/BlogIndexPage"

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
    path: "blog",
    title: {
      de: "smiit GmbH – Fachartikel zu Daten, Cloud, KI & Strategie",
      en: "smiit GmbH – articles on data, cloud, AI & strategy",
    },
    description: {
      de: "Praxiswissen aus echten Projekten: Datenanalyse, Cloud-Architektur, KI/MLOps und digitale Strategie für den Mittelstand — fundiert und ehrlich erklärt.",
      en: "Practical knowledge from real projects: data analytics, cloud architecture, AI/MLOps and digital strategy for SMEs — explained clearly and honestly.",
    },
    ogImage: { url: "/og/blog.png", width: 1920, height: 999, alt: "smiit GmbH – Blog" },
  })
}

export default async function Page({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const ui = getBlogUi(lang)

  const breadcrumbJsonLd = buildBreadcrumbJsonLd(lang, [{ name: ui.breadcrumbLabel, path: "blog" }])

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <BlogIndexPage lang={lang} />
    </>
  )
}
