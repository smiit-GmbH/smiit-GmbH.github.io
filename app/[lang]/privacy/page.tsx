import type { Metadata } from "next"
import Image from "next/image"
import type { Locale } from "@/lib/dictionary"
import { buildPageMetadata } from "@/lib/seo"

export async function generateStaticParams() {
  return [{ lang: "de" }, { lang: "en" }]
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>
}): Promise<Metadata> {
  const { lang } = await params
  return buildPageMetadata({
    lang,
    path: "privacy",
    title: {
      de: "smiit GmbH – Datenschutzerklärung",
      en: "smiit GmbH – Privacy policy",
    },
    description: {
      de: "Datenschutzerklärung der smiit GmbH: Welche personenbezogenen Daten wir verarbeiten (Hosting, Kontaktanfragen, Terminvereinbarung, Webanalyse) und auf welcher Rechtsgrundlage.",
      en: "Privacy policy of smiit GmbH: what personal data we process (hosting, contact requests, appointment scheduling, web analytics) and on which legal basis under GDPR.",
    },
  })
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
              "smiit GmbH, vertreten durch die Geschäftsführer Sebastian Grab und Noah Neßlauer",
              "Reiherweg 96, 89584 Ehingen",
              `E-Mail: ${email}`,
              `Telefon: ${phone}`,
              "Bei Fragen zum Datenschutz oder zur Ausübung Ihrer Rechte erreichen Sie uns unter den oben genannten Kontaktdaten.",
            ],
          },
          {
            title: "2. Allgemeine Informationen zur Datenverarbeitung",
            paragraphs: [
              "Personenbezogene Daten sind alle Informationen, die sich auf eine identifizierte oder identifizierbare natürliche Person beziehen, z. B. Name, E-Mail-Adresse oder IP-Adresse.",
              "Die auf dieser Website verwendeten Schriftarten werden lokal von unserem Hosting-Anbieter ausgeliefert; eine Verbindung zu Servern von Google Fonts findet nicht statt.",
            ],
          },
          {
            title: "3. Zwecke der Verarbeitung und Rechtsgrundlagen",
            subsections: [
              {
                label: "a) Bereitstellung und Betrieb der Website (Hosting über GitHub Pages)",
                paragraphs: [
                  "Diese Website wird über GitHub Pages gehostet, einen Dienst der GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, USA („GitHub“).",
                  "Beim Aufruf der Website verarbeitet GitHub automatisch technisch erforderliche Daten in Server-Logfiles, insbesondere IP-Adresse, Datum und Uhrzeit des Zugriffs, aufgerufene Seite, Referrer-URL, Browsertyp und Betriebssystem. Diese Daten werden verarbeitet, um die Website auszuliefern sowie ihren technischen Betrieb und ihre Sicherheit sicherzustellen. Wir selbst haben keinen Zugriff auf diese Logfiles.",
                  "Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO. Unser berechtigtes Interesse liegt in der sicheren und funktionsfähigen Bereitstellung unserer Website.",
                ],
              },
              {
                label: "b) Kontaktanfragen per Formular oder E-Mail",
                paragraphs: [
                  "Wenn Sie uns per E-Mail oder über das Kontaktformular kontaktieren, verarbeiten wir die von Ihnen angegebenen Daten zur Bearbeitung Ihrer Anfrage und für mögliche Anschlussfragen. Beim Kontaktformular sind dies Vor- und Nachname, E-Mail-Adresse, Ihr Anliegen, Ihre Nachricht sowie optional Ihre Telefonnummer.",
                  "Für den technischen Versand der Formulardaten nutzen wir den Dienst EmailJS der EmailJS Pte. Ltd., Singapur („EmailJS“). Erst wenn Sie das Formular absenden, werden die eingegebenen Daten zusammen mit technischen Verbindungsdaten (insbesondere Ihrer IP-Adresse) an EmailJS übermittelt und von dort per E-Mail an uns weitergeleitet.",
                  "Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit einem bestehenden Vertrag zusammenhängt oder der Durchführung vorvertraglicher Maßnahmen dient (z. B. Anfrage zu unseren Leistungen). In allen übrigen Fällen ist Rechtsgrundlage Art. 6 Abs. 1 lit. f DSGVO; unser berechtigtes Interesse liegt in der effektiven Bearbeitung der an uns gerichteten Anfragen.",
                ],
              },
              {
                label: "c) Terminvereinbarung über Calendly",
                paragraphs: [
                  "Zur Online-Vereinbarung von Terminen nutzen wir den Dienst Calendly der Calendly LLC, USA („Calendly“).",
                  "Calendly wird nicht bereits beim Aufruf unserer Website geladen. Erst wenn Sie aktiv eine Schaltfläche bzw. einen Link zur Terminbuchung anklicken, werden Skripte von Calendly nachgeladen und das Buchungsfenster geöffnet. Dabei werden insbesondere Ihre IP-Adresse, Informationen zu Browser und Gerät sowie die aufgerufene Seite an Calendly übermittelt. Calendly kann im Buchungsfenster Cookies oder vergleichbare Technologien einsetzen.",
                  "Wenn Sie einen Termin buchen, verarbeiten wir die von Ihnen eingegebenen Daten (insbesondere Name, E-Mail-Adresse, gewählter Termin sowie ggf. Angaben zu Ihrem Anliegen) zur Organisation und Durchführung des Termins.",
                  "Rechtsgrundlage für das Öffnen des Buchungsfensters ist Art. 6 Abs. 1 lit. f DSGVO; unser berechtigtes Interesse liegt in einer einfachen Online-Terminvereinbarung. Soweit dabei Informationen auf Ihrem Endgerät gespeichert oder ausgelesen werden, erfolgt dies, soweit es für die von Ihnen ausdrücklich gewünschte Buchungsfunktion unbedingt erforderlich ist, auf Grundlage von § 25 Abs. 2 Nr. 2 TDDDG. Rechtsgrundlage für die Verarbeitung Ihrer Buchungsdaten ist Art. 6 Abs. 1 lit. b DSGVO, sofern der Termin der Anbahnung oder Durchführung eines Vertrags dient, im Übrigen Art. 6 Abs. 1 lit. f DSGVO.",
                ],
              },
              {
                label: "d) Google Ads – Conversion-Tracking",
                paragraphs: [
                  "Wir nutzen den Dienst Google Ads der Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland („Google“), um die Wirksamkeit unserer Online-Werbung zu messen (Conversion-Tracking). Dabei wird bei bestimmten Interaktionen (Klick auf eine E-Mail-Adresse, Start einer Terminvereinbarung über Calendly oder Aufruf unseres LinkedIn-Profils) erfasst, ob Sie zuvor über eine unserer Anzeigen auf die Website gelangt sind.",
                  "Hierzu setzt Google Cookies (z. B. „_gcl_au“) ein und überträgt Daten an Google, insbesondere IP-Adresse, eine Klick- bzw. Cookie-Kennung, Informationen zur Interaktion sowie Browser- und Geräteinformationen. Eine Verknüpfung mit Ihrer Identität durch uns findet nicht statt.",
                  "Die Skripte von Google werden erst geladen, nachdem Sie über unser Cookie-Banner eingewilligt haben. Ohne Ihre Einwilligung werden weder Cookies gesetzt noch Daten an Google übertragen. Sie können Ihre Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen, indem Sie das Cookie-Banner über den Link „Cookie-Einstellungen“ im Footer erneut öffnen und „Ablehnen“ wählen. Die von Google gesetzten Cookies werden dabei gelöscht.",
                  "Rechtsgrundlage: Art. 6 Abs. 1 lit. a DSGVO i. V. m. § 25 Abs. 1 TDDDG (Einwilligung).",
                ],
              },
              {
                label: "e) Google Analytics 4",
                paragraphs: [
                  "Wir nutzen den Webanalysedienst Google Analytics 4 der Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland („Google“), um die Nutzung unserer Website statistisch auszuwerten (z. B. aufgerufene Seiten, Verweildauer, ungefähre Herkunft, verwendete Geräte). Dies hilft uns, unser Angebot zu verbessern.",
                  "Hierzu setzt Google Cookies (z. B. „_ga“) ein und überträgt Nutzungsdaten an Google, insbesondere eine pseudonyme Kennung, Informationen zu Ihrem Nutzungsverhalten sowie Browser- und Geräteinformationen. Ihre IP-Adresse wird dabei technisch an Google übermittelt; nach Angaben von Google werden IP-Adressen in Google Analytics 4 jedoch nicht protokolliert oder gespeichert, sondern lediglich zur Ableitung ungefährer Standortdaten verwendet und anschließend verworfen. Eine Verknüpfung mit Ihrer Identität durch uns findet nicht statt.",
                  "Google Analytics wird erst geladen, nachdem Sie über unser Cookie-Banner eingewilligt haben. Ohne Ihre Einwilligung werden weder Cookies gesetzt noch Daten an Google übertragen. Sie können Ihre Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen, indem Sie das Cookie-Banner über den Link „Cookie-Einstellungen“ im Footer erneut öffnen und „Ablehnen“ wählen. Die von Google gesetzten Cookies werden dabei gelöscht.",
                  "Rechtsgrundlage: Art. 6 Abs. 1 lit. a DSGVO i. V. m. § 25 Abs. 1 TDDDG (Einwilligung).",
                ],
              },
            ],
          },
          {
            title: "4. Empfänger von Daten",
            paragraphs: [
              "Zur Erbringung unserer Leistungen setzen wir folgende Dienstleister ein:",
            ],
            bullets: [
              "GitHub, Inc., USA – GitHub Pages (Hosting)",
              "EmailJS Pte. Ltd., Singapur – Versand von Kontaktformular-Nachrichten",
              "Calendly LLC, USA – Terminvereinbarung",
              "Google Ireland Limited, Irland, bzw. Google LLC, USA – Google Ads (Conversion-Tracking, nur mit Einwilligung)",
              "Google Ireland Limited, Irland, bzw. Google LLC, USA – Google Analytics 4 (Webanalyse, nur mit Einwilligung)",
            ],
          },
          {
            title: "5. Übermittlung in Drittländer",
            paragraphs: [
              "Einige der genannten Dienstleister verarbeiten Daten außerhalb der EU bzw. des EWR. Wir stützen diese Übermittlungen auf folgende Grundlagen:",
            ],
            bullets: [
              "GitHub (USA): GitHub, Inc. ist unter dem EU-US Data Privacy Framework zertifiziert; die Übermittlung erfolgt auf Grundlage des Angemessenheitsbeschlusses der EU-Kommission (Art. 45 DSGVO). Ergänzend werden EU-Standardvertragsklauseln verwendet.",
              "EmailJS (Singapur): Für Singapur besteht kein Angemessenheitsbeschluss. Die Übermittlung erfolgt auf Grundlage der EU-Standardvertragsklauseln (Art. 46 Abs. 2 lit. c DSGVO), die Bestandteil der Auftragsverarbeitungsvereinbarung von EmailJS sind.",
              "Calendly (USA): Calendly LLC ist unter dem EU-US Data Privacy Framework zertifiziert (Art. 45 DSGVO); ergänzend werden EU-Standardvertragsklauseln verwendet.",
              "Google (USA): Google LLC ist unter dem EU-US Data Privacy Framework zertifiziert (Art. 45 DSGVO); ergänzend werden EU-Standardvertragsklauseln verwendet.",
              "Die Zertifizierungen können Sie unter https://www.dataprivacyframework.gov/list einsehen. Den Text der EU-Standardvertragsklauseln finden Sie unter https://eur-lex.europa.eu/eli/dec_impl/2021/914/oj; eine Kopie der jeweils verwendeten Garantien können Sie außerdem jederzeit über die oben genannten Kontaktdaten bei uns anfordern.",
            ],
          },
          {
            title: "6. Cookies und ähnliche Technologien",
            paragraphs: [
              "Ihre Auswahl im Cookie-Banner speichern wir lokal in Ihrem Browser (Local Storage, Eintrag „smiit-consent-v1“), damit das Banner nicht bei jedem Seitenaufruf erneut erscheint. Dies ist für die von Ihnen gewünschte Speicherung Ihrer Auswahl unbedingt erforderlich (§ 25 Abs. 2 Nr. 2 TDDDG; Art. 6 Abs. 1 lit. c DSGVO i. V. m. Art. 7 Abs. 1 DSGVO).",
              "Marketing-, Conversion- und Analyse-Cookies von Google Ads und Google Analytics setzen wir ausschließlich auf Grundlage Ihrer Einwilligung ein. Solange Sie nicht eingewilligt haben, werden die entsprechenden Dienste gar nicht erst geladen. Ihre Auswahl können Sie jederzeit über den Link „Cookie-Einstellungen“ im Footer ändern.",
              "Calendly wird erst geladen, wenn Sie aktiv eine Terminbuchung starten; im Buchungsfenster kann Calendly eigene Cookies oder ähnliche Technologien einsetzen (siehe Ziffer 3 c).",
            ],
          },
          {
            title: "7. Speicherdauer",
            paragraphs: [
              "Wir speichern personenbezogene Daten nur so lange, wie es für den jeweiligen Zweck erforderlich ist oder gesetzliche Aufbewahrungspflichten bestehen. Im Einzelnen:",
            ],
            bullets: [
              "Server-Logfiles: Speicherung durch GitHub, soweit und solange dies für Auslieferung, Betrieb und Sicherheit der Website erforderlich ist; wir selbst speichern diese Daten nicht.",
              "Kontaktanfragen: Löschung spätestens 12 Monate nach abschließender Bearbeitung Ihrer Anfrage. Soweit EmailJS einen Versandverlauf speichert, wird dieser nach den Aufbewahrungsfristen des Anbieters automatisch gelöscht.",
              "Termindaten (Calendly): bis zur Abwicklung des Termins und etwaiger Anschlusskommunikation, spätestens 12 Monate nach dem Termin.",
              "Geschäftskorrespondenz: Entsteht aus einer Anfrage oder einem Termin eine Geschäftsbeziehung oder handels- bzw. steuerrechtlich relevante Korrespondenz, bewahren wir diese für die Dauer der gesetzlichen Fristen auf (insbesondere § 257 HGB, § 147 AO; in der Regel sechs Jahre).",
              "Google Analytics 4: Nutzer- und ereignisbezogene Daten werden entsprechend der in unserem Konto eingestellten Aufbewahrungsdauer, höchstens jedoch nach 14 Monaten, automatisch gelöscht. Das Cookie „_ga“ hat eine Laufzeit von bis zu 2 Jahren.",
              "Google Ads: Das Cookie „_gcl_au“ hat eine Laufzeit von bis zu 90 Tagen.",
              "Google-Cookies werden zudem sofort gelöscht, wenn Sie Ihre Einwilligung widerrufen. Ihre Cookie-Auswahl bleibt gespeichert, bis Sie sie ändern oder Ihre Browserdaten löschen.",
            ],
          },
          {
            title: "8. Rechte der betroffenen Personen",
            paragraphs: [
              "Sie haben das Recht auf Auskunft (Art. 15 DSGVO), Berichtigung (Art. 16 DSGVO), Löschung (Art. 17 DSGVO), Einschränkung der Verarbeitung (Art. 18 DSGVO) und Datenübertragbarkeit (Art. 20 DSGVO). Eine erteilte Einwilligung können Sie jederzeit mit Wirkung für die Zukunft widerrufen (Art. 7 Abs. 3 DSGVO).",
              "Widerspruchsrecht: Soweit wir Daten auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO verarbeiten, können Sie aus Gründen, die sich aus Ihrer besonderen Situation ergeben, jederzeit Widerspruch gegen die Verarbeitung einlegen (Art. 21 DSGVO).",
              "Zur Ausübung Ihrer Rechte genügt eine Nachricht an die in Ziffer 1 genannten Kontaktdaten.",
            ],
          },
          {
            title: "9. Beschwerderecht",
            paragraphs: [
              "Sie haben das Recht, sich bei einer Datenschutzaufsichtsbehörde zu beschweren (Art. 77 DSGVO). Für uns zuständig ist der Landesbeauftragte für den Datenschutz und die Informationsfreiheit Baden-Württemberg.",
            ],
          },
          {
            title: "10. Erforderlichkeit der Bereitstellung",
            paragraphs: [
              "Die Bereitstellung Ihrer Daten ist weder gesetzlich noch vertraglich vorgeschrieben. Ohne Angabe der erforderlichen Daten (z. B. E-Mail-Adresse) können wir Ihre Anfrage bzw. Terminbuchung jedoch nicht bearbeiten.",
            ],
          },
          {
            title: "11. Automatisierte Entscheidungsfindung",
            paragraphs: [
              "Eine automatisierte Entscheidungsfindung einschließlich Profiling im Sinne von Art. 22 DSGVO findet nicht statt.",
            ],
          },
          {
            title: "12. Stand",
            paragraphs: ["Stand dieser Datenschutzerklärung: September 2026."],
          },
        ],
      }
    : {
        title: "Privacy policy",
        sections: [
          {
            title: "1. Controller",
            paragraphs: [
              "smiit GmbH, represented by its managing directors Sebastian Grab and Noah Neßlauer",
              "Reiherweg 96, 89584 Ehingen, Germany",
              `Email: ${email}`,
              `Phone: ${phone}`,
              "If you have any questions about data protection or wish to exercise your rights, you can reach us using the contact details above.",
            ],
          },
          {
            title: "2. General information on data processing",
            paragraphs: [
              "Personal data is any information relating to an identified or identifiable natural person, e.g. name, email address, or IP address.",
              "The fonts used on this website are served locally by our hosting provider; no connection to Google Fonts servers is established.",
            ],
          },
          {
            title: "3. Purposes of processing and legal bases",
            subsections: [
              {
                label: "a) Provision and operation of the website (hosting via GitHub Pages)",
                paragraphs: [
                  "This website is hosted via GitHub Pages, a service provided by GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, USA (“GitHub”).",
                  "When you access the website, GitHub automatically processes technically necessary data in server log files, in particular the IP address, date and time of access, page requested, referrer URL, browser type, and operating system. This data is processed to deliver the website and to ensure its technical operation and security. We ourselves have no access to these log files.",
                  "Legal basis: Art. 6(1)(f) GDPR. Our legitimate interest lies in providing a secure and functional website.",
                ],
              },
              {
                label: "b) Contact requests via form or email",
                paragraphs: [
                  "If you contact us by email or via the contact form, we process the data you provide to handle your request and any follow-up questions. For the contact form, this is your first and last name, email address, topic of interest, message, and optionally your phone number.",
                  "For the technical delivery of form data, we use the service EmailJS provided by EmailJS Pte. Ltd., Singapore (“EmailJS”). Only when you submit the form is the data you entered, together with technical connection data (in particular your IP address), transmitted to EmailJS and then forwarded to us by email.",
                  "Legal basis: Art. 6(1)(b) GDPR where your request relates to an existing contract or to taking steps prior to entering into a contract (e.g. an inquiry about our services). In all other cases, the legal basis is Art. 6(1)(f) GDPR; our legitimate interest lies in effectively handling the requests addressed to us.",
                ],
              },
              {
                label: "c) Appointment scheduling via Calendly",
                paragraphs: [
                  "To schedule appointments online, we use the service Calendly provided by Calendly LLC, USA (“Calendly”).",
                  "Calendly is not loaded when you visit our website. Only when you actively click a button or link to book an appointment are Calendly scripts loaded and the booking window opened. In doing so, in particular your IP address, browser and device information, and the page visited are transmitted to Calendly. Calendly may use cookies or similar technologies within the booking window.",
                  "If you book an appointment, we process the data you enter (in particular name, email address, selected time slot, and any information about your request) to organize and conduct the appointment.",
                  "The legal basis for opening the booking window is Art. 6(1)(f) GDPR; our legitimate interest lies in offering simple online appointment scheduling. Where information is stored on or read from your device in this context, this is done, to the extent strictly necessary for the booking function you have expressly requested, on the basis of Section 25(2) No. 2 TDDDG. The legal basis for processing your booking data is Art. 6(1)(b) GDPR where the appointment serves to initiate or perform a contract, and Art. 6(1)(f) GDPR otherwise.",
                ],
              },
              {
                label: "d) Google Ads – conversion tracking",
                paragraphs: [
                  "We use the service Google Ads provided by Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Ireland (“Google”) to measure the effectiveness of our online advertising (conversion tracking). On certain interactions (clicking an email address, starting an appointment booking via Calendly, or opening our LinkedIn profile), it is recorded whether you previously reached the website via one of our ads.",
                  "For this purpose, Google sets cookies (e.g. “_gcl_au”) and transmits data to Google, in particular the IP address, a click or cookie identifier, information about the interaction, and browser and device information. We do not link this data to your identity.",
                  "Google’s scripts are only loaded after you have given your consent via our cookie banner. Without your consent, no cookies are set and no data is transmitted to Google. You can withdraw your consent at any time with effect for the future by reopening the cookie banner via the “Cookie settings” link in the footer and choosing “Decline”. The cookies set by Google are deleted in the process.",
                  "Legal basis: Art. 6(1)(a) GDPR in conjunction with Section 25(1) TDDDG (consent).",
                ],
              },
              {
                label: "e) Google Analytics 4",
                paragraphs: [
                  "We use the web analytics service Google Analytics 4 provided by Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Ireland (“Google”) to analyze the use of our website statistically (e.g. pages viewed, time on site, approximate origin, devices used). This helps us improve our offering.",
                  "For this purpose, Google sets cookies (e.g. “_ga”) and transmits usage data to Google, in particular a pseudonymous identifier, information about your usage behavior, and browser and device information. Your IP address is technically transmitted to Google; however, according to Google, IP addresses are not logged or stored in Google Analytics 4 but are only used to derive approximate location data and then discarded. We do not link this data to your identity.",
                  "Google Analytics is only loaded after you have given your consent via our cookie banner. Without your consent, no cookies are set and no data is transmitted to Google. You can withdraw your consent at any time with effect for the future by reopening the cookie banner via the “Cookie settings” link in the footer and choosing “Decline”. The cookies set by Google are deleted in the process.",
                  "Legal basis: Art. 6(1)(a) GDPR in conjunction with Section 25(1) TDDDG (consent).",
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
              "GitHub, Inc., USA – GitHub Pages (hosting)",
              "EmailJS Pte. Ltd., Singapore – delivery of contact form messages",
              "Calendly LLC, USA – appointment scheduling",
              "Google Ireland Limited, Ireland, and Google LLC, USA – Google Ads (conversion tracking, only with consent)",
              "Google Ireland Limited, Ireland, and Google LLC, USA – Google Analytics 4 (web analytics, only with consent)",
            ],
          },
          {
            title: "5. Transfers to third countries",
            paragraphs: [
              "Some of the service providers listed process data outside the EU/EEA. We base these transfers on the following safeguards:",
            ],
            bullets: [
              "GitHub (USA): GitHub, Inc. is certified under the EU-US Data Privacy Framework; transfers are based on the European Commission’s adequacy decision (Art. 45 GDPR). In addition, the EU Standard Contractual Clauses are used.",
              "EmailJS (Singapore): There is no adequacy decision for Singapore. Transfers are based on the EU Standard Contractual Clauses (Art. 46(2)(c) GDPR), which form part of EmailJS’s data processing agreement.",
              "Calendly (USA): Calendly LLC is certified under the EU-US Data Privacy Framework (Art. 45 GDPR); in addition, the EU Standard Contractual Clauses are used.",
              "Google (USA): Google LLC is certified under the EU-US Data Privacy Framework (Art. 45 GDPR); in addition, the EU Standard Contractual Clauses are used.",
              "You can view the certifications at https://www.dataprivacyframework.gov/list. The text of the EU Standard Contractual Clauses is available at https://eur-lex.europa.eu/eli/dec_impl/2021/914/oj; you can also request a copy of the safeguards used from us at any time using the contact details above.",
            ],
          },
          {
            title: "6. Cookies and similar technologies",
            paragraphs: [
              "We store your cookie banner choice locally in your browser (local storage, entry “smiit-consent-v1”) so that the banner does not reappear on every page view. This is strictly necessary to store the choice you have requested (Section 25(2) No. 2 TDDDG; Art. 6(1)(c) GDPR in conjunction with Art. 7(1) GDPR).",
              "We use marketing, conversion, and analytics cookies from Google Ads and Google Analytics exclusively on the basis of your consent. Until you consent, these services are not loaded at all. You can change your choice at any time via the “Cookie settings” link in the footer.",
              "Calendly is only loaded when you actively start an appointment booking; within the booking window, Calendly may use its own cookies or similar technologies (see section 3 c).",
            ],
          },
          {
            title: "7. Storage period",
            paragraphs: [
              "We only store personal data for as long as necessary for the respective purpose or as required by statutory retention obligations. In detail:",
            ],
            bullets: [
              "Server log files: stored by GitHub to the extent and for as long as necessary for delivering, operating, and securing the website; we do not store this data ourselves.",
              "Contact requests: deleted no later than 12 months after your request has been fully handled. Where EmailJS keeps a sending history, it is deleted automatically in accordance with the provider’s retention periods.",
              "Appointment data (Calendly): until the appointment and any follow-up communication have been completed, no later than 12 months after the appointment.",
              "Business correspondence: if a request or appointment results in a business relationship or correspondence relevant under commercial or tax law, we retain it for the statutory periods (in particular Section 257 HGB, Section 147 AO; generally six years).",
              "Google Analytics 4: user- and event-level data is deleted automatically according to the retention period configured in our account, at the latest after 14 months. The “_ga” cookie has a lifetime of up to 2 years.",
              "Google Ads: the “_gcl_au” cookie has a lifetime of up to 90 days.",
              "Google cookies are also deleted immediately if you withdraw your consent. Your cookie choice remains stored until you change it or clear your browser data.",
            ],
          },
          {
            title: "8. Data subject rights",
            paragraphs: [
              "You have the right of access (Art. 15 GDPR), rectification (Art. 16 GDPR), erasure (Art. 17 GDPR), restriction of processing (Art. 18 GDPR), and data portability (Art. 20 GDPR). You can withdraw any consent given at any time with effect for the future (Art. 7(3) GDPR).",
              "Right to object: where we process data on the basis of Art. 6(1)(f) GDPR, you may object to the processing at any time on grounds relating to your particular situation (Art. 21 GDPR).",
              "To exercise your rights, simply contact us using the details in section 1.",
            ],
          },
          {
            title: "9. Right to lodge a complaint",
            paragraphs: [
              "You have the right to lodge a complaint with a data protection supervisory authority (Art. 77 GDPR). The authority competent for us is the State Commissioner for Data Protection and Freedom of Information of Baden-Württemberg (Landesbeauftragter für den Datenschutz und die Informationsfreiheit Baden-Württemberg).",
            ],
          },
          {
            title: "10. Requirement to provide data",
            paragraphs: [
              "Providing your data is neither a statutory nor a contractual requirement. However, without the required data (e.g. your email address), we cannot process your request or appointment booking.",
            ],
          },
          {
            title: "11. Automated decision-making",
            paragraphs: [
              "No automated decision-making, including profiling, within the meaning of Art. 22 GDPR takes place.",
            ],
          },
          {
            title: "12. Last updated",
            paragraphs: ["This privacy policy was last updated in September 2026."],
          },
        ],
      }

  return (
    <main className="min-h-screen">
      <section className="relative isolate z-0 min-h-[300px] h-[42vh] sm:h-[48vh] md:h-[46vh] lg:h-[50vh] max-h-[560px] overflow-hidden rounded-b-[1.75rem] bg-black/[0.02] mb-2 sm:mb-4 md:mb-0">
        <div className="absolute inset-0">
          <Image
            src="/assets/legal.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            aria-hidden="true"
            className="object-cover object-[15%_35%] sm:object-[22%_35%] md:object-[40%_35%]"
          />
        </div>

        <div
          className={[
            "pointer-events-none absolute inset-0 z-[5]",
            "bg-gradient-to-r from-white/70 via-white/15 to-transparent",
          ].join(" ")}
        />

        <div className="pointer-events-none absolute inset-0 z-[6] bg-gradient-to-t from-black/12 via-black/4 to-transparent" />

        <div
          className="pointer-events-none absolute inset-0 z-10 opacity-[0.18] bg-black/10"
          style={{
            backgroundImage: "url(/assets/grain.webp)",
            backgroundRepeat: "repeat",
            backgroundSize: "150px 150px",
            mixBlendMode: "soft-light",
          }}
        />

        <div className="relative z-20 h-full flex items-end">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 w-full pb-12 sm:pb-14 md:pb-16 lg:pb-20">
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

      <section className="relative z-30 py-0 md:py-0">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative z-30 -mt-6 sm:-mt-8 md:-mt-10 lg:-mt-12 rounded-[1.75rem] border border-black/10 bg-white shadow-xl ring-1 ring-black/5 p-6 sm:p-8 md:p-10">
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

      <div className="h-2 md:h-4" />
    </main>
  )
}
