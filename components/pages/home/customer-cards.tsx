"use client"

import { Card, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { useLenis } from "@/components/smooth-scroll-provider"

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

  const lenis = useLenis()
  const lenisRef = useRef(lenis)
  useEffect(() => { lenisRef.current = lenis }, [lenis])

  useEffect(() => {
    if (typeof window === "undefined") return

    const mql = window.matchMedia("(min-width: 768px)")
    const reducedMotionMql = window.matchMedia("(prefers-reduced-motion: reduce)")

    const isIntersectingRef = { current: false }
    const intersectionRatioRef = { current: 0 }
    const isLockedRef = { current: false }
    const didCenterOnLockRef = { current: false }

    const isCenteringRef = { current: false }

    const rafIdRef = { current: 0 }
    const lastTsRef = { current: 0 }
    const velocityRef = { current: 0 }

    const pauseLenis = () => { lenisRef.current?.stop() }
    const resumeLenis = () => { lenisRef.current?.start() }

    const isScrollable = () => {
      const scrollerEl = scrollerRef.current
      if (!scrollerEl) return false
      return scrollerEl.scrollWidth > scrollerEl.clientWidth
    }

    const getScrollState = () => {
      const scrollerEl = scrollerRef.current
      if (!scrollerEl) return { atStart: true, atEnd: true, maxLeft: 0, scrollLeft: 0 }
      const maxLeft = scrollerEl.scrollWidth - scrollerEl.clientWidth
      const prevLeft = scrollerEl.scrollLeft
      return {
        atStart: prevLeft <= 0.5,
        atEnd: prevLeft >= maxLeft - 0.5,
        maxLeft,
        scrollLeft: prevLeft,
      }
    }

    const DIRECT_SPEED = 0.6
    const DIRECT_BLEND = 0.25
    const IMPULSE = 0.0015
    const FRICTION_16MS = 0.96
    const MIN_VELOCITY = 0.02

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

    const getHeaderHeight = () => {
      const nav = document.querySelector("nav") as HTMLElement | null
      return nav ? nav.getBoundingClientRect().height : 0
    }

    const centerRafRef = { current: 0 }

    const scrollSectionToCenter = (onDone?: () => void) => {
      const sectionEl = sectionRef.current
      if (!sectionEl) { onDone?.(); return }

      if (reducedMotionMql.matches && lenisRef.current) {
        const rect = sectionEl.getBoundingClientRect()
        const headerH = getHeaderHeight()
        const viewportHeight = window.innerHeight - headerH
        const viewportCenter = headerH + viewportHeight / 2
        const sectionCenter = rect.top + rect.height / 2
        const totalOffset = sectionCenter - viewportCenter

        if (Math.abs(totalOffset) < 2) {
          onDone?.()
          return
        }

        lenisRef.current.scrollTo(window.scrollY + totalOffset, {
          immediate: true,
          force: true,
        })
        onDone?.()
        return
      }

      const rect = sectionEl.getBoundingClientRect()
      const headerH = getHeaderHeight()

      const viewportHeight = window.innerHeight - headerH
      const viewportCenter = headerH + viewportHeight / 2
      const sectionCenter = rect.top + rect.height / 2

      const totalOffset = sectionCenter - viewportCenter

      if (Math.abs(totalOffset) < 2) { onDone?.(); return }

      const startScrollY = window.scrollY
      const targetScrollY = startScrollY + totalOffset
      const duration = Math.min(1200, Math.max(600, Math.abs(totalOffset) * 2.0))
      const startTime = performance.now()

      const easeInOutCubic = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

      if (centerRafRef.current) window.cancelAnimationFrame(centerRafRef.current)

      const animate = (now: number) => {
        const elapsed = now - startTime
        const progress = Math.min(1, elapsed / duration)
        const eased = easeInOutCubic(progress)

        window.scrollTo({ left: window.scrollX, top: startScrollY + totalOffset * eased, behavior: "instant" as ScrollBehavior })

        if (progress < 1) {
          centerRafRef.current = window.requestAnimationFrame(animate)
        } else {
          centerRafRef.current = 0
          window.scrollTo({ left: window.scrollX, top: targetScrollY, behavior: "instant" as ScrollBehavior })
          onDone?.()
        }
      }

      centerRafRef.current = window.requestAnimationFrame(animate)
    }

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

    const isSectionCenteredStrict = () => {
      const sectionEl = sectionRef.current
      if (!sectionEl) return false

      const rect = sectionEl.getBoundingClientRect()
      const headerH = getHeaderHeight()

      const viewportTop = headerH
      const viewportHeight = window.innerHeight - headerH
      const viewportCenter = viewportTop + viewportHeight / 2

      const sectionCenter = rect.top + rect.height / 2

      const tolerance = viewportHeight * 0.1
      return Math.abs(sectionCenter - viewportCenter) <= tolerance
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

      if (scrollingUp) {
        const sectionEl = sectionRef.current
        if (sectionEl) {
          const rect = sectionEl.getBoundingClientRect()
          const headerH = getHeaderHeight()
          const bottomVisibleBelowHeader = rect.bottom > headerH + UP_HIJACK_MIN_PX
          if (!bottomVisibleBelowHeader) {
            return
          }
        }
      }

      if (isIntersectingRef.current) {
        const shouldLock = (scrollingDown && !atEnd) || (scrollingUp && !atStart)

        if (shouldLock) {
          if (!isSectionCenteredStrict()) {
            if (scrollingUp) {
              const visibleRatio = getVisibleRatioBelowHeader()
              const ratio = Math.max(visibleRatio, intersectionRatioRef.current)
              if (ratio < UP_CENTER_VISIBILITY) {
                isLockedRef.current = false
                resumeLenis()
                return
              }
            }

            isLockedRef.current = true
            pauseLenis()
            e.preventDefault()

            if (!isCenteringRef.current) {
              isCenteringRef.current = true
              scrollSectionToCenter(() => {
                isCenteringRef.current = false
              })
            }
            return
          }

          isLockedRef.current = true
          pauseLenis()
          e.preventDefault()

          if (!didCenterOnLockRef.current) {
            didCenterOnLockRef.current = true
          }

          if (reducedMotionMql.matches) {
            const currentLeft = scrollLeft ?? 0
            const nextLeft = Math.min(maxLeft, Math.max(0, currentLeft + deltaY * DIRECT_SPEED))
            scrollerEl.scrollLeft = nextLeft
            return
          }

          {
            const directPx = deltaY * DIRECT_SPEED * DIRECT_BLEND
            const currentLeft = scrollerEl.scrollLeft
            const nextLeft = Math.min(maxLeft, Math.max(0, currentLeft + directPx))
            scrollerEl.scrollLeft = nextLeft
          }

          if (velocityRef.current !== 0 && Math.sign(velocityRef.current) !== Math.sign(deltaY)) {
            velocityRef.current = 0
            lastTsRef.current = 0
          }
          velocityRef.current += deltaY * IMPULSE
          startInertia()
          return
        } else {
          isLockedRef.current = false
          resumeLenis()
        }
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isIntersectingRef.current = entry.isIntersecting
          intersectionRatioRef.current = entry.intersectionRatio

          if (!entry.isIntersecting) {
            isLockedRef.current = false
            didCenterOnLockRef.current = false
            isCenteringRef.current = false
            stopInertia()
            resumeLenis()
          }
        })
      },
      {
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
        rootMargin: "50px 0px 50px 0px",
      }
    )

    const sectionEl = sectionRef.current
    if (sectionEl) observer.observe(sectionEl)

    window.addEventListener("wheel", onWheel, { passive: false })

    return () => {
      window.removeEventListener("wheel", onWheel)
      observer.disconnect()
      stopInertia()
      resumeLenis()
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative">
      <div className="absolute top-0 md:top-[96px] inset-x-0 bottom-0 bg-background -z-10" />

      {/* ── Mobile: Vertical Testimonial Timeline ── */}
      <div className="md:hidden px-4 sm:px-6 pb-2">
        <div className="relative">
          <div className="absolute left-[19px] top-4 bottom-4 w-px bg-gradient-to-b from-black/10 via-black/20 to-black/5" />

          <div className="flex flex-col gap-0">
            {customers.map((customer: any, index: number) => (
              <motion.div
                key={`mobile-${customer.id}-${index}`}
                className="relative flex items-start gap-4 py-5"
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
              >
                {/* Timeline dot */}
                <div className="relative z-10 mt-1 shrink-0">
                  <div className="w-[38px] h-[38px] rounded-full bg-white shadow-md border border-black/[0.06] flex items-center justify-center">
                    <div className="relative h-5 w-7">
                      <Image
                        src={customer.logoSrc}
                        alt={`${customer.name} Logo`}
                        fill
                        sizes="28px"
                        className="object-contain"
                      />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 pt-0.5">
                  <div className="flex items-baseline gap-2">
                    <h3 className="font-serif text-[1.05rem] font-medium text-black tracking-tight leading-tight">
                      {customer.name}
                    </h3>
                  </div>
                  <p className="text-[0.78rem] text-black/55 leading-snug mt-0.5">
                    {customer.subtitle}
                  </p>
                  <p className="text-[0.82rem] text-black/70 leading-relaxed mt-2 font-medium italic">
                    &ldquo;{customer.feedback}&rdquo;
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Desktop: Horizontal scroll ── */}
      <div
        ref={scrollerRef}
        className="hidden md:block overflow-x-auto pb-6 md:pb-8 no-scrollbar snap-x snap-mandatory md:snap-none"
      >
        <div
          className={[
            "flex min-w-max",
            "gap-3 md:gap-3 lg:gap-4",
            "px-4 sm:px-6",
            "md:px-8 lg:px-12 xl:px-16",
          ].join(" ")}
        >
          {customers.map((customer: any, index: number) => {
            return (
              <motion.div
                key={`desktop-${customer.id}-${index}`}
                className={[
                  "snap-center shrink-0 h-full",
                  "flex flex-col",
                  "w-[85vw]",
                  "max-w-[420px]",
                  "sm:w-[350px]",
                  "md:w-[clamp(360px,42vw,560px)]",
                ].join(" ")}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.55, margin: "0px 0px -18% 0px" }}
                transition={{ duration: 0.5 }}
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
                      <p className="text-sm md:text-base text-black/90 mt-2 md:mt-4 leading-snug font-normal max-w-[95%] md:max-w-[70%] line-clamp-2">
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
    </section>
  )
}
