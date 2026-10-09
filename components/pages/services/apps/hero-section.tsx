"use client"

import { useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { cubicBezier, motion, useReducedMotion, useScroll, useTransform } from "framer-motion"
import { useActiveInView } from "@/hooks/use-active-in-view"
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
import type { Locale, Dictionary } from "@/lib/dictionary"
import { ViewKey, DATASETS } from "./hero/data"
import { ClarityModule, ProfitModule, AiModule, SpeedModule } from "./hero/modules"
import { buildHeroCopy } from "./hero/copy"
import { cx, HeroPackages, MagneticCta, dashboardChildVariants } from "@/components/pages/services/shared/hero-kit"

interface HeroSectionProps {
  lang: Locale
  dict: Dictionary
}

export default function HeroSection({ lang, dict }: HeroSectionProps) {
  const containerRef = useRef<HTMLElement>(null)
  const [desktopInViewRef, desktopInView] = useActiveInView()
  const shouldReduceMotion = useReducedMotion()

  // Toggle the scroll-driven dashboard growth. Flip to true to restore the cinematic morph.
  const SCROLL_ANIMATIONS_ENABLED = false

  const hero = { ...dict?.servicesAnalytics?.hero, ...dict?.servicesApps?.hero }
  const eyebrowLabel = dict?.servicesApps?.eyebrows?.hero

  const t = buildHeroCopy(hero)

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
  const activities = (t.activitiesByView?.[viewKey] ?? []) as { user: string; action: string; time: string }[]
  const tasks = (t.tasksByView?.[viewKey] ?? []) as { label: string; due: string }[]

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
          // Same size as the former 3D idle pose (perspective 2000px, z -160, scale 0.94),
          // expressed as a plain 2D scale. A 3D transform rasterises the dashboard as a
          // GPU layer and resamples it, which blurs its small text (see website hero).
          scale: 0.94 * (2000 / (2000 + 160)),
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
          <div className="text-center hero-rise">
            <span className="section-eyebrow">{eyebrowLabel}</span>
            <h1 className="mx-auto mt-3 max-w-[18ch] font-serif text-[2.05rem] leading-[1.05] tracking-tight text-[#0B162D] sm:text-[2.5rem] md:text-[3rem]">
              {hero?.title}
            </h1>
            <p className="mx-auto mt-4 max-w-[58ch] text-[0.95rem] leading-relaxed text-[#0B162D]/70 sm:text-[1rem] md:mt-5 md:text-[1.05rem]">
              {hero?.description}
            </p>
            <HeroPackages service="apps" hero={hero} align="center" />
            <div className="mt-6 sm:mt-7">
              <Link
                href={`/${lang}/contact#book`}
                className="group inline-flex items-center justify-center rounded-lg bg-[#F703EB] px-5 py-3 text-[0.9rem] font-medium text-white shadow-[0_14px_28px_rgba(247,3,235,0.20)] transition-colors duration-300 hover:bg-[#D802CD]"
              >
                {hero?.primaryCta}
                <ArrowRight className="ml-1.5 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>

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
                    src="/logo_black.webp"
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
                    aria-label={t.ariaLabels?.timeRange}
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
                <ClarityModule t={t} data={data} reduceMotion={shouldReduceMotion} mobileEmphasis lang={lang} />
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
                <AiModule t={t} data={data} activities={activities} />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* DESKTOP — >= lg */}
      <section
        ref={(el) => {
          containerRef.current = el
          desktopInViewRef(el)
        }}
        className={cx("relative hidden lg:block", SCROLL_ANIMATIONS_ENABLED ? "lg:h-[420vh]" : "lg:h-screen")}
      >
        <div className="sticky top-0 h-[100dvh] overflow-hidden">
          {/* Background glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute right-[5%] top-1/2 -z-10 h-[480px] w-[680px] -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(247,3,235,0.10),_transparent_62%)] blur-2xl"
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

                  <HeroPackages service="apps" hero={hero} />

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
                {/* App Top Bar */}
                <div className="flex shrink-0 items-center justify-between gap-3 border-b border-slate-100 bg-white px-3.5 py-2 sm:px-4">
                  {/* Brand */}
                  <div className="flex items-center gap-2 shrink-0">
                    <Image
                      src="/logo_black.webp"
                      alt="smiit"
                      width={64}
                      height={24}
                      className="h-[20px] w-auto object-contain opacity-80"
                    />
                    <div className="h-3 w-px bg-slate-200" />
                    <h2 className="whitespace-nowrap text-[0.8rem] font-semibold text-[#0B162D]">{t.appName}</h2>
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
                      aria-hidden="true"
                      tabIndex={-1}
                      className="relative rounded-md p-1 text-[#0B162D]/55 transition-colors hover:bg-slate-50 hover:text-[#0B162D]"
                    >
                      <Bell className="h-3.5 w-3.5" />
                      <motion.span
                        animate={desktopInView ? { opacity: [1, 0.4, 1] } : { opacity: 1 }}
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
                    aria-label={t.ariaLabels?.mainNav}
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
                          aria-label={t.ariaLabels?.timeRange}
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
                          <ClarityModule t={t} data={data} reduceMotion={shouldReduceMotion} lang={lang} />
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
                          <AiModule t={t} data={data} activities={activities} />
                        </motion.div>
                        <div className="relative flex min-h-0 flex-1 flex-col overflow-visible rounded-[18px] border border-slate-200/80 bg-white shadow-[0_14px_36px_rgba(18,38,63,0.07)]">
                          <SpeedModule t={t} data={data} tasks={tasks} />
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
