"use client"

import { motion } from "framer-motion"
import { ArrowUpRight, ShieldCheck } from "lucide-react"
import { useActiveInView } from "@/hooks/use-active-in-view"
import { CountUp, MobileVisualShell } from "@/components/pages/services/shared/portfolio/visual-kit"
import type { VisualLabels } from "./portfolio-visuals"

function MobileBIVisual({
  isRevealed,
  accent,
  labels,
}: {
  isRevealed: boolean
  accent: string
  labels?: VisualLabels
}) {
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
        <span className="pb-0.5 text-[0.55rem] uppercase tracking-wider text-black/40">vs. Q2</span>
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
  labels?: VisualLabels
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
        <svg viewBox="0 0 100 30" className="absolute inset-0 h-full w-full">
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

function MobileMLVisual({ isRevealed, accent }: { isRevealed: boolean; accent: string; labels?: VisualLabels }) {
  const layers = [
    [0.25, 0.5, 0.75],
    [0.18, 0.4, 0.6, 0.82],
    [0.35, 0.65],
  ]
  const xCols = [0.12, 0.5, 0.88]
  const edges: { x1: number; y1: number; x2: number; y2: number; key: string }[] = []
  layers[0].forEach((y1, i) =>
    layers[1].forEach((y2, j) => edges.push({ x1: xCols[0], y1, x2: xCols[1], y2, key: `e0-${i}-${j}` })),
  )
  layers[1].forEach((y1, i) =>
    layers[2].forEach((y2, j) => edges.push({ x1: xCols[1], y1, x2: xCols[2], y2, key: `e1-${i}-${j}` })),
  )

  const [ref, inView] = useActiveInView()

  return (
    <MobileVisualShell
      shellRef={ref}
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
            transition={{ duration: 1.6, repeat: inView ? Infinity : 0, ease: "easeInOut" }}
          />
          <span className="text-[0.55rem] font-mono font-semibold tracking-[0.18em] text-black/55">LIVE</span>
        </motion.div>
      }
    >
      <div className="relative aspect-[12/3] w-full">
        <svg viewBox="0 0 100 25" className="absolute inset-0 h-full w-full">
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
                  repeat: isRevealed && inView ? Infinity : 0,
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
        <span className="text-[0.5rem] font-semibold uppercase tracking-[0.22em] text-black/40">Confidence</span>
        <span className="font-mono text-sm font-semibold" style={{ color: accent }}>
          <CountUp to={0.89} isRevealed={isRevealed} duration={1.4} decimals={2} />
        </span>
      </div>
    </MobileVisualShell>
  )
}

export const MOBILE_VISUALS = [MobileBIVisual, MobileGovernanceVisual, MobileMLVisual] as const
