"use client"

import { motion } from "framer-motion"
import { CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { useRevealOnScroll } from "@/hooks/use-reveal-on-scroll"

export default function PricingSection({ dict }: { dict: any }) {
  const pricing = dict.servicesWebsite.pricing
  const eyebrow = dict.servicesWebsite.eyebrows.pricing
  const reveal = useRevealOnScroll({ margin: "-60px" })

  return (
    <section id="preise" className="relative bg-[#ece9e2] py-[clamp(72px,9vw,140px)]">
      <div className="mx-auto max-w-[1240px] px-8">
        <motion.div
          ref={reveal.ref}
          initial={{ opacity: 0, y: 24 }}
          animate={reveal.isRevealed ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden bg-[#15151a] rounded-[34px] px-[clamp(28px,4vw,64px)] py-[clamp(40px,5vw,76px)] shadow-[0_30px_70px_-20px_rgba(21,21,26,0.22)]"
        >
          {/* Grid texture */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage: "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
              backgroundPosition: "center top",
              WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, #000 30%, transparent 100%)",
              maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, #000 30%, transparent 100%)",
            }}
          />

          {/* Header */}
          <div className="relative z-10 text-center">
            <span className="inline-flex items-center gap-[14px] text-[0.78rem] font-semibold tracking-[0.22em] uppercase text-[#ff5ec9]">
              <span className="w-[34px] h-[2px] bg-current rounded" />
              {eyebrow}
            </span>
            <h2 className="mt-[20px] font-serif text-[clamp(2rem,4vw,3.4rem)] leading-[1.04] tracking-[-0.02em] text-[#ece9e2]">
              {pricing.title}{" "}
              <em className="not-italic italic bg-gradient-to-r from-[#b81fa8] via-[#e6009b] to-[#ff45ba] bg-clip-text text-transparent">
                {pricing.titleHighlight}
              </em>
            </h2>
            <p className="mt-[18px] text-[clamp(1rem,1.4vw,1.16rem)] text-[#9a9aa6] leading-[1.55] max-w-[46ch] mx-auto">
              {pricing.subtitle}
            </p>
          </div>

          {/* Tiers */}
          <div className="relative z-10 mt-[clamp(40px,5vw,60px)] grid grid-cols-1 gap-[18px] sm:grid-cols-3">
            {pricing.tiers.map((tier: { label: string; value: string; currency: string; desc: string; featured?: boolean; featuredLabel?: string }, idx: number) => (
              <div
                key={idx}
                className={`relative flex flex-col px-[26px] py-[30px] rounded-[26px] border transition-all duration-300 hover:-translate-y-1 ${
                  tier.featured
                    ? "bg-gradient-to-br from-[rgba(230,0,155,0.22)] to-[rgba(230,0,155,0.08)] border-[rgba(255,69,186,0.5)] shadow-[0_22px_50px_-22px_rgba(230,0,155,0.6)] hover:border-[rgba(255,69,186,0.8)]"
                    : "bg-[rgba(255,255,255,0.035)] border-[rgba(255,255,255,0.09)] hover:border-[rgba(255,255,255,0.18)] hover:bg-[rgba(255,255,255,0.06)]"
                }`}
              >
                {tier.featured && tier.featuredLabel && (
                  <span className="absolute -top-[12px] left-[26px] text-[0.66rem] font-bold tracking-[0.1em] uppercase text-white bg-[#e6009b] px-[12px] py-[5px] rounded-full shadow-[0_18px_40px_-12px_rgba(230,0,155,0.45)]">
                    {tier.featuredLabel}
                  </span>
                )}
                <span className={`text-[0.82rem] font-semibold tracking-[0.14em] uppercase ${tier.featured ? "text-[#ffc8e8] mt-[6px]" : "text-[#adadb8]"}`}>
                  {tier.label}
                </span>
                <span className={`mt-[16px] font-serif text-[clamp(2.2rem,3.4vw,3rem)] leading-none tracking-[-0.02em] text-white`}>
                  {tier.value}
                  {tier.currency && (
                    <span className="text-[0.5em] text-[#adadb8] ml-[2px]">{tier.currency}</span>
                  )}
                </span>
                <span className={`mt-[14px] text-[0.95rem] leading-[1.45] ${tier.featured ? "text-[#e7c3dd]" : "text-[#9a9aa6]"}`}>
                  {tier.desc}
                </span>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="relative z-10 mt-[clamp(34px,4vw,48px)] pt-[clamp(28px,3vw,36px)] border-t border-[rgba(255,255,255,0.1)] flex flex-col sm:flex-row items-center justify-between gap-6 flex-wrap">
            <p className="inline-flex items-center gap-[10px] text-[0.96rem] text-[#adadb8]">
              <CheckCircle2 className="w-[18px] h-[18px] text-[#e6009b] shrink-0" />
              {pricing.note}
            </p>
            <a
              href="#kontakt"
              className="inline-flex items-center gap-[10px] font-semibold text-[1rem] px-[28px] py-[17px] rounded-full bg-[#e6009b] text-white shadow-[0_18px_40px_-12px_rgba(230,0,155,0.45)] transition-all hover:bg-[#c5008a] hover:-translate-y-[2px] whitespace-nowrap"
            >
              {pricing.cta}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
                <path d="M5 12h14M13 6l6 6-6 6"/>
              </svg>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
