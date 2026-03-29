import { getDictionary, Locale } from "@/lib/dictionary"
import AnalyticsPage from "@/components/pages/services/AnalyticsPage"

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

  return <AnalyticsPage lang={lang} dict={dict} />
}