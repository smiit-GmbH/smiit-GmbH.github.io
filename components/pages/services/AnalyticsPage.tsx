"use client"

import type { Locale } from "@/lib/dictionary"
import HeroSection from "@/components/pages/services/analytics/hero-section"
import PortfolioSection from "@/components/pages/services/analytics/portfolio"
import ManifestBand from "@/components/pages/services/analytics/manifest-band"
import ProcessSection from "@/components/pages/services/analytics/process-section"
import AnalyticsCTA from "@/components/pages/services/analytics/cta"
import AnalyticsReviews from "@/components/pages/services/analytics/reviews"
import FaqSection from "@/components/pages/shared/faq-section"

export default function AnalyticsPage({
  lang,
  dict,
}: {
  lang: Locale
  dict: any
}) {
  return (
    <main>
      <HeroSection lang={lang} dict={dict} />
      <PortfolioSection dict={dict} />
      <ManifestBand dict={dict} />
      <ProcessSection dict={dict} />
      <AnalyticsReviews dict={dict} />
      <AnalyticsCTA dict={dict} />
      <FaqSection dict={dict.servicesAnalytics.faq} />
    </main>
  )
}
