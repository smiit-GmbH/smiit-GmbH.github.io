import dynamic from "next/dynamic"
import type { Dictionary, Locale } from "@/lib/dictionary"
import HeroSection from "@/components/pages/services/apps/hero-section"
import ServicePage from "@/components/pages/services/shared/service-page"

const PortfolioSection = dynamic(() => import("@/components/pages/services/apps/portfolio"))

export default function AppsPage({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  return <ServicePage service="apps" lang={lang} dict={dict} Hero={HeroSection} Portfolio={PortfolioSection} />
}
