"use client"

import { motion, useReducedMotion } from "framer-motion"
import { CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { useRevealOnScroll } from "@/hooks/use-reveal-on-scroll"

type Tier = {
  label: string
  value: string
  currency: string
  desc: string
  featured?: boolean
  featuredLabel?: string
}

// Cinematic staggered reveal for the mobile tiers
const tiersContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
}
const tierItem = {
  hidden: { opacity: 0, y: 16, filter: "blur(6px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

export default function PricingSection({ dict }: { dict: any }) {
  const pricing = dict.servicesWebsite.pricing
  const eyebrow = dict.servicesWebsite.eyebrows.pricing
  const reveal = useRevealOnScroll({ margin: "-60px" })
  const shouldReduceMotion = useReducedMotion()

  const tiers = pricing.tiers as Tier[]
  const factTiers = tiers.filter((t) => !t.featured)
  const featuredTier = tiers.find((t) => t.featured)

  return (
    <section id="pricing" className="relative bg-transparent py-[clamp(48px,6vw,96px)]">
      <div className="mx-auto max-w-[1400px] px-0 sm:px-6 lg:px-8">
        <motion.div
          ref={reveal.ref}
          data-header-tone="dark"
          initial={{ opacity: 0, y: 24 }}
          animate={reveal.isRevealed ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden bg-[#15151a] rounded-[30px] px-[clamp(28px,4vw,64px)] py-[clamp(40px,5vw,76px)] sm:shadow-[0_30px_70px_-20px_rgba(21,21,26,0.22)]"
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
            <h2 className="mt-[20px] font-serif text-[2.2rem] sm:text-[2.4rem] md:text-[3rem] leading-[1.1] tracking-tight text-[#ece9e2]">
              {pricing.title}{" "}
              <em className="not-italic italic bg-gradient-to-r from-[#b81fa8] via-[#F703EB] to-[#ff45ba] bg-clip-text text-transparent">
                {pricing.titleHighlight}
              </em>
            </h2>
            <p className="mt-[18px] text-[clamp(1rem,1.4vw,1.16rem)] text-[#9a9aa6] leading-[1.55] max-w-[46ch] mx-auto">
              {pricing.subtitle}
            </p>
          </div>

          {/* Tiers — MOBILE: price facts + highlighted featured card */}
          <motion.div
            initial={shouldReduceMotion ? false : "hidden"}
            whileInView={shouldReduceMotion ? undefined : "visible"}
            viewport={{ once: true, margin: "-40px" }}
            variants={tiersContainer}
            className="relative z-10 mt-8 sm:hidden"
          >
            {/* Price facts */}
            <div className="divide-y divide-[rgba(255,255,255,0.1)]">
              {factTiers.map((tier, idx) => (
                <motion.div key={idx} variants={tierItem} className="flex items-center justify-between gap-4 py-[14px]">
                  <div className="min-w-0">
                    <p className="text-[0.78rem] font-semibold tracking-[0.14em] uppercase text-[#adadb8]">{tier.label}</p>
                    <p className="mt-[3px] text-[0.8rem] leading-snug text-[#9a9aa6]">{tier.desc}</p>
                  </div>
                  <span className="shrink-0 font-serif text-[1.6rem] leading-none tracking-[-0.02em] text-white">
                    {tier.value}
                    {tier.currency && <span className="text-[0.5em] text-[#adadb8] ml-[2px]">{tier.currency}</span>}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Featured card — the recommended first step */}
            {featuredTier && (
              <motion.div
                variants={tierItem}
                className="relative mt-6 overflow-hidden rounded-[22px] border border-[rgba(255,69,186,0.5)] bg-gradient-to-br from-[rgba(247,3,235,0.22)] to-[rgba(247,3,235,0.08)] p-[22px] shadow-[0_20px_50px_-18px_rgba(247,3,235,0.45)]"
              >
                {/* Soft inner glow */}
                <div aria-hidden className="pointer-events-none absolute -right-8 -top-10 h-[120px] w-[120px] rounded-full bg-[radial-gradient(circle,rgba(247,3,235,0.45),transparent_70%)] blur-2xl" />
                {featuredTier.featuredLabel && (
                  <span className="relative inline-block text-[0.6rem] font-bold uppercase tracking-[0.1em] text-white bg-[#F703EB] px-[10px] py-[4px] rounded-full">
                    {featuredTier.featuredLabel}
                  </span>
                )}
                <div className="relative mt-3 flex items-baseline justify-between gap-4">
                  <span className="text-[0.82rem] font-semibold tracking-[0.14em] uppercase text-[#ffc8e8]">{featuredTier.label}</span>
                  <span className="shrink-0 font-serif text-[2.4rem] leading-none tracking-[-0.02em] text-white">
                    {featuredTier.value}
                    {featuredTier.currency && <span className="text-[0.5em] text-[#ffc8e8] ml-[2px]">{featuredTier.currency}</span>}
                  </span>
                </div>
                <p className="relative mt-2 text-[0.85rem] leading-snug text-[#e7c3dd]">{featuredTier.desc}</p>
              </motion.div>
            )}
          </motion.div>

          {/* Tiers — sm+: full card grid */}
          <div className="relative z-10 hidden sm:mt-[clamp(40px,5vw,60px)] sm:grid sm:grid-cols-3 sm:gap-[18px]">
            {tiers.map((tier, idx) => (
              <div
                key={idx}
                className={`relative flex flex-col rounded-[26px] border px-[26px] py-[30px] transition-all duration-300 hover:-translate-y-1 ${
                  tier.featured
                    ? "bg-gradient-to-br from-[rgba(247,3,235,0.22)] to-[rgba(247,3,235,0.08)] border-[rgba(255,69,186,0.5)] hover:border-[rgba(255,69,186,0.8)]"
                    : "bg-[rgba(255,255,255,0.035)] border-[rgba(255,255,255,0.09)] hover:border-[rgba(255,255,255,0.18)] hover:bg-[rgba(255,255,255,0.06)]"
                }`}
              >
                {tier.featured && tier.featuredLabel && (
                  <span className="absolute -top-[12px] left-[26px] text-[0.66rem] font-bold tracking-[0.1em] uppercase text-white bg-[#F703EB] px-[12px] py-[5px] rounded-full">
                    {tier.featuredLabel}
                  </span>
                )}
                <span className={`text-[0.82rem] font-semibold tracking-[0.14em] uppercase ${tier.featured ? "text-[#ffc8e8] mt-[6px]" : "text-[#adadb8]"}`}>
                  {tier.label}
                </span>
                <span className="mt-[16px] font-serif text-[clamp(2.2rem,3.4vw,3rem)] leading-none tracking-[-0.02em] text-white">
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
              <CheckCircle2 className="w-[18px] h-[18px] text-[#F703EB] shrink-0" />
              {pricing.note}
            </p>
            <a
              href="#book"
              className="inline-flex items-center gap-2 font-medium text-[0.9rem] px-5 py-3 rounded-lg bg-[#F703EB] text-white transition-all hover:bg-[#D802CD] hover:-translate-y-[2px] whitespace-nowrap"
            >
              {pricing.cta}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <path d="M5 12h14M13 6l6 6-6 6"/>
              </svg>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
