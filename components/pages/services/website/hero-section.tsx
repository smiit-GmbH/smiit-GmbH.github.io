"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import type { Locale } from "@/lib/dictionary"

interface HeroSectionProps {
  lang: Locale
  dict: any
}

// ---------- Before/After Slider ----------

function BeforeAfterSlider({ beforeLabel, afterLabel, sliderHint }: { beforeLabel: string; afterLabel: string; sliderHint: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState(50)
  const dragging = useRef(false)
  const hasInteracted = useRef(false)
  const touchStart = useRef<{ x: number; y: number } | null>(null)
  const shouldReduceMotion = useReducedMotion()

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

  // Hint animation
  useEffect(() => {
    if (shouldReduceMotion) return

    const easeInOut = (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t

    const keyframes: [number, number][] = [
      [0,    50],
      [800,  32],
      [1800, 66],
      [2800, 50],
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
  }, [shouldReduceMotion])

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
    <div className="flex flex-col">
      {/* Slider — portrait phone ratio on mobile, landscape on desktop */}
      <div
        ref={containerRef}
        className="relative select-none overflow-hidden rounded-[26px] shadow-[0_30px_70px_-20px_rgba(21,21,26,0.22)] bg-white @container aspect-[9/14] lg:aspect-[5/4]"
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
            style={{ top: "50%", left: "25%", transform: "translate(-50%, -50%)", color: "rgba(21,21,26,0.34)", textShadow: "0 1px 14px rgba(255,255,255,0.5)" }}
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
            style={{ top: "50%", left: "75%", transform: "translate(-50%, -50%)", color: "rgba(255,255,255,0.82)", textShadow: "0 2px 18px rgba(0,0,0,0.35)" }}
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
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[44px] h-[44px] sm:w-[52px] sm:h-[52px] rounded-full bg-[#e6009b] text-white grid place-items-center shadow-[0_18px_40px_-12px_rgba(230,0,155,0.45)] cursor-ew-resize"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px] sm:w-[22px] sm:h-[22px]">
              <path d="M9 6l-6 6 6 6M15 6l6 6-6 6"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Hint */}
      <p className="mt-3 flex items-center justify-center gap-2 text-[0.82rem] text-[#8a8a96]">
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
    <div className="absolute inset-0 flex flex-col bg-[#f3f1ec] font-sans overflow-hidden">
      {/* Phone status bar */}
      <div className="flex items-center justify-between px-[4cqw] h-[6cqw] bg-white shrink-0">
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

      {/* Mobile nav */}
      <div className="flex items-center justify-between px-[5cqw] py-[2.5cqw] bg-white border-b border-[rgba(21,21,26,0.06)] shrink-0">
        <span className="font-extrabold text-[3.2cqw] tracking-[-0.02em]">
          muster<b className="text-[#2160b8]">bau</b>
        </span>
        <div className="flex flex-col gap-[0.8cqw]">
          <div className="w-[5.5cqw] h-[0.5cqw] bg-[#15151a] rounded-full" />
          <div className="w-[3.8cqw] h-[0.5cqw] bg-[#15151a] rounded-full ml-auto" />
          <div className="w-[5.5cqw] h-[0.5cqw] bg-[#15151a] rounded-full" />
        </div>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-hidden flex flex-col">

        {/* Hero */}
        <div className="px-[7cqw] pt-[5cqw] pb-[4cqw]">
          <p className="text-[1.5cqw] font-bold tracking-[0.2em] text-[#e6009b] uppercase mb-[2cqw]">Bauen mit Weitblick</p>
          <h1 className="font-serif text-[5.5cqw] leading-[1.1] text-[#15151a] tracking-[-0.02em] mb-[2.5cqw]">
            Wir bauen,<br />worauf <em className="text-[#e6009b] not-italic">Sie</em><br />sich verlassen.
          </h1>
          <p className="text-[1.9cqw] text-[#50505c] leading-[1.5] mb-[3.5cqw]">
            Von der Planung bis zur Fertigstellung – Ihr Partner für professionelle Bauprojekte.
          </p>
          <div className="bg-[#e6009b] text-white text-center text-[2.2cqw] font-bold py-[2.8cqw] rounded-full shadow-[0_4px_16px_rgba(230,0,155,0.32)] mb-[1.5cqw]">
            Lassen Sie sich beraten
          </div>
          <p className="text-center text-[1.5cqw] text-[#8a8a96]">Kostenlos · Unverbindlich · In 24h</p>
        </div>

        {/* Two project cards side by side */}
        <div className="mx-[5cqw] flex gap-[2cqw] mb-[4cqw] shrink-0">
          <div className="flex-1 rounded-[2.5cqw] bg-[linear-gradient(140deg,#c7d4ff,#a8c4ff)] h-[22cqw] relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.55),transparent_60%)]" />
            <div className="absolute bottom-[2cqw] left-[2cqw] right-[2cqw]">
              <div className="bg-white/80 px-[2cqw] py-[1cqw] rounded-[1.5cqw]">
                <p className="text-[1.4cqw] font-bold text-[#15151a] leading-none">Projekt A</p>
                <p className="text-[1.1cqw] text-[#50505c] mt-[0.4cqw]">Wohnbau · 2023</p>
              </div>
            </div>
          </div>
          <div className="flex-1 rounded-[2.5cqw] bg-[linear-gradient(140deg,#e7d2f5,#ffd2ec)] h-[22cqw] relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_25%,rgba(255,255,255,0.55),transparent_60%)]" />
            <div className="absolute bottom-[2cqw] left-[2cqw] right-[2cqw]">
              <div className="bg-white/80 px-[2cqw] py-[1cqw] rounded-[1.5cqw]">
                <p className="text-[1.4cqw] font-bold text-[#15151a] leading-none">Projekt B</p>
                <p className="text-[1.1cqw] text-[#50505c] mt-[0.4cqw]">Tiefbau · 2024</p>
              </div>
            </div>
          </div>
        </div>

        {/* 3 stat tiles — extra horizontal padding creates the narrow phone-column feel */}
        <div className="px-[7cqw] grid grid-cols-3 gap-[2cqw] mb-[4cqw]">
          {[
            { v: "120+", l: "Projekte" },
            { v: "15 J.", l: "Erfahrung" },
            { v: "4,9 ★", l: "Bewertung" },
          ].map(({ v, l }) => (
            <div key={l} className="bg-white border border-[rgba(21,21,26,0.06)] rounded-[2cqw] py-[2.5cqw] px-[1cqw] text-center shadow-sm">
              <p className="font-serif text-[3cqw] text-[#e6009b] leading-none">{v}</p>
              <p className="text-[1.3cqw] text-[#50505c] mt-[0.7cqw]">{l}</p>
            </div>
          ))}
        </div>

        {/* CTA block */}
        <div className="mx-[5cqw] bg-[#15151a] rounded-[3cqw] px-[5cqw] py-[5cqw] mb-[4cqw] shrink-0">
          <p className="text-[1.5cqw] font-bold tracking-[0.15em] text-[#e6009b] uppercase mb-[1.5cqw]">Jetzt starten</p>
          <p className="font-serif text-[4cqw] text-white leading-[1.2] mb-[3.5cqw]">
            Ihr Bauprojekt verdient Zuverlässigkeit
          </p>
          <div className="bg-[#e6009b] text-white text-center text-[2cqw] font-bold py-[2.5cqw] rounded-full">
            Jetzt Anfrage stellen →
          </div>
        </div>

        {/* Footer */}
        <div className="px-[7cqw] pb-[3cqw] flex items-center justify-between shrink-0">
          <span className="font-extrabold text-[2cqw] tracking-[-0.02em]">muster<b className="text-[#2160b8]">bau</b></span>
          <span className="flex gap-[2cqw] text-[1.4cqw] text-[#8a8a96]">
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
    <section className="py-[30px] border-y border-[rgba(21,21,26,0.06)] overflow-hidden">
      <div className="mx-auto max-w-[1240px] px-8">
        <p className="text-center text-[0.8rem] text-[#8a8a96] tracking-[0.1em] mb-6 uppercase font-semibold">{label}</p>
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
                <span className="inline-block h-[6px] w-[6px] shrink-0 rounded-full bg-[#e6009b] opacity-50" />
              )}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ---------- Main Hero ----------

export default function HeroSection({ lang, dict }: HeroSectionProps) {
  const shouldReduceMotion = useReducedMotion()
  const hero = dict.servicesWebsite.hero
  const logoStrip = dict.servicesWebsite.logoStrip
  const eyebrow = dict.servicesWebsite.eyebrows.hero

  return (
    <>
      <section className="relative overflow-hidden pt-[116px] pb-[28px]">
        <div aria-hidden className="pointer-events-none absolute -z-10 right-[-8%] top-[10%] h-[500px] w-[600px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(230,0,155,0.09),transparent_62%)] blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -z-10 left-[-15%] top-[40%] h-[400px] w-[520px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(230,0,155,0.07),transparent_62%)] blur-3xl" />

        <div className="mx-auto max-w-[1240px] px-8">
          <div className="grid grid-cols-1 gap-[clamp(36px,4vw,64px)] items-center lg:grid-cols-[1.02fr_1.1fr]">
            {/* Copy */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="section-eyebrow">{eyebrow}</span>
              <h1 className="mt-[18px] font-serif text-[clamp(2.4rem,4.4vw,4rem)] leading-[1.02] tracking-[-0.02em] text-[#15151a]">
                {hero.title}{" "}
                <em className="not-italic text-[#e6009b]">{hero.titleHighlight}</em>
              </h1>
              <p className="mt-[20px] text-[clamp(1.05rem,1.5vw,1.28rem)] text-[#50505c] leading-[1.6] max-w-[46ch]">
                {hero.description}
              </p>
              <div className="mt-[28px] flex flex-wrap gap-[14px]">
                <Link
                  href="https://calendly.com/noahnesslauer/discovery-call"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-[10px] font-semibold text-[1rem] px-[28px] py-[17px] rounded-full bg-[#e6009b] text-white shadow-[0_8px_20px_-6px_rgba(230,0,155,0.30)] transition-all hover:bg-[#c5008a] hover:-translate-y-[2px]"
                >
                  {hero.primaryCta}
                  <ArrowRight className="h-[18px] w-[18px] shrink-0" />
                </Link>
                <a
                  href="#vorgehen"
                  className="hidden sm:inline-flex items-center gap-[10px] font-semibold text-[1rem] px-[28px] py-[17px] rounded-full border border-[rgba(21,21,26,0.1)] bg-white text-[#15151a] transition-all hover:border-[#15151a] hover:-translate-y-[2px]"
                >
                  {hero.secondaryCta}
                </a>
              </div>
            </motion.div>

            {/* Visual */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <BeforeAfterSlider
                beforeLabel={hero.beforeLabel}
                afterLabel={hero.afterLabel}
                sliderHint={hero.sliderHint}
              />
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
