import type { Metadata } from "next"
import type { Locale } from "@/lib/dictionary"

export const SITE_URL = "https://www.smiit.de"
export const SITE_NAME = "smiit GmbH"

const defaultOgImage = {
  url: "/og/home.png",
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

type BreadcrumbItem = { name: string; path: string }

export function buildBreadcrumbJsonLd(lang: Locale, items: BreadcrumbItem[]) {
  const home = { name: lang === "de" ? "Start" : "Home", path: "" }
  const all = [home, ...items]
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: all.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}/${lang}${item.path ? `/${item.path}` : ""}/`,
    })),
  }
}

type ReviewInput = {
  author: string
  reviewBody: string
  ratingValue?: number
  datePublished?: string
}

type AggregateRatingInput = {
  ratingValue: number
  reviewCount: number
  bestRating?: number
  worstRating?: number
}

type ServiceJsonLdInput = {
  lang: Locale
  path: string
  name: LocalizedText
  description: LocalizedText
  serviceType?: LocalizedText
  reviews?: ReviewInput[]
  aggregateRating?: AggregateRatingInput
}

function buildReviewNode({ author, reviewBody, ratingValue, datePublished }: ReviewInput) {
  return {
    "@type": "Review",
    author: { "@type": "Organization", name: author },
    reviewBody,
    ...(ratingValue !== undefined
      ? {
          reviewRating: {
            "@type": "Rating",
            ratingValue,
            bestRating: 5,
            worstRating: 1,
          },
        }
      : {}),
    ...(datePublished ? { datePublished } : {}),
  }
}

function buildAggregateRatingNode({ ratingValue, reviewCount, bestRating = 5, worstRating = 1 }: AggregateRatingInput) {
  return {
    "@type": "AggregateRating",
    ratingValue,
    reviewCount,
    bestRating,
    worstRating,
  }
}

export function buildServiceJsonLd({
  lang,
  path,
  name,
  description,
  serviceType,
  reviews,
  aggregateRating,
}: ServiceJsonLdInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: name[lang],
    description: description[lang],
    serviceType: serviceType?.[lang],
    url: `${SITE_URL}/${lang}/${path}/`,
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    areaServed: ["DE", "AT", "CH", "EU"],
    inLanguage: lang === "de" ? "de-DE" : "en-US",
    ...(reviews && reviews.length > 0 ? { review: reviews.map(buildReviewNode) } : {}),
    ...(aggregateRating ? { aggregateRating: buildAggregateRatingNode(aggregateRating) } : {}),
  }
}

type FaqItem = { question: string; answer: string }

export function buildFaqJsonLd(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  }
}

type PersonJsonLdInput = {
  name: string
  jobTitle: string
  image?: string
  email?: string
  sameAs?: string[]
  description?: string
  knowsLanguage?: string[]
}

export function buildPersonJsonLd({
  name,
  jobTitle,
  image,
  email,
  sameAs,
  description,
  knowsLanguage,
}: PersonJsonLdInput) {
  const absoluteImage = image
    ? image.startsWith("http")
      ? image
      : `${SITE_URL}${image.startsWith("/") ? image : `/${image}`}`
    : undefined

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name,
    jobTitle,
    ...(absoluteImage ? { image: absoluteImage } : {}),
    ...(email ? { email } : {}),
    ...(description ? { description } : {}),
    ...(knowsLanguage && knowsLanguage.length > 0 ? { knowsLanguage } : {}),
    ...(sameAs && sameAs.length > 0 ? { sameAs } : {}),
    worksFor: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  }
}

type ProductJsonLdInput = {
  lang: Locale
  path: string
  name: string
  description: LocalizedText
  image?: string
}

export function buildProductJsonLd({ lang, path, name, description, image }: ProductJsonLdInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description: description[lang],
    image: image ?? `${SITE_URL}/og/home.png`,
    url: `${SITE_URL}/${lang}/${path}/`,
    brand: {
      "@type": "Brand",
      name: SITE_NAME,
    },
  }
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
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/icon.png", type: "image/png" },
      ],
      apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    },
    manifest: "/site.webmanifest",
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
