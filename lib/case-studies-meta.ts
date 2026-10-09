import type { Locale } from "@/lib/dictionary"

// Case study types and UI strings. Safe to import from client components: unlike
// `lib/case-studies.ts`, it does not pull every case study into the browser bundle.

export type CaseStudyServiceArea = "apps" | "analytics" | "strategy"

export type CaseStudyMetric = {
  value: string
  label: string
}

/** One narrative block (Ausgangssituation, Lösung, …). Bullets are optional. */
export type CaseStudySection = {
  heading: string
  paragraphs: string[]
  bullets?: string[]
}

/** One entry in the "Technik & Architektur" box. */
export type CaseStudyTechItem = {
  name: string
  description: string
}

export type CaseStudyContent = {
  /** Stable, language-agnostic URL slug. */
  slug: string
  serviceArea: CaseStudyServiceArea
  /** Path of the related service page, e.g. "services/apps". */
  relatedServicePath: string
  /** ISO date used for Article JSON-LD. */
  datePublished: string
  ogImage?: { url: string; width: number; height: number; alt: string }
  /** In-body diagram / screenshot. */
  image?: { url: string; width: number; height: number; alt: string }

  // --- Hero / identity (Struktur-Punkt 1: Kunde + Branche + Größe) ---
  client: string
  industry: string
  companySize: string
  title: string
  /** Short lead paragraph under the title. */
  summary: string
  heroMetric: CaseStudyMetric

  // --- Fact box (quick scan) ---
  facts: { label: string; value: string }[]

  // --- Narrative (Ausgangssituation, Lösung, Sicherheit, …) ---
  sections: CaseStudySection[]

  // --- "Kennzahlen auf einen Blick" ---
  metrics: CaseStudyMetric[]

  // --- "Technik & Architektur" box ---
  techStack: CaseStudyTechItem[]

  // --- Struktur-Punkt 5: O-Ton des Kunden ---
  quote: { text: string; author: string; role: string }

  // --- SEO metadata ---
  metaTitle: string
  metaDescription: string
}

export type LocalizedCaseStudy = Record<Locale, CaseStudyContent>

/** What the case-study overview and "more case studies" teasers need (no narrative). */
export type CaseStudySummary = Pick<
  CaseStudyContent,
  "slug" | "client" | "title" | "summary" | "serviceArea" | "heroMetric" | "metrics" | "image"
>

type CaseStudiesUi = {
  eyebrow: string
  indexTitleLead: string
  indexTitleHighlight: string
  indexSubtitle: string
  readCaseStudy: string
  backToOverview: string
  factsHeading: string
  metricsHeading: string
  techHeading: string
  relatedServiceLabel: string
  ctaHeading: string
  ctaSubtitle: string
  ctaButton: string
  breadcrumbLabel: string
  moreCaseStudies: string
  publishedLabel: string
  chapterNavLabel: string
}

const caseStudiesUi: Record<Locale, CaseStudiesUi> = {
  de: {
    eyebrow: "Case Studies",
    indexTitleLead: "Kundenprojekte, die messbar",
    indexTitleHighlight: "etwas bewegen",
    indexSubtitle:
      "Echte Projekte, echte Zahlen. Ein Blick darauf, wie wir den Mittelstand mit Apps, Daten und Cloud-Architektur nach vorne bringen.",
    readCaseStudy: "Case Study lesen",
    backToOverview: "Alle Case Studies",
    factsHeading: "Eckdaten",
    metricsHeading: "Kennzahlen auf einen Blick",
    techHeading: "Technik & Architektur",
    relatedServiceLabel: "Passende Leistung",
    ctaHeading: "Wird Ihr Projekt unsere nächste Case Study?",
    ctaSubtitle: "Erzählen Sie uns von Ihrer Herausforderung — wir zeigen Ihnen, was technisch möglich ist.",
    ctaButton: "Kontaktieren Sie uns",
    breadcrumbLabel: "Case Studies",
    moreCaseStudies: "Weitere Case Studies",
    publishedLabel: "Veröffentlicht am",
    chapterNavLabel: "Kapitel",
  },
  en: {
    eyebrow: "Case studies",
    indexTitleLead: "Client projects that deliver",
    indexTitleHighlight: "measurable impact",
    indexSubtitle:
      "Real projects, real numbers. A look at how we move SMEs forward with apps, data and cloud architecture.",
    readCaseStudy: "Read case study",
    backToOverview: "All case studies",
    factsHeading: "Key facts",
    metricsHeading: "Key figures at a glance",
    techHeading: "Technology & architecture",
    relatedServiceLabel: "Related service",
    ctaHeading: "Will your project be our next case study?",
    ctaSubtitle: "Tell us about your challenge — we'll show you what's technically possible.",
    ctaButton: "Get in touch",
    breadcrumbLabel: "Case studies",
    moreCaseStudies: "More case studies",
    publishedLabel: "Published",
    chapterNavLabel: "Chapters",
  },
}

export function getCaseStudiesUi(lang: Locale): CaseStudiesUi {
  return caseStudiesUi[lang]
}
