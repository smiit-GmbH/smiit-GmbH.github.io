"use client"

import React, { useRef } from "react"
import { motion, useReducedMotion, useScroll } from "framer-motion"
import LocalizedLink from "../../../localized-link"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import { ServiceCinemaLayer } from "./mobile-cinema-layer"
import { TagPill } from "./service-card"
import { getAccent, getLink } from "./service-meta"

function MobileServicesCinemaPinned({ items }: { items: Array<{ title: string; text: string; tags: string[] }> }) {
  const trackRef = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  })

  const revealVh = 85 * items.length
  return (
    <div ref={trackRef} className="relative -mx-4 sm:-mx-6" style={{ minHeight: `${100 + revealVh}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        {items.map((item, idx) => (
          <ServiceCinemaLayer
            key={item.title}
            item={item}
            idx={idx}
            total={items.length}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </div>
    </div>
  )
}

function MobileServicesCinemaStatic({ items }: { items: Array<{ title: string; text: string; tags: string[] }> }) {
  return (
    <ul className="border-t border-black/10 dark:border-white/10">
      {items.map((item, idx) => {
        const link = getLink(item.title)
        const accent = getAccent(item.title)
        return (
          <li key={item.title} className="border-b border-black/10 dark:border-white/10 py-10">
            <div className="text-[0.68rem] font-medium uppercase tracking-[0.22em] tabular-nums">
              <span style={{ color: accent.hex }}>{String(idx + 1).padStart(2, "0")}</span>
              <span className="mx-2 text-black/30 dark:text-white/30">/</span>
              <span className="text-black/55 dark:text-white/60">{String(items.length).padStart(2, "0")}</span>
            </div>
            <h3 className="mt-3 font-serif text-[2.4rem] leading-[1.05] tracking-tight text-black dark:text-white">
              {item.title}
            </h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {item.tags.map((t) => (
                <TagPill key={t} label={t} />
              ))}
            </div>
            <p className="mt-4 text-[0.96rem] leading-relaxed text-black/85 dark:text-white/85">{item.text}</p>
            {link && (
              <div className="mt-5">
                <LocalizedLink
                  href={link}
                  aria-label={item.title}
                  className="inline-flex items-center justify-center w-12 h-12 rounded-full"
                  style={{ backgroundColor: accent.hex, color: accent.fg }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <path d="M7 17L17 7" />
                    <path d="M7 7h10v10" />
                  </svg>
                </LocalizedLink>
              </div>
            )}
          </li>
        )
      })}
    </ul>
  )
}

export function MobileServicesCinema({
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
  const prefersReducedMotion = useReducedMotion()

  return (
    <div className="md:hidden">
      {prefersReducedMotion ? (
        <>
          {header && <div>{header}</div>}
          <MobileServicesCinemaStatic items={items} />
        </>
      ) : (
        <>
          {header && (
            <div className="relative pointer-events-none" style={{ height: "285vh", marginBottom: "-285vh" }}>
              <div className="sticky top-16 z-30 py-3 pointer-events-auto">{header}</div>
            </div>
          )}
          <MobileServicesCinemaPinned items={items} />
        </>
      )}

      {ctaText && ctaButton && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative -mt-[10vh] text-center"
        >
          <p className="text-sm leading-relaxed text-black/75 dark:text-white/75 max-w-[54ch] mx-auto">{ctaText}</p>
          <div className="mt-4 flex justify-center">
            <a href="#book">
              <Button
                variant="outline"
                className="rounded-xl px-8 py-6 text-base border-black text-black hover:bg-black hover:text-white transition-all duration-300 hover:scale-105 cursor-pointer"
              >
                {ctaButton}
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </div>
        </motion.div>
      )}
    </div>
  )
}
