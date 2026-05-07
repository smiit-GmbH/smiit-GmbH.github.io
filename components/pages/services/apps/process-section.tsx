"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion"
import { Compass, PenLine, Hammer, GraduationCap } from "lucide-react"
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
  const process = dict?.servicesApps?.process
  const eyebrowLabel = dict?.servicesApps?.eyebrows?.process
  const steps: Step[] = process?.steps ?? []

  const containerRef = useRef<HTMLElement>(null)
  const stepRefs = useRef<(HTMLDivElement | null)[]>([])
  const shouldReduceMotion = useReducedMotion()

  const [isDesktop, setIsDesktop] = useState(false)
  useEffect(() => {
    const mql = window.matchMedia("(min-width: 1024px)")
    const onChange = () => setIsDesktop(mql.matches)
    onChange()
    mql.addEventListener("change", onChange)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  const useStaticLayout = !isDesktop || !!shouldReduceMotion

  // Active step = whichever right-column block currently crosses the horizontal viewport center.
  const [activeIndex, setActiveIndex] = useState(0)
  useEffect(() => {
    if (useStaticLayout) return
    const nodes = stepRefs.current.filter(Boolean) as HTMLDivElement[]
    if (!nodes.length) return
    const observers = nodes.map((node, idx) => {
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveIndex(idx)
        },
        { rootMargin: "-50% 0px -50% 0px", threshold: 0 },
      )
      obs.observe(node)
      return obs
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [useStaticLayout, steps.length])

  const headingReveal = useRevealOnScroll()
  const mobileReveal = useRevealOnScroll({ margin: "-80px" })

  // Mobile / reduced-motion fallback — unchanged grid of step cards.
  if (useStaticLayout) {
    return (
      <section className="relative bg-transparent py-16 sm:py-20">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
          <div
            ref={headingReveal.ref}
            className={`text-center reveal-fade-up ${headingReveal.isRevealed ? "revealed" : ""}`}
          >
            <span className="section-eyebrow justify-center">{eyebrowLabel}</span>
            <h2 className="mx-auto max-w-[22ch] font-serif text-[2.2rem] sm:text-[2.4rem] md:text-[3rem] leading-[1.1] tracking-tight text-black">
              {process?.title}{" "}
              <span className="text-[#F703EB]">{process?.titleHighlight}</span>
            </h2>
            {process?.subtitle && (
              <p className="mx-auto mt-4 max-w-[58ch] text-[0.9rem] sm:text-base leading-relaxed text-black/60">
                {process.subtitle}
              </p>
            )}
          </div>

          <div className="md:hidden">
            <MobileProcessTimeline steps={steps} reduceMotion={!!shouldReduceMotion} />
          </div>

          <div ref={mobileReveal.ref} className="mt-12 hidden grid-cols-1 gap-5 md:grid md:grid-cols-2">
            {steps.map((step, idx) => {
              const Icon = stepIcons[idx] ?? Compass
              return (
                <div
                  key={idx}
                  className={`group relative rounded-[1.5rem] border border-slate-200/70 bg-white p-7 shadow-[0_10px_30px_rgba(15,23,42,0.05)] transition-all duration-500 hover:-translate-y-1 hover:border-[#F703EB]/30 hover:shadow-[0_18px_45px_rgba(247,3,235,0.12)] reveal-fade-up reveal-delay-${idx + 1} ${mobileReveal.isRevealed ? "revealed" : ""}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-[2.4rem] md:text-[2.8rem] font-semibold leading-none text-[#F703EB]/25">
                      {step.number}
                    </span>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F703EB]/10 text-[#F703EB]">
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
    )
  }

  // Desktop sticky-split: heading flows at top, two-column grid below
  // (left = sticky mindmap, right = step text blocks scrolling).
  // Section auto-sizes from content; right column carries lead/tail padding so
  // the first step appears lower at scroll=0 and the last step can scroll past
  // viewport center before the section ends.
  return (
    <section ref={containerRef} className="relative hidden lg:block">
      <div className="mx-auto max-w-[1400px] px-8 pb-4 pt-2">
        <div>
          <span className="section-eyebrow">{eyebrowLabel}</span>
          <h2 className="mt-1 max-w-[26ch] font-serif text-[2rem] leading-[1.05] tracking-tight text-black sm:text-[2.4rem] md:text-[3rem]">
            {process?.title}{" "}
            <span className="text-[#F703EB]">{process?.titleHighlight}</span>
          </h2>
          {process?.subtitle && (
            <p className="mt-3 max-w-[64ch] text-[1rem] leading-relaxed text-black/60">
              {process.subtitle}
            </p>
          )}
        </div>

        <div className="grid grid-cols-[1fr_1fr] gap-12 -mt-16">
          {/* LEFT — sticky mindmap diagram, active branch highlights based on scroll */}
          <div className="sticky top-0 flex h-[100dvh] items-center">
            <Mindmap items={steps} activeIndex={activeIndex} />
          </div>

          {/* RIGHT — scrolling step blocks. pt offsets the first step slightly
              from the heading; pb gives the last step enough room to reach
              viewport center before the section ends. */}
          <div className="flex flex-col pt-[10vh] pb-[4vh]">
            {steps.map((step, idx) => {
              const isActive = activeIndex === idx
              const Icon = stepIcons[idx] ?? Compass
              return (
                <div
                  key={idx}
                  ref={(n) => {
                    stepRefs.current[idx] = n
                  }}
                  className={`flex min-h-[40vh] items-center transition-all duration-300 ease-out ${
                    isActive ? "opacity-100" : "opacity-40"
                  }`}
                >
                  <div className="w-full">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F703EB] text-white shadow-[0_12px_28px_rgba(247,3,235,0.28)]">
                        <Icon className="h-4 w-4" />
                      </div>
                      <span className="text-[0.66rem] font-semibold uppercase tracking-[0.22em] text-[#F703EB]">
                        Schritt {step.number}
                      </span>
                    </div>

                    <div className="mt-5 flex items-baseline gap-4">
                      <span className="font-serif text-[3.4rem] font-semibold leading-[0.85] tracking-tight text-[#F703EB]/20 xl:text-[4rem]">
                        {step.number}
                      </span>
                      <h3 className="font-serif text-[1.85rem] font-semibold leading-[1.05] text-[#0B162D] xl:text-[2.2rem]">
                        {step.title}
                      </h3>
                    </div>

                    <p className="mt-4 max-w-[46ch] text-[0.95rem] leading-relaxed text-[#0B162D]/65 xl:text-[1rem]">
                      {step.text}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

// ---------- Mindmap ----------

function Mindmap({
  items,
  activeIndex,
}: {
  items: Step[]
  activeIndex: number
}) {
  // SVG canvas + HTML node positions share the same 480 × 480 coordinate space.
  const W = 480
  const H = 480
  const centerY = H / 2
  // Center HTML node: left:0, width:140 → right edge at x=140.
  const centerRightX = 140
  // Child HTML pills: right:0, width:260 → left edge at x=220.
  const childLeftX = 220

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[480px]">
      {/* Connecting lines — color/weight transitions follow the active branch */}
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="pointer-events-none absolute inset-0 h-full w-full"
      >
        {items.map((_, idx) => {
          const yChild = ((idx + 0.5) / items.length) * H
          const isActive = activeIndex === idx
          // S-curve: out from center horizontally, then bend to child y, approach horizontally.
          const path = `M ${centerRightX} ${centerY} C ${centerRightX + 60} ${centerY}, ${childLeftX - 60} ${yChild}, ${childLeftX} ${yChild}`
          return (
            <path
              key={idx}
              d={path}
              stroke={isActive ? "#F703EB" : "#cbd5e1"}
              strokeWidth={isActive ? 1.8 : 1}
              fill="none"
              className="transition-[stroke,stroke-width] duration-300 ease-out"
            />
          )
        })}
      </svg>

      {/* Center node — logo centered in a colored card */}
      <div className="absolute left-0 top-1/2 z-10 flex h-[100px] w-[140px] -translate-y-1/2 items-center justify-center rounded-xl bg-white">
        <Image
          src="/logo_black.png"
          alt="smiit"
          width={200}
          height={100}
          className="h-12 w-auto object-contain px-3"
        />
      </div>

      {/* Step pills — pure CSS transitions */}
      {items.map((item, idx) => {
        const Icon = stepIcons[idx] ?? Compass
        const isActive = activeIndex === idx
        const yPercent = ((idx + 0.5) / items.length) * 100
        return (
          <div
            key={idx}
            style={{ top: `${yPercent}%`, transform: "translateY(-50%)" }}
            className={`absolute right-0 z-10 flex w-[260px] items-center gap-3 rounded-xl border px-4 py-3 transition-all duration-300 ease-out ${
              isActive
                ? "border-[#F703EB] bg-[#F703EB] text-white shadow-[0_14px_36px_rgba(247,3,235,0.34)]"
                : "border-slate-200/80 bg-white/90 text-[#0B162D]/75 backdrop-blur-sm"
            }`}
          >
            <div
              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-colors duration-300 ${
                isActive ? "bg-white/20 text-white" : "bg-[#F703EB]/10 text-[#F703EB]"
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
            </div>
            <span className="truncate text-[0.85rem] font-medium">{item.title}</span>
          </div>
        )
      })}
    </div>
  )
}

function MobileProcessTimeline({
  steps,
  reduceMotion,
}: {
  steps: Step[]
  reduceMotion: boolean
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const stepRefs = useRef<(HTMLDivElement | null)[]>([])
  const [activeIndex, setActiveIndex] = useState(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 20%"],
  })
  const railSpring = useSpring(scrollYProgress, { stiffness: 110, damping: 24, mass: 0.4 })
  const railHeight = useTransform(railSpring, (p) => `${Math.min(100, Math.max(0, p * 100))}%`)

  useEffect(() => {
    if (reduceMotion) return
    const nodes = stepRefs.current.filter(Boolean) as HTMLDivElement[]
    if (!nodes.length) return
    const observers = nodes.map((node, idx) => {
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveIndex(idx)
        },
        { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
      )
      obs.observe(node)
      return obs
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [reduceMotion, steps.length])

  return (
    <div ref={containerRef} className="relative mt-12">
      {/* Rail — base track + scroll-driven progress overlay */}
      <div aria-hidden className="pointer-events-none absolute left-[19px] top-2 bottom-2 w-[2px] rounded-full bg-slate-200/80" />
      <motion.div
        aria-hidden
        style={reduceMotion ? { height: "100%" } : { height: railHeight }}
        className="pointer-events-none absolute left-[19px] top-2 w-[2px] rounded-full bg-gradient-to-b from-[#F703EB] via-[#F703EB] to-[#FA85F4]"
      />

      <div className="flex flex-col gap-y-7">
        {steps.map((step, idx) => {
          const isActive = activeIndex === idx
          return (
            <MobileProcessStep
              key={idx}
              step={step}
              idx={idx}
              isActive={isActive}
              reduceMotion={reduceMotion}
              registerRef={(n) => {
                stepRefs.current[idx] = n
              }}
            />
          )
        })}
      </div>
    </div>
  )
}

function MobileProcessStep({
  step,
  idx,
  isActive,
  reduceMotion,
  registerRef,
}: {
  step: Step
  idx: number
  isActive: boolean
  reduceMotion: boolean
  registerRef: (node: HTMLDivElement | null) => void
}) {
  const Icon = stepIcons[idx] ?? Compass
  const reveal = useRevealOnScroll<HTMLDivElement>({ margin: "-60px" })

  const setRef = (node: HTMLDivElement | null) => {
    ;(reveal.ref as React.RefObject<HTMLDivElement | null>).current = node
    registerRef(node)
  }

  const visible = reduceMotion || reveal.isRevealed

  return (
    <motion.div
      ref={setRef}
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 12 }}
      transition={{ duration: 0.5, delay: 0.05 + idx * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="relative pl-14"
    >
      {/* Badge on rail */}
      <motion.div
        initial={false}
        animate={{
          scale: isActive ? 1.05 : 1,
          backgroundColor: isActive ? "#F703EB" : "#ffffff",
          borderColor: isActive ? "#F703EB" : "rgba(247, 3, 235, 0.25)",
          color: isActive ? "#ffffff" : "#F703EB",
          boxShadow: isActive
            ? "0 14px 30px rgba(247,3,235,0.35)"
            : "0 6px 14px rgba(15,23,42,0.05)",
        }}
        transition={{ type: "spring", stiffness: 320, damping: 24 }}
        className="absolute left-0 top-1 z-10 flex h-10 w-10 items-center justify-center rounded-full border-2"
      >
        <Icon className="h-4 w-4" />
      </motion.div>

      {/* Card */}
      <div
        className={`rounded-2xl border bg-white p-5 transition-[border-color,box-shadow] duration-300 ${
          isActive
            ? "border-[#F703EB]/35 shadow-[0_18px_44px_rgba(247,3,235,0.12)]"
            : "border-slate-200/70 shadow-[0_8px_22px_rgba(15,23,42,0.04)]"
        }`}
      >
        <div className="flex items-baseline justify-between gap-3">
          <span className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-[#F703EB]">
            Schritt {step.number}
          </span>
          <span className="font-serif text-[1.6rem] font-semibold leading-none text-[#F703EB]/20">
            {step.number}
          </span>
        </div>
        <h3 className="mt-2 font-serif text-lg font-semibold leading-tight text-[#0B162D]">
          {step.title}
        </h3>
        <p className="mt-2 text-[0.9rem] leading-relaxed text-black/60">{step.text}</p>
      </div>
    </motion.div>
  )
}
