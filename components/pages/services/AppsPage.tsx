"use client"

import type { Locale } from "@/lib/dictionary"
import HeroSection from "@/components/pages/services/apps/hero-section"
import PortfolioSection from "@/components/pages/services/apps/portfolio"
import ManifestBand from "@/components/pages/services/apps/manifest-band"
import ProcessSection from "@/components/pages/services/apps/process-section"
import AppsCTA from "@/components/pages/services/apps/cta"
import AppsReviews from "@/components/pages/services/apps/reviews"

export default function AppsPage({
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
      <AppsReviews dict={dict} />
      <AppsCTA dict={dict} />
    </main>
  )
}
