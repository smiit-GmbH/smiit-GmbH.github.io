"use client"

import { useEffect, useState } from "react"
import { useLenis } from "@/components/smooth-scroll-provider"
import { cx } from "./text-utils"

export type TocItem = { id: string; text: string; number: number }

/** Left sticky table of contents with scrollspy + click-to-scroll. */
export function BlogToc({ items, label }: { items: TocItem[]; label: string }) {
  const lenis = useLenis()
  const [active, setActive] = useState<string | undefined>(items[0]?.id)

  useEffect(() => {
    const headings = items
      .map((item) => ({ id: item.id, el: document.getElementById(item.id) }))
      .filter((h): h is { id: string; el: HTMLElement } => h.el !== null)
    if (headings.length === 0) return

    // Position-based scrollspy: the active section is the last heading whose top
    // has scrolled above a threshold line. Unlike a band-based IntersectionObserver,
    // this stays correct while reading long sections and when scrolling back up.
    const THRESHOLD = 140 // px below the fixed header
    let raf = 0

    const update = () => {
      raf = 0
      let current = headings[0].id
      for (const h of headings) {
        if (h.el.getBoundingClientRect().top <= THRESHOLD) current = h.id
        else break
      }
      // At the very bottom, force the last section (its heading may never reach the line).
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2
      if (atBottom) current = headings[headings.length - 1].id
      setActive(current)
    }

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }

    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    lenis?.on("scroll", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      lenis?.off("scroll", onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [items, lenis])

  const go = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    setActive(id)
    if (lenis) lenis.scrollTo(el, { offset: -110 })
    else el.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  if (items.length === 0) return null

  return (
    <nav aria-label={label}>
      <p className="mb-4 text-[0.7rem] font-semibold uppercase tracking-wider text-[#0B162D]/40">{label}</p>
      <ul className="border-l border-black/10">
        {items.map((item) => {
          const isActive = item.id === active
          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => go(item.id)}
                aria-current={isActive ? "true" : undefined}
                className={cx(
                  "group -ml-px flex w-full items-baseline gap-2.5 border-l-2 py-1.5 pl-4 text-left transition-colors duration-200",
                  isActive
                    ? "border-[var(--area)] text-[#0B162D]"
                    : "border-transparent text-[#0B162D]/55 hover:text-[#0B162D]",
                )}
              >
                <span className={cx("font-mono text-[0.68rem]", isActive ? "text-[var(--area)]" : "text-[#0B162D]/35")}>
                  {String(item.number).padStart(2, "0")}
                </span>
                <span className="text-[0.85rem] leading-snug">{item.text}</span>
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
