import { getDictionary, Locale } from "@/lib/dictionary"
import StrategyPage from "@/components/pages/services/StrategyPage"

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

  return <StrategyPage lang={lang} dict={dict} />
}