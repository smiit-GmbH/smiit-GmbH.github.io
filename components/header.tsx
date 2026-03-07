"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { AlignJustify, Contact, ChevronDown, Globe, PhoneCall, CalendarDays } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { LanguageSwitcher } from "@/components/language-switcher"

export default function Header({ forceLang }: { forceLang?: string }) {
  const [isProductsOpen, setIsProductsOpen] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const pathname = usePathname() || "/"
  const detectedLang = pathname.startsWith("/en") ? "en" : pathname.startsWith("/fr") ? "fr" : "de"
  const lang = forceLang || detectedLang
  const base = `/${lang}`

  function buildPathForLang(currentPathname: string, target: "de" | "en"): string {
    if (currentPathname === "/" || currentPathname === "") {
      return `/${target}/`
    }

    if (currentPathname.startsWith("/de/") || currentPathname === "/de") {
      return currentPathname.replace(/^\/de(\/|$)/, `/${target}/`)
    }
    if (currentPathname.startsWith("/en/") || currentPathname === "/en") {
      return currentPathname.replace(/^\/en(\/|$)/, `/${target}/`)
    }

    return `/${target}${currentPathname.endsWith("/") ? "" : "/"}`
  }

  const L =
    lang === "de"
      ? {
          home: "Start",
          products: "Produkte",
          services: "Dienstleistungen",
          about: "Über uns",
          talkToExpert: "Kontaktieren Sie uns",
          smiitAnalytics: "smiit Analytics für bexio",
          productScout: "Product Scout",
          azaiElevate: "Azai Elevate",
          webappsWorkflows: "Apps & Workflows",
          analytics: "Datenanalyse",
          consulting: "Unternehmensberatung",
        }
      : {
          home: "Home",
          products: "Our products",
          services: "Our services",
          about: "About us",
          talkToExpert: "Talk to a digital expert",
          smiitAnalytics: "smiit Analytics for bexio",
          productScout: "Product Scout",
          azaiElevate: "Azai Elevate",
          webappsWorkflows: "Apps & Workflows",
          analytics: "Data Analytics",
          consulting: "Business Consulting",
        }

  const homeHref = `${base}/`
  const webappsWorkflowsHref = `${base}/services/apps`
  const analyticsHref = `${base}/services/analytics`
  const consultingHref = `${base}/services/consulting`
  const smiitAnalyticsHref = `${base}/products/smiit-analytics`
  const productScoutHref = `${base}/product-scout`
  const aboutHref = `${base}/about`
  const contactHref = `${base}/contact`

  const servicesLinks = [
    { href: webappsWorkflowsHref, label: L.webappsWorkflows },
    { href: analyticsHref, label: L.analytics },
    { href: consultingHref, label: L.consulting },
  ]

  const productLinks: Array<
    | { type: "internal"; href: string; label: string }
    | { type: "external"; href: string; label: string }
  > = [
    { type: "internal", href: smiitAnalyticsHref, label: L.smiitAnalytics },
    // { type: "internal", href: productScoutHref, label: L.productScout },
    { type: "external", href: "https://www.azai.ch", label: L.azaiElevate },
  ]

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

          <div className="hidden lg:flex items-center gap-8">
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
                  {servicesLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-black/[0.04] rounded-xl transition-colors"
                      scroll={false}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative group" onMouseEnter={() => setIsProductsOpen(true)} onMouseLeave={() => setIsProductsOpen(false)}>
              <button
                className="flex items-center gap-2 rounded-xl bg-transparent px-5 py-2.5 text-sm font-medium text-black hover:bg-black/5 transition-colors cursor-pointer"
              >
                {L.products}
                <ChevronDown className="w-4 h-4 opacity-60" />
              </button>
              <div
                className={`absolute left-0 mt-3 w-60 bg-white/98 backdrop-blur-md border border-black/10 rounded-2xl shadow-xl transition-all duration-200 ${isProductsOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"}`}
              >
                <div className="p-2">
                  {productLinks.map((item) =>
                    item.type === "external" ? (
                      <a
                        key={item.href}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-black/[0.04] rounded-xl transition-colors"
                      >
                        {item.label}
                      </a>
                    ) : (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-black/[0.04] rounded-xl transition-colors"
                        scroll={false}
                      >
                        {item.label}
                      </Link>
                    )
                  )}
                </div>
              </div>
            </div>

            <Link href={aboutHref} className="px-2 text-sm font-medium text-black hover:text-black/70 transition-colors cursor-pointer" scroll={false}>
              {L.about}
            </Link>
          </div>

          <div className="flex items-center gap-3 sm:gap-6">
            <Link href={contactHref} scroll={false} className="hidden lg:block">
              <Button className="bg-[#F703EB] hover:bg-[#DE02D2] text-white rounded-md px-3 py-2 font-medium text-sm tracking-tight cursor-pointer shadow-none border-none">
                {L.talkToExpert}
              </Button>
            </Link>
            <div className="px-2 hidden lg:block">
              <LanguageSwitcher />
            </div>

            <div className="lg:hidden flex items-center gap-2">
              <a
                href="#book"
                aria-label={L.talkToExpert}
                className="h-10 w-10 rounded-xl backdrop-blur-md flex items-center justify-center transition-colors"
              >
                <CalendarDays className="h-5 w-5 mr-2 text-black/80" />
              </a>

              <Sheet>
                <SheetTrigger asChild>
                  <button
                    type="button"
                    aria-label="Open menu"
                    className="h-10 w-10 rounded-xl border border-black/20 backdrop-blur-md flex items-center justify-center"
                  >
                    <AlignJustify className="h-5 w-5 text-black/80" />
                  </button>
                </SheetTrigger>

                <SheetContent side="right" className="bg-white/95 backdrop-blur-md border-black/10 gap-[clamp(0.5rem,1.6vh,1rem)]">
                  <SheetHeader className="px-4 pt-[clamp(0.625rem,2vh,1rem)] pb-[clamp(0.5rem,1.6vh,1rem)]">
                    <SheetTitle>{lang === "de" ? "Menü" : "Menu"}</SheetTitle>

                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-black/50">
                        <Globe className="h-4 w-4" />
                        <span>{lang === "de" ? "Sprache" : "Language"}</span>
                      </div>

                      <div className="inline-flex items-center rounded-full border border-black/10 bg-black/[0.04] p-1">
                        {([
                          { code: "de" as const, label: "DE" },
                          { code: "en" as const, label: "EN" },
                        ] as const).map((l) => {
                          const active = l.code === lang

                          return (
                            <SheetClose asChild key={l.code}>
                              <Link
                                href={buildPathForLang(pathname, l.code)}
                                scroll={false}
                                aria-current={active ? "page" : undefined}
                                className={[
                                  "inline-flex h-8 min-w-12 items-center justify-center rounded-full px-3 text-xs font-semibold transition-all duration-200",
                                  active
                                    ? "bg-white text-black shadow-sm ring-1 ring-black/5"
                                    : "text-black/60 hover:text-black hover:bg-white/50",
                                ].join(" ")}
                              >
                                {l.label}
                              </Link>
                            </SheetClose>
                          )
                        })}
                      </div>
                    </div>
                  </SheetHeader>

                  <div className="flex-1 overflow-y-auto px-4 pb-[clamp(0.625rem,1.8vh,1rem)]">
                    <div className="space-y-[clamp(0.5rem,3.5vh,1.75rem)]">

                      <div>
                        <p className="text-sm font-semibold text-black">{lang === "de" ? "Startseite" : "Homepage"}</p>
                        <div className="mt-[clamp(0.25rem,1.6vh,0.75rem)] space-y-1">
                          <SheetClose asChild>
                            <Link
                              href={homeHref}
                              scroll={false}
                              className="block rounded-xl px-3 py-[clamp(0.4rem,1.2vh,0.5rem)] text-sm text-black/80 hover:bg-black/[0.04]"
                            >
                              {L.home}
                            </Link>
                          </SheetClose>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-black">{L.services}</p>
                        <div className="mt-[clamp(0.25rem,1.6vh,0.75rem)] space-y-1">
                          {servicesLinks.map((item) => (
                            <SheetClose asChild key={item.href}>
                              <Link
                                href={item.href}
                                scroll={false}
                                className="block rounded-xl px-3 py-[clamp(0.4rem,1.2vh,0.5rem)] text-sm text-black/80 hover:bg-black/[0.04]"
                              >
                                {item.label}
                              </Link>
                            </SheetClose>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-black">{L.products}</p>
                        <div className="mt-[clamp(0.25rem,1.6vh,0.75rem)] space-y-1">
                          {productLinks.map((item) =>
                            item.type === "external" ? (
                              <a
                                key={item.href}
                                href={item.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block rounded-xl px-3 py-[clamp(0.4rem,1.2vh,0.5rem)] text-sm text-black/80 hover:bg-black/[0.04]"
                              >
                                {item.label}
                              </a>
                            ) : (
                              <SheetClose asChild key={item.href}>
                                <Link
                                  href={item.href}
                                  scroll={false}
                                  className="block rounded-xl px-3 py-[clamp(0.4rem,1.2vh,0.5rem)] text-sm text-black/80 hover:bg-black/[0.04]"
                                >
                                  {item.label}
                                </Link>
                              </SheetClose>
                            )
                          )}
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-black">{lang === "de" ? "Unternehmen" : "Company"}</p>
                        <div className="mt-[clamp(0.25rem,1.6vh,0.75rem)] space-y-1">
                          <SheetClose asChild>
                            <Link
                              href={aboutHref}
                              scroll={false}
                              className="block rounded-xl px-3 py-[clamp(0.4rem,1.2vh,0.5rem)] text-sm text-black/80 hover:bg-black/[0.04]"
                            >
                              {L.about}
                            </Link>
                          </SheetClose>
                        </div>
                      </div>
                    </div>
                  </div>

                  <SheetFooter className="px-4 pb-[clamp(0.625rem,1.8vh,1rem)] pt-[clamp(0.5rem,1.4vh,0.75rem)]">
                    <SheetClose asChild>
                      <Link href={contactHref} scroll={false}>
                        <Button className="w-full bg-[#F703EB] hover:bg-[#DE02D2] text-white rounded-md px-3 py-[clamp(0.4rem,1.2vh,0.5rem)] font-medium text-sm tracking-tight cursor-pointer shadow-none border-none">
                          {L.talkToExpert}
                        </Button>
                      </Link>
                    </SheetClose>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
