import Link from "next/link"
import { ArrowRight } from "lucide-react"
import type { Locale } from "@/lib/dictionary"
import { getGlossaryUi, glossaryClusterMeta, type GlossaryCatalogEntry } from "@/lib/glossary-meta"

export function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ")
}

export const SEARCH_COPY = {
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

export function TermCard({ entry, lang }: { entry: GlossaryCatalogEntry; lang: Locale }) {
  const ui = getGlossaryUi(lang)
  const color = glossaryClusterMeta[entry.cluster].color
  const roleLabel = entry.role === "pillar" ? ui.pillarLabel : ui.subLabel

  const inner = (
    <>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[3px]"
        style={{ background: `linear-gradient(to right, ${color}, ${color}55)` }}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full"
        style={{ background: `radial-gradient(circle, ${color}12, transparent 70%)` }}
      />
      <div className="relative flex items-center justify-between gap-3">
        <span
          className="rounded-full px-2.5 py-0.5 text-[0.58rem] font-semibold uppercase tracking-wider"
          style={{ color, backgroundColor: `${color}16` }}
        >
          {roleLabel}
        </span>
        {!entry.hasPage && (
          <span className="text-[0.6rem] font-medium uppercase tracking-wider text-[#0B162D]/35">{ui.comingSoon}</span>
        )}
      </div>
      <h3 className="relative mt-3 font-serif text-[1.2rem] leading-[1.2] tracking-tight text-[#0B162D]">
        {entry.term[lang]}
      </h3>
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
        className={cx(
          base,
          "group hover:-translate-y-1 hover:shadow-[0_20px_44px_rgba(11,22,45,0.12)] hover:border-[color:var(--c)]",
        )}
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
