"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { usePathname } from "next/navigation"

type Phase = "initial" | "zoom" | "text" | "exit"

export function IntroOverlay({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<Phase>("initial")
  const [show, setShow] = useState(false)
  const pathname = usePathname() || "/"
  const lang = pathname.startsWith("/en") ? "en" : "de"
  const base = `/${lang}`

  const L =
    lang === "de"
      ? {
          loading: "Daten werden geladen...",
        }
      : {
          loading: "Loading Data...",
        }

  useEffect(() => {
    setShow(true)

    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    const timer1 = window.setTimeout(() => setPhase("zoom"), 100)
    const timer2 = window.setTimeout(() => setPhase("text"), 1100)
    const timer3 = window.setTimeout(() => setPhase("exit"), 3500)
    const timer4 = window.setTimeout(() => onDone(), 3500)

    return () => {
      document.body.style.overflow = prevOverflow
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
      clearTimeout(timer4)
    }
  }, [onDone])

  if (!show) return null

  return (
    <div
      className={[
        "fixed inset-0 z-[9999] flex flex-col items-center justify-center",
        "bg-gradient-to-b from-[#B9CAF4] via-[#C7D4F6] to-[#D9E1FA]",
        "transition-opacity duration-500 ease-out",
        phase === "exit" ? "opacity-0" : "opacity-100",
      ].join(" ")}
    >
      <div
        className={`relative w-40 h-40 transition-all duration-1000 ease-out transform ${
          phase === "initial"
            ? "scale-50 opacity-0"
            : "scale-100 opacity-100"
        }`}
      >
        <Image src="/icon.png" alt="smiit" fill className="object-contain" priority />
      </div>

      <div className="mt-4 flex flex-col items-center mt-8">
        <div className="h-8 overflow-hidden flex items-center justify-center">
          <p
            className={`font-serif ${
              "text-black/70"
            } font-light tracking-[0.3em] text-xs sm:text-sm uppercase transition-all duration-1000 ease-out transform ${
              phase === "text"
                ? "translate-y-0 opacity-100"
                : "translate-y-full opacity-0"
            }`}
          >
            {L.loading}
          </p>
        </div>

        <div
          className={`mt-8 w-32 h-[1px] ${
            "bg-black/10"
          } overflow-hidden rounded-full transition-opacity duration-500 ${
            phase === "text" ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            className={`h-full ${
              "bg-black/40"
            } transition-all duration-[2000ms] ease-out ${
              phase === "text" ? "w-full" : "w-0"
            }`}
          />
        </div>
      </div>
    </div>
  )
}
