"use client"

import type { CSSProperties } from "react"
import { ArrowRight } from "lucide-react"
import LocalizedLink from "@/components/localized-link"

type RelatedLink = {
  text: string
  linkLabel: string
  href: string
  /** Brand accent color for the link text (default: brand blue) */
  accent?: string
  /** Accent color on hover (default: darker brand blue) */
  accentHover?: string
}

export default function RelatedLinkBand({
  text,
  linkLabel,
  href,
  accent = "#21569c",
  accentHover = "#1a457d",
}: RelatedLink) {
  const accentStyle = {
    "--accent": accent,
    "--accent-hover": accentHover,
  } as CSSProperties

  return (
    <section className="relative bg-transparent py-4 sm:py-6">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 mb-10">
        <div className="flex flex-col items-start gap-3 border-y border-black/10 py-6 sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:py-8">
          <p className="text-sm sm:text-[0.95rem] leading-relaxed text-black/60 max-w-[60ch]">
            {text}
          </p>
          <LocalizedLink
            href={href}
            style={accentStyle}
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-[color:var(--accent)] hover:text-[color:var(--accent-hover)] transition-colors whitespace-nowrap"
          >
            {linkLabel}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </LocalizedLink>
        </div>
      </div>
    </section>
  )
}
