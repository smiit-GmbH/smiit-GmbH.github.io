"use client"

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react"
import Lenis from "lenis"

const LenisContext = createContext<Lenis | null>(null)

export function useLenis() {
  return useContext(LenisContext)
}

interface SmoothScrollProviderProps {
  children: ReactNode
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const [lenis, setLenis] = useState<Lenis | null>(null)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
    if (reducedMotion) return

    const instance = new Lenis({
      // Scroll duration in seconds – higher = smoother / slower
      duration: 1.1,
      // Easing function – ease-out quart for a natural deceleration feel
      easing: (t: number) => 1 - Math.pow(1 - t, 4),
      // Smooth wheel scrolling
      smoothWheel: true,
      // Slightly reduce wheel speed for a calmer feel
      wheelMultiplier: 0.85,
      // Touch scrolling
      touchMultiplier: 0.9,
      // Infinite scroll disabled
      infinite: false,
    })

    setLenis(instance)

    function raf(time: number) {
      instance.raf(time)
      rafRef.current = requestAnimationFrame(raf)
    }
    rafRef.current = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafRef.current)
      instance.destroy()
      setLenis(null)
    }
  }, [])

  return (
    <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
  )
}
