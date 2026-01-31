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

  // Scroll-jacking (Desktop >= md): Freeze page scroll while section is active and convert wheel deltaY into horizontal scroll.
  // Mobile (< md): normal behavior (manual horizontal scroll), no scroll-jacking.
  useEffect(() => {
    if (typeof window === "undefined") return

    const mql = window.matchMedia("(min-width: 768px)")
    const savedScrollYRef = { current: 0 }
    const lockedRef = { current: false }

    const lockPage = () => {
      if (lockedRef.current) return

      savedScrollYRef.current = window.scrollY
      const body = document.body

      body.style.position = "fixed"
      body.style.top = `-${savedScrollYRef.current}px`
      body.style.left = "0"
      body.style.right = "0"
      body.style.width = "100%"
      body.style.overflow = "hidden"
      lockedRef.current = true
    }

    const unlockPage = (nudge: number) => {
      if (!lockedRef.current) return

      const body = document.body
      body.style.position = ""
      body.style.top = ""
      body.style.left = ""
      body.style.right = ""
      body.style.width = ""
      body.style.overflow = ""

      const y = savedScrollYRef.current
      lockedRef.current = false

      window.scrollTo(0, y)
      // Small nudge to avoid the scroll feeling like it "sticks" at the boundary.
      if (nudge !== 0) {
        requestAnimationFrame(() => window.scrollBy(0, nudge))
      }
    }

    const isScrollable = () => {
      const scrollerEl = scrollerRef.current
      if (!scrollerEl) return false
      return scrollerEl.scrollWidth > scrollerEl.clientWidth
    }

    const isSectionActive = () => {
      const sectionEl = sectionRef.current
      if (!sectionEl) return false
      const rect = sectionEl.getBoundingClientRect()
      const mid = window.innerHeight / 2
      return rect.top <= mid && rect.bottom >= mid
    }

    const SPEED = 1.15

    const maybeLock = () => {
      // Only enabled on desktop/tablet and only if horizontal overflow exists.
      if (!mql.matches || !isScrollable()) {
        unlockPage(0)
        return
      }

      // Lock as soon as the section hits the viewport midpoint.
      if (!lockedRef.current && isSectionActive()) {
        lockPage()
      }

      // If something causes the section to leave the active zone (e.g. programmatic scroll), release.
      if (lockedRef.current && !isSectionActive()) {
        unlockPage(0)
      }
    }

    const shouldHijack = (deltaY: number) => {
      if (!mql.matches) return false
      if (!isScrollable()) return false
      if (!isSectionActive()) return false
      const scrollerEl = scrollerRef.current
      if (!scrollerEl) return false

      const maxLeft = scrollerEl.scrollWidth - scrollerEl.clientWidth
      const left = scrollerEl.scrollLeft
      const atStart = left <= 0
      const atEnd = left >= maxLeft - 0.5

      if (deltaY > 0) return !atEnd
      if (deltaY < 0) return !atStart
      return false
    }

    const onWheel = (e: WheelEvent) => {
      const scrollerEl = scrollerRef.current
      if (!scrollerEl) return

      // Only hijack vertical wheel/trackpad scroll.
      // (We still allow horizontal gestures to behave naturally.)
      const deltaY = e.deltaY
      if (deltaY === 0) return
      const maxLeft = scrollerEl.scrollWidth - scrollerEl.clientWidth
      const prevLeft = scrollerEl.scrollLeft

      // Ensure lock state is correct before deciding on hijack.
      maybeLock()

      // If not active/enabled, do nothing (native page scroll).
      if (!lockedRef.current) return

      // Decide whether to hijack based on remaining horizontal scroll in the scroll direction.
      const hijack = shouldHijack(deltaY)

      if (!hijack) {
        // At an edge in the direction of scroll: release lock and let native page scroll continue.
        unlockPage(deltaY > 0 ? 1 : -1)
        return
      }

      // We will hijack: lock the page (if not locked yet) and convert deltaY to horizontal.
      if (!lockedRef.current) lockPage()

      e.preventDefault()

      const nextLeft = Math.min(maxLeft, Math.max(0, prevLeft + deltaY * SPEED))
      scrollerEl.scrollLeft = nextLeft
    }

    const onResizeOrReflow = () => {
      // If content no longer overflows, unlock.
      if (!isScrollable()) {
        unlockPage(0)
        return
      }

      // If we're in view, ensure lock is active.
      maybeLock()
    }

    // Initial
    maybeLock()

    window.addEventListener("scroll", maybeLock, { passive: true })
    window.addEventListener("resize", onResizeOrReflow)
    window.addEventListener("wheel", onWheel, { passive: false })
    mql.addEventListener("change", onResizeOrReflow)

    return () => {
      window.removeEventListener("scroll", maybeLock)
      window.removeEventListener("resize", onResizeOrReflow)
      window.removeEventListener("wheel", onWheel)
      mql.removeEventListener("change", onResizeOrReflow)
      unlockPage(0)
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative">
      {/* Background that starts below the overlap area */}
      <div className="absolute top-0 md:top-[128px] inset-x-0 bottom-0 bg-background -z-10" />

      <div ref={scrollerRef} className="overflow-x-auto pb-8 no-scrollbar">
        {/* Slightly wider than the other containers, with more screen-edge breathing room */}
        <div className="mx-auto max-w-[1600px]">
          <div className="flex gap-4 md:gap-8 px-6 sm:px-8 md:px-16 lg:px-20 min-w-max">
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
      </div>
    </section>
  )
}
