"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { useInView, useReducedMotion } from "framer-motion"
import { BeforeWebsite } from "./before-website"
import { AfterWebsite } from "./after-website"
import { cx } from "@/components/pages/services/shared/hero-kit"

// ---------- Before/After Slider ----------

export function BeforeAfterSlider({
  beforeLabel,
  afterLabel,
  sliderHint,
  fill = false,
}: {
  beforeLabel: string
  afterLabel: string
  sliderHint: string
  fill?: boolean
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState(50)
  const dragging = useRef(false)
  const hasInteracted = useRef(false)
  const touchStart = useRef<{ x: number; y: number } | null>(null)
  const shouldReduceMotion = useReducedMotion()
  const inView = useInView(containerRef, { once: true, margin: "-15%" })

  const clamp = (v: number) => Math.max(0, Math.min(100, v))

  const updatePos = useCallback((clientX: number) => {
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    setPos(clamp(((clientX - rect.left) / rect.width) * 100))
  }, [])

  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    hasInteracted.current = true
    dragging.current = true
  }

  // Guided reveal — fires when the slider scrolls into view: holds on the OLD
  // site, then wipes across to unveil the NEW one, settling at the midpoint to
  // invite interaction.
  useEffect(() => {
    if (shouldReduceMotion || !inView) return

    const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t)

    const keyframes: [number, number][] = [
      [0, 50],
      [320, 80],
      [1500, 20],
      [2700, 50],
    ]
    const totalDuration = keyframes[keyframes.length - 1][0]

    let rafId: number
    let startTime: number

    const tick = (now: number) => {
      if (hasInteracted.current) return
      if (!startTime) startTime = now
      const elapsed = Math.min(now - startTime, totalDuration)

      for (let i = keyframes.length - 2; i >= 0; i--) {
        const [t0, v0] = keyframes[i]
        const [t1, v1] = keyframes[i + 1]
        if (elapsed >= t0) {
          const progress = (elapsed - t0) / (t1 - t0)
          setPos(v0 + (v1 - v0) * easeInOut(Math.min(progress, 1)))
          break
        }
      }

      if (elapsed < totalDuration) {
        rafId = requestAnimationFrame(tick)
      }
    }

    const timeout = window.setTimeout(() => {
      rafId = requestAnimationFrame(tick)
    }, 600)

    return () => {
      window.clearTimeout(timeout)
      cancelAnimationFrame(rafId)
    }
  }, [shouldReduceMotion, inView])

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (dragging.current) updatePos(e.clientX)
    }
    const onUp = () => {
      dragging.current = false
      touchStart.current = null
    }

    const onTouchMove = (e: TouchEvent) => {
      if (!dragging.current) return
      const touch = e.touches[0]
      const start = touchStart.current
      if (start) {
        const dx = Math.abs(touch.clientX - start.x)
        const dy = Math.abs(touch.clientY - start.y)
        if (dx + dy < 3) return
        if (dy > dx) {
          dragging.current = false
          touchStart.current = null
          return
        }
        touchStart.current = null
      }
      e.preventDefault()
      updatePos(touch.clientX)
    }

    window.addEventListener("mousemove", onMove)
    window.addEventListener("mouseup", onUp)
    window.addEventListener("touchmove", onTouchMove, { passive: false })
    window.addEventListener("touchend", onUp)
    return () => {
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("mouseup", onUp)
      window.removeEventListener("touchmove", onTouchMove)
      window.removeEventListener("touchend", onUp)
    }
  }, [updatePos])

  return (
    <div className={cx("flex flex-col", fill && "h-full")}>
      {/* Slider — portrait phone ratio on mobile, landscape on desktop.
          In `fill` mode it stretches to fill the surrounding glass frame (desktop hero). */}
      <div
        ref={containerRef}
        className={cx(
          "relative select-none overflow-hidden bg-white @container",
          fill
            ? "min-h-0 flex-1 rounded-[22px]"
            : "rounded-[10px] md:rounded-[16px] shadow-[0_30px_70px_-20px_rgba(21,21,26,0.22)] aspect-[4/5] lg:aspect-[5/4]",
        )}
        onMouseDown={(e) => {
          hasInteracted.current = true
          dragging.current = true
          updatePos(e.clientX)
        }}
        onTouchStart={(e) => {
          hasInteracted.current = true
          dragging.current = true
          touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
          updatePos(e.touches[0].clientX)
        }}
        aria-label="Vorher-Nachher-Vergleich: Website-Relaunch"
      >
        {/* BEFORE layer */}
        <div className="absolute inset-0 overflow-hidden z-[1]">
          <BeforeWebsite />
          <span
            aria-hidden
            className="pointer-events-none absolute z-[4] font-black text-[clamp(0.75rem,4.5cqw,2.1rem)] tracking-[0.16em] uppercase leading-none"
            style={{
              top: "50%",
              left: "25%",
              transform: "translate(-50%, -50%)",
              color: "rgba(21,21,26,0.62)",
              textShadow: "0 1px 16px rgba(255,255,255,0.7)",
            }}
          >
            {beforeLabel}
          </span>
        </div>

        {/* AFTER layer */}
        <div className="absolute inset-0 overflow-hidden z-[2]" style={{ clipPath: `inset(0 0 0 ${pos}%)` }}>
          <AfterWebsite />
          <span
            aria-hidden
            className="pointer-events-none absolute z-[4] font-black text-[clamp(0.75rem,4.5cqw,2.1rem)] tracking-[0.16em] uppercase leading-none"
            style={{
              top: "50%",
              left: "75%",
              transform: "translate(-50%, -50%)",
              color: "rgba(21,21,26,0.9)",
              textShadow: "0 1px 16px rgba(255,255,255,0.85)",
            }}
          >
            {afterLabel}
          </span>
        </div>

        {/* Divider line */}
        <div
          className="absolute top-0 bottom-0 w-[2px] -ml-px bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.06),0_0_22px_rgba(0,0,0,0.18)] z-[5] cursor-ew-resize"
          style={{ left: `${pos}%` }}
        >
          <button
            type="button"
            aria-label="Regler ziehen"
            onMouseDown={onMouseDown}
            onTouchStart={(e) => {
              hasInteracted.current = true
              dragging.current = true
              touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[44px] h-[44px] sm:w-[52px] sm:h-[52px] rounded-full bg-[#F703EB] text-white grid place-items-center shadow-[0_18px_40px_-12px_rgba(247,3,235,0.45)] cursor-ew-resize"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-[18px] h-[18px] sm:w-[22px] sm:h-[22px]"
            >
              <path d="M9 6l-6 6 6 6M15 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      </div>

      {/* Hint */}
      <p
        className={cx(
          "flex items-center justify-center gap-2 text-[0.72rem] sm:text-[0.82rem] text-[#8a8a96]",
          fill ? "mt-3 shrink-0" : "mt-3",
        )}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4 h-4 shrink-0"
        >
          <path d="M9 6l-6 6 6 6M15 6l6 6-6 6" />
        </svg>
        {sliderHint}
      </p>
    </div>
  )
}
