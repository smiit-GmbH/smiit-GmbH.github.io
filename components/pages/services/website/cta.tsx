"use client"

import { motion, useReducedMotion } from "framer-motion"
import { ArrowRight, CalendarDays, Mail } from "lucide-react"
import type { Locale } from "@/lib/dictionary"

const fadeUpVariants = {
  hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

export default function WebsiteCTA({ lang, dict }: { lang: Locale; dict: any }) {
  const cta = dict.servicesWebsite.cta
  const eyebrow = dict.servicesWebsite.eyebrows.cta
  const shouldReduceMotion = useReducedMotion()

  return (
    <section id="contact" className="relative overflow-hidden bg-transparent pt-[clamp(32px,4vw,64px)] pb-[clamp(72px,9vw,140px)]">
      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -z-10 right-[-10%] top-[18%] h-[360px] w-[460px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(247,3,235,0.10),transparent_65%)] blur-3xl"
      />
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-[clamp(40px,5vw,72px)] items-center lg:grid-cols-[1fr_0.95fr]">

          {/* Copy — cinematic staggered reveal */}
          <motion.div
            initial={shouldReduceMotion ? false : "hidden"}
            whileInView={shouldReduceMotion ? undefined : "visible"}
            viewport={{ once: true, margin: "-60px" }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.14, delayChildren: 0.05 } } }}
            className="text-center lg:text-left"
          >
            <motion.span variants={fadeUpVariants} className="section-eyebrow">
              {eyebrow}
            </motion.span>
            <motion.h2
              variants={fadeUpVariants}
              className="mt-[22px] font-serif text-[2.2rem] sm:text-[2.4rem] md:text-[3rem] leading-[1.1] tracking-tight text-[#15151a]"
            >
              {cta.title}{" "}
              <em className="not-italic text-[#F703EB]">{cta.titleHighlight}</em>
            </motion.h2>
            <motion.p
              variants={fadeUpVariants}
              className="mt-[22px] text-[clamp(1rem,1.4vw,1.16rem)] text-[#50505c] leading-[1.6] max-w-[42ch] mx-auto lg:mx-0"
            >
              {cta.subtitle}
            </motion.p>
          </motion.div>

          {/* Action panel */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 28, filter: "blur(8px)" }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-5"
          >
            {/* Mobile: slim CTA — single button + mail text link */}
            <div className="flex flex-col items-center gap-6 sm:hidden">
              <a
                href="#book"
                className="w-full inline-flex items-center justify-center gap-2 rounded-[16px] bg-[#F703EB] px-5 py-4 text-[0.98rem] font-semibold text-white shadow-[0_12px_28px_-10px_rgba(247,3,235,0.5)] transition-colors duration-300 hover:bg-[#D802CD]"
              >
                <CalendarDays className="h-5 w-5 shrink-0" />
                {cta.bookTitle}
              </a>
              <a
                href="mailto:noah.nesslauer@smiit.de"
                className="inline-flex items-center gap-2 text-[0.9rem] font-medium text-[#50505c] transition-colors duration-300 hover:text-[#F703EB]"
              >
                <Mail className="h-4 w-4 shrink-0" />
                {cta.bookEmail}
              </a>
            </div>

            {/* sm+: full action cards */}
            <div className="hidden sm:flex sm:flex-col sm:gap-5">
            {/* Book a call */}
            <a
              href="#book"
              className="group flex items-center gap-5 rounded-[24px] bg-[#F703EB] p-6 text-white shadow-[0_18px_40px_-12px_rgba(247,3,235,0.45)] transition-all duration-300 hover:bg-[#D802CD] hover:-translate-y-1"
            >
              <span className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-[14px] bg-white/20">
                <CalendarDays className="h-6 w-6" />
              </span>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-[1.1rem] leading-tight">{cta.bookTitle}</p>
                <p className="mt-1 text-[0.88rem] text-white/75">{cta.bookSubtitle}</p>
              </div>
              <ArrowRight className="h-5 w-5 shrink-0 opacity-70 transition-transform duration-300 group-hover:translate-x-1" />
            </a>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <span className="flex-1 h-px bg-[rgba(21,21,26,0.1)]" />
              <span className="text-[0.8rem] font-medium text-[#8a8a96] uppercase tracking-[0.12em]">
                {lang === "de" ? "oder" : "or"}
              </span>
              <span className="flex-1 h-px bg-[rgba(21,21,26,0.1)]" />
            </div>

            {/* Mail */}
            <a
              href="mailto:noah.nesslauer@smiit.de"
              className="group flex items-center gap-5 rounded-[24px] bg-white border border-[rgba(21,21,26,0.08)] p-6 text-[#15151a] shadow-[0_1px_2px_rgba(21,21,26,0.04),0_4px_14px_rgba(21,21,26,0.05)] transition-all duration-300 hover:border-[#F703EB]/30 hover:shadow-[0_8px_30px_rgba(247,3,235,0.10)] hover:-translate-y-1"
            >
              <span className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-[14px] bg-[#fdeef8] text-[#F703EB]">
                <Mail className="h-6 w-6" />
              </span>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-[1.1rem] leading-tight">{cta.bookEmail}</p>
                <p className="mt-1 text-[0.88rem] text-[#50505c]">noah.nesslauer@smiit.de</p>
              </div>
              <ArrowRight className="h-5 w-5 shrink-0 text-[#8a8a96] transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[#F703EB]" />
            </a>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
