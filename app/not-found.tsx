"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Home } from "lucide-react"
import Footer from "@/components/footer"
import Header from "@/components/header"
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google"
import "./globals.css"

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
})
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
})

export default function NotFound() {
  const pathname = usePathname() || "/"
  const lang = pathname.startsWith("/en") ? "en" : "de"
  const base = `/${lang}`

  const L =
    lang === "de"
      ? {
          title: "Seite nicht gefunden",
          description: "Die von Ihnen gesuchte Seite existiert leider nicht.",
          homeButton: "Zur Startseite",
        }
      : {
          title: "Page Not Found",
          description: "The page you are looking for does not exist.",
          homeButton: "Go to Homepage",
        }

  return (
    <html lang={lang}>
      <body className={`${geist.variable} ${geistMono.variable} ${playfair.variable} font-sans antialiased`}>
        <main className="min-h-screen flex flex-col">
          <section className="relative w-full h-[95vh] md:h-[105vh] rounded-b-[1.75rem] overflow-hidden bg-[url('/assets/not_found_mobile.png')] md:bg-[url('/assets/not_found.png')] bg-cover bg-center bg-no-repeat flex flex-col">
            <Header />
            <div className="flex-grow flex items-start justify-center px-4 pt-20 mt-12 md:mt-0 md:pt-14">
                <div className="max-w-sm mx-auto text-center font-serif">
                  <div className="mb-8">
                    <h1 className="text-[100px] md:text-[150px] font-bold text-primary/20 leading-none">404</h1>
                  </div>

                  <div className="mt-12 mb-8">
                    <h2 className="text-3xl md:text-4xl mb-4 text-foreground">{L.title}</h2>
                    <p className="text-xl text-black/80 mb-2">{L.description}</p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-10">
                    <Button asChild size="lg" className="w-full sm:w-auto">
                      <Link href={base}>
                        <Home className="w-5 h-5 mr-2" />
                        {L.homeButton}
                      </Link>
                    </Button>
                  </div>
                </div>
            </div>
          </section>
          <Footer />
        </main>
      </body>
    </html>
  )
}
