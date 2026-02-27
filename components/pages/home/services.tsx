"use client"

import React, { useCallback, useEffect, useRef, useState } from "react"
import { motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion"
import LocalizedLink from "../../localized-link"
import { DotLottieReact } from "@lottiefiles/dotlottie-react"

interface ServicesProps {
  dict: any
}

function TagPill({ label }: { label: string }) {
  return (
    <span
      className={[
        "inline-flex items-center rounded-full",
        "border border-black/25 bg-white/70",
        "px-2 py-0.5",
        "text-[0.62rem] font-semibold uppercase tracking-wide text-black/60",
        "dark:border-white/20 dark:bg-white/10 dark:text-white/70",
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
  /** changes whenever a pulse should (re)start */
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
  if (t.includes("consulting") || t.includes("beratung")) return "/consulting"
  if (t.includes("analysis") || t.includes("analyse")) return "/analytics"
  if (t.includes("app") || t.includes("workflow")) return "/apps"
  return undefined
}

function getImage(title: string) {
  const t = title.toLowerCase()
  if (t.includes("consulting") || t.includes("beratung")) return "/assets/home/services_consulting.png"
  if (t.includes("analysis") || t.includes("analyse")) return "/assets/home/services_analytics.png"
  if (t.includes("app") || t.includes("workflow")) return "/assets/home/services_apps.png"
  return undefined
}

function MobileServiceCardWrapper({ children }: { children: React.ReactNode }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 1, 1])

  return (
    <motion.div
      ref={ref}
      style={{ scale, opacity }}
      className="origin-center"
    >
      {children}    
    </motion.div>
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
  /** changes whenever a burst should start; if null, nothing is rendered */
  pulseToken: number | null
  delayMs?: number
}) {
  const [instances, setInstances] = useState<number[]>([])

  // Allow max 2 overlapping bursts to keep performance smooth
  useEffect(() => {
    if (pulseToken === null) return
    setInstances((prev) => {
      const next = [...prev, pulseToken]
      // limit to 2 concurrent instances – drop the oldest
      if (next.length > 2) next.shift()
      return next
    })

    // remove after the longest ring finishes (duration + max delay)
    const t = setTimeout(() => {
      setInstances((prev) => prev.filter((x) => x !== pulseToken))
    }, 3500)

    return () => clearTimeout(t)
  }, [pulseToken])

  if (instances.length === 0) return null

  const dx = target.x - center.x
  const dy = target.y - center.y
  const dist = Math.sqrt(dx * dx + dy * dy)

  // dynamic corridor: narrow enough to feel “directed”, wide enough to hit the card reliably
  const corridor = Math.max(54, Math.min(120, dist * 0.14))

  // NOTE: keep keyframe arrays mutable (not `as const`) to satisfy Framer Motion TS types
  const ringCommon = {
    initial: { r: 0, opacity: 0 },
    animate: {
      r: [0, dist * 1.03] as number[],
      opacity: [0, 0.85, 0.5, 0] as number[],
    },
    transition: { duration: 2.0, ease: "easeOut" as const, delay: delayMs / 1000 },
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

      {instances.map((token) => (
        <g key={token}>
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
                delay: (delayMs + 350) / 1000,
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
                delay: (delayMs + 700) / 1000,
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

  // ensure the intro reveal animation only plays once per page load
  const introPlayedRef = useRef(false)

  const [step, setStep] = useState(0)
  const [hovered, setHovered] = useState<number | null>(null)

  /** wave + card pulse tokens per card; null = currently not rendered */
  const [pulseTokens, setPulseTokens] = useState<Array<number | null>>([null, null, null])
  const pulseSeq = useRef(1)
  const clearPulseTimeouts = useRef<Array<any>>([null, null, null])

  /** dynamic measurement in SVG viewBox space (1000 x 1000) */
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

      // place target on the card edge (towards the satellite), not the center
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
    // clear any scheduled "turn off" for this card
    if (clearPulseTimeouts.current[idx]) clearTimeout(clearPulseTimeouts.current[idx])

    const token = pulseSeq.current++
    setPulseTokens((prev) => {
      const next = [...prev]
      next[idx] = token
      return next
    })

    // keep it mounted briefly; unmount after animation has faded out
    clearPulseTimeouts.current[idx] = setTimeout(() => {
      setPulseTokens((prev) => {
        const next = [...prev]
        if (next[idx] === token) next[idx] = null
        return next
      })
    }, 3000)
  }, [])

  useEffect(() => {
    if (!isInView || prefersReducedMotion) return
    if (introPlayedRef.current) return
    introPlayedRef.current = true

    let cancelled = false
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

    const sequence = async () => {
      // satellite appears
      setStep(1)
      await sleep(350)
      if (cancelled) return

      // show all cards + waves simultaneously
      setStep(7)
      triggerPulse(0)
      triggerPulse(1)
      triggerPulse(2)
    }

    sequence()
    return () => {
      cancelled = true
    }
  }, [isInView, prefersReducedMotion, triggerPulse])

  // (re)measure whenever we enter view, and react to resizes/layout changes
  useEffect(() => {
    if (!isInView) return
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
    if (!isInView || prefersReducedMotion) return

    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))
    const randInt = (min: number, max: number) => Math.floor(min + Math.random() * (max - min + 1))

    let cancelled = false

    const scheduleIdle = (idx: number) => {
      const scheduleNext = async () => {
        while (!cancelled && hovered === null) {
          await sleep(randInt(2200, 4500))
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
          await sleep(1000)
          if (cancelled || hovered !== idx) return
          triggerPulse(idx)
        }
      }
      loop()
    }

    // clear any pending off-timers (so hover feels "continuous")
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
  }, [hovered, isInView, prefersReducedMotion, triggerPulse])

  const [left, rightTop, bottom] = items

  const cardVisible = (_idx: number) => {
    // all cards appear simultaneously at step 7
    return step >= 7
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-[500px] lg:min-h-[600px] hidden md:block overflow-visible"
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

      {/* Cards (wider + farther apart) */}
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

  return (
    <section className="relative pt-14 pb-8 md:pt-12 md:pb-6">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-serif text-[2.6rem] sm:text-[3.15rem] md:text-[3.6rem] leading-[1.05] tracking-tight text-black dark:text-white whitespace-pre-line text-balance">
            {firstPart} <span className="text-[#21569c]">{lastWord}</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base leading-relaxed text-black/75 dark:text-white/75 max-w-[54ch] mx-auto">
            {dict.services.subtitle}
          </p>
        </div>

        {/* Mobile: stacked */}
        <div className="mt-7 flex flex-col gap-2 md:hidden">
          {items.map((it) => (
            // <div key={it.title} className="origin-center">
            //   <ServiceCard
            //     title={it.title}
            //     text={it.text}
            //     tags={it.tags}
            //     href={getLink(it.title)}
            //     imageSrc={getImage(it.title)}
            //     className="min-h-[28vh] flex flex-col justify-center"
            //   />
            // </div>
            <MobileServiceCardWrapper key={it.title}>
              <ServiceCard
                title={it.title}
                text={it.text}
                tags={it.tags}
                href={getLink(it.title)}
                imageSrc={getImage(it.title)}
                className="min-h-[28vh] flex flex-col justify-center"
              />
            </MobileServiceCardWrapper>
          ))}
        </div>

        <DesktopServices items={items} />
      </div>
    </section>
  )
}
