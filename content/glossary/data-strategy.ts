import type { Locale } from "@/lib/dictionary"
import type { GlossaryExtra, LocalizedGlossaryTerm } from "@/lib/glossary"

const datenstrategie: LocalizedGlossaryTerm = {
  de: {
    slug: "data-strategy",
    cluster: "analytics",
    dateModified: "2026-05-25",
    term: "Datenstrategie",
    title: "Was ist eine Datenstrategie?",
    shortDefinition:
      "Eine Datenstrategie ist der übergreifende Plan, mit dem ein Unternehmen festlegt, wie es Daten erhebt, speichert, verwaltet, schützt und für Entscheidungen nutzt. Sie verbindet Geschäftsziele mit den nötigen Daten, Rollen, Prozessen und Technologien und sorgt dafür, dass Datenarbeit zielgerichtet statt zufällig geschieht.",
    synonyms: ["Data Strategy", "Datenmanagement-Strategie", "Daten-Roadmap"],
    sections: [
      {
        heading: "Einordnung: Wofür wird eine Datenstrategie genutzt?",
        paragraphs: [
          "Eine Datenstrategie beantwortet die Frage, welche geschäftlichen Ziele mit Daten erreicht werden sollen und was dafür nötig ist. Sie definiert, welche Daten relevant sind, wo sie herkommen, wer für sie verantwortlich ist und in welcher Reihenfolge Datenprojekte angegangen werden. Damit verhindert sie, dass Unternehmen viele isolierte Tools und Berichte aufbauen, ohne dass ein Gesamtbild entsteht.",
          "Typische Bausteine sind Ziele und Anwendungsfälle, eine Bestandsaufnahme der Datenquellen, eine Zielarchitektur (etwa ein Data Warehouse oder Lakehouse), Rollen und Verantwortlichkeiten, Governance- und Datenschutzregeln sowie eine priorisierte Roadmap.",
        ],
      },
      {
        heading: "Beispiel aus der Praxis",
        paragraphs: [
          "Ein Logistikunternehmen möchte schnellere und verlässlichere Auswertungen. Statt sofort ein neues BI-Tool zu kaufen, klärt die Datenstrategie zuerst: Welche Entscheidungen sollen verbessert werden, welche Daten sind dafür nötig, wo liegen sie heute, und welche manuellen Prozesse blockieren das. Daraus entsteht eine Reihenfolge, die mit den größten Hebeln beginnt.",
          "Bei der G&B Logistics GmbH stand am Anfang nicht ein Tool, sondern die Frage, wo manuelle Datenarbeit und Medienbrüche den Betrieb bremsen. Die strategische Einordnung machte sichtbar, welche Prozesse sich zuerst automatisieren und welche Stammdaten sich vereinheitlichen lassen.",
        ],
      },
      {
        heading: "Vorteile & typische Anwendungsfälle",
        paragraphs: [
          "Eine Datenstrategie zahlt sich überall dort aus, wo Datenprojekte bisher punktuell und ohne roten Faden entstanden sind.",
        ],
        bullets: [
          "Priorisierung: Datenprojekte werden nach Geschäftsnutzen statt nach Tool-Trends geordnet",
          "Klare Rollen und Verantwortlichkeiten für Datenqualität und -pflege",
          "Eine konsistente Zielarchitektur, statt immer neuer Insellösungen",
          "Eingebaute Governance und Datenschutz von Anfang an, nicht als Nachgedanke",
        ],
      },
      {
        heading: "Abgrenzung zu verwandten Begriffen",
        paragraphs: [
          "Die Datenstrategie ist die übergeordnete Ebene. Data Governance regelt konkret die Verantwortlichkeiten, Standards und Qualitätsregeln und ist damit ein Umsetzungsbaustein der Strategie. Ein Data Warehouse oder Lakehouse ist die technische Plattform, die aus der Strategie folgt. Power BI und andere Werkzeuge sind die Mittel, mit denen die strategischen Ziele sichtbar werden. Die Strategie verbindet diese Ebenen zu einem Plan.",
        ],
      },
      {
        heading: "Bezug zu smiit",
        paragraphs: [
          "smiit entwickelt Datenstrategien für den Mittelstand, die nah an den Geschäftszielen bleiben und in einer umsetzbaren Roadmap münden. Statt eines theoretischen Papiers entsteht ein priorisierter Plan, der direkt in konkrete Schritte wie Datenintegration, Automatisierung und Reporting übersetzt wird.",
        ],
      },
    ],
    faq: [
      {
        question: "Was gehört in eine Datenstrategie?",
        answer:
          "Geschäftsziele und Anwendungsfälle, eine Bestandsaufnahme der Datenquellen, eine Zielarchitektur, Rollen und Verantwortlichkeiten, Governance- und Datenschutzregeln sowie eine priorisierte Roadmap.",
      },
      {
        question: "Lohnt sich eine Datenstrategie auch für kleinere Unternehmen?",
        answer:
          "Ja. Gerade bei begrenzten Ressourcen hilft eine Strategie, die wenigen Initiativen auf den größten Nutzen auszurichten und teure Fehlinvestitionen in unpassende Tools zu vermeiden.",
      },
      {
        question: "Wie lange dauert es, eine Datenstrategie zu erstellen?",
        answer:
          "Eine erste belastbare Strategie mit Roadmap entsteht je nach Größe und Komplexität oft in einigen Wochen. Sie wird danach regelmäßig überprüft und an neue Ziele angepasst.",
      },
      {
        question: "Müssen wir erst eine Datenstrategie haben, bevor wir mit Reporting oder Automatisierung starten?",
        answer:
          "Nicht zwingend. Erste konkrete Verbesserungen können parallel beginnen und liefern oft schnelle Erfolge. Eine Strategie sorgt jedoch dafür, dass diese Einzelschritte aufeinander einzahlen, statt zu isolierten Insellösungen zu werden.",
      },
      {
        question: "Wer sollte an einer Datenstrategie mitarbeiten?",
        answer:
          "Sinnvoll ist eine Mischung aus Geschäftsführung beziehungsweise Fachbereichen, die die Ziele kennen, und technischen Rollen, die Quellen und Machbarkeit einschätzen. Datenstrategie ist keine reine IT-Aufgabe, weil die wichtigsten Fragen aus dem Geschäft kommen.",
      },
    ],
    relatedServicePath: "services/analytics",
    relatedCaseStudySlug: "gb-logistics-gmbh",
    metaTitle: "Datenstrategie: Definition, Bausteine & Praxis | smiit Glossar",
    metaDescription:
      "Datenstrategie einfach erklärt: Definition, Bausteine, Anwendungsfälle und Abgrenzung zu Data Governance und Data Warehouse – mit Praxisbezug von smiit.",
  },
  en: {
    slug: "data-strategy",
    cluster: "analytics",
    dateModified: "2026-05-25",
    term: "Data strategy",
    title: "What is a data strategy?",
    shortDefinition:
      "A data strategy is the overarching plan that defines how a company collects, stores, manages, protects and uses data for decisions. It connects business goals with the required data, roles, processes and technologies, ensuring that data work happens purposefully rather than by accident.",
    synonyms: ["data management strategy", "data roadmap"],
    sections: [
      {
        heading: "Where a data strategy is used",
        paragraphs: [
          "A data strategy answers the question of which business goals should be achieved with data and what is needed to get there. It defines which data is relevant, where it comes from, who is responsible for it, and in what order data projects are tackled. This prevents companies from building many isolated tools and reports without ever forming a complete picture.",
          "Typical building blocks are goals and use cases, an inventory of data sources, a target architecture (such as a data warehouse or lakehouse), roles and responsibilities, governance and data protection rules, and a prioritized roadmap.",
        ],
      },
      {
        heading: "A practical example",
        paragraphs: [
          "A logistics company wants faster and more reliable analysis. Instead of buying a new BI tool right away, the data strategy first clarifies which decisions should be improved, which data is needed for them, where it sits today, and which manual processes block it. From this comes a sequence that starts with the biggest levers.",
          "At G&B Logistics GmbH the starting point was not a tool but the question of where manual data work and broken handoffs between systems were slowing operations. The strategic framing made it visible which processes to automate first and which master data to unify.",
        ],
      },
      {
        heading: "Benefits & typical use cases",
        paragraphs: [
          "A data strategy pays off wherever data projects have so far been created in isolation and without a common thread.",
        ],
        bullets: [
          "Prioritisation: data projects are ordered by business value instead of tool trends",
          "Clear roles and responsibilities for data quality and maintenance",
          "A consistent target architecture instead of ever new isolated solutions",
          "Built-in governance and data protection from the start, not as an afterthought",
        ],
      },
      {
        heading: "How it differs from related terms",
        paragraphs: [
          "The data strategy is the overarching layer. Data governance concretely regulates responsibilities, standards and quality rules and is therefore an implementation building block of the strategy. A data warehouse or lakehouse is the technical platform that follows from the strategy. Power BI and other tools are the means by which the strategic goals become visible. The strategy ties these layers together into one plan.",
        ],
      },
      {
        heading: "How smiit works with it",
        paragraphs: [
          "smiit develops data strategies for mid-sized companies that stay close to business goals and result in an actionable roadmap. Instead of a theoretical paper, the outcome is a prioritized plan that translates directly into concrete steps such as data integration, automation and reporting.",
        ],
      },
    ],
    faq: [
      {
        question: "What belongs in a data strategy?",
        answer:
          "Business goals and use cases, an inventory of data sources, a target architecture, roles and responsibilities, governance and data protection rules, and a prioritized roadmap.",
      },
      {
        question: "Is a data strategy worthwhile for smaller companies too?",
        answer:
          "Yes. Especially with limited resources, a strategy helps focus the few initiatives on the greatest value and avoid expensive investments in unsuitable tools.",
      },
      {
        question: "How long does it take to create a data strategy?",
        answer:
          "A first robust strategy with a roadmap often emerges within a few weeks, depending on size and complexity. It is then reviewed regularly and adapted to new goals.",
      },
      {
        question: "Do we need a data strategy before starting with reporting or automation?",
        answer:
          "Not necessarily. First concrete improvements can begin in parallel and often deliver quick wins. A strategy, however, ensures that these individual steps build on one another instead of becoming isolated point solutions.",
      },
      {
        question: "Who should be involved in a data strategy?",
        answer:
          "A mix works best: management or business units who know the goals, and technical roles who can assess sources and feasibility. A data strategy is not a pure IT task, because the most important questions come from the business.",
      },
    ],
    relatedServicePath: "services/analytics",
    relatedCaseStudySlug: "gb-logistics-gmbh",
    metaTitle: "Data strategy: definition & building blocks | smiit glossary",
    metaDescription:
      "Data strategy explained simply: definition, building blocks, use cases and how it differs from data governance and a data warehouse – with practical insight from smiit.",
  },
}

export default datenstrategie

/** Misconceptions + external sources, merged into the term on read (see getGlossaryTerm). */
export const extras: Record<Locale, GlossaryExtra> = {
  de: {
    misconceptions: [
      "Eine Datenstrategie ist kein reines IT-Projekt; sie ist eine Geschäftsentscheidung, die Ziele, Verantwortlichkeiten und Datennutzung über alle Fachbereiche hinweg festlegt.",
      "Viele glauben, mehr Daten bedeuten automatisch mehr Wert. Ohne klare Ziele, Qualität und Governance entstehen jedoch nur Kosten und kaum verwertbare Erkenntnisse.",
      "Ein verbreiteter Irrtum ist, dass man zuerst alle technischen Werkzeuge auswählt. Sinnvoller ist es, von den Geschäftsfragen auszugehen und die Technik daran auszurichten.",
    ],
    sources: [
      { title: "DAMA International – Data Management Body of Knowledge (DMBOK)", url: "https://www.dama.org/" },
      {
        title: "Microsoft Learn – Cloud Adoption Framework für Azure",
        url: "https://learn.microsoft.com/azure/cloud-adoption-framework/",
      },
    ],
  },
  en: {
    misconceptions: [
      "A data strategy is not purely an IT project; it is a business decision that defines goals, responsibilities and data usage across all departments.",
      "Many believe more data automatically means more value, but without clear goals, quality and governance it only creates cost and few usable insights.",
      "A common error is to pick all the technical tools first. It is better to start from the business questions and align technology to them.",
    ],
    sources: [
      { title: "DAMA International – Data Management Body of Knowledge (DMBOK)", url: "https://www.dama.org/" },
      {
        title: "Microsoft Learn – Cloud Adoption Framework for Azure",
        url: "https://learn.microsoft.com/azure/cloud-adoption-framework/",
      },
    ],
  },
}
