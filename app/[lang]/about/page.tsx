import { getDictionary, Locale } from "@/lib/dictionary"
import AboutPage from "@/components/pages/AboutPage"

export async function generateStaticParams() {
  return [{ lang: "de" }, { lang: "en" }]
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
