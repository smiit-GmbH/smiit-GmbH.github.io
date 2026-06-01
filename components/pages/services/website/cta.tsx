"use client"

import { motion } from "framer-motion"
import { ArrowRight, CalendarDays, Mail } from "lucide-react"
import type { Locale } from "@/lib/dictionary"

const fadeUpVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

export default function WebsiteCTA({ lang, dict }: { lang: Locale; dict: any }) {
  const cta = dict.servicesWebsite.cta
  const eyebrow = dict.servicesWebsite.eyebrows.cta

  return (
    <section id="kontakt" className="relative bg-transparent py-[clamp(72px,9vw,140px)]">
      <div className="mx-auto max-w-[1240px] px-8">
        <div className="grid grid-cols-1 gap-[clamp(40px,5vw,72px)] items-center lg:grid-cols-[1fr_0.95fr]">

          {/* Copy */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
          >
            <motion.span
              variants={fadeUpVariants}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="section-eyebrow"
            >
              {eyebrow}
            </motion.span>
            <motion.h2
              variants={fadeUpVariants}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="mt-[22px] font-serif text-[clamp(2.1rem,4.4vw,3.7rem)] leading-[1.02] tracking-[-0.02em] text-[#15151a]"
            >
              {cta.title}{" "}
              <em className="not-italic text-[#e6009b]">{cta.titleHighlight}</em>
            </motion.h2>
            <motion.p
              variants={fadeUpVariants}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="mt-[22px] text-[clamp(1.05rem,1.5vw,1.28rem)] text-[#50505c] leading-[1.6] max-w-[42ch]"
            >
              {cta.subtitle}
            </motion.p>
          </motion.div>

          {/* Action panel */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-5"
          >
            {/* Book a call */}
            <a
              href="https://calendly.com/noahnesslauer/discovery-call"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-5 rounded-[24px] bg-[#e6009b] p-6 text-white shadow-[0_18px_40px_-12px_rgba(230,0,155,0.45)] transition-all duration-300 hover:bg-[#c5008a] hover:-translate-y-1"
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
              className="group flex items-center gap-5 rounded-[24px] bg-white border border-[rgba(21,21,26,0.08)] p-6 text-[#15151a] shadow-[0_1px_2px_rgba(21,21,26,0.04),0_4px_14px_rgba(21,21,26,0.05)] transition-all duration-300 hover:border-[#e6009b]/30 hover:shadow-[0_8px_30px_rgba(230,0,155,0.10)] hover:-translate-y-1"
            >
              <span className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-[14px] bg-[#fdeef8] text-[#e6009b]">
                <Mail className="h-6 w-6" />
              </span>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-[1.1rem] leading-tight">{cta.bookEmail}</p>
                <p className="mt-1 text-[0.88rem] text-[#50505c]">noah.nesslauer@smiit.de</p>
              </div>
              <ArrowRight className="h-5 w-5 shrink-0 text-[#8a8a96] transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[#e6009b]" />
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
