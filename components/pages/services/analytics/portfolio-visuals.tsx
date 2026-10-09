"use client"

import { motion } from "framer-motion"
import { ArrowDownRight, ArrowUpRight, ShieldCheck } from "lucide-react"
import { useActiveInView } from "@/hooks/use-active-in-view"
import type { Dictionary } from "@/lib/dictionary"
import { CountUp } from "@/components/pages/services/shared/portfolio/visual-kit"

export type VisualLabels = Dictionary["servicesAnalytics"]["portfolio"]["visuals"]

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

function BIVisual({ isRevealed, labels }: { isRevealed: boolean; labels?: VisualLabels }) {
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
        <span className="text-[0.65rem] uppercase tracking-[0.18em] text-black/40 font-medium">
          {labels?.bi?.label ?? "Umsatz Q3"}
        </span>
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

function GovernanceVisual({ isRevealed, labels }: { isRevealed: boolean; labels?: VisualLabels }) {
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

function MLVisual({ isRevealed }: { isRevealed: boolean; labels?: VisualLabels }) {
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

  const [ref, inView] = useActiveInView()

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
                  delay: 1 + ((i * 0.13) % 1.6),
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

export const VISUALS = [BIVisual, GovernanceVisual, MLVisual] as const
