"use client"

import { useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  cubicBezier,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion"
import {
  ArrowRight,
  CalendarRange,
  ChevronDown,
  Filter,
  Layers3,
  TrendingUp,
} from "lucide-react"
import type { Locale } from "@/lib/dictionary"

interface HeroDashboardJourneyProps {
  lang: Locale
  dict: any
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ")
}

const areaPath =
  "M 18 118 C 52 116, 82 110, 112 102 C 146 94, 176 92, 208 86 C 242 80, 272 72, 304 68 C 338 64, 368 56, 398 48 C 426 42, 458 34, 492 24 L 492 146 L 18 146 Z"
const linePath =
  "M 18 118 C 52 116, 82 110, 112 102 C 146 94, 176 92, 208 86 C 242 80, 272 72, 304 68 C 338 64, 368 56, 398 48"
const forecastPath = "M 398 48 C 426 42, 458 34, 492 24"

// ---------- Scroll-tell helper: word lights up as scroll progress crosses its range ----------

function ScrollWord({
  children,
  scrollYProgress,
  start,
  end,
  className,
}: {
  children: React.ReactNode
  scrollYProgress: MotionValue<number>
  start: number
  end: number
  className?: string
}) {
  const shouldReduceMotion = useReducedMotion()
  const opacity = useTransform(scrollYProgress, [start, end], [0.18, 1])
  return (
    <motion.span
      style={{ opacity: shouldReduceMotion ? 1 : opacity }}
      className={className}
    >
      {children}
    </motion.span>
  )
}

// ---------- Module Renderers ----------

function ClarityModule({ t }: { t: any }) {
  const kpis = [
    { label: t.kpiLabels?.revenue, value: "4,86 Mio.", barTo: 78 },
    { label: t.kpiLabels?.margin, value: "18,4 %", barTo: 64 },
    { label: t.kpiLabels?.forecastConfidence, value: "89 %", barTo: 89 },
    { label: t.kpiLabels?.activeProjects, value: "27", barTo: 54 },
  ]
  return (
    <div className="overflow-hidden rounded-[18px]">
      <div className="p-3">
        <p className="text-[0.72rem] font-semibold text-[#0B162D]">{t.sections.kpis}</p>
        <div className="mt-2.5 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {kpis.map((item, i) => (
            <div key={item.label} className="rounded-[14px] bg-[#F8FBFE] p-2.5">
              <p className="text-[0.5rem] font-medium uppercase tracking-[0.08em] text-[#0B162D]/40">{item.label}</p>
              <p className="mt-1.5 text-[0.82rem] font-semibold text-[#0B162D] sm:text-[0.86rem]">{item.value}</p>
              <div className="mt-2 h-1 overflow-hidden rounded-full bg-slate-100">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${item.barTo}%` }}
                  transition={{ duration: 1.0, delay: 0.5 + i * 0.12, ease: "easeOut" }}
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

function ProfitModule({ t }: { t: any }) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-[18px] p-2">
      <div className="flex shrink-0 items-center justify-between">
        <div className="text-left">
          <p className="text-[0.72rem] font-semibold text-[#0B162D]">{t.sections.trend}</p>
          <p className="mt-0.5 text-[0.58rem] text-[#0B162D]/50">{t.sections.trendSub}</p>
        </div>
        <div className="rounded-[14px] border border-slate-200/80 bg-[#F8FBFE] px-2.5 py-2 text-right">
          <div className="flex items-center gap-1 text-[#21569c]">
            <TrendingUp className="h-3.5 w-3.5" />
            <span className="text-[0.95rem] font-semibold">+18,4%</span>
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

        {/* Aspect-locked chart — SVG scales uniformly, circles stay round, line stroke uniform */}
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
              d={areaPath}
              fill="url(#hdj-profit-area)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.4, ease: "easeOut" }}
            />
            <motion.path
              d={linePath}
              fill="none"
              stroke="url(#hdj-profit-line)"
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.4, delay: 0.5, ease: "easeInOut" }}
            />
            <motion.path
              d={forecastPath}
              fill="none"
              stroke="rgba(15,23,42,0.35)"
              strokeWidth="2.4"
              strokeDasharray="5 6"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.7, delay: 1.7, ease: "easeOut" }}
            />
          </svg>

          {/* Data points as HTML overlays — stay perfectly round regardless of SVG stretching */}
          <div className="pointer-events-none absolute inset-0">
            {[[18, 118], [112, 102], [208, 86], [304, 68], [398, 48]].map(([x, y], idx) => (
              <motion.div
                key={`pp-${x}-${y}`}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35, delay: 0.7 + idx * 0.12, ease: "easeOut" }}
                className="absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#21569c] ring-4 ring-[#21569c]/10"
                style={{ left: `${(x / 510) * 100}%`, top: `${(y / 150) * 100}%` }}
              />
            ))}
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, delay: 2.0, ease: "easeOut" }}
              className="absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0F172A]/35 ring-4 ring-[#0F172A]/[0.06]"
              style={{ left: `${(492 / 510) * 100}%`, top: `${(24 / 150) * 100}%` }}
            />
            {/* Live pulse on the latest data point — subtle continuous breath */}
            <motion.div
              initial={{ opacity: 0, scale: 1 }}
              animate={{ opacity: [0, 0.7, 0], scale: [1, 4.5, 4.5] }}
              transition={{ duration: 2.4, delay: 2.5, repeat: Infinity, repeatDelay: 1.4, ease: "easeOut" }}
              className="absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full border-[1.5px] border-[#21569c]/50"
              style={{ left: `${(398 / 510) * 100}%`, top: `${(48 / 150) * 100}%` }}
            />
          </div>
        </div>
        <div className="mt-1 grid shrink-0 grid-cols-12 text-[0.56rem] text-[#0B162D]/40">
          {(t.months ?? []).map((month: string) => (<span key={month}>{month}</span>))}
        </div>
      </div>
    </div>
  )
}

function AiModule({ t, radarStyle }: { t: any; radarStyle?: any }) {
  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-[18px]">
      <div className="flex min-h-0 flex-1 flex-col p-2 sm:p-3">
        <p className="shrink-0 text-[0.72rem] font-semibold text-[#0B162D]">{t.sections.signals}</p>
        <div className="mt-1.5 shrink-0 sm:mt-2.5 grid grid-cols-2 gap-1.5 sm:gap-2">
          {[
            { label: t.signalLabels?.forecastRisk, value: t.signalLabels?.forecastRiskValue },
            { label: t.signalLabels?.deviation, value: "-7,2%" },
            { label: t.signalLabels?.opportunityScore, value: "82/100" },
            { label: t.signalLabels?.trendStrength, value: "0.84" },
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
            {[14, 18, 16, 22, 28, 26, 32, 30].map((h, i) => (
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

function SpeedModule({ t }: { t: any }) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-[18px]">
      <div className="flex flex-1 flex-col p-2 sm:p-3">
        <p className="shrink-0 text-[0.72rem] font-semibold text-[#0B162D]">{t.sections.potentials}</p>
        <div className="mt-1.5 flex flex-1 flex-col justify-around sm:mt-2.5">
          {[
            [t.segments?.dach, 82],
            [t.segments?.swiss, 63],
            [t.segments?.serviceUpsell, 47],
            [t.segments?.industrialLeads, 36],
          ].map(([label, value], i) => (
            <div key={String(label)}>
              <div className="mb-0.5 flex items-center justify-between text-[0.6rem] sm:mb-1">
                <span className="text-[#0B162D]/68">{label}</span>
                <span className="font-semibold text-[#21569c]">{value}%</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${value}%` }}
                  transition={{ duration: 0.9, delay: 0.8 + i * 0.12, ease: "easeOut" }}
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

export default function HeroDashboardJourney({ lang, dict }: HeroDashboardJourneyProps) {
  const containerRef = useRef<HTMLElement>(null)
  const shouldReduceMotion = useReducedMotion()

  const hero = dict?.servicesAnalytics?.hero
  const eyebrowLabel = dict?.servicesAnalytics?.eyebrows?.hero
  const why = dict?.servicesAnalytics?.why ?? {}

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
  }

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  // Cinematic easing curve — shapes scroll → animation progress
  const easeOutCubic = cubicBezier(0.33, 1, 0.68, 1)       // generic smooth

  // ── Phase boundaries ─────────────────────────────────────────────
  // 0.00 - 0.05  Idle: subtly tilted "device on a desk" — full dashboard layout at compact size
  // 0.04 - 0.14  Hero text fades out
  // 0.05 - 0.32  CAMERA DOLLY: dashboard rotates flat + scales + translateZ in + slides to center
  // 0.30 - 0.42  Light-sweep / glass-reflex pass across surface (peak moment)
  // 0.50 - 0.62  White blur overlay fades in
  // 0.55 - 0.68  Why-text reveal

  const heroTextOpacity = useTransform(scrollYProgress, [0.04, 0.14], [1, 0])
  const heroTextY = useTransform(scrollYProgress, [0.04, 0.14], [0, -36])

  // Dashboard frame: width/height grow + slides toward center
  const dashboardWidth = useTransform(scrollYProgress, [0.05, 0.32], ["680px", "1180px"], { ease: easeOutCubic })
  const dashboardHeight = useTransform(scrollYProgress, [0.05, 0.32], ["540px", "660px"], { ease: easeOutCubic })
  const dashboardX = useTransform(scrollYProgress, [0.05, 0.32], ["20vw", "0vw"], { ease: easeOutCubic })

  // Camera dolly — straight zoom-in, no tilt (rotateX removed per user feedback)
  const dashboardScale = useTransform(scrollYProgress, [0.05, 0.30], [0.94, 1], { ease: easeOutCubic })
  const dashboardZ = useTransform(scrollYProgress, [0.05, 0.30], [-160, 0], { ease: easeOutCubic })

  // AI module: explicit height grows during morph (compact hides radar, full reveals it)
  const aiHeight = useTransform(scrollYProgress, [0.05, 0.30], ["230px", "360px"], { ease: easeOutCubic })
  const radarOpacity = useTransform(scrollYProgress, [0.12, 0.28], [0, 1], { ease: easeOutCubic })

  // Light-sweep: diagonal gloss passes across at peak growth
  const lightSweepOpacity = useTransform(scrollYProgress, [0.28, 0.34, 0.40], [0, 1, 0])
  const lightSweepX = useTransform(scrollYProgress, [0.28, 0.42], ["-40%", "140%"], { ease: easeOutCubic })

  // Transparent blur overlay (peaks at ~70%) + why-text container fade-in
  const blurOpacity = useTransform(scrollYProgress, [0.50, 0.62], [0, 1])
  const whyTextOpacity = useTransform(scrollYProgress, [0.50, 0.60], [0, 1])

  // Exit fade — section transitions to white at end for smooth handoff to PortfolioSection
  const exitOpacity = useTransform(scrollYProgress, [0.90, 1.0], [0, 1])

  // Reduced-motion fallback styles (collapse to "final" state)
  const heroTextStyle = shouldReduceMotion ? { opacity: 0 } : { opacity: heroTextOpacity, y: heroTextY }
  const dashboardWrapperStyle = shouldReduceMotion ? undefined : { x: dashboardX }
  const dashboardStyle = shouldReduceMotion
    ? { width: "1180px", height: "660px" }
    : {
        width: dashboardWidth,
        height: dashboardHeight,
        scale: dashboardScale,
        z: dashboardZ,
        transformPerspective: 2000,
        maxWidth: "calc(100vw - 96px)",
      }
  const lightSweepStyle = shouldReduceMotion ? { opacity: 0 } : { opacity: lightSweepOpacity, x: lightSweepX }
  const blurStyle = shouldReduceMotion ? { opacity: 0.7 } : { opacity: blurOpacity }
  const exitStyle = shouldReduceMotion ? { opacity: 0 } : { opacity: exitOpacity }
  const whyTextStyle = shouldReduceMotion ? { opacity: 1 } : { opacity: whyTextOpacity }

  // Build word list for scroll-tell reveal (title + highlight + subtitle, all same large size)
  const splitWords = (text: string | undefined, highlight: boolean) =>
    (text ?? "").split(/\s+/).filter(Boolean).map((word) => ({ word, highlight }))
  const whyWords = [
    ...splitWords(why?.title, false),
    ...splitWords(why?.titleHighlight, true),
    ...splitWords(why?.subtitle, false),
  ]
  const REVEAL_START = 0.58
  const REVEAL_END = 0.92
  const aiWrapperStyle = shouldReduceMotion ? { height: "360px" } : { height: aiHeight }
  const radarStyle = shouldReduceMotion ? { opacity: 1 } : { opacity: radarOpacity }

  return (
    <section
      ref={containerRef}
      className="relative hidden lg:block lg:h-[420vh]"
    >
      <div className="sticky top-0 h-[100dvh] overflow-hidden">
        {/* Background glows */}
        <div
          aria-hidden
          className="pointer-events-none absolute -left-[10%] top-[12%] -z-10 h-[520px] w-[820px] rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(33,86,156,0.16),_transparent_65%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute right-[5%] top-1/2 -z-10 h-[480px] w-[680px] -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(33,86,156,0.10),_transparent_62%)] blur-2xl"
        />

        {/* HERO TEXT — left column, fades out as dashboard grows */}
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
                  <Link
                    href={`/${lang}/contact#book`}
                    className="group inline-flex items-center justify-center rounded-lg bg-[#21569c] px-5 py-3 text-[0.88rem] font-medium text-white shadow-[0_14px_28px_rgba(33,86,156,0.20)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1d4d8b]"
                  >
                    {hero?.primaryCta}
                    <ArrowRight className="ml-1.5 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </div>
              {/* placeholder for dashboard column */}
              <div />
            </div>
          </div>
        </motion.div>

        {/* SINGLE DASHBOARD FRAME — grows + slides */}
        <motion.div
          style={dashboardWrapperStyle}
          className="absolute inset-0 z-20 flex items-center justify-center"
        >
          <motion.div
            style={dashboardStyle}
            className="relative overflow-hidden rounded-[28px] border border-white/70 bg-white/84 shadow-[0_34px_100px_rgba(15,23,42,0.12)] backdrop-blur-2xl"
          >
            {/* Light-sweep / glass-reflex — diagonal gloss across surface at peak morph */}
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

                </div>

                {/* Status row — visible from start, scales with the dashboard */}
                <div className="mt-2 flex items-center justify-between gap-3 overflow-hidden">

                  <div className="flex items-center gap-2 text-[0.62rem] text-[#0B162D]/48">
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#F7FAFF] px-2 py-1">
                      <Layers3 className="h-3 w-3 text-[#21569c]" />
                      {t.sourcesConnected}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#F7FAFF] px-2 py-1">
                      <CalendarRange className="h-3 w-3 text-[#21569c]" />
                      01.01 – 31.12
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#F7FAFF] px-2 py-1">
                      <Filter className="h-3 w-3 text-[#21569c]" />
                      {t.sections.filters}
                    </span>
                  </div>
                  <div className="inline-flex items-center gap-1 text-[0.62rem] text-[#0B162D]/48">
                    <span>{t.updated}</span>
                    <ChevronDown className="h-3 w-3" />
                  </div>
                </div>
              </div>

              {/* Dashboard Body */}
              <div className="flex min-h-0 flex-1 flex-row gap-2.5 overflow-hidden p-3">
                {/* Left column — KPI cards (content height) + line chart fills remaining */}
                <div className="flex min-h-0 flex-1 flex-col gap-2.5">
                  <div className="relative shrink-0 overflow-visible rounded-[18px] border border-slate-200/80 bg-white shadow-[0_14px_36px_rgba(18,38,63,0.07)]">
                    <ClarityModule t={t} />
                  </div>
                  <div className="relative flex min-h-0 flex-1 flex-col overflow-visible rounded-[18px] border border-slate-200/80 bg-white shadow-[0_14px_36px_rgba(18,38,63,0.07)]">
                    <ProfitModule t={t} />
                  </div>
                </div>

                {/* Right column — AI grows during morph (radar reveals), Speed at content height */}
                <div className="flex shrink-0 basis-[33%] flex-col gap-2.5 overflow-hidden">
                  <motion.div
                    style={aiWrapperStyle}
                    className="relative flex shrink-0 flex-col overflow-visible rounded-[18px] border border-slate-200/80 bg-white shadow-[0_14px_36px_rgba(18,38,63,0.07)]"
                  >
                    <AiModule t={t} radarStyle={radarStyle} />
                  </motion.div>
                  <div className="relative flex min-h-0 flex-1 flex-col overflow-visible rounded-[18px] border border-slate-200/80 bg-white shadow-[0_14px_36px_rgba(18,38,63,0.07)]">
                    <SpeedModule t={t} />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* BLUR OVERLAY */}
        <motion.div
          style={blurStyle}
          aria-hidden
          className="pointer-events-none absolute inset-0 z-30 bg-white/60 backdrop-blur-md"
        />

        {/* WHY-TEXT REVEAL — words light up as scroll progress crosses each word's range */}
        <motion.div
          style={whyTextStyle}
          className="pointer-events-none absolute inset-0 z-40 flex items-center justify-center px-10"
        >
          <p className="mx-auto max-w-[820px] text-center font-serif text-[2.4rem] leading-[1.18] text-[#0B162D] xl:text-[3rem]">
            {whyWords.map((item, i) => {
              const wordStart = REVEAL_START + (i / whyWords.length) * (REVEAL_END - REVEAL_START)
              const wordEnd = Math.min(wordStart + 0.06, REVEAL_END)
              return (
                <ScrollWord
                  key={`${item.word}-${i}`}
                  scrollYProgress={scrollYProgress}
                  start={wordStart}
                  end={wordEnd}
                  className={item.highlight ? "text-[#21569c]" : undefined}
                >
                  {item.word}
                  {i < whyWords.length - 1 ? " " : ""}
                </ScrollWord>
              )
            })}
          </p>
        </motion.div>

        {/* EXIT FADE — bottom edge fades to white at section end so the boundary blends into PortfolioSection */}
        <motion.div
          style={exitStyle}
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 z-50 h-12 bg-gradient-to-b from-transparent to-white"
        />
      </div>
    </section>
  )
}
