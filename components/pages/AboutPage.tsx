"use client"

import type { Locale } from "@/lib/dictionary"
import { HeroSection } from "@/components/pages/about/hero-section"
import { MissionSection } from "@/components/pages/about/mission"

export default function AboutPage({
  lang,
  dict,
}: {
  lang: Locale
  dict: any
}) {
  return (
    <main>
      <HeroSection lang={lang} dict={dict} />
      <MissionSection dict={dict} />
    </main>
  )
}
