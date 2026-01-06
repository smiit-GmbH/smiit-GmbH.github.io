"use client"

import type React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

type Lang = "de" | "en"

function detectLangFromPath(pathname: string | null | undefined): Lang {
  if (!pathname) return "de"
  if (pathname.startsWith("/en")) return "en"
  return "de"
}

function buildLocalizedHref(currentPathname: string, href: string, target?: Lang): string {
  if (/^[a-zA-Z]+:\/\//.test(href) || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return href
  }

  if (href.startsWith("#")) {
    const currentLang = target ?? detectLangFromPath(currentPathname)
    return `/${currentLang}/${href}`
  }

  const currentLang = target ?? detectLangFromPath(currentPathname)
  const normalized = href.startsWith("/") ? href : `/${href}`

  if (normalized.startsWith("/de/") || normalized === "/de") {
    return normalized.replace(/^\/de(\/|$)/, `/${currentLang}/`)
  }
  if (normalized.startsWith("/en/") || normalized === "/en") {
    return normalized.replace(/^\/en(\/|$)/, `/${currentLang}/`)
  }

  return `/${currentLang}${normalized.endsWith("/") ? normalized : `${normalized}/`}`
}

export type LocalizedLinkProps = Omit<React.ComponentProps<typeof Link>, "href"> & {
  href: string
  targetLang?: Lang
}

export default function LocalizedLink({ href, targetLang, ...rest }: LocalizedLinkProps) {
  const pathname = usePathname() || "/"
  const localizedHref = buildLocalizedHref(pathname, href, targetLang)
  return <Link href={localizedHref} {...rest} />
}