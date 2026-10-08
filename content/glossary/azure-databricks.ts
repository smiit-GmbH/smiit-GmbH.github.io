import type { Locale } from "@/lib/dictionary"
import type { GlossaryExtra, LocalizedGlossaryTerm } from "@/lib/glossary"

const azureDatabricks: LocalizedGlossaryTerm = {
  de: {
    slug: "azure-databricks",
    cluster: "analytics",
    dateModified: "2026-05-25",
    term: "Azure Databricks",
    title: "Was ist Azure Databricks?",
    shortDefinition:
      "Azure Databricks ist eine auf Apache Spark basierende Analyse- und Data-Engineering-Plattform, die als verwalteter Dienst in Microsoft Azure läuft. Sie wird genutzt, um große Datenmengen zu verarbeiten, Lakehouses aufzubauen und Machine-Learning-Modelle zu entwickeln, und ist eng mit Azure-Speicher und -Diensten integriert.",
    synonyms: ["Databricks", "Databricks on Azure", "Spark-Plattform", "Lakehouse-Plattform"],
    sections: [
      {
        heading: "Einordnung: Wofür wird Azure Databricks genutzt?",
        paragraphs: [
          "Azure Databricks stellt skalierbare Rechencluster bereit, mit denen sich auch sehr große Datenmengen verarbeiten lassen. Über das offene Tabellenformat Delta Lake werden Lakehouses mit Transaktionssicherheit und guter Performance aufgebaut. Teams entwickeln darin Datenpipelines (ETL/ELT), bereiten Daten entlang einer Medallion-Architektur auf und trainieren Machine-Learning-Modelle.",
          "Als verwalteter Dienst in Azure ist Databricks eng mit Azure-Speicher, Sicherheit und Identitätsdiensten verbunden und skaliert die Rechenleistung bedarfsgesteuert. Die veredelten Daten werden häufig in Power BI ausgewertet.",
        ],
      },
      {
        heading: "Beispiel aus der Praxis",
        paragraphs: [
          "In der Datenplattform der dy Project AG, einem Großbauprojekt mit über 1 Mrd. CHF Volumen, diente Azure Databricks als zentrale Verarbeitungsplattform. Daten aus SQL Server, Excel und REST-APIs wurden dort integriert und entlang einer Medallion-Architektur (Bronze, Silver, Gold) veredelt, bevor sie als geprüfte Grundlage für das Power-BI-Reporting bereitstanden.",
        ],
      },
      {
        heading: "Abgrenzung & Bezug zu smiit",
        paragraphs: [
          "Azure Databricks ist eine leistungsfähige Verarbeitungs- und Lakehouse-Plattform, während Microsoft Fabric ein breiteres, integriertes Analyseangebot ist; beide lassen sich kombinieren. Databricks ist nicht das Reporting-Werkzeug selbst, sondern liefert die veredelten Daten, die etwa Power BI über ein Semantic Model visualisiert. ETL/ELT, Medallion-Architektur und Datenmodellierung werden in Databricks praktisch umgesetzt. smiit nutzt Azure Databricks, wenn große Datenmengen, anspruchsvolle Transformationen oder Machine Learning eine leistungsfähige, skalierbare Plattform erfordern.",
        ],
      },
    ],
    faq: [
      { question: "Was ist der Unterschied zwischen Azure Databricks und Microsoft Fabric?", answer: "Azure Databricks ist auf leistungsstarkes Data Engineering, große Datenmengen und Data Science spezialisiert. Microsoft Fabric ist eine breitere, integrierte Plattform mit enger Power-BI-Anbindung. Beide nutzen Lakehouse-Konzepte und können kombiniert werden." },
      { question: "Braucht man für Azure Databricks Programmierkenntnisse?", answer: "Für anspruchsvolle Pipelines sind Kenntnisse in Sprachen wie Python, SQL oder Scala hilfreich. smiit bringt diese Expertise ein, sodass Unternehmen die Plattform nutzen können, ohne selbst tiefes Spark-Know-how aufbauen zu müssen." },
      { question: "Was ist Delta Lake im Zusammenhang mit Azure Databricks?", answer: "Delta Lake ist ein offenes Tabellenformat, das einem Lakehouse Transaktionssicherheit, Versionierung und gute Abfrageleistung verleiht. Es bildet die Speichergrundlage, auf der in Databricks zuverlässige Datenpipelines und eine Medallion-Architektur aufgebaut werden." },
      { question: "Wie wirkt sich die Skalierung in Azure Databricks auf die Kosten aus?", answer: "Die Rechencluster werden bedarfsgesteuert hoch- und heruntergefahren, sodass nur die tatsächlich genutzte Rechenzeit anfällt. Cluster, die sich bei Inaktivität automatisch beenden, und passend dimensionierte Cluster sind die wichtigsten Hebel, um die Kosten kontrollierbar zu halten." },
    ],
    relatedServicePath: "services/analytics",
    relatedCaseStudySlug: "dy-project-ag",
    metaTitle: "Azure Databricks: Definition, Nutzen & Praxis | smiit Glossar",
    metaDescription: "Azure Databricks einfach erklärt: Definition, Funktionsweise, Anwendungsfälle und Abgrenzung zu Microsoft Fabric und Power BI – mit Praxisbezug von smiit.",
  },
  en: {
    slug: "azure-databricks",
    cluster: "analytics",
    dateModified: "2026-05-25",
    term: "Azure Databricks",
    title: "What is Azure Databricks?",
    shortDefinition:
      "Azure Databricks is an analytics and data engineering platform based on Apache Spark that runs as a managed service in Microsoft Azure. It is used to process large data volumes, build lakehouses and develop machine learning models, and is tightly integrated with Azure storage and services.",
    synonyms: ["Databricks", "Databricks on Azure", "Spark platform", "lakehouse platform"],
    sections: [
      {
        heading: "Where Azure Databricks is used",
        paragraphs: [
          "Azure Databricks provides scalable compute clusters that can process even very large data volumes. Through the open table format Delta Lake, lakehouses are built with transactional safety and good performance. Within it, teams develop data pipelines (ETL/ELT), prepare data along a medallion architecture and train machine learning models.",
          "As a managed service in Azure, Databricks is tightly connected with Azure storage, security and identity services and scales compute on demand. The refined data is frequently analyzed in Power BI.",
        ],
      },
      {
        heading: "A practical example",
        paragraphs: [
          "In the dy Project AG data platform, a large construction project worth over 1 billion CHF, Azure Databricks served as the central processing platform. Data from SQL Server, Excel and REST APIs was integrated there and refined along a medallion architecture (bronze, silver, gold) before being available as a validated basis for Power BI reporting.",
        ],
      },
      {
        heading: "How it relates & how smiit uses it",
        paragraphs: [
          "Azure Databricks is a powerful processing and lakehouse platform, whereas Microsoft Fabric is a broader, integrated analytics offering; both can be combined. Databricks is not the reporting tool itself but provides the refined data that Power BI, for example, visualizes via a semantic model. ETL/ELT, the medallion architecture and data modeling are put into practice in Databricks. smiit uses Azure Databricks when large data volumes, demanding transformations or machine learning require a powerful, scalable platform.",
        ],
      },
    ],
    faq: [
      { question: "What is the difference between Azure Databricks and Microsoft Fabric?", answer: "Azure Databricks is specialized in powerful data engineering, large data volumes and data science. Microsoft Fabric is a broader, integrated platform with tight Power BI integration. Both use lakehouse concepts and can be combined." },
      { question: "Do you need programming skills for Azure Databricks?", answer: "For demanding pipelines, knowledge of languages such as Python, SQL or Scala is helpful. smiit contributes this expertise so companies can use the platform without having to build deep Spark know-how themselves." },
      { question: "What is Delta Lake in the context of Azure Databricks?", answer: "Delta Lake is an open table format that gives a lakehouse transactional safety, versioning and good query performance. It forms the storage foundation on which reliable data pipelines and a medallion architecture are built in Databricks." },
      { question: "How does scaling in Azure Databricks affect costs?", answer: "The compute clusters scale up and down on demand, so only the compute time actually used is billed. Clusters that shut down automatically when idle, together with appropriately sized clusters, are the main levers for keeping costs controllable." },
    ],
    relatedServicePath: "services/analytics",
    relatedCaseStudySlug: "dy-project-ag",
    metaTitle: "Azure Databricks: definition & practice | smiit glossary",
    metaDescription: "Azure Databricks explained simply: definition, how it works, use cases and how it differs from Microsoft Fabric and Power BI – with practical insight from smiit.",
  },
}

export default azureDatabricks

/** Misconceptions + external sources, merged into the term on read (see getGlossaryTerm). */
export const extras: Record<Locale, GlossaryExtra> = {
  de: {
    misconceptions: [
      "Azure Databricks ist nicht nur ein gehostetes Spark; es ist eine Lakehouse-Plattform mit Delta Lake, kollaborativen Notebooks und integrierter Governance.",
      "Viele glauben, Databricks sei ausschließlich für Data Scientists. Es dient ebenso Data Engineering, ETL/ELT und Analysen über strukturierte und unstrukturierte Daten.",
      "Ein verbreiteter Irrtum ist, dass Cluster dauerhaft laufen müssen. Ohne Auto-Termination und passende Dimensionierung entstehen schnell unnötig hohe Kosten.",
    ],
    sources: [
      { title: "Microsoft Learn – Azure Databricks Dokumentation", url: "https://learn.microsoft.com/azure/databricks/" },
      { title: "Delta Lake – Offene Speicherschicht", url: "https://delta.io/" },
    ],
  },
  en: {
    misconceptions: [
      "Azure Databricks is not just hosted Spark; it is a lakehouse platform with Delta Lake, collaborative notebooks and integrated governance.",
      "Many believe Databricks is only for data scientists. It equally serves data engineering, ETL/ELT and analytics over structured and unstructured data.",
      "A common error is to assume clusters must run permanently. Without auto-termination and right-sizing, costs quickly become unnecessarily high.",
    ],
    sources: [
      { title: "Microsoft Learn – Azure Databricks documentation", url: "https://learn.microsoft.com/azure/databricks/" },
      { title: "Delta Lake – Open storage layer", url: "https://delta.io/" },
    ],
  },
}
