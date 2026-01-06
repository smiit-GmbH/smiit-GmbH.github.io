import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "smiit GmbH - Datengesteuerte Transformation, maßgeschneidert für den Mittelstand",
  description: "Digitale Lösungen für Automatisierung, Datenanalyse und Unternehmensberatung",
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

export default function DELayout({ children }: { children: React.ReactNode }) {
  return children
}