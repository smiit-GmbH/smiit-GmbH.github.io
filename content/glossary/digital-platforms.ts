import type { Locale } from "@/lib/dictionary"
import type { GlossaryExtra, LocalizedGlossaryTerm } from "@/lib/glossary"

const digitalePlattformen: LocalizedGlossaryTerm = {
  de: {
    slug: "digital-platforms",
    cluster: "apps",
    dateModified: "2026-05-25",
    term: "Digitale Plattformen",
    title: "Was sind digitale Plattformen?",
    shortDefinition:
      "Digitale Plattformen sind softwarebasierte Systeme, die Nutzer, Daten und Dienste über standardisierte Schnittstellen zusammenführen und Interaktionen oder Transaktionen ermöglichen. Sie bündeln Funktionen zentral, lassen sich erweitern und bilden die technische Basis für digitale Geschäftsmodelle.",
    synonyms: ["Plattform-Ökosystem", "digitale Geschäftsplattform", "Platform-as-a-Service-Lösung"],
    sections: [
      {
        heading: "Einordnung: Wofür werden digitale Plattformen genutzt?",
        paragraphs: [
          "Digitale Plattformen verbinden mehrere Akteure – etwa Kunden, Partner und interne Abteilungen – über eine gemeinsame technische Schicht. Anders als eine einzelne Anwendung stellen sie wiederverwendbare Bausteine wie Identitätsverwaltung, Datenhaltung, APIs und Abrechnung bereit, auf denen sich verschiedene Funktionen und Dienste aufbauen lassen.",
          "Im Mittelstand dienen sie oft als zentrales System, das gewachsene Insellösungen ablöst. Statt isolierter Tools entsteht ein zusammenhängendes Ökosystem, in dem Daten fließen und sich neue Services schrittweise ergänzen lassen. Microsoft Azure liefert dafür die Infrastruktur, von App-Hosting über Datenbanken bis zu Sicherheitsdiensten.",
        ],
      },
      {
        heading: "Beispiel aus der Praxis",
        paragraphs: [
          "Ein Versicherungsdienstleister möchte Schadenmeldungen, Kundenkommunikation und Partneranbindung in einem System bündeln. Eine digitale Plattform stellt dafür einen Mandantenbereich pro Kunde, eine zentrale Nutzerverwaltung und offene Schnittstellen für angebundene Systeme bereit. Neue Funktionen wie Reporting oder automatisierte Prüfprozesse werden später als Module ergänzt, ohne die Basis neu zu bauen.",
        ],
      },
      {
        heading: "Vorteile & typische Anwendungsfälle",
        paragraphs: [
          "Der Wert digitaler Plattformen liegt in Wiederverwendbarkeit und Skalierung: Gemeinsame Dienste werden einmal gebaut und mehrfach genutzt, neue Anwendungsfälle entstehen schneller und kostengünstiger.",
        ],
        bullets: [
          "Zentrale Identitäts- und Rechteverwaltung statt vieler getrennter Logins",
          "Anbindung externer Systeme über APIs und standardisierte Schnittstellen",
          "Mandantenfähigkeit für mehrere Kunden oder Geschäftseinheiten auf einer Basis",
          "Schrittweiser Funktionsausbau ohne Neuentwicklung des Gesamtsystems",
        ],
      },
      {
        heading: "Abgrenzung zu verwandten Begriffen",
        paragraphs: [
          "Eine digitale Plattform ist mehr als eine einzelne SaaS-Anwendung: Während SaaS ein konkretes Produkt im Abonnement beschreibt, bildet die Plattform die tragende Schicht, auf der mehrere Anwendungen und Dienste laufen. Sie nutzt Cloud-Infrastruktur als Fundament und setzt häufig auf eine Multi-Tenant-Architektur sowie REST-APIs für die Anbindung weiterer Systeme.",
        ],
      },
      {
        heading: "Bezug zu smiit",
        paragraphs: [
          "smiit hat für die Claimity AG eine digitale SaaS-Plattform für den InsurTech-Bereich entwickelt und in nur sechs Wochen produktiv auf Microsoft Azure gebracht. Die Multi-Tenant-Architektur trennt Kundendaten sauber, Azure App Service und Azure Database for PostgreSQL bilden die Laufzeit- und Datenschicht, Azure Front Door sichert die Zustellung und Keycloak übernimmt Identitätsverwaltung samt MFA. Über REST-APIs lässt sich die Plattform an bestehende Systeme anbinden – durchgängig DSGVO-konform.",
        ],
      },
    ],
    faq: [
      {
        question: "Was unterscheidet eine digitale Plattform von einer App?",
        answer:
          "Eine App erfüllt einen abgegrenzten Zweck, eine Plattform stellt geteilte Bausteine wie Nutzerverwaltung, Datenhaltung und APIs bereit, auf denen mehrere Apps und Dienste aufsetzen. Die Plattform ist das Fundament, die App eine darauf laufende Anwendung.",
      },
      {
        question: "Lohnt sich eine digitale Plattform auch für den Mittelstand?",
        answer:
          "Ja, sobald mehrere Anwendungen, Mandanten oder Partneranbindungen geplant sind. Die einmalig gebaute Basis spart bei jedem weiteren Anwendungsfall Aufwand und sorgt für einheitliche Sicherheit und Datenhaltung.",
      },
      {
        question: "Welche Microsoft-Azure-Dienste bilden die Basis?",
        answer:
          "Typisch sind Azure App Service für das Hosting, Azure Database for PostgreSQL für Daten, Azure Front Door für Zustellung und Schutz sowie Azure Key Vault für Geheimnisse. Identität und MFA lassen sich etwa über Keycloak abdecken.",
      },
      {
        question: "Wie lange dauert der Aufbau einer digitalen Plattform?",
        answer:
          "Das hängt vom Funktionsumfang ab. Eine erste tragfähige Version mit Kernfunktionen lässt sich oft in wenigen Wochen produktiv bringen, während das Ökosystem danach schrittweise um weitere Module wächst – statt alles auf einmal zu bauen.",
      },
      {
        question: "Wie vermeidet man eine Abhängigkeit von einem einzelnen Anbieter?",
        answer:
          "Hilfreich sind offene Standards, dokumentierte REST-APIs und der Einsatz verbreiteter, portabler Technologien statt proprietärer Speziallösungen. So bleibt die Plattform erweiterbar und ein späterer Wechsel einzelner Bausteine möglich.",
      },
    ],
    relatedServicePath: "services/apps",
    relatedCaseStudySlug: "claimity-ag",
    metaTitle: "Was sind digitale Plattformen? Definition & Praxis | smiit Glossar",
    metaDescription:
      "Digitale Plattformen einfach erklärt: Definition, Abgrenzung zu SaaS und Apps, Vorteile und Anwendungsfälle – mit Azure-Praxisbezug von smiit.",
  },
  en: {
    slug: "digital-platforms",
    cluster: "apps",
    dateModified: "2026-05-25",
    term: "Digital platforms",
    title: "What are digital platforms?",
    shortDefinition:
      "Digital platforms are software-based systems that bring together users, data and services through standardized interfaces and enable interactions or transactions. They bundle functionality centrally, can be extended, and form the technical foundation for digital business models.",
    synonyms: ["platform ecosystem", "digital business platform", "platform-as-a-service solution"],
    sections: [
      {
        heading: "Where digital platforms are used",
        paragraphs: [
          "Digital platforms connect several actors – such as customers, partners and internal departments – through a shared technical layer. Unlike a single application, they provide reusable building blocks such as identity management, data storage, APIs and billing, on top of which various functions and services can be built.",
          "In mid-sized companies they often serve as a central system that replaces isolated, grown-over-time solutions. Instead of separate tools, a coherent ecosystem emerges in which data flows and new services can be added step by step. Microsoft Azure supplies the infrastructure for this, from app hosting and databases to security services.",
        ],
      },
      {
        heading: "A practical example",
        paragraphs: [
          "An insurance service provider wants to bundle claims reporting, customer communication and partner connectivity in one system. A digital platform provides a tenant area per client, central user management and open interfaces for connected systems. New functions such as reporting or automated review processes are later added as modules without rebuilding the foundation.",
        ],
      },
      {
        heading: "Benefits & typical use cases",
        paragraphs: [
          "The value of digital platforms lies in reuse and scaling: shared services are built once and used many times, so new use cases emerge faster and at lower cost.",
        ],
        bullets: [
          "Central identity and access management instead of many separate logins",
          "Connection of external systems via APIs and standardized interfaces",
          "Multi-tenancy for several clients or business units on one foundation",
          "Incremental feature growth without rebuilding the entire system",
        ],
      },
      {
        heading: "How it differs from related terms",
        paragraphs: [
          "A digital platform is more than a single SaaS application: while SaaS describes a concrete subscription product, the platform is the supporting layer on which several applications and services run. It uses cloud infrastructure as its foundation and often relies on a multi-tenant architecture as well as REST APIs to connect further systems.",
        ],
      },
      {
        heading: "How smiit works with it",
        paragraphs: [
          "smiit built a digital SaaS platform for the InsurTech sector for Claimity AG and brought it into production on Microsoft Azure in just six weeks. The multi-tenant architecture cleanly separates customer data, Azure App Service and Azure Database for PostgreSQL provide the runtime and data layers, Azure Front Door secures delivery, and Keycloak handles identity management including MFA. REST APIs let the platform connect to existing systems – fully GDPR-compliant throughout.",
        ],
      },
    ],
    faq: [
      {
        question: "What is the difference between a digital platform and an app?",
        answer:
          "An app serves a defined purpose, whereas a platform provides shared building blocks such as user management, data storage and APIs on which several apps and services run. The platform is the foundation, the app an application running on top of it.",
      },
      {
        question: "Is a digital platform worthwhile for mid-sized companies too?",
        answer:
          "Yes, as soon as several applications, tenants or partner connections are planned. The foundation built once saves effort with every additional use case and ensures consistent security and data storage.",
      },
      {
        question: "Which Microsoft Azure services form the basis?",
        answer:
          "Typical choices are Azure App Service for hosting, Azure Database for PostgreSQL for data, Azure Front Door for delivery and protection, and Azure Key Vault for secrets. Identity and MFA can be covered via Keycloak, for example.",
      },
      {
        question: "How long does it take to build a digital platform?",
        answer:
          "That depends on the scope of functionality. A first viable version with core features can often be brought into production within a few weeks, while the ecosystem then grows step by step with further modules – instead of building everything at once.",
      },
      {
        question: "How do you avoid dependency on a single provider?",
        answer:
          "Open standards, documented REST APIs and the use of widespread, portable technologies instead of proprietary special solutions all help. This keeps the platform extensible and makes it possible to swap out individual building blocks later.",
      },
    ],
    relatedServicePath: "services/apps",
    relatedCaseStudySlug: "claimity-ag",
    metaTitle: "What are digital platforms? Definition & practice | smiit glossary",
    metaDescription:
      "Digital platforms explained simply: definition, difference from SaaS and apps, benefits and use cases – with hands-on Azure context from smiit.",
  },
}

export default digitalePlattformen

/** Misconceptions + external sources, merged into the term on read (see getGlossaryTerm). */
export const extras: Record<Locale, GlossaryExtra> = {
  de: {
    misconceptions: [
      "Eine digitale Plattform wird häufig mit einer einfachen Website oder App verwechselt, obwohl ihr Kern darin besteht, mehrere Nutzergruppen zu verbinden und Wertschöpfung über Netzwerkeffekte zu erzeugen.",
      "Es wird oft angenommen, dass mehr Funktionen automatisch eine bessere Plattform ergeben, dabei entscheidet meist die kritische Masse an Teilnehmern und die Qualität der Vermittlung über den Erfolg.",
      "Viele unterschätzen das Henne-Ei-Problem, also dass eine Plattform für die eine Seite erst attraktiv wird, wenn genügend Teilnehmer der anderen Seite vorhanden sind.",
    ],
    sources: [
      {
        title: "Harvard Business Review – Pipelines, Platforms, and the New Rules of Strategy",
        url: "https://hbr.org/2016/04/pipelines-platforms-and-the-new-rules-of-strategy",
      },
      {
        title: "Microsoft Learn – Architektur für mandantenfähige (Multi-Tenant-)Lösungen",
        url: "https://learn.microsoft.com/azure/architecture/guide/multitenant/overview",
      },
    ],
  },
  en: {
    misconceptions: [
      "A digital platform is often confused with a simple website or app, although its core is to connect multiple user groups and create value through network effects.",
      "It is often assumed that more features automatically make a better platform, when in fact reaching critical mass of participants and the quality of matchmaking usually determine success.",
      "Many underestimate the chicken-and-egg problem, namely that a platform only becomes attractive to one side once enough participants on the other side are present.",
    ],
    sources: [
      {
        title: "Harvard Business Review – Pipelines, Platforms, and the New Rules of Strategy",
        url: "https://hbr.org/2016/04/pipelines-platforms-and-the-new-rules-of-strategy",
      },
      {
        title: "Microsoft Learn – Architecting multitenant solutions on Azure",
        url: "https://learn.microsoft.com/azure/architecture/guide/multitenant/overview",
      },
    ],
  },
}
