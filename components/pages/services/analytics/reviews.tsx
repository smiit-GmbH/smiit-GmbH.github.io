"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { useRevealOnScroll } from "@/hooks/use-reveal-on-scroll"

const LOGOS: Record<number, string> = {
  1: "/assets/logos/dy-project.png",
  2: "/assets/logos/gb-logistics.png",
  6: "/assets/logos/masterhomepage.png",
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

export default function AnalyticsReviews({ dict }: { dict: any }) {
  const heading = useRevealOnScroll()
  const stage = useRevealOnScroll({ margin: "-80px" })
  const reduceMotion = useReducedMotion()

  const reviews: Review[] = (dict.servicesAnalytics.reviews ?? []).map((r: any) => ({
    ...r,
    logoSrc: LOGOS[r.id as keyof typeof LOGOS],
  }))

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

  return (
    <section className="relative bg-transparent pt-16 pb-24 sm:pt-20 sm:pb-32 lg:pt-8 lg:pb-32">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div
          ref={heading.ref}
          className={`flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between sm:gap-10 reveal-fade-up ${heading.isRevealed ? "revealed" : ""}`}
        >
          <div className="max-w-[34rem]">
            <span className="section-eyebrow">
              {dict.servicesAnalytics.eyebrows?.reviews}
            </span>
            <h2 className="font-serif text-[2rem] sm:text-[2.4rem] md:text-[3rem] leading-[1.1] tracking-tight text-black">
              {dict.servicesAnalytics.reviewsHeading?.lead}{" "}
              <span className="text-[#21569c]">
                {dict.servicesAnalytics.reviewsHeading?.highlight}
              </span>
            </h2>
          </div>

          {reviews.length > 1 && (
            <div
              className="flex items-center gap-2 sm:pb-3"
              role="tablist"
              aria-label={dict.servicesAnalytics.eyebrows?.reviews ?? "Reviews"}
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

        <div
          ref={stage.ref}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
          className={`mt-12 grid reveal-fade-up ${stage.isRevealed ? "revealed" : ""}`}
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
                    <span className="mt-3 font-serif text-[4.2rem] font-semibold leading-[0.95] tracking-tight text-[#21569c] sm:text-[5.5rem] lg:text-[6rem]">
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
                  <blockquote className="border-l-2 border-[#21569c]/40 pl-5 font-serif italic text-[1.05rem] leading-[1.55] tracking-tight text-[#0B162D] sm:text-[1.15rem] sm:leading-[1.55] lg:text-[1.2rem]">
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
    </section>
  )
}
