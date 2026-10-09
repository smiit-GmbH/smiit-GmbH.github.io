"use client"

import { motion, type MotionStyle } from "framer-motion"
import { Minus, TrendingDown, TrendingUp } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import type { Locale } from "@/lib/dictionary"
import { ThemeKey, RiskKey, PhaseKey, RiskState, InitiativeBucket, Dataset, formatDelta } from "./data"
import { HeroCopy } from "./copy"
import { cx, formatNumber, CountUp } from "@/components/pages/services/shared/hero-kit"

// ---------- Module Renderers ----------

export function MaturityModule({
  t,
  data,
  reduceMotion,
  mobileEmphasis = false,
  lang,
}: {
  t: HeroCopy
  data: Dataset
  reduceMotion: boolean | null
  mobileEmphasis?: boolean
  lang: Locale
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
            const targetDisplay = formatNumber(item.score.target, 1, lang)
            const deltaDisplay = formatDelta(item.score.delta, 1, item.score.deltaUnit, lang)
            return (
              <motion.div
                key={item.key}
                whileHover={reduceMotion ? undefined : { y: -2 }}
                whileTap={mobileEmphasis && !reduceMotion ? { scale: 0.97 } : undefined}
                transition={{ type: "spring", stiffness: 320, damping: 22 }}
                className="group relative rounded-[14px] bg-[#F8FAFC] p-2.5"
              >
                <p className="text-[0.5rem] font-medium uppercase tracking-[0.08em] text-[#0B162D]/40">{item.label}</p>
                <div className="mt-1.5 flex items-baseline gap-1">
                  <CountUp
                    to={item.score.current}
                    decimals={1}
                    reduceMotion={reduceMotion}
                    lang={lang}
                    className="text-[0.92rem] font-semibold text-[#0B162D] sm:text-[0.96rem]"
                  />
                  <span className="text-[0.55rem] text-[#0B162D]/40">/ 5</span>
                  <span className="ml-auto text-[0.55rem] font-medium text-[#64748B]">→ {targetDisplay}</span>
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

export function RoadmapModule({
  t,
  data,
  lang,
  bottomLabels,
}: {
  t: HeroCopy
  data: Dataset
  mobileEmphasis?: boolean
  lang: Locale
  bottomLabels: string[]
}) {
  const themes: ThemeKey[] = ["cloud", "security", "data", "process"]
  const trendHeaderDisplay = formatDelta(data.trendHeader, 1, data.trendHeaderUnit, lang)

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
              <span className="text-[0.95rem] font-semibold">{trendHeaderDisplay}</span>
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
                    {lane.milestones.map((m, mIdx) => {
                      const milestoneLabel = t.milestoneLabels?.[m.labelKey] ?? m.labelKey
                      return (
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
                              aria-label={`${milestoneLabel} (${m.status})`}
                            />
                          </TooltipTrigger>
                          <TooltipContent side="top" className="bg-[#0B162D] text-white">
                            <div className="flex flex-col gap-0.5 text-[0.66rem] leading-tight">
                              <span className="font-semibold">{milestoneLabel}</span>
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
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Timeline labels */}
          <div className="mt-1 flex shrink-0 justify-between pl-[76px] text-[0.56rem] text-[#0B162D]/40">
            {bottomLabels.map((label, idx) => (
              <span key={`${label}-${idx}`}>{label}</span>
            ))}
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}

export function RiskModule({ t, data, radarStyle }: { t: HeroCopy; data: Dataset; radarStyle?: MotionStyle }) {
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

export function InitiativesModule({ t, data }: { t: HeroCopy; data: Dataset }) {
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
