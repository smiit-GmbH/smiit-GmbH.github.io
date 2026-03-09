"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

interface AdvantagesSectionProps {
  dict: any
}

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

export function AdvantagesSection({ dict }: AdvantagesSectionProps) {
  const { advantages } = dict.smiitAnalytics

  return (
    <section
      className="relative py-20 md:py-28 bg-background"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-12 md:mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={fadeUpVariants}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="font-serif text-[2rem] sm:text-[2.8rem] md:text-[3.4rem] leading-[1.1] tracking-tight text-black whitespace-pre-line">
            {advantages.title}
          </h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } },
          }}
        >
          {advantages.items.map(
            (item: { label: string; title: string; text: string }, idx: number) => {
              return (
                <motion.div
                  key={idx}
                  className={[
                    "group relative overflow-hidden",
                    "rounded-[1.75rem]",
                    "p-6 md:p-8",
                    "transition-all duration-300 ease-out",
                    "will-change-transform",
                    "hover:scale-[1.02] hover:-translate-y-0.5",
                    "bg-white shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.1)]",
                  ].join(" ")}
                  variants={fadeUpVariants}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  <p className="text-xs font-medium tracking-wide mb-4 text-black/40">
                    {item.label}
                  </p>

                  <h3 className="font-serif text-[1.4rem] md:text-[1.6rem] leading-[1.2] tracking-tight mb-4 text-[#21569c]">
                    {item.title}
                  </h3>

                  <p className="text-sm leading-relaxed mb-8 text-black/60">
                    {item.text}
                  </p>

                  <div className="mt-auto">
                    <a
                      href="#book"
                      className="inline-flex items-center text-sm font-medium transition-colors duration-200 text-black/60 hover:text-black"
                    >
                      {advantages.learnMore}
                      <ArrowRight className="ml-1.5 h-4 w-4" />
                    </a>
                  </div>
                </motion.div>
              )
            }
          )}
        </motion.div>
      </div>
    </section>
  )
}
