"use client"

import { useEffect, useRef, useState } from "react"
import { animate, motion, useInView, useMotionValue, useReducedMotion } from "framer-motion"

// ---------------------------------------------------------------------------
// Parses a stat string like "70+", "Ø 3,6", "100%" into animatable parts
// ---------------------------------------------------------------------------
function parseStatValue(raw: string): {
  to: number
  prefix: string
  suffix: string
  decimals: number
  decimalSep: string
} {
  const m = raw.match(/^([^0-9]*)(\d+[.,]?\d*)([^0-9,.]*)$/)
  if (!m) return { to: 0, prefix: raw, suffix: "", decimals: 0, decimalSep: "." }

  const prefix = m[1]
  const numStr = m[2]
  const suffix = m[3]
  const decimalSep = numStr.includes(",") ? "," : "."
  const normalized = numStr.replace(",", ".")
  const to = parseFloat(normalized)
  const decimals = normalized.includes(".") ? normalized.split(".")[1].length : 0

  return { to, prefix, suffix, decimals, decimalSep }
}

// ---------------------------------------------------------------------------
// CountUp – self-triggering number animation (matches HomePage Results)
// ---------------------------------------------------------------------------
function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-20px" })
  const shouldReduceMotion = useReducedMotion()
  const { to, prefix, suffix, decimals, decimalSep } = parseStatValue(value)
  const mv = useMotionValue(0)
  const [display, setDisplay] = useState("0")

  useEffect(() => {
    const format = (v: number) =>
      decimals === 0 ? Math.round(v).toString() : v.toFixed(decimals).replace(".", decimalSep)

    if (!inView) return
    if (shouldReduceMotion) {
      setDisplay(format(to))
      return
    }
    const controls = animate(mv, to, { duration: 1.6, ease: "easeOut" })
    const unsub = mv.on("change", (v) => setDisplay(format(v)))
    return () => {
      controls.stop()
      unsub()
    }
  }, [inView, to, decimals, decimalSep, shouldReduceMotion, mv])

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  )
}

// ---------------------------------------------------------------------------
// Stat card – matches HomePage ResultCard styling
// ---------------------------------------------------------------------------
function StatCard({ item, index }: { item: { value: string; label: string; detail: string }; index: number }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-[1.5rem] p-8 shadow-sm flex flex-col h-full hover:shadow-xl transition-shadow duration-300 border border-transparent hover:border-black/5"
    >
      <div className="text-[#F703EB] text-5xl font-medium mb-4">
        <CountUp value={item.value} />
      </div>
      <h3 className="text-lg font-medium text-black mb-4">{item.label}</h3>
      <p className="text-gray-600 text-sm leading-relaxed mt-auto">{item.detail}</p>
    </motion.div>
  )
}

// ---------------------------------------------------------------------------
// Section
// ---------------------------------------------------------------------------
export default function ReferencesSection({ dict }: { dict: any }) {
  const refs = dict.servicesWebsite.references
  const eyebrow = dict.servicesWebsite.eyebrows.references
  const stats = (refs.stats ?? []) as { value: string; label: string; detail: string }[]

  // Animated title underline (matches HomePage)
  const titleUnderlinePathRef = useRef<SVGPathElement | null>(null)
  const titleUnderlineInView = useInView(titleUnderlinePathRef, { once: false, margin: "-20px" })
  const underlineTimerRef = useRef<number | null>(null)
  const [showTitleUnderline, setShowTitleUnderline] = useState(false)

  // Mobile carousel scroll progress indicator (matches HomePage)
  const scrollerRef = useRef<HTMLDivElement | null>(null)
  const [mobileScrollProgress, setMobileScrollProgress] = useState(0)
  const [showMobileIndicator, setShowMobileIndicator] = useState(false)
  const mobileScrollProgressRef = useRef(0)
  const mobileIndicatorRef = useRef(false)

  useEffect(() => {
    if (!titleUnderlineInView) return
    setShowTitleUnderline(true)
    if (underlineTimerRef.current) window.clearTimeout(underlineTimerRef.current)
    underlineTimerRef.current = window.setTimeout(() => {
      setShowTitleUnderline(false)
      underlineTimerRef.current = null
    }, 5000)
    return () => {
      if (underlineTimerRef.current) {
        window.clearTimeout(underlineTimerRef.current)
        underlineTimerRef.current = null
      }
    }
  }, [titleUnderlineInView])

  useEffect(() => {
    if (typeof window === "undefined") return
    const mql = window.matchMedia("(min-width: 768px)")

    let raf = 0
    const update = () => {
      raf = 0
      const scrollerEl = scrollerRef.current
      if (!scrollerEl) return

      if (mql.matches) {
        if (mobileIndicatorRef.current) {
          mobileIndicatorRef.current = false
          setShowMobileIndicator(false)
        }
        if (mobileScrollProgressRef.current !== 0) {
          mobileScrollProgressRef.current = 0
          setMobileScrollProgress(0)
        }
        return
      }

      const maxLeft = scrollerEl.scrollWidth - scrollerEl.clientWidth
      const canScroll = maxLeft > 1
      if (canScroll !== mobileIndicatorRef.current) {
        mobileIndicatorRef.current = canScroll
        setShowMobileIndicator(canScroll)
      }

      const p = canScroll ? scrollerEl.scrollLeft / maxLeft : 0
      const clamped = Math.max(0, Math.min(1, Number.isFinite(p) ? p : 0))
      const quantized = Math.round(clamped * 100) / 100
      if (quantized !== mobileScrollProgressRef.current) {
        mobileScrollProgressRef.current = quantized
        setMobileScrollProgress(quantized)
      }
    }

    const schedule = () => {
      if (raf) return
      raf = window.requestAnimationFrame(update)
    }

    const scrollerEl = scrollerRef.current
    if (!scrollerEl) return

    update()
    scrollerEl.addEventListener("scroll", schedule, { passive: true })
    window.addEventListener("resize", schedule)
    mql.addEventListener("change", schedule)

    return () => {
      scrollerEl.removeEventListener("scroll", schedule)
      window.removeEventListener("resize", schedule)
      mql.removeEventListener("change", schedule)
      if (raf) window.cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section
      id="references"
      className="relative overflow-hidden bg-transparent pt-[clamp(48px,6vw,96px)] pb-[clamp(56px,13.5vw,140px)]"
    >
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-20"
        >
          <span className="section-eyebrow justify-center">{eyebrow}</span>
          <h2 className="font-serif text-[2.2rem] sm:text-[2.4rem] md:text-[3rem] leading-tight tracking-tight text-black max-w-4xl mx-auto">
            {refs.title}{" "}
            <span className="text-[#F703EB] inline-block relative isolate z-0">
              {refs.titleHighlight}
              <motion.svg
                className="pointer-events-none absolute w-full h-3 -bottom-1 left-0 text-[#F703EB]/45 z-[-1]"
                viewBox="0 0 100 10"
                preserveAspectRatio="none"
              >
                <motion.path
                  ref={titleUnderlinePathRef}
                  d="M0 5 Q 50 10 100 5"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={
                    showTitleUnderline ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }
                  }
                  transition={{
                    pathLength: { duration: 0.85, ease: "easeOut" },
                    opacity: { duration: 0.2 },
                  }}
                />
              </motion.svg>
            </span>
          </h2>
        </motion.div>

        {/* Cards */}
        <div>
          {/* Mobile: horizontal carousel */}
          <div className="md:hidden">
            <div ref={scrollerRef} className="overflow-x-auto pb-6 no-scrollbar snap-x snap-mandatory">
              <div className="flex min-w-max gap-4 px-4 sm:px-6">
                {stats.map((item, index) => (
                  <div key={index} className="snap-center shrink-0 w-[72vw] max-w-[360px]">
                    <StatCard item={item} index={index} />
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile-only scroll progress indicator */}
            <div className="flex justify-center pt-2 pb-4">
              {showMobileIndicator && (
                <div className="relative h-1.5 w-24 rounded-full bg-black/5 overflow-hidden" aria-hidden="true">
                  <div
                    className="absolute top-0 left-0 h-full w-8 rounded-full bg-black"
                    style={{ transform: `translateX(${mobileScrollProgress * (96 - 32)}px)` }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Desktop/Tablet: grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {stats.map((item, index) => (
              <StatCard key={index} item={item} index={index} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
