"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Script from "next/script"

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void
    }
  }

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
  const pendingOpenRef = useRef(false)
  const scriptLoadedRef = useRef(false)
  const warmupDoneRef = useRef(false)
  const [loadAssets, setLoadAssets] = useState(false)

  const getLang = useCallback((): string => {
    try {
      const htmlLang =
        typeof document !== "undefined" ? document.documentElement.lang : ""
      if (htmlLang?.toLowerCase().startsWith("en")) return "en"
      if (
        typeof window !== "undefined" &&
        window.location?.pathname?.startsWith("/en")
      )
        return "en"
    } catch {
      /* SSR / edge – fall through */
    }
    return "de"
  }, [])

  const buildCalendlyUrl = useCallback((): string => {
    const lang = getLang()
    const baseEN = (process.env.NEXT_PUBLIC_CALENDLY_URL_EN ?? "").trim()
    const baseDE = (process.env.NEXT_PUBLIC_CALENDLY_URL_DE ?? "").trim()
    const fallback = (process.env.NEXT_PUBLIC_CALENDLY_URL ?? "").trim()
    const base = (
      url ?? (lang === "en" ? baseEN || fallback : baseDE || fallback)
    ).trim()

    if (!base) return ""

    try {
      const u = new URL(base)
      u.searchParams.set("locale", lang)
      return u.toString()
    } catch {
      const sep = base.includes("?") ? "&" : "?"
      return `${base}${sep}locale=${lang}`
    }
  }, [url, getLang])

  const open = useCallback(() => {
    const finalUrl = buildCalendlyUrl()
    if (!finalUrl) {
      return
    }

    if (window.Calendly?.initPopupWidget) {
      window.Calendly.initPopupWidget({ url: finalUrl })
    } else {
      pendingOpenRef.current = true
      setLoadAssets(true)
    }
  }, [buildCalendlyUrl])

  const warmup = useCallback(() => {
    if (warmupDoneRef.current) return

    warmupDoneRef.current = true
    setLoadAssets(true)

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

    const finalUrl = buildCalendlyUrl()
    if (!finalUrl) return

    try {
      const finalOrigin = new URL(finalUrl).origin
      appendLink("preconnect", finalOrigin, true)
      appendLink("dns-prefetch", finalOrigin)
    } catch {
      /* ignore malformed url */
    }
  }, [buildCalendlyUrl])


  const cleanHash = useCallback(() => {
    try {
      if (window.location.hash === "#book") {
        history.replaceState(
          null,
          "",
          window.location.pathname + window.location.search
        )
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

      const trigger = target.closest<HTMLElement>(
        'a[href*="#book"], [data-open-calendly="true"]'
      )
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

      const trigger = target.closest<HTMLElement>(
        'a[href*="#book"], [data-open-calendly="true"]'
      )
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

  if (!loadAssets) return null

  return (
    <>
      <link
        rel="stylesheet"
        href="https://assets.calendly.com/assets/external/widget.css"
      />

      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="afterInteractive"
        onLoad={() => {
          scriptLoadedRef.current = true

          if (pendingOpenRef.current || window.location.hash === "#book") {
            open()
            pendingOpenRef.current = false
            cleanHash()
          }
        }}
      />
    </>
  )
}