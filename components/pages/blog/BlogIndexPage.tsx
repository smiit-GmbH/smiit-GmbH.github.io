"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import type { Locale } from "@/lib/dictionary"
import {
  blogCategoryMeta,
  getBlogUi,
  getReadingMinutes,
  listBlogPosts,
  type BlogPostContent,
} from "@/lib/blog"
import { useRevealOnScroll } from "@/hooks/use-reveal-on-scroll"

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ")
}

function TimelineEntry({
  post,
  lang,
  showYear,
}: {
  post: BlogPostContent
  lang: Locale
  showYear: boolean
}) {
  const ui = getBlogUi(lang)
  const reveal = useRevealOnScroll({ margin: "-80px" })
  const meta = blogCategoryMeta[post.category]
  const href = `/${lang}/blog/${post.slug}`
  const minutes = getReadingMinutes(post)
  const d = new Date(post.datePublished)
  const dayMonth = new Intl.DateTimeFormat(lang === "de" ? "de-DE" : "en-US", {
    day: "numeric",
    month: "long",
  }).format(d)
  const year = d.getFullYear()
  const cover = post.coverImage

  // Reused in two places: the desktop right column and the stacked inline image.
  const visualInner = cover ? (
    <div className="absolute inset-0 flex items-center justify-center bg-white p-5">
      <Image
        src={cover.url}
        alt={cover.alt}
        width={cover.width}
        height={cover.height}
        sizes="(min-width: 1000px) 320px, 90vw"
        className="h-auto max-h-full w-auto max-w-[90%] object-contain transition-transform duration-700 ease-out group-hover:scale-[1.03]"
      />
    </div>
  ) : (
    <div
      className="absolute inset-0 flex items-center justify-center"
      style={{ background: `linear-gradient(135deg, ${meta.color}20, ${meta.color}07)` }}
    >
      <span className="font-serif text-[1.4rem] tracking-tight" style={{ color: `${meta.color}AA` }}>
        {meta.label[lang]}
      </span>
    </div>
  )

  return (
    <div
      ref={reveal.ref}
      style={{ ["--area" as string]: meta.color }}
      className={cx("relative flex gap-4 pb-12 last:pb-0 min-[1000px]:gap-7 reveal-fade-up", reveal.isRevealed && "revealed")}
    >
      {/* Date on the rail (>=1000px) */}
      <div className="hidden w-20 shrink-0 pt-8 text-right min-[1000px]:block">
        {showYear && (
          <span className="block font-serif text-[1.05rem] leading-none text-[#0B162D]/35">{year}</span>
        )}
        <time dateTime={post.datePublished} className="mt-1 block text-[0.82rem] font-medium text-[#0B162D]/60">
          {dayMonth}
        </time>
      </div>

      {/* Rail + node */}
      <div className="relative flex w-3 shrink-0 justify-center pt-8 min-[1000px]:w-4">
        <span className="z-10 mt-1 h-3 w-3 rounded-full bg-[var(--area)] ring-4 ring-white" />
      </div>

      {/* Card */}
      <article className="min-w-0 flex-1">
        <Link
          href={href}
          className="group grid overflow-hidden rounded-[24px] border border-black/10 bg-white/70 transition-all duration-300 hover:-translate-y-1 hover:border-black/20 hover:shadow-[0_24px_55px_rgba(18,38,63,0.12)] min-[1000px]:grid-cols-[minmax(0,1.18fr)_minmax(0,0.82fr)]"
        >
          {/* Content */}
          <div className="order-1 flex flex-col justify-center p-6 sm:p-8">
            <div className="flex items-center gap-3">
              {/* Date: top-left once it is no longer on the rail (<1000px) */}
              <time
                dateTime={post.datePublished}
                className="text-[0.68rem] font-medium uppercase tracking-wider text-[#0B162D]/55 min-[1000px]:hidden"
              >
                {dayMonth} {year}
              </time>
              {/* Category: top-left on >=1000px (date sits on the rail) */}
              <span
                style={{ color: meta.color, backgroundColor: `${meta.color}14` }}
                className="hidden rounded-full px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-wider min-[1000px]:inline-flex"
              >
                {meta.label[lang]}
              </span>
              {/* Reading time: top-right */}
              <span className="ml-auto text-[0.68rem] font-medium uppercase tracking-wider text-[#0B162D]/45 min-[1000px]:text-[0.74rem]">
                {minutes} {ui.readingTimeSuffix}
              </span>
            </div>

            {/* Category below the date (<1000px only) */}
            <div className="mt-3 min-[1000px]:hidden">
              <span
                style={{ color: meta.color, backgroundColor: `${meta.color}14` }}
                className="inline-flex rounded-full px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-wider"
              >
                {meta.label[lang]}
              </span>
            </div>

            <h2 className="mt-4 max-w-[26ch] font-serif text-[1.7rem] leading-[1.1] tracking-tight text-[#0B162D] transition-colors duration-300 group-hover:text-[var(--area)] sm:text-[2.05rem]">
              {post.title}
            </h2>

            <p className="mt-3 max-w-[54ch] text-[0.95rem] leading-relaxed text-[#0B162D]/65">{post.excerpt}</p>

            {/* Image: stacked between the text and the author/button row (<1000px) */}
            <div className="relative mt-6 h-48 overflow-hidden rounded-2xl border border-black/10 min-[1000px]:hidden">
              {visualInner}
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-black/[0.07] pt-5">
              <span className="text-[0.78rem] text-[#0B162D]/50">
                {ui.byLabel} {post.author}
              </span>
              <span className="group/link inline-flex items-center gap-2 text-[0.88rem] font-medium text-[#0B162D] transition-colors group-hover:text-[var(--area)]">
                {ui.readArticle}
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0B162D]/[0.05] transition-colors duration-300 group-hover:bg-[var(--area)] group-hover:text-white">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </span>
            </div>
          </div>

          {/* Image: right column on >=1000px */}
          <div className="order-2 relative hidden overflow-hidden border-l border-black/5 min-[1000px]:block">
            {visualInner}
          </div>
        </Link>
      </article>
    </div>
  )
}

export default function BlogIndexPage({ lang }: { lang: Locale }) {
  const ui = getBlogUi(lang)
  const posts = listBlogPosts(lang)
  const heading = useRevealOnScroll()
  const articlesWord = lang === "de" ? "Artikel" : posts.length === 1 ? "article" : "articles"

  let lastYear: number | null = null

  return (
    <main className="pt-28 sm:pt-32">
      <section className="relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div
            ref={heading.ref}
            className={cx("max-w-[88ch] reveal-fade-up", heading.isRevealed && "revealed")}
          >
            <span className="section-eyebrow">{ui.eyebrow}</span>
            <h1 className="mt-4 max-w-[28ch] font-serif text-[2.8rem] sm:text-[3.4rem] md:text-[4rem] leading-[1.02] tracking-tight text-[#0B162D]">
              {ui.indexTitleLead} <span className="section-highlight">{ui.indexTitleHighlight}</span>
            </h1>
            <p className="mt-6 max-w-[74ch] text-[1.05rem] sm:text-[1.15rem] leading-relaxed text-[#0B162D]/65">
              {ui.indexSubtitle}
            </p>
            {posts.length > 0 && (
              <p className="mt-7 text-[0.76rem] font-semibold uppercase tracking-[0.18em] text-[#0B162D]/40">
                {posts.length} {articlesWord}
              </p>
            )}
          </div>

          {/* Hairline bridging the hero into the timeline */}
          <div aria-hidden className="mt-10 h-px w-full bg-black/10 sm:mt-12" />

          {posts.length > 0 ? (
            <div className="relative mt-12 sm:mt-14">
              {/* Continuous timeline rail (behind the nodes, fading out at the end) */}
              <span
                aria-hidden
                className="pointer-events-none absolute left-[6px] top-10 bottom-12 w-px bg-gradient-to-b from-black/12 via-black/12 to-transparent min-[1000px]:left-[7.25rem]"
              />
              {posts.map((post) => {
                const year = new Date(post.datePublished).getFullYear()
                const showYear = year !== lastYear
                lastYear = year
                return <TimelineEntry key={post.slug} post={post} lang={lang} showYear={showYear} />
              })}
            </div>
          ) : (
            <p className="mx-auto mt-20 max-w-[44ch] text-center text-[1rem] leading-relaxed text-[#0B162D]/55">
              {ui.emptyState}
            </p>
          )}
        </div>
      </section>

      <div className="pb-24 sm:pb-32" />
    </main>
  )
}
