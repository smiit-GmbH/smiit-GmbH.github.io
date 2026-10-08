import type { Locale } from "@/lib/dictionary"

/** Locale of a pathname ("/en/..." → "en", anything else → "de"). */
export function localeFromPath(pathname: string | null | undefined): Locale {
  return pathname?.startsWith("/en") ? "en" : "de"
}

/** The same page in another locale: "/de/services/apps/" → "/en/services/apps/". */
export function buildPathForLang(pathname: string, target: Locale): string {
  if (pathname === "/" || pathname === "") {
    return `/${target}/`
  }

  if (pathname.startsWith("/de/") || pathname === "/de") {
    return pathname.replace(/^\/de(\/|$)/, `/${target}/`)
  }
  if (pathname.startsWith("/en/") || pathname === "/en") {
    return pathname.replace(/^\/en(\/|$)/, `/${target}/`)
  }

  return `/${target}${pathname.endsWith("/") ? "" : "/"}`
}
