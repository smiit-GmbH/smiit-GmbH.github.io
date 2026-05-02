"use client"

import React, { useCallback, useEffect, useRef, useState } from "react"
import { motion, useInView, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion"
import LocalizedLink from "../../localized-link"
import { DotLottieReact } from "@lottiefiles/dotlottie-react"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"

interface ServicesProps {
  dict: any
}

function TagPill({ label, variant = "default" }: { label: string; variant?: "default" | "glass" }) {
  return (
    <span
      className={[
        "inline-flex items-center rounded-full",
        "px-2.5 py-0.5",
        "text-[0.62rem] font-semibold uppercase tracking-wide",
        variant === "glass"
          ? "border border-black/10 bg-white/35 text-black/55 backdrop-blur-sm dark:border-white/20 dark:bg-white/15 dark:text-white/80"
          : "border border-black/25 bg-white/70 text-black/60 dark:border-white/20 dark:bg-white/10 dark:text-white/70",
      ].join(" ")}
    >
      {label}
    </span>
  )
}

function ServiceCard({
  title,
  text,
  tags,
  className,
  onHoverStart,
  onHoverEnd,
  onFocus,
  onBlur,
  href,
  imageSrc,
  signalToken,
}: {
  title: string
  text: string
  tags: string[]
  className?: string
  onHoverStart?: () => void
  onHoverEnd?: () => void
  onFocus?: () => void
  onBlur?: () => void
  href?: string
  imageSrc?: string
  signalToken?: number | null
}) {
  const CardContent = (
    <motion.div
      tabIndex={href ? -1 : 0}
      onMouseEnter={!href ? onHoverStart : undefined}
      onMouseLeave={!href ? onHoverEnd : undefined}
      onFocus={!href ? onFocus : undefined}
      onBlur={!href ? onBlur : undefined}
      className={[
        "relative overflow-hidden",
        "rounded-[1.75rem] md:rounded-[1.6rem]",
        "bg-white dark:bg-[color:var(--color-card)]",
        "shadow-[0_10px_30px_rgba(0,0,0,0.06)]",
        "px-6 py-6 sm:px-7 sm:py-7",
        "transition-transform duration-300 ease-out",
        "will-change-transform",
        "hover:scale-[1.02] hover:-translate-y-0.5",
        "focus:scale-[1.02] focus:-translate-y-0.5",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-black/15 dark:focus-visible:ring-white/20",
        href ? "focus:ring-0" : "",
        className ?? "",
      ].join(" ")}
    >
      {/* card “signal ripple” overlay */}
      {typeof signalToken === "number" && (
        <motion.div
          key={signalToken}
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[1.75rem] md:rounded-[1.6rem]"
          initial={{ opacity: 0, boxShadow: "0 0 0 0 rgba(0,0,0,0)" }}
          animate={{
            opacity: [0, 1, 1, 0],
            boxShadow: [
              "0 0 0 0 rgba(168,85,247,0.0)",
              "0 0 0 8px rgba(168,85,247,0.16)",
              "0 0 0 16px rgba(59,130,246,0.10)",
              "0 0 0 26px rgba(99,102,241,0.0)",
            ],
          }}
          transition={{ duration: 1.15, ease: "easeOut", times: [0, 0.25, 0.6, 1] }}
          style={{ mixBlendMode: "screen" }}
        />
      )}

      {imageSrc && (
        <div className="absolute right-0 top-0 bottom-0 w-[60%] pointer-events-none select-none">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageSrc}
            alt=""
            className="h-full w-full object-cover object-right opacity-90"
            style={{
              maskImage: "linear-gradient(to left, black -60%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to left, black -60%, transparent 100%)",
            }}
          />
        </div>
      )}

      <div className="relative z-10">
        <div className="flex flex-wrap gap-2">
          {tags.map((t) => (
            <TagPill key={t} label={t} />
          ))}
        </div>

        <h3 className="mt-4 font-serif text-[1.75rem] leading-[1.05] tracking-tight text-black dark:text-white">
          {title}
        </h3>

        <p className="mt-3 text-[0.84rem] sm:text-[0.92rem] leading-relaxed text-black/75 dark:text-white/70 max-w-[60ch]">
          {text}
        </p>
      </div>
    </motion.div>
  )

  if (href) {
    return (
      <LocalizedLink
        href={href}
        className="block outline-none rounded-[1.6rem]"
        onMouseEnter={onHoverStart}
        onMouseLeave={onHoverEnd}
        onFocus={onFocus}
        onBlur={onBlur}
      >
        {CardContent}
      </LocalizedLink>
    )
  }

  return CardContent
}

function getLink(title: string) {
  const t = title.toLowerCase()
  if (t.includes("strategy") || t.includes("strategie")) return "/services/strategy"
  if (t.includes("analytics") || t.includes("analyse")) return "/services/analytics"
  if (t.includes("app") || t.includes("workflow")) return "/services/apps"
  return undefined
}

function getImage(title: string) {
  const t = title.toLowerCase()
  if (t.includes("strategy") || t.includes("strategie")) return "/assets/home/services_consulting.webp"
  if (t.includes("analytics") || t.includes("analyse")) return "/assets/home/services_analytics.webp"
  if (t.includes("app") || t.includes("workflow")) return "/assets/home/services_apps.webp"
  return undefined
}

function getAccent(title: string): { hex: string; lightHex: string; rgb: string; fg: string } {
  const t = title.toLowerCase()
  if (t.includes("strategy") || t.includes("strategie"))
    return { hex: "#cbd5e1", lightHex: "#e2e8f0", rgb: "203, 213, 225", fg: "#0f172a" }
  if (t.includes("analytics") || t.includes("analyse"))
    return { hex: "#21569c", lightHex: "#7DBBFF", rgb: "33, 86, 156", fg: "#ffffff" }
  if (t.includes("app") || t.includes("workflow"))
    return { hex: "#F703EB", lightHex: "#FB81F5", rgb: "247, 3, 235", fg: "#ffffff" }
  return { hex: "#21569c", lightHex: "#7DBBFF", rgb: "33, 86, 156", fg: "#ffffff" }
}

function CinemaWord({
  word,
  scrollYProgress,
  start,
  end,
  isLast,
}: {
  word: string
  scrollYProgress: MotionValue<number>
  start: number
  end: number
  isLast: boolean
}) {
  const opacity = useTransform(scrollYProgress, [start, end], [0, 1])
  const y = useTransform(scrollYProgress, [start, end], [8, 0])
  return (
    <motion.span style={{ opacity, y, display: "inline-block" }}>
      {word}
      {!isLast ? " " : ""}
    </motion.span>
  )
}

function CinemaTag({
  label,
  scrollYProgress,
  start,
  end,
}: {
  label: string
  scrollYProgress: MotionValue<number>
  start: number
  end: number
}) {
  const opacity = useTransform(scrollYProgress, [start, end], [0, 1])
  const y = useTransform(scrollYProgress, [start, end], [10, 0])
  return (
    <motion.span style={{ opacity, y, display: "inline-block" }}>
      <TagPill label={label} />
    </motion.span>
  )
}

function ServiceCinemaLayer({
  item,
  idx,
  total,
  scrollYProgress,
}: {
  item: { title: string; text: string; tags: string[] }
  idx: number
  total: number
  scrollYProgress: MotionValue<number>
}) {
  const accent = getAccent(item.title)
  const link = getLink(item.title)
  const words = item.text.split(/\s+/).filter((w) => w.length > 0)
  const wordCount = words.length

  const sliceStart = idx / total
  const sliceEnd = (idx + 1) / total
  const sliceLen = sliceEnd - sliceStart
  const fadeWidth = 0.04

  // Cross-fade between adjacent layers at slice boundaries.
  const fadeStops: [number, number, number, number] =
    idx === 0
      ? [-1, 0, sliceEnd - fadeWidth, sliceEnd]
      : idx === total - 1
        ? [sliceStart - fadeWidth, sliceStart, 1, 2]
        : [sliceStart - fadeWidth, sliceStart, sliceEnd - fadeWidth, sliceEnd]
  const fadeValues: [number, number, number, number] =
    idx === 0 ? [1, 1, 1, 0] : idx === total - 1 ? [0, 1, 1, 1] : [0, 1, 1, 0]
  const layerOpacity = useTransform(scrollYProgress, fadeStops, fadeValues)
  const slideValues: [number, number, number, number] =
    idx === 0
      ? [0, 0, 0, -22]
      : idx === total - 1
        ? [22, 0, 0, 0]
        : [22, 0, 0, -22]
  const layerY = useTransform(scrollYProgress, fadeStops, slideValues)
  const layerPointerEvents = useTransform(layerOpacity, (v) =>
    v >= 0.5 ? "auto" : "none",
  )

  const r = (s: number, e: number): [number, number] => [
    sliceStart + sliceLen * s,
    sliceStart + sliceLen * e,
  ]

  const eyebrowOpacity = useTransform(scrollYProgress, r(0, 0.02), [0, 1])
  const titleScale = useTransform(scrollYProgress, r(0, 0.06), [1.08, 1])
  const titleY = useTransform(scrollYProgress, r(0, 0.06), [16, 0])
  const titleOpacity = useTransform(scrollYProgress, r(0, 0.02), [0, 1])
  const haloOpacity = useTransform(scrollYProgress, r(0, 0.04), [0, 1])
  const ghostOpacity = useTransform(scrollYProgress, r(0, 0.05), [0, 1])
  const ghostScale = useTransform(scrollYProgress, r(0, 1), [1.05, 0.95])
  const underlinePathLength = useTransform(scrollYProgress, r(0.06, 0.16), [0, 1])
  const ctaOpacity = useTransform(scrollYProgress, r(0.66, 0.75), [0, 1])
  const ctaY = useTransform(scrollYProgress, r(0.66, 0.75), [12, 0])

  const gradId = `cinema-underline-${idx}`

  const wordRangeStart = 0.28
  const wordRangeEnd = 0.66
  const span = (wordRangeEnd - wordRangeStart) / Math.max(1, wordCount)

  return (
    <motion.div
      style={{ opacity: layerOpacity, y: layerY, pointerEvents: layerPointerEvents }}
      className="absolute inset-x-0 top-[18vh] bottom-0 flex items-center"
    >
      <motion.div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: haloOpacity,
          background: `radial-gradient(ellipse 80% 60% at 50% 50%, rgba(${accent.rgb}, 0.18) 0%, rgba(${accent.rgb}, 0.05) 50%, transparent 80%)`,
        }}
      />

      <motion.span
        aria-hidden
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none font-serif leading-none text-black/[0.05] dark:text-white/[0.06]"
        style={{
          fontSize: "min(80vw, 65vh)",
          scale: ghostScale,
          opacity: ghostOpacity,
        }}
      >
        {idx + 1}
      </motion.span>

      <div className="relative w-full px-6">
        <motion.div
          className="text-[0.68rem] font-medium uppercase tracking-[0.22em] tabular-nums"
          style={{ opacity: eyebrowOpacity }}
        >
          <span style={{ color: accent.hex }}>{String(idx + 1).padStart(2, "0")}</span>
          <span className="mx-2 text-black/30 dark:text-white/30">/</span>
          <span className="text-black/55 dark:text-white/60">{String(total).padStart(2, "0")}</span>
        </motion.div>

        <motion.h3
          className="mt-3 font-serif text-[2.6rem] sm:text-[3.15rem] leading-[1.02] tracking-tight text-black dark:text-white"
          style={{
            scale: titleScale,
            y: titleY,
            opacity: titleOpacity,
            transformOrigin: "left center",
          }}
        >
          {item.title}
        </motion.h3>

        <svg
          className="block w-[60%] h-[3px] mt-4 overflow-visible"
          viewBox="0 0 100 3"
          preserveAspectRatio="none"
          aria-hidden
        >
          <defs>
            <linearGradient id={gradId} x1="0" y1="0" x2="100" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor={accent.hex} />
              <stop offset="100%" stopColor={accent.lightHex} />
            </linearGradient>
          </defs>
          <motion.path
            d="M0 1.5 H 100"
            stroke={`url(#${gradId})`}
            strokeWidth={3}
            strokeLinecap="round"
            fill="none"
            style={{ pathLength: underlinePathLength }}
          />
        </svg>

        <div className="mt-5 flex flex-wrap gap-2">
          {item.tags.map((t, i) => (
            <CinemaTag
              key={t}
              label={t}
              scrollYProgress={scrollYProgress}
              start={sliceStart + sliceLen * (0.16 + i * 0.03)}
              end={sliceStart + sliceLen * (0.22 + i * 0.03)}
            />
          ))}
        </div>

        <p className="mt-5 text-[1rem] leading-relaxed text-black/85 dark:text-white/85 max-w-[42ch]">
          {words.map((word, i) => {
            const wStart = wordRangeStart + i * span
            const wEnd = wStart + Math.max(span * 1.6, 0.025)
            return (
              <CinemaWord
                key={`${idx}-${i}`}
                word={word}
                scrollYProgress={scrollYProgress}
                start={sliceStart + sliceLen * wStart}
                end={sliceStart + sliceLen * wEnd}
                isLast={i === words.length - 1}
              />
            )
          })}
        </p>

        {link && (
          <motion.div className="mt-7" style={{ opacity: ctaOpacity, y: ctaY }}>
            <LocalizedLink
              href={link}
              aria-label={item.title}
              className="inline-flex items-center justify-center w-14 h-14 rounded-full shadow-[0_8px_24px_rgba(0,0,0,0.18)] transition-all duration-300 hover:scale-105 hover:translate-x-1"
              style={{ backgroundColor: accent.hex, color: accent.fg }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M7 17L17 7" />
                <path d="M7 7h10v10" />
              </svg>
            </LocalizedLink>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

function MobileServicesCinemaPinned({
  items,
}: {
  items: Array<{ title: string; text: string; tags: string[] }>
}) {
  const trackRef = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  })

  const revealVh = 85 * items.length
  return (
    <div
      ref={trackRef}
      className="relative -mx-4 sm:-mx-6"
      style={{ minHeight: `${100 + revealVh}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {items.map((item, idx) => (
          <ServiceCinemaLayer
            key={item.title}
            item={item}
            idx={idx}
            total={items.length}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </div>
    </div>
  )
}

function MobileServicesCinemaStatic({
  items,
}: {
  items: Array<{ title: string; text: string; tags: string[] }>
}) {
  return (
    <ul className="border-t border-black/10 dark:border-white/10">
      {items.map((item, idx) => {
        const link = getLink(item.title)
        const accent = getAccent(item.title)
        return (
          <li
            key={item.title}
            className="border-b border-black/10 dark:border-white/10 py-10"
          >
            <div className="text-[0.68rem] font-medium uppercase tracking-[0.22em] tabular-nums">
              <span style={{ color: accent.hex }}>{String(idx + 1).padStart(2, "0")}</span>
              <span className="mx-2 text-black/30 dark:text-white/30">/</span>
              <span className="text-black/55 dark:text-white/60">{String(items.length).padStart(2, "0")}</span>
            </div>
            <h3 className="mt-3 font-serif text-[2.4rem] leading-[1.05] tracking-tight text-black dark:text-white">
              {item.title}
            </h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {item.tags.map((t) => (
                <TagPill key={t} label={t} />
              ))}
            </div>
            <p className="mt-4 text-[0.96rem] leading-relaxed text-black/85 dark:text-white/85">
              {item.text}
            </p>
            {link && (
              <div className="mt-5">
                <LocalizedLink
                  href={link}
                  aria-label={item.title}
                  className="inline-flex items-center justify-center w-12 h-12 rounded-full"
                  style={{ backgroundColor: accent.hex, color: accent.fg }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <path d="M7 17L17 7" />
                    <path d="M7 7h10v10" />
                  </svg>
                </LocalizedLink>
              </div>
            )}
          </li>
        )
      })}
    </ul>
  )
}

function MobileServicesCinema({
  items,
  header,
  ctaText,
  ctaButton,
}: {
  items: Array<{ title: string; text: string; tags: string[] }>
  header?: React.ReactNode
  ctaText?: string
  ctaButton?: string
}) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <div className="md:hidden">
      {prefersReducedMotion ? (
        <>
          {header && <div>{header}</div>}
          <MobileServicesCinemaStatic items={items} />
        </>
      ) : (
        <>
          {header && (
            <div
              className="relative pointer-events-none"
              style={{ height: "285vh", marginBottom: "-285vh" }}
            >
              <div className="sticky top-16 z-30 py-3 pointer-events-auto">
                {header}
              </div>
            </div>
          )}
          <MobileServicesCinemaPinned items={items} />
        </>
      )}

      {ctaText && ctaButton && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative -mt-[10vh] text-center"
        >
          <p className="text-sm leading-relaxed text-black/75 dark:text-white/75 max-w-[54ch] mx-auto">
            {ctaText}
          </p>
          <div className="mt-4 flex justify-center">
            <a href="#book">
              <Button
                variant="outline"
                className="rounded-xl px-8 py-6 text-base border-black text-black hover:bg-black hover:text-white transition-all duration-300 hover:scale-105 cursor-pointer"
              >
                {ctaButton}
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </div>
        </motion.div>
      )}
    </div>
  )
}

function DirectionalWaves({
  id,
  center,
  target,
  pulseToken,
  delayMs = 0,
}: {
  id: string
  center: { x: number; y: number }
  target: { x: number; y: number }
  pulseToken: number | null
  delayMs?: number
}) {
  const [instances, setInstances] = useState<number[]>([])

  useEffect(() => {
    if (pulseToken === null) return
    setInstances((prev) => {
      const next = [...prev, pulseToken]
      if (next.length > 2) next.shift()
      return next
    })

    const t = setTimeout(() => {
      setInstances((prev) => prev.filter((x) => x !== pulseToken))
    }, 2500)

    return () => clearTimeout(t)
  }, [pulseToken])

  if (instances.length === 0) return null

  const dx = target.x - center.x
  const dy = target.y - center.y
  const dist = Math.sqrt(dx * dx + dy * dy)

  const corridor = Math.max(54, Math.min(120, dist * 0.14))

  const ringCommon = {
    initial: { r: 0, opacity: 0 },
    animate: {
      r: [0, dist * 1.03] as number[],
      opacity: [0, 0.85, 0.5, 0] as number[],
    },
    transition: { duration: 1.5, ease: "easeOut" as const, delay: delayMs / 1000 },
  }

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1000 1000" preserveAspectRatio="none">
      <defs>
        <mask id={`${id}-mask`}>
          <rect width="100%" height="100%" fill="black" />
          <line
            x1={center.x}
            y1={center.y}
            x2={target.x}
            y2={target.y}
            stroke="white"
            strokeWidth={corridor}
            strokeLinecap="round"
          />
        </mask>

        <linearGradient id={`${id}-grad`} gradientUnits="userSpaceOnUse" x1={center.x} y1={center.y} x2={target.x} y2={target.y}>
          <stop offset="0%" stopColor="rgba(176, 101, 246, 0.75)" />
          <stop offset="55%" stopColor="rgba(116, 71, 189, 0.65)" />
          <stop offset="100%" stopColor="rgba(25, 28, 201, 0.55)" />
        </linearGradient>
      </defs>

      {instances.map((token, index) => (
        <g key={`${id}-${token}-${index}`}>
          <g mask={`url(#${id}-mask)`}>
            <motion.circle
              cx={center.x}
              cy={center.y}
              fill="none"
              stroke={`url(#${id}-grad)`}
              strokeWidth="2"
              strokeLinecap="round"
              {...ringCommon}
            />
            <motion.circle
              cx={center.x}
              cy={center.y}
              fill="none"
              stroke={`url(#${id}-grad)`}
              strokeWidth="1.5"
              strokeLinecap="round"
              {...ringCommon}
              transition={{
                ...(ringCommon.transition as any),
                delay: (delayMs + 250) / 1000,
              }}
            />
            <motion.circle
              cx={center.x}
              cy={center.y}
              fill="none"
              stroke={`url(#${id}-grad)`}
              strokeWidth="1"
              strokeLinecap="round"
              {...ringCommon}
              transition={{
                ...(ringCommon.transition as any),
                delay: (delayMs + 500) / 1000,
              }}
            />
          </g>

          <motion.circle
            cx={target.x}
            cy={target.y}
            r={4}
            fill="none"
            stroke="rgba(168,85,247,0.3)"
            strokeWidth="1"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: [0, 0.7, 0.3, 0], scale: [0.8, 1.15, 1.0, 0.95] }}
            transition={{ duration: 1.0, ease: "easeOut", delay: delayMs / 1000 }}
          />
        </g>
      ))}
    </svg>
  )
}

function DesktopServices({ items }: { items: any[] }) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.15 })
  const prefersReducedMotion = useReducedMotion()

  const [step, setStep] = useState(0)
  const [hovered, setHovered] = useState<number | null>(null)

  const [pulseTokens, setPulseTokens] = useState<Array<number | null>>([null, null, null])
  const pulseSeq = useRef(1)
  const clearPulseTimeouts = useRef<Array<any>>([null, null, null])

  const satelliteRef = useRef<HTMLDivElement | null>(null)
  const cardRefs = useRef<Array<HTMLDivElement | null>>([null, null, null])
  const measureRaf = useRef<number | null>(null)
  const [geometry, setGeometry] = useState<{
    center: { x: number; y: number }
    targets: Array<{ x: number; y: number } | null>
  }>(() => ({ center: { x: 500, y: 500 }, targets: [null, null, null] }))

  const measure = useCallback(() => {
    const container = containerRef.current
    if (!container) return

    const containerRect = container.getBoundingClientRect()
    if (!containerRect.width || !containerRect.height) return

    const scaleX = 1000 / containerRect.width
    const scaleY = 1000 / containerRect.height

    const toViewBox = (pt: { x: number; y: number }) => {
      return {
        x: (pt.x - containerRect.left) * scaleX,
        y: (pt.y - containerRect.top) * scaleY,
      }
    }

    const satRect = satelliteRef.current?.getBoundingClientRect()
    const satCenterPx = satRect
      ? { x: satRect.left + satRect.width / 2, y: satRect.top + satRect.height / 2 }
      : { x: containerRect.left + containerRect.width / 2, y: containerRect.top + containerRect.height / 2 }
    const center = toViewBox(satCenterPx)

    const targets = cardRefs.current.map((el) => {
      const r = el?.getBoundingClientRect()
      if (!r || !r.width || !r.height) return null

      const cardCenterPx = { x: r.left + r.width / 2, y: r.top + r.height / 2 }
      const cardCenter = toViewBox(cardCenterPx)

      const vx = cardCenter.x - center.x
      const vy = cardCenter.y - center.y
      const len = Math.sqrt(vx * vx + vy * vy) || 1

      const approxRadius = 0.46 * Math.min(r.width * scaleX, r.height * scaleY)
      const tx = cardCenter.x - (vx / len) * approxRadius
      const ty = cardCenter.y - (vy / len) * approxRadius

      return {
        x: Math.max(0, Math.min(1000, tx)),
        y: Math.max(0, Math.min(1000, ty)),
      }
    })

    setGeometry({
      center: { x: Math.max(0, Math.min(1000, center.x)), y: Math.max(0, Math.min(1000, center.y)) },
      targets,
    })
  }, [])

  const requestMeasure = useCallback(() => {
    if (measureRaf.current != null) return
    measureRaf.current = window.requestAnimationFrame(() => {
      measureRaf.current = null
      measure()
    })
  }, [measure])

  const triggerPulse = useCallback((idx: number) => {
    if (clearPulseTimeouts.current[idx]) clearTimeout(clearPulseTimeouts.current[idx])

    const token = pulseSeq.current++
    setPulseTokens((prev) => {
      const next = [...prev]
      next[idx] = token
      return next
    })

    clearPulseTimeouts.current[idx] = setTimeout(() => {
      setPulseTokens((prev) => {
        const next = [...prev]
        if (next[idx] === token) next[idx] = null
        return next
      })
    }, 2200)
  }, [])

  useEffect(() => {
    if (prefersReducedMotion) return

    let cancelled = false
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

    const sequence = async () => {
      setStep(1)
      await sleep(50)
      if (cancelled) return

      setStep(7)
      triggerPulse(0)
      triggerPulse(1)
      triggerPulse(2)
    }

    sequence()
    return () => {
      cancelled = true
    }
  }, [prefersReducedMotion, triggerPulse])

  useEffect(() => {
    requestMeasure()

    const container = containerRef.current
    if (!container) return

    const ro = new ResizeObserver(() => requestMeasure())
    ro.observe(container)
    if (satelliteRef.current) ro.observe(satelliteRef.current)
    cardRefs.current.forEach((el) => el && ro.observe(el))

    const onResize = () => requestMeasure()
    window.addEventListener("resize", onResize)

    return () => {
      ro.disconnect()
      window.removeEventListener("resize", onResize)
    }
  }, [isInView, requestMeasure])

  useEffect(() => {
    if (prefersReducedMotion) return

    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))
    const randInt = (min: number, max: number) => Math.floor(min + Math.random() * (max - min + 1))

    let cancelled = false

    const scheduleIdle = (idx: number) => {
      const scheduleNext = async () => {
        while (!cancelled && hovered === null) {
          await sleep(randInt(1200, 2800))
          if (cancelled || hovered !== null) return
          triggerPulse(idx)
        }
      }
      scheduleNext()
    }

    const scheduleHover = (idx: number) => {
      const loop = async () => {
        triggerPulse(idx)
        while (!cancelled && hovered === idx) {
          await sleep(700)
          if (cancelled || hovered !== idx) return
          triggerPulse(idx)
        }
      }
      loop()
    }

    clearPulseTimeouts.current.forEach((t, i) => {
      if (t) {
        clearTimeout(t)
        clearPulseTimeouts.current[i] = null
      }
    })

    if (hovered === null) {
      scheduleIdle(0)
      scheduleIdle(1)
      scheduleIdle(2)
    } else {
      scheduleHover(hovered)
    }

    return () => {
      cancelled = true
    }
  }, [hovered, prefersReducedMotion, triggerPulse])

  const [left, rightTop, bottom] = items

  const cardVisible = (_idx: number) => {
    return step >= 7
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-[500px] lg:min-h-[600px] hidden lg:block overflow-visible"
    >
      {/* Nebula gradient background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: [
            "radial-gradient(ellipse 58% 52% at 50% 50%, rgba(139, 92, 246, 0.12) 0%, transparent 70%)",
            "radial-gradient(ellipse 42% 38% at 41% 47%, rgba(59, 130, 246, 0.09) 0%, transparent 65%)",
            "radial-gradient(ellipse 32% 28% at 56% 55%, rgba(168, 85, 247, 0.08) 0%, transparent 60%)",
          ].join(", "),
        }}
      />

      {/* Waves */}
      {geometry.targets[0] && <DirectionalWaves id="wave-left" center={geometry.center} target={geometry.targets[0]} pulseToken={pulseTokens[0]} delayMs={0} />}
      {geometry.targets[1] && <DirectionalWaves id="wave-right" center={geometry.center} target={geometry.targets[1]} pulseToken={pulseTokens[1]} delayMs={90} />}
      {geometry.targets[2] && <DirectionalWaves id="wave-bottom" center={geometry.center} target={geometry.targets[2]} pulseToken={pulseTokens[2]} delayMs={150} />}

      {/* Center Satellite */}
      <motion.div
        className={[
          "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20",
          "w-[180px] h-[180px] lg:w-[230px] lg:h-[230px]",
          "transform-gpu",
        ].join(" ")}
        ref={satelliteRef}
        initial={{ scale: 0.88, opacity: 0, filter: "blur(6px)" }}
        animate={step >= 1 ? { scale: 1, opacity: 1, filter: "blur(0px)" } : { scale: 0.88, opacity: 0, filter: "blur(6px)" }}
        transition={{ type: "spring", stiffness: 240, damping: 22 }}
      >
        <div className="w-full h-full">
          <DotLottieReact
            src="/assets/lottie/satelite.lottie"
            loop
            autoplay
            style={{
              width: "100%",
              height: "100%",
              transform: "translateZ(0)",
              backfaceVisibility: "hidden",
            }}
          />
        </div>
      </motion.div>

      {/* Cards */}
      {left && (
        <motion.div
          className="absolute left-[1%] top-[15%] w-[36%] z-30"
          ref={(el) => {
            cardRefs.current[0] = el
          }}
          initial={{ opacity: 0, scale: 0.92, y: 18 }}
          animate={cardVisible(0) ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.92, y: 18 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          onMouseEnter={() => setHovered(0)}
          onMouseLeave={() => setHovered(null)}
          onFocus={() => setHovered(0)}
          onBlur={() => setHovered(null)}
        >
          <ServiceCard
            title={left.title}
            text={left.text}
            tags={left.tags}
            href={getLink(left.title)}
            imageSrc={getImage(left.title)}
            signalToken={pulseTokens[0]}
          />
        </motion.div>
      )}

      {rightTop && (
        <motion.div
          className="absolute right-[2%] top-[5%] w-[36%] z-30"
          ref={(el) => {
            cardRefs.current[1] = el
          }}
          initial={{ opacity: 0, scale: 0.92, y: 18 }}
          animate={cardVisible(1) ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.92, y: 18 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          onMouseEnter={() => setHovered(1)}
          onMouseLeave={() => setHovered(null)}
          onFocus={() => setHovered(1)}
          onBlur={() => setHovered(null)}
        >
          <ServiceCard
            title={rightTop.title}
            text={rightTop.text}
            tags={rightTop.tags}
            href={getLink(rightTop.title)}
            imageSrc={getImage(rightTop.title)}
            signalToken={pulseTokens[1]}
          />
        </motion.div>
      )}

      {bottom && (
        <motion.div
          className="absolute right-[24%] bottom-[0%] w-[42%] z-30"
          ref={(el) => {
            cardRefs.current[2] = el
          }}
          initial={{ opacity: 0, scale: 0.92, y: 18 }}
          animate={cardVisible(2) ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.92, y: 18 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          onMouseEnter={() => setHovered(2)}
          onMouseLeave={() => setHovered(null)}
          onFocus={() => setHovered(2)}
          onBlur={() => setHovered(null)}
        >
          <ServiceCard
            title={bottom.title}
            text={bottom.text}
            tags={bottom.tags}
            href={getLink(bottom.title)}
            imageSrc={getImage(bottom.title)}
            signalToken={pulseTokens[2]}
          />
        </motion.div>
      )}
    </div>
  )
}

export default function Services({ dict }: ServicesProps) {
  const items = (dict?.services?.items ?? []) as Array<{
    title: string
    text: string
    tags: string[]
  }>

  const title = dict?.services?.title || ""
  const words = title.split(" ")
  const lastWord = words.length > 0 ? words.pop() : ""
  const firstPart = words.join(" ")

  const sectionHeader = (
    <div className="text-center">
      <h2 className="font-serif text-[2.6rem] sm:text-[3.15rem] md:text-[3.6rem] leading-[1.05] tracking-tight text-black dark:text-white whitespace-pre-line text-balance">
        {firstPart} <span className="text-[#21569c]">{lastWord}</span>
      </h2>
      <p className="mt-4 text-sm sm:text-base leading-relaxed text-black/75 dark:text-white/75 max-w-[54ch] mx-auto">
        {dict.services.subtitle}
      </p>
    </div>
  )

  return (
    <section className="relative pt-14 pb-8 md:pt-12 md:pb-6">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop + Tablet: header rendered normally above the cards */}
        <div className="hidden md:block">{sectionHeader}</div>

        {/* Mobile: cinema scroll — sticky pin per service, scroll-driven kinetic typography */}
        <MobileServicesCinema
          items={items}
          header={sectionHeader}
          ctaText={dict.services.mobileCta}
          ctaButton={dict.services.mobileCtaButton}
        />

        {/* Tablet: simple vertical card list for md–lg range */}
        <div className="hidden md:flex lg:hidden flex-col gap-5 mt-10">
          {items.map((item) => (
            <ServiceCard
              key={item.title}
              title={item.title}
              text={item.text}
              tags={item.tags}
              href={getLink(item.title)}
              imageSrc={getImage(item.title)}
            />
          ))}
          {dict.services.mobileCta && dict.services.mobileCtaButton && (
            <div className="mt-4 text-center">
              <p className="text-sm leading-relaxed text-black/75 dark:text-white/75 max-w-[54ch] mx-auto">
                {dict.services.mobileCta}
              </p>
              <div className="mt-4 flex justify-center">
                <a href="#book">
                  <Button
                    variant="outline"
                    className="rounded-xl px-8 py-6 text-base border-black text-black hover:bg-black hover:text-white transition-all duration-300 hover:scale-105 cursor-pointer"
                  >
                    {dict.services.mobileCtaButton}
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </a>
              </div>
            </div>
          )}
        </div>

        <DesktopServices items={items} />
      </div>
    </section>
  )
}

