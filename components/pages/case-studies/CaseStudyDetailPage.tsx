"use client"

import React, { useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Quote } from "lucide-react"
import type { Locale } from "@/lib/dictionary"
import {
  getCaseStudiesUi,
  listOtherCaseStudies,
  type CaseStudyContent,
  type CaseStudySection,
  type CaseStudyServiceArea,
} from "@/lib/case-studies"
import { useRevealOnScroll } from "@/hooks/use-reveal-on-scroll"
import { listGlossaryCatalogForCaseStudy } from "@/lib/glossary"
import { autolinkGlossary } from "@/lib/glossary-autolink"
import Breadcrumb from "@/components/pages/case-studies/breadcrumb"
import ChapterNav, { CHAPTERS_WRAPPER_ID, chapterId } from "@/components/pages/case-studies/chapter-nav"
import GlossaryLinksBand from "@/components/pages/shared/glossary-links-band"

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ")
}

const AREA: Record<CaseStudyServiceArea, { label: { de: string; en: string }; color: string }> = {
  apps: { label: { de: "Apps & Workflows", en: "Apps & workflows" }, color: "#F703EB" },
  analytics: { label: { de: "Datenanalyse", en: "Data analytics" }, color: "#21569c" },
  strategy: { label: { de: "Digitale Strategie", en: "Digital strategy" }, color: "#64748B" },
}

function NarrativeSection({
  section,
  index,
  paragraphs,
}: {
  section: CaseStudySection
  index: number
  paragraphs: React.ReactNode[]
}) {
  const reveal = useRevealOnScroll({ margin: "-60px" })
  return (
    <section
      id={chapterId(index)}
      ref={reveal.ref}
      className={cx("scroll-mt-28", "reveal-fade-up", reveal.isRevealed && "revealed")}
    >
      <div className="grid gap-y-4 lg:grid-cols-[minmax(0,0.4fr)_minmax(0,1.6fr)] lg:gap-x-20 xl:gap-x-28 2xl:gap-x-36">
        {/* Heading rail */}
        <div className="lg:pt-1">
          <span className="font-mono text-[0.8rem] font-semibold tracking-[0.2em] text-[var(--area)]">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h2 className="mt-3 font-serif text-[1.55rem] sm:text-[1.9rem] leading-[1.12] tracking-tight text-[#0B162D]">
            {section.heading}
          </h2>
        </div>

        {/* Body */}
        <div>
          <div className="space-y-4 text-[0.9rem] sm:text-[1.05rem] leading-[1.75] text-[#0B162D]/75 max-w-[68ch]">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          {section.bullets && section.bullets.length > 0 && (
            <ul className="mt-6 space-y-2.5">
              {section.bullets.map((b, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--area)]" />
                  <span className="text-[0.9rem] sm:text-[1.05rem] leading-[1.75] text-[#0B162D]/80">{b}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  )
}

export default function CaseStudyDetailPage({
  lang,
  study,
}: {
  lang: Locale
  study: CaseStudyContent
}) {
  const ui = getCaseStudiesUi(lang)
  const base = `/${lang}`
  const area = AREA[study.serviceArea]
  const hero = useRevealOnScroll()
  const metricsReveal = useRevealOnScroll({ margin: "-60px" })
  const techReveal = useRevealOnScroll({ margin: "-60px" })
  const moreReveal = useRevealOnScroll({ margin: "-60px" })
  const serviceLabel = area.label[lang]
  const others = listOtherCaseStudies(study.slug, lang)
  const glossaryEntries = listGlossaryCatalogForCaseStudy(study.slug)
  // Auto-link the first mention of each glossary term across the narrative body.
  const linkedSectionParagraphs = useMemo(() => {
    const used = new Set<string>()
    return study.sections.map((section) =>
      section.paragraphs.map((p) => autolinkGlossary(p, { lang, used })),
    )
  }, [study, lang])
  const publishedDate = new Intl.DateTimeFormat(lang === "de" ? "de-DE" : "en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(study.datePublished))

  return (
    <main data-page="apps" style={{ ["--area" as string]: area.color }} className="pt-28 sm:pt-32">
      <ChapterNav
        items={study.sections.map((s, i) => ({ id: chapterId(i), label: s.heading }))}
        label={ui.chapterNavLabel}
      />

      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            lang={lang}
            items={[
              { label: ui.breadcrumbLabel, href: `${base}/case-studies` },
              { label: study.client },
            ]}
          />

          <div
            ref={hero.ref}
            className={cx(
              "mt-8 grid items-center gap-10 lg:grid-cols-2 lg:gap-16 reveal-fade-up",
              hero.isRevealed && "revealed",
            )}
          >
            {/* Text */}
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <span
                  style={{ color: area.color, backgroundColor: `${area.color}14` }}
                  className="rounded-full px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-wider"
                >
                  {area.label[lang]}
                </span>
                <span className="text-[0.74rem] font-medium uppercase tracking-wider text-[#0B162D]/45">
                  {study.client} · {study.companySize}
                </span>
              </div>

              <h1
                lang={lang}
                className="mt-5 font-serif text-[2.3rem] sm:text-[2.9rem] md:text-[3.2rem] leading-[1.05] tracking-tight text-[#0B162D] hyphens-auto break-words"
              >
                {study.title}
              </h1>
              <p className="mt-5 max-w-[58ch] text-[0.95rem] sm:text-[1.02rem] leading-relaxed text-[#0B162D]/70">
                {study.summary}
              </p>
              <p className="mt-5 text-[0.78rem] text-[#0B162D]/45">
                {ui.publishedLabel}{" "}
                <time dateTime={study.datePublished} className="font-medium text-[#0B162D]/60">
                  {publishedDate}
                </time>
              </p>
            </div>

            {/* Visual */}
            {study.image && (
              <div className="relative">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -inset-6 -z-10 rounded-[40px] blur-3xl opacity-60"
                  style={{ background: `radial-gradient(ellipse at center, ${area.color}26, transparent 70%)` }}
                />
                <div className="overflow-hidden rounded-[24px] border border-black/10 bg-white shadow-[0_24px_60px_rgba(18,38,63,0.12)]">
                  <Image
                    src={study.image.url}
                    alt={study.image.alt}
                    width={study.image.width}
                    height={study.image.height}
                    className="h-auto w-full"
                    priority
                  />
                </div>
                <div className="absolute -bottom-6 left-6 rounded-2xl border border-black/[0.06] bg-white/95 px-5 py-3.5 shadow-[0_16px_40px_rgba(18,38,63,0.14)] backdrop-blur">
                  <p className="font-serif text-[1.9rem] leading-none text-[var(--area)]">{study.heroMetric.value}</p>
                  <p className="mt-1.5 max-w-[24ch] text-[0.7rem] leading-snug text-[#0B162D]/55">{study.heroMetric.label}</p>
                </div>
              </div>
            )}
          </div>

          {/* Facts bar */}
          <dl className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-black/10 bg-black/10 sm:mt-20 sm:grid-cols-3 lg:grid-cols-5">
            {study.facts.map((fact) => (
              <div key={fact.label} className="bg-background p-4 sm:p-5">
                <dt className="text-[0.66rem] font-medium uppercase tracking-wider text-[#0B162D]/45">{fact.label}</dt>
                <dd lang={lang} className="mt-1.5 text-[0.92rem] font-semibold leading-snug text-[#0B162D] hyphens-auto break-words">{fact.value}</dd>
              </div>
            ))}
            {/* Filler so the trailing empty grid cell matches the card bg instead of showing the divider colour (5 facts → 1 empty cell at 2/3 cols, none at 5 cols). */}
            <div aria-hidden className="bg-background lg:hidden" />
          </dl>
        </div>
      </section>

      {/* ── Narrative ── */}
      <div id={CHAPTERS_WRAPPER_ID} className="max-w-[1400px] mx-auto mt-20 px-4 sm:mt-28 sm:px-6 lg:px-8">
        <div className="space-y-16 sm:space-y-20">
          {study.sections.map((section, i) => (
            <NarrativeSection key={section.heading} section={section} index={i} paragraphs={linkedSectionParagraphs[i]} />
          ))}
        </div>
      </div>

      {/* ── Kennzahlen ── */}
      <section
        ref={metricsReveal.ref}
        className={cx(
          "max-w-[1400px] mx-auto mt-24 px-4 sm:mt-28 sm:px-6 lg:px-8 reveal-fade-up",
          metricsReveal.isRevealed && "revealed",
        )}
      >
        <h2 className="font-serif text-[1.8rem] sm:text-[2.2rem] leading-[1.1] tracking-tight text-[#0B162D]">
          {ui.metricsHeading}
        </h2>
        <div className="mt-8 grid grid-cols-2 gap-5 lg:grid-cols-4">
          {study.metrics.map((metric, i) => (
            <div key={i} className="rounded-[20px] border border-black/10 bg-white/60 p-6">
              <p className="font-serif text-[2.1rem] leading-none text-[var(--area)]">{metric.value}</p>
              <p className="mt-3 text-[0.82rem] leading-snug text-[#0B162D]/60">{metric.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Technik & Architektur ── */}
      {study.techStack.length > 0 && (
        <section
          ref={techReveal.ref}
          className={cx(
            "max-w-[1400px] mx-auto mt-20 px-4 sm:mt-24 sm:px-6 lg:px-8 reveal-fade-up",
            techReveal.isRevealed && "revealed",
          )}
        >
          <h2 className="font-serif text-[1.8rem] sm:text-[2.2rem] leading-[1.1] tracking-tight text-[#0B162D]">
            {ui.techHeading}
          </h2>
          <div className="mt-8 rounded-[24px] border border-black/10 bg-[#0B162D]/[0.02] p-7 sm:p-9">
            <ul className="grid grid-cols-1 gap-x-10 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
              {study.techStack.map((item) => (
                <li key={item.name} className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--area)]" />
                  <span>
                    <span className="block text-[0.92rem] font-semibold text-[#0B162D]">{item.name}</span>
                    <span className="text-[0.84rem] leading-snug text-[#0B162D]/60">{item.description}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ── Fachbegriffe aus dem Glossar ── */}
      {glossaryEntries.length > 0 && (
        <div className="mt-20 sm:mt-24">
          <GlossaryLinksBand
            lang={lang}
            entries={glossaryEntries}
            accent={area.color}
            accentHover={area.color}
            maxItems={8}
          />
        </div>
      )}

      {/* ── O-Ton ── */}
      <section className="max-w-[1400px] mx-auto mb-24 mt-24 px-4 sm:mb-28 sm:mt-28 sm:px-6 lg:px-8">
        <figure className="mx-auto max-w-[98ch] text-center">
          <div className="relative px-6 sm:px-12">
            <Quote
              aria-hidden
              className="absolute -top-3 left-0 h-5 w-5 text-[var(--area)] sm:-top-6 sm:-left-2 sm:h-8 sm:w-8"
            />
            <blockquote className="font-serif text-[1.3rem] sm:text-[2.2rem] leading-[1.4] tracking-tight text-[#64748B]">
              {study.quote.text}
            </blockquote>
            <Quote
              aria-hidden
              className="absolute -bottom-3 right-0 h-5 w-5 rotate-180 text-[var(--area)] sm:-bottom-6 sm:-right-2 sm:h-8 sm:w-8"
            />
          </div>
          <figcaption className="mt-9 text-[0.9rem] text-[#0B162D]/50">
            <span className="font-semibold text-[#0B162D]/80">{study.quote.author}</span>
            {" — "}
            {study.quote.role}
          </figcaption>
        </figure>
      </section>

      {/* ── Weitere Case Studies ── */}
      {others.length > 0 && (
        <section
          ref={moreReveal.ref}
          className={cx(
            "max-w-[1400px] mx-auto mt-24 px-4 sm:mt-28 sm:px-6 lg:px-8 reveal-fade-up",
            moreReveal.isRevealed && "revealed",
          )}
        >
          <h2 className="font-serif text-[1.8rem] sm:text-[2.2rem] leading-[1.1] tracking-tight text-[#0B162D]">
            {ui.moreCaseStudies}
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {others.map((other) => {
              const otherArea = AREA[other.serviceArea]
              return (
                <Link
                  key={other.slug}
                  href={`${base}/case-studies/${other.slug}`}
                  className="group flex flex-col overflow-hidden rounded-[20px] border border-black/10 bg-white/60 transition-all duration-300 hover:-translate-y-1 hover:border-black/20 hover:shadow-[0_18px_40px_rgba(18,38,63,0.10)]"
                >
                  {other.image && (
                    <div className="relative aspect-video overflow-hidden bg-[#0B162D]/[0.03]">
                      <Image
                        src={other.image.url}
                        alt={other.image.alt}
                        fill
                        sizes="(min-width:640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-6">
                    <span
                      style={{ color: otherArea.color, backgroundColor: `${otherArea.color}14` }}
                      className="w-fit rounded-full px-3 py-1 text-[0.66rem] font-semibold uppercase tracking-wider"
                    >
                      {otherArea.label[lang]}
                    </span>
                    <h3 className="mt-4 font-serif text-[1.3rem] leading-[1.2] tracking-tight text-[#0B162D]">
                      {other.title}
                    </h3>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-[0.82rem] font-semibold text-[#0B162D] transition-colors group-hover:text-[var(--area)]">
                      {ui.readCaseStudy}
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section className="max-w-[1400px] mx-auto mt-12 px-4 pb-24 sm:px-6 sm:pb-32 lg:px-8">
        <div className="flex flex-col items-start gap-6 border-t border-black/10 pt-12 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="max-w-[28ch] font-serif text-[1.6rem] sm:text-[2rem] leading-[1.15] tracking-tight text-[#0B162D]">
              {ui.ctaHeading}
            </h2>
            <Link
              href={`${base}/${study.relatedServicePath}`}
              className="group/svc mt-3 inline-flex items-center gap-1.5 text-[0.88rem] font-medium text-[var(--area)]"
            >
              {ui.relatedServiceLabel}: {serviceLabel}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/svc:translate-x-0.5" />
            </Link>
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
    </main>
  )
}
