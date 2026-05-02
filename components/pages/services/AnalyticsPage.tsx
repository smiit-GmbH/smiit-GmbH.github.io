"use client"

import type { Locale } from "@/lib/dictionary"
import HeroSection from "@/components/pages/services/analytics/hero-section"
import WhyDashboardSection from "@/components/pages/services/analytics/why-dashboard"
import HeroDashboardJourney from "@/components/pages/services/analytics/hero-dashboard-journey"
import PortfolioSection from "@/components/pages/services/analytics/portfolio"
import ManifestBand from "@/components/pages/services/analytics/manifest-band"
import ProcessSection from "@/components/pages/services/analytics/process-section"
import AnalyticsCTA from "@/components/pages/services/analytics/cta"
import AnalyticsReviews from "@/components/pages/services/analytics/reviews"

export default function AnalyticsPage({
  lang,
  dict,
}: {
  lang: Locale
  dict: any
}) {
  return (
    <main className="relative z-0 bg-[#F6F9FC]">
      <div className="pointer-events-none fixed inset-0 -z-10 hidden bg-[radial-gradient(circle_at_top_center,_rgba(33,86,156,0.13),_transparent_28%),radial-gradient(circle_at_18%_84%,_rgba(34,211,238,0.07),_transparent_22%)] lg:block" />
      <div
        className="pointer-events-none fixed inset-0 -z-10 hidden opacity-[0.08] lg:block"
        style={{
          backgroundImage: "url(/assets/grain.webp)",
          backgroundRepeat: "repeat",
          backgroundSize: "160px 160px",
          mixBlendMode: "soft-light",
        }}
      />
      <HeroSection lang={lang} dict={dict} />
      <WhyDashboardSection dict={dict} />
      <HeroDashboardJourney lang={lang} dict={dict} />
      <PortfolioSection dict={dict} />
      <ManifestBand dict={dict} />
      <ProcessSection dict={dict} />
      <AnalyticsReviews dict={dict} />
      <AnalyticsCTA dict={dict} />
    </main>
  )
}
