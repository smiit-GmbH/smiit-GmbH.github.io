import type { Metadata } from "next"
import { Locale } from "@/lib/dictionary"
import { buildBreadcrumbJsonLd, buildDefinedTermSetJsonLd, buildPageMetadata } from "@/lib/seo"
import { JsonLd } from "@/components/seo/json-ld"
import { glossaryCatalog, getGlossaryUi } from "@/lib/glossary"
import GlossaryIndexPage from "@/components/pages/glossary/GlossaryIndexPage"

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
    path: "glossary",
    title: {
      de: "smiit GmbH – Glossar für Datenanalyse, Cloud, Automatisierung & KI",
      en: "smiit GmbH – Glossary for Data analytics, cloud, automation & AI",
    },
    description: {
      de: "Das smiit Glossar erklärt zentrale Fachbegriffe rund um Power BI, Data Warehouse, SaaS, Cloud, Automatisierung und IT-Sicherheit – fundiert und praxisnah.",
      en: "The smiit glossary explains key terms around Power BI, data warehouses, SaaS, cloud, automation and IT security — grounded and practical.",
    },
    ogImage: { url: "/og/glossary.png", width: 1200, height: 630, alt: "smiit GmbH – Glossar" },
  })
}

export default async function Page({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const ui = getGlossaryUi(lang)

  const breadcrumbJsonLd = buildBreadcrumbJsonLd(lang, [{ name: ui.breadcrumbLabel, path: "glossary" }])

  const definedTermSetJsonLd = buildDefinedTermSetJsonLd({
    lang,
    name:
      lang === "de"
        ? "smiit Glossar für Datenanalyse, Automatisierung und Softwareentwicklung"
        : "smiit glossary for data analytics, automation and software development",
    description:
      lang === "de"
        ? "Fachbegriffe rund um Power BI, Data Warehousing, Microsoft Fabric, Automatisierung, SaaS, Cloud-Infrastruktur und IT-Sicherheit."
        : "Terms around Power BI, data warehousing, Microsoft Fabric, automation, SaaS, cloud infrastructure and IT security.",
    terms: glossaryCatalog.map((entry) => ({
      name: entry.term[lang],
      description: entry.shortDefinition[lang],
      slug: entry.hasPage ? entry.slug : undefined,
    })),
  })

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={definedTermSetJsonLd} />
      <GlossaryIndexPage lang={lang} />
    </>
  )
}
