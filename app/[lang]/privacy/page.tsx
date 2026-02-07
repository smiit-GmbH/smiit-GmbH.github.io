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

  const title = isDe ? "smiit GmbH - Datenschutz" : "smiit GmbH - Privacy policy"
  const description = isDe
    ? "Datenschutzerklärung der smiit GmbH (Hosting, Kontaktanfragen, Terminvereinbarung)."
    : "Privacy policy of smiit GmbH (hosting, contact requests, appointment scheduling)."

  return {
    title,
    description,
    alternates: {
      canonical: `/${lang}/privacy`,
      languages: {
        de: "/de/privacy",
        en: "/en/privacy",
        "x-default": "/de/privacy",
      },
    },
  }
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const isDe = lang === "de"

  type Section = {
    title: string
    paragraphs?: string[]
    bullets?: string[]
    subsections?: { label: string; paragraphs: string[] }[]
  }

  const email = "kontakt@smiit.de"
  const phone = "+49 160 4073198"

  const L: { title: string; sections: Section[] } = isDe
    ? {
        title: "Datenschutzerklärung",
        sections: [
          {
            title: "1. Verantwortlicher",
            paragraphs: [
              "smiit GmbH",
              "Reiherweg 96, 89584 Ehingen",
              `E-Mail: ${email}`,
              `Telefon: ${phone}`,
              "Datenschutzbeauftragter: Noah Neßlauer",
            ],
          },
          {
            title: "2. Allgemeine Informationen zur Datenverarbeitung",
            paragraphs: [
              "Personenbezogene Daten sind alle Informationen, die sich auf eine identifizierte oder identifizierbare natürliche Person beziehen, z. B. Name, E-Mail-Adresse oder IP-Adresse.",
            ],
          },
          {
            title: "3. Zwecke der Verarbeitung und Rechtsgrundlagen",
            subsections: [
              {
                label: "a) Bereitstellung und Betrieb der Website",
                paragraphs: [
                  "Diese Website wird über GitHub Pages, einen Dienst der GitHub Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, USA, gehostet.",
                  "Beim Aufruf dieser Website werden durch den Hosting-Dienstleister automatisch technisch erforderliche Daten verarbeitet (z. B. IP-Adresse, Browsertyp, Betriebssystem, Referrer-URL, Uhrzeit der Serveranfrage).",
                  "Beim Aufruf der Website werden durch GitHub automatisch Server-Logfiles erfasst. Dies umfasst insbesondere die IP-Adresse, Datum und Uhrzeit des Zugriffs, Browsertyp und Betriebssystem. Diese Daten werden zur Sicherstellung des technischen Betriebs und der Sicherheit der Website verarbeitet.",
                  "Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse am sicheren und funktionsfähigen Betrieb der Website).",
                ],
              },
              {
                label: "b) Kontaktanfragen per Formular oder E-Mail",
                paragraphs: [
                  "Wenn Sie uns kontaktieren, verarbeiten wir die von Ihnen angegebenen Daten zur Bearbeitung Ihrer Anfrage.",
                  "Wenn Sie uns über das Kontaktformular kontaktieren, werden die von Ihnen eingegebenen Daten (Name, E-Mail-Adresse, Nachricht sowie optional Telefonnummer) zum Zweck der Bearbeitung Ihrer Anfrage verarbeitet.",
                  "Für den technischen Versand der über das Kontaktformular eingegebenen Daten nutzen wir den Dienst EmailJS der EmailJS Pte. Ltd., Singapur. Dabei werden die eingegebenen personenbezogenen Daten an EmailJS übermittelt und von dort per E-Mail an uns weitergeleitet.",
                  "Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO.",
                ],
              },
              {
                label: "c) Terminvereinbarung über Calendly",
                paragraphs: [
                  "Zur Vereinbarung von Terminen nutzen wir den Dienst Calendly der Calendly LLC, USA.",
                  "Bei Nutzung der Terminbuchung werden personenbezogene Daten zur Koordination des Termins verarbeitet. Beim Aufruf der Terminbuchungsfunktion werden personenbezogene Daten (insbesondere die IP-Adresse) an Calendly übertragen. Wenn Sie einen Termin buchen, werden die von Ihnen eingegebenen Daten zur Organisation und Durchführung des Termins verarbeitet.",
                  "Rechtsgrundlage: Art. 6 Abs. 1 lit. b und f DSGVO.",
                ],
              },
            ],
          },
          {
            title: "4. Empfänger von Daten",
            paragraphs: [
              "Zur Erbringung unserer Leistungen nutzen wir folgende Dienstleister:",
            ],
            bullets: [
              "GitHub Pages (Hosting)",
              "EmailJS (Versand von Formularnachrichten)",
              "Calendly (Terminverwaltung)",
            ],
          },
          {
            title: "5. Drittlandübermittlung",
            paragraphs: [
              "Eine Verarbeitung kann in Drittländern (z. B. USA) stattfinden. In diesen Fällen erfolgt die Übermittlung auf Basis geeigneter Garantien wie Standardvertragsklauseln (SCC) oder – sofern anwendbar – dem EU‑US Data Privacy Framework.",
              "GitHub verarbeitet Daten auch in den USA. Die Datenübermittlung erfolgt auf Grundlage der EU-Standardvertragsklauseln.",
              "Eine Datenübermittlung in Drittländer (außerhalb der EU) kann nicht ausgeschlossen werden. EmailJS verwendet geeignete Garantien gemäß Art. 46 DSGVO.",
              "Die Datenübermittlung in die USA im Zusammenhang mit Calendly erfolgt auf Grundlage der EU-Standardvertragsklauseln.",
            ],
          },
          {
            title: "6. Cookies und ähnliche Technologien",
            paragraphs: [
              "Wir setzen selbst keine Analytics-, Tracking- oder Marketing-Cookies ein. Technisch notwendige Datenverarbeitungen erfolgen ausschließlich durch den Hosting-Dienstleister.",
              "Bei Einbettung externer Dienste (z. B. Calendly) können durch diese Anbieter Cookies oder ähnliche Technologien eingesetzt werden.",
            ],
          },
          {
            title: "7. Speicherdauer",
            bullets: [
              "Logdaten: in der Regel bis zu 30 Tage",
              "Kontaktanfragen: 6–12 Monate nach Bearbeitung",
              "Termindaten: bis zur Abwicklung des Termins",
            ],
          },
          {
            title: "8. Rechte der betroffenen Personen",
            paragraphs: [
              "Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit sowie Widerspruch (Art. 21 DSGVO) und Widerruf erteilter Einwilligungen.",
            ],
          },
          {
            title: "9. Beschwerderecht",
            paragraphs: [
              "Sie haben das Recht, sich bei einer Datenschutzaufsichtsbehörde zu beschweren.",
            ],
          },
          {
            title: "10. Erforderlichkeit der Bereitstellung",
            paragraphs: [
              "Ohne Angabe der erforderlichen Daten (z. B. E-Mail-Adresse) können wir Ihre Anfrage nicht bearbeiten.",
            ],
          },
          {
            title: "11. Automatisierte Entscheidungsfindung",
            paragraphs: [
              "Eine automatisierte Entscheidungsfindung oder Profiling findet nicht statt.",
            ],
          },
        ],
      }
    : {
        title: "Privacy policy",
        sections: [
          {
            title: "1. Responsible",
            paragraphs: [
              "smiit GmbH",
              "Reiherweg 96, 89584 Ehingen, Germany",
              `Email: ${email}`,
              `Phone: ${phone}`,
              "Data protection officer: Noah Neßlauer",
            ],
          },
          {
            title: "2. General information on data processing",
            paragraphs: [
              "Personal data is any information relating to an identified or identifiable natural person, e.g. name, email address, or IP address.",
            ],
          },
          {
            title: "3. Purposes of processing and legal bases",
            subsections: [
              {
                label: "a) Provision and operation of the website",
                paragraphs: [
                  "This website is hosted via GitHub Pages, a service provided by GitHub Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, USA.",
                  "When you access this website, the hosting provider automatically processes technically necessary data (e.g. IP address, browser type, operating system, referrer URL, time of the server request).",
                  "When you access this website, GitHub automatically records server log files. This includes in particular the IP address, date and time of access, browser type, and operating system. This data is processed to ensure the technical operation and security of the website.",
                  "Legal basis: Art. 6(1)(f) GDPR (legitimate interest in a secure and functional operation of the website).",
                ],
              },
              {
                label: "b) Contact requests via form or email",
                paragraphs: [
                  "If you contact us, we process the data you provide to handle your request.",
                  "If you contact us via the contact form, the data you enter (name, email address, message, and optionally phone number) will be processed for the purpose of handling your request.",
                  "For the technical delivery of data entered via the contact form, we use the service EmailJS provided by EmailJS Pte. Ltd., Singapore. The personal data you enter is transmitted to EmailJS and then forwarded to us by email.",
                  "Legal basis: Art. 6(1)(b) GDPR.",
                ],
              },
              {
                label: "c) Appointment scheduling via Calendly",
                paragraphs: [
                  "To schedule appointments, we use the service Calendly provided by Calendly LLC, USA.",
                  "When using the appointment booking feature, personal data is processed to coordinate the appointment. When you access the scheduling feature, personal data (in particular the IP address) is transmitted to Calendly. If you book an appointment, the data you enter is processed to organize and conduct the appointment.",
                  "Legal basis: Art. 6(1)(b) and (f) GDPR.",
                ],
              },
            ],
          },
          {
            title: "4. Recipients of data",
            paragraphs: [
              "To provide our services, we use the following service providers:",
            ],
            bullets: [
              "GitHub Pages (hosting)",
              "EmailJS (delivery of contact form messages)",
              "Calendly (appointment management)",
            ],
          },
          {
            title: "5. Transfers to third countries",
            paragraphs: [
              "Processing may take place in third countries (e.g. the USA). In such cases, transfers are carried out on the basis of appropriate safeguards such as the EU Standard Contractual Clauses (SCC) or—where applicable—the EU‑US Data Privacy Framework.",
              "GitHub also processes data in the United States. Data transfers are based on the EU Standard Contractual Clauses.",
              "A transfer of data to third countries (outside the EU) cannot be ruled out. EmailJS uses appropriate safeguards pursuant to Art. 46 GDPR.",
              "Data transfers to the United States in connection with Calendly are based on the EU Standard Contractual Clauses.",
            ],
          },
          {
            title: "6. Cookies and similar technologies",
            paragraphs: [
              "We ourselves do not use analytics, tracking, or marketing cookies. Technically necessary processing is carried out exclusively by the hosting provider.",
              "When embedding external services (e.g. Calendly), these providers may use cookies or similar technologies.",
            ],
          },
          {
            title: "7. Storage period",
            bullets: [
              "Log data: generally up to 30 days",
              "Contact requests: 6–12 months after completion",
              "Appointment data: until the appointment has been completed",
            ],
          },
          {
            title: "8. Data subject rights",
            paragraphs: [
              "You have the right of access, rectification, erasure, restriction of processing, data portability, as well as the right to object (Art. 21 GDPR) and to withdraw any consent given.",
            ],
          },
          {
            title: "9. Right to lodge a complaint",
            paragraphs: [
              "You have the right to lodge a complaint with a data protection supervisory authority.",
            ],
          },
          {
            title: "10. Requirement to provide data",
            paragraphs: [
              "Without providing the required data (e.g. your email address), we cannot process your request.",
            ],
          },
          {
            title: "11. Automated decision-making",
            paragraphs: [
              "No automated decision-making or profiling takes place.",
            ],
          },
        ],
      }

  return (
    <main className="min-h-screen">
      {/* Hero-style header image */}
      <section className="relative isolate z-0 h-[46vh] sm:h-[50vh] md:h-[58vh] overflow-hidden rounded-b-[1.75rem] bg-black/[0.02] mb-8 sm:mb-6">
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
              {isDe ? (
                <>
                  <span className="sm:hidden">
                    Datenschutz-
                    <br />
                    erklärung
                  </span>
                  <span className="hidden sm:inline">Datenschutzerklärung</span>
                </>
              ) : (
                L.title
              )}
            </h1>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="relative z-30 py-0 md:py-0">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative z-30 -mt-32 sm:-mt-46 md:-mt-62 lg:-mt-64 rounded-[1.75rem] border border-black/10 bg-white shadow-xl ring-1 ring-black/5 p-6 sm:p-8 md:p-10">
            <div className="space-y-10">
              {L.sections.map((section) => (
                <section key={section.title}>
                  <h2 className="font-serif text-xl md:text-3xl text-black tracking-tight">
                    {section.title}
                  </h2>

                  <div className="text-sm mt-4 space-y-3 text-black/80 leading-relaxed">
                    {section.paragraphs?.map((text) => {
                      const isEmailLine = text.startsWith("E-Mail:") || text.startsWith("Email:")
                      const isPhoneLine = text.startsWith("Telefon:") || text.startsWith("Phone:")

                      if (isEmailLine) {
                        return (
                          <p key={text}>
                            {text.split(":")[0]}:{" "}
                            <a className="underline" href={`mailto:${email}`}>
                              {email}
                            </a>
                          </p>
                        )
                      }

                      if (isPhoneLine) {
                        return (
                          <p key={text}>
                            {text.split(":")[0]}:{" "}
                            <a className="underline" href={`tel:${phone.replace(/\s+/g, "")}`}>
                              {phone}
                            </a>
                          </p>
                        )
                      }

                      return <p key={text}>{text}</p>
                    })}

                    {section.subsections?.map((sub) => (
                      <div key={sub.label} className="pt-1">
                        <p className="font-medium text-black">{sub.label}</p>
                        <div className="mt-2 space-y-3">
                          {sub.paragraphs.map((p) => (
                            <p key={p}>{p}</p>
                          ))}
                        </div>
                      </div>
                    ))}

                    {section.bullets && section.bullets.length > 0 ? (
                      <ul className="list-disc pl-5 space-y-1">
                        {section.bullets.map((b) => (
                          <li key={b}>{b}</li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Spacing after overlapped card */}
      <div className="h-2 md:h-4" />
    </main>
  )
}

