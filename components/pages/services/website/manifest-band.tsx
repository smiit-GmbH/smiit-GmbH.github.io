"use client"

import { useRef } from "react"
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion"

export default function ManifestBand({ dict }: { dict: any }) {
  const manifest = dict.servicesWebsite.manifest
  const containerRef = useRef<HTMLElement>(null)
  const shouldReduceMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const leadOpacity = useTransform(scrollYProgress, [0.05, 0.25, 0.7, 0.95], [0, 1, 1, 0.7])
  const leadY = useTransform(scrollYProgress, [0, 1], [40, -40])
  const emphasisOpacity = useTransform(scrollYProgress, [0.18, 0.38, 0.7, 0.95], [0, 1, 1, 0.85])
  const emphasisY = useTransform(scrollYProgress, [0, 1], [60, -60])
  const subtitleOpacity = useTransform(scrollYProgress, [0.3, 0.5, 0.8, 0.95], [0, 1, 1, 0.8])

  const usesMotion = !shouldReduceMotion

  return (
    <section
      ref={containerRef}
      data-header-tone="dark"
      className="relative overflow-hidden bg-[#1A1719] text-white lg:min-h-[90vh]"
    >
      {/* Top curve */}
      <svg aria-hidden viewBox="0 0 100 10" preserveAspectRatio="none"
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-[80px] w-full sm:h-[120px] lg:h-[160px]">
        <path d="M 0 0 L 100 0 L 100 7 L 85 7 C 80 7, 80 4, 75 4 L 25 4 C 20 4, 20 7, 15 7 L 0 7 Z" fill="#ece9e2" />
      </svg>

      {/* Grid texture */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-0 opacity-[0.06]"
        style={{ backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.6) 1px, transparent 1px)", backgroundSize: "64px 64px" }} />

      <div className="sticky top-0 flex min-h-[66vh] items-center justify-center px-5 py-16 sm:px-8 sm:py-20 lg:min-h-[90vh] lg:py-24">
        <div className="relative z-10 mx-auto max-w-[1200px] text-center">

          {/* Mobile */}
          <div className="lg:hidden">
            <h2 className="font-serif text-[2rem] leading-[1.05] tracking-tight text-white/85 sm:text-[2.6rem] md:text-[3.2rem]">
              {manifest?.lead}
            </h2>
            <h2 className="mt-2 font-serif italic text-[2rem] leading-[1.05] tracking-tight text-[#FA85F4] sm:text-[2.6rem] md:text-[3.2rem]">
              {manifest?.emphasis}
            </h2>
            <p className="mt-6 text-[0.95rem] leading-relaxed text-white/55 max-w-[52ch] mx-auto">
              {manifest?.subtitle}
            </p>
          </div>

          {/* Desktop */}
          <div className="hidden lg:block">
            <motion.h2
              style={usesMotion ? { opacity: leadOpacity, y: leadY } : undefined}
              className="font-serif text-[3.8rem] leading-[1.05] tracking-tight text-white/85 xl:text-[4.4rem]"
            >
              {manifest?.lead}
            </motion.h2>
            <motion.h2
              style={usesMotion ? { opacity: emphasisOpacity, y: emphasisY } : undefined}
              className="mt-2 font-serif text-[3.8rem] leading-[1.05] tracking-tight xl:text-[4.4rem]"
            >
              <span className="bg-gradient-to-r from-white via-[#FDD0F9] to-[#FA85F4] bg-clip-text italic text-transparent">
                {manifest?.emphasis}
              </span>
            </motion.h2>
            <motion.p
              style={usesMotion ? { opacity: subtitleOpacity } : undefined}
              className="mt-8 text-[1.05rem] leading-relaxed text-white/55 max-w-[56ch] mx-auto"
            >
              {manifest?.subtitle}
            </motion.p>
          </div>

        </div>
      </div>

      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-2 bg-[#F3F3EE]" />
      <svg aria-hidden viewBox="0 0 100 10" preserveAspectRatio="none"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[80px] w-full overflow-visible sm:h-[120px] lg:h-[160px]">
        <path d="M 0 11 L 100 11 L 100 3 L 85 3 C 80 3, 80 6, 75 6 L 25 6 C 20 6, 20 3, 15 3 L 0 3 Z" fill="#F3F3EE" />
      </svg>
    </section>
  )
}
