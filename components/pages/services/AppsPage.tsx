"use client"

import type { Locale } from "@/lib/dictionary"
import HeroSection from "@/components/pages/services/apps/hero-section"
import PortfolioSection from "@/components/pages/services/apps/portfolio"
import ManifestBand from "@/components/pages/services/apps/manifest-band"
import ProcessSection from "@/components/pages/services/apps/process-section"
import AppsCTA from "@/components/pages/services/apps/cta"
import AppsReviews from "@/components/pages/services/apps/reviews"
import FaqSection from "@/components/pages/shared/faq-section"
import RelatedLinkBand from "@/components/pages/shared/related-link-band"

export default function AppsPage({
  lang,
  dict,
}: {
  lang: Locale
  dict: any
}) {
  const related = dict.servicesApps.relatedLink
  return (
    <main data-page="apps">
      <HeroSection lang={lang} dict={dict} />
      <PortfolioSection dict={dict} />
      <ManifestBand dict={dict} />
      <ProcessSection dict={dict} />
      <AppsReviews dict={dict} />
      <RelatedLinkBand
        text={related.text}
        linkLabel={related.linkLabel}
        href={related.href}
        accent="#F703EB"
        accentHover="#C002B7"
      />
      <AppsCTA dict={dict} />
      <FaqSection dict={dict.servicesApps.faq} />
    </main>
  )
}
