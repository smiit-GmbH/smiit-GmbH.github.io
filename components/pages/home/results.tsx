"use client"

import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import { motion, useInView, useSpring, useTransform } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import LocalizedLink from "../../localized-link"
import type { Locale } from "@/lib/dictionary"

interface ResultsProps {
  dict: any
  locale: Locale
}

function CountUp({
  value,
  locale,
  className,
}: {
  value: string
  locale: Locale
  className?: string
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-20px" })
  
  const match = value.match(/^([^\d]*)(\d+(?:[\.,]\d+)?)([^\d]*)$/)
  const prefix = match ? match[1] : ""
  const rawNumber = match ? match[2] : "0"
  const normalizedNumber = rawNumber.replace(",", ".")
  const number = match ? Number.parseFloat(normalizedNumber) : 0
  const suffix = match ? match[3] : value // Fallback if no number found

  const fractionDigits = (() => {
    const m = rawNumber.match(/[\.,](\d+)$/)
    return m ? m[1].length : 0
  })()

  const formatter = new Intl.NumberFormat(locale, {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  })

  const spring = useSpring(0, { mass: 1, stiffness: 50, damping: 20 })
  const display = useTransform(spring, (current) => {
    if (!match) return value
    const formatted = formatter.format(current)
    return `${prefix}${formatted}${suffix}`
  })

  useEffect(() => {
    if (isInView && match) {
      spring.set(number)
    }
  }, [isInView, number, spring, match])

  return <motion.span ref={ref} className={className}>{display}</motion.span>
}

function ResultCard({ item, index }: { item: any; index: number }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-[1.5rem] p-8 shadow-sm flex flex-col h-full hover:shadow-xl transition-shadow duration-300 border border-transparent hover:border-black/5"
    >
      <div className="text-[#F703EB] text-5xl font-medium mb-4">
        <CountUp value={item.value} locale={item.locale} />
      </div>
      <h3 className="text-lg font-medium text-black mb-4">
        {item.label}
      </h3>
      <p className="text-gray-600 text-sm leading-relaxed mt-auto">
        {item.text}
      </p>
    </motion.div>
  )
}

export default function Results({ dict, locale }: ResultsProps) {
  const scrollerRef = useRef<HTMLDivElement | null>(null)

  const titleUnderlinePathRef = useRef<SVGPathElement | null>(null)
  const titleUnderlineInView = useInView(titleUnderlinePathRef, {
    // allow retrigger when user scrolls away and back
    once: false,
    margin: "-20px",
  })
  const underlineTimerRef = useRef<number | null>(null)
  const [showTitleUnderline, setShowTitleUnderline] = useState(false)

  const [mobileScrollProgress, setMobileScrollProgress] = useState(0)
  const [showMobileIndicator, setShowMobileIndicator] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return

    const mql = window.matchMedia("(min-width: 768px)")

    let raf = 0
    const update = () => {
      raf = 0
      const scrollerEl = scrollerRef.current
      if (!scrollerEl) return

      if (mql.matches) {
        setShowMobileIndicator(false)
        return
      }

      const maxLeft = scrollerEl.scrollWidth - scrollerEl.clientWidth
      const canScroll = maxLeft > 1
      setShowMobileIndicator(canScroll)

      const p = canScroll ? scrollerEl.scrollLeft / maxLeft : 0
      const clamped = Math.max(0, Math.min(1, Number.isFinite(p) ? p : 0))
      setMobileScrollProgress(clamped)
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

  useEffect(() => {
    if (!titleUnderlineInView) return

    // Show underline for 5 seconds after entering view
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

  return (
    <section className="bg-background py-16 md:py-16 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-20"
        >
          <h2 className="font-serif text-[2.6rem] sm:text-[3.15rem] md:text-[3.6rem] leading-tight text-black max-w-4xl mx-auto">
            {dict.results.titlePrefix}
            <span className="text-[#F703EB] inline-block relative isolate z-0">
              {dict.results.titleHighlight}
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
                    showTitleUnderline
                      ? { pathLength: 1, opacity: 1 }
                      : { pathLength: 0, opacity: 0 }
                  }
                  transition={{
                    pathLength: { duration: 0.85, ease: "easeOut" },
                    opacity: { duration: 0.2 },
                  }}
                />
              </motion.svg>
            </span>
            {dict.results.titleSuffix}
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="mb-8 md:mb-20">
          {/* Mobile: horizontal carousel */}
          <div className="md:hidden">
            <div
              ref={scrollerRef}
              className="overflow-x-auto pb-6 no-scrollbar snap-x snap-mandatory"
            >
              <div className="flex min-w-max gap-4 px-4 sm:px-6">
                {dict.results.items.map((item: any, index: number) => (
                  <div
                    key={index}
                    className="snap-center shrink-0 w-[72vw] max-w-[360px]"
                  >
                    <ResultCard item={{ ...item, locale }} index={index} />
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile-only scroll progress indicator */}
            <div className="flex justify-center pt-2 pb-4">
              {showMobileIndicator && (
                <div
                  className="relative h-1.5 w-24 rounded-full bg-black/5 overflow-hidden"
                  aria-hidden="true"
                >
                  <div
                    className="absolute top-0 left-0 h-full w-8 rounded-full bg-black"
                    style={{
                      transform: `translateX(${mobileScrollProgress * (96 - 32)}px)`,
                    }}
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
            variants={{
              visible: { transition: { staggerChildren: 0.1 } },
            }}
            className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {dict.results.items.map((item: any, index: number) => (
              <ResultCard key={index} item={{ ...item, locale }} index={index} />
            ))}
          </motion.div>
        </div>

        {/* Button */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="flex justify-center"
        >
          <LocalizedLink href="/contact">
            <Button
              variant="outline"
              className="rounded-xl px-8 py-6 text-base border-black text-black hover:bg-black hover:text-white transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              {dict.results.button}
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </LocalizedLink>
        </motion.div>
      </div>
    </section>
  )
}
