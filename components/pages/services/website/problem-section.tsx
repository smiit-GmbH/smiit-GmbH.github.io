"use client"

import { motion } from "framer-motion"
import { X, Check } from "lucide-react"
import { useRevealOnScroll } from "@/hooks/use-reveal-on-scroll"

interface ProblemItem {
  title: string
  solution: string
  solutionDetail: string
}

const rowVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function ProblemSection({ dict }: { dict: any }) {
  const problem = dict.servicesWebsite.problem
  const eyebrow = dict.servicesWebsite.eyebrows.problem
  const heading = useRevealOnScroll()
  const rows = useRevealOnScroll({ margin: "-40px" })

  return (
    <section id="problem" className="relative bg-[#ece9e2] py-[clamp(72px,9vw,140px)]">
      <div className="mx-auto max-w-[1240px] px-8">

        {/* Heading */}
        <div ref={heading.ref} className={`reveal-fade-up ${heading.isRevealed ? "revealed" : ""}`}>
          <span className="section-eyebrow">{eyebrow}</span>
          <h2 className="mt-[22px] font-serif text-[clamp(2.1rem,4.4vw,3.7rem)] leading-[1.02] tracking-[-0.02em] max-w-[22ch] text-[#15151a]">
            {problem.title}{" "}
            <em className="not-italic text-[#e6009b]">{problem.titleHighlight}</em>
          </h2>
        </div>

        {/* Column labels — desktop only */}
        <div className="hidden md:grid mt-12 grid-cols-2 gap-x-8">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[#8a8a96] pb-3">
            {problem.problemLabel}
          </p>
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[#e6009b] pb-3">
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
            <span className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-[#e6009b]/10">
              <Check className="h-[9px] w-[9px] text-[#e6009b]" strokeWidth={2.5} />
            </span>
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-[#e6009b]">{problem.solutionLabel}</span>
          </div>
        </div>

        {/* Rows */}
        <div
          ref={rows.ref}
          className="flex flex-col gap-3 md:gap-0 md:border-t md:border-[rgba(21,21,26,0.10)]"
        >
          {(problem.items as ProblemItem[]).map((item, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={rowVariants}
              initial="hidden"
              animate={rows.isRevealed ? "visible" : "hidden"}
              /* Mobile: rounded card split in two halves
                 Desktop: plain two-column table row (unchanged) */
              className="overflow-hidden rounded-[18px] border border-[rgba(21,21,26,0.08)] bg-white shadow-[0_1px_2px_rgba(21,21,26,0.04),0_6px_18px_rgba(21,21,26,0.06)]
                         md:rounded-none md:border-0 md:border-b md:border-[rgba(21,21,26,0.08)] md:bg-transparent md:shadow-none
                         md:grid md:grid-cols-2 md:gap-x-8 md:py-5 md:items-center"
            >
              {/* Problem — grey top on mobile, left column on desktop */}
              <div className="flex items-center gap-3 px-4 py-3.5 bg-[rgba(21,21,26,0.03)] md:px-0 md:py-0 md:bg-transparent">
                <span className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-[rgba(21,21,26,0.07)]">
                  <X className="h-[11px] w-[11px] text-[#8a8a96]" strokeWidth={2.5} />
                </span>
                <span className="text-[0.9rem] font-medium text-[#70707c] md:text-[1rem] md:text-[#50505c]">{item.title}</span>
              </div>

              {/* Hairline divider — mobile only */}
              <div className="h-px bg-[rgba(21,21,26,0.07)] md:hidden" />

              {/* Solution — white bottom on mobile, right column on desktop */}
              <div className="flex items-start gap-3 px-4 py-4 md:px-0 md:py-0">
                <span className="mt-[3px] flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-[#e6009b]/10">
                  <Check className="h-[11px] w-[11px] text-[#e6009b]" strokeWidth={2.5} />
                </span>
                <div>
                  <span className="text-[0.95rem] font-semibold text-[#15151a] md:text-[1rem]">{item.solution}</span>
                  <p className="mt-1 text-[0.82rem] leading-snug text-[#50505c] md:mt-0.5 md:text-[0.875rem]">{item.solutionDetail}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
