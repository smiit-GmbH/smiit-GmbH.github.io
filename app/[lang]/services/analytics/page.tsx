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
      de: "smiit GmbH – Power BI Beratung für den Mittelstand",
      en: "smiit GmbH – Power BI consulting for SMEs",
    },
    description: {
      de: "Power BI Beratung für den Mittelstand: Dashboards, KPIs und Datenmodelle, die operative Entscheidungen beschleunigen — von Aufnahme bis Rollout.",
      en: "Power BI consulting for SMEs: dashboards, KPIs and data models that accelerate operational decisions — from assessment through rollout to training.",
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
