import type { Locale } from "@/lib/dictionary"
import type { GlossaryExtra, LocalizedGlossaryTerm } from "@/lib/glossary"

const dataGovernance: LocalizedGlossaryTerm = {
  de: {
    slug: "data-governance",
    cluster: "analytics",
    dateModified: "2026-05-25",
    term: "Data Governance",
    title: "Was ist Data Governance?",
    shortDefinition:
      "Data Governance ist die Gesamtheit aus Rollen, Regeln, Prozessen und Standards, mit denen ein Unternehmen die Qualität, Sicherheit, Verfügbarkeit und konforme Nutzung seiner Daten sicherstellt. Sie legt fest, wer für welche Daten verantwortlich ist, wie diese definiert werden und wer worauf zugreifen darf.",
    synonyms: ["Datenverwaltung", "Daten-Governance", "Datenmanagement-Regeln"],
    sections: [
      {
        heading: "Einordnung: Wofür wird Data Governance genutzt?",
        paragraphs: [
          "Data Governance sorgt dafür, dass Daten als verlässliches Unternehmensgut behandelt werden. Sie regelt, wie Begriffe und Kennzahlen einheitlich definiert sind, wer Daten pflegt und freigibt, wie Datenqualität gemessen wird und wie Zugriffe und Datenschutz geregelt werden. Damit schafft sie Vertrauen in die Daten, auf denen Entscheidungen beruhen.",
          "Konkret umfasst Governance Rollen wie Data Owner und Data Steward, ein gemeinsames Begriffsverständnis (Glossar und Definitionen), Qualitätsregeln, Zugriffs- und Berechtigungskonzepte sowie Vorgaben zu Datenschutz und Compliance, etwa im Rahmen der DSGVO.",
        ],
      },
      {
        heading: "Beispiel aus der Praxis",
        paragraphs: [
          "Ohne Governance bedeutet derselbe Begriff in zwei Abteilungen oft Unterschiedliches, etwa wenn Umsatz einmal mit und einmal ohne Retouren gemeint ist. Governance legt verbindlich fest, wie solche Kennzahlen definiert sind, und macht Berichte über Abteilungen hinweg vergleichbar.",
          "In der Datenplattform der dy Project AG war Governance zentral: Bei einem Großbauprojekt mit über 1 Mrd. CHF Volumen und Daten aus SQL Server, Excel und REST-APIs musste klar geregelt sein, welche Daten verlässlich sind, wie sie definiert werden und wer welche Sichten sehen darf. Die Medallion-Architektur half dabei, geprüfte von ungeprüften Daten zu trennen.",
        ],
      },
      {
        heading: "Vorteile & typische Anwendungsfälle",
        paragraphs: [
          "Data Governance wird wichtig, sobald mehrere Teams auf dieselben Daten zugreifen oder regulatorische Anforderungen bestehen.",
        ],
        bullets: [
          "Einheitliche Definitionen, sodass Kennzahlen in allen Berichten dasselbe bedeuten",
          "Nachvollziehbare Datenqualität und klare Verantwortlichkeiten für Pflege und Freigabe",
          "Geregelte Zugriffe und Berechtigungen, etwa über Row-Level Security",
          "Datenschutz- und Compliance-Konformität, zum Beispiel im Rahmen der DSGVO",
        ],
      },
      {
        heading: "Abgrenzung zu verwandten Begriffen",
        paragraphs: [
          "Die Datenstrategie ist die übergeordnete Ebene, Data Governance ist deren operatives Regelwerk. Datenqualität ist ein Ziel, das Governance absichert. Die technische Plattform wie ein Data Warehouse oder Lakehouse setzt Governance um, etwa durch Zugriffskonzepte und nachvollziehbare Veredelungsschichten. Sicherheitstechniken wie Row-Level Security sind konkrete Werkzeuge innerhalb der Governance.",
        ],
      },
      {
        heading: "Bezug zu smiit",
        paragraphs: [
          "smiit verankert Data Governance pragmatisch in Datenplattformen, ohne sie zum Selbstzweck werden zu lassen. Definitionen, Verantwortlichkeiten, Qualitätsregeln und Berechtigungen werden so gestaltet, dass sie im Alltag eingehalten werden und Vertrauen in die Daten schaffen.",
        ],
      },
    ],
    faq: [
      { question: "Was ist der Unterschied zwischen Data Governance und Datenstrategie?", answer: "Die Datenstrategie legt fest, welche Ziele mit Daten erreicht werden sollen. Data Governance ist das operative Regelwerk aus Rollen, Standards und Prozessen, mit dem diese Ziele verlässlich umgesetzt werden." },
      { question: "Wer ist im Unternehmen für Data Governance verantwortlich?", answer: "Typisch sind Rollen wie Data Owner (fachlich verantwortlich für einen Datenbereich) und Data Steward (kümmert sich um Qualität und Pflege). Die Gesamtverantwortung liegt meist bei der Geschäftsführung oder einem Dateneigner." },
      { question: "Ist Data Governance dasselbe wie Datenschutz?", answer: "Nein. Datenschutz, etwa nach DSGVO, ist ein wichtiger Teil von Governance, aber Governance umfasst darüber hinaus auch Datenqualität, Definitionen, Verantwortlichkeiten und Zugriffsregeln." },
      { question: "Wird Data Governance erst ab einer bestimmten Unternehmensgröße relevant?", answer: "Nein. Schon wenige Berichte mit uneinheitlichen Kennzahlendefinitionen führen zu Missverständnissen. Im Mittelstand reicht oft eine schlanke Governance mit klaren Definitionen, benannten Verantwortlichen und einfachen Zugriffsregeln, statt eines schweren Regelwerks." },
      { question: "Wie fängt man mit Data Governance pragmatisch an?", answer: "Sinnvoll ist ein kleiner Anfang: die wichtigsten Kennzahlen einheitlich definieren, für die zentralen Datenbereiche Verantwortliche benennen und Zugriffsrechte klären. Governance wächst dann mit den Datenanforderungen, statt von Beginn an alle Regeln auf einmal einzuführen." },
    ],
    relatedServicePath: "services/analytics",
    relatedCaseStudySlug: "dy-project-ag",
    metaTitle: "Data Governance: Definition, Rollen & Praxis | smiit Glossar",
    metaDescription: "Data Governance einfach erklärt: Definition, Rollen, Anwendungsfälle und Abgrenzung zu Datenstrategie und Datenschutz – mit Praxisbezug von smiit.",
  },
  en: {
    slug: "data-governance",
    cluster: "analytics",
    dateModified: "2026-05-25",
    term: "Data governance",
    title: "What is data governance?",
    shortDefinition:
      "Data governance is the combination of roles, rules, processes and standards with which a company ensures the quality, security, availability and compliant use of its data. It defines who is responsible for which data, how it is defined, and who may access what.",
    synonyms: ["data management rules", "data stewardship"],
    sections: [
      {
        heading: "Where data governance is used",
        paragraphs: [
          "Data governance ensures that data is treated as a reliable corporate asset. It regulates how terms and metrics are defined consistently, who maintains and approves data, how data quality is measured, and how access and data protection are handled. In doing so, it builds trust in the data on which decisions are based.",
          "In concrete terms, governance covers roles such as data owner and data steward, a shared understanding of terms (glossary and definitions), quality rules, access and permission concepts, and requirements for data protection and compliance, for example under the GDPR.",
        ],
      },
      {
        heading: "A practical example",
        paragraphs: [
          "Without governance, the same term often means different things in two departments, for example when revenue is meant once with and once without returns. Governance binds how such metrics are defined and makes reports comparable across departments.",
          "In the dy Project AG data platform, governance was central: for a large construction project worth over 1 billion CHF with data from SQL Server, Excel and REST APIs, it had to be clear which data is reliable, how it is defined and who may see which views. The medallion architecture helped separate validated from unvalidated data.",
        ],
      },
      {
        heading: "Benefits & typical use cases",
        paragraphs: [
          "Data governance becomes important as soon as several teams access the same data or regulatory requirements exist.",
        ],
        bullets: [
          "Consistent definitions so that metrics mean the same thing in every report",
          "Traceable data quality and clear responsibilities for maintenance and approval",
          "Regulated access and permissions, for example via row-level security",
          "Data protection and compliance, for instance under the GDPR",
        ],
      },
      {
        heading: "How it differs from related terms",
        paragraphs: [
          "The data strategy is the overarching layer; data governance is its operational rulebook. Data quality is a goal that governance secures. The technical platform such as a data warehouse or lakehouse implements governance, for example through access concepts and traceable refinement layers. Security techniques such as row-level security are concrete tools within governance.",
        ],
      },
      {
        heading: "How smiit works with it",
        paragraphs: [
          "smiit anchors data governance pragmatically in data platforms without making it an end in itself. Definitions, responsibilities, quality rules and permissions are designed so that they are followed in everyday work and build trust in the data.",
        ],
      },
    ],
    faq: [
      { question: "What is the difference between data governance and data strategy?", answer: "The data strategy defines which goals should be achieved with data. Data governance is the operational rulebook of roles, standards and processes that reliably implements those goals." },
      { question: "Who is responsible for data governance in a company?", answer: "Typical roles are data owner (responsible for a data domain) and data steward (looks after quality and maintenance). Overall responsibility usually lies with management or a designated data owner." },
      { question: "Is data governance the same as data protection?", answer: "No. Data protection, for example under the GDPR, is an important part of governance, but governance also covers data quality, definitions, responsibilities and access rules." },
      { question: "Does data governance only become relevant above a certain company size?", answer: "No. Even a handful of reports with inconsistent metric definitions lead to misunderstandings. In SMEs a lean governance with clear definitions, named owners and simple access rules is often enough, rather than a heavy rulebook." },
      { question: "How do you start with data governance pragmatically?", answer: "It makes sense to start small: define the most important metrics consistently, name owners for the central data domains and clarify access rights. Governance then grows with the data requirements instead of introducing every rule at once from the start." },
    ],
    relatedServicePath: "services/analytics",
    relatedCaseStudySlug: "dy-project-ag",
    metaTitle: "Data governance: definition, roles & practice | smiit glossary",
    metaDescription: "Data governance explained simply: definition, roles, use cases and how it differs from data strategy and data protection – with practical insight from smiit.",
  },
}

export default dataGovernance

/** Misconceptions + external sources, merged into the term on read (see getGlossaryTerm). */
export const extras: Record<Locale, GlossaryExtra> = {
  de: {
    misconceptions: [
      "Data Governance ist nicht nur Datenschutz oder Compliance; sie umfasst Rollen, Standards, Datenqualität und Verantwortlichkeiten für den gesamten Lebenszyklus der Daten.",
      "Viele halten Governance für ein einmaliges Projekt. Tatsächlich ist sie ein laufender Prozess, der mit Organisation und Datenlandschaft mitwachsen muss.",
      "Ein verbreiteter Irrtum ist, Governance sei allein Aufgabe der IT. Erfolgreiche Governance braucht klare fachliche Data Owner und Data Stewards im Business.",
    ],
    sources: [
      { title: "DAMA International – Data Governance (DMBOK)", url: "https://www.dama.org/" },
      { title: "Microsoft Learn – Microsoft Purview", url: "https://learn.microsoft.com/purview/" },
    ],
  },
  en: {
    misconceptions: [
      "Data governance is not just privacy or compliance; it covers roles, standards, data quality and responsibilities across the entire data lifecycle.",
      "Many treat governance as a one-off project, but it is an ongoing process that must evolve with the organization and the data landscape.",
      "A common error is to see governance as IT's job alone. Successful governance needs clear business data owners and data stewards.",
    ],
    sources: [
      { title: "DAMA International – Data Governance (DMBOK)", url: "https://www.dama.org/" },
      { title: "Microsoft Learn – Microsoft Purview", url: "https://learn.microsoft.com/purview/" },
    ],
  },
}
