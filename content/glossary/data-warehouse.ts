import type { Locale } from "@/lib/dictionary"
import type { GlossaryExtra, LocalizedGlossaryTerm } from "@/lib/glossary"

const dataWarehouse: LocalizedGlossaryTerm = {
  de: {
    slug: "data-warehouse",
    cluster: "analytics",
    dateModified: "2026-05-25",
    term: "Data Warehouse & Lakehouse",
    title: "Was ist ein Data Warehouse (und ein Lakehouse)?",
    shortDefinition:
      "Ein Data Warehouse ist eine zentrale, für Analysen optimierte Datenbank, in der Daten aus verschiedenen operativen Systemen zusammengeführt, bereinigt und historisiert werden. Ein Lakehouse kombiniert die Flexibilität und niedrigen Speicherkosten eines Data Lakes mit den Struktur- und Performance-Eigenschaften eines Warehouse und bildet so eine gemeinsame Grundlage für Reporting, Analytik und Machine Learning.",
    synonyms: ["DWH", "Datenlager", "Enterprise Data Warehouse", "EDW", "Data Lakehouse", "Lakehouse"],
    sections: [
      {
        heading: "Einordnung: Wofür wird ein Data Warehouse genutzt?",
        paragraphs: [
          "Ein Data Warehouse trennt die Analysewelt von den operativen Systemen. Statt Berichte direkt auf ERP-, CRM- oder Produktionsdatenbanken laufen zu lassen, werden die relevanten Daten regelmäßig extrahiert, vereinheitlicht und in einem für Abfragen optimierten Modell abgelegt. So entsteht eine konsistente, historisierte Datenbasis, auf der Reporting und Analysen verlässlich und performant arbeiten.",
          "Das Lakehouse ist die modernere Ausprägung dieser Idee. Daten liegen zunächst kostengünstig in einem Data Lake (Objektspeicher) und werden über offene Tabellenformate wie Delta Lake mit Transaktionssicherheit, Schema-Verwaltung und Performance versehen. Dadurch lassen sich strukturierte Tabellen für klassisches Reporting und unstrukturierte oder halbstrukturierte Daten für Data Science auf derselben Plattform verwalten.",
        ],
      },
      {
        heading: "Beispiel aus der Praxis",
        paragraphs: [
          "Ein typisches Szenario: Auftragsdaten liegen im ERP, Kundendaten im CRM, Zeiterfassung in Excel und Sensordaten in einer separaten Datenbank. Ein Data Warehouse oder Lakehouse führt diese Quellen zusammen, vereinheitlicht Schlüssel und Begriffe und stellt eine saubere Schicht bereit, auf der Power BI direkt aufsetzen kann.",
          "Bei smiit ist die Datenplattform der dy Project AG ein konkretes Beispiel: Für ein Großbauprojekt mit einem Volumen von über 1 Mrd. CHF wurden Daten aus SQL Server, Excel-Dateien und REST-APIs auf Azure Databricks in einem Lakehouse zusammengeführt und entlang einer Medallion-Architektur (Bronze/Silver/Gold) veredelt.",
        ],
      },
      {
        heading: "Vorteile & typische Anwendungsfälle",
        paragraphs: [
          "Ein Data Warehouse oder Lakehouse lohnt sich, sobald Reporting über mehrere Quellen, große Datenmengen oder eine verlässliche Historie gefragt sind.",
        ],
        bullets: [
          "Eine gemeinsame Datenwahrheit für Management-Reporting und Controlling über System- und Abteilungsgrenzen hinweg",
          "Historisierung: Kennzahlen lassen sich über Zeit vergleichen, auch wenn operative Systeme nur den aktuellen Stand kennen",
          "Performante Abfragen, ohne die operativen Systeme zu belasten",
          "Eine Plattform, die Reporting und Machine Learning auf derselben veredelten Datenbasis ermöglicht (Lakehouse)",
        ],
      },
      {
        heading: "Abgrenzung zu verwandten Begriffen",
        paragraphs: [
          "Ein Data Lake speichert Rohdaten ohne festes Schema und ist günstig, aber ohne Veredelung schwer analytisch nutzbar. Ein klassisches Data Warehouse ist stark strukturiert und auf SQL-Reporting optimiert, aber weniger flexibel für unstrukturierte Daten. Das Lakehouse verbindet beide Welten. Die Befüllung erfolgt über ETL- oder ELT-Prozesse, die Strukturierung über Datenmodellierung und Ansätze wie die Medallion-Architektur. Power BI ist die analytische Oberfläche, die auf der veredelten Schicht aufsetzt, nicht das Warehouse selbst.",
        ],
      },
      {
        heading: "Bezug zu smiit",
        paragraphs: [
          "smiit konzipiert und baut Data Warehouses und Lakehouses für den Mittelstand, vorzugsweise im Microsoft- und Azure-Umfeld. Von der Anbindung der Quellsysteme über die Modellierung und Veredelung bis zur Governance entsteht eine Datenplattform, die Reporting und Analytik tragfähig macht, statt nur Daten zu sammeln.",
        ],
      },
    ],
    faq: [
      { question: "Was ist der Unterschied zwischen Data Warehouse und Data Lake?", answer: "Ein Data Lake speichert Rohdaten kostengünstig und ohne festes Schema, während ein Data Warehouse strukturierte, für Analysen aufbereitete Daten enthält. Ein Lakehouse kombiniert beide Ansätze auf einer Plattform." },
      { question: "Brauchen wir als Mittelständler überhaupt ein Data Warehouse?", answer: "Sobald Reporting mehrere Quellsysteme zusammenführt, große Datenmengen anfallen oder eine verlässliche Historie benötigt wird, lohnt sich eine zentrale Datenplattform. Für sehr überschaubare Datenmengen kann eine direkte Anbindung zunächst ausreichen." },
      { question: "Läuft ein Lakehouse nur in der Cloud?", answer: "In der Praxis wird ein Lakehouse fast immer in der Cloud betrieben, etwa auf Azure mit Azure Databricks oder Microsoft Fabric, weil dort günstiger Objektspeicher und skalierbare Rechenleistung zusammenkommen." },
      { question: "Was ist der Unterschied zwischen ETL und ELT bei der Befüllung?", answer: "Bei ETL werden Daten erst transformiert und dann geladen, bei ELT zuerst geladen und anschließend in der Zielplattform transformiert. Moderne Lakehouses nutzen häufig ELT, weil günstiger Speicher und skalierbare Rechenleistung es erlauben, Rohdaten zunächst abzulegen und dort zu veredeln." },
      { question: "Wie aktuell sind die Daten in einem Data Warehouse?", answer: "Das hängt vom Beladungsintervall ab. Viele Warehouses werden nächtlich oder mehrmals täglich aktualisiert (Batch), für nahezu aktuelle Daten sind häufigere oder streamende Ladevorgänge möglich. Der passende Takt richtet sich nach dem fachlichen Bedarf und den Kosten." },
    ],
    relatedServicePath: "services/analytics",
    relatedCaseStudySlug: "dy-project-ag",
    metaTitle: "Data Warehouse & Lakehouse: Definition & Praxis | smiit Glossar",
    metaDescription: "Data Warehouse und Lakehouse einfach erklärt: Definition, Funktionsweise, Anwendungsfälle und Abgrenzung zu Data Lake und ETL – mit Praxisbezug von smiit.",
  },
  en: {
    slug: "data-warehouse",
    cluster: "analytics",
    dateModified: "2026-05-25",
    term: "Data warehouse & lakehouse",
    title: "What is a data warehouse (and a lakehouse)?",
    shortDefinition:
      "A data warehouse is a central database optimized for analysis, where data from different operational systems is consolidated, cleansed and historized. A lakehouse combines the flexibility and low storage cost of a data lake with the structure and performance of a warehouse, providing a shared foundation for reporting, analytics and machine learning.",
    synonyms: ["DWH", "enterprise data warehouse", "EDW", "data lakehouse", "lakehouse"],
    sections: [
      {
        heading: "Where a data warehouse is used",
        paragraphs: [
          "A data warehouse separates the analytical world from operational systems. Instead of running reports directly against ERP, CRM or production databases, the relevant data is extracted regularly, unified and stored in a model optimized for queries. This creates a consistent, historized data basis on which reporting and analysis can run reliably and quickly.",
          "The lakehouse is the more modern expression of this idea. Data first lands cheaply in a data lake (object storage) and is then given transactional safety, schema management and performance through open table formats such as Delta Lake. This allows structured tables for classic reporting and unstructured or semi-structured data for data science to live on the same platform.",
        ],
      },
      {
        heading: "A practical example",
        paragraphs: [
          "A typical scenario: order data sits in the ERP, customer data in the CRM, time tracking in Excel and sensor data in a separate database. A data warehouse or lakehouse brings these sources together, unifies keys and terms, and provides a clean layer that Power BI can build on directly.",
          "At smiit, the dy Project AG data platform is a concrete example: for a large construction project worth over 1 billion CHF, data from SQL Server, Excel files and REST APIs was consolidated on Azure Databricks in a lakehouse and refined along a medallion architecture (bronze/silver/gold).",
        ],
      },
      {
        heading: "Benefits & typical use cases",
        paragraphs: [
          "A data warehouse or lakehouse pays off as soon as reporting spans several sources, large data volumes are involved, or a reliable history is required.",
        ],
        bullets: [
          "A single source of truth for management reporting and controlling across system and department boundaries",
          "Historisation: metrics can be compared over time even when operational systems only hold the current state",
          "Fast queries without burdening the operational systems",
          "One platform that enables both reporting and machine learning on the same refined data (lakehouse)",
        ],
      },
      {
        heading: "How it differs from related terms",
        paragraphs: [
          "A data lake stores raw data without a fixed schema; it is cheap but hard to use analytically without refinement. A classic data warehouse is highly structured and optimized for SQL reporting but less flexible for unstructured data. The lakehouse bridges both worlds. It is loaded via ETL or ELT processes, structured through data modeling and approaches such as the medallion architecture. Power BI is the analytical surface that sits on top of the refined layer, not the warehouse itself.",
        ],
      },
      {
        heading: "How smiit works with it",
        paragraphs: [
          "smiit designs and builds data warehouses and lakehouses for mid-sized companies, preferably in the Microsoft and Azure ecosystem. From connecting source systems through modeling and refinement to governance, the result is a data platform that makes reporting and analytics robust instead of merely collecting data.",
        ],
      },
    ],
    faq: [
      { question: "What is the difference between a data warehouse and a data lake?", answer: "A data lake stores raw data cheaply and without a fixed schema, whereas a data warehouse contains structured data prepared for analysis. A lakehouse combines both approaches on one platform." },
      { question: "Do we as a mid-sized company even need a data warehouse?", answer: "As soon as reporting consolidates several source systems, large data volumes occur, or a reliable history is needed, a central data platform pays off. For very small data volumes, a direct connection may be sufficient at first." },
      { question: "Does a lakehouse only run in the cloud?", answer: "In practice a lakehouse is almost always run in the cloud, for example on Azure with Azure Databricks or Microsoft Fabric, because cheap object storage and scalable compute come together there." },
      { question: "What is the difference between ETL and ELT when loading?", answer: "With ETL, data is transformed first and then loaded; with ELT, it is loaded first and then transformed within the target platform. Modern lakehouses often use ELT because cheap storage and scalable compute make it feasible to land raw data first and refine it there." },
      { question: "How current is the data in a data warehouse?", answer: "It depends on the load interval. Many warehouses are refreshed nightly or several times a day (batch); for near-real-time data, more frequent or streaming loads are possible. The right cadence depends on business needs and cost." },
    ],
    relatedServicePath: "services/analytics",
    relatedCaseStudySlug: "dy-project-ag",
    metaTitle: "Data warehouse & lakehouse explained | smiit glossary",
    metaDescription: "Data warehouse and lakehouse explained simply: definition, how they work, use cases and how they differ from a data lake and ETL – with practical insight from smiit.",
  },
}

export default dataWarehouse

/** Misconceptions + external sources, merged into the term on read (see getGlossaryTerm). */
export const extras: Record<Locale, GlossaryExtra> = {
  de: {
    misconceptions: [
      "Ein Data Warehouse ist nicht einfach eine große Datenbank; es ist für analytische Abfragen optimiert und integriert Daten aus vielen Quellen in ein konsistentes, historisiertes Modell.",
      "Viele denken, ein Data Warehouse sei für Echtzeit-Transaktionen gedacht. Es ist jedoch auf Lese- und Auswertungslast ausgelegt, nicht auf das operative Tagesgeschäft (OLTP).",
      "Ein verbreiteter Fehler ist, das Data Warehouse mit einem Data Lake zu verwechseln. Der Lake speichert Rohdaten in beliebigem Format, das Warehouse strukturierte, modellierte Daten.",
    ],
    sources: [
      { title: "Microsoft Learn – Data Warehousing (Azure Architecture Center)", url: "https://learn.microsoft.com/azure/architecture/data-guide/relational-data/data-warehousing" },
      { title: "Kimball Group – Dimensional Modeling Techniques", url: "https://www.kimballgroup.com/" },
    ],
  },
  en: {
    misconceptions: [
      "A data warehouse is not just a big database; it is optimized for analytical queries and integrates data from many sources into a consistent, historized model.",
      "Many think a data warehouse is meant for real-time transactions, but it is built for read and analytical workloads, not day-to-day operational processing (OLTP).",
      "A common mistake is to confuse a data warehouse with a data lake. The lake stores raw data in any format, while the warehouse holds structured, modeled data.",
    ],
    sources: [
      { title: "Microsoft Learn – Data warehousing (Azure Architecture Center)", url: "https://learn.microsoft.com/azure/architecture/data-guide/relational-data/data-warehousing" },
      { title: "Kimball Group – Dimensional Modeling Techniques", url: "https://www.kimballgroup.com/" },
    ],
  },
}
