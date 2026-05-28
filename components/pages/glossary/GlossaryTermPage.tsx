"use client"

import React, { useMemo } from "react"
import Link from "next/link"
import { ArrowRight, AlertTriangle, ExternalLink } from "lucide-react"
import type { Locale } from "@/lib/dictionary"
import {
  getGlossaryUi,
  glossaryClusterMeta,
  hasGlossaryPage,
  listRelatedGlossaryTerms,
  type GlossaryTermContent,
} from "@/lib/glossary"
import { autolinkGlossary } from "@/lib/glossary-autolink"
import { glossaryDiagrams } from "@/components/pages/glossary/glossary-diagrams"
import { getCaseStudy } from "@/lib/case-studies"
import { useRevealOnScroll } from "@/hooks/use-reveal-on-scroll"
import Breadcrumb from "@/components/pages/case-studies/breadcrumb"

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ")
}

const SERVICE_LABEL: Record<string, { de: string; en: string }> = {
  "services/analytics": { de: "Datenanalyse", en: "Data analytics" },
  "services/apps": { de: "Apps & Workflows", en: "Apps & workflows" },
  "services/strategy": { de: "Digitale Strategie", en: "Digital strategy" },
}

export default function GlossaryTermPage({ lang, term }: { lang: Locale; term: GlossaryTermContent }) {
  const ui = getGlossaryUi(lang)
  const base = `/${lang}`
  const meta = glossaryClusterMeta[term.cluster]
  const color = meta.color

  const hero = useRevealOnScroll()
  // Auto-link the first mention of other glossary terms in the body copy (once
  // per term, no self-link). Computed once so scroll re-renders stay stable.
  const linkedParagraphs = useMemo(() => {
    const used = new Set<string>([term.slug])
    return term.sections.map((section) =>
      section.paragraphs.map((p) => autolinkGlossary(p, { lang, used, excludeSlug: term.slug })),
    )
  }, [term, lang])
  const related = listRelatedGlossaryTerms(term.slug, term.cluster)
  const Diagram = glossaryDiagrams[term.slug] as
    | ((props: { lang: Locale; color: string }) => React.ReactNode)
    | undefined
  const caseStudy = term.relatedCaseStudySlug ? getCaseStudy(term.relatedCaseStudySlug, lang) : undefined
  const serviceLabel = SERVICE_LABEL[term.relatedServicePath]?.[lang]
  const updatedDate = new Intl.DateTimeFormat(lang === "de" ? "de-DE" : "en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(term.dateModified))

  return (
    <main data-page="apps" style={{ ["--area" as string]: color }} className="pt-20 sm:pt-32">
      {/* ── Hero / definition-first ── */}
      <section className="relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            lang={lang}
            items={[
              { label: ui.breadcrumbLabel, href: `${base}/glossary` },
              { label: term.term },
            ]}
          />

          <div
            ref={hero.ref}
            className={cx(
              "mt-8 reveal-fade-up",
              hero.isRevealed && "revealed",
              Diagram && "lg:grid lg:grid-cols-[55fr_45fr] lg:items-center lg:gap-16 xl:gap-24",
            )}
          >
            {/* Left: definition-first text */}
            <div className={cx(!Diagram && "max-w-[80ch]")}>
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
                {term.title}
              </h1>

              <p className="mt-6 border-l-2 pl-5 text-[0.92rem] sm:text-[1.18rem] leading-relaxed text-[#0B162D]/85" style={{ borderColor: color }}>
                {term.shortDefinition}
              </p>

              {term.synonyms.length > 0 && (
                <p className="mt-5 text-[0.82rem] text-[#0B162D]/55">
                  <span className="font-medium text-[#0B162D]/70">{ui.synonymsLabel}:</span>{" "}
                  {term.synonyms.join(" · ")}
                </p>
              )}
            </div>

            {/* Right: diagram (stacks below the text under lg) */}
            {Diagram && (
              <div className="mt-10 lg:mt-0">
                <Diagram lang={lang} color={color} />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Sections ── */}
      <div className="max-w-[1400px] mx-auto mt-16 px-4 sm:mt-20 sm:px-6 lg:px-8">
        <div className="space-y-14 sm:space-y-16">
          {term.sections.map((section, i) => (
            <GlossarySectionBlock key={section.heading} heading={section.heading} index={i} paragraphs={linkedParagraphs[i]} bullets={section.bullets} />
          ))}
        </div>
      </div>

      {/* ── Häufige Fehler & Missverständnisse ── */}
      {term.misconceptions && term.misconceptions.length > 0 && (
        <section className="max-w-[1400px] mx-auto mt-20 px-4 sm:mt-24 sm:px-6 lg:px-8">
          <div className="rounded-[24px] border border-black/10 bg-[#0B162D]/[0.02] p-7 sm:p-9">
            <h2 className="flex items-center gap-2.5 font-serif text-[1.55rem] sm:text-[1.9rem] leading-[1.12] tracking-tight text-[#0B162D]">
              <AlertTriangle className="h-5 w-5 shrink-0 text-[var(--area)]" aria-hidden />
              {ui.misconceptionsHeading}
            </h2>
            <ul className="mt-6 space-y-3.5">
              {term.misconceptions.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--area)]" />
                  <span className="text-[0.9rem] sm:text-[1.05rem] leading-[1.75] text-[#0B162D]/80 max-w-[72ch]">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ── FAQ ── */}
      {term.faq.length > 0 && (
        <section className="max-w-[1400px] mx-auto mt-20 px-4 sm:mt-24 sm:px-6 lg:px-8">
          <h2 className="font-serif text-[1.8rem] sm:text-[2.2rem] leading-[1.1] tracking-tight text-[#0B162D]">
            {ui.faqHeading}
          </h2>
          <div className="mt-8 space-y-4">
            {term.faq.map((item) => (
              <details
                key={item.question}
                className="group rounded-[18px] border border-black/10 bg-white/60 p-5 sm:p-6"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[1rem] font-semibold text-[#0B162D]">
                  {item.question}
                  <ArrowRight className="h-4 w-4 shrink-0 text-[var(--area)] transition-transform duration-300 group-open:rotate-90" />
                </summary>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-[#0B162D]/70">{item.answer}</p>
              </details>
            ))}
          </div>
        </section>
      )}

      {/* ── Bezug zu smiit: service + case study ── */}
      <section className="max-w-[1400px] mx-auto mt-20 px-4 sm:mt-24 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {serviceLabel && (
            <Link
              href={`${base}/${term.relatedServicePath}`}
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

      {/* ── Related terms ── */}
      {related.length > 0 && (
        <section className="max-w-[1400px] mx-auto mt-20 px-4 sm:mt-24 sm:px-6 lg:px-8">
          <h2 className="font-serif text-[1.8rem] sm:text-[2.2rem] leading-[1.1] tracking-tight text-[#0B162D]">
            {ui.relatedTermsHeading}
          </h2>
          <div className="mt-7 flex flex-wrap gap-1.5 sm:gap-2">
            {related.map((entry) =>
              entry.hasPage && hasGlossaryPage(entry.slug) ? (
                <Link
                  key={entry.slug}
                  href={`${base}/glossary/${entry.slug}`}
                  className="rounded-full border border-black/15 bg-white/60 px-2.5 py-1 text-[0.72rem] font-medium text-[#0B162D] transition-colors hover:border-[var(--area)] hover:text-[var(--area)] sm:px-3.5 sm:py-1.5 sm:text-[0.85rem]"
                >
                  {entry.term[lang]}
                </Link>
              ) : (
                <span
                  key={entry.slug}
                  className="rounded-full border border-black/10 bg-black/[0.02] px-2.5 py-1 text-[0.72rem] text-[#0B162D]/45 sm:px-3.5 sm:py-1.5 sm:text-[0.85rem]"
                >
                  {entry.term[lang]}
                </span>
              ),
            )}
          </div>
        </section>
      )}

      {/* ── Quellen & weiterführende Links ── */}
      {term.sources && term.sources.length > 0 && (
        <section className="max-w-[1400px] mx-auto mt-20 px-4 sm:mt-24 sm:px-6 lg:px-8">
          <h2 className="font-serif text-[1.8rem] sm:text-[2.2rem] leading-[1.1] tracking-tight text-[#0B162D]">
            {ui.sourcesHeading}
          </h2>
          <ul className="mt-7 space-y-3">
            {term.sources.map((source) => (
              <li key={source.url}>
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-start gap-2 text-[0.92rem] leading-relaxed text-[#0B162D]/75 transition-colors hover:text-[var(--area)]"
                >
                  <ExternalLink className="mt-0.5 h-4 w-4 shrink-0 text-[#0B162D]/40 transition-colors group-hover:text-[var(--area)]" aria-hidden />
                  <span className="underline decoration-[#0B162D]/20 underline-offset-4 group-hover:decoration-[var(--area)]">
                    {source.title}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* ── Footer meta + CTA ── */}
      <section className="max-w-[1400px] mx-auto mt-16 px-4 pb-12 sm:px-6 sm:pb-24 lg:px-8">
        <div className="flex flex-col items-start gap-6 border-t border-black/10 pt-12 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="max-w-[28ch] font-serif text-[1.6rem] sm:text-[2rem] leading-[1.15] tracking-tight text-[#0B162D]">
              {ui.ctaHeading}
            </h2>
            <p className="mt-3 text-[0.78rem] text-[#0B162D]/45">
              {ui.updatedLabel}{" "}
              <time dateTime={term.dateModified} className="font-medium text-[#0B162D]/60">
                {updatedDate}
              </time>
              {" · "}
              <Link href={`${base}/glossary`} className="font-medium text-[var(--area)] hover:underline">
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
    </main>
  )
}

function GlossarySectionBlock({
  heading,
  index,
  paragraphs,
  bullets,
}: {
  heading: string
  index: number
  paragraphs: React.ReactNode[]
  bullets?: string[]
}) {
  const reveal = useRevealOnScroll({ margin: "-60px" })
  return (
    <section
      ref={reveal.ref}
      className={cx("scroll-mt-28 reveal-fade-up", reveal.isRevealed && "revealed")}
    >
      <div className="grid gap-y-4 lg:grid-cols-[minmax(0,0.4fr)_minmax(0,1.6fr)] lg:gap-x-20 xl:gap-x-28">
        <div className="lg:pt-1">
          <span className="font-mono text-[0.8rem] font-semibold tracking-[0.2em] text-[var(--area)]">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h2 className="mt-3 font-serif text-[1.55rem] sm:text-[1.9rem] leading-[1.12] tracking-tight text-[#0B162D]">
            {heading}
          </h2>
        </div>
        <div>
          <div className="space-y-4 text-[0.9rem] sm:text-[1.05rem] leading-[1.75] text-[#0B162D]/75 max-w-[68ch]">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          {bullets && bullets.length > 0 && (
            <ul className="mt-6 space-y-2.5">
              {bullets.map((b, i) => (
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
