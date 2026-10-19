"use client"

import { useCallback, useEffect, useRef } from "react"
import { buildCalendlyUrl, loadCalendly } from "@/lib/calendly"

declare global {
  interface HTMLElementEventMap {
    "open-calendly": CustomEvent
  }
}

type Props = {
  url?: string
}

// Calendly assets are loaded lazily: nothing is requested from calendly.com
// until the visitor actively starts a booking (pointerdown/click on a booking
// trigger, the "open-calendly" event, or a "#book" link). This keeps visitor
// data from reaching Calendly on a plain page view (see privacy policy).
export function CalendlyHandler({ url }: Props) {
  const warmupDoneRef = useRef(false)

  const getLang = useCallback((): "de" | "en" => {
    try {
      const htmlLang = typeof document !== "undefined" ? document.documentElement.lang : ""
      if (htmlLang?.toLowerCase().startsWith("en")) return "en"
      if (typeof window !== "undefined" && window.location?.pathname?.startsWith("/en")) return "en"
    } catch {
      /* SSR / edge – fall through */
    }
    return "de"
  }, [])

  const getUrl = useCallback((): string => {
    const lang = getLang()
    if (!url) return buildCalendlyUrl(lang)

    try {
      const u = new URL(url)
      u.searchParams.set("locale", lang)
      return u.toString()
    } catch {
      const sep = url.includes("?") ? "&" : "?"
      return `${url}${sep}locale=${lang}`
    }
  }, [url, getLang])

  const open = useCallback(() => {
    const finalUrl = getUrl()
    if (!finalUrl) {
      return
    }

    loadCalendly()
      .then((calendly) => calendly.initPopupWidget({ url: finalUrl }))
      .catch(() => {
        /* blocked or offline – the trigger simply does nothing */
      })
  }, [getUrl])

  const warmup = useCallback(() => {
    if (warmupDoneRef.current) return

    warmupDoneRef.current = true

    const appendLink = (rel: string, href: string, crossOrigin?: boolean) => {
      if (!href || typeof document === "undefined") return
      if (document.head.querySelector(`link[rel="${rel}"][href="${href}"]`)) return

      const link = document.createElement("link")
      link.rel = rel
      link.href = href
      if (crossOrigin) link.crossOrigin = "anonymous"
      document.head.appendChild(link)
    }

    appendLink("preconnect", "https://assets.calendly.com", true)
    appendLink("dns-prefetch", "https://assets.calendly.com")

    const finalUrl = getUrl()
    if (!finalUrl) return

    try {
      const finalOrigin = new URL(finalUrl).origin
      appendLink("preconnect", finalOrigin, true)
      appendLink("dns-prefetch", finalOrigin)
    } catch {
      /* ignore malformed url */
    }
  }, [getUrl])

  const cleanHash = useCallback(() => {
    try {
      if (window.location.hash === "#book") {
        history.replaceState(null, "", window.location.pathname + window.location.search)
      }
    } catch {
      /* ignore */
    }
  }, [])

  useEffect(() => {
    const handleHash = () => {
      if (typeof window === "undefined") return
      if (window.location.hash !== "#book") return

      open()
      cleanHash()
    }

    handleHash()

    window.addEventListener("hashchange", handleHash)
    return () => window.removeEventListener("hashchange", handleHash)
  }, [open, cleanHash])

  useEffect(() => {
    const onOpen = () => open()
    window.addEventListener("open-calendly", onOpen)
    return () => window.removeEventListener("open-calendly", onOpen)
  }, [open])

  useEffect(() => {
    const onWarmIntent = (e: Event) => {
      const target = e.target as HTMLElement | null
      if (!target) return

      const trigger = target.closest<HTMLElement>('a[href*="#book"], [data-open-calendly="true"]')
      if (!trigger) return

      warmup()
    }

    // Only deliberate interactions warm up – hover/focus alone must not
    // contact Calendly.
    document.addEventListener("pointerdown", onWarmIntent, true)
    document.addEventListener("touchstart", onWarmIntent, true)

    return () => {
      document.removeEventListener("pointerdown", onWarmIntent, true)
      document.removeEventListener("touchstart", onWarmIntent, true)
    }
  }, [warmup])

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (!target) return

      const trigger = target.closest<HTMLElement>('a[href*="#book"], [data-open-calendly="true"]')
      if (!trigger) return

      warmup()
      e.preventDefault()
      e.stopPropagation()

      open()
      cleanHash()
    }

    document.addEventListener("click", onClick, true)
    return () => document.removeEventListener("click", onClick, true)
  }, [open, cleanHash, warmup])

  return null
}
