"use client"

import { useEffect, useRef, useState } from "react"

/**
 * Tracks whether an element is *currently* in the viewport, toggling true/false
 * as it enters and leaves. Use it to pause looping (repeat: Infinity) animations
 * while their host is scrolled off-screen, so they stop occupying the main
 * thread. For one-shot entrance reveals use useRevealOnScroll instead.
 */
export function useActiveInView<T extends HTMLElement = HTMLDivElement>(
  options?: { margin?: string; threshold?: number }
) {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      {
        rootMargin: options?.margin ?? "0px",
        threshold: options?.threshold ?? 0,
      }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [options?.margin, options?.threshold])

  return { ref, inView }
}
