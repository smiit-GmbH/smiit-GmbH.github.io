"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LanguageSwitcher } from "@/components/language-switcher"

export default function Header() {
  const [isProductsOpen, setIsProductsOpen] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const pathname = usePathname() || "/"
  const lang = pathname.startsWith("/en") ? "en" : pathname.startsWith("/fr") ? "fr" : "de"
  const base = `/${lang}`

  const L =
    lang === "de"
      ? {
          home: "Startseite",
          products: "Produkte",
          services: "Dienstleistungen",
          about: "Über uns",
          talkToExpert: "Sprechen Sie mit uns",
          smiitAnalytics: "smiit Analytics",
          productScout: "Product Scout",
          azaiElevate: "Azai Elevate",
          webappsWorkflows: "Apps & Workflows",
          analysis: "Datenanalyse",
          consulting: "Unternehmensberatung",
        }
      : {
          home: "Home",
          products: "Our products",
          services: "Our services",
          about: "About us",
          talkToExpert: "Talk to a digital expert",
          smiitAnalytics: "smiit Analytics",
          productScout: "Product Scout",
          azaiElevate: "Azai Elevate",
          webappsWorkflows: "Apps & Workflows",
          analysis: "Data Analytics",
          consulting: "Business Consulting",
        }

  const homeHref = `${base}/`
  const webappsWorkflowsHref = `${base}/webappsWorkflows`
  const analysisHref = `${base}/analysis`
  const consultingHref = `${base}/consulting`
  const smiitAnalyticsHref = `${base}/smiit-analytics`
  const productScoutHref = `${base}/product-scout`
  const aboutHref = `${base}/about`
  const contactHref = `${base}/contact`

  return (
    <nav className="fixed top-0 w-full z-50 bg-transparent backdrop-blur-md">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-18">
          {/* Logo */}
          <Link href={homeHref} className="flex items-center relative group" scroll={false}>
            <Image
              src="/logo_black.png"
              alt="smiit"
              width={140}
              height={48}
              className="h-12 w-auto object-contain"
              priority
            />
          </Link>

          {/* Menu Items */}
          <div className="hidden md:flex items-center gap-8">
            {/* Services Dropdown */}
            <div className="relative group" onMouseEnter={() => setIsServicesOpen(true)} onMouseLeave={() => setIsServicesOpen(false)}>
              <button
                className="flex items-center gap-2 rounded-xl bg-transparent px-5 py-2.5 text-sm font-medium text-black hover:bg-black/5 transition-colors cursor-pointer"
              >
                {L.services}
                <ChevronDown className="w-4 h-4 opacity-60" />
              </button>
              <div
                className={`absolute left-0 mt-3 w-60 bg-white/98 backdrop-blur-md border border-black/10 rounded-2xl shadow-xl transition-all duration-200 ${isServicesOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"}`}
              >
                <div className="p-2">
                  <Link
                    href={webappsWorkflowsHref}
                    className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-black/[0.04] rounded-xl transition-colors"
                    scroll={false}
                  >
                    {L.webappsWorkflows}
                  </Link>
                  <Link
                    href={analysisHref}
                    className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-black/[0.04] rounded-xl transition-colors"
                    scroll={false}
                  >
                    {L.analysis}
                  </Link>
                  <Link
                    href={consultingHref}
                    className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-black/[0.04] rounded-xl transition-colors"
                    scroll={false}
                  >
                    {L.consulting}
                  </Link>
                </div>
              </div>
            </div>

            {/* Products Dropdown */}
            <div className="relative group" onMouseEnter={() => setIsProductsOpen(true)} onMouseLeave={() => setIsProductsOpen(false)}>
              <button
                className="flex items-center gap-2 px-2 py-2 text-sm font-medium text-black hover:text-black/70 transition-colors cursor-pointer"
              >
                {L.products}
                <ChevronDown className="w-4 h-4 opacity-60" />
              </button>
              <div
                className={`absolute left-0 mt-3 w-60 bg-white/98 backdrop-blur-md border border-black/10 rounded-2xl shadow-xl transition-all duration-200 ${isProductsOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"}`}
              >
                <div className="p-2">
                  <Link
                    href={smiitAnalyticsHref}
                    className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-black/[0.04] rounded-xl transition-colors"
                    scroll={false}
                  >
                    {L.smiitAnalytics}
                  </Link>
                  <Link
                    href={productScoutHref}
                    className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-black/[0.04] rounded-xl transition-colors"
                    scroll={false}
                  >
                    {L.productScout}
                  </Link>
                  <Link
                    href="https://www.azai.ch"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-black/[0.04] rounded-xl transition-colors"
                  >
                    Azai - Elevate
                  </Link>
                </div>
              </div>
            </div>

            <Link href={aboutHref} className="px-2 text-sm font-medium text-black hover:text-black/70 transition-colors cursor-pointer" scroll={false}>
              {L.about}
            </Link>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3 sm:gap-6">
            <Link href={contactHref} scroll={false}>
              <Button className="bg-[#F703EB] hover:bg-[#DE02D2] text-black rounded-md px-3 py-2 font-medium text-sm tracking-tight cursor-pointer shadow-none border-none">
                {L.talkToExpert}
              </Button>
            </Link>
            <div className="px-2">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
