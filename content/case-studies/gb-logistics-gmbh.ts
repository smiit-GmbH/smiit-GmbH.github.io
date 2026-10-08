import type { LocalizedCaseStudy } from "@/lib/case-studies"

const gbLogistics: LocalizedCaseStudy = {
  de: {
    slug: "gb-logistics-gmbh",
    serviceArea: "strategy",
    relatedServicePath: "services/strategy",
    datePublished: "2026-05-23",
    ogImage: {
      url: "/og/case-study-gb-logistics-gmbh.png",
      width: 1200,
      height: 630,
      alt: "smiit GmbH – Case Study G&B Logistics GmbH",
    },
    image: {
      url: "/assets/case-studies/gb_de.webp",
      width: 1672,
      height: 941,
      alt: "Digitale Strategie und Prozessautomatisierung für ein Logistikunternehmen mit Power Automate, AI Builder, Microsoft Business Central, HubSpot, Cloud-Datenplattform, Power BI Reporting, Stammdatenmanagement und hybrider IT-Infrastruktur.",
    },

    client: "G&B Logistics GmbH",
    industry: "Logistik",
    companySize: "Deutschland · Mittelstand",
    title: "Digitale Strategie & Prozessautomatisierung für ein Logistikunternehmen",
    summary:
      "Die G&B Logistics GmbH arbeitet mit gewachsenen Systemen und vielen manuellen Prozessen. smiit entwickelte daraus eine umsetzbare digitale Zielarchitektur — bestehende Systeme verbinden statt ersetzen, zeitintensive Abläufe automatisieren und eine zentrale Datenbasis schaffen. Allein die automatisierte Auftragserfassung spart rund 140 Arbeitsstunden pro Monat.",
    heroMetric: { value: "140 Std./Monat", label: "eingespart allein durch automatisierte Auftragserfassung" },

    facts: [
      { label: "Branche", value: "Logistik" },
      { label: "Region", value: "Deutschland" },
      { label: "Leistung", value: "Digitale Strategie & Prozessautomatisierung" },
      { label: "Plattform", value: "Power Platform · Business Central · Power BI" },
      { label: "Zeitraum", value: "laufende Zusammenarbeit" },
    ],

    sections: [
      {
        heading: "Ausgangssituation: manuelle Abläufe zwischen E-Mail, ERP, CRM und Disposition",
        paragraphs: [
          "Wie in vielen mittelständischen Unternehmen war die IT-Landschaft bei G&B Logistics historisch gewachsen: ein lokales Dispositionssystem, Microsoft Business Central, HubSpot, E-Mail-basierte Auftragseingänge und manuell gepflegte Daten existierten parallel. Jedes System erfüllte seinen Zweck — aber die Prozesse dazwischen waren oft manuell, zeitintensiv und schwer skalierbar.",
          "Besonders kritisch war die Auftragsverarbeitung: Aufträge kamen per E-Mail als PDF und mussten manuell ausgelesen und ins Dispositionssystem übertragen werden. Jede manuelle Übertragung kostet Zeit, erzeugt Fehlerpotenzial und bindet Mitarbeitende an repetitive Tätigkeiten — und es war kaum nachvollziehbar, ob jeder eingegangene Auftrag vollständig verarbeitet wurde.",
          "Auch auf Datenebene fehlte eine einheitliche Basis: Business Central enthielt ERP- und Buchhaltungsdaten, HubSpot die CRM-nahen Prozesse, das Dispositionssystem lief lokal, weitere Informationen lagen in Dateien. Für Auswertungen, Automatisierung und Stammdatenharmonisierung gab es keine zentrale Quelle. Die Aufgabe war daher nicht, einzelne Schritte zu automatisieren, sondern eine digitale Strategie zu entwickeln, die vorhandene Systeme sinnvoll verbindet, ohne den laufenden Betrieb zu gefährden.",
        ],
      },
      {
        heading: "Lösung: digitale Zielarchitektur statt isolierter Einzelautomatisierungen",
        paragraphs: [
          "smiit unterstützte G&B Logistics beim Aufbau einer digitalen Zielarchitektur für Prozesse, Daten und Systeme — bewusst ohne alles neu zu bauen. Stattdessen wurden bestehende Systeme integriert, Prozesse analysiert und gezielt automatisiert. Bei gewachsenen Mittelstands-IT-Landschaften wäre ein vollständiger Systemwechsel teuer, risikoreich und operativ kaum sinnvoll.",
          "Der Fokus lag deshalb darauf, vorhandene Systeme besser zu verbinden — Business Central, HubSpot, das lokale Dispositionssystem, E-Mail-Prozesse und eine neue cloudbasierte Datenplattform. So entstand keine theoretische Digitalstrategie, sondern eine umsetzbare Roadmap mit konkreten Verbesserungen im Tagesgeschäft, während besonders fehleranfällige Prozesse Schritt für Schritt automatisiert wurden.",
        ],
      },
      {
        heading: "Automatisierte Auftragserfassung mit Power Automate und AI Builder",
        paragraphs: [
          "Ein zentraler Baustein war die automatische Verarbeitung eingehender Aufträge. Sie kommen weiterhin per E-Mail als PDF — ein für Kunden und Partner etabliertes Format, das nicht kurzfristig ersetzt werden sollte. Statt den Eingangskanal zu ändern, automatisierte smiit den Prozess dahinter: Mit Microsoft Power Automate und dem AI Builder werden eingehende PDF-Aufträge automatisch erkannt, ausgelesen und ins Dispositionssystem übertragen.",
          "Die Entscheidung war bewusst pragmatisch — externe Auftraggeber mussten nicht auf ein neues Portal oder Format umstellen, der interne manuelle Aufwand sank deutlich. Ergänzend prüft eine Kontrolllogik, ob eingegangene Aufträge tatsächlich verarbeitet wurden: Automatisierung ist im operativen Umfeld nur dann sinnvoll, wenn Ausnahmen und Fehlerfälle sichtbar bleiben.",
          "Allein diese Automatisierung spart rund 140 Arbeitsstunden pro Monat. Noch wichtiger ist der qualitative Effekt: Mitarbeitende werden von repetitiver Erfassung entlastet und können sich stärker auf Disposition, operative Abstimmung und Kundenkommunikation konzentrieren.",
        ],
      },
      {
        heading: "Stammdatenmanagement: Kreditoren, Debitoren und Systemharmonisierung",
        paragraphs: [
          "G&B Logistics pflegt Informationen zu Kunden, Lieferanten, Debitoren und Kreditoren in mehreren Systemen. Ohne zentrale Logik entstehen dabei schnell Dubletten, abweichende Schreibweisen oder widersprüchliche Datensätze. smiit plante und implementierte deshalb eine Struktur, mit der sich Stammdaten stärker zentralisieren und harmonisieren lassen — mit Fokus auf Kreditoren- und Debitorendaten, die für Buchhaltung, Auftragsverarbeitung und Reporting besonders relevant sind.",
          "Technisch erfolgt das über eine cloudbasierte Datenstruktur, in der Informationen aus verschiedenen Systemen zusammengeführt und für weitere Prozesse nutzbar gemacht werden — sei es zur Harmonisierung oder für nachgelagerte Prüf- und Reportingprozesse. So werden Stammdaten nicht mehr isoliert betrachtet, sondern systemübergreifend geprüft, angereichert und genutzt: bessere Datenqualität, weniger manuelle Abstimmung und eine Grundlage für weitere Automatisierung.",
        ],
      },
      {
        heading: "Cloud-Datenplattform und Power BI Reporting",
        paragraphs: [
          "Neben Automatisierung und Stammdaten entstand eine cloudbasierte Analyseplattform, die Daten aus Business Central, HubSpot, dem Dispositionssystem und weiteren Quellen zentral verfügbar macht. Auf dieser Basis entwickelte smiit Power BI Berichte, die operative und kaufmännische Daten transparenter machen.",
          "Ein konkreter Anwendungsfall ist die automatisierte Erstellung der BWA: Statt die betriebswirtschaftliche Auswertung manuell aus Buchhaltungsdaten aufzubereiten, werden die relevanten Daten angebunden und in Power BI automatisiert ausgewertet. So entsteht eine wiederholbare, nachvollziehbare und schneller verfügbare Auswertung — Finanz- und Unternehmenskennzahlen lassen sich analysieren, ohne sie jedes Mal manuell aufzubereiten.",
        ],
      },
      {
        heading: "Infrastruktur, lokaler Server und IT-Sicherheit",
        paragraphs: [
          "smiit unterstützt G&B Logistics auch bei Infrastrukturfragen — besonders beim lokalen Dispositionssystem, das auf einem Server läuft. Solche Systeme sind oft geschäftskritisch, lassen sich aber nicht immer kurzfristig in die Cloud verlagern. Deshalb wurde ein hybrider Ansatz verfolgt: Lokale Systeme bleiben dort, wo sie operativ nötig sind, werden aber besser in die Gesamtarchitektur eingebunden, während Cloud-Komponenten Datenverfügbarkeit, Auswertungen und Automatisierung verbessern.",
          "Wenn lokale Systeme, Cloud-Dienste, Automatisierungen und Schnittstellen zusammenspielen, müssen Zugriffe, Datenflüsse und Verantwortlichkeiten sauber strukturiert sein. Entsprechend spielt IT-Sicherheit eine zentrale Rolle: Die IT-Landschaft wird nicht nur funktionaler, sondern auch kontrollierbarer und zukunftsfähiger.",
        ],
      },
      {
        heading: "Trade-off: bestehende Systeme weiter nutzen statt alles neu aufbauen",
        paragraphs: [
          "Der zentrale Zielkonflikt lag zwischen technischer Modernisierung und operativer Stabilität. Eine komplett neue Systemlandschaft wäre theoretisch möglich, praktisch aber mit hohen Kosten, langen Laufzeiten und erheblichen Betriebsrisiken verbunden. smiit entschied sich daher für einen pragmatischen Weg: bestehende Systeme weiter nutzen, aber die Übergänge zwischen ihnen verbessern — Power Automate und AI Builder für wiederkehrende Schritte, die Cloud-Datenplattform zur Zentralisierung, Power BI zur Auswertung, Schnittstellen zur Verbindung. So entstand kein abstraktes IT-Zielbild, sondern eine Schritt-für-Schritt-Modernisierung mit messbarem Nutzen.",
        ],
      },
      {
        heading: "Lehre: nicht die Zeitersparnis ist der Hebel, sondern die Kontrolllogik",
        paragraphs: [
          "Die auffälligste Zahl dieses Projekts — rund 140 eingesparte Arbeitsstunden pro Monat — wäre als alleiniger Maßstab der falsche Fokus gewesen. Hätten wir nur auf Zeitersparnis optimiert, wäre eine Automatisierung, die Aufträge schnell, aber gelegentlich falsch oder gar nicht ausliest, gefährlicher als der manuelle Prozess: Sie skaliert Fehler unsichtbar. In der Disposition ist ein übersehener Auftrag keine Fußnote in der Datenqualität, sondern eine nicht ausgeführte Lieferung.",
          "Der eigentliche Werthebel war deshalb nicht die Erkennung selbst, sondern die Kontroll- und Vollständigkeitslogik dahinter: die Prüfung, ob jeder eingegangene Auftrag tatsächlich verarbeitet wurde, und das sichtbare Ausspielen von Ausnahmen und unsicheren Extraktionen zur manuellen Nachbearbeitung. Erst das macht Automatisierung im operativen Betrieb vertrauenswürdig — die Zeitersparnis ist dann das Ergebnis, nicht das Ziel.",
        ],
        bullets: [
          "Der Wert einer Automatisierung liegt in der freigesetzten Zeit UND in den Fehlern, die sie sichtbar macht.",
          "Die richtige Erfolgskennzahl ist nicht „gesparte Stunden“, sondern „erkannte Ausnahmen / garantierte Vollständigkeit“.",
          "Dokument-KI ist nie 100 % zuverlässig — die Ausnahmebehandlung (sichtbarer Fehlerkanal, menschliche Review-Schleife) baut man zuerst, nicht zuletzt.",
        ],
      },
      {
        heading: "Ergebnis: weniger manuelle Arbeit, bessere Datenbasis, skalierbare Prozesse",
        paragraphs: [
          "G&B Logistics konnte zentrale Prozesse automatisieren, Daten systemübergreifend verfügbar machen und die Grundlage für weitere Digitalisierung schaffen. Die automatische Auftragserfassung spart rund 140 Arbeitsstunden pro Monat und reduziert manuelle Übertragungen; das Stammdatenmanagement wurde strategisch neu aufgestellt und cloudbasiert umgesetzt; Daten aus Business Central, HubSpot, dem Dispositionssystem und weiteren Quellen lassen sich zentral analysieren und für Automatisierungen nutzen.",
          "Mit Power BI entstand eine bessere Grundlage für operative und kaufmännische Auswertungen, inklusive automatisierter BWA — während die bestehende, teils geschäftskritische lokale Infrastruktur weiter unterstützt wird. Der größte Nutzen liegt in der Kombination: nicht einzelne Automatisierungen, sondern eine digitale Strategie, die Prozesse, Daten, Cloud-Infrastruktur und IT-Sicherheit miteinander verbindet.",
        ],
      },
    ],

    metrics: [
      { value: "140 Std.", label: "Einsparung pro Monat durch automatisierte Auftragserfassung" },
      { value: "4+", label: "integrierte Kernsysteme: Business Central, HubSpot, Disposition, E-Mail" },
      { value: "PDF → System", label: "Aufträge automatisch ausgelesen mit Power Automate & AI Builder" },
      { value: "BWA", label: "automatisiert statt manueller Aufbereitung" },
    ],

    techStack: [
      { name: "Microsoft Power Automate", description: "Automatisierung wiederkehrender Geschäftsprozesse" },
      { name: "AI Builder", description: "Automatische Auslesung eingehender PDF-Aufträge" },
      { name: "Microsoft Business Central", description: "Quelle für ERP- & Buchhaltungsdaten" },
      { name: "HubSpot", description: "CRM-nahe Datenquelle" },
      { name: "Power BI", description: "Operative, kaufmännische & Management-Auswertungen" },
      { name: "Cloud-Datenplattform", description: "Zentrale Zusammenführung relevanter Unternehmensdaten" },
      { name: "Lokales Dispositionssystem", description: "Weiterhin geschäftskritisches Fachsystem" },
      { name: "Stammdatenharmonisierung", description: "Kreditoren- & Debitoreninformationen" },
      { name: "Hybride IT-Infrastruktur", description: "Cloud-Services & lokaler Serverbetrieb" },
      { name: "IT-Sicherheits- & Zugriffskonzepte", description: "Kontrollierte Datenflüsse & stabile Prozesse" },
    ],

    quote: {
      text: "smiit hat uns geholfen, gewachsene Prozesse Schritt für Schritt zu digitalisieren, ohne unseren laufenden Betrieb zu stören. Besonders wertvoll war, dass nicht nur einzelne Aufgaben automatisiert wurden, sondern ein klares Verständnis für unsere Systeme, Daten und Abläufe entstanden ist.",
      author: "G&B Logistics GmbH",
      role: "Logistikunternehmen",
    },

    metaTitle: "Digitale Strategie & Automatisierung Logistik – Case Study G&B | smiit",
    metaDescription:
      "Wie smiit G&B Logistics bei digitaler Strategie und Prozessautomatisierung unterstützte – mit Power Automate, AI Builder, Cloud-Datenplattform und Power BI.",
  },
  en: {
    slug: "gb-logistics-gmbh",
    serviceArea: "strategy",
    relatedServicePath: "services/strategy",
    datePublished: "2026-05-23",
    ogImage: {
      url: "/og/case-study-gb-logistics-gmbh.png",
      width: 1200,
      height: 630,
      alt: "smiit GmbH – Case study G&B Logistics GmbH",
    },
    image: {
      url: "/assets/case-studies/gb_en.webp",
      width: 1672,
      height: 941,
      alt: "Digital strategy and process automation for a logistics company with Power Automate, AI Builder, Microsoft Business Central, HubSpot, a cloud data platform, Power BI reporting, master data management and a hybrid IT infrastructure.",
    },

    client: "G&B Logistics GmbH",
    industry: "Logistics",
    companySize: "Germany · SME",
    title: "Digital strategy & process automation for a logistics company",
    summary:
      "G&B Logistics GmbH runs on grown systems and many manual processes. smiit turned that into an actionable digital target architecture — connecting existing systems instead of replacing them, automating time-consuming steps and creating a central data foundation. The automated order capture alone saves around 140 working hours per month.",
    heroMetric: { value: "140 hrs/month", label: "saved by automated order capture alone" },

    facts: [
      { label: "Industry", value: "Logistics" },
      { label: "Region", value: "Germany" },
      { label: "Service", value: "Digital strategy & process automation" },
      { label: "Platform", value: "Power Platform · Business Central · Power BI" },
      { label: "Timeline", value: "ongoing partnership" },
    ],

    sections: [
      {
        heading: "Starting point: manual work between email, ERP, CRM and dispatch",
        paragraphs: [
          "As in many SMEs, G&B Logistics' IT landscape had grown over time: a local dispatch system, Microsoft Business Central, HubSpot, email-based order intake and manually maintained data all ran in parallel. Each system served its purpose — but the processes in between were often manual, time-consuming and hard to scale.",
          "Order processing was especially critical: orders arrived by email as PDFs and had to be read out manually and entered into the dispatch system. Every manual transfer costs time, introduces errors and ties staff to repetitive work — and it was hard to verify whether every incoming order had been fully processed.",
          "On the data side there was no single foundation either: Business Central held ERP and accounting data, HubSpot the CRM-related processes, the dispatch system ran locally, and more information sat in files. There was no central source for analysis, automation or master-data harmonization. The task wasn't to automate individual steps but to develop a digital strategy that connects existing systems sensibly without jeopardizing day-to-day operations.",
        ],
      },
      {
        heading: "Solution: a digital target architecture instead of isolated point automations",
        paragraphs: [
          "smiit helped G&B Logistics build a digital target architecture for processes, data and systems — deliberately without rebuilding everything. Instead, existing systems were integrated, processes analyzed and automated where it mattered. With grown SME IT landscapes, a full system replacement would be expensive, risky and operationally questionable.",
          "The focus was therefore on connecting existing systems better — Business Central, HubSpot, the local dispatch system, email processes and a new cloud data platform. The result wasn't a theoretical digital strategy but an actionable roadmap with concrete day-to-day improvements, while especially error-prone processes were automated step by step.",
        ],
      },
      {
        heading: "Automated order capture with Power Automate and AI Builder",
        paragraphs: [
          "A central building block was automatically processing incoming orders. They still arrive by email as PDFs — a format established with customers and partners that shouldn't be replaced overnight. Instead of changing the intake channel, smiit automated the process behind it: with Microsoft Power Automate and AI Builder, incoming PDF orders are automatically detected, read out and transferred into the dispatch system.",
          "The decision was deliberately pragmatic — external clients didn't have to switch to a new portal or format, while internal manual effort dropped significantly. In addition, a control logic checks whether incoming orders were actually processed: automation in an operational context only makes sense if exceptions and errors stay visible.",
          "This automation alone saves around 140 working hours per month. Even more important is the qualitative effect: staff are relieved of repetitive data entry and can focus more on dispatch, operational coordination and customer communication.",
        ],
      },
      {
        heading: "Master data management: creditors, debtors and system harmonization",
        paragraphs: [
          "G&B Logistics maintains information on customers, suppliers, debtors and creditors across several systems. Without central logic, this quickly produces duplicates, inconsistent spellings or contradictory records. smiit therefore planned and implemented a structure to centralize and harmonize master data more strongly — focusing on creditor and debtor data, which is especially relevant for accounting, order processing and reporting.",
          "Technically, this runs on a cloud-based data structure where information from different systems is consolidated and made usable for further processes — whether for harmonization or for downstream checking and reporting. Master data is no longer viewed in isolation but checked, enriched and used across systems: better data quality, less manual coordination and a foundation for further automation.",
        ],
      },
      {
        heading: "Cloud data platform and Power BI reporting",
        paragraphs: [
          "Beyond automation and master data, a cloud-based analytics platform was built that makes data from Business Central, HubSpot, the dispatch system and other sources centrally available. On this basis smiit developed Power BI reports that make operational and commercial data more transparent.",
          "A concrete use case is the automated creation of the BWA (business management report): instead of preparing it manually from accounting data, the relevant data is connected and evaluated automatically in Power BI. This creates a repeatable, traceable and faster-available report — financial and company metrics can be analyzed without preparing them manually every time.",
        ],
      },
      {
        heading: "Infrastructure, local server and IT security",
        paragraphs: [
          "smiit also supports G&B Logistics on infrastructure — especially the local dispatch system running on a server. Such systems are often business-critical but can't always be moved to the cloud quickly. A hybrid approach was therefore taken: local systems stay where they're operationally needed but are integrated better into the overall architecture, while cloud components improve data availability, analysis and automation.",
          "When local systems, cloud services, automations and interfaces interact, access, data flows and responsibilities have to be cleanly structured. IT security therefore plays a central role: the IT landscape becomes not only more functional but also more controllable and future-proof.",
        ],
      },
      {
        heading: "Trade-off: keep using existing systems instead of rebuilding everything",
        paragraphs: [
          "The central tension was between technical modernization and operational stability. A completely new system landscape would be possible in theory, but in practice would mean high costs, long timelines and significant operational risk. smiit therefore chose a pragmatic path: keep using existing systems but improve the transitions between them — Power Automate and AI Builder for recurring steps, the cloud data platform for centralization, Power BI for analysis, interfaces for connection. The result wasn't an abstract IT target picture but a step-by-step modernization with measurable benefit.",
        ],
      },
      {
        heading: "Result: less manual work, a better data foundation, scalable processes",
        paragraphs: [
          "G&B Logistics was able to automate core processes, make data available across systems and create the basis for further digitalization. Automated order capture saves around 140 working hours per month and reduces manual transfers; master data management was strategically rebuilt and implemented in the cloud; data from Business Central, HubSpot, the dispatch system and other sources can be analyzed centrally and used for automation.",
          "Power BI created a better basis for operational and commercial analysis, including an automated BWA — while the existing, partly business-critical local infrastructure continues to be supported. The greatest benefit lies in the combination: not individual automations, but a digital strategy connecting processes, data, cloud infrastructure and IT security.",
        ],
      },
    ],

    metrics: [
      { value: "140 hrs", label: "saved per month through automated order capture" },
      { value: "4+", label: "core systems integrated: Business Central, HubSpot, dispatch, email" },
      { value: "PDF → system", label: "orders read out automatically with Power Automate & AI Builder" },
      { value: "BWA", label: "automated instead of manual preparation" },
    ],

    techStack: [
      { name: "Microsoft Power Automate", description: "Automation of recurring business processes" },
      { name: "AI Builder", description: "Automatic reading of incoming PDF orders" },
      { name: "Microsoft Business Central", description: "Source for ERP & accounting data" },
      { name: "HubSpot", description: "CRM-related data source" },
      { name: "Power BI", description: "Operational, commercial & management analysis" },
      { name: "Cloud data platform", description: "Central consolidation of relevant company data" },
      { name: "Local dispatch system", description: "Still business-critical domain system" },
      { name: "Master data harmonization", description: "Creditor & debtor information" },
      { name: "Hybrid IT infrastructure", description: "Cloud services & local server operation" },
      { name: "IT security & access concepts", description: "Controlled data flows & stable processes" },
    ],

    quote: {
      text: "smiit helped us digitize grown processes step by step without disrupting our day-to-day operations. What mattered most was that they didn't just automate individual tasks but developed a clear understanding of our systems, data and workflows.",
      author: "G&B Logistics GmbH",
      role: "Logistics company",
    },

    metaTitle: "Digital strategy & automation in logistics – G&B Logistics | smiit",
    metaDescription:
      "How smiit supported G&B Logistics with digital strategy and process automation — Power Automate, AI Builder, a cloud data platform and Power BI reporting.",
  },
}

export default gbLogistics
