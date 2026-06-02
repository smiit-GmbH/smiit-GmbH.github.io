"use client"

import { motion, useReducedMotion } from "framer-motion"
import { X, Check } from "lucide-react"

interface ProblemItem {
  title: string
  solution: string
  solutionDetail: string
}

// Heading — staggered blur-in
const headingContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
}
const headingItem = {
  hidden: { opacity: 0, y: 16, filter: "blur(6px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

// Rows — sequence of cards; each card reveals the problem half, then the solution slides in
const rowsContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14, delayChildren: 0.08 } },
}
const rowCardVariants = {
  hidden: { opacity: 0, y: 22, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delayChildren: 0.18, staggerChildren: 0.14 },
  },
}
const problemHalfVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
}
const solutionHalfVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

export default function ProblemSection({ dict }: { dict: any }) {
  const problem = dict.servicesWebsite.problem
  const eyebrow = dict.servicesWebsite.eyebrows.problem
  const shouldReduceMotion = useReducedMotion()

  return (
    <section id="problem" className="relative bg-[linear-gradient(to_bottom,var(--background),#ece9e2_220px)] pt-[clamp(72px,9vw,140px)] pb-[clamp(46px,6vw,96px)]">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">

        {/* Heading — cinematic staggered reveal */}
        <motion.div
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView={shouldReduceMotion ? undefined : "visible"}
          viewport={{ once: true, margin: "-60px" }}
          variants={headingContainer}
          className="text-center md:text-left"
        >
          <motion.span variants={headingItem} className="section-eyebrow">{eyebrow}</motion.span>
          <motion.h2
            variants={headingItem}
            className="mt-[22px] font-serif text-[2.2rem] sm:text-[2.4rem] md:text-[3rem] leading-[1.1] tracking-tight max-w-[22ch] mx-auto md:mx-0 text-[#15151a]"
          >
            {problem.title}{" "}
            <em className="not-italic text-[#F703EB]">{problem.titleHighlight}</em>
          </motion.h2>
        </motion.div>

        {/* Column labels — desktop only */}
        <div className="hidden md:grid mt-12 grid-cols-2 gap-x-8">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[#8a8a96] pb-3">
            {problem.problemLabel}
          </p>
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[#F703EB] pb-3">
            {problem.solutionLabel}
          </p>
        </div>

        {/* Mobile legend */}
        <div className="flex items-center gap-5 mt-8 mb-4 md:hidden">
          <div className="flex items-center gap-1.5">
            <span className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-[rgba(21,21,26,0.08)]">
              <X className="h-[9px] w-[9px] text-[#8a8a96]" strokeWidth={2.5} />
            </span>
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-[#8a8a96]">{problem.problemLabel}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-[#F703EB]/10">
              <Check className="h-[9px] w-[9px] text-[#F703EB]" strokeWidth={2.5} />
            </span>
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-[#F703EB]">{problem.solutionLabel}</span>
          </div>
        </div>

        {/* Rows — staggered sequence; each row reveals problem → solution */}
        <motion.div
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView={shouldReduceMotion ? undefined : "visible"}
          viewport={{ once: true, margin: "-40px" }}
          variants={rowsContainer}
          className="flex flex-col gap-2 md:gap-0 md:border-t md:border-[rgba(21,21,26,0.10)]"
        >
          {(problem.items as ProblemItem[]).map((item, i) => (
            <motion.div
              key={i}
              variants={rowCardVariants}
              /* Mobile: rounded card split in two halves
                 Desktop: plain two-column table row (unchanged) */
              className="overflow-hidden rounded-[18px] border border-[rgba(21,21,26,0.08)] bg-white shadow-[0_1px_2px_rgba(21,21,26,0.04),0_6px_18px_rgba(21,21,26,0.06)]
                         md:rounded-none md:border-0 md:border-b md:border-[rgba(21,21,26,0.08)] md:bg-transparent md:shadow-none
                         md:grid md:grid-cols-2 md:gap-x-8 md:py-5 md:items-center"
            >
              {/* Problem — grey top on mobile, left column on desktop */}
              <motion.div variants={problemHalfVariants} className="flex items-center gap-3 px-3.5 py-2.5 bg-[rgba(21,21,26,0.03)] md:px-0 md:py-0 md:bg-transparent">
                <span className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-[rgba(21,21,26,0.07)]">
                  <X className="h-[11px] w-[11px] text-[#8a8a96]" strokeWidth={2.5} />
                </span>
                <span className="text-[0.9rem] font-medium text-[#70707c] md:text-[1rem] md:text-[#50505c]">{item.title}</span>
              </motion.div>

              {/* Hairline divider — mobile only */}
              <div className="h-px bg-[rgba(21,21,26,0.07)] md:hidden" />

              {/* Solution — white bottom on mobile, right column on desktop */}
              <motion.div variants={solutionHalfVariants} className="flex items-start gap-3 px-3.5 py-3 md:px-0 md:py-0">
                <span className="mt-[3px] flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-[#F703EB]/10">
                  <Check className="h-[11px] w-[11px] text-[#F703EB]" strokeWidth={2.5} />
                </span>
                <div>
                  <span className="text-[0.95rem] font-semibold text-[#15151a] md:text-[1rem]">{item.solution}</span>
                  <p className="mt-1 text-[0.82rem] leading-snug text-[#50505c] md:mt-0.5 md:text-[0.875rem]">{item.solutionDetail}</p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
