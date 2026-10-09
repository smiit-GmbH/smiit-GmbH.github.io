"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { animate, motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion"
import type { Locale } from "@/lib/dictionary"
import { serviceThemes, type ServiceKey } from "./service-theme"

// Building blocks shared by the service hero sections (dashboard mock-ups + CTA).

export function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ")
}

export function HeroPackages({
  hero,
  service,
  align = "left",
}: {
  hero: { packages?: readonly string[]; packagesLabel?: string }
  service: ServiceKey
  align?: "left" | "center"
}) {
  const theme = serviceThemes[service]
  const packages = (hero?.packages ?? []) as string[]
  if (packages.length === 0) return null

  return (
    <div className={cx("mt-5", align === "center" && "mx-auto max-w-[640px]")}>
      {hero?.packagesLabel && (
        <p
          className={cx(
            `text-[0.68rem] font-semibold uppercase tracking-[0.18em] ${theme.accentText}`,
            align === "center" && "text-center",
          )}
        >
          {hero.packagesLabel}
        </p>
      )}
      <ul className={cx("mt-2.5 flex flex-wrap gap-2", align === "center" ? "justify-center" : "justify-start")}>
        {packages.map((item) => (
          <li
            key={item}
            className={`rounded-full border ${theme.heroPackageChip} px-3 py-1.5 text-[0.76rem] font-medium leading-tight text-[#0B162D]/78`}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

export function formatNumber(value: number, decimals = 0, lang: Locale = "de"): string {
  const fixed = decimals > 0 ? value.toFixed(decimals) : Math.round(value).toString()
  return decimals > 0 && lang === "de" ? fixed.replace(".", ",") : fixed
}

export function CountUp({
  to,
  decimals = 0,
  suffix = "",
  prefix = "",
  className,
  reduceMotion,
  lang = "de",
}: {
  to: number
  decimals?: number
  suffix?: string
  prefix?: string
  className?: string
  reduceMotion?: boolean | null
  lang?: Locale
}) {
  const value = useMotionValue(reduceMotion ? to : 0)
  const [display, setDisplay] = useState(formatNumber(reduceMotion ? to : 0, decimals, lang))

  useEffect(() => {
    if (reduceMotion) {
      value.set(to)
      // eslint-disable-next-line react-hooks/set-state-in-effect -- keeps the rendered number in sync with the framer-motion value when the count-up is skipped
      setDisplay(formatNumber(to, decimals, lang))
      return
    }
    const controls = animate(value, to, { duration: 0.9, ease: [0.22, 1, 0.36, 1] })
    const unsub = value.on("change", (v) => setDisplay(formatNumber(v, decimals, lang)))
    return () => {
      controls.stop()
      unsub()
    }
  }, [to, decimals, reduceMotion, value, lang])

  return (
    <span className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  )
}

export function MagneticCta({
  href,
  children,
  className,
}: {
  href: string
  children: React.ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotion()
  const mvX = useMotionValue(0)
  const mvY = useMotionValue(0)
  const x = useSpring(mvX, { stiffness: 240, damping: 18, mass: 0.4 })
  const y = useSpring(mvY, { stiffness: 240, damping: 18, mass: 0.4 })

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const offsetX = e.clientX - (rect.left + rect.width / 2)
    const offsetY = e.clientY - (rect.top + rect.height / 2)
    const max = 8
    mvX.set(Math.max(-max, Math.min(max, offsetX * 0.3)))
    mvY.set(Math.max(-max, Math.min(max, offsetY * 0.3)))
  }
  const handleLeave = () => {
    mvX.set(0)
    mvY.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={shouldReduceMotion ? undefined : { x, y }}
      className="inline-block"
    >
      <Link href={href} className={className}>
        {children}
      </Link>
    </motion.div>
  )
}

/** Stagger child of the dashboard mock-up cards. */
export const dashboardChildVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}
