import type { Metadata } from "next"
import { getDictionary, Locale } from "@/lib/dictionary"
import SmiitAnalyticsPage from "@/components/pages/products/SmiitAnalyticsPage"
import { buildBreadcrumbJsonLd, buildFaqJsonLd, buildPageMetadata, buildProductJsonLd } from "@/lib/seo"
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
    path: "products/smiit-analytics",
    title: {
      de: "smiit Analytics – Plug-and-Play Analytics für den Mittelstand",
      en: "smiit Analytics – Plug-and-play analytics for SMEs",
    },
    description: {
      de: "smiit Analytics ist unsere fertige Analytics-Lösung mit vorgefertigten Dashboards und KPIs für den schnellen Einstieg.",
      en: "smiit Analytics is our ready-made analytics solution with pre-built dashboards and KPIs for a fast start.",
    },
    ogImage: { url: "/og/products-smiit-analytics.png", width: 1200, height: 630, alt: "smiit Analytics" },
  })
}

export default async function Page({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const dict = getDictionary(lang)

  const productJsonLd = buildProductJsonLd({
    lang,
    path: "products/smiit-analytics",
    name: "smiit Analytics",
    description: {
      de: "Plug-and-Play Analytics-Lösung mit vorgefertigten Dashboards und KPIs für den Mittelstand.",
      en: "Plug-and-play analytics solution with pre-built dashboards and KPIs for SMEs.",
    },
  })

  const breadcrumbJsonLd = buildBreadcrumbJsonLd(lang, [
    { name: "smiit Analytics", path: "products/smiit-analytics" },
  ])

  const faqJsonLd = buildFaqJsonLd(dict.smiitAnalytics.faq.items)

  return (
    <>
      <JsonLd data={productJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={faqJsonLd} />
      <SmiitAnalyticsPage lang={lang} dict={dict} />
    </>
  )
}
