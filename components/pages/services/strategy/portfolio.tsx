"use client"

import { Workflow, Cloud, ShieldCheck } from "lucide-react"
import type { Dictionary } from "@/lib/dictionary"
import { PortfolioSection } from "@/components/pages/services/shared/portfolio/portfolio-section"
import { VISUALS } from "./portfolio-visuals"
import { MOBILE_VISUALS } from "./portfolio-mobile-visuals"

const PARTS = {
  icons: [Workflow, Cloud, ShieldCheck],
  visuals: VISUALS,
  mobileVisuals: MOBILE_VISUALS,
}

export default function StrategyPortfolio({ dict }: { dict: Dictionary }) {
  return (
    <PortfolioSection
      service="strategy"
      copy={dict.servicesStrategy.portfolio}
      eyebrow={dict.servicesStrategy.eyebrows?.portfolio}
      parts={PARTS}
    />
  )
}
