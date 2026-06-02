import dynamic from "next/dynamic"
import type { Locale } from "@/lib/dictionary"

import HeroSection, { LogoStrip } from "@/components/pages/services/website/hero-section"

const WebsiteCTA = dynamic(() => import("@/components/pages/services/website/cta"))
const ProblemSection = dynamic(() => import("@/components/pages/services/website/problem-section"))
const ManifestBand = dynamic(() => import("@/components/pages/services/website/manifest-band"))
const ProcessSection = dynamic(() => import("@/components/pages/services/website/process-section"))
const AudiencesSection = dynamic(() => import("@/components/pages/services/website/audiences-section"))
const ReferencesSection = dynamic(() => import("@/components/pages/services/website/references-section"))
const PricingSection = dynamic(() => import("@/components/pages/services/website/pricing-section"))
const FaqSection = dynamic(() => import("@/components/pages/shared/faq-section"))
const RelatedLinkBand = dynamic(() => import("@/components/pages/shared/related-link-band"))

export default function WebsitePage({
  lang,
  dict,
}: {
  lang: Locale
  dict: any
}) {
  const related = dict.servicesWebsite.relatedLink
  const logoStrip = dict.servicesWebsite.logoStrip
  return (
    <main data-page="website">
      <HeroSection lang={lang} dict={dict} />
      <WebsiteCTA lang={lang} dict={dict} />
      <LogoStrip label={logoStrip.label} names={logoStrip.names} />
      <ProblemSection dict={dict} />
      <ManifestBand dict={dict} />
      {/* <AudiencesSection dict={dict} /> */}
      <ReferencesSection dict={dict} />
      <ProcessSection dict={dict} />
      <PricingSection dict={dict} />
      {/* <RelatedLinkBand
        text={related.text}
        linkLabel={related.linkLabel}
        href={related.href}
        accent="#F703EB"
        accentHover="#C002B7"
      /> */}
      <FaqSection dict={dict.servicesWebsite.faq} />
    </main>
  )
}
