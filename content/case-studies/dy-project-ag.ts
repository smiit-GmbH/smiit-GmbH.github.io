import type { LocalizedCaseStudy } from "@/lib/case-studies"

const dyProject: LocalizedCaseStudy = {
  de: {
    slug: "dy-project-ag",
    serviceArea: "analytics",
    relatedServicePath: "services/analytics",
    datePublished: "2026-05-22",
    ogImage: {
      url: "/og/case-study-dy-project-ag.png",
      width: 1200,
      height: 630,
      alt: "smiit GmbH – Case Study dy Project AG",
    },
    image: {
      url: "/assets/case-studies/dy-project_de.webp",
      width: 1672,
      height: 941,
      alt: "Power-BI-Reporting-Architektur für ein Großbauprojekt mit Azure Databricks, SQL Server, Excel-Dateien, REST-APIs, Bronze-/Silver-/Gold-Layer, Data Warehouse, Governance und Management-Dashboards.",
    },

    client: "dy Project AG",
    industry: "Bau- & Infrastrukturprojekte",
    companySize: "Schweiz · Projektmanagement",
    title: "Power BI Reporting für ein Großbauprojekt mit über 1 Mrd. CHF Volumen",
    summary:
      "Die dy Project AG steuert anspruchsvolle Bau- und Infrastrukturvorhaben. Für ein Großbauprojekt mit über 1 Milliarde CHF Volumen baute smiit eine zentrale Power-BI-Reporting-Landschaft auf — Daten aus SQL Servern, Excel und Cloud-Systemen, konsolidiert über Azure Databricks. Über mehr als zwei Jahre entstand so ein konsistentes Lagebild für Management und Projektsteuerung.",
    heroMetric: { value: "1 Mrd. CHF+", label: "Projektvolumen, gesteuert über die Reporting-Landschaft" },

    facts: [
      { label: "Branche", value: "Bau- & Infrastrukturprojekte" },
      { label: "Region", value: "Schweiz" },
      { label: "Leistung", value: "Data Platform & Power BI Reporting" },
      { label: "Plattform", value: "Azure Databricks + Power BI" },
      { label: "Zeitraum", value: "2+ Jahre (laufend)" },
    ],

    sections: [
      {
        heading: "Ausgangssituation: kein einheitliches Lagebild",
        paragraphs: [
          "Großbauprojekte erzeugen enorme Datenmengen: Projektfortschritt, Budget, Timelines, Verzögerungen, Risiken, Sitzungen, Maßnahmen und Statusinformationen liegen selten in einem einzigen System, sondern verteilt über Plattformen, Dateien und Fachanwendungen.",
          "Auch hier kamen die relevanten Daten aus sehr unterschiedlichen Systemtypen — SQL-Server-Datenbanken, manuell gepflegten Excel-Dateien, Cloud-Systemen und Fachanwendungen, die über REST-Schnittstellen angebunden werden mussten. Manche lieferten strukturierte Daten, andere nur teilweise standardisierte Exporte. Für einzelne Teams war das handhabbar; auf Management-Ebene entstand daraus ein Problem: Informationen mussten aus vielen Quellen zusammengetragen, verglichen und interpretiert werden — ein konsistentes, aktuelles Gesamtbild war kaum möglich.",
          "Technisch hieß das: Einzelne Power-BI-Berichte direkt an die Quellen zu hängen, reicht bei dieser Datenmenge, Systemvielfalt und Nutzerzahl nicht. Zuerst braucht es eine belastbare Datenplattform mit klaren Datenflüssen, definierten Datenmodellen, Rollenmanagement und Governance — erst darauf ein Reporting, das performant, nachvollziehbar und langfristig wartbar ist.",
        ],
      },
      {
        heading: "Lösung: Azure Databricks als zentrale Datenplattform vor Power BI",
        paragraphs: [
          "smiit baute eine zentrale Datenarchitektur, in der die Daten aus den Quellsystemen zunächst in Azure Databricks zusammengeführt werden — bewusst ein vorgelagerter Data-Warehouse-Ansatz statt komplexer Transformationslogik direkt in Power BI. So bleibt Power BI die analytische Oberfläche für Management und Projektsteuerung, während Integration, Harmonisierung und Qualitätslogik in einer skalierbaren Plattform stattfinden: stabilere, schnellere und langfristig besser wartbare Berichte.",
          "Die Daten durchlaufen eine mehrstufige Bronze-/Silver-/Gold-Architektur. Im Bronze Layer werden Rohdaten möglichst unverändert aufgenommen — das schafft Nachvollziehbarkeit bis zur Quelle. Im Silver Layer werden sie bereinigt und fachlich harmonisiert: einheitliche Projekt- und Programmstrukturen, konsistente Datumslogiken, bereinigte Statuswerte sowie zusammengeführte Risiko- und Terminstrukturen.",
          "Im Gold Layer entstehen kuratierte, auf die Analyse optimierte Datenmodelle: Management-Kennzahlen, Projektstatus, Budgetentwicklung, Terminabweichungen und Risikokategorien sind so vorbereitet, dass Power BI sie performant und verständlich auswerten kann. Daten werden damit nicht mehr punktuell visualisiert, sondern systematisch in eine belastbare Reporting-Grundlage überführt, die mit neuen Anforderungen wächst.",
        ],
      },
      {
        heading: "Datenintegration: SQL Server, Excel, Cloud-Systeme und REST-APIs",
        paragraphs: [
          "Ein Kernstück der Umsetzung war die Integration sehr unterschiedlicher Quellen. Strukturierte Daten aus SQL Servern wurden direkt angebunden; ergänzend verarbeitete smiit Excel-Dateien, die in Projektorganizationen weiterhin eine wichtige Rolle spielen — etwa für Statuslisten und manuelle Ergänzungen. Cloud-Systeme und Fachanwendungen kamen über REST-APIs hinzu; wo Daten nicht in der benötigten Form vorlagen, erschloss und strukturierte smiit die Schnittstellen.",
          "Diese Arbeit ist entscheidend, weil Power BI nur so gut ist wie die Datenbasis darunter: Ein Dashboard auf uneinheitlichen, manuell kopierten Daten erzeugt im Management schnell Misstrauen. Die vorgelagerte Plattform macht Datenflüsse transparenter und fachliche Definitionen konsistenter — weniger manuelle Zusammenführung, weniger Interpretationsspielraum, eine verlässlichere Grundlage für Projektentscheidungen.",
        ],
      },
      {
        heading: "Power BI: Management-Dashboards statt isolierter Einzelberichte",
        paragraphs: [
          "Auf den kuratierten Gold-Datenmodellen entstanden mehrere Power-BI-Berichte — vor allem für die Management-Ebene, aber auch für Programm- und Projektverantwortliche. Sie decken Projektfortschritt, Budget, Terminpläne, Verzögerungen, Sitzungen, Maßnahmen und Risiken ab und setzen diese in Beziehung: So wird etwa sichtbar, welche Terminverzögerungen mit kritischen Risiken zusammenhängen oder welche Budgetentwicklung auf welche Projektbereiche zurückgeht.",
          "Die Reporting-Struktur ist hierarchisch — von der Management-Perspektive über Programm- und Projektebenen bis zu Detailanalysen einzelner Themenbereiche —, sodass dieselbe Landschaft strategische Steuerungsrunden und operative Detailfragen bedient. Ein Fokus lag auf Performance: Datenmodellierung, Measures, Filterlogik und Berichtsnavigation wurden so gestaltet, dass die Berichte bei großen Datenmengen, mehreren Hierarchieebenen und vielen Nutzern schnell reagieren und verständlich bleiben.",
        ],
      },
      {
        heading: "Rollenmanagement, Governance und Betrieb im Power BI Service",
        paragraphs: [
          "Da unterschiedliche Nutzergruppen die Berichte verwenden, war Governance zentral — nicht jeder benötigt dieselbe Sicht auf Daten und Detailinformationen. Eine rollenbasierte Struktur organisiert Zugriffe entlang der Verantwortlichkeiten: klare Workspace-Strukturen, abgestimmte Berechtigungen, kontrollierte Veröffentlichung und je nach Kontext Row-Level Security, App-Verteilung oder getrennte Entwicklungs-, Test- und Produktivbereiche.",
          "So wird Reporting nicht zu einer unkontrollierten Sammlung einzelner Dateien, sondern zu einer verwalteten BI-Landschaft, in der klar ist, welche Berichte produktiv sind, welche Datenmodelle genutzt werden und welche Nutzergruppen Zugriff haben. Bei dieser Größenordnung ist das entscheidend: Management-Reporting muss nicht nur korrekt aussehen, sondern organisatorisch belastbar sein.",
        ],
      },
      {
        heading: "Trade-off: schnell sichtbare Reports und langfristig tragfähige Architektur",
        paragraphs: [
          "Der zentrale Zielkonflikt lag zwischen schnell sichtbaren Ergebnissen und sauberer Datenarchitektur: Ein rein reportgetriebener Ansatz führt schnell zu schwer wartbaren Power-BI-Dateien, doppelter Logik und inkonsistenten Kennzahlen. smiit löste das iterativ — zuerst MVP-Berichte, um Anforderungen sichtbar und mit Stakeholdern diskutierbar zu machen, parallel dazu die Databricks-Architektur professionalisiert. So arbeiteten Management und Fachbereiche früh mit konkreten Visualisierungen, während die technische Grundlage Schritt für Schritt stabiler wurde — schnelle fachliche Fortschritte ohne langfristige technische Sackgasse.",
        ],
      },
      {
        heading: "Lehre: Kennzahlen-Definitionen schlagen schöne Dashboards",
        paragraphs: [
          "Der iterative MVP-Ansatz hat die Zusammenarbeit beschleunigt — aber er hatte einen Preis, den wir unterschätzt haben. Sobald die ersten ansprechenden Dashboards standen, stritten Stakeholder nicht über die Visualisierung, sondern über die Zahlen selbst: Was genau zählt als „Verzögerung“, ab wann ist ein Arbeitspaket „in Verzug“, wie ist ein „Status“ über verschiedene Quellsysteme hinweg definiert? Dieselbe Kennzahl bedeutete für verschiedene Teams und Systeme Unterschiedliches.",
          "Damit war die vermeintliche Diskussion über die Korrektheit des Reports in Wahrheit eine Diskussion über fehlende gemeinsame Definitionen — ein Daten- und Semantikproblem, kein Tool-Problem. Wir haben daraus gelernt, die fachlichen Definitionen früher festzuzurren: ein abgestimmtes Kennzahlen-Glossar als verbindliche Logik im Gold Layer, bevor und während die Dashboards entstehen. Erst diese eine Quelle der Wahrheit beendete die wiederkehrenden Definitionsdebatten in den Status-Runden.",
        ],
        bullets: [
          "Bei verteilten Datenquellen ist die fachliche Definition einer Kennzahl der eigentliche Engpass — nicht die Visualisierung.",
          "Die Glaubwürdigkeit eines Dashboards entscheidet sich an der Konsistenz der Definitionen, nicht an der Qualität der Diagramme.",
          "Kennzahlen-Semantik gehört verbindlich in den Gold Layer (ein Glossar als Single Source of Truth) — sonst misstraut das Management auch technisch korrekten Berichten.",
        ],
      },
      {
        heading: "Ergebnis: ein konsolidiertes Lagebild für Management und Projektsteuerung",
        paragraphs: [
          "Über mehr als zwei Jahre entstand eine Power-BI-Reporting-Landschaft, die Daten aus SQL-Datenbanken, Excel-Dateien, Cloud-Systemen und manuellen Statusformaten zentral verarbeitet und für Management-, Programm- und Projektebene bereitstellt — statt sie einzeln zusammenzuführen. Das Ergebnis ist ein aktuelleres, einheitlicheres und besser nachvollziehbares Lagebild über das Gesamtprojekt.",
          "Für ein Bauprojekt mit über 1 Milliarde CHF Volumen ist dieser Überblick ein erheblicher Mehrwert: Fortschritt, Budget, Termine, Verzögerungen, Sitzungen und Risiken lassen sich auf mehreren Hierarchieebenen analysieren, kritische Entwicklungen werden früher sichtbar und Statusbesprechungen datenbasierter. Technisch verbindet die Architektur Datenintegration, Data-Warehouse-Logik, Power BI Reporting, Governance und Betrieb — geschäftlich entsteht Transparenz für die Steuerung komplexer Infrastrukturprojekte.",
        ],
      },
    ],

    metrics: [
      { value: "1 Mrd. CHF+", label: "Projektvolumen im betrachteten Großbauprojekt" },
      { value: "2+ Jahre", label: "Aufbau, Betrieb und Erweiterung der Reporting-Landschaft" },
      { value: "4+", label: "Datenquellentypen: SQL Server, Excel, Cloud, REST-APIs" },
      { value: "Dutzende", label: "Workshops mit Stakeholdern und Fachbereichen" },
    ],

    techStack: [
      { name: "Power BI", description: "Zentrale Reporting- & Management-Oberfläche" },
      { name: "Power BI Service", description: "Veröffentlichung, Berechtigungen & Berichtsbetrieb" },
      { name: "Azure Databricks", description: "Zentrale Datenverarbeitung & Transformation" },
      { name: "Bronze-/Silver-/Gold-Layer", description: "Nachvollziehbare, skalierbare Datenverarbeitung" },
      { name: "SQL Server", description: "Quelle für strukturierte Projektdaten" },
      { name: "Excel-Dateien", description: "Integration manueller & fachlicher Projektdaten" },
      { name: "REST-APIs", description: "Anbindung von Cloud-Systemen & Fachanwendungen" },
      { name: "Data-Warehouse-/Lakehouse-Architektur", description: "Skalierbarkeit, Nachvollziehbarkeit & Performance" },
      { name: "Rollenmanagement & Governance", description: "Kontrollierte Nutzung durch verschiedene Stakeholder" },
    ],

    quote: {
      text:
        "smiit hat uns dabei unterstützt, aus einer komplexen und verteilten Datenlandschaft ein strukturiertes Management-Reporting aufzubauen. Besonders wertvoll war die Kombination aus technischer Datenintegration, Verständnis für Projektsteuerung und der Fähigkeit, die Anforderungen vieler Stakeholder in verständliche Power-BI-Berichte zu übersetzen.",
      author: "dy Project AG",
      role: "Projektmanagement für Bau- & Infrastrukturvorhaben",
    },

    metaTitle: "Power BI Reporting Großbauprojekt – Case Study dy Project AG | smiit",
    metaDescription:
      "Wie smiit für die dy Project AG ein Power-BI-Reporting für ein Großbauprojekt (über 1 Mrd. CHF) auf Azure Databricks baute – mit Data Warehouse und Governance.",
  },
  en: {
    slug: "dy-project-ag",
    serviceArea: "analytics",
    relatedServicePath: "services/analytics",
    datePublished: "2026-05-22",
    ogImage: {
      url: "/og/case-study-dy-project-ag.png",
      width: 1200,
      height: 630,
      alt: "smiit GmbH – Case study dy Project AG",
    },
    image: {
      url: "/assets/case-studies/dy-project_en.webp",
      width: 1672,
      height: 941,
      alt: "Power BI reporting architecture for a large construction project — Azure Databricks, SQL Server, Excel files, REST APIs, bronze/silver/gold layers, data warehouse, governance and management dashboards.",
    },

    client: "dy Project AG",
    industry: "Construction & infrastructure",
    companySize: "Switzerland · Project management",
    title: "Power BI reporting for a CHF 1bn+ construction project",
    summary:
      "dy Project AG steers demanding construction and infrastructure projects. For a major project worth over CHF 1 billion, smiit built a central Power BI reporting landscape — data from SQL Servers, Excel and cloud systems, consolidated through Azure Databricks. Over more than two years, this created a consistent picture for management and project control.",
    heroMetric: { value: "CHF 1bn+", label: "project volume steered through the reporting landscape" },

    facts: [
      { label: "Industry", value: "Construction & infrastructure" },
      { label: "Region", value: "Switzerland" },
      { label: "Service", value: "Data platform & Power BI reporting" },
      { label: "Platform", value: "Azure Databricks + Power BI" },
      { label: "Timeline", value: "2+ years (ongoing)" },
    ],

    sections: [
      {
        heading: "Starting point: many data sources, many stakeholders, no single picture",
        paragraphs: [
          "Large construction projects generate enormous amounts of data: progress, budget, timelines, delays, risks, meetings, actions and status rarely sit in a single system — they are spread across platforms, files and domain applications.",
          "Here too, the relevant data came from very different system types — SQL Server databases, manually maintained Excel files, cloud systems and domain applications that had to be connected via REST interfaces. Some delivered structured data, others only partly standardized exports. Manageable for individual teams; at management level it became a problem: information had to be gathered, compared and interpreted from many sources, making a consistent, up-to-date overall picture hard to achieve.",
          "Technically that meant: wiring individual Power BI reports straight to the sources isn't enough given this data volume, system diversity and number of users. First you need a solid data platform with clear data flows, defined models, role management and governance — and only then reporting that is performant, traceable and maintainable in the long run.",
        ],
      },
      {
        heading: "Solution: Azure Databricks as a central data platform ahead of Power BI",
        paragraphs: [
          "smiit built a central data architecture in which data from the source systems is first consolidated in Azure Databricks — deliberately an upstream data-warehouse approach rather than complex transformation logic directly in Power BI. This keeps Power BI as the analytical surface for management and project control, while integration, harmonization and quality logic happen in a scalable platform: more stable, faster and more maintainable reports.",
          "The data passes through a multi-layer bronze/silver/gold architecture. In the bronze layer, raw data is ingested as unchanged as possible — providing traceability back to the source. In the silver layer it is cleaned and harmonized: consistent project and program structures, consistent date logic, cleaned status values, and merged risk and schedule structures.",
          "In the gold layer, curated data models optimized for analysis are created: management metrics, project status, budget development, schedule variances and risk categories are prepared so Power BI can evaluate them performantly and understandably. Data is no longer visualized ad hoc but systematically turned into a solid reporting foundation that grows with new requirements.",
        ],
      },
      {
        heading: "Data integration: SQL Server, Excel, cloud systems and REST APIs",
        paragraphs: [
          "A core part of the work was integrating very different sources. Structured data from SQL Servers was connected directly; in addition, smiit processed Excel files, which still play an important role in project organizations — for status lists and manual additions, for example. Cloud systems and domain applications were connected via REST APIs; where data wasn't available in the required form, smiit built and structured the interfaces.",
          "This work is decisive, because Power BI is only as good as the data beneath it: a dashboard built on inconsistent, manually copied data quickly breeds mistrust at management level. The upstream platform makes data flows more transparent and definitions more consistent — less manual consolidation, less room for interpretation, and a more reliable basis for project decisions.",
        ],
      },
      {
        heading: "Power BI: management dashboards instead of isolated reports",
        paragraphs: [
          "Several Power BI reports were built on the curated gold data models — primarily for management, but also supporting program and project leads. They cover progress, budget, schedules, delays, meetings, actions and risks, and relate them to one another: it becomes visible, for instance, which delays connect to critical risks or which budget developments trace back to which project areas.",
          "The reporting structure is hierarchical — from the management view through program and project levels down to detailed analyses — so the same landscape serves strategic steering sessions and operational detail questions. A key focus was performance: data modeling, measures, filter logic and report navigation were designed so the reports respond quickly and stay understandable with large data volumes, multiple hierarchy levels and many users.",
        ],
      },
      {
        heading: "Role management, governance and operations in the Power BI Service",
        paragraphs: [
          "Because different user groups use the reports, governance was central — not everyone needs the same view of data and detail. A role-based structure organizes access along responsibilities: clear workspace structures, agreed permissions, controlled publishing and, depending on context, row-level security, app distribution or separate development, test and production areas.",
          "This keeps reporting from becoming an uncontrolled collection of individual files and turns it into a managed BI landscape where it's clear which reports are in production, which data models are used and which groups have access. At this scale that's decisive: management reporting has to be not only correct but organizationally robust.",
        ],
      },
      {
        heading: "Trade-off: quickly visible reports and a durable data architecture",
        paragraphs: [
          "The central tension was between quickly visible results and a clean data architecture: a purely report-driven approach quickly leads to hard-to-maintain Power BI files, duplicated logic and inconsistent metrics. smiit resolved it iteratively — first MVP reports to make requirements visible and discussable with stakeholders, while professionalizing the Databricks architecture in parallel. Management and business units worked with concrete visualizations early, while the technical foundation grew steadily more stable — fast progress without a long-term dead end.",
        ],
      },
      {
        heading: "What we learned: metric definitions beat beautiful dashboards",
        paragraphs: [
          "The iterative MVP approach sped up collaboration — but it had a cost we underestimated. As soon as the first attractive dashboards were in place, stakeholders argued not about the visualization but about the numbers themselves: what exactly counts as a 'delay', when is a work package 'behind schedule', how is a 'status' defined across different source systems? The same metric meant different things to different teams and systems.",
          "So the apparent debate about whether the report was correct was really a debate about missing shared definitions — a data and semantics problem, not a tool problem. We learned to lock the business definitions down earlier: an agreed metric glossary as binding logic in the gold layer, before and while the dashboards are built. Only that single source of truth ended the recurring definition debates in the status meetings.",
        ],
        bullets: [
          "With distributed data sources, the bottleneck is the business definition of a metric — not the visualization.",
          "A dashboard's credibility is decided by the consistency of its definitions, not the quality of its charts.",
          "Metric semantics belong in the gold layer as binding logic (a glossary as single source of truth) — otherwise management mistrusts even technically correct reports.",
        ],
      },
      {
        heading: "Result: a consolidated picture for management and project control",
        paragraphs: [
          "Over more than two years, a Power BI reporting landscape emerged that processes data from SQL databases, Excel files, cloud systems and manual status formats centrally and makes it available at management, program and project level — instead of merging it case by case. The result is a more current, more consistent and more traceable picture of the overall project.",
          "For a construction project worth over CHF 1 billion, this overview is a substantial benefit: progress, budget, schedules, delays, meetings and risks can be analyzed across hierarchy levels, critical developments surface earlier and status meetings become more data-driven. Technically, the architecture ties together data integration, data-warehouse logic, Power BI reporting, governance and operations — and on the business side it creates the transparency needed to steer complex infrastructure projects.",
        ],
      },
    ],

    metrics: [
      { value: "CHF 1bn+", label: "project volume in the construction project" },
      { value: "2+ years", label: "building, operating and extending the reporting landscape" },
      { value: "4+", label: "source types: SQL Server, Excel, cloud, REST APIs" },
      { value: "Dozens", label: "workshops with stakeholders and business units" },
    ],

    techStack: [
      { name: "Power BI", description: "Central reporting & management surface" },
      { name: "Power BI Service", description: "Publishing, permissions & report operations" },
      { name: "Azure Databricks", description: "Central data processing & transformation" },
      { name: "Bronze/Silver/Gold layers", description: "Traceable, scalable data processing" },
      { name: "SQL Server", description: "Source for structured project data" },
      { name: "Excel files", description: "Integration of manual & domain project data" },
      { name: "REST APIs", description: "Connecting cloud systems & domain applications" },
      { name: "Data warehouse / lakehouse architecture", description: "Scalability, traceability & performance" },
      { name: "Role management & governance", description: "Controlled use across different stakeholders" },
    ],

    quote: {
      text:
        "smiit helped us turn a complex, distributed data landscape into structured management reporting. What stood out was the combination of technical data integration, an understanding of project control, and the ability to translate many stakeholders' requirements into clear Power BI reports.",
      author: "dy Project AG",
      role: "Project management for construction & infrastructure",
    },

    metaTitle: "Power BI reporting for large construction projects – dy Project AG | smiit",
    metaDescription:
      "How smiit built a Power BI reporting landscape for a CHF 1bn+ construction project on Azure Databricks for dy Project AG — with a data warehouse and governance.",
  },
}

export default dyProject
