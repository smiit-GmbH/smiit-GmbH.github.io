import Link from "next/link"
import { ArrowRight } from "lucide-react"
import type { Locale } from "@/lib/dictionary"
import {
  getGlossaryUi,
  glossaryClusterMeta,
  glossaryClusterOrder,
  type GlossaryCatalogEntry,
  type GlossaryCluster,
} from "@/lib/glossary-meta"
import { Reveal } from "@/components/reveal"
import { SEARCH_COPY, TermCard } from "./index/term-card"
import { GlossarySearchBody, GlossarySearchInput, GlossarySearchProvider } from "./index/search"

// ── Cluster section ───────────────────────────────────────────────────────
function ClusterSection({
  cluster,
  catalog,
  lang,
}: {
  cluster: GlossaryCluster
  catalog: GlossaryCatalogEntry[]
  lang: Locale
}) {
  const meta = glossaryClusterMeta[cluster]
  const entries = catalog.filter((entry) => entry.cluster === cluster)
  return (
    <Reveal
      as="section"
      margin="-60px"
      id={`cluster-${cluster}`}
      style={{ ["--area" as string]: meta.color }}
      className="scroll-mt-28 reveal-fade-up"
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
    </Reveal>
  )
}

// ── Page ────────────────────────────────────────────────────────────────
export default function GlossaryIndexPage({
  lang,
  catalog,
  synonyms,
}: {
  lang: Locale
  /** The full term catalog, in catalog order. */
  catalog: GlossaryCatalogEntry[]
  /** Synonyms per slug (current locale) — widens the search. */
  synonyms: Record<string, string[]>
}) {
  const ui = getGlossaryUi(lang)
  const copy = SEARCH_COPY[lang]
  const allEntries = glossaryClusterOrder.flatMap((c) => catalog.filter((entry) => entry.cluster === c))

  return (
    <GlossarySearchProvider>
      <main data-page="apps" className="pt-24 sm:pt-32">
        {/* ── Hero ── */}
        <section className="relative">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-9 hero-fade-up lg:grid lg:grid-cols-[2.6fr_1fr] lg:items-end lg:gap-12">
              {/* Left: heading (~72%) */}
              <div>
                <span className="section-eyebrow">{ui.eyebrow}</span>
                <h1 className="mt-2 font-serif text-[2.4rem] sm:text-[3.1rem] md:text-[3.6rem] leading-[1.03] tracking-tight text-[#0B162D]">
                  {ui.indexTitleLead} <span className="section-highlight">{ui.indexTitleHighlight}</span>
                </h1>
                <p className="mt-5 text-[0.95rem] sm:text-[1.1rem] leading-relaxed text-[#0B162D]/65">
                  {ui.indexSubtitle}
                </p>

                <div className="mt-7 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[0.78rem] font-medium text-[#0B162D]/45">
                  <span className="font-semibold text-[#0B162D]/70">{allEntries.length}</span>
                  <span>{copy.terms}</span>
                  <span aria-hidden className="h-1 w-1 rounded-full bg-[#0B162D]/25" />
                  <span>
                    <span className="font-semibold text-[#0B162D]/70">{glossaryClusterOrder.length}</span> {copy.areas}
                  </span>
                  <span aria-hidden className="h-1 w-1 rounded-full bg-[#0B162D]/25" />
                  <span>{copy.sources}</span>
                </div>
              </div>

              {/* Right: search only, bottom-right (~28%) */}
              <GlossarySearchInput lang={lang} />
            </div>
          </div>
        </section>

        {/* ── Body: search results OR clusters ── */}
        <div className="max-w-[1400px] mx-auto mt-16 px-4 sm:mt-20 sm:px-6 lg:px-8">
          <GlossarySearchBody
            lang={lang}
            catalog={catalog}
            synonyms={synonyms}
            clusters={
              <div className="flex flex-col gap-16 sm:gap-20">
                {glossaryClusterOrder.map((cluster) => (
                  <ClusterSection key={cluster} cluster={cluster} catalog={catalog} lang={lang} />
                ))}
              </div>
            }
          />
        </div>

        {/* ── CTA ── */}
        <section className="max-w-[1400px] mx-auto px-4 pb-14 pt-24 sm:px-6 sm:pb-20 sm:pt-28 lg:px-8">
          <div
            className="overflow-hidden rounded-[28px] bg-[#0B162D] px-7 py-12 sm:px-12 sm:py-16"
            data-header-tone="dark"
          >
            <div className="flex flex-col items-center gap-6 text-center lg:flex-row lg:items-center lg:justify-between lg:text-left">
              <div>
                <h2 className="mx-auto max-w-[26ch] font-serif text-[1.8rem] sm:text-[2.4rem] leading-[1.1] tracking-tight text-white lg:mx-0">
                  {ui.ctaHeading}
                </h2>
                <p className="mx-auto mt-4 max-w-[52ch] text-[0.85rem] sm:text-[0.92rem] leading-relaxed text-white/65 lg:mx-0">
                  {ui.ctaSubtitle}
                </p>
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
    </GlossarySearchProvider>
  )
}
