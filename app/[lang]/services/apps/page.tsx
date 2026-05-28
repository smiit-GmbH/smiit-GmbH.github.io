import type { Metadata } from "next"
import { getDictionary, Locale } from "@/lib/dictionary"
import AppsPage from "@/components/pages/services/AppsPage"
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
    path: "services/apps",
    title: {
      de: "smiit GmbH – Individualsoftware & Web-Apps für den Mittelstand",
      en: "smiit GmbH – Custom software & web apps for SMEs",
    },
    description: {
      de: "Individuelle Web Apps, interne Tools, Kundenportale, Prozessautomatisierung mit Power Automate, API-Integrationen und SaaS Plattformen für den Mittelstand.",
      en: "Custom web apps, internal tools, customer portals, process automation with Power Automate, API integrations and SaaS platforms for SMEs.",
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

  const serviceJsonLd = buildServiceJsonLd({
    lang,
    path: "services/apps",
    name: {
      de: "Individuelle Apps & Workflow-Automatisierung",
      en: "Custom apps & workflow automation",
    },
    description: {
      de: "Individuelle Web Apps entwickeln, interne Tools und Kundenportale bauen, Workflows automatisieren und bestehende Systeme über APIs integrieren.",
      en: "Develop custom web apps, build internal tools and customer portals, automate workflows and integrate existing systems through APIs.",
    },
    serviceType: {
      de: "Softwareentwicklung",
      en: "Software development",
    },
  })

  const breadcrumbJsonLd = buildBreadcrumbJsonLd(lang, [
    {
      name: lang === "de" ? "Apps & Workflows" : "Apps & workflows",
      path: "services/apps",
    },
  ])

  return (
    <>
      <JsonLd data={serviceJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <AppsPage lang={lang} dict={dict} />
    </>
  )
}
