"use client"

import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import { motion, useInView, useSpring, useTransform } from "framer-motion"
import { useEffect, useRef } from "react"
import LocalizedLink from "../../localized-link"
import type { Locale } from "@/lib/dictionary"

interface ResultsProps {
  dict: any
  locale: Locale
}

function CountUp({
  value,
  locale,
  className,
}: {
  value: string
  locale: Locale
  className?: string
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-20px" })
  
  // Parse number and surrounding text
  // Matches: prefix (optional), number, suffix (optional)
  // Supports comma or dot as decimal separator
  const match = value.match(/^([^\d]*)(\d+(?:[\.,]\d+)?)([^\d]*)$/)
  const prefix = match ? match[1] : ""
  const rawNumber = match ? match[2] : "0"
  const normalizedNumber = rawNumber.replace(",", ".")
  const number = match ? Number.parseFloat(normalizedNumber) : 0
  const suffix = match ? match[3] : value // Fallback if no number found

  const fractionDigits = (() => {
    const m = rawNumber.match(/[\.,](\d+)$/)
    return m ? m[1].length : 0
  })()

  const formatter = new Intl.NumberFormat(locale, {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  })

  const spring = useSpring(0, { mass: 1, stiffness: 50, damping: 20 })
  const display = useTransform(spring, (current) => {
    if (!match) return value
    const formatted = formatter.format(current)
    return `${prefix}${formatted}${suffix}`
  })

  useEffect(() => {
    if (isInView && match) {
      spring.set(number)
    }
  }, [isInView, number, spring, match])

  return <motion.span ref={ref} className={className}>{display}</motion.span>
}

function ResultCard({ item, index }: { item: any; index: number }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-[1.5rem] p-8 shadow-sm flex flex-col h-full hover:shadow-xl transition-shadow duration-300 border border-transparent hover:border-black/5"
    >
      <div className="text-[#F703EB] text-5xl font-medium mb-4">
        <CountUp value={item.value} locale={item.locale} />
      </div>
      <h3 className="text-lg font-medium text-black mb-4">
        {item.label}
      </h3>
      <p className="text-gray-600 text-sm leading-relaxed mt-auto">
        {item.text}
      </p>
    </motion.div>
  )
}

export default function Results({ dict, locale }: ResultsProps) {
  return (
    <section className="bg-background py-16 md:py-16 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-20"
        >
          <h2 className="font-serif text-[2.6rem] sm:text-[3.15rem] md:text-[3.6rem] leading-tight text-black max-w-4xl mx-auto">
            {dict.results.titlePrefix}
            <span className="text-[#F703EB] inline-block relative">
              {dict.results.titleHighlight}
              <motion.svg
                className="absolute w-full h-3 -bottom-1 left-0 text-[#F703EB]/20 -z-10"
                viewBox="0 0 100 10"
                preserveAspectRatio="none"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
              </motion.svg>
            </span>
            {dict.results.titleSuffix}
          </h2>
        </motion.div>

        {/* Cards Grid */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            visible: { transition: { staggerChildren: 0.1 } }
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 md:mb-20"
        >
          {dict.results.items.map((item: any, index: number) => (
            <ResultCard key={index} item={{ ...item, locale }} index={index} />
          ))}
        </motion.div>

        {/* Button */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="flex justify-center"
        >
          <LocalizedLink href="/contact">
            <Button
              variant="outline"
              className="rounded-xl px-8 py-6 text-base border-black text-black hover:bg-black hover:text-white transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              {dict.results.button}
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </LocalizedLink>
        </motion.div>
      </div>
    </section>
  )
}
