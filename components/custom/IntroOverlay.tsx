"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { motion, useReducedMotion } from "framer-motion"

type Phase = "initial" | "zoom" | "text" | "exit"

const EXIT_MS = 500

// Mobile: short brand flash on a fixed timeline.
const MOBILE = { enterAt: 50, textAt: 300, exitAt: 850 }
// Desktop: stays until the hero video is actually playing, bounded by a
// minimum (so it doesn't flash) and a maximum (so a slow video can't hang it).
const DESKTOP = { enterAt: 100, textAt: 650, minExitAt: 1300, maxExitAt: 3600 }

export function IntroOverlay({
  onDone,
  videoReady = false,
}: {
  onDone: () => void
  videoReady?: boolean
}) {
  const [phase, setPhase] = useState<Phase>("initial")
  const pathname = usePathname() || "/"
  const lang = pathname.startsWith("/en") ? "en" : "de"
  const prefersReducedMotion = useReducedMotion()
  const exitStartedRef = useRef(false)
  const onDoneRef = useRef(onDone)
  const startExitRef = useRef<() => void>(() => {})
  const isDesktopRef = useRef(false)
  const mountTimeRef = useRef(0)

  const L =
    lang === "de"
      ? {
          loading: "Daten transformieren...",
        }
      : {
          loading: "Transforming data...",
        }

  useEffect(() => {
    onDoneRef.current = onDone
  }, [onDone])

  useEffect(() => {
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    mountTimeRef.current = Date.now()

    const timers: number[] = []

    const startExit = () => {
      if (exitStartedRef.current) return
      exitStartedRef.current = true
      setPhase("exit")
      timers.push(window.setTimeout(() => onDoneRef.current(), EXIT_MS))
    }
    startExitRef.current = startExit

    if (prefersReducedMotion) {
      startExit()
      return () => {
        document.body.style.overflow = prevOverflow
        timers.forEach((t) => clearTimeout(t))
      }
    }

    const isDesktop = window.matchMedia("(min-width: 768px)").matches
    isDesktopRef.current = isDesktop
    const cfg = isDesktop ? DESKTOP : MOBILE

    timers.push(window.setTimeout(() => setPhase("zoom"), cfg.enterAt))
    timers.push(window.setTimeout(() => setPhase("text"), cfg.textAt))

    if (isDesktop) {
      timers.push(window.setTimeout(startExit, DESKTOP.maxExitAt))
    } else {
      timers.push(window.setTimeout(startExit, MOBILE.exitAt))
    }

    return () => {
      document.body.style.overflow = prevOverflow
      timers.forEach((t) => clearTimeout(t))
    }
  }, [prefersReducedMotion])

  // Desktop: leave as soon as the hero video is playing, but not before the
  // minimum on-screen time has elapsed.
  useEffect(() => {
    if (!videoReady || !isDesktopRef.current || exitStartedRef.current) return

    const elapsed = Date.now() - mountTimeRef.current
    if (elapsed >= DESKTOP.minExitAt) {
      startExitRef.current()
      return
    }
    const t = window.setTimeout(startExitRef.current, DESKTOP.minExitAt - elapsed)
    return () => clearTimeout(t)
  }, [videoReady])

  return (
    <motion.div
      className={[
        "fixed inset-0 z-[9999] flex flex-col items-center justify-center",
        "px-6 sm:px-8",
        "text-center",
        "bg-gradient-to-b from-[#B9CAF4] via-[#C7D4F6] to-[#D9E1FA]",
        "will-change-[opacity]",
      ].join(" ")}
      initial={{ opacity: 1 }}
      animate={{ opacity: phase === "exit" ? 0 : 1 }}
      transition={{ duration: EXIT_MS / 1000, ease: "easeOut" }}
    >
      <motion.div
        className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={
          phase === "initial"
            ? { scale: 0.5, opacity: 0 }
            : { scale: 1, opacity: 1 }
        }
        transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
      >
        <Image src="/icon_transparent.png" alt="smiit" fill className="object-contain" priority />
      </motion.div>

      <div className="mt-6 sm:mt-8 flex flex-col items-center">
        <div className="h-8 overflow-hidden flex items-center justify-center">
          <motion.p
            className={[
              "font-serif md:font-sans text-black font-light sm:text-balance uppercase",
              "tracking-[0.22em]",
              "text-[12px] sm:text-xs md:text-[16px]",
              "will-change-[transform,opacity]",
            ].join(" ")}
            initial={{ y: 24, opacity: 0 }}
            animate={
              phase === "text" || phase === "exit"
                ? { y: 0, opacity: 1 }
                : { y: 24, opacity: 0 }
            }
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          >
            {L.loading}
          </motion.p>
        </div>

        <motion.div
          className="mt-6 sm:mt-8 w-24 sm:w-28 md:w-32 h-[1px] bg-black/10 overflow-hidden rounded-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: phase === "text" || phase === "exit" ? 1 : 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <motion.div
            className="h-full bg-black/40"
            initial={{ width: "0%" }}
            animate={{
              width:
                phase === "exit" ? "100%" : phase === "text" ? "90%" : "0%",
            }}
            transition={{
              duration: phase === "exit" ? EXIT_MS / 1000 : 1.8,
              ease: "easeOut",
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  )
}
