"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { ChevronDown, ExternalLink } from "lucide-react"
import type { BlogSource } from "@/lib/blog-meta"
import { useLenis } from "@/components/smooth-scroll-provider"
import { cx } from "./text-utils"

// The only shared client state on a blog post: whether the sources list is
// expanded. Citations in the (server-rendered) article body expand it and
// scroll to the cited entry.

const SOURCES_PREVIEW = 6

type SourcesState = { open: boolean; setOpen: (open: boolean) => void; revealAndScrollTo: (n: number) => void }

const SourcesContext = createContext<SourcesState | null>(null)

export function SourcesProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const lenis = useLenis()

  // Sources are collapsed to the first 6 by default. A citation click (or the
  // "show more" button) reveals the rest, then scrolls to the requested entry.
  const revealAndScrollTo = (n: number) => {
    setOpen(true)
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        const el = document.getElementById(`ref-${n}`)
        if (!el) return
        if (lenis) lenis.scrollTo(el, { offset: -110 })
        else el.scrollIntoView({ behavior: "smooth", block: "start" })
      }),
    )
  }

  return <SourcesContext.Provider value={{ open, setOpen, revealAndScrollTo }}>{children}</SourcesContext.Provider>
}

/** Superscript citation links into the (collapsed) sources list. */
export function Citations({ refs }: { refs?: number[] }) {
  const sources = useContext(SourcesContext)
  if (!refs || refs.length === 0) return null
  return (
    <sup className="ml-0.5 font-semibold">
      {refs.map((n) => (
        <a
          key={n}
          href={`#ref-${n}`}
          onClick={(e) => {
            if (sources) {
              e.preventDefault()
              sources.revealAndScrollTo(n)
            }
          }}
          className="text-[var(--area)] no-underline hover:underline"
        >
          [{n}]
        </a>
      ))}
    </sup>
  )
}

export function SourcesList({ sources, moreLabel }: { sources: BlogSource[]; moreLabel: string }) {
  const state = useContext(SourcesContext)
  const open = state?.open ?? false
  return (
    <>
      <ul className="mt-7 space-y-3">
        {sources.map((source, i) => (
          <li
            key={source.title}
            id={`ref-${i + 1}`}
            className={cx("scroll-mt-28 flex items-start gap-2.5", !open && i >= SOURCES_PREVIEW && "hidden")}
          >
            <span className="mt-px shrink-0 font-mono text-[0.82rem] font-semibold text-[var(--area)]">[{i + 1}]</span>
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
                <ExternalLink
                  className="mt-1 h-3.5 w-3.5 shrink-0 text-[#0B162D]/30 transition-colors group-hover:text-[var(--area)]"
                  aria-hidden
                />
              </a>
            ) : (
              <span className="text-[0.92rem] leading-relaxed text-[#0B162D]/75">{source.title}</span>
            )}
          </li>
        ))}
      </ul>
      {!open && sources.length > SOURCES_PREVIEW && (
        <button
          type="button"
          onClick={() => state?.setOpen(true)}
          className="mt-5 inline-flex items-center gap-1.5 text-[0.82rem] font-medium text-[#0B162D]/55 transition-colors hover:text-[var(--area)]"
        >
          <ChevronDown className="h-4 w-4" aria-hidden />
          {sources.length - SOURCES_PREVIEW} {moreLabel}
        </button>
      )}
    </>
  )
}
