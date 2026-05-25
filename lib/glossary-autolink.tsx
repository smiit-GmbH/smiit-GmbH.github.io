import React from "react"
import Link from "next/link"
import type { Locale } from "@/lib/dictionary"
import { getGlossaryMatchers, getGlossaryShortDefinition, type GlossaryMatcher } from "@/lib/glossary"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

const matchersByLang: Record<Locale, GlossaryMatcher[]> = {
  de: getGlossaryMatchers("de"),
  en: getGlossaryMatchers("en"),
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

/**
 * Build a regex body that treats spaces, hyphens and slashes as interchangeable
 * separators, so "Data Warehouse" also matches "Data-Warehouse" and
 * "Bronze Silver Gold" matches "Bronze-/Silver-/Gold".
 */
function buildPattern(text: string): string {
  const tokens = text.split(/[\s/\-]+/).filter(Boolean).map(escapeRegExp)
  return tokens.join("[\\s/\\-]+")
}

type Token = { type: "text"; value: string } | { type: "link"; slug: string; value: string }

/**
 * Auto-links the first occurrence of each glossary term (or its synonyms) inside
 * a paragraph of body copy. SEO-conscious rules:
 *  - first occurrence per term per page only (tracked via the shared `used` set)
 *  - no self-link (`excludeSlug`)
 *  - word-boundary matching, longest phrase first, case-insensitive
 *  - returns a plain string when nothing matched (no wrapper noise)
 */
export function autolinkGlossary(
  text: string,
  opts: { lang: Locale; used: Set<string>; excludeSlug?: string },
): React.ReactNode {
  const { lang, used, excludeSlug } = opts
  let tokens: Token[] = [{ type: "text", value: text }]

  for (const m of matchersByLang[lang]) {
    if (m.slug === excludeSlug || used.has(m.slug)) continue
    const body = buildPattern(m.text)
    if (!body) continue
    const re = new RegExp(`(?<![\\p{L}\\p{N}])(?:${body})(?![\\p{L}\\p{N}])`, "iu")

    let placed = false
    const next: Token[] = []
    for (const tok of tokens) {
      if (placed || tok.type !== "text") {
        next.push(tok)
        continue
      }
      const match = re.exec(tok.value)
      if (!match) {
        next.push(tok)
        continue
      }
      const start = match.index
      const end = start + match[0].length
      const before = tok.value.slice(0, start)
      const after = tok.value.slice(end)
      if (before) next.push({ type: "text", value: before })
      next.push({ type: "link", slug: m.slug, value: tok.value.slice(start, end) })
      if (after) next.push({ type: "text", value: after })
      placed = true
      used.add(m.slug)
    }
    tokens = next
  }

  if (tokens.every((t) => t.type === "text")) return text

  return tokens.map((t, i) => {
    if (t.type === "text") return <React.Fragment key={i}>{t.value}</React.Fragment>

    const link = (
      <Link
        href={`/${lang}/glossary/${t.slug}/`}
        className="font-medium underline decoration-black/25 underline-offset-2 transition-colors hover:decoration-current"
      >
        {t.value}
      </Link>
    )

    // Hover/focus tooltip with the term's short definition (instant context,
    // without leaving the page). On touch, tapping the link navigates as usual.
    const definition = getGlossaryShortDefinition(t.slug, lang)
    if (!definition) return <React.Fragment key={i}>{link}</React.Fragment>

    return (
      <Tooltip key={i} delayDuration={250}>
        <TooltipTrigger asChild>{link}</TooltipTrigger>
        <TooltipContent
          sideOffset={6}
          className="max-w-[20rem] text-[0.78rem] font-normal leading-relaxed"
        >
          {definition}
        </TooltipContent>
      </Tooltip>
    )
  })
}
