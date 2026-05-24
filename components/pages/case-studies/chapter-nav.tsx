"use client"

import { useEffect, useRef, useState } from "react"
import { useLenis } from "@/components/smooth-scroll-provider"
import type { CaseStudySection } from "@/lib/case-studies"

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ")
}

/** Anchor id of the n-th (1-based) narrative chapter. */
export function chapterId(index: number) {
  return `chapter-${index + 1}`
}

/** Id of the wrapper that holds all narrative chapters (used for visibility). */
export const CHAPTERS_WRAPPER_ID = "case-study-chapters"

/**
 * Discreet vertical anchor rail: one tick per numbered chapter, mirroring the
 * chapter count. Highlights the chapter currently in view, scrolls to a chapter
 * on click, and stays hidden unless the reader is inside the narrative section.
 */
export default function ChapterNav({
  sections,
  label,
}: {
  sections: CaseStudySection[]
  label: string
}) {
  const lenis = useLenis()
  const [active, setActive] = useState(0)
  const [visible, setVisible] = useState(false)
  // Indices whose section is currently crossing the detection band.
  const inViewRef = useRef<Set<number>>(new Set())
  const navRef = useRef<HTMLElement>(null)
  // Touch scrubbing: track whether the finger is down and has actually moved
  // (a real drag) so a drag doesn't also fire the button's tap handler.
  const draggingRef = useRef(false)
  const movedRef = useRef(false)
  const startYRef = useRef(0)

  useEffect(() => {
    const els = sections
      .map((_, i) => document.getElementById(chapterId(i)))
      .filter((el): el is HTMLElement => el !== null)
    if (els.length === 0) return

    // Scrollspy: a thin band near the vertical centre decides the active chapter.
    const spy = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const idx = els.indexOf(entry.target as HTMLElement)
          if (idx === -1) continue
          if (entry.isIntersecting) inViewRef.current.add(idx)
          else inViewRef.current.delete(idx)
        }
        if (inViewRef.current.size > 0) {
          setActive(Math.min(...inViewRef.current))
        }
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    )
    els.forEach((el) => spy.observe(el))

    // Visibility: show the rail only while the chapter block is on screen.
    const wrapper = document.getElementById(CHAPTERS_WRAPPER_ID)
    let vis: IntersectionObserver | undefined
    if (wrapper) {
      vis = new IntersectionObserver(
        ([entry]) => setVisible(entry.isIntersecting),
        // Thin band at the viewport's vertical centre — the nav's own height —
        // so the rail only shows while the chapter block crosses that line.
        { rootMargin: "-50% 0px -50% 0px", threshold: 0 },
      )
      vis.observe(wrapper)
    }

    return () => {
      spy.disconnect()
      vis?.disconnect()
      inViewRef.current.clear()
    }
  }, [sections])

  // Keep the rail pinned to the centre of the *visible* area. `position: fixed`
  // alone tracks the layout viewport, which jumps when mobile browser chrome
  // (URL bar / tab bar) shows or hides — so we follow the visual viewport and
  // write `top` straight to the DOM (no re-render) as the chrome animates.
  useEffect(() => {
    const nav = navRef.current
    const vv = typeof window !== "undefined" ? window.visualViewport : null
    if (!nav || !vv) return
    const update = () => {
      nav.style.top = `${vv.offsetTop + vv.height / 2}px`
    }
    update()
    vv.addEventListener("resize", update)
    vv.addEventListener("scroll", update)
    return () => {
      vv.removeEventListener("resize", update)
      vv.removeEventListener("scroll", update)
    }
  }, [])

  const scrollToIndex = (i: number, immediate = false) => {
    const el = document.getElementById(chapterId(i))
    if (!el) return
    setActive(i)
    if (lenis) lenis.scrollTo(el, { offset: -120, immediate })
    else el.scrollIntoView({ behavior: immediate ? "auto" : "smooth", block: "start" })
  }

  /** Index of the chapter whose tick is closest to a given viewport Y. */
  const indexFromClientY = (clientY: number) => {
    const buttons = navRef.current?.querySelectorAll("button")
    if (!buttons || buttons.length === 0) return null
    let nearest = 0
    let best = Infinity
    buttons.forEach((btn, i) => {
      const r = btn.getBoundingClientRect()
      const dist = Math.abs(r.top + r.height / 2 - clientY)
      if (dist < best) {
        best = dist
        nearest = i
      }
    })
    return nearest
  }

  const onTouchStart = (e: React.TouchEvent) => {
    draggingRef.current = true
    movedRef.current = false
    startYRef.current = e.touches[0].clientY
  }

  // Drag along the rail = scrub: jump straight to the chapter under the finger.
  const onTouchMove = (e: React.TouchEvent) => {
    if (!draggingRef.current) return
    const y = e.touches[0].clientY
    if (!movedRef.current && Math.abs(y - startYRef.current) < 4) return
    movedRef.current = true
    const i = indexFromClientY(y)
    if (i !== null) scrollToIndex(i, true)
  }

  const onTouchEnd = () => {
    draggingRef.current = false
  }

  // Tap / click / keyboard: smooth-scroll to the chapter. Skipped after a drag,
  // whose scrub already handled the scroll.
  const onActivate = (i: number) => {
    if (movedRef.current) {
      movedRef.current = false
      return
    }
    scrollToIndex(i)
  }

  return (
    <nav
      ref={navRef}
      aria-label={label}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      // `top-[50dvh]` is only a fallback (SSR / no visualViewport). The effect
      // sets `top` imperatively on the DOM node — deliberately NOT via a React
      // `style` prop, so re-renders (e.g. the scrollspy updating `active`) can't
      // clobber the live value and make the bar jump.
      className={cx(
        "group/nav fixed right-4 top-[50dvh] z-30 flex -translate-y-1/2 touch-none flex-col items-end transition-opacity duration-300 sm:right-6 lg:right-8 xl:right-12",
        visible ? "opacity-100" : "pointer-events-none opacity-0",
      )}
    >
      {/* Frosted panel sitting only behind the tick column (anchored to the
          right edge so it never widens with the labels). */}
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-y-3 -right-1 -z-10 w-8 rounded-full border border-white/25 bg-white/20 backdrop-blur-sm lg:border-white/40 lg:bg-white/30 lg:shadow-sm lg:backdrop-blur-md"
      />
      {sections.map((section, i) => {
        const isActive = i === active
        const num = String(i + 1).padStart(2, "0")
        return (
          <button
            key={i}
            type="button"
            onClick={() => onActivate(i)}
            aria-label={`${num} — ${section.heading}`}
            aria-current={isActive ? "true" : undefined}
            className="group flex items-center justify-end py-1.5 transition-all duration-300 lg:gap-3 group-hover/nav:py-2"
          >
            {/* Label sits in normal flow so the whole button (label + tick) is one
                continuous hover target — no dead gaps between adjacent chapters. */}
            <span className="hidden grid-cols-[0fr] grid-rows-[0fr] opacity-0 transition-all duration-300 group-hover/nav:grid-cols-[1fr] group-hover/nav:grid-rows-[1fr] group-hover/nav:opacity-100 lg:grid">
              <span className="overflow-hidden">
                <span className="block whitespace-nowrap rounded-md bg-[#0B162D] py-1 pl-2 pr-3 text-[0.7rem] font-medium text-white shadow-md transition-all duration-200 group-hover:text-[0.78rem] group-hover:shadow-xl">
                  <span className="text-slate-400">{num}</span> {section.heading}
                </span>
              </span>
            </span>
            <span className="flex w-6 items-center justify-center">
              <span
                className={cx(
                  "block rounded-full transition-all duration-300",
                  isActive
                    ? "h-[3px] w-5 bg-[var(--area)]"
                    : "h-0.5 w-4 bg-[#0B162D]/70 group-hover:w-[1.125rem] group-hover:bg-[#0B162D]",
                )}
              />
            </span>
          </button>
        )
      })}
    </nav>
  )
}
