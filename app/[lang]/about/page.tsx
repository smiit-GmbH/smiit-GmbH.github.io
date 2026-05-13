import type { Metadata } from "next"
import { getDictionary, Locale } from "@/lib/dictionary"
import AboutPage from "@/components/pages/AboutPage"
import { buildBreadcrumbJsonLd, buildPageMetadata, buildPersonJsonLd } from "@/lib/seo"
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
    path: "about",
    title: {
      de: "smiit GmbH – Über uns, Mission & Gründerteam",
      en: "smiit GmbH – About us, mission & founders",
    },
    description: {
      de: "smiit GmbH stellt sich vor: Wer wir sind, woran wir glauben und wie wir mittelständische Unternehmen bei der digitalen Transformation begleiten.",
      en: "smiit GmbH introduces itself: who we are, what we believe in, and how we partner with SMEs on their digital transformation journey end-to-end.",
    },
    ogImage: { url: "/og/about.png", width: 1200, height: 630, alt: "smiit GmbH – Über uns" },
  })
}

type FounderMember = {
  name: string
  role: string
  image: string
  bio: string
  email: string
  cvLink?: string
  linkedIn?: string
}

export default async function Page({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const dict = getDictionary(lang)

  const breadcrumbJsonLd = buildBreadcrumbJsonLd(lang, [
    { name: lang === "de" ? "Über uns" : "About us", path: "about" },
  ])

  const founders: FounderMember[] = dict.aboutPage.founders.members
  const knowsLanguage = lang === "de" ? ["German", "English"] : ["English", "German"]

  const personJsonLds = founders.map((founder) =>
    buildPersonJsonLd({
      name: founder.name,
      jobTitle: founder.role,
      image: founder.image,
      email: founder.email,
      description: founder.bio,
      knowsLanguage,
      sameAs: [founder.linkedIn, founder.cvLink].filter((u): u is string => Boolean(u)),
    }),
  )

  return (
    <>
      <link rel="preload" href="/data/world.geojson" as="fetch" crossOrigin="anonymous" />
      <JsonLd data={breadcrumbJsonLd} />
      {personJsonLds.map((data, idx) => (
        <JsonLd key={`person-${idx}`} data={data} />
      ))}
      <AboutPage lang={lang} dict={dict} />
    </>
  )
}
