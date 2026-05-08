import type { Metadata } from "next"
import type { Locale } from "@/lib/dictionary"

export const SITE_URL = "https://www.smiit.de"
export const SITE_NAME = "smiit GmbH"

const defaultOgImage = {
  url: "/og-image.png",
  width: 1200,
  height: 630,
  alt: "smiit GmbH",
}

type LocalizedText = { de: string; en: string }

type BuildPageMetadataInput = {
  lang: Locale
  /** Path segments after the lang segment, no leading/trailing slash. Empty for the home page. */
  path?: string
  title: LocalizedText
  description: LocalizedText
  ogImage?: { url: string; width: number; height: number; alt: string }
  /** If true, this page should not be indexed (e.g. redirect targets). */
  noindex?: boolean
}

export function buildPageMetadata({
  lang,
  path = "",
  title,
  description,
  ogImage = defaultOgImage,
  noindex = false,
}: BuildPageMetadataInput): Metadata {
  const localizedTitle = title[lang]
  const localizedDescription = description[lang]
  const suffix = path ? `/${path}` : ""
  const canonical = `/${lang}${suffix}/`

  return {
    metadataBase: new URL(SITE_URL),
    title: localizedTitle,
    description: localizedDescription,
    alternates: {
      canonical,
      languages: {
        de: `/de${suffix}/`,
        en: `/en${suffix}/`,
        "x-default": `/de${suffix}/`,
      },
    },
    robots: noindex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      title: localizedTitle,
      description: localizedDescription,
      url: canonical,
      siteName: SITE_NAME,
      locale: lang === "de" ? "de_DE" : "en_US",
      type: "website",
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: localizedTitle,
      description: localizedDescription,
      images: [ogImage],
    },
  }
}
