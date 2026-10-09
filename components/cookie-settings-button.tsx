"use client"

import { openCookieSettings } from "@/lib/gtag"

/** Re-opens the consent banner (the footer itself is a server component). */
export function CookieSettingsButton({ label, className }: { label: string; className?: string }) {
  return (
    <button type="button" onClick={openCookieSettings} className={className}>
      {label}
    </button>
  )
}
