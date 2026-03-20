"use client"

import { CalendarDays } from "lucide-react"
import { usePathname } from "next/navigation"

export function MobileCalendlyFab() {
  const pathname = usePathname() || "/"
  const isEn = pathname.startsWith("/en")

  return (
    <div className="lg:hidden fixed bottom-6 right-6 z-40 pb-[env(safe-area-inset-bottom)]">
      <button
        type="button"
        data-open-calendly="true"
        aria-label={isEn ? "Book" : "Buchen"}
        className="inline-flex h-10 items-center gap-2 rounded-full bg-[#F703EB] px-5 text-white shadow-lg transition-all duration-300 hover:bg-[#DE02D2] hover:-translate-y-1 active:translate-y-0 active:scale-[0.98]"
      >
        <CalendarDays className="h-4 w-4" />
        <span className="text-sm font-medium tracking-tight">
          {isEn ? "Book" : "Buchen"}
        </span>
      </button>
    </div>
  )
}
