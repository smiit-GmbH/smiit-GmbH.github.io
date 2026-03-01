"use client"

import { useLayoutEffect } from "react"
import { usePathname } from "next/navigation"
import { useLenis } from "@/components/smooth-scroll-provider"

export function ScrollToTop() {
  const pathname = usePathname()
  const lenis = useLenis()

  useLayoutEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true })
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" })
    }
  }, [pathname, lenis])

  return null
}
