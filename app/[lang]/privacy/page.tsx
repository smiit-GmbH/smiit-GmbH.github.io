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
    ? "Datenschutzerklärung der smiit GmbH."
    : "Privacy policy of smiit GmbH."

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

  const L = isDe
    ? {
        title: "Datenschutzerklärung",
        hostingTitle: "1. Hosting der Website",
        hostingText1:
          "Diese Website wird über GitHub Pages, einen Dienst der GitHub Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, USA, gehostet.",
        hostingText2:
          "Beim Aufruf der Website werden durch GitHub automatisch Server-Logfiles erfasst. Dies umfasst insbesondere die IP-Adresse, Datum und Uhrzeit des Zugriffs, Browsertyp und Betriebssystem. Diese Daten werden zur Sicherstellung des technischen Betriebs und der Sicherheit der Website verarbeitet.",
        hostingText3:
          "Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einem sicheren und stabilen Betrieb der Website).",
        hostingText4:
          "GitHub verarbeitet Daten auch in den USA. Die Datenübermittlung erfolgt auf Grundlage der EU-Standardvertragsklauseln.",
        contactFormTitle: "2. Kontaktformular",
        contactFormText1:
          "Wenn Sie uns über das Kontaktformular kontaktieren, werden die von Ihnen eingegebenen Daten (Name, E-Mail-Adresse, Nachricht sowie optional Telefonnummer) zum Zweck der Bearbeitung Ihrer Anfrage verarbeitet.",
        contactFormText2:
          "Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Maßnahmen) bzw. Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Beantwortung von Anfragen).",
        contactFormText3:
          "Die Daten werden gelöscht, sobald sie für die Bearbeitung Ihrer Anfrage nicht mehr erforderlich sind.",
        emailJsTitle: "3. Versand der Formulardaten",
        emailJsText1:
          "Für den technischen Versand der über das Kontaktformular eingegebenen Daten nutzen wir den Dienst EmailJS der EmailJS Pte. Ltd., Singapur.",
        emailJsText2:
          "EmailJS dient als technischer Dienstleister für die Übermittlung der Formulardaten an unsere E-Mail-Adresse.",
        emailJsText3:
          "Dabei werden die eingegebenen personenbezogenen Daten an EmailJS übermittelt und von dort per E-Mail an uns weitergeleitet.",
        emailJsText4: "Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO.",
        emailJsText5:
          "Eine Datenübermittlung in Drittländer (außerhalb der EU) kann nicht ausgeschlossen werden. EmailJS verwendet geeignete Garantien gemäß Art. 46 DSGVO.",
        calendlyTitle: "4. Terminbuchung über Calendly",
        calendlyText1:
          "Zur Vereinbarung von Terminen nutzen wir den Dienst Calendly der Calendly LLC, USA.",
        calendlyText2:
          "Beim Aufruf der Terminbuchungsfunktion werden personenbezogene Daten (insbesondere die IP-Adresse) an Calendly übertragen. Wenn Sie einen Termin buchen, werden die von Ihnen eingegebenen Daten zur Organisation und Durchführung des Termins verarbeitet.",
        calendlyText3: "Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO.",
        calendlyText4:
          "Die Datenübermittlung in die USA erfolgt auf Grundlage der EU-Standardvertragsklauseln.",
        noCookiesTitle: "5. Keine Verwendung von Cookies oder Tracking-Tools",
        noCookiesText:
          "Diese Website verwendet keine Cookies zu Analyse-, Tracking- oder Marketingzwecken.",
        rightsTitle: "6. Ihre Rechte",
        rightsText1:
          "Sie haben das Recht auf Auskunft über die Sie betreffenden personenbezogenen Daten, auf Berichtigung, Löschung, Einschränkung der Verarbeitung sowie auf Datenübertragbarkeit.",
        rightsText2:
          "Sie haben zudem das Recht, sich bei einer Datenschutzaufsichtsbehörde über die Verarbeitung Ihrer personenbezogenen Daten durch uns zu beschweren.",
        controllerTitle: "7. Verantwortlicher",
        controllerIntro:
          "Verantwortlich für die Datenverarbeitung auf dieser Website ist:",
        company: "smiit GmbH",
        addressLines: ["Reiherweg 96", "89584 Ehingen", "Deutschland"],
        email: "kontakt@smiit.de",
      }
    : {
        title: "Privacy policy",
        hostingTitle: "1. Website hosting",
        hostingText1:
          "This website is hosted via GitHub Pages, a service provided by GitHub Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, USA.",
        hostingText2:
          "When you access this website, GitHub automatically records server log files. This includes in particular the IP address, date and time of access, browser type, and operating system. This data is processed to ensure the technical operation and security of the website.",
        hostingText3:
          "The processing is based on Art. 6(1)(f) GDPR (legitimate interest in a secure and stable operation of the website).",
        hostingText4:
          "GitHub also processes data in the United States. Data transfers are based on the EU Standard Contractual Clauses.",
        contactFormTitle: "2. Contact form",
        contactFormText1:
          "If you contact us via the contact form, the data you enter (name, email address, message, and optionally phone number) will be processed for the purpose of handling your request.",
        contactFormText2:
          "The processing is based on Art. 6(1)(b) GDPR (pre-contractual measures) and/or Art. 6(1)(f) GDPR (legitimate interest in responding to inquiries).",
        contactFormText3:
          "The data will be deleted as soon as it is no longer required for processing your request.",
        emailJsTitle: "3. Sending form data",
        emailJsText1:
          "For the technical delivery of data entered via the contact form, we use the service EmailJS provided by EmailJS Pte. Ltd., Singapore.",
        emailJsText2:
          "EmailJS acts as a technical service provider to transmit the form data to our email address.",
        emailJsText3:
          "The personal data you enter is transmitted to EmailJS and then forwarded to us by email.",
        emailJsText4: "The processing is based on Art. 6(1)(b) GDPR.",
        emailJsText5:
          "A transfer of data to third countries (outside the EU) cannot be ruled out. EmailJS uses appropriate safeguards pursuant to Art. 46 GDPR.",
        calendlyTitle: "4. Appointment scheduling via Calendly",
        calendlyText1:
          "To schedule appointments, we use the service Calendly provided by Calendly LLC, USA.",
        calendlyText2:
          "When you access the appointment scheduling feature, personal data (in particular the IP address) is transmitted to Calendly. If you book an appointment, the data you enter is processed to organize and conduct the appointment.",
        calendlyText3: "The processing is based on Art. 6(1)(b) GDPR.",
        calendlyText4:
          "Data transfers to the United States are based on the EU Standard Contractual Clauses.",
        noCookiesTitle: "5. No cookies or tracking tools",
        noCookiesText:
          "This website does not use cookies for analytics, tracking, or marketing purposes.",
        rightsTitle: "6. Your rights",
        rightsText1:
          "You have the right to access your personal data, to rectification, erasure, restriction of processing, and to data portability.",
        rightsText2:
          "You also have the right to lodge a complaint with a data protection supervisory authority regarding the processing of your personal data by us.",
        controllerTitle: "7. Controller",
        controllerIntro:
          "The controller responsible for data processing on this website is:",
        company: "smiit GmbH",
        addressLines: ["Reiherweg 96", "89584 Ehingen", "Germany"],
        email: "kontakt@smiit.de",
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
              <section>
                <h2 className="font-serif text-xl md:text-3xl text-black tracking-tight">
                  {L.hostingTitle}
                </h2>
                <div className="text-sm mt-4 space-y-3 text-black/80 leading-relaxed">
                  <p>{L.hostingText1}</p>
                  <p>{L.hostingText2}</p>
                  <p>{L.hostingText3}</p>
                  <p>{L.hostingText4}</p>
                </div>
              </section>

              <section>
                <h2 className="font-serif text-xl md:text-3xl text-black tracking-tight">
                  {L.contactFormTitle}
                </h2>
                <div className="text-sm mt-4 space-y-3 text-black/80 leading-relaxed">
                  <p>{L.contactFormText1}</p>
                  <p>{L.contactFormText2}</p>
                  <p>{L.contactFormText3}</p>
                </div>
              </section>

              <section>
                <h2 className="font-serif text-xl md:text-3xl text-black tracking-tight">
                  {L.emailJsTitle}
                </h2>
                <div className="text-sm mt-4 space-y-3 text-black/80 leading-relaxed">
                  <p>{L.emailJsText1}</p>
                  <p>
                    {L.emailJsText2} {" "}
                    <a className="underline" href={`mailto:${L.email}`}>
                      {L.email}
                    </a>
                    .
                  </p>
                  <p>{L.emailJsText3}</p>
                  <p>{L.emailJsText4}</p>
                  <p>{L.emailJsText5}</p>
                </div>
              </section>

              <section>
                <h2 className="font-serif text-xl md:text-3xl text-black tracking-tight">
                  {L.calendlyTitle}
                </h2>
                <div className="text-sm mt-4 space-y-3 text-black/80 leading-relaxed">
                  <p>{L.calendlyText1}</p>
                  <p>{L.calendlyText2}</p>
                  <p>{L.calendlyText3}</p>
                  <p>{L.calendlyText4}</p>
                </div>
              </section>

              <section>
                <h2 className="font-serif text-xl md:text-3xl text-black tracking-tight">
                  {L.noCookiesTitle}
                </h2>
                <p className="text-sm mt-4 text-black/80 leading-relaxed">{L.noCookiesText}</p>
              </section>

              <section>
                <h2 className="font-serif text-xl md:text-3xl text-black tracking-tight">
                  {L.rightsTitle}
                </h2>
                <div className="text-sm mt-4 space-y-3 text-black/80 leading-relaxed">
                  <p>{L.rightsText1}</p>
                  <p>{L.rightsText2}</p>
                </div>
              </section>

              <section>
                <h2 className="font-serif text-xl md:text-3xl text-black tracking-tight">
                  {L.controllerTitle}
                </h2>
                <p className="text-sm mt-4 text-black/80 leading-relaxed">{L.controllerIntro}</p>

                <div className="text-sm mt-4 text-black/80 leading-relaxed">
                  <p className="font-medium text-black">{L.company}</p>
                  <p className="mt-2">
                    {L.addressLines.map((line) => (
                      <span key={line}>
                        {line}
                        <br />
                      </span>
                    ))}
                    <span>
                      E-Mail: {" "}
                      <a className="underline" href={`mailto:${L.email}`}>
                        {L.email}
                      </a>
                    </span>
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>

      {/* Spacing after overlapped card */}
      <div className="h-2 md:h-4" />
    </main>
  )
}

