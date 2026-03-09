"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { ArrowRight, CheckCircle2 } from "lucide-react"

interface PricingSectionProps {
  dict: any
}

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

export function PricingSection({ dict }: PricingSectionProps) {
  const { pricing } = dict.smiitAnalytics

  return (
    <motion.section
      data-header-tone="dark"
      id="pricing"
      className="relative py-20 md:py-28"
      style={{ backgroundColor: "rgb(15 23 42)" }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.12 } },
      }}
    >
      {/* Grain texture */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.12]"
        style={{
          backgroundImage: "url(/assets/grain.png)",
          backgroundRepeat: "repeat",
          backgroundSize: "150px 150px",
          mixBlendMode: "soft-light",
        }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          variants={fadeUpVariants}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.h2
            className="font-serif text-[2rem] sm:text-[2.8rem] md:text-[3.4rem] leading-[1.1] tracking-tight text-white whitespace-pre-line"
            variants={fadeUpVariants}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            {pricing.title}
          </motion.h2>
        </motion.div>

        {/* Product card */}
        <motion.div
          className="max-w-[1200px] mx-auto rounded-[1.75rem] bg-white overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.15)]"
          variants={fadeUpVariants}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="grid grid-cols-1 md:grid-cols-12">
            {/* Left: Product info */}
            <div className="p-6 md:p-8 lg:p-9 md:col-span-5 flex flex-col">
              <h3 className="font-serif text-[1.5rem] md:text-[1.8rem] leading-[1.2] tracking-tight text-black">
                {pricing.productTitle}
              </h3>

              <p className="mt-4 text-sm leading-relaxed text-black/55">
                {pricing.productDescription}
              </p>

              {/* Features */}
              <div className="mt-6 space-y-3">
                {pricing.features.map((feature: string, idx: number) => (
                  <div key={idx} className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-5 w-5 text-[#21569c] flex-shrink-0" />
                    <span className="text-sm font-medium text-black/75">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Action links */}
              <div className="mt-8 md:mt-10 space-y-2.5 md:mt-auto">
                <a
                  href="https://app.powerbi.com/view?r=eyJrIjoiMGIzNGViZDUtMjkwYy00NTc5LWJjOWMtZTUwNDk2YTcwM2Q2IiwidCI6IjQxNmMzYzYwLWM3MDEtNDE2ZS1iOTg4LTRmNWZjYjU1ZGZiYyJ9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between text-sm font-medium text-[#21569c] hover:text-[#21569c]/75 transition-colors duration-200"
                >
                  {pricing.demoLink}
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#book"
                  className="flex items-center justify-between text-sm font-medium text-[#21569c] hover:text-[#21569c]/75 transition-colors duration-200"
                >
                  {pricing.consultationLink}
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="/data/smiitAnalytics%20-%20free.zip"
                  download
                  className="flex items-center justify-between text-sm font-medium text-[#21569c] hover:text-[#21569c]/75 transition-colors duration-200"
                >
                  {pricing.freeVersionLink}
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Right: Pricing + Screenshot */}
            <div className="p-6 md:p-8 lg:p-9 bg-background border-t md:border-t-0 md:border-l border-black/5 md:col-span-7">
              {/* Dashboard preview */}
              <div className="relative rounded-xl overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.08)] mb-6">
                <div className="relative aspect-[16/10] md:aspect-[16/9]">
                  <Image
                    src="/assets/products/smiit-analytics/sites.png"
                    alt="smiit Analytics Dashboard"
                    fill
                    sizes="(min-width: 768px) 400px, 100vw"
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Prices */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 border-t border-black/10 pt-4">
                <div>
                  <p className="text-[0.72rem] tracking-wide uppercase text-black/45">Einmaliger Erwerb</p>
                  <p className="mt-1 text-[1.05rem] font-semibold text-black">{pricing.priceOneTime}</p>
                </div>
                <div>
                  <p className="text-[0.72rem] tracking-wide uppercase text-black/45">Erwerb mit Individualisierungen</p>
                  <p className="mt-1 text-[1.05rem] font-semibold text-black">{pricing.priceCustom}</p>
                  <p className="text-[0.72rem] text-black/45 mt-1">{pricing.priceCustomNote}</p>
                </div>
              </div>

            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}
