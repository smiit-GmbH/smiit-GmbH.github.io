import type { Metadata } from "next"
import { getDictionary, Locale } from "@/lib/dictionary"
import AppsPage from "@/components/pages/services/AppsPage"
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
    path: "services/apps",
    title: {
      de: "Individuelle Apps & Workflows – smiit GmbH",
      en: "Custom apps & workflows – smiit GmbH",
    },
    description: {
      de: "Maßgeschneiderte Webapplikationen und automatisierte Workflows, die Prozesse im Mittelstand beschleunigen und entlasten.",
      en: "Custom web applications and automated workflows that speed up and offload processes in SMEs.",
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

  return <AppsPage lang={lang} dict={dict} />
}
