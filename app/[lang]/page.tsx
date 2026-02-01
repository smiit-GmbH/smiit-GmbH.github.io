import { getDictionary, Locale } from "@/lib/dictionary"
import Hero from "@/components/pages/home/hero"

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

  return <Hero lang={lang} dict={dict} />
}
