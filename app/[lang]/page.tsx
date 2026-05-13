import type { Metadata } from "next"
import { getDictionary, Locale } from "@/lib/dictionary"
import HomePage from "@/components/pages/HomePage"
import { buildPageMetadata } from "@/lib/seo"

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
    title: {
      de: "smiit GmbH – Digitale Transformation für den Mittelstand",
      en: "smiit GmbH – Digital transformation for SMEs",
    },
    description: {
      de: "Digitale Transformation für den Mittelstand: smiit GmbH plant und baut Apps, Workflows, Analytics und Strategie — pragmatisch und umsetzungsstark.",
      en: "Digital transformation for SMEs: smiit GmbH delivers apps, workflows, analytics and strategy — pragmatic, hands-on, ready to ship in weeks.",
    },
  })
}

export default async function Page({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const dict = getDictionary(lang)

  return <HomePage lang={lang} dict={dict} />
}
