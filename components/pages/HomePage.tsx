import About from "@/components/pages/home/about"
import CustomerCards from "@/components/pages/home/customer-cards"
import HeroSection from "@/components/pages/home/hero-section"
import Products from "@/components/pages/home/products"
import Results from "@/components/pages/home/results"
import Services from "@/components/pages/home/services"
import type { Locale, Dictionary } from "@/lib/dictionary"

export default function HomePage({
  lang,
  dict,
}: {
  lang: Locale
  dict: Dictionary
}) {
  return (
    <>
      <HeroSection lang={lang} dict={dict} />

      <div className="relative z-30 mt-8 home-cards-offset">
        <CustomerCards dict={dict} />
      </div>

      <Services dict={dict} lang={lang} />

      <About dict={dict} />

      <Results dict={dict} locale={lang} />

      <Products dict={dict} />
    </>
  )
}

