"use client"

import { Card, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"

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

  // Mobile (< md): tiny scroll-progress indicator under the cards
  const [mobileScrollProgress, setMobileScrollProgress] = useState(0)
  const [showMobileIndicator, setShowMobileIndicator] = useState(false)

  // Desktop >= md: Scroll-jacking: while this section sits around the viewport midpoint, convert vertical wheel/trackpad
  // deltaY into horizontal scroll. IMPORTANT: do NOT lock the page via body styles (position:fixed/overflow:hidden),
  // otherwise the page can get stuck after interacting.
  // Mobile (< md): normal behavior (manual horizontal scroll), no wheel hijack.
  useEffect(() => {
    if (typeof window === "undefined") return

    const mql = window.matchMedia("(min-width: 768px)")
    const reducedMotionMql = window.matchMedia("(prefers-reduced-motion: reduce)")
    const activeRef = { current: false }

    // Inertia state (desktop/tablet only)
    const rafIdRef = { current: 0 }
    const lastTsRef = { current: 0 }
    // velocity in px/ms
    const velocityRef = { current: 0 }

    const isScrollable = () => {
      const scrollerEl = scrollerRef.current
      if (!scrollerEl) return false
      return scrollerEl.scrollWidth > scrollerEl.clientWidth
    }

    // When reduced motion is requested, we fall back to direct scrollLeft updates (no inertia).
    const DIRECT_SPEED = 1.15

    // Inertia tuning (aim: "native-ish" momentum, not overly snappy)
    // impulse: deltaPx -> velocity (px/ms)
    const IMPULSE = 0.0025
    // friction per ~16ms frame
    const FRICTION_16MS = 0.94
    const MIN_VELOCITY = 0.04

    const normalizeWheelDeltaY = (e: WheelEvent) => {
      // deltaMode: 0=pixel, 1=line, 2=page
      if (e.deltaMode === 1) return e.deltaY * 16
      if (e.deltaMode === 2) return e.deltaY * window.innerHeight
      return e.deltaY
    }

    const stopInertia = () => {
      if (rafIdRef.current) {
        window.cancelAnimationFrame(rafIdRef.current)
        rafIdRef.current = 0
      }
      lastTsRef.current = 0
      velocityRef.current = 0
    }

    const startInertia = () => {
      if (rafIdRef.current) return

      const tick = (ts: number) => {
        const scrollerEl = scrollerRef.current
        if (!scrollerEl) {
          stopInertia()
          return
        }

        // If the section is no longer active (e.g. user scrolled away), stop the inertia.
        computeActive()
        if (!activeRef.current) {
          stopInertia()
          return
        }

        const maxLeft = scrollerEl.scrollWidth - scrollerEl.clientWidth
        if (maxLeft <= 0) {
          stopInertia()
          return
        }

        const lastTs = lastTsRef.current || ts
        const dt = Math.min(34, Math.max(0, ts - lastTs))
        lastTsRef.current = ts

        let v = velocityRef.current
        if (Math.abs(v) < MIN_VELOCITY) {
          stopInertia()
          return
        }

        const nextLeftUnclamped = scrollerEl.scrollLeft + v * dt
        const nextLeft = Math.min(maxLeft, Math.max(0, nextLeftUnclamped))
        scrollerEl.scrollLeft = nextLeft

        // If we hit a boundary, stop to avoid "stuck" feel.
        if (nextLeft !== nextLeftUnclamped) {
          stopInertia()
          return
        }

        // Exponential decay normalized to ~16ms frame time.
        const decay = Math.pow(FRICTION_16MS, dt / 16)
        v *= decay
        velocityRef.current = v

        rafIdRef.current = window.requestAnimationFrame(tick)
      }

      rafIdRef.current = window.requestAnimationFrame(tick)
    }

    const computeActive = () => {
      const sectionEl = sectionRef.current
      if (!sectionEl) {
        activeRef.current = false
        return
      }
      const rect = sectionEl.getBoundingClientRect()
      const mid = window.innerHeight / 2
      // Active when the section intersects the viewport midpoint.
      activeRef.current = rect.top <= mid && rect.bottom >= mid
    }

    let raf = 0
    const scheduleComputeActive = () => {
      if (raf) return
      raf = window.requestAnimationFrame(() => {
        raf = 0
        computeActive()
      })
    }

    const onWheel = (e: WheelEvent) => {
      const scrollerEl = scrollerRef.current
      if (!scrollerEl) return

      // Only enabled on desktop/tablet and only if horizontal overflow exists.
      if (!mql.matches || !isScrollable()) return

      // Keep active state fresh even when we prevent default (which can suppress scroll events).
      computeActive()
      if (!activeRef.current) return

      // Only hijack vertical wheel/trackpad scroll.
      // (We still allow horizontal gestures to behave naturally.)
      const deltaY = normalizeWheelDeltaY(e)
      if (deltaY === 0) return

      const maxLeft = scrollerEl.scrollWidth - scrollerEl.clientWidth
      const prevLeft = scrollerEl.scrollLeft
      const atStart = prevLeft <= 0.5
      const atEnd = prevLeft >= maxLeft - 0.5

      // Only prevent native page scroll if we can actually move horizontally in that direction.
      if ((deltaY > 0 && atEnd) || (deltaY < 0 && atStart)) {
        return
      }

      e.preventDefault()

      // Respect reduced-motion: no momentum animation.
      if (reducedMotionMql.matches) {
        const nextLeft = Math.min(maxLeft, Math.max(0, prevLeft + deltaY * DIRECT_SPEED))
        scrollerEl.scrollLeft = nextLeft
        return
      }

      // Inertia: apply an impulse to velocity and let rAF animate.
      // Stop any existing inertia if direction changes abruptly.
      if (velocityRef.current !== 0 && Math.sign(velocityRef.current) !== Math.sign(deltaY)) {
        velocityRef.current = 0
        lastTsRef.current = 0
      }
      velocityRef.current += deltaY * IMPULSE
      startInertia()
    }

    // Initial state
    computeActive()

    // Keep the active flag updated as the page scrolls/resizes.
    window.addEventListener("scroll", scheduleComputeActive, { passive: true })
    window.addEventListener("resize", scheduleComputeActive)
    mql.addEventListener("change", scheduleComputeActive)

    // Global wheel handler, but it only prevents default when the section is active AND
    // horizontal scroll is still possible in the scroll direction.
    window.addEventListener("wheel", onWheel, { passive: false })

    return () => {
      window.removeEventListener("scroll", scheduleComputeActive)
      window.removeEventListener("resize", scheduleComputeActive)
      window.removeEventListener("wheel", onWheel)
      mql.removeEventListener("change", scheduleComputeActive)
      reducedMotionMql.removeEventListener("change", scheduleComputeActive)
      stopInertia()
      if (raf) window.cancelAnimationFrame(raf)
    }
  }, [])

  // Mobile progress indicator (only < md)
  useEffect(() => {
    if (typeof window === "undefined") return

    const mql = window.matchMedia("(min-width: 768px)")

    let raf = 0
    const update = () => {
      raf = 0
      const scrollerEl = scrollerRef.current
      if (!scrollerEl) return

      // Only show on mobile
      if (mql.matches) {
        setShowMobileIndicator(false)
        return
      }

      const maxLeft = scrollerEl.scrollWidth - scrollerEl.clientWidth
      const canScroll = maxLeft > 1
      setShowMobileIndicator(canScroll)

      const p = canScroll ? scrollerEl.scrollLeft / maxLeft : 0
      // clamp for safety
      const clamped = Math.max(0, Math.min(1, Number.isFinite(p) ? p : 0))
      setMobileScrollProgress(clamped)
    }

    const schedule = () => {
      if (raf) return
      raf = window.requestAnimationFrame(update)
    }

    const scrollerEl = scrollerRef.current
    if (!scrollerEl) return

    // Initial
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
      {/* Background that starts below the overlap area */}
      <div className="absolute top-0 md:top-[128px] inset-x-0 bottom-0 bg-background -z-10" />

      {/* Mobile layout like screenshot: tighter stack + progress indicator below */}
      <div ref={scrollerRef} className="overflow-x-auto pb-2 md:pb-8 no-scrollbar">
        {/* Use padding (not margins) so the left/right edge spacing is symmetric and scrollable. */}
        <div
          className={[
            "flex min-w-max",
            // Desktop/Tablet: Cards näher zusammen
            "gap-4 md:gap-4",
            // Mobile: cards wider + smaller Abstand zum Bildschirmrand
            "px-4 sm:px-6",
            // Desktop: reset base padding and keep previous symmetric padding behavior
            "md:px-0",
            // Desktop: keep previous symmetric padding behavior
            "md:pl-16 md:pr-[calc(4rem+(100vw-100%))]",
            "lg:pl-20 lg:pr-[calc(5rem+(100vw-100%))]",
          ].join(" ")}
        >
          {customers.map((customer: any) => {
            return (
              <Card
                key={customer.id}
                className={[
                  // Mobile: nearly full width with small side padding
                  // Referenz: kleiner Rand links/rechts
                  "w-[calc(100vw-2rem)]",
                  "max-w-[420px]",
                  "sm:w-[350px]",
                  // Desktop/Tablet: Cards breiter
                  "shrink-0 md:w-[720px]",
                  "bg-white border-none shadow-sm",
                  "rounded-[1.25rem] md:rounded-[1.5rem]",
                  "p-1.5 md:p-2",
                  "min-h-[220px] sm:min-h-[240px] md:min-h-0",
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

                  <div className="flex items-center gap-3 md:gap-4 mt-4 md:mt-4">
                    <div className="rounded-xl bg-[#F2F0E9] h-12 w-24 md:h-14 md:w-20 flex items-center justify-center shrink-0">
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
          <div
            className="relative h-[4px] w-8 rounded-full bg-black/10 overflow-hidden"
            aria-hidden="true"
          >
            {/* thumb */}
            <div
              className="absolute top-0 left-0 h-full w-3 rounded-full bg-black/70"
              // Track width: 32px (w-8), thumb width: 12px (w-3)
              style={{ transform: `translateX(${Math.round(mobileScrollProgress * (32 - 12))}px)` }}
            />
          </div>
        )}
      </div>
    </section>
  )
}
