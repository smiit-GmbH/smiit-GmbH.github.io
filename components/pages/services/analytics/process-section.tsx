"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion"
import { Compass, PenLine, Hammer, GraduationCap, ArrowRight } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { useRevealOnScroll } from "@/hooks/use-reveal-on-scroll"

const stepIcons: LucideIcon[] = [Compass, PenLine, Hammer, GraduationCap]

interface Step {
  number: string
  title: string
  text: string
}

interface ProcessSectionProps {
  dict: any
}

export default function ProcessSection({ dict }: ProcessSectionProps) {
  const process = dict?.servicesAnalytics?.process
  const eyebrowLabel = dict?.servicesAnalytics?.eyebrows?.process
  const steps: Step[] = process?.steps ?? []

  const containerRef = useRef<HTMLElement>(null)
  const shouldReduceMotion = useReducedMotion()

  const [isDesktop, setIsDesktop] = useState(false)
  useEffect(() => {
    const mql = window.matchMedia("(min-width: 1024px)")
    const onChange = () => setIsDesktop(mql.matches)
    onChange()
    mql.addEventListener("change", onChange)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  // Horizontal scroll: container is 4 viewports tall, sticky, content slides X.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  // We have 4 slides each ≈ 100vw wide → row total = 400vw, must travel -300vw to show last slide.
  // Translate from 2vw to -302vw, leaving small left margin at start.
  const x = useTransform(scrollYProgress, [0.05, 0.95], ["2vw", "-302vw"])
  const progressScaleX = useTransform(scrollYProgress, [0, 1], [0.05, 1])

  // Active slide index (1..4) for the progress indicator
  const [activeIndex, setActiveIndex] = useState(0)
  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => {
      const idx = Math.min(steps.length - 1, Math.max(0, Math.floor(v * steps.length)))
      setActiveIndex(idx)
    })
    return () => unsub()
  }, [scrollYProgress, steps.length])

  const headingReveal = useRevealOnScroll()
  const mobileReveal = useRevealOnScroll({ margin: "-80px" })

  return (
    <>
      {/* Desktop: pinned horizontal-scroll experience */}
      {isDesktop && (
        <section
          ref={containerRef}
          className="relative hidden lg:block lg:h-[320vh]"
        >
          <div className="sticky top-0 flex h-[100dvh] flex-col overflow-hidden">
            {/* Heading row */}
            <div className="relative z-10 mx-auto mt-10 w-full max-w-[1400px] px-8">
              <div className="flex items-end justify-between gap-8">
                <div>
                  <span className="section-eyebrow">{eyebrowLabel}</span>
                  <h2 className="mt-1 max-w-[26ch] font-serif text-[1.8rem] leading-[1.05] tracking-tight text-black md:text-[2.2rem] xl:text-[2.6rem]">
                    {process?.title}{" "}
                    <span className="text-[#21569c]">{process?.titleHighlight}</span>
                  </h2>
                </div>

                {/* Step counter + progress bar */}
                <div className="hidden min-w-[260px] flex-col items-end gap-2 lg:flex">
                  <div className="flex items-baseline gap-1.5 font-serif text-[#0B162D]/70">
                    <span className="text-[2rem] font-semibold tabular-nums text-[#21569c] xl:text-[2.4rem]">
                      {String(activeIndex + 1).padStart(2, "0")}
                    </span>
                    <span className="text-base text-[#0B162D]/35">/</span>
                    <span className="text-base text-[#0B162D]/45 tabular-nums">
                      {String(steps.length).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="h-[3px] w-[240px] overflow-hidden rounded-full bg-[#0B162D]/10">
                    <motion.div
                      className="h-full origin-left rounded-full bg-gradient-to-r from-[#21569c] to-[#7DBBFF]"
                      style={
                        shouldReduceMotion
                          ? { width: `${((activeIndex + 1) / steps.length) * 100}%` }
                          : { scaleX: progressScaleX, width: "100%" }
                      }
                    />
                  </div>
                </div>
              </div>

              {process?.subtitle && (
                <p className="mt-4 max-w-[64ch] text-[1rem] leading-relaxed text-black/60">
                  {process.subtitle}
                </p>
              )}
            </div>

            {/* Horizontal track */}
            <div className="relative flex flex-1 items-center overflow-hidden">
              <motion.div
                style={shouldReduceMotion ? undefined : { x }}
                className="flex h-full items-center"
              >
                {steps.map((step, idx) => {
                  const Icon = stepIcons[idx] ?? Compass
                  const isLast = idx === steps.length - 1
                  return (
                    <div
                      key={idx}
                      className="flex h-full w-[100vw] shrink-0 items-center justify-center px-12 xl:px-20"
                    >
                      <div className="grid w-full max-w-[1100px] items-center gap-10 lg:grid-cols-[1.15fr_1fr]">
                        {/* Left – content */}
                        <div className="relative">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#21569c] text-white shadow-[0_12px_28px_rgba(33,86,156,0.28)]">
                              <Icon className="h-4 w-4" />
                            </div>
                            <span className="text-[0.66rem] font-semibold uppercase tracking-[0.22em] text-[#21569c]">
                              Schritt {step.number}
                            </span>
                          </div>

                          <div className="mt-5 flex items-baseline gap-4">
                            <span className="font-serif text-[3.4rem] font-semibold leading-[0.85] tracking-tight text-[#21569c]/20 xl:text-[4rem]">
                              {step.number}
                            </span>
                            <h3 className="font-serif text-[1.85rem] font-semibold leading-[1.05] text-[#0B162D] xl:text-[2.2rem]">
                              {step.title}
                            </h3>
                          </div>

                          <p className="mt-4 max-w-[46ch] text-[0.95rem] leading-relaxed text-[#0B162D]/65 xl:text-[1rem]">
                            {step.text}
                          </p>

                          {!isLast && (
                            <div className="mt-7 inline-flex items-center gap-2 text-[0.72rem] font-medium uppercase tracking-[0.22em] text-[#21569c]/65">
                              Weiter
                              <ArrowRight className="h-3.5 w-3.5" />
                            </div>
                          )}
                        </div>

                        {/* Right – decorative card */}
                        <div className="relative hidden lg:block">
                          <div className="relative aspect-[4/5] max-h-[440px] w-full overflow-hidden rounded-[24px] border border-slate-200/70 bg-white/80 shadow-[0_24px_56px_rgba(15,23,42,0.10)] backdrop-blur-xl">
                            <div
                              aria-hidden
                              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(33,86,156,0.16),_transparent_55%),radial-gradient(circle_at_bottom_left,_rgba(125,187,255,0.16),_transparent_50%)]"
                            />

                            <span
                              aria-hidden
                              className="absolute right-5 top-2 font-serif text-[8rem] font-semibold leading-[0.85] text-[#21569c]/10"
                            >
                              {step.number}
                            </span>

                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="flex h-24 w-24 items-center justify-center rounded-3xl border border-[#21569c]/25 bg-white/90 text-[#21569c] shadow-[0_20px_48px_rgba(33,86,156,0.22)] backdrop-blur-sm">
                                <Icon className="h-10 w-10" />
                              </div>
                            </div>

                            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                              <div className="flex flex-col gap-0.5">
                                <span className="text-[0.55rem] font-semibold uppercase tracking-[0.24em] text-[#0B162D]/45">
                                  Phase
                                </span>
                                <span className="font-serif text-[0.98rem] font-semibold text-[#0B162D]">
                                  {step.title}
                                </span>
                              </div>
                              <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#21569c]/30 text-[#21569c]">
                                <span className="text-[0.72rem] font-semibold tabular-nums">
                                  {step.number}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* Mobile / reduced-motion fallback: vertical card grid */}
      {!isDesktop && (
        <section className="relative bg-transparent py-16 sm:py-20">
          <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
            <div
              ref={headingReveal.ref}
              className={`text-center reveal-fade-up ${headingReveal.isRevealed ? "revealed" : ""}`}
            >
              <span className="section-eyebrow justify-center">{eyebrowLabel}</span>
              <h2 className="mx-auto max-w-[22ch] font-serif text-[2.2rem] sm:text-[2.4rem] md:text-[3rem] leading-[1.1] tracking-tight text-black">
                {process?.title}{" "}
                <span className="text-[#21569c]">{process?.titleHighlight}</span>
              </h2>
              {process?.subtitle && (
                <p className="mx-auto mt-4 max-w-[58ch] text-[0.9rem] sm:text-base leading-relaxed text-black/60">
                  {process.subtitle}
                </p>
              )}
            </div>

            <div ref={mobileReveal.ref} className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
              {steps.map((step, idx) => {
                const Icon = stepIcons[idx] ?? Compass
                return (
                  <div
                    key={idx}
                    className={`group relative rounded-[1.5rem] border border-slate-200/70 bg-white p-7 shadow-[0_10px_30px_rgba(15,23,42,0.05)] transition-all duration-500 hover:-translate-y-1 hover:border-[#21569c]/30 hover:shadow-[0_18px_45px_rgba(33,86,156,0.12)] reveal-fade-up reveal-delay-${idx + 1} ${mobileReveal.isRevealed ? "revealed" : ""}`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-[2.4rem] md:text-[2.8rem] font-semibold leading-none text-[#21569c]/25">
                        {step.number}
                      </span>
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#21569c]/10 text-[#21569c]">
                        <Icon className="h-4 w-4 md:h-5 md:w-5" />
                      </div>
                    </div>
                    <h3 className="mt-5 font-serif text-lg md:text-xl font-semibold text-black">
                      {step.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-black/60">{step.text}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
