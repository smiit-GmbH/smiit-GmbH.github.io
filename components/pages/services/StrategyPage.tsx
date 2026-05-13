"use client"

import type { Locale } from "@/lib/dictionary"
import HeroSection from "@/components/pages/services/strategy/hero-section"
import PortfolioSection from "@/components/pages/services/strategy/portfolio"
import ManifestBand from "@/components/pages/services/strategy/manifest-band"
import ProcessSection from "@/components/pages/services/strategy/process-section"
import StrategyCTA from "@/components/pages/services/strategy/cta"
import StrategyReviews from "@/components/pages/services/strategy/reviews"
import FaqSection from "@/components/pages/shared/faq-section"
import RelatedLinkBand from "@/components/pages/shared/related-link-band"

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
