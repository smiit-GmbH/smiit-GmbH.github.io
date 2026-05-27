"use client"

import { useEffect, useMemo, useState, type CSSProperties, type ReactNode } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, ArrowUpRight, ChevronDown, ChevronRight, ExternalLink, File, Folder, FolderOpen } from "lucide-react"
import type { Locale } from "@/lib/dictionary"
import { blogCategoryMeta, getBlogUi, getReadingMinutes, type BlogBlock, type BlogPostContent, type FileTreeNode } from "@/lib/blog"
import { getCaseStudy } from "@/lib/case-studies"
import { autolinkGlossary } from "@/lib/glossary-autolink"
import { useRevealOnScroll } from "@/hooks/use-reveal-on-scroll"
import { useLenis } from "@/components/smooth-scroll-provider"
import Breadcrumb from "@/components/pages/case-studies/breadcrumb"
import ChapterNav from "@/components/pages/case-studies/chapter-nav"

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ")
}

const SERVICE_LABEL: Record<string, { de: string; en: string }> = {
  "services/analytics": { de: "Datenanalyse", en: "Data analytics" },
  "services/apps": { de: "Apps & Workflows", en: "Apps & workflows" },
  "services/strategy": { de: "Digitale Strategie", en: "Digital strategy" },
}

type TocItem = { id: string; text: string; number: number }

export default function BlogPostPage({ lang, post }: { lang: Locale; post: BlogPostContent }) {
  const ui = getBlogUi(lang)
  const base = `/${lang}`
  const meta = blogCategoryMeta[post.category]
  const color = meta.color
  const hero = useRevealOnScroll()
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
    const rendered = post.blocks.map((block) => {
      let id: string | undefined
      let number: number | undefined
      let linked: ReactNode | ReactNode[] | undefined
      if (block.type === "heading") {
        h += 1
        id = `abschnitt-${h}`
        number = h
      } else if (block.type === "paragraph") {
        linked = autolinkGlossary(block.text, { lang, used })
      } else if (block.type === "bullets") {
        linked = block.items.map((item) => autolinkGlossary(item, { lang, used }))
      }
      return { block, id, number, linked }
    })
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

          <div ref={hero.ref} className={cx("mt-8 max-w-[96ch] reveal-fade-up", hero.isRevealed && "revealed")}>
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

/** Left sticky table of contents with scrollspy + click-to-scroll. */
function BlogToc({ items, label }: { items: TocItem[]; label: string }) {
  const lenis = useLenis()
  const [active, setActive] = useState<string | undefined>(items[0]?.id)

  useEffect(() => {
    const headings = items
      .map((item) => ({ id: item.id, el: document.getElementById(item.id) }))
      .filter((h): h is { id: string; el: HTMLElement } => h.el !== null)
    if (headings.length === 0) return

    // Position-based scrollspy: the active section is the last heading whose top
    // has scrolled above a threshold line. Unlike a band-based IntersectionObserver,
    // this stays correct while reading long sections and when scrolling back up.
    const THRESHOLD = 140 // px below the fixed header
    let raf = 0

    const update = () => {
      raf = 0
      let current = headings[0].id
      for (const h of headings) {
        if (h.el.getBoundingClientRect().top <= THRESHOLD) current = h.id
        else break
      }
      // At the very bottom, force the last section (its heading may never reach the line).
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2
      if (atBottom) current = headings[headings.length - 1].id
      setActive(current)
    }

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }

    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    lenis?.on("scroll", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      lenis?.off("scroll", onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [items, lenis])

  const go = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    setActive(id)
    if (lenis) lenis.scrollTo(el, { offset: -110 })
    else el.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  if (items.length === 0) return null

  return (
    <nav aria-label={label}>
      <p className="mb-4 text-[0.7rem] font-semibold uppercase tracking-wider text-[#0B162D]/40">{label}</p>
      <ul className="border-l border-black/10">
        {items.map((item) => {
          const isActive = item.id === active
          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => go(item.id)}
                aria-current={isActive ? "true" : undefined}
                className={cx(
                  "group -ml-px flex w-full items-baseline gap-2.5 border-l-2 py-1.5 pl-4 text-left transition-colors duration-200",
                  isActive
                    ? "border-[var(--area)] text-[#0B162D]"
                    : "border-transparent text-[#0B162D]/55 hover:text-[#0B162D]",
                )}
              >
                <span className={cx("font-mono text-[0.68rem]", isActive ? "text-[var(--area)]" : "text-[#0B162D]/35")}>
                  {String(item.number).padStart(2, "0")}
                </span>
                <span className="text-[0.85rem] leading-snug">{item.text}</span>
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

function BlogBlockRenderer({
  block,
  id,
  number,
  linked,
  color,
  onCite,
}: {
  block: BlogBlock
  id?: string
  number?: number
  /** Glossary-autolinked content: a node for paragraphs, an aligned array for bullets. */
  linked?: ReactNode | ReactNode[]
  /** Category accent color (hex), used by the maturity graphic. */
  color: string
  /** Reveals the (collapsed) sources list and scrolls to the cited entry. */
  onCite?: (n: number) => void
}) {
  switch (block.type) {
    case "heading":
      return (
        <div className="mt-16 mb-5 first:mt-0">
          <span aria-hidden className="font-mono text-[0.8rem] font-semibold tracking-[0.2em] text-[var(--area)]">
            {String(number ?? 0).padStart(2, "0")}
          </span>
          <h2
            id={id}
            className="mt-3 scroll-mt-28 font-serif text-[1.55rem] sm:text-[1.9rem] leading-[1.12] tracking-tight text-[#0B162D]"
          >
            {block.text}
          </h2>
        </div>
      )
    case "subheading":
      return (
        <h3 className="mt-10 mb-4 scroll-mt-28 font-serif text-[1.25rem] sm:text-[1.5rem] leading-[1.2] tracking-tight text-[#0B162D]">
          {block.text}
        </h3>
      )
    case "paragraph":
      return (
        <p className="mb-5 text-[0.9rem] sm:text-[1.05rem] leading-[1.75] text-[#0B162D]/80">
          {linked ?? block.text}
          {block.refs && block.refs.length > 0 && (
            <sup className="ml-0.5 font-semibold">
              {block.refs.map((n) => (
                <a
                  key={n}
                  href={`#ref-${n}`}
                  onClick={(e) => {
                    if (onCite) {
                      e.preventDefault()
                      onCite(n)
                    }
                  }}
                  className="text-[var(--area)] no-underline hover:underline"
                >
                  [{n}]
                </a>
              ))}
            </sup>
          )}
        </p>
      )
    case "bullets":
      return (
        <ul className="mb-6 space-y-3">
          {block.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--area)]" />
              <span className="text-[0.98rem] sm:text-[1.05rem] leading-[1.7] text-[#0B162D]/80">
                {Array.isArray(linked) ? linked[i] : item}
              </span>
            </li>
          ))}
        </ul>
      )
    case "code":
      return (
        <pre className="mb-6 overflow-x-auto rounded-[16px] bg-[#0B162D] p-5 text-[0.82rem] leading-relaxed text-white/85 shadow-[0_14px_40px_rgba(11,22,45,0.18)]">
          <code className="font-mono whitespace-pre">{block.content}</code>
        </pre>
      )
    case "grid":
      return (
        <div className="my-8 rounded-[20px] border border-black/10 bg-[#0B162D]/[0.02] p-6 sm:p-7">
          <ul className="grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2">
            {block.items.map((item) => (
              <li key={item.title} className="flex items-start gap-3">
                <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--area)]" />
                <span>
                  <span className="block text-[0.95rem] font-semibold text-[#0B162D]">{item.title}</span>
                  <span className="text-[0.86rem] leading-snug text-[#0B162D]/60">{item.description}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      )
    case "numbered":
      return (
        <ol className="my-8 space-y-2.5">
          {block.items.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-3.5 rounded-xl border border-black/10 bg-white px-4 py-3.5 shadow-[0_2px_10px_rgba(18,38,63,0.04)]"
            >
              <span
                className="mt-px flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-mono text-[0.8rem] font-semibold"
                style={{ color, backgroundColor: `${color}14` }}
              >
                {i + 1}
              </span>
              <span className="min-w-0">
                <span className="block text-[0.95rem] font-semibold text-[#0B162D]">{item.title}</span>
                <span className="mt-0.5 block text-[0.86rem] leading-snug text-[#0B162D]/60">{item.description}</span>
              </span>
            </li>
          ))}
        </ol>
      )
    case "repo":
      return (
        <a
          href={block.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group my-4 flex items-start gap-4 rounded-[16px] border border-black/10 bg-white/60 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-black/20 hover:shadow-[0_14px_36px_rgba(18,38,63,0.10)]"
        >
          <span
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
            style={{ color, backgroundColor: `${color}14` }}
          >
            <svg viewBox="0 0 16 16" className="h-5 w-5" fill="currentColor" aria-hidden>
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
            </svg>
          </span>
          <span className="min-w-0 flex-1">
            <span className="block font-mono text-[0.9rem] font-semibold text-[#0B162D] transition-colors group-hover:text-[var(--area)]">
              {block.name}
            </span>
            <span className="mt-1 block text-[0.86rem] leading-snug text-[#0B162D]/60">{block.description}</span>
          </span>
          <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-[#0B162D]/30 transition-colors group-hover:text-[var(--area)]" aria-hidden />
        </a>
      )
    case "flow":
      return <FlowSteps steps={block.steps} color={color} />
    case "filetree":
      return <FileTree nodes={block.nodes} />
    case "maturity":
      return <MaturityLadder items={block.items} color={color} />
    case "image":
      return (
        <figure className="my-9 mx-auto" style={{ maxWidth: block.maxWidth ?? 760 }}>
          <div className="overflow-hidden rounded-[16px] border border-black/10 bg-white p-4 sm:p-6">
            <Image
              src={block.src}
              alt={block.alt}
              width={block.width}
              height={block.height}
              sizes={`(min-width: 1024px) ${block.maxWidth ?? 760}px, 100vw`}
              className="mx-auto h-auto w-full"
            />
          </div>
          {block.caption && (
            <figcaption className="mt-3 text-center text-[0.82rem] leading-relaxed text-[#0B162D]/50">
              {block.caption}
            </figcaption>
          )}
        </figure>
      )
    default:
      return null
  }
}

/** Numbered process steps in a tidy fixed grid (light alternative to a code block). */
function FlowSteps({ steps, color }: { steps: string[]; color: string }) {
  return (
    <ol className="my-8 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
      {steps.map((step, i) => (
        <li
          key={i}
          className="flex items-start gap-3 rounded-xl border border-black/10 bg-white px-4 py-3 shadow-[0_2px_10px_rgba(18,38,63,0.04)]"
        >
          <span
            className="mt-px flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-mono text-[0.72rem] font-semibold"
            style={{ color, backgroundColor: `${color}14` }}
          >
            {i + 1}
          </span>
          <span className="text-[0.9rem] leading-snug text-[#0B162D]/85">{step}</span>
        </li>
      ))}
    </ol>
  )
}

/** Interactive, collapsible repository file tree. */
function FileTree({ nodes }: { nodes: FileTreeNode[] }) {
  return (
    <div className="my-8 overflow-hidden rounded-[16px] border border-black/10 bg-[#0B162D]/[0.02] p-2.5 font-mono text-[0.85rem] sm:p-3.5">
      <ul>
        {nodes.map((node, i) => (
          <FileTreeItem key={i} node={node} depth={0} />
        ))}
      </ul>
    </div>
  )
}

function FileTreeItem({ node, depth }: { node: FileTreeNode; depth: number }) {
  const indent = { paddingLeft: depth * 18 + 6 }

  if (node.type === "file") {
    return (
      <li>
        <div className="flex items-center gap-2 py-1 pr-2 text-[#0B162D]/70" style={indent}>
          <File className="h-3.5 w-3.5 shrink-0 text-[#0B162D]/35" aria-hidden />
          <span>{node.name}</span>
        </div>
      </li>
    )
  }

  return <FileTreeFolder node={node} depth={depth} indent={indent} />
}

function FileTreeFolder({
  node,
  depth,
  indent,
}: {
  node: Extract<FileTreeNode, { type: "folder" }>
  depth: number
  indent: CSSProperties
}) {
  const hasChildren = node.children.length > 0
  const [open, setOpen] = useState(Boolean(node.defaultOpen))

  const Label = (
    <>
      {open && hasChildren ? (
        <FolderOpen className="h-4 w-4 shrink-0 text-[var(--area)]" aria-hidden />
      ) : (
        <Folder className="h-4 w-4 shrink-0 text-[var(--area)]" aria-hidden />
      )}
      <span className="font-semibold text-[#0B162D]">{node.name}/</span>
      {node.note && (
        <span className="ml-2 hidden truncate font-sans text-[0.72rem] font-normal text-[#0B162D]/45 sm:inline">
          {node.note}
        </span>
      )}
    </>
  )

  // Leaf folders (no listed children) render as a static row — nothing to expand.
  if (!hasChildren) {
    return (
      <li>
        <div className="flex items-center gap-1.5 py-1 pr-2" style={indent}>
          <span className="h-3.5 w-3.5 shrink-0" aria-hidden />
          {Label}
        </div>
      </li>
    )
  }

  return (
    <li>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center gap-1.5 rounded-md py-1 pr-2 text-left transition-colors hover:bg-black/[0.04]"
        style={indent}
      >
        <ChevronRight
          className={cx("h-3.5 w-3.5 shrink-0 text-[#0B162D]/40 transition-transform duration-200", open && "rotate-90")}
          aria-hidden
        />
        {Label}
      </button>
      {open && (
        <ul>
          {node.children.map((child, i) => (
            <FileTreeItem key={i} node={child} depth={depth + 1} />
          ))}
        </ul>
      )}
    </li>
  )
}

/** MLOps maturity ladder: numbered levels on an accent rail with a growing progress bar. */
function MaturityLadder({ items, color }: { items: { level: number; label: string }[]; color: string }) {
  const total = items.length
  return (
    <div className="my-8 rounded-[18px] border border-black/10 bg-[#0B162D]/[0.02] p-5 sm:p-6">
      <ol className="space-y-3.5">
        {items.map((item, i) => {
          const fill = Math.round(((i + 1) / total) * 100)
          const isLast = i === total - 1
          return (
            <li key={item.level} className="relative flex items-start gap-3.5">
              {!isLast && (
                <span
                  aria-hidden
                  className="absolute left-4 top-10 -bottom-3.5 w-px -translate-x-1/2 bg-black/10"
                />
              )}
              <span
                className="z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white font-mono text-[0.85rem] font-semibold"
                style={{ color, border: `1px solid ${color}4D` }}
              >
                {item.level}
              </span>
              <div className="min-w-0 flex-1 pt-0.5">
                <p className="font-serif text-[0.98rem] sm:text-[1.1rem] leading-snug text-[#0B162D]">
                  <span className="mr-2 text-[0.62rem] font-sans font-semibold uppercase tracking-wider" style={{ color }}>
                    Level {item.level}
                  </span>
                  {item.label}
                </p>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full" style={{ backgroundColor: `${color}1A` }}>
                  <div className="h-full rounded-full" style={{ width: `${fill}%`, backgroundColor: color }} />
                </div>
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
