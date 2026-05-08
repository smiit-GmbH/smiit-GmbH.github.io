import type { Metadata } from "next"
import { getDictionary, Locale } from "@/lib/dictionary"
import StrategyPage from "@/components/pages/services/StrategyPage"
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
    path: "services/strategy",
    title: {
      de: "Digitale Unternehmensstrategie – smiit GmbH",
      en: "Digital business strategy – smiit GmbH",
    },
    description: {
      de: "Vom Status quo zur tragfähigen Roadmap: digitale Strategie und Transformationsbegleitung für mittelständische Unternehmen.",
      en: "From status quo to a viable roadmap: digital strategy and transformation support for mid-sized companies.",
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

  return <StrategyPage lang={lang} dict={dict} />
}
