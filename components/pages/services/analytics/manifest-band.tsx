"use client"

import { useRef } from "react"
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion"

interface ManifestBandProps {
  dict: any
}

export default function ManifestBand({ dict }: ManifestBandProps) {
  const manifest = dict?.servicesAnalytics?.manifest

  const containerRef = useRef<HTMLElement>(null)
  const shouldReduceMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  // Subtle parallax on the second line + opacity peak in the middle
  const leadOpacity = useTransform(scrollYProgress, [0.05, 0.25, 0.7, 0.95], [0, 1, 1, 0.7])
  const leadY = useTransform(scrollYProgress, [0, 1], [40, -40])
  const emphasisOpacity = useTransform(scrollYProgress, [0.18, 0.38, 0.7, 0.95], [0, 1, 1, 0.85])
  const emphasisY = useTransform(scrollYProgress, [0, 1], [60, -60])

  const usesMotion = !shouldReduceMotion

  return (
    <section
      ref={containerRef}
      data-header-tone="dark"
      className="relative overflow-hidden bg-[#0B162D] text-white lg:min-h-[90vh]"
    >
      {/* Soft curve transition from portfolio (white) into manifest-band (dark) */}
      <svg
        aria-hidden
        viewBox="0 0 100 10"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-[80px] w-full sm:h-[120px] lg:h-[160px]"
      >
        <path
          d="M 0 0 L 100 0 L 100 7 L 85 7 C 80 7, 80 4, 75 4 L 25 4 C 20 4, 20 7, 15 7 L 0 7 Z"
          fill="#FFFFFF"
        />
      </svg>

      {/* Slow drifting glow */}
      <div
        aria-hidden
        className="manifest-glow pointer-events-none absolute left-1/2 top-1/2 -z-0 h-[110%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(33,86,156,0.45),_transparent_60%)] blur-3xl"
      />

      {/* Subtle grid texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Sticky pinned content */}
      <div className="sticky top-0 flex min-h-[70vh] items-center justify-center px-5 py-24 sm:px-8 lg:min-h-[80dvh]">
        <div className="relative z-10 mx-auto max-w-[1200px] text-center">
          {/* <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.0, ease: "easeOut" }}
            aria-hidden
            className="mx-auto h-px w-32 origin-center bg-gradient-to-r from-transparent via-[#7DBBFF]/60 to-transparent"
          /> */}

          <motion.h2
            style={usesMotion ? { opacity: leadOpacity, y: leadY } : undefined}
            className="mt-10 font-serif text-[2rem] leading-[1.05] tracking-tight text-white/85 sm:text-[2.6rem] md:text-[3.2rem] lg:text-[3.8rem] xl:text-[4.4rem]"
          >
            {manifest?.lead}
          </motion.h2>

          <motion.h2
            style={usesMotion ? { opacity: emphasisOpacity, y: emphasisY } : undefined}
            className="mt-2 font-serif text-[2rem] leading-[1.05] tracking-tight sm:text-[2.6rem] md:text-[3.2rem] lg:text-[3.8rem] xl:text-[4.4rem]"
          >
            <span className="bg-gradient-to-r from-white via-[#cfe2ff] to-[#7DBBFF] bg-clip-text italic text-transparent">
              {manifest?.emphasis}
            </span>
          </motion.h2>

          {/* <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 1.0, ease: "easeOut", delay: 0.4 }}
            className="mx-auto mt-12 h-px w-32 origin-center bg-gradient-to-r from-transparent via-[#7DBBFF]/60 to-transparent"
          /> */}
        </div>
      </div>

      {/* Soft curve transition from manifest-band (dark) into next section (light) */}
      <svg
        aria-hidden
        viewBox="0 0 100 10"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[80px] w-full sm:h-[120px] lg:h-[160px]"
      >
        <path
          d="M 0 10 L 100 10 L 100 3 L 85 3 C 80 3, 80 6, 75 6 L 25 6 C 20 6, 20 3, 15 3 L 0 3 Z"
          fill="#F6F9FC"
        />
      </svg>
    </section>
  )
}
