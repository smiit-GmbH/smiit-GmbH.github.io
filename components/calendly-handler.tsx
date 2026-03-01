"use client"

import { useCallback, useEffect, useRef } from "react"
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

export function CalendlyHandler({ url }: Props) {
  const pendingOpenRef = useRef(false)
  const scriptLoadedRef = useRef(false)

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
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (!target) return

      const trigger = target.closest<HTMLElement>(
        'a[href*="#book"], [data-open-calendly="true"]'
      )
      if (!trigger) return

      e.preventDefault()
      e.stopPropagation()

      open()
      cleanHash()
    }

    document.addEventListener("click", onClick, true)
    return () => document.removeEventListener("click", onClick, true)
  }, [open, cleanHash])

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