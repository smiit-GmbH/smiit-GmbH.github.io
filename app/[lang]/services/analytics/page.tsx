import type { Metadata } from "next"
import { getDictionary, Locale } from "@/lib/dictionary"
import AnalyticsPage from "@/components/pages/services/AnalyticsPage"
import { buildBreadcrumbJsonLd, buildPageMetadata, buildServiceJsonLd } from "@/lib/seo"
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
      de: "Power BI Beratung für Dashboard-Erstellung, Health Checks, Reporting-Überarbeitung, Datenplattformen, Microsoft Fabric und Machine Learning.",
      en: "Power BI consulting for dashboard creation, health checks, report redesign, data platforms, Microsoft Fabric and machine learning.",
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
      de: "Power BI Dashboards erstellen, bestehende Reports prüfen und überarbeiten, Datenplattformen konzipieren und Analytics-Lösungen produktiv betreiben.",
      en: "Create Power BI dashboards, review and redesign existing reports, design data platforms and operate analytics solutions in production.",
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

  return (
    <>
      <JsonLd data={serviceJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <AnalyticsPage lang={lang} dict={dict} />
    </>
  )
}
