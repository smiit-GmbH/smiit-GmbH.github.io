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
  BarChart3,
  Bell,
  ChevronDown,
  FileText,
  LayoutDashboard,
  Package,
  Plus,
  Search,
  Settings,
  Users,
} from "lucide-react"
import type { Locale } from "@/lib/dictionary"

interface HeroSectionProps {
  lang: Locale
  dict: any
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ")
}

// ---------- Datasets ----------
type ViewKey = "today" | "week" | "month"
type Priority = "high" | "med" | "low"

interface StatValue {
  to: number
  suffix?: string
  decimals?: number
  display: string
  bar: number
  delta: string
}

interface PipelineCol {
  key: "incoming" | "active" | "done"
  count: number
  items: { name: string; amount: string }[]
}

interface ActivityItem {
  initials: string
  user: string
  action: string
  time: string
  color: string
}

interface TaskItem {
  label: string
  priority: Priority
  due: string
}

interface Dataset {
  stats: {
    orders: StatValue
    customers: StatValue
    tasks: StatValue
    revenue: StatValue
  }
  pipelineTotal: number
  pipeline: PipelineCol[]
  activities: ActivityItem[]
  tasks: TaskItem[]
}

const DATASETS: Record<ViewKey, Dataset> = {
  today: {
    stats: {
      orders: { to: 12, display: "12", bar: 48, delta: "+3" },
      customers: { to: 47, display: "47", bar: 62, delta: "+5" },
      tasks: { to: 8, display: "8", bar: 32, delta: "-2" },
      revenue: { to: 8.4, decimals: 1, suffix: " k €", display: "8,4 k €", bar: 56, delta: "+12 %" },
    },
    pipelineTotal: 12,
    pipeline: [
      {
        key: "incoming",
        count: 4,
        items: [
          { name: "Müller GmbH", amount: "1.240 €" },
          { name: "Schmidt AG", amount: "890 €" },
          { name: "Klein KG", amount: "2.450 €" },
        ],
      },
      {
        key: "active",
        count: 3,
        items: [
          { name: "Weber KG", amount: "2.100 €" },
          { name: "Becker e.K.", amount: "560 €" },
        ],
      },
      {
        key: "done",
        count: 5,
        items: [
          { name: "Fischer GmbH", amount: "3.480 €" },
          { name: "Lehmann AG", amount: "720 €" },
        ],
      },
    ],
    activities: [
      { initials: "JM", user: "J. Müller", action: "hat Auftrag #4831 angelegt", time: "vor 2 Min.", color: "#F703EB" },
      { initials: "AS", user: "A. Schmidt", action: "hat Angebot freigegeben", time: "vor 14 Min.", color: "#475569" },
      { initials: "TW", user: "T. Weber", action: "hat Lieferung bestätigt", time: "vor 38 Min.", color: "#94A3B8" },
      { initials: "MB", user: "M. Becker", action: "hat Zahlung erfasst", time: "vor 1 Std.", color: "#0B162D" },
    ],
    tasks: [
      { label: "Angebot Müller GmbH freigeben", priority: "high", due: "heute, 17:00" },
      { label: "Lieferung Becker bestätigen", priority: "high", due: "heute" },
      { label: "Rechnung #4823 prüfen", priority: "med", due: "morgen" },
      { label: "Q4-Forecast aktualisieren", priority: "low", due: "diese Woche" },
    ],
  },
  week: {
    stats: {
      orders: { to: 87, display: "87", bar: 68, delta: "+12" },
      customers: { to: 124, display: "124", bar: 78, delta: "+18" },
      tasks: { to: 23, display: "23", bar: 52, delta: "+4" },
      revenue: { to: 62, suffix: " k €", display: "62 k €", bar: 64, delta: "+8 %" },
    },
    pipelineTotal: 64,
    pipeline: [
      {
        key: "incoming",
        count: 18,
        items: [
          { name: "Klein KG", amount: "2.450 €" },
          { name: "Walter GmbH", amount: "5.120 €" },
          { name: "Hofmann AG", amount: "880 €" },
        ],
      },
      {
        key: "active",
        count: 14,
        items: [
          { name: "Bauer e.K.", amount: "3.700 €" },
          { name: "Voss GmbH", amount: "1.180 €" },
        ],
      },
      {
        key: "done",
        count: 32,
        items: [
          { name: "Roth KG", amount: "4.640 €" },
          { name: "Krüger AG", amount: "1.290 €" },
        ],
      },
    ],
    activities: [
      { initials: "JM", user: "J. Müller", action: "hat Auftrag #4831 angelegt", time: "vor 3 Std.", color: "#F703EB" },
      { initials: "SV", user: "S. Voss", action: "hat Vertrag verlängert", time: "vor 8 Std.", color: "#475569" },
      { initials: "AS", user: "A. Schmidt", action: "hat Mahnung versendet", time: "vor 1 Tag", color: "#94A3B8" },
      { initials: "MB", user: "M. Becker", action: "hat Reklamation eröffnet", time: "vor 2 Tagen", color: "#0B162D" },
    ],
    tasks: [
      { label: "Klein KG: Angebot kalkulieren", priority: "high", due: "Mi" },
      { label: "Reklamation Becker bearbeiten", priority: "high", due: "Mi" },
      { label: "Mahnlauf #34 freigeben", priority: "med", due: "Do" },
      { label: "Vertriebsmeeting vorbereiten", priority: "low", due: "Fr" },
    ],
  },
  month: {
    stats: {
      orders: { to: 342, display: "342", bar: 84, delta: "+47" },
      customers: { to: 287, display: "287", bar: 88, delta: "+34" },
      tasks: { to: 47, display: "47", bar: 60, delta: "+8" },
      revenue: { to: 245, suffix: " k €", display: "245 k €", bar: 76, delta: "+14 %" },
    },
    pipelineTotal: 248,
    pipeline: [
      {
        key: "incoming",
        count: 64,
        items: [
          { name: "Walter GmbH", amount: "5.120 €" },
          { name: "Schäfer AG", amount: "8.300 €" },
          { name: "Hofmann e.K.", amount: "1.640 €" },
        ],
      },
      {
        key: "active",
        count: 52,
        items: [
          { name: "Bauer KG", amount: "3.700 €" },
          { name: "Roth GmbH", amount: "12.400 €" },
        ],
      },
      {
        key: "done",
        count: 132,
        items: [
          { name: "Krüger AG", amount: "4.640 €" },
          { name: "Lange GmbH", amount: "2.890 €" },
        ],
      },
    ],
    activities: [
      { initials: "JM", user: "J. Müller", action: "hat 14 Aufträge abgeschlossen", time: "vor 4 Tagen", color: "#F703EB" },
      { initials: "SV", user: "S. Voss", action: "hat 6 Verträge verlängert", time: "vor 1 Woche", color: "#475569" },
      { initials: "AS", user: "A. Schmidt", action: "hat 3 Großkunden onboarded", time: "vor 2 Wochen", color: "#94A3B8" },
      { initials: "MB", user: "M. Becker", action: "hat Q3-Reporting abgeschlossen", time: "vor 3 Wochen", color: "#0B162D" },
    ],
    tasks: [
      { label: "Schäfer AG: Vertragsverhandlung", priority: "high", due: "diese Woche" },
      { label: "Quartalsplanung Q1 abstimmen", priority: "high", due: "diese Woche" },
      { label: "Provisionsabrechnung freigeben", priority: "med", due: "nächste Woche" },
      { label: "CRM-Daten konsolidieren", priority: "low", due: "diesen Monat" },
    ],
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

// Stats (4 KPI cards)
function ClarityModule({
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
  const items = [
    { key: "orders", label: t.statLabels?.orders, kpi: data.stats.orders, deltaLabel: t.statDeltas?.orders },
    { key: "customers", label: t.statLabels?.customers, kpi: data.stats.customers, deltaLabel: t.statDeltas?.customers },
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
              <p className="break-words text-[0.5rem] font-medium uppercase leading-tight tracking-[0.08em] text-[#0B162D]/40">{item.label}</p>
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
function ProfitModule({
  t,
  data,
}: {
  t: any
  data: Dataset
  mobileEmphasis?: boolean
}) {
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
            <span className="text-[0.5rem] uppercase tracking-wider text-[#F703EB]/60">aktiv</span>
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
function AiModule({ t, data }: { t: any; data: Dataset; radarStyle?: any }) {
  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-[18px]">
      <div className="flex min-h-0 flex-1 flex-col p-2 sm:p-3">
        <div className="shrink-0 flex items-center justify-between">
          <p className="text-[0.72rem] font-semibold text-[#0B162D]">{t.sections?.activity}</p>
          <div className="flex items-center gap-1">
            <motion.span
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              className="h-1.5 w-1.5 rounded-full bg-emerald-500"
            />
            <span className="text-[0.5rem] font-mono font-semibold uppercase tracking-[0.18em] text-emerald-600">
              live
            </span>
          </div>
        </div>
        <div className="mt-2 flex min-h-0 flex-1 flex-col justify-between gap-1.5">
          {data.activities.map((item, i) => (
            <motion.div
              key={`${item.user}-${i}`}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45, delay: 0.5 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="flex shrink-0 items-start gap-1.5 rounded-[10px] bg-[#FEF8FE] p-1.5"
            >
              <div
                className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[0.5rem] font-bold text-white"
                style={{ backgroundColor: item.color }}
              >
                {item.initials}
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-[0.58rem] leading-tight text-[#0B162D]">
                  <span className="font-semibold">{item.user}</span>{" "}
                  <span className="text-[#0B162D]/65">{item.action}</span>
                </div>
                <div className="mt-0.5 text-[0.5rem] text-[#0B162D]/40">{item.time}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Open tasks list
function SpeedModule({ t, data }: { t: any; data: Dataset }) {
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
          {data.tasks.map((task, i) => {
            const color = priorityColors[task.priority]
            return (
              <motion.div
                key={`${task.label}-${i}`}
                initial={{ opacity: 0, x: -4 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.5 + i * 0.08 }}
                className="group flex items-center gap-2"
              >
                <motion.div
                  whileHover={{ scale: 1.15 }}
                  className="h-2.5 w-2.5 shrink-0 rounded-full border-[1.5px] bg-white transition-colors group-hover:bg-[var(--c)]/15"
                  style={{ borderColor: color, ["--c" as any]: color }}
                />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[0.6rem] font-medium text-[#0B162D]">{task.label}</div>
                  <div className="text-[0.5rem] text-[#0B162D]/40">{task.due}</div>
                </div>
                <div
                  className="rounded-sm px-1 py-0.5 text-[0.48rem] font-bold uppercase tracking-wider"
                  style={{ backgroundColor: `${color}1F`, color }}
                >
                  {t.taskPriorityLabels?.[task.priority]}
                </div>
              </motion.div>
            )
          })}
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

  const hero = { ...dict?.servicesAnalytics?.hero, ...dict?.servicesApps?.hero }
  const eyebrowLabel = dict?.servicesApps?.eyebrows?.hero

  const t = {
    appName: (hero?.appName as string) ?? "OperationsHub",
    pageTitle: (hero?.pageTitle as string) ?? "Dashboard",
    updated: (hero?.updated as string) ?? "Aktualisiert",
    searchPlaceholder: (hero?.searchPlaceholder as string) ?? "Suche…",
    createNewLabel: (hero?.createNewLabel as string) ?? "+ Neuer Auftrag",
    avatarInitials: (hero?.avatarInitials as string) ?? "JM",
    teamActiveLabel: (hero?.teamActiveLabel as string) ?? "Team aktiv",
    sections: (hero?.sections ?? {}) as any,
    statLabels: hero?.statLabels ?? {},
    statDeltas: hero?.statDeltas ?? {},
    pipelineColumns: hero?.pipelineColumns ?? {},
    taskPriorityLabels: hero?.taskPriorityLabels ?? {},
    views: hero?.views ?? { today: "Heute", week: "Woche", month: "Monat" },
    navItems: hero?.navItems ?? {
      dashboard: "Dashboard",
      orders: "Aufträge",
      customers: "Kunden",
      inventory: "Lager",
      reports: "Berichte",
      settings: "Einstellungen",
    },
  }

  const navConfig = [
    { key: "dashboard" as const, icon: LayoutDashboard, active: true },
    { key: "orders" as const, icon: FileText },
    { key: "customers" as const, icon: Users },
    { key: "inventory" as const, icon: Package },
    { key: "reports" as const, icon: BarChart3 },
    { key: "settings" as const, icon: Settings },
  ]

  const [viewKey, setViewKey] = useState<ViewKey>("today")
  const data = DATASETS[viewKey]

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

  return (
    <>
      {/* MOBILE / TABLET — < lg (1024px). Stacked layout with full app preview. */}
      <section className="relative overflow-hidden lg:hidden">
        {/* Background glows */}
        <div
          aria-hidden
          className="pointer-events-none absolute -z-10 right-[-12%] top-[8%] h-[420px] w-[560px] rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(247,3,235,0.12),_transparent_62%)] blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -z-10 left-[-18%] top-[55%] h-[380px] w-[520px] rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(250,133,244,0.10),_transparent_62%)] blur-3xl"
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
                className="group inline-flex items-center justify-center rounded-lg bg-[#F703EB] px-5 py-3 text-[0.9rem] font-medium text-white shadow-[0_14px_28px_rgba(247,3,235,0.20)] transition-colors duration-300 hover:bg-[#D802CD]"
              >
                {hero?.primaryCta}
                <ArrowRight className="ml-1.5 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </motion.div>

          {/* App preview card */}
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
                    {t.appName}
                  </h2>
                </div>
                <div className="hidden shrink-0 items-center gap-1 text-[0.6rem] text-[#0B162D]/48 sm:inline-flex">
                  <span>{t.updated}</span>
                  <ChevronDown className="h-3 w-3" />
                </div>
              </div>

              {/* Page sub-header: title + view toggle + create button */}
              <div className="mt-2.5 flex items-center justify-between gap-2">
                <div className="flex min-w-0 items-baseline gap-1.5">
                  <span className="text-[0.78rem] font-semibold text-[#0B162D]">{t.pageTitle}</span>
                  <span className="text-[0.55rem] uppercase tracking-wider text-[#0B162D]/40">
                    · {t.views?.[viewKey]}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <div
                    role="tablist"
                    aria-label="Zeitraum"
                    className="relative inline-flex items-center gap-0.5 rounded-full bg-[#FEF7FE] p-0.5"
                  >
                    {(["today", "week", "month"] as const).map((key) => {
                      const active = viewKey === key
                      return (
                        <button
                          key={key}
                          type="button"
                          role="tab"
                          aria-selected={active}
                          onClick={() => setViewKey(key)}
                          className={cx(
                            "relative z-10 rounded-full px-2 py-0.5 text-[0.58rem] font-medium transition-colors duration-200",
                            active ? "text-white" : "text-[#0B162D]/60 hover:text-[#0B162D]",
                          )}
                        >
                          {active && !shouldReduceMotion && (
                            <motion.span
                              layoutId="hero-mobile-view-pill"
                              transition={{ type: "spring", stiffness: 480, damping: 32 }}
                              className="absolute inset-0 -z-10 rounded-full bg-[#F703EB] shadow-sm"
                            />
                          )}
                          {active && shouldReduceMotion && (
                            <span className="absolute inset-0 -z-10 rounded-full bg-[#F703EB] shadow-sm" />
                          )}
                          {t.views?.[key]}
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Body — Stats + Pipeline always; Activity on tablet+. Tasks dropped on mobile/tablet for focus. */}
            <div className="flex flex-col gap-2.5 p-2.5 sm:gap-3 sm:p-3">
              {/* Stats */}
              <motion.div
                variants={dashboardChildVariants}
                className="overflow-hidden rounded-[18px] border border-slate-200/80 bg-white shadow-[0_14px_36px_rgba(18,38,63,0.07)]"
              >
                <ClarityModule t={t} data={data} reduceMotion={shouldReduceMotion} mobileEmphasis />
              </motion.div>

              {/* Pipeline — money shot */}
              <motion.div
                variants={dashboardChildVariants}
                className="flex flex-col overflow-hidden rounded-[18px] border border-slate-200/80 bg-white shadow-[0_14px_36px_rgba(18,38,63,0.07)] sm:min-h-[320px] md:min-h-[360px]"
              >
                <ProfitModule t={t} data={data} mobileEmphasis />
              </motion.div>

              {/* Activity — tablet only */}
              <motion.div
                variants={dashboardChildVariants}
                className="hidden min-h-[260px] flex-col overflow-hidden rounded-[18px] border border-slate-200/80 bg-white shadow-[0_14px_36px_rgba(18,38,63,0.07)] md:flex md:min-h-[280px]"
              >
                <AiModule t={t} data={data} />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* DESKTOP — >= lg */}
      <section
        ref={containerRef}
        className={cx(
          "relative hidden lg:block",
          SCROLL_ANIMATIONS_ENABLED ? "lg:h-[420vh]" : "lg:h-screen",
        )}
      >
        <div className="sticky top-0 h-[100dvh] overflow-hidden">
          {/* Background glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute right-[5%] top-1/2 -z-10 h-[480px] w-[680px] -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(247,3,235,0.10),_transparent_62%)] blur-2xl"
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
                      className="group inline-flex items-center justify-center rounded-lg bg-[#F703EB] px-5 py-3 text-[0.88rem] font-medium text-white shadow-[0_14px_28px_rgba(247,3,235,0.20)] transition-colors duration-300 hover:bg-[#D802CD]"
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

          {/* SINGLE APP FRAME */}
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
                {/* App Top Bar */}
                <div className="flex shrink-0 items-center justify-between gap-3 border-b border-slate-100 bg-white px-3.5 py-2 sm:px-4">
                  {/* Brand */}
                  <div className="flex items-center gap-2 shrink-0">
                    <Image
                      src="/logo_black.png"
                      alt="smiit"
                      width={64}
                      height={24}
                      className="h-[20px] w-auto object-contain opacity-80"
                    />
                    <div className="h-3 w-px bg-slate-200" />
                    <h2 className="whitespace-nowrap text-[0.8rem] font-semibold text-[#0B162D]">
                      {t.appName}
                    </h2>
                  </div>

                  {/* Search */}
                  <div className="hidden flex-1 max-w-[280px] items-center gap-1.5 rounded-md border border-slate-200/80 bg-slate-50 px-2 py-1 md:flex">
                    <Search className="h-3 w-3 text-[#0B162D]/40" />
                    <span className="text-[0.62rem] text-[#0B162D]/40">{t.searchPlaceholder}</span>
                    <kbd className="ml-auto rounded bg-white px-1 py-0.5 font-mono text-[0.5rem] text-[#0B162D]/40 border border-slate-200/80">
                      ⌘K
                    </kbd>
                  </div>

                  {/* Bell + Avatar */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      className="relative rounded-md p-1 text-[#0B162D]/55 transition-colors hover:bg-slate-50 hover:text-[#0B162D]"
                    >
                      <Bell className="h-3.5 w-3.5" />
                      <motion.span
                        animate={{ opacity: [1, 0.4, 1] }}
                        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute right-0.5 top-0.5 h-1.5 w-1.5 rounded-full bg-[#F703EB] ring-2 ring-white"
                      />
                    </button>
                    <div className="flex items-center gap-1.5 rounded-full bg-slate-50 py-0.5 pl-0.5 pr-2">
                      <div
                        className="flex h-5 w-5 items-center justify-center rounded-full text-[0.5rem] font-bold text-white"
                        style={{ backgroundColor: "#0B162D" }}
                      >
                        {t.avatarInitials}
                      </div>
                      <ChevronDown className="h-2.5 w-2.5 text-[#0B162D]/40" />
                    </div>
                  </div>
                </div>

                {/* App Body — Sidebar + Main */}
                <div className="flex min-h-0 flex-1 flex-row overflow-hidden">
                  {/* Sidebar */}
                  <nav
                    aria-label="Hauptnavigation"
                    className="flex w-[140px] shrink-0 flex-col border-r border-slate-100 bg-slate-50/40 p-2"
                  >
                    <ul className="flex flex-col gap-0.5">
                      {navConfig.map((item) => {
                        const Icon = item.icon
                        const active = !!item.active
                        return (
                          <li key={item.key}>
                            <button
                              type="button"
                              aria-current={active ? "page" : undefined}
                              className={cx(
                                "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-[0.66rem] font-medium transition-colors duration-150",
                                active
                                  ? "bg-[#F703EB]/10 text-[#F703EB]"
                                  : "text-[#0B162D]/68 hover:bg-slate-100 hover:text-[#0B162D]",
                              )}
                            >
                              <Icon className={cx("h-3.5 w-3.5 shrink-0", active && "text-[#F703EB]")} />
                              <span className="min-w-0 break-words leading-tight">{t.navItems?.[item.key]}</span>
                            </button>
                          </li>
                        )
                      })}
                    </ul>

                    {/* Sidebar footer: team presence */}
                    <div className="mt-auto pt-2">
                      <div className="rounded-md border border-slate-200/80 bg-white p-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[0.5rem] font-semibold uppercase tracking-wider text-[#0B162D]/55">
                            {t.teamActiveLabel}
                          </span>
                          <span className="text-[0.55rem] font-mono font-semibold text-[#0B162D]/68">5</span>
                        </div>
                        <div className="mt-1.5 flex items-center -space-x-1.5">
                          {[
                            { initials: "JM", color: "#0B162D" },
                            { initials: "AS", color: "#475569" },
                            { initials: "TW", color: "#94A3B8" },
                          ].map((m) => (
                            <div
                              key={m.initials}
                              className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-white text-[0.45rem] font-bold text-white"
                              style={{ backgroundColor: m.color }}
                            >
                              {m.initials}
                            </div>
                          ))}
                          <div className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-slate-100 text-[0.45rem] font-bold text-[#0B162D]/60">
                            +2
                          </div>
                        </div>
                      </div>
                    </div>
                  </nav>

                  {/* Main content */}
                  <div className="flex min-h-0 flex-1 flex-col">
                    {/* Page Header */}
                    <div className="flex shrink-0 items-center justify-between gap-3 border-b border-slate-100 bg-white/60 px-3 py-2 sm:px-4">
                      <div className="flex min-w-0 items-baseline gap-2">
                        <h3 className="text-[0.92rem] font-semibold text-[#0B162D]">{t.pageTitle}</h3>
                        <span className="text-[0.58rem] uppercase tracking-wider text-[#0B162D]/40">
                          · {t.views?.[viewKey]}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* View toggle */}
                        <div
                          role="tablist"
                          aria-label="Zeitraum"
                          className="inline-flex items-center gap-0.5 rounded-full bg-[#FEF7FE] p-0.5"
                        >
                          {(["today", "week", "month"] as const).map((key) => {
                            const active = viewKey === key
                            return (
                              <button
                                key={key}
                                type="button"
                                role="tab"
                                aria-selected={active}
                                onClick={() => setViewKey(key)}
                                className={cx(
                                  "rounded-full px-2 py-0.5 text-[0.6rem] font-medium transition-all duration-200",
                                  active
                                    ? "bg-[#F703EB] text-white shadow-sm"
                                    : "text-[#0B162D]/60 hover:text-[#0B162D]",
                                )}
                              >
                                {t.views?.[key]}
                              </button>
                            )
                          })}
                        </div>

                        {/* + Neu button */}
                        <button
                          type="button"
                          className="inline-flex items-center gap-1 rounded-md bg-[#F703EB] px-2 py-1 text-[0.6rem] font-semibold text-white shadow-[0_2px_8px_rgba(247,3,235,0.25)] transition-colors duration-150 hover:bg-[#D802CD]"
                        >
                          <Plus className="h-3 w-3" />
                          {t.createNewLabel}
                        </button>
                      </div>
                    </div>

                    {/* Module Grid */}
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
                          <AiModule t={t} data={data} />
                        </motion.div>
                        <div className="relative flex min-h-0 flex-1 flex-col overflow-visible rounded-[18px] border border-slate-200/80 bg-white shadow-[0_14px_36px_rgba(18,38,63,0.07)]">
                          <SpeedModule t={t} data={data} />
                        </div>
                      </div>
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
