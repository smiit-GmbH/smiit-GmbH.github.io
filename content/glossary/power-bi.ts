import type { Locale } from "@/lib/dictionary"
import type { GlossaryExtra, LocalizedGlossaryTerm } from "@/lib/glossary"

const powerBi: LocalizedGlossaryTerm = {
  de: {
    slug: "power-bi",
    cluster: "analytics",
    dateModified: "2026-05-24",
    term: "Power BI",
    title: "Was ist Power BI?",
    shortDefinition:
      "Power BI ist eine Business-Intelligence-Plattform von Microsoft, mit der Unternehmen Daten aus verschiedenen Quellen verbinden, modellieren, analysieren und in interaktiven Dashboards visualisieren können. Es macht aus verstreuten Rohdaten eine gemeinsame Entscheidungsgrundlage für Management, Controlling und operative Teams.",
    synonyms: ["Microsoft Power BI", "Power BI Desktop", "Power BI Service", "BI-Tool"],
    sections: [
      {
        heading: "Einordnung: Wofür wird Power BI genutzt?",
        paragraphs: [
          "Power BI verbindet sich mit Datenquellen wie Excel, SQL-Datenbanken, Cloud-Systemen oder APIs, bereitet die Daten auf und stellt sie als interaktive Berichte und Dashboards bereit. Anwender können filtern, in Details hineinzoomen und Kennzahlen über verschiedene Zeiträume und Segmente vergleichen – ohne dass für jede Frage ein neuer Bericht gebaut werden muss.",
          "Die Plattform besteht im Kern aus Power BI Desktop (Modellierung und Berichtsdesign), dem Power BI Service (Veröffentlichung, Berechtigungen und Betrieb in der Cloud) sowie den mobilen Apps. Im Hintergrund kommen Power Query für die Datenaufbereitung und DAX für Kennzahlen zum Einsatz.",
        ],
      },
      {
        heading: "Beispiel aus der Praxis",
        paragraphs: [
          "Ein typisches Szenario: Vertriebszahlen liegen im CRM, Finanzdaten im ERP, operative Daten in Excel-Listen. Statt diese manuell zusammenzukopieren, verbindet Power BI die Quellen, harmonisiert die Begriffe und zeigt Umsatz, Marge und Forecast in einem einzigen Management-Dashboard – aktuell und für alle Beteiligten konsistent.",
        ],
      },
      {
        heading: "Vorteile & typische Anwendungsfälle",
        paragraphs: [
          "Power BI eignet sich überall dort, wo Entscheidungen heute auf verstreuten Tabellen und manueller Zusammenführung beruhen.",
        ],
        bullets: [
          "Management-Reporting und KPI-Dashboards mit einer einzigen Datenwahrheit",
          "Controlling: Budget, Marge und Abweichungsanalysen",
          "Operative Steuerung in Vertrieb, Projekten und Produktion",
          "Self-Service-Analysen, ohne für jede Frage die IT zu beanspruchen",
        ],
      },
      {
        heading: "Abgrenzung zu verwandten Begriffen",
        paragraphs: [
          "Power BI ist die analytische Oberfläche – nicht die Datenplattform darunter. Für große Datenmengen empfiehlt sich ein vorgelagertes Data Warehouse oder Lakehouse (z. B. mit Azure Databricks oder Microsoft Fabric), das Integration und Aufbereitung übernimmt. Power Query ist die Transformationskomponente, DAX die Formelsprache für Kennzahlen, und das Semantic Model die darunterliegende Datenschicht.",
        ],
      },
      {
        heading: "Grundbegriffe: Workspace, Dataset, Gateway & Refresh",
        paragraphs: ["Im Power BI Service tauchen einige wiederkehrende Grundbegriffe auf:"],
        bullets: [
          "Workspace (Arbeitsbereich): ein abgegrenzter Bereich, in dem ein Team Berichte, Dashboards und Datenmodelle gemeinsam entwickelt, verwaltet und veröffentlicht – Grundlage für Rollen und Berechtigungen.",
          "Dataset / Semantic Model: die wiederverwendbare Datenschicht (Tabellen, Beziehungen, Measures), auf der Berichte aufsetzen. „Dataset“ ist die frühere Bezeichnung für das heutige Semantic Model.",
          "Gateway: eine Brücke, über die Power BI in der Cloud sicher auf Datenquellen im lokalen Netzwerk (On-Premise) zugreift – nötig, wenn Daten nicht in der Cloud liegen.",
          "Refresh (Aktualisierung): der Vorgang, der die Daten im Semantic Model auf den aktuellen Stand bringt – manuell oder zeitgesteuert (geplante Aktualisierung).",
        ],
      },
      {
        heading: "Bezug zu smiit",
        paragraphs: [
          "smiit baut Power-BI-Lösungen für den Mittelstand – von der Datenintegration über performante Datenmodelle bis zu Dashboards, die im Alltag wirklich genutzt werden. Dabei arbeiten wir konsequent im Microsoft-Umfeld und achten auf eine Struktur, die mit dem Unternehmen mitwächst, statt zu einer unkontrollierten Sammlung von Einzeldateien zu werden.",
        ],
      },
    ],
    faq: [
      {
        question: "Was kostet Power BI?",
        answer:
          "Power BI Desktop ist kostenlos. Für das Teilen und den Betrieb von Berichten in der Cloud werden Lizenzen benötigt (Power BI Pro pro Nutzer oder kapazitätsbasierte Modelle wie Premium/Fabric). Der passende Lizenzmix hängt von Nutzerzahl und Anforderungen ab.",
      },
      {
        question: "Worin unterscheidet sich Power BI von Excel?",
        answer:
          "Excel ist stark für punktuelle Analysen und manuelle Berechnungen. Power BI ist auf wiederkehrendes Reporting, große Datenmengen, automatisierte Aktualisierung und mehrere Nutzer ausgelegt – mit klaren Datenmodellen statt verstreuter Tabellen.",
      },
      {
        question: "Brauchen wir ein Data Warehouse, um Power BI zu nutzen?",
        answer:
          "Nicht zwingend. Für überschaubare Datenmengen reicht oft die direkte Anbindung. Bei vielen Quellen, großen Datenmengen oder vielen Nutzern lohnt sich eine vorgelagerte Datenplattform für stabilere und performantere Berichte.",
      },
      {
        question: "Wie aktuell sind die Daten in einem Power-BI-Bericht?",
        answer:
          "Das hängt vom Aktualisierungsmodus ab. Beim Import werden die Daten zu festen Zeitpunkten oder manuell aktualisiert (geplante Aktualisierung), beim DirectQuery werden sie bei jeder Abfrage live aus der Quelle gelesen. Import ist meist schneller in der Darstellung, DirectQuery liefert dafür stets den aktuellen Stand.",
      },
      {
        question: "Können auch lokale Datenquellen (On-Premise) angebunden werden?",
        answer:
          "Ja. Über ein Gateway kann Power BI in der Cloud sicher auf Datenquellen im eigenen Netzwerk zugreifen, etwa auf eine lokale SQL-Datenbank oder Dateien auf einem Fileserver. Das Gateway dient dabei als verschlüsselte Brücke, ohne die Daten dauerhaft in die Cloud zu kopieren.",
      },
    ],
    relatedServicePath: "services/analytics",
    relatedCaseStudySlug: "dy-project-ag",
    metaTitle: "Was ist Power BI? Definition, Nutzen & Praxis | smiit Glossar",
    metaDescription:
      "Power BI einfach erklärt: Definition, Funktionsweise, Anwendungsfälle und Abgrenzung zu Excel und Data Warehouse – mit Praxisbezug von smiit.",
  },
  en: {
    slug: "power-bi",
    cluster: "analytics",
    dateModified: "2026-05-24",
    term: "Power BI",
    title: "What is Power BI?",
    shortDefinition:
      "Power BI is Microsoft's business intelligence platform that lets companies connect, model, analyze and visualize data from many sources in interactive dashboards. It turns scattered raw data into a shared basis for decisions across management, controlling and operational teams.",
    synonyms: ["Microsoft Power BI", "Power BI Desktop", "Power BI Service", "BI tool"],
    sections: [
      {
        heading: "Where Power BI is used",
        paragraphs: [
          "Power BI connects to data sources such as Excel, SQL databases, cloud systems or APIs, prepares the data and presents it as interactive reports and dashboards. Users can filter, drill into detail and compare metrics across time periods and segments — without a new report having to be built for every question.",
          "At its core the platform consists of Power BI Desktop (modeling and report design), the Power BI Service (publishing, permissions and operation in the cloud) and the mobile apps. Power Query handles data preparation and DAX powers the metrics behind the scenes.",
        ],
      },
      {
        heading: "A practical example",
        paragraphs: [
          "A typical scenario: sales figures sit in the CRM, finance data in the ERP, operational data in Excel lists. Instead of copying these together by hand, Power BI connects the sources, harmonizes the terms and shows revenue, margin and forecast in a single management dashboard — current and consistent for everyone involved.",
        ],
      },
      {
        heading: "Benefits & typical use cases",
        paragraphs: [
          "Power BI is a fit wherever decisions today rely on scattered spreadsheets and manual consolidation.",
        ],
        bullets: [
          "Management reporting and KPI dashboards with a single source of truth",
          "Controlling: budget, margin and variance analysis",
          "Operational steering in sales, projects and production",
          "Self-service analysis without involving IT for every question",
        ],
      },
      {
        heading: "How it differs from related terms",
        paragraphs: [
          "Power BI is the analytical surface — not the data platform beneath it. For large data volumes, an upstream data warehouse or lakehouse (e.g. with Azure Databricks or Microsoft Fabric) is recommended to handle integration and preparation. Power Query is the transformation component, DAX the formula language for metrics, and the semantic model the underlying data layer.",
        ],
      },
      {
        heading: "Key terms: workspace, dataset, gateway & refresh",
        paragraphs: ["A few recurring building blocks appear in the Power BI Service:"],
        bullets: [
          "Workspace: a dedicated area where a team builds, manages and publishes reports, dashboards and data models together — the basis for roles and permissions.",
          "Dataset / semantic model: the reusable data layer (tables, relationships, measures) reports are built on. Dataset is the former name for today's semantic model.",
          "Gateway: a bridge that lets Power BI in the cloud securely access data sources in the local network (on-premise) — needed when data does not live in the cloud.",
          "Refresh: the process that brings the data in the semantic model up to date — manually or on a schedule (scheduled refresh).",
        ],
      },
      {
        heading: "How smiit works with it",
        paragraphs: [
          "smiit builds Power BI solutions for SMEs — from data integration through performant data models to dashboards that actually get used day to day. We work consistently in the Microsoft ecosystem and focus on a structure that grows with the company instead of becoming an uncontrolled collection of individual files.",
        ],
      },
    ],
    faq: [
      {
        question: "How much does Power BI cost?",
        answer:
          "Power BI Desktop is free. Sharing and operating reports in the cloud requires licences (Power BI Pro per user or capacity-based models such as Premium/Fabric). The right mix depends on the number of users and requirements.",
      },
      {
        question: "How is Power BI different from Excel?",
        answer:
          "Excel is strong for ad-hoc analysis and manual calculations. Power BI is built for recurring reporting, large data volumes, automated refresh and multiple users — with clear data models instead of scattered spreadsheets.",
      },
      {
        question: "Do we need a data warehouse to use Power BI?",
        answer:
          "Not necessarily. For modest data volumes a direct connection is often enough. With many sources, large volumes or many users, an upstream data platform pays off for more stable and performant reports.",
      },
      {
        question: "How current is the data in a Power BI report?",
        answer:
          "It depends on the storage mode. In import mode the data is refreshed at fixed times or manually (scheduled refresh); in DirectQuery it is read live from the source on every query. Import is usually faster to display, while DirectQuery always reflects the latest state.",
      },
      {
        question: "Can on-premise data sources be connected too?",
        answer:
          "Yes. Through a gateway, Power BI in the cloud can securely access data sources in your own network, such as a local SQL database or files on a file server. The gateway acts as an encrypted bridge without permanently copying the data into the cloud.",
      },
    ],
    relatedServicePath: "services/analytics",
    relatedCaseStudySlug: "dy-project-ag",
    metaTitle: "What is Power BI? Definition, benefits & practice | smiit glossary",
    metaDescription:
      "Power BI explained simply: definition, how it works, use cases and how it differs from Excel and a data warehouse — with practical context from smiit.",
  },
}

export default powerBi

/** Misconceptions + external sources, merged into the term on read (see getGlossaryTerm). */
export const extras: Record<Locale, GlossaryExtra> = {
  de: {
    misconceptions: [
      "Power BI wird oft mit Excel gleichgesetzt; tatsächlich ist es eine eigenständige BI-Plattform mit Datenmodell, Beziehungen und DAX, die weit über Tabellenkalkulation hinausgeht.",
      "Viele glauben, Power BI ersetze ein Data Warehouse. Es ist aber primär eine Analyse- und Visualisierungsschicht und kein dauerhafter, skalierbarer Speicher für große, integrierte Datenbestände.",
      "Ein verbreiteter Irrtum ist, dass schöne Dashboards genügen. Ohne saubere Datenmodellierung und korrekte Beziehungen liefern Berichte schnell falsche Kennzahlen.",
    ],
    sources: [
      { title: "Microsoft Learn – Power BI Dokumentation", url: "https://learn.microsoft.com/power-bi/" },
      {
        title: "Microsoft Learn – Power BI Leitfaden (Guidance)",
        url: "https://learn.microsoft.com/power-bi/guidance/",
      },
    ],
  },
  en: {
    misconceptions: [
      "Power BI is often treated as just Excel; in reality it is a dedicated BI platform with a data model, relationships and DAX that goes far beyond spreadsheets.",
      "Many assume Power BI replaces a data warehouse, but it is primarily an analytics and visualization layer, not a durable, scalable store for large integrated data.",
      "A common error is believing that attractive dashboards are enough. Without clean data modeling and correct relationships, reports quickly produce wrong metrics.",
    ],
    sources: [
      { title: "Microsoft Learn – Power BI documentation", url: "https://learn.microsoft.com/power-bi/" },
      { title: "Microsoft Learn – Power BI guidance", url: "https://learn.microsoft.com/power-bi/guidance/" },
    ],
  },
}
