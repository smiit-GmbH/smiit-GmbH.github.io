import type { Metadata } from "next"
import { getDictionary, Locale } from "@/lib/dictionary"
import StrategyPage from "@/components/pages/services/StrategyPage"
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
    path: "services/strategy",
    title: {
      de: "smiit GmbH – Digitale Strategie & Beratung",
      en: "smiit GmbH – Digital strategy consulting",
    },
    description: {
      de: "Digitalisierungsberatung für Roadmaps, Datenstrategie, Azure Cloud Architektur, IT-Sicherheits-Checks, Prozessanalyse und Automatisierungsplanung.",
      en: "Digitalization consulting for roadmaps, data strategy, Azure cloud architecture, IT security checks, process analysis and automation planning.",
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

  const serviceJsonLd = buildServiceJsonLd({
    lang,
    path: "services/strategy",
    name: {
      de: "Digitale Unternehmensstrategie",
      en: "Digital business strategy",
    },
    description: {
      de: "Digitalisierungs-Roadmaps, Datenstrategie, Azure Cloud Architektur, IT-Sicherheits-Checks und Prozessautomatisierung für den Mittelstand.",
      en: "Digitalization roadmaps, data strategy, Azure cloud architecture, IT security checks and process automation for SMEs.",
    },
    serviceType: {
      de: "Digitalstrategie",
      en: "Digital strategy",
    },
  })

  const breadcrumbJsonLd = buildBreadcrumbJsonLd(lang, [
    {
      name: lang === "de" ? "Strategie" : "Strategy",
      path: "services/strategy",
    },
  ])

  return (
    <>
      <JsonLd data={serviceJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <StrategyPage lang={lang} dict={dict} />
    </>
  )
}
