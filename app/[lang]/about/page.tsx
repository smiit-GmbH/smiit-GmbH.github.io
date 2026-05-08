import type { Metadata } from "next"
import { getDictionary, Locale } from "@/lib/dictionary"
import AboutPage from "@/components/pages/AboutPage"
import { buildBreadcrumbJsonLd, buildPageMetadata } from "@/lib/seo"
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
    path: "about",
    title: {
      de: "Über uns – smiit GmbH",
      en: "About us – smiit GmbH",
    },
    description: {
      de: "Wer wir sind, woran wir glauben und wie wir mittelständische Unternehmen bei der digitalen Transformation begleiten.",
      en: "Who we are, what we believe in, and how we partner with SMEs on their digital transformation.",
    },
    ogImage: { url: "/og/about.png", width: 1200, height: 630, alt: "smiit GmbH – Über uns" },
  })
}

export default async function Page({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const dict = getDictionary(lang)

  const breadcrumbJsonLd = buildBreadcrumbJsonLd(lang, [
    { name: lang === "de" ? "Über uns" : "About us", path: "about" },
  ])

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <AboutPage lang={lang} dict={dict} />
    </>
  )
}
