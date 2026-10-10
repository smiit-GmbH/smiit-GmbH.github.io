import LocalizedLink from "../../localized-link"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import type { Locale, Dictionary } from "@/lib/dictionary"
import { DesktopServices } from "./services/desktop-services"
import { MobileServicesCinema } from "./services/mobile-services-cinema"
import { ServiceCard } from "./services/service-card"
import { getImage, getLink } from "./services/service-meta"

interface ServicesProps {
  dict: Dictionary
  lang: Locale
}

export default function Services({ dict, lang }: ServicesProps) {
  const items = (dict?.services?.items ?? []) as Array<{
    title: string
    text: string
    tags: string[]
  }>

  const title = dict?.services?.title || ""
  const words = title.split(" ")
  const lastWord = words.length > 0 ? words.pop() : ""
  const firstPart = words.join(" ")

  const sectionHeader = (
    <div className="text-center">
      <h2 className="font-serif text-[2.6rem] sm:text-[3.15rem] md:text-[3.6rem] leading-[1.05] tracking-tight text-black dark:text-white whitespace-pre-line text-balance">
        {firstPart} <span className="text-[#21569c]">{lastWord}</span>
      </h2>
      <p className="mt-4 text-sm sm:text-base leading-relaxed text-black/75 dark:text-white/75 max-w-[54ch] mx-auto">
        {dict.services.subtitle}
      </p>
    </div>
  )

  return (
    <section className="relative pt-14 pb-8 md:pt-12 md:pb-6">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop + Tablet: header rendered normally above the cards */}
        <div className="hidden md:block">{sectionHeader}</div>

        {/* Mobile: cinema scroll — sticky pin per service, scroll-driven kinetic typography */}
        <MobileServicesCinema
          items={items}
          header={sectionHeader}
          ctaText={dict.services.mobileCta}
          ctaButton={dict.services.mobileCtaButton}
        />

        {/* Tablet: simple vertical card list for md–lg range */}
        <div className="hidden md:flex lg:hidden flex-col gap-5 mt-10">
          {items.map((item) => (
            <ServiceCard
              key={item.title}
              title={item.title}
              text={item.text}
              tags={item.tags}
              href={getLink(item.title)}
              imageSrc={getImage(item.title)}
            />
          ))}
          {dict.services.mobileCta && dict.services.mobileCtaButton && (
            <div className="mt-4 text-center">
              <p className="text-sm leading-relaxed text-black/75 dark:text-white/75 max-w-[54ch] mx-auto">
                {dict.services.mobileCta}
              </p>
              <div className="mt-4 flex justify-center">
                <a href="#book">
                  <Button
                    variant="outline"
                    className="rounded-xl px-8 py-6 text-base border-black text-black hover:bg-black hover:text-white transition-all duration-300 hover:scale-105 cursor-pointer"
                  >
                    {dict.services.mobileCtaButton}
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </a>
              </div>
            </div>
          )}
        </div>

        <DesktopServices items={items} />

        {/* Desktop (lg+): primary outline button — no booking CTA is shown here */}
        <div className="mt-10 hidden justify-center md:mt-12 lg:flex">
          <LocalizedLink href="/case-studies">
            <Button
              variant="outline"
              className="group rounded-xl px-8 py-6 text-base border-black text-black hover:bg-black hover:text-white transition-all duration-300 hover:scale-105 cursor-pointer dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black"
            >
              {lang === "de" ? "Referenzen ansehen" : "View our case studies"}
              <ChevronRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Button>
          </LocalizedLink>
        </div>

        {/* Mobile/Tablet (<lg): subtle secondary link — the booking CTA above stays the primary action */}
        <div className="mt-7 flex justify-center lg:hidden">
          <LocalizedLink
            href="/case-studies"
            className="group inline-flex items-center gap-1 text-sm font-medium text-black/65 underline-offset-4 transition-colors hover:text-black hover:underline dark:text-white/65 dark:hover:text-white"
          >
            {lang === "de" ? "Referenzen ansehen" : "View our case studies"}
            <ChevronRight className="ml-0.5 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </LocalizedLink>
        </div>
      </div>
    </section>
  )
}
