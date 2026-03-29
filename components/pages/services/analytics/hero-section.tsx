"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import useEmblaCarousel from "embla-carousel-react"
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion"
import type { LucideIcon } from "lucide-react"
import {
  ArrowRight,
  BrainCircuit,
  CalendarRange,
  ChevronDown,
  Filter,
  Layers3,
  TrendingUp,
  Zap,
} from "lucide-react"
import type { Locale } from "@/lib/dictionary"
import { useRevealOnScroll } from "@/hooks/use-reveal-on-scroll"

interface HeroSectionProps {
  lang: Locale
  dict: any
}

type FocusKey = "speed" | "clarity" | "profit" | "ai"

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ")
}

function MobileStoryCard({
  story,
}: {
  story: { step: string; label: string; title: string; body: string; emphasis: string; icon: LucideIcon }
}) {
  const Icon = story.icon

  return (
    <div data-equalize="story" className="rounded-2xl border border-[#21569c]/10 bg-gradient-to-br from-[#0B162D] to-[#142744] px-4 py-4 text-left sm:px-5 sm:py-5">
      {/* Chapter number + label */}
      <div className="flex items-center gap-2.5">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#21569c] text-white shadow-[0_4px_16px_rgba(33,86,156,0.35)] md:h-10 md:w-10">
          <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5" />
        </div>
        <div>
          <p className="text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-[#7DBBFF] sm:text-[0.68rem] md:text-[0.75rem]">
            {story.step}
          </p>
          <p className="text-[0.55rem] font-medium text-white/40 sm:text-[0.62rem] md:text-[0.68rem]">
            {story.label}
          </p>
        </div>
      </div>

      {/* Title */}
      <h3 className="mt-3 font-serif text-[1.25rem] font-semibold leading-[1.15] text-white sm:text-[1.35rem] sm:leading-[1.12] md:text-[1.55rem]">
        {story.title}
      </h3>

      {/* Body */}
      <p className="mt-2 text-[0.78rem] leading-relaxed text-white/60 sm:text-[0.85rem] md:text-[0.95rem]">
        {story.body}
      </p>
    </div>
  )
}

function StoryTooltip({
  focusKey,
  activeFocus,
  storyMode,
  story,
  placement,
}: {
  focusKey: FocusKey
  activeFocus: FocusKey
  storyMode: boolean
  story: { step: string; label: string; title: string; body: string; emphasis: string; icon: LucideIcon }
  placement: "bottom" | "top" | "left" | "right"
}) {
  const isActiveDesktop = storyMode && activeFocus === focusKey
  const Icon = story.icon

  const placementClasses: Record<string, string> = {
    bottom: "left-0 right-0 top-[calc(100%+18px)]",
    top: "left-0 right-0 bottom-[calc(100%+18px)]",
    left: "right-[calc(100%+18px)] top-0 bottom-0 w-[280px]",
    right: "left-[calc(100%+18px)] top-0 bottom-0 w-[280px]",
  }

  const arrowClasses: Record<string, string> = {
    bottom: "left-6 -top-[6px] border-l-[6px] border-r-[6px] border-b-[6px] border-l-transparent border-r-transparent border-b-[#0B162D]",
    top: "left-6 -bottom-[6px] border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-[#0B162D]",
    left: "-right-[6px] top-4 border-t-[6px] border-b-[6px] border-l-[6px] border-t-transparent border-b-transparent border-l-[#0B162D]",
    right: "-left-[6px] top-4 border-t-[6px] border-b-[6px] border-r-[6px] border-t-transparent border-b-transparent border-r-[#0B162D]",
  }

  return (
    <AnimatePresence>
      {isActiveDesktop && (
        <motion.div
          initial={{ opacity: 0, y: placement === "bottom" ? -6 : placement === "top" ? 6 : 0, x: placement === "left" ? 6 : placement === "right" ? -6 : 0 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: placement === "bottom" ? -4 : placement === "top" ? 4 : 0, x: placement === "left" ? 4 : placement === "right" ? -4 : 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className={cx(
            "pointer-events-none absolute z-40",
            placementClasses[placement]
          )}
        >
          {/* Arrow */}
          <div className={cx("absolute h-0 w-0", arrowClasses[placement])} />

          {/* Card */}
          <div className="rounded-[14px] border border-white/10 bg-[#0B162D] px-3.5 py-3 text-left shadow-[0_24px_64px_rgba(0,0,0,0.4)] backdrop-blur-xl">
            {/* Header */}
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[#21569c] text-white">
                <Icon className="h-3 w-3" />
              </div>
              <p className="text-[0.5rem] font-semibold uppercase tracking-[0.2em] text-[#7DBBFF]">
                {story.step} · {story.label}
              </p>
            </div>

            {/* Title */}
            <h3 className="mt-2 text-[1.1rem] font-semibold leading-[1.18] text-white">
              {story.title}
            </h3>

            {/* Body */}
            <p className="mt-1 text-[0.66rem] leading-relaxed text-white/60">
              {story.body}
            </p>

            {/* Emphasis */}
            <div className="mt-2 border-l-2 border-[#21569c] pl-2">
              <p className="text-[0.62rem] font-medium leading-snug text-[#7DBBFF]">
                {story.emphasis}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function HeroSection({ lang, dict }: HeroSectionProps) {
  const hero = dict?.servicesAnalytics?.hero
  const containerRef = useRef<HTMLElement>(null)
  const shouldReduceMotion = useReducedMotion()

  const [isDesktop, setIsDesktop] = useState(false)
  const [activeFocus, setActiveFocus] = useState<FocusKey>("speed")
  const [storyMode, setStoryMode] = useState(false)
  const [visibleModules, setVisibleModules] = useState<Set<FocusKey>>(new Set())
  const [dashboardZoom, setDashboardZoom] = useState(1)

  const tabSectionReveal = useRevealOnScroll({ margin: "-60px" })

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: "start" })
  const [activeTab, setActiveTab] = useState(0)
  const [visitedTabs, setVisitedTabs] = useState<Set<number>>(new Set([0]))

  const onTabClick = useCallback((index: number) => {
    if (emblaApi) emblaApi.scrollTo(index)
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    const onSelect = () => {
      const idx = emblaApi.selectedScrollSnap()
      setActiveTab(idx)
      setVisitedTabs((prev) => new Set(prev).add(idx))
    }
    emblaApi.on("select", onSelect)
    onSelect()
    return () => { emblaApi.off("select", onSelect) }
  }, [emblaApi])

  useEffect(() => {
    const equalize = () => {
      const storyEls = document.querySelectorAll<HTMLElement>(`[data-equalize="story"]`)
      if (storyEls.length > 0) {
        storyEls.forEach((el) => { el.style.minHeight = "" })
        let maxH = 0
        storyEls.forEach((el) => { maxH = Math.max(maxH, el.offsetHeight) })
        storyEls.forEach((el) => { el.style.minHeight = `${maxH}px` })
      }
      const moduleEls = document.querySelectorAll<HTMLElement>(`[data-equalize="module"]`)
      if (moduleEls.length > 0) {
        moduleEls.forEach((el) => { el.style.height = "" })
        let maxModH = 0
        moduleEls.forEach((el) => { maxModH = Math.max(maxModH, el.offsetHeight) })
        moduleEls.forEach((el) => { el.style.height = `${maxModH}px` })
      }
    }
    const timer = setTimeout(equalize, 200)
    window.addEventListener("resize", equalize)
    return () => {
      clearTimeout(timer)
      window.removeEventListener("resize", equalize)
    }
  }, [isDesktop])

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 1024px)")
    const onChange = () => setIsDesktop(mql.matches)
    onChange()
    mql.addEventListener("change", onChange)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  useEffect(() => {
    const BASE_WIDTH = 1120
    const BASE_HEIGHT = 630
    const MAX_ZOOM = 1.25
    const updateZoom = () => {
      const vw = window.innerWidth
      const vh = window.innerHeight
      const availableW = Math.min(vw - 56, vw)
      const availableH = vh - 100
      const zoomByWidth = availableW / BASE_WIDTH
      const zoomByHeight = availableH / BASE_HEIGHT
      const zoom = Math.min(zoomByWidth, zoomByHeight, MAX_ZOOM)
      setDashboardZoom(Math.max(zoom, 0.7))
    }
    updateZoom()
    window.addEventListener("resize", updateZoom)
    return () => window.removeEventListener("resize", updateZoom)
  }, [])

  const storyIcons: Record<FocusKey, LucideIcon> = {
    speed: Zap,
    clarity: Layers3,
    profit: TrendingUp,
    ai: BrainCircuit,
  }

  const t = {
    eyebrow: hero?.dashboard?.eyebrow as string | undefined,
    title: hero?.title as string | undefined,
    description: hero?.description as string | undefined,
    cta: hero?.primaryCta as string | undefined,
    boardEyebrow: hero?.boardEyebrow as string | undefined,
    boardTitle: hero?.boardTitle as string | undefined,
    sourcesConnected: hero?.sourcesConnected as string | undefined,
    updated: hero?.updated as string | undefined,
    inPractice: hero?.inPractice as string | undefined,
    swipeHint: hero?.swipeHint as string | undefined,
    tabs: (hero?.tabs ?? {}) as { speed: string; clarity: string; profit: string; ai: string },
    sections: (hero?.sections ?? {}) as { kpis: string; trend: string; trendSub: string; actions: string; signals: string; potentials: string; insights: string; filters: string },
    months: (hero?.months ?? []) as string[],
    story: {
      speed: { ...(hero?.story?.speed ?? {}), icon: storyIcons.speed } as { step: string; label: string; title: string; body: string; emphasis: string; icon: typeof Zap },
      clarity: { ...(hero?.story?.clarity ?? {}), icon: storyIcons.clarity } as { step: string; label: string; title: string; body: string; emphasis: string; icon: typeof Layers3 },
      profit: { ...(hero?.story?.profit ?? {}), icon: storyIcons.profit } as { step: string; label: string; title: string; body: string; emphasis: string; icon: typeof TrendingUp },
      ai: { ...(hero?.story?.ai ?? {}), icon: storyIcons.ai } as { step: string; label: string; title: string; body: string; emphasis: string; icon: typeof BrainCircuit },
    },
    kpiLabels: (hero?.kpiLabels ?? {}) as { revenue: string; margin: string; forecastConfidence: string; activeProjects: string },
    chartLegend: (hero?.chartLegend ?? {}) as { actual: string; forecast: string },
    signalLabels: (hero?.signalLabels ?? {}) as { forecastRisk: string; forecastRiskValue: string; deviation: string; opportunityScore: string; trendStrength: string },
    signalRadar: (hero?.signalRadar ?? {}) as { title: string; period: string },
    segments: (hero?.segments ?? {}) as { dach: string; swiss: string; serviceUpsell: string; industrialLeads: string },
  }

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const isInStoryRange = latest >= 0.14 && latest < 0.80
    setStoryMode(isInStoryRange)

    if (latest < 0.14) {
      setVisibleModules(new Set())
      return
    }

    if (!isInStoryRange) return

    let currentFocus: FocusKey
    if (latest < 0.30) {
      currentFocus = "speed"
    } else if (latest < 0.47) {
      currentFocus = "clarity"
    } else if (latest < 0.63) {
      currentFocus = "profit"
    } else {
      currentFocus = "ai"
    }

    setActiveFocus(currentFocus)
    setVisibleModules((prev) => {
      if (prev.has(currentFocus)) return prev
      const next = new Set(prev)
      next.add(currentFocus)
      return next
    })
  })

  const textOpacity = useTransform(scrollYProgress, [0, 0.06, 0.10, 0.14], [1, 1, 0.2, 0])
  const textY = useTransform(scrollYProgress, [0, 0.14], [0, -76])

  const dashboardY = useTransform(scrollYProgress, [0, 0.14, 1], [220, 0, 0])
  const dashboardScale = useTransform(scrollYProgress, [0, 0.14, 1], [0.94, 1, 1])
  const dashboardOpacity = useTransform(scrollYProgress, [0, 0.06, 0.14], [0, 0.5, 1])

  const desktopTextStyle =
    isDesktop && !shouldReduceMotion
      ? {
          opacity: textOpacity,
          y: textY,
          top: "calc(50dvh - 80px)",
        }
      : undefined

  const desktopDashboardStyle =
    isDesktop && !shouldReduceMotion
      ? {
          y: dashboardY,
          scale: dashboardScale,
          opacity: dashboardOpacity,
        }
      : undefined

  const dashboardFrameStyle = isDesktop
    ? {
        width: "min(1400px, calc(100vw - 56px), calc((100dvh - 160px) * 1.7778))",
      }
    : undefined

  const areaPath =
    "M 18 118 C 52 116, 82 110, 112 102 C 146 94, 176 92, 208 86 C 242 80, 272 72, 304 68 C 338 64, 368 56, 398 48 C 426 42, 458 34, 492 24 L 492 146 L 18 146 Z"

  const tabs: Array<{ key: FocusKey; label: string }> = [
    { key: "speed", label: t.tabs.speed },
    { key: "clarity", label: t.tabs.clarity },
    { key: "profit", label: t.tabs.profit },
    { key: "ai", label: t.tabs.ai },
  ]

  const moduleClass = (focuses: FocusKey[]) => {
    const isActive = focuses.includes(activeFocus)
    const isVisible = focuses.some((f) => visibleModules.has(f))

    return cx(
      "relative min-h-0 rounded-[18px] border transition-all duration-700",
      "border-slate-200/80 bg-white",
      isActive && storyMode ? "z-10" : "z-0",
      !storyMode
        ? visibleModules.size > 0
          ? "opacity-100 saturate-100 scale-100 shadow-[0_14px_36px_rgba(18,38,63,0.07)]"
          : "opacity-0 saturate-0 scale-[0.97] pointer-events-none"
        : isActive
          ? "opacity-100 saturate-100 scale-100 shadow-[0_0_0_2px_rgba(33,86,156,0.55),_0_20px_48px_rgba(33,86,156,0.22)]"
          : isVisible
            ? "opacity-[0.35] saturate-[0.3] scale-[0.99] shadow-[0_8px_20px_rgba(18,38,63,0.05)]"
            : "opacity-0 saturate-0 scale-[0.97] pointer-events-none"
    )
  }

  const mobileModuleClass =
    "relative min-h-0 rounded-[18px] border border-slate-200/80 bg-white opacity-100"

  const chapters: Array<{ key: FocusKey; index: number }> = [
    { key: "speed", index: 0 },
    { key: "clarity", index: 1 },
    { key: "profit", index: 2 },
    { key: "ai", index: 3 },
  ]

  const renderSpeedModule = (isMobile: boolean) => (
    <div className={cx("overflow-hidden rounded-[18px]", isMobile && "flex h-full flex-col")}>
      <div className={cx("p-3 sm:p-4 md:p-5", isMobile && "flex flex-1 flex-col")}>
        <p className="shrink-0 text-[0.78rem] font-semibold text-[#0B162D] sm:text-[0.82rem] md:text-[0.9rem]">{t.sections.potentials}</p>

        <div className={cx("mt-2.5 sm:mt-3 md:mt-4", isMobile ? "flex flex-1 flex-col justify-center gap-3 md:gap-4" : "space-y-2 sm:space-y-2.5")}>
          {[
            [t.segments?.dach, 82],
            [t.segments?.swiss, 63],
            [t.segments?.serviceUpsell, 47],
            [t.segments?.industrialLeads, 36],
          ].map(([label, value]) => (
            <div key={String(label)} className={cx(isMobile && "segment-row")}>
              <div className="mb-1 flex items-center justify-between text-[0.65rem] sm:text-[0.7rem] md:text-[0.78rem]">
                <span className="text-[#0B162D]/68">{label}</span>
                <span className="font-semibold text-[#21569c]">{value}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-slate-100 md:h-2.5">
                {!isMobile ? (
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${value}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="h-full rounded-full bg-gradient-to-r from-[#21569c] to-[#7DBBFF]"
                  />
                ) : (
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#21569c] to-[#7DBBFF] bar-reveal"
                    style={{ width: `${value}%` }}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderClarityModule = (isMobile: boolean) => (
    <div className={cx("overflow-hidden rounded-[18px]", isMobile && "flex h-full flex-col")}>
      <div className={cx("p-3 sm:p-4 md:p-5", isMobile && "flex flex-1 flex-col")}>
        <p className="shrink-0 text-[0.78rem] font-semibold text-[#0B162D] sm:text-[0.82rem] md:text-[0.9rem]">{t.sections.kpis}</p>
        <div className={cx("mt-2.5 grid grid-cols-2 gap-2.5 sm:mt-3 sm:grid-cols-4 sm:gap-3 md:mt-4 md:gap-4", isMobile && "flex-1 place-content-center")}>
          {[
            { label: t.kpiLabels?.revenue, value: "4,86 Mio." },
            { label: t.kpiLabels?.margin, value: "18,4 %" },
            { label: t.kpiLabels?.forecastConfidence, value: "89 %" },
            { label: t.kpiLabels?.activeProjects, value: "27" },
          ].map((item) => (
            <div key={item.label} className={cx("rounded-[14px] bg-[#F8FBFE] p-3 md:p-4", isMobile && "kpi-card-reveal")}>
              <p className="text-[0.55rem] font-medium uppercase tracking-[0.15em] text-[#0B162D]/38 sm:text-[0.58rem] md:text-[0.65rem]">
                {item.label}
              </p>
              <p className="mt-1.5 text-[1.05rem] font-semibold text-[#0B162D] sm:text-[1.1rem] md:text-[1.25rem]">
                {item.value}
              </p>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100 md:h-2">
                <div className={cx("h-full w-[72%] rounded-full bg-gradient-to-r from-[#21569c] to-[#7DBBFF]", isMobile && "bar-reveal")} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderProfitModule = (isMobile: boolean) => (
    <div className={cx("flex min-h-0 flex-col overflow-hidden rounded-[18px] p-3 sm:p-4 md:p-5", isMobile ? "h-full flex-1" : "flex-1")}>
      <div className="flex shrink-0 items-center justify-between">
        <div className="text-left">
          <p className="text-[0.78rem] font-semibold text-[#0B162D] sm:text-[0.82rem] md:text-[0.9rem]">{t.sections.trend}</p>
          <p className="mt-0.5 text-[0.62rem] text-[#0B162D]/50 sm:text-[0.66rem] md:text-[0.72rem]">{t.sections.trendSub}</p>
        </div>
        <div className="rounded-[14px] border border-slate-200/80 bg-[#F8FBFE] px-3 py-2 text-right">
          <div className="flex items-center gap-1 text-[#21569c]">
            <TrendingUp className="h-3.5 w-3.5 md:h-4 md:w-4" />
            <span className="text-[1rem] font-semibold md:text-[1.1rem]">+18,4%</span>
          </div>
        </div>
      </div>

      <div className="mt-3 flex min-h-0 flex-1 flex-col rounded-[16px] border border-slate-200/80 bg-[#F8FBFE] p-2.5 md:p-3">
        <div className="mb-1.5 flex shrink-0 items-center gap-3 text-[0.6rem] text-[#0B162D]/46 md:text-[0.68rem]">
          <span className="inline-flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-[#21569c]" />
            {t.chartLegend?.actual}
          </span>
          <span className="inline-flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-[#0B162D]/30" />
            {t.chartLegend?.forecast}
          </span>
        </div>

        <svg viewBox="0 0 510 150" className="min-h-0 w-full flex-1">
          <defs>
            <linearGradient id={isMobile ? "mobile-area-light" : "dashboard-area-light"} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="rgba(33,86,156,0.14)" />
              <stop offset="100%" stopColor="rgba(33,86,156,0)" />
            </linearGradient>
            <linearGradient id={isMobile ? "mobile-line-light" : "dashboard-line-light"} x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="#21569c" />
              <stop offset="100%" stopColor="#7DBBFF" />
            </linearGradient>
          </defs>

          {[26, 54, 82, 110].map((y) => (
            <line
              key={y}
              x1="16"
              x2="494"
              y1={y}
              y2={y}
              stroke="rgba(15,23,42,0.06)"
              strokeDasharray="4 6"
            />
          ))}

          {isMobile ? (
            <path
              d={areaPath}
              fill={`url(#mobile-area-light)`}
              className="chart-area-reveal"
            />
          ) : (
            <motion.path
              d={areaPath}
              fill="url(#dashboard-area-light)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            />
          )}

          {isMobile ? (
            <path
              d="M 18 118 C 52 116, 82 110, 112 102 C 146 94, 176 92, 208 86 C 242 80, 272 72, 304 68 C 338 64, 368 56, 398 48"
              fill="none"
              stroke="url(#mobile-line-light)"
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="line-path-reveal"
            />
          ) : (
            <motion.path
              d="M 18 118 C 52 116, 82 110, 112 102 C 146 94, 176 92, 208 86 C 242 80, 272 72, 304 68 C 338 64, 368 56, 398 48"
              fill="none"
              stroke="url(#dashboard-line-light)"
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.0, ease: "easeInOut" }}
            />
          )}

          {isMobile ? (
            <path
              d="M 398 48 C 426 42, 458 34, 492 24"
              fill="none"
              stroke="rgba(15,23,42,0.35)"
              strokeWidth="2.4"
              strokeLinecap="round"
              className="forecast-path-reveal"
            />
          ) : (
            <motion.path
              d="M 398 48 C 426 42, 458 34, 492 24"
              fill="none"
              stroke="rgba(15,23,42,0.35)"
              strokeWidth="2.4"
              strokeDasharray="5 6"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.55, ease: "easeOut", delay: 1.0 }}
            />
          )}

          {[
            [18, 118],
            [112, 102],
            [208, 86],
            [304, 68],
            [398, 48],
          ].map(([x, y], index) =>
            isMobile ? (
              <g key={`ist-${x}-${y}`} className="chart-dot-reveal">
                <circle cx={x} cy={y} r="4" fill="#21569c" />
                <circle cx={x} cy={y} r="8" fill="rgba(33,86,156,0.10)" />
              </g>
            ) : (
              <motion.g
                key={`ist-${x}-${y}`}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.18 + index * 0.06 }}
              >
                <circle cx={x} cy={y} r="4" fill="#21569c" />
                <circle cx={x} cy={y} r="8" fill="rgba(33,86,156,0.10)" />
              </motion.g>
            )
          )}

          {isMobile ? (
            <g className="chart-dot-reveal">
              <circle cx={492} cy={24} r="4" fill="rgba(15,23,42,0.35)" />
              <circle cx={492} cy={24} r="8" fill="rgba(15,23,42,0.06)" />
            </g>
          ) : (
            <motion.g
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 1.1 }}
            >
              <circle cx={492} cy={24} r="4" fill="rgba(15,23,42,0.35)" />
              <circle cx={492} cy={24} r="8" fill="rgba(15,23,42,0.06)" />
            </motion.g>
          )}
        </svg>

        <div className="mt-1.5 grid shrink-0 grid-cols-12 text-[0.6rem] text-[#0B162D]/40 md:text-[0.68rem]">
          {t.months.map((month) => (
            <span key={month}>{month}</span>
          ))}
        </div>
      </div>
    </div>
  )

  const renderAiModule = (isMobile: boolean) => (
    <div className={cx("min-h-0 overflow-hidden rounded-[18px]", isMobile ? "flex h-full flex-col flex-1" : "flex-1")}>
      <div className={cx("p-3 sm:p-4 md:p-5", isMobile && "flex flex-1 flex-col")}>
        <p className="shrink-0 text-[0.78rem] font-semibold text-[#0B162D] sm:text-[0.82rem] md:text-[0.9rem]">{t.sections.signals}</p>

        <div className={cx("mt-2.5 grid grid-cols-2 gap-2 sm:mt-3 sm:gap-2.5 md:mt-4 md:gap-3", isMobile && "shrink-0")}>
          {[
            { label: t.signalLabels?.forecastRisk, value: t.signalLabels?.forecastRiskValue },
            { label: t.signalLabels?.deviation, value: "-7,2%" },
            { label: t.signalLabels?.opportunityScore, value: "82/100" },
            { label: t.signalLabels?.trendStrength, value: "0.84" },
          ].map((item) => (
            <div key={item.label} className={cx("rounded-[14px] bg-[#F8FBFE] p-2.5 sm:p-3 md:p-4", isMobile && "signal-card-reveal")}>
              <p className="text-[0.55rem] font-medium uppercase tracking-[0.14em] text-[#0B162D]/38 sm:text-[0.58rem] md:text-[0.65rem]">
                {item.label}
              </p>
              <p className="mt-1.5 text-[0.9rem] font-semibold text-[#0B162D] sm:text-[0.95rem] md:text-[1.05rem]">
                {item.value}
              </p>
            </div>
          ))}
        </div>

        <div className={cx("mt-2.5 rounded-[14px] bg-[#F8FBFE] p-2.5 sm:mt-3 sm:p-3 md:mt-4 md:p-4", isMobile && "flex flex-1 flex-col min-h-[80px]")}>
          <div className="shrink-0 flex items-center justify-between text-[0.6rem] text-[#0B162D]/44 md:text-[0.68rem]">
            <span>{t.signalRadar?.title}</span>
            <span>{t.signalRadar?.period}</span>
          </div>
          <div className={cx("mt-2 flex items-end gap-1", isMobile && "flex-1")}>
            {[14, 18, 16, 22, 28, 26, 32, 30].map((h, i) => (
              <div
                key={i}
                className={cx("flex-1 rounded-t-md bg-[#DCEBFF]", isMobile && "radar-bar-reveal")}
                style={isMobile
                  ? { height: `${Math.round((h / 32) * 100)}%`, minHeight: `${h}px` }
                  : { height: `${h}px` }}
              >
                <div
                  className="h-full w-full rounded-t-md bg-gradient-to-t from-[#21569c] to-[#7DBBFF] opacity-70"
                  style={{ transform: `scaleY(${0.32 + (i % 3) * 0.12})`, transformOrigin: "bottom" }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  const moduleRenderers: Record<FocusKey, (isMobile: boolean) => React.ReactNode> = {
    speed: renderSpeedModule,
    clarity: renderClarityModule,
    profit: renderProfitModule,
    ai: renderAiModule,
  }

  return (
    <section ref={containerRef} className="relative overflow-x-clip bg-[#F6F9FC] lg:h-[500vh]">
      <div className="lg:sticky lg:top-0 lg:h-[100dvh] lg:overflow-hidden lg:pt-20">
        <div className="absolute inset-0 hidden bg-[radial-gradient(circle_at_top_center,_rgba(33,86,156,0.13),_transparent_28%),radial-gradient(circle_at_18%_84%,_rgba(34,211,238,0.07),_transparent_22%)] lg:block" />
        <div
          className="pointer-events-none absolute inset-0 hidden opacity-[0.08] lg:block"
          style={{
            backgroundImage: "url(/assets/grain.webp)",
            backgroundRepeat: "repeat",
            backgroundSize: "160px 160px",
            mixBlendMode: "soft-light",
          }}
        />

        <div className="relative mx-auto flex h-full max-w-[1380px] flex-col items-center px-4 text-center sm:px-6 lg:pb-12 lg:px-8">
          <motion.div
            style={desktopTextStyle}
            className="relative z-20 mx-auto w-full max-w-[860px] pt-36 pb-36 sm:pt-46 sm:pb-46 lg:pt-0 lg:pb-0 lg:absolute lg:left-1/2 lg:w-full lg:-translate-x-1/2 lg:-translate-y-1/2"
          >
            <motion.span
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="inline-flex items-center rounded-full border border-[#21569c]/15 bg-white/80 px-4 py-1.5 text-sm font-medium text-[#21569c] shadow-[0_10px_24px_rgba(33,86,156,0.06)] backdrop-blur-xl"
            >
              {t.eyebrow}
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: "easeOut", delay: 0.06 }}
              className="mx-auto mt-5 max-w-[13ch] font-serif text-[2.35rem] leading-[1.03] text-[#0B162D] sm:text-[2.75rem] md:text-[3.2rem] lg:text-[3.5rem] xl:text-[4.2rem] 2xl:text-[4.6rem]"
            >
              {t.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.12 }}
              className="mx-auto mt-5 max-w-[62ch] text-sm leading-relaxed text-[#0B162D]/72 sm:text-base md:text-lg lg:text-[1.125rem] xl:text-[1.2rem]"
            >
              {t.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: "easeOut", delay: 0.2 }}
              className="mt-8 flex justify-center"
            >
              <Link
                href={`/${lang}/contact#book`}
                className="inline-flex items-center justify-center rounded-xl bg-[#21569c] px-5 py-3 text-sm font-medium text-white shadow-[0_18px_35px_rgba(33,86,156,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1d4d8b] sm:px-6 sm:py-3.5 sm:text-base"
              >
                {t.cta}
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Link>
            </motion.div>
          </motion.div>

          {!isDesktop && (
            <div
              ref={tabSectionReveal.ref}
              className={cx(
                "relative z-10 w-full pb-12 reveal-fade-up",
                tabSectionReveal.isRevealed && "revealed"
              )}
            >
              {/* Tab bar */}
              <div className="mb-5 flex items-center gap-1 overflow-x-auto rounded-2xl border border-slate-200/80 bg-white/80 p-1 shadow-[0_4px_20px_rgba(15,23,42,0.06)] backdrop-blur-xl sm:mb-6 sm:gap-1.5 sm:p-1.5 md:mb-7 md:p-2">
                {chapters.map(({ key, index: idx }) => {
                  const Icon = t.story[key].icon
                  return (
                    <button
                      key={key}
                      onClick={() => onTabClick(idx)}
                      className={cx(
                        "flex flex-1 items-center justify-center gap-1.5 rounded-xl px-2 py-2.5 text-[0.65rem] font-medium transition-all duration-300 sm:gap-2 sm:px-3 sm:py-3 sm:text-[0.72rem] md:gap-2.5 md:px-4 md:py-3.5 md:text-[0.82rem]",
                        activeTab === idx
                          ? "bg-[#21569c] text-white shadow-[0_4px_16px_rgba(33,86,156,0.35)]"
                          : "text-[#0B162D]/50 hover:bg-slate-50 hover:text-[#0B162D]/70"
                      )}
                    >
                      <Icon className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4 md:h-5 md:w-5" />
                      <span className="hidden min-[480px]:inline">{t.tabs[key]}</span>
                    </button>
                  )
                })}
              </div>

              <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex">
                  {chapters.map(({ key, index: idx }) => {
                    const isVisited = visitedTabs.has(idx)
                    return (
                      <div key={key} className="flex min-w-0 flex-[0_0_100%] flex-col px-0.5">
                        <MobileStoryCard story={t.story[key]} />

                        <div className="flex flex-col items-center py-2 sm:py-2.5">
                          <div className="h-3 w-px border-l-[2px] border-dashed border-[#21569c]/30 sm:h-4" />
                          <span className="mt-1 rounded-full bg-[#21569c]/8 px-2.5 py-0.5 text-[0.58rem] font-medium text-[#21569c]/70 sm:text-[0.62rem]">
                            {t.inPractice}
                          </span>
                          <div className="mt-1 h-0 w-0 border-l-[4px] border-r-[4px] border-t-[4px] border-l-transparent border-r-transparent border-t-[#21569c]/30" />
                        </div>

                        <div
                          data-equalize="module"
                          className={cx(
                            mobileModuleClass,
                            "flex flex-1 flex-col overflow-hidden border-t-[3px] border-t-[#21569c]",
                            "carousel-module-reveal",
                            isVisited && "revealed"
                          )}
                        >
                          {moduleRenderers[key](true)}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Swipe hint */}
              <p className="mt-4 text-center text-[0.62rem] text-[#0B162D]/30 sm:text-[0.68rem]">
                {t.swipeHint}
              </p>
            </div>
          )}

          {isDesktop && (
            <motion.div
              style={desktopDashboardStyle}
              className="relative z-10 mt-20 flex w-full flex-1 items-start justify-center sm:mt-24 lg:mt-0 lg:items-center"
            >
              <div className="absolute left-1/2 top-1/2 -z-10 h-[260px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#21569c]/10 blur-[120px]" />

              <div className="relative w-full max-w-[1400px]" style={dashboardFrameStyle}>
                <div
                  className="relative w-full overflow-visible rounded-[28px] border border-white/70 bg-white/84 shadow-[0_34px_100px_rgba(15,23,42,0.12)] backdrop-blur-2xl lg:aspect-[16/9]"
                  style={dashboardZoom > 1 ? { zoom: dashboardZoom } : undefined}
                >
                  <div className="flex h-full min-h-0 flex-col">
                    {/* Dashboard Header */}
                    <div className="border-b border-slate-100 px-3.5 py-3 sm:px-4">
                      <div className="flex items-center justify-between gap-4">
                        {/* Logo + Titel */}
                        <div className="flex items-center gap-2.5">
                          <Image
                            src="/logo_black.png"
                            alt="smiit Logo"
                            width={76}
                            height={30}
                            className="h-[28px] w-auto object-contain opacity-80"
                          />
                          <div className="h-4 w-px bg-slate-200" />
                          <h2 className="text-[0.95rem] font-semibold text-[#0B162D] sm:text-[1rem]">
                            Management Dashboard
                          </h2>
                        </div>

                        {/* Tabs */}
                        <div className="flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-1.5 py-1">
                          {tabs.map((item) => (
                            <span
                              key={item.key}
                              className={cx(
                                "rounded-full px-2.5 py-1 text-[0.66rem] font-medium transition-all duration-300",
                                storyMode && activeFocus === item.key
                                  ? "bg-[#0B162D] text-[#ffffff]"
                                  : "text-[#0B162D]/50"
                              )}
                            >
                              {item.label}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mt-2 flex items-center justify-between gap-3">
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

                    <div className="flex min-h-0 flex-1 flex-row gap-3 overflow-visible p-3.5">

                      <div className="flex min-h-0 flex-[2] flex-col gap-3">

                        <div className={cx(moduleClass(["clarity"]), "shrink-0 overflow-visible")}>
                          <div className="overflow-hidden rounded-[18px]">
                            <div className="p-3">
                              <p className="text-[0.72rem] font-semibold text-[#0B162D]">{t.sections.kpis}</p>
                              <div className="mt-2.5 grid grid-cols-2 gap-2 sm:grid-cols-4">
                                {[
                                  { label: t.kpiLabels?.revenue, value: "4,86 Mio." },
                                  { label: t.kpiLabels?.margin, value: "18,4 %" },
                                  { label: t.kpiLabels?.forecastConfidence, value: "89 %" },
                                  { label: t.kpiLabels?.activeProjects, value: "27" },
                                ].map((item) => (
                                  <div key={item.label} className="rounded-[14px] bg-[#F8FBFE] p-2.5">
                                    <p className="text-[0.52rem] font-medium uppercase tracking-[0.15em] text-[#0B162D]/38">
                                      {item.label}
                                    </p>
                                    <p className="mt-1.5 text-[0.98rem] font-semibold text-[#0B162D] sm:text-[1.02rem]">
                                      {item.value}
                                    </p>
                                    <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-slate-100">
                                      <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: "72%" }}
                                        transition={{ duration: 0.8, ease: "easeOut" }}
                                        className="h-full rounded-full bg-gradient-to-r from-[#21569c] to-[#7DBBFF]"
                                      />
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          <StoryTooltip
                            focusKey="clarity"
                            activeFocus={activeFocus}
                            storyMode={storyMode}
                            story={t.story.clarity}
                            placement="bottom"
                          />
                        </div>

                        <div className={cx(moduleClass(["profit"]), "flex min-h-0 flex-1 flex-col overflow-visible")}>
                          <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-[18px] p-2.5">
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

                              <svg viewBox="0 0 510 150" className="min-h-0 w-full flex-1">
                                <defs>
                                  <linearGradient id="dashboard-area-light" x1="0" x2="0" y1="0" y2="1">
                                    <stop offset="0%" stopColor="rgba(33,86,156,0.14)" />
                                    <stop offset="100%" stopColor="rgba(33,86,156,0)" />
                                  </linearGradient>
                                  <linearGradient id="dashboard-line-light" x1="0" x2="1" y1="0" y2="0">
                                    <stop offset="0%" stopColor="#21569c" />
                                    <stop offset="100%" stopColor="#7DBBFF" />
                                  </linearGradient>
                                </defs>

                                {[26, 54, 82, 110].map((y) => (
                                  <line key={y} x1="16" x2="494" y1={y} y2={y} stroke="rgba(15,23,42,0.06)" strokeDasharray="4 6" />
                                ))}

                                <motion.path
                                  d={areaPath}
                                  fill="url(#dashboard-area-light)"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ duration: 0.8 }}
                                />

                                <motion.path
                                  d="M 18 118 C 52 116, 82 110, 112 102 C 146 94, 176 92, 208 86 C 242 80, 272 72, 304 68 C 338 64, 368 56, 398 48"
                                  fill="none"
                                  stroke="url(#dashboard-line-light)"
                                  strokeWidth="3.2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  initial={{ pathLength: 0 }}
                                  animate={{ pathLength: 1 }}
                                  transition={{ duration: 1.0, ease: "easeInOut" }}
                                />

                                <motion.path
                                  d="M 398 48 C 426 42, 458 34, 492 24"
                                  fill="none"
                                  stroke="rgba(15,23,42,0.35)"
                                  strokeWidth="2.4"
                                  strokeDasharray="5 6"
                                  strokeLinecap="round"
                                  initial={{ pathLength: 0 }}
                                  animate={{ pathLength: 1 }}
                                  transition={{ duration: 0.55, ease: "easeOut", delay: 1.0 }}
                                />

                                {[[18, 118], [112, 102], [208, 86], [304, 68], [398, 48]].map(([x, y], index) => (
                                  <motion.g
                                    key={`ist-${x}-${y}`}
                                    initial={{ opacity: 0, scale: 0.7 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.3, delay: 0.18 + index * 0.06 }}
                                  >
                                    <circle cx={x} cy={y} r="4" fill="#21569c" />
                                    <circle cx={x} cy={y} r="8" fill="rgba(33,86,156,0.10)" />
                                  </motion.g>
                                ))}

                                <motion.g
                                  initial={{ opacity: 0, scale: 0.7 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ duration: 0.3, delay: 1.1 }}
                                >
                                  <circle cx={492} cy={24} r="4" fill="rgba(15,23,42,0.35)" />
                                  <circle cx={492} cy={24} r="8" fill="rgba(15,23,42,0.06)" />
                                </motion.g>
                              </svg>

                              <div className="mt-1 grid shrink-0 grid-cols-12 text-[0.56rem] text-[#0B162D]/40">
                                {t.months.map((month) => (
                                  <span key={month}>{month}</span>
                                ))}
                              </div>
                            </div>
                          </div>

                          <StoryTooltip
                            focusKey="profit"
                            activeFocus={activeFocus}
                            storyMode={storyMode}
                            story={t.story.profit}
                            placement="top"
                          />
                        </div>
                      </div>

                      <div className="flex min-h-0 flex-1 flex-col gap-3">

                        <div className={cx(moduleClass(["ai"]), "flex min-h-0 flex-[3] flex-col overflow-visible")}>
                          <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-[18px]">
                            <div className="flex flex-1 flex-col p-2 sm:p-3">
                              <p className="shrink-0 text-[0.72rem] font-semibold text-[#0B162D]">{t.sections.signals}</p>

                              <div className="mt-1.5 shrink-0 sm:mt-2.5 grid grid-cols-2 gap-1.5 sm:gap-2">
                                {[
                                  { label: t.signalLabels?.forecastRisk, value: t.signalLabels?.forecastRiskValue },
                                  { label: t.signalLabels?.deviation, value: "-7,2%" },
                                  { label: t.signalLabels?.opportunityScore, value: "82/100" },
                                  { label: t.signalLabels?.trendStrength, value: "0.84" },
                                ].map((item) => (
                                  <div key={item.label} className="rounded-[14px] bg-[#F8FBFE] p-1.5 sm:p-2.5">
                                    <p className="text-[0.52rem] font-medium uppercase tracking-[0.14em] text-[#0B162D]/38">
                                      {item.label}
                                    </p>
                                    <p className="mt-1 sm:mt-1.5 text-[0.82rem] sm:text-[0.9rem] font-semibold text-[#0B162D]">
                                      {item.value}
                                    </p>
                                  </div>
                                ))}
                              </div>

                              <div className="mt-1.5 flex flex-1 flex-col sm:mt-2.5 rounded-[14px] bg-[#F8FBFE] p-1.5 sm:p-2.5">
                                <div className="shrink-0 flex items-center justify-between text-[0.56rem] text-[#0B162D]/44">
                                  <span>{t.signalRadar?.title}</span>
                                  <span>{t.signalRadar?.period}</span>
                                </div>
                                <div className="mt-1 flex flex-1 items-end gap-1 sm:mt-2">
                                  {[14, 18, 16, 22, 28, 26, 32, 30].map((h, i) => (
                                    <div key={i} className="flex-1 rounded-t-md bg-[#DCEBFF]" style={{ height: `${h}px` }}>
                                      <div
                                        className="h-full w-full rounded-t-md bg-gradient-to-t from-[#21569c] to-[#7DBBFF] opacity-70"
                                        style={{ transform: `scaleY(${0.32 + (i % 3) * 0.12})`, transformOrigin: "bottom" }}
                                      />
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>

                          <StoryTooltip
                            focusKey="ai"
                            activeFocus={activeFocus}
                            storyMode={storyMode}
                            story={t.story.ai}
                            placement="bottom"
                          />
                        </div>

                        {/* Segment potential – Speed */}
                        <div className={cx(moduleClass(["speed"]), "min-h-0 flex-[2] overflow-visible")}>
                          <div className="overflow-hidden rounded-[18px]">
                            <div className="p-2 sm:p-3">
                              <p className="text-[0.72rem] font-semibold text-[#0B162D]">{t.sections.potentials}</p>

                              <div className="mt-1.5 sm:mt-2.5 space-y-1.5 sm:space-y-2">
                                {[
                                  [t.segments?.dach, 82],
                                  [t.segments?.swiss, 63],
                                  [t.segments?.serviceUpsell, 47],
                                  [t.segments?.industrialLeads, 36],
                                ].map(([label, value]) => (
                                  <div key={String(label)}>
                                    <div className="mb-0.5 sm:mb-1 flex items-center justify-between text-[0.6rem]">
                                      <span className="text-[#0B162D]/68">{label}</span>
                                      <span className="font-semibold text-[#21569c]">{value}%</span>
                                    </div>
                                    <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                                      <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${value}%` }}
                                        transition={{ duration: 0.8, ease: "easeOut" }}
                                        className="h-full rounded-full bg-gradient-to-r from-[#21569c] to-[#7DBBFF]"
                                      />
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          <StoryTooltip
                            focusKey="speed"
                            activeFocus={activeFocus}
                            storyMode={storyMode}
                            story={t.story.speed}
                            placement="top"
                          />
                        </div>

                      </div>
                    </div>
                  </div>

                </div>

              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}