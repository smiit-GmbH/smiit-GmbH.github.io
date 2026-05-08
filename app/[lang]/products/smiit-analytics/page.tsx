import type { Metadata } from "next"
import { getDictionary, Locale } from "@/lib/dictionary"
import SmiitAnalyticsPage from "@/components/pages/products/SmiitAnalyticsPage"
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
    path: "products/smiit-analytics",
    title: {
      de: "smiit Analytics – Plug-and-Play Analytics für den Mittelstand",
      en: "smiit Analytics – Plug-and-play analytics for SMEs",
    },
    description: {
      de: "smiit Analytics ist unsere fertige Analytics-Lösung mit vorgefertigten Dashboards und KPIs für den schnellen Einstieg.",
      en: "smiit Analytics is our ready-made analytics solution with pre-built dashboards and KPIs for a fast start.",
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

  return <SmiitAnalyticsPage lang={lang} dict={dict} />
}
