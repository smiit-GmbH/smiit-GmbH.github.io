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
      de: "smiit GmbH – bexio Auswertungen & Dashboard mit Power BI",
      en: "smiit GmbH – bexio reports & dashboard with Power BI",
    },
    description: {
      de: "bexio Auswertungen als fertiges Dashboard: 250+ Analysen, vollständiges Datenmodell und volle Eigentümerschaft — einmaliger Preis, 30 Tage kostenlos testen.",
      en: "bexio reports as a ready-made dashboard: 250+ analyses, complete data model and full ownership — one-time price, free 30-day trial included for SMEs.",
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

  const reviewItems: {
    author: string
    company: string
    rating: number
    date: string
    quote: string
  }[] = dict.smiitAnalytics.reviews.items

  const productJsonLd = buildProductJsonLd({
    lang,
    path: "products/smiit-analytics",
    name: "smiit Analytics",
    description: {
      de: "Plug-and-Play Analytics-Lösung mit vorgefertigten Dashboards und KPIs für den Mittelstand.",
      en: "Plug-and-play analytics solution with pre-built dashboards and KPIs for SMEs.",
    },
    reviews: reviewItems.map((r) => ({
      author: r.author,
      company: r.company,
      reviewBody: r.quote,
      ratingValue: r.rating,
      datePublished: r.date,
    })),
    aggregateRating: {
      ratingValue: 5,
      reviewCount: reviewItems.length,
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
