"use client"

import type { CSSProperties } from "react"
import { ArrowRight } from "lucide-react"
import LocalizedLink from "@/components/localized-link"
import type { Locale } from "@/lib/dictionary"
import type { GlossaryCatalogEntry } from "@/lib/glossary"

const COPY = {
  de: {
    heading: "Fachbegriffe aus unserem Glossar",
    intro: "Die zentralen Begriffe rund um dieses Thema – fachlich erklärt und mit Praxisbezug.",
    all: "Zum Glossar",
  },
  en: {
    heading: "Key terms from our glossary",
    intro: "The core terms around this topic – explained clearly and grounded in practice.",
    all: "View the glossary",
  },
}

/**
 * Topical back-link band: wires service pages and case studies back into the
 * glossary so the cluster (service ↔ glossary ↔ case study) is linked both ways.
 */
export default function GlossaryLinksBand({
  lang,
  entries,
  accent = "#21569c",
  accentHover = "#1a457d",
  maxItems,
}: {
  lang: Locale
  entries: GlossaryCatalogEntry[]
  accent?: string
  accentHover?: string
  maxItems?: number
}) {
  if (!entries.length) return null
  const shown = maxItems ? entries.slice(0, maxItems) : entries
  const t = COPY[lang]
  const accentStyle = { "--accent": accent, "--accent-hover": accentHover } as CSSProperties

  return (
    <section className="relative bg-transparent py-4 sm:py-6" aria-label={t.heading}>
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 mb-10">
        <div className="border-y border-black/10 py-6 sm:py-8" style={accentStyle}>
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
            <h2 className="font-serif text-[1.4rem] sm:text-[1.7rem] leading-tight tracking-tight text-[#0B162D]">
              {t.heading}
            </h2>
            <LocalizedLink
              href="/glossary"
              className="group inline-flex items-center gap-1.5 text-sm font-medium text-[color:var(--accent)] hover:text-[color:var(--accent-hover)] transition-colors whitespace-nowrap"
            >
              {t.all}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </LocalizedLink>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-black/55 max-w-[70ch]">{t.intro}</p>
          <div className="mt-5 flex flex-wrap gap-1.5 sm:gap-2">
            {shown.map((entry) => (
              <LocalizedLink
                key={entry.slug}
                href={`/glossary/${entry.slug}`}
                style={accentStyle}
                className="rounded-full border border-black/15 bg-white/60 px-2.5 py-1 text-[0.72rem] font-medium text-[#0B162D] transition-colors hover:border-[color:var(--accent)] hover:text-[color:var(--accent)] sm:px-3.5 sm:py-1.5 sm:text-[0.85rem]"
              >
                {entry.term[lang]}
              </LocalizedLink>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
