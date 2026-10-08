import type { Locale } from "@/lib/dictionary"
import type { GlossaryExtra, LocalizedGlossaryTerm } from "@/lib/glossary"

const restApi: LocalizedGlossaryTerm = {
  de: {
    slug: "rest-api",
    cluster: "apps",
    dateModified: "2026-05-25",
    term: "REST-API / API-Integration",
    title: "Was ist eine REST-API und API-Integration?",
    shortDefinition:
      "Eine REST-API ist eine standardisierte Schnittstelle, über die Software per HTTP Daten austauscht und Funktionen aufruft. API-Integration bezeichnet die Anbindung solcher Schnittstellen, damit verschiedene Systeme automatisiert miteinander kommunizieren.",
    synonyms: ["RESTful API", "Web-API", "Schnittstellen-Integration"],
    sections: [
      {
        heading: "Einordnung: Wofür wird eine REST-API genutzt?",
        paragraphs: [
          "REST-APIs sind das Bindeglied moderner Software. Sie stellen Funktionen und Daten über klar definierte HTTP-Endpunkte bereit, sodass andere Anwendungen sie maschinell abrufen oder verändern können – unabhängig von Programmiersprache oder Plattform. Datenformate wie JSON machen den Austausch einheitlich und gut verarbeitbar.",
          "API-Integration bedeutet, solche Schnittstellen sinnvoll zu verbinden: Eine SaaS-Plattform bindet etwa ein Buchhaltungssystem, einen Zahlungsdienst oder ein CRM an, damit Daten automatisch fließen statt manuell übertragen zu werden. Im Mittelstand löst das viele Medienbrüche und spart wiederkehrende Handarbeit.",
        ],
      },
      {
        heading: "Beispiel aus der Praxis",
        paragraphs: [
          "Eine Versicherungsplattform soll Schadendaten an das Kernsystem eines Partners übergeben. Über eine REST-API sendet die Plattform die Vorgänge im JSON-Format an einen definierten Endpunkt, erhält eine Bestätigung zurück und aktualisiert den Status automatisch. Ein manueller Export entfällt, und beide Systeme bleiben in Echtzeit synchron.",
        ],
      },
      {
        heading: "Abgrenzung & Bezug zu smiit",
        paragraphs: [
          "REST ist ein verbreiteter Architekturstil für Web-APIs, daneben existieren Varianten wie GraphQL oder SOAP; REST überzeugt durch Einfachheit, breite Unterstützung und gute Eignung für Cloud-Dienste. smiit hat die SaaS-Plattform der Claimity AG mit REST-APIs ausgestattet, um sie sauber an bestehende Systeme anzubinden. Betrieben auf Microsoft Azure mit Azure App Service, abgesichert über Azure Front Door und Keycloak für Identität und MFA, ermöglichen die APIs einen automatisierten, DSGVO-konformen Datenaustausch innerhalb der Multi-Tenant-Architektur.",
        ],
      },
    ],
    faq: [
      {
        question: "Was bedeutet REST bei einer API?",
        answer:
          "REST steht für einen Architekturstil, der Ressourcen über HTTP-Methoden wie GET, POST, PUT und DELETE anspricht. Daten werden typischerweise als JSON ausgetauscht, was die Schnittstelle einfach und plattformunabhängig nutzbar macht.",
      },
      {
        question: "Warum ist API-Integration für Unternehmen wichtig?",
        answer:
          "Sie verbindet getrennte Systeme, sodass Daten automatisch fließen statt manuell übertragen zu werden. Das reduziert Fehler, spart Zeit und ist die Grundlage für durchgängig digitale Prozesse und vernetzte Plattformen.",
      },
      {
        question: "Was ist der Unterschied zwischen REST und GraphQL?",
        answer:
          "Bei REST fragt man feste Endpunkte ab, die jeweils eine bestimmte Datenstruktur zurückgeben. Bei GraphQL beschreibt der Aufrufer in einer Abfrage genau, welche Felder er benötigt. REST ist einfacher und breit unterstützt, GraphQL flexibler bei komplexen, verschachtelten Datenabfragen.",
      },
      {
        question: "Wie sichert man eine REST-API ab?",
        answer:
          "Üblich sind Verschlüsselung über HTTPS, Authentifizierung etwa über Tokens oder OAuth, eine Begrenzung der Anfragerate (Rate Limiting) sowie eine sorgfältige Prüfung aller eingehenden Daten. So wird sichergestellt, dass nur berechtigte Systeme auf die richtigen Funktionen zugreifen.",
      },
    ],
    relatedServicePath: "services/apps",
    relatedCaseStudySlug: "claimity-ag",
    metaTitle: "Was ist eine REST-API? API-Integration erklärt | smiit Glossar",
    metaDescription:
      "REST-API und API-Integration einfach erklärt: Definition, Funktionsweise, Abgrenzung zu GraphQL und SOAP – mit Azure-Praxisbezug von smiit.",
  },
  en: {
    slug: "rest-api",
    cluster: "apps",
    dateModified: "2026-05-25",
    term: "REST API / API integration",
    title: "What is a REST API and API integration?",
    shortDefinition:
      "A REST API is a standardized interface through which software exchanges data and calls functions via HTTP. API integration refers to connecting such interfaces so that different systems communicate with each other automatically.",
    synonyms: ["RESTful API", "web API", "interface integration"],
    sections: [
      {
        heading: "Where a REST API is used",
        paragraphs: [
          "REST APIs are the connective tissue of modern software. They expose functions and data through clearly defined HTTP endpoints so that other applications can retrieve or change them programmatically – regardless of programming language or platform. Data formats such as JSON make the exchange uniform and easy to process.",
          "API integration means connecting such interfaces meaningfully: a SaaS platform might connect an accounting system, a payment service or a CRM so that data flows automatically instead of being transferred manually. In mid-sized companies this removes many manual handoffs between systems and saves recurring work.",
        ],
      },
      {
        heading: "A practical example",
        paragraphs: [
          "An insurance platform needs to hand claims data over to a partner's core system. Via a REST API, the platform sends the cases in JSON format to a defined endpoint, receives a confirmation back and updates the status automatically. A manual export is no longer needed, and both systems stay synchronized in real time.",
        ],
      },
      {
        heading: "How it relates & how smiit uses it",
        paragraphs: [
          "REST is a widespread architectural style for web APIs, alongside variants such as GraphQL or SOAP; REST stands out through simplicity, broad support and good suitability for cloud services. smiit equipped Claimity AG's SaaS platform with REST APIs to connect it cleanly to existing systems. Running on Microsoft Azure with Azure App Service, secured via Azure Front Door and Keycloak for identity and MFA, the APIs enable automated, GDPR-compliant data exchange within the multi-tenant architecture.",
        ],
      },
    ],
    faq: [
      {
        question: "What does REST mean in an API?",
        answer:
          "REST stands for an architectural style that addresses resources via HTTP methods such as GET, POST, PUT and DELETE. Data is typically exchanged as JSON, which makes the interface simple and usable independently of any platform.",
      },
      {
        question: "Why is API integration important for companies?",
        answer:
          "It connects separate systems so that data flows automatically instead of being transferred manually. This reduces errors, saves time and is the basis for end-to-end digital processes and connected platforms.",
      },
      {
        question: "What is the difference between REST and GraphQL?",
        answer:
          "With REST you query fixed endpoints that each return a specific data structure. With GraphQL the caller describes in a query exactly which fields they need. REST is simpler and broadly supported, while GraphQL is more flexible for complex, nested data queries.",
      },
      {
        question: "How do you secure a REST API?",
        answer:
          "Common measures are encryption via HTTPS, authentication through tokens or OAuth, limiting the request rate (rate limiting) and careful validation of all incoming data. This ensures that only authorized systems access the right functions.",
      },
    ],
    relatedServicePath: "services/apps",
    relatedCaseStudySlug: "claimity-ag",
    metaTitle: "What is a REST API? API integration explained | smiit glossary",
    metaDescription:
      "REST API and API integration explained simply: definition, how it works, difference from GraphQL and SOAP – with hands-on Azure context from smiit.",
  },
}

export default restApi

/** Misconceptions + external sources, merged into the term on read (see getGlossaryTerm). */
export const extras: Record<Locale, GlossaryExtra> = {
  de: {
    misconceptions: [
      "REST wird oft mit jeder beliebigen HTTP- oder JSON-Schnittstelle gleichgesetzt, dabei ist es ein Architekturstil mit konkreten Prinzipien wie Zustandslosigkeit, einheitlicher Schnittstelle und ressourcenorientiertem Design.",
      "Viele glauben, REST schreibe zwingend JSON vor, obwohl der Stil formatunabhängig ist und Repräsentationen ebenso als XML oder andere Medientypen ausgeliefert werden können.",
      "Es wird häufig angenommen, die HTTP-Methoden seien beliebig austauschbar, dabei haben GET, POST, PUT und DELETE klar definierte Bedeutungen, und GET sollte stets sicher und ohne Seiteneffekte sein.",
    ],
    sources: [
      { title: "Roy T. Fielding – Architectural Styles (REST, Kapitel 5)", url: "https://ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm" },
      { title: "Microsoft Learn – Best Practices für den Entwurf von Web-APIs", url: "https://learn.microsoft.com/azure/architecture/best-practices/api-design" },
      { title: "IETF RFC 9110 – HTTP Semantics", url: "https://www.rfc-editor.org/rfc/rfc9110" },
    ],
  },
  en: {
    misconceptions: [
      "REST is often equated with any HTTP or JSON interface, when it is actually an architectural style with concrete principles such as statelessness, a uniform interface and resource-oriented design.",
      "Many believe REST mandates JSON, although the style is format-agnostic and representations can equally be delivered as XML or other media types.",
      "It is frequently assumed that HTTP methods are interchangeable, whereas GET, POST, PUT and DELETE have clearly defined meanings, and GET should always be safe and free of side effects.",
    ],
    sources: [
      { title: "Roy T. Fielding – Architectural Styles (REST, chapter 5)", url: "https://ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm" },
      { title: "Microsoft Learn – Web API design best practices", url: "https://learn.microsoft.com/azure/architecture/best-practices/api-design" },
      { title: "IETF RFC 9110 – HTTP Semantics", url: "https://www.rfc-editor.org/rfc/rfc9110" },
    ],
  },
}
