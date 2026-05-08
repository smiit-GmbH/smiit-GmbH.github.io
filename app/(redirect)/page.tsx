import type { Metadata } from "next"

const title = "smiit GmbH - Datengesteuerte Transformation, maßgeschneidert für den Mittelstand"
const description =
  "Digitale Lösungen für Applikationen, Workflows, Datenanalyse und digitale Unternehmensstrategie — maßgeschneidert für den Mittelstand."

const ogImage = {
  url: "/og-image.png",
  width: 1200,
  height: 630,
  alt: "smiit GmbH",
}

export const metadata: Metadata = {
  metadataBase: new URL("https://www.smiit.de"),
  title,
  description,
  alternates: {
    canonical: "/de/",
    languages: {
      "de-DE": "/de/",
      en: "/en/",
      "x-default": "/de/",
    },
  },
  openGraph: {
    title,
    description,
    url: "/de/",
    siteName: "smiit GmbH",
    locale: "de_DE",
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

export default function RootRedirect() {
  return (
    <>
      <meta httpEquiv="refresh" content="0;url=/de/" />
      <script
        dangerouslySetInnerHTML={{
          __html: "window.location.replace('/de/');",
        }}
      />
    </>
  )
}