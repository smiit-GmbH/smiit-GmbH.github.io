import type { Locale } from "@/lib/dictionary"
import type { GlossaryExtra, LocalizedGlossaryTerm } from "@/lib/glossary"

const dax: LocalizedGlossaryTerm = {
  de: {
    slug: "dax",
    cluster: "analytics",
    dateModified: "2026-05-25",
    term: "DAX (Data Analysis Expressions)",
    title: "Was ist DAX (Data Analysis Expressions)?",
    shortDefinition:
      "DAX (Data Analysis Expressions) ist die Formelsprache von Power BI, Analysis Services und Power Pivot, mit der Kennzahlen und berechnete Spalten im Datenmodell definiert werden. Mit DAX werden Aggregationen, Zeitvergleiche und kontextabhängige Berechnungen erstellt, die in Berichten dynamisch auf Filter reagieren.",
    synonyms: ["Data Analysis Expressions", "DAX-Formeln", "Measures"],
    sections: [
      {
        heading: "Einordnung: Wofür wird DAX genutzt?",
        paragraphs: [
          "DAX berechnet Kennzahlen innerhalb eines fertigen Datenmodells, etwa Umsatz, Marge, Vorjahresvergleiche oder gleitende Durchschnitte. Anders als eine einfache Excel-Formel berücksichtigt DAX den Auswertungskontext: Eine Kennzahl liefert je nach gewähltem Filter, Zeitraum oder Segment automatisch das passende Ergebnis.",
          "Zentrales Konzept ist der Unterschied zwischen Measures (zur Abfragezeit berechnet, sehr flexibel) und berechneten Spalten (beim Laden berechnet, im Modell gespeichert). Funktionen wie CALCULATE steuern dabei den Filterkontext und sind das Herzstück fortgeschrittener DAX-Berechnungen.",
        ],
      },
      {
        heading: "Typische Anwendungsfälle",
        paragraphs: ["DAX kommt überall dort zum Einsatz, wo Berichte mehr als reine Summen brauchen."],
        bullets: [
          "Kennzahlen wie Umsatz, Marge oder Auslastung als wiederverwendbare Measures",
          "Zeitintelligenz: Vorjahresvergleich, Year-to-Date, gleitende Durchschnitte",
          "Kontextabhängige Berechnungen, die auf Filter und Slicer reagieren",
          "Verhältnis- und Anteilskennzahlen über mehrere Dimensionen hinweg",
        ],
      },
      {
        heading: "Abgrenzung & Bezug zu smiit",
        paragraphs: [
          "DAX ist die Berechnungssprache im Modell, nicht die Datenaufbereitung; das Verbinden und Umformen der Daten übernimmt Power Query, die zugrunde liegende Datenschicht ist das Semantic Model. Gut modellierte Daten (etwa ein sauberes Sternschema) machen DAX deutlich einfacher und schneller. In der Datenplattform der dy Project AG sorgen klar definierte DAX-Kennzahlen dafür, dass alle Berichte dieselben Definitionen verwenden. smiit legt Wert auf nachvollziehbare, performante DAX-Measures statt auf verschachtelte Einzelformeln, die niemand mehr wartet.",
        ],
      },
    ],
    faq: [
      {
        question: "Was ist der Unterschied zwischen einem Measure und einer berechneten Spalte?",
        answer:
          "Ein Measure wird zur Abfragezeit im jeweiligen Filterkontext berechnet und ist sehr flexibel. Eine berechnete Spalte wird beim Laden berechnet und im Modell gespeichert, was mehr Speicher braucht und weniger dynamisch ist.",
      },
      {
        question: "Ist DAX schwer zu lernen?",
        answer:
          "Die Grundlagen sind schnell erlernbar, ähnlich wie Excel-Formeln. Anspruchsvoll wird DAX beim Filterkontext und Funktionen wie CALCULATE; hier hilft ein sauberes Datenmodell und Erfahrung, wie sie smiit einbringt.",
      },
      {
        question: "Was ist der Unterschied zwischen Power Query und DAX?",
        answer:
          "Power Query bereitet die Daten vor dem Laden ins Modell auf, also verbinden, bereinigen und umformen. DAX berechnet anschließend Kennzahlen und Aggregationen innerhalb des fertigen Datenmodells. Beide ergänzen sich, lösen aber unterschiedliche Aufgaben.",
      },
      {
        question: "Warum ist ein gutes Datenmodell für DAX wichtig?",
        answer:
          "DAX berechnet im Kontext der Tabellen und Beziehungen des Modells. Ein sauberes Sternschema mit klaren Beziehungen macht Measures einfacher, schneller und besser nachvollziehbar, während ein unübersichtliches Modell zu komplizierten Formeln und Performanceproblemen führt.",
      },
    ],
    relatedServicePath: "services/analytics",
    relatedCaseStudySlug: "dy-project-ag",
    metaTitle: "Was ist DAX? Definition, Nutzen & Praxis | smiit Glossar",
    metaDescription:
      "DAX einfach erklärt: Definition, Funktionsweise, Anwendungsfälle und Abgrenzung zu Power Query und Semantic Model – mit Praxisbezug von smiit.",
  },
  en: {
    slug: "dax",
    cluster: "analytics",
    dateModified: "2026-05-25",
    term: "DAX (Data Analysis Expressions)",
    title: "What is DAX (Data Analysis Expressions)?",
    shortDefinition:
      "DAX (Data Analysis Expressions) is the formula language of Power BI, Analysis Services and Power Pivot, used to define metrics and calculated columns in the data model. With DAX, aggregations, time comparisons and context-dependent calculations are created that respond dynamically to filters in reports.",
    synonyms: ["Data Analysis Expressions", "DAX formulas", "measures"],
    sections: [
      {
        heading: "Where DAX is used",
        paragraphs: [
          "DAX calculates metrics within a finished data model, such as revenue, margin, year-over-year comparisons or moving averages. Unlike a simple Excel formula, DAX takes the evaluation context into account: a metric automatically returns the appropriate result depending on the selected filter, period or segment.",
          "A central concept is the difference between measures (calculated at query time, very flexible) and calculated columns (computed on load, stored in the model). Functions such as CALCULATE control the filter context and are the heart of advanced DAX calculations.",
        ],
      },
      {
        heading: "Typical use cases",
        paragraphs: ["DAX is used wherever reports need more than plain sums."],
        bullets: [
          "Metrics such as revenue, margin or utilization as reusable measures",
          "Time intelligence: year-over-year, year-to-date, moving averages",
          "Context-dependent calculations that respond to filters and slicers",
          "Ratio and share metrics across multiple dimensions",
        ],
      },
      {
        heading: "How it relates & how smiit uses it",
        paragraphs: [
          "DAX is the calculation language in the model, not the data preparation; connecting and reshaping the data is done by Power Query, and the underlying data layer is the semantic model. Well-modeled data (such as a clean star schema) makes DAX considerably simpler and faster. In the dy Project AG data platform, clearly defined DAX metrics ensure that all reports use the same definitions. smiit values traceable, performant DAX measures over nested one-off formulas that no one maintains anymore.",
        ],
      },
    ],
    faq: [
      {
        question: "What is the difference between a measure and a calculated column?",
        answer:
          "A measure is calculated at query time in the respective filter context and is very flexible. A calculated column is computed on load and stored in the model, which uses more memory and is less dynamic.",
      },
      {
        question: "Is DAX hard to learn?",
        answer:
          "The basics are quick to learn, similar to Excel formulas. DAX becomes demanding with the filter context and functions such as CALCULATE; here a clean data model and experience, such as smiit contributes, help.",
      },
      {
        question: "What is the difference between Power Query and DAX?",
        answer:
          "Power Query prepares the data before it is loaded into the model, that is connecting, cleansing and reshaping. DAX then calculates metrics and aggregations within the finished data model. The two complement each other but solve different tasks.",
      },
      {
        question: "Why is a good data model important for DAX?",
        answer:
          "DAX calculates in the context of the model's tables and relationships. A clean star schema with clear relationships makes measures simpler, faster and easier to follow, whereas a tangled model leads to complicated formulas and performance problems.",
      },
    ],
    relatedServicePath: "services/analytics",
    relatedCaseStudySlug: "dy-project-ag",
    metaTitle: "What is DAX? Definition, benefits & practice | smiit glossary",
    metaDescription:
      "DAX explained simply: definition, how it works, use cases and how it differs from Power Query and the semantic model – with practical insight from smiit.",
  },
}

export default dax

/** Misconceptions + external sources, merged into the term on read (see getGlossaryTerm). */
export const extras: Record<Locale, GlossaryExtra> = {
  de: {
    misconceptions: [
      "DAX ist keine Variante von Excel-Formeln; es arbeitet mit Filterkontext und Beziehungen über ganze Tabellen, nicht mit einzelnen Zellen.",
      "Viele verwechseln berechnete Spalten und Measures. Spalten werden zeilenweise gespeichert, Measures hingegen erst zur Abfragezeit im jeweiligen Filterkontext berechnet.",
      "Ein verbreiteter Irrtum ist, dass das Verständnis von Zeilen- und Filterkontext optional sei. Genau dieser Kontext ist die häufigste Ursache für falsche DAX-Ergebnisse.",
    ],
    sources: [
      { title: "Microsoft Learn – DAX-Referenz", url: "https://learn.microsoft.com/dax/" },
      { title: "SQLBI – DAX-Ressourcen (Marco Russo & Alberto Ferrari)", url: "https://www.sqlbi.com/" },
    ],
  },
  en: {
    misconceptions: [
      "DAX is not a variant of Excel formulas; it works with filter context and relationships across entire tables, not individual cells.",
      "Many confuse calculated columns and measures. Columns are stored row by row, while measures are computed at query time within the current filter context.",
      "A common error is to treat understanding row and filter context as optional. That context is the most frequent cause of wrong DAX results.",
    ],
    sources: [
      { title: "Microsoft Learn – DAX reference", url: "https://learn.microsoft.com/dax/" },
      { title: "SQLBI – DAX resources (Marco Russo & Alberto Ferrari)", url: "https://www.sqlbi.com/" },
    ],
  },
}
