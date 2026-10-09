"use client"

import { useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { useRevealOnScroll } from "@/hooks/use-reveal-on-scroll"
import { serviceThemes, type ServiceKey, type ServiceTheme } from "../service-theme"
import { BookCircleButton } from "./book-circle-button"
import { MobileScrollytellingSection } from "./mobile-scrollytelling"
import type { PortfolioCopy, PortfolioItem, PortfolioParts } from "./visual-kit"

// ---------------------------------------------------------------------------
// PortfolioRow – text + visual block, also tracks its vertical center for the SVG
// ---------------------------------------------------------------------------
function RowText<L>({
  item,
  index,
  copy,
  parts,
  theme,
  alignRight,
}: {
  item: PortfolioItem
  index: number
  copy: PortfolioCopy<L>
  parts: PortfolioParts<L>
  theme: ServiceTheme
  alignRight: boolean
}) {
  const [isOpen, setIsOpen] = useState(false)
  const Icon = parts.icons[index] ?? parts.icons[0]
  const accent = theme.portfolioStrands[index]

  return (
    <div className={alignRight ? "md:text-right" : ""}>
      <div className={`inline-flex items-center gap-3 mb-4 ${alignRight ? "md:flex-row-reverse" : ""}`}>
        <div
          className="flex h-11 w-11 items-center justify-center rounded-2xl"
          style={{ backgroundColor: `${accent}1F`, color: accent }}
        >
          <Icon className="h-5 w-5" style={{ color: accent }} />
        </div>
        <span className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-black/40">
          {`0${index + 1}`}
        </span>
      </div>

      <h3 className="font-serif text-2xl sm:text-3xl lg:text-[2rem] leading-tight tracking-tight text-black">
        {item.title}
      </h3>

      <p
        className={`mt-4 text-[0.95rem] sm:text-base leading-relaxed text-black/65 max-w-[52ch] lg:max-w-[44ch] ${
          alignRight ? "md:ml-auto" : ""
        }`}
      >
        {item.shortDesc}
      </p>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="details"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className={`overflow-hidden ${alignRight ? "md:ml-auto" : ""}`}
          >
            <div className="mt-4 space-y-3 max-w-[52ch] lg:max-w-[44ch]">
              {item.details.split("\n\n").map((paragraph: string, i: number) => (
                <p key={i} className="text-sm sm:text-[0.95rem] leading-relaxed text-black/55">
                  {paragraph}
                </p>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={`mt-5 flex ${alignRight ? "md:justify-end" : ""}`}>
        <button
          type="button"
          onClick={() => setIsOpen((o) => !o)}
          className={`group inline-flex items-center gap-2 text-sm font-medium ${theme.portfolioLink} transition-colors`}
          aria-expanded={isOpen}
        >
          {isOpen ? copy.learnLess : copy.learnMore}
          <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
            <ChevronDown className="h-4 w-4" />
          </motion.span>
        </button>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Main section — shared by the analytics, apps and strategy service pages.
// Each service passes its own copy, icons and visuals; colors come from its theme.
// ---------------------------------------------------------------------------
export function PortfolioSection<L>({
  service,
  copy,
  eyebrow,
  parts,
}: {
  service: ServiceKey
  copy: PortfolioCopy<L>
  eyebrow: string | undefined
  parts: PortfolioParts<L>
}) {
  const theme = serviceThemes[service]
  const items: PortfolioItem[] = copy.items ?? []

  const [headingRef, headingRevealed] = useRevealOnScroll()
  const sectionRef = useRef<HTMLElement | null>(null)

  // Per-row reveal hooks for the desktop alternating layout (md+).
  // Mobile (<md) uses the carousel which manages active state internally,
  // so it doesn't need scroll-tied reveals.
  const [dReveal0Ref, dReveal0Revealed] = useRevealOnScroll({ margin: "-120px" })
  const [dReveal1Ref, dReveal1Revealed] = useRevealOnScroll({ margin: "-120px" })
  const [dReveal2Ref, dReveal2Revealed] = useRevealOnScroll({ margin: "-120px" })
  const desktopRevealRefs = [dReveal0Ref, dReveal1Ref, dReveal2Ref]
  const revealedRows = [dReveal0Revealed, dReveal1Revealed, dReveal2Revealed]

  return (
    <section ref={sectionRef} className="relative md:overflow-hidden">
      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-2 sm:pt-4 md:pt-6">
        <div
          ref={headingRef}
          className={`text-center mb-10 sm:mb-12 md:mb-16 reveal-fade-up ${headingRevealed ? "revealed" : ""}`}
        >
          <span className="section-eyebrow justify-center">{eyebrow}</span>
          <h2 className="font-serif text-[2.2rem] sm:text-[2.4rem] md:text-[3rem] leading-[1.1] tracking-tight text-black">
            {copy.title} <span className={theme.accentText}>{copy.titleHighlight}</span>
          </h2>
          <p className="mt-3 sm:mt-4 md:mt-6 text-[0.9rem] sm:text-base md:text-lg leading-relaxed text-black/60 max-w-[60ch] mx-auto">
            {copy.subtitle}
          </p>
        </div>
      </div>

      {/* Tablet + Desktop: alternating rows -------------------------------- */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 hidden md:block">
        <div className="relative pb-12 lg:pb-16">
          <div className="flex flex-col gap-y-20 lg:gap-y-32">
            {items.map((item, i) => {
              const Visual = parts.visuals[i] ?? parts.visuals[0]
              const textOnLeft = i % 2 === 0
              const textBlock = (
                <div
                  className={`relative z-10 flex ${textOnLeft ? "justify-end pr-3 lg:pr-8" : "justify-start pl-3 lg:pl-8"}`}
                >
                  <div className="max-w-[440px]">
                    <RowText item={item} index={i} copy={copy} parts={parts} theme={theme} alignRight={textOnLeft} />
                  </div>
                </div>
              )
              const visualBlock = (
                <div
                  className={`relative z-10 flex ${textOnLeft ? "justify-start pl-3 lg:pl-8" : "justify-end pr-3 lg:pr-8"}`}
                >
                  <Visual isRevealed={revealedRows[i]} labels={copy.visuals} />
                </div>
              )
              return (
                <div
                  key={i}
                  ref={(el) => {
                    desktopRevealRefs[i](el)
                  }}
                  className="grid grid-cols-[1fr_auto_1fr] items-center gap-x-3 lg:gap-x-4"
                >
                  {textOnLeft ? textBlock : visualBlock}
                  <div className="relative z-10 flex justify-center">
                    <BookCircleButton label={copy.bookCta} size="lg" theme={theme} />
                  </div>
                  {textOnLeft ? visualBlock : textBlock}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Mobile only: scroll-pinned scrollytelling stage ------------------ */}
      <div className="relative z-10 md:hidden">
        <MobileScrollytellingSection copy={copy} parts={parts} theme={theme} items={items} />
      </div>
    </section>
  )
}
