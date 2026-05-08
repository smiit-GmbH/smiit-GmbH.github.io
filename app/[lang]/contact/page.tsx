import type { Metadata } from "next"
import { getDictionary, Locale } from "@/lib/dictionary"
import ContactPage from "@/components/pages/ContactPage"
import { buildBreadcrumbJsonLd, buildPageMetadata } from "@/lib/seo"
import { JsonLd } from "@/components/seo/json-ld"

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
    path: "contact",
    title: {
      de: "Kontakt – smiit GmbH",
      en: "Contact – smiit GmbH",
    },
    description: {
      de: "Sprechen Sie mit uns über Ihr digitales Vorhaben — per E-Mail, Telefon oder direkt online vereinbarten Termin.",
      en: "Talk to us about your digital initiative — by email, phone, or schedule an online appointment.",
    },
    ogImage: { url: "/og/contact.png", width: 1200, height: 630, alt: "smiit GmbH – Kontakt" },
  })
}

export default async function Page({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const dict = getDictionary(lang)

  const breadcrumbJsonLd = buildBreadcrumbJsonLd(lang, [
    { name: lang === "de" ? "Kontakt" : "Contact", path: "contact" },
  ])

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <ContactPage lang={lang} dict={dict} />
    </>
  )
}
