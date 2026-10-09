import type { Dictionary } from "@/lib/dictionary"

/**
 * Per-service visual theme for the sections shared by the analytics, apps and
 * strategy service pages (process, reviews, manifest band, CTA).
 *
 * Every Tailwind class is spelled out as a complete literal string on purpose:
 * Tailwind only generates CSS for class names it finds verbatim in the source,
 * so building them from a hex value at runtime (`text-[${hex}]`) would not work.
 */

export type ServiceKey = "analytics" | "apps" | "strategy"

const serviceDictKey = {
  analytics: "servicesAnalytics",
  apps: "servicesApps",
  strategy: "servicesStrategy",
} as const satisfies Record<ServiceKey, keyof Dictionary>

export function getServiceDict(dict: Dictionary, service: ServiceKey) {
  return dict[serviceDictKey[service]]
}

export type ServiceTheme = {
  /** Raw accent color, for SVG strokes and framer-motion animations. */
  accentHex: string
  /** Inactive mobile process badge border (raw CSS color). */
  badgeBorder: string
  /** Active mobile process badge shadow (raw CSS box-shadow). */
  badgeShadow: string
  /** Accent colors for the shared RelatedLinkBand / GlossaryLinksBand (default palette when omitted). */
  linkAccent?: { accent: string; accentHover: string }
  /** `data-page` attribute on <main>, used by page-scoped CSS. */
  dataPage?: string
  /** Client logos for the reviews section, keyed by review id. */
  reviewLogos: Record<number, string>

  // Dark bands (manifest + CTA)
  darkBg: string
  /** Radial glow behind dark bands; null = no glow. */
  glow: string | null
  accentLightText: string
  manifestGradient: string
  ctaSweepVia: string

  // Light sections (process + reviews)
  accentText: string
  accentText25: string
  accentText20: string
  accentBorder40: string
  iconTile: string
  iconSolid: string
  cardHover: string
  pillActive: string
  rail: string
  mobileCardActive: string

  // Portfolio
  /** Per-item accent colors (raw hex), one per portfolio entry. */
  portfolioStrands: readonly [string, string, string]
  portfolioBookButton: string
  portfolioLink: string
  portfolioStageGap: string

  // Hero
  heroPackageChip: string
}

export const serviceThemes: Record<ServiceKey, ServiceTheme> = {
  analytics: {
    accentHex: "#21569c",
    badgeBorder: "rgba(33, 86, 156, 0.25)",
    badgeShadow: "0 14px 30px rgba(33,86,156,0.35)",
    reviewLogos: {
      1: "/assets/logos/dy-project.webp",
      2: "/assets/logos/gb-logistics.webp",
      6: "/assets/logos/masterhomepage.webp",
    },
    darkBg: "bg-[#0B162D]",
    glow: "bg-[radial-gradient(ellipse_at_center,_rgba(33,86,156,0.45),_transparent_60%)]",
    accentLightText: "text-[#7DBBFF]",
    manifestGradient: "via-[#cfe2ff] to-[#7DBBFF]",
    ctaSweepVia: "via-[#21569c]/22",
    accentText: "text-[#21569c]",
    accentText25: "text-[#21569c]/25",
    accentText20: "text-[#21569c]/20",
    accentBorder40: "border-[#21569c]/40",
    iconTile: "bg-[#21569c]/10 text-[#21569c]",
    iconSolid: "bg-[#21569c] text-white shadow-[0_12px_28px_rgba(33,86,156,0.28)]",
    cardHover: "hover:border-[#21569c]/30 hover:shadow-[0_18px_45px_rgba(33,86,156,0.12)]",
    pillActive: "border-[#21569c] bg-[#21569c] text-white shadow-[0_14px_36px_rgba(33,86,156,0.34)]",
    rail: "from-[#21569c] via-[#21569c] to-[#7DBBFF]",
    mobileCardActive: "border-[#21569c]/35 shadow-[0_18px_44px_rgba(33,86,156,0.12)]",
    portfolioStrands: ["#7DBBFF", "#21569c", "#94A3B8"],
    portfolioBookButton:
      "bg-[#21569c] text-white shadow-[0_18px_36px_rgba(33,86,156,0.32)] transition-all duration-300 hover:scale-105 hover:bg-[#1a457d] hover:shadow-[0_22px_48px_rgba(33,86,156,0.45)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#21569c]/30",
    portfolioLink: "text-[#21569c] hover:text-[#1a457d]",
    portfolioStageGap: "gap-4",
    heroPackageChip: "border-[#21569c]/15 bg-[#21569c]/[0.06]",
  },
  apps: {
    accentHex: "#F703EB",
    badgeBorder: "rgba(247, 3, 235, 0.25)",
    badgeShadow: "0 14px 30px rgba(247,3,235,0.35)",
    linkAccent: { accent: "#F703EB", accentHover: "#C002B7" },
    dataPage: "apps",
    reviewLogos: {
      3: "/assets/logos/claimity.webp",
      4: "/assets/logos/rb-westkamp.webp",
      7: "/assets/logos/bitix.webp",
    },
    darkBg: "bg-[#1A1719]",
    glow: null,
    accentLightText: "text-[#FA85F4]",
    manifestGradient: "via-[#FDD0F9] to-[#FA85F4]",
    ctaSweepVia: "via-[#F703EB]/22",
    accentText: "text-[#F703EB]",
    accentText25: "text-[#F703EB]/25",
    accentText20: "text-[#F703EB]/20",
    accentBorder40: "border-[#F703EB]/40",
    iconTile: "bg-[#F703EB]/10 text-[#F703EB]",
    iconSolid: "bg-[#F703EB] text-white shadow-[0_12px_28px_rgba(247,3,235,0.28)]",
    cardHover: "hover:border-[#F703EB]/30 hover:shadow-[0_18px_45px_rgba(247,3,235,0.12)]",
    pillActive: "border-[#F703EB] bg-[#F703EB] text-white shadow-[0_14px_36px_rgba(247,3,235,0.34)]",
    rail: "from-[#F703EB] via-[#F703EB] to-[#FA85F4]",
    mobileCardActive: "border-[#F703EB]/35 shadow-[0_18px_44px_rgba(247,3,235,0.12)]",
    portfolioStrands: ["#FA85F4", "#F703EB", "#94A3B8"],
    portfolioBookButton:
      "bg-[#F703EB] text-white shadow-[0_18px_36px_rgba(247,3,235,0.32)] transition-all duration-300 hover:scale-105 hover:bg-[#C601BC] hover:shadow-[0_22px_48px_rgba(247,3,235,0.45)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#F703EB]/30",
    portfolioLink: "text-[#F703EB] hover:text-[#C601BC]",
    portfolioStageGap: "gap-6",
    heroPackageChip: "border-[#F703EB]/15 bg-[#F703EB]/[0.06]",
  },
  strategy: {
    accentHex: "#64748B",
    badgeBorder: "rgba(148, 163, 184, 0.25)",
    badgeShadow: "0 14px 30px rgba(100,116,139,0.35)",
    linkAccent: { accent: "#64748B", accentHover: "#475569" },
    dataPage: "strategy",
    reviewLogos: {
      2: "/assets/logos/gb-logistics.webp",
      7: "/assets/logos/azai.webp",
      8: "/assets/logos/claimity.webp",
    },
    darkBg: "bg-[#1A1719]",
    glow: "bg-[radial-gradient(ellipse_at_center,_rgba(100,116,139,0.45),_transparent_60%)]",
    accentLightText: "text-[#94A3B8]",
    manifestGradient: "via-[#E2E8F0] to-[#94A3B8]",
    ctaSweepVia: "via-[#64748B]/22",
    accentText: "text-[#64748B]",
    accentText25: "text-[#64748B]/25",
    accentText20: "text-[#64748B]/20",
    accentBorder40: "border-[#64748B]/40",
    iconTile: "bg-[#64748B]/10 text-[#64748B]",
    iconSolid: "bg-[#64748B] text-white shadow-[0_12px_28px_rgba(100,116,139,0.28)]",
    cardHover: "hover:border-[#64748B]/30 hover:shadow-[0_18px_45px_rgba(100,116,139,0.12)]",
    pillActive: "border-[#64748B] bg-[#64748B] text-white shadow-[0_14px_36px_rgba(100,116,139,0.34)]",
    rail: "from-[#64748B] via-[#64748B] to-[#94A3B8]",
    mobileCardActive: "border-[#64748B]/35 shadow-[0_18px_44px_rgba(100,116,139,0.12)]",
    portfolioStrands: ["#64748B", "#475569", "#334155"],
    portfolioBookButton:
      "bg-[#64748B] text-white shadow-[0_18px_36px_rgba(100,116,139,0.32)] transition-all duration-300 hover:scale-105 hover:bg-[#334155] hover:shadow-[0_22px_48px_rgba(100,116,139,0.45)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#64748B]/30",
    portfolioLink: "text-[#64748B] hover:text-[#334155]",
    portfolioStageGap: "gap-4",
    heroPackageChip: "border-[#64748B]/15 bg-[#64748B]/[0.08]",
  },
}
