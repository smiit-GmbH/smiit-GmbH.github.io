"use client"

import { motion } from "framer-motion"
import { Database, BarChart3, Cpu } from "lucide-react"

interface FeaturesSectionProps {
  dict: any
}

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

const icons = [Database, BarChart3, Cpu]

export function FeaturesSection({ dict }: FeaturesSectionProps) {
  const { features } = dict.smiitAnalytics

  return (
    <section
      id="features"
      className="relative py-14 md:py-18 bg-white"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={fadeUpVariants}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="font-serif text-[2rem] sm:text-[2.8rem] md:text-[3.4rem] leading-[1.1] tracking-tight text-black">
            {features.title}{" "}
            <span className="text-[#21569c]">{features.titleHighlight}</span>
          </h2>

          <p className="mt-4 md:mt-5 text-sm md:text-base leading-relaxed text-black/55 max-w-[55ch] mx-auto">
            {features.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Feature cards */}
          <motion.div
            className="space-y-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.15 } },
            }}
          >
            {features.items.map((item: { title: string; text: string }, idx: number) => {
              const Icon = icons[idx]
              return (
                <motion.div
                  key={idx}
                  className="flex gap-4 p-5 rounded-[1.75rem] bg-white border-1 border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.1)] transition-all duration-300 hover:scale-[1.02] hover:-translate-y-0.5"
                  variants={fadeUpVariants}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-[#21569c]/10 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-[#21569c]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-base text-black">{item.title}</h3>
                    <p className="mt-1 text-sm text-black/60 leading-relaxed">{item.text}</p>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>

          {/* Embedded Power BI Report */}
          <motion.div
            className="relative rounded-[1.25rem] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.06)]"
            style={{ backgroundColor: "rgb(15 23 42)" }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUpVariants}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="relative aspect-[3/2]">
              <iframe
                title="smiit Analytics (Website)"
                src="https://app.powerbi.com/view?r=eyJrIjoiMGIzNGViZDUtMjkwYy00NTc5LWJjOWMtZTUwNDk2YTcwM2Q2IiwidCI6IjQxNmMzYzYwLWM3MDEtNDE2ZS1iOTg4LTRmNWZjYjU1ZGZiYyJ9"
                className="absolute inset-0 w-full h-full border-0"
                frameBorder="0"
                allowFullScreen
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
