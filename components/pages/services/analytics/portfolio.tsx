"use client"

import { BarChart3, ShieldCheck, BrainCircuit } from "lucide-react"
import type { Dictionary } from "@/lib/dictionary"
import { PortfolioSection } from "@/components/pages/services/shared/portfolio/portfolio-section"
import { VISUALS } from "./portfolio-visuals"
import { MOBILE_VISUALS } from "./portfolio-mobile-visuals"

const PARTS = {
  icons: [BarChart3, ShieldCheck, BrainCircuit],
  visuals: VISUALS,
  mobileVisuals: MOBILE_VISUALS,
}

export default function AnalyticsPortfolio({ dict }: { dict: Dictionary }) {
  return (
    <PortfolioSection
      service="analytics"
      copy={dict.servicesAnalytics.portfolio}
      eyebrow={dict.servicesAnalytics.eyebrows?.portfolio}
      parts={PARTS}
    />
  )
}
