// Shared Calendly helpers for the site-wide popup (CalendlyHandler) and the
// inline booking card on the contact page. Nothing here contacts Calendly on
// its own – callers only invoke loadCalendly() after a deliberate click.

import type { Locale } from "@/lib/dictionary"

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void
      initInlineWidget: (options: { url: string; parentElement: HTMLElement }) => void
    }
  }
}

const CALENDLY_SCRIPT_SRC = "https://assets.calendly.com/assets/external/widget.js"
const CALENDLY_STYLE_HREF = "https://assets.calendly.com/assets/external/widget.css"

/** Locale-specific booking URL from the env, with Calendly's `locale` param set. Empty if unconfigured. */
export function buildCalendlyUrl(lang: Locale, params: Record<string, string> = {}): string {
  const baseEN = (process.env.NEXT_PUBLIC_CALENDLY_URL_EN ?? "").trim()
  const baseDE = (process.env.NEXT_PUBLIC_CALENDLY_URL_DE ?? "").trim()
  const fallback = (process.env.NEXT_PUBLIC_CALENDLY_URL ?? "").trim()
  const base = lang === "en" ? baseEN || fallback : baseDE || fallback

  if (!base) return ""

  const query = { locale: lang, ...params }
  try {
    const u = new URL(base)
    for (const [key, value] of Object.entries(query)) u.searchParams.set(key, value)
    return u.toString()
  } catch {
    const sep = base.includes("?") ? "&" : "?"
    return `${base}${sep}${new URLSearchParams(query).toString()}`
  }
}

let loading: Promise<NonNullable<Window["Calendly"]>> | null = null

/**
 * Load Calendly's widget script (and stylesheet) once. Reuses a script tag
 * that CalendlyHandler may already have inserted, so it is never loaded twice.
 */
export function loadCalendly(): Promise<NonNullable<Window["Calendly"]>> {
  if (window.Calendly) return Promise.resolve(window.Calendly)
  if (loading) return loading

  loading = new Promise((resolve, reject) => {
    if (!document.querySelector(`link[href="${CALENDLY_STYLE_HREF}"]`)) {
      const link = document.createElement("link")
      link.rel = "stylesheet"
      link.href = CALENDLY_STYLE_HREF
      document.head.appendChild(link)
    }

    let script = document.querySelector<HTMLScriptElement>(`script[src="${CALENDLY_SCRIPT_SRC}"]`)
    if (!script) {
      script = document.createElement("script")
      script.src = CALENDLY_SCRIPT_SRC
      script.async = true
      document.head.appendChild(script)
    }

    script.addEventListener("load", () => (window.Calendly ? resolve(window.Calendly) : reject()), { once: true })
    script.addEventListener(
      "error",
      () => {
        loading = null
        reject()
      },
      { once: true },
    )
  })

  return loading
}

/** True for the postMessage Calendly's iframe sends once a booking is confirmed. */
export function isCalendlyBooking(e: MessageEvent): boolean {
  return (
    e.origin === "https://calendly.com" &&
    typeof e.data === "object" &&
    e.data !== null &&
    (e.data as { event?: unknown }).event === "calendly.event_scheduled"
  )
}
