import type { Locale } from "@/lib/dictionary"
import type { GlossaryExtra, LocalizedGlossaryTerm } from "@/lib/glossary"

const semanticModel: LocalizedGlossaryTerm = {
  de: {
    slug: "semantic-model",
    cluster: "analytics",
    dateModified: "2026-05-25",
    term: "Semantic Model (Power BI Dataset)",
    title: "Was ist ein Semantic Model (Power BI Dataset)?",
    shortDefinition:
      "Ein Semantic Model, früher als Power BI Dataset bezeichnet, ist die semantische Datenschicht in Power BI, die Tabellen, Beziehungen, Kennzahlen und Berechtigungen bündelt. Es bildet die wiederverwendbare Grundlage, auf der mehrere Berichte mit einheitlichen Definitionen aufsetzen.",
    synonyms: ["Power BI Dataset", "Datenmodell", "Power BI Semantic Model", "Tabular Model"],
    sections: [
      {
        heading: "Einordnung: Wofür wird ein Semantic Model genutzt?",
        paragraphs: [
          "Das Semantic Model ist die Schicht zwischen den Rohdaten und den Berichten. Es enthält die geladenen Tabellen, deren Beziehungen, die mit DAX definierten Kennzahlen sowie Sicherheitsregeln wie Row-Level Security. Berichte greifen nicht direkt auf Quelldaten zu, sondern auf dieses Modell, wodurch Kennzahlen und Definitionen über alle Berichte hinweg einheitlich bleiben.",
          "Ein zentral gepflegtes Semantic Model kann von vielen Berichten und Nutzern wiederverwendet werden. Das vermeidet, dass dieselbe Kennzahl in zehn Berichten unterschiedlich berechnet wird, und macht das Modell zu einer gemeinsamen Datenwahrheit innerhalb von Power BI.",
        ],
      },
      {
        heading: "Typische Anwendungsfälle",
        paragraphs: [
          "Ein Semantic Model lohnt sich überall dort, wo mehrere Berichte oder Teams auf konsistente Kennzahlen angewiesen sind.",
        ],
        bullets: [
          "Ein zentrales Modell als Grundlage für viele Berichte und Dashboards",
          "Einheitliche Kennzahlen-Definitionen über Abteilungen hinweg",
          "Zentral gepflegte Berechtigungen, etwa über Row-Level Security",
          "Wiederverwendung statt redundanter Modelle in jedem einzelnen Bericht",
        ],
      },
      {
        heading: "Abgrenzung & Bezug zu smiit",
        paragraphs: [
          "Das Semantic Model ist die Modellschicht in Power BI, nicht das Data Warehouse darunter und nicht der Bericht darüber. Power Query befüllt es, DAX definiert seine Kennzahlen, Row-Level Security regelt die Sichtbarkeit. Bei großen Datenmengen empfiehlt sich ein vorgelagertes Data Warehouse oder Lakehouse als Datenquelle des Modells. In der Datenplattform der dy Project AG setzt das Semantic Model auf der Gold-Schicht auf und stellt geprüfte Kennzahlen bereit. smiit baut Semantic Models so, dass sie performant, wiederverwendbar und im Alltag wartbar bleiben.",
        ],
      },
    ],
    faq: [
      {
        question: "Warum heißt das Power BI Dataset jetzt Semantic Model?",
        answer:
          "Microsoft hat den Begriff Dataset in Semantic Model umbenannt, um klarzustellen, dass es sich um eine semantische Datenschicht mit Beziehungen, Kennzahlen und Berechtigungen handelt und nicht nur um eine reine Datentabelle.",
      },
      {
        question: "Können mehrere Berichte dasselbe Semantic Model nutzen?",
        answer:
          "Ja. Genau das ist der Vorteil: Ein zentral gepflegtes Semantic Model versorgt viele Berichte mit denselben Kennzahlen und Definitionen, was Konsistenz schafft und Doppelarbeit vermeidet.",
      },
      {
        question: "Was ist der Unterschied zwischen einem Semantic Model und einem Data Warehouse?",
        answer:
          "Das Data Warehouse speichert die aufbereiteten Daten, das Semantic Model ist die darüberliegende Schicht in Power BI mit Beziehungen, Kennzahlen und Berechtigungen. Bei großen Datenmengen dient das Warehouse als Datenquelle des Modells.",
      },
      {
        question: "Wie hält man ein Semantic Model langfristig wartbar?",
        answer:
          "Hilfreich sind klar benannte Kennzahlen, ein durchdachtes Datenmodell mit sauberen Beziehungen und das Vermeiden redundanter Berechnungen. Werden Logik und Definitionen zentral gepflegt, bleiben Änderungen nachvollziehbar und wirken automatisch auf alle aufsetzenden Berichte.",
      },
      {
        question: "Worauf achtet smiit beim Aufbau eines Semantic Models?",
        answer:
          "smiit baut Semantic Models so, dass sie performant, wiederverwendbar und im Alltag wartbar bleiben, und setzt sie bei großen Datenmengen auf eine geprüfte Datengrundlage wie die Gold-Schicht einer Datenplattform auf.",
      },
    ],
    relatedServicePath: "services/analytics",
    relatedCaseStudySlug: "dy-project-ag",
    metaTitle: "Was ist ein Semantic Model (Power BI Dataset)? | smiit Glossar",
    metaDescription:
      "Semantic Model einfach erklärt: Definition, Funktionsweise, Anwendungsfälle und Abgrenzung zu Data Warehouse und DAX – mit Praxisbezug von smiit.",
  },
  en: {
    slug: "semantic-model",
    cluster: "analytics",
    dateModified: "2026-05-25",
    term: "Semantic model (Power BI dataset)",
    title: "What is a semantic model (Power BI dataset)?",
    shortDefinition:
      "A semantic model, formerly called a Power BI dataset, is the semantic data layer in Power BI that bundles tables, relationships, metrics and permissions. It forms the reusable foundation on which multiple reports build with consistent definitions.",
    synonyms: ["Power BI dataset", "data model", "Power BI semantic model", "tabular model"],
    sections: [
      {
        heading: "Where a semantic model is used",
        paragraphs: [
          "The semantic model is the layer between the raw data and the reports. It contains the loaded tables, their relationships, the metrics defined with DAX and security rules such as row-level security. Reports do not access source data directly but this model, which keeps metrics and definitions consistent across all reports.",
          "A centrally maintained semantic model can be reused by many reports and users. This avoids the same metric being calculated differently in ten reports and makes the model a shared source of truth within Power BI.",
        ],
      },
      {
        heading: "Typical use cases",
        paragraphs: ["A semantic model pays off wherever several reports or teams rely on consistent metrics."],
        bullets: [
          "A central model as the basis for many reports and dashboards",
          "Consistent metric definitions across departments",
          "Centrally maintained permissions, for example via row-level security",
          "Reuse instead of redundant models in every single report",
        ],
      },
      {
        heading: "How it relates & how smiit uses it",
        paragraphs: [
          "The semantic model is the model layer in Power BI, not the data warehouse below it and not the report above it. Power Query fills it, DAX defines its metrics, and row-level security governs visibility. With large data volumes, an upstream data warehouse or lakehouse is recommended as the model's data source. In the dy Project AG data platform, the semantic model builds on the gold layer and provides validated metrics. smiit builds semantic models so that they stay performant, reusable and maintainable in everyday work.",
        ],
      },
    ],
    faq: [
      {
        question: "Why is the Power BI dataset now called a semantic model?",
        answer:
          "Microsoft renamed the term dataset to semantic model to clarify that it is a semantic data layer with relationships, metrics and permissions, not just a plain data table.",
      },
      {
        question: "Can several reports use the same semantic model?",
        answer:
          "Yes. That is precisely the benefit: one centrally maintained semantic model supplies many reports with the same metrics and definitions, creating consistency and avoiding duplicate work.",
      },
      {
        question: "What is the difference between a semantic model and a data warehouse?",
        answer:
          "The data warehouse stores the prepared data, while the semantic model is the layer above it in Power BI with relationships, metrics and permissions. With large data volumes, the warehouse serves as the model's data source.",
      },
      {
        question: "How do you keep a semantic model maintainable in the long run?",
        answer:
          "Clearly named metrics, a well-thought-out data model with clean relationships and avoiding redundant calculations all help. When logic and definitions are maintained centrally, changes stay traceable and automatically affect every report built on the model.",
      },
      {
        question: "What does smiit pay attention to when building a semantic model?",
        answer:
          "smiit builds semantic models so that they stay performant, reusable and maintainable in everyday work, and with large data volumes builds them on a validated data foundation such as the gold layer of a data platform.",
      },
    ],
    relatedServicePath: "services/analytics",
    relatedCaseStudySlug: "dy-project-ag",
    metaTitle: "What is a semantic model (Power BI dataset)? | smiit glossary",
    metaDescription:
      "Semantic model explained simply: definition, how it works, use cases and how it differs from a data warehouse and DAX – with practical insight from smiit.",
  },
}

export default semanticModel

/** Misconceptions + external sources, merged into the term on read (see getGlossaryTerm). */
export const extras: Record<Locale, GlossaryExtra> = {
  de: {
    misconceptions: [
      "Ein Semantic Model ist nicht nur eine Datenkopie; es enthält Beziehungen, Hierarchien und Measures, die Rohdaten in eine geschäftlich verständliche Schicht überführen.",
      "Viele kennen es noch als „Dataset“ und halten beide für Verschiedenes. In Power BI wurde das frühere Dataset in Semantic Model umbenannt, es bezeichnet dasselbe Konzept.",
      "Ein verbreiteter Irrtum ist, jeder Bericht brauche ein eigenes Modell. Ein gut gepflegtes, geteiltes Semantic Model vermeidet Redundanz und widersprüchliche Kennzahlen.",
    ],
    sources: [
      { title: "Microsoft Learn – Power BI Dokumentation", url: "https://learn.microsoft.com/power-bi/" },
      {
        title: "Microsoft Learn – Power BI Datenmodellierung (Guidance)",
        url: "https://learn.microsoft.com/power-bi/guidance/",
      },
    ],
  },
  en: {
    misconceptions: [
      "A semantic model is not just a copy of data; it holds relationships, hierarchies and measures that turn raw data into a business-friendly layer.",
      "Many still know it as a dataset and treat the two as different. In Power BI the former dataset was renamed semantic model and refers to the same concept.",
      "A common error is to think every report needs its own model. A well-maintained, shared semantic model avoids redundancy and conflicting metrics.",
    ],
    sources: [
      { title: "Microsoft Learn – Power BI documentation", url: "https://learn.microsoft.com/power-bi/" },
      {
        title: "Microsoft Learn – Power BI data modeling (guidance)",
        url: "https://learn.microsoft.com/power-bi/guidance/",
      },
    ],
  },
}
