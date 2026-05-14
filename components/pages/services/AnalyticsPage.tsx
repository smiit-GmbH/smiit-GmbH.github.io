import dynamic from "next/dynamic"
import type { Locale } from "@/lib/dictionary"
import HeroSection from "@/components/pages/services/analytics/hero-section"

const PortfolioSection = dynamic(() => import("@/components/pages/services/analytics/portfolio"))
const ManifestBand = dynamic(() => import("@/components/pages/services/analytics/manifest-band"))
const ProcessSection = dynamic(() => import("@/components/pages/services/analytics/process-section"))
const AnalyticsReviews = dynamic(() => import("@/components/pages/services/analytics/reviews"))
const FaqSection = dynamic(() => import("@/components/pages/shared/faq-section"))
const RelatedLinkBand = dynamic(() => import("@/components/pages/shared/related-link-band"))
const AnalyticsCTA = dynamic(() => import("@/components/pages/services/analytics/cta"))

export default function AnalyticsPage({
  lang,
  dict,
}: {
  lang: Locale
  dict: any
}) {
  const related = dict.servicesAnalytics.relatedLink
  return (
    <main>
      <HeroSection lang={lang} dict={dict} />
      <PortfolioSection dict={dict} />
      <ManifestBand dict={dict} />
      <ProcessSection dict={dict} />
      <AnalyticsReviews dict={dict} />
      <RelatedLinkBand text={related.text} linkLabel={related.linkLabel} href={related.href} />
      <AnalyticsCTA dict={dict} />
      <FaqSection dict={dict.servicesAnalytics.faq} />
    </main>
  )
}
