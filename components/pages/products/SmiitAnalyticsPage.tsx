"use client"

import type { Locale } from "@/lib/dictionary"
import { HeroSection } from "@/components/pages/products/smiit-analytics/hero-section"
import { FeaturesSection } from "@/components/pages/products/smiit-analytics/features-section"
import { AdvantagesSection } from "@/components/pages/products/smiit-analytics/advantages-section"
import { PricingSection } from "@/components/pages/products/smiit-analytics/pricing-section"
import { ProcessSection } from "@/components/pages/products/smiit-analytics/process-section"
import FaqSection from "@/components/pages/shared/faq-section"

export default function SmiitAnalyticsPage({
  lang,
  dict,
}: {
  lang: Locale
  dict: any
}) {
  return (
    <main>
      <HeroSection dict={dict} />
      <FeaturesSection dict={dict} />
      <AdvantagesSection dict={dict} />
      <PricingSection dict={dict} />
      <ProcessSection dict={dict} />
      <FaqSection dict={dict.smiitAnalytics.faq} compact />
    </main>
  )
}
