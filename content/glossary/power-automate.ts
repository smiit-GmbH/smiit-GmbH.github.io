import type { Locale } from "@/lib/dictionary"
import type { GlossaryExtra, LocalizedGlossaryTerm } from "@/lib/glossary"

const powerAutomate: LocalizedGlossaryTerm = {
  de: {
    slug: "power-automate",
    cluster: "strategy",
    dateModified: "2026-05-25",
    term: "Power Automate",
    title: "Was ist Power Automate?",
    shortDefinition:
      "Power Automate ist der Cloud-Dienst von Microsoft zur Automatisierung von Arbeitsabläufen. Mit ihm lassen sich wiederkehrende Aufgaben über sogenannte Flows automatisieren, die Systeme verbinden, auf Ereignisse reagieren und Daten verarbeiten – meist ohne klassische Programmierung.",
    synonyms: ["MS Flow", "Microsoft Flow", "Workflow-Automatisierung", "Power Platform"],
    sections: [
      {
        heading: "Einordnung: Wofür wird Power Automate genutzt?",
        paragraphs: [
          "Power Automate ist Teil der Microsoft Power Platform und verbindet über hunderte vorgefertigte Konnektoren Dienste wie Outlook, SharePoint, Teams, Dynamics, Business Central oder Drittsysteme. Flows werden durch Auslöser gestartet – etwa eine eingehende E-Mail, eine neue Datei oder einen Zeitplan – und führen dann eine Abfolge von Aktionen aus.",
          "Typisch sind drei Arten von Flows: automatisierte Flows (durch Ereignisse ausgelöst), Instant Flows (manuell gestartet) und geplante Flows (zeitgesteuert). Ergänzt um den AI Builder kann Power Automate auch Inhalte aus Dokumenten auslesen und so Medienbrüche schließen.",
        ],
      },
      {
        heading: "Beispiel aus der Praxis",
        paragraphs: [
          "Bei einem Logistikunternehmen treffen Aufträge als PDF per E-Mail ein. Ein Power-Automate-Flow erkennt den Eingang, übergibt das PDF an den AI Builder zur Extraktion der relevanten Felder und überträgt die Daten in das Zielsystem. Eine zusätzliche Kontrolllogik prüft, ob jeder Auftrag vollständig verarbeitet wurde, und meldet Ausnahmen zur manuellen Prüfung.",
        ],
      },
      {
        heading: "Abgrenzung & Bezug zu smiit",
        paragraphs: [
          "Power Automate ist das konkrete Werkzeug, mit dem die übergeordnete Prozessautomatisierung umgesetzt wird; es ist enger gefasst als klassische RPA und stark in das Microsoft-Ökosystem integriert. Häufig wird es mit dem AI Builder kombiniert und greift auf konsolidierte Stammdaten zurück. Für die G&B Logistics GmbH hat smiit die Auftragserfassung mit Power Automate und AI Builder automatisiert und spart dadurch rund 140 Arbeitsstunden pro Monat.",
        ],
      },
    ],
    faq: [
      {
        question: "Brauche ich Programmierkenntnisse für Power Automate?",
        answer:
          "Für viele Flows nicht. Power Automate ist ein Low-Code-Dienst, der mit vorgefertigten Konnektoren und einer visuellen Oberfläche arbeitet. Für komplexere Szenarien sind tiefere Kenntnisse jedoch hilfreich.",
      },
      {
        question: "Kann Power Automate auch mit Nicht-Microsoft-Systemen arbeiten?",
        answer:
          "Ja. Über zahlreiche Konnektoren und generische Schnittstellen wie HTTP lassen sich auch Drittsysteme anbinden, sodass Daten zwischen unterschiedlichen Anwendungen ausgetauscht werden können.",
      },
      {
        question: "Was ist der Unterschied zwischen Power Automate und klassischer RPA?",
        answer:
          "Klassische RPA steuert oft die Benutzeroberfläche bestehender Programme nach, während Power Automate primär über Konnektoren und Schnittstellen (APIs) arbeitet und tief in das Microsoft-Ökosystem integriert ist. Power Automate bietet zwar auch UI-basierte Automatisierung (Desktop-Flows), ist aber breiter als reines Oberflächen-Nachklicken angelegt.",
      },
      {
        question: "Was passiert, wenn ein Flow fehlschlägt?",
        answer:
          "Power Automate protokolliert jeden Lauf, sodass sich Fehler nachvollziehen lassen. Flows können mit Wiederholungen, Fehlerbehandlung und Benachrichtigungen ausgestattet werden, sodass Ausnahmen kontrolliert behandelt und bei Bedarf zur manuellen Prüfung weitergeleitet werden.",
      },
      {
        question: "Eignet sich Power Automate für den Mittelstand?",
        answer:
          "Ja. Gerade wenn bereits Microsoft 365 im Einsatz ist, lassen sich wiederkehrende Aufgaben ohne große Zusatzinvestition automatisieren. Der Low-Code-Ansatz erlaubt einen schrittweisen Einstieg, bei dem zunächst einzelne, klar abgegrenzte Abläufe automatisiert werden.",
      },
    ],
    relatedServicePath: "services/strategy",
    relatedCaseStudySlug: "gb-logistics-gmbh",
    metaTitle: "Power Automate: Definition, Funktionen & Beispiel | smiit Glossar",
    metaDescription:
      "Power Automate erklärt: Flows, Konnektoren und Auslöser zur Workflow-Automatisierung – mit Praxisbeispiel von smiit (140 Std./Monat gespart).",
  },
  en: {
    slug: "power-automate",
    cluster: "strategy",
    dateModified: "2026-05-25",
    term: "Power Automate",
    title: "What is Power Automate?",
    shortDefinition:
      "Power Automate is Microsoft's cloud service for automating workflows. It lets you automate recurring tasks via so-called flows that connect systems, react to events and process data — usually without traditional programming.",
    synonyms: ["MS Flow", "Microsoft Flow", "workflow automation", "Power Platform"],
    sections: [
      {
        heading: "Where Power Automate is used",
        paragraphs: [
          "Power Automate is part of the Microsoft Power Platform and connects services such as Outlook, SharePoint, Teams, Dynamics, Business Central or third-party systems through hundreds of prebuilt connectors. Flows are started by triggers — such as an incoming email, a new file or a schedule — and then run a sequence of actions.",
          "There are typically three kinds of flows: automated flows (triggered by events), instant flows (started manually) and scheduled flows (time-driven). Combined with AI Builder, Power Automate can also read content from documents and thereby close broken handoffs.",
        ],
      },
      {
        heading: "A practical example",
        paragraphs: [
          "At a logistics company, orders arrive as PDFs by email. A Power Automate flow detects the incoming message, passes the PDF to AI Builder to extract the relevant fields and transfers the data into the target system. Additional control logic checks whether every order was processed completely and flags exceptions for manual review.",
        ],
      },
      {
        heading: "How it relates & how smiit uses it",
        paragraphs: [
          "Power Automate is the concrete tool used to implement the broader concept of process automation; it is more narrowly scoped than classic RPA and tightly integrated into the Microsoft ecosystem. It is often combined with AI Builder and relies on consolidated master data. For G&B Logistics GmbH, smiit automated order capture with Power Automate and AI Builder, saving around 140 working hours per month.",
        ],
      },
    ],
    faq: [
      {
        question: "Do I need programming skills for Power Automate?",
        answer:
          "For many flows, no. Power Automate is a low-code service that works with prebuilt connectors and a visual interface. For more complex scenarios, however, deeper knowledge is helpful.",
      },
      {
        question: "Can Power Automate also work with non-Microsoft systems?",
        answer:
          "Yes. Through numerous connectors and generic interfaces such as HTTP, third-party systems can be connected too, so data can be exchanged between different applications.",
      },
      {
        question: "What is the difference between Power Automate and classic RPA?",
        answer:
          "Classic RPA often replays the user interface of existing programs, whereas Power Automate works primarily through connectors and interfaces (APIs) and is deeply integrated into the Microsoft ecosystem. Power Automate does offer UI-based automation (desktop flows) too, but it is designed more broadly than pure interface clicking.",
      },
      {
        question: "What happens when a flow fails?",
        answer:
          "Power Automate logs every run, so errors can be traced. Flows can be equipped with retries, error handling and notifications, so exceptions are handled in a controlled way and forwarded for manual review where needed.",
      },
      {
        question: "Is Power Automate suitable for mid-sized companies?",
        answer:
          "Yes. Especially where Microsoft 365 is already in use, recurring tasks can be automated without a large additional investment. The low-code approach allows a gradual start, automating individual, clearly scoped workflows first.",
      },
    ],
    relatedServicePath: "services/strategy",
    relatedCaseStudySlug: "gb-logistics-gmbh",
    metaTitle: "Power Automate: definition, features & example | smiit glossary",
    metaDescription:
      "Power Automate explained: flows, connectors and triggers for workflow automation — with a smiit example (140 hours/month saved).",
  },
}

export default powerAutomate

/** Misconceptions + external sources, merged into the term on read (see getGlossaryTerm). */
export const extras: Record<Locale, GlossaryExtra> = {
  de: {
    misconceptions: [
      "Power Automate wird oft mit klassischer RPA gleichgesetzt; sein Kern sind jedoch Cloud-Flows über Connectoren und APIs, während die Desktop-Automatisierung nur ein Teilbereich ist.",
      "Viele glauben, es brauche keinerlei Programmierkenntnisse — für robuste Flows sind aber Verständnis von Logik, Fehlerbehandlung und Datenstrukturen entscheidend.",
      "Es wird unterschätzt, dass Lizenzierung und Premium-Connectoren Kosten verursachen; nicht jeder Connector ist in der Basislizenz enthalten.",
    ],
    sources: [
      { title: "Microsoft Learn – Power Automate Dokumentation", url: "https://learn.microsoft.com/power-automate/" },
      { title: "Microsoft Learn – Microsoft Power Platform", url: "https://learn.microsoft.com/power-platform/" },
    ],
  },
  en: {
    misconceptions: [
      "Power Automate is often equated with classic RPA; its core, however, is cloud flows via connectors and APIs, while desktop automation is only one part of it.",
      "Many believe no programming knowledge is needed — yet building robust flows requires understanding of logic, error handling and data structures.",
      "People underestimate that licensing and premium connectors incur costs; not every connector is included in the base license.",
    ],
    sources: [
      { title: "Microsoft Learn – Power Automate documentation", url: "https://learn.microsoft.com/power-automate/" },
      { title: "Microsoft Learn – Microsoft Power Platform", url: "https://learn.microsoft.com/power-platform/" },
    ],
  },
}
