"use client"

import { useEffect, useRef, useState } from "react"
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion"
import { ChevronDown, X } from "lucide-react"
import { useRevealOnScroll } from "@/hooks/use-reveal-on-scroll"
import { useLenis } from "@/components/smooth-scroll-provider"
import type { ServiceTheme } from "../service-theme"
import { BookCircleButton } from "./book-circle-button"
import type { PortfolioCopy, PortfolioItem, PortfolioParts } from "./visual-kit"

type StageProps<L> = { copy: PortfolioCopy<L>; parts: PortfolioParts<L>; theme: ServiceTheme }

// Bottom-sheet modal for the per-service "Mehr erfahren" details. Pauses Lenis
// while open so the underlying pinned stage stops drifting.
function MobileServiceDetailsSheet({
  item,
  isOpen,
  onClose,
  accent,
  closeLabel,
}: {
  item: PortfolioItem | null
  isOpen: boolean
  onClose: () => void
  accent: string
  closeLabel: string | undefined
}) {
  const lenis = useLenis()

  useEffect(() => {
    if (!isOpen) return
    lenis?.stop()
    const prevHtmlOverflow = document.documentElement.style.overflow
    document.documentElement.style.overflow = "hidden"
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKey)
    return () => {
      lenis?.start()
      document.documentElement.style.overflow = prevHtmlOverflow
      window.removeEventListener("keydown", onKey)
    }
  }, [isOpen, lenis, onClose])

  return (
    <AnimatePresence>
      {isOpen && item && (
        <motion.div
          key="sheet-root"
          className="fixed inset-0 z-50 flex flex-col justify-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="portfolio-sheet-title"
        >
          <motion.button
            type="button"
            aria-label={closeLabel ?? "Schließen"}
            className="absolute inset-0 bg-black/45 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            className="relative z-10 mx-auto w-full max-w-[640px] rounded-t-[2rem] bg-white p-6 pt-3 shadow-[0_-24px_60px_rgba(15,23,42,0.18)]"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 36 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.6 }}
            onDragEnd={(_, info) => {
              if (info.offset.y > 80 || info.velocity.y > 600) onClose()
            }}
          >
            <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-black/15" />
            <div className="flex items-start justify-between gap-3">
              <h3
                id="portfolio-sheet-title"
                className="font-serif text-[1.45rem] leading-[1.15] tracking-tight text-black"
              >
                {item.title}
              </h3>
              <button
                type="button"
                onClick={onClose}
                aria-label={closeLabel ?? "Schließen"}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-200 text-black/55 transition-colors hover:bg-slate-50"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div
              aria-hidden
              className="mt-3 h-px w-full"
              style={{
                background: `linear-gradient(90deg, ${accent}55, transparent)`,
              }}
            />
            <div className="mt-4 max-h-[60vh] space-y-3 overflow-y-auto pr-1">
              {item.details.split("\n\n").map((paragraph: string, j: number) => (
                <p key={j} className="text-[0.95rem] leading-relaxed text-black/65">
                  {paragraph}
                </p>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function StageProgressRail({
  progress,
  activeIndex,
  strands,
}: {
  progress: MotionValue<number>
  activeIndex: number
  strands: readonly string[]
}) {
  const w0 = useTransform(progress, [0, 0.33], ["0%", "100%"])
  const w1 = useTransform(progress, [0.33, 0.66], ["0%", "100%"])
  const w2 = useTransform(progress, [0.66, 1], ["0%", "100%"])
  const widths = [w0, w1, w2]
  const accent = strands[activeIndex] ?? strands[0]

  return (
    <div className="flex items-center gap-3">
      <div className="flex flex-1 items-center gap-1.5">
        {widths.map((w, i) => (
          <div key={i} className="relative h-[3px] flex-1 overflow-hidden rounded-full bg-black/[0.08]">
            <motion.span
              className="absolute inset-y-0 left-0 rounded-full"
              style={{ width: w, backgroundColor: strands[i] }}
            />
          </div>
        ))}
      </div>
      <span className="font-mono text-[0.65rem] font-semibold tracking-[0.18em]" style={{ color: accent }}>
        {`0${activeIndex + 1}`}
        <span className="text-black/35"> / 03</span>
      </span>
    </div>
  )
}

function StageVisualLayer<L>({
  progress,
  sectionRevealed,
  labels,
  parts,
  strands,
}: {
  progress: MotionValue<number>
  sectionRevealed: boolean
  labels?: L
  parts: PortfolioParts<L>
  strands: readonly string[]
}) {
  const o0 = useTransform(progress, [0, 0.28, 0.36], [1, 1, 0])
  const o1 = useTransform(progress, [0.28, 0.36, 0.62, 0.7], [0, 1, 1, 0])
  const o2 = useTransform(progress, [0.62, 0.7, 1], [0, 1, 1])
  const s0 = useTransform(progress, [0, 0.36], [1, 0.97])
  const s1 = useTransform(progress, [0.3, 0.36, 0.66, 0.7], [0.97, 1, 1, 0.97])
  const s2 = useTransform(progress, [0.62, 0.7], [0.97, 1])
  const layers = [
    { o: o0, s: s0 },
    { o: o1, s: s1 },
    { o: o2, s: s2 },
  ]

  return (
    <div aria-hidden className="relative w-full h-[clamp(170px,23vh,210px)]">
      {parts.mobileVisuals.map((Visual, i) => {
        const accent = strands[i]
        return (
          <motion.div
            key={i}
            className="absolute inset-0 flex items-center justify-center"
            style={{ opacity: layers[i].o, scale: layers[i].s }}
          >
            <div className="w-full max-w-[420px]">
              <Visual isRevealed={sectionRevealed} accent={accent} labels={labels} />
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

function StageTextLayer<L>({
  items,
  activeIndex,
  parts,
  strands,
}: {
  items: PortfolioItem[]
  activeIndex: number
  parts: PortfolioParts<L>
  strands: readonly string[]
}) {
  const item = items[activeIndex]
  const Icon = parts.icons[activeIndex] ?? parts.icons[0]
  const accent = strands[activeIndex] ?? strands[0]

  return (
    <div className="relative" aria-live="polite">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center gap-3">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-2xl"
              style={{ backgroundColor: `${accent}1F` }}
            >
              <Icon className="h-5 w-5" style={{ color: accent }} />
            </div>
            <span
              className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.24em]"
              style={{ color: accent }}
            >
              {`0${activeIndex + 1}`} <span className="text-black/30">/ 03</span>
            </span>
          </div>
          <h3 className="mt-3 font-serif text-[1.6rem] leading-[1.1] tracking-tight text-black text-balance">
            {item.title}
          </h3>
          <p className="mt-2 text-[0.9rem] leading-relaxed text-black/65 text-balance">{item.shortDesc}</p>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

function ScrollytellingStage<L>({
  copy,
  parts,
  theme,
  items,
  progress,
  activeIndex,
  sectionRevealed,
  onOpenDetails,
}: StageProps<L> & {
  items: PortfolioItem[]
  progress: MotionValue<number>
  activeIndex: number
  sectionRevealed: boolean
  onOpenDetails: (index: number) => void
}) {
  const strands = theme.portfolioStrands
  const activeAccent = strands[activeIndex] ?? strands[0]
  return (
    <div className="sticky top-16 flex h-[calc(100vh-4rem)] max-h-[560px] w-full flex-col">
      <div className={`flex flex-1 flex-col ${theme.portfolioStageGap} px-5 pb-5 pt-4`}>
        <StageProgressRail progress={progress} activeIndex={activeIndex} strands={strands} />
        <StageVisualLayer
          progress={progress}
          sectionRevealed={sectionRevealed}
          labels={copy.visuals}
          parts={parts}
          strands={strands}
        />
        <StageTextLayer items={items} activeIndex={activeIndex} parts={parts} strands={strands} />
        <div className="mt-1 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => onOpenDetails(activeIndex)}
            className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[0.78rem] font-medium transition-colors duration-300"
            style={{
              color: activeAccent,
              backgroundColor: `${activeAccent}10`,
              borderColor: `${activeAccent}33`,
            }}
            aria-label={`${copy.learnMore} – ${items[activeIndex]?.title ?? ""}`}
          >
            {copy.learnMore}
            <ChevronDown className="h-4 w-4 -rotate-90" />
          </button>
          <BookCircleButton label={copy.bookCta} size="md" theme={theme} />
        </div>
      </div>
    </div>
  )
}

// Reduced-motion / fallback rendering. Three plain blocks with the visuals
// fully resolved, native <details> for the disclosure — no scroll math.
function MobileFallbackStack<L>({
  copy,
  parts,
  theme,
  items,
  onOpenDetails,
}: StageProps<L> & {
  items: PortfolioItem[]
  onOpenDetails: (index: number) => void
}) {
  const strands = theme.portfolioStrands
  return (
    <div className="flex flex-col gap-6 px-4 sm:px-6">
      {items.map((item, i) => {
        const Icon = parts.icons[i] ?? parts.icons[0]
        const accent = strands[i] ?? strands[0]
        const Visual = parts.mobileVisuals[i] ?? parts.mobileVisuals[0]
        return (
          <article key={i} className="rounded-[1.5rem] border border-slate-200/70 bg-white p-5">
            <Visual isRevealed accent={accent} labels={copy.visuals} />
            <div className="mt-4 flex items-center gap-3">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-2xl"
                style={{ backgroundColor: `${accent}1F` }}
              >
                <Icon className="h-5 w-5" style={{ color: accent }} />
              </div>
              <span className="text-[0.62rem] font-semibold uppercase tracking-[0.24em]" style={{ color: accent }}>
                {`0${i + 1}`} <span className="text-black/30">/ 03</span>
              </span>
            </div>
            <h3 className="mt-3 font-serif text-[1.55rem] leading-[1.1] tracking-tight text-black">{item.title}</h3>
            <p className="mt-2 text-[0.92rem] leading-relaxed text-black/65">{item.shortDesc}</p>
            <button
              type="button"
              onClick={() => onOpenDetails(i)}
              className="mt-4 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[0.78rem] font-medium"
              style={{
                color: accent,
                backgroundColor: `${accent}10`,
                borderColor: `${accent}33`,
              }}
            >
              {copy.learnMore}
              <ChevronDown className="h-4 w-4 -rotate-90" />
            </button>
          </article>
        )
      })}
      <div className="flex justify-center pt-2">
        <BookCircleButton label={copy.bookCta} size="lg" theme={theme} />
      </div>
    </div>
  )
}

export function MobileScrollytellingSection<L>({
  copy,
  parts,
  theme,
  items,
}: StageProps<L> & { items: PortfolioItem[] }) {
  const strands = theme.portfolioStrands
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const [revealRef, revealed] = useRevealOnScroll({ margin: "-15%" })
  const reducedMotion = useReducedMotion() ?? false
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  })

  const indexMV = useTransform(scrollYProgress, [0, 0.33, 0.34, 0.66, 0.67, 1], [0, 0, 1, 1, 2, 2])
  const [activeIndex, setActiveIndex] = useState(0)
  useMotionValueEvent(indexMV, "change", (v) => {
    const next = Math.max(0, Math.min(2, Math.round(v)))
    setActiveIndex((prev) => (prev === next ? prev : next))
  })

  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const openItem = openIndex !== null ? items[openIndex] : null
  const openAccent = openIndex !== null ? (strands[openIndex] ?? strands[0]) : strands[0]

  return (
    <>
      {reducedMotion ? (
        <MobileFallbackStack
          copy={copy}
          parts={parts}
          theme={theme}
          items={items}
          onOpenDetails={(i) => setOpenIndex(i)}
        />
      ) : (
        <div
          ref={(el) => {
            sectionRef.current = el
            revealRef(el)
          }}
          className="relative min-h-[200vh]"
          style={{ scrollMarginTop: "80px" }}
        >
          <ScrollytellingStage
            copy={copy}
            parts={parts}
            theme={theme}
            items={items}
            progress={scrollYProgress}
            activeIndex={activeIndex}
            sectionRevealed={revealed}
            onOpenDetails={(i) => setOpenIndex(i)}
          />
        </div>
      )}
      <MobileServiceDetailsSheet
        item={openItem}
        isOpen={openIndex !== null}
        onClose={() => setOpenIndex(null)}
        accent={openAccent}
        closeLabel={copy.learnLess}
      />
    </>
  )
}
