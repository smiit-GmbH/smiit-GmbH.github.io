"use client"

import { CalendarDays } from "lucide-react"

export function MobileCalendlyFab() {
  return (
    <div className="lg:hidden fixed right-4 bottom-4 z-[70] pb-[env(safe-area-inset-bottom)]">
      <button
        type="button"
        data-open-calendly="true"
        aria-label="Open Calendly"
        className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-white/20 bg-[#F703EB] text-white shadow-[0_10px_24px_rgba(247,3,235,0.28)] ring-1 ring-black/5 transition-all duration-300 hover:bg-[#DE02D2] active:scale-[0.97]"
      >
        <CalendarDays className="h-4.5 w-4.5" />
      </button>
    </div>
  )
}
