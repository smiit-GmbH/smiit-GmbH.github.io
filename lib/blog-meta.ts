import type { Locale } from "@/lib/dictionary"

// Blog types, category metadata and UI strings — everything the blog UI needs
// that is not post content. Safe to import from client components: unlike
// `lib/blog.ts`, it does not pull every post into the browser bundle.

export type BlogCategory = "analytics" | "apps" | "strategy"

export type BlogBlock =
  | { type: "heading"; text: string } // renders as <h2>
  | { type: "subheading"; text: string } // renders as <h3>
  /** `refs` are 1-based indices into `sources`, rendered as superscript citations. */
  | { type: "paragraph"; text: string; refs?: number[] }
  /** `itemRefs` maps an item index to its citations (1-based indices into `sources`). */
  | { type: "bullets"; items: string[]; itemRefs?: Record<number, number[]> }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "code"; content: string }
  | { type: "image"; src: string; alt: string; width: number; height: number; caption?: string; maxWidth?: number }
  | { type: "maturity"; items: { level: number; label: string }[] }
  | { type: "grid"; items: { title: string; description: string }[] }
  | { type: "numbered"; items: { title: string; description: string }[] }
  | { type: "filetree"; nodes: FileTreeNode[] }
  | { type: "flow"; steps: string[] }
  /** Connected flow diagram: nodes joined by arrows, each with an optional list of branch items. */
  | { type: "diagram"; steps: { label: string; items?: string[] }[] }
  | { type: "repo"; name: string; description: string; url: string }

export type FileTreeNode =
  | { type: "folder"; name: string; note?: string; defaultOpen?: boolean; children: FileTreeNode[] }
  | { type: "file"; name: string }

export type BlogSource = { title: string; url?: string }
export type BlogFaqItem = { question: string; answer: string }

export type BlogImage = { url: string; width: number; height: number; alt: string }

export type BlogPostContent = {
  /** Stable, language-agnostic URL slug. */
  slug: string
  category: BlogCategory
  /** ISO date used for BlogPosting JSON-LD + sitemap lastmod. */
  datePublished: string
  dateModified: string
  author: string
  /** H1. */
  title: string
  /** Optional shorter title used in breadcrumbs; falls back to `title`. */
  shortTitle?: string
  /** Lead / summary shown on the index card and used as the meta description fallback. */
  excerpt: string
  heroImage?: BlogImage
  ogImage?: BlogImage
  /** Teaser image shown on the blog index/timeline. Falls back to an accent panel. */
  coverImage?: BlogImage
  blocks: BlogBlock[]
  faq?: BlogFaqItem[]
  sources?: BlogSource[]
  /** Path of the related service page, e.g. "services/analytics". */
  relatedServicePath: string
  /** Slug of a related case study (see lib/case-studies.ts), if any. */
  relatedCaseStudySlug?: string
  keywords: string[]
  metaTitle: string
  metaDescription: string
}

export type LocalizedBlogPost = Partial<Record<Locale, BlogPostContent>>

// ---------------------------------------------------------------------------
// Category metadata (label + accent color + related service)
// ---------------------------------------------------------------------------

export const blogCategoryMeta: Record<
  BlogCategory,
  { label: { de: string; en: string }; color: string; servicePath: string }
> = {
  analytics: {
    label: { de: "Analytics, Daten & KI", en: "Analytics, data & AI" },
    color: "#21569c",
    servicePath: "services/analytics",
  },
  apps: {
    label: { de: "Plattformen, Apps & Cloud", en: "Platforms, apps & cloud" },
    color: "#F703EB",
    servicePath: "services/apps",
  },
  strategy: {
    label: { de: "Strategie, Automatisierung & Security", en: "Strategy, automation & security" },
    color: "#64748B",
    servicePath: "services/strategy",
  },
}

/** What the blog index needs per post (no body blocks). */
export type BlogPostSummary = Pick<
  BlogPostContent,
  "slug" | "category" | "datePublished" | "author" | "title" | "excerpt" | "coverImage"
> & { minutes: number }

/** Rough reading time in minutes, derived from the body blocks (~200 wpm). */
export function getReadingMinutes(post: BlogPostContent): number {
  const words = post.blocks.reduce((acc, block) => {
    if (block.type === "paragraph" || block.type === "heading" || block.type === "subheading") {
      return acc + block.text.split(/\s+/).length
    }
    if (block.type === "bullets") {
      return acc + block.items.join(" ").split(/\s+/).length
    }
    if (block.type === "code") {
      return acc + block.content.split(/\s+/).length
    }
    return acc
  }, 0)
  return Math.max(1, Math.round(words / 200))
}

type BlogUi = {
  eyebrow: string
  indexTitleLead: string
  indexTitleHighlight: string
  indexSubtitle: string
  readArticle: string
  backToOverview: string
  tocLabel: string
  byLabel: string
  publishedLabel: string
  updatedLabel: string
  readingTimeSuffix: string
  faqHeading: string
  sourcesHeading: string
  sourcesMore: string
  relatedServiceLabel: string
  relatedCaseStudyLabel: string
  ctaHeading: string
  ctaSubtitle: string
  ctaButton: string
  breadcrumbLabel: string
  emptyState: string
}

const blogUi: Record<Locale, BlogUi> = {
  de: {
    eyebrow: "Blog",
    indexTitleLead: "Fachartikel, die",
    indexTitleHighlight: "in die Tiefe gehen",
    indexSubtitle:
      "Praxiswissen zu Datenanalyse, Cloud, KI und digitaler Strategie — fundiert, ehrlich und aus echten Projekten heraus geschrieben.",
    readArticle: "Artikel lesen",
    backToOverview: "Alle Artikel",
    tocLabel: "Inhalt",
    byLabel: "von",
    publishedLabel: "Veröffentlicht am",
    updatedLabel: "Aktualisiert am",
    readingTimeSuffix: "Min. Lesezeit",
    faqHeading: "Häufige Fragen",
    sourcesHeading: "Quellen & weiterführende Literatur",
    sourcesMore: "weitere Quellen anzeigen",
    relatedServiceLabel: "Passende Leistung",
    relatedCaseStudyLabel: "Passende Case Study",
    ctaHeading: "Klingt das nach Ihrem nächsten Projekt?",
    ctaSubtitle:
      "Erzählen Sie uns von Ihrem Vorhaben — wir zeigen Ihnen, was technisch und wirtschaftlich sinnvoll ist.",
    ctaButton: "Kostenloses Erstgespräch",
    breadcrumbLabel: "Blog",
    emptyState: "Hier entstehen gerade die ersten Beiträge. Schauen Sie bald wieder vorbei.",
  },
  en: {
    eyebrow: "Blog",
    indexTitleLead: "In-depth articles that",
    indexTitleHighlight: "go beyond the surface",
    indexSubtitle:
      "Practical knowledge on data analytics, cloud, AI and digital strategy — well-founded, honest and written from real projects.",
    readArticle: "Read article",
    backToOverview: "All articles",
    tocLabel: "Contents",
    byLabel: "by",
    publishedLabel: "Published",
    updatedLabel: "Updated",
    readingTimeSuffix: "min read",
    faqHeading: "Frequently asked questions",
    sourcesHeading: "Sources & further reading",
    sourcesMore: "more sources",
    relatedServiceLabel: "Related service",
    relatedCaseStudyLabel: "Related case study",
    ctaHeading: "Sounds like your next project?",
    ctaSubtitle: "Tell us about your plans — we'll show you what makes sense technically and commercially.",
    ctaButton: "Free initial consultation",
    breadcrumbLabel: "Blog",
    emptyState: "The first posts are on their way. Please check back soon.",
  },
}

export function getBlogUi(lang: Locale): BlogUi {
  return blogUi[lang]
}
