import type { Metadata } from "next"
import { getDictionary, Locale } from "@/lib/dictionary"
import StrategyPage from "@/components/pages/services/StrategyPage"
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
    path: "services/strategy",
    title: {
      de: "smiit GmbH – Digitale Strategie & Beratung",
      en: "smiit GmbH – Digital strategy consulting",
    },
    description: {
      de: "Digitale Strategie und Beratung für den Mittelstand: vom Status quo zur tragfähigen Roadmap — pragmatisch, umsetzungsorientiert und ohne Berater-Theater.",
      en: "Digital strategy consulting for SMEs: from status quo to a viable roadmap — pragmatic, hands-on, and free of consulting theatre or PowerPoint inflation.",
    },
    ogImage: { url: "/og/services-strategy.png", width: 1200, height: 630, alt: "smiit GmbH – Digitale Strategie" },
  })
}

export default async function Page({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const dict = getDictionary(lang)

  const reviews = (dict.servicesStrategy.reviews ?? []).map((r: { name: string; quote: string }) => ({
    author: r.name,
    reviewBody: r.quote,
  }))

  const serviceJsonLd = buildServiceJsonLd({
    lang,
    path: "services/strategy",
    name: {
      de: "Digitale Unternehmensstrategie",
      en: "Digital business strategy",
    },
    description: {
      de: "Strategie- und Transformationsbegleitung für den Mittelstand: vom Status quo bis zur umsetzbaren digitalen Roadmap.",
      en: "Strategy and transformation guidance for SMEs: from status quo to an actionable digital roadmap.",
    },
    serviceType: {
      de: "Digitalstrategie",
      en: "Digital strategy",
    },
    reviews,
  })

  const breadcrumbJsonLd = buildBreadcrumbJsonLd(lang, [
    {
      name: lang === "de" ? "Strategie" : "Strategy",
      path: "services/strategy",
    },
  ])

  const faqJsonLd = buildFaqJsonLd(dict.servicesStrategy.faq.items)

  return (
    <>
      <JsonLd data={serviceJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={faqJsonLd} />
      <StrategyPage lang={lang} dict={dict} />
    </>
  )
}
