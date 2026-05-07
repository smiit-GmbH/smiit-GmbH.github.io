"use client"

import { useRef } from "react"
import {
  motion,
  type MotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion"

interface ManifestBandProps {
  dict: any
}

function KineticWord({
  word,
  isLast,
  scrollYProgress,
  start,
  end,
  withBlur,
}: {
  word: string
  isLast: boolean
  scrollYProgress: MotionValue<number>
  start: number
  end: number
  withBlur: boolean
}) {
  const opacity = useTransform(scrollYProgress, [start, end], [0, 1])
  const y = useTransform(scrollYProgress, [start, end], [12, 0])
  const blurAmt = useTransform(scrollYProgress, [start, end], [withBlur ? 10 : 0, 0])
  const filter = useTransform(blurAmt, (b) => (b > 0.05 ? `blur(${b}px)` : "blur(0px)"))

  return (
    <motion.span
      style={{ opacity, y, filter, display: "inline-block", willChange: "opacity, transform, filter" }}
    >
      {word}
      {!isLast ? " " : ""}
    </motion.span>
  )
}

function KineticLine({
  text,
  scrollYProgress,
  rangeStart,
  rangeEnd,
  withBlur = false,
  reduceMotion,
}: {
  text: string
  scrollYProgress: MotionValue<number>
  rangeStart: number
  rangeEnd: number
  withBlur?: boolean
  reduceMotion: boolean
}) {
  const words = text.split(/\s+/).filter(Boolean)
  if (reduceMotion) {
    return <>{text}</>
  }
  const span = (rangeEnd - rangeStart) / Math.max(1, words.length)
  const wordWindow = Math.max(span * 1.6, 0.04)
  return (
    <>
      {words.map((word, i) => {
        const start = rangeStart + i * span
        const end = Math.min(rangeEnd, start + wordWindow)
        return (
          <KineticWord
            key={`${word}-${i}`}
            word={word}
            isLast={i === words.length - 1}
            scrollYProgress={scrollYProgress}
            start={start}
            end={end}
            withBlur={withBlur}
          />
        )
      })}
    </>
  )
}

export default function ManifestBand({ dict }: ManifestBandProps) {
  const manifest = dict?.servicesApps?.manifest

  const containerRef = useRef<HTMLElement>(null)
  const shouldReduceMotion = useReducedMotion()
  const reduceMotion = !!shouldReduceMotion

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  // Desktop: parallax-Y + opacity peak
  const leadOpacity = useTransform(scrollYProgress, [0.05, 0.25, 0.7, 0.95], [0, 1, 1, 0.7])
  const leadY = useTransform(scrollYProgress, [0, 1], [40, -40])
  const emphasisOpacity = useTransform(scrollYProgress, [0.18, 0.38, 0.7, 0.95], [0, 1, 1, 0.85])
  const emphasisY = useTransform(scrollYProgress, [0, 1], [60, -60])

  const usesMotion = !shouldReduceMotion

  return (
    <section
      ref={containerRef}
      data-header-tone="dark"
      className="relative overflow-hidden bg-[#1A1719] text-white lg:min-h-[90vh]"
    >
      {/* Soft curve transition from portfolio (white) into manifest-band (dark) */}
      <svg
        aria-hidden
        viewBox="0 0 100 10"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-[80px] w-full sm:h-[120px] lg:h-[160px]"
      >
        <path
          d="M 0 0 L 100 0 L 100 7 L 85 7 C 80 7, 80 4, 75 4 L 25 4 C 20 4, 20 7, 15 7 L 0 7 Z"
          fill="#F3F3EE"
        />
      </svg>

      {/* Subtle grid texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="sticky top-0 flex min-h-[58vh] items-center justify-center px-5 py-16 sm:px-8 sm:py-20 lg:min-h-[80dvh] lg:py-24">
        <div className="relative z-10 mx-auto max-w-[1200px] text-center">

          <div className="lg:hidden">
            <h2 className="font-serif text-[2rem] leading-[1.05] tracking-tight text-white/85 sm:text-[2.6rem] md:text-[3.2rem]">
              <KineticLine
                text={manifest?.lead ?? ""}
                scrollYProgress={scrollYProgress}
                rangeStart={0.02}
                rangeEnd={0.22}
                reduceMotion={reduceMotion}
              />
            </h2>
            <h2 className="mt-2 font-serif italic text-[2rem] leading-[1.05] tracking-tight text-[#FA85F4] sm:text-[2.6rem] md:text-[3.2rem]">
              <KineticLine
                text={manifest?.emphasis ?? ""}
                scrollYProgress={scrollYProgress}
                rangeStart={0.18}
                rangeEnd={0.42}
                withBlur
                reduceMotion={reduceMotion}
              />
            </h2>
          </div>

          {/* DESKTOP — parallax + opacity peak */}
          <div className="hidden lg:block">
            <motion.h2
              style={usesMotion ? { opacity: leadOpacity, y: leadY } : undefined}
              className="mt-10 font-serif text-[2rem] leading-[1.05] tracking-tight text-white/85 sm:text-[2.6rem] md:text-[3.2rem] lg:text-[3.8rem] xl:text-[4.4rem]"
            >
              {manifest?.lead}
            </motion.h2>

            <motion.h2
              style={usesMotion ? { opacity: emphasisOpacity, y: emphasisY } : undefined}
              className="mt-2 font-serif text-[2rem] leading-[1.05] tracking-tight sm:text-[2.6rem] md:text-[3.2rem] lg:text-[3.8rem] xl:text-[4.4rem]"
            >
              <span className="bg-gradient-to-r from-white via-[#FDD0F9] to-[#FA85F4] bg-clip-text italic text-transparent">
                {manifest?.emphasis}
              </span>
            </motion.h2>
          </div>

        </div>
      </div>

      {/* Solid floor strip — guarantees clean #F3F3EE at the section boundary
          even if the SVG wave above has any sub-pixel AA artifacts. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-2 bg-[#F3F3EE]"
      />

      {/* Soft curve transition from manifest-band (dark) into next section (light).
          overflow-visible + path extended to y=11 lets the bottom edge render past
          the section's overflow-hidden boundary, so the AA seam is clipped away. */}
      <svg
        aria-hidden
        viewBox="0 0 100 10"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[80px] w-full overflow-visible sm:h-[120px] lg:h-[160px]"
      >
        <path
          d="M 0 11 L 100 11 L 100 3 L 85 3 C 80 3, 80 6, 75 6 L 25 6 C 20 6, 20 3, 15 3 L 0 3 Z"
          fill="#F3F3EE"
        />
      </svg>
    </section>
  )
}
