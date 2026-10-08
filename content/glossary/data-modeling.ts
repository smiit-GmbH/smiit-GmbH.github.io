import type { Locale } from "@/lib/dictionary"
import type { GlossaryExtra, LocalizedGlossaryTerm } from "@/lib/glossary"

const datenmodellierung: LocalizedGlossaryTerm = {
  de: {
    slug: "data-modeling",
    cluster: "analytics",
    dateModified: "2026-05-25",
    term: "Datenmodellierung (Inmon, Kimball, Data Vault)",
    title: "Was ist Datenmodellierung (Inmon, Kimball, Data Vault)?",
    shortDefinition:
      "Datenmodellierung ist der strukturierte Entwurf, wie Daten in einem Data Warehouse oder Lakehouse organisiert, in Beziehung gesetzt und gespeichert werden. Die drei verbreitetsten Ansätze sind Inmon (normalisierter Unternehmenskern), Kimball (dimensionale Sternschemata für Reporting) und Data Vault (flexibler, historisierter Integrationsansatz).",
    synonyms: ["Data Modeling", "Datenmodell", "dimensionale Modellierung", "Sternschema", "Faktentabelle", "Dimensionstabelle", "Fact Table"],
    sections: [
      {
        heading: "Einordnung: Wofür wird Datenmodellierung genutzt?",
        paragraphs: [
          "Datenmodellierung legt fest, in welchen Tabellen und Beziehungen Daten abgelegt werden, damit sie verständlich, konsistent und performant abfragbar sind. Ein gutes Modell entscheidet maßgeblich darüber, wie schnell und verlässlich später Berichte und Analysen entstehen.",
          "Die drei Ansätze setzen unterschiedliche Schwerpunkte. Inmon (Top-down) baut zuerst einen stark normalisierten, unternehmensweiten Kern und leitet daraus fachliche Data Marts ab; das fördert Konsistenz, ist aber aufwändiger im Aufbau. Kimball (Bottom-up) modelliert dimensional in Stern- oder Schneeflockenschemata mit Faktentabellen und Dimensionen; das ist direkt reporting- und Power-BI-freundlich. Data Vault trennt Hubs (Geschäftsschlüssel), Links (Beziehungen) und Satellites (beschreibende, historisierte Attribute); das ist besonders flexibel, gut historisierbar und robust gegenüber Quelländerungen.",
        ],
      },
      {
        heading: "Beispiel aus der Praxis",
        paragraphs: [
          "In der Datenplattform der dy Project AG, einem Großbauprojekt mit über 1 Mrd. CHF Volumen, wurden Daten aus SQL Server, Excel und REST-APIs auf Azure Databricks integriert. Ein Data-Vault-naher Ansatz hilft, viele wechselnde Quellen flexibel und historisiert zu integrieren, während die für Power BI bereitgestellte Gold-Schicht dimensional im Kimball-Stil modelliert wird, damit Berichte performant und verständlich bleiben.",
        ],
      },
      {
        heading: "Faktentabellen & Dimensionen",
        paragraphs: [
          "Im dimensionalen Modell (Kimball) sind zwei Tabellentypen zentral:",
        ],
        bullets: [
          "Faktentabelle (Fact Table): enthält die messbaren Kennzahlen eines Geschäftsvorgangs – etwa Umsatz, Menge oder Kosten – samt Verweisen auf die zugehörigen Dimensionen.",
          "Dimensionstabelle (Dimension): liefert den beschreibenden Kontext, nach dem ausgewertet wird – z. B. Zeit, Kunde, Produkt oder Region. Dimensionen beantworten das „nach was?“ einer Auswertung.",
          "Sternschema: die Anordnung, bei der eine zentrale Faktentabelle direkt mit mehreren Dimensionstabellen verbunden ist – einfach, performant und für Power BI ideal.",
        ],
      },
      {
        heading: "Abgrenzung & Bezug zu smiit",
        paragraphs: [
          "Die drei Ansätze schließen sich nicht aus, sondern werden oft kombiniert: Data Vault für die flexible, historisierte Integration vieler Quellen, ein dimensionales Kimball-Modell für die reporting-nahe Auslieferungsschicht, Inmon als Leitidee eines konsistenten Unternehmenskerns. Sie sind eine Ebene unterhalb der Architekturidee, etwa der Medallion-Architektur, die festlegt, in welchen Stufen Daten veredelt werden. smiit wählt den Ansatz nach Quellenlage, Änderungsdynamik und Reporting-Anforderungen und kombiniert sie pragmatisch, statt dogmatisch einem Lager zu folgen.",
        ],
      },
    ],
    faq: [
      { question: "Welcher Modellierungsansatz ist der beste?", answer: "Es gibt kein generelles Bestes. Kimball ist reporting-freundlich, Data Vault stark bei vielen, sich ändernden Quellen und Historisierung, Inmon liefert einen konsistenten Unternehmenskern. In der Praxis werden sie oft kombiniert." },
      { question: "Was ist der Unterschied zwischen Kimball und Data Vault?", answer: "Kimball modelliert dimensional in Sternschemata für direktes Reporting. Data Vault trennt Hubs, Links und Satellites für flexible, historisierte Integration und wird häufig als Schicht vor einem dimensionalen Modell genutzt." },
      { question: "Was sind Faktentabelle und Dimension einfach erklärt?", answer: "Eine Faktentabelle enthält die messbaren Werte eines Geschäftsvorgangs, etwa Umsatz oder Menge. Eine Dimension liefert den beschreibenden Kontext, nach dem ausgewertet wird, etwa Zeit, Kunde oder Produkt. Im Sternschema verbindet eine zentrale Faktentabelle direkt mehrere Dimensionen." },
      { question: "Wie hängen Datenmodellierung und Medallion-Architektur zusammen?", answer: "Die Medallion-Architektur legt fest, in welchen Stufen (Bronze, Silver, Gold) Daten veredelt werden, die Datenmodellierung legt fest, wie die Tabellen innerhalb dieser Stufen strukturiert sind. In der Praxis wird die für Reporting bestimmte Gold-Schicht oft dimensional modelliert." },
    ],
    relatedServicePath: "services/analytics",
    relatedCaseStudySlug: "dy-project-ag",
    metaTitle: "Datenmodellierung: Inmon, Kimball & Data Vault | smiit Glossar",
    metaDescription: "Datenmodellierung einfach erklärt: Inmon, Kimball und Data Vault im Vergleich, Anwendungsfälle und Bezug zur Medallion-Architektur – mit Praxisbezug von smiit.",
  },
  en: {
    slug: "data-modeling",
    cluster: "analytics",
    dateModified: "2026-05-25",
    term: "Data modeling (Inmon, Kimball, Data Vault)",
    title: "What is data modeling (Inmon, Kimball, Data Vault)?",
    shortDefinition:
      "Data modeling is the structured design of how data is organized, related and stored in a data warehouse or lakehouse. The three most common approaches are Inmon (a normalized enterprise core), Kimball (dimensional star schemas for reporting) and Data Vault (a flexible, historized integration approach).",
    synonyms: ["data modeling", "dimensional modeling", "star schema", "fact table", "dimension table"],
    sections: [
      {
        heading: "Where data modeling is used",
        paragraphs: [
          "Data modeling defines which tables and relationships data is stored in so that it is understandable, consistent and fast to query. A good model largely determines how quickly and reliably reports and analyses can later be built.",
          "The three approaches set different priorities. Inmon (top-down) first builds a highly normalized, enterprise-wide core and derives subject-specific data marts from it; this promotes consistency but is more effort to build. Kimball (bottom-up) models dimensionally in star or snowflake schemas with fact tables and dimensions; this is directly reporting- and Power BI-friendly. Data Vault separates hubs (business keys), links (relationships) and satellites (descriptive, historized attributes); this is especially flexible, well suited to historization and robust against source changes.",
        ],
      },
      {
        heading: "A practical example",
        paragraphs: [
          "In the dy Project AG data platform, a large construction project worth over 1 billion CHF, data from SQL Server, Excel and REST APIs was integrated on Azure Databricks. A Data Vault-like approach helps integrate many changing sources flexibly and with history, while the gold layer provided for Power BI is modeled dimensionally in the Kimball style so that reports stay fast and understandable.",
        ],
      },
      {
        heading: "Fact tables & dimensions",
        paragraphs: [
          "Two table types are central to the dimensional (Kimball) model:",
        ],
        bullets: [
          "Fact table: holds the measurable metrics of a business event — such as revenue, quantity or cost — together with references to the related dimensions.",
          "Dimension (dimension table): provides the descriptive context you analyze by — e.g. time, customer, product or region. Dimensions answer the by what of an analysis.",
          "Star schema: the layout where one central fact table connects directly to several dimension tables — simple, performant and ideal for Power BI.",
        ],
      },
      {
        heading: "How it relates & how smiit uses it",
        paragraphs: [
          "The three approaches are not mutually exclusive but are often combined: Data Vault for flexible, historized integration of many sources, a dimensional Kimball model for the reporting-facing delivery layer, and Inmon as the guiding idea of a consistent enterprise core. They sit one level below the architectural idea, such as the medallion architecture, which defines in which stages data is refined. smiit chooses the approach based on source landscape, rate of change and reporting requirements and combines them pragmatically rather than following one camp dogmatically.",
        ],
      },
    ],
    faq: [
      { question: "Which modeling approach is the best?", answer: "There is no universal best. Kimball is reporting-friendly, Data Vault is strong with many changing sources and historization, and Inmon delivers a consistent enterprise core. In practice they are often combined." },
      { question: "What is the difference between Kimball and Data Vault?", answer: "Kimball models dimensionally in star schemas for direct reporting. Data Vault separates hubs, links and satellites for flexible, historized integration and is often used as a layer before a dimensional model." },
      { question: "What are a fact table and a dimension in simple terms?", answer: "A fact table holds the measurable values of a business event, such as revenue or quantity. A dimension provides the descriptive context you analyze by, such as time, customer or product. In a star schema, one central fact table connects directly to several dimensions." },
      { question: "How do data modeling and the medallion architecture relate?", answer: "The medallion architecture defines in which stages (bronze, silver, gold) data is refined, while data modeling defines how the tables within those stages are structured. In practice the gold layer intended for reporting is often modeled dimensionally." },
    ],
    relatedServicePath: "services/analytics",
    relatedCaseStudySlug: "dy-project-ag",
    metaTitle: "Data modeling: Inmon, Kimball & Data Vault | smiit glossary",
    metaDescription: "Data modeling explained simply: Inmon, Kimball and Data Vault compared, use cases and the link to the medallion architecture – with practical insight from smiit.",
  },
}

export default datenmodellierung

/** Misconceptions + external sources, merged into the term on read (see getGlossaryTerm). */
export const extras: Record<Locale, GlossaryExtra> = {
  de: {
    misconceptions: [
      "Datenmodellierung ist nicht nur das Anlegen von Tabellen; sie definiert Entitäten, Beziehungen und Granularität und entscheidet maßgeblich über Performance und Auswertbarkeit.",
      "Viele glauben, ein einziges flaches Tabellenmodell sei am einfachsten. In der Analytik ist meist ein Sternschema mit Fakten und Dimensionen klarer und performanter.",
      "Ein verbreiteter Irrtum ist, dass Normalisierung immer das Ziel ist. Für Berichte und BI ist eine bewusste Denormalisierung oft sinnvoller als ein strikt normalisiertes Modell.",
    ],
    sources: [
      { title: "Kimball Group – Dimensionale Modellierung", url: "https://www.kimballgroup.com/" },
      { title: "Data Vault Alliance (Dan Linstedt)", url: "https://datavaultalliance.com/" },
      { title: "Microsoft Learn – Sternschema in Power BI", url: "https://learn.microsoft.com/power-bi/guidance/star-schema" },
    ],
  },
  en: {
    misconceptions: [
      "Data modeling is not just creating tables; it defines entities, relationships and granularity and largely determines performance and analytical usefulness.",
      "Many think a single flat table model is simplest, but in analytics a star schema with facts and dimensions is usually clearer and faster.",
      "A common error is to assume normalization is always the goal. For reporting and BI, deliberate denormalization is often more useful than a strictly normalized model.",
    ],
    sources: [
      { title: "Kimball Group – Dimensional modeling", url: "https://www.kimballgroup.com/" },
      { title: "Data Vault Alliance (Dan Linstedt)", url: "https://datavaultalliance.com/" },
      { title: "Microsoft Learn – Star schema in Power BI", url: "https://learn.microsoft.com/power-bi/guidance/star-schema" },
    ],
  },
}
