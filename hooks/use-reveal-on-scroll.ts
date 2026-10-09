"use client"

import { useEffect, useState } from "react"

/**
 * Custom hook that uses a native IntersectionObserver to detect when an element
 * enters the viewport. Unlike framer-motion's whileInView, this is compatible
 * with Lenis smooth scroll because it doesn't rely on framer-motion's internal
 * scroll tracking.
 *
 * Returns a `[ref, isRevealed]` tuple: a callback ref to attach to the element
 * and a boolean indicating visibility. Once visible, the element stays visible
 * (once: true behavior). The tuple shape keeps `isRevealed` a plain value the
 * React Compiler lets you read during render (an object holding a ref is
 * treated as a ref as a whole).
 */
export function useRevealOnScroll(options?: { margin?: string; threshold?: number }) {
  const [node, setNode] = useState<HTMLElement | null>(null)
  const [isRevealed, setIsRevealed] = useState(false)

  useEffect(() => {
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true)
          observer.disconnect() // once: true
        }
      },
      {
        rootMargin: options?.margin ?? "-80px",
        threshold: options?.threshold ?? 0,
      },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [node, options?.margin, options?.threshold])

  return [setNode as (node: HTMLElement | null) => void, isRevealed] as const
}
