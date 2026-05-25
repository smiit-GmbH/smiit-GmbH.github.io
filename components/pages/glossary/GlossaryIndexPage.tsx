"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { ArrowRight, Search, X } from "lucide-react"
import type { Locale } from "@/lib/dictionary"
import {
  getGlossaryUi,
  getGlossaryTermSynonyms,
  glossaryClusterMeta,
  glossaryClusterOrder,
  listGlossaryCatalogByCluster,
  type GlossaryCatalogEntry,
  type GlossaryCluster,
} from "@/lib/glossary"
import { useRevealOnScroll } from "@/hooks/use-reveal-on-scroll"

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ")
}

const SEARCH_COPY = {
  de: {
    placeholder: "Begriff suchen – z. B. Power BI, DWH …",
    none: "Keine Begriffe gefunden.",
    noneHint: "Versuch es mit einem anderen Stichwort oder durchstöbere die Bereiche.",
    clear: "Zurücksetzen",
    results: (n: number) => `${n} ${n === 1 ? "Treffer" : "Treffer"}`,
    terms: "Begriffe",
    areas: "Themenfelder",
    sources: "mit Praxis- & Quellbezug",
  },
  en: {
    placeholder: "Search a term – e.g. Power BI, DWH …",
    none: "No terms found.",
    noneHint: "Try another keyword or browse the areas.",
    clear: "Clear",
    results: (n: number) => `${n} ${n === 1 ? "result" : "results"}`,
    terms: "terms",
    areas: "areas",
    sources: "with practice & sources",
  },
}

// ── Card ────────────────────────────────────────────────────────────────
function TermCard({ entry, lang }: { entry: GlossaryCatalogEntry; lang: Locale }) {
  const ui = getGlossaryUi(lang)
  const color = glossaryClusterMeta[entry.cluster].color
  const roleLabel = entry.role === "pillar" ? ui.pillarLabel : ui.subLabel

  const inner = (
    <>
      <span aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[3px]" style={{ background: `linear-gradient(to right, ${color}, ${color}55)` }} />
      <span aria-hidden className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full" style={{ background: `radial-gradient(circle, ${color}12, transparent 70%)` }} />
      <div className="relative flex items-center justify-between gap-3">
        <span className="rounded-full px-2.5 py-0.5 text-[0.58rem] font-semibold uppercase tracking-wider" style={{ color, backgroundColor: `${color}16` }}>
          {roleLabel}
        </span>
        {!entry.hasPage && (
          <span className="text-[0.6rem] font-medium uppercase tracking-wider text-[#0B162D]/35">{ui.comingSoon}</span>
        )}
      </div>
      <h3 className="relative mt-3 font-serif text-[1.2rem] leading-[1.2] tracking-tight text-[#0B162D]">{entry.term[lang]}</h3>
      <p className="relative mt-2 text-[0.85rem] leading-relaxed text-[#0B162D]/60">{entry.shortDefinition[lang]}</p>
      {entry.hasPage && (
        <span className="relative mt-4 inline-flex items-center gap-1.5 text-[0.8rem] font-semibold" style={{ color }}>
          {ui.readTerm}
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
        </span>
      )}
    </>
  )

  const base = "relative flex flex-col overflow-hidden rounded-2xl border bg-white p-5 transition-all duration-300"

  if (entry.hasPage) {
    return (
      <Link
        href={`/${lang}/glossary/${entry.slug}`}
        className={cx(base, "group hover:-translate-y-1 hover:shadow-[0_20px_44px_rgba(11,22,45,0.12)] hover:border-[color:var(--c)]")}
        style={{ borderColor: `${color}26`, ["--c" as string]: color }}
      >
        {inner}
      </Link>
    )
  }
  return (
    <div className={base} style={{ borderColor: `${color}1f` }}>
      {inner}
    </div>
  )
}

// ── Cluster section ───────────────────────────────────────────────────────
function ClusterSection({ cluster, lang }: { cluster: GlossaryCluster; lang: Locale }) {
  const meta = glossaryClusterMeta[cluster]
  const entries = listGlossaryCatalogByCluster(cluster)
  const reveal = useRevealOnScroll({ margin: "-60px" })

  return (
    <section
      id={`cluster-${cluster}`}
      ref={reveal.ref}
      style={{ ["--area" as string]: meta.color }}
      className={cx("scroll-mt-28 reveal-fade-up", reveal.isRevealed && "revealed")}
    >
      <div className="flex items-center gap-3">
        <span aria-hidden className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: meta.color }} />
        <h2 className="font-serif text-[1.7rem] sm:text-[2.1rem] leading-[1.1] tracking-tight text-[#0B162D]">
          {meta.label[lang]}
        </h2>
      </div>
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {entries.map((entry) => (
          <TermCard key={entry.slug} entry={entry} lang={lang} />
        ))}
      </div>
    </section>
  )
}

// ── Page ────────────────────────────────────────────────────────────────
export default function GlossaryIndexPage({ lang }: { lang: Locale }) {
  const ui = getGlossaryUi(lang)
  const copy = SEARCH_COPY[lang]
  const heading = useRevealOnScroll()
  const [query, setQuery] = useState("")
  const q = query.trim().toLowerCase()

  const allEntries = useMemo(() => glossaryClusterOrder.flatMap((c) => listGlossaryCatalogByCluster(c)), [])
  const searchIndex = useMemo(
    () =>
      allEntries.map((entry) => ({
        entry,
        text: [entry.term[lang], entry.shortDefinition[lang], ...getGlossaryTermSynonyms(entry.slug, lang)].join(" ").toLowerCase(),
      })),
    [allEntries, lang],
  )
  const results = q ? searchIndex.filter((x) => x.text.includes(q)).map((x) => x.entry) : []
  const searching = q.length > 0

  return (
    <main data-page="apps" className="pt-24 sm:pt-32">
      {/* ── Hero ── */}
      <section className="relative">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div
            ref={heading.ref}
            className={cx(
              "flex flex-col gap-9 reveal-fade-up lg:grid lg:grid-cols-[2.6fr_1fr] lg:items-end lg:gap-12",
              heading.isRevealed && "revealed",
            )}
          >
            {/* Left: heading (~72%) */}
            <div>
              <span className="section-eyebrow">{ui.eyebrow}</span>
              <h1 className="mt-2 font-serif text-[2.4rem] sm:text-[3.1rem] md:text-[3.6rem] leading-[1.03] tracking-tight text-[#0B162D]">
                {ui.indexTitleLead} <span className="section-highlight">{ui.indexTitleHighlight}</span>
              </h1>
              <p className="mt-5 text-[0.95rem] sm:text-[1.1rem] leading-relaxed text-[#0B162D]/65">{ui.indexSubtitle}</p>

              <div className="mt-7 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[0.78rem] font-medium text-[#0B162D]/45">
                <span className="font-semibold text-[#0B162D]/70">{allEntries.length}</span>
                <span>{copy.terms}</span>
                <span aria-hidden className="h-1 w-1 rounded-full bg-[#0B162D]/25" />
                <span><span className="font-semibold text-[#0B162D]/70">{glossaryClusterOrder.length}</span> {copy.areas}</span>
                <span aria-hidden className="h-1 w-1 rounded-full bg-[#0B162D]/25" />
                <span>{copy.sources}</span>
              </div>
            </div>

            {/* Right: search only, bottom-right (~28%) */}
            <div className="relative w-full">
              <Search aria-hidden className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#0B162D]/35" style={{ height: 18, width: 18 }} />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={copy.placeholder}
                aria-label={copy.placeholder}
                className="w-full rounded-full border border-black/12 bg-white/90 py-3.5 pl-11 pr-11 text-[0.92rem] text-[#0B162D] shadow-[0_10px_30px_rgba(11,22,45,0.06)] outline-none transition-shadow placeholder:text-[#0B162D]/40 focus:border-[#0B162D]/25 focus:shadow-[0_12px_36px_rgba(11,22,45,0.10)]"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label={copy.clear}
                  className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-[#0B162D]/45 transition-colors hover:bg-black/5 hover:text-[#0B162D]"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Body: search results OR clusters ── */}
      <div className="max-w-[1400px] mx-auto mt-16 px-4 sm:mt-20 sm:px-6 lg:px-8">
        {searching ? (
          <section aria-live="polite">
            <div className="flex items-baseline gap-3">
              <h2 className="font-serif text-[1.6rem] sm:text-[2rem] leading-tight tracking-tight text-[#0B162D]">
                {copy.results(results.length)}
              </h2>
              <button type="button" onClick={() => setQuery("")} className="text-[0.82rem] font-medium text-[#0B162D]/55 underline-offset-4 hover:text-[#0B162D] hover:underline">
                {copy.clear}
              </button>
            </div>
            {results.length > 0 ? (
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {results.map((entry) => (
                  <TermCard key={entry.slug} entry={entry} lang={lang} />
                ))}
              </div>
            ) : (
              <div className="mt-8 rounded-2xl border border-black/10 bg-white/60 p-10 text-center">
                <p className="font-serif text-[1.3rem] text-[#0B162D]">{copy.none}</p>
                <p className="mt-2 text-[0.9rem] text-[#0B162D]/55">{copy.noneHint}</p>
              </div>
            )}
          </section>
        ) : (
          <div className="flex flex-col gap-16 sm:gap-20">
            {glossaryClusterOrder.map((cluster) => (
              <ClusterSection key={cluster} cluster={cluster} lang={lang} />
            ))}
          </div>
        )}
      </div>

      {/* ── CTA ── */}
      <section className="max-w-[1400px] mx-auto px-4 pb-14 pt-24 sm:px-6 sm:pb-20 sm:pt-28 lg:px-8">
        <div className="overflow-hidden rounded-[28px] bg-[#0B162D] px-7 py-12 sm:px-12 sm:py-16" data-header-tone="dark">
          <div className="flex flex-col items-center gap-6 text-center lg:flex-row lg:items-center lg:justify-between lg:text-left">
            <div>
              <h2 className="mx-auto max-w-[26ch] font-serif text-[1.8rem] sm:text-[2.4rem] leading-[1.1] tracking-tight text-white lg:mx-0">
                {ui.ctaHeading}
              </h2>
              <p className="mx-auto mt-4 max-w-[52ch] text-[0.85rem] sm:text-[0.92rem] leading-relaxed text-white/65 lg:mx-0">{ui.ctaSubtitle}</p>
            </div>
            <Link
              href={`/${lang}/contact`}
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
