"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function IntroPage() {
  const router = useRouter()
  const [phase, setPhase] = useState<"initial" | "zoom" | "text">("initial")

  useEffect(() => {
    // Phase 1: Start Zoom
    const timer1 = setTimeout(() => {
      setPhase("zoom")
    }, 100)

    // Phase 2: Text anzeigen (nachdem Logo groß ist)
    const timer2 = setTimeout(() => {
      setPhase("text")
    }, 1100)

    // Phase 3: Redirect
    const timer3 = setTimeout(() => {
      router.push("/de/")
    }, 3500)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
    }
  }, [router])

  return (
    <main className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black">
      <div
        className={`relative w-40 h-40 transition-all duration-1000 ease-out transform ${
          phase === "initial"
            ? "scale-50 opacity-0"
            : "scale-100 opacity-100"
        }`}
      >
        <Image
          src="/icon.png"
          alt="smiit"
          fill
          className="object-contain"
          priority
        />
      </div>

      <div className="mt-4 flex flex-col items-center mt-8">
        <div className="h-8 overflow-hidden flex items-center justify-center">
          <p
            className={`font-serif text-white/90 font-light tracking-[0.3em] text-xs sm:text-sm uppercase transition-all duration-1000 ease-out transform ${
              phase === "text"
                ? "translate-y-0 opacity-100"
                : "translate-y-full opacity-0"
            }`}
          >
            Loading Data
          </p>
        </div>

        <div className={`mt-8 w-32 h-[1px] bg-white/10 overflow-hidden rounded-full transition-opacity duration-500 ${
          phase === "text" ? "opacity-100" : "opacity-0"
        }`}>
          <div
            className={`h-full bg-white/50 transition-all duration-[2000ms] ease-out ${
              phase === "text" ? "w-full" : "w-0"
            }`}
          />
        </div>
      </div>
    </main>
  )
}
