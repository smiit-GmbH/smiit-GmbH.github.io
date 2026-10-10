"use client"

import { useEffect, useState } from "react"
import { observeInView } from "./observe-in-view"

/**
 * Tracks whether an element is *currently* in the viewport, toggling true/false
 * as it enters and leaves. Use it to pause looping (repeat: Infinity) animations
 * while their host is scrolled off-screen, so they stop occupying the main
 * thread. For one-shot entrance reveals use useRevealOnScroll instead.
 *
 * Returns a `[ref, inView]` tuple (see useRevealOnScroll for why).
 */
export function useActiveInView(options?: { margin?: string; threshold?: number }) {
  const [node, setNode] = useState<HTMLElement | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    if (!node) return
    return observeInView(node, { rootMargin: options?.margin ?? "0px", threshold: options?.threshold ?? 0 }, setInView)
  }, [node, options?.margin, options?.threshold])

  return [setNode as (node: HTMLElement | null) => void, inView] as const
}
