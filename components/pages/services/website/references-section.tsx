"use client"

import { useEffect, useState } from "react"
import { animate, motion, useMotionValue, useReducedMotion } from "framer-motion"
import { useRevealOnScroll } from "@/hooks/use-reveal-on-scroll"

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}

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
// CountUp – motion-value driven number animation
// ---------------------------------------------------------------------------
function CountUp({
  to,
  duration = 1.6,
  decimals = 0,
  decimalSep = ".",
  isRevealed,
  prefix = "",
  suffix = "",
  className,
}: {
  to: number
  duration?: number
  decimals?: number
  decimalSep?: string
  isRevealed: boolean
  prefix?: string
  suffix?: string
  className?: string
}) {
  const shouldReduceMotion = useReducedMotion()
  const value = useMotionValue(0)
  const [display, setDisplay] = useState("0")

  useEffect(() => {
    if (!isRevealed) return
    if (shouldReduceMotion) {
      setDisplay(decimals === 0 ? String(Math.round(to)) : to.toFixed(decimals).replace(".", decimalSep))
      return
    }
    const controls = animate(value, to, { duration, ease: "easeOut" })
    const unsub = value.on("change", (v) => {
      setDisplay(
        decimals === 0
          ? Math.round(v).toString()
          : v.toFixed(decimals).replace(".", decimalSep),
      )
    })
    return () => { controls.stop(); unsub() }
  }, [isRevealed, to, duration, decimals, decimalSep, value, shouldReduceMotion])

  return (
    <span className={className}>
      {prefix}{display}{suffix}
    </span>
  )
}

// ---------------------------------------------------------------------------
// Section
// ---------------------------------------------------------------------------
export default function ReferencesSection({ dict }: { dict: any }) {
  const refs = dict.servicesWebsite.references
  const eyebrow = dict.servicesWebsite.eyebrows.references
  const heading = useRevealOnScroll()
  const statsGrid = useRevealOnScroll({ margin: "-60px" })

  return (
    <section id="referenzen" className="relative bg-transparent py-[clamp(72px,9vw,140px)]">
      <div className="mx-auto max-w-[1240px] px-8">
        {/* Heading */}
        <div ref={heading.ref} className={`reveal-fade-up ${heading.isRevealed ? "revealed" : ""}`}>
          <span className="section-eyebrow">{eyebrow}</span>
          <h2 className="mt-[22px] font-serif text-[clamp(2.1rem,4.4vw,3.7rem)] leading-[1.02] tracking-[-0.02em] max-w-[22ch] text-[#15151a]">
            {refs.title}{" "}
            <em className="not-italic text-[#e6009b]">{refs.titleHighlight}</em>
          </h2>
        </div>

        {/* Stats */}
        <motion.div
          ref={statsGrid.ref}
          variants={containerVariants}
          initial="hidden"
          animate={statsGrid.isRevealed ? "visible" : "hidden"}
          className="mt-[64px] grid grid-cols-1 gap-[20px] sm:grid-cols-2 lg:grid-cols-4"
        >
          {refs.stats.map((stat: { value: string; label: string; detail: string }, idx: number) => {
            const { to, prefix, suffix, decimals, decimalSep } = parseStatValue(stat.value)
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="bg-white border border-[rgba(21,21,26,0.06)] rounded-[26px] p-[30px] shadow-[0_1px_2px_rgba(21,21,26,0.04),0_4px_14px_rgba(21,21,26,0.05)]"
              >
                <CountUp
                  to={to}
                  prefix={prefix}
                  suffix={suffix}
                  decimals={decimals}
                  decimalSep={decimalSep}
                  isRevealed={statsGrid.isRevealed}
                  duration={1.6 + idx * 0.1}
                  className="font-serif text-[clamp(2.6rem,4vw,3.4rem)] text-[#e6009b] leading-none tracking-[-0.02em]"
                />
                <p className="mt-[16px] font-semibold text-[1.05rem] text-[#15151a]">{stat.label}</p>
                <p className="mt-[10px] text-[0.9rem] text-[#50505c]">{stat.detail}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
