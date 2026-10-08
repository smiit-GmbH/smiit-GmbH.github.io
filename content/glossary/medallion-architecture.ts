import type { Locale } from "@/lib/dictionary"
import type { GlossaryExtra, LocalizedGlossaryTerm } from "@/lib/glossary"

const medallionArchitektur: LocalizedGlossaryTerm = {
  de: {
    slug: "medallion-architecture",
    cluster: "analytics",
    dateModified: "2026-05-25",
    term: "Medallion-Architektur (Bronze/Silver/Gold)",
    title: "Was ist die Medallion-Architektur (Bronze/Silver/Gold)?",
    shortDefinition:
      "Die Medallion-Architektur ist ein Schichtenmodell für die Datenveredelung in einem Lakehouse, das Daten stufenweise von roh zu analysefertig aufbereitet. Die drei Stufen Bronze (Rohdaten), Silver (bereinigt und integriert) und Gold (für Reporting und Analyse aufbereitet) machen den Datenfluss nachvollziehbar und wiederverwendbar.",
    synonyms: ["Medaillon-Architektur", "Bronze Silver Gold", "Multi-Hop-Architektur", "Lakehouse-Schichten"],
    sections: [
      {
        heading: "Einordnung: Wofür wird die Medallion-Architektur genutzt?",
        paragraphs: [
          "Die Medallion-Architektur strukturiert, in welchen Schritten Daten von der Quelle bis zum fertigen Bericht veredelt werden. Bronze enthält die Rohdaten möglichst unverändert (gut für Nachvollziehbarkeit und erneute Verarbeitung). Silver bereinigt, harmonisiert und verknüpft die Daten zu einer verlässlichen, integrierten Schicht. Gold stellt die für konkrete Anwendungsfälle aufbereiteten, oft dimensional modellierten Tabellen bereit, auf denen Power BI direkt aufsetzt.",
          "Dieses Vorgehen wird vor allem in Lakehouse-Umgebungen wie Azure Databricks oder Microsoft Fabric genutzt und verbindet sich gut mit Datenmodellierungsansätzen und Governance.",
        ],
      },
      {
        heading: "Beispiel aus der Praxis",
        paragraphs: [
          "In der Datenplattform der dy Project AG, einem Großbauprojekt mit über 1 Mrd. CHF Volumen, landeten Daten aus SQL Server, Excel und REST-APIs zunächst unverändert in der Bronze-Schicht. In Silver wurden sie bereinigt, vereinheitlicht und verknüpft, in Gold dann zu performanten, geprüften Tabellen für das Power-BI-Reporting aufbereitet. So blieb jederzeit nachvollziehbar, welche Zahl auf welchen Rohdaten beruht.",
        ],
      },
      {
        heading: "Abgrenzung & Bezug zu smiit",
        paragraphs: [
          "Die Medallion-Architektur ist ein Schichtungsprinzip, kein Datenmodell. Sie legt fest, in welchen Stufen veredelt wird, während Ansätze wie Kimball oder Data Vault festlegen, wie die Tabellen innerhalb der Schichten strukturiert sind. Sie ist eine moderne Ausprägung von ETL/ELT im Lakehouse und unterstützt Data Governance, weil geprüfte und ungeprüfte Daten klar getrennt sind. smiit setzt die Medallion-Architektur als Standardvorgehen für Lakehouse-Projekte ein, weil sie Nachvollziehbarkeit, Wiederverwendbarkeit und saubere Verantwortlichkeiten fördert.",
        ],
      },
    ],
    faq: [
      { question: "Was bedeuten Bronze, Silver und Gold?", answer: "Bronze ist die Rohdatenschicht möglichst unverändert, Silver die bereinigte und integrierte Schicht, Gold die für Reporting und Analyse aufbereitete Schicht, auf der Werkzeuge wie Power BI direkt aufsetzen." },
      { question: "Ist die Medallion-Architektur dasselbe wie ETL?", answer: "Nicht ganz. Die Medallion-Architektur ist ein Schichtungsmuster für die stufenweise Veredelung im Lakehouse. ETL beziehungsweise ELT beschreibt den eigentlichen Extraktions-, Transformations- und Ladeprozess, der die Schichten befüllt." },
      { question: "Müssen es immer genau drei Schichten sein?", answer: "Drei Schichten (Bronze, Silver, Gold) sind das verbreitete Grundmuster, aber kein Dogma. Je nach Bedarf können Zwischenstufen ergänzt oder bei einfachen Fällen Schichten zusammengefasst werden. Entscheidend ist das Prinzip der nachvollziehbaren, stufenweisen Veredelung." },
      { question: "Welche Plattform braucht man für eine Medallion-Architektur?", answer: "Sie wird typischerweise in einem Lakehouse umgesetzt, etwa auf Azure Databricks oder Microsoft Fabric, oft auf Basis offener Tabellenformate wie Delta Lake. Das Prinzip der gestuften Veredelung lässt sich aber auch in klassischen Data-Warehouse-Umgebungen anwenden." },
    ],
    relatedServicePath: "services/analytics",
    relatedCaseStudySlug: "dy-project-ag",
    metaTitle: "Medallion-Architektur (Bronze/Silver/Gold) erklärt | smiit Glossar",
    metaDescription: "Medallion-Architektur einfach erklärt: Bronze, Silver und Gold, Anwendungsfälle und Abgrenzung zu ETL und Datenmodellierung – mit Praxisbezug von smiit.",
  },
  en: {
    slug: "medallion-architecture",
    cluster: "analytics",
    dateModified: "2026-05-25",
    term: "Medallion architecture (bronze/silver/gold)",
    title: "What is the medallion architecture (bronze/silver/gold)?",
    shortDefinition:
      "The medallion architecture is a layered model for refining data in a lakehouse that prepares data step by step from raw to analysis-ready. The three layers bronze (raw data), silver (cleansed and integrated) and gold (prepared for reporting and analysis) make the data flow traceable and reusable.",
    synonyms: ["bronze silver gold", "multi-hop architecture", "lakehouse layers"],
    sections: [
      {
        heading: "Where the medallion architecture is used",
        paragraphs: [
          "The medallion architecture structures the steps in which data is refined from source to finished report. Bronze holds the raw data as unchanged as possible (good for traceability and reprocessing). Silver cleanses, harmonizes and joins the data into a reliable, integrated layer. Gold provides the tables prepared for specific use cases, often dimensionally modeled, on which Power BI builds directly.",
          "This approach is used above all in lakehouse environments such as Azure Databricks or Microsoft Fabric and combines well with data modeling approaches and governance.",
        ],
      },
      {
        heading: "A practical example",
        paragraphs: [
          "In the dy Project AG data platform, a large construction project worth over 1 billion CHF, data from SQL Server, Excel and REST APIs first landed unchanged in the bronze layer. In silver it was cleansed, unified and joined, and in gold it was then prepared into fast, validated tables for Power BI reporting. This kept it traceable at all times which figure was based on which raw data.",
        ],
      },
      {
        heading: "How it relates & how smiit uses it",
        paragraphs: [
          "The medallion architecture is a layering principle, not a data model. It defines in which stages data is refined, while approaches such as Kimball or Data Vault define how the tables within the layers are structured. It is a modern expression of ETL/ELT in the lakehouse and supports data governance because validated and unvalidated data are clearly separated. smiit uses the medallion architecture as a standard approach for lakehouse projects because it promotes traceability, reusability and clean responsibilities.",
        ],
      },
    ],
    faq: [
      { question: "What do bronze, silver and gold mean?", answer: "Bronze is the raw data layer kept as unchanged as possible, silver is the cleansed and integrated layer, and gold is the layer prepared for reporting and analysis on which tools such as Power BI build directly." },
      { question: "Is the medallion architecture the same as ETL?", answer: "Not quite. The medallion architecture is a layering pattern for step-by-step refinement in the lakehouse. ETL or ELT describes the actual extraction, transformation and loading process that fills the layers." },
      { question: "Does it always have to be exactly three layers?", answer: "Three layers (bronze, silver, gold) are the common base pattern, but not a dogma. Depending on needs, intermediate stages can be added or, in simple cases, layers merged. What matters is the principle of traceable, step-by-step refinement." },
      { question: "What platform do you need for a medallion architecture?", answer: "It is typically implemented in a lakehouse, for example on Azure Databricks or Microsoft Fabric, often based on open table formats such as Delta Lake. The principle of staged refinement can, however, also be applied in classic data warehouse environments." },
    ],
    relatedServicePath: "services/analytics",
    relatedCaseStudySlug: "dy-project-ag",
    metaTitle: "Medallion architecture (bronze/silver/gold) | smiit glossary",
    metaDescription: "Medallion architecture explained simply: bronze, silver and gold, use cases and how it differs from ETL and data modeling – with practical insight from smiit.",
  },
}

export default medallionArchitektur

/** Misconceptions + external sources, merged into the term on read (see getGlossaryTerm). */
export const extras: Record<Locale, GlossaryExtra> = {
  de: {
    misconceptions: [
      "Die Medaillon-Architektur ist kein Produkt, sondern ein Organisationsmuster, das Daten in Bronze-, Silber- und Gold-Schichten von roh bis veredelt strukturiert.",
      "Viele glauben, die drei Schichten seien feste Vorschrift. Es ist ein Leitmuster, das je nach Anwendungsfall angepasst und nicht starr umgesetzt werden sollte.",
      "Ein verbreiteter Irrtum ist, Bronze speichere bereits bereinigte Daten. Bronze enthält bewusst die Rohdaten, erst Silber und Gold bereiten sie auf und aggregieren.",
    ],
    sources: [
      { title: "Microsoft Learn – Medallion-Lakehouse-Architektur (Azure Databricks)", url: "https://learn.microsoft.com/azure/databricks/lakehouse/medallion" },
      { title: "Databricks – Medallion Architecture", url: "https://www.databricks.com/glossary/medallion-architecture" },
    ],
  },
  en: {
    misconceptions: [
      "The medallion architecture is not a product but an organizational pattern that structures data into bronze, silver and gold layers from raw to refined.",
      "Many believe the three layers are a fixed rule. It is a guiding pattern that should be adapted to the use case rather than applied rigidly.",
      "A common error is to assume bronze already holds cleaned data. Bronze deliberately keeps raw data, while silver and gold clean and aggregate it.",
    ],
    sources: [
      { title: "Microsoft Learn – Medallion lakehouse architecture (Azure Databricks)", url: "https://learn.microsoft.com/azure/databricks/lakehouse/medallion" },
      { title: "Databricks – Medallion Architecture", url: "https://www.databricks.com/glossary/medallion-architecture" },
    ],
  },
}
