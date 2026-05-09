import type { Metadata } from "next"
import { getDictionary, Locale } from "@/lib/dictionary"
import AnalyticsPage from "@/components/pages/services/AnalyticsPage"
import { buildBreadcrumbJsonLd, buildFaqJsonLd, buildPageMetadata, buildServiceJsonLd } from "@/lib/seo"
import { JsonLd } from "@/components/seo/json-ld"

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
    path: "services/analytics",
    title: {
      de: "Datenanalyse & Business Intelligence – smiit GmbH",
      en: "Data analytics & business intelligence – smiit GmbH",
    },
    description: {
      de: "Aus Daten Entscheidungen machen: Dashboards, KPIs und Analytics-Lösungen, die Ihren Mittelstand operativ besser steuern.",
      en: "Turn data into decisions: dashboards, KPIs, and analytics solutions that help SMEs run their operations better.",
    },
    ogImage: { url: "/og/services-analytics.png", width: 1200, height: 630, alt: "smiit GmbH – Datenanalyse" },
  })
}

export default async function Page({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const dict = getDictionary(lang)

  const reviews = (dict.servicesAnalytics.reviews ?? []).map((r: { name: string; quote: string }) => ({
    author: r.name,
    reviewBody: r.quote,
  }))

  const serviceJsonLd = buildServiceJsonLd({
    lang,
    path: "services/analytics",
    name: {
      de: "Datenanalyse & Business Intelligence",
      en: "Data analytics & business intelligence",
    },
    description: {
      de: "Dashboards, KPIs und Analytics-Lösungen für mittelständische Unternehmen — von der Datenintegration bis zur operativen Steuerung.",
      en: "Dashboards, KPIs, and analytics solutions for mid-sized companies — from data integration to operational steering.",
    },
    serviceType: {
      de: "Datenanalyse",
      en: "Data analytics",
    },
    reviews,
  })

  const breadcrumbJsonLd = buildBreadcrumbJsonLd(lang, [
    {
      name: lang === "de" ? "Datenanalyse" : "Analytics",
      path: "services/analytics",
    },
  ])

  const faqJsonLd = buildFaqJsonLd(dict.servicesAnalytics.faq.items)

  return (
    <>
      <JsonLd data={serviceJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={faqJsonLd} />
      <AnalyticsPage lang={lang} dict={dict} />
    </>
  )
}
