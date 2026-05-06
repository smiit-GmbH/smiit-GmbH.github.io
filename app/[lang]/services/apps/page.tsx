import { getDictionary, Locale } from "@/lib/dictionary"
import AppsPage from "@/components/pages/services/AppsPage"

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

  return <AppsPage lang={lang} dict={dict} />
}