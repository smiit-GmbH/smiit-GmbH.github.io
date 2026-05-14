import dynamic from "next/dynamic"
import type { Locale } from "@/lib/dictionary"
import HeroSection from "@/components/pages/services/apps/hero-section"

const PortfolioSection = dynamic(() => import("@/components/pages/services/apps/portfolio"))
const ManifestBand = dynamic(() => import("@/components/pages/services/apps/manifest-band"))
const ProcessSection = dynamic(() => import("@/components/pages/services/apps/process-section"))
const AppsReviews = dynamic(() => import("@/components/pages/services/apps/reviews"))
const FaqSection = dynamic(() => import("@/components/pages/shared/faq-section"))
const RelatedLinkBand = dynamic(() => import("@/components/pages/shared/related-link-band"))
const AppsCTA = dynamic(() => import("@/components/pages/services/apps/cta"))

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
