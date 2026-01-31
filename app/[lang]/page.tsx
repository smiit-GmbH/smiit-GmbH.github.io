import { getDictionary, Locale } from "@/lib/dictionary"
import HomeClient from "@/components/pages/home/hero"

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

  return <HomeClient lang={lang} dict={dict} />
}
