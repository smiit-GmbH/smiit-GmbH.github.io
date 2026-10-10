"use client"

import { motion, type MotionStyle } from "framer-motion"
import { useActiveInView } from "@/hooks/use-active-in-view"
import type { Locale } from "@/lib/dictionary"
import { Priority, Dataset } from "./data"
import { HeroCopy } from "./copy"
import { cx, CountUp } from "@/components/pages/services/shared/hero-kit"

// ---------- Module Renderers ----------

// Stats (4 KPI cards)
export function ClarityModule({
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
  const items = [
    { key: "orders", label: t.statLabels?.orders, kpi: data.stats.orders, deltaLabel: t.statDeltas?.orders },
    {
      key: "customers",
      label: t.statLabels?.customers,
      kpi: data.stats.customers,
      deltaLabel: t.statDeltas?.customers,
    },
    { key: "tasks", label: t.statLabels?.tasks, kpi: data.stats.tasks, deltaLabel: t.statDeltas?.tasks },
    { key: "revenue", label: t.statLabels?.revenue, kpi: data.stats.revenue, deltaLabel: t.statDeltas?.revenue },
  ]
  return (
    <div className="overflow-hidden rounded-[18px]">
      <div className="p-3">
        <p className="text-[0.72rem] font-semibold text-[#0B162D]">{t.sections?.stats}</p>
        <div className="mt-2.5 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {items.map((item, i) => (
            <motion.div
              key={item.key}
              whileHover={reduceMotion ? undefined : { y: -2 }}
              whileTap={mobileEmphasis && !reduceMotion ? { scale: 0.97 } : undefined}
              transition={{ type: "spring", stiffness: 320, damping: 22 }}
              className="group relative rounded-[14px] bg-[#FEF8FE] p-2.5"
            >
              <p className="break-words text-[0.5rem] font-medium uppercase leading-tight tracking-[0.08em] text-[#0B162D]/40">
                {item.label}
              </p>
              <p className="mt-1.5 text-[0.82rem] font-semibold text-[#0B162D] sm:text-[0.86rem]">
                <CountUp
                  to={item.kpi.to}
                  decimals={item.kpi.decimals ?? 0}
                  suffix={item.kpi.suffix ?? ""}
                  reduceMotion={reduceMotion}
                  lang={lang}
                />
              </p>
              <div className="mt-2 h-1 overflow-hidden rounded-full bg-slate-100">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${item.kpi.bar}%` }}
                  transition={{ duration: 1.0, delay: 0.5 + i * 0.12, ease: "easeOut" }}
                  className="h-full rounded-full bg-gradient-to-r from-[#F703EB] to-[#FA85F4]"
                />
              </div>
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

// Pipeline kanban (3 columns)
export function ProfitModule({ t, data }: { t: HeroCopy; data: Dataset; mobileEmphasis?: boolean }) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-[18px] p-2">
      <div className="flex shrink-0 items-center justify-between">
        <div className="text-left">
          <p className="text-[0.72rem] font-semibold text-[#0B162D]">{t.sections?.pipeline}</p>
          <p className="mt-0.5 text-[0.58rem] text-[#0B162D]/50">{t.sections?.pipelineSub}</p>
        </div>
        <div className="rounded-[14px] border border-slate-200/80 bg-[#FEF8FE] px-2.5 py-2 text-right">
          <div className="flex items-baseline gap-1 text-[#F703EB]">
            <span className="text-[0.95rem] font-semibold">{data.pipelineTotal}</span>
            <span className="text-[0.5rem] uppercase tracking-wider text-[#F703EB]/60">{t.activeBadge}</span>
          </div>
        </div>
      </div>

      <div className="mt-2 flex min-h-0 flex-1 flex-col rounded-[16px] border border-slate-200/80 bg-[#FEF8FE] p-2">
        <div className="grid h-full grid-cols-3 gap-1.5">
          {data.pipeline.map((col, ci) => (
            <div key={col.key} className="flex min-h-0 flex-col">
              <div className="mb-1 flex shrink-0 items-center justify-between">
                <span className="text-[0.55rem] font-semibold uppercase tracking-wider text-[#0B162D]/55">
                  {t.pipelineColumns?.[col.key]}
                </span>
                <span className="rounded-full bg-white/80 px-1.5 py-0.5 text-[0.5rem] font-mono font-bold text-[#0B162D]/60">
                  {col.count}
                </span>
              </div>
              <div className="flex min-h-0 flex-1 flex-col gap-1 overflow-hidden">
                {col.items.map((item, i) => (
                  <motion.div
                    key={`${col.key}-${i}-${item.name}`}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 0.3 + (ci * 3 + i) * 0.06, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ y: -1 }}
                    className={cx(
                      "shrink-0 cursor-default rounded-[10px] border bg-white p-1.5 shadow-[0_2px_6px_rgba(15,23,42,0.04)] transition-shadow",
                      ci === 1 ? "border-[#F703EB]/35" : "border-slate-200/80",
                    )}
                  >
                    <div className="truncate text-[0.6rem] font-semibold text-[#0B162D]">{item.name}</div>
                    <div className="mt-0.5 flex items-center justify-between gap-1">
                      <span className="text-[0.55rem] font-medium text-[#0B162D]/68">{item.amount}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Live activity feed
export function AiModule({
  t,
  data,
  activities,
}: {
  t: HeroCopy
  data: Dataset
  radarStyle?: MotionStyle
  activities: { user: string; action: string; time: string }[]
}) {
  const [ref, inView] = useActiveInView()
  return (
    <div ref={ref} className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-[18px]">
      <div className="flex min-h-0 flex-1 flex-col p-2 sm:p-3">
        <div className="shrink-0 flex items-center justify-between">
          <p className="text-[0.72rem] font-semibold text-[#0B162D]">{t.sections?.activity}</p>
          <div className="flex items-center gap-1">
            <motion.span
              animate={inView ? { opacity: [1, 0.4, 1] } : { opacity: 1 }}
              transition={{ duration: 1.6, repeat: inView ? Infinity : 0, ease: "easeInOut" }}
              className="h-1.5 w-1.5 rounded-full bg-emerald-500"
            />
            <span className="text-[0.5rem] font-mono font-semibold uppercase tracking-[0.18em] text-emerald-600">
              live
            </span>
          </div>
        </div>
        <div className="mt-2 flex min-h-0 flex-1 flex-col justify-between gap-1.5">
          {data.activityVisuals.map((visual, i) => {
            const content = activities[i] ?? { user: "", action: "", time: "" }
            return (
              <motion.div
                key={`${content.user}-${i}`}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.45, delay: 0.5 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="flex shrink-0 items-start gap-1.5 rounded-[10px] bg-[#FEF8FE] p-1.5"
              >
                <div
                  className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[0.5rem] font-bold text-white"
                  style={{ backgroundColor: visual.color }}
                >
                  {visual.initials}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[0.58rem] leading-tight text-[#0B162D]">
                    <span className="font-semibold">{content.user}</span>{" "}
                    <span className="text-[#0B162D]/65">{content.action}</span>
                  </div>
                  <div className="mt-0.5 text-[0.5rem] text-[#0B162D]/40">{content.time}</div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// Open tasks list
export function SpeedModule({
  t,
  data,
  tasks,
}: {
  t: HeroCopy
  data: Dataset
  tasks: { label: string; due: string }[]
}) {
  const priorityColors: Record<Priority, string> = {
    high: "#F703EB",
    med: "#FA85F4",
    low: "#94A3B8",
  }
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-[18px]">
      <div className="flex flex-1 flex-col p-2 sm:p-3">
        <p className="shrink-0 text-[0.72rem] font-semibold text-[#0B162D]">{t.sections?.tasks}</p>
        <div className="mt-1.5 flex flex-1 flex-col justify-around gap-1 sm:mt-2.5">
          {data.taskVisuals.map((visual, i) => {
            const content = tasks[i] ?? { label: "", due: "" }
            const color = priorityColors[visual.priority]
            return (
              <motion.div
                key={`${content.label}-${i}`}
                initial={{ opacity: 0, x: -4 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.5 + i * 0.08 }}
                className="group flex items-center gap-2"
              >
                <motion.div
                  whileHover={{ scale: 1.15 }}
                  className="h-2.5 w-2.5 shrink-0 rounded-full border-[1.5px] bg-white transition-colors group-hover:bg-[var(--c)]/15"
                  style={{ borderColor: color, ["--c" as string]: color }}
                />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[0.6rem] font-medium text-[#0B162D]">{content.label}</div>
                  <div className="text-[0.5rem] text-[#0B162D]/40">{content.due}</div>
                </div>
                <div
                  className="rounded-sm px-1 py-0.5 text-[0.48rem] font-bold uppercase tracking-wider"
                  style={{ backgroundColor: `${color}1F`, color }}
                >
                  {t.taskPriorityLabels?.[visual.priority]}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
