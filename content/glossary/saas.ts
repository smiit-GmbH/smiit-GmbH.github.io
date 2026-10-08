import type { Locale } from "@/lib/dictionary"
import type { GlossaryExtra, LocalizedGlossaryTerm } from "@/lib/glossary"

const saas: LocalizedGlossaryTerm = {
  de: {
    slug: "saas",
    cluster: "apps",
    dateModified: "2026-05-24",
    term: "SaaS (Software as a Service)",
    title: "Was ist SaaS (Software as a Service)?",
    shortDefinition:
      "SaaS (Software as a Service) ist ein Bereitstellungsmodell, bei dem Software zentral in der Cloud betrieben und über das Internet als Abonnement genutzt wird. Anwender greifen über den Browser zu, während Betrieb, Wartung, Updates und Skalierung beim Anbieter liegen – ganz ohne lokale Installation.",
    synonyms: ["Software as a Service", "Cloud-Software", "SaaS-Plattform", "SaaS-Anwendung"],
    sections: [
      {
        heading: "Einordnung: Wofür wird SaaS genutzt?",
        paragraphs: [
          "Statt Software einmalig zu kaufen und auf eigenen Servern zu installieren, abonnieren Unternehmen bei SaaS den Zugriff auf eine zentral betriebene Anwendung. Der Anbieter kümmert sich um Infrastruktur, Sicherheit, Verfügbarkeit und neue Funktionen; Kunden nutzen stets die aktuelle Version.",
          "SaaS ist eines von drei klassischen Cloud-Modellen neben IaaS (Infrastructure as a Service) und PaaS (Platform as a Service). Bei SaaS ist der Abstraktionsgrad am höchsten: Kunden müssen sich weder um Server noch um die Anwendungsplattform kümmern.",
        ],
      },
      {
        heading: "Beispiel aus der Praxis",
        paragraphs: [
          "Eine SaaS-Plattform für die Versicherungsbranche bündelt zum Beispiel Schadenprozesse, Dokumente und Kommunikation zentral. Verschiedene Parteien – Versicherer, Experten, Administratoren – arbeiten über den Browser in derselben Anwendung, mit rollenbasierten Zugriffen und sauber getrennten Daten. Neue Kunden lassen sich anbinden, ohne pro Kunde eine eigene Installation aufzubauen.",
        ],
      },
      {
        heading: "Vorteile & typische Anwendungsfälle",
        paragraphs: [
          "SaaS eignet sich besonders für Produkte, die schnell live gehen, mit vielen Nutzern skalieren und kontinuierlich weiterentwickelt werden sollen.",
        ],
        bullets: [
          "Schneller Marktstart ohne eigene Server-Infrastruktur beim Kunden",
          "Planbare Kosten über Abonnements statt großer Einmalinvestitionen",
          "Zentrale Updates – alle Nutzer arbeiten mit der aktuellen Version",
          "Skalierbarkeit: neue Kunden und Nutzer ohne Neuaufbau anbinden",
        ],
      },
      {
        heading: "Abgrenzung zu verwandten Begriffen",
        paragraphs: [
          "SaaS beschreibt das Geschäfts- und Bereitstellungsmodell. Die zugrundeliegende technische Bauweise ist häufig eine Multi-Tenant-Architektur, bei der sich mehrere Kunden eine Anwendung teilen. SaaS läuft auf Cloud-Infrastruktur (z. B. Azure) und erfordert besondere Aufmerksamkeit bei IT-Sicherheit, Identity & Access Management und Datenschutz.",
        ],
      },
      {
        heading: "Bezug zu smiit",
        paragraphs: [
          "smiit entwickelt SaaS-Plattformen von der Architektur bis zum produktiven Go-live – mandantenfähig, sicher und skalierbar von Tag eins. Für die Claimity AG entstand so in sechs Wochen ein produktives SaaS-MVP auf Microsoft Azure, inklusive Multi-Tenant-Architektur, rollenbasierter Zugriffe und Multifaktor-Authentifizierung.",
        ],
      },
    ],
    faq: [
      {
        question: "Was ist der Unterschied zwischen SaaS, PaaS und IaaS?",
        answer:
          "IaaS stellt reine Infrastruktur (Server, Speicher, Netzwerk) bereit, PaaS zusätzlich eine Plattform zum Entwickeln und Betreiben von Anwendungen, und SaaS eine fertige Anwendung. Je höher das Modell, desto weniger muss der Kunde selbst betreiben.",
      },
      {
        question: "Wem gehören die Daten in einer SaaS-Lösung?",
        answer:
          "Die Daten gehören dem Kunden. Entscheidend sind klare vertragliche Regelungen (u. a. Auftragsverarbeitung), Speicherort und Exportmöglichkeiten. smiit setzt auf DSGVO-konforme Architektur und Hosting in der EU oder Schweiz.",
      },
      {
        question: "Ist SaaS sicher genug für sensible Branchen?",
        answer:
          "Ja, wenn Sicherheit von Anfang an mitgedacht wird: sichere Authentifizierung, MFA, rollenbasierte Zugriffe, Verschlüsselung und eine abgesicherte Cloud-Infrastruktur. Gerade in regulierten Branchen ist das die Voraussetzung dafür, dass eine Plattform überhaupt skaliert.",
      },
      {
        question: "Was bedeutet Multi-Tenancy bei SaaS?",
        answer:
          "Multi-Tenancy heißt, dass mehrere Kunden (Mandanten) dieselbe Anwendung und Infrastruktur nutzen, ihre Daten dabei aber strikt voneinander getrennt sind. Das senkt Betriebskosten und vereinfacht Updates, erfordert im Gegenzug eine sorgfältige Trennung von Daten und Zugriffen auf Architekturebene.",
      },
      {
        question: "Was passiert mit unseren Daten, wenn wir den Anbieter wechseln wollen?",
        answer:
          "Entscheidend sind vertraglich zugesicherte Exportmöglichkeiten und offene Datenformate. Ein vorausschauend gebautes SaaS-Angebot stellt Daten in gängigen Formaten zum Export bereit, sodass ein Wechsel oder eine eigene Weiterverarbeitung ohne Lock-in möglich bleibt.",
      },
    ],
    relatedServicePath: "services/apps",
    relatedCaseStudySlug: "claimity-ag",
    metaTitle: "Was ist SaaS? Software as a Service erklärt | smiit Glossar",
    metaDescription:
      "SaaS einfach erklärt: Definition, Abgrenzung zu PaaS und IaaS, Vorteile und Anwendungsfälle – mit Praxisbezug aus der SaaS-Entwicklung von smiit.",
  },
  en: {
    slug: "saas",
    cluster: "apps",
    dateModified: "2026-05-24",
    term: "SaaS (Software as a Service)",
    title: "What is SaaS (Software as a Service)?",
    shortDefinition:
      "SaaS (Software as a Service) is a delivery model where software runs centrally in the cloud and is used over the internet on a subscription basis. Users access it through the browser, while operation, maintenance, updates and scaling sit with the provider — without any local installation.",
    synonyms: ["Software as a Service", "cloud software", "SaaS platform", "SaaS application"],
    sections: [
      {
        heading: "Where SaaS is used",
        paragraphs: [
          "Instead of buying software once and installing it on their own servers, companies subscribe to access a centrally operated application. The provider handles infrastructure, security, availability and new features; customers always use the latest version.",
          "SaaS is one of the three classic cloud models alongside IaaS (Infrastructure as a Service) and PaaS (Platform as a Service). SaaS has the highest level of abstraction: customers need not worry about servers or the application platform.",
        ],
      },
      {
        heading: "A practical example",
        paragraphs: [
          "A SaaS platform for the insurance industry, for instance, bundles claims processes, documents and communication centrally. Different parties — insurers, experts, administrators — work in the same application through the browser, with role-based access and cleanly separated data. New customers can be onboarded without building a dedicated installation per customer.",
        ],
      },
      {
        heading: "Benefits & typical use cases",
        paragraphs: [
          "SaaS is especially suited to products that need to go live quickly, scale with many users and evolve continuously.",
        ],
        bullets: [
          "Fast market entry without server infrastructure at the customer",
          "Predictable costs via subscriptions instead of large one-off investments",
          "Central updates — all users work with the current version",
          "Scalability: onboard new customers and users without rebuilding",
        ],
      },
      {
        heading: "How it differs from related terms",
        paragraphs: [
          "SaaS describes the business and delivery model. The underlying technical design is often a multi-tenant architecture, where several customers share one application. SaaS runs on cloud infrastructure (e.g. Azure) and demands particular attention to IT security, identity & access management and data protection.",
        ],
      },
      {
        heading: "How smiit works with it",
        paragraphs: [
          "smiit develops SaaS platforms from architecture to a live launch — multi-tenant, secure and scalable from day one. For Claimity AG, this produced a production SaaS MVP on Microsoft Azure in six weeks, including multi-tenant architecture, role-based access and multi-factor authentication.",
        ],
      },
    ],
    faq: [
      {
        question: "What is the difference between SaaS, PaaS and IaaS?",
        answer:
          "IaaS provides pure infrastructure (servers, storage, networking), PaaS adds a platform to develop and run applications, and SaaS provides a finished application. The higher the model, the less the customer has to operate themselves.",
      },
      {
        question: "Who owns the data in a SaaS solution?",
        answer:
          "The data belongs to the customer. What matters is clear contractual terms (including data processing agreements), storage location and export options. smiit relies on GDPR-compliant architecture and hosting in the EU or Switzerland.",
      },
      {
        question: "Is SaaS secure enough for sensitive industries?",
        answer:
          "Yes, when security is designed in from the start: secure authentication, MFA, role-based access, encryption and a hardened cloud infrastructure. In regulated industries especially, this is the precondition for a platform to scale at all.",
      },
      {
        question: "What does multi-tenancy mean in SaaS?",
        answer:
          "Multi-tenancy means several customers (tenants) use the same application and infrastructure while their data stays strictly separated. This lowers operating costs and simplifies updates, but in return requires careful separation of data and access at the architecture level.",
      },
      {
        question: "What happens to our data if we want to switch providers?",
        answer:
          "What matters are contractually guaranteed export options and open data formats. A forward-looking SaaS offering makes data available for export in common formats, so a switch or your own further processing remains possible without lock-in.",
      },
    ],
    relatedServicePath: "services/apps",
    relatedCaseStudySlug: "claimity-ag",
    metaTitle: "What is SaaS? Software as a Service explained | smiit glossary",
    metaDescription:
      "SaaS explained simply: definition, how it differs from PaaS and IaaS, benefits and use cases — with practical context from smiit's SaaS development.",
  },
}

export default saas

/** Misconceptions + external sources, merged into the term on read (see getGlossaryTerm). */
export const extras: Record<Locale, GlossaryExtra> = {
  de: {
    misconceptions: [
      "SaaS wird oft mit jeder beliebigen Cloud-Software gleichgesetzt, obwohl es konkret ein Bereitstellungsmodell meint, bei dem der Anbieter Betrieb, Wartung und Updates der Anwendung vollständig übernimmt.",
      "Viele nehmen an, dass mit der Auslagerung an einen SaaS-Anbieter auch die gesamte Verantwortung für Datenschutz und Datensicherheit übergeht, doch im Modell der geteilten Verantwortung bleiben Zugriffssteuerung, Datenklassifizierung und Compliance Aufgabe des Kunden.",
      "SaaS gilt fälschlich als grundsätzlich günstiger, dabei können viele Einzel-Abonnements, ungenutzte Lizenzen und Integrationsaufwand die Gesamtkosten über die Zeit deutlich erhöhen.",
    ],
    sources: [
      { title: "Microsoft Azure – Was ist SaaS? (Cloud Computing Dictionary)", url: "https://azure.microsoft.com/resources/cloud-computing-dictionary/what-is-saas/" },
      { title: "NIST – The NIST Definition of Cloud Computing (SP 800-145)", url: "https://csrc.nist.gov/pubs/sp/800/145/final" },
    ],
  },
  en: {
    misconceptions: [
      "SaaS is often equated with any cloud software, although it specifically refers to a delivery model in which the provider fully handles operation, maintenance and updates of the application.",
      "Many assume that outsourcing to a SaaS provider also transfers all responsibility for data protection and security, but under the shared responsibility model access control, data classification and compliance remain the customer's task.",
      "SaaS is wrongly seen as inherently cheaper, yet many individual subscriptions, unused licenses and integration effort can significantly raise the total cost over time.",
    ],
    sources: [
      { title: "Microsoft Azure – What is SaaS? (Cloud Computing Dictionary)", url: "https://azure.microsoft.com/resources/cloud-computing-dictionary/what-is-saas/" },
      { title: "NIST – The NIST Definition of Cloud Computing (SP 800-145)", url: "https://csrc.nist.gov/pubs/sp/800/145/final" },
    ],
  },
}
