"use client"

import type { ReactNode } from "react"
import { LazyMotion } from "framer-motion"

// Components import the lightweight `m` (aliased as `motion`); the animation
// features are fetched in a separate chunk after hydration so they don't
// block the main thread on first load. domMax because of layoutId and drag.
// Wraps only the routes that animate (see app/[lang]/**/page.tsx), so pages
// without motion don't download framer-motion at all. `m` components outside
// this provider render their initial state and never animate.
const loadFeatures = () => import("./motion-features").then((mod) => mod.default)

export function MotionProvider({ children }: { children: ReactNode }) {
  return <LazyMotion features={loadFeatures}>{children}</LazyMotion>
}
