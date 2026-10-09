import type { ComponentType } from "react"
import dynamic from "next/dynamic"
import type { Dictionary, Locale } from "@/lib/dictionary"
import { listGlossaryCatalogByCluster } from "@/lib/glossary"
import { getCaseStudyHrefsByClient } from "@/lib/case-studies"
import { getServiceDict, serviceThemes, type ServiceKey } from "./service-theme"

const ServiceManifestBand = dynamic(() => import("./service-manifest-band"))
const ServiceProcessSection = dynamic(() => import("./service-process-section"))
const ServiceReviews = dynamic(() => import("./service-reviews"))
const ServiceCTA = dynamic(() => import("./service-cta"))
const FaqSection = dynamic(() => import("@/components/pages/shared/faq-section"))
const RelatedLinkBand = dynamic(() => import("@/components/pages/shared/related-link-band"))
const GlossaryLinksBand = dynamic(() => import("@/components/pages/shared/glossary-links-band"))

/**
 * Shared layout of the analytics / apps / strategy service pages. Hero and
 * portfolio are service-specific (each has its own visuals) and are passed in;
 * every other section is shared and themed via `serviceThemes`.
 */
export default function ServicePage({
  service,
  lang,
  dict,
  Hero,
  Portfolio,
}: {
  service: ServiceKey
  lang: Locale
  dict: Dictionary
  Hero: ComponentType<{ lang: Locale; dict: Dictionary }>
  Portfolio: ComponentType<{ dict: Dictionary }>
}) {
  const theme = serviceThemes[service]
  const serviceDict = getServiceDict(dict, service)
  const related = serviceDict.relatedLink

  return (
    <main data-page={theme.dataPage}>
      <Hero lang={lang} dict={dict} />
      <Portfolio dict={dict} />
      <ServiceManifestBand dict={dict} service={service} />
      <ServiceProcessSection dict={dict} service={service} />
      <ServiceReviews dict={dict} lang={lang} service={service} caseStudyHrefs={getCaseStudyHrefsByClient(lang)} />
      <RelatedLinkBand text={related.text} linkLabel={related.linkLabel} href={related.href} {...theme.linkAccent} />
      <ServiceCTA dict={dict} service={service} />
      <FaqSection dict={serviceDict.faq} />
      <GlossaryLinksBand lang={lang} entries={listGlossaryCatalogByCluster(service)} {...theme.linkAccent} />
    </main>
  )
}
