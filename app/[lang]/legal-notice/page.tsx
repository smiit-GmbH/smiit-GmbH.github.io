import type { Metadata } from "next"
import Image from "next/image"
import type { Locale } from "@/lib/dictionary"

export async function generateStaticParams() {
  return [{ lang: "de" }, { lang: "en" }]
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>
}): Promise<Metadata> {
  const { lang } = await params
  const isDe = lang === "de"

  const title = isDe ? "smiit GmbH - Impressum" : "smiit GmbH - Legal notice"
  const description = isDe
    ? "Impressum der smiit GmbH."
    : "Legal notice of smiit GmbH."

  return {
    title,
    description,
    alternates: {
      canonical: `/${lang}/legal-notice`,
      languages: {
        de: "/de/legal-notice",
        en: "/en/legal-notice",
        "x-default": "/de/legal-notice",
      },
    },
  }
}

export default async function LegalNoticePage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const isDe = lang === "de"

  const L = isDe
    ? {
        title: "Impressum",
        subtitle: "Angaben gemäß § 5 TMG",
        contact: "Kontakt",
        representedBy: "Vertreten durch",
        register: "Handelsregister",
        vatId: "Umsatzsteuer-ID",
        responsible: "Verantwortlich für den Inhalt (§ 18 Abs. 2 MStV)",
        dispute: "Streitschlichtung",
        consumerDispute:
          "Wir sind nicht verpflichtet, an einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen und nehmen daran nicht teil.",
      }
    : {
        title: "Legal notice",
        subtitle: "Information pursuant to Section 5 German Telemedia Act (TMG)",
        contact: "Contact",
        representedBy: "Represented by",
        register: "Commercial register",
        vatId: "VAT ID",
        responsible: "Responsible for content (Sec. 18(2) MStV)",
        dispute: "Dispute resolution",
        consumerDispute:
          "We are not obliged to participate in dispute resolution proceedings before a consumer arbitration board and do not participate.",
      }

  return (
    <main className="min-h-screen">
      {/* Hero-style header image */}
      <section className="relative isolate z-0 h-[46vh] sm:h-[50vh] md:h-[58vh] overflow-hidden rounded-b-[1.75rem] bg-black/[0.02] mb-8">
        <div className="absolute inset-0">
          <Image
            src="/assets/legal.png"
            alt=""
            fill
            priority
            sizes="100vw"
            aria-hidden="true"
            className="object-cover object-[15%_35%] sm:object-[22%_35%] md:object-[40%_35%]"
          />
        </div>

        {/* Safe area + readability overlays (keep cinematic image, but make left text area calmer) */}
        <div
          className={[
            "pointer-events-none absolute inset-0 z-[5]",
            // left-to-right washout so text doesn't fight with the motif
            "bg-gradient-to-r from-white/70 via-white/15 to-transparent",
          ].join(" ")}
        />

        {/* Additional subtle dark-to-transparent gradient for contrast */}
        <div className="pointer-events-none absolute inset-0 z-[6] bg-gradient-to-t from-black/12 via-black/4 to-transparent" />

        {/* Grain overlay like on home */}
        <div
          className="pointer-events-none absolute inset-0 z-10 opacity-[0.18] bg-black/10"
          style={{
            backgroundImage: "url(/assets/grain.png)",
            backgroundRepeat: "repeat",
            backgroundSize: "150px 150px",
            mixBlendMode: "soft-light",
          }}
        />

        {/* Title without background, positioned higher */}
        <div className="relative z-20 h-full">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 w-full pt-28 sm:pt-32 md:pt-36">
            <h1 className="font-serif text-[2.35rem] sm:text-[2.8rem] md:text-[3.25rem] leading-[1.06] text-black tracking-tight">
              {L.title}
            </h1>
            <p className="mt-3 text-sm sm:text-base md:text-lg text-black/75 max-w-[60ch] leading-relaxed">
              {L.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="relative z-30 py-0 md:py-0">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative z-30 -mt-32 sm:-mt-44 md:-mt-56 rounded-[1.75rem] border border-black/10 bg-white shadow-xl ring-1 ring-black/5 p-6 sm:p-8 md:p-10">
            <div className="grid gap-10 md:grid-cols-2">
              <div>
                <h2 className="font-serif text-2xl md:text-3xl text-black tracking-tight">smiit GmbH</h2>
                <p className="mt-4 text-black/80 leading-relaxed">
                  Reiherweg 96
                  <br />
                  89584 Ehingen
                  <br />
                  Deutschland
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold tracking-wide uppercase text-black/70">{L.contact}</h3>
                <div className="mt-4 space-y-2 text-black/80">
                  <p>
                    Telefon: <a className="underline" href="tel:+491604073198">+49 160 4073198</a>
                  </p>
                  <p>
                    Mail: <a className="underline" href="mailto:kontakt@smiit.de">kontakt@smiit.de</a>
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10 grid gap-10 md:grid-cols-2">
              <div>
                <h3 className="text-sm font-semibold tracking-wide uppercase text-black/70">{L.representedBy}</h3>
                <p className="mt-4 text-black/80 leading-relaxed">
                  {isDe ? "Geschäftsführer" : "Managing directors"}: Sebastian Grab, Noah Neßlauer
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold tracking-wide uppercase text-black/70">{L.register}</h3>
                <p className="mt-4 text-black/80 leading-relaxed">
                  {isDe ? "Amtsgericht Ulm, HRB 741965" : "Local Court (Amtsgericht) Ulm, HRB 741965"}
                </p>
              </div>
            </div>

            <div className="mt-10 grid gap-10 md:grid-cols-2">
              <div className="space-y-8">
                <div>
                  <h3 className="text-sm font-semibold tracking-wide uppercase text-black/70">{L.vatId}</h3>
                  <p className="mt-4 text-black/80 leading-relaxed">DE357299821</p>
                </div>

                <div>
                  <h3 className="text-sm font-semibold tracking-wide uppercase text-black/70">{L.responsible}</h3>
                  <p className="mt-4 text-black/80 leading-relaxed">
                    Noah Neßlauer
                    <br />
                    Reiherweg 96
                    <br />
                    89584 Ehingen
                    <br />
                    Deutschland
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold tracking-wide uppercase text-black/70">{L.dispute}</h3>
                <div className="mt-4 space-y-3 text-black/80 leading-relaxed">
                  <p>{L.consumerDispute}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Spacing after overlapped card */}
      <div className="h-2 md:h-4" />
    </main>
  )
}

