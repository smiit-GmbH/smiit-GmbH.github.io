"use client"

import { createContext, useContext, useMemo, useState, type ReactNode } from "react"
import { Search, X } from "lucide-react"
import type { Locale } from "@/lib/dictionary"
import { glossaryClusterOrder, type GlossaryCatalogEntry } from "@/lib/glossary-meta"
import { SEARCH_COPY, TermCard } from "./term-card"

// The glossary overview is server-rendered; only the search lives on the client.
// The query is shared between the input (in the hero) and the body below it.

const QueryContext = createContext<{ query: string; setQuery: (q: string) => void } | null>(null)

export function GlossarySearchProvider({ children }: { children: ReactNode }) {
  const [query, setQuery] = useState("")
  return <QueryContext.Provider value={{ query, setQuery }}>{children}</QueryContext.Provider>
}

function useQuery() {
  const ctx = useContext(QueryContext)
  if (!ctx) throw new Error("GlossarySearchProvider missing")
  return ctx
}

export function GlossarySearchInput({ lang }: { lang: Locale }) {
  const { query, setQuery } = useQuery()
  const copy = SEARCH_COPY[lang]
  return (
    <div className="relative w-full">
      <Search
        aria-hidden
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#0B162D]/35"
        style={{ height: 18, width: 18 }}
      />
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
  )
}

/** Shows search results while a query is entered, otherwise the server-rendered clusters. */
export function GlossarySearchBody({
  lang,
  catalog,
  synonyms,
  clusters,
}: {
  lang: Locale
  catalog: GlossaryCatalogEntry[]
  synonyms: Record<string, string[]>
  clusters: ReactNode
}) {
  const { query, setQuery } = useQuery()
  const copy = SEARCH_COPY[lang]
  const q = query.trim().toLowerCase()

  const searchIndex = useMemo(
    () =>
      glossaryClusterOrder
        .flatMap((c) => catalog.filter((entry) => entry.cluster === c))
        .map((entry) => ({
          entry,
          text: [entry.term[lang], entry.shortDefinition[lang], ...(synonyms[entry.slug] ?? [])]
            .join(" ")
            .toLowerCase(),
        })),
    [catalog, lang, synonyms],
  )
  if (!q) return <>{clusters}</>

  const results = searchIndex.filter((x) => x.text.includes(q)).map((x) => x.entry)
  return (
    <section aria-live="polite">
      <div className="flex items-baseline gap-3">
        <h2 className="font-serif text-[1.6rem] sm:text-[2rem] leading-tight tracking-tight text-[#0B162D]">
          {copy.results(results.length)}
        </h2>
        <button
          type="button"
          onClick={() => setQuery("")}
          className="text-[0.82rem] font-medium text-[#0B162D]/55 underline-offset-4 hover:text-[#0B162D] hover:underline"
        >
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
  )
}
