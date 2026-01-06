import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google"
import "./globals.css"
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

export const metadata: Metadata = {
  title: "smiit GmbH",
  description: "Datengesteuerte Transformation, maßgeschneidert für den Mittelstand",
  alternates: {
    canonical: "/de/",
    languages: {
      "de-CH": "/de/",
      en: "/en/",
      "x-default": "/de/",
    },
  },
  openGraph: {
    title: "smiit GmbH - Datengesteuerte Transformation, maßgeschneidert für den Mittelstand",
    description: "Digitale Lösungen für Automatisierung, Datenanalyse und Unternehmensberatung",
    url: "/de/",
  },
  twitter: {
    card: "summary_large_image",
    title: "smiit GmbH - Datengesteuerte Transformation, maßgeschneidert für den Mittelstand",
    description: "Digitale Lösungen für Automatisierung, Datenanalyse und Unternehmensberatung",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="de">
      <body className={`${geist.variable} ${geistMono.variable} ${playfair.variable} font-sans antialiased`}>
          <ScrollToTop />
          {children}
      </body>
    </html>
  )
}
