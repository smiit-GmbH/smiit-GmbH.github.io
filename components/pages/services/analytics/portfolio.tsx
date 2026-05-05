"use client"

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react"
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion"
import {
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  BrainCircuit,
  CalendarCheck,
  ChevronDown,
  ShieldCheck,
} from "lucide-react"
import { useRevealOnScroll } from "@/hooks/use-reveal-on-scroll"

const STRAND_COLORS = ["#7DBBFF", "#21569c", "#94A3B8"] as const
const ICONS = [BarChart3, ShieldCheck, BrainCircuit] as const

// ---------------------------------------------------------------------------
// CountUp – cheap motion-value driven number animation
// ---------------------------------------------------------------------------
function CountUp({
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
// Right-column visuals
// ---------------------------------------------------------------------------
function VisualShell({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`relative w-full max-w-[380px] aspect-[5/4] rounded-3xl bg-white border border-gray-100 shadow-[0_18px_44px_rgba(33,86,156,0.10)] p-5 sm:p-6 overflow-hidden ${className}`}
    >
      {children}
    </div>
  )
}

function BIVisual({ isRevealed }: { isRevealed: boolean }) {
  const bars = [42, 68, 54, 84, 60]
  const target = 78
  const kpis = [
    { label: "Umsatz", value: "+18%", trend: "up" as const },
    { label: "Conv.", value: "4.2%", trend: "up" as const },
    { label: "Churn", value: "-0.8%", trend: "down" as const },
  ]
  const W = 200
  const H = 100

  return (
    <VisualShell>
      <div className="flex items-baseline justify-between">
        <span className="text-[0.65rem] uppercase tracking-[0.18em] text-black/40 font-medium">Umsatz Q3</span>
        <CountUp
          to={184}
          isRevealed={isRevealed}
          suffix="K"
          className="font-serif text-2xl font-semibold text-[#21569c]"
        />
      </div>

      <div className="mt-3 grid grid-cols-3 gap-1.5">
        {kpis.map((kpi, i) => {
          const positive = kpi.trend === "up"
          const TrendIcon = positive ? ArrowUpRight : ArrowDownRight
          const tone = positive ? "text-emerald-600" : "text-rose-500"
          return (
            <motion.div
              key={kpi.label}
              initial={{ opacity: 0, y: 6 }}
              animate={isRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
              transition={{ duration: 0.4, delay: 0.15 + i * 0.08 }}
              className="rounded-lg bg-[#21569c]/[0.04] border border-[#21569c]/10 px-2 py-1.5"
            >
              <div className="text-[0.55rem] uppercase tracking-wider text-black/40 font-medium leading-none">
                {kpi.label}
              </div>
              <div className="mt-1 flex items-center gap-1">
                <span className={`text-[0.78rem] font-semibold ${tone}`}>{kpi.value}</span>
                <TrendIcon className={`h-3 w-3 ${tone}`} />
              </div>
            </motion.div>
          )
        })}
      </div>

      <div className="mt-3 relative h-[44%]">
        <div className="absolute inset-x-0 top-0 h-px bg-black/5" />
        <div className="absolute inset-x-0 top-1/2 h-px bg-black/5" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-black/5" />

        <div className="absolute inset-0 flex items-end gap-2">
          {bars.map((h, i) => (
            <motion.div
              key={i}
              className="flex-1 rounded-t-md bg-gradient-to-t from-[#7DBBFF] to-[#21569c]"
              initial={{ height: 0 }}
              animate={isRevealed ? { height: `${h}%` } : { height: 0 }}
              transition={{ duration: 0.7, delay: 0.3 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            />
          ))}
        </div>

        <svg
          viewBox={`0 0 ${W} ${H}`}
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full overflow-visible"
        >
          <motion.line
            x1="0"
            y1={H - target}
            x2={W}
            y2={H - target}
            stroke="#21569c"
            strokeWidth="0.8"
            strokeDasharray="3 3"
            strokeOpacity="0.55"
            initial={{ pathLength: 0 }}
            animate={isRevealed ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          />
        </svg>

        <motion.span
          className="absolute right-0 -translate-y-1/2 rounded-sm bg-white px-1 text-[0.5rem] font-semibold uppercase tracking-wider text-[#21569c]/70"
          style={{ top: `${100 - target}%` }}
          initial={{ opacity: 0 }}
          animate={isRevealed ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.4, delay: 1.1 }}
        >
          Ziel
        </motion.span>
      </div>
    </VisualShell>
  )
}

function GovernanceVisual({ isRevealed }: { isRevealed: boolean }) {
  const edges = [
    "M 56 50 C 110 50, 110 110, 160 110",
    "M 56 110 L 160 110",
    "M 56 170 C 110 170, 110 110, 160 110",
    "M 200 110 C 250 110, 250 50, 304 50",
    "M 200 110 L 304 110",
    "M 200 110 C 250 110, 250 170, 304 170",
  ]
  const nodes = [
    { x: 16, y: 38, label: "ERP" },
    { x: 16, y: 98, label: "CRM" },
    { x: 16, y: 158, label: "OPS" },
    { x: 304, y: 38, label: "BI" },
    { x: 304, y: 98, label: "ML" },
    { x: 304, y: 158, label: "API" },
  ]
  return (
    <VisualShell>
      <div className="flex items-baseline justify-between">
        <span className="text-[0.65rem] uppercase tracking-[0.18em] text-black/40 font-medium">Data Lineage</span>
        <span className="text-[0.65rem] font-medium text-[#21569c]">audited</span>
      </div>
      <div className="relative mt-3 flex-1 h-[78%]">
        <svg viewBox="0 0 360 220" className="absolute inset-0 w-full h-full">
          {edges.map((d, i) => (
            <motion.path
              key={i}
              d={d}
              fill="none"
              stroke="#21569c"
              strokeWidth="1.5"
              strokeOpacity="0.35"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={isRevealed ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 0.9, delay: 0.25 + i * 0.12, ease: "easeInOut" }}
            />
          ))}
          {nodes.map((n, i) => (
            <motion.g
              key={i}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={isRevealed ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.4, delay: 0.1 + (i % 3) * 0.08, ease: "easeOut" }}
              style={{ transformOrigin: `${n.x + 20}px ${n.y + 12}px` }}
            >
              <rect x={n.x} y={n.y} width="40" height="24" rx="6" fill="#EAF1FB" stroke="#21569c" strokeOpacity="0.4" />
              <text
                x={n.x + 20}
                y={n.y + 16}
                textAnchor="middle"
                fontSize="10"
                fontWeight="600"
                fill="#21569c"
                fontFamily="ui-sans-serif, system-ui, sans-serif"
              >
                {n.label}
              </text>
            </motion.g>
          ))}
          {/* Central transform node */}
          <motion.g
            initial={{ opacity: 0, scale: 0.6 }}
            animate={isRevealed ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.5, delay: 1.05, ease: "easeOut" }}
            style={{ transformOrigin: "180px 110px" }}
          >
            <rect x="160" y="98" width="40" height="24" rx="6" fill="#21569c" />
            <text
              x="180"
              y="114"
              textAnchor="middle"
              fontSize="10"
              fontWeight="700"
              fill="#fff"
              fontFamily="ui-sans-serif, system-ui, sans-serif"
            >
              GOV
            </text>
          </motion.g>
        </svg>
        {/* Compliance badge floats over the central node */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={isRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
          transition={{ duration: 0.45, delay: 1.4 }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[180%] flex items-center gap-1.5 rounded-full bg-[#21569c] px-2.5 py-1 text-[0.6rem] font-medium text-white shadow-md shadow-[#21569c]/30"
        >
          <ShieldCheck className="h-3 w-3" />
          DSGVO
        </motion.div>
      </div>
    </VisualShell>
  )
}

function MLVisual({ isRevealed }: { isRevealed: boolean }) {
  const layers = [
    [60, 110, 160], // input – 3
    [40, 90, 140, 190], // hidden – 4
    [60, 110, 160], // output – 3
  ]
  const xCols = [40, 180, 320]
  const edges: { x1: number; y1: number; x2: number; y2: number; key: string }[] = []
  layers[0].forEach((y1, i) =>
    layers[1].forEach((y2, j) => edges.push({ x1: xCols[0], y1, x2: xCols[1], y2, key: `e0-${i}-${j}` })),
  )
  layers[1].forEach((y1, i) =>
    layers[2].forEach((y2, j) => edges.push({ x1: xCols[1], y1, x2: xCols[2], y2, key: `e1-${i}-${j}` })),
  )

  return (
    <VisualShell>
      <div className="flex items-baseline justify-between">
        <span className="text-[0.65rem] uppercase tracking-[0.18em] text-black/40 font-medium">Model Inference</span>
        <span className="text-[0.65rem] font-medium text-[#94A3B8]">live</span>
      </div>
      <div className="relative mt-3 h-[78%]">
        <svg viewBox="0 0 360 230" className="absolute inset-0 w-full h-full">
          {/* Edges – first appear with pathLength then loop opacity */}
          {edges.map((e, i) => (
            <motion.line
              key={e.key}
              x1={e.x1}
              y1={e.y1}
              x2={e.x2}
              y2={e.y2}
              stroke="#94A3B8"
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0.15 }}
              animate={
                isRevealed
                  ? { pathLength: 1, opacity: [0.15, 0.7, 0.15] }
                  : { pathLength: 0, opacity: 0.15 }
              }
              transition={{
                pathLength: { duration: 0.7, delay: 0.2 + (i % 6) * 0.05, ease: "easeOut" },
                opacity: {
                  duration: 2.4,
                  repeat: Infinity,
                  repeatType: "loop",
                  delay: 1 + (i * 0.13) % 1.6,
                  ease: "easeInOut",
                },
              }}
            />
          ))}
          {/* Nodes */}
          {layers.map((col, ci) =>
            col.map((y, ri) => (
              <motion.circle
                key={`n-${ci}-${ri}`}
                cx={xCols[ci]}
                cy={y}
                r="6"
                fill={ci === 1 ? "#21569c" : "#fff"}
                stroke="#21569c"
                strokeWidth={ci === 1 ? 0 : 1.5}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={isRevealed ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.35, delay: 0.05 + ci * 0.15 + ri * 0.05 }}
              />
            )),
          )}
        </svg>
        {/* Prediction badge */}
        <motion.div
          initial={{ opacity: 0, x: -6 }}
          animate={isRevealed ? { opacity: 1, x: 0 } : { opacity: 0, x: -6 }}
          transition={{ duration: 0.5, delay: 1.4 }}
          className="absolute right-2 top-2 flex items-center gap-1 rounded-full bg-[#0B162D] px-2.5 py-1 text-[0.65rem] font-mono text-white shadow"
        >
          <span className="text-[#7DBBFF]">→</span>
          <CountUp to={0.89} isRevealed={isRevealed} duration={1.4} decimals={2} />
        </motion.div>
      </div>
    </VisualShell>
  )
}

const VISUALS = [BIVisual, GovernanceVisual, MLVisual] as const

// Mobile rail – single dark-blue strand on the left edge
function MobilePipeline({
  rowCenters,
  revealedRows,
  scrollYProgress,
  reducedMotion,
}: {
  rowCenters: number[]
  revealedRows: boolean[]
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"]
  reducedMotion: boolean
}) {
  const length = useTransform(scrollYProgress, [0.0, 0.7], [0, 1])
  return (
    <svg
      className="absolute left-0 top-0 h-full w-[40px] pointer-events-none"
      viewBox="0 0 40 1200"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <motion.path
        d="M 20 0 L 20 1200"
        fill="none"
        stroke="#21569c"
        strokeWidth="2"
        strokeOpacity="0.55"
        strokeLinecap="round"
        style={reducedMotion ? { pathLength: 1 } : { pathLength: length }}
      />
      {rowCenters.map((cy, i) => {
        const isActive = revealedRows[i]
        return (
          <g key={i}>
            <motion.circle
              cx={20}
              cy={cy}
              r={isActive ? 6 : 3}
              fill={STRAND_COLORS[i]}
              initial={false}
              animate={{ r: isActive ? 6 : 3, opacity: isActive ? 1 : 0.4 }}
              transition={{ duration: 0.5 }}
            />
            {isActive && (
              <circle
                className="pipeline-node-halo"
                cx={20}
                cy={cy}
                r="6"
                fill="none"
                stroke={STRAND_COLORS[i]}
                strokeWidth="2"
              />
            )}
          </g>
        )
      })}
    </svg>
  )
}

// ---------------------------------------------------------------------------
// BookCircleButton – circular CTA between text and visual
// ---------------------------------------------------------------------------
function BookCircleButton({ label, size = "lg" }: { label: string; size?: "lg" | "md" }) {
  const dimensions = size === "lg" ? "h-14 w-14" : "h-11 w-11"
  const iconSize = size === "lg" ? "h-5 w-5" : "h-4 w-4"
  return (
    <a
      href="#book"
      aria-label={label}
      title={label}
      className={`group relative inline-flex ${dimensions} items-center justify-center rounded-full bg-[#21569c] text-white shadow-[0_18px_36px_rgba(33,86,156,0.32)] transition-all duration-300 hover:scale-105 hover:bg-[#1a457d] hover:shadow-[0_22px_48px_rgba(33,86,156,0.45)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#21569c]/30`}
    >
      <motion.span
        aria-hidden="true"
        className="absolute inset-0 rounded-full border border-[#21569c]/40"
        initial={{ scale: 1, opacity: 0.6 }}
        animate={{ scale: [1, 1.18, 1], opacity: [0.6, 0, 0.6] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeOut" }}
      />
      <CalendarCheck className={`${iconSize} transition-transform duration-300 group-hover:scale-110`} />
      <span className="sr-only">{label}</span>
    </a>
  )
}

// ---------------------------------------------------------------------------
// PortfolioRow – text + visual block, also tracks its vertical center for the SVG
// ---------------------------------------------------------------------------
function RowText({
  item,
  index,
  dict,
  alignRight,
}: {
  item: any
  index: number
  dict: any
  alignRight: boolean
}) {
  const [isOpen, setIsOpen] = useState(false)
  const Icon = ICONS[index] ?? BarChart3
  const accent = STRAND_COLORS[index]
  const t = dict.servicesAnalytics.portfolio

  return (
    <div className={alignRight ? "md:text-right" : ""}>
      <div className={`inline-flex items-center gap-3 mb-4 ${alignRight ? "md:flex-row-reverse" : ""}`}>
        <div
          className="flex h-11 w-11 items-center justify-center rounded-2xl"
          style={{ backgroundColor: `${accent}1F`, color: accent }}
        >
          <Icon className="h-5 w-5" style={{ color: accent }} />
        </div>
        <span className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-black/40">
          {`0${index + 1}`}
        </span>
      </div>

      <h3 className="font-serif text-2xl sm:text-3xl lg:text-[2rem] leading-tight tracking-tight text-black">
        {item.title}
      </h3>

      <p
        className={`mt-4 text-[0.95rem] sm:text-base leading-relaxed text-black/65 max-w-[52ch] lg:max-w-[44ch] ${
          alignRight ? "md:ml-auto" : ""
        }`}
      >
        {item.shortDesc}
      </p>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="details"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className={`overflow-hidden ${alignRight ? "md:ml-auto" : ""}`}
          >
            <div className="mt-4 space-y-3 max-w-[52ch] lg:max-w-[44ch]">
              {item.details.split("\n\n").map((paragraph: string, i: number) => (
                <p key={i} className="text-sm sm:text-[0.95rem] leading-relaxed text-black/55">
                  {paragraph}
                </p>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={`mt-5 flex ${alignRight ? "md:justify-end" : ""}`}>
        <button
          type="button"
          onClick={() => setIsOpen((o) => !o)}
          className="group inline-flex items-center gap-2 text-sm font-medium text-[#21569c] hover:text-[#1a457d] transition-colors"
          aria-expanded={isOpen}
        >
          {isOpen ? t.learnLess : t.learnMore}
          <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
            <ChevronDown className="h-4 w-4" />
          </motion.span>
        </button>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Main section
// ---------------------------------------------------------------------------
export default function PortfolioSection({ dict }: { dict: any }) {
  const portfolio = dict.servicesAnalytics.portfolio
  const items: any[] = portfolio.items ?? []
  const reducedMotion = useReducedMotion() ?? false

  const heading = useRevealOnScroll<HTMLDivElement>()
  const sectionRef = useRef<HTMLElement | null>(null)
  const mobilePipelineContainerRef = useRef<HTMLDivElement | null>(null)
  const mobileRowRefs = useRef<Array<HTMLDivElement | null>>([])

  const { scrollYProgress } = useScroll({
    target: sectionRef as any,
    offset: ["start end", "end start"],
  })

  const [mobileRowCenters, setMobileRowCenters] = useState<number[]>(() => items.map((_, i) => 200 + i * 400))

  const computeCenters = useCallback(() => {
    const mContainer = mobilePipelineContainerRef.current
    if (mContainer) {
      const mRect = mContainer.getBoundingClientRect()
      if (mRect.height > 0) {
        const next = mobileRowRefs.current.map((row) => {
          if (!row) return 0
          const r = row.getBoundingClientRect()
          const rel = r.top + r.height / 2 - mRect.top
          return Math.max(0, Math.min(1200, (rel / mRect.height) * 1200))
        })
        setMobileRowCenters(next)
      }
    }
  }, [])

  useLayoutEffect(() => {
    computeCenters()

    const observers: ResizeObserver[] = []
    const obs = new ResizeObserver(() => computeCenters())
    if (mobilePipelineContainerRef.current) obs.observe(mobilePipelineContainerRef.current)
    mobileRowRefs.current.forEach((el) => el && obs.observe(el))
    observers.push(obs)

    window.addEventListener("resize", computeCenters)
    return () => {
      observers.forEach((o) => o.disconnect())
      window.removeEventListener("resize", computeCenters)
    }
  }, [computeCenters, items.length])

  // Per-row reveal hooks – two sets because the desktop and mobile trees coexist
  // (only one is visually present at a time, but both mount). One IntersectionObserver
  // per element keeps each tree's observer hooked to the correct DOM node, and we OR
  // the two so the row "reveals" as soon as whichever variant is on-screen fires.
  const dReveal0 = useRevealOnScroll<HTMLDivElement>({ margin: "-120px" })
  const dReveal1 = useRevealOnScroll<HTMLDivElement>({ margin: "-120px" })
  const dReveal2 = useRevealOnScroll<HTMLDivElement>({ margin: "-120px" })
  const mReveal0 = useRevealOnScroll<HTMLDivElement>({ margin: "-120px" })
  const mReveal1 = useRevealOnScroll<HTMLDivElement>({ margin: "-120px" })
  const mReveal2 = useRevealOnScroll<HTMLDivElement>({ margin: "-120px" })
  const desktopReveals = [dReveal0, dReveal1, dReveal2]
  const mobileReveals = [mReveal0, mReveal1, mReveal2]
  const revealedRows = desktopReveals.map((d, i) => d.isRevealed || mobileReveals[i].isRevealed)

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-2 sm:pt-4 md:pt-6">
        <div
          ref={heading.ref}
          className={`text-center mb-10 sm:mb-12 md:mb-16 reveal-fade-up ${heading.isRevealed ? "revealed" : ""}`}
        >
          <span className="section-eyebrow justify-center">{dict.servicesAnalytics.eyebrows?.portfolio}</span>
          <h2 className="font-serif text-[2.2rem] sm:text-[2.4rem] md:text-[3rem] leading-[1.1] tracking-tight text-black">
            {portfolio.title} <span className="text-[#21569c]">{portfolio.titleHighlight}</span>
          </h2>
          <p className="mt-3 sm:mt-4 md:mt-6 text-[0.9rem] sm:text-base md:text-lg leading-relaxed text-black/60 max-w-[60ch] mx-auto">
            {portfolio.subtitle}
          </p>
        </div>
      </div>

      {/* Tablet + Desktop: alternating rows -------------------------------- */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 hidden md:block">
        <div className="relative pb-12 lg:pb-16">
          <div className="flex flex-col gap-y-20 lg:gap-y-32">
            {items.map((item, i) => {
              const Visual = VISUALS[i] ?? BIVisual
              const textOnLeft = i % 2 === 0
              const textBlock = (
                <div
                  className={`relative z-10 flex ${textOnLeft ? "justify-end pr-3 lg:pr-8" : "justify-start pl-3 lg:pl-8"}`}
                >
                  <div className="max-w-[440px]">
                    <RowText item={item} index={i} dict={dict} alignRight={textOnLeft} />
                  </div>
                </div>
              )
              const visualBlock = (
                <div
                  className={`relative z-10 flex ${textOnLeft ? "justify-start pl-3 lg:pl-8" : "justify-end pr-3 lg:pr-8"}`}
                >
                  <Visual isRevealed={revealedRows[i]} />
                </div>
              )
              return (
                <div
                  key={i}
                  ref={(el) => {
                    desktopReveals[i].ref.current = el
                  }}
                  className="grid grid-cols-[1fr_auto_1fr] items-center gap-x-3 lg:gap-x-4"
                >
                  {textOnLeft ? textBlock : visualBlock}
                  <div className="relative z-10 flex justify-center">
                    <BookCircleButton label={portfolio.bookCta} size="lg" />
                  </div>
                  {textOnLeft ? visualBlock : textBlock}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Mobile only: stacked with left rail ---------------------------- */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 md:hidden">
        <div ref={mobilePipelineContainerRef} className="relative pb-12">
          <MobilePipeline
            rowCenters={mobileRowCenters}
            revealedRows={revealedRows}
            scrollYProgress={scrollYProgress}
            reducedMotion={reducedMotion}
          />
          <div className="ml-[56px] flex flex-col gap-y-16">
            {items.map((item, i) => {
              const Visual = VISUALS[i] ?? BIVisual
              return (
                <div
                  key={i}
                  ref={(el) => {
                    mobileRowRefs.current[i] = el
                    mobileReveals[i].ref.current = el
                  }}
                  className="flex flex-col"
                >
                  <div className="flex justify-start">
                    <Visual isRevealed={revealedRows[i]} />
                  </div>
                  <div className="relative z-10 -my-4 flex justify-center">
                    <BookCircleButton label={portfolio.bookCta} size="md" />
                  </div>
                  <RowText item={item} index={i} dict={dict} alignRight={false} />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
