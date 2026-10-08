"use client"

import { usePathname, useRouter } from "next/navigation"
import { ChevronDown } from "lucide-react"
import ReactCountryFlag from "react-country-flag"
import type { Locale } from "@/lib/dictionary"
import { buildPathForLang, localeFromPath } from "@/lib/locale-path"
import { NavDropdown } from "@/components/nav-dropdown"

const languages: Array<{ code: Locale; label: string; country: string; countryShort: string }> = [
  { code: "de", label: "Deutsch", country: "DE", countryShort: "DE" },
  { code: "en", label: "English", country: "GB", countryShort: "EN" },
]

const Flag = ({ country }: { country: string }) => (
  <ReactCountryFlag
    countryCode={country}
    svg
    style={{ width: "1.1rem", height: "1.1rem", borderRadius: "2px" }}
    aria-hidden="true"
  />
)

export function LanguageSwitcher({ light = false }: { light?: boolean }) {
  const router = useRouter()
  const pathname = usePathname() || "/"
  const current = localeFromPath(pathname)
  const currentLang = languages.find((l) => l.code === current) ?? languages[0]

  const selectLang = (target: Locale) => {
    if (target === current) return
    const { search, hash } = window.location
    router.push(`${buildPathForLang(pathname, target)}${search}${hash}`)
  }

  return (
    <NavDropdown
      className="relative"
      triggerLabel="Language selection"
      triggerClassName={`flex items-center gap-2 px-2 py-2 text-sm font-medium transition-colors cursor-pointer bg-transparent border-none outline-none focus-visible:ring-2 focus-visible:ring-current/40 rounded-md ${
        light ? "text-white hover:text-white/70" : "text-black hover:text-black/70"
      }`}
      trigger={
        <>
          {currentLang.countryShort}
          <ChevronDown className="w-4 h-4 opacity-60" />
        </>
      }
      panelClassName="absolute right-0 mt-2 w-40 bg-white/95 backdrop-blur-md border border-black/10 rounded-xl shadow-xl z-50"
    >
      <div className="p-1">
        {languages.map((lang) => (
          <button
            key={lang.code}
            type="button"
            lang={lang.code}
            aria-current={lang.code === current ? "true" : undefined}
            onClick={() => selectLang(lang.code)}
            className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors cursor-pointer ${
              lang.code === current ? "bg-black/5 text-black font-medium" : "text-gray-700 hover:bg-black/5"
            }`}
          >
            <Flag country={lang.country} />
            <span>{lang.label}</span>
          </button>
        ))}
      </div>
    </NavDropdown>
  )
}
