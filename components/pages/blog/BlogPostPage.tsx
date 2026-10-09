"use client"

import { useMemo, useState, type ReactNode } from "react"
import Link from "next/link"
import { ArrowRight, ChevronDown, ExternalLink } from "lucide-react"
import type { Locale } from "@/lib/dictionary"
import { blogCategoryMeta, getBlogUi, getReadingMinutes, type BlogPostContent } from "@/lib/blog"
import { getCaseStudy } from "@/lib/case-studies"
import { autolinkGlossary } from "@/lib/glossary-autolink"
import { useRevealOnScroll } from "@/hooks/use-reveal-on-scroll"
import { useLenis } from "@/components/smooth-scroll-provider"
import Breadcrumb from "@/components/pages/case-studies/breadcrumb"
import ChapterNav from "@/components/pages/case-studies/chapter-nav"
import { BlogBlockRenderer } from "./post/block-renderer"
import { BlogToc, type TocItem } from "./post/blog-toc"
import { cx, withEmphasis } from "./post/text-utils"

const SERVICE_LABEL: Record<string, { de: string; en: string }> = {
  "services/analytics": { de: "Datenanalyse", en: "Data analytics" },
  "services/apps": { de: "Apps & Workflows", en: "Apps & workflows" },
  "services/strategy": { de: "Digitale Strategie", en: "Digital strategy" },
}

export default function BlogPostPage({ lang, post }: { lang: Locale; post: BlogPostContent }) {
  const ui = getBlogUi(lang)
  const base = `/${lang}`
  const meta = blogCategoryMeta[post.category]
  const color = meta.color
  const [heroRef, heroRevealed] = useRevealOnScroll()
  const lenis = useLenis()

  // Sources are collapsed to the first 6 by default. A citation click (or the
  // "show more" button) reveals the rest, then scrolls to the requested entry.
  const SOURCES_PREVIEW = 6
  const [sourcesOpen, setSourcesOpen] = useState(false)
  const revealAndScrollToRef = (n: number) => {
    setSourcesOpen(true)
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        const el = document.getElementById(`ref-${n}`)
        if (!el) return
        if (lenis) lenis.scrollTo(el, { offset: -110 })
        else el.scrollIntoView({ behavior: "smooth", block: "start" })
      }),
    )
  }

  const minutes = getReadingMinutes(post)
  const publishedDate = new Intl.DateTimeFormat(lang === "de" ? "de-DE" : "en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(post.datePublished))

  const caseStudy = post.relatedCaseStudySlug ? getCaseStudy(post.relatedCaseStudySlug, lang) : undefined
  const serviceLabel = SERVICE_LABEL[post.relatedServicePath]?.[lang]

  // Number the top-level (H2) sections (stable anchor ids for the TOC) and
  // auto-link the first mention of each glossary term across the whole article,
  // in reading order, via a shared `used` set — same rule as the glossary pages.
  const { rendered, toc } = useMemo(() => {
    const used = new Set<string>()
    let h = 0
    const rendered: Array<{
      block: (typeof post.blocks)[number]
      id: string | undefined
      number: number | undefined
      linked: ReactNode | ReactNode[] | undefined
    }> = []
    for (const block of post.blocks) {
      let id: string | undefined
      let number: number | undefined
      let linked: ReactNode | ReactNode[] | undefined
      if (block.type === "heading") {
        h += 1
        id = `abschnitt-${h}`
        number = h
      } else if (block.type === "paragraph") {
        linked = withEmphasis(block.text, (plain) => autolinkGlossary(plain, { lang, used }))
      } else if (block.type === "bullets") {
        linked = block.items.map((item) => withEmphasis(item, (plain) => autolinkGlossary(plain, { lang, used })))
      }
      rendered.push({ block, id, number, linked })
    }
    const toc: TocItem[] = rendered
      .filter((item) => item.block.type === "heading")
      .map((item) => ({ id: item.id as string, text: (item.block as { text: string }).text, number: item.number as number }))
    return { rendered, toc }
  }, [post, lang])

  return (
    <main data-page="apps" style={{ ["--area" as string]: color }} className="pt-20 sm:pt-32">
      {/* Below lg the left sticky TOC is hidden — show the same rail nav as the
          case study detail page (right edge, ticks per section). */}
      {toc.length > 0 && (
        <ChapterNav
          items={toc.map((item) => ({ id: item.id, label: item.text }))}
          label={ui.tocLabel}
          wrapperId="blog-article-body"
          className="lg:hidden"
        />
      )}

      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            lang={lang}
            items={[
              { label: ui.breadcrumbLabel, href: `${base}/blog` },
              { label: post.shortTitle ?? post.title },
            ]}
          />

          <div ref={heroRef} className={cx("mt-8 max-w-[96ch] reveal-fade-up", heroRevealed && "revealed")}>
            <span
              style={{ color, backgroundColor: `${color}14` }}
              className="inline-flex rounded-full px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-wider"
            >
              {meta.label[lang]}
            </span>

            <h1
              lang={lang}
              className="mt-5 font-serif text-[2.3rem] sm:text-[2.9rem] md:text-[3.2rem] leading-[1.05] tracking-tight text-[#0B162D] hyphens-auto break-words"
            >
              {post.title}
            </h1>

            <p className="mt-6 max-w-[84ch] text-[0.98rem] sm:text-[1.1rem] leading-relaxed text-[#0B162D]/80">
              {post.excerpt}
            </p>

            <p className="mt-6 text-[0.82rem] text-[#0B162D]/50">
              {ui.byLabel} <span className="font-medium text-[#0B162D]/70">{post.author}</span>
              {" · "}
              <time dateTime={post.datePublished}>{publishedDate}</time>
              {" · "}
              {minutes} {ui.readingTimeSuffix}
            </p>
          </div>
        </div>
      </section>

      {/* ── Two-column: sticky TOC + content ── */}
      <div className="max-w-[1400px] mx-auto mt-14 px-4 sm:mt-16 sm:px-6 lg:px-8">
        <div id="blog-article-body" className="lg:grid lg:grid-cols-[210px_minmax(0,1fr)] lg:gap-14 xl:gap-20">
          {/* TOC */}
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <BlogToc items={toc} label={ui.tocLabel} />
            </div>
          </aside>

          {/* Content */}
          <div className="min-w-0">
            <article>
              {rendered.map((item, i) => (
                <BlogBlockRenderer key={i} block={item.block} id={item.id} number={item.number} linked={item.linked} color={color} onCite={revealAndScrollToRef} />
              ))}
            </article>
          </div>
        </div>
      </div>

      {/* ── Below the article: full width again, no TOC column ── */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            {/* FAQ */}
            {post.faq && post.faq.length > 0 && (
              <section className="mt-20 sm:mt-24">
                <h2 className="font-serif text-[1.8rem] sm:text-[2.2rem] leading-[1.1] tracking-tight text-[#0B162D]">
                  {ui.faqHeading}
                </h2>
                <div className="mt-8 space-y-4">
                  {post.faq.map((faqItem) => (
                    <details key={faqItem.question} className="group rounded-[18px] border border-black/10 bg-white/60 p-5 sm:p-6">
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[1rem] font-semibold text-[#0B162D]">
                        {faqItem.question}
                        <ArrowRight className="h-4 w-4 shrink-0 text-[var(--area)] transition-transform duration-300 group-open:rotate-90" />
                      </summary>
                      <p className="mt-3 text-[0.95rem] leading-relaxed text-[#0B162D]/70">{faqItem.answer}</p>
                    </details>
                  ))}
                </div>
              </section>
            )}

            {/* Related service + case study */}
            <section className="mt-20 sm:mt-24">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {serviceLabel && (
                  <Link
                    href={`${base}/${post.relatedServicePath}`}
                    className="group flex flex-col justify-between rounded-[20px] border border-black/10 bg-white/60 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-black/20 hover:shadow-[0_18px_40px_rgba(18,38,63,0.10)]"
                  >
                    <span className="text-[0.68rem] font-semibold uppercase tracking-wider text-[#0B162D]/45">
                      {ui.relatedServiceLabel}
                    </span>
                    <span className="mt-3 inline-flex items-center gap-1.5 font-serif text-[1.4rem] leading-tight tracking-tight text-[#0B162D] transition-colors group-hover:text-[var(--area)]">
                      {serviceLabel}
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                )}

                {caseStudy && (
                  <Link
                    href={`${base}/case-studies/${caseStudy.slug}`}
                    className="group flex flex-col justify-between rounded-[20px] border border-black/10 bg-white/60 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-black/20 hover:shadow-[0_18px_40px_rgba(18,38,63,0.10)]"
                  >
                    <span className="text-[0.68rem] font-semibold uppercase tracking-wider text-[#0B162D]/45">
                      {ui.relatedCaseStudyLabel}
                    </span>
                    <span className="mt-3 inline-flex items-start gap-1.5 font-serif text-[1.4rem] leading-tight tracking-tight text-[#0B162D] transition-colors group-hover:text-[var(--area)]">
                      {caseStudy.title}
                    </span>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-[0.82rem] font-semibold text-[#0B162D] transition-colors group-hover:text-[var(--area)]">
                      {caseStudy.client}
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                )}
              </div>
            </section>

            {/* Sources */}
            {post.sources && post.sources.length > 0 && (
              <section className="mt-20 sm:mt-24">
                <h2 className="font-serif text-[1.8rem] sm:text-[2.2rem] leading-[1.1] tracking-tight text-[#0B162D]">
                  {ui.sourcesHeading}
                </h2>
                <ul className="mt-7 space-y-3">
                  {post.sources.map((source, i) => (
                    <li
                      key={source.title}
                      id={`ref-${i + 1}`}
                      className={cx(
                        "scroll-mt-28 flex items-start gap-2.5",
                        !sourcesOpen && i >= SOURCES_PREVIEW && "hidden",
                      )}
                    >
                      <span className="mt-px shrink-0 font-mono text-[0.82rem] font-semibold text-[var(--area)]">
                        [{i + 1}]
                      </span>
                      {source.url ? (
                        <a
                          href={source.url}
                          target="_blank"
                          rel="noopener noreferrer nofollow"
                          className="group inline-flex items-start gap-1.5 text-[0.92rem] leading-relaxed text-[#0B162D]/75 transition-colors hover:text-[var(--area)]"
                        >
                          <span className="underline decoration-[#0B162D]/20 underline-offset-4 group-hover:decoration-[var(--area)]">
                            {source.title}
                          </span>
                          <ExternalLink className="mt-1 h-3.5 w-3.5 shrink-0 text-[#0B162D]/30 transition-colors group-hover:text-[var(--area)]" aria-hidden />
                        </a>
                      ) : (
                        <span className="text-[0.92rem] leading-relaxed text-[#0B162D]/75">{source.title}</span>
                      )}
                    </li>
                  ))}
                </ul>
                {!sourcesOpen && post.sources.length > SOURCES_PREVIEW && (
                  <button
                    type="button"
                    onClick={() => setSourcesOpen(true)}
                    className="mt-5 inline-flex items-center gap-1.5 text-[0.82rem] font-medium text-[#0B162D]/55 transition-colors hover:text-[var(--area)]"
                  >
                    <ChevronDown className="h-4 w-4" aria-hidden />
                    {post.sources.length - SOURCES_PREVIEW} {ui.sourcesMore}
                  </button>
                )}
              </section>
            )}

            {/* Footer meta + CTA */}
            <section className="mb-12 mt-16 sm:mb-20 lg:mb-24">
              <div className="flex flex-col items-start gap-6 border-t border-black/10 pt-12 sm:flex-row sm:items-center sm:justify-between">
                <div className="sm:max-w-[45%]">
                  <h2 className="font-serif text-[1.6rem] sm:text-[2rem] leading-[1.15] tracking-tight text-[#0B162D]">
                    {ui.ctaHeading}
                  </h2>
                  <p className="mt-3 text-[0.9rem] leading-relaxed text-[#0B162D]/60">{ui.ctaSubtitle}</p>
                  <p className="mt-3 text-[0.78rem] text-[#0B162D]/45">
                    <Link href={`${base}/blog`} className="font-medium text-[var(--area)] hover:underline">
                      {ui.backToOverview}
                    </Link>
                  </p>
                </div>
                <Link
                  href={`${base}/contact`}
                  className="group inline-flex shrink-0 items-center justify-center gap-1.5 rounded-lg bg-[#F703EB] px-6 py-3 text-[0.92rem] font-medium text-white transition-colors duration-300 hover:bg-[#D802CD]"
                >
                  {ui.ctaButton}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </Link>
              </div>
            </section>
      </div>
    </main>
  )
}
