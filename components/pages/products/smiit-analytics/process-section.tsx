"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

interface ProcessSectionProps {
  dict: any
}

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

export function ProcessSection({ dict }: ProcessSectionProps) {
  const { process, cta } = dict.smiitAnalytics

  return (
    <section
      className="relative py-20 md:py-28 overflow-hidden products-gradient-animate"
    >
      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={fadeUpVariants}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="font-serif text-[2rem] sm:text-[2.8rem] md:text-[3.4rem] leading-[1.1] tracking-tight text-black">
            {process.title}
          </h2>
        </motion.div>

        {/* Steps grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } },
          }}
        >
          {process.steps.map(
            (step: { number: string; title: string; text: string }, idx: number) => (
              <motion.div
                key={idx}
                className="p-8 md:p-10 bg-white rounded-[1.75rem] shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.1)] transition-all duration-300 hover:scale-[1.02] hover:-translate-y-0.5"
                variants={fadeUpVariants}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <span className="text-[2.5rem] md:text-[3rem] font-serif leading-none text-[#F703EB]/40">
                  {step.number}
                </span>
                <h3 className="mt-3 text-lg md:text-xl font-semibold text-black">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-black/55">
                  {step.text}
                </p>
              </motion.div>
            )
          )}
        </motion.div>

        <motion.div
          className="mt-14 md:mt-26 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}
        >
          <motion.h2
            className="font-serif text-[2rem] sm:text-[2.8rem] md:text-[3.4rem] leading-[1.1] tracking-tight text-black whitespace-pre-line max-w-[22ch] mx-auto"
            variants={fadeUpVariants}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            {cta.title}
          </motion.h2>

          <motion.div
            className="mt-8 md:mt-10"
            variants={fadeUpVariants}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <a href="#book">
              <button className="group flex items-center gap-3 mx-auto bg-white/25 hover:bg-white/85 border border-black/20 text-black px-7 py-3.5 rounded-xl font-medium text-sm transition-all duration-300 backdrop-blur-sm cursor-pointer">
                {cta.button}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
