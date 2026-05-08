"use client"

import Image from "next/image"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { animate, motion, useMotionValue, useReducedMotion } from "framer-motion"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel"
import { useRevealOnScroll } from "@/hooks/use-reveal-on-scroll"

const LOGOS: Record<number, string> = {
  2: "/assets/logos/gb-logistics.png",
  7: "/assets/logos/azai.png",
  8: "/assets/logos/claimity.png",
}

interface Review {
  id: number
  name: string
  subtitle: string
  quote: string
  metric?: string
  metricSub?: string
  logoSrc?: string
}

const ROTATE_MS = 6500
const RESUME_AFTER_INTERACTION_MS = 4000

function CountUpMetric({
  metric,
  isActive,
  reduceMotion,
  className,
}: {
  metric: string
  isActive: boolean
  reduceMotion: boolean
  className?: string
}) {
  const parsed = useMemo(() => {
    const m = metric.match(/^([+\-−]?)(\d+(?:[.,]\d+)?)(.*)$/)
    if (!m) return null
    return {
      prefix: m[1],
      target: parseFloat(m[2].replace(",", ".")),
      decimals: m[2].includes(",") ? 1 : 0,
      suffix: m[3],
    }
  }, [metric])

  // Hooks must run unconditionally — even when there's nothing to animate.
  const target = parsed?.target ?? 0
  const value = useMotionValue(target)
  const [display, setDisplay] = useState(target)

  useEffect(() => {
    if (!parsed) return
    if (reduceMotion || !isActive) {
      value.set(target)
      setDisplay(target)
      return
    }
    value.set(0)
    const controls = animate(value, target, {
      duration: 1.1,
      ease: [0.22, 1, 0.36, 1],
    })
    const unsub = value.on("change", (v) => setDisplay(v))
    return () => {
      controls.stop()
      unsub()
    }
  }, [isActive, reduceMotion, target, value, parsed])

  if (!parsed) return <span className={className}>{metric}</span>

  const formatted =
    parsed.decimals > 0
      ? display.toFixed(parsed.decimals).replace(".", ",")
      : Math.round(display).toString()

  return (
    <span className={className}>
      {parsed.prefix}
      {formatted}
      {parsed.suffix}
    </span>
  )
}

function ReviewSlide({
  review,
  isActive,
  reduceMotion,
}: {
  review: Review
  isActive: boolean
  reduceMotion: boolean
}) {
  return (
    <article className="grid grid-cols-1 items-start gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] md:items-center md:gap-12">
      <div className="flex flex-col">
        <span className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-black/60">
          {review.name}
        </span>
        {review.metric && (
          <CountUpMetric
            metric={review.metric}
            isActive={isActive}
            reduceMotion={reduceMotion}
            className="mt-3 font-serif font-semibold leading-[0.95] tracking-tight text-[#64748B] text-[clamp(2.8rem,13vw,5rem)]"
          />
        )}
        {review.metricSub && (
          <span className="mt-3 max-w-[24ch] text-sm leading-relaxed text-black/55">
            {review.metricSub}
          </span>
        )}
      </div>

      <div className="flex flex-col">
        <blockquote className="border-l-2 border-[#64748B]/40 pl-5 font-serif italic text-[1.02rem] leading-[1.55] tracking-tight text-[#0B162D] sm:text-[1.12rem]">
          &ldquo;{review.quote}&rdquo;
        </blockquote>

        <div className="mt-6 flex items-center justify-between gap-4 border-t border-slate-200/70 pt-5">
          {review.logoSrc && (
            <div className="relative h-7 w-24">
              <Image
                src={review.logoSrc}
                alt={review.name}
                fill
                sizes="96px"
                className="object-contain object-left"
              />
            </div>
          )}
          <span className="text-right text-xs leading-tight text-black/55">
            {review.subtitle}
          </span>
        </div>
      </div>
    </article>
  )
}

function MobileReviewsCarousel({
  reviews,
  reduceMotion,
  ariaLabel,
}: {
  reviews: Review[]
  reduceMotion: boolean
  ariaLabel: string
}) {
  const [api, setApi] = useState<CarouselApi | null>(null)
  const [selected, setSelected] = useState(0)
  const [paused, setPaused] = useState(false)
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (!api) return
    const onSelect = () => setSelected(api.selectedScrollSnap())
    onSelect()
    api.on("select", onSelect)
    api.on("reInit", onSelect)
    return () => {
      api.off("select", onSelect)
    }
  }, [api])

  useEffect(() => {
    if (!api) return
    const onPointerDown = () => {
      setPaused(true)
      if (resumeTimer.current) clearTimeout(resumeTimer.current)
      resumeTimer.current = setTimeout(() => setPaused(false), RESUME_AFTER_INTERACTION_MS)
    }
    api.on("pointerDown", onPointerDown)
    return () => {
      api.off("pointerDown", onPointerDown)
      if (resumeTimer.current) clearTimeout(resumeTimer.current)
    }
  }, [api])

  // Auto-rotate (off in reduced-motion or while paused).
  useEffect(() => {
    if (!api || reduceMotion || paused || reviews.length <= 1) return
    const id = window.setInterval(() => {
      api.scrollNext()
    }, ROTATE_MS)
    return () => window.clearInterval(id)
  }, [api, reduceMotion, paused, reviews.length])

  const handleDot = useCallback(
    (i: number) => () => {
      setPaused(true)
      api?.scrollTo(i)
      if (resumeTimer.current) clearTimeout(resumeTimer.current)
      resumeTimer.current = setTimeout(() => setPaused(false), RESUME_AFTER_INTERACTION_MS)
    },
    [api],
  )

  return (
    <div className="relative">
      <Carousel
        opts={{ align: "start", containScroll: "trimSnaps", dragFree: false, loop: reviews.length > 1 }}
        setApi={(a) => setApi(a ?? null)}
        aria-label={ariaLabel}
      >
        <CarouselContent className="-ml-2">
          {reviews.map((review, idx) => (
            <CarouselItem key={review.id} className="basis-full pl-2">
              <ReviewSlide
                review={review}
                isActive={idx === selected}
                reduceMotion={reduceMotion}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {reviews.length > 1 && (
        <div className="mt-8 flex items-center justify-between gap-4">
          <div role="tablist" aria-label={ariaLabel} className="flex items-center gap-2">
            {reviews.map((r, i) => {
              const isActive = i === selected
              return (
                <button
                  key={r.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-label={r.name}
                  onClick={handleDot(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    isActive ? "w-10 bg-[#0B162D]" : "w-6 bg-black/15 hover:bg-black/30"
                  }`}
                />
              )
            })}
          </div>
          {selected === 0 && !reduceMotion && (
            <motion.span
              aria-hidden
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: [0.0, 1, 1, 0.4], x: [0, 6, 6, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 1.2, ease: "easeInOut" }}
              className="text-[0.65rem] font-medium uppercase tracking-[0.18em] text-black/40"
            >
              wischen →
            </motion.span>
          )}
        </div>
      )}
    </div>
  )
}

export default function StrategyReviews({ dict }: { dict: any }) {
  const heading = useRevealOnScroll()
  const stage = useRevealOnScroll({ margin: "-80px" })
  const reduceMotion = useReducedMotion() ?? false

  const reviews: Review[] = (dict.servicesStrategy.reviews ?? []).map((r: any) => ({
    ...r,
    logoSrc: LOGOS[r.id as keyof typeof LOGOS],
  }))

  // Desktop-only state for the cross-fade stack.
  const [activeIdx, setActiveIdx] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (reduceMotion || paused || reviews.length <= 1) return
    const id = window.setInterval(() => {
      setActiveIdx((i) => (i + 1) % reviews.length)
    }, ROTATE_MS)
    return () => window.clearInterval(id)
  }, [reduceMotion, paused, reviews.length, activeIdx])

  if (reviews.length === 0) return null

  const ariaLabel = dict.servicesStrategy.eyebrows?.reviews ?? "Reviews"

  return (
    <section className="relative bg-transparent pt-16 pb-24 sm:pt-20 sm:pb-32 lg:pt-8 lg:pb-32">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div
          ref={heading.ref}
          className={`flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between sm:gap-10 reveal-fade-up ${heading.isRevealed ? "revealed" : ""}`}
        >
          <div className="max-w-[34rem]">
            <span className="section-eyebrow">
              {dict.servicesStrategy.eyebrows?.reviews}
            </span>
            <h2 className="font-serif text-[2rem] sm:text-[2.4rem] md:text-[3rem] leading-[1.1] tracking-tight text-black">
              {dict.servicesStrategy.reviewsHeading?.lead}{" "}
              <span className="text-[#64748B]">
                {dict.servicesStrategy.reviewsHeading?.highlight}
              </span>
            </h2>
          </div>

          {/* Desktop dot-tabs (mobile/tablet pagination lives inside the carousel) */}
          {reviews.length > 1 && (
            <div
              className="hidden items-center gap-2 lg:flex lg:pb-3"
              role="tablist"
              aria-label={ariaLabel}
            >
              {reviews.map((r, idx) => (
                <button
                  key={r.id}
                  type="button"
                  role="tab"
                  aria-selected={idx === activeIdx}
                  aria-label={r.name}
                  onClick={() => setActiveIdx(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === activeIdx
                      ? "w-10 bg-[#0B162D]"
                      : "w-6 bg-black/15 hover:bg-black/30"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        <div ref={stage.ref} className={`mt-12 reveal-fade-up ${stage.isRevealed ? "revealed" : ""}`}>
          {/* Mobile + Tablet — Embla swipe deck with metric count-up */}
          <div className="lg:hidden">
            <MobileReviewsCarousel
              reviews={reviews}
              reduceMotion={reduceMotion}
              ariaLabel={ariaLabel}
            />
          </div>

          {/* Desktop — cross-fade stack */}
          <div
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocusCapture={() => setPaused(true)}
            onBlurCapture={() => setPaused(false)}
            className="hidden grid-cols-1 lg:grid"
          >
            {reviews.map((r, idx) => {
              const isActive = idx === activeIdx
              return (
                <motion.article
                  key={r.id}
                  aria-hidden={!isActive}
                  style={{ gridArea: "1 / 1" }}
                  initial={false}
                  animate={{ opacity: isActive ? 1 : 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className={`grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:items-center lg:gap-16 ${
                    isActive ? "" : "pointer-events-none"
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-black/60">
                      {r.name}
                    </span>
                    {r.metric && (
                      <span className="mt-3 font-serif text-[4.2rem] font-semibold leading-[0.95] tracking-tight text-[#64748B] sm:text-[5.5rem] lg:text-[6rem]">
                        {r.metric}
                      </span>
                    )}
                    {r.metricSub && (
                      <span className="mt-3 max-w-[24ch] text-sm leading-relaxed text-black/55">
                        {r.metricSub}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col">
                    <blockquote className="border-l-2 border-[#64748B]/40 pl-5 font-serif italic text-[1.05rem] leading-[1.55] tracking-tight text-[#0B162D] sm:text-[1.15rem] sm:leading-[1.55] lg:text-[1.2rem]">
                      &ldquo;{r.quote}&rdquo;
                    </blockquote>

                    <div className="mt-8 flex items-center justify-between gap-4 border-t border-slate-200/70 pt-5">
                      {r.logoSrc && (
                        <div className="relative h-7 w-24">
                          <Image
                            src={r.logoSrc}
                            alt={r.name}
                            fill
                            sizes="96px"
                            className="object-contain object-left"
                          />
                        </div>
                      )}
                      <span className="text-right text-xs leading-tight text-black/55">
                        {r.subtitle}
                      </span>
                    </div>
                  </div>
                </motion.article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
