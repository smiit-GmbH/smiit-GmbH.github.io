import Link from "next/link"
import { ChevronRight } from "lucide-react"
import type { Locale } from "@/lib/dictionary"

export type Crumb = { label: string; href?: string }

/**
 * Visible breadcrumb that mirrors the Breadcrumb JSON-LD on case study pages.
 * The home crumb is intentionally omitted (kept consistent with the JSON-LD,
 * which is built with includeHome: false for these pages).
 */
export default function Breadcrumb({ lang, items }: { lang: Locale; items: Crumb[] }) {
  const all = items

  return (
    <nav aria-label={lang === "de" ? "Brotkrümelnavigation" : "Breadcrumb"}>
      <ol className="flex flex-wrap items-center gap-1.5 text-[0.8rem] text-[#0B162D]/50">
        {all.map((crumb, i) => {
          const isLast = i === all.length - 1
          return (
            <li key={i} className="flex items-center gap-1.5">
              {crumb.href && !isLast ? (
                <Link href={crumb.href} className="transition-colors hover:text-[#0B162D]">
                  {crumb.label}
                </Link>
              ) : (
                <span className={isLast ? "font-medium text-[#0B162D]/80" : undefined} aria-current={isLast ? "page" : undefined}>
                  {crumb.label}
                </span>
              )}
              {!isLast && <ChevronRight className="h-3.5 w-3.5 text-[#0B162D]/30" aria-hidden />}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
