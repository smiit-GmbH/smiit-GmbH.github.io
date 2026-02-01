"use client"

import { Card, CardTitle } from "@/components/ui/card"
import { Activity, BarChart3, Globe, ShieldCheck, Zap } from "lucide-react"
import { useEffect, useRef } from "react"

const LOGOS = {
  1: Activity,
  2: BarChart3,
  3: Globe,
  4: ShieldCheck,
  5: Zap,
}

interface CustomerCardsProps {
  dict: any
}

export default function CustomerCards({ dict }: CustomerCardsProps) {
  const customers = dict.customerCards.map((c: any) => ({
    ...c,
    logo: LOGOS[c.id as keyof typeof LOGOS],
  }))

  const sectionRef = useRef<HTMLElement | null>(null)
  const scrollerRef = useRef<HTMLDivElement | null>(null)

  // Desktop >= md: Scroll-jacking: while this section sits around the viewport midpoint, convert vertical wheel/trackpad
  // deltaY into horizontal scroll. IMPORTANT: do NOT lock the page via body styles (position:fixed/overflow:hidden),
  // otherwise the page can get stuck after interacting.
  // Mobile (< md): normal behavior (manual horizontal scroll), no wheel hijack.
  useEffect(() => {
    if (typeof window === "undefined") return

    const mql = window.matchMedia("(min-width: 768px)")
    const activeRef = { current: false }

    const isScrollable = () => {
      const scrollerEl = scrollerRef.current
      if (!scrollerEl) return false
      return scrollerEl.scrollWidth > scrollerEl.clientWidth
    }

    const SPEED = 1.15

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
      const deltaY = e.deltaY
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
      const nextLeft = Math.min(maxLeft, Math.max(0, prevLeft + deltaY * SPEED))
      scrollerEl.scrollLeft = nextLeft
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
      if (raf) window.cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative">
      {/* Background that starts below the overlap area */}
      <div className="absolute top-0 md:top-[128px] inset-x-0 bottom-0 bg-background -z-10" />

      <div ref={scrollerRef} className="overflow-x-auto pb-8 no-scrollbar">
        {/* Use padding (not margins) so the left/right edge spacing is symmetric and scrollable. */}
        <div className="flex gap-4 md:gap-8 min-w-max pl-6 pr-[calc(1.5rem+(100vw-100%))] sm:pl-8 sm:pr-[calc(2rem+(100vw-100%))] md:pl-16 md:pr-[calc(4rem+(100vw-100%))] lg:pl-20 lg:pr-[calc(5rem+(100vw-100%))]">
          {customers.map((customer: any) => {
            const Logo = customer.logo
            return (
              <Card
                key={customer.id}
                className="w-[280px] sm:w-[350px] shrink-0 md:w-[450px] bg-white border-none shadow-sm rounded-[1.5rem] md:rounded-[2rem] p-1.5 md:p-2"
              >
                <div className="p-5 md:p-8 flex flex-col h-full justify-between">
                  <div>
                    <CardTitle className="font-serif text-xl md:text-[2rem] font-normal text-black tracking-tight leading-[1.1]">
                      {customer.name}
                    </CardTitle>
                    <p className="text-sm md:text-lg text-black/90 mt-2 md:mt-4 leading-snug font-normal max-w-[80%] md:max-w-[60%]">
                      {customer.subtitle}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 md:gap-4 mt-4 md:mt-0">
                    <div className="rounded-xl bg-[#F2F0E9] h-10 w-14 md:h-14 md:w-20 flex items-center justify-center shrink-0">
                      <Logo className="h-5 w-5 md:h-7 md:w-7 text-black" />
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
    </section>
  )
}
