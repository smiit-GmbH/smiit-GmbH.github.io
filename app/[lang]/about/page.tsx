import type { Metadata } from "next"
import { getDictionary, Locale } from "@/lib/dictionary"
import AboutPage from "@/components/pages/AboutPage"
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
    path: "about",
    title: {
      de: "Über uns – smiit GmbH",
      en: "About us – smiit GmbH",
    },
    description: {
      de: "Wer wir sind, woran wir glauben und wie wir mittelständische Unternehmen bei der digitalen Transformation begleiten.",
      en: "Who we are, what we believe in, and how we partner with SMEs on their digital transformation.",
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

  return <AboutPage lang={lang} dict={dict} />
}
