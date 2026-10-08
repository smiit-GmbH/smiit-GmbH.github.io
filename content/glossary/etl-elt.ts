import type { Locale } from "@/lib/dictionary"
import type { GlossaryExtra, LocalizedGlossaryTerm } from "@/lib/glossary"

const etlElt: LocalizedGlossaryTerm = {
  de: {
    slug: "etl-elt",
    cluster: "analytics",
    dateModified: "2026-05-25",
    term: "ETL / ELT",
    title: "Was ist ETL / ELT?",
    shortDefinition:
      "ETL (Extract, Transform, Load) und ELT (Extract, Load, Transform) sind Prozesse, mit denen Daten aus Quellsystemen extrahiert, aufbereitet und in eine Zielplattform geladen werden. Beide bestehen aus denselben drei Schritten – Extrahieren, Transformieren und Laden; der Unterschied liegt allein in der Reihenfolge: Bei ETL werden die Daten vor dem Laden transformiert, bei ELT erst nach dem Laden in der Zielplattform.",
    synonyms: ["Extract Transform Load", "Extract Load Transform", "Datenintegration", "Datenpipeline"],
    sections: [
      {
        heading: "Einordnung: Wofür wird ETL / ELT genutzt?",
        paragraphs: [
          "ETL- und ELT-Prozesse bringen Daten aus operativen Systemen wie ERP, CRM, Datenbanken, Excel oder APIs in eine zentrale Analyseplattform wie ein Data Warehouse oder Lakehouse. Dabei werden Daten extrahiert, bereinigt, harmonisiert und in eine analysefreundliche Struktur gebracht. Solche Prozesse laufen meist automatisiert und regelmäßig (etwa nächtlich oder kontinuierlich).",
          "Beim klassischen ETL geschieht die Transformation auf einem separaten Verarbeitungsschritt, bevor die Daten geladen werden. Beim moderneren ELT werden Rohdaten zuerst geladen und dann mit der Rechenleistung der Zielplattform transformiert, was in Cloud-Lakehouses wie Azure Databricks oder Microsoft Fabric oft effizienter und flexibler ist.",
        ],
      },
      {
        heading: "Typische Anwendungsfälle",
        paragraphs: [
          "ETL- und ELT-Strecken werden überall dort gebraucht, wo Daten aus mehreren Systemen zusammengeführt und für Analysen aufbereitet werden.",
        ],
        bullets: [
          "Tägliche oder kontinuierliche Beladung eines Data Warehouse oder Lakehouse",
          "Zusammenführen von ERP-, CRM-, Excel- und API-Daten in einer Plattform",
          "Bereinigung und Harmonisierung als Grundlage für verlässliches Reporting",
          "Aufbau der Schichten einer Medallion-Architektur (Bronze, Silver, Gold)",
        ],
      },
      {
        heading: "Abgrenzung & Bezug zu smiit",
        paragraphs: [
          "ETL/ELT ist der Prozess, der eine Datenplattform befüllt, nicht die Plattform selbst (Data Warehouse oder Lakehouse) und nicht die Modellierung (Inmon, Kimball, Data Vault). Power Query ist eine leichtgewichtige Form von ETL innerhalb von Power BI; für größere Mengen werden dedizierte ELT-Strecken bevorzugt. Die Medallion-Architektur ist eine verbreitete Art, ELT im Lakehouse zu strukturieren. In der Datenplattform der dy Project AG wurden Daten aus SQL Server, Excel und REST-APIs über ELT-Strecken auf Azure Databricks integriert. smiit baut ETL/ELT-Prozesse, die zuverlässig, nachvollziehbar und wartbar sind.",
        ],
      },
    ],
    faq: [
      { question: "Was ist der Unterschied zwischen ETL und ELT?", answer: "Bei ETL werden Daten vor dem Laden transformiert, bei ELT erst danach in der Zielplattform. ELT nutzt die Rechenleistung moderner Cloud-Plattformen und ist bei großen Datenmengen oft flexibler und effizienter." },
      { question: "Brauchen wir spezielle Tools für ETL / ELT?", answer: "Für kleine Fälle reicht oft Power Query in Power BI. Bei größeren Datenmengen kommen Plattformen wie Azure Databricks, Microsoft Fabric oder Azure Data Factory zum Einsatz, die smiit passend zur Datenlage auswählt." },
      { question: "Wie oft sollten ETL- / ELT-Strecken laufen?", answer: "Das hängt davon ab, wie aktuell die Auswertungen sein müssen. Übliche Muster sind eine nächtliche Beladung, mehrmals täglich oder eine nahezu kontinuierliche Verarbeitung; je höher die Frequenz, desto wichtiger werden zuverlässige Fehlerbehandlung und Überwachung." },
      { question: "Was passiert, wenn eine ETL- / ELT-Strecke fehlschlägt?", answer: "Gut gebaute Strecken protokollieren Fehler, können einzelne Schritte gezielt wiederholen und sollten so gestaltet sein, dass ein erneuter Lauf keine doppelten oder inkonsistenten Daten erzeugt (Idempotenz). Monitoring und Benachrichtigungen stellen sicher, dass Probleme früh auffallen." },
    ],
    relatedServicePath: "services/analytics",
    relatedCaseStudySlug: "dy-project-ag",
    metaTitle: "ETL / ELT: Definition, Unterschied & Praxis | smiit Glossar",
    metaDescription: "ETL und ELT einfach erklärt: Definition, Unterschied, Anwendungsfälle und Abgrenzung zu Data Warehouse und Power Query – mit Praxisbezug von smiit.",
  },
  en: {
    slug: "etl-elt",
    cluster: "analytics",
    dateModified: "2026-05-25",
    term: "ETL / ELT",
    title: "What is ETL / ELT?",
    shortDefinition:
      "ETL (extract, transform, load) and ELT (extract, load, transform) are processes used to extract data from source systems, prepare it and load it into a target platform. Both consist of the same three steps — extract, transform and load; the difference lies solely in their order: with ETL the data is transformed before loading, with ELT only after loading in the target platform.",
    synonyms: ["extract transform load", "extract load transform", "data integration", "data pipeline"],
    sections: [
      {
        heading: "Where ETL / ELT is used",
        paragraphs: [
          "ETL and ELT processes bring data from operational systems such as ERP, CRM, databases, Excel or APIs into a central analytics platform such as a data warehouse or lakehouse. In doing so, data is extracted, cleansed, harmonized and brought into an analysis-friendly structure. Such processes usually run automatically and regularly (for example nightly or continuously).",
          "In classic ETL, the transformation happens in a separate processing step before the data is loaded. In the more modern ELT, raw data is loaded first and then transformed using the compute power of the target platform, which is often more efficient and flexible in cloud lakehouses such as Azure Databricks or Microsoft Fabric.",
        ],
      },
      {
        heading: "Typical use cases",
        paragraphs: [
          "ETL and ELT pipelines are needed wherever data from several systems is consolidated and prepared for analysis.",
        ],
        bullets: [
          "Daily or continuous loading of a data warehouse or lakehouse",
          "Consolidating ERP, CRM, Excel and API data into one platform",
          "Cleansing and harmonization as the basis for reliable reporting",
          "Building the layers of a medallion architecture (bronze, silver, gold)",
        ],
      },
      {
        heading: "How it relates & how smiit uses it",
        paragraphs: [
          "ETL/ELT is the process that fills a data platform, not the platform itself (data warehouse or lakehouse) and not the modeling (Inmon, Kimball, Data Vault). Power Query is a lightweight form of ETL within Power BI; for larger volumes, dedicated ELT pipelines are preferred. The medallion architecture is a common way to structure ELT in the lakehouse. In the dy Project AG data platform, data from SQL Server, Excel and REST APIs was integrated via ELT pipelines on Azure Databricks. smiit builds ETL/ELT processes that are reliable, traceable and maintainable.",
        ],
      },
    ],
    faq: [
      { question: "What is the difference between ETL and ELT?", answer: "With ETL data is transformed before loading, with ELT only afterwards in the target platform. ELT uses the compute power of modern cloud platforms and is often more flexible and efficient with large data volumes." },
      { question: "Do we need special tools for ETL / ELT?", answer: "For small cases, Power Query in Power BI is often enough. For larger data volumes, platforms such as Azure Databricks, Microsoft Fabric or Azure Data Factory are used, which smiit selects to suit the data situation." },
      { question: "How often should ETL / ELT pipelines run?", answer: "That depends on how up to date the analyses need to be. Common patterns are a nightly load, several times a day or near-continuous processing; the higher the frequency, the more important reliable error handling and monitoring become." },
      { question: "What happens if an ETL / ELT pipeline fails?", answer: "Well-built pipelines log errors, can retry individual steps in a targeted way and should be designed so that a rerun produces no duplicate or inconsistent data (idempotency). Monitoring and alerts ensure that problems are noticed early." },
    ],
    relatedServicePath: "services/analytics",
    relatedCaseStudySlug: "dy-project-ag",
    metaTitle: "ETL / ELT: definition, difference & practice | smiit glossary",
    metaDescription: "ETL and ELT explained simply: definition, difference, use cases and how they differ from a data warehouse and Power Query – with practical insight from smiit.",
  },
}

export default etlElt

/** Misconceptions + external sources, merged into the term on read (see getGlossaryTerm). */
export const extras: Record<Locale, GlossaryExtra> = {
  de: {
    misconceptions: [
      "ETL und ELT unterscheiden sich nicht nur in der Reihenfolge der Buchstaben; bei ELT werden Rohdaten zuerst geladen und erst im Zielsystem transformiert, was Skalierung verändert.",
      "Viele glauben, ELT mache ETL überflüssig. Beide Ansätze haben je nach Datenmenge, Zielsystem und Governance-Anforderungen weiterhin ihre Berechtigung.",
      "Ein verbreiteter Irrtum ist, der eigentliche Aufwand liege im Laden. Tatsächlich steckt die meiste Komplexität in Transformation, Datenqualität und Fehlerbehandlung.",
    ],
    sources: [
      { title: "Microsoft Learn – Extract, Transform, Load (Azure Architecture Center)", url: "https://learn.microsoft.com/azure/architecture/data-guide/relational-data/etl" },
      { title: "Microsoft Learn – Azure Data Factory", url: "https://learn.microsoft.com/azure/data-factory/" },
    ],
  },
  en: {
    misconceptions: [
      "ETL and ELT differ in more than letter order; with ELT raw data is loaded first and transformed inside the target system, which changes how it scales.",
      "Many believe ELT makes ETL obsolete, but both approaches remain valid depending on data volume, target system and governance needs.",
      "A common error is to think the real effort is in loading. Most complexity actually lies in transformation, data quality and error handling.",
    ],
    sources: [
      { title: "Microsoft Learn – Extract, transform, load (Azure Architecture Center)", url: "https://learn.microsoft.com/azure/architecture/data-guide/relational-data/etl" },
      { title: "Microsoft Learn – Azure Data Factory", url: "https://learn.microsoft.com/azure/data-factory/" },
    ],
  },
}
