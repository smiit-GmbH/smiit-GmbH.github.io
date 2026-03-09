import { getDictionary, Locale } from "@/lib/dictionary"
import SmiitAnalyticsPage from "@/components/pages/products/SmiitAnalyticsPage"

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

  return <SmiitAnalyticsPage lang={lang} dict={dict} />
}
