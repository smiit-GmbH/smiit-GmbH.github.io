// Google tag (gtag.js) configuration + consent helpers.
//
// Two products share a single gtag.js load: Google Ads (AW-, conversion
// tracking) and Google Analytics 4 (G-, website analytics).
//
// Consent is handled via Google Consent Mode v2 in *basic* mode: gtag.js is
// not loaded at all until the visitor opts in via the consent banner, so no
// data (not even cookieless pings) reaches Google without consent. On
// withdrawal, measurement is disabled and Google cookies are removed.

export const GA_ADS_ID = "AW-11425209019"

/** Google Analytics 4 measurement ID. */
export const GA4_ID = "G-RWP11EYHX2"

/** Click-based conversion actions configured in the Google Ads account. */
export const CONVERSIONS = {
  mail: `${GA_ADS_ID}/fVCHCLWfys4ZELu1-8cq`,
  calendly: `${GA_ADS_ID}/W36pCLifys4ZELu1-8cq`,
  linkedin: `${GA_ADS_ID}/Au9ACLufys4ZELu1-8cq`,
} as const

export type ConversionName = keyof typeof CONVERSIONS

/** Versioned so we can re-prompt if the consent scope ever changes. */
export const CONSENT_STORAGE_KEY = "smiit-consent-v1"

/** Dispatched (e.g. from the footer link) to re-open the consent banner. */
export const COOKIE_SETTINGS_EVENT = "smiit:open-cookie-settings"

/** Dispatched with the new ConsentChoice as `detail` whenever it changes. */
export const CONSENT_CHANGE_EVENT = "smiit:consent-change"

export type ConsentChoice = "granted" | "denied"

/** Re-open the consent banner so a visitor can change/withdraw their choice. */
export function openCookieSettings(): void {
  if (typeof window === "undefined") return
  window.dispatchEvent(new Event(COOKIE_SETTINGS_EVENT))
}

declare global {
  interface Window {
    dataLayer: unknown[]
    gtag: (...args: unknown[]) => void
  }
}

export function getStoredConsent(): ConsentChoice | null {
  if (typeof window === "undefined") return null
  try {
    const value = window.localStorage.getItem(CONSENT_STORAGE_KEY)
    return value === "granted" || value === "denied" ? value : null
  } catch {
    return null
  }
}

export function setStoredConsent(choice: ConsentChoice): void {
  if (typeof window === "undefined") return
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, choice)
  } catch {
    /* storage unavailable (private mode, blocked) – ignore */
  }
  window.dispatchEvent(new CustomEvent<ConsentChoice>(CONSENT_CHANGE_EVENT, { detail: choice }))
}

/** Remove first-party Google Analytics / Ads cookies (_ga, _ga_*, _gid, _gat*, _gcl_*). */
function clearGoogleCookies(): void {
  const names = document.cookie
    .split(";")
    .map((c) => c.split("=")[0].trim())
    .filter((n) => /^(_ga|_gid|_gat|_gcl_)/.test(n))
  if (names.length === 0) return

  // Cookies may be scoped to the host or any parent domain (gtag uses the
  // top-level domain by default), so expire them on every candidate domain.
  const parts = window.location.hostname.split(".")
  const domains = [""]
  for (let i = 0; i < parts.length - 1; i++) domains.push(`; domain=.${parts.slice(i).join(".")}`)

  for (const name of names) {
    for (const domain of domains) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${domain}`
    }
  }
}

/**
 * Apply a consent decision to an already loaded gtag.js. On withdrawal, GA4 is
 * disabled for the rest of the session and Google cookies are deleted.
 */
export function updateConsent(granted: boolean): void {
  if (typeof window === "undefined") return
  ;(window as unknown as Record<string, boolean>)[`ga-disable-${GA4_ID}`] = !granted
  if (!granted) clearGoogleCookies()

  if (typeof window.gtag !== "function") return
  const value: ConsentChoice = granted ? "granted" : "denied"
  window.gtag("consent", "update", {
    ad_storage: value,
    ad_user_data: value,
    ad_personalization: value,
    analytics_storage: value,
  })
}

/** Fire a Google Ads conversion – only when the visitor has consented. */
export function fireConversion(name: ConversionName): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return
  if (getStoredConsent() !== "granted") return
  window.gtag("event", "conversion", { send_to: CONVERSIONS[name] })
}
