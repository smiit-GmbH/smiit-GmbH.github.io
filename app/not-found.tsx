"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Home, Search } from "lucide-react"
import Footer from "@/components/footer"

export default function NotFound() {
  const pathname = usePathname() || "/"
  const lang = pathname.startsWith("/en") ? "en" : pathname.startsWith("/fr") ? "fr" : "de"
  const base = `/${lang}`

  const L =
    lang === "de"
      ? {
          title: "Seite nicht gefunden",
          description: "Die von Ihnen gesuchte Seite existiert leider nicht.",
          suggestion: "Möglicherweise wurde sie verschoben oder die URL ist nicht korrekt.",
          homeButton: "Zur Startseite",
          contactButton: "Kontakt aufnehmen",
          popularPages: "Beliebte Seiten:",
          services: "Dienstleistungen",
          about: "Über uns",
        }
      : {
          title: "Page Not Found",
          description: "The page you are looking for does not exist.",
          suggestion: "It may have been moved or the URL might be incorrect.",
          homeButton: "Go to Homepage",
          contactButton: "Contact Us",
          popularPages: "Popular pages:",
          services: "Services",
          about: "About Us",
        }

  return (
    <main className="min-h-screen flex flex-col">
      <div className="flex-grow flex items-center justify-center px-4 py-20">
        <div className="max-w-2xl mx-auto text-center">
          {/* 404 Number */}
          <div className="mb-8">
            <h1 className="text-[150px] md:text-[200px] font-bold text-primary/20 leading-none">404</h1>
          </div>

          {/* Error Message */}
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">{L.title}</h2>
            <p className="text-xl text-muted-foreground mb-2">{L.description}</p>
            <p className="text-muted-foreground">{L.suggestion}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link href="/">
                <Home className="w-5 h-5 mr-2" />
                {L.homeButton}
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto bg-transparent">
              <Link href="/contact">
                <Search className="w-5 h-5 mr-2" />
                {L.contactButton}
              </Link>
            </Button>
          </div>

          {/* Popular Links */}
          <div className="mt-16 pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground mb-4">{L.popularPages}</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                href="/products/smiit-analytics"
                className="text-sm text-primary hover:underline hover:text-primary/80 transition-colors"
              >
                smiit Analytics
              </Link>
              <span className="text-muted-foreground">•</span>
              <Link
                href="/products/product-scout"
                className="text-sm text-primary hover:underline hover:text-primary/80 transition-colors"
              >
                Product Scout
              </Link>
              <span className="text-muted-foreground">•</span>
              <Link
                href="/services"
                className="text-sm text-primary hover:underline hover:text-primary/80 transition-colors"
              >
                {L.services}
              </Link>
              <span className="text-muted-foreground">•</span>
              <Link
                href="/about"
                className="text-sm text-primary hover:underline hover:text-primary/80 transition-colors"
              >
                {L.about}
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
