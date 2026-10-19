"use client"

import { useEffect } from "react"
import { isCalendlyBooking } from "@/lib/calendly"
import { fireConversion, trackEvent } from "@/lib/gtag"

// Fires Google Ads click-conversions on the actual interaction (not on page
// load). Uses a single capture-phase document listener – mirroring the
// CalendlyHandler – so no individual link component needs to be touched.
export function ConversionTracker() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (!target) return

      // Calendly: the CalendlyHandler's popup triggers plus the inline
      // booking card on the contact page.
      if (target.closest('a[href*="#book"], [data-open-calendly="true"], [data-calendly-inline]')) {
        fireConversion("calendly")
        return
      }

      const link = target.closest("a")
      if (!link) return

      const href = link.getAttribute("href") ?? ""
      if (href.startsWith("mailto:")) {
        fireConversion("mail")
        return
      }
      if (href.includes("linkedin.com")) {
        fireConversion("linkedin")
      }
    }

    // A completed booking (popup or inline) – the strongest lead signal.
    const onMessage = (e: MessageEvent) => {
      if (isCalendlyBooking(e)) trackEvent("generate_lead", { method: "calendly" })
    }

    document.addEventListener("click", onClick, true)
    window.addEventListener("message", onMessage)
    return () => {
      document.removeEventListener("click", onClick, true)
      window.removeEventListener("message", onMessage)
    }
  }, [])

  return null
}
