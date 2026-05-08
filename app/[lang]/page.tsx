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
      de: "smiit GmbH – Datengesteuerte Transformation für den Mittelstand",
      en: "smiit GmbH – Data-driven transformation for SMEs",
    },
    description: {
      de: "Maßgeschneiderte digitale Lösungen für den Mittelstand: Apps, Workflows, Analytics und Unternehmensstrategie aus einer Hand.",
      en: "Tailored digital solutions for SMEs: apps, workflows, analytics, and strategy — all from one partner.",
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
