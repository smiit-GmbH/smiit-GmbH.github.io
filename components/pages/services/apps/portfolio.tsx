"use client"

import { AppWindow, Palette, Cloud } from "lucide-react"
import type { Dictionary } from "@/lib/dictionary"
import { PortfolioSection } from "@/components/pages/services/shared/portfolio/portfolio-section"
import { VISUALS } from "./portfolio-visuals"
import { MOBILE_VISUALS } from "./portfolio-mobile-visuals"

const PARTS = {
  icons: [AppWindow, Palette, Cloud],
  visuals: VISUALS,
  mobileVisuals: MOBILE_VISUALS,
}

export default function AppsPortfolio({ dict }: { dict: Dictionary }) {
  return (
    <PortfolioSection
      service="apps"
      copy={dict.servicesApps.portfolio}
      eyebrow={dict.servicesApps.eyebrows?.portfolio}
      parts={PARTS}
    />
  )
}
