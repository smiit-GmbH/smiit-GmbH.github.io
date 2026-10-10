"use client"

import { useEffect, useId, useRef, useState } from "react"
import { motion, useInView, type MotionStyle } from "framer-motion"
import { TrendingUp } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useActiveInView } from "@/hooks/use-active-in-view"
import type { Locale } from "@/lib/dictionary"
import { Dataset } from "./data"
import {
  smoothLinePath,
  smoothAreaPath,
  forecastSegmentPath,
  resolveSuffix,
  formatDelta,
  formatValue,
} from "./chart-utils"
import { HeroCopy } from "./copy"
import { formatNumber, CountUp } from "@/components/pages/services/shared/hero-kit"

// ---------- Module Renderers ----------

export function ClarityModule({
  t,
  data,
  reduceMotion,
  mobileEmphasis = false,
  lang,
  millionSuffix,
}: {
  t: HeroCopy
  data: Dataset
  reduceMotion: boolean | null
  mobileEmphasis?: boolean
  lang: Locale
  millionSuffix: string
}) {
  const items = [
    { key: "revenue", label: t.kpiLabels?.revenue, kpi: data.kpis.revenue, deltaLabel: t.kpiDeltaLabels?.revenue },
    { key: "margin", label: t.kpiLabels?.margin, kpi: data.kpis.margin, deltaLabel: t.kpiDeltaLabels?.margin },
    {
      key: "forecastConfidence",
      label: t.kpiLabels?.forecastConfidence,
      kpi: data.kpis.forecastConfidence,
      deltaLabel: t.kpiDeltaLabels?.forecastConfidence,
    },
    {
      key: "activeProjects",
      label: t.kpiLabels?.activeProjects,
      kpi: data.kpis.activeProjects,
      deltaLabel: t.kpiDeltaLabels?.activeProjects,
    },
  ]
  return (
    <div className="overflow-hidden rounded-[18px]">
      <div className="p-3">
        <p className="text-[0.72rem] font-semibold text-[#0B162D]">{t.sections.kpis}</p>
        <div className="mt-2.5 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {items.map((item, i) => {
            const suffix = resolveSuffix(item.kpi.suffix, millionSuffix)
            const deltaDisplay = formatDelta(item.kpi.deltaValue, item.kpi.deltaDecimals ?? 0, item.kpi.deltaUnit, lang)
            return (
              <motion.div
                key={item.label}
                whileHover={reduceMotion ? undefined : { y: -2 }}
                whileTap={mobileEmphasis && !reduceMotion ? { scale: 0.97 } : undefined}
                transition={{ type: "spring", stiffness: 320, damping: 22 }}
                className="group relative rounded-[14px] bg-[#F8FBFE] p-2.5"
              >
                <p className="text-[0.5rem] font-medium uppercase tracking-[0.08em] text-[#0B162D]/40">{item.label}</p>
                <p className="mt-1.5 text-[0.82rem] font-semibold text-[#0B162D] sm:text-[0.86rem]">
                  <CountUp
                    to={item.kpi.to}
                    decimals={item.kpi.decimals ?? 0}
                    suffix={suffix}
                    reduceMotion={reduceMotion}
                    lang={lang}
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
                    {deltaDisplay}
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

export function ProfitModule({
  t,
  data,
  mobileEmphasis = false,
  lang,
  millionSuffix,
  bottomLabels,
  linePointLabels,
  forecastPointLabel,
}: {
  t: HeroCopy
  data: Dataset
  mobileEmphasis?: boolean
  lang: Locale
  millionSuffix: string
  bottomLabels: string[]
  linePointLabels: string[]
  forecastPointLabel: string
}) {
  const linePath = smoothLinePath(data.linePoints)
  const areaPath = smoothAreaPath(data.linePoints)
  const lastActual = data.linePoints[data.linePoints.length - 1]
  const forecastPath = forecastSegmentPath(lastActual, data.forecastPoint)
  const trendHeaderDisplay = formatDelta(data.trendHeaderValue, data.trendHeaderDecimals, data.trendHeaderUnit, lang)
  const forecastValueDisplay = formatValue(
    data.forecastPoint.valueNumber,
    data.forecastPoint.valueDecimals,
    resolveSuffix(data.forecastPoint.valueSuffix, millionSuffix),
    lang,
  )

  // Unique gradient IDs per instance — ProfitModule renders twice on this page
  // (mobile + desktop hero), so shared SVG defs IDs would collide.
  const uid = useId().replace(/[:]/g, "")
  const areaGradId = `hdj-profit-area-${uid}`
  const lineGradId = `hdj-profit-line-${uid}`

  const [ref, inView] = useActiveInView()

  // On mobile, hover does nothing — auto-open the forecast tooltip on first
  // reveal so users see the "Konfidenz 89%" payload without needing to tap.
  const chartRef = useRef<HTMLDivElement>(null)
  const chartRevealed = useInView(chartRef, { once: true, margin: "-30%" })
  const [forecastTooltipOpen, setForecastTooltipOpen] = useState<boolean | undefined>(
    mobileEmphasis ? false : undefined,
  )
  useEffect(() => {
    if (!mobileEmphasis || !chartRevealed) return
    const showTimer = setTimeout(() => setForecastTooltipOpen(true), 1900)
    const hideTimer = setTimeout(() => setForecastTooltipOpen(false), 4400)
    return () => {
      clearTimeout(showTimer)
      clearTimeout(hideTimer)
    }
  }, [mobileEmphasis, chartRevealed])

  return (
    <TooltipProvider delayDuration={80}>
      <div ref={ref} className="flex h-full flex-col overflow-hidden rounded-[18px] p-2">
        <div className="flex shrink-0 items-center justify-between">
          <div className="text-left">
            <p className="text-[0.72rem] font-semibold text-[#0B162D]">{t.sections.trend}</p>
            <p className="mt-0.5 text-[0.58rem] text-[#0B162D]/50">{t.sections.trendSub}</p>
          </div>
          <div className="rounded-[14px] border border-slate-200/80 bg-[#F8FBFE] px-2.5 py-2 text-right">
            <div className="flex items-center gap-1 text-[#21569c]">
              <TrendingUp className="h-3.5 w-3.5" />
              <span className="text-[0.95rem] font-semibold">{trendHeaderDisplay}</span>
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

          <div ref={chartRef} className="relative my-auto aspect-[510/150] w-full">
            <svg viewBox="0 0 510 150" className="absolute inset-0 block h-full w-full">
              <defs>
                <linearGradient id={areaGradId} x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="rgba(33,86,156,0.14)" />
                  <stop offset="100%" stopColor="rgba(33,86,156,0)" />
                </linearGradient>
                <linearGradient id={lineGradId} x1="0" x2="1" y1="0" y2="0">
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
                fill={`url(#${areaGradId})`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              />
              <motion.path
                key={`line-${linePath}`}
                d={linePath}
                fill="none"
                stroke={`url(#${lineGradId})`}
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
              {data.linePoints.map((p, idx) => {
                const pointLabel = linePointLabels[idx] ?? ""
                const pointValueDisplay = formatValue(
                  p.valueNumber,
                  p.valueDecimals,
                  resolveSuffix(p.valueSuffix, millionSuffix),
                  lang,
                )
                const pointDeltaDisplay = formatDelta(p.deltaValue, p.deltaDecimals, p.deltaUnit, lang)
                return (
                  <Tooltip key={`pp-${idx}-${p.x}-${p.y}`}>
                    <TooltipTrigger asChild>
                      <motion.button
                        type="button"
                        aria-label={`${pointLabel}: ${pointValueDisplay}`}
                        initial={{ opacity: 0, scale: 0.6 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.35, delay: 0.5 + idx * 0.1, ease: "easeOut" }}
                        className="absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full bg-[#21569c] ring-4 ring-[#21569c]/10 transition-[box-shadow,filter] hover:brightness-110 hover:ring-[5px] hover:ring-[#21569c]/30 focus-visible:outline-none focus-visible:ring-[#21569c]/40"
                        style={{ left: `${(p.x / 510) * 100}%`, top: `${(p.y / 150) * 100}%` }}
                      />
                    </TooltipTrigger>
                    <TooltipContent side="top" className="bg-[#0B162D] text-white">
                      <div className="flex flex-col gap-0.5 text-[0.66rem] leading-tight">
                        <span className="font-semibold">{pointLabel}</span>
                        <span className="text-white/70">
                          {t.trendTooltip?.revenueLabel}: {pointValueDisplay}
                        </span>
                        <span className="text-[#7DBBFF]">
                          {t.trendTooltip?.deltaLabel} {pointDeltaDisplay}
                        </span>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                )
              })}

              {/* Forecast point */}
              <Tooltip
                open={mobileEmphasis ? forecastTooltipOpen : undefined}
                onOpenChange={mobileEmphasis ? setForecastTooltipOpen : undefined}
              >
                <TooltipTrigger asChild>
                  <motion.button
                    type="button"
                    aria-label={`${forecastPointLabel}: ${forecastValueDisplay}`}
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
                    <span className="font-semibold">{forecastPointLabel}</span>
                    <span className="text-white/70">
                      {t.trendTooltip?.revenueLabel}: {forecastValueDisplay}
                    </span>
                    <span className="text-white/50">{t.trendTooltip?.forecastLabel}</span>
                  </div>
                </TooltipContent>
              </Tooltip>

              {/* Live pulse on the latest actual data point */}
              <motion.div
                initial={{ opacity: 0, scale: 1 }}
                animate={inView ? { opacity: [0, 0.7, 0], scale: [1, 4.5, 4.5] } : { opacity: 0, scale: 1 }}
                transition={{
                  duration: 2.4,
                  delay: 2.0,
                  repeat: inView ? Infinity : 0,
                  repeatDelay: 1.4,
                  ease: "easeOut",
                }}
                className="pointer-events-none absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full border-[1.5px] border-[#21569c]/50"
                style={{ left: `${(lastActual.x / 510) * 100}%`, top: `${(lastActual.y / 150) * 100}%` }}
              />
            </div>
          </div>
          <div className="mt-1 flex shrink-0 justify-between text-[0.56rem] text-[#0B162D]/40">
            {bottomLabels.map((label, idx) => (
              <span key={`${label}-${idx}`}>{label}</span>
            ))}
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}

export function AiModule({
  t,
  data,
  radarStyle,
  lang,
}: {
  t: HeroCopy
  data: Dataset
  radarStyle?: MotionStyle
  lang: Locale
}) {
  const forecastRiskValue = t.signalValues?.[data.signals.forecastRiskKey] ?? data.signals.forecastRiskKey
  const deviationDisplay = formatDelta(data.signals.deviationValue, data.signals.deviationDecimals, "%", lang)
  const trendStrengthDisplay = formatNumber(data.signals.trendStrengthValue, data.signals.trendStrengthDecimals, lang)
  const [ref, inView] = useActiveInView()
  return (
    <div ref={ref} className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-[18px]">
      <div className="flex min-h-0 flex-1 flex-col p-2 sm:p-3">
        <p className="shrink-0 text-[0.72rem] font-semibold text-[#0B162D]">{t.sections.signals}</p>
        <div className="mt-1.5 shrink-0 sm:mt-2.5 grid grid-cols-2 gap-1.5 sm:gap-2">
          {[
            { label: t.signalLabels?.forecastRisk, value: forecastRiskValue },
            { label: t.signalLabels?.deviation, value: deviationDisplay },
            { label: t.signalLabels?.opportunityScore, value: data.signals.opportunityScore },
            { label: t.signalLabels?.trendStrength, value: trendStrengthDisplay },
          ].map((item) => (
            <div key={item.label} className="rounded-[14px] bg-[#F8FBFE] p-1.5 sm:p-2.5">
              <p className="text-[0.52rem] font-medium uppercase tracking-[0.14em] text-[#0B162D]/38">{item.label}</p>
              <p className="mt-1 text-[0.82rem] font-semibold text-[#0B162D] sm:mt-1.5 sm:text-[0.9rem]">
                {item.value}
              </p>
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
                  animate={
                    inView
                      ? { scaleY: [0.5, 0.32 + (i % 3) * 0.12, 0.4 + (i % 4) * 0.08, 0.32 + (i % 3) * 0.12] }
                      : { scaleY: 0.5 }
                  }
                  transition={{
                    duration: 8,
                    delay: 1.4 + i * 0.05,
                    repeat: inView ? Infinity : 0,
                    repeatType: "reverse",
                    ease: "easeInOut",
                  }}
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

export function SpeedModule({ t, data }: { t: HeroCopy; data: Dataset }) {
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
