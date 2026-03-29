"use client"

import type { Locale } from "@/lib/dictionary"
import HeroSection from "@/components/pages/services/analytics/hero-section"

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
    </main>
  )
}
