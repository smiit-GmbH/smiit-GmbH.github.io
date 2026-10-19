"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Loader2 } from "lucide-react"
import type { Dictionary, Locale } from "@/lib/dictionary"
import { buildCalendlyUrl, loadCalendly } from "@/lib/calendly"

interface BookingCardProps {
  dict: Dictionary
  lang: Locale
}

// Booking card on the contact page: a static preview first, Calendly's inline
// widget only after the visitor clicks (two-click pattern, see privacy policy).
// The button deliberately avoids the CalendlyHandler's popup triggers.
export default function BookingCard({ dict, lang }: BookingCardProps) {
  const b = dict.contact.booking
  const team = dict.contact.team
  const containerRef = useRef<HTMLDivElement>(null)
  const [status, setStatus] = useState<"idle" | "open" | "error">("idle")
  const url = buildCalendlyUrl(lang, { hide_event_type_details: "1" })

  useEffect(() => {
    if (status !== "open" || !containerRef.current) return
    const parentElement = containerRef.current
    parentElement.focus()

    let cancelled = false
    loadCalendly()
      .then((calendly) => {
        if (!cancelled) calendly.initInlineWidget({ url, parentElement })
      })
      .catch(() => {
        if (!cancelled) setStatus("error")
      })
    return () => {
      cancelled = true
    }
  }, [status, url])

  if (status === "error") {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <h2 className="font-serif text-xl md:text-2xl text-black mb-2">{b.errorTitle}</h2>
        <p className="text-sm text-black/70 max-w-[40ch] leading-relaxed">
          {b.errorText}{" "}
          <a
            href={`mailto:${dict.contact.info.email}`}
            className="font-semibold text-black underline underline-offset-2 hover:text-[#F703EB]"
          >
            {dict.contact.info.email}
          </a>
        </p>
      </div>
    )
  }

  const header = (
    <div>
      <h2 className="font-serif text-2xl sm:text-[1.75rem] leading-tight text-black">{b.title}</h2>
      <ul className="mt-3 flex flex-wrap gap-2">
        {b.facts.map((fact) => (
          <li
            key={fact}
            className="rounded-full border border-black/10 bg-white px-3 py-1 text-[12px] sm:text-[13px] font-medium text-black/75"
          >
            {fact}
          </li>
        ))}
      </ul>
    </div>
  )

  // Just the calendar, kept compact – Calendly scrolls inside its iframe when a step needs more room.
  if (status === "open") {
    return (
      <div
        ref={containerRef}
        tabIndex={-1}
        aria-label={b.calendarLabel}
        className="relative isolate h-[540px] sm:h-[580px] overflow-hidden rounded-xl bg-white outline-none"
      >
        {/* Behind Calendly's iframe, which is appended to this container. */}
        <div className="absolute inset-0 -z-10 flex items-center justify-center gap-2 text-sm text-black/60">
          <Loader2 className="w-5 h-5 animate-spin" />
          {b.loading}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 lg:space-y-5 xl:space-y-6">
      {header}

      <ol className="space-y-3">
        {b.steps.map((step, i) => (
          <li key={step} className="flex items-center gap-3 text-sm sm:text-base text-black">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#F703EB]/10 text-[13px] font-semibold text-[#F703EB]">
              {i + 1}
            </span>
            {step}
          </li>
        ))}
      </ol>

      <div className="flex items-center gap-3 border-t border-black/10 pt-5">
        <div className="flex -space-x-3">
          {team.map((member) => (
            <div
              key={member.name}
              className="relative h-11 w-11 overflow-hidden rounded-full ring-2 ring-[#F4F4F5] shadow-md"
            >
              <Image src={member.image} alt="" fill sizes="44px" className="object-cover" />
            </div>
          ))}
        </div>
        <p className="text-[13px] sm:text-sm text-black/70 leading-snug">
          {b.teamText}{" "}
          <span className="font-semibold text-black">
            {team.map((member) => member.name.split(" ")[0]).join(" & ")}
          </span>
        </p>
      </div>

      <div className="space-y-3">
        <button
          type="button"
          data-calendly-inline
          onClick={() => setStatus(url ? "open" : "error")}
          className="group flex w-full items-center justify-center gap-3 bg-[#0A1128] hover:bg-[#0A1128]/90 text-white px-6 py-3 rounded-xl font-medium text-sm sm:text-base transition-all duration-300 shadow-lg shadow-black/10 hover:shadow-black/20 cursor-pointer"
        >
          {b.button}
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
        <p className="text-[11px] sm:text-xs text-black/50 leading-relaxed">
          {b.notice}{" "}
          <Link href={`/${lang}/privacy/`} className="underline underline-offset-2 hover:text-black">
            {b.privacyLink}
          </Link>
          .
        </p>
      </div>
    </div>
  )
}
