import type { Metadata } from "next"
import { getDictionary, Locale } from "@/lib/dictionary"
import ContactPage from "@/components/pages/ContactPage"

export async function generateStaticParams() {
  return [{ lang: "de" }, { lang: "en" }]
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>
}): Promise<Metadata> {
  const { lang } = await params
  const isDe = lang === "de"

  const title = isDe
    ? "smiit GmbH - Kontakt"
    : "smiit GmbH - Contact"
  const description = isDe
    ? "Nehmen Sie Kontakt mit uns auf. Wir freuen uns auf Ihr Projekt und Ihre Fragen."
    : "Get in touch with us. We look forward to your project and your questions."

  return {
    title,
    description,
    alternates: {
      canonical: `/${lang}/contact`,
      languages: {
        de: "/de/contact",
        en: "/en/contact",
        "x-default": "/de/contact",
      },
    },
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const dict = getDictionary(lang)

  return <ContactPage lang={lang} dict={dict} />
}
