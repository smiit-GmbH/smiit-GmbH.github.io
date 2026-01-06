import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Mail, MapPin, Phone } from "lucide-react"

export default function Footer() {
  const pathname = usePathname() || "/"
  const lang = pathname.startsWith("/en") ? "en" : "de"
  const base = `/${lang}`

  const L =
    lang === "de"
      ? {
          services: "Dienstleistungen",
          apps: "Apps & Workflows",
          analysis: "Datenanalyse",
          consulting: "Unternehmensberatung",
          company: "Unternehmen",
          about: "Über uns",
          products: "Produkte",
          contactSection: "Kontakt",
          rights: "Alle Rechte vorbehalten.",
          privacy: "Datenschutzerklärung",
          terms: "Nutzungsbedingungen",
          imprint: "Impressum",
          companyName: "smiit GmbH",
          street: "Reiherweg 96",
          city: "89584 Ehingen",
          country: "Deutschland",
          companyBlurb: "Datengesteuerte Transformation, maßgeschneidert für den Mittelstand.",
          emailValue: "kontakt@smiit.de",
          phoneValue: "+49 160 4073198",
          phoneHref: "tel:+491604073198",
        }
      : {
          services: "Services",
          apps: "Apps & Workflows",
          analysis: "Data Analytics",
          consulting: "Consulting",
          company: "Company",
          about: "About",
          products: "Our Products",
          contactSection: "Contact",
          rights: "All rights reserved.",
          privacy: "Privacy Policy",
          terms: "Terms of Service",
          imprint: "Legal Notice",
          companyName: "smiit GmbH",
          street: "Reiherweg 96",
          city: "89584 Ehingen",
          country: "Germany",
          companyBlurb: "Data-driven transformation, tailored for the backbone of SMEs.",
          emailValue: "kontakt@smiit.de",
          phoneValue: "+49 160 4073198",
          phoneHref: "tel:+491604073198",
        }

  const homeHref = `${base}/`
  const appsHref = `${base}/apps`
  const analysisHref = `${base}/analysis`
  const consultingHref = `${base}/consulting`
  const aboutHref = `${base}/about`
  const productsHref = `${base}/products`
  const imprintHref = `${base}/legal-notice`
  const privacyHref = `${base}/privacy`

  return (
    <footer className="bg-background py-10">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 md:gap-12 mb-12">
          {/* Left Column - Logo & Description */}
          <div className="col-span-2 lg:col-span-2 space-y-6">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <Link href={homeHref} aria-label="Claimity home" className="flex items-center">
                <Image src="/logo_black.png" alt="Claimity Logo" width={70} height={28} priority />
              </Link>
            </div>

            {/* Description */}
            <p className="text-md text-black leading-relaxed max-w-sm">
              {L.companyBlurb}
            </p>

            {/* Social Media */}
            <div className="flex gap-4">
              <a
                href="https://www.linkedin.com/company/smiit-gmbh/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/80 rounded-lg flex items-center justify-center hover:bg-white hover:shadow-xs transition-colors"
                aria-label="smiit on LinkedIn"
              >
                <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 1 */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-black">{L.services}</h3>
            <ul className="space-y-3">
              <li>
                <Link href={appsHref} className="text-sm text-gray-700 hover:text-black transition-colors">
                  {L.apps}
                </Link>
              </li>
              <li>
                <Link href={analysisHref} className="text-sm text-gray-700 hover:text-black transition-colors">
                  {L.analysis}
                </Link>
              </li>
              <li>
                <Link href={consultingHref} className="text-sm text-gray-700 hover:text-black transition-colors">
                  {L.consulting}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2 */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-black">{L.company}</h3>
            <ul className="space-y-3">
              <li>
                <Link href={aboutHref} className="text-sm text-gray-700 hover:text-black transition-colors">
                  {L.about}
                </Link>
              </li>
              <li>
                <Link href={productsHref} className="text-sm text-gray-700 hover:text-black transition-colors">
                  {L.products}
                </Link>
              </li>
              <li>
                <Link
                  href="https://grab.smiit.de"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-700 hover:text-black transition-colors"
                >
                  Sebastian Grab
                </Link>
              </li>
              <li>
                <Link
                  href="https://nesslauer.smiit.de"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-700 hover:text-black transition-colors"
                >
                  Noah Neßlauer
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-black">{L.contactSection}</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-gray-700">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <a
                  href={`mailto:${L.emailValue}`}
                  className="hover:text-black transition-colors"
                >
                  {L.emailValue}
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-700">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <a href={L.phoneHref} className="hover:text-black transition-colors">
                  {L.phoneValue}
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <MapPin className="h-4 w-4 mt-1 flex-shrink-0" />
                <span>
                  {L.companyName}
                  <br />
                  {L.street}
                  <br />
                  {L.city}
                  <br />
                  {L.country}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar - Copyright & Legal Links */}
        <div className="pt-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-700">© 2026 {L.companyName}. {L.rights}</p>
          <div className="flex flex-wrap gap-6 md:flex-nowrap justify-center md:justify-start w-full md:w-auto">
            <Link href={imprintHref} className="text-sm text-gray-700 hover:text-black transition-colors">
              {L.imprint}
            </Link>
            <Link href={privacyHref} className="text-sm text-gray-700 hover:text-black transition-colors">
              {L.privacy}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}