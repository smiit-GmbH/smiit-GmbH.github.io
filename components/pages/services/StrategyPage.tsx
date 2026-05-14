import dynamic from "next/dynamic"
import type { Locale } from "@/lib/dictionary"
import HeroSection from "@/components/pages/services/strategy/hero-section"

const PortfolioSection = dynamic(() => import("@/components/pages/services/strategy/portfolio"))
const ManifestBand = dynamic(() => import("@/components/pages/services/strategy/manifest-band"))
const ProcessSection = dynamic(() => import("@/components/pages/services/strategy/process-section"))
const StrategyReviews = dynamic(() => import("@/components/pages/services/strategy/reviews"))
const FaqSection = dynamic(() => import("@/components/pages/shared/faq-section"))
const RelatedLinkBand = dynamic(() => import("@/components/pages/shared/related-link-band"))
const StrategyCTA = dynamic(() => import("@/components/pages/services/strategy/cta"))

export default function StrategyPage({
  lang,
  dict,
}: {
  lang: Locale
  dict: any
}) {
  const related = dict.servicesStrategy.relatedLink
  return (
    <main data-page="strategy">
      <HeroSection lang={lang} dict={dict} />
      <PortfolioSection dict={dict} />
      <ManifestBand dict={dict} />
      <ProcessSection dict={dict} />
      <StrategyReviews dict={dict} />
      <RelatedLinkBand
        text={related.text}
        linkLabel={related.linkLabel}
        href={related.href}
        accent="#64748B"
        accentHover="#475569"
      />
      <StrategyCTA dict={dict} />
      <FaqSection dict={dict.servicesStrategy.faq} />
    </main>
  )
}
