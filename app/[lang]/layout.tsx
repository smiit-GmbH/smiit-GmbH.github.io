import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google"
import "../globals.css"
import { ScrollToTop } from "@/components/scroll-to-top"

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

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const isDe = lang === 'de'
  
  return {
    title: isDe 
      ? "smiit GmbH - Datengesteuerte Transformation, maßgeschneidert für den Mittelstand"
      : "smiit GmbH - Data-driven transformation, tailored for SMEs",
    description: isDe 
      ? "Wir helfen Ihnen dabei, die Digitalisierung Ihres Unternehmens voranzutreiben und Ihre Prozesse zu optimieren."
      : "We help you drive forward the digitalization of your company and optimize your processes.",
    alternates: {
      canonical: `/${lang}/`,
      languages: {
        "de-CH": "/de/",
        en: "/en/",
        "x-default": "/de/",
      },
    },
    openGraph: {
      title: isDe 
        ? "smiit GmbH - Datengesteuerte Transformation, maßgeschneidert für den Mittelstand"
        : "smiit GmbH - Data-driven transformation, tailored for SMEs",
      description: isDe
        ? "Digitale Lösungen für Automatisierung, Datenanalyse und Unternehmensberatung"
        : "Digital solutions for automation, data analytics, and business consulting",
      url: `/${lang}/`,
    },
    twitter: {
      card: "summary_large_image",
      title: isDe 
        ? "smiit GmbH - Datengesteuerte Transformation, maßgeschneidert für den Mittelstand"
        : "smiit GmbH - Data-driven transformation, tailored for SMEs",
      description: isDe
        ? "Digitale Lösungen für Automatisierung, Datenanalyse und Unternehmensberatung"
        : "Digital solutions for automation, data analytics, and business consulting",
    },
  }
}

export async function generateStaticParams() {
  return [{ lang: "de" }, { lang: "en" }]
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ lang: string }>
}>) {
  const { lang } = await params
  return (
    <html lang={lang}>
      <body className={`${geist.variable} ${geistMono.variable} ${playfair.variable} font-sans antialiased`}>
          <ScrollToTop />
          {children}
      </body>
    </html>
  )
}
