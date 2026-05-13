import type { Metadata } from "next"
import { getDictionary, Locale } from "@/lib/dictionary"
import AppsPage from "@/components/pages/services/AppsPage"
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
    path: "services/apps",
    title: {
      de: "smiit GmbH – Web Apps für den Mittelstand",
      en: "smiit GmbH – Web apps & automation for SMEs",
    },
    description: {
      de: "Web Apps & Workflow-Automatisierung für den Mittelstand: individuelle Apps, automatisierte Prozesse und API-Integrationen, die Ihre Routine spürbar entlasten.",
      en: "Web apps & workflow automation for SMEs: custom apps, automated processes and API integrations that take routine work off your team's plate — measurably and fast.",
    },
    ogImage: { url: "/og/services-apps.png", width: 1200, height: 630, alt: "smiit GmbH – Apps & Workflows" },
  })
}

export default async function Page({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const dict = getDictionary(lang)

  const reviews = (dict.servicesApps.reviews ?? []).map((r: { name: string; quote: string }) => ({
    author: r.name,
    reviewBody: r.quote,
  }))

  const serviceJsonLd = buildServiceJsonLd({
    lang,
    path: "services/apps",
    name: {
      de: "Individuelle Apps & Workflow-Automatisierung",
      en: "Custom apps & workflow automation",
    },
    description: {
      de: "Maßgeschneiderte Webapplikationen und automatisierte Workflows, die Prozesse im Mittelstand spürbar beschleunigen.",
      en: "Custom web applications and automated workflows that meaningfully speed up SME processes.",
    },
    serviceType: {
      de: "Softwareentwicklung",
      en: "Software development",
    },
    reviews,
  })

  const breadcrumbJsonLd = buildBreadcrumbJsonLd(lang, [
    {
      name: lang === "de" ? "Apps & Workflows" : "Apps & workflows",
      path: "services/apps",
    },
  ])

  const faqJsonLd = buildFaqJsonLd(dict.servicesApps.faq.items)

  return (
    <>
      <JsonLd data={serviceJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={faqJsonLd} />
      <AppsPage lang={lang} dict={dict} />
    </>
  )
}
