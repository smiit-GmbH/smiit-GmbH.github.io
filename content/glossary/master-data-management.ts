import type { Locale } from "@/lib/dictionary"
import type { GlossaryExtra, LocalizedGlossaryTerm } from "@/lib/glossary"

const stammdatenmanagement: LocalizedGlossaryTerm = {
  de: {
    slug: "master-data-management",
    cluster: "strategy",
    dateModified: "2026-05-25",
    term: "Stammdatenmanagement (MDM)",
    title: "Was ist Stammdatenmanagement (MDM)?",
    shortDefinition:
      "Stammdatenmanagement (Master Data Management, MDM) sorgt dafür, dass zentrale Geschäftsdaten wie Kunden, Lieferanten oder Artikel über alle Systeme hinweg einheitlich, korrekt und widerspruchsfrei sind. Es schafft eine verlässliche „einzige Wahrheit“, auf die ERP, CRM und Automatisierungen gleichermaßen zugreifen können.",
    synonyms: ["MDM", "Master Data Management", "Stammdaten", "Datenkonsolidierung", "Datenqualität"],
    sections: [
      {
        heading: "Einordnung: Wofür wird Stammdatenmanagement genutzt?",
        paragraphs: [
          "Stammdaten sind die langlebigen Kerndaten eines Unternehmens – im Gegensatz zu Bewegungsdaten wie einzelnen Aufträgen oder Buchungen. Wenn dieselben Kunden oder Lieferanten in mehreren Systemen unterschiedlich erfasst sind, entstehen Dubletten, Fehler und Mehraufwand. MDM konsolidiert diese Daten, definiert Regeln für Pflege und Hoheit und hält sie konsistent.",
          "Praktisch umfasst MDM das Bereinigen und Zusammenführen vorhandener Datensätze, das Festlegen führender Systeme und das Sicherstellen, dass Änderungen sauber in alle angebundenen Systeme fließen. Gerade bei Automatisierung ist saubere Stammdatenbasis eine Voraussetzung, damit Prozesse zuverlässig laufen.",
        ],
      },
      {
        heading: "Beispiel aus der Praxis",
        paragraphs: [
          "Ein Logistikunternehmen führt Kreditoren- und Debitorendaten in mehreren Systemen, die im Lauf der Zeit auseinandergelaufen sind. Im Rahmen einer Konsolidierung werden Dubletten erkannt, Datensätze zusammengeführt und ein führendes System für die Stammdaten definiert. Anschließend greifen ERP wie Business Central und das CRM auf eine einheitliche Datenbasis zu, was Auswertungen und Automatisierungen erst verlässlich macht.",
        ],
      },
      {
        heading: "Abgrenzung & Bezug zu smiit",
        paragraphs: [
          "MDM bezieht sich auf Stammdaten, nicht auf Bewegungsdaten, und ist breiter als reine Datenbereinigung, da es auch Hoheit, Regeln und laufende Pflege umfasst. Es ist eng mit Prozessautomatisierung verbunden, weil automatisierte Abläufe nur auf konsistenten Daten zuverlässig funktionieren. Für die G&B Logistics GmbH hat smiit die Stammdaten konsolidiert – inklusive Kreditoren und Debitoren – und die Datenbasis für Business Central und HubSpot vereinheitlicht.",
        ],
      },
    ],
    faq: [
      {
        question: "Worin unterscheiden sich Stammdaten und Bewegungsdaten?",
        answer:
          "Stammdaten sind langlebige Kerndaten wie Kunden, Lieferanten oder Artikel. Bewegungsdaten beschreiben einzelne Vorgänge wie Aufträge oder Buchungen. MDM kümmert sich gezielt um die Qualität und Konsistenz der Stammdaten.",
      },
      {
        question: "Warum ist Stammdatenmanagement für Automatisierung wichtig?",
        answer:
          "Automatisierte Prozesse arbeiten nur so gut wie ihre Datenbasis. Sind Stammdaten widersprüchlich oder doppelt vorhanden, übertragen sich diese Fehler in jeden automatisierten Schritt. Saubere Stammdaten sind daher eine Voraussetzung.",
      },
      {
        question: "Was ist ein führendes System für Stammdaten?",
        answer:
          "Das führende System ist die Quelle, die für einen bestimmten Datentyp als verbindlich gilt – etwa das ERP für Lieferantendaten. Änderungen werden dort gepflegt und von dort an andere Systeme verteilt, sodass keine widersprüchlichen Versionen entstehen.",
      },
      {
        question: "Wie geht man mit Dubletten in den Stammdaten um?",
        answer:
          "Dubletten werden zunächst über Abgleichregeln erkannt und anschließend zusammengeführt, wobei festgelegt wird, welche Werte erhalten bleiben. Damit das Problem nicht erneut entsteht, gehören klare Pflegeregeln und Validierungen für künftige Einträge dazu.",
      },
      {
        question: "Ist Stammdatenmanagement ein einmaliges Projekt?",
        answer:
          "Die erste Konsolidierung ist ein Projekt, doch danach beginnt die laufende Pflege. Ohne fortlaufende Regeln, Hoheiten und Kontrollen laufen Stammdaten über die Zeit erneut auseinander – MDM ist daher eher ein dauerhafter Prozess als ein abgeschlossenes Vorhaben.",
      },
    ],
    relatedServicePath: "services/strategy",
    relatedCaseStudySlug: "gb-logistics-gmbh",
    metaTitle: "Stammdatenmanagement (MDM): Nutzen & Beispiel | smiit Glossar",
    metaDescription:
      "Stammdatenmanagement (MDM) erklärt: einheitliche Kunden-, Lieferanten- und Artikeldaten, Konsolidierung und Datenqualität – mit Praxisbeispiel von smiit.",
  },
  en: {
    slug: "master-data-management",
    cluster: "strategy",
    dateModified: "2026-05-25",
    term: "Master data management (MDM)",
    title: "What is master data management (MDM)?",
    shortDefinition:
      "Master data management (MDM) ensures that core business data such as customers, suppliers or products is consistent, correct and free of contradictions across all systems. It creates a reliable “single source of truth” that ERP, CRM and automations can all rely on.",
    synonyms: ["MDM", "master data management", "master data", "data consolidation", "data quality"],
    sections: [
      {
        heading: "Where master data management is used",
        paragraphs: [
          "Master data is the long-lived core data of a company — as opposed to transactional data such as individual orders or postings. When the same customers or suppliers are recorded differently across multiple systems, duplicates, errors and extra effort arise. MDM consolidates this data, defines rules for maintenance and ownership and keeps it consistent.",
          "In practice, MDM covers cleaning and merging existing records, defining leading systems and ensuring that changes flow cleanly into all connected systems. For automation in particular, a clean master data foundation is a prerequisite for processes to run reliably.",
        ],
      },
      {
        heading: "A practical example",
        paragraphs: [
          "A logistics company maintains creditor and debtor data across several systems that have drifted apart over time. As part of a consolidation, duplicates are identified, records are merged and a leading system for master data is defined. ERP systems such as Business Central and the CRM then rely on a unified data foundation, which is what makes analyses and automation reliable in the first place.",
        ],
      },
      {
        heading: "How it relates & how smiit uses it",
        paragraphs: [
          "MDM concerns master data, not transactional data, and is broader than mere data cleansing because it also covers ownership, rules and ongoing maintenance. It is closely linked to process automation, because automated workflows only work reliably on consistent data. For G&B Logistics GmbH, smiit consolidated the master data — including creditors and debtors — and unified the data foundation for Business Central and HubSpot.",
        ],
      },
    ],
    faq: [
      {
        question: "How do master data and transactional data differ?",
        answer:
          "Master data is long-lived core data such as customers, suppliers or products. Transactional data describes individual events such as orders or postings. MDM specifically looks after the quality and consistency of master data.",
      },
      {
        question: "Why is master data management important for automation?",
        answer:
          "Automated processes are only as good as their data foundation. If master data is contradictory or duplicated, these errors carry into every automated step. Clean master data is therefore a prerequisite.",
      },
      {
        question: "What is a leading system for master data?",
        answer:
          "The leading system is the source considered authoritative for a particular data type — for example the ERP for supplier data. Changes are maintained there and distributed from there to other systems, so no contradictory versions arise.",
      },
      {
        question: "How do you deal with duplicates in master data?",
        answer:
          "Duplicates are first identified through matching rules and then merged, with a decision on which values are retained. To prevent the problem from recurring, clear maintenance rules and validations for future entries are part of the approach.",
      },
      {
        question: "Is master data management a one-off project?",
        answer:
          "The initial consolidation is a project, but ongoing maintenance begins afterwards. Without continuous rules, ownership and controls, master data drifts apart again over time — so MDM is more of a permanent process than a finished undertaking.",
      },
    ],
    relatedServicePath: "services/strategy",
    relatedCaseStudySlug: "gb-logistics-gmbh",
    metaTitle: "Master data management (MDM) explained | smiit glossary",
    metaDescription:
      "Master data management (MDM) explained: consistent customer, supplier and product data, consolidation and data quality — with a practical example from smiit.",
  },
}

export default stammdatenmanagement

/** Misconceptions + external sources, merged into the term on read (see getGlossaryTerm). */
export const extras: Record<Locale, GlossaryExtra> = {
  de: {
    misconceptions: [
      "Stammdatenmanagement wird oft mit einem einmaligen Datenbereinigungsprojekt verwechselt; tatsächlich ist es eine dauerhafte Disziplin mit klaren Verantwortlichkeiten und Governance.",
      "Viele glauben, ein zentrales System löse das Problem von allein; ohne definierte Pflegeprozesse und Datenqualitätsregeln entstehen schnell wieder Dubletten und Widersprüche.",
      "Es wird unterschätzt, dass Stammdaten ein fachliches Thema sind und nicht allein von der IT verantwortet werden können — die Fachbereiche müssen Datenhoheit übernehmen.",
    ],
    sources: [
      { title: "DAMA International – Master Data Management (DMBOK)", url: "https://www.dama.org/" },
      { title: "Microsoft Learn – SQL Server Master Data Services (MDS)", url: "https://learn.microsoft.com/sql/master-data-services/" },
    ],
  },
  en: {
    misconceptions: [
      "Master data management is often mistaken for a one-off data-cleansing project; in reality it is an ongoing discipline with clear ownership and governance.",
      "Many believe a central system solves the problem by itself; without defined maintenance processes and data-quality rules, duplicates and inconsistencies quickly return.",
      "People underestimate that master data is a business topic and cannot be owned by IT alone — business units must take responsibility for their data.",
    ],
    sources: [
      { title: "DAMA International – Master Data Management (DMBOK)", url: "https://www.dama.org/" },
      { title: "Microsoft Learn – SQL Server Master Data Services (MDS)", url: "https://learn.microsoft.com/sql/master-data-services/" },
    ],
  },
}
