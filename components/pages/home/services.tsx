"use client"

import React, { useCallback, useEffect, useRef, useState } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"
import LocalizedLink from "../../localized-link"
import { DotLottieReact } from "@lottiefiles/dotlottie-react"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"

interface ServicesProps {
  dict: any
}

function TagPill({ label, variant = "default" }: { label: string; variant?: "default" | "glass" }) {
  return (
    <span
      className={[
        "inline-flex items-center rounded-full",
        "px-2.5 py-0.5",
        "text-[0.62rem] font-semibold uppercase tracking-wide",
        variant === "glass"
          ? "border border-black/10 bg-white/35 text-black/55 backdrop-blur-sm dark:border-white/20 dark:bg-white/15 dark:text-white/80"
          : "border border-black/25 bg-white/70 text-black/60 dark:border-white/20 dark:bg-white/10 dark:text-white/70",
      ].join(" ")}
    >
      {label}
    </span>
  )
}

function ServiceCard({
  title,
  text,
  tags,
  className,
  onHoverStart,
  onHoverEnd,
  onFocus,
  onBlur,
  href,
  imageSrc,
  signalToken,
}: {
  title: string
  text: string
  tags: string[]
  className?: string
  onHoverStart?: () => void
  onHoverEnd?: () => void
  onFocus?: () => void
  onBlur?: () => void
  href?: string
  imageSrc?: string
  signalToken?: number | null
}) {
  const CardContent = (
    <motion.div
      tabIndex={href ? -1 : 0}
      onMouseEnter={!href ? onHoverStart : undefined}
      onMouseLeave={!href ? onHoverEnd : undefined}
      onFocus={!href ? onFocus : undefined}
      onBlur={!href ? onBlur : undefined}
      className={[
        "relative overflow-hidden",
        "rounded-[1.75rem] md:rounded-[1.6rem]",
        "bg-white dark:bg-[color:var(--color-card)]",
        "shadow-[0_10px_30px_rgba(0,0,0,0.06)]",
        "px-6 py-6 sm:px-7 sm:py-7",
        "transition-transform duration-300 ease-out",
        "will-change-transform",
        "hover:scale-[1.02] hover:-translate-y-0.5",
        "focus:scale-[1.02] focus:-translate-y-0.5",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-black/15 dark:focus-visible:ring-white/20",
        href ? "focus:ring-0" : "",
        className ?? "",
      ].join(" ")}
    >
      {/* card “signal ripple” overlay */}
      {typeof signalToken === "number" && (
        <motion.div
          key={signalToken}
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[1.75rem] md:rounded-[1.6rem]"
          initial={{ opacity: 0, boxShadow: "0 0 0 0 rgba(0,0,0,0)" }}
          animate={{
            opacity: [0, 1, 1, 0],
            boxShadow: [
              "0 0 0 0 rgba(168,85,247,0.0)",
              "0 0 0 8px rgba(168,85,247,0.16)",
              "0 0 0 16px rgba(59,130,246,0.10)",
              "0 0 0 26px rgba(99,102,241,0.0)",
            ],
          }}
          transition={{ duration: 1.15, ease: "easeOut", times: [0, 0.25, 0.6, 1] }}
          style={{ mixBlendMode: "screen" }}
        />
      )}

      {imageSrc && (
        <div className="absolute right-0 top-0 bottom-0 w-[60%] pointer-events-none select-none">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageSrc}
            alt=""
            className="h-full w-full object-cover object-right opacity-90"
            style={{
              maskImage: "linear-gradient(to left, black -60%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to left, black -60%, transparent 100%)",
            }}
          />
        </div>
      )}

      <div className="relative z-10">
        <div className="flex flex-wrap gap-2">
          {tags.map((t) => (
            <TagPill key={t} label={t} />
          ))}
        </div>

        <h3 className="mt-4 font-serif text-[1.75rem] leading-[1.05] tracking-tight text-black dark:text-white">
          {title}
        </h3>

        <p className="mt-3 text-[0.84rem] sm:text-[0.92rem] leading-relaxed text-black/75 dark:text-white/70 max-w-[60ch]">
          {text}
        </p>
      </div>
    </motion.div>
  )

  if (href) {
    return (
      <LocalizedLink
        href={href}
        className="block outline-none rounded-[1.6rem]"
        onMouseEnter={onHoverStart}
        onMouseLeave={onHoverEnd}
        onFocus={onFocus}
        onBlur={onBlur}
      >
        {CardContent}
      </LocalizedLink>
    )
  }

  return CardContent
}

function getLink(title: string) {
  const t = title.toLowerCase()
  if (t.includes("strategy") || t.includes("strategie")) return "/services/strategy"
  if (t.includes("analytics") || t.includes("analyse")) return "/services/analytics"
  if (t.includes("app") || t.includes("workflow")) return "/services/apps"
  return undefined
}

function getImage(title: string) {
  const t = title.toLowerCase()
  if (t.includes("strategy") || t.includes("strategie")) return "/assets/home/services_consulting.webp"
  if (t.includes("analytics") || t.includes("analyse")) return "/assets/home/services_analytics.webp"
  if (t.includes("app") || t.includes("workflow")) return "/assets/home/services_apps.webp"
  return undefined
}

function MobileCardLayer({
  item,
  state,
  swipeDirection,
  href,
  imageSrc,
}: {
  item: { title: string; text: string; tags: string[] }
  state: "active" | "prev" | "idle"
  swipeDirection: 1 | -1
  href?: string
  imageSrc?: string
}) {
  const isActive = state === "active"
  const isPrev = state === "prev"

  const animateState = isActive
    ? {
        opacity: 1,
        x: 0,
        y: 0,
        rotate: 0,
        scale: 1,
      }
    : isPrev
      ? {
          opacity: 0,
          x: swipeDirection === 1 ? -76 : 76,
          y: 8,
          rotate: swipeDirection === 1 ? -8 : 8,
          scale: 0.94,
        }
      : {
          opacity: 0,
          x: swipeDirection === 1 ? 76 : -76,
          y: 10,
          rotate: swipeDirection === 1 ? 8 : -8,
          scale: 0.93,
        }

  const layerTransition = {
    x: { type: "spring", stiffness: 220, damping: 30, mass: 1.0 },
    rotate: { type: "spring", stiffness: 200, damping: 26, mass: 0.95 },
    opacity: {
      duration: isActive ? 0.42 : 0.68,
      ease: [0.22, 1, 0.36, 1],
    },
    scale: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    y: { duration: 0.44, ease: [0.22, 1, 0.36, 1] },
  }

  const inner = (
    <motion.div
      animate={animateState}
      transition={layerTransition}
      className="absolute inset-0 will-change-[opacity,transform]"
      style={{ pointerEvents: isActive ? "auto" : "none" }}
    >
      <div className="relative w-full h-full overflow-hidden rounded-[1.25rem] shadow-[0_10px_40px_rgba(0,0,0,0.12)]">
        {/* Background image */}
        {imageSrc && (
          <div className="absolute inset-0 z-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageSrc}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div
          className="absolute inset-0 z-[1]"
          style={{
            background: [
              "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.45) 30%, rgba(0,0,0,0.18) 55%, rgba(0,0,0,0.04) 75%, transparent 100%)",
            ].join(", "),
          }}
        />

        <div
          className="absolute inset-0 z-[2] pointer-events-none"
          style={{
            background:
              "linear-gradient(160deg, rgba(99,102,241,0.08) 0%, rgba(168,85,247,0.06) 60%, transparent 100%)",
          }}
        />

        {/* Top-right link indicator */}
        {href && (
          <div className="absolute top-4 right-4 z-[6]">
            <span className="flex items-center justify-center w-9 h-9 rounded-full bg-black/25 text-white/90 backdrop-blur-sm border border-white/20 transition-colors">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 17L17 7" />
                <path d="M7 7h10v10" />
              </svg>
            </span>
          </div>
        )}

        {/* Content directly on the image — no panel */}
        <div className="absolute bottom-0 left-0 right-0 z-[5] p-5 pb-6">
          {/* Tags row */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {item.tags.map((t) => (
              <span
                key={t}
                className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[0.6rem] font-semibold uppercase tracking-wide border border-white/25 text-white/95 bg-white/[0.08]"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Title */}
          <h3 className="font-serif text-[1.55rem] leading-[1.08] tracking-tight text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.3)]">
            {item.title}
          </h3>

          {/* Description */}
          <div className="mt-2.5">
            <p className="text-[0.82rem] leading-relaxed text-white/85 line-clamp-4">
              {item.text}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )

  if (href) {
    return (
      <LocalizedLink
        href={href}
        className="absolute inset-0 block outline-none rounded-[1.25rem]"
        tabIndex={isActive ? 0 : -1}
        aria-hidden={!isActive}
      >
        {inner}
      </LocalizedLink>
    )
  }

  return inner
}

function MobileServicesStack({
  items,
  header,
  ctaText,
  ctaButton,
}: {
  items: Array<{ title: string; text: string; tags: string[] }>
  header?: React.ReactNode
  ctaText?: string
  ctaButton?: string
}) {
  return (
    <div className="md:hidden">
      {header && <div className="mb-8">{header}</div>}

      <div className="space-y-6">
        {items.map((item, idx) => {
          const href = getLink(item.title)
          const imageSrc = getImage(item.title)

          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: idx * 0.04 }}
              className="relative overflow-hidden rounded-[1.5rem] border border-black/8 bg-white shadow-[0_16px_44px_rgba(0,0,0,0.08)]"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                {imageSrc && (
                  <div className="absolute inset-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={imageSrc} alt="" className="h-full w-full object-cover" />
                  </div>
                )}

                <div
                  className="absolute inset-0"
                  style={{
                    background: [
                      "linear-gradient(to top, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.92) 30%, rgba(255,255,255,0.26) 58%, rgba(255,255,255,0.04) 78%, transparent 100%)",
                      "linear-gradient(160deg, rgba(33,86,156,0.08) 0%, rgba(22,174,163,0.04) 58%, transparent 100%)",
                    ].join(", "),
                  }}
                />

                <div className="absolute left-5 top-5 z-10 inline-flex h-8 min-w-8 items-center justify-center rounded-full border border-black/10 bg-white/78 px-3 text-[0.68rem] font-semibold tracking-[0.14em] text-black/55 backdrop-blur-sm">
                  {String(idx + 1).padStart(2, "0")}
                </div>

                <div className="absolute inset-x-0 bottom-0 z-10 p-5 pb-6">
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((t) => (
                      <span
                        key={t}
                        className="inline-flex items-center rounded-full border border-black/12 bg-white/92 px-3 py-1 text-[0.64rem] font-semibold uppercase tracking-[0.08em] text-black/75 shadow-sm"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <h3 className="mt-4 max-w-[14ch] font-serif text-[1.9rem] leading-[1.02] tracking-tight text-black">
                    {item.title}
                  </h3>

                  <p className="mt-3 max-w-[34ch] text-[0.92rem] leading-relaxed text-black/72">
                    {item.text}
                  </p>

                  {href && (
                    <div className="mt-5">
                      <LocalizedLink
                        href={href}
                        className="inline-flex items-center gap-2 rounded-full border border-black/12 bg-white/82 px-4 py-2.5 text-[0.82rem] font-medium text-black/75 shadow-sm backdrop-blur-sm"
                      >
                        Mehr erfahren
                        <ChevronRight className="h-4 w-4" />
                      </LocalizedLink>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )
        })}

        {ctaText && ctaButton && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="pt-2 text-center"
          >
            <p className="text-sm leading-relaxed text-black/75 dark:text-white/75 max-w-[54ch] mx-auto">
              {ctaText}
            </p>
            <div className="mt-4 flex justify-center">
              <a href="#book">
                <Button
                  variant="outline"
                  className="rounded-xl px-8 py-6 text-base border-black text-black hover:bg-black hover:text-white transition-all duration-300 cursor-pointer"
                >
                  {ctaButton}
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

function DirectionalWaves({
  id,
  center,
  target,
  pulseToken,
  delayMs = 0,
}: {
  id: string
  center: { x: number; y: number }
  target: { x: number; y: number }
  pulseToken: number | null
  delayMs?: number
}) {
  const [instances, setInstances] = useState<number[]>([])

  useEffect(() => {
    if (pulseToken === null) return
    setInstances((prev) => {
      const next = [...prev, pulseToken]
      if (next.length > 2) next.shift()
      return next
    })

    const t = setTimeout(() => {
      setInstances((prev) => prev.filter((x) => x !== pulseToken))
    }, 2500)

    return () => clearTimeout(t)
  }, [pulseToken])

  if (instances.length === 0) return null

  const dx = target.x - center.x
  const dy = target.y - center.y
  const dist = Math.sqrt(dx * dx + dy * dy)

  const corridor = Math.max(54, Math.min(120, dist * 0.14))

  const ringCommon = {
    initial: { r: 0, opacity: 0 },
    animate: {
      r: [0, dist * 1.03] as number[],
      opacity: [0, 0.85, 0.5, 0] as number[],
    },
    transition: { duration: 1.5, ease: "easeOut" as const, delay: delayMs / 1000 },
  }

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1000 1000" preserveAspectRatio="none">
      <defs>
        <mask id={`${id}-mask`}>
          <rect width="100%" height="100%" fill="black" />
          <line
            x1={center.x}
            y1={center.y}
            x2={target.x}
            y2={target.y}
            stroke="white"
            strokeWidth={corridor}
            strokeLinecap="round"
          />
        </mask>

        <linearGradient id={`${id}-grad`} gradientUnits="userSpaceOnUse" x1={center.x} y1={center.y} x2={target.x} y2={target.y}>
          <stop offset="0%" stopColor="rgba(176, 101, 246, 0.75)" />
          <stop offset="55%" stopColor="rgba(116, 71, 189, 0.65)" />
          <stop offset="100%" stopColor="rgba(25, 28, 201, 0.55)" />
        </linearGradient>
      </defs>

      {instances.map((token, index) => (
        <g key={`${id}-${token}-${index}`}>
          <g mask={`url(#${id}-mask)`}>
            <motion.circle
              cx={center.x}
              cy={center.y}
              fill="none"
              stroke={`url(#${id}-grad)`}
              strokeWidth="2"
              strokeLinecap="round"
              {...ringCommon}
            />
            <motion.circle
              cx={center.x}
              cy={center.y}
              fill="none"
              stroke={`url(#${id}-grad)`}
              strokeWidth="1.5"
              strokeLinecap="round"
              {...ringCommon}
              transition={{
                ...(ringCommon.transition as any),
                delay: (delayMs + 250) / 1000,
              }}
            />
            <motion.circle
              cx={center.x}
              cy={center.y}
              fill="none"
              stroke={`url(#${id}-grad)`}
              strokeWidth="1"
              strokeLinecap="round"
              {...ringCommon}
              transition={{
                ...(ringCommon.transition as any),
                delay: (delayMs + 500) / 1000,
              }}
            />
          </g>

          <motion.circle
            cx={target.x}
            cy={target.y}
            r={4}
            fill="none"
            stroke="rgba(168,85,247,0.3)"
            strokeWidth="1"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: [0, 0.7, 0.3, 0], scale: [0.8, 1.15, 1.0, 0.95] }}
            transition={{ duration: 1.0, ease: "easeOut", delay: delayMs / 1000 }}
          />
        </g>
      ))}
    </svg>
  )
}

function DesktopServices({ items }: { items: any[] }) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.15 })
  const prefersReducedMotion = useReducedMotion()

  const [step, setStep] = useState(0)
  const [hovered, setHovered] = useState<number | null>(null)

  const [pulseTokens, setPulseTokens] = useState<Array<number | null>>([null, null, null])
  const pulseSeq = useRef(1)
  const clearPulseTimeouts = useRef<Array<any>>([null, null, null])

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

  const cardVisible = (_idx: number) => {
    return step >= 7
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-[500px] lg:min-h-[600px] hidden lg:block overflow-visible"
    >
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
      {geometry.targets[0] && <DirectionalWaves id="wave-left" center={geometry.center} target={geometry.targets[0]} pulseToken={pulseTokens[0]} delayMs={0} />}
      {geometry.targets[1] && <DirectionalWaves id="wave-right" center={geometry.center} target={geometry.targets[1]} pulseToken={pulseTokens[1]} delayMs={90} />}
      {geometry.targets[2] && <DirectionalWaves id="wave-bottom" center={geometry.center} target={geometry.targets[2]} pulseToken={pulseTokens[2]} delayMs={150} />}

      {/* Center Satellite */}
      <motion.div
        className={[
          "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20",
          "w-[180px] h-[180px] lg:w-[230px] lg:h-[230px]",
          "transform-gpu",
        ].join(" ")}
        ref={satelliteRef}
        initial={{ scale: 0.88, opacity: 0, filter: "blur(6px)" }}
        animate={step >= 1 ? { scale: 1, opacity: 1, filter: "blur(0px)" } : { scale: 0.88, opacity: 0, filter: "blur(6px)" }}
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
          animate={cardVisible(0) ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.92, y: 18 }}
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
          animate={cardVisible(1) ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.92, y: 18 }}
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
          animate={cardVisible(2) ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.92, y: 18 }}
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

export default function Services({ dict }: ServicesProps) {
  const items = (dict?.services?.items ?? []) as Array<{
    title: string
    text: string
    tags: string[]
  }>

  const title = dict?.services?.title || ""
  const words = title.split(" ")
  const lastWord = words.length > 0 ? words.pop() : ""
  const firstPart = words.join(" ")

  const sectionHeader = (
    <div className="text-center">
      <h2 className="font-serif text-[2.6rem] sm:text-[3.15rem] md:text-[3.6rem] leading-[1.05] tracking-tight text-black dark:text-white whitespace-pre-line text-balance">
        {firstPart} <span className="text-[#21569c]">{lastWord}</span>
      </h2>
      <p className="mt-4 text-sm sm:text-base leading-relaxed text-black/75 dark:text-white/75 max-w-[54ch] mx-auto">
        {dict.services.subtitle}
      </p>
    </div>
  )

  return (
    <section className="relative pt-14 pb-8 md:pt-12 md:pb-6">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop + Tablet: header rendered normally above the cards */}
        <div className="hidden md:block">{sectionHeader}</div>

        {/* Mobile: Sticky-stack with scroll-triggered crossfade (header inside sticky) */}
        <MobileServicesStack
          items={items}
          header={sectionHeader}
          ctaText={dict.services.mobileCta}
          ctaButton={dict.services.mobileCtaButton}
        />

        {/* Tablet: simple vertical card list for md–lg range */}
        <div className="hidden md:flex lg:hidden flex-col gap-5 mt-10">
          {items.map((item) => (
            <ServiceCard
              key={item.title}
              title={item.title}
              text={item.text}
              tags={item.tags}
              href={getLink(item.title)}
              imageSrc={getImage(item.title)}
            />
          ))}
          {dict.services.mobileCta && dict.services.mobileCtaButton && (
            <div className="mt-4 text-center">
              <p className="text-sm leading-relaxed text-black/75 dark:text-white/75 max-w-[54ch] mx-auto">
                {dict.services.mobileCta}
              </p>
              <div className="mt-4 flex justify-center">
                <a href="#book">
                  <Button
                    variant="outline"
                    className="rounded-xl px-8 py-6 text-base border-black text-black hover:bg-black hover:text-white transition-all duration-300 hover:scale-105 cursor-pointer"
                  >
                    {dict.services.mobileCtaButton}
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </a>
              </div>
            </div>
          )}
        </div>

        <DesktopServices items={items} />
      </div>
    </section>
  )
}

