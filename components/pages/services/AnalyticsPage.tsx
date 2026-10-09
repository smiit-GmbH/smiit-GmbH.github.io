import dynamic from "next/dynamic"
import type { Dictionary, Locale } from "@/lib/dictionary"
import HeroSection from "@/components/pages/services/analytics/hero-section"
import ServicePage from "@/components/pages/services/shared/service-page"

const PortfolioSection = dynamic(() => import("@/components/pages/services/analytics/portfolio"))

export default function AnalyticsPage({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  return <ServicePage service="analytics" lang={lang} dict={dict} Hero={HeroSection} Portfolio={PortfolioSection} />
}
