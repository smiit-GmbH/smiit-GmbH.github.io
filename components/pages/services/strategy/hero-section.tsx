"use client"

import { useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { cubicBezier, motion, useReducedMotion, useScroll, useTransform } from "framer-motion"
import { ArrowRight, ChevronDown, Filter, Layers3 } from "lucide-react"
import type { Locale, Dictionary } from "@/lib/dictionary"
import { PeriodKey, DATASETS } from "./hero/data"
import { MaturityModule, RoadmapModule, RiskModule, InitiativesModule } from "./hero/modules"
import { buildHeroCopy } from "./hero/copy"
import { cx, HeroPackages, MagneticCta, dashboardChildVariants } from "@/components/pages/services/shared/hero-kit"

interface HeroSectionProps {
  lang: Locale
  dict: Dictionary
}

export default function HeroSection({ lang, dict }: HeroSectionProps) {
  const containerRef = useRef<HTMLElement>(null)
  const shouldReduceMotion = useReducedMotion()

  // Toggle the scroll-driven dashboard growth. Flip to true to restore the cinematic morph.
  const SCROLL_ANIMATIONS_ENABLED = false

  const hero = dict?.servicesStrategy?.hero
  const eyebrowLabel = dict?.servicesStrategy?.eyebrows?.hero

  const t = buildHeroCopy(hero)

  const [periodKey, setPeriodKey] = useState<PeriodKey>("y")
  const data = DATASETS[periodKey]
  const bottomLabels = (t.bottomLabels?.[periodKey] ?? []) as string[]

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
  const dashboardScale = useTransform(scrollYProgress, [0.05, 0.3], [0.94, 1], { ease: easeOutCubic })
  const dashboardZ = useTransform(scrollYProgress, [0.05, 0.3], [-160, 0], { ease: easeOutCubic })
  const aiHeight = useTransform(scrollYProgress, [0.05, 0.3], ["230px", "360px"], { ease: easeOutCubic })
  const radarOpacity = useTransform(scrollYProgress, [0.12, 0.28], [0, 1], { ease: easeOutCubic })
  const lightSweepOpacity = useTransform(scrollYProgress, [0.28, 0.34, 0.4], [0, 1, 0])
  const lightSweepX = useTransform(scrollYProgress, [0.28, 0.42], ["-40%", "140%"], { ease: easeOutCubic })

  const useStaticIdleLayout = !SCROLL_ANIMATIONS_ENABLED

  const heroTextStyle = shouldReduceMotion
    ? { opacity: 0 }
    : useStaticIdleLayout
      ? { opacity: 1, y: 0 }
      : { opacity: heroTextOpacity, y: heroTextY }
  const dashboardWrapperStyle = shouldReduceMotion ? undefined : useStaticIdleLayout ? { x: "20vw" } : { x: dashboardX }
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
    shouldReduceMotion || useStaticIdleLayout ? { opacity: 0 } : { opacity: lightSweepOpacity, x: lightSweepX }
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
            <HeroPackages service="strategy" hero={hero} align="center" />
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
                    src="/logo_black.webp"
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
                  aria-label={t.ariaLabels?.timeRange}
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
                <MaturityModule t={t} data={data} reduceMotion={shouldReduceMotion} mobileEmphasis lang={lang} />
              </motion.div>

              <motion.div
                variants={dashboardChildVariants}
                className="flex flex-col overflow-hidden rounded-[18px] border border-slate-200/80 bg-white shadow-[0_14px_36px_rgba(18,38,63,0.07)] sm:min-h-[320px] md:min-h-[360px]"
              >
                <RoadmapModule t={t} data={data} mobileEmphasis lang={lang} bottomLabels={bottomLabels} />
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
        className={cx("relative hidden lg:block", SCROLL_ANIMATIONS_ENABLED ? "lg:h-[420vh]" : "lg:h-screen")}
      >
        <div className="sticky top-0 h-[100dvh] overflow-hidden">
          {/* Background glow — right side, behind the dashboard */}
          <div
            aria-hidden
            className="pointer-events-none absolute right-[5%] top-1/2 -z-10 h-[480px] w-[680px] -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(100,116,139,0.10),_transparent_62%)] blur-2xl"
          />

          {/* HERO TEXT — left column */}
          <motion.div style={heroTextStyle} className="pointer-events-none absolute inset-0 z-10 flex items-center">
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

                  <HeroPackages service="strategy" hero={hero} />

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
            className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center"
          >
            <motion.div
              style={dashboardStyle}
              className="pointer-events-auto relative overflow-hidden rounded-[28px] border border-white/70 bg-white/84 shadow-[0_34px_100px_rgba(15,23,42,0.12)] backdrop-blur-2xl"
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
                        src="/logo_black.webp"
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
                      aria-label={t.ariaLabels?.timeRange}
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
                              active ? "bg-[#64748B] text-white shadow-sm" : "text-[#0B162D]/60 hover:text-[#0B162D]",
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
                      <MaturityModule t={t} data={data} reduceMotion={shouldReduceMotion} lang={lang} />
                    </div>
                    <div className="relative flex min-h-0 flex-1 flex-col overflow-visible rounded-[18px] border border-slate-200/80 bg-white shadow-[0_14px_36px_rgba(18,38,63,0.07)]">
                      <RoadmapModule t={t} data={data} lang={lang} bottomLabels={bottomLabels} />
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
