import Cta from "@/components/pages/home/cta"
import CustomerCards from "@/components/pages/home/customer-cards"
import HeroSection from "@/components/pages/home/hero-section"
import type { Locale } from "@/lib/dictionary"

export default function HomePage({
  lang,
  dict,
}: {
  lang: Locale
  dict: any
}) {
  return (
    <>
      <HeroSection lang={lang} dict={dict} />

      <div className="relative z-30 mt-10 md:-mt-21">
        <CustomerCards dict={dict} />
      </div>

      <Cta dict={dict} />
    </>
  )
}

