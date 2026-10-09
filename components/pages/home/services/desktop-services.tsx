"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"
import dynamic from "next/dynamic"
import { DirectionalWaves } from "./directional-waves"
import { ServiceCard } from "./service-card"
import { getImage, getLink } from "./service-meta"

const DotLottieReact = dynamic(() => import("@lottiefiles/dotlottie-react").then((m) => m.DotLottieReact), {
  ssr: false,
  loading: () => null,
})

export function DesktopServices({ items }: { items: Array<{ title: string; text: string; tags: string[] }> }) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.15 })
  const prefersReducedMotion = useReducedMotion()

  const [step, setStep] = useState(0)
  const [hovered, setHovered] = useState<number | null>(null)

  const [pulseTokens, setPulseTokens] = useState<Array<number | null>>([null, null, null])
  const pulseSeq = useRef(1)
  const clearPulseTimeouts = useRef<Array<ReturnType<typeof setTimeout> | null>>([null, null, null])

  const satelliteRef = useRef<HTMLDivElement | null>(null)
  const cardRefs = useRef<Array<HTMLDivElement | null>>([null, null, null])
  const measureRaf = useRef<number | null>(null)
  const [geometry, setGeometry] = useState<{
    center: { x: number; y: number }
    targets: Array<{ x: number; y: number } | null>
  }>(() => ({ center: { x: 500, y: 500 }, targets: [null, null, null] }))

  const measure = useCallback(() => {
    const container = containerRef.current
    if (!container) return

    const containerRect = container.getBoundingClientRect()
    if (!containerRect.width || !containerRect.height) return

    const scaleX = 1000 / containerRect.width
    const scaleY = 1000 / containerRect.height

    const toViewBox = (pt: { x: number; y: number }) => {
      return {
        x: (pt.x - containerRect.left) * scaleX,
        y: (pt.y - containerRect.top) * scaleY,
      }
    }

    const satRect = satelliteRef.current?.getBoundingClientRect()
    const satCenterPx = satRect
      ? { x: satRect.left + satRect.width / 2, y: satRect.top + satRect.height / 2 }
      : { x: containerRect.left + containerRect.width / 2, y: containerRect.top + containerRect.height / 2 }
    const center = toViewBox(satCenterPx)

    const targets = cardRefs.current.map((el) => {
      const r = el?.getBoundingClientRect()
      if (!r || !r.width || !r.height) return null

      const cardCenterPx = { x: r.left + r.width / 2, y: r.top + r.height / 2 }
      const cardCenter = toViewBox(cardCenterPx)

      const vx = cardCenter.x - center.x
      const vy = cardCenter.y - center.y
      const len = Math.sqrt(vx * vx + vy * vy) || 1

      const approxRadius = 0.46 * Math.min(r.width * scaleX, r.height * scaleY)
      const tx = cardCenter.x - (vx / len) * approxRadius
      const ty = cardCenter.y - (vy / len) * approxRadius

      return {
        x: Math.max(0, Math.min(1000, tx)),
        y: Math.max(0, Math.min(1000, ty)),
      }
    })

    setGeometry({
      center: { x: Math.max(0, Math.min(1000, center.x)), y: Math.max(0, Math.min(1000, center.y)) },
      targets,
    })
  }, [])

  const requestMeasure = useCallback(() => {
    if (measureRaf.current != null) return
    measureRaf.current = window.requestAnimationFrame(() => {
      measureRaf.current = null
      measure()
    })
  }, [measure])

  const triggerPulse = useCallback((idx: number) => {
    if (clearPulseTimeouts.current[idx]) clearTimeout(clearPulseTimeouts.current[idx])

    const token = pulseSeq.current++
    setPulseTokens((prev) => {
      const next = [...prev]
      next[idx] = token
      return next
    })

    clearPulseTimeouts.current[idx] = setTimeout(() => {
      setPulseTokens((prev) => {
        const next = [...prev]
        if (next[idx] === token) next[idx] = null
        return next
      })
    }, 2200)
  }, [])

  useEffect(() => {
    if (prefersReducedMotion) return

    let cancelled = false
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

    const sequence = async () => {
      setStep(1)
      await sleep(50)
      if (cancelled) return

      setStep(7)
      triggerPulse(0)
      triggerPulse(1)
      triggerPulse(2)
    }

    sequence()
    return () => {
      cancelled = true
    }
  }, [prefersReducedMotion, triggerPulse])

  useEffect(() => {
    requestMeasure()

    const container = containerRef.current
    if (!container) return

    const ro = new ResizeObserver(() => requestMeasure())
    ro.observe(container)
    if (satelliteRef.current) ro.observe(satelliteRef.current)
    cardRefs.current.forEach((el) => el && ro.observe(el))

    const onResize = () => requestMeasure()
    window.addEventListener("resize", onResize)

    return () => {
      ro.disconnect()
      window.removeEventListener("resize", onResize)
    }
  }, [isInView, requestMeasure])

  useEffect(() => {
    if (prefersReducedMotion) return

    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))
    const randInt = (min: number, max: number) => Math.floor(min + Math.random() * (max - min + 1))

    let cancelled = false

    const scheduleIdle = (idx: number) => {
      const scheduleNext = async () => {
        while (!cancelled && hovered === null) {
          await sleep(randInt(1200, 2800))
          if (cancelled || hovered !== null) return
          triggerPulse(idx)
        }
      }
      scheduleNext()
    }

    const scheduleHover = (idx: number) => {
      const loop = async () => {
        triggerPulse(idx)
        while (!cancelled && hovered === idx) {
          await sleep(700)
          if (cancelled || hovered !== idx) return
          triggerPulse(idx)
        }
      }
      loop()
    }

    clearPulseTimeouts.current.forEach((t, i) => {
      if (t) {
        clearTimeout(t)
        clearPulseTimeouts.current[i] = null
      }
    })

    if (hovered === null) {
      scheduleIdle(0)
      scheduleIdle(1)
      scheduleIdle(2)
    } else {
      scheduleHover(hovered)
    }

    return () => {
      cancelled = true
    }
  }, [hovered, prefersReducedMotion, triggerPulse])

  const [left, rightTop, bottom] = items

  const cardVisible = () => {
    return step >= 7
  }

  return (
    <div ref={containerRef} className="relative w-full min-h-[500px] lg:min-h-[600px] hidden lg:block overflow-visible">
      {/* Nebula gradient background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: [
            "radial-gradient(ellipse 58% 52% at 50% 50%, rgba(139, 92, 246, 0.12) 0%, transparent 70%)",
            "radial-gradient(ellipse 42% 38% at 41% 47%, rgba(59, 130, 246, 0.09) 0%, transparent 65%)",
            "radial-gradient(ellipse 32% 28% at 56% 55%, rgba(168, 85, 247, 0.08) 0%, transparent 60%)",
          ].join(", "),
        }}
      />

      {/* Waves */}
      {geometry.targets[0] && (
        <DirectionalWaves
          id="wave-left"
          center={geometry.center}
          target={geometry.targets[0]}
          pulseToken={pulseTokens[0]}
          delayMs={0}
        />
      )}
      {geometry.targets[1] && (
        <DirectionalWaves
          id="wave-right"
          center={geometry.center}
          target={geometry.targets[1]}
          pulseToken={pulseTokens[1]}
          delayMs={90}
        />
      )}
      {geometry.targets[2] && (
        <DirectionalWaves
          id="wave-bottom"
          center={geometry.center}
          target={geometry.targets[2]}
          pulseToken={pulseTokens[2]}
          delayMs={150}
        />
      )}

      {/* Center Satellite */}
      <motion.div
        className={[
          "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20",
          "w-[180px] h-[180px] lg:w-[230px] lg:h-[230px]",
          "transform-gpu",
        ].join(" ")}
        ref={satelliteRef}
        initial={{ scale: 0.88, opacity: 0, filter: "blur(6px)" }}
        animate={
          step >= 1 ? { scale: 1, opacity: 1, filter: "blur(0px)" } : { scale: 0.88, opacity: 0, filter: "blur(6px)" }
        }
        transition={{ type: "spring", stiffness: 240, damping: 22 }}
      >
        <div className="w-full h-full">
          <DotLottieReact
            src="/assets/lottie/satelite.lottie"
            loop
            autoplay
            style={{
              width: "100%",
              height: "100%",
              transform: "translateZ(0)",
              backfaceVisibility: "hidden",
            }}
          />
        </div>
      </motion.div>

      {/* Cards */}
      {left && (
        <motion.div
          className="absolute left-[1%] top-[15%] w-[36%] z-30"
          ref={(el) => {
            cardRefs.current[0] = el
          }}
          initial={{ opacity: 0, scale: 0.92, y: 18 }}
          animate={cardVisible() ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.92, y: 18 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          onMouseEnter={() => setHovered(0)}
          onMouseLeave={() => setHovered(null)}
          onFocus={() => setHovered(0)}
          onBlur={() => setHovered(null)}
        >
          <ServiceCard
            title={left.title}
            text={left.text}
            tags={left.tags}
            href={getLink(left.title)}
            imageSrc={getImage(left.title)}
            signalToken={pulseTokens[0]}
          />
        </motion.div>
      )}

      {rightTop && (
        <motion.div
          className="absolute right-[2%] top-[5%] w-[36%] z-30"
          ref={(el) => {
            cardRefs.current[1] = el
          }}
          initial={{ opacity: 0, scale: 0.92, y: 18 }}
          animate={cardVisible() ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.92, y: 18 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          onMouseEnter={() => setHovered(1)}
          onMouseLeave={() => setHovered(null)}
          onFocus={() => setHovered(1)}
          onBlur={() => setHovered(null)}
        >
          <ServiceCard
            title={rightTop.title}
            text={rightTop.text}
            tags={rightTop.tags}
            href={getLink(rightTop.title)}
            imageSrc={getImage(rightTop.title)}
            signalToken={pulseTokens[1]}
          />
        </motion.div>
      )}

      {bottom && (
        <motion.div
          className="absolute right-[24%] bottom-[0%] w-[42%] z-30"
          ref={(el) => {
            cardRefs.current[2] = el
          }}
          initial={{ opacity: 0, scale: 0.92, y: 18 }}
          animate={cardVisible() ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.92, y: 18 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          onMouseEnter={() => setHovered(2)}
          onMouseLeave={() => setHovered(null)}
          onFocus={() => setHovered(2)}
          onBlur={() => setHovered(null)}
        >
          <ServiceCard
            title={bottom.title}
            text={bottom.text}
            tags={bottom.tags}
            href={getLink(bottom.title)}
            imageSrc={getImage(bottom.title)}
            signalToken={pulseTokens[2]}
          />
        </motion.div>
      )}
    </div>
  )
}
