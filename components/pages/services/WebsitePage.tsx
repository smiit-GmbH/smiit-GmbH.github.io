import dynamic from "next/dynamic"
import type { Locale, Dictionary } from "@/lib/dictionary"

import HeroSection, { LogoStrip } from "@/components/pages/services/website/hero-section"
import { BeforeWebsite } from "@/components/pages/services/website/hero/before-website"
import { AfterWebsite } from "@/components/pages/services/website/hero/after-website"

const WebsiteCTA = dynamic(() => import("@/components/pages/services/website/cta"))
const ProblemSection = dynamic(() => import("@/components/pages/services/website/problem-section"))
const ManifestBand = dynamic(() => import("@/components/pages/services/website/manifest-band"))
const ProcessSection = dynamic(() => import("@/components/pages/services/website/process-section"))
const ReferencesSection = dynamic(() => import("@/components/pages/services/website/references-section"))
const PricingSection = dynamic(() => import("@/components/pages/services/website/pricing-section"))
const FaqSection = dynamic(() => import("@/components/pages/shared/faq-section"))

export default function WebsitePage({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const logoStrip = dict.servicesWebsite.logoStrip
  return (
    <main data-page="website">
      <HeroSection lang={lang} dict={dict} mockups={{ before: <BeforeWebsite />, after: <AfterWebsite /> }} />
      <WebsiteCTA lang={lang} dict={dict} />
      <LogoStrip label={logoStrip.label} names={logoStrip.names} />
      <ProblemSection dict={dict} />
      <ManifestBand dict={dict} />
      <ReferencesSection dict={dict} />
      <ProcessSection dict={dict} />
      <PricingSection dict={dict} />
      <FaqSection dict={dict.servicesWebsite.faq} />
    </main>
  )
}
