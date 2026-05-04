import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google"
import "../globals.css"
import Footer from "@/components/footer"
import Header from "@/components/header"
import { ScrollToTop } from "@/components/scroll-to-top"
import { CalendlyHandler } from "@/components/calendly-handler"
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider"
import { MobileCalendlyFab } from "@/components/mobile-calendly-fab"

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

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  const isDe = lang === 'de'

  const title = isDe
    ? "smiit GmbH - Datengesteuerte Transformation, maßgeschneidert für den Mittelstand"
    : "smiit GmbH - Data-driven transformation, tailored for SMEs"

  const description = isDe
    ? "Digitale Lösungen für Applikationen, Workflows, Datenanalyse und digitale Unternehmensstrategie — maßgeschneidert für den Mittelstand."
    : "Digital solutions for applications, workflows, data analytics, and digital strategy — tailored for SMEs."

  const ogImage = {
    url: "/og-image.png",
    width: 1200,
    height: 630,
    alt: "smiit GmbH",
  }

  return {
    metadataBase: new URL("https://www.smiit.de"),
    title,
    description,
    alternates: {
      canonical: `/${lang}/`,
      languages: {
        "de-CH": "/de/",
        en: "/en/",
        "x-default": "/de/",
      },
    },
    openGraph: {
      title,
      description,
      url: `/${lang}/`,
      siteName: "smiit GmbH",
      locale: isDe ? "de_DE" : "en_US",
      type: "website",
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
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
        <SmoothScrollProvider>
          <ScrollToTop />
          <CalendlyHandler />
          <Header forceLang={lang} />
          {/* <MobileCalendlyFab /> */}
          {children}
          <Footer forceLang={lang} />
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
