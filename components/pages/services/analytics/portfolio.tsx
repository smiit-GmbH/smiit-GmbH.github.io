"use client"

import { useEffect, useRef, useState } from "react"
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
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
  X,
} from "lucide-react"
import { useRevealOnScroll } from "@/hooks/use-reveal-on-scroll"
import { useActiveInView } from "@/hooks/use-active-in-view"
import { useLenis } from "@/components/smooth-scroll-provider"

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

function BIVisual({ isRevealed, labels }: { isRevealed: boolean; labels?: any }) {
  const bars = [42, 68, 54, 84, 60]
  const target = 78
  const kpis = [
    { label: labels?.bi?.kpiRevenue ?? "Umsatz", value: "+18%", trend: "up" as const },
    { label: "Conv.", value: "4.2%", trend: "up" as const },
    { label: "Churn", value: "-0.8%", trend: "down" as const },
  ]
  const W = 200
  const H = 100

  return (
    <VisualShell>
      <div className="flex items-baseline justify-between">
        <span className="text-[0.65rem] uppercase tracking-[0.18em] text-black/40 font-medium">{labels?.bi?.label ?? "Umsatz Q3"}</span>
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
          const tone = positive ? "text-green-400" : "text-red-400"
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
          {labels?.bi?.target ?? "Ziel"}
        </motion.span>
      </div>
    </VisualShell>
  )
}

function GovernanceVisual({ isRevealed, labels }: { isRevealed: boolean; labels?: any }) {
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
          {labels?.governance?.badge ?? "DSGVO"}
        </motion.div>
      </div>
    </VisualShell>
  )
}

function MLVisual({ isRevealed, labels }: { isRevealed: boolean; labels?: any }) {
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

  const { ref, inView } = useActiveInView()

  return (
    <VisualShell>
      <div className="flex items-baseline justify-between">
        <span className="text-[0.65rem] uppercase tracking-[0.18em] text-black/40 font-medium">Model Inference</span>
        <span className="text-[0.65rem] font-medium text-[#94A3B8]">live</span>
      </div>
      <div ref={ref} className="relative mt-3 h-[78%]">
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
                  ? { pathLength: 1, opacity: inView ? [0.15, 0.7, 0.15] : 0.15 }
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

// ---------------------------------------------------------------------------
// Mobile portfolio — vertical stack with mobile-tuned live visuals per service.
// The desktop SVG visuals don't read well at phone widths because their internal
// labels are sized in viewBox units (they shrink with the container and become
// illegible). The mobile counterparts below use HTML pills for labels so text
// stays sharp, and are sized for ~320–400px card widths.
// ---------------------------------------------------------------------------

function MobileVisualShell({
  children,
  label,
  badge,
  accent,
  rootRef,
}: {
  children: React.ReactNode
  label: string
  badge?: React.ReactNode
  accent: string
  rootRef?: React.Ref<HTMLDivElement>
}) {
  return (
    <div
      ref={rootRef}
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
        <span className="text-[0.5rem] font-semibold uppercase tracking-[0.22em] text-black/40">
          {label}
        </span>
        {badge}
      </div>
      <div className="relative">{children}</div>
    </div>
  )
}

function MobileBIVisual({ isRevealed, accent, labels }: { isRevealed: boolean; accent: string; labels?: any }) {
  const bars = [38, 64, 50, 82, 56, 74]
  return (
    <MobileVisualShell
      accent={accent}
      label={labels?.bi?.label ?? "Umsatz Q3"}
      badge={
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={isRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: -4 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="flex items-center gap-1 rounded-full border border-emerald-200/70 bg-emerald-50 px-2 py-0.5"
        >
          <ArrowUpRight className="h-3 w-3 text-emerald-600" />
          <span className="text-[0.6rem] font-semibold text-emerald-700">+18%</span>
        </motion.div>
      }
    >
      <div className="flex items-end justify-between">
        <span style={{ color: accent }}>
          <CountUp
            to={184}
            isRevealed={isRevealed}
            suffix="K"
            className="font-serif text-[1.85rem] font-semibold leading-none"
          />
        </span>
        <span className="pb-0.5 text-[0.55rem] uppercase tracking-wider text-black/40">
          vs. Q2
        </span>
      </div>
      <div className="relative mt-3 h-16">
        <div className="absolute inset-x-0 top-0 h-px bg-black/[0.06]" />
        <div className="absolute inset-x-0 top-1/2 h-px bg-black/[0.06]" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-black/[0.06]" />
        <div className="absolute inset-0 flex items-end gap-1.5">
          {bars.map((h, i) => (
            <motion.div
              key={i}
              className="flex-1 rounded-t-[3px]"
              style={{ background: `linear-gradient(to top, ${accent}, ${accent}99)` }}
              initial={{ height: 0 }}
              animate={isRevealed ? { height: `${h}%` } : { height: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.25 + i * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          ))}
        </div>
      </div>
    </MobileVisualShell>
  )
}

function MobileGovernanceVisual({
  isRevealed,
  accent,
  labels,
}: {
  isRevealed: boolean
  accent: string
  labels?: any
}) {
  const sources = ["ERP", "CRM", "OPS"]
  const targets = ["BI", "ML", "API"]
  return (
    <MobileVisualShell
      accent={accent}
      label="Data Lineage"
      badge={
        <motion.div
          initial={{ opacity: 0 }}
          animate={isRevealed ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.4, delay: 1.2 }}
          className="flex items-center gap-1 rounded-full px-2 py-0.5"
          style={{ backgroundColor: `${accent}1F`, color: accent }}
        >
          <ShieldCheck className="h-3 w-3" />
          <span className="text-[0.6rem] font-semibold tracking-wide">{labels?.governance?.badge ?? "DSGVO"}</span>
        </motion.div>
      }
    >
      <div className="relative aspect-[10/3] w-full">
        <svg
          viewBox="0 0 100 30"
          className="absolute inset-0 h-full w-full"
        >
          {[5.4, 15, 24.6].map((y1, i) => (
            <motion.path
              key={`l-${i}-${isRevealed}`}
              d={`M 16 ${y1} C 32 ${y1}, 32 15, 50 15`}
              fill="none"
              stroke={accent}
              strokeOpacity="0.55"
              strokeWidth="0.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={isRevealed ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ pathLength: { duration: 0.7, delay: 0.15 + i * 0.1, ease: "easeOut" } }}
            />
          ))}
          {[5.4, 15, 24.6].map((y2, i) => (
            <motion.path
              key={`r-${i}-${isRevealed}`}
              d={`M 50 15 C 68 15, 68 ${y2}, 84 ${y2}`}
              fill="none"
              stroke={accent}
              strokeOpacity="0.55"
              strokeWidth="0.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={isRevealed ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ pathLength: { duration: 0.7, delay: 0.6 + i * 0.1, ease: "easeOut" } }}
            />
          ))}
        </svg>
        <div className="pointer-events-none absolute inset-y-0 left-0 flex flex-col justify-between py-1.5">
          {sources.map((s, i) => (
            <motion.span
              key={s}
              initial={{ opacity: 0, x: -6 }}
              animate={isRevealed ? { opacity: 1, x: 0 } : { opacity: 0, x: -6 }}
              transition={{ duration: 0.4, delay: 0.05 + i * 0.08 }}
              className="rounded-md border bg-white px-1.5 py-0.5 text-[0.55rem] font-bold tracking-wider"
              style={{ borderColor: `${accent}55`, color: accent }}
            >
              {s}
            </motion.span>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={isRevealed ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md px-2.5 py-1 text-[0.65rem] font-bold tracking-widest text-white"
          style={{ backgroundColor: accent }}
        >
          GOV
        </motion.div>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex flex-col justify-between py-1.5">
          {targets.map((tg, i) => (
            <motion.span
              key={tg}
              initial={{ opacity: 0, x: 6 }}
              animate={isRevealed ? { opacity: 1, x: 0 } : { opacity: 0, x: 6 }}
              transition={{ duration: 0.4, delay: 0.5 + i * 0.08 }}
              className="rounded-md border bg-white px-1.5 py-0.5 text-[0.55rem] font-bold tracking-wider"
              style={{ borderColor: `${accent}55`, color: accent }}
            >
              {tg}
            </motion.span>
          ))}
        </div>
      </div>
    </MobileVisualShell>
  )
}

function MobileMLVisual({ isRevealed, accent, labels }: { isRevealed: boolean; accent: string; labels?: any }) {
  const layers = [
    [0.25, 0.5, 0.75],
    [0.18, 0.4, 0.6, 0.82],
    [0.35, 0.65],
  ]
  const xCols = [0.12, 0.5, 0.88]
  const edges: { x1: number; y1: number; x2: number; y2: number; key: string }[] = []
  layers[0].forEach((y1, i) =>
    layers[1].forEach((y2, j) =>
      edges.push({ x1: xCols[0], y1, x2: xCols[1], y2, key: `e0-${i}-${j}` }),
    ),
  )
  layers[1].forEach((y1, i) =>
    layers[2].forEach((y2, j) =>
      edges.push({ x1: xCols[1], y1, x2: xCols[2], y2, key: `e1-${i}-${j}` }),
    ),
  )

  const { ref, inView } = useActiveInView()

  return (
    <MobileVisualShell
      rootRef={ref}
      accent={accent}
      label="Model Inference"
      badge={
        <motion.div
          initial={{ opacity: 0 }}
          animate={isRevealed ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.4, delay: 1.0 }}
          className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-2 py-0.5"
        >
          <motion.span
            className="h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: accent, boxShadow: `0 0 6px ${accent}` }}
            animate={inView ? { opacity: [1, 0.4, 1] } : { opacity: 1 }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
          <span className="text-[0.55rem] font-mono font-semibold tracking-[0.18em] text-black/55">
            LIVE
          </span>
        </motion.div>
      }
    >
      <div className="relative aspect-[12/3] w-full">
        <svg
          viewBox="0 0 100 25"
          className="absolute inset-0 h-full w-full"
        >
          {edges.map((e, i) => (
            <motion.line
              key={`${e.key}-${isRevealed}`}
              x1={e.x1 * 100}
              y1={e.y1 * 25}
              x2={e.x2 * 100}
              y2={e.y2 * 25}
              stroke="#94A3B8"
              strokeWidth="0.4"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0.25 }}
              animate={
                isRevealed
                  ? { pathLength: 1, opacity: inView ? [0.25, 0.7, 0.25] : 0.25 }
                  : { pathLength: 0, opacity: 0.25 }
              }
              transition={{
                pathLength: { duration: 0.6, delay: 0.1 + (i % 4) * 0.05, ease: "easeOut" },
                opacity: {
                  duration: 2.4,
                  repeat: Infinity,
                  delay: 0.8 + ((i * 0.13) % 1.6),
                  ease: "easeInOut",
                },
              }}
            />
          ))}
          {layers.map((col, ci) =>
            col.map((y, ri) => (
              <motion.circle
                key={`n-${ci}-${ri}`}
                cx={xCols[ci] * 100}
                cy={y * 25}
                r="1.2"
                fill={ci === 1 ? accent : "#fff"}
                stroke={accent}
                strokeWidth={ci === 1 ? 0 : 0.4}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={isRevealed ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.35, delay: 0.05 + ci * 0.15 + ri * 0.05 }}
              />
            )),
          )}
        </svg>
      </div>
      <div className="mt-2 flex items-center justify-between border-t border-black/[0.06] pt-2">
        <span className="text-[0.5rem] font-semibold uppercase tracking-[0.22em] text-black/40">
          Confidence
        </span>
        <span className="font-mono text-sm font-semibold" style={{ color: accent }}>
          <CountUp to={0.89} isRevealed={isRevealed} duration={1.4} decimals={2} />
        </span>
      </div>
    </MobileVisualShell>
  )
}

const MOBILE_VISUALS = [MobileBIVisual, MobileGovernanceVisual, MobileMLVisual] as const

// Bottom-sheet modal for the per-service "Mehr erfahren" details. Pauses Lenis
// while open so the underlying pinned stage stops drifting.
function MobileServiceDetailsSheet({
  item,
  isOpen,
  onClose,
  accent,
  dict,
}: {
  item: any | null
  isOpen: boolean
  onClose: () => void
  accent: string
  dict: any
}) {
  const t = dict.servicesAnalytics.portfolio
  const lenis = useLenis()

  useEffect(() => {
    if (!isOpen) return
    lenis?.stop()
    const prevHtmlOverflow = document.documentElement.style.overflow
    document.documentElement.style.overflow = "hidden"
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKey)
    return () => {
      lenis?.start()
      document.documentElement.style.overflow = prevHtmlOverflow
      window.removeEventListener("keydown", onKey)
    }
  }, [isOpen, lenis, onClose])

  return (
    <AnimatePresence>
      {isOpen && item && (
        <motion.div
          key="sheet-root"
          className="fixed inset-0 z-50 flex flex-col justify-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="portfolio-sheet-title"
        >
          <motion.button
            type="button"
            aria-label={t.learnLess ?? "Schließen"}
            className="absolute inset-0 bg-black/45 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            className="relative z-10 mx-auto w-full max-w-[640px] rounded-t-[2rem] bg-white p-6 pt-3 shadow-[0_-24px_60px_rgba(15,23,42,0.18)]"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 36 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.6 }}
            onDragEnd={(_, info) => {
              if (info.offset.y > 80 || info.velocity.y > 600) onClose()
            }}
          >
            <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-black/15" />
            <div className="flex items-start justify-between gap-3">
              <h3
                id="portfolio-sheet-title"
                className="font-serif text-[1.45rem] leading-[1.15] tracking-tight text-black"
              >
                {item.title}
              </h3>
              <button
                type="button"
                onClick={onClose}
                aria-label={t.learnLess ?? "Schließen"}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-200 text-black/55 transition-colors hover:bg-slate-50"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div
              aria-hidden
              className="mt-3 h-px w-full"
              style={{
                background: `linear-gradient(90deg, ${accent}55, transparent)`,
              }}
            />
            <div className="mt-4 max-h-[60vh] space-y-3 overflow-y-auto pr-1">
              {item.details.split("\n\n").map((paragraph: string, j: number) => (
                <p key={j} className="text-[0.95rem] leading-relaxed text-black/65">
                  {paragraph}
                </p>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function StageProgressRail({
  progress,
  activeIndex,
}: {
  progress: any
  activeIndex: number
}) {
  const w0 = useTransform(progress, [0, 0.33], ["0%", "100%"])
  const w1 = useTransform(progress, [0.33, 0.66], ["0%", "100%"])
  const w2 = useTransform(progress, [0.66, 1], ["0%", "100%"])
  const widths = [w0, w1, w2]
  const accent = STRAND_COLORS[activeIndex] ?? STRAND_COLORS[0]

  return (
    <div className="flex items-center gap-3">
      <div className="flex flex-1 items-center gap-1.5">
        {widths.map((w, i) => (
          <div
            key={i}
            className="relative h-[3px] flex-1 overflow-hidden rounded-full bg-black/[0.08]"
          >
            <motion.span
              className="absolute inset-y-0 left-0 rounded-full"
              style={{ width: w, backgroundColor: STRAND_COLORS[i] }}
            />
          </div>
        ))}
      </div>
      <span
        className="font-mono text-[0.65rem] font-semibold tracking-[0.18em]"
        style={{ color: accent }}
      >
        {`0${activeIndex + 1}`}
        <span className="text-black/35"> / 03</span>
      </span>
    </div>
  )
}

function StageVisualLayer({
  progress,
  sectionRevealed,
  labels,
}: {
  progress: any
  sectionRevealed: boolean
  labels?: any
}) {
  const o0 = useTransform(progress, [0, 0.28, 0.36], [1, 1, 0])
  const o1 = useTransform(progress, [0.28, 0.36, 0.62, 0.7], [0, 1, 1, 0])
  const o2 = useTransform(progress, [0.62, 0.7, 1], [0, 1, 1])
  const s0 = useTransform(progress, [0, 0.36], [1, 0.97])
  const s1 = useTransform(progress, [0.3, 0.36, 0.66, 0.7], [0.97, 1, 1, 0.97])
  const s2 = useTransform(progress, [0.62, 0.7], [0.97, 1])
  const layers = [
    { o: o0, s: s0 },
    { o: o1, s: s1 },
    { o: o2, s: s2 },
  ]

  return (
    <div aria-hidden className="relative w-full h-[clamp(170px,23vh,210px)]">
      {MOBILE_VISUALS.map((Visual, i) => {
        const accent = STRAND_COLORS[i]
        return (
          <motion.div
            key={i}
            className="absolute inset-0 flex items-center justify-center"
            style={{ opacity: layers[i].o, scale: layers[i].s }}
          >
            <div className="w-full max-w-[420px]">
              <Visual isRevealed={sectionRevealed} accent={accent} labels={labels} />
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

function StageTextLayer({
  items,
  activeIndex,
}: {
  items: any[]
  activeIndex: number
}) {
  const item = items[activeIndex]
  const Icon = ICONS[activeIndex] ?? BarChart3
  const accent = STRAND_COLORS[activeIndex] ?? STRAND_COLORS[0]

  return (
    <div className="relative" aria-live="polite">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center gap-3">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-2xl"
              style={{ backgroundColor: `${accent}1F` }}
            >
              <Icon className="h-5 w-5" style={{ color: accent }} />
            </div>
            <span
              className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.24em]"
              style={{ color: accent }}
            >
              {`0${activeIndex + 1}`} <span className="text-black/30">/ 03</span>
            </span>
          </div>
          <h3 className="mt-3 font-serif text-[1.6rem] leading-[1.1] tracking-tight text-black text-balance">
            {item.title}
          </h3>
          <p className="mt-2 text-[0.9rem] leading-relaxed text-black/65 text-balance">
            {item.shortDesc}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

function ScrollytellingStage({
  items,
  progress,
  activeIndex,
  sectionRevealed,
  dict,
  onOpenDetails,
}: {
  items: any[]
  progress: any
  activeIndex: number
  sectionRevealed: boolean
  dict: any
  onOpenDetails: (index: number) => void
}) {
  const t = dict.servicesAnalytics.portfolio
  const activeAccent = STRAND_COLORS[activeIndex] ?? STRAND_COLORS[0]
  return (
    <div className="sticky top-16 flex h-[calc(100vh-4rem)] max-h-[560px] w-full flex-col">
      <div className="flex flex-1 flex-col gap-4 px-5 pb-5 pt-4">
        <StageProgressRail progress={progress} activeIndex={activeIndex} />
        <StageVisualLayer progress={progress} sectionRevealed={sectionRevealed} labels={t.visuals} />
        <StageTextLayer items={items} activeIndex={activeIndex} />
        <div className="mt-1 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => onOpenDetails(activeIndex)}
            className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[0.78rem] font-medium transition-colors duration-300"
            style={{
              color: activeAccent,
              backgroundColor: `${activeAccent}10`,
              borderColor: `${activeAccent}33`,
            }}
            aria-label={`${t.learnMore} – ${items[activeIndex]?.title ?? ""}`}
          >
            {t.learnMore}
            <ChevronDown className="h-4 w-4 -rotate-90" />
          </button>
          <BookCircleButton label={t.bookCta} size="md" />
        </div>
      </div>
    </div>
  )
}

// Reduced-motion / fallback rendering. Three plain blocks with the visuals
// fully resolved, native <details> for the disclosure — no scroll math.
function MobileFallbackStack({
  items,
  dict,
  onOpenDetails,
}: {
  items: any[]
  dict: any
  onOpenDetails: (index: number) => void
}) {
  const t = dict.servicesAnalytics.portfolio
  return (
    <div className="flex flex-col gap-6 px-4 sm:px-6">
      {items.map((item, i) => {
        const Icon = ICONS[i] ?? BarChart3
        const accent = STRAND_COLORS[i] ?? STRAND_COLORS[0]
        const Visual = MOBILE_VISUALS[i] ?? MobileBIVisual
        return (
          <article
            key={i}
            className="rounded-[1.5rem] border border-slate-200/70 bg-white p-5"
          >
            <Visual isRevealed accent={accent} labels={t.visuals} />
            <div className="mt-4 flex items-center gap-3">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-2xl"
                style={{ backgroundColor: `${accent}1F` }}
              >
                <Icon className="h-5 w-5" style={{ color: accent }} />
              </div>
              <span
                className="text-[0.62rem] font-semibold uppercase tracking-[0.24em]"
                style={{ color: accent }}
              >
                {`0${i + 1}`} <span className="text-black/30">/ 03</span>
              </span>
            </div>
            <h3 className="mt-3 font-serif text-[1.55rem] leading-[1.1] tracking-tight text-black">
              {item.title}
            </h3>
            <p className="mt-2 text-[0.92rem] leading-relaxed text-black/65">
              {item.shortDesc}
            </p>
            <button
              type="button"
              onClick={() => onOpenDetails(i)}
              className="mt-4 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[0.78rem] font-medium"
              style={{
                color: accent,
                backgroundColor: `${accent}10`,
                borderColor: `${accent}33`,
              }}
            >
              {t.learnMore}
              <ChevronDown className="h-4 w-4 -rotate-90" />
            </button>
          </article>
        )
      })}
      <div className="flex justify-center pt-2">
        <BookCircleButton label={t.bookCta} size="lg" />
      </div>
    </div>
  )
}

function MobileScrollytellingSection({
  items,
  dict,
}: {
  items: any[]
  dict: any
}) {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const reveal = useRevealOnScroll<HTMLDivElement>({ margin: "-15%" })
  const reducedMotion = useReducedMotion() ?? false
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  })

  const indexMV = useTransform(
    scrollYProgress,
    [0, 0.33, 0.34, 0.66, 0.67, 1],
    [0, 0, 1, 1, 2, 2],
  )
  const [activeIndex, setActiveIndex] = useState(0)
  useMotionValueEvent(indexMV, "change", (v) => {
    const next = Math.max(0, Math.min(2, Math.round(v)))
    setActiveIndex((prev) => (prev === next ? prev : next))
  })

  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const openItem = openIndex !== null ? items[openIndex] : null
  const openAccent =
    openIndex !== null
      ? STRAND_COLORS[openIndex] ?? STRAND_COLORS[0]
      : STRAND_COLORS[0]

  return (
    <>
      {reducedMotion ? (
        <MobileFallbackStack
          items={items}
          dict={dict}
          onOpenDetails={(i) => setOpenIndex(i)}
        />
      ) : (
        <div
          ref={(el) => {
            sectionRef.current = el
            reveal.ref.current = el
          }}
          className="relative min-h-[200vh]"
          style={{ scrollMarginTop: "80px" }}
        >
          <ScrollytellingStage
            items={items}
            progress={scrollYProgress}
            activeIndex={activeIndex}
            sectionRevealed={reveal.isRevealed}
            dict={dict}
            onOpenDetails={(i) => setOpenIndex(i)}
          />
        </div>
      )}
      <MobileServiceDetailsSheet
        item={openItem}
        isOpen={openIndex !== null}
        onClose={() => setOpenIndex(null)}
        accent={openAccent}
        dict={dict}
      />
    </>
  )
}

// ---------------------------------------------------------------------------
function BookCircleButton({ label, size = "lg" }: { label: string; size?: "lg" | "md" }) {
  const dimensions = size === "lg" ? "h-14 w-14" : "h-11 w-11"
  const iconSize = size === "lg" ? "h-5 w-5" : "h-4 w-4"
  const { ref, inView } = useActiveInView<HTMLAnchorElement>()
  return (
    <a
      ref={ref}
      href="#book"
      aria-label={label}
      title={label}
      className={`group relative inline-flex ${dimensions} items-center justify-center rounded-full bg-[#21569c] text-white shadow-[0_18px_36px_rgba(33,86,156,0.32)] transition-all duration-300 hover:scale-105 hover:bg-[#1a457d] hover:shadow-[0_22px_48px_rgba(33,86,156,0.45)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#21569c]/30`}
    >
      <motion.span
        aria-hidden="true"
        className="absolute inset-0 rounded-full border border-[#21569c]/40"
        initial={{ scale: 1, opacity: 0.6 }}
        animate={inView ? { scale: [1, 1.18, 1], opacity: [0.6, 0, 0.6] } : { scale: 1, opacity: 0.6 }}
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

  const heading = useRevealOnScroll<HTMLDivElement>()
  const sectionRef = useRef<HTMLElement | null>(null)

  // Per-row reveal hooks for the desktop alternating layout (md+).
  // Mobile (<md) uses the carousel which manages active state internally,
  // so it doesn't need scroll-tied reveals.
  const dReveal0 = useRevealOnScroll<HTMLDivElement>({ margin: "-120px" })
  const dReveal1 = useRevealOnScroll<HTMLDivElement>({ margin: "-120px" })
  const dReveal2 = useRevealOnScroll<HTMLDivElement>({ margin: "-120px" })
  const desktopReveals = [dReveal0, dReveal1, dReveal2]
  const revealedRows = desktopReveals.map((d) => d.isRevealed)

  return (
    <section ref={sectionRef} className="relative md:overflow-hidden">
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
                  <Visual isRevealed={revealedRows[i]} labels={portfolio.visuals} />
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

      {/* Mobile only: scroll-pinned scrollytelling stage ------------------ */}
      <div className="relative z-10 md:hidden">
        <MobileScrollytellingSection items={items} dict={dict} />
      </div>
    </section>
  )
}
