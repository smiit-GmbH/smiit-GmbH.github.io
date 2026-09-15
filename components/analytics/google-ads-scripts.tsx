"use client"

import { useEffect, useState } from "react"
import Script from "next/script"
import {
  CONSENT_CHANGE_EVENT,
  GA_ADS_ID,
  GA4_ID,
  getStoredConsent,
  type ConsentChoice,
} from "@/lib/gtag"

// Inline bootstrap: sets up the dataLayer and declares the consent state BEFORE
// the config commands. This only ever runs after the visitor has opted in
// (basic Consent Mode), so the default "denied" is immediately updated to
// "granted". The external gtag.js library processes the queued commands once
// it loads, so ordering between the two scripts is safe.
const initScript = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('consent', 'default', {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'denied'
});
gtag('consent', 'update', {
  ad_storage: 'granted',
  ad_user_data: 'granted',
  ad_personalization: 'granted',
  analytics_storage: 'granted'
});
gtag('js', new Date());
gtag('config', '${GA_ADS_ID}');
gtag('config', '${GA4_ID}');
`

export function GoogleAdsScripts() {
  // Once loaded, gtag.js stays loaded for the session; a later withdrawal is
  // handled via updateConsent(false) instead of unmounting.
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    if (getStoredConsent() === "granted") setEnabled(true)

    const onChange = (e: Event) => {
      if ((e as CustomEvent<ConsentChoice>).detail === "granted") setEnabled(true)
    }
    window.addEventListener(CONSENT_CHANGE_EVENT, onChange)
    return () => window.removeEventListener(CONSENT_CHANGE_EVENT, onChange)
  }, [])

  if (!enabled) return null

  return (
    <>
      <Script id="gtag-init" strategy="afterInteractive">
        {initScript}
      </Script>
      <Script
        id="gtag-js"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ADS_ID}`}
        strategy="afterInteractive"
      />
    </>
  )
}
