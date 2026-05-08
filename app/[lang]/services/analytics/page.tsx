import type { Metadata } from "next"
import { getDictionary, Locale } from "@/lib/dictionary"
import AnalyticsPage from "@/components/pages/services/AnalyticsPage"
import { buildPageMetadata } from "@/lib/seo"

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
  })
}

export default async function Page({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const dict = getDictionary(lang)

  return <AnalyticsPage lang={lang} dict={dict} />
}
