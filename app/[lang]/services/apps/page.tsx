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
      de: "Individuelle Apps & Workflows – smiit GmbH",
      en: "Custom apps & workflows – smiit GmbH",
    },
    description: {
      de: "Maßgeschneiderte Webapplikationen und automatisierte Workflows, die Prozesse im Mittelstand beschleunigen und entlasten.",
      en: "Custom web applications and automated workflows that speed up and offload processes in SMEs.",
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

  return (
    <>
      <JsonLd data={serviceJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <AppsPage lang={lang} dict={dict} />
    </>
  )
}
