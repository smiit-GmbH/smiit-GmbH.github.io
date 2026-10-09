"use client"

import { useEffect, useState, type ComponentType } from "react"
import { animate, useMotionValue } from "framer-motion"
import type { LucideIcon } from "lucide-react"

export type PortfolioItem = { title: string; shortDesc: string; details: string }

/** The `portfolio` block of a service dictionary; `L` is that service's visual labels. */
export type PortfolioCopy<L> = {
  title: string
  titleHighlight: string
  subtitle: string
  items: PortfolioItem[]
  visuals: L
  learnMore: string
  learnLess?: string
  bookCta: string
}

/** Desktop visual: an SVG/HTML illustration that animates in once its row is revealed. */
export type PortfolioVisual<L> = ComponentType<{ isRevealed: boolean; labels?: L }>
/** Mobile counterpart, tinted with the item's strand color. */
export type PortfolioMobileVisual<L> = ComponentType<{ isRevealed: boolean; accent: string; labels?: L }>

/** What a service contributes to the shared portfolio section: one icon and visual pair per item. */
export type PortfolioParts<L> = {
  icons: readonly LucideIcon[]
  visuals: readonly PortfolioVisual<L>[]
  mobileVisuals: readonly PortfolioMobileVisual<L>[]
}

// ---------------------------------------------------------------------------
// CountUp – cheap motion-value driven number animation
// ---------------------------------------------------------------------------
export function CountUp({
  to,
  duration = 1.6,
  decimals = 0,
  isRevealed,
  prefix = "",
  suffix = "",
  className,
}: {
  to: number
  duration?: number
  decimals?: number
  isRevealed: boolean
  prefix?: string
  suffix?: string
  className?: string
}) {
  const value = useMotionValue(0)
  const [display, setDisplay] = useState("0")

  useEffect(() => {
    if (!isRevealed) return
    const controls = animate(value, to, { duration, ease: "easeOut" })
    const unsub = value.on("change", (v) => {
      setDisplay(decimals === 0 ? Math.round(v).toString() : v.toFixed(decimals))
    })
    return () => {
      controls.stop()
      unsub()
    }
  }, [isRevealed, to, duration, decimals, value])

  return (
    <span className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  )
}

// ---------------------------------------------------------------------------
// Mobile portfolio — vertical stack with mobile-tuned live visuals per service.
// The desktop SVG visuals don't read well at phone widths because their internal
// labels are sized in viewBox units (they shrink with the container and become
// illegible). The mobile counterparts use HTML pills for labels so text stays
// sharp, and are sized for ~320–400px card widths.
// ---------------------------------------------------------------------------
export function MobileVisualShell({
  children,
  label,
  badge,
  accent,
  shellRef,
}: {
  children: React.ReactNode
  label: string
  badge?: React.ReactNode
  accent: string
  shellRef?: React.Ref<HTMLDivElement>
}) {
  return (
    <div
      ref={shellRef}
      aria-hidden="true"
      className="relative w-full overflow-hidden rounded-2xl border bg-white p-4"
      style={{
        borderColor: `${accent}26`,
        backgroundImage: `linear-gradient(135deg, ${accent}10, transparent 55%)`,
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[2px]"
        style={{
          background: `linear-gradient(to right, transparent, ${accent}66, transparent)`,
        }}
      />
      <div className="relative mb-3 flex items-center justify-between">
        <span className="text-[0.5rem] font-semibold uppercase tracking-[0.22em] text-black/40">{label}</span>
        {badge}
      </div>
      <div className="relative">{children}</div>
    </div>
  )
}
