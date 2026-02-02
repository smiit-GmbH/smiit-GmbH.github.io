import { getDictionary, Locale } from "@/lib/dictionary"
import HomePage from "@/components/pages/home/HomePage"

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

  return <HomePage lang={lang} dict={dict} />
}
