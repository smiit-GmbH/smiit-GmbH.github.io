import type { Locale } from "@/lib/dictionary"
import type { GlossaryExtra, LocalizedGlossaryTerm } from "@/lib/glossary"

const microsoftFabric: LocalizedGlossaryTerm = {
  de: {
    slug: "microsoft-fabric",
    cluster: "analytics",
    dateModified: "2026-05-25",
    term: "Microsoft Fabric",
    title: "Was ist Microsoft Fabric?",
    shortDefinition:
      "Microsoft Fabric ist eine integrierte Analyseplattform von Microsoft, die Datenintegration, Data Engineering, Data Warehousing, Data Science und Power BI in einem zusammenhängenden Software-as-a-Service-Angebot vereint. Im Zentrum steht OneLake, ein einheitlicher Datenspeicher, auf dem alle Fabric-Dienste gemeinsam arbeiten.",
    synonyms: ["Fabric", "MS Fabric", "OneLake", "Fabric-Plattform"],
    sections: [
      {
        heading: "Einordnung: Wofür wird Microsoft Fabric genutzt?",
        paragraphs: [
          "Microsoft Fabric bündelt Werkzeuge, die früher einzeln zusammengestellt werden mussten, in einer einheitlichen SaaS-Plattform. Datenintegration, Lakehouse, Data Warehouse, Echtzeitanalyse, Data Science und Power BI greifen über den gemeinsamen Speicher OneLake auf dieselben Daten zu, ohne sie mehrfach kopieren zu müssen.",
          "Für Unternehmen reduziert das die Komplexität, weil weniger einzelne Dienste verbunden und verwaltet werden müssen. Power BI ist als Berichts- und Visualisierungsschicht fest integriert, und die Veredelung der Daten lässt sich entlang einer Medallion-Architektur organisieren.",
        ],
      },
      {
        heading: "Typische Anwendungsfälle",
        paragraphs: [
          "Microsoft Fabric eignet sich besonders für Organisationen, die im Microsoft- und Power-BI-Umfeld eine durchgängige Datenplattform suchen.",
        ],
        bullets: [
          "Einheitliche Plattform für Datenintegration, Warehouse, Lakehouse und Reporting",
          "Gemeinsamer Datenspeicher OneLake ohne wiederholtes Kopieren der Daten",
          "Enge Integration mit Power BI für durchgängiges Reporting",
          "Reduzierte Komplexität gegenüber vielen einzeln verbundenen Diensten",
        ],
      },
      {
        heading: "Abgrenzung & Bezug zu smiit",
        paragraphs: [
          "Microsoft Fabric ist eine integrierte Plattform, während Azure Databricks ein spezialisierter, besonders leistungsfähiger Dienst vor allem für Data Engineering und Data Science ist; beide nutzen Lakehouse-Konzepte und lassen sich kombinieren. Fabric ist kein Ersatz für eine durchdachte Datenmodellierung oder Governance, sondern die Plattform, auf der diese umgesetzt werden. ETL/ELT, Medallion-Architektur und Semantic Models finden sich auch in Fabric wieder. smiit bewertet im Einzelfall, ob Fabric, Azure Databricks oder eine Kombination am besten zur Datenlage und zum Budget passt, wie es etwa im Umfeld der dy Project AG abgewogen wurde.",
        ],
      },
    ],
    faq: [
      {
        question: "Was ist der Unterschied zwischen Microsoft Fabric und Azure Databricks?",
        answer:
          "Fabric ist eine breite, integrierte Analyseplattform mit enger Power-BI-Anbindung. Azure Databricks ist spezialisiert auf leistungsstarkes Data Engineering und Data Science. Beide nutzen Lakehouse-Konzepte und können kombiniert werden.",
      },
      {
        question: "Brauche ich für Microsoft Fabric Power BI?",
        answer:
          "Power BI ist Teil von Fabric und dient als Berichts- und Visualisierungsschicht. Wer bereits Power BI nutzt, findet in Fabric eine natürliche Erweiterung in Richtung durchgängiger Datenplattform.",
      },
      {
        question: "Was ist OneLake in Microsoft Fabric?",
        answer:
          "OneLake ist der zentrale, einheitliche Datenspeicher von Fabric, auf den alle Dienste gemeinsam zugreifen. Dadurch müssen Daten nicht mehrfach kopiert werden, sondern stehen den verschiedenen Fabric-Werkzeugen direkt zur Verfügung.",
      },
      {
        question: "Eignet sich Microsoft Fabric für den Mittelstand?",
        answer:
          "Fabric kann gerade für kleinere Teams attraktiv sein, weil es viele Bausteine in einer Plattform bündelt und weniger Einzeldienste verbunden werden müssen. Entscheidend sind der tatsächliche Datenbedarf und das Lizenzmodell, das sich an der gebuchten Kapazität orientiert.",
      },
      {
        question: "Wie passt smiit Microsoft Fabric in eine Datenstrategie ein?",
        answer:
          "smiit bewertet im Einzelfall, ob Fabric, Azure Databricks oder eine Kombination am besten zur Datenlage und zum Budget passt, und setzt darauf eine durchdachte Modellierung und Governance auf.",
      },
    ],
    relatedServicePath: "services/analytics",
    relatedCaseStudySlug: "dy-project-ag",
    metaTitle: "Microsoft Fabric: Definition, Nutzen & Praxis | smiit Glossar",
    metaDescription:
      "Microsoft Fabric einfach erklärt: Definition, Funktionsweise, Anwendungsfälle und Abgrenzung zu Azure Databricks und Power BI – mit Praxisbezug von smiit.",
  },
  en: {
    slug: "microsoft-fabric",
    cluster: "analytics",
    dateModified: "2026-05-25",
    term: "Microsoft Fabric",
    title: "What is Microsoft Fabric?",
    shortDefinition:
      "Microsoft Fabric is an integrated analytics platform from Microsoft that unites data integration, data engineering, data warehousing, data science and Power BI in one coherent software-as-a-service offering. At its center is OneLake, a unified data store on which all Fabric services work together.",
    synonyms: ["Fabric", "MS Fabric", "OneLake", "Fabric platform"],
    sections: [
      {
        heading: "Where Microsoft Fabric is used",
        paragraphs: [
          "Microsoft Fabric bundles tools that previously had to be assembled individually into a unified SaaS platform. Data integration, lakehouse, data warehouse, real-time analytics, data science and Power BI access the same data via the shared store OneLake without having to copy it multiple times.",
          "For companies, this reduces complexity because fewer individual services have to be connected and managed. Power BI is firmly integrated as the reporting and visualization layer, and the refinement of data can be organized along a medallion architecture.",
        ],
      },
      {
        heading: "Typical use cases",
        paragraphs: [
          "Microsoft Fabric is particularly suited to organizations that want an end-to-end data platform in the Microsoft and Power BI ecosystem.",
        ],
        bullets: [
          "Unified platform for data integration, warehouse, lakehouse and reporting",
          "Shared data store OneLake without repeated copying of data",
          "Tight integration with Power BI for end-to-end reporting",
          "Reduced complexity compared to many individually connected services",
        ],
      },
      {
        heading: "How it relates & how smiit uses it",
        paragraphs: [
          "Microsoft Fabric is an integrated platform, whereas Azure Databricks is a specialized, particularly powerful service mainly for data engineering and data science; both use lakehouse concepts and can be combined. Fabric is not a substitute for thoughtful data modeling or governance but the platform on which these are implemented. ETL/ELT, the medallion architecture and semantic models also appear in Fabric. smiit assesses case by case whether Fabric, Azure Databricks or a combination best fits the data situation and budget, as was weighed up in the context of the dy Project AG, for example.",
        ],
      },
    ],
    faq: [
      {
        question: "What is the difference between Microsoft Fabric and Azure Databricks?",
        answer:
          "Fabric is a broad, integrated analytics platform with tight Power BI integration. Azure Databricks is specialized in powerful data engineering and data science. Both use lakehouse concepts and can be combined.",
      },
      {
        question: "Do I need Power BI for Microsoft Fabric?",
        answer:
          "Power BI is part of Fabric and serves as the reporting and visualization layer. Anyone already using Power BI finds in Fabric a natural extension towards an end-to-end data platform.",
      },
      {
        question: "What is OneLake in Microsoft Fabric?",
        answer:
          "OneLake is Fabric's central, unified data store that all services access together. This means data no longer has to be copied multiple times but is directly available to the various Fabric tools.",
      },
      {
        question: "Is Microsoft Fabric suitable for mid-sized companies?",
        answer:
          "Fabric can be appealing precisely for smaller teams because it bundles many building blocks into one platform and fewer individual services have to be connected. What matters is the actual data requirement and the licensing model, which is based on the capacity booked.",
      },
      {
        question: "How does smiit fit Microsoft Fabric into a data strategy?",
        answer:
          "smiit assesses case by case whether Fabric, Azure Databricks or a combination best fits the data situation and budget, and builds thoughtful modeling and governance on top of it.",
      },
    ],
    relatedServicePath: "services/analytics",
    relatedCaseStudySlug: "dy-project-ag",
    metaTitle: "Microsoft Fabric: definition & practice | smiit glossary",
    metaDescription:
      "Microsoft Fabric explained simply: definition, how it works, use cases and how it differs from Azure Databricks and Power BI – with practical insight from smiit.",
  },
}

export default microsoftFabric

/** Misconceptions + external sources, merged into the term on read (see getGlossaryTerm). */
export const extras: Record<Locale, GlossaryExtra> = {
  de: {
    misconceptions: [
      "Microsoft Fabric ist kein einzelnes Tool, sondern eine integrierte SaaS-Plattform, die Data Engineering, Warehousing, Data Science und Power BI zusammenführt.",
      "Viele glauben, Fabric ersetze sofort alle bestehenden Azure-Datendienste. Es bündelt und vereinfacht vieles, bestehende Architekturen lassen sich aber schrittweise integrieren.",
      "Ein verbreiteter Irrtum ist, dass OneLake mehrere Datenkopien anlegt. OneLake dient als einheitlicher, logischer Datalake, der Duplikate zwischen Workloads vermeiden soll.",
    ],
    sources: [
      { title: "Microsoft Learn – Microsoft Fabric Dokumentation", url: "https://learn.microsoft.com/fabric/" },
      { title: "Microsoft – Microsoft Fabric (Produktseite)", url: "https://www.microsoft.com/microsoft-fabric" },
    ],
  },
  en: {
    misconceptions: [
      "Microsoft Fabric is not a single tool but an integrated SaaS platform that brings together data engineering, warehousing, data science and Power BI.",
      "Many think Fabric instantly replaces all existing Azure data services. It unifies and simplifies much, but existing architectures can be integrated step by step.",
      "A common error is to assume OneLake creates multiple data copies. OneLake acts as a single, logical data lake meant to avoid duplication across workloads.",
    ],
    sources: [
      { title: "Microsoft Learn – Microsoft Fabric documentation", url: "https://learn.microsoft.com/fabric/" },
      { title: "Microsoft – Microsoft Fabric (product page)", url: "https://www.microsoft.com/microsoft-fabric" },
    ],
  },
}
