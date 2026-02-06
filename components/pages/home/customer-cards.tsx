"use client"

import { Card, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

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

  // Desktop/Tablet horizontal scroll hijacking with Intersection Observer
  useEffect(() => {
    if (typeof window === "undefined") return

    const mql = window.matchMedia("(min-width: 768px)")
    const reducedMotionMql = window.matchMedia("(prefers-reduced-motion: reduce)")
    
    // Track if section is intersecting viewport
    const isIntersectingRef = { current: false }
    // Track intersection ratio (0..1) for fine-grained visibility checks
    const intersectionRatioRef = { current: 0 }
    // Track if we're currently "locked" in horizontal scroll mode
    const isLockedRef = { current: false }
    // Ensure we only auto-center once per lock session (reset when leaving viewport)
    const didCenterOnLockRef = { current: false }
    // Track last scroll direction for edge detection
    const lastScrollYRef = { current: 0 }

    const rafIdRef = { current: 0 }
    const lastTsRef = { current: 0 }
    const velocityRef = { current: 0 }

    const isScrollable = () => {
      const scrollerEl = scrollerRef.current
      if (!scrollerEl) return false
      return scrollerEl.scrollWidth > scrollerEl.clientWidth
    }

    const getScrollState = () => {
      const scrollerEl = scrollerRef.current
      if (!scrollerEl) return { atStart: true, atEnd: true, maxLeft: 0 }
      const maxLeft = scrollerEl.scrollWidth - scrollerEl.clientWidth
      const prevLeft = scrollerEl.scrollLeft
      return {
        atStart: prevLeft <= 0.5,
        atEnd: prevLeft >= maxLeft - 0.5,
        maxLeft,
        scrollLeft: prevLeft
      }
    }

    const DIRECT_SPEED = 1.15
    const IMPULSE = 0.0025
    const FRICTION_16MS = 0.94
    const MIN_VELOCITY = 0.04

    const UP_CENTER_VISIBILITY = 0.45
    const UP_HIJACK_MIN_PX = 10

    const normalizeWheelDeltaY = (e: WheelEvent) => {
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

        if (!isLockedRef.current) {
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

        if (nextLeft !== nextLeftUnclamped) {
          stopInertia()
          return
        }

        const decay = Math.pow(FRICTION_16MS, dt / 16)
        v *= decay
        velocityRef.current = v

        rafIdRef.current = window.requestAnimationFrame(tick)
      }

      rafIdRef.current = window.requestAnimationFrame(tick)
    }

    // Scroll section into center view when entering
    const scrollSectionToCenter = () => {
      const sectionEl = sectionRef.current
      if (!sectionEl) return
      
      const rect = sectionEl.getBoundingClientRect()
      const sectionCenter = rect.top + rect.height / 2
      const viewportCenter = window.innerHeight / 2
      const scrollOffset = sectionCenter - viewportCenter
      
      window.scrollBy({
        top: scrollOffset,
        behavior: 'smooth'
      })
    }

    const getHeaderHeight = () => {
      // Header is rendered as a fixed <nav /> at the top.
      const nav = document.querySelector("nav") as HTMLElement | null
      return nav ? nav.getBoundingClientRect().height : 0
    }

    // Visible ratio of the section within the viewport, excluding the fixed header overlap.
    const getVisibleRatioBelowHeader = () => {
      const sectionEl = sectionRef.current
      if (!sectionEl) return 0
      const rect = sectionEl.getBoundingClientRect()
      if (rect.height <= 0) return 0

      const headerH = getHeaderHeight()
      const viewportTop = headerH
      const viewportBottom = window.innerHeight

      const visibleTop = Math.max(rect.top, viewportTop)
      const visibleBottom = Math.min(rect.bottom, viewportBottom)
      const visible = Math.max(0, visibleBottom - visibleTop)

      return visible / rect.height
    }

    // Check if section center is in viewport
    const isSectionCentered = () => {
      const sectionEl = sectionRef.current
      if (!sectionEl) return false
      const rect = sectionEl.getBoundingClientRect()
      const mid = window.innerHeight / 2
      // More generous threshold for "centered" detection
      const threshold = window.innerHeight * 0.3
      return rect.top <= mid + threshold && rect.bottom >= mid - threshold
    }

    const onWheel = (e: WheelEvent) => {
      const scrollerEl = scrollerRef.current
      if (!scrollerEl) return

      if (!mql.matches || !isScrollable()) return

      const deltaY = normalizeWheelDeltaY(e)
      if (deltaY === 0) return

      const { atStart, atEnd, maxLeft, scrollLeft } = getScrollState()
      const scrollingDown = deltaY > 0
      const scrollingUp = deltaY < 0

      // Gate: when approaching from below (scrolling up), only start hijacking once
      // the section's bottom is visible below the fixed header.
      if (scrollingUp) {
        const sectionEl = sectionRef.current
        if (sectionEl) {
          const rect = sectionEl.getBoundingClientRect()
          const headerH = getHeaderHeight()
          const bottomVisibleBelowHeader = rect.bottom > headerH + UP_HIJACK_MIN_PX
          if (!bottomVisibleBelowHeader) {
            // Not visible yet -> let browser do normal vertical scroll.
            return
          }
        }
      }

      // If section is intersecting and we're not at an edge that would release
      if (isIntersectingRef.current) {
        // Check if we should lock or stay locked
        const shouldLock = 
          (scrollingDown && !atEnd) || 
          (scrollingUp && !atStart)

        if (shouldLock) {
          // Lock and prevent vertical scroll
          isLockedRef.current = true
          e.preventDefault()

          // When hijacking begins, ensure the section is centered once so the
          // user always scrolls the card area while it's in the middle.
          if (!didCenterOnLockRef.current) {
            if (!isSectionCentered()) {
              scrollSectionToCenter()
            }
            didCenterOnLockRef.current = true
          }

          // If not centered, scroll to center first
          if (!isSectionCentered()) {
            // On upward scroll, only snap once the section is sufficiently visible below the header.
            if (!scrollingUp) {
              scrollSectionToCenter()
            } else {
              const visibleRatio = getVisibleRatioBelowHeader()
              const ratio = Math.max(visibleRatio, intersectionRatioRef.current)
              if (ratio >= UP_CENTER_VISIBILITY) {
                scrollSectionToCenter()
              }
            }
          }

          if (reducedMotionMql.matches) {
            const currentLeft = scrollLeft ?? 0
            const nextLeft = Math.min(maxLeft, Math.max(0, currentLeft + deltaY * DIRECT_SPEED))
            scrollerEl.scrollLeft = nextLeft
            return
          }

          if (velocityRef.current !== 0 && Math.sign(velocityRef.current) !== Math.sign(deltaY)) {
            velocityRef.current = 0
            lastTsRef.current = 0
          }
          velocityRef.current += deltaY * IMPULSE
          startInertia()
          return
        } else {
          // At edge, release lock
          isLockedRef.current = false
        }
      }
    }

    // Intersection Observer to detect when section enters viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isIntersectingRef.current = entry.isIntersecting
          intersectionRatioRef.current = entry.intersectionRatio
           
          if (!entry.isIntersecting) {
            // Section left viewport, release lock
            isLockedRef.current = false
            didCenterOnLockRef.current = false
            stopInertia()
          }
        })
      },
      {
        // Trigger when any part of section is visible
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
        // Start detecting slightly before section enters viewport
        rootMargin: '50px 0px 50px 0px'
      }
    )

    const sectionEl = sectionRef.current
    if (sectionEl) {
      observer.observe(sectionEl)
    }

    lastScrollYRef.current = window.scrollY

    window.addEventListener("wheel", onWheel, { passive: false })

    return () => {
      window.removeEventListener("wheel", onWheel)
      observer.disconnect()
      stopInertia()
    }
  }, [])

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
      <div className="absolute top-0 md:top-[128px] inset-x-0 bottom-0 bg-background -z-10" />

      <div ref={scrollerRef} className="overflow-x-auto pb-6 md:pb-8 no-scrollbar snap-x snap-mandatory md:snap-none">
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
          {customers.map((customer: any, index: number) => {
            return (
              <motion.div
                key={customer.id}
                className={[
                  "snap-center shrink-0 h-full",
                  "flex flex-col",
                  "w-[85vw]",
                  "max-w-[420px]",
                  "sm:w-[350px]",
                  "md:w-[720px]",
                ].join(" ")}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card
                  className={[
                    "w-full flex-1",
                    "bg-white border-none shadow-lg",
                    "rounded-[1.5rem] md:rounded-[1.5rem]",
                    "p-1.5 md:p-2",
                    "min-h-[275px] sm:min-h-[300px] md:min-h-0",
                  ].join(" ")}
                >
                <div className="p-5 md:p-8 flex flex-col h-full justify-between">
                  <div>
                    <CardTitle className="font-serif text-[1.45rem] md:text-[1.75rem] font-normal text-black tracking-tight leading-[1.1]">
                      {customer.name}
                    </CardTitle>
                    <p className="text-base md:text-base text-black/90 mt-2 md:mt-4 leading-snug font-normal max-w-[95%] md:max-w-[70%]">
                      {customer.subtitle}
                    </p>
                  </div>

                  <div className="flex flex-col items-start text-left md:flex-row md:items-center md:text-left gap-4 mt-6 md:mt-2">
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
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Mobile-only scroll progress indicator */}
      <div className="md:hidden flex justify-center pt-2 pb-4">
        {showMobileIndicator && (
          <div
            className="relative h-1.5 w-24 rounded-full bg-black/5 overflow-hidden"
            aria-hidden="true"
           >
             <div
              className="absolute top-0 left-0 h-full w-8 rounded-full bg-black"
              style={{ transform: `translateX(${mobileScrollProgress * (96 - 32)}px)` }}
              />
            </div>
          )}
        </div>
    </section>
  )
}
