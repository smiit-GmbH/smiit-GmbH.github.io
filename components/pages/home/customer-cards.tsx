"use client"

import { Card, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { useEffect, useLayoutEffect, useRef, useState } from "react"

const LOGOS: Record<number, string> = {
  1: "/assets/logos/dy-project.png",
  2: "/assets/logos/gb-logistics.png",
  3: "/assets/logos/claimity.png",
  4: "/assets/logos/rb-westkamp.png",
  5: "/assets/logos/asw-engineering.png",
}

interface CustomerCardsProps {
  dict: any
}

export default function CustomerCards({ dict }: CustomerCardsProps) {
  const customers = dict.customerCards.map((c: any) => ({
    ...c,
    logoSrc: LOGOS[c.id as keyof typeof LOGOS],
  }))

  const sectionRef = useRef<HTMLElement | null>(null)
  const scrollerRef = useRef<HTMLDivElement | null>(null)

  const [mobileScrollProgress, setMobileScrollProgress] = useState(0)
  const [showMobileIndicator, setShowMobileIndicator] = useState(false)

  // Vertical track length (desktop/tablet only) that drives the horizontal scroll
  const [trackHeight, setTrackHeight] = useState<number>(0)

  // Tuning: earlier start + longer end hold
  const LEAD_IN = 0 // px: horizontal "mode" engages earlier (but stays at scrollLeft=0)
  const TAIL_OUT = 420 // px: keep sticky longer after reaching end (last card fully visible longer)

  const isDesktop = () =>
    typeof window !== "undefined" && window.matchMedia("(min-width: 768px)").matches

  const getHeaderHeight = () => {
    const nav = document.querySelector("nav") as HTMLElement | null
    return nav ? nav.getBoundingClientRect().height : 0
  }

  const isScrollable = () => {
    const scrollerEl = scrollerRef.current
    if (!scrollerEl) return false
    return scrollerEl.scrollWidth > scrollerEl.clientWidth + 1
  }

  // --- Desktop: compute track height AFTER sticky content (so cards stay in place) ---
  useLayoutEffect(() => {
    if (typeof window === "undefined") return

    const computeTrack = () => {
      const scrollerEl = scrollerRef.current
      if (!scrollerEl) return

      if (!isDesktop()) {
        setTrackHeight(0)
        return
      }

      const maxLeft = scrollerEl.scrollWidth - scrollerEl.clientWidth
      setTrackHeight(maxLeft > 0 ? Math.ceil(maxLeft + LEAD_IN + TAIL_OUT) : 0)
    }

    computeTrack()
    window.addEventListener("resize", computeTrack)
    return () => window.removeEventListener("resize", computeTrack)
  }, [customers.length])

  // --- Desktop: map vertical scroll progress (within the section) -> scrollLeft ---
  useEffect(() => {
    if (typeof window === "undefined") return

    let raf = 0

    const onScroll = () => {
      if (raf) return
      raf = window.requestAnimationFrame(() => {
        raf = 0

        const sectionEl = sectionRef.current
        const scrollerEl = scrollerRef.current
        if (!sectionEl || !scrollerEl) return
        if (!isDesktop()) return
        if (!isScrollable()) return

        const maxLeft = scrollerEl.scrollWidth - scrollerEl.clientWidth
        if (maxLeft <= 0) return

        // Start the horizontal-scroll phase when the section center aligns with the
        // visible viewport center (below fixed header), but with lead-in/out buffers.
        const rect = sectionEl.getBoundingClientRect()
        const sectionTopDoc = window.scrollY + rect.top

        const headerH = getHeaderHeight()
        const visibleHeight = Math.max(0, window.innerHeight - headerH)
        const visibleCenter = headerH + visibleHeight / 2

        const baseStartY = sectionTopDoc + rect.height / 2 - visibleCenter

        // Active band extended:
        // - start earlier by LEAD_IN
        // - end later by TAIL_OUT
        const startY = baseStartY - LEAD_IN
        const endY = baseStartY + maxLeft + TAIL_OUT

        const y = window.scrollY
        if (y < startY || y > endY) return

        // Padded progress:
        // For y in [baseStartY-LEAD_IN, baseStartY] -> raw negative => clamp to 0 => stay at start
        // For y in [baseStartY, baseStartY+maxLeft] -> normal 0..1 mapping
        // For y in [baseStartY+maxLeft, baseStartY+maxLeft+TAIL_OUT] -> raw > 1 => clamp to 1 => stay at end
        const raw = (y - baseStartY) / maxLeft
        const clamped = Math.max(0, Math.min(1, raw))
        scrollerEl.scrollLeft = clamped * maxLeft
      })
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      if (raf) window.cancelAnimationFrame(raf)
    }
  }, [])

  // --- Mobile-only scroll progress indicator (unchanged) ---
  useEffect(() => {
    if (typeof window === "undefined") return

    const mql = window.matchMedia("(min-width: 768px)")

    let raf = 0
    const update = () => {
      raf = 0
      const scrollerEl = scrollerRef.current
      if (!scrollerEl) return

      if (mql.matches) {
        setShowMobileIndicator(false)
        return
      }

      const maxLeft = scrollerEl.scrollWidth - scrollerEl.clientWidth
      const canScroll = maxLeft > 1
      setShowMobileIndicator(canScroll)

      const p = canScroll ? scrollerEl.scrollLeft / maxLeft : 0
      const clamped = Math.max(0, Math.min(1, Number.isFinite(p) ? p : 0))
      setMobileScrollProgress(clamped)
    }

    const schedule = () => {
      if (raf) return
      raf = window.requestAnimationFrame(update)
    }

    const scrollerEl = scrollerRef.current
    if (!scrollerEl) return

    update()

    scrollerEl.addEventListener("scroll", schedule, { passive: true })
    window.addEventListener("resize", schedule)
    mql.addEventListener("change", schedule)

    return () => {
      scrollerEl.removeEventListener("scroll", schedule)
      window.removeEventListener("resize", schedule)
      mql.removeEventListener("change", schedule)
      if (raf) window.cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative">
      {/* Background stays like before */}
      <div className="absolute top-0 md:top-[128px] inset-x-0 bottom-0 bg-background -z-10" />

      {/* Sticky viewport for desktop/tablet (cards stay in the same place as before) */}
      <div className="md:sticky md:top-[128px]">
        <div ref={scrollerRef} className="overflow-x-auto pb-2 md:pb-8 no-scrollbar">
          <div
            className={[
              "flex min-w-max",
              "gap-4 md:gap-4",
              "px-4 sm:px-6",
              "md:px-0",
              "md:pl-16 md:pr-[calc(4rem+(100vw-100%))]",
              "lg:pl-20 lg:pr-[calc(5rem+(100vw-100%))]",
            ].join(" ")}
          >
            {customers.map((customer: any) => {
              return (
                <Card
                  key={customer.id}
                  className={[
                    "w-[calc(100vw-2rem)]",
                    "max-w-[420px]",
                    "sm:w-[350px]",
                    "shrink-0 md:w-[720px]",
                    "bg-white border-none shadow-sm",
                    "rounded-[1.25rem] md:rounded-[1.5rem]",
                    "p-1.5 md:p-2",
                    "min-h-[275px] sm:min-h-[300px] md:min-h-0",
                  ].join(" ")}
                >
                  <div className="p-5 md:p-8 flex flex-col h-full justify-between">
                    <div>
                      <CardTitle className="font-serif text-[1.45rem] md:text-[1.75rem] font-normal text-black tracking-tight leading-[1.1]">
                        {customer.name}
                      </CardTitle>
                      <p className="text-base md:text-base text-black/90 mt-2 md:mt-4 leading-snug font-normal max-w-[85%] md:max-w-[60%]">
                        {customer.subtitle}
                      </p>
                    </div>

                    <div className="flex flex-col items-center text-center md:flex-row md:items-center md:text-left gap-1 md:gap-4 mt-0 md:mt-4">
                      <div className="rounded-xl bg-[#F2F0E9] h-12 w-24 md:h-14 md:w-20 flex items-center justify-center shrink-0 mx-auto md:mx-0 mb-5 md:mb-0">
                        <div className="relative h-9 w-20 md:h-10 md:w-14">
                          <Image
                            src={customer.logoSrc}
                            alt={`${customer.name} Logo`}
                            fill
                            sizes="(min-width: 768px) 56px, 56px"
                            className="object-contain"
                          />
                        </div>
                      </div>
                      <p className="text-xs md:text-sm font-medium text-gray-500 leading-relaxed">
                        {customer.feedback}
                      </p>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Mobile-only scroll progress indicator */}
        <div className="md:hidden flex justify-center pt-1 pb-2">
          {showMobileIndicator && (
            <div className="relative h-[6px] w-8 rounded-full bg-black/10 overflow-hidden" aria-hidden="true">
              <div
                className="absolute top-0 left-0 h-full w-2 rounded-full bg-black/70"
                style={{ transform: `translateX(${Math.round(mobileScrollProgress * (32 - 8))}px)` }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Desktop-only track AFTER the sticky content: creates scroll distance without moving the cards down */}
      <div className="hidden md:block" style={{ height: trackHeight || undefined }} aria-hidden="true" />
    </section>
  )
}
