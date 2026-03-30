"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronRight, Mail } from "lucide-react"
import LocalizedLink from "@/components/localized-link"

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

export default function AnalyticsCTA({ dict }: { dict: any }) {
  const cta = dict.servicesAnalytics.cta

  return (
    <section className="relative pb-20 md:pb-28 bg-transparent">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop CTA – gradient banner */}
        <motion.div
          className="rounded-[1.5rem] overflow-hidden hidden lg:flex flex-col items-center justify-center text-center px-6 py-20 products-gradient-animate"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-30px" }}
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.15 },
            },
          }}
        >
          <motion.h2
            className="font-serif text-[3.2rem] leading-[1.12] tracking-tight text-black whitespace-pre-line max-w-[22ch]"
            variants={fadeUpVariants}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            {cta.title}
          </motion.h2>
          <motion.p
            className="mt-4 text-lg text-black/70 max-w-[50ch]"
            variants={fadeUpVariants}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {cta.subtitle}
          </motion.p>
          <motion.div
            className="mt-8 flex items-center justify-center gap-4"
            variants={fadeUpVariants}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <LocalizedLink href="/contact">
              <Button
                variant="outline"
                className="rounded-xl px-6 py-6 text-sm text-black bg-white hover:bg-white/80 hover:text-black cursor-pointer"
              >
                <Mail className="mr-2 h-4 w-4" />
                {cta.secondaryButton}
              </Button>
            </LocalizedLink>
            <a href="#book">
              <Button
                variant="outline"
                className="rounded-xl px-6 py-6 text-sm text-white bg-black hover:bg-black/80 hover:text-white cursor-pointer border-transparent"
              >
                {cta.primaryButton}
                <ChevronRight className="ml-1.5 h-4 w-4" />
              </Button>
            </a>
          </motion.div>
        </motion.div>

        {/* Mobile CTA – gradient banner */}
        <motion.div
          className="lg:hidden rounded-[1.5rem] overflow-hidden flex flex-col items-center justify-center text-center px-5 py-12 sm:py-16 products-gradient-animate"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-30px" }}
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.12 },
            },
          }}
        >
          <motion.h2
            className="font-serif text-[1.8rem] sm:text-[2.2rem] leading-[1.15] tracking-tight text-black whitespace-pre-line"
            variants={fadeUpVariants}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {cta.title}
          </motion.h2>
          <motion.p
            className="mt-3 sm:mt-4 text-[0.9rem] sm:text-base leading-relaxed text-black/70 max-w-[40ch]"
            variants={fadeUpVariants}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {cta.subtitle}
          </motion.p>
          <motion.div
            className="mt-8 flex flex-col w-full sm:w-auto sm:flex-row gap-3 sm:gap-4"
            variants={fadeUpVariants}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <LocalizedLink href="/contact" className="block w-full sm:w-auto">
              <Button
                variant="outline"
                className="w-full rounded-xl px-6 py-6 text-sm font-medium border-transparent bg-white text-black hover:bg-white/80 transition-all duration-300 cursor-pointer"
              >
                <Mail className="mr-2 h-4 w-4" />
                {cta.secondaryButton}
              </Button>
            </LocalizedLink>
            <a href="#book" className="block w-full sm:w-auto">
              <Button
                variant="outline"
                className="w-full rounded-xl px-6 py-6 text-sm font-medium border-transparent bg-black text-white hover:bg-black/80 transition-all duration-300 cursor-pointer"
              >
                {cta.primaryButton}
                <ChevronRight className="ml-1.5 h-4 w-4" />
              </Button>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
