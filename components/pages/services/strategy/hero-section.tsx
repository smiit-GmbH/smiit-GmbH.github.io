"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  animate,
  cubicBezier,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion"
import {
  ArrowRight,
  ChevronDown,
  Filter,
  Layers3,
  Minus,
  TrendingDown,
  TrendingUp,
} from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import type { Locale } from "@/lib/dictionary"

interface HeroSectionProps {
  lang: Locale
  dict: any
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ")
}

// ---------- Datasets ----------
type PeriodKey = "q" | "h" | "y"
type ThemeKey = "cloud" | "security" | "data" | "process"
type RiskKey = "compliance" | "cyber" | "vendor" | "operational"
type PhaseKey = "sondieren" | "konzipieren" | "umsetzen" | "verankern"
type MilestoneStatus = "done" | "progress" | "planned"
type RiskTrendDir = "down" | "flat" | "up"

interface MaturityScore {
  current: number
  target: number
  delta: string
}

interface Milestone {
  x: number
  status: MilestoneStatus
  label: string
}

interface Lane {
  key: ThemeKey
  milestones: Milestone[]
}

interface RiskState {
  level: number
  trend: RiskTrendDir
}

interface InitiativeBucket {
  count: number
  bar: number
}

interface Dataset {
  maturity: Record<ThemeKey, MaturityScore>
  trendHeader: string
  todayPercent: number
  lanes: Lane[]
  risks: Record<RiskKey, RiskState>
  riskTrend: number[]
  initiatives: Record<PhaseKey, InitiativeBucket>
  bottomLabels: string[]
}

const DATASETS: Record<PeriodKey, Dataset> = {
  y: {
    maturity: {
      cloud: { current: 3.4, target: 4.2, delta: "+0,8 pp" },
      security: { current: 2.1, target: 4.0, delta: "+1,9 pp" },
      data: { current: 2.8, target: 4.1, delta: "+1,3 pp" },
      process: { current: 3.0, target: 4.5, delta: "+1,5 pp" },
    },
    trendHeader: "+1,4 pp",
    todayPercent: 38,
    lanes: [
      {
        key: "cloud",
        milestones: [
          { x: 8, status: "done", label: "Tenant-Audit" },
          { x: 28, status: "done", label: "Landing Zone" },
          { x: 50, status: "progress", label: "IaC-Migration" },
          { x: 78, status: "planned", label: "Multi-Region" },
        ],
      },
      {
        key: "security",
        milestones: [
          { x: 12, status: "done", label: "MFA-Rollout" },
          { x: 35, status: "progress", label: "Zero Trust" },
          { x: 60, status: "planned", label: "Identity-Gov" },
          { x: 88, status: "planned", label: "SOC-Setup" },
        ],
      },
      {
        key: "data",
        milestones: [
          { x: 15, status: "done", label: "Data Lineage" },
          { x: 42, status: "progress", label: "Master Data" },
          { x: 70, status: "planned", label: "Self-Service" },
        ],
      },
      {
        key: "process",
        milestones: [
          { x: 5, status: "done", label: "Prozessmap" },
          { x: 25, status: "progress", label: "BPMN-Modelle" },
          { x: 55, status: "planned", label: "Power Automate" },
          { x: 82, status: "planned", label: "KPI-Steuerung" },
        ],
      },
    ],
    risks: {
      compliance: { level: 3, trend: "down" },
      cyber: { level: 4, trend: "down" },
      vendor: { level: 2, trend: "flat" },
      operational: { level: 3, trend: "down" },
    },
    riskTrend: [22, 24, 22, 18, 16, 14, 12, 10],
    initiatives: {
      sondieren: { count: 2, bar: 24 },
      konzipieren: { count: 3, bar: 38 },
      umsetzen: { count: 4, bar: 56 },
      verankern: { count: 1, bar: 14 },
    },
    bottomLabels: ["Q1", "Q2", "Q3", "Q4"],
  },
  h: {
    maturity: {
      cloud: { current: 3.0, target: 3.7, delta: "+0,7 pp" },
      security: { current: 1.8, target: 3.2, delta: "+1,4 pp" },
      data: { current: 2.5, target: 3.5, delta: "+1,0 pp" },
      process: { current: 2.7, target: 3.8, delta: "+1,1 pp" },
    },
    trendHeader: "+1,1 pp",
    todayPercent: 32,
    lanes: [
      {
        key: "cloud",
        milestones: [
          { x: 14, status: "done", label: "Tenant-Audit" },
          { x: 38, status: "done", label: "Landing Zone" },
          { x: 65, status: "progress", label: "IaC-Migration" },
          { x: 90, status: "planned", label: "Multi-Region" },
        ],
      },
      {
        key: "security",
        milestones: [
          { x: 18, status: "done", label: "MFA-Rollout" },
          { x: 50, status: "progress", label: "Zero Trust" },
          { x: 82, status: "planned", label: "Identity-Gov" },
        ],
      },
      {
        key: "data",
        milestones: [
          { x: 22, status: "done", label: "Data Lineage" },
          { x: 58, status: "progress", label: "Master Data" },
          { x: 86, status: "planned", label: "Self-Service" },
        ],
      },
      {
        key: "process",
        milestones: [
          { x: 8, status: "done", label: "Prozessmap" },
          { x: 36, status: "progress", label: "BPMN-Modelle" },
          { x: 72, status: "planned", label: "Power Automate" },
        ],
      },
    ],
    risks: {
      compliance: { level: 4, trend: "down" },
      cyber: { level: 4, trend: "down" },
      vendor: { level: 2, trend: "flat" },
      operational: { level: 3, trend: "flat" },
    },
    riskTrend: [22, 22, 20, 18, 16, 14],
    initiatives: {
      sondieren: { count: 2, bar: 28 },
      konzipieren: { count: 2, bar: 26 },
      umsetzen: { count: 3, bar: 42 },
      verankern: { count: 1, bar: 14 },
    },
    bottomLabels: ["Jul", "Aug", "Sep", "Okt", "Nov", "Dez"],
  },
  q: {
    maturity: {
      cloud: { current: 2.7, target: 3.2, delta: "+0,5 pp" },
      security: { current: 1.6, target: 2.4, delta: "+0,8 pp" },
      data: { current: 2.3, target: 3.0, delta: "+0,7 pp" },
      process: { current: 2.5, target: 3.2, delta: "+0,7 pp" },
    },
    trendHeader: "+0,7 pp",
    todayPercent: 45,
    lanes: [
      {
        key: "cloud",
        milestones: [
          { x: 10, status: "done", label: "Tenant-Audit" },
          { x: 50, status: "progress", label: "Landing Zone" },
          { x: 88, status: "planned", label: "IaC-Setup" },
        ],
      },
      {
        key: "security",
        milestones: [
          { x: 18, status: "done", label: "Patch-Audit" },
          { x: 55, status: "progress", label: "MFA-Rollout" },
        ],
      },
      {
        key: "data",
        milestones: [
          { x: 30, status: "progress", label: "Daten" },
          { x: 82, status: "planned", label: "Quellinventar" },
        ],
      },
      {
        key: "process",
        milestones: [
          { x: 12, status: "done", label: "Prozesskartierung" },
          { x: 45, status: "progress", label: "Top-3 Modellierung" },
          { x: 90, status: "planned", label: "Pilot-Workflow" },
        ],
      },
    ],
    risks: {
      compliance: { level: 4, trend: "flat" },
      cyber: { level: 4, trend: "flat" },
      vendor: { level: 3, trend: "flat" },
      operational: { level: 3, trend: "flat" },
    },
    riskTrend: [20, 20, 19, 18],
    initiatives: {
      sondieren: { count: 3, bar: 38 },
      konzipieren: { count: 2, bar: 28 },
      umsetzen: { count: 1, bar: 14 },
      verankern: { count: 0, bar: 0 },
    },
    bottomLabels: ["Wo 1", "Wo 4", "Wo 7", "Wo 10", "Wo 13"],
  },
}

// ---------- CountUp ----------

function formatNumber(value: number, decimals = 0): string {
  const fixed = decimals > 0 ? value.toFixed(decimals) : Math.round(value).toString()
  return decimals > 0 ? fixed.replace(".", ",") : fixed
}

function CountUp({
  to,
  decimals = 0,
  suffix = "",
  prefix = "",
  className,
  reduceMotion,
}: {
  to: number
  decimals?: number
  suffix?: string
  prefix?: string
  className?: string
  reduceMotion?: boolean | null
}) {
  const value = useMotionValue(reduceMotion ? to : 0)
  const [display, setDisplay] = useState(formatNumber(reduceMotion ? to : 0, decimals))

  useEffect(() => {
    if (reduceMotion) {
      value.set(to)
      setDisplay(formatNumber(to, decimals))
      return
    }
    const controls = animate(value, to, { duration: 0.9, ease: [0.22, 1, 0.36, 1] })
    const unsub = value.on("change", (v) => setDisplay(formatNumber(v, decimals)))
    return () => {
      controls.stop()
      unsub()
    }
  }, [to, decimals, reduceMotion, value])

  return (
    <span className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  )
}

// ---------- Magnetic CTA ----------

function MagneticCta({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotion()
  const mvX = useMotionValue(0)
  const mvY = useMotionValue(0)
  const x = useSpring(mvX, { stiffness: 240, damping: 18, mass: 0.4 })
  const y = useSpring(mvY, { stiffness: 240, damping: 18, mass: 0.4 })

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const offsetX = e.clientX - (rect.left + rect.width / 2)
    const offsetY = e.clientY - (rect.top + rect.height / 2)
    const max = 8
    mvX.set(Math.max(-max, Math.min(max, offsetX * 0.3)))
    mvY.set(Math.max(-max, Math.min(max, offsetY * 0.3)))
  }
  const handleLeave = () => {
    mvX.set(0)
    mvY.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={shouldReduceMotion ? undefined : { x, y }}
      className="inline-block"
    >
      <Link href={href} className={className}>
        {children}
      </Link>
    </motion.div>
  )
}

// ---------- Module Renderers ----------

function MaturityModule({
  t,
  data,
  reduceMotion,
  mobileEmphasis = false,
}: {
  t: any
  data: Dataset
  reduceMotion: boolean | null
  mobileEmphasis?: boolean
}) {
  const themes: ThemeKey[] = ["cloud", "security", "data", "process"]
  const items = themes.map((key) => ({
    key,
    label: t.kpiLabels?.[key],
    score: data.maturity[key],
    deltaLabel: t.kpiDeltaLabels?.[key],
  }))

  return (
    <div className="overflow-hidden rounded-[18px]">
      <div className="p-3">
        <p className="text-[0.72rem] font-semibold text-[#0B162D]">{t.sections.kpis}</p>
        <div className="mt-2.5 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {items.map((item, i) => {
            const fillPct = (item.score.current / 5) * 100
            const targetPct = (item.score.target / 5) * 100
            return (
              <motion.div
                key={item.key}
                whileHover={reduceMotion ? undefined : { y: -2 }}
                whileTap={mobileEmphasis && !reduceMotion ? { scale: 0.97 } : undefined}
                transition={{ type: "spring", stiffness: 320, damping: 22 }}
                className="group relative rounded-[14px] bg-[#F8FAFC] p-2.5"
              >
                <p className="text-[0.5rem] font-medium uppercase tracking-[0.08em] text-[#0B162D]/40">
                  {item.label}
                </p>
                <div className="mt-1.5 flex items-baseline gap-1">
                  <CountUp
                    to={item.score.current}
                    decimals={1}
                    reduceMotion={reduceMotion}
                    className="text-[0.92rem] font-semibold text-[#0B162D] sm:text-[0.96rem]"
                  />
                  <span className="text-[0.55rem] text-[#0B162D]/40">/ 5</span>
                  <span className="ml-auto text-[0.55rem] font-medium text-[#64748B]">
                    → {item.score.target.toString().replace(".", ",")}
                  </span>
                </div>
                <div className="relative mt-2 h-1">
                  <div className="absolute inset-x-0 top-0 h-1 overflow-hidden rounded-full bg-slate-100">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${fillPct}%` }}
                      transition={{ duration: 1.0, delay: 0.5 + i * 0.12, ease: "easeOut" }}
                      className="h-full rounded-full bg-gradient-to-r from-[#64748B] to-[#94A3B8]"
                    />
                  </div>
                  {/* Target marker */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 1.0 + i * 0.12 }}
                    className="absolute top-[-2px] bottom-[-2px] w-[1.5px] bg-[#0B162D]/50"
                    style={{ left: `calc(${targetPct}% - 0.75px)` }}
                  />
                </div>
                {/* Delta badge — fades in on hover */}
                <div className="pointer-events-none absolute -top-1.5 right-2 translate-y-1 opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100">
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#0B162D] px-2 py-0.5 text-[0.5rem] font-semibold text-white shadow-md">
                    {item.score.delta}
                    {item.deltaLabel ? <span className="font-normal text-white/60">· {item.deltaLabel}</span> : null}
                  </span>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function RoadmapModule({
  t,
  data,
}: {
  t: any
  data: Dataset
  mobileEmphasis?: boolean
}) {
  const themes: ThemeKey[] = ["cloud", "security", "data", "process"]

  return (
    <TooltipProvider delayDuration={80}>
      <div className="flex h-full flex-col overflow-hidden rounded-[18px] p-2">
        <div className="flex shrink-0 items-center justify-between">
          <div className="text-left">
            <p className="text-[0.72rem] font-semibold text-[#0B162D]">{t.sections.trend}</p>
            <p className="mt-0.5 text-[0.58rem] text-[#0B162D]/50">{t.sections.trendSub}</p>
          </div>
          <div className="rounded-[14px] border border-slate-200/80 bg-[#F8FAFC] px-2.5 py-2 text-right">
            <div className="flex items-center gap-1 text-[#64748B]">
              <TrendingUp className="h-3.5 w-3.5" />
              <span className="text-[0.95rem] font-semibold">{data.trendHeader}</span>
            </div>
          </div>
        </div>

        <div className="mt-2 flex min-h-0 flex-1 flex-col rounded-[16px] border border-slate-200/80 bg-[#F8FAFC] p-2">
          {/* Legend */}
          <div className="mb-1 flex shrink-0 flex-wrap items-center gap-x-3 gap-y-1 text-[0.56rem] text-[#0B162D]/46">
            <span className="inline-flex items-center gap-1">
              <span className="box-border h-1.5 w-1.5 rounded-full bg-[#64748B]" />
              {t.chartLegend?.done}
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="box-border h-1.5 w-1.5 rounded-full border-2 border-[#64748B] bg-white" />
              {t.chartLegend?.progress}
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="box-border h-1.5 w-1.5 rounded-full border border-[#64748B] bg-white" />
              {t.chartLegend?.planned}
            </span>
          </div>

          {/* Lanes — 4 themes, milestones placed by x% along each track */}
          <div className="relative flex min-h-0 flex-1 flex-col justify-around gap-2 py-2">
            {themes.map((theme, laneIdx) => {
              const lane = data.lanes.find((l) => l.key === theme)
              if (!lane) return null
              return (
                <div key={theme} className="flex items-center gap-2">
                  <span className="w-[68px] shrink-0 text-[0.56rem] font-semibold uppercase tracking-wider text-[#0B162D]/55">
                    {t.kpiLabels?.[theme]}
                  </span>
                  <div className="relative h-2 flex-1 rounded-full bg-slate-200/60">
                    {/* Today cursor */}
                    <div
                      className="pointer-events-none absolute inset-y-[-3px] w-[1.5px] bg-[#0B162D]/35"
                      style={{ left: `${data.todayPercent}%` }}
                    />
                    {/* Milestones */}
                    {lane.milestones.map((m, mIdx) => (
                      <Tooltip key={`m-${theme}-${mIdx}`}>
                        <TooltipTrigger asChild>
                          <motion.button
                            type="button"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.35, delay: 0.4 + laneIdx * 0.06 + mIdx * 0.08 }}
                            className={cx(
                              "absolute top-1/2 box-border h-3 w-3 -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full border-[#64748B] transition-transform hover:scale-125 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#64748B]/40",
                              m.status === "done" && "border-[1.5px] bg-[#64748B]",
                              m.status === "progress" && "border-[3px] bg-white",
                              m.status === "planned" && "border-[1.5px] bg-white",
                            )}
                            style={{ left: `${m.x}%` }}
                            aria-label={`${m.label} (${m.status})`}
                          />
                        </TooltipTrigger>
                        <TooltipContent side="top" className="bg-[#0B162D] text-white">
                          <div className="flex flex-col gap-0.5 text-[0.66rem] leading-tight">
                            <span className="font-semibold">{m.label}</span>
                            <span className="text-white/70">
                              {m.status === "done"
                                ? t.trendTooltip?.statusDone
                                : m.status === "progress"
                                  ? t.trendTooltip?.statusProgress
                                  : t.trendTooltip?.statusPlanned}
                            </span>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Timeline labels */}
          <div className="mt-1 flex shrink-0 justify-between pl-[76px] text-[0.56rem] text-[#0B162D]/40">
            {data.bottomLabels.map((label, idx) => (
              <span key={`${label}-${idx}`}>{label}</span>
            ))}
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}

function RiskModule({ t, data, radarStyle }: { t: any; data: Dataset; radarStyle?: any }) {
  const risks: { key: RiskKey; label: string; state: RiskState }[] = [
    { key: "compliance", label: t.signalLabels?.compliance, state: data.risks.compliance },
    { key: "cyber", label: t.signalLabels?.cyber, state: data.risks.cyber },
    { key: "vendor", label: t.signalLabels?.vendor, state: data.risks.vendor },
    { key: "operational", label: t.signalLabels?.operational, state: data.risks.operational },
  ]

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-[18px]">
      <div className="flex min-h-0 flex-1 flex-col p-2 sm:p-3">
        <p className="shrink-0 text-[0.72rem] font-semibold text-[#0B162D]">{t.sections.signals}</p>
        <div className="mt-1.5 shrink-0 grid grid-cols-2 gap-1.5 sm:mt-2.5 sm:gap-2">
          {risks.map((risk) => {
            const TrendIcon =
              risk.state.trend === "down" ? TrendingDown : risk.state.trend === "up" ? TrendingUp : Minus
            const trendTone =
              risk.state.trend === "down"
                ? "text-emerald-500"
                : risk.state.trend === "up"
                  ? "text-red-500"
                  : "text-slate-400"
            return (
              <div key={risk.key} className="rounded-[14px] bg-[#F8FAFC] p-1.5 sm:p-2.5">
                <div className="flex items-center justify-between gap-1">
                  <p className="text-[0.52rem] font-medium uppercase tracking-[0.14em] text-[#0B162D]/38">
                    {risk.label}
                  </p>
                  <TrendIcon className={cx("h-3 w-3", trendTone)} />
                </div>
                {/* Severity 5-dot */}
                <div className="mt-1 flex items-center gap-0.5 sm:mt-1.5">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <span
                      key={level}
                      className={cx(
                        "h-1.5 w-1.5 rounded-full",
                        level <= risk.state.level ? "bg-[#64748B]" : "bg-slate-200",
                      )}
                    />
                  ))}
                </div>
              </div>
            )
          })}
        </div>
        <motion.div
          style={radarStyle}
          className="mt-1.5 flex min-h-0 flex-1 flex-col overflow-hidden rounded-[14px] bg-[#F8FAFC] p-1.5 sm:mt-2.5 sm:p-2.5"
        >
          <div className="flex shrink-0 items-center justify-between text-[0.56rem] text-[#0B162D]/44">
            <span>{t.signalRadar?.title}</span>
            <span>{t.signalRadar?.period}</span>
          </div>
          <div className="mt-1 flex min-h-0 flex-1 items-end gap-1 sm:mt-2">
            {data.riskTrend.map((h, i) => (
              <motion.div
                key={i}
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{ scaleY: 1, opacity: 1 }}
                transition={{ duration: 0.55, delay: 1.0 + i * 0.06, ease: "easeOut" }}
                style={{ height: `${Math.round((h / 28) * 95)}%`, transformOrigin: "bottom" }}
                className="flex-1 rounded-t-md bg-[#E2E8F0]"
              >
                <motion.div
                  initial={{ scaleY: 0.4 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 0.5, delay: 1.4 + i * 0.05, ease: "easeOut" }}
                  className="h-full w-full rounded-t-md bg-gradient-to-t from-[#64748B] to-[#94A3B8] opacity-80"
                  style={{ transformOrigin: "bottom" }}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

function InitiativesModule({ t, data }: { t: any; data: Dataset }) {
  const phases: { key: PhaseKey; label: string; state: InitiativeBucket }[] = [
    { key: "sondieren", label: t.segments?.sondieren, state: data.initiatives.sondieren },
    { key: "konzipieren", label: t.segments?.konzipieren, state: data.initiatives.konzipieren },
    { key: "umsetzen", label: t.segments?.umsetzen, state: data.initiatives.umsetzen },
    { key: "verankern", label: t.segments?.verankern, state: data.initiatives.verankern },
  ]
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-[18px]">
      <div className="flex flex-1 flex-col p-2 sm:p-3">
        <p className="shrink-0 text-[0.72rem] font-semibold text-[#0B162D]">{t.sections.potentials}</p>
        <div className="mt-1.5 flex flex-1 flex-col justify-around sm:mt-2.5">
          {phases.map((phase, i) => (
            <div key={phase.key}>
              <div className="mb-0.5 flex items-center justify-between text-[0.6rem] sm:mb-1">
                <span className="text-[#0B162D]/68">{phase.label}</span>
                <span className="font-semibold text-[#64748B]">{phase.state.count}</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${phase.state.bar}%` }}
                  transition={{ duration: 0.9, delay: 0.4 + i * 0.1, ease: "easeOut" }}
                  className="h-full rounded-full bg-gradient-to-r from-[#64748B] to-[#94A3B8]"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ---------- Main component ----------

const dashboardChildVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}

export default function HeroSection({ lang, dict }: HeroSectionProps) {
  const containerRef = useRef<HTMLElement>(null)
  const shouldReduceMotion = useReducedMotion()

  // Toggle the scroll-driven dashboard growth. Flip to true to restore the cinematic morph.
  const SCROLL_ANIMATIONS_ENABLED = false

  const hero = dict?.servicesStrategy?.hero
  const eyebrowLabel = dict?.servicesStrategy?.eyebrows?.hero

  const t = {
    dashboardTitle: (hero?.dashboardTitle as string) ?? "Digital Strategy Cockpit",
    sourcesConnected: hero?.sourcesConnected as string,
    updated: hero?.updated as string,
    sections: (hero?.sections ?? {}) as any,
    months: (hero?.months ?? []) as string[],
    kpiLabels: hero?.kpiLabels ?? {},
    chartLegend: hero?.chartLegend ?? {},
    signalLabels: hero?.signalLabels ?? {},
    signalRadar: hero?.signalRadar ?? {},
    segments: hero?.segments ?? {},
    periods: hero?.periods ?? { q: "Quartal", h: "6 Monate", y: "12 Monate" },
    trendTooltip: hero?.trendTooltip ?? {},
    kpiDeltaLabels: hero?.kpiDeltaLabels ?? {},
  }

  const [periodKey, setPeriodKey] = useState<PeriodKey>("y")
  const data = DATASETS[periodKey]

  // ── Scroll-driven motion (kept for one-line restore) ─────────────
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })
  const easeOutCubic = cubicBezier(0.33, 1, 0.68, 1)
  const heroTextOpacity = useTransform(scrollYProgress, [0.04, 0.14], [1, 0])
  const heroTextY = useTransform(scrollYProgress, [0.04, 0.14], [0, -36])
  const dashboardWidth = useTransform(scrollYProgress, [0.05, 0.32], ["680px", "1180px"], { ease: easeOutCubic })
  const dashboardHeight = useTransform(scrollYProgress, [0.05, 0.32], ["540px", "660px"], { ease: easeOutCubic })
  const dashboardX = useTransform(scrollYProgress, [0.05, 0.32], ["20vw", "0vw"], { ease: easeOutCubic })
  const dashboardScale = useTransform(scrollYProgress, [0.05, 0.30], [0.94, 1], { ease: easeOutCubic })
  const dashboardZ = useTransform(scrollYProgress, [0.05, 0.30], [-160, 0], { ease: easeOutCubic })
  const aiHeight = useTransform(scrollYProgress, [0.05, 0.30], ["230px", "360px"], { ease: easeOutCubic })
  const radarOpacity = useTransform(scrollYProgress, [0.12, 0.28], [0, 1], { ease: easeOutCubic })
  const lightSweepOpacity = useTransform(scrollYProgress, [0.28, 0.34, 0.40], [0, 1, 0])
  const lightSweepX = useTransform(scrollYProgress, [0.28, 0.42], ["-40%", "140%"], { ease: easeOutCubic })

  const useStaticIdleLayout = !SCROLL_ANIMATIONS_ENABLED

  const heroTextStyle = shouldReduceMotion
    ? { opacity: 0 }
    : useStaticIdleLayout
      ? { opacity: 1, y: 0 }
      : { opacity: heroTextOpacity, y: heroTextY }
  const dashboardWrapperStyle = shouldReduceMotion
    ? undefined
    : useStaticIdleLayout
      ? { x: "20vw" }
      : { x: dashboardX }
  const dashboardStyle = shouldReduceMotion
    ? { width: "1180px", height: "660px" }
    : useStaticIdleLayout
      ? {
          width: "680px",
          height: "540px",
          scale: 0.94,
          z: -160,
          transformPerspective: 2000,
          maxWidth: "calc(100vw - 96px)",
        }
      : {
          width: dashboardWidth,
          height: dashboardHeight,
          scale: dashboardScale,
          z: dashboardZ,
          transformPerspective: 2000,
          maxWidth: "calc(100vw - 96px)",
        }
  const lightSweepStyle =
    shouldReduceMotion || useStaticIdleLayout
      ? { opacity: 0 }
      : { opacity: lightSweepOpacity, x: lightSweepX }
  const aiWrapperStyle = shouldReduceMotion
    ? { height: "360px" }
    : useStaticIdleLayout
      ? { height: "230px" }
      : { height: aiHeight }
  const radarStyle = shouldReduceMotion
    ? { opacity: 1 }
    : useStaticIdleLayout
      ? { opacity: 1 }
      : { opacity: radarOpacity }

  return (
    <>
      {/* MOBILE / TABLET — < lg (1024px). Stacked layout with full dashboard preview. */}
      <section className="relative overflow-hidden lg:hidden">
        {/* Background glows */}
        <div
          aria-hidden
          className="pointer-events-none absolute -z-10 right-[-12%] top-[8%] h-[420px] w-[560px] rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(100,116,139,0.12),_transparent_62%)] blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -z-10 left-[-18%] top-[55%] h-[380px] w-[520px] rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(148,163,184,0.10),_transparent_62%)] blur-3xl"
        />

        <div className="mx-auto max-w-[760px] px-5 pt-16 pb-12 sm:px-6 sm:pt-20 sm:pb-16 md:max-w-[920px] md:px-8 md:pt-24 md:pb-20">
          {/* Hero text */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="text-center"
          >
            <span className="section-eyebrow">{eyebrowLabel}</span>
            <h1 className="mx-auto mt-3 max-w-[18ch] font-serif text-[2.05rem] leading-[1.05] tracking-tight text-[#0B162D] sm:text-[2.5rem] md:text-[3rem]">
              {hero?.title}
            </h1>
            <p className="mx-auto mt-4 max-w-[58ch] text-[0.95rem] leading-relaxed text-[#0B162D]/70 sm:text-[1rem] md:mt-5 md:text-[1.05rem]">
              {hero?.description}
            </p>
            <div className="mt-6 sm:mt-7">
              <Link
                href={`/${lang}/contact#book`}
                className="group inline-flex items-center justify-center rounded-lg bg-[#64748B] px-5 py-3 text-[0.9rem] font-medium text-white shadow-[0_14px_28px_rgba(100,116,139,0.20)] transition-colors duration-300 hover:bg-[#475569]"
              >
                {hero?.primaryCta}
                <ArrowRight className="ml-1.5 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </motion.div>

          {/* Dashboard preview card — staggered entrance */}
          <motion.div
            initial={shouldReduceMotion ? false : "hidden"}
            whileInView={shouldReduceMotion ? undefined : "visible"}
            viewport={{ once: true, margin: "-80px" }}
            variants={{
              hidden: { opacity: 0, y: 36 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], staggerChildren: 0.16, delayChildren: 0.18 },
              },
            }}
            className="relative mt-10 overflow-hidden rounded-[22px] border border-white/70 bg-white/92 shadow-[0_8px_20px_rgba(15,23,42,0.04)] backdrop-blur-2xl sm:mt-14 md:rounded-[28px]"
          >
            {/* Subtle top sheen */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent"
            />

            {/* Header */}
            <motion.div
              variants={dashboardChildVariants}
              className="border-b border-slate-100 px-3.5 py-3 sm:px-4 sm:py-3.5"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-2 shrink-0">
                  <Image
                    src="/logo_black.png"
                    alt="smiit"
                    width={64}
                    height={24}
                    className="h-[20px] w-auto object-contain opacity-80 sm:h-[22px]"
                  />
                  <div className="h-3.5 w-px bg-slate-200" />
                  <h2 className="truncate text-[0.78rem] font-semibold text-[#0B162D] sm:text-[0.86rem]">
                    {t.dashboardTitle}
                  </h2>
                </div>
                <div className="hidden shrink-0 items-center gap-1 text-[0.6rem] text-[#0B162D]/48 sm:inline-flex">
                  <span>{t.updated}</span>
                  <ChevronDown className="h-3 w-3" />
                </div>
              </div>

              {/* Status row — period toggle */}
              <div className="mt-2.5 flex flex-wrap items-center gap-1.5 text-[0.6rem] text-[#0B162D]/48 sm:gap-2">
                <span className="hidden items-center gap-1 rounded-full bg-[#F1F5F9] px-2 py-1 sm:inline-flex">
                  <Layers3 className="h-3 w-3 text-[#64748B]" />
                  {t.sourcesConnected}
                </span>

                <div
                  role="tablist"
                  aria-label="Zeitraum"
                  className="relative inline-flex items-center gap-0.5 rounded-full bg-[#F1F5F9] p-0.5"
                >
                  {(["q", "h", "y"] as const).map((key) => {
                    const active = periodKey === key
                    return (
                      <button
                        key={key}
                        type="button"
                        role="tab"
                        aria-selected={active}
                        onClick={() => setPeriodKey(key)}
                        className={cx(
                          "relative z-10 rounded-full px-2 py-0.5 text-[0.6rem] font-medium transition-colors duration-200",
                          active ? "text-white" : "text-[#0B162D]/60 hover:text-[#0B162D]",
                        )}
                      >
                        {active && !shouldReduceMotion && (
                          <motion.span
                            layoutId="hero-mobile-period-pill"
                            transition={{ type: "spring", stiffness: 480, damping: 32 }}
                            className="absolute inset-0 -z-10 rounded-full bg-[#64748B] shadow-sm"
                          />
                        )}
                        {active && shouldReduceMotion && (
                          <span className="absolute inset-0 -z-10 rounded-full bg-[#64748B] shadow-sm" />
                        )}
                        {t.periods?.[key]}
                      </button>
                    )
                  })}
                </div>

                <span className="hidden items-center gap-1 rounded-full bg-[#F1F5F9] px-2 py-1 sm:inline-flex">
                  <Filter className="h-3 w-3 text-[#64748B]" />
                  {t.sections.filters}
                </span>
              </div>
            </motion.div>

            {/* Body — Maturity + Roadmap always; Risks only on tablet. Initiatives dropped on mobile/tablet for focus. */}
            <div className="flex flex-col gap-2.5 p-2.5 sm:gap-3 sm:p-3">
              <motion.div
                variants={dashboardChildVariants}
                className="overflow-hidden rounded-[18px] border border-slate-200/80 bg-white shadow-[0_14px_36px_rgba(18,38,63,0.07)]"
              >
                <MaturityModule t={t} data={data} reduceMotion={shouldReduceMotion} mobileEmphasis />
              </motion.div>

              <motion.div
                variants={dashboardChildVariants}
                className="flex flex-col overflow-hidden rounded-[18px] border border-slate-200/80 bg-white shadow-[0_14px_36px_rgba(18,38,63,0.07)] sm:min-h-[320px] md:min-h-[360px]"
              >
                <RoadmapModule t={t} data={data} mobileEmphasis />
              </motion.div>

              <motion.div
                variants={dashboardChildVariants}
                className="hidden min-h-[260px] flex-col overflow-hidden rounded-[18px] border border-slate-200/80 bg-white shadow-[0_14px_36px_rgba(18,38,63,0.07)] md:flex md:min-h-[280px]"
              >
                <RiskModule t={t} data={data} radarStyle={{ opacity: 1 }} />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* DESKTOP — >= lg (existing pinned hero) */}
      <section
        ref={containerRef}
        className={cx(
          "relative hidden lg:block",
          SCROLL_ANIMATIONS_ENABLED ? "lg:h-[420vh]" : "lg:h-screen",
        )}
      >
        <div className="sticky top-0 h-[100dvh] overflow-hidden">
          {/* Background glow — right side, behind the dashboard */}
          <div
            aria-hidden
            className="pointer-events-none absolute right-[5%] top-1/2 -z-10 h-[480px] w-[680px] -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(100,116,139,0.10),_transparent_62%)] blur-2xl"
          />

          {/* HERO TEXT — left column */}
          <motion.div
            style={heroTextStyle}
            className="pointer-events-none absolute inset-0 z-10 flex items-center"
          >
            <div className="mx-auto w-full max-w-[1380px] px-10">
              <div className="grid grid-cols-[1fr_1.25fr] items-center gap-10">
                <div className="pointer-events-auto text-left">
                  <span className="section-eyebrow">{eyebrowLabel}</span>

                  <div
                    role="presentation"
                    aria-hidden="true"
                    className="mx-0 mt-2 max-w-[15ch] font-serif text-[2.8rem] leading-[1.05] text-[#0B162D] xl:text-[3.2rem] 2xl:text-[3.6rem]"
                  >
                    {hero?.title}
                  </div>

                  <p className="mx-0 mt-5 max-w-[56ch] text-[0.98rem] leading-relaxed text-[#0B162D]/70 xl:text-[1.05rem]">
                    {hero?.description}
                  </p>

                  <div className="mt-9 flex justify-start">
                    <MagneticCta
                      href={`/${lang}/contact#book`}
                      className="group inline-flex items-center justify-center rounded-lg bg-[#64748B] px-5 py-3 text-[0.88rem] font-medium text-white shadow-[0_14px_28px_rgba(100,116,139,0.20)] transition-colors duration-300 hover:bg-[#475569]"
                    >
                      {hero?.primaryCta}
                      <ArrowRight className="ml-1.5 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </MagneticCta>
                  </div>
                </div>
                <div />
              </div>
            </div>
          </motion.div>

          {/* SINGLE DASHBOARD FRAME */}
          <motion.div
            style={dashboardWrapperStyle}
            className="absolute inset-0 z-20 flex items-center justify-center"
          >
            <motion.div
              style={dashboardStyle}
              className="relative overflow-hidden rounded-[28px] border border-white/70 bg-white/84 shadow-[0_34px_100px_rgba(15,23,42,0.12)] backdrop-blur-2xl"
            >
              {/* Light-sweep / glass-reflex */}
              <motion.div
                style={lightSweepStyle}
                aria-hidden
                className="pointer-events-none absolute inset-y-0 left-0 z-30 w-[45%] -skew-x-12 bg-gradient-to-r from-transparent via-white/95 to-transparent mix-blend-screen"
              />

              <div className="flex h-full min-h-0 flex-col">
                {/* Dashboard Header */}
                <div className="border-b border-slate-100 px-3.5 py-3 sm:px-4">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2 shrink-0">
                      <Image
                        src="/logo_black.png"
                        alt="smiit"
                        width={64}
                        height={24}
                        className="h-[22px] w-auto object-contain opacity-80"
                      />
                      <div className="h-3.5 w-px bg-slate-200" />
                      <h2 className="whitespace-nowrap text-[0.88rem] font-semibold text-[#0B162D]">
                        {t.dashboardTitle}
                      </h2>
                    </div>
                    <div className="inline-flex items-center gap-1 text-[0.62rem] text-[#0B162D]/48">
                      <span>{t.updated}</span>
                      <ChevronDown className="h-3 w-3" />
                    </div>
                  </div>

                  {/* Status row */}
                  <div className="mt-2 flex items-center gap-2 overflow-hidden text-[0.62rem] text-[#0B162D]/48">
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#F1F5F9] px-2 py-1">
                      <Layers3 className="h-3 w-3 text-[#64748B]" />
                      {t.sourcesConnected}
                    </span>

                    {/* Period toggle group */}
                    <div
                      role="tablist"
                      aria-label="Zeitraum"
                      className="inline-flex items-center gap-0.5 rounded-full bg-[#F1F5F9] p-0.5"
                    >
                      {(["q", "h", "y"] as const).map((key) => {
                        const active = periodKey === key
                        return (
                          <button
                            key={key}
                            type="button"
                            role="tab"
                            aria-selected={active}
                            onClick={() => setPeriodKey(key)}
                            className={cx(
                              "rounded-full px-2 py-0.5 text-[0.62rem] font-medium transition-all duration-200",
                              active
                                ? "bg-[#64748B] text-white shadow-sm"
                                : "text-[#0B162D]/60 hover:text-[#0B162D]",
                            )}
                          >
                            {t.periods?.[key]}
                          </button>
                        )
                      })}
                    </div>

                    <span className="inline-flex items-center gap-1 rounded-full bg-[#F1F5F9] px-2 py-1">
                      <Filter className="h-3 w-3 text-[#64748B]" />
                      {t.sections.filters}
                    </span>
                  </div>
                </div>

                {/* Dashboard Body */}
                <div className="flex min-h-0 flex-1 flex-row gap-2.5 overflow-hidden p-3">
                  {/* Left column */}
                  <div className="flex min-h-0 flex-1 flex-col gap-2.5">
                    <div className="relative shrink-0 overflow-visible rounded-[18px] border border-slate-200/80 bg-white shadow-[0_14px_36px_rgba(18,38,63,0.07)]">
                      <MaturityModule t={t} data={data} reduceMotion={shouldReduceMotion} />
                    </div>
                    <div className="relative flex min-h-0 flex-1 flex-col overflow-visible rounded-[18px] border border-slate-200/80 bg-white shadow-[0_14px_36px_rgba(18,38,63,0.07)]">
                      <RoadmapModule t={t} data={data} />
                    </div>
                  </div>

                  {/* Right column */}
                  <div className="flex shrink-0 basis-[33%] flex-col gap-2.5 overflow-hidden">
                    <motion.div
                      style={aiWrapperStyle}
                      className="relative flex shrink-0 flex-col overflow-visible rounded-[18px] border border-slate-200/80 bg-white shadow-[0_14px_36px_rgba(18,38,63,0.07)]"
                    >
                      <RiskModule t={t} data={data} radarStyle={radarStyle} />
                    </motion.div>
                    <div className="relative flex min-h-0 flex-1 flex-col overflow-visible rounded-[18px] border border-slate-200/80 bg-white shadow-[0_14px_36px_rgba(18,38,63,0.07)]">
                      <InitiativesModule t={t} data={data} />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
