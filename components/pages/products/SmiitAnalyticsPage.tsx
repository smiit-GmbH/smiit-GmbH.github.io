"use client"

import type { Locale } from "@/lib/dictionary"
import { HeroSection } from "@/components/pages/products/smiit-analytics/hero-section"
import { FeaturesSection } from "@/components/pages/products/smiit-analytics/features-section"
import { AdvantagesSection } from "@/components/pages/products/smiit-analytics/advantages-section"
import { PricingSection } from "@/components/pages/products/smiit-analytics/pricing-section"
import { ReviewsSection } from "@/components/pages/products/smiit-analytics/reviews-section"
import { ProcessSection } from "@/components/pages/products/smiit-analytics/process-section"
import FaqSection from "@/components/pages/shared/faq-section"
import RelatedLinkBand from "@/components/pages/shared/related-link-band"

export default function SmiitAnalyticsPage({
  lang,
  dict,
}: {
  lang: Locale
  dict: any
}) {
  const related = dict.smiitAnalytics.relatedLink
  return (
    <main>
      <HeroSection dict={dict} />
      <FeaturesSection dict={dict} />
      <AdvantagesSection dict={dict} />
      <PricingSection dict={dict} />
      <ReviewsSection dict={dict} lang={lang} />
      <ProcessSection dict={dict} />
      <RelatedLinkBand text={related.text} linkLabel={related.linkLabel} href={related.href} />
      <FaqSection dict={dict.smiitAnalytics.faq} compact />
    </main>
  )
}
