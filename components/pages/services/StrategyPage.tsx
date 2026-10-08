import dynamic from "next/dynamic"
import type { Dictionary, Locale } from "@/lib/dictionary"
import HeroSection from "@/components/pages/services/strategy/hero-section"
import ServicePage from "@/components/pages/services/shared/service-page"

const PortfolioSection = dynamic(() => import("@/components/pages/services/strategy/portfolio"))

export default function StrategyPage({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  return (
    <ServicePage service="strategy" lang={lang} dict={dict} Hero={HeroSection} Portfolio={PortfolioSection} />
  )
}
