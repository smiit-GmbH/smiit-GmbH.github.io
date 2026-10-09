"use client"

import { motion } from "framer-motion"
import { CalendarCheck } from "lucide-react"
import { useActiveInView } from "@/hooks/use-active-in-view"
import type { ServiceTheme } from "../service-theme"

export function BookCircleButton({
  label,
  size = "lg",
  theme,
}: {
  label: string
  size?: "lg" | "md"
  theme: ServiceTheme
}) {
  const dimensions = size === "lg" ? "h-14 w-14" : "h-11 w-11"
  const iconSize = size === "lg" ? "h-5 w-5" : "h-4 w-4"
  const [ref, inView] = useActiveInView()
  return (
    <a
      ref={ref}
      href="#book"
      aria-label={label}
      title={label}
      className={`group relative inline-flex ${dimensions} items-center justify-center rounded-full ${theme.portfolioBookButton}`}
    >
      <motion.span
        aria-hidden="true"
        className={`absolute inset-0 rounded-full border ${theme.accentBorder40}`}
        initial={{ scale: 1, opacity: 0.6 }}
        animate={inView ? { scale: [1, 1.18, 1], opacity: [0.6, 0, 0.6] } : { scale: 1, opacity: 0.6 }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeOut" }}
      />
      <CalendarCheck className={`${iconSize} transition-transform duration-300 group-hover:scale-110`} />
      <span className="sr-only">{label}</span>
    </a>
  )
}
