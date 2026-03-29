"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { BarChart3, ShieldCheck, BrainCircuit, ArrowRight, ArrowLeft } from "lucide-react"
import { useRevealOnScroll } from "@/hooks/use-reveal-on-scroll"

const icons = [BarChart3, ShieldCheck, BrainCircuit]

function PortfolioCard({ item, index, dict, isRevealed }: { item: any; index: number; dict: any; isRevealed: boolean }) {
  const [isFlipped, setIsFlipped] = useState(false)
  const Icon = icons[index] || BarChart3

  return (
    <div
      className={`relative h-full w-full max-w-[500px] mx-auto lg:max-w-none [perspective:1000px] reveal-fade-up reveal-delay-${index + 1} ${isRevealed ? "revealed" : ""}`}
    >
      <motion.div
        className="w-full h-full relative [transform-style:preserve-3d]"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.7, type: "spring", stiffness: 200, damping: 20 }}
      >
        {/* Front Face */}
        <div 
          onClick={() => setIsFlipped(true)}
          className="relative w-full h-full [backface-visibility:hidden] flex flex-col p-5 sm:p-6 lg:p-8 rounded-[1.5rem] sm:rounded-[1.75rem] bg-white border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all duration-300 cursor-pointer group"
        >
          <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-[#21569c]/10 group-hover:bg-[#21569c] transition-colors duration-300 flex items-center justify-center mb-5 sm:mb-6">
            <Icon className="h-6 w-6 sm:h-7 sm:w-7 text-[#21569c] group-hover:text-white transition-colors duration-300" />
          </div>
          
          <h3 className="font-serif text-lg sm:text-xl lg:text-2xl font-semibold text-black mb-3 sm:mb-4">
            {item.title}
          </h3>
          
          <p className="text-[0.85rem] sm:text-sm lg:text-base text-black/70 leading-relaxed mb-4 sm:mb-6">
            {item.shortDesc}
          </p>

          <div className="mt-auto pt-2">
            <div className="flex items-center gap-2 text-[0.85rem] sm:text-sm font-medium text-[#21569c] group-hover:text-[#1a457d] transition-colors">
              {dict.servicesAnalytics.portfolio.learnMore}
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>

        {/* Back Face */}
        <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] flex flex-col p-5 sm:p-6 lg:p-8 rounded-[1.5rem] sm:rounded-[1.75rem] bg-[#0B162D] border border-[#21569c]/20 shadow-[0_10px_30px_rgba(0,0,0,0.15)] text-white overflow-hidden">
          <div className="flex items-center justify-between mb-5 sm:mb-6">
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-white/10 flex items-center justify-center">
                <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-[#7DBBFF]" />
              </div>
              <h3 className="font-serif text-base sm:text-lg font-semibold text-white leading-tight">
                {item.title}
              </h3>
            </div>
          </div>
          
          <div 
            className="flex-1 overflow-y-auto pr-2 space-y-3 sm:space-y-4 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent"
            data-lenis-prevent="true"
          >
            {item.details.split("\n\n").map((paragraph: string, i: number) => (
              <p key={i} className="text-[0.8rem] sm:text-sm text-white/70 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-white/10">
            <button
              onClick={() => setIsFlipped(false)}
              className="flex items-center gap-2 text-[0.85rem] sm:text-sm font-medium text-[#7DBBFF] hover:text-white transition-colors group"
            >
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              {dict.servicesAnalytics.portfolio.learnLess}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default function PortfolioSection({ dict }: { dict: any }) {
  const heading = useRevealOnScroll()
  const cards = useRevealOnScroll()
  const portfolio = dict.servicesAnalytics.portfolio

  return (
    <section className="relative py-16 sm:py-20 md:py-28 bg-transparent">
      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={heading.ref}
          className={`text-center mb-12 sm:mb-16 md:mb-20 reveal-fade-up ${heading.isRevealed ? "revealed" : ""}`}
        >
          <h2 className="font-serif text-[2.2rem] sm:text-[2.4rem] md:text-[3rem] leading-[1.1] tracking-tight text-black">
            {portfolio.title} <span className="text-[#21569c]">{portfolio.titleHighlight}</span>
          </h2>
          <p className="mt-3 sm:mt-4 md:mt-6 text-[0.9rem] sm:text-base md:text-lg leading-relaxed text-black/60 max-w-[60ch] mx-auto">
            {portfolio.subtitle}
          </p>
        </div>

        <div
          ref={cards.ref}
          className={`grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 ${cards.isRevealed ? "revealed" : ""}`}
        >
          {portfolio.items.map((item: any, index: number) => (
            <PortfolioCard key={index} item={item} index={index} dict={dict} isRevealed={cards.isRevealed} />
          ))}
        </div>
      </div>
    </section>
  )
}
