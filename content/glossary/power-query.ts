import type { Locale } from "@/lib/dictionary"
import type { GlossaryExtra, LocalizedGlossaryTerm } from "@/lib/glossary"

const powerQuery: LocalizedGlossaryTerm = {
  de: {
    slug: "power-query",
    cluster: "analytics",
    dateModified: "2026-05-25",
    term: "Power Query",
    title: "Was ist Power Query?",
    shortDefinition:
      "Power Query ist die Datenvorbereitungs- und Transformationskomponente in Power BI und Excel, mit der Daten aus verschiedenen Quellen verbunden, bereinigt und umgeformt werden. Die Schritte werden aufgezeichnet und sind wiederholbar, sodass sich Datenaufbereitung automatisieren lässt, statt sie manuell zu wiederholen.",
    synonyms: ["Power Query Editor", "M (Power Query M)", "Get & Transform", "Datentransformation"],
    sections: [
      {
        heading: "Einordnung: Wofür wird Power Query genutzt?",
        paragraphs: [
          "Power Query übernimmt das Extrahieren und Transformieren von Daten, also einen Teil eines klassischen ETL-Prozesses. Anwender verbinden sich mit Quellen wie Excel, SQL-Datenbanken, REST-APIs oder CRM-Systemen, bereinigen die Daten (Spalten entfernen, Typen festlegen, Werte ersetzen), führen Tabellen zusammen und formen sie in eine für die Analyse passende Struktur.",
          "Alle Schritte werden in der Sprache M festgehalten und bei jeder Aktualisierung erneut ausgeführt. Dadurch entsteht eine wiederholbare, dokumentierte Aufbereitung, die manuelle Excel-Handgriffe ersetzt.",
        ],
      },
      {
        heading: "Typische Anwendungsfälle",
        paragraphs: [
          "Power Query wird überall dort genutzt, wo Daten vor der Analyse regelmäßig aufbereitet werden müssen.",
        ],
        bullets: [
          "Mehrere Excel-Dateien oder Tabellenblätter automatisch zusammenführen",
          "Daten aus Datenbanken oder APIs anbinden und bereinigen",
          "Spalten umbenennen, Typen setzen und fehlerhafte Werte bereinigen",
          "Wiederkehrende Aufbereitung automatisieren statt manuell zu wiederholen",
        ],
      },
      {
        heading: "Abgrenzung & Bezug zu smiit",
        paragraphs: [
          "Power Query ist die Transformationskomponente vor dem Datenmodell, nicht die Berechnungssprache; für Kennzahlen im Modell kommt DAX zum Einsatz. Bei größeren Datenmengen oder vielen Quellen wird die Aufbereitung sinnvollerweise in eine zentrale Datenplattform wie ein Data Warehouse oder Lakehouse verlagert, etwa mit ETL/ELT-Strecken. In der Datenplattform der dy Project AG wurde die schwere Aufbereitung auf Azure Databricks erledigt, während Power Query in Power BI für leichtere, berichtsnahe Anpassungen genutzt wird. smiit setzt Power Query gezielt dort ein, wo es schlank und wartbar bleibt.",
        ],
      },
    ],
    faq: [
      {
        question: "Was ist der Unterschied zwischen Power Query und DAX?",
        answer:
          "Power Query bereitet die Daten vor dem Laden ins Modell auf (verbinden, bereinigen, umformen). DAX berechnet Kennzahlen und Aggregationen innerhalb des fertigen Datenmodells.",
      },
      {
        question: "Gibt es Power Query auch in Excel?",
        answer:
          "Ja. Power Query ist sowohl in Power BI als auch in Excel verfügbar (dort als Abrufen und Transformieren) und nutzt dieselbe Sprache M, sodass sich Wissen übertragen lässt.",
      },
      {
        question: "Muss man die Sprache M beherrschen, um Power Query zu nutzen?",
        answer:
          "Für die meisten Aufgaben nicht. Der grafische Editor erzeugt die M-Schritte automatisch, während man Spalten bereinigt, Tabellen zusammenführt oder Typen setzt. M-Kenntnisse helfen erst bei fortgeschrittenen oder wiederverwendbaren Transformationen.",
      },
      {
        question: "Wann stößt Power Query an seine Grenzen?",
        answer:
          "Bei sehr großen Datenmengen, vielen Quellen oder komplexen Verarbeitungen kann die Aufbereitung in Power Query langsam und schwer wartbar werden. Dann ist es sinnvoll, die schwere Transformation in eine zentrale Datenplattform wie ein Data Warehouse oder Lakehouse zu verlagern und Power Query nur für leichte, berichtsnahe Anpassungen zu nutzen.",
      },
    ],
    relatedServicePath: "services/analytics",
    relatedCaseStudySlug: "dy-project-ag",
    metaTitle: "Was ist Power Query? Definition, Nutzen & Praxis | smiit Glossar",
    metaDescription:
      "Power Query einfach erklärt: Definition, Funktionsweise, Anwendungsfälle und Abgrenzung zu DAX und ETL – mit Praxisbezug von smiit.",
  },
  en: {
    slug: "power-query",
    cluster: "analytics",
    dateModified: "2026-05-25",
    term: "Power Query",
    title: "What is Power Query?",
    shortDefinition:
      "Power Query is the data preparation and transformation component in Power BI and Excel, used to connect, cleanse and reshape data from various sources. The steps are recorded and repeatable, so data preparation can be automated rather than repeated manually.",
    synonyms: ["Power Query Editor", "M (Power Query M)", "Get & Transform", "data transformation"],
    sections: [
      {
        heading: "Where Power Query is used",
        paragraphs: [
          "Power Query handles the extraction and transformation of data, that is part of a classic ETL process. Users connect to sources such as Excel, SQL databases, REST APIs or CRM systems, cleanse the data (remove columns, set types, replace values), join tables and reshape them into a structure suited to analysis.",
          "All steps are captured in the M language and re-run on every refresh. This creates a repeatable, documented preparation that replaces manual Excel handwork.",
        ],
      },
      {
        heading: "Typical use cases",
        paragraphs: ["Power Query is used wherever data needs to be prepared regularly before analysis."],
        bullets: [
          "Automatically combine multiple Excel files or worksheets",
          "Connect to and cleanse data from databases or APIs",
          "Rename columns, set types and clean up erroneous values",
          "Automate recurring preparation instead of repeating it manually",
        ],
      },
      {
        heading: "How it relates & how smiit uses it",
        paragraphs: [
          "Power Query is the transformation component before the data model, not the calculation language; for metrics in the model, DAX is used. With larger data volumes or many sources, preparation is sensibly moved into a central data platform such as a data warehouse or lakehouse, for example with ETL/ELT pipelines. In the dy Project AG data platform, the heavy preparation was done on Azure Databricks, while Power Query in Power BI is used for lighter, report-facing adjustments. smiit uses Power Query specifically where it stays lean and maintainable.",
        ],
      },
    ],
    faq: [
      {
        question: "What is the difference between Power Query and DAX?",
        answer:
          "Power Query prepares the data before it is loaded into the model (connect, cleanse, reshape). DAX calculates metrics and aggregations within the finished data model.",
      },
      {
        question: "Is Power Query also available in Excel?",
        answer:
          "Yes. Power Query is available in both Power BI and Excel (there as Get & Transform) and uses the same M language, so knowledge transfers between them.",
      },
      {
        question: "Do you have to know the M language to use Power Query?",
        answer:
          "For most tasks, no. The graphical editor generates the M steps automatically as you clean columns, merge tables or set types. Knowledge of M only becomes helpful for advanced or reusable transformations.",
      },
      {
        question: "When does Power Query reach its limits?",
        answer:
          "With very large data volumes, many sources or complex processing, preparation in Power Query can become slow and hard to maintain. It then makes sense to move the heavy transformation into a central data platform such as a data warehouse or lakehouse and use Power Query only for light, report-facing adjustments.",
      },
    ],
    relatedServicePath: "services/analytics",
    relatedCaseStudySlug: "dy-project-ag",
    metaTitle: "Power Query: definition & practice | smiit glossary",
    metaDescription:
      "Power Query explained simply: definition, how it works, use cases and how it differs from DAX and ETL – with practical insight from smiit.",
  },
}

export default powerQuery

/** Misconceptions + external sources, merged into the term on read (see getGlossaryTerm). */
export const extras: Record<Locale, GlossaryExtra> = {
  de: {
    misconceptions: [
      "Power Query ist nicht nur ein Excel-Feature; dieselbe Engine wird in Power BI, Dataflows und Fabric für Datenaufbereitung und Transformation genutzt.",
      "Viele glauben, Transformationen müssten in M-Code geschrieben werden. Die meisten Schritte entstehen über die Oberfläche, der Code wird automatisch im Hintergrund erzeugt.",
      "Ein verbreiteter Irrtum ist, dass die Reihenfolge der Schritte egal sei. Ohne Query Folding und passende Schrittfolge leidet die Performance bei großen Datenmengen erheblich.",
    ],
    sources: [
      { title: "Microsoft Learn – Power Query Dokumentation", url: "https://learn.microsoft.com/power-query/" },
      { title: "Microsoft Learn – Power Query M Sprachreferenz", url: "https://learn.microsoft.com/powerquery-m/" },
    ],
  },
  en: {
    misconceptions: [
      "Power Query is not just an Excel feature; the same engine powers data preparation and transformation in Power BI, dataflows and Fabric.",
      "Many think transformations must be written in M code, but most steps are built through the interface and the code is generated automatically.",
      "A common error is to assume step order does not matter. Without query folding and a sensible step sequence, performance suffers heavily on large data.",
    ],
    sources: [
      { title: "Microsoft Learn – Power Query documentation", url: "https://learn.microsoft.com/power-query/" },
      { title: "Microsoft Learn – Power Query M language reference", url: "https://learn.microsoft.com/powerquery-m/" },
    ],
  },
}
