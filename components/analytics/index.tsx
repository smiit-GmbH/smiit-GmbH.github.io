import type { Locale } from "@/lib/dictionary"
import { GoogleAdsScripts } from "./google-ads-scripts"
import { ConversionTracker } from "./conversion-tracker"
import { ConsentBanner } from "./consent-banner"

// Bundles Google Ads / Analytics tracking: gtag.js (loaded only after opt-in,
// basic Consent Mode v2), click-conversion tracking, and the consent banner.
export function Analytics({ lang }: { lang: Locale }) {
  return (
    <>
      <GoogleAdsScripts />
      <ConversionTracker />
      <ConsentBanner lang={lang} />
    </>
  )
}
