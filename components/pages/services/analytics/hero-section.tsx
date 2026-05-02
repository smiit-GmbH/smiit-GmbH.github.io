"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight, TrendingUp, Sparkles } from "lucide-react"
import type { Locale } from "@/lib/dictionary"

interface HeroSectionProps {
  lang: Locale
  dict: any
}

function HeroShowpiece({ dict }: { dict: any }) {
  const hero = dict?.servicesAnalytics?.hero
  const kpiLabels = hero?.kpiLabels ?? {}
  const chartLegend = hero?.chartLegend ?? {}
  const months = (hero?.months ?? ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul"]).slice(0, 7)

  const areaPath =
    "M 18 118 C 52 116, 82 110, 112 102 C 146 94, 176 92, 208 86 C 242 80, 272 72, 304 68 C 338 64, 368 56, 398 48 C 426 42, 458 34, 492 24 L 492 146 L 18 146 Z"
  const linePath =
    "M 18 118 C 52 116, 82 110, 112 102 C 146 94, 176 92, 208 86 C 242 80, 272 72, 304 68 C 338 64, 368 56, 398 48"
  const forecastPath = "M 398 48 C 426 42, 458 34, 492 24"

  return (
    <div className="relative isolate w-full">
      {/* Soft halo behind the visual */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[110%] w-[110%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(33,86,156,0.16),_transparent_62%)] blur-2xl"
      />

      {/* Floating dashboard card with subtle 3D tilt + float */}
      <div className="hero-showpiece-float relative mx-auto w-full max-w-[640px] [perspective:1400px]">
        <div className="relative overflow-hidden rounded-[22px] border border-white/70 bg-white/90 shadow-[0_34px_80px_rgba(15,23,42,0.18)] backdrop-blur-2xl">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
            <div className="flex items-center gap-2">
              <Image
                src="/logo_black.png"
                alt="smiit"
                width={68}
                height={26}
                className="h-[22px] w-auto object-contain opacity-80"
              />
              <div className="h-3.5 w-px bg-slate-200" />
              <span className="text-[0.78rem] font-semibold text-[#0B162D]">Live Dashboard</span>
            </div>
            <div className="flex items-center gap-1.5 text-[0.6rem] text-emerald-600">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="font-semibold uppercase tracking-[0.18em]">Live</span>
            </div>
          </div>

          {/* KPI strip */}
          <div className="grid grid-cols-3 gap-2 border-b border-slate-100 p-3">
            {[
              { label: kpiLabels.revenue ?? "Umsatz", value: "4,86 Mio." },
              { label: kpiLabels.margin ?? "Marge", value: "18,4 %" },
              { label: kpiLabels.forecastConfidence ?? "Forecast", value: "89 %" },
            ].map((kpi) => (
              <div key={kpi.label} className="rounded-[12px] bg-[#F8FBFE] px-2.5 py-2">
                <p className="text-[0.5rem] font-semibold uppercase tracking-[0.14em] text-[#0B162D]/40">
                  {kpi.label}
                </p>
                <p className="mt-1 text-[0.95rem] font-semibold text-[#0B162D]">{kpi.value}</p>
              </div>
            ))}
          </div>

          {/* Chart */}
          <div className="p-3">
            <div className="mb-2 flex items-center justify-between">
              <div>
                <p className="text-[0.7rem] font-semibold text-[#0B162D]">Umsatz · 12 Monate</p>
                <div className="mt-0.5 flex items-center gap-3 text-[0.55rem] text-[#0B162D]/45">
                  <span className="inline-flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#21569c]" />
                    {chartLegend.actual ?? "Ist"}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#0B162D]/30" />
                    {chartLegend.forecast ?? "Forecast"}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1 rounded-[10px] border border-slate-200/80 bg-[#F8FBFE] px-2 py-1 text-[#21569c]">
                <TrendingUp className="h-3 w-3" />
                <span className="text-[0.78rem] font-semibold">+18,4%</span>
              </div>
            </div>

            <div className="rounded-[14px] border border-slate-100 bg-[#F8FBFE] p-2">
              <svg viewBox="0 0 510 150" className="h-[150px] w-full">
                <defs>
                  <linearGradient id="hero-area-grad" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="rgba(33,86,156,0.18)" />
                    <stop offset="100%" stopColor="rgba(33,86,156,0)" />
                  </linearGradient>
                  <linearGradient id="hero-line-grad" x1="0" x2="1" y1="0" y2="0">
                    <stop offset="0%" stopColor="#21569c" />
                    <stop offset="100%" stopColor="#7DBBFF" />
                  </linearGradient>
                </defs>

                {[26, 54, 82, 110].map((y) => (
                  <line key={y} x1="16" x2="494" y1={y} y2={y} stroke="rgba(15,23,42,0.05)" strokeDasharray="4 6" />
                ))}

                <motion.path
                  d={areaPath}
                  fill="url(#hero-area-grad)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.9, delay: 0.3 }}
                />
                <motion.path
                  d={linePath}
                  fill="none"
                  stroke="url(#hero-line-grad)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.2, ease: "easeInOut", delay: 0.4 }}
                />
                <motion.path
                  d={forecastPath}
                  fill="none"
                  stroke="rgba(15,23,42,0.35)"
                  strokeWidth="2.2"
                  strokeDasharray="5 6"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 1.4 }}
                />

                {[[18, 118], [112, 102], [208, 86], [304, 68], [398, 48]].map(([x, y], index) => (
                  <motion.g
                    key={`p-${x}-${y}`}
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.5 + index * 0.06 }}
                  >
                    <circle cx={x} cy={y} r="3.5" fill="#21569c" />
                    <circle cx={x} cy={y} r="7" fill="rgba(33,86,156,0.10)" />
                  </motion.g>
                ))}
                <motion.g
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 1.5 }}
                >
                  <circle cx={492} cy={24} r="3.5" fill="rgba(15,23,42,0.45)" />
                  <circle cx={492} cy={24} r="7" fill="rgba(15,23,42,0.08)" />
                </motion.g>
              </svg>

              <div className="mt-1 grid grid-cols-7 text-[0.52rem] text-[#0B162D]/40">
                {months.map((m: string) => (
                  <span key={m}>{m}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Floating chip 1 – KPI badge top-right */}
        <motion.div
          initial={{ opacity: 0, y: 14, scale: 0.85 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.55, ease: "easeOut" }}
          className="hero-chip-drift absolute -right-3 top-12 hidden rounded-2xl border border-white/80 bg-white/95 px-3 py-2.5 shadow-[0_18px_38px_rgba(15,23,42,0.14)] backdrop-blur sm:block"
        >
          <p className="text-[0.5rem] font-semibold uppercase tracking-[0.16em] text-[#21569c]">
            Forecast Accuracy
          </p>
          <p className="mt-0.5 text-[1.3rem] font-semibold text-[#0B162D]">94%</p>
          <div className="mt-1 h-1 w-16 overflow-hidden rounded-full bg-slate-100">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "94%" }}
              transition={{ duration: 1.0, delay: 1.1, ease: "easeOut" }}
              className="h-full rounded-full bg-gradient-to-r from-[#21569c] to-[#7DBBFF]"
            />
          </div>
        </motion.div>

        {/* Floating chip 2 – AI signal bottom-left */}
        <motion.div
          initial={{ opacity: 0, y: -14, scale: 0.85 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.75, ease: "easeOut" }}
          className="hero-chip-drift-2 absolute -left-4 bottom-14 hidden rounded-2xl border border-white/80 bg-white/95 px-3 py-2.5 shadow-[0_18px_38px_rgba(15,23,42,0.14)] backdrop-blur sm:block"
        >
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#21569c]/10 text-[#21569c]">
              <Sparkles className="h-3.5 w-3.5" />
            </div>
            <div>
              <p className="text-[0.5rem] font-semibold uppercase tracking-[0.16em] text-[#21569c]">
                KI-Signal
              </p>
              <p className="text-[0.78rem] font-semibold text-[#0B162D]">Marge über Ziel</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default function HeroSection({ lang, dict }: HeroSectionProps) {
  const hero = dict?.servicesAnalytics?.hero
  const eyebrowLabel = dict?.servicesAnalytics?.eyebrows?.hero

  return (
    <section className="relative flex min-h-[100dvh] items-center overflow-hidden bg-transparent lg:hidden">
      {/* Soft glow behind text */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-[10%] top-[12%] -z-10 h-[520px] w-[820px] rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(33,86,156,0.16),_transparent_65%)]"
      />

      <div className="relative mx-auto w-full max-w-[1380px] px-4 pb-32 pt-28 sm:px-6 sm:pt-32 lg:px-10 lg:pb-28 lg:pt-16">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.25fr] lg:gap-10 xl:gap-14">
          {/* LEFT — text block */}
          <div className="relative text-center lg:text-left">
            <motion.span
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="section-eyebrow"
            >
              {eyebrowLabel}
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: "easeOut", delay: 0.06 }}
              className="mx-auto mt-2 max-w-[16ch] font-serif text-[2rem] leading-[1.05] text-[#0B162D] sm:text-[2.4rem] md:text-[2.8rem] lg:mx-0 lg:max-w-[15ch] lg:text-[2.8rem] xl:text-[3.2rem] 2xl:text-[3.6rem]"
            >
              {hero?.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.12 }}
              className="mx-auto mt-5 max-w-[56ch] text-sm leading-relaxed text-[#0B162D]/70 sm:text-base lg:mx-0 lg:text-[0.98rem] xl:text-[1.05rem]"
            >
              {hero?.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: "easeOut", delay: 0.2 }}
              className="mt-9 flex justify-center lg:justify-start"
            >
              <Link
                href={`/${lang}/contact#book`}
                className="group inline-flex items-center justify-center rounded-lg bg-[#21569c] px-4 py-2.5 text-[0.82rem] font-medium text-white shadow-[0_14px_28px_rgba(33,86,156,0.20)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1d4d8b] sm:px-5 sm:py-3 sm:text-[0.88rem]"
              >
                {hero?.primaryCta}
                <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 sm:h-4 sm:w-4" />
              </Link>
            </motion.div>
          </div>

          {/* RIGHT — showpiece visual */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: "easeOut", delay: 0.25 }}
            className="relative w-full"
          >
            <HeroShowpiece dict={dict} />
          </motion.div>
        </div>

      </div>
    </section>
  )
}
