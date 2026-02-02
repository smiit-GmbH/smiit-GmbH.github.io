import HeroSectionClient from "@/components/pages/home/hero-section.client"
import type { Locale } from "@/lib/dictionary"

export default function HeroSection({
  lang,
  dict,
}: {
  lang: Locale
  dict: any
}) {
  return <HeroSectionClient lang={lang} dict={dict} />
}

