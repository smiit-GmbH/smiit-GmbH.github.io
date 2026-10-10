import type { Metadata } from "next"
import type { Locale } from "@/lib/dictionary"

// Short, shareable URL that forwards to the public smiit Analytics demo report in
// Power BI. It is a redirect, not content: noindex keeps it out of search results
// (and out of robots.txt, so crawlers can actually see the noindex).
const REPORT_URL =
  "https://app.powerbi.com/view?r=eyJrIjoiMGIzNGViZDUtMjkwYy00NTc5LWJjOWMtZTUwNDk2YTcwM2Q2IiwidCI6IjQxNmMzYzYwLWM3MDEtNDE2ZS1iOTg4LTRmNWZjYjU1ZGZiYyJ9"

const COPY = {
  de: {
    title: "smiit Analytics – Demo-Report",
    text: "Sie werden zum Demo-Report weitergeleitet …",
    link: "Report öffnen",
  },
  en: { title: "smiit Analytics – demo report", text: "Redirecting you to the demo report …", link: "Open the report" },
}

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params
  return {
    title: COPY[lang].title,
    robots: { index: false, follow: false },
    alternates: { canonical: `https://www.smiit.de/${lang}/products/smiit-analytics/report/` },
  }
}

export default async function ReportPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params
  const t = COPY[lang]
  return (
    <main className="mx-auto max-w-[1400px] px-4 pb-24 pt-36 sm:px-6 lg:px-8">
      {/* React hoists this into <head>: an immediate, JS-free redirect. */}
      <meta httpEquiv="refresh" content={`0;url=${REPORT_URL}`} />
      <p className="text-[#0B162D]/70">
        {t.text}{" "}
        <a href={REPORT_URL} className="font-medium text-[#21569c] underline underline-offset-4">
          {t.link}
        </a>
      </p>
    </main>
  )
}
