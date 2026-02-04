"use client"

import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import LocalizedLink from "../../localized-link"

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
}) {
  const CardContent = (
    <motion.div
      tabIndex={href ? -1 : 0}
      onMouseEnter={!href ? onHoverStart : undefined}
      onMouseLeave={!href ? onHoverEnd : undefined}
      onFocus={!href ? onFocus : undefined}
      onBlur={!href ? onBlur : undefined}
      className={[
        "rounded-[1.6rem]",
        "bg-white dark:bg-[color:var(--color-card)]",
        "border border-black/0 dark:border-white/0",
        "shadow-[0_10px_30px_rgba(0,0,0,0.06)]",
        "px-6 py-6",
        "transition-transform duration-300 ease-out",
        "will-change-transform",
        "hover:scale-[1.02] hover:-translate-y-0.5",
        "focus:scale-[1.02] focus:-translate-y-0.5",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-black/15 dark:focus-visible:ring-white/20",
        // Wenn wir im Link sind, wollen wir, dass der Link den Focus-Ring bekommt, nicht das Div
        href ? "focus:ring-0" : "",
        className ?? "",
      ].join(" ")}
    >
      <div className="flex flex-wrap gap-2">
        {tags.map((t) => (
          <TagPill key={t} label={t} />
        ))}
      </div>

      <h3 className="mt-4 font-serif text-[1.65rem] leading-[1.05] tracking-tight text-black dark:text-white">
        {title}
      </h3>

      <p className="mt-3 text-[0.82rem] leading-relaxed text-black/70 dark:text-white/70 max-w-[52ch]">
        {text}
      </p>
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

/** geometry helpers */
type Pt = { x: number; y: number }
type Box = { left: number; top: number; right: number; bottom: number; width: number; height: number }

function rectOf(el: HTMLElement, root: HTMLElement): Box {
  const r = el.getBoundingClientRect()
  const rr = root.getBoundingClientRect()
  const left = r.left - rr.left
  const top = r.top - rr.top
  return {
    left,
    top,
    right: left + r.width,
    bottom: top + r.height,
    width: r.width,
    height: r.height,
  }
}

function getControlPoint(start: Pt, end: Pt, center: Pt, curvature = 0.2) {
  const midX = (start.x + end.x) / 2
  const midY = (start.y + end.y) / 2
  const toCenterX = center.x - midX
  const toCenterY = center.y - midY
  return {
    x: midX + toCenterX * curvature,
    y: midY + toCenterY * curvature,
  }
}

function getCurvePath(start: Pt, end: Pt, center: Pt, curvature = 0.2) {
  const cp = getControlPoint(start, end, center, curvature)
  return `M ${start.x},${start.y} Q ${cp.x},${cp.y} ${end.x},${end.y}`
}

function ConnectionLine({
  start,
  end,
  center,
  isActive,
  reduceMotion,
  delay = 0,
}: {
  start: Pt
  end: Pt
  center: Pt
  isActive: boolean
  reduceMotion: boolean | null
  delay?: number
}) {
  const path = useMemo(() => getCurvePath(start, end, center), [start, end, center])

  return (
    <>
      {/* Basis Linie (Hintergrund) */}
      <motion.path
        d={path}
        fill="none"
        stroke="url(#lineGradient)"
        strokeWidth={isActive ? 2.5 : 1.5}
        strokeOpacity={isActive ? 0.5 : 0.15}
        initial={false}
        animate={{
          strokeWidth: isActive ? 2.5 : 1.5,
          strokeOpacity: isActive ? 0.5 : 0.15,
        }}
        transition={{ duration: 0.4 }}
      />

      {/* Wandernder Lichtimpuls */}
      {!reduceMotion && (
        <motion.path
          d={path}
          fill="none"
          stroke="url(#pulseGradient)"
          strokeWidth={3}
          strokeLinecap="round"
          initial={{ pathLength: 0, pathOffset: 0, opacity: 0 }}
          animate={{
            pathLength: [0, 0.2, 0], // Wird länger und dann wieder kürzer (Schweif)
            pathOffset: [0, 0.8, 1], // Bewegt sich von Start zu Ende
            opacity: [0, 1, 0], // Blendet ein und aus
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: delay,
            repeatDelay: 1.5,
          }}
        />
      )}
    </>
  )
}

function getLink(title: string) {
  const t = title.toLowerCase()
  if (t.includes("consulting") || t.includes("beratung")) return "/consulting"
  if (t.includes("analysis") || t.includes("analyse")) return "/analytics"
  if (t.includes("app") || t.includes("workflow")) return "/apps"
  return undefined
}

export default function Services({ dict }: ServicesProps) {
  const items = (dict?.services?.items ?? []) as Array<{
    title: string
    text: string
    tags: string[]
  }>

  const [left, rightTop, bottom] = items

  const stageRef = useRef<HTMLDivElement | null>(null)
  const leftRef = useRef<HTMLDivElement | null>(null)
  const rightTopRef = useRef<HTMLDivElement | null>(null)
  const bottomRef = useRef<HTMLDivElement | null>(null)

  const reduceMotion = useReducedMotion()
  const [hovered, setHovered] = useState<"left" | "rightTop" | "bottom" | null>(null)

  const [stageSize, setStageSize] = useState<{ w: number; h: number }>({ w: 1, h: 1 })
  const [anchors, setAnchors] = useState<{ a?: Pt; b?: Pt; c?: Pt }>({})

  const recompute = () => {
    const stage = stageRef.current
    if (!stage) return

    const w = Math.max(1, stage.clientWidth)
    const h = Math.max(1, stage.clientHeight)
    setStageSize({ w, h })

    // Raw points at card edges
    let pA: Pt | undefined
    let pB: Pt | undefined
    let pC: Pt | undefined

    if (leftRef.current) {
      const r = rectOf(leftRef.current, stage)
      // rechter Rand, eher unten
      pA = { x: r.right - 6, y: r.top + r.height * 0.72 }
    }
    if (rightTopRef.current) {
      const r = rectOf(rightTopRef.current, stage)
      // linker Rand, mittig-unten
      pB = { x: r.left + 6, y: r.top + r.height * 0.56 }
    }
    if (bottomRef.current) {
      const r = rectOf(bottomRef.current, stage)
      // linker Rand, oben
      pC = { x: r.left + r.width * 0.18, y: r.top + 10 }
    }

    // Apply scaling to make the triangle larger than the card layout
    if (pA && pB && pC) {
      const cx = (pA.x + pB.x + pC.x) / 3
      const cy = (pA.y + pB.y + pC.y) / 3
      const scale = 1.25 // 25% larger

      const expand = (p: Pt) => ({
        x: cx + (p.x - cx) * scale,
        y: cy + (p.y - cy) * scale,
      })

      setAnchors({
        a: expand(pA),
        b: expand(pB),
        c: expand(pC),
      })
    } else {
      setAnchors({ a: pA, b: pB, c: pC })
    }
  }

  useLayoutEffect(() => {
    recompute()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items?.length])

  useEffect(() => {
    recompute()
    const stage = stageRef.current
    if (!stage) return

    const ro = new ResizeObserver(() => recompute())
    ro.observe(stage)

    window.addEventListener("resize", recompute)
    return () => {
      ro.disconnect()
      window.removeEventListener("resize", recompute)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Berechne Zentrum für die Kurvenkrümmung
  const center = useMemo(() => {
    if (!anchors.a || !anchors.b || !anchors.c) return { x: 0, y: 0 }
    return {
      x: (anchors.a.x + anchors.b.x + anchors.c.x) / 3,
      y: (anchors.a.y + anchors.b.y + anchors.c.y) / 3,
    }
  }, [anchors])

  // Berechne den geschlossenen Pfad für die Hintergrundfüllung
  const fillPath = useMemo(() => {
    if (!anchors.a || !anchors.b || !anchors.c) return ""
    const { a, b, c } = anchors
    const cpAB = getControlPoint(a, b, center)
    const cpBC = getControlPoint(b, c, center)
    const cpCA = getControlPoint(c, a, center)

    return `M ${a.x},${a.y} Q ${cpAB.x},${cpAB.y} ${b.x},${b.y} Q ${cpBC.x},${cpBC.y} ${c.x},${c.y} Q ${cpCA.x},${cpCA.y} ${a.x},${a.y} Z`
  }, [anchors, center])

  return (
    <section className="relative pt-14 pb-4 md:pt-12 md:pb-10">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-serif text-[2.6rem] sm:text-[3.15rem] md:text-[3.6rem] leading-[1.05] tracking-tight text-black dark:text-white whitespace-pre-line text-balance">
            {dict.services.title}
          </h2>
          <p className="mt-4 text-sm sm:text-base leading-relaxed text-black/75 dark:text-white/75 max-w-[54ch] mx-auto">
            {dict.services.subtitle}
          </p>
        </div>

        {/* Mobile: stacked cards */}
        <div className="mt-6 flex flex-col gap-6 md:hidden">
          {items.map((it) => (
            <ServiceCard
              key={it.title}
              title={it.title}
              text={it.text}
              tags={it.tags}
              href={getLink(it.title)}
            />
          ))}
        </div>

        <div
          ref={stageRef}
          className={[
            "relative -mt-20 hidden md:block",
            "min-h-[560px] lg:min-h-[620px]",
            "overflow-visible",
          ].join(" ")}
        >
          {/* Animated Connections behind cards */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
            <svg className="h-full w-full" viewBox={`0 0 ${stageSize.w} ${stageSize.h}`} preserveAspectRatio="none">
              <defs>
                <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="currentColor" className="text-blue-400 dark:text-blue-500" />
                  <stop offset="100%" stopColor="currentColor" className="text-indigo-400 dark:text-indigo-500" />
                </linearGradient>
                <linearGradient id="pulseGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="currentColor" stopOpacity="0" className="text-blue-500" />
                  <stop offset="50%" stopColor="currentColor" stopOpacity="1" className="text-indigo-400" />
                  <stop offset="100%" stopColor="currentColor" stopOpacity="0" className="text-purple-500" />
                </linearGradient>
                <linearGradient id="fillGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(59, 130, 246, 0.25)" />
                  <stop offset="100%" stopColor="rgba(147, 51, 234, 0.25)" />
                </linearGradient>
              </defs>

              {/* Background Fill */}
              {fillPath && (
                <motion.path
                  d={fillPath}
                  fill="url(#fillGradient)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1.5 }}
                />
              )}

              {anchors.a && anchors.b && anchors.c && (
                <>
                  {/* Left -> RightTop */}
                  <ConnectionLine
                    start={anchors.a}
                    end={anchors.b}
                    center={center}
                    isActive={hovered === "left" || hovered === "rightTop"}
                    reduceMotion={reduceMotion}
                    delay={0}
                  />
                  {/* RightTop -> Bottom */}
                  <ConnectionLine
                    start={anchors.b}
                    end={anchors.c}
                    center={center}
                    isActive={hovered === "rightTop" || hovered === "bottom"}
                    reduceMotion={reduceMotion}
                    delay={0.8}
                  />
                  {/* Bottom -> Left */}
                  <ConnectionLine
                    start={anchors.c}
                    end={anchors.a}
                    center={center}
                    isActive={hovered === "bottom" || hovered === "left"}
                    reduceMotion={reduceMotion}
                    delay={1.6}
                  />
                </>
              )}
            </svg>
          </div>

          {/* Cards: absolute positions */}
          {left && (
            <div ref={leftRef} className="absolute left-6 lg:left-10 top-36 lg:top-40 z-10">
              <ServiceCard
                title={left.title}
                text={left.text}
                tags={left.tags}
                className="w-[460px] lg:w-[520px]"
                onHoverStart={() => setHovered("left")}
                onHoverEnd={() => setHovered(null)}
                onFocus={() => setHovered("left")}
                onBlur={() => setHovered(null)}
                href={getLink(left.title)}
              />
            </div>
          )}

          {rightTop && (
            <div ref={rightTopRef} className="absolute right-8 lg:right-12 top-20 lg:top-24 z-10">
              <ServiceCard
                title={rightTop.title}
                text={rightTop.text}
                tags={rightTop.tags}
                className="w-[420px] lg:w-[460px]"
                onHoverStart={() => setHovered("rightTop")}
                onHoverEnd={() => setHovered(null)}
                onFocus={() => setHovered("rightTop")}
                onBlur={() => setHovered(null)}
                href={getLink(rightTop.title)}
              />
            </div>
          )}

          {bottom && (
            <div ref={bottomRef} className="absolute left-[54%] lg:left-[56%] top-[410px] lg:top-[455px] -translate-x-1/2 z-10">
              <ServiceCard
                title={bottom.title}
                text={bottom.text}
                tags={bottom.tags}
                className="w-[420px] lg:w-[410px]"
                onHoverStart={() => setHovered("bottom")}
                onHoverEnd={() => setHovered(null)}
                onFocus={() => setHovered("bottom")}
                onBlur={() => setHovered(null)}
                href={getLink(bottom.title)}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
