"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Link from "next/link"
import {
  cubicBezier,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion"
import { ArrowRight } from "lucide-react"
import type { Locale } from "@/lib/dictionary"

interface HeroSectionProps {
  lang: Locale
  dict: any
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ")
}

// ---------- Hero Packages (pill chips) ----------

function HeroPackages({ hero, align = "left" }: { hero: any; align?: "left" | "center" }) {
  const packages = (hero?.packages ?? []) as string[]
  if (packages.length === 0) return null

  return (
    <div className={cx("mt-5", align === "center" && "mx-auto max-w-[640px]")}>
      {hero?.packagesLabel && (
        <p className={cx("text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[#F703EB]", align === "center" && "text-center")}>
          {hero.packagesLabel}
        </p>
      )}
      <ul className={cx("mt-2.5 flex flex-wrap gap-2", align === "center" ? "justify-center" : "justify-start")}>
        {packages.map((item, idx) => (
          <li
            key={item}
            className={cx(
              "rounded-full border border-[#F703EB]/15 bg-[#F703EB]/[0.06] px-3 py-1.5 text-[0.76rem] font-medium leading-tight text-[#15151a]/78",
              idx >= 3 && "hidden sm:block",
            )}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

// ---------- Magnetic CTA ----------

function MagneticCta({
  href,
  children,
  className,
}: {
  href: string
  children: React.ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotion()
  const mvX = useMotionValue(0)
  const mvY = useMotionValue(0)
  const x = useSpring(mvX, { stiffness: 240, damping: 18, mass: 0.4 })
  const y = useSpring(mvY, { stiffness: 240, damping: 18, mass: 0.4 })

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const offsetX = e.clientX - (rect.left + rect.width / 2)
    const offsetY = e.clientY - (rect.top + rect.height / 2)
    const max = 8
    mvX.set(Math.max(-max, Math.min(max, offsetX * 0.3)))
    mvY.set(Math.max(-max, Math.min(max, offsetY * 0.3)))
  }
  const handleLeave = () => {
    mvX.set(0)
    mvY.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={shouldReduceMotion ? undefined : { x, y }}
      className="inline-block"
    >
      <Link href={href} className={className}>
        {children}
      </Link>
    </motion.div>
  )
}

// ---------- CTA Row (primary Calendly + secondary #process) ----------

function CtaRow({ hero, align, magnetic }: { hero: any; align: "left" | "center"; magnetic: boolean }) {
  const primaryClass =
    "group inline-flex items-center justify-center rounded-lg bg-[#F703EB] px-5 py-3 text-[0.88rem] font-medium text-white shadow-[0_14px_28px_rgba(247,3,235,0.20)] transition-colors duration-300 hover:bg-[#D802CD]"

  return (
    <div className={cx("flex flex-wrap items-center gap-3", align === "center" ? "justify-center" : "justify-start")}>
      {magnetic ? (
        <MagneticCta href="#book" className={primaryClass}>
          {hero.primaryCta}
          <ArrowRight className="ml-1.5 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
        </MagneticCta>
      ) : (
        <Link href="#book" className={primaryClass}>
          {hero.primaryCta}
          <ArrowRight className="ml-1.5 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
        </Link>
      )}
      <a
        href="#process"
        className="hidden sm:inline-flex items-center justify-center rounded-lg border border-[rgba(21,21,26,0.12)] bg-white px-5 py-3 text-[0.88rem] font-medium text-[#15151a] transition-colors duration-300 hover:border-[#15151a]"
      >
        {hero.secondaryCta}
      </a>
    </div>
  )
}

// ---------- Before/After Slider ----------

function BeforeAfterSlider({ beforeLabel, afterLabel, sliderHint, fill = false }: { beforeLabel: string; afterLabel: string; sliderHint: string; fill?: boolean }) {
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

    const easeInOut = (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t

    const keyframes: [number, number][] = [
      [0,    50],
      [320,  80],
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
    const onMove = (e: MouseEvent) => { if (dragging.current) updatePos(e.clientX) }
    const onUp = () => { dragging.current = false; touchStart.current = null }

    const onTouchMove = (e: TouchEvent) => {
      if (!dragging.current) return
      const touch = e.touches[0]
      const start = touchStart.current
      if (start) {
        const dx = Math.abs(touch.clientX - start.x)
        const dy = Math.abs(touch.clientY - start.y)
        if (dx + dy < 3) return
        if (dy > dx) { dragging.current = false; touchStart.current = null; return }
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
        onMouseDown={(e) => { hasInteracted.current = true; dragging.current = true; updatePos(e.clientX) }}
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
            style={{ top: "50%", left: "25%", transform: "translate(-50%, -50%)", color: "rgba(21,21,26,0.62)", textShadow: "0 1px 16px rgba(255,255,255,0.7)" }}
          >
            {beforeLabel}
          </span>
        </div>

        {/* AFTER layer */}
        <div
          className="absolute inset-0 overflow-hidden z-[2]"
          style={{ clipPath: `inset(0 0 0 ${pos}%)` }}
        >
          <AfterWebsite />
          <span
            aria-hidden
            className="pointer-events-none absolute z-[4] font-black text-[clamp(0.75rem,4.5cqw,2.1rem)] tracking-[0.16em] uppercase leading-none"
            style={{ top: "50%", left: "75%", transform: "translate(-50%, -50%)", color: "rgba(21,21,26,0.9)", textShadow: "0 1px 16px rgba(255,255,255,0.85)" }}
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
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px] sm:w-[22px] sm:h-[22px]">
              <path d="M9 6l-6 6 6 6M15 6l6 6-6 6"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Hint */}
      <p className={cx("flex items-center justify-center gap-2 text-[0.72rem] sm:text-[0.82rem] text-[#8a8a96]", fill ? "mt-3 shrink-0" : "mt-3")}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 shrink-0">
          <path d="M9 6l-6 6 6 6M15 6l6 6-6 6"/>
        </svg>
        {sliderHint}
      </p>
    </div>
  )
}

// ---------- Old (before) website — intentionally not mobile-optimised ----------

function BeforeWebsite() {
  return (
    <div className="absolute inset-0 flex flex-col bg-[#e9e7e1] font-sans overflow-hidden">
      {/* Browser chrome */}
      <div className="flex items-center gap-[1.2cqw] px-[2.3cqw] h-[5.7cqw] bg-[#c9c6bd] shrink-0">
        <span className="w-[1.5cqw] h-[1.5cqw] rounded-full bg-[#a7a399]" />
        <span className="w-[1.5cqw] h-[1.5cqw] rounded-full bg-[#a7a399]" />
        <span className="w-[1.5cqw] h-[1.5cqw] rounded-full bg-[#a7a399]" />
        <span className="ml-[1.7cqw] h-[2.7cqw] rounded-[0.8cqw] flex-1 max-w-[36.7cqw] bg-[#d8d5cc]" />
      </div>
      {/* Desktop nav crammed into mobile width */}
      <div className="flex items-center gap-[0.8cqw] px-[2cqw] h-[8cqw] bg-white border-b border-[#bbb] shrink-0 overflow-hidden">
        <span className="font-serif font-bold text-[2.4cqw] text-[#555] shrink-0 mr-[0.5cqw]">
          Muster<span className="text-[#8a6d3b]">Bau</span> GmbH
        </span>
        <div className="flex items-center gap-[0.6cqw] text-[1cqw] text-[#666]">
          {["Startseite","Über uns","Leistungen","Referenzen","Karriere","Presse","Kontakt"].map((item, i) => (
            <span key={item} className="flex items-center gap-[0.6cqw] whitespace-nowrap">
              {i > 0 && <span className="text-[#ccc]">|</span>}
              {item}
            </span>
          ))}
        </div>
      </div>
      {/* Thin hero banner */}
      <div className="h-[12cqw] bg-[repeating-linear-gradient(45deg,#cfccc3,#cfccc3_5px,#c4c0b6_5px,#c4c0b6_10px)] flex items-center px-[2cqw] gap-[2cqw] shrink-0">
        <div className="flex-1">
          <div className="text-[1.8cqw] font-serif font-bold text-[#444] leading-[1.2]">Ihr zuverlässiger Baupartner seit 1998</div>
          <div className="text-[1.1cqw] text-[#666] mt-[0.5cqw]">Hochbau · Tiefbau · Sanierung · Abbruch</div>
        </div>
        <div className="shrink-0 bg-[#8a6d3b] text-white text-[1cqw] px-[1.5cqw] py-[0.8cqw] whitespace-nowrap">Kontakt aufnehmen</div>
      </div>
      {/* 3-column desktop layout */}
      <div className="flex flex-1 overflow-hidden text-[1.1cqw]">
        {/* Left sidebar: navigation */}
        <div className="w-[22%] bg-[#dedad3] border-r border-[#ccc] shrink-0 px-[1.2cqw] py-[1.5cqw]">
          <div className="font-bold text-[1.3cqw] text-[#555] mb-[0.8cqw] pb-[0.5cqw] border-b border-[#bbb]">Leistungen</div>
          {["Hochbau","Tiefbau","Sanierung","Abbruch","Erdbau","Rohbau","Pflaster","Fassade","Innenausbau"].map(s => (
            <div key={s} className="py-[0.45cqw] border-b border-[#d0ccc4] text-[#777] text-[1cqw]">{s}</div>
          ))}
        </div>
        {/* Main content */}
        <div className="flex-1 px-[1.5cqw] py-[1.5cqw] overflow-hidden">
          <h4 className="font-serif text-[2.2cqw] text-[#444] font-bold mb-[1cqw]">Willkommen auf unserer Webseite!</h4>
          <div className="text-[1.1cqw] text-[#666] mb-[1.5cqw] leading-[1.4]">
            Die MusterBau GmbH ist Ihr kompetenter Ansprechpartner für alle Bauleistungen.
          </div>
          {/* 2-col news grid */}
          <div className="grid grid-cols-2 gap-[1cqw] mb-[1.5cqw]">
            {[
              { t: "Neues Projekt", d: "Wohnanlage Feldstraße fertiggestellt" },
              { t: "Stellenangebot", d: "Polier (m/w/d) ab sofort gesucht" },
            ].map(item => (
              <div key={item.t} className="border border-[#ccc] bg-white p-[0.8cqw]">
                <div className="bg-[repeating-linear-gradient(45deg,#eee,#eee_3px,#e5e3dc_3px,#e5e3dc_6px)] h-[5cqw] mb-[0.6cqw]" />
                <div className="font-bold text-[1.1cqw] text-[#8a6d3b]">{item.t}</div>
                <div className="text-[1cqw] text-[#777] mt-[0.3cqw]">{item.d}</div>
                <span className="text-[0.9cqw] text-[#8a6d3b] underline">mehr lesen »</span>
              </div>
            ))}
          </div>
          {/* Filler text lines */}
          <div className="h-[1cqw] bg-[#ccc] rounded-full mb-[0.6cqw] w-[92%]" />
          <div className="h-[1cqw] bg-[#ccc] rounded-full mb-[0.6cqw] w-[78%]" />
          <div className="h-[1cqw] bg-[#ccc] rounded-full mb-[0.6cqw] w-[85%]" />
          <div className="h-[1cqw] bg-[#ccc] rounded-full mb-[0.6cqw] w-[65%]" />
          <div className="h-[1cqw] bg-[#ccc] rounded-full mb-[0.6cqw] w-[71%]" />
          <div className="h-[1cqw] bg-[#ccc] rounded-full mb-[0.6cqw] w-[88%]" />
          {/* Wide table — causes visual overflow */}
          <div className="mt-[1.5cqw] border border-[#ccc] overflow-hidden">
            <div className="flex bg-[#8a6d3b] text-white text-[0.9cqw]">
              {["Leistung","Ort","Status","Auftraggeber","Fertigstellung"].map(h => (
                <div key={h} className="flex-1 px-[0.7cqw] py-[0.5cqw] border-r border-[#9a7d4b] last:border-0 whitespace-nowrap">{h}</div>
              ))}
            </div>
            {[
              ["Tiefbau A1","München","laufend","Stadt München","Q3 2024"],
              ["Hochbau B2","Augsburg","geplant","Privat","Q1 2025"],
            ].map((row, i) => (
              <div key={i} className={`flex text-[0.9cqw] ${i % 2 === 0 ? "bg-white" : "bg-[#f5f3ee]"}`}>
                {row.map(cell => (
                  <div key={cell} className="flex-1 px-[0.7cqw] py-[0.5cqw] border-r border-[#ddd] last:border-0 text-[#666] whitespace-nowrap">{cell}</div>
                ))}
              </div>
            ))}
          </div>
          {/* Über uns teaser */}
          <div className="mt-[1.5cqw] border border-[#ccc] bg-white p-[0.8cqw]">
            <div className="font-bold text-[1.2cqw] text-[#555] mb-[0.5cqw]">Über die MusterBau GmbH</div>
            <div className="h-[1cqw] bg-[#ddd] rounded-full mb-[0.4cqw] w-[95%]" />
            <div className="h-[1cqw] bg-[#ddd] rounded-full mb-[0.4cqw] w-[88%]" />
            <div className="h-[1cqw] bg-[#ddd] rounded-full mb-[0.4cqw] w-[92%]" />
            <div className="h-[1cqw] bg-[#ddd] rounded-full mb-[0.6cqw] w-[75%]" />
            <span className="text-[0.9cqw] text-[#8a6d3b] underline">» mehr erfahren</span>
          </div>
          {/* More filler text */}
          <div className="h-[1cqw] bg-[#ccc] rounded-full mb-[0.6cqw] w-[88%] mt-[1.5cqw]" />
          <div className="h-[1cqw] bg-[#ccc] rounded-full mb-[0.6cqw] w-[72%]" />
          <div className="h-[1cqw] bg-[#ccc] rounded-full mb-[0.6cqw] w-[81%]" />
          <div className="h-[1cqw] bg-[#ccc] rounded-full mb-[0.6cqw] w-[60%]" />
        </div>
        {/* Right sidebar: contact */}
        <div className="w-[26%] bg-[#f0ece5] border-l border-[#ccc] shrink-0 px-[1.2cqw] py-[1.5cqw]">
          <div className="font-bold text-[1.3cqw] text-[#555] mb-[0.8cqw] pb-[0.5cqw] border-b border-[#bbb]">Kontakt</div>
          <div className="text-[1.1cqw] text-[#666] leading-[1.8]">
            <div>MusterBau GmbH</div>
            <div>Baustraße 12</div>
            <div>12345 Musterstadt</div>
            <div className="mt-[0.5cqw]">Tel.: 01234/56789</div>
            <div>Fax: 01234/56780</div>
          </div>
          <div className="mt-[1.5cqw] bg-[#8a6d3b] text-white text-center text-[1.1cqw] p-[0.8cqw] cursor-pointer">
            Jetzt anfragen
          </div>
          <div className="font-bold text-[1.3cqw] text-[#555] mt-[1.5cqw] mb-[0.7cqw]">Aktuelles</div>
          {["Neues Projekt in München...","Offene Stellen 2024...","Messe Stuttgart..."].map(n => (
            <div key={n} className="text-[1cqw] text-[#8a6d3b] underline mb-[0.5cqw]">{n}</div>
          ))}
          <div className="font-bold text-[1.3cqw] text-[#555] mt-[1.5cqw] mb-[0.7cqw]">Zertifizierungen</div>
          <div className="grid grid-cols-2 gap-[0.7cqw]">
            {[1,2,3,4].map(i => (
              <div key={i} className="h-[4cqw] bg-[#d8d3ca] border border-[#bbb]" />
            ))}
          </div>
          <div className="font-bold text-[1.3cqw] text-[#555] mt-[1.5cqw] mb-[0.7cqw]">Folgen Sie uns</div>
          <div className="flex gap-[0.7cqw]">
            {["f","in","xing"].map(s => (
              <div key={s} className="w-[4cqw] h-[4cqw] bg-[#8a6d3b] text-white text-[1cqw] grid place-items-center font-bold">{s}</div>
            ))}
          </div>
          <div className="mt-[1.5cqw] border border-[#ccc] bg-[#eae8e0] p-[0.7cqw]">
            <div className="font-bold text-[1.1cqw] text-[#555] mb-[0.5cqw]">Wetter Musterstadt</div>
            <div className="flex items-center gap-[1cqw]">
              <div className="text-[4cqw] leading-none">☀</div>
              <div>
                <div className="text-[1.8cqw] font-bold text-[#444]">18°C</div>
                <div className="text-[1cqw] text-[#777]">Sonnig, wenig Wind</div>
              </div>
            </div>
          </div>
          <div className="font-bold text-[1.3cqw] text-[#555] mt-[1.5cqw] mb-[0.7cqw]">Newsletter</div>
          <div className="border border-[#bbb] bg-white text-[1cqw] text-[#aaa] px-[0.7cqw] py-[0.6cqw] mb-[0.5cqw]">E-Mail-Adresse eingeben</div>
          <div className="bg-[#8a6d3b] text-white text-[1cqw] text-center py-[0.6cqw]">Anmelden</div>
        </div>
      </div>
      {/* Footer */}
      <div className="bg-[#444] text-white px-[2cqw] py-[1.5cqw] flex justify-between items-center text-[1cqw] shrink-0">
        <span>© 2014 MusterBau GmbH – Alle Rechte vorbehalten</span>
        <span className="flex gap-[1.5cqw]">
          <span>Impressum</span><span>Datenschutz</span><span>AGB</span><span>Sitemap</span>
        </span>
      </div>
    </div>
  )
}

// ---------- New (after) website — mobile-first redesign ----------

function AfterWebsite() {
  return (
    <div className="absolute inset-0 isolate flex flex-col bg-[#f4f2ec] font-sans overflow-hidden">

      {/* Status bar — dark icons on light */}
      <div className="flex items-center justify-between px-[4cqw] h-[5.5cqw] shrink-0">
        <span className="text-[1.6cqw] font-semibold text-[#15151a]">9:41</span>
        <div className="flex items-center gap-[1.2cqw]">
          <div className="flex items-end gap-[0.4cqw] h-[2.2cqw]">
            <div className="w-[0.8cqw] bg-[#15151a] rounded-[0.2cqw]" style={{ height: "30%" }} />
            <div className="w-[0.8cqw] bg-[#15151a] rounded-[0.2cqw]" style={{ height: "55%" }} />
            <div className="w-[0.8cqw] bg-[#15151a] rounded-[0.2cqw]" style={{ height: "78%" }} />
            <div className="w-[0.8cqw] bg-[#15151a] rounded-[0.2cqw]" style={{ height: "100%" }} />
          </div>
          <div className="flex items-center gap-[0.3cqw]">
            <div className="w-[5cqw] h-[2.2cqw] border border-[#15151a] rounded-[0.4cqw] p-[0.3cqw]">
              <div className="h-full w-[75%] bg-[#15151a] rounded-[0.2cqw]" />
            </div>
            <div className="w-[0.5cqw] h-[1.2cqw] bg-[#15151a] rounded-r-[0.2cqw]" />
          </div>
        </div>
      </div>

      {/* Nav */}
      <div className="flex items-center justify-between px-[5cqw] py-[2cqw] shrink-0">
        <span className="font-extrabold text-[3.2cqw] tracking-[-0.02em] text-[#15151a]">
          muster<b className="text-[#F703EB]">bau</b>
        </span>
        <div className="flex flex-col gap-[0.8cqw]">
          <div className="w-[5.5cqw] h-[0.5cqw] bg-[#15151a] rounded-full" />
          <div className="w-[3.8cqw] h-[0.5cqw] bg-[#15151a] rounded-full ml-auto" />
          <div className="w-[5.5cqw] h-[0.5cqw] bg-[#15151a] rounded-full" />
        </div>
      </div>

      {/* ===== Body ===== */}
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden">

        {/* Hero copy — editorial, generous space */}
        <div className="px-[7cqw] pt-[2.5cqw]">
          <p className="text-[1.45cqw] font-bold tracking-[0.24em] text-[#F703EB] uppercase mb-[1.4cqw]">Bauen mit Weitblick</p>
          <h1 className="font-serif text-[5.4cqw] leading-[1.12] text-[#15151a] tracking-[-0.02em] mb-[1.6cqw]">
            Wir bauen, worauf <em className="not-italic text-[#F703EB]">Sie</em> sich verlassen.
          </h1>
          <p className="text-[1.8cqw] text-[#6b6b73] leading-[1.55] mb-[2.4cqw] max-w-[86%]">
            Ihr Partner für anspruchsvolle Bauprojekte.
          </p>
          <div className="inline-flex items-center gap-[1.2cqw] bg-[#15151a] text-white text-[1.95cqw] font-semibold px-[3.8cqw] py-[2.1cqw] rounded-full shadow-[0_2cqw_6cqw_-2cqw_rgba(21,21,26,0.4)]">
            Beratung anfragen
            <span className="text-[1.8cqw]">→</span>
          </div>
        </div>

        {/* Architectural "photo" — glass tower at golden hour, built in CSS */}
        <div className="relative mx-[5cqw] mt-[3.5cqw] overflow-hidden rounded-[3cqw] h-[40cqw] shadow-[0_5cqw_16cqw_-6cqw_rgba(21,21,26,0.34)]">
          {/* Sky */}
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg,#8ea2b6 0%,#b7c4cf 34%,#d8dde0 60%,#ece7df 100%)" }} />
          {/* Soft sun glow (golden hour) */}
          <div className="absolute inset-0" style={{ background: "radial-gradient(38% 30% at 80% 16%, rgba(255,243,222,0.85), transparent 68%)" }} />

          {/* Rear, lower volume — depth on the left */}
          <div
            className="absolute bottom-0 left-[-3%] top-[50%] w-[30%]"
            style={{
              backgroundColor: "#445566",
              backgroundImage:
                "linear-gradient(180deg, rgba(168,182,196,0.85), rgba(48,60,73,0.96))," +
                "repeating-linear-gradient(0deg, rgba(9,14,20,0.40) 0 1px, transparent 1px, transparent 12%)," +
                "repeating-linear-gradient(90deg, rgba(9,14,20,0.30) 0 1px, transparent 1px, transparent 22%)",
            }}
          />

          {/* Main glass facade */}
          <div
            className="absolute bottom-0 left-[20%] right-[-4%] top-[30%] overflow-hidden"
            style={{
              backgroundColor: "#5d7185",
              backgroundImage:
                "linear-gradient(160deg, rgba(226,236,243,0.92) 0%, rgba(150,170,188,0.6) 34%, rgba(86,104,122,0.85) 64%, rgba(52,66,80,0.96) 100%)," +
                "repeating-linear-gradient(0deg, rgba(8,13,18,0.34) 0 1px, transparent 1px, transparent 8.5%)," +
                "repeating-linear-gradient(90deg, rgba(8,13,18,0.24) 0 1px, transparent 1px, transparent 6.5%)",
              boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.10)",
            }}
          >
            {/* Glass reflection sweep */}
            <div className="absolute inset-0" style={{ background: "linear-gradient(118deg, transparent 36%, rgba(255,255,255,0.34) 47%, transparent 56%)" }} />
            {/* Bright left corner edge */}
            <div className="absolute inset-y-0 left-0 w-[2.5%]" style={{ background: "linear-gradient(90deg, rgba(255,255,255,0.55), transparent)" }} />
            {/* Lit windows — a few warm/cool highlights */}
            {[
              { l: "10%", t: "20%", warm: true },
              { l: "32%", t: "44%", warm: false },
              { l: "60%", t: "30%", warm: true },
              { l: "18%", t: "66%", warm: false },
              { l: "72%", t: "58%", warm: true },
              { l: "47%", t: "74%", warm: false },
            ].map((w, i) => (
              <div
                key={i}
                className="absolute rounded-[0.3cqw]"
                style={{
                  left: w.l,
                  top: w.t,
                  width: "5.5%",
                  height: "6%",
                  background: w.warm ? "rgba(255,225,170,0.85)" : "rgba(215,235,250,0.8)",
                  boxShadow: w.warm
                    ? "0 0 1.4cqw rgba(255,214,150,0.7)"
                    : "0 0 1.2cqw rgba(200,228,250,0.6)",
                }}
              />
            ))}
          </div>

          {/* Roofline highlight where sky meets facade */}
          <div className="absolute left-[20%] right-[-4%] top-[30%] h-px" style={{ background: "rgba(255,255,255,0.4)" }} />

          {/* Atmospheric haze at the base */}
          <div className="absolute inset-x-0 bottom-0 h-[34%]" style={{ background: "linear-gradient(to top, rgba(236,231,223,0.7), transparent)" }} />
          {/* Grain texture for a photographic finish */}
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.12] mix-blend-overlay"
            style={{ backgroundImage: "url(/assets/grain.webp)", backgroundSize: "160px" }}
          />
          {/* Vignette */}
          <div aria-hidden className="absolute inset-0" style={{ boxShadow: "inset 0 0 10cqw 2cqw rgba(18,26,36,0.34)" }} />

          {/* Label */}
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(15,19,26,0.6), transparent 44%)" }} />
          <span className="absolute top-[2.4cqw] left-[2.4cqw] bg-white/85 text-[#15151a] text-[1.1cqw] font-semibold tracking-[0.08em] uppercase px-[1.8cqw] py-[0.7cqw] rounded-full">Referenzprojekt</span>
          <div className="absolute bottom-[2.6cqw] left-[3cqw] right-[3cqw]">
            <p className="text-[2cqw] font-bold text-white leading-none">Verwaltungsgebäude Süd</p>
            <p className="text-[1.2cqw] text-white/75 mt-[0.6cqw]">Hochbau · 2024</p>
          </div>
        </div>

        {/* Floating stat card — overlaps the image, right-aligned */}
        <div className="relative z-10 -mt-[5cqw] mr-[5cqw] ml-auto flex w-max items-center gap-[2.2cqw] rounded-[2.4cqw] border border-[rgba(21,21,26,0.06)] bg-white px-[3cqw] py-[1.9cqw] shadow-[0_4cqw_14cqw_-4cqw_rgba(21,21,26,0.28)]">
          <div className="flex flex-col">
            <span className="font-serif text-[3.2cqw] leading-none text-[#15151a]">4,9</span>
            <span className="mt-[0.6cqw] text-[1.4cqw] leading-none tracking-[0.1em] text-[#c9a14a]">★★★★★</span>
          </div>
          <div className="h-[6cqw] w-px bg-[rgba(21,21,26,0.12)]" />
          <div>
            <p className="text-[2cqw] font-bold leading-none text-[#15151a]">200+</p>
            <p className="mt-[0.6cqw] text-[1.1cqw] text-[#6b6b73]">Zufriedene Kunden</p>
          </div>
        </div>

        {/* Leistungen — what we do */}
        <div className="px-[7cqw] mt-[5cqw]">
          <p className="text-[1.25cqw] font-semibold uppercase tracking-[0.22em] text-[#9a9aa2]">Unsere Leistungen</p>
          <div className="mt-[2.2cqw] grid grid-cols-2 gap-x-[3cqw] gap-y-[1.8cqw]">
            {["Hochbau", "Tiefbau", "Sanierung", "Schlüsselfertiges Bauen"].map((s) => (
              <div key={s} className="flex items-center gap-[1.4cqw]">
                <span className="h-[1.1cqw] w-[1.1cqw] shrink-0 rounded-full bg-[#F703EB]" />
                <span className="text-[1.5cqw] font-medium leading-tight text-[#15151a]">{s}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 3 stat tiles */}
        <div className="px-[7cqw] grid grid-cols-3 gap-[2cqw] mt-[5cqw]">
          {[
            { v: "120+", l: "Projekte" },
            { v: "15 J.", l: "Erfahrung" },
            { v: "98 %", l: "Weiterempfehlung" },
          ].map(({ v, l }) => (
            <div key={l} className="bg-white border border-[rgba(21,21,26,0.06)] rounded-[2cqw] py-[2.5cqw] px-[1cqw] text-center shadow-sm">
              <p className="font-serif text-[3cqw] text-[#15151a] leading-none">{v}</p>
              <p className="text-[1.2cqw] text-[#6b6b73] mt-[0.7cqw] leading-tight">{l}</p>
            </div>
          ))}
        </div>

        {/* Testimonial */}
        <div className="mx-[5cqw] mt-[5cqw] rounded-[2.5cqw] border border-[rgba(21,21,26,0.06)] bg-white p-[3.2cqw] shadow-sm">
          <p className="font-serif text-[1.9cqw] leading-[1.4] text-[#15151a]">„Termintreu, sauber, transparent — genau so stellt man sich einen Baupartner vor.“</p>
          <div className="mt-[2cqw] flex items-center gap-[1.6cqw]">
            <div className="h-[4cqw] w-[4cqw] shrink-0 rounded-full bg-[#cdd3da]" />
            <div>
              <p className="text-[1.3cqw] font-semibold leading-none text-[#15151a]">M. Bauer</p>
              <p className="mt-[0.5cqw] text-[1.1cqw] text-[#6b6b73]">Geschäftsführer · Bauer GmbH</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-[7cqw] pt-[4cqw] pb-[3cqw] mt-auto flex items-center justify-between shrink-0">
          <span className="font-extrabold text-[2cqw] tracking-[-0.02em] text-[#15151a]">muster<b className="text-[#F703EB]">bau</b></span>
          <span className="flex gap-[2cqw] text-[1.4cqw] text-[#8a8a92]">
            <span>Impressum</span><span>Datenschutz</span>
          </span>
        </div>

      </div>
    </div>
  )
}

// ---------- Logo Strip ----------

export function LogoStrip({ label, names }: { label: string; names: string[] }) {
  const doubled = [...names, ...names]
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="py-5 sm:py-[30px] border-y border-[rgba(21,21,26,0.06)] overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <p className="text-center text-[0.8rem] text-[#8a8a96] tracking-[0.1em] mb-4 sm:mb-6 uppercase font-semibold">{label}</p>
      </div>
      <div
        className="relative overflow-hidden"
        style={{
          WebkitMaskImage: "linear-gradient(90deg,transparent,#000 9%,#000 91%,transparent)",
          maskImage: "linear-gradient(90deg,transparent,#000 9%,#000 91%,transparent)",
        }}
      >
        <motion.div
          className="flex w-max items-center gap-[clamp(28px,4vw,56px)]"
          animate={shouldReduceMotion ? undefined : { x: ["0%", "-50%"] }}
          transition={{ duration: 30, ease: "linear", repeat: Infinity }}
        >
          {doubled.map((name, i) => (
            <span key={i} className="flex items-center gap-[clamp(14px,2vw,28px)] whitespace-nowrap">
              <span className="font-bold text-[clamp(1.05rem,1.5vw,1.35rem)] tracking-[-0.01em] text-[#15151a] opacity-55">
                {name}
              </span>
              {i < doubled.length - 1 && (
                <span className="inline-block h-[6px] w-[6px] shrink-0 rounded-full bg-[#F703EB] opacity-50" />
              )}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ---------- Main Hero ----------

const frameChildVariants = {
  hidden: { opacity: 0, y: 22, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

// Cinematic, staggered entrance for the hero copy
const heroTextContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
}
const heroTextItem = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

export default function HeroSection({ lang, dict }: HeroSectionProps) {
  const containerRef = useRef<HTMLElement>(null)
  const shouldReduceMotion = useReducedMotion()

  // Toggle the scroll-driven frame growth. Flip to true to restore the cinematic morph.
  const SCROLL_ANIMATIONS_ENABLED = false

  const hero = dict.servicesWebsite.hero
  const eyebrow = dict.servicesWebsite.eyebrows.hero

  // ── Scroll-driven motion (kept for one-line restore) ─────────────
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })
  const easeOutCubic = cubicBezier(0.33, 1, 0.68, 1)
  const heroTextOpacity = useTransform(scrollYProgress, [0.04, 0.14], [1, 0])
  const heroTextY = useTransform(scrollYProgress, [0.04, 0.14], [0, -36])
  const frameWidth = useTransform(scrollYProgress, [0.05, 0.32], ["620px", "880px"], { ease: easeOutCubic })
  const frameHeight = useTransform(scrollYProgress, [0.05, 0.32], ["540px", "620px"], { ease: easeOutCubic })
  const frameX = useTransform(scrollYProgress, [0.05, 0.32], ["20vw", "0vw"], { ease: easeOutCubic })
  const frameScale = useTransform(scrollYProgress, [0.05, 0.3], [0.94, 1], { ease: easeOutCubic })
  const frameZ = useTransform(scrollYProgress, [0.05, 0.3], [-160, 0], { ease: easeOutCubic })

  const useStaticIdleLayout = !SCROLL_ANIMATIONS_ENABLED

  const heroTextStyle = shouldReduceMotion
    ? { opacity: 1, y: 0 }
    : useStaticIdleLayout
      ? { opacity: 1, y: 0 }
      : { opacity: heroTextOpacity, y: heroTextY }
  const frameWrapperStyle = shouldReduceMotion
    ? { x: "20vw" }
    : useStaticIdleLayout
      ? { x: "20vw" }
      : { x: frameX }
  // NOTE: the idle frame renders at its final size with NO scale/z/perspective.
  // A 3D transform (z + perspective) or sub-1 scale would rasterise the frame as a
  // GPU layer and downscale the texture — which smears the tiny cqw text inside the
  // before/after mockups. Keeping transform-free renders the text pixel-crisp.
  const frameStyle = shouldReduceMotion
    ? { width: "600px", height: "520px", maxWidth: "calc(100vw - 96px)" }
    : useStaticIdleLayout
      ? { width: "600px", height: "520px", maxWidth: "calc(100vw - 96px)" }
      : {
          width: frameWidth,
          height: frameHeight,
          scale: frameScale,
          z: frameZ,
          transformPerspective: 2000,
          maxWidth: "calc(100vw - 96px)",
        }

  return (
    <>
      {/* MOBILE / TABLET — < lg (1024px). Stacked layout with the slider as preview. */}
      <section className="relative overflow-hidden lg:hidden">
        {/* Background glows */}
        <div
          aria-hidden
          className="pointer-events-none absolute -z-10 right-[-12%] top-[8%] h-[420px] w-[560px] rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(247,3,235,0.12),_transparent_62%)] blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -z-10 left-[-18%] top-[55%] h-[380px] w-[520px] rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(247,3,235,0.08),_transparent_62%)] blur-3xl"
        />

        <div className="mx-auto max-w-[760px] px-5 pt-16 pb-12 sm:px-6 sm:pt-20 sm:pb-16 md:max-w-[920px] md:px-8 md:pt-24 md:pb-20">
          {/* Hero text — cinematic staggered reveal */}
          <motion.div
            initial={shouldReduceMotion ? false : "hidden"}
            animate={shouldReduceMotion ? undefined : "visible"}
            variants={heroTextContainer}
            className="text-center"
          >
            <motion.span variants={heroTextItem} className="section-eyebrow">{eyebrow}</motion.span>
            <motion.h1 variants={heroTextItem} className="mx-auto mt-3 max-w-[20ch] font-serif text-[2.05rem] leading-[1.05] tracking-tight text-[#15151a] sm:text-[2.5rem] md:text-[3rem]">
              {hero.title}{" "}
              <em className="not-italic text-[#F703EB]">{hero.titleHighlight}</em>
            </motion.h1>
            <motion.p variants={heroTextItem} className="mx-auto mt-4 max-w-[58ch] text-[0.95rem] leading-relaxed text-[#50505c] sm:text-[1rem] md:mt-5 md:text-[1.05rem]">
              {hero.description}
            </motion.p>
            <motion.div variants={heroTextItem}>
              <HeroPackages hero={hero} align="center" />
            </motion.div>
            <motion.div variants={heroTextItem} className="mt-6 sm:mt-7">
              <CtaRow hero={hero} align="center" magnetic={false} />
            </motion.div>
          </motion.div>

          {/* Slider — the hero moment */}
          <div className="relative mt-12 sm:mt-16">
            {/* Ambient glow behind the slider */}
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[110%] w-[108%] -translate-x-1/2 -translate-y-1/2 rounded-[48px] bg-[radial-gradient(ellipse_at_center,rgba(247,3,235,0.11),transparent_70%)] blur-2xl"
            />
            <motion.div
              initial={shouldReduceMotion ? false : "hidden"}
              whileInView={shouldReduceMotion ? undefined : "visible"}
              viewport={{ once: true, margin: "-80px" }}
              variants={{
                hidden: { opacity: 0, y: 40, scale: 0.97 },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1], staggerChildren: 0.16, delayChildren: 0.2 },
                },
              }}
              className="relative mx-auto w-full max-w-[540px] overflow-hidden rounded-[22px] border border-white/70 bg-white/92 p-3 shadow-[0_24px_60px_-28px_rgba(247,3,235,0.13),0_8px_24px_rgba(15,23,42,0.06)] backdrop-blur-2xl md:rounded-[28px]"
            >
              {/* Subtle top sheen */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent"
              />
              <motion.div variants={frameChildVariants}>
                <BeforeAfterSlider
                  beforeLabel={hero.beforeLabel}
                  afterLabel={hero.afterLabel}
                  sliderHint={hero.sliderHint}
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* DESKTOP — >= lg (pinned hero) */}
      <section
        ref={containerRef}
        className={cx(
          "relative hidden lg:block",
          SCROLL_ANIMATIONS_ENABLED ? "lg:h-[420vh]" : "lg:h-screen",
        )}
      >
        <div className="sticky top-0 h-[100dvh] overflow-hidden">
          {/* Background glow — right side, behind the frame */}
          <div
            aria-hidden
            className="pointer-events-none absolute right-[5%] top-1/2 -z-10 h-[480px] w-[680px] -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(247,3,235,0.10),_transparent_62%)] blur-2xl"
          />

          {/* HERO TEXT — left column */}
          <motion.div
            style={heroTextStyle}
            className="pointer-events-none absolute inset-0 z-10 flex items-center"
          >
            <div className="mx-auto w-full max-w-[1380px] px-10">
              <div className="grid grid-cols-[1fr_1.25fr] items-center gap-10">
                <div className="pointer-events-auto text-left">
                  <span className="section-eyebrow">{eyebrow}</span>

                  <div
                    role="presentation"
                    aria-hidden="true"
                    className="mx-0 mt-2 max-w-[16ch] font-serif text-[2.8rem] leading-[1.05] text-[#15151a] xl:text-[3.2rem] 2xl:text-[3.6rem]"
                  >
                    {hero.title}{" "}
                    <em className="not-italic text-[#F703EB]">{hero.titleHighlight}</em>
                  </div>

                  <p className="mx-0 mt-5 max-w-[52ch] text-[0.98rem] leading-relaxed text-[#50505c] xl:text-[1.05rem]">
                    {hero.description}
                  </p>

                  <HeroPackages hero={hero} />

                  <div className="mt-9">
                    <CtaRow hero={hero} align="left" magnetic />
                  </div>
                </div>
                <div />
              </div>
            </div>
          </motion.div>

          {/* SINGLE FLOATING FRAME — holds the before/after slider */}
          <motion.div
            style={frameWrapperStyle}
            className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center"
          >
            <motion.div
              style={frameStyle}
              className="pointer-events-auto relative overflow-hidden rounded-[28px] border border-white/70 bg-white/84 p-3 shadow-[0_34px_100px_rgba(15,23,42,0.12)] backdrop-blur-2xl"
            >
              {/* Top sheen */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent"
              />
              <BeforeAfterSlider
                beforeLabel={hero.beforeLabel}
                afterLabel={hero.afterLabel}
                sliderHint={hero.sliderHint}
                fill
              />
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
