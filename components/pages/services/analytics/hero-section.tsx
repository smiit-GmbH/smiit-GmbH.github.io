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

interface LinePoint {
  x: number
  y: number
  label: string
  value: string
  delta: string
}

interface Dataset {
  kpis: {
    revenue: { to: number; suffix?: string; decimals?: number; display: string; bar: number; delta: string }
    margin: { to: number; suffix?: string; decimals?: number; display: string; bar: number; delta: string }
    forecastConfidence: { to: number; suffix?: string; decimals?: number; display: string; bar: number; delta: string }
    activeProjects: { to: number; suffix?: string; decimals?: number; display: string; bar: number; delta: string }
  }
  trendHeader: string
  linePoints: LinePoint[]
  forecastPoint: { x: number; y: number; label: string; value: string }
  signals: { forecastRisk: string; deviation: string; opportunityScore: string; trendStrength: string }
  segments: { key: "dach" | "swiss" | "serviceUpsell" | "industrialLeads"; value: number }[]
  radarBars: number[]
  bottomLabels: string[]
}

const DATASETS: Record<PeriodKey, Dataset> = {
  y: {
    kpis: {
      revenue: { to: 4.86, decimals: 2, suffix: " Mio.", display: "4,86 Mio.", bar: 78, delta: "+18,4 %" },
      margin: { to: 18.4, decimals: 1, suffix: " %", display: "18,4 %", bar: 64, delta: "+1,2 pp" },
      forecastConfidence: { to: 89, suffix: " %", display: "89 %", bar: 89, delta: "+3 pp" },
      activeProjects: { to: 27, display: "27", bar: 54, delta: "+5" },
    },
    trendHeader: "+18,4%",
    linePoints: [
      { x: 18, y: 118, label: "Jan", value: "0,28 Mio.", delta: "+4,1 %" },
      { x: 112, y: 102, label: "Apr", value: "1,12 Mio.", delta: "+9,6 %" },
      { x: 208, y: 86, label: "Jul", value: "2,04 Mio.", delta: "+12,2 %" },
      { x: 304, y: 68, label: "Sep", value: "3,18 Mio.", delta: "+14,8 %" },
      { x: 398, y: 48, label: "Nov", value: "4,12 Mio.", delta: "+18,4 %" },
    ],
    forecastPoint: { x: 492, y: 24, label: "Dez", value: "4,86 Mio." },
    signals: { forecastRisk: "Mittel", deviation: "-7,2%", opportunityScore: "82/100", trendStrength: "0,84" },
    segments: [
      { key: "dach", value: 82 },
      { key: "swiss", value: 63 },
      { key: "serviceUpsell", value: 47 },
      { key: "industrialLeads", value: 36 },
    ],
    radarBars: [14, 18, 16, 22, 28, 26, 32, 30],
    bottomLabels: ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"],
  },
  h: {
    kpis: {
      revenue: { to: 2.41, decimals: 2, suffix: " Mio.", display: "2,41 Mio.", bar: 52, delta: "+12,8 %" },
      margin: { to: 17.1, decimals: 1, suffix: " %", display: "17,1 %", bar: 58, delta: "+0,8 pp" },
      forecastConfidence: { to: 86, suffix: " %", display: "86 %", bar: 86, delta: "+2 pp" },
      activeProjects: { to: 19, display: "19", bar: 38, delta: "+3" },
    },
    trendHeader: "+12,8%",
    linePoints: [
      { x: 18, y: 122, label: "Jul", value: "0,22 Mio.", delta: "+3,4 %" },
      { x: 112, y: 108, label: "Aug", value: "0,68 Mio.", delta: "+6,1 %" },
      { x: 208, y: 92, label: "Sep", value: "1,18 Mio.", delta: "+8,9 %" },
      { x: 304, y: 78, label: "Okt", value: "1,72 Mio.", delta: "+10,5 %" },
      { x: 398, y: 60, label: "Nov", value: "2,12 Mio.", delta: "+12,8 %" },
    ],
    forecastPoint: { x: 492, y: 38, label: "Dez", value: "2,41 Mio." },
    signals: { forecastRisk: "Niedrig", deviation: "-4,1%", opportunityScore: "74/100", trendStrength: "0,71" },
    segments: [
      { key: "dach", value: 68 },
      { key: "swiss", value: 54 },
      { key: "serviceUpsell", value: 38 },
      { key: "industrialLeads", value: 28 },
    ],
    radarBars: [12, 14, 12, 18, 22, 24, 28, 26],
    bottomLabels: ["Jul", "Aug", "Sep", "Okt", "Nov", "Dez"],
  },
  q: {
    kpis: {
      revenue: { to: 1.18, decimals: 2, suffix: " Mio.", display: "1,18 Mio.", bar: 38, delta: "+9,6 %" },
      margin: { to: 19.2, decimals: 1, suffix: " %", display: "19,2 %", bar: 70, delta: "+0,4 pp" },
      forecastConfidence: { to: 92, suffix: " %", display: "92 %", bar: 92, delta: "+1 pp" },
      activeProjects: { to: 14, display: "14", bar: 30, delta: "+2" },
    },
    trendHeader: "+9,6%",
    linePoints: [
      { x: 18, y: 116, label: "Wo 1", value: "0,18 Mio.", delta: "+2,1 %" },
      { x: 112, y: 110, label: "Wo 4", value: "0,42 Mio.", delta: "+4,4 %" },
      { x: 208, y: 96, label: "Wo 7", value: "0,68 Mio.", delta: "+6,8 %" },
      { x: 304, y: 82, label: "Wo 10", value: "0,92 Mio.", delta: "+8,2 %" },
      { x: 398, y: 70, label: "Wo 12", value: "1,08 Mio.", delta: "+9,6 %" },
    ],
    forecastPoint: { x: 492, y: 52, label: "Wo 13", value: "1,18 Mio." },
    signals: { forecastRisk: "Niedrig", deviation: "-2,4%", opportunityScore: "68/100", trendStrength: "0,62" },
    segments: [
      { key: "dach", value: 54 },
      { key: "swiss", value: 41 },
      { key: "serviceUpsell", value: 28 },
      { key: "industrialLeads", value: 22 },
    ],
    radarBars: [10, 14, 12, 16, 18, 22, 24, 28],
    bottomLabels: ["Wo 1", "Wo 4", "Wo 7", "Wo 10", "Wo 12"],
  },
}

// ---------- Path generators ----------

function smoothLinePath(points: { x: number; y: number }[]): string {
  if (points.length === 0) return ""
  let d = `M ${points[0].x} ${points[0].y}`
  for (let i = 1; i < points.length; i++) {
    const p0 = points[i - 1]
    const p1 = points[i]
    const dx = p1.x - p0.x
    const cp1x = p0.x + dx / 2
    const cp2x = p1.x - dx / 2
    d += ` C ${cp1x} ${p0.y}, ${cp2x} ${p1.y}, ${p1.x} ${p1.y}`
  }
  return d
}

function smoothAreaPath(points: { x: number; y: number }[]): string {
  if (points.length === 0) return ""
  const line = smoothLinePath(points)
  const last = points[points.length - 1]
  const first = points[0]
  return `${line} L ${last.x} 146 L ${first.x} 146 Z`
}

function forecastSegmentPath(from: { x: number; y: number }, to: { x: number; y: number }): string {
  const dx = to.x - from.x
  const cp1x = from.x + dx / 2
  const cp2x = to.x - dx / 2
  return `M ${from.x} ${from.y} C ${cp1x} ${from.y}, ${cp2x} ${to.y}, ${to.x} ${to.y}`
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

function ClarityModule({
  t,
  data,
  reduceMotion,
}: {
  t: any
  data: Dataset
  reduceMotion: boolean | null
}) {
  const items = [
    { label: t.kpiLabels?.revenue, kpi: data.kpis.revenue, deltaLabel: t.kpiDeltaLabels?.revenue },
    { label: t.kpiLabels?.margin, kpi: data.kpis.margin, deltaLabel: t.kpiDeltaLabels?.margin },
    { label: t.kpiLabels?.forecastConfidence, kpi: data.kpis.forecastConfidence, deltaLabel: t.kpiDeltaLabels?.forecastConfidence },
    { label: t.kpiLabels?.activeProjects, kpi: data.kpis.activeProjects, deltaLabel: t.kpiDeltaLabels?.activeProjects },
  ]
  return (
    <div className="overflow-hidden rounded-[18px]">
      <div className="p-3">
        <p className="text-[0.72rem] font-semibold text-[#0B162D]">{t.sections.kpis}</p>
        <div className="mt-2.5 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {items.map((item, i) => (
            <motion.div
              key={item.label}
              whileHover={reduceMotion ? undefined : { y: -2 }}
              transition={{ type: "spring", stiffness: 320, damping: 22 }}
              className="group relative rounded-[14px] bg-[#F8FBFE] p-2.5"
            >
              <p className="text-[0.5rem] font-medium uppercase tracking-[0.08em] text-[#0B162D]/40">{item.label}</p>
              <p className="mt-1.5 text-[0.82rem] font-semibold text-[#0B162D] sm:text-[0.86rem]">
                <CountUp
                  to={item.kpi.to}
                  decimals={item.kpi.decimals ?? 0}
                  suffix={item.kpi.suffix ?? ""}
                  reduceMotion={reduceMotion}
                />
              </p>
              <div className="mt-2 h-1 overflow-hidden rounded-full bg-slate-100">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${item.kpi.bar}%` }}
                  transition={{ duration: 1.0, delay: 0.5 + i * 0.12, ease: "easeOut" }}
                  className="h-full rounded-full bg-gradient-to-r from-[#21569c] to-[#7DBBFF]"
                />
              </div>
              {/* Delta badge — fades in on hover */}
              <div className="pointer-events-none absolute -top-1.5 right-2 translate-y-1 opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100">
                <span className="inline-flex items-center gap-1 rounded-full bg-[#0B162D] px-2 py-0.5 text-[0.5rem] font-semibold text-white shadow-md">
                  {item.kpi.delta}
                  {item.deltaLabel ? <span className="font-normal text-white/60">· {item.deltaLabel}</span> : null}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ProfitModule({ t, data }: { t: any; data: Dataset }) {
  const linePath = smoothLinePath(data.linePoints)
  const areaPath = smoothAreaPath(data.linePoints)
  const lastActual = data.linePoints[data.linePoints.length - 1]
  const forecastPath = forecastSegmentPath(lastActual, data.forecastPoint)

  return (
    <TooltipProvider delayDuration={80}>
      <div className="flex h-full flex-col overflow-hidden rounded-[18px] p-2">
        <div className="flex shrink-0 items-center justify-between">
          <div className="text-left">
            <p className="text-[0.72rem] font-semibold text-[#0B162D]">{t.sections.trend}</p>
            <p className="mt-0.5 text-[0.58rem] text-[#0B162D]/50">{t.sections.trendSub}</p>
          </div>
          <div className="rounded-[14px] border border-slate-200/80 bg-[#F8FBFE] px-2.5 py-2 text-right">
            <div className="flex items-center gap-1 text-[#21569c]">
              <TrendingUp className="h-3.5 w-3.5" />
              <span className="text-[0.95rem] font-semibold">{data.trendHeader}</span>
            </div>
          </div>
        </div>

        <div className="mt-2 flex min-h-0 flex-1 flex-col rounded-[16px] border border-slate-200/80 bg-[#F8FBFE] p-2">
          <div className="mb-1 flex shrink-0 items-center gap-3 text-[0.56rem] text-[#0B162D]/46">
            <span className="inline-flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-[#21569c]" />
              {t.chartLegend?.actual}
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-[#0B162D]/30" />
              {t.chartLegend?.forecast}
            </span>
          </div>

          <div className="relative my-auto aspect-[510/150] w-full">
            <svg viewBox="0 0 510 150" className="absolute inset-0 block h-full w-full">
              <defs>
                <linearGradient id="hdj-profit-area" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="rgba(33,86,156,0.14)" />
                  <stop offset="100%" stopColor="rgba(33,86,156,0)" />
                </linearGradient>
                <linearGradient id="hdj-profit-line" x1="0" x2="1" y1="0" y2="0">
                  <stop offset="0%" stopColor="#21569c" />
                  <stop offset="100%" stopColor="#7DBBFF" />
                </linearGradient>
              </defs>
              {[26, 54, 82, 110].map((y) => (
                <line key={y} x1="16" x2="494" y1={y} y2={y} stroke="rgba(15,23,42,0.06)" strokeDasharray="4 6" />
              ))}
              <motion.path
                key={`area-${areaPath}`}
                d={areaPath}
                fill="url(#hdj-profit-area)"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              />
              <motion.path
                key={`line-${linePath}`}
                d={linePath}
                fill="none"
                stroke="url(#hdj-profit-line)"
                strokeWidth="3.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
              />
              <motion.path
                key={`forecast-${forecastPath}`}
                d={forecastPath}
                fill="none"
                stroke="rgba(15,23,42,0.35)"
                strokeWidth="2.4"
                strokeDasharray="5 6"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.6, delay: 1.2, ease: "easeOut" }}
              />
            </svg>

            {/* Data points as HTML overlays — interactive with tooltips */}
            <div className="absolute inset-0">
              {data.linePoints.map((p, idx) => (
                <Tooltip key={`pp-${idx}-${p.x}-${p.y}`}>
                  <TooltipTrigger asChild>
                    <motion.button
                      type="button"
                      aria-label={`${p.label}: ${p.value}`}
                      initial={{ opacity: 0, scale: 0.6 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.35, delay: 0.5 + idx * 0.1, ease: "easeOut" }}
                      className="absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full bg-[#21569c] ring-4 ring-[#21569c]/10 transition-[box-shadow,filter] hover:brightness-110 hover:ring-[5px] hover:ring-[#21569c]/30 focus-visible:outline-none focus-visible:ring-[#21569c]/40"
                      style={{ left: `${(p.x / 510) * 100}%`, top: `${(p.y / 150) * 100}%` }}
                    />
                  </TooltipTrigger>
                  <TooltipContent side="top" className="bg-[#0B162D] text-white">
                    <div className="flex flex-col gap-0.5 text-[0.66rem] leading-tight">
                      <span className="font-semibold">{p.label}</span>
                      <span className="text-white/70">
                        {t.trendTooltip?.revenueLabel}: {p.value}
                      </span>
                      <span className="text-[#7DBBFF]">
                        {t.trendTooltip?.deltaLabel} {p.delta}
                      </span>
                    </div>
                  </TooltipContent>
                </Tooltip>
              ))}

              {/* Forecast point */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <motion.button
                    type="button"
                    aria-label={`${data.forecastPoint.label}: ${data.forecastPoint.value}`}
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.35, delay: 1.6, ease: "easeOut" }}
                    className="absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full bg-[#0F172A]/35 ring-4 ring-[#0F172A]/[0.06] transition-[box-shadow,filter] hover:brightness-125 hover:ring-[5px] hover:ring-[#0F172A]/15 focus-visible:outline-none focus-visible:ring-[#0F172A]/30"
                    style={{
                      left: `${(data.forecastPoint.x / 510) * 100}%`,
                      top: `${(data.forecastPoint.y / 150) * 100}%`,
                    }}
                  />
                </TooltipTrigger>
                <TooltipContent side="top" className="bg-[#0B162D] text-white">
                  <div className="flex flex-col gap-0.5 text-[0.66rem] leading-tight">
                    <span className="font-semibold">{data.forecastPoint.label}</span>
                    <span className="text-white/70">
                      {t.trendTooltip?.revenueLabel}: {data.forecastPoint.value}
                    </span>
                    <span className="text-white/50">{t.trendTooltip?.forecastLabel}</span>
                  </div>
                </TooltipContent>
              </Tooltip>

              {/* Live pulse on the latest actual data point */}
              <motion.div
                initial={{ opacity: 0, scale: 1 }}
                animate={{ opacity: [0, 0.7, 0], scale: [1, 4.5, 4.5] }}
                transition={{ duration: 2.4, delay: 2.0, repeat: Infinity, repeatDelay: 1.4, ease: "easeOut" }}
                className="pointer-events-none absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full border-[1.5px] border-[#21569c]/50"
                style={{ left: `${(lastActual.x / 510) * 100}%`, top: `${(lastActual.y / 150) * 100}%` }}
              />
            </div>
          </div>
          <div className="mt-1 flex shrink-0 justify-between text-[0.56rem] text-[#0B162D]/40">
            {data.bottomLabels.map((label, idx) => (
              <span key={`${label}-${idx}`}>{label}</span>
            ))}
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}

function AiModule({ t, data, radarStyle }: { t: any; data: Dataset; radarStyle?: any }) {
  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-[18px]">
      <div className="flex min-h-0 flex-1 flex-col p-2 sm:p-3">
        <p className="shrink-0 text-[0.72rem] font-semibold text-[#0B162D]">{t.sections.signals}</p>
        <div className="mt-1.5 shrink-0 sm:mt-2.5 grid grid-cols-2 gap-1.5 sm:gap-2">
          {[
            { label: t.signalLabels?.forecastRisk, value: data.signals.forecastRisk },
            { label: t.signalLabels?.deviation, value: data.signals.deviation },
            { label: t.signalLabels?.opportunityScore, value: data.signals.opportunityScore },
            { label: t.signalLabels?.trendStrength, value: data.signals.trendStrength },
          ].map((item) => (
            <div key={item.label} className="rounded-[14px] bg-[#F8FBFE] p-1.5 sm:p-2.5">
              <p className="text-[0.52rem] font-medium uppercase tracking-[0.14em] text-[#0B162D]/38">{item.label}</p>
              <p className="mt-1 text-[0.82rem] font-semibold text-[#0B162D] sm:mt-1.5 sm:text-[0.9rem]">{item.value}</p>
            </div>
          ))}
        </div>
        <motion.div
          style={radarStyle}
          className="mt-1.5 flex min-h-0 flex-1 flex-col overflow-hidden rounded-[14px] bg-[#F8FBFE] p-1.5 sm:mt-2.5 sm:p-2.5"
        >
          <div className="shrink-0 flex items-center justify-between text-[0.56rem] text-[#0B162D]/44">
            <span>{t.signalRadar?.title}</span>
            <span>{t.signalRadar?.period}</span>
          </div>
          <div className="mt-1 flex min-h-0 flex-1 items-end gap-1 sm:mt-2">
            {data.radarBars.map((h, i) => (
              <motion.div
                key={i}
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{ scaleY: 1, opacity: 1 }}
                transition={{ duration: 0.55, delay: 1.0 + i * 0.06, ease: "easeOut" }}
                style={{ height: `${Math.round((h / 32) * 95)}%`, transformOrigin: "bottom" }}
                className="flex-1 rounded-t-md bg-[#DCEBFF]"
              >
                <motion.div
                  initial={{ scaleY: 0.5 }}
                  animate={{ scaleY: [0.5, 0.32 + (i % 3) * 0.12, 0.4 + (i % 4) * 0.08, 0.32 + (i % 3) * 0.12] }}
                  transition={{ duration: 8, delay: 1.4 + i * 0.05, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                  className="h-full w-full rounded-t-md bg-gradient-to-t from-[#21569c] to-[#7DBBFF] opacity-70"
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

function SpeedModule({ t, data }: { t: any; data: Dataset }) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-[18px]">
      <div className="flex flex-1 flex-col p-2 sm:p-3">
        <p className="shrink-0 text-[0.72rem] font-semibold text-[#0B162D]">{t.sections.potentials}</p>
        <div className="mt-1.5 flex flex-1 flex-col justify-around sm:mt-2.5">
          {data.segments.map((seg, i) => (
            <div key={seg.key}>
              <div className="mb-0.5 flex items-center justify-between text-[0.6rem] sm:mb-1">
                <span className="text-[#0B162D]/68">{t.segments?.[seg.key]}</span>
                <span className="font-semibold text-[#21569c]">{seg.value}%</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${seg.value}%` }}
                  transition={{ duration: 0.9, delay: 0.4 + i * 0.1, ease: "easeOut" }}
                  className="h-full rounded-full bg-gradient-to-r from-[#21569c] to-[#7DBBFF]"
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

export default function HeroSection({ lang, dict }: HeroSectionProps) {
  const containerRef = useRef<HTMLElement>(null)
  const shouldReduceMotion = useReducedMotion()

  // Toggle the scroll-driven dashboard growth. Flip to true to restore the cinematic morph.
  const SCROLL_ANIMATIONS_ENABLED = false

  const hero = dict?.servicesAnalytics?.hero
  const eyebrowLabel = dict?.servicesAnalytics?.eyebrows?.hero

  const t = {
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
      ? { opacity: 0 }
      : { opacity: radarOpacity }

  return (
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
          className="pointer-events-none absolute right-[5%] top-1/2 -z-10 h-[480px] w-[680px] -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(33,86,156,0.10),_transparent_62%)] blur-2xl"
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

                <h1 className="mx-0 mt-2 max-w-[15ch] font-serif text-[2.8rem] leading-[1.05] text-[#0B162D] xl:text-[3.2rem] 2xl:text-[3.6rem]">
                  {hero?.title}
                </h1>

                <p className="mx-0 mt-5 max-w-[56ch] text-[0.98rem] leading-relaxed text-[#0B162D]/70 xl:text-[1.05rem]">
                  {hero?.description}
                </p>

                <div className="mt-9 flex justify-start">
                  <MagneticCta
                    href={`/${lang}/contact#book`}
                    className="group inline-flex items-center justify-center rounded-lg bg-[#21569c] px-5 py-3 text-[0.88rem] font-medium text-white shadow-[0_14px_28px_rgba(33,86,156,0.20)] transition-colors duration-300 hover:bg-[#1d4d8b]"
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
                      Management Dashboard
                    </h2>
                  </div>
                  <div className="inline-flex items-center gap-1 text-[0.62rem] text-[#0B162D]/48">
                    <span>{t.updated}</span>
                    <ChevronDown className="h-3 w-3" />
                  </div>
                </div>

                {/* Status row */}
                <div className="mt-2 flex items-center gap-2 overflow-hidden text-[0.62rem] text-[#0B162D]/48">
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#F7FAFF] px-2 py-1">
                    <Layers3 className="h-3 w-3 text-[#21569c]" />
                    {t.sourcesConnected}
                  </span>

                  {/* Period toggle group — replaces static date pill */}
                  <div
                    role="tablist"
                    aria-label="Zeitraum"
                    className="inline-flex items-center gap-0.5 rounded-full bg-[#F7FAFF] p-0.5"
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
                              ? "bg-[#21569c] text-white shadow-sm"
                              : "text-[#0B162D]/60 hover:text-[#0B162D]",
                          )}
                        >
                          {t.periods?.[key]}
                        </button>
                      )
                    })}
                  </div>

                  <span className="inline-flex items-center gap-1 rounded-full bg-[#F7FAFF] px-2 py-1">
                    <Filter className="h-3 w-3 text-[#21569c]" />
                    {t.sections.filters}
                  </span>
                </div>
              </div>

              {/* Dashboard Body */}
              <div className="flex min-h-0 flex-1 flex-row gap-2.5 overflow-hidden p-3">
                {/* Left column */}
                <div className="flex min-h-0 flex-1 flex-col gap-2.5">
                  <div className="relative shrink-0 overflow-visible rounded-[18px] border border-slate-200/80 bg-white shadow-[0_14px_36px_rgba(18,38,63,0.07)]">
                    <ClarityModule t={t} data={data} reduceMotion={shouldReduceMotion} />
                  </div>
                  <div className="relative flex min-h-0 flex-1 flex-col overflow-visible rounded-[18px] border border-slate-200/80 bg-white shadow-[0_14px_36px_rgba(18,38,63,0.07)]">
                    <ProfitModule t={t} data={data} />
                  </div>
                </div>

                {/* Right column */}
                <div className="flex shrink-0 basis-[33%] flex-col gap-2.5 overflow-hidden">
                  <motion.div
                    style={aiWrapperStyle}
                    className="relative flex shrink-0 flex-col overflow-visible rounded-[18px] border border-slate-200/80 bg-white shadow-[0_14px_36px_rgba(18,38,63,0.07)]"
                  >
                    <AiModule t={t} data={data} radarStyle={radarStyle} />
                  </motion.div>
                  <div className="relative flex min-h-0 flex-1 flex-col overflow-visible rounded-[18px] border border-slate-200/80 bg-white shadow-[0_14px_36px_rgba(18,38,63,0.07)]">
                    <SpeedModule t={t} data={data} />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  )
}

