"use client"

import { motion, useTransform, type MotionValue } from "framer-motion"
import LocalizedLink from "../../../localized-link"
import { TagPill } from "./service-card"
import { getAccent, getLink } from "./service-meta"

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

export function ServiceCinemaLayer({
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
    idx === 0 ? [0, 0, 0, -22] : idx === total - 1 ? [22, 0, 0, 0] : [22, 0, 0, -22]
  const layerY = useTransform(scrollYProgress, fadeStops, slideValues)
  const layerPointerEvents = useTransform(layerOpacity, (v) => (v >= 0.5 ? "auto" : "none"))

  const r = (s: number, e: number): [number, number] => [sliceStart + sliceLen * s, sliceStart + sliceLen * e]

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
