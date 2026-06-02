import type { Metadata } from "next"
import { getDictionary, Locale } from "@/lib/dictionary"
import WebsitePage from "@/components/pages/services/WebsitePage"
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
    path: "website",
    title: {
      de: "smiit GmbH - Webdesign für Industrie & Mittelstand | Hochwertige Unternehmenswebsites",
      en: "smiit GmbH - Web design for industry & SMEs | High-quality corporate websites",
    },
    description: {
      de: "Hochwertige Unternehmenswebsites, die Vertrauen schaffen und Anfragen bringen. Für Bau, Entsorgung, Logistik und Industrie. Website-Relaunch ab 5.000 € – jetzt kostenloses Erstkonzept sichern.",
      en: "High-quality corporate websites that build trust and generate enquiries. For construction, waste management, logistics and industry. Website relaunch from €5,000 – get your free initial concept now.",
    },
    // TODO: dediziertes OG-Bild /og/services-website.png (1200×630) anlegen – nutzt vorerst home.png als Fallback statt 404.
    ogImage: { url: "/og/services-website.png", width: 1200, height: 630, alt: "smiit GmbH – Webdesign & Unternehmenswebsites" },
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
    path: "website",
    name: {
      de: "Webdesign & Unternehmenswebsites",
      en: "Web design & corporate websites",
    },
    description: {
      de: "Hochwertige Unternehmenswebsites für Bau, Entsorgung, Logistik und Industrie.",
      en: "High-quality corporate websites for construction, waste management, logistics and industry.",
    },
    serviceType: {
      de: "Webdesign",
      en: "Web design",
    },
    offers: {
      priceCurrency: "EUR",
      lowPrice: 5000,
      highPrice: 15000,
      offerCount: 3,
    },
  })

  const breadcrumbJsonLd = buildBreadcrumbJsonLd(lang, [
    {
      name: lang === "de" ? "Webdesign & Websites" : "Web design & websites",
      path: "website",
    },
  ])

  const faqJsonLd = buildFaqJsonLd((dict as any).servicesWebsite.faq.items)

  return (
    <>
      <JsonLd data={serviceJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={faqJsonLd} />
      <WebsitePage lang={lang} dict={dict} />
    </>
  )
}
