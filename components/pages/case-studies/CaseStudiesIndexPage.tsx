"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import type { Locale } from "@/lib/dictionary"
import {
  getCaseStudiesUi,
  listCaseStudies,
  type CaseStudyContent,
  type CaseStudyServiceArea,
} from "@/lib/case-studies"
import { useRevealOnScroll } from "@/hooks/use-reveal-on-scroll"

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ")
}

const AREA: Record<CaseStudyServiceArea, { label: { de: string; en: string }; color: string }> = {
  apps: { label: { de: "Apps & Workflows", en: "Apps & workflows" }, color: "#F703EB" },
  analytics: { label: { de: "Datenanalyse", en: "Data analytics" }, color: "#21569c" },
  strategy: { label: { de: "Digitale Strategie", en: "Digital strategy" }, color: "#64748B" },
}

function CaseStudyRow({
  study,
  index,
  lang,
}: {
  study: CaseStudyContent
  index: number
  lang: Locale
}) {
  const ui = getCaseStudiesUi(lang)
  const reveal = useRevealOnScroll({ margin: "-80px" })
  const area = AREA[study.serviceArea]
  const flipped = index % 2 === 1
  const number = String(index + 1).padStart(2, "0")
  // metrics[0] mirrors the hero metric shown on the floating card; show the next two here.
  const secondaryMetrics = study.metrics.slice(1, 3)
  const href = `/${lang}/case-studies/${study.slug}`

  return (
    <article
      ref={reveal.ref}
      style={{ ["--area" as string]: area.color }}
      className={cx(
        "group grid items-center gap-10 lg:grid-cols-2 lg:gap-16 reveal-fade-up",
        reveal.isRevealed && "revealed",
      )}
    >
      {/* Visual */}
      <Link href={href} className={cx("relative block", flipped && "lg:order-2")}>
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-6 -z-10 rounded-[40px] blur-3xl opacity-50 transition-opacity duration-500 group-hover:opacity-80"
          style={{ background: `radial-gradient(ellipse at center, ${area.color}22, transparent 70%)` }}
        />
        <div className="overflow-hidden rounded-[24px] border border-black/10 bg-white shadow-[0_24px_60px_rgba(18,38,63,0.12)]">
          <div className="relative aspect-video">
            {study.image && (
              <Image
                src={study.image.url}
                alt={study.image.alt}
                fill
                sizes="(min-width:1024px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
            )}
          </div>
        </div>

        {/* Floating metric card */}
        <div className="absolute -bottom-6 left-6 rounded-2xl border border-black/[0.06] bg-white/95 px-5 py-3.5 shadow-[0_16px_40px_rgba(18,38,63,0.14)] backdrop-blur">
          <p className="font-serif text-[1.9rem] leading-none text-[var(--area)]">{study.heroMetric.value}</p>
          <p className="mt-1.5 max-w-[24ch] text-[0.7rem] leading-snug text-[#0B162D]/55">{study.heroMetric.label}</p>
        </div>
      </Link>

      {/* Content */}
      <div className={cx("relative", flipped && "lg:order-1")}>
        <span
          aria-hidden
          className="pointer-events-none absolute -top-12 right-0 font-serif text-[7rem] leading-none text-[#0B162D]/[0.05] sm:text-[8rem] lg:-top-16"
        >
          {number}
        </span>

        <div className="relative flex flex-wrap items-center gap-3">
          <span
            style={{ color: area.color, backgroundColor: `${area.color}14` }}
            className="rounded-full px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-wider"
          >
            {area.label[lang]}
          </span>
          <span className="text-[0.74rem] font-medium uppercase tracking-wider text-[#0B162D]/45">
            {study.client}
          </span>
        </div>

        <h2 className="relative mt-5 max-w-[20ch] font-serif text-[2rem] leading-[1.08] tracking-tight text-[#0B162D] sm:text-[2.4rem] md:text-[2.7rem]">
          <Link href={href} className="transition-colors duration-300 hover:text-[var(--area)]">
            {study.title}
          </Link>
        </h2>

        <p className="relative mt-5 max-w-[52ch] text-[1rem] leading-relaxed text-[#0B162D]/65 sm:text-[1.05rem]">
          {study.summary}
        </p>

        {secondaryMetrics.length > 0 && (
          <div className="relative mt-7 flex flex-wrap gap-x-10 gap-y-4">
            {secondaryMetrics.map((metric, i) => (
              <div key={i} className="max-w-[20ch]">
                <p className="font-serif text-[1.5rem] leading-none text-[#0B162D]">{metric.value}</p>
                <p className="mt-1.5 text-[0.74rem] leading-snug text-[#0B162D]/50">{metric.label}</p>
              </div>
            ))}
          </div>
        )}

        <Link
          href={href}
          className="group/link relative mt-8 inline-flex items-center gap-2 text-[0.92rem] font-medium text-[#0B162D] transition-colors hover:text-[var(--area)]"
        >
          {ui.readCaseStudy}
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0B162D]/[0.05] transition-all duration-300 group-hover/link:bg-[var(--area)] group-hover/link:text-white">
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-0.5" />
          </span>
        </Link>
      </div>
    </article>
  )
}

export default function CaseStudiesIndexPage({ lang }: { lang: Locale }) {
  const ui = getCaseStudiesUi(lang)
  const studies = listCaseStudies(lang)
  const heading = useRevealOnScroll()
  const cta = useRevealOnScroll({ margin: "-60px" })
  const base = `/${lang}`

  return (
    <main data-page="apps" className="pt-28 sm:pt-32">
      <section className="relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <div
            ref={heading.ref}
            className={cx(
              "mx-auto max-w-[60ch] text-center reveal-fade-up",
              heading.isRevealed && "revealed",
            )}
          >
            <span className="section-eyebrow">{ui.eyebrow}</span>
            <h1 className="mx-auto max-w-[18ch] font-serif text-[2.8rem] sm:text-[3.4rem] md:text-[4rem] leading-[1.02] tracking-tight text-[#0B162D]">
              {ui.indexTitleLead}{" "}
              <span className="section-highlight">{ui.indexTitleHighlight}</span>
            </h1>
            <div
              aria-hidden
              className="mx-auto mt-8 h-px w-24 bg-gradient-to-r from-transparent via-[#F703EB]/45 to-transparent"
            />
            <p className="mx-auto mt-8 max-w-[52ch] text-[1.05rem] sm:text-[1.15rem] leading-relaxed text-[#0B162D]/65">
              {ui.indexSubtitle}
            </p>
          </div>

          {/* Editorial rows */}
          <div className="mt-28 flex flex-col gap-24 sm:mt-36 sm:gap-28 lg:mt-44 lg:gap-36">
            {studies.map((study, index) => (
              <CaseStudyRow key={study.slug} study={study} index={index} lang={lang} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-[1400px] mx-auto px-4 pb-18 pt-24 sm:px-6 sm:pb-28 sm:pt-32 lg:px-8">
        <div
          ref={cta.ref}
          data-header-tone="dark"
          className={cx(
            "overflow-hidden rounded-[28px] bg-[#0B162D] px-7 py-12 sm:px-12 sm:py-16 reveal-fade-up",
            cta.isRevealed && "revealed",
          )}
        >
          <div className="flex flex-col items-center gap-6 text-center lg:flex-row lg:items-center lg:justify-between lg:text-left">
            <div>
              <h2 className="mx-auto max-w-[24ch] font-serif text-[1.8rem] sm:text-[2.4rem] leading-[1.1] tracking-tight text-white lg:mx-0">
                {ui.ctaHeading}
              </h2>
              <p className="mx-auto mt-4 max-w-[52ch] text-[0.85rem] sm:text-[0.92rem] leading-relaxed text-white/65 lg:mx-0">
                {ui.ctaSubtitle}
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
        </div>
      </section>
    </main>
  )
}
